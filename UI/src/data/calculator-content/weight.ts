import type { CalculatorContent } from './types';

export const weightContent: CalculatorContent = {
  id: 'weight',

  intro: {
    title: 'What is a Weight & Mass Converter?',
    paragraphs: [
      'A weight and mass converter is a precision tool that translates quantities between different units of mass. Whether you are checking your body weight in pounds or kilograms, measuring ingredients for a recipe in grams and ounces, calculating shipping freight in metric tons, or converting gym barbell weights, converting mass accurately is an essential daily need.',
      'This converter supports 6 standard units across both the metric system (milligrams, grams, kilograms, metric tons) and the imperial / US customary system (ounces, pounds). Conversions update in real time with exact ratios.'
    ]
  },

  howToUse: {
    title: 'How to Use the Weight & Mass Converter',
    description: 'Convert between any weight or mass units in three simple steps:',
    steps: [
      'Choose your starting unit from the "From Unit" dropdown menu (for example, Kilograms).',
      'Choose your target unit from the "To Target" dropdown menu (for example, Pounds).',
      'Type any positive number into the starting value box.',
      'View your instant result in the target box, accompanied by a calculation formula preview and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Weight Conversion Works',
    paragraphs: [
      'To convert between any two units of mass, the calculator uses the International System of Units (SI) base unit: the kilogram (kg).',
      'First, your starting quantity is multiplied by its defined kilogram ratio to find its exact mass in kilograms. Next, that kilogram value is divided by the target unit\'s ratio to produce the final converted figure.'
    ],
    formula: 'Converted Weight = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the unit\'s exact value relative to 1 kilogram (kg).',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Quantity',
        description: 'The numeric amount of weight you want to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The number of kilograms equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The number of kilograms equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Weight',
        name: 'Final Output',
        description: 'The resulting mass expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Weight & Mass Conversion Factors',
    description: 'Exact standard values of supported mass units compared to the base kilogram (kg):',
    headers: ['Unit Name', 'Symbol', 'System', 'Equivalent in Kilograms (kg)', 'Equivalent in Grams (g)'],
    rows: [
      ['Milligram', 'mg', 'Metric', '0.000001 kg', '0.001 g'],
      ['Gram', 'g', 'Metric', '0.001 kg', '1 g'],
      ['Kilogram', 'kg', 'Metric (Base)', '1 kg', '1,000 g'],
      ['Metric Ton', 't', 'Metric', '1,000 kg', '1,000,000 g'],
      ['Ounce', 'oz', 'Imperial / US', '0.0283495 kg', '28.3495 g'],
      ['Pound', 'lb', 'Imperial / US', '0.453592 kg', '453.592 g']
    ]
  },

  example: {
    title: 'Example: Converting Kilograms to Pounds',
    description: 'Suppose you weigh 70 kilograms and want to find your body weight in pounds (lbs).',
    inputs: [
      { label: 'Starting Weight', value: '70 Kilograms (kg)' },
      { label: 'Target Unit', value: 'Pounds (lbs)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 pound = 0.453592 kilograms.',
      'Step 2: Divide the kilogram weight by the pound factor: 70 ÷ 0.453592.',
      'Step 3: Compute the converted value: 70 ÷ 0.453592 ≈ 154.323584 lbs.'
    ],
    calculation: '70 kg ÷ 0.453592 kg/lb = 154.323584 lbs',
    result: '154.323584 Pounds (lbs) (≈ 154 lbs 5.2 oz)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Results are calculated using standard international conversion factors and displayed with up to 6 decimal places. Unnecessary trailing zeros are removed to keep results clean and easy to read.',
      'When working with imperial pounds, any fractional decimal can be converted into ounces by multiplying the decimal part by 16. For example, 0.323584 lbs × 16 ≈ 5.18 ounces.'
    ]
  },

  faqs: [
    {
      question: 'How many pounds are in 1 kilogram?',
      answer: 'There are approximately 2.20462 pounds in 1 kilogram. For a quick mental estimate, you can multiply kilograms by 2.2 to get approximate pounds.'
    },
    {
      question: 'What is the difference between weight and mass?',
      answer: 'Mass is the fundamental amount of matter in an object and remains constant anywhere in the universe. Weight is the force exerted on that mass by gravity. On Earth\'s surface, mass and weight are used interchangeably for everyday purposes.'
    },
    {
      question: 'How many ounces are in a pound?',
      answer: 'There are exactly 16 avoirdupois ounces in 1 pound (1 lb = 16 oz = ~453.592 grams).'
    },
    {
      question: 'What is the difference between a metric ton and a US short ton?',
      answer: 'A metric ton (tonne) is equal to 1,000 kilograms (approximately 2,204.62 lbs). A US short ton is 2,000 lbs (approximately 907.18 kg), and an imperial long ton (used in the UK) is 2,240 lbs (approximately 1,016.05 kg).'
    },
    {
      question: 'How do I convert grams to ounces for cooking?',
      answer: 'Divide the number of grams by 28.35 to get ounces. For example, 100 grams ÷ 28.35 ≈ 3.53 ounces.'
    }
  ],

  notes: {
    title: 'Important Notes & Measurement Standards',
    items: [
      'International Avoirdupois Standard: Conversion ratios follow the 1959 international yard and pound agreement, defining 1 lb as exactly 0.45359237 kg.',
      'Fluid Ounces vs. Weight Ounces: Fluid ounces (fl oz) measure volume/liquids, whereas standard ounces (oz) measure weight/mass. Do not confuse the two when following recipes.',
      'Precision: Results are shown with up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
