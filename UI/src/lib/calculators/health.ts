/**
 * Pure Health & Fitness Calculation Engine for AllCalcKit
 */

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal Weight' | 'Overweight' | 'Obese Class I' | 'Obese Class II' | 'Obese Class III';
  color: string;
}

export function getBMICategory(bmi: number): { category: BmiResult['category']; color: string } {
  if (bmi < 18.5) return { category: 'Underweight', color: '#3b82f6' };
  if (bmi < 25.0) return { category: 'Normal Weight', color: '#10b981' };
  if (bmi < 30.0) return { category: 'Overweight', color: '#f59e0b' };
  if (bmi < 35.0) return { category: 'Obese Class I', color: '#f97316' };
  if (bmi < 40.0) return { category: 'Obese Class II', color: '#ef4444' };
  return { category: 'Obese Class III', color: '#b91c1c' };
}

export function calculateBMIMetric(weightKg: number, heightCm: number): BmiResult {
  if (weightKg <= 0 || heightCm <= 0) {
    return { bmi: 0, category: 'Normal Weight', color: '#10b981' };
  }
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  const { category, color } = getBMICategory(bmi);
  return { bmi, category, color };
}

export function calculateBMIImperial(weightLbs: number, heightInches: number): BmiResult {
  if (weightLbs <= 0 || heightInches <= 0) {
    return { bmi: 0, category: 'Normal Weight', color: '#10b981' };
  }
  const bmi = parseFloat(((weightLbs / (heightInches * heightInches)) * 703).toFixed(1));
  const { category, color } = getBMICategory(bmi);
  return { bmi, category, color };
}

export function calculateBMR(
  gender: 'male' | 'female',
  weightKg: number,
  heightCm: number,
  ageYears: number
): number {
  if (weightKg <= 0 || heightCm <= 0 || ageYears <= 0) return 0;
  // Clinical Mifflin-St Jeor Equation
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  const bmr = gender === 'female' ? base - 161 : base + 5;
  return Math.round(bmr);
}

export interface TdeeResult {
  maintenance: number;
  weightLoss: number;
  muscleGain: number;
}

export function calculateTDEE(bmr: number, activityMultiplier: number): TdeeResult {
  if (bmr <= 0 || activityMultiplier <= 0) {
    return { maintenance: 0, weightLoss: 0, muscleGain: 0 };
  }
  const tdee = Math.round(bmr * activityMultiplier);
  return {
    maintenance: tdee,
    weightLoss: Math.max(0, tdee - 500),
    muscleGain: tdee + 300,
  };
}

export interface WaterIntakeResult {
  litersPerDay: number;
  glasses250ml: number;
  fluidOunces: number;
}

export function calculateWaterIntake(
  weightKg: number,
  exerciseMinutes: number = 0,
  climateOffset: number = 0 // +0.5 hot, 0 normal, -0.2 cold
): WaterIntakeResult {
  if (weightKg <= 0) {
    return { litersPerDay: 1, glasses250ml: 4, fluidOunces: 34 };
  }

  // Base: 35ml per kg of body weight + 350ml per 30 min exercise + climate offset
  let liters = weightKg * 0.035 + (exerciseMinutes / 30) * 0.35 + climateOffset;
  if (liters < 1.0) liters = 1.0;

  const glasses = Math.round((liters * 1000) / 250);
  const oz = Math.round(liters * 33.814);

  return {
    litersPerDay: parseFloat(liters.toFixed(2)),
    glasses250ml: glasses,
    fluidOunces: oz,
  };
}

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
}

export function calculateAge(dob: Date, targetDate: Date = new Date()): AgeResult | null {
  if (isNaN(dob.getTime()) || isNaN(targetDate.getTime()) || dob > targetDate) {
    return null;
  }

  let years = targetDate.getFullYear() - dob.getFullYear();
  let months = targetDate.getMonth() - dob.getMonth();
  let days = targetDate.getDate() - dob.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const diffMs = targetDate.getTime() - dob.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;

  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    totalMinutes,
  };
}
