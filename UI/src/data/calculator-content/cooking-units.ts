import type { CalculatorContent } from './types';

export const cookingUnitsContent: CalculatorContent = {
  id: 'cooking-units',

  intro: {
    title: 'What is a Cooking Measurements Converter?',
    paragraphs: [
      'A cooking measurements converter is an essential culinary kitchen tool that translates recipe volume and liquid capacity measurements across US customary and international metric kitchen units: Teaspoons (tsp), Tablespoons (tbsp), Fluid Ounces (fl oz), Cups (US), Milliliters (mL), and Liters (L).',
      'Whether you are adjusting a dessert baking recipe from US cups to metric milliliters, doubling a soup recipe in fluid ounces, converting tablespoons to teaspoons for precise seasoning, or scaling foreign cookbooks, converting kitchen measurements accurately ensures perfect culinary results. All conversions calculate in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Cooking Measurements Converter',
    description: 'Convert between culinary recipe units in three simple steps:',
    steps: [
      'Select your starting kitchen unit from the "From Unit" dropdown (such as Cups, US).',
      'Select your desired target unit from the "To Target" dropdown (such as Milliliters, mL).',
      'Type any numeric recipe quantity into the starting input box.',
      'View your converted result immediately in the target display box, with the live calculation formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Cooking Measurement Conversion Works',
    paragraphs: [
      'Standard culinary volume measurements follow exact nested ratios: 1 tablespoon contains 3 teaspoons, 1 fluid ounce equals 2 tablespoons (6 teaspoons), and 1 US cup contains 16 tablespoons (48 teaspoons).',
      'The calculator uses the US Teaspoon (tsp) as its central reference baseline. Your starting recipe quantity is multiplied by its defined teaspoon ratio to find the base teaspoons, and then divided by the target unit\'s ratio to compute the exact converted output.'
    ],
    formula: 'Converted Volume = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of teaspoons (tsp) equal to 1 unit of that kitchen measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Quantity',
        description: 'The numeric culinary volume you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The volume in teaspoons (tsp) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The volume in teaspoons (tsp) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Volume',
        name: 'Final Output',
        description: 'The resulting culinary volume expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Culinary Volume Equivalents & Kitchen Standards',
    description: 'Standard liquid kitchen volume equivalents across common recipe measures:',
    headers: ['Kitchen Unit', 'Teaspoons (tsp)', 'Tablespoons (tbsp)', 'Fluid Ounces (fl oz)', 'Milliliters (mL approx.)'],
    rows: [
      ['1 Teaspoon (tsp)', '1 tsp', '1/3 tbsp', '0.167 fl oz', '4.93 mL'],
      ['1 Tablespoon (tbsp)', '3 tsp', '1 tbsp', '0.5 fl oz', '14.79 mL (15 mL standard)'],
      ['1 Fluid Ounce (fl oz)', '6 tsp', '2 tbsp', '1 fl oz', '29.57 mL (30 mL standard)'],
      ['1/4 Cup (US)', '12 tsp', '4 tbsp', '2 fl oz', '59.15 mL (60 mL standard)'],
      ['1/2 Cup (US)', '24 tsp', '8 tbsp', '4 fl oz', '118.29 mL (120 mL standard)'],
      ['1 Cup (US)', '48 tsp', '16 tbsp', '8 fl oz', '236.59 mL (240 mL standard)'],
      ['1 Liter (L)', '202.88 tsp', '67.63 tbsp', '33.81 fl oz', '1,000 mL (≈ 4.23 cups)']
    ]
  },

  example: {
    title: 'Example: Converting US Cups to Milliliters (cup to mL)',
    description: 'Suppose a European cake recipe requires you to measure 2.5 US cups of milk in milliliters (mL).',
    inputs: [
      { label: 'Starting Quantity', value: '2.5 Cups (US)' },
      { label: 'Target Unit', value: 'Milliliters (mL)' }
    ],
    steps: [
      'Step 1: Convert cups to base teaspoons: 2.5 × 48 = 120 teaspoons.',
      'Step 2: Identify the metric milliliter conversion ratio: 1 mL ≈ 0.202884 tsp.',
      'Step 3: Divide base teaspoons by the mL ratio: 120 ÷ 0.202884 ≈ 591.470988 mL.'
    ],
    calculation: '2.5 cups × 48 tsp/cup ÷ 0.202884 tsp/mL = 591.470988 mL',
    result: '591.470988 Milliliters (mL) (≈ 591.5 mL)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Culinary results are calculated with high mathematical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'For quick mental kitchen approximations: 1 cup ≈ 240 mL, 1 tablespoon ≈ 15 mL, and 1 teaspoon ≈ 5 mL.'
    ]
  },

  faqs: [
    {
      question: 'How many tablespoons are in 1 US cup?',
      answer: 'There are exactly 16 tablespoons in 1 standard US cup (8 fluid ounces).'
    },
    {
      question: 'How many teaspoons are in 1 tablespoon?',
      answer: 'There are exactly 3 teaspoons in 1 standard tablespoon.'
    },
    {
      question: 'How many milliliters are in a standard US cup?',
      answer: 'An exact US legal cup is 240 mL, while an exact US customary cup is approximately 236.59 mL. For everyday cooking and baking, measuring 240 mL is standard.'
    },
    {
      question: 'How many tablespoons are in 1 fluid ounce?',
      answer: 'There are exactly 2 tablespoons in 1 US fluid ounce (which equals 6 teaspoons).'
    },
    {
      question: 'Can I use this calculator to convert flour or sugar to grams?',
      answer: 'No. This calculator converts volumetric liquid capacity. Dry ingredients (like flour, cocoa powder, or granulated sugar) have varying densities, so converting dry volume (cups) to weight (grams) requires ingredient-specific density factors.'
    }
  ],

  notes: {
    title: 'Important Notes & Kitchen Standards',
    items: [
      'Volumetric Measurement: This converter measures culinary liquid volume/capacity, not dry ingredient weight or mass.',
      'US Recipe Hierarchy: 1 Cup = 8 fl oz = 16 tbsp = 48 tsp.',
      'Precision: Decimal outputs are rounded to up to 6 decimal places with clean zero trimming for maximum culinary convenience.'
    ]
  }
};
