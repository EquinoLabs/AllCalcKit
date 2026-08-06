export interface CalculatorMeta {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  description: string;
  icon: string;
  popular?: boolean;
  phase: number;
  url: string;
  tags: string[];
}

export interface CategoryMeta {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'units', name: 'Unit Converters', description: 'Convert length, weight, volume, speed, temperature & more', icon: 'ruler', url: '/units' },
  { id: 'finance', name: 'Currency & Finance', description: 'Live exchange rates, EMI loan repayments, SIP returns & tax calculators', icon: 'dollar-sign', url: '/finance' },
  { id: 'health', name: 'Health & Fitness', description: 'BMI status tracker, BMR, TDEE, water intake & health metrics', icon: 'heart-pulse', url: '/health' },
  { id: 'math', name: 'Math & Numbers', description: 'Percentages, fraction decimal conversions, number bases & statistics', icon: 'calculator', url: '/math' },
  { id: 'datetime', name: 'Date & Time', description: 'Date differences, time zones, Unix timestamps & working days', icon: 'calendar-clock', url: '/datetime' },
  { id: 'cooking', name: 'Cooking & Food', description: 'Recipe scaler, kitchen volume measurements & oven temperature', icon: 'utensils', url: '/cooking' },
  { id: 'everyday', name: 'Construction & Life', description: 'Paint area estimator, tile counts, fuel trip costs & electricity bill', icon: 'home', url: '/everyday' },
  { id: 'text', name: 'Text & Encoding', description: 'Word & character counter, color code converter, Base64 & case converter', icon: 'code', url: '/text' },
];

