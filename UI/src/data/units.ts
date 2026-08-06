export interface Unit {
  id: string;
  name: string;
  ratio: number; // ratio relative to base unit
  offset?: number;
}

export const SPEED_UNITS: Unit[] = [
  { id: 'kmh', name: 'Kilometers per hour (km/h)', ratio: 1 },
  { id: 'ms', name: 'Meters per second (m/s)', ratio: 3.6 },
  { id: 'mph', name: 'Miles per hour (mph)', ratio: 1.609344 },
  { id: 'knot', name: 'Knots (kt)', ratio: 1.852 },
  { id: 'fts', name: 'Feet per second (ft/s)', ratio: 1.09728 },
  { id: 'mach', name: 'Mach (speed of sound)', ratio: 1234.8 }
];

export const DATA_UNITS: Unit[] = [
  { id: 'b', name: 'Bytes (B)', ratio: 1 },
  { id: 'kb', name: 'Kilobytes (KB)', ratio: 1024 },
  { id: 'mb', name: 'Megabytes (MB)', ratio: 1048576 },
  { id: 'gb', name: 'Gigabytes (GB)', ratio: 1073741824 },
  { id: 'tb', name: 'Terabytes (TB)', ratio: 1099511627776 },
  { id: 'pb', name: 'Petabytes (PB)', ratio: 1125899906842624 }
];

export const PRESSURE_UNITS: Unit[] = [
  { id: 'pa', name: 'Pascal (Pa)', ratio: 1 },
  { id: 'kpa', name: 'Kilopascal (kPa)', ratio: 1000 },
  { id: 'bar', name: 'Bar', ratio: 100000 },
  { id: 'psi', name: 'Pounds per sq inch (psi)', ratio: 6894.76 },
  { id: 'atm', name: 'Standard Atmosphere (atm)', ratio: 101325 },
  { id: 'torr', name: 'Torr (mmHg)', ratio: 133.322 }
];

export const ENERGY_UNITS: Unit[] = [
  { id: 'j', name: 'Joules (J)', ratio: 1 },
  { id: 'kj', name: 'Kilojoules (kJ)', ratio: 1000 },
  { id: 'cal', name: 'Calories (cal)', ratio: 4.184 },
  { id: 'kcal', name: 'Kilocalories (kcal)', ratio: 4184 },
  { id: 'wh', name: 'Watt-hours (Wh)', ratio: 3600 },
  { id: 'kwh', name: 'Kilowatt-hours (kWh)', ratio: 3600000 },
  { id: 'ev', name: 'Electron-volts (eV)', ratio: 1.602176634e-19 }
];

export const TIME_UNITS: Unit[] = [
  { id: 'sec', name: 'Seconds (s)', ratio: 1 },
  { id: 'min', name: 'Minutes (min)', ratio: 60 },
  { id: 'hr', name: 'Hours (h)', ratio: 3600 },
  { id: 'day', name: 'Days (d)', ratio: 86400 },
  { id: 'week', name: 'Weeks (wk)', ratio: 604800 },
  { id: 'month', name: 'Months (avg 30.4d)', ratio: 2629746 },
  { id: 'year', name: 'Years (365.25d)', ratio: 31556952 }
];

export const ANGLE_UNITS: Unit[] = [
  { id: 'deg', name: 'Degrees (°)', ratio: 1 },
  { id: 'rad', name: 'Radians (rad)', ratio: 57.295779513 },
  { id: 'grad', name: 'Gradians (grad)', ratio: 0.9 },
  { id: 'turn', name: 'Turns (rev)', ratio: 360 }
];

export const FUEL_EFFICIENCY_UNITS: Unit[] = [
  { id: 'kml', name: 'Kilometers per Liter (km/L)', ratio: 1 },
  { id: 'mpg_us', name: 'Miles per Gallon (US MPG)', ratio: 0.425144 },
  { id: 'mpg_uk', name: 'Miles per Gallon (UK MPG)', ratio: 0.354006 }
];

export const COOKING_UNITS: Unit[] = [
  { id: 'tsp', name: 'Teaspoons (tsp)', ratio: 1 },
  { id: 'tbsp', name: 'Tablespoons (tbsp)', ratio: 3 },
  { id: 'floz', name: 'Fluid Ounces (fl oz)', ratio: 6 },
  { id: 'cup', name: 'Cups (US)', ratio: 48 },
  { id: 'ml', name: 'Milliliters (mL)', ratio: 0.202884 },
  { id: 'l', name: 'Liters (L)', ratio: 202.884 }
];

export const AREA_UNITS: Unit[] = [
  { id: 'sqm', name: 'Square Meters (m²)', ratio: 1 },
  { id: 'sqkm', name: 'Square Kilometers (km²)', ratio: 1000000 },
  { id: 'sqcm', name: 'Square Centimeters (cm²)', ratio: 0.0001 },
  { id: 'sqft', name: 'Square Feet (sq ft)', ratio: 0.092903 },
  { id: 'sqin', name: 'Square Inches (sq in)', ratio: 0.00064516 },
  { id: 'sqyd', name: 'Square Yards (sq yd)', ratio: 0.836127 },
  { id: 'acre', name: 'Acres (ac)', ratio: 4046.856422 },
  { id: 'hectare', name: 'Hectares (ha)', ratio: 10000 },
  { id: 'sqmi', name: 'Square Miles (sq mi)', ratio: 2589988.11 }
];
