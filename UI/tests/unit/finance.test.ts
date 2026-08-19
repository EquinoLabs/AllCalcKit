import { describe, it, expect } from 'vitest';
import {
  calculateEMI,
  compareLoans,
  calculateSIP,
  calculateCompoundInterest,
  calculateFD,
  calculateRD,
  calculateTaxGST,
  calculateTaxGSTWithSplit,
  calculateDiscount,
  calculateTipSplit,
  convertCurrency,
  formatIndianCurrency,
  formatIndianCompact,
  calculateFreelanceRate,
  calculateStartupRunway,
  calculateDca,
  calculateInflation
} from '../../src/lib/calculators/finance';

describe('Financial Calculators Engine', () => {
  describe('Loan / EMI Calculator', () => {
    it('calculates standard 5-year auto loan ($100k @ 8.5%)', () => {
      const res = calculateEMI(100000, 8.5, 5);
      expect(res.monthlyEmi).toBeCloseTo(2051.65, 1);
      expect(res.totalInterest).toBeCloseTo(23099.17, 1);
      expect(res.totalPayable).toBeCloseTo(123099.17, 1);
      expect(res.principalPercent).toBe(81);
      expect(res.interestPercent).toBe(19);
    });

    it('handles 0% interest rate without divide-by-zero crash', () => {
      const res = calculateEMI(12000, 0, 1);
      expect(res.monthlyEmi).toBe(1000);
      expect(res.totalInterest).toBe(0);
      expect(res.totalPayable).toBe(12000);
    });

    it('handles very large principal ($100M @ 7.5% for 30 years)', () => {
      const res = calculateEMI(100000000, 7.5, 30);
      expect(res.monthlyEmi).toBeCloseTo(699214.50, 1);
      expect(res.totalPayable).toBeCloseTo(251717223.08, 0);
      expect(res.totalInterest).toBeCloseTo(151717223.08, 0);
    });

    it('calculates with decimal interest rate (8.65% over 15 years)', () => {
      const res = calculateEMI(500000, 8.65, 15);
      expect(res.monthlyEmi).toBeCloseTo(4967.76, 1);
      expect(res.totalPayable).toBeCloseTo(894196.70, 0);
    });

    it('handles zero principal or tenure safely', () => {
      expect(calculateEMI(0, 5, 5).monthlyEmi).toBe(0);
      expect(calculateEMI(100000, 5, 0).monthlyEmi).toBe(0);
      expect(calculateEMI(-1000, 5, 5).monthlyEmi).toBe(0);
    });
  });

  describe('Loan Comparison Mode (compareLoans)', () => {
    it('correctly compares two loan offers with different interest rates', () => {
      const loanA = { principal: 100000, annualRate: 8.5, tenureYears: 5 };
      const loanB = { principal: 100000, annualRate: 7.5, tenureYears: 5 };
      const comparison = compareLoans(loanA, loanB);

      // Scenario A: ~$2051.65, Scenario B: ~$2003.79
      expect(comparison.scenarioA.monthlyEmi).toBeCloseTo(2051.65, 1);
      expect(comparison.scenarioB.monthlyEmi).toBeCloseTo(2003.79, 1);
      expect(comparison.monthlySavings).toBeCloseTo(47.86, 1);
      expect(comparison.cheaperScenario).toBe('B');
      expect(comparison.monthlyCheaperScenario).toBe('B');
      expect(comparison.totalInterestDiff).toBeGreaterThan(0);
      expect(comparison.interestSavings).toBeCloseTo(2871.37, 0);
    });

    it('correctly identifies when Scenario A is cheaper due to shorter tenure', () => {
      const loanA = { principal: 2500000, annualRate: 8.5, tenureYears: 15 };
      const loanB = { principal: 2500000, annualRate: 8.5, tenureYears: 20 };
      const comparison = compareLoans(loanA, loanB);

      // Scenario A has higher monthly EMI but lower overall interest
      expect(comparison.scenarioA.monthlyEmi).toBeGreaterThan(comparison.scenarioB.monthlyEmi);
      expect(comparison.monthlyCheaperScenario).toBe('B');
      expect(comparison.cheaperScenario).toBe('A'); // Overall total interest is significantly lower
      expect(comparison.interestSavings).toBeGreaterThan(700000);
    });

    it('handles identical scenarios correctly', () => {
      const loan = { principal: 100000, annualRate: 8.5, tenureYears: 5 };
      const comparison = compareLoans(loan, loan);

      expect(comparison.monthlyEmiDiff).toBe(0);
      expect(comparison.totalInterestDiff).toBe(0);
      expect(comparison.totalPayableDiff).toBe(0);
      expect(comparison.cheaperScenario).toBe('identical');
      expect(comparison.monthlyCheaperScenario).toBe('identical');
      expect(comparison.monthlySavings).toBe(0);
    });

    it('ensures independent calculations where modifying loan A does not mutate loan B', () => {
      const loanA = { principal: 100000, annualRate: 8.5, tenureYears: 5 };
      const loanB = { principal: 200000, annualRate: 9.0, tenureYears: 10 };
      const comp1 = compareLoans(loanA, loanB);

      const modifiedLoanA = { ...loanA, principal: 150000 };
      const comp2 = compareLoans(modifiedLoanA, loanB);

      // Scenario B results must be completely unchanged
      expect(comp2.scenarioB.monthlyEmi).toBe(comp1.scenarioB.monthlyEmi);
      expect(comp2.scenarioB.totalPayable).toBe(comp1.scenarioB.totalPayable);
      expect(comp2.scenarioA.monthlyEmi).not.toBe(comp1.scenarioA.monthlyEmi);
    });
  });

  describe('SIP Investment Calculator', () => {
    it('calculates 10-year monthly SIP ($5,000/mo @ 12%)', () => {
      const res = calculateSIP(5000, 12, 10);
      expect(res.totalInvested).toBe(600000);
      expect(res.totalValue).toBeCloseTo(1161695.38, 0);
      expect(res.estimatedReturns).toBeCloseTo(561695.38, 0);
      expect(res.investedPercent).toBe(52);
      expect(res.returnsPercent).toBe(48);
    });

    it('calculates minimum monthly contribution ($100/mo @ 12% for 1 year)', () => {
      const res = calculateSIP(100, 12, 1);
      expect(res.totalInvested).toBe(1200);
      expect(res.totalValue).toBeCloseTo(1280.93, 1);
      expect(res.estimatedReturns).toBeCloseTo(80.93, 1);
    });

    it('calculates long tenure SIP (40 years @ 15% with $10,000/mo)', () => {
      const res = calculateSIP(10000, 15, 40);
      expect(res.totalInvested).toBe(4800000);
      expect(res.totalValue).toBeGreaterThan(300000000);
      expect(res.estimatedReturns).toBeGreaterThan(295000000);
    });

    it('calculates with decimal return rate (11.5%)', () => {
      const res = calculateSIP(5000, 11.5, 5);
      expect(res.totalInvested).toBe(300000);
      expect(res.totalValue).toBeCloseTo(406785.82, 0);
      expect(res.estimatedReturns).toBeCloseTo(106785.82, 0);
    });

    it('handles 0% expected return rate', () => {
      const res = calculateSIP(1000, 0, 5);
      expect(res.totalInvested).toBe(60000);
      expect(res.totalValue).toBe(60000);
      expect(res.estimatedReturns).toBe(0);
    });
  });

  describe('Compound Interest Calculator', () => {
    it('calculates monthly compounding ($10k @ 7% for 5 years)', () => {
      const res = calculateCompoundInterest(10000, 7, 5, 12);
      expect(res.finalBalance).toBeCloseTo(14176.25, 1);
      expect(res.totalInterest).toBeCloseTo(4176.25, 1);
      expect(res.totalPrincipal).toBe(10000);
    });

    it('demonstrates compounding frequency hierarchy (Daily > Monthly > Quarterly > Annual)', () => {
      const daily = calculateCompoundInterest(10000, 10, 5, 365).finalBalance;
      const monthly = calculateCompoundInterest(10000, 10, 5, 12).finalBalance;
      const quarterly = calculateCompoundInterest(10000, 10, 5, 4).finalBalance;
      const annual = calculateCompoundInterest(10000, 10, 5, 1).finalBalance;
      expect(daily).toBeGreaterThan(monthly);
      expect(monthly).toBeGreaterThan(quarterly);
      expect(quarterly).toBeGreaterThan(annual);
    });

    it('handles zero or negative principal and years safely', () => {
      expect(calculateCompoundInterest(0, 5, 5).finalBalance).toBe(0);
      expect(calculateCompoundInterest(10000, 5, 0).finalBalance).toBe(0);
    });
  });

  describe('FD & RD Calculator', () => {
    it('calculates 3-year Fixed Deposit ($50k @ 7.5% quarterly)', () => {
      const res = calculateFD(50000, 7.5, 3);
      expect(res.maturityAmount).toBeCloseTo(62485.83, 1);
      expect(res.totalInterest).toBeCloseTo(12485.83, 1);
    });

    it('calculates 1-year Fixed Deposit ($10k @ 6.5% quarterly)', () => {
      const res = calculateFD(10000, 6.5, 1);
      expect(res.maturityAmount).toBeCloseTo(10666.02, 1);
      expect(res.totalInterest).toBeCloseTo(666.02, 1);
    });

    it('calculates 3-year Recurring Deposit ($5,000/mo @ 7.5%)', () => {
      const res = calculateRD(5000, 7.5, 3);
      expect(res.totalInvested).toBe(180000);
      expect(res.maturityAmount).toBeCloseTo(202265.11, 0);
      expect(res.totalInterest).toBeCloseTo(22265.11, 0);
    });

    it('handles zero amount safely', () => {
      expect(calculateFD(0, 5, 1).maturityAmount).toBe(0);
      expect(calculateRD(0, 5, 1).maturityAmount).toBe(0);
    });
  });

  describe('GST & Sales Tax Calculator', () => {
    it('calculates Tax Exclusive mode (+18% on $1,000)', () => {
      const res = calculateTaxGST(1000, 18, 'add');
      expect(res.netAmount).toBe(1000);
      expect(res.taxAmount).toBe(180);
      expect(res.totalAmount).toBe(1180);
    });

    it('calculates Tax Inclusive reverse extraction (-18% from $1,000)', () => {
      const res = calculateTaxGST(1000, 18, 'sub');
      expect(res.totalAmount).toBe(1000);
      expect(res.netAmount).toBeCloseTo(847.46, 2);
      expect(res.taxAmount).toBeCloseTo(152.54, 2);
    });

    it('handles 0% tax rate in both modes', () => {
      const addRes = calculateTaxGST(1000, 0, 'add');
      expect(addRes.totalAmount).toBe(1000);
      expect(addRes.taxAmount).toBe(0);

      const subRes = calculateTaxGST(1000, 0, 'sub');
      expect(subRes.netAmount).toBe(1000);
      expect(subRes.taxAmount).toBe(0);
    });

    it('handles 100% tax rate in both modes', () => {
      const addRes = calculateTaxGST(1000, 100, 'add');
      expect(addRes.taxAmount).toBe(1000);
      expect(addRes.totalAmount).toBe(2000);

      const subRes = calculateTaxGST(1000, 100, 'sub');
      expect(subRes.netAmount).toBe(500);
      expect(subRes.taxAmount).toBe(500);
    });
  });

  describe('Discount Calculator', () => {
    it('calculates 25% discount on $250 item', () => {
      const res = calculateDiscount(250, 25);
      expect(res.savings).toBe(62.50);
      expect(res.finalPrice).toBe(187.50);
    });

    it('calculates with decimal price and decimal discount ($49.99 @ 33.33%)', () => {
      const res = calculateDiscount(49.99, 33.33);
      expect(res.savings).toBeCloseTo(16.66, 2);
      expect(res.finalPrice).toBeCloseTo(33.33, 2);
    });

    it('handles 0% and 100% discount limits', () => {
      expect(calculateDiscount(100, 0).finalPrice).toBe(100);
      expect(calculateDiscount(100, 0).savings).toBe(0);
      expect(calculateDiscount(100, 100).finalPrice).toBe(0);
      expect(calculateDiscount(100, 100).savings).toBe(100);
    });
  });

  describe('Tip & Bill Splitter', () => {
    it('splits $120 dinner with 15% tip among 3 diners', () => {
      const res = calculateTipSplit(120, 15, 3);
      expect(res.totalTip).toBe(18);
      expect(res.totalBill).toBe(138);
      expect(res.perPersonTotal).toBe(46);
      expect(res.tipPerPerson).toBe(6);
    });
  });

  describe('Currency Converter Engine', () => {
    it('converts USD to EUR using exchange rate ratio', () => {
      // USD to EUR at rate 0.92
      const res = convertCurrency(100, 1.0, 0.92);
      expect(res).toBeCloseTo(92.00, 2);
    });

    it('handles zero amount safely', () => {
      expect(convertCurrency(0, 1.0, 0.92)).toBe(0);
    });
  });

  describe('India-Specific Monetary Formatting & Regional Slabs', () => {
    it('formats numbers in Indian numbering system (Lakhs and Crores)', () => {
      expect(formatIndianCurrency(100000)).toBe('₹1,00,000');
      expect(formatIndianCurrency(2500000)).toBe('₹25,00,000');
      expect(formatIndianCurrency(10000000)).toBe('₹1,00,00,000');
      expect(formatIndianCurrency(15000000, false)).toBe('1,50,00,000');
    });

    it('generates clean compact Indian labels (Lakhs / Crores / k)', () => {
      expect(formatIndianCompact(5000)).toBe('5k');
      expect(formatIndianCompact(100000)).toBe('1 Lakh');
      expect(formatIndianCompact(2500000)).toBe('25 Lakh');
      expect(formatIndianCompact(15000000)).toBe('1.5 Cr');
      expect(formatIndianCompact(20000000)).toBe('2 Cr');
    });

    it('calculates Indian GST invoice split (CGST 9% + SGST 9% on 18% slab)', () => {
      const res = calculateTaxGSTWithSplit(10000, 18, 'add');
      expect(res.totalAmount).toBe(11800);
      expect(res.netAmount).toBe(10000);
      expect(res.taxAmount).toBe(1800);
      expect(res.cgstRate).toBe(9);
      expect(res.sgstRate).toBe(9);
      expect(res.cgstAmount).toBe(900);
      expect(res.sgstAmount).toBe(900);
    });

    it('calculates Indian home loan benchmark (₹25 Lakhs @ 8.5% for 20 years)', () => {
      const res = calculateEMI(2500000, 8.5, 20);
      // 25L at 8.5% for 20 years -> monthly EMI is ~₹21,695.58
      expect(res.monthlyEmi).toBeCloseTo(21695.58, 1);
      expect(res.totalPayable).toBeCloseTo(5206939.40, 0);
      expect(res.totalInterest).toBeCloseTo(2706939.40, 0);
    });

    it('calculates Indian dining bill split (₹1,800 with 10% tip among 3 people)', () => {
      const res = calculateTipSplit(1800, 10, 3);
      expect(res.totalTip).toBe(180);
      expect(res.totalBill).toBe(1980);
      expect(res.perPersonTotal).toBe(660);
      expect(res.tipPerPerson).toBe(60);
    });
  });

  describe('Freelance Hourly Rate Calculator', () => {
    it('calculates sustainable hourly rate from target salary ($100k)', () => {
      const res = calculateFreelanceRate({
        targetAnnualSalary: 100000,
        billableHoursPerWeek: 25,
        vacationWeeks: 4,
        annualExpenses: 5000,
        profitMarginPercent: 15,
        taxBufferPercent: 25
      });
      expect(res.totalWorkingWeeks).toBe(48);
      expect(res.totalBillableHoursPerYear).toBe(1200);
      expect(res.hourlyRate).toBeGreaterThan(120);
      expect(res.effectiveAnnualGross).toBeGreaterThan(150000);
    });
  });

  describe('Startup Runway & Burn Rate Estimator', () => {
    it('calculates runway months for standard burn profile', () => {
      const res = calculateStartupRunway({
        cashBalance: 300000,
        monthlyRevenue: 10000,
        monthlyRevenueGrowthPercent: 0,
        monthlyExpenses: 40000,
        monthlyExpenseGrowthPercent: 0
      });
      expect(res.initialNetBurn).toBe(30000);
      expect(res.runwayMonths).toBe(10);
      expect(res.zeroCashMonth).toBe(10);
      expect(res.isDefaultAlive).toBe(false);
    });

    it('identifies default alive startup when revenue outpaces expenses', () => {
      const res = calculateStartupRunway({
        cashBalance: 500000,
        monthlyRevenue: 40000,
        monthlyRevenueGrowthPercent: 10,
        monthlyExpenses: 50000,
        monthlyExpenseGrowthPercent: 2
      });
      expect(res.isDefaultAlive).toBe(true);
    });
  });

  describe('Crypto & Investment DCA Calculator', () => {
    it('calculates DCA accumulation over 24 months ($200/mo @ 15% return)', () => {
      const res = calculateDca({
        recurringAmount: 200,
        frequency: 'monthly',
        durationMonths: 24,
        averageAnnualGrowthPercent: 15
      });
      expect(res.totalInvested).toBe(4800);
      expect(res.estimatedFutureValue).toBeGreaterThan(4800);
      expect(res.totalProfit).toBeGreaterThan(0);
      expect(res.roiPercent).toBeGreaterThan(10);
    });
  });

  describe('Inflation & Purchasing Power Calculator', () => {
    it('calculates future equivalent cost and purchasing power erosion over 10 years @ 3.5%', () => {
      const res = calculateInflation({
        startingAmount: 1000,
        years: 10,
        averageInflationRatePercent: 3.5
      });
      expect(res.futureEquivalentCost).toBeCloseTo(1410.60, 1);
      expect(res.purchasingPowerLossPercent).toBeCloseTo(29.1, 1);
      expect(res.cumulativeInflationPercent).toBeCloseTo(41.1, 1);
    });
  });
});
