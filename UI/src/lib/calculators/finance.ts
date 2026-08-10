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
