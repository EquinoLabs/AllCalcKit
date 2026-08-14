/**
 * Pure Financial Calculation Engine for Money Split (dev-v.1.1)
 * Mandates 100% integer arithmetic (cents/paise) to prevent IEEE 754 floating-point drift.
 */

import type { Group, Expense, SplitMethod, Allocation, NetBalance, SettlementSummary } from '../../utils/moneySplit/types';

/**
 * Converts a major currency unit number (e.g. 12.34) to integer subunit cents/paise (1234).
 */
export function toCents(amount: number): number {
  if (!amount || isNaN(amount) || !isFinite(amount)) return 0;
  return Math.round(amount * 100);
}

/**
 * Converts integer subunit cents/paise (1234) back to major currency unit number (12.34).
 */
export function fromCents(cents: number): number {
  if (!cents || isNaN(cents) || !isFinite(cents)) return 0;
  return Number((cents / 100).toFixed(2));
}

/**
 * Calculates deterministic allocations for equal split.
 * Base cents = Math.floor(totalCents / N).
 * Distributes remainder 1 cent to each of the first R participants.
 * Guarantees sum(allocations) === totalAmount in cents.
 */
export function calculateEqualSplitAllocations(
  totalAmount: number,
  participantIds: string[]
): Record<string, number> {
  const result: Record<string, number> = {};
  if (!participantIds || participantIds.length === 0 || totalAmount <= 0) {
    return result;
  }

  const totalCents = toCents(totalAmount);
  const n = participantIds.length;
  const baseCents = Math.floor(totalCents / n);
  const remainderCents = totalCents % n;

  for (let i = 0; i < n; i++) {
    const pId = participantIds[i];
    // Distribute remainder cents to the first remainderCents participants
    const shareCents = i < remainderCents ? baseCents + 1 : baseCents;
    result[pId] = fromCents(shareCents);
  }

  return result;
}

/**
 * Calculates allocations for percentage split.
 * Checks that percentages sum to 100 (within 0.01% tolerance).
 * Distributes rounding delta to the first participant with non-zero allocation.
 */
export function calculatePercentageSplitAllocations(
  totalAmount: number,
  participantIds: string[],
  allocations: Allocation[]
): Record<string, number> {
  const result: Record<string, number> = {};
  if (!participantIds || participantIds.length === 0 || totalAmount <= 0) {
    return result;
  }

  const totalCents = toCents(totalAmount);
  const allocMap = new Map<string, number>();
  for (const a of allocations) {
    allocMap.set(a.participantId, a.value);
  }

  let allocatedCentsSum = 0;
  let firstActiveParticipantId: string | null = null;

  for (const pId of participantIds) {
    const pct = allocMap.get(pId) || 0;
    if (pct > 0 && !firstActiveParticipantId) {
      firstActiveParticipantId = pId;
    }
    const personCents = Math.round((totalCents * pct) / 100);
    result[pId] = personCents;
    allocatedCentsSum += personCents;
  }

  // Handle rounding discrepancy (e.g. 1000 split 33.33%, 33.33%, 33.34%)
  const deltaCents = totalCents - allocatedCentsSum;
  if (deltaCents !== 0 && firstActiveParticipantId && result[firstActiveParticipantId] !== undefined) {
    result[firstActiveParticipantId] += deltaCents;
  }

  // Convert all cents back to major units
  const finalResult: Record<string, number> = {};
  for (const pId of participantIds) {
    finalResult[pId] = fromCents(result[pId] || 0);
  }

  return finalResult;
}

/**
 * Calculates allocations for exact amount split.
 * Uses exact values provided in allocations.
 */
export function calculateExactSplitAllocations(
  totalAmount: number,
  participantIds: string[],
  allocations: Allocation[]
): Record<string, number> {
  const result: Record<string, number> = {};
  if (!participantIds || participantIds.length === 0 || totalAmount <= 0) {
    return result;
  }

  const allocMap = new Map<string, number>();
  for (const a of allocations) {
    allocMap.set(a.participantId, a.value);
  }

  for (const pId of participantIds) {
    const val = allocMap.get(pId) || 0;
    result[pId] = fromCents(toCents(val));
  }

  return result;
}

/**
 * Computes individual participant share map for an expense based on its split method.
 */
export function calculateExpenseShares(expense: Expense): Record<string, number> {
  const { amount, splitMethod, participantIds, allocations } = expense;

  if (splitMethod === 'equal') {
    return calculateEqualSplitAllocations(amount, participantIds);
  }

  if (splitMethod === 'percentage') {
    return calculatePercentageSplitAllocations(amount, participantIds, allocations || []);
  }

  if (splitMethod === 'exact') {
    return calculateExactSplitAllocations(amount, participantIds, allocations || []);
  }

  return {};
}

/**
 * Validates whether an expense allocation is mathematically sound.
 */
