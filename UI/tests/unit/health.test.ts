import { describe, it, expect } from 'vitest';
import {
  calculateBMIMetric,
  calculateBMIImperial,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateWaterIntake,
  calculateAge
} from '../../src/lib/calculators/health';

describe('Health & Fitness Calculators Engine', () => {
  describe('BMI Calculator', () => {
    it('calculates standard Metric BMI (175 cm, 70 kg -> 22.9 Normal)', () => {
      const res = calculateBMIMetric(70, 175);
      expect(res.bmi).toBe(22.9);
      expect(res.category).toBe('Normal Weight');
    });

    it('calculates standard Imperial BMI (5ft 9in / 69 in, 154 lbs -> 22.7 Normal)', () => {
      const res = calculateBMIImperial(154, 69);
      expect(res.bmi).toBe(22.7);
      expect(res.category).toBe('Normal Weight');
    });

    it('classifies all WHO BMI category thresholds correctly', () => {
      expect(getBMICategory(17.5).category).toBe('Underweight');
      expect(getBMICategory(18.5).category).toBe('Normal Weight');
      expect(getBMICategory(24.9).category).toBe('Normal Weight');
      expect(getBMICategory(25.0).category).toBe('Overweight');
      expect(getBMICategory(29.9).category).toBe('Overweight');
      expect(getBMICategory(30.0).category).toBe('Obese Class I');
      expect(getBMICategory(36.0).category).toBe('Obese Class II');
      expect(getBMICategory(42.0).category).toBe('Obese Class III');
    });

    it('handles zero or negative height and weight safely (returns bmi = 0)', () => {
      expect(calculateBMIMetric(0, 175).bmi).toBe(0);
      expect(calculateBMIMetric(70, 0).bmi).toBe(0);
      expect(calculateBMIMetric(-70, 175).bmi).toBe(0);
      expect(calculateBMIImperial(0, 69).bmi).toBe(0);
      expect(calculateBMIImperial(154, 0).bmi).toBe(0);
    });
  });

  describe('BMR Calculator (Mifflin-St Jeor)', () => {
    it('calculates male resting metabolic baseline (28 yrs, 175 cm, 70 kg)', () => {
      const bmr = calculateBMR('male', 70, 175, 28);
      // (10*70) + (6.25*175) - (5*28) + 5 = 700 + 1093.75 - 140 + 5 = 1658.75 -> 1659
      expect(bmr).toBe(1659);
    });

    it('calculates female resting metabolic baseline (28 yrs, 165 cm, 60 kg)', () => {
      const bmr = calculateBMR('female', 60, 165, 28);
      // (10*60) + (6.25*165) - (5*28) - 161 = 600 + 1031.25 - 140 - 161 = 1330.25 -> 1330
      expect(bmr).toBe(1330);
    });
  });

  describe('TDEE Calculator', () => {
    it('calculates sedentary maintenance, loss, and gain targets (BMR 1674 * 1.20)', () => {
      const res = calculateTDEE(1674, 1.20);
      expect(res.maintenance).toBe(2009);
      expect(res.weightLoss).toBe(1509);
      expect(res.muscleGain).toBe(2309);
    });

    it('scales with active PAL multipliers (Moderate 1.55)', () => {
      const res = calculateTDEE(1674, 1.55);
      expect(res.maintenance).toBe(2595);
      expect(res.weightLoss).toBe(2095);
    });
  });

  describe('Daily Water Intake Calculator', () => {
    it('calculates 70 kg adult doing 30 min exercise in normal climate', () => {
      const res = calculateWaterIntake(70, 30, 0);
      // (70 * 0.035) + 0.35 = 2.45 + 0.35 = 2.80 L
      expect(res.litersPerDay).toBe(2.80);
      expect(res.glasses250ml).toBe(11);
      expect(res.fluidOunces).toBe(95);
    });

    it('incorporates hot climate offset (+0.5 L)', () => {
      const res = calculateWaterIntake(70, 30, 0.5);
      expect(res.litersPerDay).toBe(3.30);
      expect(res.glasses250ml).toBe(13);
    });
  });

  describe('Age Calculator', () => {
    it('calculates chronological age between fixed dates', () => {
      const dob = new Date('1995-06-15');
      const target = new Date('2026-03-15');
      const res = calculateAge(dob, target)!;
      expect(res.years).toBe(30);
      expect(res.months).toBe(9);
      expect(res.days).toBe(0);
    });

    it('handles leap year birthdays accurately', () => {
      const dob = new Date('2000-02-29');
      const target = new Date('2024-02-29');
      const res = calculateAge(dob, target)!;
      expect(res.years).toBe(24);
      expect(res.months).toBe(0);
      expect(res.days).toBe(0);
    });

    it('returns null if DOB is in the future relative to target', () => {
      const dob = new Date('2030-01-01');
      const target = new Date('2026-01-01');
      expect(calculateAge(dob, target)).toBeNull();
    });
  });
});
