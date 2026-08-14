import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseQueryParams,
  serializeQueryParams,
  generateShareUrl,
  copyToClipboard,
  shareResult,
  LOAN_EMI_SCHEMA,
  RENT_VS_BUY_SCHEMA
} from '../../src/utils/share';

describe('Feature 3: Shareable Results — Shared Utilities (src/utils/share.ts)', () => {

  describe('1. URL Query Parameter Serialization (serializeQueryParams)', () => {
    it('serializes simple key-value pairs into query string', () => {
      const inputs = { amount: 2500000, rate: 8.5, years: 20, currency: 'INR' };
      const qs = serializeQueryParams(inputs);
      expect(qs).toBe('amount=2500000&rate=8.5&years=20&currency=INR');
    });

    it('omits undefined, null, NaN, and empty string properties', () => {
      const inputs = {
        amount: 100000,
        rate: NaN,
        years: undefined,
        note: null,
        empty: '',
        currency: 'USD'
      };
      const qs = serializeQueryParams(inputs);
      expect(qs).toBe('amount=100000&currency=USD');
    });

    it('formats floating point numbers cleanly without trailing zeros', () => {
      const inputs = { rate: 8.5000001, tax: 0.4000 };
      const qs = serializeQueryParams(inputs);
      expect(qs).toBe('rate=8.5&tax=0.4');
    });

    it('handles empty or non-object values safely', () => {
      expect(serializeQueryParams({} as any)).toBe('');
      expect(serializeQueryParams(null as any)).toBe('');
      expect(serializeQueryParams(undefined as any)).toBe('');
    });
  });

  describe('2. Share URL Generation (generateShareUrl)', () => {
    it('generates share URL from pathname and parameter object', () => {
      const url = generateShareUrl('/finance/loan-emi', {
        amount: 2500000,
        rate: 8.5,
        years: 20,
        currency: 'INR'
      });
      expect(url).toContain('/finance/loan-emi?amount=2500000&rate=8.5&years=20&currency=INR');
    });

    it('strips existing query parameters from base URL before appending new ones', () => {
      const url = generateShareUrl('/finance/loan-emi?oldParam=123', {
        amount: 500000,
        currency: 'USD'
      });
      expect(url).not.toContain('oldParam');
      expect(url).toContain('/finance/loan-emi?amount=500000&currency=USD');
    });

    it('returns clean base path if parameter object is empty', () => {
      const url = generateShareUrl('/finance/loan-emi', {});
      expect(url).toBe('/finance/loan-emi');
    });
  });

  describe('3. URL Query Parameter Deserialization (parseQueryParams)', () => {
    it('parses valid Loan EMI query string correctly', () => {
      const qs = '?amount=2500000&rate=8.5&years=20&currency=INR';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(hasParams).toBe(true);
      expect(values.amount).toBe(2500000);
      expect(values.rate).toBe(8.5);
      expect(values.years).toBe(20);
      expect(values.currency).toBe('INR');
    });

    it('parses Rent vs. Buy query string with standard parameter names', () => {
      const qs = '?unit=INR&years=15&rent=25000&rentGrowth=5&miscCosts=5000&investmentReturn=11&homePrice=7500000&downPayment=20&mortgageRate=8.5&propertyTax=0.4&maintenance=1&appreciation=4';
      const { values, hasParams } = parseQueryParams(qs, RENT_VS_BUY_SCHEMA);

      expect(hasParams).toBe(true);
      expect(values.unit).toBe('INR');
      expect(values.years).toBe(15);
      expect(values.rent).toBe(25000);
      expect(values.rentGrowth).toBe(5);
      expect(values.miscCosts).toBe(5000);
      expect(values.investmentReturn).toBe(11);
      expect(values.homePrice).toBe(7500000);
      expect(values.downPayment).toBe(20);
      expect(values.mortgageRate).toBe(8.5);
      expect(values.propertyTax).toBe(0.4);
      expect(values.maintenance).toBe(1);
      expect(values.appreciation).toBe(4);
    });

    it('parses Rent vs. Buy query string using short aliases (misc, investment, down, mortgage, tax)', () => {
      const qs = '?unit=INR&years=15&rent=25000&rentGrowth=5&misc=5000&investment=11&homePrice=7500000&down=20&mortgage=8.5&tax=0.4&maintenance=1&appreciation=4';
      const { values, hasParams } = parseQueryParams(qs, RENT_VS_BUY_SCHEMA);

      expect(hasParams).toBe(true);
      expect(values.miscCosts).toBe(5000);
      expect(values.investmentReturn).toBe(11);
      expect(values.downPayment).toBe(20);
      expect(values.mortgageRate).toBe(8.5);
      expect(values.propertyTax).toBe(0.4);
    });

    it('accepts full URLs and URLSearchParams objects directly', () => {
      const fullUrl = 'https://allcalckit.com/finance/loan-emi?amount=150000&rate=7.2&years=10&currency=USD';
      const res1 = parseQueryParams(fullUrl, LOAN_EMI_SCHEMA);
      expect(res1.hasParams).toBe(true);
      expect(res1.values.amount).toBe(150000);

      const sp = new URLSearchParams('amount=300000&rate=6.5&years=15');
      const res2 = parseQueryParams(sp, LOAN_EMI_SCHEMA);
      expect(res2.hasParams).toBe(true);
      expect(res2.values.amount).toBe(300000);
    });
  });

  describe('4. Malformed Query Parameters & Graceful Validation', () => {
    it('ignores non-numeric strings for numeric parameters', () => {
      const qs = '?amount=abc&rate=bad&years=ten&currency=USD';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(values.amount).toBeUndefined();
      expect(values.rate).toBeUndefined();
      expect(values.years).toBeUndefined();
      expect(values.currency).toBe('USD');
      expect(hasParams).toBe(true);
    });

    it('ignores out-of-bounds numbers (below min or above max)', () => {
      const qs = '?amount=-50000&rate=100&years=0';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(values.amount).toBeUndefined(); // min is 1000
      expect(values.rate).toBeUndefined();   // max is 30
      expect(values.years).toBeUndefined();  // min is 1
      expect(hasParams).toBe(false);
    });

    it('ignores disallowed string enum values (e.g. invalid currency)', () => {
      const qs = '?amount=100000&currency=BITCOIN';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(values.currency).toBeUndefined();
      expect(values.amount).toBe(100000);
      expect(hasParams).toBe(true);
    });

    it('safely handles empty, null, undefined, or corrupt query strings without crashing', () => {
      expect(parseQueryParams('', LOAN_EMI_SCHEMA).hasParams).toBe(false);
      expect(parseQueryParams(null, LOAN_EMI_SCHEMA).hasParams).toBe(false);
      expect(parseQueryParams(undefined, LOAN_EMI_SCHEMA).hasParams).toBe(false);
      expect(parseQueryParams('?&&&&&&=====', LOAN_EMI_SCHEMA).hasParams).toBe(false);
      expect(parseQueryParams('?%E0%A4%A', LOAN_EMI_SCHEMA).hasParams).toBe(false);
    });
  });

  describe('5. Roundtrip Serialization & Deserialization', () => {
    it('preserves Loan EMI values across roundtrip serialize -> parse', () => {
      const original = {
        amount: 2500000,
        rate: 8.5,
        years: 20,
        currency: 'INR'
      };
      const serialized = serializeQueryParams(original);
      const { values } = parseQueryParams(serialized, LOAN_EMI_SCHEMA);

      expect(values.amount).toBe(original.amount);
      expect(values.rate).toBe(original.rate);
      expect(values.years).toBe(original.years);
      expect(values.currency).toBe(original.currency);
    });

    it('preserves Loan EMI comparison mode values across roundtrip serialize -> parse', () => {
      const original = {
        compare: true,
        amountA: 5000000,
        rateA: 9.0,
        yearsA: 20,
        amountB: 5000000,
        rateB: 7.0,
        yearsB: 20,
        currency: 'INR'
      };
      const serialized = serializeQueryParams(original);
      expect(serialized).toContain('compare=true');
      expect(serialized).toContain('amountA=5000000');
      expect(serialized).toContain('rateA=9');
      expect(serialized).toContain('yearsA=20');
      expect(serialized).toContain('amountB=5000000');
      expect(serialized).toContain('rateB=7');
      expect(serialized).toContain('yearsB=20');
      expect(serialized).toContain('currency=INR');

      const { values, hasParams } = parseQueryParams(serialized, LOAN_EMI_SCHEMA);
      expect(hasParams).toBe(true);
      expect(values.compare).toBe(true);
      expect(values.amountA).toBe(5000000);
      expect(values.rateA).toBe(9);
      expect(values.yearsA).toBe(20);
      expect(values.amountB).toBe(5000000);
      expect(values.rateB).toBe(7);
      expect(values.yearsB).toBe(20);
      expect(values.currency).toBe('INR');
    });

    it('parses comparison mode query string using aliases (comp, principalA, interestRateB, etc)', () => {
      const qs = '?comp=true&principalA=300000&interestRateA=8.5&tenureA=10&principalB=350000&interestRateB=7.2&tenureB=15&curr=USD';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(hasParams).toBe(true);
      expect(values.compare).toBe(true);
      expect(values.amountA).toBe(300000);
      expect(values.rateA).toBe(8.5);
      expect(values.yearsA).toBe(10);
      expect(values.amountB).toBe(350000);
      expect(values.rateB).toBe(7.2);
      expect(values.yearsB).toBe(15);
      expect(values.currency).toBe('USD');
    });

    it('gracefully handles malformed parameters in comparison mode URLs', () => {
      const qs = '?compare=true&amountA=abc&rateA=8.5&yearsA=5&amountB=5000000&rateB=-100&yearsB=9999&currency=INVALID';
      const { values, hasParams } = parseQueryParams(qs, LOAN_EMI_SCHEMA);

      expect(hasParams).toBe(true);
      expect(values.compare).toBe(true);
      expect(values.amountA).toBeUndefined(); // dropped (NaN)
      expect(values.rateA).toBe(8.5);
      expect(values.yearsA).toBe(5);
      expect(values.amountB).toBe(5000000);
      expect(values.rateB).toBeUndefined();   // dropped (negative / < min)
      expect(values.yearsB).toBeUndefined();  // dropped (> max 30)
      expect(values.currency).toBeUndefined(); // dropped (not allowed)
    });

    it('preserves all 12 Rent vs. Buy values across roundtrip serialize -> parse', () => {
      const original = {
        unit: 'USD',
        years: 10,
        rent: 2200,
        rentGrowth: 3.5,
        miscCosts: 300,
        investmentReturn: 8.0,
        homePrice: 450000,
        downPayment: 25,
        mortgageRate: 6.8,
        propertyTax: 1.1,
        maintenance: 1.2,
        appreciation: 4.5
      };
      const serialized = serializeQueryParams(original);
      const { values } = parseQueryParams(serialized, RENT_VS_BUY_SCHEMA);

      expect(values).toEqual(original);
    });
  });

  describe('6. Clipboard Copy Helper (copyToClipboard)', () => {
    const originalNavigator = globalThis.navigator;
    const originalDocument = (globalThis as any).document;

    afterEach(() => {
      Object.defineProperty(globalThis, 'navigator', { value: originalNavigator, configurable: true, writable: true });
      if (originalDocument) {
        Object.defineProperty(globalThis, 'document', { value: originalDocument, configurable: true, writable: true });
      } else {
        delete (globalThis as any).document;
      }
    });

    it('uses navigator.clipboard.writeText when available', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        configurable: true,
        writable: true
      });

      const success = await copyToClipboard('https://allcalckit.com/finance/loan-emi');
      expect(success).toBe(true);
      expect(writeTextMock).toHaveBeenCalledWith('https://allcalckit.com/finance/loan-emi');
    });

    it('falls back to document.execCommand when navigator.clipboard throws', async () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Permission denied'));
      const execMock = vi.fn().mockReturnValue(true);
      const dummyTextArea = {
        value: '',
        setAttribute: vi.fn(),
        style: {},
        focus: vi.fn(),
        select: vi.fn()
      };

      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        configurable: true,
        writable: true
      });

      Object.defineProperty(globalThis, 'document', {
        value: {
          createElement: vi.fn().mockReturnValue(dummyTextArea),
          body: {
            appendChild: vi.fn(),
            removeChild: vi.fn()
          },
          execCommand: execMock
        },
        configurable: true,
        writable: true
      });

      const success = await copyToClipboard('https://allcalckit.com/finance/loan-emi');
      expect(success).toBe(true);
      expect(execMock).toHaveBeenCalledWith('copy');
    });
  });

  describe('7. Web Share & Fallback (shareResult)', () => {
    const originalNavigator = globalThis.navigator;

    afterEach(() => {
      Object.defineProperty(globalThis, 'navigator', { value: originalNavigator, configurable: true, writable: true });
    });

    it('uses navigator.share when available and succeeds', async () => {
      const shareMock = vi.fn().mockResolvedValue(undefined);
      const canShareMock = vi.fn().mockReturnValue(true);

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          share: shareMock,
          canShare: canShareMock
        },
        configurable: true,
        writable: true
      });

      const res = await shareResult({
        title: 'Loan EMI Result',
        url: 'https://allcalckit.com/finance/loan-emi?amount=100000'
      });

      expect(res.method).toBe('native');
      expect(res.success).toBe(true);
      expect(shareMock).toHaveBeenCalled();
    });

    it('handles user cancellation (AbortError) gracefully without triggering clipboard copy', async () => {
      const abortError = new Error('Share dismissed');
      abortError.name = 'AbortError';
      const shareMock = vi.fn().mockRejectedValue(abortError);
      const writeTextMock = vi.fn();

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          share: shareMock,
          canShare: () => true,
          clipboard: { writeText: writeTextMock }
        },
        configurable: true,
        writable: true
      });

      const res = await shareResult({
        title: 'Loan EMI Result',
        url: 'https://allcalckit.com/finance/loan-emi?amount=100000'
      });

      expect(res.method).toBe('native');
      expect(res.success).toBe(false);
      expect(res.message).toBe('Share cancelled');
      expect(writeTextMock).not.toHaveBeenCalled();
    });

    it('falls back to clipboard copy when navigator.share is unavailable (desktop browser)', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);

      Object.defineProperty(globalThis, 'navigator', {
        value: {
          share: undefined,
          canShare: undefined,
          clipboard: { writeText: writeTextMock }
        },
        configurable: true,
        writable: true
      });

      const res = await shareResult({
        title: 'Rent vs Buy Result',
        url: 'https://allcalckit.com/finance/rent-vs-buy?rent=25000'
      });

      expect(res.method).toBe('clipboard');
      expect(res.success).toBe(true);
      expect(res.message).toBe('Link copied!');
      expect(writeTextMock).toHaveBeenCalledWith('https://allcalckit.com/finance/rent-vs-buy?rent=25000');
    });
  });
});
