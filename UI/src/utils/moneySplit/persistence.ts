/**
 * Money Split LocalStorage Persistence & Lifecycle Engine (dev-v.1.1)
 * Manages auto-saving, CRUD operations, dependency validation, and schema versioning.
 */

import type { Group, Participant, Expense, SplitMethod, Allocation } from './types';

export const STORAGE_KEY_GROUPS = 'ack_money_split_groups';
export const STORAGE_KEY_ACTIVE_GROUP_ID = 'ack_money_split_active_group_id';
export const SCHEMA_VERSION = 1;

/**
 * Safely generates a unique ID using crypto.randomUUID with fallback.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'id_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
}

/**
 * Loads all saved groups from localStorage with schema validation and error fallback.
 */
export function loadAllGroups(): Group[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_GROUPS);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.map(g => ({
      ...g,
      version: g.version || SCHEMA_VERSION,
      participants: Array.isArray(g.participants) ? g.participants : [],
      expenses: Array.isArray(g.expenses) ? g.expenses : []
    }));
  } catch (err) {
    console.error('[money-split] Failed to load groups from storage:', err);
    return [];
  }
}

/**
 * Saves the entire groups array to localStorage.
 */
export function saveAllGroups(groups: Group[]): boolean {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return false;
  }

  try {
    localStorage.setItem(STORAGE_KEY_GROUPS, JSON.stringify(groups));
    return true;
  } catch (err) {
    console.error('[money-split] Failed to save groups to storage (quota exceeded?):', err);
    return false;
  }
}

/**
 * Retrieves a single group by its ID.
 */
export function loadGroupById(groupId: string): Group | null {
  const groups = loadAllGroups();
  return groups.find(g => g.id === groupId) || null;
}

/**
 * Saves or updates a single group in localStorage.
 */
export function saveGroup(group: Group): boolean {
  const groups = loadAllGroups();
  const index = groups.findIndex(g => g.id === group.id);
  const updatedGroup: Group = {
    ...group,
    version: SCHEMA_VERSION,
    updatedAt: Date.now()
  };

  if (index >= 0) {
    groups[index] = updatedGroup;
  } else {
    groups.push(updatedGroup);
  }

  return saveAllGroups(groups);
}

/**
 * Deletes a group by ID. Clears active group pointer if deleted.
 */
export function deleteGroup(groupId: string): boolean {
  const groups = loadAllGroups();
  const filtered = groups.filter(g => g.id !== groupId);
  const success = saveAllGroups(filtered);

  if (success && getActiveGroupId() === groupId) {
    const nextActive = filtered.length > 0 ? filtered[0].id : null;
    setActiveGroupId(nextActive);
  }

  return success;
}

/**
 * Retrieves the currently active group ID from localStorage.
 */
export function getActiveGroupId(): string | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return null;
  }
  return localStorage.getItem(STORAGE_KEY_ACTIVE_GROUP_ID) || null;
}

/**
 * Persists the active group ID in localStorage.
 */
export function setActiveGroupId(groupId: string | null): void {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }
  if (groupId) {
    localStorage.setItem(STORAGE_KEY_ACTIVE_GROUP_ID, groupId);
  } else {
    localStorage.removeItem(STORAGE_KEY_ACTIVE_GROUP_ID);
  }
}

/**
 * Creates a new group, persists it, and sets it as the active group.
 */
export function createGroup(name: string, currency: string = 'INR'): Group {
  const now = Date.now();
  const newGroup: Group = {
    id: generateId(),
    name: name.trim(),
    currency: currency.toUpperCase(),
    version: SCHEMA_VERSION,
    participants: [],
    expenses: [],
    createdAt: now,
    updatedAt: now
  };

  saveGroup(newGroup);
  setActiveGroupId(newGroup.id);
  return newGroup;
}

/**
 * Adds a new participant to a group.
 */
export function addParticipant(
  groupId: string,
  name: string
): { success: boolean; participant?: Participant; error?: string } {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return { success: false, error: 'Participant name cannot be empty.' };
  }

  const group = loadGroupById(groupId);
  if (!group) {
    return { success: false, error: 'Group not found.' };
  }

  // Prevent duplicate names in the same group (case-insensitive)
  const isDuplicate = group.participants.some(
    p => p.name.toLowerCase() === trimmedName.toLowerCase()
  );
  if (isDuplicate) {
    return { success: false, error: `A participant named "${trimmedName}" already exists.` };
  }

  const newParticipant: Participant = {
    id: generateId(),
    name: trimmedName
  };

  group.participants.push(newParticipant);
  saveGroup(group);

  return { success: true, participant: newParticipant };
}

