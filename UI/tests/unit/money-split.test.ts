import { describe, it, expect } from 'vitest';
import {
  toCents,
  fromCents,
  calculateEqualSplitAllocations,
  calculatePercentageSplitAllocations,
  calculateExactSplitAllocations,
  validateExpenseAllocations,
  calculateGroupBalances,
  calculateTotalSpending,
  generateSettlementSummary
} from '../../src/lib/calculators/moneySplit';
import type { Group, Expense } from '../../src/utils/moneySplit/types';

describe('Money Split Calculation Engine', () => {
  describe('Cent Precision Helpers', () => {
    it('converts major currency units to cents accurately', () => {
      expect(toCents(10)).toBe(1000);
      expect(toCents(10.55)).toBe(1055);
      expect(toCents(0.01)).toBe(1);
      expect(toCents(0)).toBe(0);
      expect(toCents(NaN)).toBe(0);
    });

    it('converts cents back to major currency units without float drift', () => {
      expect(fromCents(1000)).toBe(10);
      expect(fromCents(1055)).toBe(10.55);
      expect(fromCents(1)).toBe(0.01);
      expect(fromCents(0)).toBe(0);
    });
  });

  describe('Equal Split Allocations & Remainder Distribution', () => {
    it('splits ₹1000 evenly among 3 participants with deterministic 1-cent remainder to first participant', () => {
      const pIds = ['p1', 'p2', 'p3'];
      const shares = calculateEqualSplitAllocations(1000, pIds);

      expect(shares['p1']).toBe(333.34);
      expect(shares['p2']).toBe(333.33);
      expect(shares['p3']).toBe(333.33);

      const sum = shares['p1'] + shares['p2'] + shares['p3'];
      expect(Number(sum.toFixed(2))).toBe(1000.00);
    });

    it('splits ₹100 among 3 participants (33.34, 33.33, 33.33)', () => {
      const pIds = ['p1', 'p2', 'p3'];
      const shares = calculateEqualSplitAllocations(100, pIds);

      expect(shares['p1']).toBe(33.34);
      expect(shares['p2']).toBe(33.33);
      expect(shares['p3']).toBe(33.33);
      expect(shares['p1'] + shares['p2'] + shares['p3']).toBe(100.00);
    });

    it('splits ₹100 among 4 participants cleanly without remainder (25.00 each)', () => {
      const pIds = ['p1', 'p2', 'p3', 'p4'];
      const shares = calculateEqualSplitAllocations(100, pIds);

      expect(shares['p1']).toBe(25);
      expect(shares['p2']).toBe(25);
      expect(shares['p3']).toBe(25);
      expect(shares['p4']).toBe(25);
    });

    it('handles 2 remainder cents among 4 participants on ₹100.02 (25.01, 25.01, 25.00, 25.00)', () => {
      const pIds = ['p1', 'p2', 'p3', 'p4'];
      const shares = calculateEqualSplitAllocations(100.02, pIds);

      expect(shares['p1']).toBe(25.01);
      expect(shares['p2']).toBe(25.01);
      expect(shares['p3']).toBe(25.00);
      expect(shares['p4']).toBe(25.00);
      expect(Number((shares['p1'] + shares['p2'] + shares['p3'] + shares['p4']).toFixed(2))).toBe(100.02);
    });
  });

  describe('Percentage Split Allocations', () => {
    it('allocates shares accurately based on percentages (20%, 70%, 10%)', () => {
      const pIds = ['p1', 'p2', 'p3'];
      const allocs = [
        { participantId: 'p1', value: 20 },
        { participantId: 'p2', value: 70 },
        { participantId: 'p3', value: 10 }
      ];
      const shares = calculatePercentageSplitAllocations(1000, pIds, allocs);

      expect(shares['p1']).toBe(200);
      expect(shares['p2']).toBe(700);
      expect(shares['p3']).toBe(100);
      expect(shares['p1'] + shares['p2'] + shares['p3']).toBe(1000);
    });

    it('handles rounding adjustment when percentages have 1-cent residual (33.33%, 33.33%, 33.34%)', () => {
      const pIds = ['p1', 'p2', 'p3'];
      const allocs = [
        { participantId: 'p1', value: 33.33 },
        { participantId: 'p2', value: 33.33 },
        { participantId: 'p3', value: 33.34 }
      ];
      const shares = calculatePercentageSplitAllocations(1000, pIds, allocs);

      const sum = Number((shares['p1'] + shares['p2'] + shares['p3']).toFixed(2));
      expect(sum).toBe(1000.00);
    });
  });

  describe('Exact Split Allocations', () => {
    it('allocates exact amounts specified by user (₹200, ₹700, ₹100)', () => {
      const pIds = ['p1', 'p2', 'p3'];
      const allocs = [
        { participantId: 'p1', value: 200 },
        { participantId: 'p2', value: 700 },
        { participantId: 'p3', value: 100 }
      ];
      const shares = calculateExactSplitAllocations(1000, pIds, allocs);

      expect(shares['p1']).toBe(200);
      expect(shares['p2']).toBe(700);
      expect(shares['p3']).toBe(100);
    });
  });

  describe('Allocation Validation Rules', () => {
    it('rejects zero or negative amounts', () => {
      expect(validateExpenseAllocations(0, 'equal', ['p1', 'p2'], []).isValid).toBe(false);
      expect(validateExpenseAllocations(-50, 'equal', ['p1', 'p2'], []).isValid).toBe(false);
    });

    it('rejects empty participant list', () => {
      expect(validateExpenseAllocations(100, 'equal', [], []).isValid).toBe(false);
    });

    it('validates percentage split must sum to 100%', () => {
      const pIds = ['p1', 'p2'];
      const invalidAllocs = [
        { participantId: 'p1', value: 40 },
        { participantId: 'p2', value: 50 }
      ];
      const res = validateExpenseAllocations(100, 'percentage', pIds, invalidAllocs);
      expect(res.isValid).toBe(false);
      expect(res.remaining).toBe(10);

      const validAllocs = [
        { participantId: 'p1', value: 40 },
        { participantId: 'p2', value: 60 }
      ];
      expect(validateExpenseAllocations(100, 'percentage', pIds, validAllocs).isValid).toBe(true);
    });

    it('validates exact split must match total amount exactly', () => {
      const pIds = ['p1', 'p2'];
      const underAllocs = [
        { participantId: 'p1', value: 30 },
        { participantId: 'p2', value: 50 }
      ];
      const underRes = validateExpenseAllocations(100, 'exact', pIds, underAllocs);
      expect(underRes.isValid).toBe(false);
      expect(underRes.remaining).toBe(20);

      const exactAllocs = [
        { participantId: 'p1', value: 40 },
        { participantId: 'p2', value: 60 }
      ];
      expect(validateExpenseAllocations(100, 'exact', pIds, exactAllocs).isValid).toBe(true);
    });
  });

  describe('Group Settlement Balances & Net Ledgers', () => {
    const mockGroup: Group = {
      id: 'group-1',
      name: 'Goa Trip',
      currency: 'INR',
      version: 1,
      createdAt: 1000000,
      updatedAt: 1000000,
      participants: [
        { id: 'p1', name: 'Lakshya' },
        { id: 'p2', name: 'Rahul' },
        { id: 'p3', name: 'Ananya' }
      ],
      expenses: [
        {
          id: 'e1',
          description: 'Pizza',
          amount: 1000,
          paidBy: 'p2', // Rahul paid 1000
          participantIds: ['p1', 'p2', 'p3'], // 333.34, 333.33, 333.33
          splitMethod: 'equal',
          allocations: [],
          createdAt: 1000000,
          updatedAt: 1000000
        },
        {
          id: 'e2',
          description: 'Taxi',
          amount: 600,
          paidBy: 'p1', // Lakshya paid 600
          participantIds: ['p1', 'p2', 'p3'], // 200, 200, 200
          splitMethod: 'equal',
          allocations: [],
          createdAt: 1000100,
          updatedAt: 1000100
        }
      ]
    };

    it('correctly calculates total group spending', () => {
      expect(calculateTotalSpending(mockGroup.expenses)).toBe(1600);
    });

    it('correctly computes net balances for all participants', () => {
      const balances = calculateGroupBalances(mockGroup);
      expect(balances).toHaveLength(3);

      const lakshya = balances.find(b => b.participantId === 'p1')!;
      const rahul = balances.find(b => b.participantId === 'p2')!;
      const ananya = balances.find(b => b.participantId === 'p3')!;

      // Lakshya: Paid 600. Owed 333.34 (pizza) + 200 (taxi) = 533.34. Net = +66.66
      expect(lakshya.totalPaid).toBe(600);
      expect(lakshya.totalOwed).toBe(533.34);
      expect(lakshya.netBalance).toBe(66.66);

      // Rahul: Paid 1000. Owed 333.33 (pizza) + 200 (taxi) = 533.33. Net = +466.67
      expect(rahul.totalPaid).toBe(1000);
      expect(rahul.totalOwed).toBe(533.33);
      expect(rahul.netBalance).toBe(466.67);

      // Ananya: Paid 0. Owed 333.33 (pizza) + 200 (taxi) = 533.33. Net = -533.33
      expect(ananya.totalPaid).toBe(0);
      expect(ananya.totalOwed).toBe(533.33);
      expect(ananya.netBalance).toBe(-533.33);

      // Net sum of all balances must equal 0 (zero-sum game)
      const totalNet = Number((lakshya.netBalance + rahul.netBalance + ananya.netBalance).toFixed(2));
      expect(totalNet).toBe(0);
    });

    it('handles selective participant expenses where some members do not participate', () => {
      const groupWithSelective: Group = {
        ...mockGroup,
        expenses: [
          {
            id: 'e3',
            description: 'Scuba Diving (Lakshya & Rahul only)',
            amount: 2000,
            paidBy: 'p1', // Lakshya paid 2000
            participantIds: ['p1', 'p2'], // 1000 each; Ananya excluded
            splitMethod: 'equal',
            allocations: [],
            createdAt: 1000200,
            updatedAt: 1000200
          }
        ]
      };

      const balances = calculateGroupBalances(groupWithSelective);
      const lakshya = balances.find(b => b.participantId === 'p1')!;
      const rahul = balances.find(b => b.participantId === 'p2')!;
      const ananya = balances.find(b => b.participantId === 'p3')!;

      expect(lakshya.netBalance).toBe(1000);
      expect(rahul.netBalance).toBe(-1000);
      expect(ananya.netBalance).toBe(0);
    });

    it('generates formatted text summary for messaging apps', () => {
      const summary = generateSettlementSummary(mockGroup);
      expect(summary.groupName).toBe('Goa Trip');
      expect(summary.totalGroupSpending).toBe(1600);
      expect(summary.formattedSummaryText).toContain('Goa Trip');
      expect(summary.formattedSummaryText).toContain('Rahul should receive ₹466.67');
      expect(summary.formattedSummaryText).toContain('Ananya owes ₹533.33');
      expect(summary.formattedSummaryText).toContain('allcalckit.com/finance/money-split');
    });
  });
});
