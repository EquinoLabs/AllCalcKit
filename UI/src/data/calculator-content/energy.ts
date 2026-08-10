import type { CalculatorContent } from './types';

export const energyContent: CalculatorContent = {
  id: 'energy',

  intro: {
    title: 'What is an Energy Converter?',
    paragraphs: [
      'An energy converter is a comprehensive physical and nutritional calculation tool that translates energy, heat, and electrical work values across scientific, dietary, electrical, and subatomic scales: Joules (J), Kilojoules (kJ), Calories (cal), Kilocalories (kcal / dietary calories), Watt-hours (Wh), Kilowatt-hours (kWh), and Electron-volts (eV).',
      'Whether you are comparing food nutrition labels between calories and kilojoules, calculating household electricity consumption in kilowatt-hours (kWh), sizing rechargeable battery packs in Watt-hours, or analyzing thermodynamic physics problems, accurate energy conversion is fundamental. All conversions calculate in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Energy Converter',
    description: 'Convert between any energy units in three simple steps:',
    steps: [
      'Select your starting energy unit from the "From Unit" dropdown (such as Kilocalories, kcal).',
      'Select your desired target unit from the "To Target" dropdown (such as Kilojoules, kJ).',
      'Type any numeric energy value into the starting input box.',
      'View your converted result immediately in the target display box, with the live formula breakdown below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Energy Conversion Works',
    paragraphs: [
      'Energy represents the quantitative physical property transferred to an object to perform mechanical work or produce heat. In the International System of Units (SI), the fundamental base unit of energy is the Joule (J), defined as 1 Newton-meter (N·m) or 1 Watt-second (W·s).',
      'The calculator uses the Joule (J) as its universal reference baseline. Your starting energy quantity is multiplied by its defined Joule ratio to find the total joules, and then divided by the target unit\'s ratio to calculate the converted result.'
    ],
    formula: 'Converted Energy = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of Joules (J) equal to 1 unit of that energy measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Energy',
        description: 'The numeric quantity of energy or work you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The energy in Joules (J) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The energy in Joules (J) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Energy',
        name: 'Final Output',
        description: 'The resulting energy expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Energy & Work Conversion Factors',
    description: 'Standard values of supported energy units compared to the base Joule (J):',
    headers: ['Unit Name', 'Symbol', 'Category', 'Equivalent in Joules (J)', 'Common Application'],
    rows: [
      ['Electron-volt', 'eV', 'Quantum Physics', '1.602177 × 10⁻¹⁹ J', 'Atomic physics, photon energy, semiconductor bandgaps'],
      ['Joule', 'J', 'SI Base Unit', '1 J', 'Mechanical work (1 N·m), physics kinetic/potential energy'],
      ['Calorie (thermochemical)', 'cal', 'Thermal', '4.184 J', 'Heat required to warm 1 g of water by 1°C'],
      ['Kilojoule', 'kJ', 'Metric / Food', '1,000 J', 'International food nutrition labels (10³ J)'],
      ['Watt-hour', 'Wh', 'Electrical', '3,600 J', 'Power bank & laptop battery capacity (1 W for 1 hr)'],
      ['Kilocalorie / Food Calorie', 'kcal / Cal', 'Dietary', '4,184 J', 'Standard food nutrition calories (1,000 cal)'],
      ['Kilowatt-hour', 'kWh', 'Electric Utility', '3,600,000 J', 'Residential electric utility billing (3.6 MJ)']
    ]
  },

  example: {
    title: 'Example: Converting Food Calories to Kilojoules (kcal to kJ)',
    description: 'Suppose a nutritional snack bar contains 250 kcal (food calories) and you want to convert it to Kilojoules (kJ) for an international nutrition label.',
    inputs: [
      { label: 'Starting Energy', value: '250 Kilocalories (kcal)' },
      { label: 'Target Unit', value: 'Kilojoules (kJ)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 kcal = 4,184 Joules (4.184 kJ).',
      'Step 2: Convert kcal to base Joules: 250 × 4,184 = 1,046,000 Joules.',
      'Step 3: Divide by the kilojoule factor (1,000 J/kJ): 1,046,000 ÷ 1,000 = 1,046 kJ.'
    ],
    calculation: '250 kcal × 4.184 kJ/kcal = 1,046 kJ',
    result: '1,046 Kilojoules (kJ)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Energy values are calculated with full physical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'When reviewing dietary information, remember that 1 food Calorie (kcal) is exactly 4.184 kilojoules (kJ). In electricity, 1 kilowatt-hour (kWh) equals 3.6 million Joules (3.6 MJ) or approximately 860.42 kcal.'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between a dietary Calorie and a scientific calorie?',
      answer: 'A dietary "Calorie" (often written with an uppercase C) is actually a kilocalorie (1 kcal = 1,000 small chemistry calories). One dietary calorie equals 4,184 Joules (4.184 kJ).'
    },
    {
      question: 'How do I convert electricity kilowatt-hours (kWh) to Joules?',
      answer: 'Multiply the kWh value by 3,600,000 (since 1 kWh = 1,000 Watts × 3,600 seconds = 3.6 Megajoules).'
    },
    {
      question: 'What is a Watt-hour (Wh) and how is it used in batteries?',
      answer: 'A Watt-hour measures total energy capacity over time. For rechargeable batteries, Watt-hours can be computed by multiplying voltage by Amp-hours (Wh = V × Ah). For example, a 3.7V, 10,000 mAh power bank has 37 Wh of energy.'
    },
    {
      question: 'Why do food labels in Australia and Europe use kJ instead of calories?',
      answer: 'The Kilojoule (kJ) is the official metric SI standard for energy. Many countries mandate or prioritize kilojoules on nutritional packaging to align with international scientific units.'
    },
    {
      question: 'What is an Electron-volt (eV)?',
      answer: 'An Electron-volt is a tiny unit of energy equal to the kinetic energy gained by an electron accelerating across an electric potential of 1 volt (approximately 1.602 × 10⁻¹⁹ Joules). It is standard in atomic and semiconductor physics.'
    }
  ],

  notes: {
    title: 'Important Notes & Energy Standards',
    items: [
      'Dietary Energy Standard: In accordance with standard nutritional science, 1 food Calorie (kcal) is defined as exactly 4,184 Joules (4.184 kJ).',
      'Electrical Conversion: 1 Kilowatt-hour (kWh) = 3.6 Megajoules (MJ) = 3,600,000 Joules.',
      'Precision: Decimal values are rounded to up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