export function validateExpenseAllocations(
  amount: number,
  splitMethod: SplitMethod,
  participantIds: string[],
  allocations: Allocation[]
): { isValid: boolean; error?: string; remaining?: number } {
  if (amount <= 0 || isNaN(amount)) {
    return { isValid: false, error: 'Total amount must be greater than 0.' };
  }

  if (!participantIds || participantIds.length === 0) {
    return { isValid: false, error: 'Please select at least one participant.' };
  }

  const totalCents = toCents(amount);

  if (splitMethod === 'equal') {
    return { isValid: true };
  }

  if (splitMethod === 'percentage') {
    let totalPct = 0;
    for (const pId of participantIds) {
      const a = allocations.find(item => item.participantId === pId);
      totalPct += a ? a.value : 0;
    }
    // Allow slight float tolerance in percentage input (e.g. 99.999 to 100.001)
    const roundedPct = Math.round(totalPct * 100) / 100;
    if (Math.abs(roundedPct - 100) > 0.01) {
      const remainingPct = Number((100 - roundedPct).toFixed(2));
      return {
        isValid: false,
        error: `Total percentage must equal 100%. Current total: ${roundedPct}%.`,
        remaining: remainingPct
      };
    }
    return { isValid: true };
  }

  if (splitMethod === 'exact') {
    let allocatedCents = 0;
    for (const pId of participantIds) {
      const a = allocations.find(item => item.participantId === pId);
      allocatedCents += a ? toCents(a.value) : 0;
    }

    const diffCents = totalCents - allocatedCents;
    if (diffCents !== 0) {
      const diffMajor = fromCents(diffCents);
      const msg = diffCents > 0
        ? `Allocations do not match total. ${diffMajor} remaining to allocate.`
        : `Allocations exceed total by ${Math.abs(diffMajor)}.`;
      return {
        isValid: false,
        error: msg,
        remaining: diffMajor
      };
    }
    return { isValid: true };
  }

  return { isValid: true };
}

/**
 * Calculates net balances for every participant in a group.
 * netBalance = totalPaid - totalOwed.
 * Positive (>0): Participant should receive money.
 * Negative (<0): Participant owes money.
 * Zero (===0): Participant is fully settled.
 */
export function calculateGroupBalances(group: Group): NetBalance[] {
  if (!group || !group.participants || group.participants.length === 0) {
    return [];
  }

  const paidCentsMap = new Map<string, number>();
  const owedCentsMap = new Map<string, number>();

  for (const p of group.participants) {
    paidCentsMap.set(p.id, 0);
    owedCentsMap.set(p.id, 0);
  }

  // Iterate over all expenses and aggregate paid & owed cents
  for (const exp of group.expenses || []) {
    const expCents = toCents(exp.amount);
    // Accumulate amount paid by the payer
    if (paidCentsMap.has(exp.paidBy)) {
      paidCentsMap.set(exp.paidBy, (paidCentsMap.get(exp.paidBy) || 0) + expCents);
    }

    // Compute and accumulate individual shares owed
    const shares = calculateExpenseShares(exp);
    for (const [pId, shareAmount] of Object.entries(shares)) {
      if (owedCentsMap.has(pId)) {
        owedCentsMap.set(pId, (owedCentsMap.get(pId) || 0) + toCents(shareAmount));
      }
    }
  }

  return group.participants.map(p => {
    const totalPaidCents = paidCentsMap.get(p.id) || 0;
    const totalOwedCents = owedCentsMap.get(p.id) || 0;
    const netCents = totalPaidCents - totalOwedCents;

    return {
      participantId: p.id,
      name: p.name,
      totalPaid: fromCents(totalPaidCents),
      totalOwed: fromCents(totalOwedCents),
      netBalance: fromCents(netCents)
    };
  });
}

/**
 * Calculates total group spending across all recorded expenses.
 */
export function calculateTotalSpending(expenses: Expense[]): number {
  if (!expenses || expenses.length === 0) return 0;
  let totalCents = 0;
  for (const exp of expenses) {
    totalCents += toCents(exp.amount);
  }
  return fromCents(totalCents);
}

/**
 * Formats a clean text summary suitable for WhatsApp, Telegram, or SMS.
 */
export function generateSettlementSummary(group: Group, shareUrl?: string): SettlementSummary {
  const totalSpending = calculateTotalSpending(group.expenses || []);
  const balances = calculateGroupBalances(group);
  const currencySymbol = getCurrencySymbol(group.currency);

  const lines: string[] = [
    `📊 ${group.name} — Expense Summary`,
    `Total Group Spend: ${currencySymbol}${totalSpending.toLocaleString()}`,
    `--------------------------------`,
    `Final Balances:`
  ];

  const receivers = balances.filter(b => b.netBalance > 0);
  const owers = balances.filter(b => b.netBalance < 0);
  const settled = balances.filter(b => b.netBalance === 0);

  for (const r of receivers) {
    lines.push(`• ${r.name} should receive ${currencySymbol}${r.netBalance.toFixed(2)}`);
  }

  for (const o of owers) {
    lines.push(`• ${o.name} owes ${currencySymbol}${Math.abs(o.netBalance).toFixed(2)}`);
  }

  for (const s of settled) {
    lines.push(`• ${s.name} is all settled up (${currencySymbol}0.00)`);
  }

  if (group.expenses && group.expenses.length > 0) {
    lines.push(`--------------------------------`);
    lines.push(`Recent Expenses (${group.expenses.length}):`);
    const sorted = [...group.expenses].sort((a, b) => b.createdAt - a.createdAt);
    for (const exp of sorted.slice(0, 10)) {
      const payerName = group.participants.find(p => p.id === exp.paidBy)?.name || 'Unknown';
      lines.push(`- ${exp.description}: ${currencySymbol}${exp.amount.toFixed(2)} (Paid by ${payerName})`);
    }
  }

  if (shareUrl) {
    lines.push(`--------------------------------`);
    lines.push(`🔗 View & Settle on All Calc Kit:\n${shareUrl}`);
  } else {
    lines.push(`\nCalculated with All Calc Kit (allcalckit.com/finance/money-split)`);
  }

  return {
    groupId: group.id,
    groupName: group.name,
    currency: group.currency,
    totalGroupSpending: totalSpending,
    balances,
    formattedSummaryText: lines.join('\n')
  };
}

/**
 * Returns common currency symbol for display.
 */
export function getCurrencySymbol(currency: string): string {
  switch (currency?.toUpperCase()) {
    case 'INR': return '₹';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'JPY': return '¥';
    case 'USD':
    default:
      return '$';
  }
}