/**
 * Validates whether a participant can be safely deleted.
 * Deletion is strictly BLOCKED if the participant is referenced as the payer or participant in any expense.
 */
export function canDeleteParticipant(
  groupId: string,
  participantId: string
): { canDelete: boolean; reason?: string } {
  const group = loadGroupById(groupId);
  if (!group) {
    return { canDelete: false, reason: 'Group not found.' };
  }

  const participant = group.participants.find(p => p.id === participantId);
  if (!participant) {
    return { canDelete: false, reason: 'Participant not found.' };
  }

  // Check 1: Is participant assigned as payer in any expense?
  const payerExpense = group.expenses.find(e => e.paidBy === participantId);
  if (payerExpense) {
    return {
      canDelete: false,
      reason: `Cannot remove "${participant.name}" because they paid for "${payerExpense.description}". Delete or edit that expense first.`
    };
  }

  // Check 2: Is participant included in the split of any expense?
  const splitExpense = group.expenses.find(e => e.participantIds.includes(participantId));
  if (splitExpense) {
    return {
      canDelete: false,
      reason: `Cannot remove "${participant.name}" because they are part of "${splitExpense.description}". Remove them from that expense first.`
    };
  }

  return { canDelete: true };
}

/**
 * Deletes a participant from a group after checking dependency rules.
 */
export function deleteParticipant(
  groupId: string,
  participantId: string
): { success: boolean; error?: string } {
  const check = canDeleteParticipant(groupId, participantId);
  if (!check.canDelete) {
    return { success: false, error: check.reason };
  }

  const group = loadGroupById(groupId);
  if (!group) {
    return { success: false, error: 'Group not found.' };
  }

  group.participants = group.participants.filter(p => p.id !== participantId);
  saveGroup(group);
  return { success: true };
}

/**
 * Adds an expense to a group.
 */
export function addExpense(
  groupId: string,
  expenseData: {
    description: string;
    amount: number;
    paidBy: string;
    participantIds: string[];
    splitMethod: SplitMethod;
    allocations: Allocation[];
  }
): { success: boolean; expense?: Expense; error?: string } {
  const group = loadGroupById(groupId);
  if (!group) {
    return { success: false, error: 'Group not found.' };
  }

  const now = Date.now();
  const newExpense: Expense = {
    id: generateId(),
    description: expenseData.description.trim(),
    amount: expenseData.amount,
    paidBy: expenseData.paidBy,
    participantIds: expenseData.participantIds,
    splitMethod: expenseData.splitMethod,
    allocations: expenseData.allocations,
    createdAt: now,
    updatedAt: now
  };

  group.expenses.push(newExpense);
  saveGroup(group);

  return { success: true, expense: newExpense };
}

/**
 * Updates an existing expense in a group.
 */
export function updateExpense(
  groupId: string,
  expenseId: string,
  expenseData: {
    description: string;
    amount: number;
    paidBy: string;
    participantIds: string[];
    splitMethod: SplitMethod;
    allocations: Allocation[];
  }
): { success: boolean; expense?: Expense; error?: string } {
  const group = loadGroupById(groupId);
  if (!group) {
    return { success: false, error: 'Group not found.' };
  }

  const index = group.expenses.findIndex(e => e.id === expenseId);
  if (index < 0) {
    return { success: false, error: 'Expense not found.' };
  }

  const existing = group.expenses[index];
  const updatedExpense: Expense = {
    ...existing,
    description: expenseData.description.trim(),
    amount: expenseData.amount,
    paidBy: expenseData.paidBy,
    participantIds: expenseData.participantIds,
    splitMethod: expenseData.splitMethod,
    allocations: expenseData.allocations,
    updatedAt: Date.now()
  };

  group.expenses[index] = updatedExpense;
  saveGroup(group);

  return { success: true, expense: updatedExpense };
}

/**
 * Deletes an expense from a group.
 */
export function deleteExpense(
  groupId: string,
  expenseId: string
): { success: boolean; error?: string } {
  const group = loadGroupById(groupId);
  if (!group) {
    return { success: false, error: 'Group not found.' };
  }

  group.expenses = group.expenses.filter(e => e.id !== expenseId);
  saveGroup(group);
  return { success: true };
}
