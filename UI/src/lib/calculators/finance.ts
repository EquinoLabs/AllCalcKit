/**
 * Pure Financial Calculation Engine for AllCalcKit
 */

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
  principalPercent: number;
  interestPercent: number;
}

export function calculateEMI(principal: number, annualRate: number, tenureYears: number): EmiResult {
  if (principal <= 0 || tenureYears <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0, principalPercent: 100, interestPercent: 0 };
  }

  const months = tenureYears * 12;
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / months;
    return {
      monthlyEmi: emi,
      totalInterest: 0,
      totalPayable: principal,
      principalPercent: 100,
      interestPercent: 0,
    };
  }

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayable = emi * months;
  const totalInterest = totalPayable - principal;
  const principalPct = Math.round((principal / totalPayable) * 100);
  const interestPct = 100 - principalPct;

  return {
    monthlyEmi: emi,
    totalInterest,
    totalPayable,
    principalPercent: principalPct,
    interestPercent: interestPct,
  };
}

export interface LoanScenarioInput {
  principal: number;
  annualRate: number;
  tenureYears: number;
}

export interface LoanComparisonResult {
  scenarioA: EmiResult & LoanScenarioInput;
  scenarioB: EmiResult & LoanScenarioInput;
  monthlyEmiDiff: number; // positive: A > B, negative: B > A
  totalInterestDiff: number; // positive: A > B, negative: B > A
  totalPayableDiff: number; // positive: A > B, negative: B > A
  cheaperScenario: 'A' | 'B' | 'identical';
  monthlyCheaperScenario: 'A' | 'B' | 'identical';
  monthlySavings: number;
  interestSavings: number;
  totalCostSavings: number;
}

export function compareLoans(
  loanA: LoanScenarioInput,
  loanB: LoanScenarioInput
): LoanComparisonResult {
  const resA = calculateEMI(loanA.principal, loanA.annualRate, loanA.tenureYears);
  const resB = calculateEMI(loanB.principal, loanB.annualRate, loanB.tenureYears);

  const monthlyEmiDiff = resA.monthlyEmi - resB.monthlyEmi;
  const totalInterestDiff = resA.totalInterest - resB.totalInterest;
  const totalPayableDiff = resA.totalPayable - resB.totalPayable;

  let cheaperScenario: 'A' | 'B' | 'identical' = 'identical';
  if (Math.abs(totalPayableDiff) >= 0.5) {
    cheaperScenario = totalPayableDiff > 0 ? 'B' : 'A';
  }

  let monthlyCheaperScenario: 'A' | 'B' | 'identical' = 'identical';
  if (Math.abs(monthlyEmiDiff) >= 0.5) {
    monthlyCheaperScenario = monthlyEmiDiff > 0 ? 'B' : 'A';
  }

  return {
    scenarioA: { ...resA, ...loanA },
    scenarioB: { ...resB, ...loanB },
    monthlyEmiDiff,
    totalInterestDiff,
    totalPayableDiff,
    cheaperScenario,
    monthlyCheaperScenario,
    monthlySavings: Math.abs(monthlyEmiDiff),
    interestSavings: Math.abs(totalInterestDiff),
    totalCostSavings: Math.abs(totalPayableDiff),
  };
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  investedPercent: number;
  returnsPercent: number;
}

export function calculateSIP(monthlyInvestment: number, annualReturnRate: number, years: number): SipResult {
  const months = years * 12;
  const totalInvested = monthlyInvestment * months;

  if (monthlyInvestment <= 0 || years <= 0) {
    return { totalInvested: 0, estimatedReturns: 0, totalValue: 0, investedPercent: 100, returnsPercent: 0 };
  }

  if (annualReturnRate <= 0) {
    return { totalInvested, estimatedReturns: 0, totalValue: totalInvested, investedPercent: 100, returnsPercent: 0 };
  }

  const i = annualReturnRate / 12 / 100;
  // Annuity-due monthly compounding formula
  const totalValue = monthlyInvestment * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  const estimatedReturns = totalValue - totalInvested;
  const investedPct = Math.round((totalInvested / totalValue) * 100);
  const returnsPct = 100 - investedPct;

  return {
    totalInvested,
    estimatedReturns,
    totalValue,
    investedPercent: investedPct,
    returnsPercent: returnsPct,
  };
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalPrincipal: number;
  totalInterest: number;
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  frequency: number = 12 // 1: Annual, 4: Quarterly, 12: Monthly, 365: Daily
): CompoundInterestResult {
  if (principal <= 0 || years <= 0) {
    return { finalBalance: 0, totalPrincipal: 0, totalInterest: 0 };
  }

  const r = annualRate / 100;
  const n = frequency > 0 ? frequency : 12;
  const t = years;

  const finalBalance = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = finalBalance - principal;

  return {
    finalBalance,
    totalPrincipal: principal,
    totalInterest,
  };
}

