/**
 * Pure Everyday & Utility Calculation Engine for AllCalcKit
 */

export interface FuelCostResult {
  totalCost: number;
  fuelVolume: number;
  costPerDistanceUnit: number;
  costPerPassenger: number;
}

export function calculateFuelCost(
  distance: number,
  efficiency: number,
  pricePerUnit: number,
  passengers: number = 1
): FuelCostResult {
  if (distance <= 0 || efficiency <= 0 || pricePerUnit <= 0) {
    return { totalCost: 0, fuelVolume: 0, costPerDistanceUnit: 0, costPerPassenger: 0 };
  }

  const fuelVolume = distance / efficiency;
  const totalCost = fuelVolume * pricePerUnit;
  const costPerDistanceUnit = totalCost / distance;
  const numPassengers = Math.max(1, passengers);
  const costPerPassenger = totalCost / numPassengers;

  return {
    totalCost: parseFloat(totalCost.toFixed(2)),
    fuelVolume: parseFloat(fuelVolume.toFixed(2)),
    costPerDistanceUnit: parseFloat(costPerDistanceUnit.toFixed(4)),
    costPerPassenger: parseFloat(costPerPassenger.toFixed(2)),
  };
}

export interface ElectricityBillResult {
  dailyKwh: number;
  monthlyKwh: number;
  yearlyKwh: number;
  dailyCost: number;
  monthlyCost: number;
  yearlyCost: number;
}

export function calculateElectricityBill(
  watts: number,
  hoursPerDay: number,
  ratePerKwh: number
): ElectricityBillResult {
  if (watts <= 0 || hoursPerDay <= 0 || ratePerKwh <= 0) {
    return { dailyKwh: 0, monthlyKwh: 0, yearlyKwh: 0, dailyCost: 0, monthlyCost: 0, yearlyCost: 0 };
  }

  const dailyKwh = (watts * hoursPerDay) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const yearlyKwh = dailyKwh * 365;

  const dailyCost = dailyKwh * ratePerKwh;
  const monthlyCost = monthlyKwh * ratePerKwh;
  const yearlyCost = yearlyKwh * ratePerKwh;

  return {
    dailyKwh: parseFloat(dailyKwh.toFixed(2)),
    monthlyKwh: parseFloat(monthlyKwh.toFixed(2)),
    yearlyKwh: parseFloat(yearlyKwh.toFixed(2)),
    dailyCost: parseFloat(dailyCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    yearlyCost: parseFloat(yearlyCost.toFixed(2)),
  };
}
