import { describe, it, expect } from 'vitest';
import { calculateRentVsBuy } from '../../src/lib/calculators/finance';

describe('Feature 2: Rent vs. Buy Decision Engine (calculateRentVsBuy)', () => {
  const benchmarkParams = {
    monthlyRent: 2000,
    rentIncreaseRate: 3.0,
    rentersInsurance: 200,
    homePrice: 400000,
    downPaymentPercent: 20, // $80,000 down, $320,000 loan
    mortgageRate: 6.5,
    loanTermYears: 30,
    propertyTaxRate: 1.2,
    homeInsurance: 1200,
    maintenanceRate: 1.0,
    homeAppreciationRate: 4.0,
    investmentReturnRate: 7.0,
    timeHorizonYears: 7,
    buyingClosingCostPercent: 3.0,
    sellingCostPercent: 6.0,
  };

  it('calculates monthly mortgage installment (P&I) correctly', () => {
    const res = calculateRentVsBuy(benchmarkParams);
    // $320,000 loan at 6.5% for 30 years -> Monthly payment is ~$2,022.61
    expect(res.initialLoan).toBe(320000);
    expect(res.downPayment).toBe(80000);
    expect(res.purchaseClosingCost).toBe(12000);
    expect(res.monthlyMortgageEmi).toBeCloseTo(2022.61, 1);
  });

  it('calculates cumulative renting costs and investment growth over 7 years', () => {
    const res = calculateRentVsBuy(benchmarkParams);
    // 7 years of rent with 3% growth: ~183,944
    expect(res.totalRentPaid).toBeGreaterThan(168000);
    expect(res.totalRentersInsurance).toBe(1400);
    // $92,000 initial capital at 7% for 7 years: growth is ~$55,732
    expect(res.renterInvestmentGrowth).toBeGreaterThan(50000);
    expect(res.netCostRent).toBe(res.totalRentPaid + res.totalRentersInsurance - res.renterInvestmentGrowth);
  });

  it('calculates buying appreciation, equity, and net sale proceeds over 7 years', () => {
    const res = calculateRentVsBuy(benchmarkParams);
    // $400k at 4% for 7 years -> ~$526,373
    expect(res.futureHomeValue).toBeCloseTo(526373, -1);
    expect(res.sellingCosts).toBeCloseTo(res.futureHomeValue * 0.06, 0);
    expect(res.remainingLoanBalance).toBeLessThan(320000);
    expect(res.remainingLoanBalance).toBeGreaterThan(250000);
    expect(res.netCostBuy).toBeGreaterThan(0);
  });

  it('identifies breakeven point where buying becomes advantageous', () => {
    const res = calculateRentVsBuy(benchmarkParams);
    // In year 1, renting should be cheaper due to closing/selling transaction friction
    const yr1 = res.yearlyComparison.find(p => p.year === 1);
    expect(yr1).toBeDefined();
    expect(yr1?.advantage).toBe('rent');

    // Over 30 years, buying should have a clear breakeven year
    expect(res.breakevenYear).not.toBeNull();
    expect(res.breakevenYear).toBeGreaterThanOrEqual(2);
    expect(res.breakevenYear).toBeLessThanOrEqual(10);
  });

  it('handles 100% cash down payment (no mortgage debt)', () => {
    const res = calculateRentVsBuy({
      ...benchmarkParams,
      downPaymentPercent: 100,
    });
    expect(res.initialLoan).toBe(0);
    expect(res.monthlyMortgageEmi).toBe(0);
    expect(res.totalMortgagePaid).toBe(0);
    expect(res.totalInterestPaid).toBe(0);
    expect(res.remainingLoanBalance).toBe(0);
  });

  it('handles zero or invalid inputs safely without NaN', () => {
    const res = calculateRentVsBuy({
      monthlyRent: 0,
      homePrice: 0,
    });
    expect(res.monthlyMortgageEmi).toBe(0);
    expect(res.netCostRent).toBe(0);
    expect(res.netCostBuy).toBe(0);
    expect(isNaN(res.costDifference)).toBe(false);
  });

  it('handles high rent vs cheap home scenario favoring buying early', () => {
    const res = calculateRentVsBuy({
      ...benchmarkParams,
      monthlyRent: 4000,
      homePrice: 250000,
      timeHorizonYears: 5,
    });
    expect(res.recommendedAction).toBe('buy');
    expect(res.breakevenYear).toBeLessThanOrEqual(3);
  });

  it('handles cheap rent vs expensive home scenario favoring renting', () => {
    const res = calculateRentVsBuy({
      ...benchmarkParams,
      monthlyRent: 1200,
      homePrice: 900000,
      timeHorizonYears: 3,
    });
    expect(res.recommendedAction).toBe('rent');
  });

  it('evaluates Indian real estate market benchmark (₹75 Lakhs home vs ₹25k rent)', () => {
    const res = calculateRentVsBuy({
      monthlyRent: 25000,
      rentIncreaseRate: 5.0,
      rentersInsurance: 1000,
      homePrice: 7500000,
      downPaymentPercent: 20, // ₹15 Lakhs down, ₹60 Lakhs loan
      mortgageRate: 8.5,
      loanTermYears: 20,
      propertyTaxRate: 0.4,
      homeInsurance: 4000,
      maintenanceRate: 0.8,
      homeAppreciationRate: 5.0,
      investmentReturnRate: 11.0,
      timeHorizonYears: 10,
      buyingClosingCostPercent: 3.0,
      sellingCostPercent: 6.0
    });
    expect(res.initialLoan).toBe(6000000);
    expect(res.downPayment).toBe(1500000);
    expect(res.monthlyMortgageEmi).toBeCloseTo(52069.39, 1);
    expect(res.breakevenYear).toBeDefined();
  });
});
