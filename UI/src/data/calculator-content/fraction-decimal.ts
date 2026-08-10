import type { CalculatorContent } from './types';

export const fractionDecimalContent: CalculatorContent = {
  id: 'fraction-decimal',

  intro: {
    title: 'What is a Fraction ↔ Decimal Converter?',
    paragraphs: [
      'A Fraction ↔ Decimal Converter is an interactive mathematical tool that converts fractions into decimal numbers and decimals into simplified, reduced fractions and mixed numbers. Whether you are checking math homework, reading tape measure increments in woodworking, adjusting recipe measurements, or interpreting manufacturing blueprint tolerances, converting between fractional and decimal notations is a daily necessity.',
      'This converter provides two-way real-time calculations: entering a decimal instantly computes its simplified fraction, mixed number, and Greatest Common Divisor (GCD) breakdown, while entering a numerator and denominator immediately calculates the decimal quotient and reduced form.'
    ]
  },

  howToUse: {
    title: 'How to Use the Fraction ↔ Decimal Converter',
    description: 'Convert between fractions and decimal values in either direction:',
    steps: [
      'To convert from a decimal, type any decimal number (such as 1.75 or 0.375) into the "Decimal Value" input.',
      'To convert from a fraction, enter the top number into the "Numerator" box and the bottom number into the "Denominator" box (such as 7 and 4).',
      'View your simplified fraction, mixed number format, decimal value, and step-by-step reduction logic automatically in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Fraction and Decimal Conversion Works',
    paragraphs: [
      'Converting from a fraction to a decimal is straightforward: divide the numerator by the denominator (Numerator ÷ Denominator = Decimal Quotient).',
      'Converting from a decimal to a fraction involves writing the decimal as a fraction over a power of 10 (for example, 0.75 has two decimal places, so it becomes 75/100). The calculator then uses the Euclidean algorithm to find the Greatest Common Divisor (GCD) of both numbers and divides both the numerator and denominator by that factor to reduce the fraction to its lowest terms.'
    ],
    formula: 'Decimal = Numerator ÷ Denominator  |  Fraction = (Decimal × 10ᵏ ÷ GCD) / (10ᵏ ÷ GCD)',
    formulaExplanation: 'Where k is the number of decimal digits, and GCD is the Greatest Common Divisor used to simplify the fraction.',
    variables: [
      {
        symbol: 'Numerator',
        name: 'Top Number',
        description: 'The number of equal parts being represented.'
      },
      {
        symbol: 'Denominator',
        name: 'Bottom Number',
        description: 'The total number of equal parts into which the whole is divided (must not be 0).'
      },
      {
        symbol: 'Decimal Value',
        name: 'Decimal Quotient',
        description: 'The continuous numeric representation obtained by dividing numerator by denominator.'
      },
      {
        symbol: 'GCD',
        name: 'Greatest Common Divisor',
        description: 'The largest positive integer that divides both numbers evenly to achieve lowest terms.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Fraction to Decimal Reference Chart',
    description: 'Standard fractional measurements frequently used in carpentry, cooking, and engineering:',
    headers: ['Fraction', 'Decimal Equivalent', 'Percentage', 'Classification'],
    rows: [
      ['1/16', '0.0625', '6.25%', 'Proper Fraction (Woodworking increment)'],
      ['1/8', '0.125', '12.5%', 'Proper Fraction'],
      ['3/16', '0.1875', '18.75%', 'Proper Fraction'],
      ['1/4', '0.25', '25.0%', 'Proper Fraction (Quarter)'],
      ['5/16', '0.3125', '31.25%', 'Proper Fraction'],
      ['1/3', '0.3333...', '33.33%', 'Repeating Decimal'],
      ['3/8', '0.375', '37.5%', 'Proper Fraction'],
      ['1/2', '0.5', '50.0%', 'Proper Fraction (Half)'],
      ['5/8', '0.625', '62.5%', 'Proper Fraction'],
      ['2/3', '0.6667...', '66.67%', 'Repeating Decimal'],
      ['3/4', '0.75', '75.0%', 'Proper Fraction (Three Quarters)'],
      ['7/8', '0.875', '87.5%', 'Proper Fraction'],
      ['5/4 (1 1/4)', '1.25', '125.0%', 'Improper Fraction / Mixed Number']
    ]
  },

  example: {
    title: 'Example: Converting Decimal 1.75 to a Simplified Fraction',
    description: 'Suppose you have a measurement of 1.75 inches and want to express it as a simplified fraction and mixed number.',
    inputs: [
      { label: 'Starting Value', value: '1.75 (Decimal)' }
    ],
    steps: [
      'Step 1: Write the decimal as a fraction over 100 (two decimal places): 175 / 100.',
      'Step 2: Find the Greatest Common Divisor of 175 and 100: GCD(175, 100) = 25.',
      'Step 3: Divide numerator and denominator by 25: 175 ÷ 25 = 7, and 100 ÷ 25 = 4. The simplified improper fraction is 7 / 4.',
      'Step 4: Convert improper fraction to mixed number: 7 ÷ 4 = 1 with a remainder of 3, giving 1 3/4.'
    ],
    calculation: '1.75 = 175/100 = (175 ÷ 25) / (100 ÷ 25) = 7/4 = 1 3/4',
    result: '7 / 4 (Mixed Number: 1 3/4, Decimal: 1.75)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Proper fractions occur when the numerator is smaller than the denominator (e.g., 3/4). Improper fractions occur when the numerator is larger than the denominator (e.g., 7/4).',
      'The calculator automatically converts improper fractions into mixed numbers (such as 1 3/4), displaying the whole integer and the remaining proper fractional part.'
    ]
  },

  faqs: [
    {
      question: 'How do you convert a decimal to a fraction manually?',
      answer: 'Count the number of digits after the decimal point (k). Write the decimal digits as the numerator over 10ᵏ as the denominator (e.g., 0.45 = 45/100). Then divide both numbers by their Greatest Common Divisor (GCD) to simplify (45/100 = 9/20).'
    },
    {
      question: 'What is the Greatest Common Divisor (GCD) and why is it used?',
      answer: 'The GCD is the largest positive integer that divides two numbers without leaving a remainder. Dividing both the numerator and denominator by their GCD reduces any fraction to its simplest, lowest possible terms.'
    },
    {
      question: 'What is the difference between an improper fraction and a mixed number?',
      answer: 'An improper fraction has a numerator greater than or equal to its denominator (like 7/4). A mixed number expresses the same quantity as a whole integer combined with a proper fraction (like 1 3/4).'
    },
    {
      question: 'Why can a denominator never be zero?',
      answer: 'Division by zero is undefined in mathematics because no number multiplied by zero can equal a non-zero numerator. A fraction with denominator 0 cannot represent a real numerical quantity.'
    },
    {
      question: 'How do I read fractional inches on a tape measure?',
      answer: 'Standard tape measures divide each inch into 16 increments: 1/16 = 0.0625", 1/8 = 0.125", 1/4 = 0.25", 3/8 = 0.375", 1/2 = 0.5", 5/8 = 0.625", 3/4 = 0.75", and 7/8 = 0.875".'
    }
  ],

  notes: {
    title: 'Important Notes & Mathematical Standards',
    items: [
      'Two-Way Dynamic Sync: Updating the decimal field automatically calculates the fraction, and typing into the fraction inputs immediately updates the decimal quotient.',
      'Automatic Simplification: All fractions are automatically reduced to lowest terms using GCD integer reduction.',
      'Non-Zero Denominator: The denominator must be a non-zero integer for valid mathematical division.'
    ]
  }
};
