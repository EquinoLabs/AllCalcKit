/**
 * Pure Date & Time Calculation Engine for AllCalcKit
 */

export interface DateDiffResult {
  totalDays: number;
  weeks: number;
  remainingDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export function calculateDateDifference(startDate: Date, endDate: Date): DateDiffResult | null {
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return null;

  const diffMs = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  return {
    totalDays,
    weeks,
    remainingDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
}

export function calculateDateAddition(
  anchorDate: Date,
  years: number = 0,
  months: number = 0,
  days: number = 0,
  isSubtract: boolean = false
): Date | null {
  if (isNaN(anchorDate.getTime())) return null;

  const result = new Date(anchorDate.getTime());
  const multiplier = isSubtract ? -1 : 1;

  result.setFullYear(result.getFullYear() + years * multiplier);
  result.setMonth(result.getMonth() + months * multiplier);
  result.setDate(result.getDate() + days * multiplier);

  return result;
}

export interface UnixTimestampResult {
  utcString: string;
  localString: string;
  isoString: string;
  epochSeconds: number;
  epochMilliseconds: number;
}

export function convertUnixTimestamp(timestamp: number): UnixTimestampResult | null {
  if (isNaN(timestamp)) return null;

  // Detect whether 10-digit seconds or 13-digit milliseconds
  const ms = timestamp < 1e11 ? timestamp * 1000 : timestamp;
  const d = new Date(ms);
  if (isNaN(d.getTime())) return null;

  return {
    utcString: d.toUTCString(),
    localString: d.toLocaleString(),
    isoString: d.toISOString(),
    epochSeconds: Math.floor(ms / 1000),
    epochMilliseconds: ms,
  };
}
