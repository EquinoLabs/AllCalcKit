import type { CalculatorContent } from './types';

export const lengthContent: CalculatorContent = {
  id: 'length',

  intro: {
    title: 'What is a Length Converter?',
    paragraphs: [
      'A length converter allows you to quickly convert measurements and distances between different units of length. Whether you are working on a home improvement project, calculating travel distances, following a blueprint, or solving homework problems, converting between metric and imperial measurements is a common everyday need.',
      'This tool lets you easily convert between 8 popular units of length: millimeters (mm), centimeters (cm), meters (m), kilometers (km), inches (in), feet (ft), yards (yd), and miles (mi). Results update automatically as you type, giving you instant and accurate answers.'
    ]
  },

  howToUse: {
    title: 'How to Use the Length Converter',
    description: 'Follow these simple steps to convert any length or distance:',
    steps: [
      'Select your starting unit from the "From Unit" dropdown menu (for example, Meters, Feet, or Kilometers).',
      'Enter the numerical value you want to convert in the input box.',
      'Choose your destination unit from the "To Target" dropdown menu (for example, Inches, Centimeters, or Miles).',
      'View the converted result instantly in the target field, along with the exact mathematical equation shown in the formula bar below.',
      'Use the Swap button (⇄) to invert the conversion direction with a single click, or click "Copy Result" to copy the formatted answer to your clipboard.'
    ]
  },

  howItWorks: {
    title: 'How Length Conversion Works',
    paragraphs: [
      'Length conversion is based on fixed mathematical relationships between units. To convert from any unit to another, all measurements relate back to a common base unit: the meter (m).',
      'First, your starting value is converted into meters using its standard conversion factor. Then, that value is converted from meters into your target unit. This ensures consistent and accurate results for any unit combination.'
    ],
    formula: 'Converted Value = (Starting Value × Source Unit Factor) ÷ Target Unit Factor',
    formulaExplanation: 'Where each unit has an exact standard relationship to the meter (m).',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Initial Measurement',
        description: 'The number you enter in your starting unit.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Base Conversion Factor',
        description: 'The length of 1 source unit in meters (e.g., 1 foot = 0.3048 m).'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Conversion Factor',
        description: 'The length of 1 target unit in meters (e.g., 1 inch = 0.0254 m).'
      },
      {
        symbol: 'Converted Value',
        name: 'Final Result',
        description: 'The calculated measurement in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Length Conversion Factors',
    description: 'Reference equivalencies for 1 unit across standard metric and imperial units:',
    headers: ['Unit Name', 'Symbol', 'Equivalent in Meters (m)', 'Equivalent in Feet (ft)', 'Equivalent in Inches (in)'],
    rows: [
      ['Millimeter', 'mm', '0.001 m', '0.003281 ft', '0.039370 in'],
      ['Centimeter', 'cm', '0.01 m', '0.032808 ft', '0.393701 in'],
      ['Meter (Base Unit)', 'm', '1 m', '3.28084 ft', '39.3701 in'],
      ['Kilometer', 'km', '1,000 m', '3,280.84 ft', '39,370.1 in'],
      ['Inch', 'in', '0.0254 m', '0.083333 ft', '1 in'],
      ['Foot', 'ft', '0.3048 m', '1 ft', '12 in'],
      ['Yard', 'yd', '0.9144 m', '3 ft', '36 in'],
      ['Mile', 'mi', '1,609.344 m', '5,280 ft', '63,360 in']
    ]
  },

  example: {
    title: 'Example: Converting Meters to Feet',
    description: 'Suppose you have a room length of 5 meters and want to know what that measurement is in feet for planning furniture or construction.',
    inputs: [
      { label: 'Starting Length', value: '5 Meters (m)' },
      { label: 'Target Unit', value: 'Feet (ft)' }
    ],
    steps: [
      'Step 1: Use the standard conversion factor: 1 meter is approximately 3.28084 feet (1 foot = 0.3048 meters).',
      'Step 2: Divide the number of meters by 0.3048 (or multiply by 3.28084):',
      'Step 3: 5 ÷ 0.3048 = 16.404199 feet'
    ],
    calculation: '5 m ÷ 0.3048 m/ft = 16.404199 ft',
    result: '16.404199 ft (approx. 16 feet 4.85 inches)'
  },

  resultExplanation: {
    title: 'Understanding Your Converted Result',
    paragraphs: [
      'Results are calculated using standard conversion factors and displayed with up to 6 decimal places. Unnecessary trailing zeros are removed to keep results clean and easy to read.',
      'When converting to feet, keep in mind that the decimal portion represents a fraction of a foot rather than inches. For example, 0.404199 feet is approximately 4.85 inches (since 0.404199 × 12 inches per foot ≈ 4.85 inches).'
    ]
  },

  faqs: [
    {
      question: 'How do I convert meters to feet?',
      answer: 'To convert meters to feet, divide your value in meters by 0.3048, or multiply by approximately 3.28084. For example, 3 meters is equal to 3 ÷ 0.3048 ≈ 9.84252 feet.'
    },
    {
      question: 'How many centimeters are in one meter?',
      answer: 'There are exactly 100 centimeters in one meter. The prefix "centi-" means one hundredth, so each centimeter is 1/100th of a meter.'
    },
    {
      question: 'What is the difference between metric and imperial length units?',
      answer: 'The metric system is a decimal-based system where units scale by powers of ten (millimeters, centimeters, meters, kilometers), making calculations simple. The imperial system (commonly used in the United States and UK) uses units like inches, feet (12 inches), yards (3 feet), and miles (5,280 feet).'
    },
    {
      question: 'What length units does this converter support?',
      answer: 'This tool supports 8 common units of length: Millimeters (mm), Centimeters (cm), Meters (m), Kilometers (km), Inches (in), Feet (ft), Yards (yd), and Miles (mi).'
    },
    {
      question: 'How accurate are the length conversions?',
      answer: 'Conversions use exact standard conversion factors (such as 1 inch = 25.4 mm and 1 foot = 0.3048 m). Results are displayed with up to 6 decimal places for high precision.'
    }
  ],

  notes: {
    title: 'Important Notes & Measurement Standards',
    items: [
      'Standardized Definitions: Worldwide metric and imperial conversions follow the 1959 International Yard and Pound agreement, which established exact definitions (such as 1 inch = exactly 2.54 cm and 1 foot = exactly 0.3048 m).',
      'Exact vs. Rounded Values: Conversions between standard metric and imperial units with defined ratios are exact. When dividing produces repeating decimals, results are rounded to 6 decimal places for readability.',
      'Choosing the Right Unit: Use units suited to your scale — millimeters for small craft or DIY precision, meters and feet for room sizes, and kilometers or miles for travel distances.'
    ]
  }
};
