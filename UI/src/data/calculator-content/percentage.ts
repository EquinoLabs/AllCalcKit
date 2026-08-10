import type { CalculatorContent } from './types';

export const percentageContent: CalculatorContent = {
  id: 'percentage',

  intro: {
    title: 'What is a Percentage Calculator?',
    paragraphs: [
      'A percentage calculator is a versatile math tool designed to quickly solve everyday percentage problems. The word "percent" originates from the Latin "per centum," meaning "by the hundred." Percentages express fractions and ratios as a standardized proportion out of 100.',
      'This 3-in-1 calculator suite handles the most common real-world percentage calculations: finding the percentage of a total amount, determining what percentage one value is of another, and calculating the percentage increase or decrease between two numbers. Results update instantly as you type.'
    ]
  },

  howToUse: {
    title: 'How to Use the Percentage Calculator',
    description: 'Select the calculation mode that fits your question and enter your numbers:',
    steps: [
      'To find a percentage of an amount (What is X% of Y?): Enter the percentage in box X and the total amount in box Y.',
      'To find a percentage share (X is what % of Y?): Enter the part value in box X and the total base value in box Y.',
      'To find percentage increase or decrease (% Change from V1 to V2): Enter your initial starting value in V1 and your final value in V2.',
      'Review your real-time results below each calculation block, formatted with clear signs (+ for increases, - for decreases).'
    ]
  },

  howItWorks: {
    title: 'How Percentage Calculations Work',
    paragraphs: [
      'Percentages convert proportional relationships into a scale of 100, making comparison between different numbers straightforward.',
      'Each calculation mode uses a standard mathematical formula based on division and multiplication by 100.'
    ],
    formula: '1. Value = (X ÷ 100) × Y  |  2. Percentage = (X ÷ Y) × 100  |  3. % Change = ((V2 - V1) ÷ |V1|) × 100',
    formulaExplanation: 'Where X is the percentage or part, Y is the total base, and V1 & V2 represent initial and final values.',
    variables: [
      {
        symbol: 'X (Percentage / Part)',
        name: 'Percentage or Portion',
        description: 'The rate per 100, or the subset value being compared against a total.'
      },
      {
        symbol: 'Y (Total Amount)',
        name: 'Base Total',
        description: 'The complete whole quantity (100% reference baseline).'
      },
      {
        symbol: 'V1 (Initial Value)',
        name: 'Starting Value',
        description: 'The baseline amount before a change occurs.'
      },
      {
        symbol: 'V2 (Final Value)',
        name: 'Ending Value',
        description: 'The new amount after an increase or decrease.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Percentage, Fraction & Decimal Equivalents',
    description: 'Quick reference guide for standard fractional amounts and their percentage equivalents:',
    headers: ['Fraction', 'Percentage (%)', 'Decimal Form', 'Common Meaning'],
    rows: [
      ['1/10', '10%', '0.10', 'One tenth (e.g., standard sales tax or tithe)'],
      ['1/8', '12.5%', '0.125', 'One eighth (common in interest rates)'],
      ['1/5', '20%', '0.20', 'One fifth (standard tip or discount)'],
      ['1/4', '25%', '0.25', 'One quarter (25 cents on the dollar)'],
      ['1/3', '33.33%', '0.3333', 'One third (repeating decimal)'],
      ['1/2', '50%', '0.50', 'Half (fifty percent of total)'],
      ['2/3', '66.67%', '0.6667', 'Two thirds'],
      ['3/4', '75%', '0.75', 'Three quarters'],
      ['1/1', '100%', '1.00', 'Complete whole amount']
    ]
  },

  example: {
    title: 'Example: Calculating Percentage Increase',
    description: 'Suppose a retail product originally priced at $80 increases to $100, and you want to find the percentage price increase.',
    inputs: [
      { label: 'Initial Price (V1)', value: '$80' },
      { label: 'New Price (V2)', value: '$100' }
    ],
    steps: [
      'Step 1: Calculate the absolute difference: $100 - $80 = $20.',
      'Step 2: Divide the difference by the original baseline: $20 ÷ $80 = 0.25.',
      'Step 3: Multiply by 100 to convert to a percentage: 0.25 × 100 = 25%.'
    ],
    calculation: '((100 - 80) ÷ 80) × 100 = (20 ÷ 80) × 100 = +25%',
    result: '+25% (Price increased by 25%)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Percentage results represent proportional comparisons. For percentage change calculations, a positive number (+%) signifies growth or increase, while a negative number (-%) indicates a reduction or discount.',
      'Results are displayed as exact integers when possible, or rounded to 2 decimal places (such as 33.33%) for clean presentation.'
    ]
  },

  faqs: [
    {
      question: 'How do I calculate a percentage of a number manually?',
      answer: 'To calculate a percentage of a number, convert the percentage into a decimal by dividing by 100, then multiply by the total. For example, to find 15% of 200: 15 ÷ 100 = 0.15, and 0.15 × 200 = 30.'
    },
    {
      question: 'What is the difference between percentage change and percentage points?',
      answer: 'Percentage change measures the relative proportional change between two numbers, while percentage points measure the simple arithmetic difference between two percentages. For example, if an interest rate rises from 10% to 15%, it increased by 5 percentage points, but the relative percentage increase is 50% ((15 - 10) ÷ 10 × 100).'
    },
    {
      question: 'How do I calculate percentage increase or decrease?',
      answer: 'Subtract the old value from the new value, divide the result by the absolute value of the old starting number, and multiply by 100. A positive result means an increase, and a negative result means a decrease.'
    },
    {
      question: 'Can a percentage be greater than 100%?',
      answer: 'Yes. A percentage over 100% indicates that the part is larger than the original base. For instance, 200% of a number is twice the original amount, and an increase from 50 to 150 represents a +200% growth.'
    },
    {
      question: 'How do I convert a fraction into a percentage?',
      answer: 'Divide the numerator (top number) by the denominator (bottom number) to get a decimal, then multiply by 100. For example, 3/4 = 0.75, which equals 75%.'
    }
  ],

  notes: {
    title: 'Important Notes & Mathematical Guidelines',
    items: [
      'Division by Zero: If the base value (Y) or initial value (V1) is 0, the percentage cannot be calculated and displays N/A, since division by zero is undefined.',
      'Rounding: Outputs are formatted to 2 decimal places for fractional values to maintain clear readability.',
      'Relative Baseline: Percentage change is always calculated relative to the starting value (V1), not the final value (V2).'
    ]
  }
};
