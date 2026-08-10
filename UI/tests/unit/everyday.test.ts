import { describe, it, expect } from 'vitest';
import { calculateFuelCost, calculateElectricityBill } from '../../src/lib/calculators/everyday';
import { scaleRecipeQuantity } from '../../src/lib/calculators/cooking';

describe('Everyday & Cooking Tools Engine', () => {
  describe('Recipe Scaler', () => {
    it('scales 4-serving recipe up to 10 servings (2.5x multiplier)', () => {
      expect(scaleRecipeQuantity(2, 4, 10)).toBe(5);
      expect(scaleRecipeQuantity(0.5, 4, 10)).toBe(1.25);
    });

    it('scales down recipe safely', () => {
      expect(scaleRecipeQuantity(10, 10, 2)).toBe(2);
    });
  });

  describe('Fuel Trip Cost Calculator', () => {
    it('calculates road trip fuel volume and cost (300 mi, 25 MPG, $3.50/gal)', () => {
      const res = calculateFuelCost(300, 25, 3.50);
      expect(res.fuelVolume).toBe(12.00);
      expect(res.totalCost).toBe(42.00);
      expect(res.costPerDistanceUnit).toBe(0.14);
    });

    it('splits fuel cost among 4 passengers', () => {
      const res = calculateFuelCost(300, 25, 3.50, 4);
      expect(res.costPerPassenger).toBe(10.50);
    });

    it('handles zero mileage or zero distance safely (returns 0)', () => {
      expect(calculateFuelCost(300, 0, 3.50).totalCost).toBe(0);
      expect(calculateFuelCost(0, 25, 3.50).totalCost).toBe(0);
      expect(calculateFuelCost(300, 25, 0).totalCost).toBe(0);
    });
  });

  describe('Electricity Bill Estimator', () => {
    it('calculates 1,500W space heater usage (6 hrs/day @ $0.15/kWh)', () => {
      const res = calculateElectricityBill(1500, 6, 0.15);
      expect(res.dailyKwh).toBe(9.00);
      expect(res.monthlyKwh).toBe(270.00);
      expect(res.dailyCost).toBe(1.35);
      expect(res.monthlyCost).toBe(40.50);
      expect(res.yearlyCost).toBe(492.75);
    });

    it('handles zero watts or hours safely (returns 0)', () => {
      expect(calculateElectricityBill(0, 6, 0.15).monthlyCost).toBe(0);
      expect(calculateElectricityBill(1500, 0, 0.15).monthlyCost).toBe(0);
    });
  });
});
