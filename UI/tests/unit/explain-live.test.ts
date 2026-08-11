import { describe, it, expect } from 'vitest';
import { calculateEMI, calculateTipSplit, convertCurrency } from '../../src/lib/calculators/finance';
import { calculateBMIMetric, calculateBMIImperial } from '../../src/lib/calculators/health';
import { calculatePercentageMode1, calculatePercentageMode2, calculatePercentageMode3 } from '../../src/lib/calculators/math';

describe('Feature 1: Live Explain Calculation Engines', () => {
  describe('1. Loan & EMI Live Calculation', () => {
    it('accurately computes monthly installment, total payable, and interest for loan inputs', () => {
      const p = 100000;
      const rate = 8.5;
      const years = 5;
      const months = years * 12;
      const r = rate / 12 / 100;
      const growth = Math.pow(1 + r, months);

      const res = calculateEMI(p, rate, years);
      expect(res.monthlyEmi).toBeCloseTo(2051.65, 2);
      expect(res.totalPayable).toBeCloseTo(123099.19, 2);
      expect(res.totalInterest).toBeCloseTo(23099.19, 2);

      // Verify formula steps match
      const manualEmi = (p * r * growth) / (growth - 1);
      expect(manualEmi).toBeCloseTo(res.monthlyEmi, 5);
      expect(manualEmi * months).toBeCloseTo(res.totalPayable, 5);
    });

    it('handles alternative input sets consistently', () => {
      const res = calculateEMI(250000, 7.0, 15);
      expect(res.monthlyEmi).toBeCloseTo(2247.07, 2);
      expect(res.totalPayable).toBeCloseTo(404472.72, 1);
      expect(res.totalInterest).toBeCloseTo(154472.72, 1);
    });
  });

  describe('2. Currency Conversion Live Math', () => {
    it('accurately calculates converted amount with direct USD base rate', () => {
      const amount = 100;
      const rateUSD = 1.0;
      const rateEUR = 0.92;
      const converted = convertCurrency(amount, rateUSD, rateEUR);
      expect(converted).toBeCloseTo(92.0, 2);
    });

    it('accurately calculates cross-rate conversion via USD baseline', () => {
      const amount = 100;
      const rateEUR = 0.92;
      const rateINR = 83.85;
      const converted = convertCurrency(amount, rateEUR, rateINR);
      const effectiveRate = rateINR / rateEUR;
      expect(converted).toBeCloseTo(amount * effectiveRate, 4);
      expect(converted).toBeCloseTo(9114.13, 2);
    });
  });

  describe('3. BMI Live Calculation (Metric & Imperial)', () => {
    it('accurately computes metric BMI: weight(kg) / (height(m))^2', () => {
      const weightKg = 70;
      const heightCm = 175;
      const res = calculateBMIMetric(weightKg, heightCm);
      const m = heightCm / 100;
      const expectedBmi = weightKg / (m * m);

      expect(res.bmi).toBeCloseTo(22.9, 1);
      expect(res.category).toBe('Normal Weight');
      expect(expectedBmi).toBeCloseTo(22.857, 3);
    });

    it('accurately computes imperial BMI: (weight(lbs) * 703) / (height(inches))^2', () => {
      const weightLbs = 154;
      const heightFt = 5;
      const heightIn = 9;
      const totalInches = heightFt * 12 + heightIn; // 69 inches
      const res = calculateBMIImperial(weightLbs, totalInches);
      const expectedBmi = (weightLbs / (totalInches * totalInches)) * 703;

      expect(res.bmi).toBeCloseTo(22.7, 1);
      expect(res.category).toBe('Normal Weight');
      expect(expectedBmi).toBeCloseTo(22.74, 2);
    });
  });

  describe('4. Percentage Suite Live Math Across 3 Modes', () => {
    it('Mode 1: (X / 100) * Y', () => {
      expect(calculatePercentageMode1(15, 200)).toBe(30);
      expect(calculatePercentageMode1(25, 400)).toBe(100);
      expect(calculatePercentageMode1(0, 500)).toBe(0);
    });

    it('Mode 2: (X / Y) * 100', () => {
      expect(calculatePercentageMode2(45, 150)).toBe(30);
      expect(calculatePercentageMode2(25, 100)).toBe(25);
      expect(calculatePercentageMode2(50, 0)).toBeNull(); // Division by 0 guard
    });

    it('Mode 3: ((V2 - V1) / |V1|) * 100', () => {
      expect(calculatePercentageMode3(80, 100)).toBe(25); // +25%
      expect(calculatePercentageMode3(100, 80)).toBe(-20); // -20%
      expect(calculatePercentageMode3(0, 100)).toBeNull(); // Division by 0 guard
    });
  });

  describe('5. Tip & Bill Split Live Math', () => {
    it('accurately calculates tip, grand total, and per person split', () => {
      const bill = 120;
      const tipPct = 15;
      const diners = 3;

      const res = calculateTipSplit(bill, tipPct, diners);
      expect(res.totalTip).toBeCloseTo(18.0, 2);
      expect(res.totalBill).toBeCloseTo(138.0, 2);
      expect(res.perPersonTotal).toBeCloseTo(46.0, 2);
      expect(res.tipPerPerson).toBeCloseTo(6.0, 2);
    });

    it('handles 1 diner without error', () => {
      const res = calculateTipSplit(75, 20, 1);
      expect(res.totalTip).toBeCloseTo(15.0, 2);
      expect(res.totalBill).toBeCloseTo(90.0, 2);
      expect(res.perPersonTotal).toBeCloseTo(90.0, 2);
      expect(res.tipPerPerson).toBeCloseTo(15.0, 2);
    });
  });
});
