import { describe, it, expect } from 'vitest';
import { convertUnit, formatUnitResult } from '../../src/lib/calculators/units';
import {
  SPEED_UNITS,
  DATA_UNITS,
  PRESSURE_UNITS,
  ENERGY_UNITS,
  TIME_UNITS,
  ANGLE_UNITS,
  FUEL_EFFICIENCY_UNITS,
  COOKING_UNITS,
  AREA_UNITS
} from '../../src/data/units';

const LENGTH_UNITS = [
  { id: 'm', name: 'Meters (m)', ratio: 1 },
  { id: 'km', name: 'Kilometers (km)', ratio: 1000 },
  { id: 'cm', name: 'Centimeters (cm)', ratio: 0.01 },
  { id: 'mm', name: 'Millimeters (mm)', ratio: 0.001 },
  { id: 'in', name: 'Inches (in)', ratio: 0.0254 },
  { id: 'ft', name: 'Feet (ft)', ratio: 0.3048 },
  { id: 'yd', name: 'Yards (yd)', ratio: 0.9144 },
  { id: 'mi', name: 'Miles (mi)', ratio: 1609.344 }
];

const WEIGHT_UNITS = [
  { id: 'kg', name: 'Kilograms (kg)', ratio: 1 },
  { id: 'g', name: 'Grams (g)', ratio: 0.001 },
  { id: 'mg', name: 'Milligrams (mg)', ratio: 0.000001 },
  { id: 'lb', name: 'Pounds (lbs)', ratio: 0.453592 },
  { id: 'oz', name: 'Ounces (oz)', ratio: 0.0283495 },
  { id: 'ton', name: 'Metric Ton (t)', ratio: 1000 }
];

const VOLUME_UNITS = [
  { id: 'l', name: 'Liters (L)', ratio: 1 },
  { id: 'ml', name: 'Milliliters (mL)', ratio: 0.001 },
  { id: 'cup', name: 'Cups (US)', ratio: 0.24 },
  { id: 'gal', name: 'Gallons (US)', ratio: 3.78541 },
  { id: 'floz', name: 'Fluid Ounces (fl oz)', ratio: 0.0295735 }
];

const TEMP_UNITS = [
  { id: 'c', name: 'Celsius (°C)', ratio: 1 },
  { id: 'f', name: 'Fahrenheit (°F)', ratio: 1 },
  { id: 'k', name: 'Kelvin (K)', ratio: 1 }
];