export const CALCULATORS: CalculatorMeta[] = [
  // 1. Unit Converters
  { id: 'length', name: 'Length Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert mm, cm, m, km, inch, foot, yard, mile', icon: 'ruler', popular: true, phase: 1, url: '/units/length', tags: ['length', 'distance', 'meter', 'feet', 'inch', 'miles'] },
  { id: 'weight', name: 'Weight & Mass', category: 'Unit Converters', categoryId: 'units', description: 'Convert mg, g, kg, ton, oz, lb, stone', icon: 'weight', popular: true, phase: 1, url: '/units/weight', tags: ['weight', 'mass', 'kg', 'lbs', 'grams', 'ounce'] },
  { id: 'temperature', name: 'Temperature Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Celsius, Fahrenheit, and Kelvin', icon: 'thermometer', popular: true, phase: 1, url: '/units/temperature', tags: ['temp', 'celsius', 'fahrenheit', 'kelvin'] },
  { id: 'volume', name: 'Volume Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert ml, L, cup, pint, quart, gallon, fl oz', icon: 'flask-conical', popular: true, phase: 1, url: '/units/volume', tags: ['volume', 'liter', 'gallon', 'cup', 'fluid oz'] },
  { id: 'area', name: 'Area Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert cm², m², km², ft², yd², acre, hectare', icon: 'square-activity', phase: 1, url: '/units/area', tags: ['area', 'square feet', 'acre', 'hectare'] },
  { id: 'speed', name: 'Speed Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert km/h, mph, m/s, knots', icon: 'gauge', phase: 1, url: '/units/speed', tags: ['speed', 'kmh', 'mph', 'knots', 'velocity'] },
  { id: 'data', name: 'Data Storage Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert bits, bytes, KB, MB, GB, TB', icon: 'hard-drive', phase: 1, url: '/units/data', tags: ['data', 'bytes', 'mb', 'gb', 'tb', 'storage'] },
  { id: 'pressure', name: 'Pressure Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Pa, bar, psi, atm, mmHg', icon: 'wind', phase: 1, url: '/units/pressure', tags: ['pressure', 'psi', 'bar', 'atm', 'pascal'] },
  { id: 'energy', name: 'Energy Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Joules, kJ, calories, kcal, kWh, BTU', icon: 'zap', phase: 1, url: '/units/energy', tags: ['energy', 'joules', 'calories', 'kwh', 'btu'] },
  { id: 'time-units', name: 'Time Unit Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert seconds, minutes, hours, days, weeks, years', icon: 'clock', phase: 1, url: '/units/time-units', tags: ['time', 'seconds', 'hours', 'days', 'weeks'] },
  { id: 'angle', name: 'Angle Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert degrees, radians, gradians', icon: 'compass', phase: 1, url: '/units/angle', tags: ['angle', 'degrees', 'radians'] },
  { id: 'fuel-efficiency', name: 'Fuel Efficiency', category: 'Unit Converters', categoryId: 'units', description: 'Convert km/L, mpg (US/UK), L/100km', icon: 'fuel', phase: 1, url: '/units/fuel-efficiency', tags: ['fuel', 'mpg', 'kml', 'mileage'] },

  // 2. Currency & Finance
  { id: 'currency', name: 'Currency Converter', category: 'Currency & Finance', categoryId: 'finance', description: 'Live global exchange rates (USD, EUR, GBP, INR, JPY, KES, TZS, etc.)', icon: 'coins', popular: true, phase: 1, url: '/finance/currency', tags: ['currency', 'forex', 'usd', 'eur', 'gbp', 'inr', 'tzs', 'kes'] },
  { id: 'loan-emi', name: 'Loan / EMI Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate monthly loan repayment, total interest & schedule', icon: 'landmark', popular: true, phase: 1, url: '/finance/loan-emi', tags: ['loan', 'emi', 'mortgage', 'interest', 'finance'] },
  { id: 'sip', name: 'SIP Investment Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate mutual fund systematic investment plan returns', icon: 'trending-up', popular: true, phase: 1, url: '/finance/sip', tags: ['sip', 'mutual fund', 'investment', 'returns'] },
  { id: 'fd-rd', name: 'FD & RD Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate fixed and recurring deposit maturity amounts', icon: 'piggy-bank', phase: 2, url: '/finance/fd-rd', tags: ['fd', 'rd', 'deposit', 'bank', 'savings'] },
  { id: 'compound-interest', name: 'Compound Interest', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate compounded interest growth over time', icon: 'percent', phase: 2, url: '/finance/compound-interest', tags: ['compound interest', 'growth', 'savings'] },
  { id: 'tax-gst', name: 'GST & Sales Tax', category: 'Currency & Finance', categoryId: 'finance', description: 'Add or subtract GST / VAT tax from price', icon: 'receipt', phase: 1, url: '/finance/tax-gst', tags: ['tax', 'gst', 'vat', 'sales tax'] },
  { id: 'tip-split', name: 'Tip & Bill Splitter', category: 'Currency & Finance', categoryId: 'finance', description: 'Split restaurant bill and tip percentage among friends', icon: 'utensils-crossed', popular: true, phase: 1, url: '/finance/tip-split', tags: ['tip', 'bill split', 'restaurant', 'diners'] },
  { id: 'discount', name: 'Discount Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate final price after percentage discount & total savings', icon: 'tag', phase: 1, url: '/finance/discount', tags: ['discount', 'sale', 'savings', 'off price'] },

  // 3. Health & Fitness
  { id: 'bmi', name: 'BMI Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Calculate Body Mass Index & health category', icon: 'scale', popular: true, phase: 1, url: '/health/bmi', tags: ['bmi', 'body mass', 'weight', 'health'] },
  { id: 'bmr', name: 'BMR Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Calculate Basal Metabolic Rate calories burned at rest', icon: 'flame', phase: 2, url: '/health/bmr', tags: ['bmr', 'metabolism', 'calories'] },
  { id: 'tdee', name: 'TDEE Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Total Daily Energy Expenditure based on activity level', icon: 'activity', phase: 2, url: '/health/tdee', tags: ['tdee', 'daily calories', 'fitness'] },
  { id: 'water-intake', name: 'Water Intake Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Optimal daily water intake requirement based on body weight', icon: 'droplet', phase: 2, url: '/health/water-intake', tags: ['water', 'hydration', 'health'] },
  { id: 'age-calc', name: 'Age Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Exact age in years, months, days, hours, and minutes', icon: 'user-check', popular: true, phase: 1, url: '/health/age-calc', tags: ['age', 'birthday', 'days old'] },

  // 4. Math & Numbers
  { id: 'percentage', name: 'Percentage Calculator', category: 'Math & Numbers', categoryId: 'math', description: 'X is what % of Y, percentage increase or decrease', icon: 'percent', popular: true, phase: 1, url: '/math/percentage', tags: ['percentage', 'math', 'ratio', 'percent'] },
  { id: 'number-base', name: 'Number Base Converter', category: 'Math & Numbers', categoryId: 'math', description: 'Convert between Binary, Octal, Decimal, and Hexadecimal', icon: 'binary', phase: 3, url: '/math/number-base', tags: ['binary', 'hex', 'octal', 'base converter'] },
  { id: 'fraction-decimal', name: 'Fraction ↔ Decimal', category: 'Math & Numbers', categoryId: 'math', description: 'Convert fractions to decimals and simplified fractions', icon: 'divide', phase: 3, url: '/math/fraction-decimal', tags: ['fraction', 'decimal', 'numerator'] },
  { id: 'prime-checker', name: 'Prime Number Checker', category: 'Math & Numbers', categoryId: 'math', description: 'Check if a number is prime and list its factors', icon: 'sparkles', phase: 3, url: '/math/prime-checker', tags: ['prime', 'math', 'factors'] },

  // 5. Date & Time
  { id: 'date-diff', name: 'Date Difference', category: 'Date & Time', categoryId: 'datetime', description: 'Calculate exact days, weeks, months & years between two dates', icon: 'calendar-range', popular: true, phase: 1, url: '/datetime/date-diff', tags: ['date difference', 'days between', 'calendar'] },
  { id: 'date-add', name: 'Date Add / Subtract', category: 'Date & Time', categoryId: 'datetime', description: 'Add or subtract days, weeks, months or years from any date', icon: 'calendar-plus', phase: 3, url: '/datetime/date-add', tags: ['date add', 'future date', 'calendar'] },
  { id: 'unix-timestamp', name: 'Unix Timestamp Converter', category: 'Date & Time', categoryId: 'datetime', description: 'Convert Unix epoch timestamp to human date and vice-versa', icon: 'binary', phase: 3, url: '/datetime/unix-timestamp', tags: ['unix', 'epoch', 'timestamp', 'developer'] },

  // 6. Cooking & Food
  { id: 'recipe-converter', name: 'Recipe Scaler', category: 'Cooking & Food', categoryId: 'cooking', description: 'Scale ingredient quantities up or down by serving count', icon: 'utensils', phase: 3, url: '/cooking/recipe-converter', tags: ['recipe', 'cooking', 'baking', 'ingredients'] },
  { id: 'cooking-units', name: 'Cooking Measurements', category: 'Cooking & Food', categoryId: 'cooking', description: 'Convert cups, tablespoons, teaspoons, ml, and grams', icon: 'cup-soda', popular: true, phase: 1, url: '/cooking/cooking-units', tags: ['cooking', 'cups', 'tbsp', 'tsp', 'grams'] },

  // 7. Construction & Everyday
  { id: 'fuel-cost', name: 'Fuel Trip Cost Calculator', category: 'Construction & Life', categoryId: 'everyday', description: 'Calculate trip fuel cost based on distance, mileage & fuel price', icon: 'car', popular: true, phase: 1, url: '/everyday/fuel-cost', tags: ['fuel cost', 'trip cost', 'car', 'gas'] },
  { id: 'electricity-bill', name: 'Electricity Bill Estimator', category: 'Construction & Life', categoryId: 'everyday', description: 'Estimate appliance electricity usage & monthly cost', icon: 'lightbulb', phase: 3, url: '/everyday/electricity-bill', tags: ['electricity', 'power', 'kwh', 'bill'] },

  // 8. Text & Encoding
  { id: 'word-counter', name: 'Word & Character Counter', category: 'Text & Encoding', categoryId: 'text', description: 'Count words, characters, sentences, paragraphs & reading time', icon: 'file-text', popular: true, phase: 1, url: '/text/word-counter', tags: ['word count', 'character count', 'text', 'reading time'] },
  { id: 'color-converter', name: 'Color Code Converter', category: 'Text & Encoding', categoryId: 'text', description: 'Convert HEX, RGB, HSL with visual color preview', icon: 'palette', phase: 4, url: '/text/color-converter', tags: ['color', 'hex', 'rgb', 'hsl', 'css'] },
  { id: 'case-converter', name: 'Text Case Converter', category: 'Text & Encoding', categoryId: 'text', description: 'Convert text to UPPERCASE, lowercase, camelCase, snake_case, PascalCase', icon: 'type', phase: 4, url: '/text/case-converter', tags: ['case', 'uppercase', 'camelcase', 'snakecase'] }
];