export interface FdRdResult {
  maturityAmount: number;
  totalInvested: number;
  totalInterest: number;
}

export function calculateFD(principal: number, annualRate: number, years: number): FdRdResult {
  if (principal <= 0 || years <= 0) {
    return { maturityAmount: 0, totalInvested: 0, totalInterest: 0 };
  }

  const r = annualRate / 100;
  const n = 4; // Standard commercial bank quarterly compounding
  const t = years;
  const maturityAmount = principal * Math.pow(1 + r / n, n * t);
  const totalInterest = maturityAmount - principal;

  return {
    maturityAmount,
    totalInvested: principal,
    totalInterest,
  };
}

export function calculateRD(monthlyDeposit: number, annualRate: number, years: number): FdRdResult {
  if (monthlyDeposit <= 0 || years <= 0) {
    return { maturityAmount: 0, totalInvested: 0, totalInterest: 0 };
  }

  const r = annualRate / 100;
  const n = 4; // Quarterly compounding
  const months = years * 12;
  const totalInvested = monthlyDeposit * months;

  let maturityAmount = 0;
  for (let m = 1; m <= months; m++) {
    const t = (months - m + 1) / 12;
    maturityAmount += monthlyDeposit * Math.pow(1 + r / n, n * t);
  }
  const totalInterest = maturityAmount - totalInvested;

  return {
    maturityAmount,
    totalInvested,
    totalInterest,
  };
}

export interface TaxGstResult {
  totalAmount: number;
  netAmount: number;
  taxAmount: number;
}

export interface TaxGstSplitResult extends TaxGstResult {
  cgstRate: number;
  sgstRate: number;
  cgstAmount: number;
  sgstAmount: number;
}

export function calculateTaxGST(amount: number, taxRate: number, mode: 'add' | 'sub'): TaxGstResult {
  if (amount <= 0 || taxRate < 0) {
    return { totalAmount: 0, netAmount: 0, taxAmount: 0 };
  }

  if (mode === 'add') {
    // Tax Exclusive: Add tax to net amount
    const tax = amount * (taxRate / 100);
    const total = amount + tax;
    return { totalAmount: total, netAmount: amount, taxAmount: tax };
  } else {
    // Tax Inclusive: Extract embedded tax from gross amount
    const net = amount / (1 + taxRate / 100);
    const tax = amount - net;
    return { totalAmount: amount, netAmount: net, taxAmount: tax };
  }
}

export function calculateTaxGSTWithSplit(amount: number, taxRate: number, mode: 'add' | 'sub'): TaxGstSplitResult {
  const base = calculateTaxGST(amount, taxRate, mode);
  const halfRate = taxRate / 2;
  const halfTax = base.taxAmount / 2;

  return {
    ...base,
    cgstRate: halfRate,
    sgstRate: halfRate,
    cgstAmount: halfTax,
    sgstAmount: halfTax
  };
}

/**
 * Formats a number according to the Indian Numbering System (Lakhs and Crores).
 */
export function formatIndianCurrency(num: number, includeSymbol: boolean = true): string {
  const rounded = Math.round(num);
  const formatted = rounded.toLocaleString('en-IN');
  return includeSymbol ? `₹${formatted}` : formatted;
}

/**
 * Compact Indian currency formatting (e.g. 25 Lakh, 1.50 Cr)
 */