describe('Unit Converters Engine', () => {
  describe('Length Converter', () => {
    it('converts 1 meter to feet accurately', () => {
      const m = LENGTH_UNITS.find(u => u.id === 'm')!;
      const ft = LENGTH_UNITS.find(u => u.id === 'ft')!;
      const res = convertUnit(1, m, ft);
      expect(res).toBeCloseTo(3.28084, 4);
    });

    it('converts 5 miles to kilometers', () => {
      const mi = LENGTH_UNITS.find(u => u.id === 'mi')!;
      const km = LENGTH_UNITS.find(u => u.id === 'km')!;
      const res = convertUnit(5, mi, km);
      expect(res).toBeCloseTo(8.04672, 5);
      expect(formatUnitResult(res)).toBe('8.04672');
    });

    it('performs identity conversion (1 km to 1 km = 1)', () => {
      const km = LENGTH_UNITS.find(u => u.id === 'km')!;
      const res = convertUnit(1, km, km);
      expect(res).toBe(1);
    });

    it('performs round-trip conversion without precision loss', () => {
      const m = LENGTH_UNITS.find(u => u.id === 'm')!;
      const inUnit = LENGTH_UNITS.find(u => u.id === 'in')!;
      const forward = convertUnit(100, m, inUnit);
      const back = convertUnit(forward, inUnit, m);
      expect(back).toBeCloseTo(100, 5);
    });
  });

  describe('Volume Converter', () => {
    const l = VOLUME_UNITS.find(u => u.id === 'l')!;
    const ml = VOLUME_UNITS.find(u => u.id === 'ml')!;
    const gal = VOLUME_UNITS.find(u => u.id === 'gal')!;
    const floz = VOLUME_UNITS.find(u => u.id === 'floz')!;
    const cup = VOLUME_UNITS.find(u => u.id === 'cup')!;

    it('converts 1 US Gallon to Liters (3.78541 L)', () => {
      const res = convertUnit(1, gal, l);
      expect(res).toBeCloseTo(3.78541, 5);
    });

    it('converts 10 Liters to US Gallons (2.64172 gal)', () => {
      const res = convertUnit(10, l, gal);
      expect(res).toBeCloseTo(2.64172, 4);
    });

    it('converts 1.5 Liters to Milliliters (1500 mL)', () => {
      const res = convertUnit(1.5, l, ml);
      expect(res).toBe(1500);
    });

    it('converts 8 Fluid Ounces to Milliliters (~236.59 mL)', () => {
      const res = convertUnit(8, floz, ml);
      expect(res).toBeCloseTo(236.588, 2);
    });

    it('converts 2 US Cups to Milliliters (480 mL)', () => {
      const res = convertUnit(2, cup, ml);
      expect(res).toBe(480);
    });

    it('converts 0 Gallons to 0 Liters safely', () => {
      const res = convertUnit(0, gal, l);
      expect(res).toBe(0);
    });

    it('performs round-trip volume conversion (50 gal -> L -> gal)', () => {
      const forward = convertUnit(50, gal, l);
      const back = convertUnit(forward, l, gal);
      expect(back).toBeCloseTo(50, 5);
    });
  });

  describe('Weight Converter', () => {
    it('converts 150 lbs to kg', () => {
      const lb = WEIGHT_UNITS.find(u => u.id === 'lb')!;
      const kg = WEIGHT_UNITS.find(u => u.id === 'kg')!;
      const res = convertUnit(150, lb, kg);
      expect(res).toBeCloseTo(68.0388, 4);
    });

    it('converts 1 metric ton to kilograms', () => {
      const ton = WEIGHT_UNITS.find(u => u.id === 'ton')!;
      const kg = WEIGHT_UNITS.find(u => u.id === 'kg')!;
      const res = convertUnit(1, ton, kg);
      expect(res).toBe(1000);
    });
  });

  describe('Temperature Converter', () => {
    const c = TEMP_UNITS.find(u => u.id === 'c')!;
    const f = TEMP_UNITS.find(u => u.id === 'f')!;
    const k = TEMP_UNITS.find(u => u.id === 'k')!;

    it('converts freezing point of water: 0°C = 32°F = 273.15 K', () => {
      expect(convertUnit(0, c, f, true)).toBe(32);
      expect(convertUnit(0, c, k, true)).toBe(273.15);
    });

    it('converts boiling point of water: 100°C = 212°F = 373.15 K', () => {
      expect(convertUnit(100, c, f, true)).toBe(212);
      expect(convertUnit(100, c, k, true)).toBe(373.15);
    });

    it('handles -40° parity point: -40°C === -40°F', () => {
      expect(convertUnit(-40, c, f, true)).toBe(-40);
      expect(convertUnit(-40, f, c, true)).toBe(-40);
    });

    it('converts 77°F to 25°C', () => {
      expect(convertUnit(77, f, c, true)).toBeCloseTo(25, 5);
    });
  });

  describe('Area, Speed, Data, Pressure, Energy, Time, Angle & Fuel', () => {
    it('Area: converts 1,500 sq ft to square meters', () => {
      const sqft = AREA_UNITS.find(u => u.id === 'sqft')!;
      const sqm = AREA_UNITS.find(u => u.id === 'sqm')!;
      const res = convertUnit(1500, sqft, sqm);
      expect(res).toBeCloseTo(139.355, 3);
    });

    it('Speed: converts 60 mph to km/h', () => {
      const mph = SPEED_UNITS.find(u => u.id === 'mph')!;
      const kmh = SPEED_UNITS.find(u => u.id === 'kmh')!;
      const res = convertUnit(60, mph, kmh);
      expect(res).toBeCloseTo(96.56, 1);
    });

    it('Data: converts 256 GB to MB using binary multiplier 1024', () => {
      const gb = DATA_UNITS.find(u => u.id === 'gb')!;
      const mb = DATA_UNITS.find(u => u.id === 'mb')!;
      const res = convertUnit(256, gb, mb);
      expect(res).toBe(262144);
    });

    it('Pressure: converts 32 psi to bar', () => {
      const psi = PRESSURE_UNITS.find(u => u.id === 'psi')!;
      const bar = PRESSURE_UNITS.find(u => u.id === 'bar')!;
      const res = convertUnit(32, psi, bar);
      expect(res).toBeCloseTo(2.206, 3);
    });

    it('Energy: converts 500 kcal to kilojoules', () => {
      const kcal = ENERGY_UNITS.find(u => u.id === 'kcal')!;
      const kj = ENERGY_UNITS.find(u => u.id === 'kj')!;
      const res = convertUnit(500, kcal, kj);
      expect(res).toBeCloseTo(2092, 0);
    });

    it('Time: converts 36 hours to days', () => {
      const hr = TIME_UNITS.find(u => u.id === 'hr')!;
      const day = TIME_UNITS.find(u => u.id === 'day')!;
      const res = convertUnit(36, hr, day);
      expect(res).toBe(1.5);
    });

    it('Angle: converts 180 degrees to radians', () => {
      const deg = ANGLE_UNITS.find(u => u.id === 'deg')!;
      const rad = ANGLE_UNITS.find(u => u.id === 'rad')!;
      const res = convertUnit(180, deg, rad);
      expect(res).toBeCloseTo(Math.PI, 5);
    });

    it('Cooking: converts 2 cups to tbsp and ml', () => {
      const cup = COOKING_UNITS.find(u => u.id === 'cup')!;
      const tbsp = COOKING_UNITS.find(u => u.id === 'tbsp')!;
      const res = convertUnit(2, cup, tbsp);
      expect(res).toBe(32);
    });

    it('Fuel Efficiency: converts 30 US MPG to km/L', () => {
      const mpg = FUEL_EFFICIENCY_UNITS.find(u => u.id === 'mpg_us')!;
      const kml = FUEL_EFFICIENCY_UNITS.find(u => u.id === 'kml')!;
      const res = convertUnit(30, mpg, kml);
      expect(res).toBeCloseTo(12.7543, 3);
    });
  });
});
