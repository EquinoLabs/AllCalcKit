import type { CalculatorContent } from './types';

export const areaContent: CalculatorContent = {
  id: 'area',

  intro: {
    title: 'What is an Area Converter?',
    paragraphs: [
      'An area converter is a precision surface measurement tool that translates two-dimensional spatial measurements across metric and imperial systems. Whether you are reviewing an apartment floor plan in square meters or square feet, purchasing flooring tiles, surveying agricultural land in acres and hectares, or planning a landscaping project, converting area accurately is essential.',
      'This tool supports 9 standard area units ranging from square centimeters and square inches to acres, hectares, and square miles. Conversions update instantly in real time as you enter values.'
    ]
  },

  howToUse: {
    title: 'How to Use the Area Converter',
    description: 'Convert between any surface area units in three simple steps:',
    steps: [
      'Select your starting area unit from the "From Unit" dropdown (such as Square Meters).',
      'Select your desired target unit from the "To Target" dropdown (such as Square Feet).',
      'Type any numeric area value into the starting input field.',
      'View your converted result immediately in the target display box, with the live formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Area Conversion Works',
    paragraphs: [
      'Because area measures two-dimensional space (length × width), area conversion factors are the square of their linear distance counterparts. For example, since 1 meter equals approximately 3.28084 feet, 1 square meter equals (3.28084)² ≈ 10.7639 square feet.',
      'The calculator uses the square meter (m²) as its universal base unit. Your input value is multiplied by the source unit\'s square-meter ratio to find the base area, and then divided by the target unit\'s ratio to produce the final converted value.'
    ],
    formula: 'Converted Area = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of square meters (m²) equal to 1 unit of that measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Area',
        description: 'The numeric quantity of surface area you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The surface area in square meters (m²) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The surface area in square meters (m²) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Area',
        name: 'Final Output',
        description: 'The resulting surface area expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Surface Area Conversion Factors',
    description: 'Standard values of supported surface area units compared to the base square meter (m²):',
    headers: ['Unit Name', 'Symbol', 'System', 'Equivalent in Square Meters (m²)', 'Common Application'],
    rows: [
      ['Square Centimeter', 'cm²', 'Metric', '0.0001 m²', 'Small craft, electronics, laboratory'],
      ['Square Inch', 'sq in', 'Imperial / US', '0.00064516 m²', 'Small surfaces, plumbing, fabrication'],
      ['Square Foot', 'sq ft', 'Imperial / US', '0.092903 m²', 'Residential floor plans, room sizes'],
      ['Square Yard', 'sq yd', 'Imperial / US', '0.836127 m²', 'Carpet, landscaping, fabric (9 sq ft)'],
      ['Square Meter', 'm²', 'Metric (Base)', '1 m²', 'International architecture & real estate'],
      ['Acre', 'ac', 'Imperial / US', '4,046.856422 m²', 'Land parcels, farms (43,560 sq ft)'],
      ['Hectare', 'ha', 'Metric', '10,000 m²', 'Large agricultural estates, forestry (100 m × 100 m)'],
      ['Square Kilometer', 'km²', 'Metric', '1,000,000 m²', 'Geographic land area, cities, regions'],
      ['Square Mile', 'sq mi', 'Imperial / US', '2,589,988.11 m²', 'Municipalities, national parks (640 acres)']
    ]
  },

  example: {
    title: 'Example: Converting Apartment Size (m² to sq ft)',
    description: 'Suppose you are viewing an apartment floor plan measuring 100 square meters (m²) and want to know the size in square feet (sq ft).',
    inputs: [
      { label: 'Starting Area', value: '100 Square Meters (m²)' },
      { label: 'Target Unit', value: 'Square Feet (sq ft)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 square foot = 0.092903 square meters.',
      'Step 2: Divide the square meter value by the square foot factor: 100 ÷ 0.092903.',
      'Step 3: Compute the converted area: 100 ÷ 0.092903 ≈ 1,076.391505 sq ft.'
    ],
    calculation: '100 m² ÷ 0.092903 m²/sq ft = 1,076.391505 sq ft',
    result: '1,076.391505 Square Feet (sq ft) (≈ 1,076.4 sq ft)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Area results are calculated with full geometric precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'When converting between large land units, remember that 1 hectare is approximately 2.471 acres, and 1 square mile contains exactly 640 acres.'
    ]
  },

  faqs: [
    {
      question: 'How many square feet are in 1 square meter?',
      answer: 'There are approximately 10.7639 square feet in 1 square meter. For quick estimation, multiply square meters by 10.76.'
    },
    {
      question: 'How many square feet are in 1 acre?',
      answer: 'There are exactly 43,560 square feet in 1 acre. This historical standard comes from the area of one furlong (660 ft) by one chain (66 ft).'
    },
    {
      question: 'What is the difference between an acre and a hectare?',
      answer: 'A hectare is a metric unit equal to 10,000 square meters (approximately 2.471 acres). An acre is an imperial unit equal to 4,046.86 square meters (43,560 sq ft).'
    },
    {
      question: 'Why does area conversion square linear conversion factors?',
      answer: 'Area measures two-dimensional surface space (length × width). When converting both dimensions, the conversion factor applies twice (factor × factor = factor²).'
    },
    {
      question: 'How many acres are in a square mile?',
      answer: 'There are exactly 640 acres in 1 square mile (1 section of land in the US Public Land Survey System).'
    }
  ],

  notes: {
    title: 'Important Notes & Area Standards',
    items: [
      'Two-Dimensional Scaling: Area conversion factors equal the square of their 1D linear conversion ratios (for example, 1 yard = 3 feet, so 1 sq yd = 9 sq ft).',
      'Real Estate Standards: Residential floor plans in the US, UK, and Canada commonly use square feet, whereas European and Asian listings typically use square meters.',
      'Precision: Decimal outputs are rounded to up to 6 decimal places with clean zero trimming.'
    ]
  }
};