export function formatIndianCompact(num: number): string {
  if (num >= 10000000) {
    const cr = (num / 10000000).toFixed(2).replace(/\.00$/, '').replace(/(\.[1-9])0$/, '$1');
    return `${cr} Cr`;
  }
  if (num >= 100000) {
    const l = (num / 100000).toFixed(2).replace(/\.00$/, '').replace(/(\.[1-9])0$/, '$1');
    return `${l} Lakh`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return num.toString();
}

export interface DiscountResult {
  finalPrice: number;
  savings: number;
  originalPrice: number;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): DiscountResult {
  if (originalPrice <= 0 || discountPercent < 0) {
    return { finalPrice: 0, savings: 0, originalPrice: Math.max(0, originalPrice) };
  }

  const pct = Math.min(100, Math.max(0, discountPercent));
  const savings = originalPrice * (pct / 100);
  const finalPrice = originalPrice - savings;

  return {
    finalPrice,
    savings,
    originalPrice,
  };
}

export interface TipSplitResult {
  perPersonTotal: number;
  totalTip: number;
  tipPerPerson: number;
  totalBill: number;
}

export function calculateTipSplit(billAmount: number, tipPercent: number, diners: number): TipSplitResult {
  if (billAmount <= 0 || diners <= 0) {
    return { perPersonTotal: 0, totalTip: 0, tipPerPerson: 0, totalBill: 0 };
  }

  const tip = billAmount * (tipPercent / 100);
  const totalBill = billAmount + tip;
  const numPeople = Math.max(1, diners);

  return {
    perPersonTotal: totalBill / numPeople,
    totalTip: tip,
    tipPerPerson: tip / numPeople,
    totalBill,
  };
}

export function convertCurrency(amount: number, fromRateToUSD: number, toRateToUSD: number): number {
  if (isNaN(amount) || amount <= 0 || fromRateToUSD <= 0 || toRateToUSD <= 0) return 0;
  // Convert from currency to USD baseline, then from USD to target currency
  const inUSD = amount / fromRateToUSD;
  return inUSD * toRateToUSD;
}

export interface RentVsBuyParams {
  monthlyRent: number;
  rentIncreaseRate?: number; // % annual increase (e.g. 3.0)
  rentersInsurance?: number; // annual $ (e.g. 200)
  homePrice: number;
  downPaymentPercent?: number; // % (e.g. 20)
  mortgageRate?: number; // % annual (e.g. 6.5)
  loanTermYears?: number; // years (e.g. 30)
  propertyTaxRate?: number; // % of home value / year (e.g. 1.2)
  homeInsurance?: number; // annual $ (e.g. 1200)
  maintenanceRate?: number; // % of home value / year (e.g. 1.0)
  homeAppreciationRate?: number; // % annual (e.g. 4.0)
  investmentReturnRate?: number; // % annual (e.g. 7.0)
  timeHorizonYears?: number; // years (e.g. 7)
  buyingClosingCostPercent?: number; // % of home price (e.g. 3.0)
  sellingCostPercent?: number; // % of sale price (e.g. 6.0)
}

export interface YearlyComparisonPoint {
  year: number;
  netCostRent: number;
  netCostBuy: number;
  advantage: 'buy' | 'rent' | 'tie';
  difference: number;
}

export interface RentVsBuyResult {
  timeHorizonYears: number;
  
  // Renting Breakdown
  totalRentPaid: number;
  totalRentersInsurance: number;
  renterInvestmentGrowth: number;
  netCostRent: number;

  // Buying Breakdown
  downPayment: number;
  initialLoan: number;
  monthlyMortgageEmi: number;
  totalMortgagePaid: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
  remainingLoanBalance: number;
  totalPropertyTax: number;
  totalHomeInsurance: number;
  totalMaintenance: number;
  purchaseClosingCost: number;
  futureHomeValue: number;
  sellingCosts: number;
  netHomeEquity: number;
  totalBuyingOutflows: number;
  netCostBuy: number;

  // Final Decision & Breakeven
  costDifference: number; // netCostRent - netCostBuy (positive: buying saves money, negative: renting saves money)
  recommendedAction: 'buy' | 'rent' | 'tie';
  savingsAmount: number;
  breakevenYear: number | null;
  yearlyComparison: YearlyComparisonPoint[];
}

export function calculateRentVsBuy(params: RentVsBuyParams): RentVsBuyResult {
  const monthlyRent = Math.max(0, params.monthlyRent || 0);
  const rentGrowth = Math.max(0, (params.rentIncreaseRate ?? 3.0) / 100);
  const rentersInsurance = monthlyRent > 0 ? Math.max(0, params.rentersInsurance ?? 200) : 0;

  const homePrice = Math.max(0, params.homePrice || 0);
  const downPaymentPct = Math.min(100, Math.max(0, params.downPaymentPercent ?? 20)) / 100;
  const mortgageRate = Math.max(0, params.mortgageRate ?? 6.5) / 100;
  const loanTermYears = Math.max(1, params.loanTermYears ?? 30);
  const propertyTaxRate = Math.max(0, params.propertyTaxRate ?? 1.2) / 100;
  const homeInsurance = homePrice > 0 ? Math.max(0, params.homeInsurance ?? 1200) : 0;
  const maintenanceRate = Math.max(0, params.maintenanceRate ?? 1.0) / 100;
  const appreciationRate = Math.max(-0.5, (params.homeAppreciationRate ?? 4.0) / 100);
  const investmentReturnRate = Math.max(0, (params.investmentReturnRate ?? 7.0) / 100);
  const timeHorizonYears = Math.max(1, Math.min(30, Math.round(params.timeHorizonYears ?? 7)));
  const buyClosingPct = Math.max(0, (params.buyingClosingCostPercent ?? 3.0) / 100);
  const sellClosingPct = Math.max(0, (params.sellingCostPercent ?? 6.0) / 100);

  // Upfront Buying Numbers
  const downPayment = homePrice * downPaymentPct;
  const initialLoan = Math.max(0, homePrice - downPayment);
  const purchaseClosingCost = homePrice * buyClosingPct;
  const initialCapitalRenter = downPayment + purchaseClosingCost;

  // Mortgage Amortization Terms
  const monthlyRate = mortgageRate / 12;
  const totalLoanMonths = loanTermYears * 12;
  let monthlyEmi = 0;
  if (initialLoan > 0) {
    if (monthlyRate === 0) {
      monthlyEmi = initialLoan / totalLoanMonths;
    } else {
      const growthFactor = Math.pow(1 + monthlyRate, totalLoanMonths);
      monthlyEmi = (initialLoan * monthlyRate * growthFactor) / (growthFactor - 1);
    }
  }

  // Yearly Simulation (1 to 30 years) to find exact metrics & breakeven
  const maxSimYears = 30;
  const yearlyComparison: YearlyComparisonPoint[] = [];
  let breakevenYear: number | null = null;

  let simRentPaid = 0;
  let simPropertyTax = 0;
  let simMaintenance = 0;

  let selectedRentResult = {
    totalRentPaid: 0,
    totalRentersInsurance: 0,
    renterInvestmentGrowth: 0,
    netCostRent: 0,
  };

  let selectedBuyResult = {
    totalMortgagePaid: 0,
    totalPrincipalPaid: 0,
    totalInterestPaid: 0,
    remainingLoanBalance: 0,
    totalPropertyTax: 0,
    totalHomeInsurance: 0,
    totalMaintenance: 0,
    futureHomeValue: 0,
    sellingCosts: 0,
    netHomeEquity: 0,
    totalBuyingOutflows: 0,
    netCostBuy: 0,
  };

  for (let yr = 1; yr <= maxSimYears; yr++) {
    // Current year home value at beginning of year for tax / maintenance
    const startYrHomeValue = homePrice * Math.pow(1 + appreciationRate, yr - 1);
    simPropertyTax += startYrHomeValue * propertyTaxRate;
    simMaintenance += startYrHomeValue * maintenanceRate;

    // Rent paid in current year
    const yrMonthlyRent = monthlyRent * Math.pow(1 + rentGrowth, yr - 1);
    simRentPaid += yrMonthlyRent * 12;

    // Total renters insurance through year yr
    const totRentersIns = yr * rentersInsurance;

    // Investment return on initial down payment + closing costs
    const portfolioFutureVal = initialCapitalRenter * Math.pow(1 + investmentReturnRate, yr);
    const renterInvGain = Math.max(0, portfolioFutureVal - initialCapitalRenter);
    const yrNetCostRent = simRentPaid + totRentersIns - renterInvGain;

    // Buyer Amortization status at year yr
    const elapsedMonths = Math.min(yr * 12, totalLoanMonths);
    const totMortgagePaid = monthlyEmi * elapsedMonths;
    let remainingLoan = 0;
    if (initialLoan > 0 && elapsedMonths < totalLoanMonths) {
      if (monthlyRate === 0) {
        remainingLoan = initialLoan - (monthlyEmi * elapsedMonths);
      } else {
        const fullGrowth = Math.pow(1 + monthlyRate, totalLoanMonths);
        const elapsedGrowth = Math.pow(1 + monthlyRate, elapsedMonths);
        remainingLoan = initialLoan * ((fullGrowth - elapsedGrowth) / (fullGrowth - 1));
      }
    }
    const totPrincipalPaid = Math.max(0, initialLoan - remainingLoan);
    const totInterestPaid = Math.max(0, totMortgagePaid - totPrincipalPaid);

    const endYrHomeValue = homePrice * Math.pow(1 + appreciationRate, yr);
    const yrSellingCost = endYrHomeValue * sellClosingPct;
    const yrHomeInsurance = yr * homeInsurance;

    const totBuyingOutflows = downPayment + purchaseClosingCost + totMortgagePaid + simPropertyTax + simMaintenance + yrHomeInsurance;
    const netSaleProceeds = endYrHomeValue - yrSellingCost - remainingLoan;
    const yrNetCostBuy = totBuyingOutflows - netSaleProceeds;

    const diff = yrNetCostRent - yrNetCostBuy;
    const adv: 'buy' | 'rent' | 'tie' = Math.abs(diff) < 1 ? 'tie' : (diff > 0 ? 'buy' : 'rent');

    if (breakevenYear === null && adv === 'buy') {
      breakevenYear = yr;
    }

    yearlyComparison.push({
      year: yr,
      netCostRent: yrNetCostRent,
      netCostBuy: yrNetCostBuy,
      advantage: adv,
      difference: Math.abs(diff),
    });

    if (yr === timeHorizonYears) {
      selectedRentResult = {
        totalRentPaid: simRentPaid,
        totalRentersInsurance: totRentersIns,
        renterInvestmentGrowth: renterInvGain,
        netCostRent: yrNetCostRent,
      };

      selectedBuyResult = {
        totalMortgagePaid: totMortgagePaid,
        totalPrincipalPaid: totPrincipalPaid,
        totalInterestPaid: totInterestPaid,
        remainingLoanBalance: remainingLoan,
        totalPropertyTax: simPropertyTax,
        totalHomeInsurance: yrHomeInsurance,
        totalMaintenance: simMaintenance,
        futureHomeValue: endYrHomeValue,
        sellingCosts: yrSellingCost,
        netHomeEquity: endYrHomeValue - remainingLoan,
        totalBuyingOutflows: totBuyingOutflows,
        netCostBuy: yrNetCostBuy,
      };
    }
  }

  const costDifference = selectedRentResult.netCostRent - selectedBuyResult.netCostBuy;
  const recommendedAction: 'buy' | 'rent' | 'tie' = 
    Math.abs(costDifference) < 1 ? 'tie' : (costDifference > 0 ? 'buy' : 'rent');

  return {
    timeHorizonYears,
    ...selectedRentResult,
    downPayment,
    initialLoan,
    monthlyMortgageEmi: monthlyEmi,
    purchaseClosingCost,
    ...selectedBuyResult,
    costDifference,
    recommendedAction,
    savingsAmount: Math.abs(costDifference),
    breakevenYear,
    yearlyComparison,
  };
}

