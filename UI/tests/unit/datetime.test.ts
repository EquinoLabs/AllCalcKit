import { describe, it, expect } from 'vitest';
import {
  calculateDateDifference,
  calculateDateAddition,
  convertUnixTimestamp
} from '../../src/lib/calculators/datetime';
import { calculateAge } from '../../src/lib/calculators/health';

describe('Date & Time Calculators Engine', () => {
  describe('Date Difference Calculator', () => {
    it('calculates full calendar difference', () => {
      const d1 = new Date('2026-01-01T00:00:00');
      const d2 = new Date('2026-12-31T00:00:00');
      const res = calculateDateDifference(d1, d2)!;
      expect(res.totalDays).toBe(364);
      expect(res.weeks).toBe(52);
      expect(res.totalHours).toBe(8736);
    });

    it('handles same start and end date (0 days difference)', () => {
      const d = new Date('2026-06-15T00:00:00');
      const res = calculateDateDifference(d, d)!;
      expect(res.totalDays).toBe(0);
      expect(res.weeks).toBe(0);
      expect(res.totalHours).toBe(0);
    });
  });

  describe('Date Add / Subtract Calculator', () => {
    it('adds 90 days to March 1, 2026', () => {
      const d = new Date('2026-03-01T00:00:00');
      const res = calculateDateAddition(d, 0, 0, 90)!;
      expect(res.getMonth()).toBe(4); // May (0-indexed)
      expect(res.getDate()).toBe(30);
    });

    it('subtracts 2 years from anchor date', () => {
      const d = new Date('2026-06-15T00:00:00');
      const res = calculateDateAddition(d, 2, 0, 0, true)!;
      expect(res.getFullYear()).toBe(2024);
    });

    it('handles month-end rollover (January 31 + 1 month in non-leap year)', () => {
      const d = new Date('2025-01-31T00:00:00');
      const res = calculateDateAddition(d, 0, 1, 0)!;
      // In JavaScript Date, Jan 31 + 1 mo rolls past 28-day Feb into March 3
      expect(res.getMonth()).toBe(2); // March
      expect(res.getDate()).toBe(3);
    });

    it('handles leap year date addition (Feb 28, 2024 + 1 day = Feb 29, 2024)', () => {
      const d = new Date('2024-02-28T00:00:00');
      const res = calculateDateAddition(d, 0, 0, 1)!;
      expect(res.getMonth()).toBe(1); // February
      expect(res.getDate()).toBe(29);
      expect(res.getFullYear()).toBe(2024);
    });
  });

  describe('Age Calculator Boundary Cases', () => {
    it('calculates same-day birthday (0 years, 0 months, 0 days)', () => {
      const dob = new Date('2026-05-10T00:00:00');
      const target = new Date('2026-05-10T00:00:00');
      const res = calculateAge(dob, target)!;
      expect(res.years).toBe(0);
      expect(res.months).toBe(0);
      expect(res.days).toBe(0);
      expect(res.totalDays).toBe(0);
    });

    it('handles exact 1 year boundary', () => {
      const dob = new Date('2025-01-01T00:00:00');
      const target = new Date('2026-01-01T00:00:00');
      const res = calculateAge(dob, target)!;
      expect(res.years).toBe(1);
      expect(res.months).toBe(0);
      expect(res.days).toBe(0);
    });
  });

  describe('Unix Timestamp Converter', () => {
    it('converts timestamp 0 to Epoch start (1970-01-01T00:00:00.000Z)', () => {
      const res = convertUnixTimestamp(0)!;
      expect(res.isoString).toBe('1970-01-01T00:00:00.000Z');
      expect(res.epochSeconds).toBe(0);
    });

    it('converts 10-digit epoch seconds correctly', () => {
      const res = convertUnixTimestamp(1700000000)!;
      expect(res.isoString).toBe('2023-11-14T22:13:20.000Z');
      expect(res.epochSeconds).toBe(1700000000);
    });

    it('converts 13-digit epoch milliseconds correctly', () => {
      const res = convertUnixTimestamp(1700000000000)!;
      expect(res.isoString).toBe('2023-11-14T22:13:20.000Z');
      expect(res.epochMilliseconds).toBe(1700000000000);
    });

    it('handles pre-1970 negative timestamps', () => {
      const res = convertUnixTimestamp(-1000000000)!;
      expect(res.isoString).toBe('1938-04-24T22:13:20.000Z');
      expect(res.epochSeconds).toBe(-1000000000);
    });
  });
});
