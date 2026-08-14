import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadAllGroups,
  saveAllGroups,
  loadGroupById,
  saveGroup,
  deleteGroup,
  getActiveGroupId,
  setActiveGroupId,
  createGroup,
  addParticipant,
  canDeleteParticipant,
  deleteParticipant,
  addExpense,
  updateExpense,
  deleteExpense,
  STORAGE_KEY_GROUPS,
  STORAGE_KEY_ACTIVE_GROUP_ID
} from '../../src/utils/moneySplit/persistence';
import type { Group } from '../../src/utils/moneySplit/types';

// In-memory mock localStorage for Node Vitest environment
class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe('Money Split Persistence & LocalStorage Manager', () => {
  beforeEach(() => {
    // Inject mock localStorage into global scope
    const mock = new MockLocalStorage();
    (global as any).localStorage = mock;
    (global as any).window = {};
  });

  describe('Storage Resilience & Fallback', () => {
    it('returns empty array when storage is empty', () => {
      expect(loadAllGroups()).toEqual([]);
    });

    it('returns empty array when storage contains corrupted non-JSON data', () => {
      localStorage.setItem(STORAGE_KEY_GROUPS, '{ malformed: json [');
      expect(loadAllGroups()).toEqual([]);
    });

    it('returns empty array when storage contains non-array JSON', () => {
      localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify({ notAnArray: true }));
      expect(loadAllGroups()).toEqual([]);
    });
  });

  describe('Group CRUD Operations', () => {
    it('creates and saves a new group with default schema version and sets active group ID', () => {
      const group = createGroup('Goa Trip 2026', 'INR');
      expect(group.name).toBe('Goa Trip 2026');
      expect(group.currency).toBe('INR');
      expect(group.version).toBe(1);
      expect(group.id).toBeTruthy();

      expect(getActiveGroupId()).toBe(group.id);

      const loaded = loadGroupById(group.id);
      expect(loaded).toBeDefined();
      expect(loaded?.name).toBe('Goa Trip 2026');
    });

    it('deletes a group and updates active group pointer', () => {
      const g1 = createGroup('Group 1', 'USD');
      const g2 = createGroup('Group 2', 'USD');

      expect(getActiveGroupId()).toBe(g2.id);

      deleteGroup(g2.id);
      expect(loadGroupById(g2.id)).toBeNull();
      // Should point to next available group
      expect(getActiveGroupId()).toBe(g1.id);

      deleteGroup(g1.id);
      expect(getActiveGroupId()).toBeNull();
    });
  });

  describe('Participant Management & Deletion Dependency Blocking', () => {
    it('adds unique participants to a group', () => {
      const group = createGroup('Office Lunch');
      const r1 = addParticipant(group.id, 'Rahul');
      expect(r1.success).toBe(true);
      expect(r1.participant?.name).toBe('Rahul');

      const r2 = addParticipant(group.id, 'Ananya');
      expect(r2.success).toBe(true);

      const updated = loadGroupById(group.id)!;
      expect(updated.participants).toHaveLength(2);
    });

    it('rejects duplicate participant names (case-insensitive)', () => {
      const group = createGroup('Trip');
      addParticipant(group.id, 'Rahul');

      const dup = addParticipant(group.id, 'rahul');
      expect(dup.success).toBe(false);
      expect(dup.error).toContain('already exists');
    });

    it('allows deleting an unreferenced participant', () => {
      const group = createGroup('Apartment');
      const p1 = addParticipant(group.id, 'Lakshya').participant!;
      const p2 = addParticipant(group.id, 'Rahul').participant!;

      const check = canDeleteParticipant(group.id, p1.id);
      expect(check.canDelete).toBe(true);

      const del = deleteParticipant(group.id, p1.id);
      expect(del.success).toBe(true);

      const updated = loadGroupById(group.id)!;
      expect(updated.participants).toHaveLength(1);
      expect(updated.participants[0].id).toBe(p2.id);
    });

    it('BLOCKS deleting a participant who paid for an existing expense', () => {
      const group = createGroup('Vacation');
      const p1 = addParticipant(group.id, 'Lakshya').participant!;
      const p2 = addParticipant(group.id, 'Rahul').participant!;

      addExpense(group.id, {
        description: 'Flight Tickets',
        amount: 5000,
        paidBy: p1.id,
        participantIds: [p1.id, p2.id],
        splitMethod: 'equal',
        allocations: []
      });

      const checkPayer = canDeleteParticipant(group.id, p1.id);
      expect(checkPayer.canDelete).toBe(false);
      expect(checkPayer.reason).toContain('because they paid for "Flight Tickets"');

      const delAttempt = deleteParticipant(group.id, p1.id);
      expect(delAttempt.success).toBe(false);
    });

    it('BLOCKS deleting a participant who is included in an expense split', () => {
      const group = createGroup('Vacation');
      const p1 = addParticipant(group.id, 'Lakshya').participant!;
      const p2 = addParticipant(group.id, 'Rahul').participant!;
      const p3 = addParticipant(group.id, 'Ananya').participant!;

      addExpense(group.id, {
        description: 'Dinner',
        amount: 900,
        paidBy: p1.id,
        participantIds: [p1.id, p2.id, p3.id],
        splitMethod: 'equal',
        allocations: []
      });

      const checkParticipant = canDeleteParticipant(group.id, p3.id);
      expect(checkParticipant.canDelete).toBe(false);
      expect(checkParticipant.reason).toContain('because they are part of "Dinner"');

      const delAttempt = deleteParticipant(group.id, p3.id);
      expect(delAttempt.success).toBe(false);
    });
  });

  describe('Expense CRUD Operations', () => {
    it('adds, updates, and deletes expenses within a group', () => {
      const group = createGroup('Road Trip');
      const p1 = addParticipant(group.id, 'Driver').participant!;
      const p2 = addParticipant(group.id, 'Passenger').participant!;

      // Add expense
      const addRes = addExpense(group.id, {
        description: 'Fuel',
        amount: 2000,
        paidBy: p1.id,
        participantIds: [p1.id, p2.id],
        splitMethod: 'equal',
        allocations: []
      });
      expect(addRes.success).toBe(true);
      const expenseId = addRes.expense!.id;

      // Update expense
      const updateRes = updateExpense(group.id, expenseId, {
        description: 'Fuel & Tolls',
        amount: 2500,
        paidBy: p1.id,
        participantIds: [p1.id, p2.id],
        splitMethod: 'equal',
        allocations: []
      });
      expect(updateRes.success).toBe(true);
      expect(updateRes.expense!.description).toBe('Fuel & Tolls');
      expect(updateRes.expense!.amount).toBe(2500);

      // Verify updated group in storage
      const loadedGroup = loadGroupById(group.id)!;
      expect(loadedGroup.expenses).toHaveLength(1);
      expect(loadedGroup.expenses[0].amount).toBe(2500);

      // Delete expense
      const delRes = deleteExpense(group.id, expenseId);
      expect(delRes.success).toBe(true);

      const afterDel = loadGroupById(group.id)!;
      expect(afterDel.expenses).toHaveLength(0);
    });
  });
});
