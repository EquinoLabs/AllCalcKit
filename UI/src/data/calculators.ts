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
  howToUse?: string[];
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

const STANDARD_UNIT_HOW_TO = [
  'Select your starting source unit and target conversion unit from the dropdown menus.',
  'Type any numeric quantity into the input box.',
  'View instant real-time converted results and quick unit conversion reference ratios.'
];

export const CALCULATORS: CalculatorMeta[] = [
  // 1. Unit Converters
  { id: 'length', name: 'Length Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert mm, cm, m, km, inch, foot, yard, mile', icon: 'ruler', popular: true, phase: 1, url: '/units/length', tags: ['length', 'distance', 'meter', 'feet', 'inch', 'miles'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'weight', name: 'Weight & Mass', category: 'Unit Converters', categoryId: 'units', description: 'Convert mg, g, kg, ton, oz, lb, stone', icon: 'weight', popular: true, phase: 1, url: '/units/weight', tags: ['weight', 'mass', 'kg', 'lbs', 'grams', 'ounce'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'temperature', name: 'Temperature Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Celsius, Fahrenheit, and Kelvin', icon: 'thermometer', popular: true, phase: 1, url: '/units/temperature', tags: ['temp', 'celsius', 'fahrenheit', 'kelvin'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'volume', name: 'Volume Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert ml, L, cup, pint, quart, gallon, fl oz', icon: 'flask-conical', popular: true, phase: 1, url: '/units/volume', tags: ['volume', 'liter', 'gallon', 'cup', 'fluid oz'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'area', name: 'Area Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert cm², m², km², ft², yd², acre, hectare', icon: 'square-activity', phase: 1, url: '/units/area', tags: ['area', 'square feet', 'acre', 'hectare'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'speed', name: 'Speed Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert km/h, mph, m/s, knots', icon: 'gauge', phase: 1, url: '/units/speed', tags: ['speed', 'kmh', 'mph', 'knots', 'velocity'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'data', name: 'Data Storage Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert bits, bytes, KB, MB, GB, TB', icon: 'hard-drive', phase: 1, url: '/units/data', tags: ['data', 'bytes', 'mb', 'gb', 'tb', 'storage'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'pressure', name: 'Pressure Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Pa, bar, psi, atm, mmHg', icon: 'wind', phase: 1, url: '/units/pressure', tags: ['pressure', 'psi', 'bar', 'atm', 'pascal'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'energy', name: 'Energy Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert Joules, kJ, calories, kcal, kWh, BTU', icon: 'zap', phase: 1, url: '/units/energy', tags: ['energy', 'joules', 'calories', 'kwh', 'btu'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'time-units', name: 'Time Unit Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert seconds, minutes, hours, days, weeks, years', icon: 'clock', phase: 1, url: '/units/time-units', tags: ['time', 'seconds', 'hours', 'days', 'weeks'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'angle', name: 'Angle Converter', category: 'Unit Converters', categoryId: 'units', description: 'Convert degrees, radians, gradians', icon: 'compass', phase: 1, url: '/units/angle', tags: ['angle', 'degrees', 'radians'], howToUse: STANDARD_UNIT_HOW_TO },
  { id: 'fuel-efficiency', name: 'Fuel Efficiency', category: 'Unit Converters', categoryId: 'units', description: 'Convert km/L, mpg (US/UK), L/100km', icon: 'fuel', phase: 1, url: '/units/fuel-efficiency', tags: ['fuel', 'mpg', 'kml', 'mileage'], howToUse: STANDARD_UNIT_HOW_TO },

  // 2. Currency & Finance
  {
    id: 'currency', name: 'Currency Converter', category: 'Currency & Finance', categoryId: 'finance', description: 'Live global exchange rates (USD, EUR, GBP, INR, JPY, KES, TZS, etc.)', icon: 'coins', popular: true, phase: 1, url: '/finance/currency', tags: ['currency', 'forex', 'usd', 'eur', 'gbp', 'inr', 'tzs', 'kes'],
    howToUse: [
      'Select your starting base currency and target exchange currency.',
      'Enter the monetary amount you wish to convert.',
      'Converts live using market exchange rates with single-unit conversion reference.'
    ]
  },
  {
    id: 'loan-emi', name: 'Loan / EMI Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate monthly loan repayment, total interest & schedule', icon: 'landmark', popular: true, phase: 1, url: '/finance/loan-emi', tags: ['loan', 'emi', 'mortgage', 'interest', 'finance'],
    howToUse: [
      'Enter your Loan Principal Amount, Annual Interest Rate (%), and Loan Tenure in years.',
      'View your monthly EMI payment, total interest payable, and total payback cost.',
      'Expand the Amortization Schedule to view year-by-year principal vs. interest breakdown.'
    ]
  },
  {
    id: 'sip', name: 'SIP Investment Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate mutual fund systematic investment plan returns', icon: 'trending-up', popular: true, phase: 1, url: '/finance/sip', tags: ['sip', 'mutual fund', 'investment', 'returns'],
    howToUse: [
      'Enter Monthly Investment amount, Expected Return Rate (%), and Duration in years.',
      'View total invested capital, estimated returns, and total future portfolio value.',
      'Switch between Monthly SIP and Lumpsum investment modes.'
    ]
  },
  {
    id: 'fd-rd', name: 'FD & RD Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate fixed and recurring deposit maturity amounts', icon: 'piggy-bank', phase: 2, url: '/finance/fd-rd', tags: ['fd', 'rd', 'deposit', 'bank', 'savings'],
    howToUse: [
      'Choose Fixed Deposit (FD) or Recurring Deposit (RD).',
      'Enter Principal Amount, Annual Interest Rate (%), and Deposit Duration.',
      'Calculates total maturity amount and total interest earned upon completion.'
    ]
  },
  {
    id: 'compound-interest', name: 'Compound Interest', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate compounded interest growth over time', icon: 'percent', phase: 2, url: '/finance/compound-interest', tags: ['compound interest', 'growth', 'savings'],
    howToUse: [
      'Enter Initial Deposit, Monthly Contribution, Interest Rate (%), and Investment Period.',
      'Select Compounding Frequency (Daily, Monthly, Quarterly, Annually).',
      'View future balance growth and total interest accumulated over time.'
    ]
  },
  {
    id: 'tax-gst', name: 'GST & Sales Tax', category: 'Currency & Finance', categoryId: 'finance', description: 'Add or subtract GST / VAT tax from price', icon: 'receipt', phase: 1, url: '/finance/tax-gst', tags: ['tax', 'gst', 'vat', 'sales tax'],
    howToUse: [
      'Enter the net or gross amount and your local GST / Sales Tax percentage.',
      'Choose whether to "Add Tax" to net price or "Remove Tax" from gross price.',
      'Instantly displays exact tax amount and final total price.'
    ]
  },
  {
    id: 'tip-split', name: 'Tip & Bill Splitter', category: 'Currency & Finance', categoryId: 'finance', description: 'Split restaurant bill and tip percentage among friends', icon: 'utensils-crossed', popular: true, phase: 1, url: '/finance/tip-split', tags: ['tip', 'bill split', 'restaurant', 'diners'],
    howToUse: [
      'Enter Total Bill Amount, Tip Percentage, and Number of Diners.',
      'View total tip amount, total bill with tip, and exact per-person share.',
      'Adjust split count to instantly rebalance payment among friends.'
    ]
  },
  {
    id: 'discount', name: 'Discount Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Calculate final price after percentage discount & total savings', icon: 'tag', phase: 1, url: '/finance/discount', tags: ['discount', 'sale', 'savings', 'off price'],
    howToUse: [
      'Enter Original Item Price and Discount Percentage.',
      'Click quick preset buttons (10%, 20%, 50%) or drag the continuous slider.',
      'View final discounted price and exact money saved.'
    ]
  },
  {
    id: 'rent-vs-buy', name: 'Rent vs Buy Calculator', category: 'Currency & Finance', categoryId: 'finance', description: 'Compare true long-term costs of renting vs buying a home with breakeven analysis', icon: 'home', popular: true, phase: 2, url: '/finance/rent-vs-buy', tags: ['rent vs buy', 'mortgage vs rent', 'home buying', 'real estate', 'breakeven', 'property'],
    howToUse: [
      'Enter Monthly Rent and target Home Purchase Price.',
      'Adjust Down Payment %, Mortgage Interest Rate, Property Tax, and Maintenance assumptions.',
      'Slide the Time Horizon (years) to see total net costs, overall savings, and your exact Breakeven Year.'
    ]
  },
  {
    id: 'money-split', name: 'Money Split', category: 'Currency & Finance', categoryId: 'finance', description: 'Split group expenses, track shared vacation or roommate bills, and calculate net balances', icon: 'receipt', popular: true, phase: 2, url: '/finance/money-split', tags: ['money split', 'splitwise', 'split expenses', 'group bill', 'shared expenses', 'roommates'],
    howToUse: [
      'Create a group and add participants.',
      'Add shared expenses with Equal, Percentage, or Exact Amount split.',
      'View real-time settlement balances and share group link or copy WhatsApp text summary.'
    ]
  },

  // 3. Health & Fitness
  {
    id: 'bmi', name: 'BMI Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Calculate Body Mass Index & health category', icon: 'scale', popular: true, phase: 1, url: '/health/bmi', tags: ['bmi', 'body mass', 'weight', 'health'],
    howToUse: [
      'Choose Metric (cm, kg) or US Customary (ft/in, lbs) measurement units.',
      'Enter your height and body weight.',
      'View exact Body Mass Index (BMI), WHO weight category, and healthy target weight range.'
    ]
  },
  {
    id: 'bmr', name: 'BMR Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Calculate Basal Metabolic Rate calories burned at rest', icon: 'flame', phase: 2, url: '/health/bmr', tags: ['bmr', 'metabolism', 'calories'],
    howToUse: [
      'Enter your Gender, Age, Height, and Body Weight.',
      'Calculates Basal Metabolic Rate (calories burned at complete rest per day).',
      'Shows recommended calorie baselines for daily metabolic functions.'
    ]
  },
  {
    id: 'tdee', name: 'TDEE Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Total Daily Energy Expenditure based on activity level', icon: 'activity', phase: 2, url: '/health/tdee', tags: ['tdee', 'daily calories', 'fitness'],
    howToUse: [
      'Enter Gender, Age, Height, Weight, and Daily Activity Level.',
      'Calculates Total Daily Energy Expenditure (maintenance calories per day).',
      'Displays target daily calorie goals for weight loss, maintenance, or muscle gain.'
    ]
  },
  {
    id: 'water-intake', name: 'Water Intake Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Optimal daily water intake requirement based on body weight', icon: 'droplet', phase: 2, url: '/health/water-intake', tags: ['water', 'hydration', 'health'],
    howToUse: [
      'Enter Body Weight, Daily Exercise Duration (minutes), and Climate conditions.',
      'Calculates optimal daily water hydration target in Liters and Cups.',
      'View hourly hydration tracking tips for peak health.'
    ]
  },
  {
    id: 'age-calc', name: 'Age Calculator', category: 'Health & Fitness', categoryId: 'health', description: 'Exact age in years, months, days, hours, and minutes', icon: 'user-check', popular: true, phase: 1, url: '/health/age-calc', tags: ['age', 'birthday', 'days old'],
    howToUse: [
      'Select your Date of Birth and Target Comparison Date.',
      'Calculates exact age in years, months, and days.',
      'Displays total lifespan breakdown in months, weeks, days, hours, and minutes.'
    ]
  },

  // 4. Math & Numbers
  {
    id: 'percentage', name: 'Percentage Calculator', category: 'Math & Numbers', categoryId: 'math', description: 'X is what % of Y, percentage increase or decrease', icon: 'percent', popular: true, phase: 1, url: '/math/percentage', tags: ['percentage', 'math', 'ratio', 'percent'],
    howToUse: [
      'Choose from 3 calculation modes (What is X% of Y, X is what % of Y, or % Change from V1 to V2).',
      'Enter numbers into the side-by-side input fields.',
      'View formatted calculation results and live natural English equation sentence.'
    ]
  },
  {
    id: 'number-base', name: 'Number Base Converter', category: 'Math & Numbers', categoryId: 'math', description: 'Convert between Binary, Octal, Decimal, and Hexadecimal', icon: 'binary', phase: 3, url: '/math/number-base', tags: ['binary', 'hex', 'octal', 'base converter'],
    howToUse: [
      'Enter a number in any number base (Binary, Octal, Decimal, or Hexadecimal).',
      'Automatically validates and converts input across all 4 number bases simultaneously.',
      '1-click copy formatted binary or hex representations.'
    ]
  },
  {
    id: 'fraction-decimal', name: 'Fraction ↔ Decimal', category: 'Math & Numbers', categoryId: 'math', description: 'Convert fractions to decimals and simplified fractions', icon: 'divide', phase: 3, url: '/math/fraction-decimal', tags: ['fraction', 'decimal', 'numerator'],
    howToUse: [
      'Enter a decimal value or a fraction (numerator and denominator).',
      'Converts between decimal quotient, simplified fraction, and mixed number form.',
      'Displays step-by-step Greatest Common Divisor (GCD) reduction logic.'
    ]
  },
  {
    id: 'prime-checker', name: 'Prime Number Checker', category: 'Math & Numbers', categoryId: 'math', description: 'Check if a number is prime and list its factors', icon: 'sparkles', phase: 3, url: '/math/prime-checker', tags: ['prime', 'math', 'factors'],
    howToUse: [
      'Enter any positive integer.',
      'Instantly tests primality and displays whether the number is prime or composite.',
      'Lists all positive factors and prime factor decomposition.'
    ]
  },

  // 5. Date & Time
  {
    id: 'date-diff', name: 'Date Difference', category: 'Date & Time', categoryId: 'datetime', description: 'Calculate exact days, weeks, months & years between two dates', icon: 'calendar-range', popular: true, phase: 1, url: '/datetime/date-diff', tags: ['date difference', 'days between', 'calendar'],
    howToUse: [
      'Select Start Date and End Date.',
      'Calculates exact time difference in total days, weeks, months, and years.',
      'Displays total working business days excluding weekends.'
    ]
  },
  {
    id: 'date-add', name: 'Date Add / Subtract', category: 'Date & Time', categoryId: 'datetime', description: 'Add or subtract days, weeks, months or years from any date', icon: 'calendar-plus', phase: 3, url: '/datetime/date-add', tags: ['date add', 'future date', 'calendar'],
    howToUse: [
      'Pick a starting date.',
      'Choose to Add or Subtract days, weeks, months, or years.',
      'Instantly computes the exact resulting future or past calendar date.'
    ]
  },
  {
    id: 'unix-timestamp', name: 'Unix Timestamp Converter', category: 'Date & Time', categoryId: 'datetime', description: 'Convert Unix epoch timestamp to human date and vice-versa', icon: 'binary', phase: 3, url: '/datetime/unix-timestamp', tags: ['unix', 'epoch', 'timestamp', 'developer'],
    howToUse: [
      'Enter a Unix epoch timestamp in seconds/milliseconds OR pick a date & time.',
      'Converts epoch numbers to human-readable UTC and Local Date-Time strings.',
      'Shows relative human time (e.g. 5 minutes ago, in 2 days).'
    ]
  },

  // 6. Cooking & Food
  {
    id: 'recipe-converter', name: 'Recipe Scaler', category: 'Cooking & Food', categoryId: 'cooking', description: 'Scale ingredient quantities up or down by serving count', icon: 'utensils', phase: 3, url: '/cooking/recipe-converter', tags: ['recipe', 'cooking', 'baking', 'ingredients'],
    howToUse: [
      'Enter Original Recipe Servings (e.g. 4) and Target Guest Servings (e.g. 10).',
      'Enter ingredient names, original quantities, and units into the table.',
      'Multiplies quantities by the batch scale factor ($10/4 = 2.50x$) while keeping units intact.'
    ]
  },
  { id: 'cooking-units', name: 'Cooking Measurements', category: 'Cooking & Food', categoryId: 'cooking', description: 'Convert cups, tablespoons, teaspoons, ml, and grams', icon: 'cup-soda', popular: true, phase: 1, url: '/cooking/cooking-units', tags: ['cooking', 'cups', 'tbsp', 'tsp', 'grams'], howToUse: STANDARD_UNIT_HOW_TO },

  // 7. Construction & Everyday
  {
    id: 'fuel-cost', name: 'Fuel Trip Cost Calculator', category: 'Construction & Life', categoryId: 'everyday', description: 'Calculate trip fuel cost based on distance, mileage & fuel price', icon: 'car', popular: true, phase: 1, url: '/everyday/fuel-cost', tags: ['fuel cost', 'trip cost', 'car', 'gas'],
    howToUse: [
      'Enter Trip Distance, Vehicle Fuel Efficiency (mpg or km/L), and Fuel Price per unit.',
      'Calculates total fuel volume required and total trip cost.',
      'Enter passenger count to split fuel cost evenly per person.'
    ]
  },
  {
    id: 'electricity-bill', name: 'Electricity Bill Estimator', category: 'Construction & Life', categoryId: 'everyday', description: 'Estimate appliance electricity usage & monthly cost', icon: 'lightbulb', phase: 3, url: '/everyday/electricity-bill', tags: ['electricity', 'power', 'kwh', 'bill'],
    howToUse: [
      'Enter Appliance Wattage (W), Hours Used per Day, and Electricity Rate ($/kWh).',
      'Calculates daily, monthly, and annual kWh power consumption.',
      'View estimated monthly and yearly electricity bill cost.'
    ]
  },

  // 8. Text & Encoding
  {
    id: 'word-counter', name: 'Word & Character Counter', category: 'Text & Encoding', categoryId: 'text', description: 'Count words, characters, sentences, paragraphs & reading time', icon: 'file-text', popular: true, phase: 1, url: '/text/word-counter', tags: ['word count', 'character count', 'text', 'reading time'],
    howToUse: [
      'Type or paste text into the document editor.',
      'Real-time stats count total words, characters (with & without spaces), sentences, and paragraphs.',
      'Displays estimated silent reading time and speaking reading time.'
    ]
  },
  {
    id: 'color-converter', name: 'Color Code Converter', category: 'Text & Encoding', categoryId: 'text', description: 'Convert HEX, RGB, HSL with visual color preview', icon: 'palette', phase: 4, url: '/text/color-converter', tags: ['color', 'hex', 'rgb', 'hsl', 'css'],
    howToUse: [
      'Enter a color code in HEX, RGB, or HSL format OR select with color picker.',
      'Live color swatch preview updates instantly.',
      '1-click copy formatted CSS color strings.'
    ]
  },
  {
    id: 'case-converter', name: 'Text Case Converter', category: 'Text & Encoding', categoryId: 'text', description: 'Convert text to UPPERCASE, lowercase, camelCase, snake_case, PascalCase', icon: 'type', phase: 4, url: '/text/case-converter', tags: ['case', 'uppercase', 'camelcase', 'snakecase'],
    howToUse: [
      'Type or paste text into the input area.',
      'Click any case conversion button (UPPERCASE, lowercase, Title Case, camelCase, snake_case, PascalCase, Kebab-case).',
      'Copy converted text string to clipboard.'
    ]
  }
];
