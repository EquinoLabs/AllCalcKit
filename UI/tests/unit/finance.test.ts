import { describe, it, expect } from 'vitest';
import {
  calculateEMI,
  calculateSIP,
  calculateCompoundInterest,
  calculateFD,
  calculateRD,
  calculateTaxGST,
  calculateDiscount,
  calculateTipSplit,
  convertCurrency
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
});
