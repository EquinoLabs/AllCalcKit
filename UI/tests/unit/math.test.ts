import { describe, it, expect } from 'vitest';
import {
  calculatePercentageMode1,
  calculatePercentageMode2,
  calculatePercentageMode3,
  convertNumberBase,
  decimalToFraction,
  fractionToDecimal,
  checkPrime
} from '../../src/lib/calculators/math';

describe('Math & Numbers Calculators Engine', () => {
  describe('Percentage Calculator', () => {
    it('Mode 1: What is X% of Y (15% of 200 = 30)', () => {
      expect(calculatePercentageMode1(15, 200)).toBe(30);
    });

    it('Mode 2: X is what % of Y (25 is what % of 100 = 25%)', () => {
      expect(calculatePercentageMode2(25, 100)).toBe(25);
    });

    it('Mode 2: Safe divide-by-zero protection (total = 0)', () => {
      expect(calculatePercentageMode2(50, 0)).toBeNull();
    });

    it('Mode 3: % Change from V1 to V2 (100 to 150 = +50%)', () => {
      expect(calculatePercentageMode3(100, 150)).toBe(50);
    });

    it('Mode 3: % Decrease (200 to 150 = -25%)', () => {
      expect(calculatePercentageMode3(200, 150)).toBe(-25);
    });

    it('Mode 3: Safe divide-by-zero protection (v1 = 0)', () => {
      expect(calculatePercentageMode3(0, 100)).toBeNull();
    });
  });

  describe('Number Base Converter', () => {
    it('converts decimal 255 across all 4 bases simultaneously', () => {
      const res = convertNumberBase('255', 10)!;
      expect(res.decimal).toBe('255');
      expect(res.binary).toBe('11111111');
      expect(res.octal).toBe('377');
      expect(res.hexadecimal).toBe('FF');
    });

    it('converts hexadecimal 1A to decimal 26', () => {
      const res = convertNumberBase('1A', 16)!;
      expect(res.decimal).toBe('26');
      expect(res.binary).toBe('11010');
    });

    it('handles lowercase hexadecimal input ("1a" -> decimal 26)', () => {
      const res = convertNumberBase('1a', 16)!;
      expect(res.decimal).toBe('26');
      expect(res.hexadecimal).toBe('1A');
    });

    it('handles leading and trailing whitespace safely ("  255  ")', () => {
      const res = convertNumberBase('  255  ', 10)!;
      expect(res.decimal).toBe('255');
      expect(res.binary).toBe('11111111');
    });

    it('returns null on invalid base characters', () => {
      expect(convertNumberBase('99', 2)).toBeNull();
      expect(convertNumberBase('', 10)).toBeNull();
    });
  });

  describe('Fraction ↔ Decimal Converter', () => {
    it('converts 0.75 to simplified fraction 3/4', () => {
      const res = decimalToFraction(0.75)!;
      expect(res.simplifiedNumerator).toBe(3);
      expect(res.simplifiedDenominator).toBe(4);
      expect(res.mixedWhole).toBe(0);
    });

    it('converts improper fraction 7/4 to decimal 1.75 and mixed 1 3/4', () => {
      const res = fractionToDecimal(7, 4)!;
      expect(res.decimal).toBe(1.75);
      expect(res.mixedWhole).toBe(1);
      expect(res.mixedRemainder).toBe(3);
    });

    it('handles zero denominator safely (returns null)', () => {
      expect(fractionToDecimal(5, 0)).toBeNull();
    });
  });

  describe('Prime Number Checker', () => {
    it('identifies prime numbers correctly (2, 3, 17, 997)', () => {
      expect(checkPrime(2).isPrime).toBe(true);
      expect(checkPrime(17).isPrime).toBe(true);
      expect(checkPrime(997).isPrime).toBe(true);
    });

    it('identifies large known prime correctly (104,729)', () => {
      expect(checkPrime(104729).isPrime).toBe(true);
    });

    it('decomposes composite 84 into factors and prime factors', () => {
      const res = checkPrime(84);
      expect(res.isPrime).toBe(false);
      expect(res.primeFactors).toEqual([2, 2, 3, 7]);
      expect(res.factors).toContain(42);
      expect(res.nextPrime).toBe(89);
    });

    it('handles non-primes 0 and 1 safely', () => {
      expect(checkPrime(0).isPrime).toBe(false);
      expect(checkPrime(1).isPrime).toBe(false);
    });

    it('handles negative numbers and non-integers safely', () => {
      expect(checkPrime(-17).isPrime).toBe(false);
      expect(checkPrime(3.14).isPrime).toBe(false);
    });
  });
});
