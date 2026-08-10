import type { CalculatorContent } from './types';

export const recipeConverterContent: CalculatorContent = {
  id: 'recipe-converter',

  intro: {
    title: 'What is a Recipe Scaler & Batch Multiplier?',
    paragraphs: [
      'A Recipe Scaler is an interactive culinary proportion calculator that resizes ingredient quantities up or down for any custom number of servings or party guest count.',
      'Whether you are doubling a family pasta recipe for a dinner party, halving a baking batch for two people, preparing food for a large catered potluck, or adjusting ingredient proportions for different cake tin sizes, scaling recipes accurately ensures consistent flavor, moisture, and texture. All ingredient rows recalculate in real time as you adjust servings.'
    ]
  },

  howToUse: {
    title: 'How to Use the Recipe Scaler',
    description: 'Scale multi-ingredient recipes in four simple steps:',
    steps: [
      'Enter your original recipe\'s yield in the "Original Recipe Servings" box (e.g. 4 servings).',
      'Enter the number of guests or servings you want to make in the "Desired Guest Servings" box (e.g. 10 servings).',
      'Enter your ingredient names, original quantities, and units into the table (click "+ Add Ingredient Row" to add more ingredients).',
      'View your newly scaled ingredient amounts immediately beside each row, with the active recipe multiplier badge displayed at the top.'
    ]
  },

  howItWorks: {
    title: 'How Recipe Scaling Works',
    paragraphs: [
      'Recipe scaling is based on linear proportion: the calculator divides your target serving size by the original serving size to establish the exact Scale Multiplier.',
      'Every individual ingredient quantity is then multiplied by this exact scale factor while keeping the measurement units unchanged (e.g., cups remain cups, grams remain grams).'
    ],
    formula: 'Scaled Quantity = Original Quantity × (Desired Servings ÷ Original Servings)',
    formulaExplanation: 'Where the scale multiplier (Desired ÷ Original) proportionately resizes every ingredient quantity.',
    variables: [
      {
        symbol: 'Original Servings',
        name: 'Baseline Yield',
        description: 'The standard number of portions or servings produced by the original recipe.'
      },
      {
        symbol: 'Desired Servings',
        name: 'Target Portions',
        description: 'The number of guests or portions you intend to prepare.'
      },
      {
        symbol: 'Scale Multiplier',
        name: 'Scaling Factor',
        description: 'The proportional ratio (Desired ÷ Original) used to multiply all ingredient amounts.'
      },
      {
        symbol: 'Scaled Quantity',
        name: 'Adjusted Amount',
        description: 'The final recalculated ingredient amount required for your target batch.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Recipe Scaling Multipliers & Adjustments',
    description: 'Standard recipe batch factors and culinary scaling guidelines:',
    headers: ['Batch Size', 'Scale Multiplier', 'Calculation Method', 'Typical Kitchen Use Case'],
    rows: [
      ['Quarter Batch (0.25x)', '0.25x', 'Divide original by 4', 'Single-portion meal from a 4-person family recipe'],
      ['Half Batch (0.50x)', '0.50x', 'Divide original by 2', 'Cooking for two from a standard 4-serving cookbook recipe'],
      ['Original Recipe (1.00x)', '1.00x', 'Multiply by 1.0 (baseline)', 'Standard recipe baseline'],
      ['Double Batch (2.00x)', '2.00x', 'Multiply original by 2', 'Dinner parties, freezer meal prep, 2-tier cakes'],
      ['2.5x Batch', '2.50x', 'Multiply original by 2.5', 'Scaling a 4-person meal for 10 dinner guests'],
      ['Triple Batch (3.00x)', '3.00x', 'Multiply original by 3', 'Large family gatherings, potlucks, holiday baking'],
      ['Commercial / Large Event', '5.00x – 10.00x', 'Multiply by 5 to 10', 'Event catering, restaurant prep, commercial batches']
    ]
  },

  example: {
    title: 'Example: Scaling a 4-Serving Recipe up to 10 Guests',
    description: 'Suppose you have a chocolate chip cookie recipe designed for 4 servings that calls for 2 cups of flour and 300 grams of sugar, and you want to scale it for 10 guests.',
    inputs: [
      { label: 'Original Servings', value: '4 Servings' },
      { label: 'Desired Servings', value: '10 Servings' },
      { label: 'Ingredients', value: '2 cups Flour, 300g Sugar' }
    ],
    steps: [
      'Step 1: Calculate the scale multiplier: 10 ÷ 4 = 2.50x.',
      'Step 2: Scale Flour: 2 cups × 2.50 = 5 cups.',
      'Step 3: Scale Sugar: 300 grams × 2.50 = 750 grams.',
      'Step 4: Quantities are scaled proportionately while units remain unchanged.'
    ],
    calculation: 'Scale Factor = 10 / 4 = 2.50x → Flour: 2 × 2.5 = 5 cups | Sugar: 300 × 2.5 = 750g',
    result: 'Multiplier: 2.50x | Flour: 5 cups | Sugar: 750 grams'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Ingredient amounts scale linearly with precision, showing clean whole numbers or up to 2 decimal places for fractions.',
      'When cooking large batch recipes, units can be freely mixed across rows: you can enter cups for flour, grams for sugar, and teaspoons for vanilla extract within the same table.'
    ]
  },

  faqs: [
    {
      question: 'Do cooking and baking times double when I double a recipe?',
      answer: 'No. Cooking and baking times depend on food thickness and pan surface area rather than total volume. When doubling a cake or casserole recipe, divide the batter into two standard pans and bake for the original recipe duration.'
    },
    {
      question: 'How should I scale spices, herbs, and salt for large batches?',
      answer: 'When scaling recipes up by 3x or more, scale potent spices, chili, and salt conservatively (e.g. at 1.5x to 2x rather than 3x), and adjust to taste towards the end of cooking because flavor concentration can intensify.'
    },
    {
      question: 'How do I halve a recipe that calls for 1 whole egg?',
      answer: 'Whisk 1 whole egg in a small cup and measure out exactly 2 tablespoons (or approximately 25 grams) of the beaten egg mixture.'
    },
    {
      question: 'Can I mix metric grams and US cups in the same recipe table?',
      answer: 'Yes. The scaler applies proportional multiplication to each numeric quantity independently, preserving whatever unit label you enter for each ingredient row.'
    },
    {
      question: 'How do leavening agents (baking powder and baking soda) behave when scaled?',
      answer: 'For recipes scaled up to 3x, baking powder and baking soda scale proportionately. For massive commercial batches (4x+), bakers often reduce leavening agents slightly to avoid over-aeration.'
    }
  ],

  notes: {
    title: 'Important Notes & Culinary Standards',
    items: [
      'Linear Scaling: Units (cups, grams, tbsp, mL) remain identical while numerical quantities multiply proportionally.',
      'Baking Pan Adjustments: Maintain original batter depths by using multiple baking pans to ensure even oven heat distribution.',
      'Dynamic Row Management: Add or edit as many custom ingredient rows as necessary for complex multi-step recipes.'
    ]
  }
};
