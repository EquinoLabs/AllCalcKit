import type { CalculatorContent } from './types';

export const pressureContent: CalculatorContent = {
  id: 'pressure',

  intro: {
    title: 'What is a Pressure Converter?',
    paragraphs: [
      'A pressure converter is a mechanical and scientific conversion tool that translates physical force-per-unit-area measurements across metric, imperial, atmospheric, and barometric systems: Pascals (Pa), Kilopascals (kPa), Bar, Pounds per Square Inch (psi), Standard Atmospheres (atm), and Torr (mmHg).',
      'Whether you are setting car or bicycle tire pressures (switching between psi, bar, and kPa), monitoring scuba diving tanks, tuning HVAC refrigerant lines, reading barometric weather forecasts, or reviewing blood pressure values in mmHg, accurate pressure conversion is essential. Conversions calculate instantly in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Pressure Converter',
    description: 'Convert between any pressure units in three simple steps:',
    steps: [
      'Select your starting pressure unit from the "From Unit" dropdown (such as Bar).',
      'Select your target pressure unit from the "To Target" dropdown (such as Pounds per sq inch, psi).',
      'Type any numeric pressure value into the starting input field.',
      'View your converted result immediately in the target display box, with the live calculation formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Pressure Conversion Works',
    paragraphs: [
      'Pressure is physically defined as the perpendicular force applied per unit area (Pressure = Force ÷ Area). In the International System of Units (SI), the base unit is the Pascal (Pa), which equals 1 Newton per square meter (N/m²).',
      'The calculator uses the Pascal (Pa) as its central reference baseline. Your input pressure is multiplied by the source unit\'s Pascal ratio to determine the base pressure, and then divided by the target unit\'s ratio to compute the final converted value.'
    ],
    formula: 'Converted Pressure = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of Pascals (Pa) equal to 1 unit of that pressure measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Pressure',
        description: 'The numeric pressure amount you want to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The pressure in Pascals (Pa) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The pressure in Pascals (Pa) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Pressure',
        name: 'Final Output',
        description: 'The resulting pressure expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Pressure Conversion Factors',
    description: 'Standard values of supported pressure units compared to the base Pascal (Pa):',
    headers: ['Unit Name', 'Symbol', 'System', 'Equivalent in Pascals (Pa)', 'Common Application'],
    rows: [
      ['Pascal', 'Pa', 'SI Base', '1 Pa', 'Acoustics, building ventilation (1 N/m²)'],
      ['Torr / mmHg', 'Torr', 'Manometric', '133.322 Pa', 'Blood pressure, medical vacuum, barometers'],
      ['Kilopascal', 'kPa', 'Metric', '1,000 Pa', 'Weather reports, metric tire inflation (10³ Pa)'],
      ['Pound per sq inch', 'psi', 'Imperial / US', '6,894.76 Pa', 'Vehicle tire pressure, hydraulics, compressors'],
      ['Bar', 'bar', 'Metric Industry', '100,000 Pa', 'European tire inflation, scuba diving, autoclaves'],
      ['Standard Atmosphere', 'atm', 'Atmospheric', '101,325 Pa', 'Sea level ambient air pressure benchmark']
    ]
  },

  example: {
    title: 'Example: Converting Car Tire Pressure (Bar to PSI)',
    description: 'Suppose a European vehicle door sticker recommends a front tire inflation pressure of 2.2 bar, and you want to convert it to PSI.',
    inputs: [
      { label: 'Starting Pressure', value: '2.2 Bar' },
      { label: 'Target Unit', value: 'Pounds per sq inch (psi)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 bar = 100,000 Pa, and 1 psi = 6,894.76 Pa.',
      'Step 2: Convert bar to base Pascals: 2.2 × 100,000 = 220,000 Pa.',
      'Step 3: Divide by the psi factor: 220,000 ÷ 6,894.76 ≈ 31.908290 psi.'
    ],
    calculation: '220,000 Pa ÷ 6,894.76 Pa/psi = 31.908290 psi',
    result: '31.908290 Pounds per sq inch (psi) (≈ 32 psi)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Pressure values are calculated with full physical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'For quick mental estimates: 1 bar is approximately 14.50 psi, 1 standard atmosphere (atm) is about 14.70 psi, and 1 psi is roughly 6.895 kPa.'
    ]
  },

  faqs: [
    {
      question: 'How do I convert bar to psi for tire pressure?',
      answer: 'Multiply the value in bar by 14.504. For example, a tire recommended at 2.4 bar is approximately 2.4 × 14.504 ≈ 34.8 psi.'
    },
    {
      question: 'What is standard atmospheric pressure at sea level?',
      answer: 'Standard sea-level atmospheric pressure is defined as exactly 1 atm, which equals 101.325 kPa, 1.01325 bar, 14.696 psi, or 760 mmHg (Torr).'
    },
    {
      question: 'Why is blood pressure measured in mmHg or Torr?',
      answer: 'Medical blood pressure monitors historically used vertical glass columns filled with liquid mercury (Hg). The height of the mercury column in millimeters directly indicated pressure, where 1 mmHg = 1 Torr ≈ 133.32 Pascals.'
    },
    {
      question: 'What is the difference between gauge pressure (psig) and absolute pressure (psia)?',
      answer: 'Gauge pressure measures pressure relative to the surrounding ambient air (so an empty open vessel reads 0 psi). Absolute pressure includes atmospheric pressure (so an open vessel at sea level reads ~14.7 psia).'
    },
    {
      question: 'How many Pascals are in 1 bar?',
      answer: 'There are exactly 100,000 Pascals (100 kPa) in 1 bar. The bar is a convenient metric unit created specifically to approximate 1 standard atmosphere.'
    }
  ],

  notes: {
    title: 'Important Notes & Pressure Standards',
    items: [
      'Standard Atmosphere Definition: 1 atm is internationally defined as exactly 101,325 Pa (1.01325 bar).',
      'Gauge vs. Absolute: Standard vehicle tire gauges and pressure dials display gauge pressure (pressure above 1 atmosphere).',
      'Precision: Outputs are formatted with up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
