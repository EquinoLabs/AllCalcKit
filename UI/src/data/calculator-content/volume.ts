import type { CalculatorContent } from './types';

export const volumeContent: CalculatorContent = {
  id: 'volume',

  intro: {
    title: 'What is a Volume Converter?',
    paragraphs: [
      'A volume converter is an essential capacity measurement tool that converts liquid and geometric volumes between different unit systems. Whether you are scaling a recipe in milliliters and cups, calculating aquarium or pool water capacity in gallons, measuring fuel economy and tank refills in liters, or preparing medical dosages, converting volume accurately is a routine necessity.',
      'This converter supports 5 standard liquid volume units across both the metric system (milliliters, liters) and the US customary system (cups, fluid ounces, gallons). All conversions calculate in real time as you enter values.'
    ]
  },

  howToUse: {
    title: 'How to Use the Volume Converter',
    description: 'Convert liquid capacity and volume measurements in three simple steps:',
    steps: [
      'Select your starting volume unit from the "From Unit" dropdown (such as Liters).',
      'Select your desired target unit from the "To Target" dropdown (such as Gallons).',
      'Type any numeric volume quantity into the starting input field.',
      'View your converted result immediately in the target display field, with the active formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Volume Conversion Works',
    paragraphs: [
      'To convert between any two volume units, the calculator uses the liter (L) as its central reference baseline.',
      'Your input number is first multiplied by the starting unit\'s liter factor to determine the total volume in liters. That liter value is then divided by the target unit\'s liter factor to calculate the exact converted result.'
    ],
    formula: 'Converted Volume = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of liters (L) in 1 unit of that measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Volume',
        description: 'The numeric quantity of liquid volume you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The volume in liters equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The volume in liters equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Volume',
        name: 'Final Output',
        description: 'The resulting capacity expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Volume & Capacity Conversion Factors',
    description: 'Standard liquid volume values relative to the base liter (L):',
    headers: ['Unit Name', 'Symbol', 'System', 'Equivalent in Liters (L)', 'Equivalent in Milliliters (mL)'],
    rows: [
      ['Milliliter', 'mL', 'Metric', '0.001 L', '1 mL'],
      ['Fluid Ounce (US)', 'fl oz', 'US Customary', '0.0295735 L', '29.5735 mL'],
      ['Cup (US)', 'cup', 'US Customary', '0.24 L', '240 mL'],
      ['Liter', 'L', 'Metric (Base)', '1 L', '1,000 mL'],
      ['Gallon (US)', 'gal', 'US Customary', '3.78541 L', '3,785.41 mL']
    ]
  },

  example: {
    title: 'Example: Converting Liters to US Gallons',
    description: 'Suppose you have a 5-liter container of liquid and want to know its capacity in US gallons.',
    inputs: [
      { label: 'Starting Volume', value: '5 Liters (L)' },
      { label: 'Target Unit', value: 'Gallons (US)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 US gallon = 3.78541 liters.',
      'Step 2: Divide the starting liter volume by the gallon factor: 5 ÷ 3.78541.',
      'Step 3: Compute the final converted value: 5 ÷ 3.78541 ≈ 1.320861 gallons.'
    ],
    calculation: '5 L ÷ 3.78541 L/gal = 1.320861 gal',
    result: '1.320861 Gallons (US) (≈ 1 gal 1.3 cups)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Volume results are computed using standard international liquid conversion ratios and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean presentation.',
      'When working with US customary gallons, any fractional decimal can be converted into fluid ounces by multiplying the decimal remainder by 128 (since 1 US gallon = 128 fl oz).'
    ]
  },

  faqs: [
    {
      question: 'How many cups are in 1 liter?',
      answer: 'There are approximately 4.167 standard US cups in 1 liter (using the standard 240 mL culinary cup definition).'
    },
    {
      question: 'What is the difference between a US gallon and an Imperial gallon?',
      answer: 'A US liquid gallon is equal to approximately 3.78541 liters (128 US fl oz). An imperial gallon (used in the UK and Canada) is larger, equal to exactly 4.54609 liters (160 imperial fl oz).'
    },
    {
      question: 'How many fluid ounces are in a US gallon?',
      answer: 'There are exactly 128 US fluid ounces in 1 US liquid gallon (1 gal = 4 quarts = 8 pints = 16 cups = 128 fl oz).'
    },
    {
      question: 'How do I convert milliliters to liters?',
      answer: 'Divide the number of milliliters by 1,000. For example, 750 mL ÷ 1,000 = 0.75 Liters.'
    },
    {
      question: 'What is the difference between fluid ounces (fl oz) and weight ounces (oz)?',
      answer: 'Fluid ounces (fl oz) measure volume or liquid capacity. Dry or avoirdupois ounces (oz) measure mass or weight. They are only approximately equal for pure water at standard room temperature.'
    }
  ],

  notes: {
    title: 'Important Notes & Volume Standards',
    items: [
      'US Liquid Standard: Conversions use standard US liquid volume definitions (1 US gallon = 3.78541 L; 1 US fluid ounce = 29.5735 mL).',
      'Culinary Cup Definition: In accordance with standard kitchen conventions, 1 cup is defined as 240 mL (0.24 L).',
      'Precision & Rounding: Results are displayed with up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
