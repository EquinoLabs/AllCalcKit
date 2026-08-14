/**
 * Money Split Data Models & Contracts (dev-v.1.1)
 * Follows schema versioning and strict type safety.
 */

export type SplitMethod = 'equal' | 'percentage' | 'exact';

export interface Participant {
  id: string;
  name: string;
}

export interface Allocation {
  participantId: string;
  value: number; // For percentage: e.g. 50 (meaning 50%); for exact: numeric amount in major currency units
}

export interface Expense {
  id: string;
  description: string;
  amount: number; // Total amount in major units (e.g. 1000 or 1000.50)
  paidBy: string; // Participant ID of the payer
  participantIds: string[]; // Selected participants involved in this expense
  splitMethod: SplitMethod;
  allocations: Allocation[]; // Populated for percentage and exact splits
  createdAt: number; // Epoch timestamp (Date.now())
  updatedAt: number; // Epoch timestamp (Date.now())
}

export interface Group {
  id: string;
  name: string;
  currency: string; // 'INR' | 'USD' | 'EUR' | 'GBP' etc.
  version: number; // Schema version (1 for v1.1)
  participants: Participant[];
  expenses: Expense[];
  createdAt: number;
  updatedAt: number;
}

export interface NetBalance {
  participantId: string;
  name: string;
  totalPaid: number; // In major units (e.g. 1000.00)
  totalOwed: number; // In major units (e.g. 333.34)
  netBalance: number; // totalPaid - totalOwed (>0: receives, <0: owes, 0: settled)
}

export interface SettlementSummary {
  groupId: string;
  groupName: string;
  currency: string;
  totalGroupSpending: number;
  balances: NetBalance[];
  formattedSummaryText: string;
}

export interface SharePayload {
  v: number; // Payload version: 1
  group: Group;
}
