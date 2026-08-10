import type { CalculatorContent } from './types';

export const fuelEfficiencyContent: CalculatorContent = {
  id: 'fuel-efficiency',

  intro: {
    title: 'What is a Fuel Efficiency Converter?',
    paragraphs: [
      'A fuel efficiency converter is an automotive mileage calculation tool that converts vehicle gas mileage and fuel economy ratings between US Customary (Miles per Gallon, US MPG), Imperial British (Miles per Gallon, UK MPG), and International Metric (Kilometers per Liter, km/L) units.',
      'Whether you are comparing fuel economy across imported vehicles, evaluating EPA window stickers against European and Asian specifications, calculating fuel requirements for long-distance road trips, or understanding why UK vehicle reviews cite higher MPG numbers, converting fuel efficiency accurately is essential. All calculations update in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Fuel Efficiency Converter',
    description: 'Convert between any vehicle fuel economy ratings in three simple steps:',
    steps: [
      'Select your starting fuel efficiency unit from the "From Unit" dropdown (such as US MPG).',
      'Select your desired target unit from the "To Target" dropdown (such as Kilometers per Liter, km/L).',
      'Type any numeric fuel economy value into the starting input field.',
      'View your converted result immediately in the target display box, with the live calculation formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Fuel Efficiency Conversion Works',
    paragraphs: [
      'Fuel efficiency measures the distance a vehicle travels per unit volume of fuel consumed (Distance ÷ Volume). Because both the distance unit (miles vs. kilometers) and the volume unit (US gallons vs. UK imperial gallons vs. liters) differ across regions, converting ratings requires standard physical ratio factors.',
      'The calculator uses Kilometers per Liter (km/L) as its central reference baseline. Your starting rating is multiplied by its defined km/L ratio to find the base efficiency, and then divided by the target unit\'s ratio to compute the exact converted output.'
    ],
    formula: 'Converted Economy = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of kilometers per liter (km/L) equal to 1 unit of that fuel economy rating.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Economy',
        description: 'The numeric fuel economy rating you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The efficiency in km/L equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The efficiency in km/L equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Economy',
        name: 'Final Output',
        description: 'The resulting fuel efficiency expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Vehicle Fuel Economy Benchmarks & System Comparisons',
    description: 'Standard vehicle class benchmarks compared across all three supported systems:',
    headers: ['Vehicle Category', 'Kilometers per Liter (km/L)', 'US MPG', 'UK MPG', 'Typical Class Examples'],
    rows: [
      ['Heavy Truck / Commercial', '4 km/L', '9.41 US MPG', '11.30 UK MPG', 'Semi-trucks, heavy commercial haulers'],
      ['Full-Size SUV / V8 Truck', '8 km/L', '18.82 US MPG', '22.60 UK MPG', 'Large pickups, 3-row SUVs'],
      ['Midsize Sedan / Crossover', '12 km/L', '28.23 US MPG', '33.90 UK MPG', 'Family sedans, compact AWD crossovers'],
      ['Compact Hatchback', '15 km/L', '35.28 US MPG', '42.37 UK MPG', 'City cars, turbocharged 4-cylinders'],
      ['High-Efficiency Hybrid', '22 km/L', '51.75 US MPG', '62.15 UK MPG', 'Standard gas-electric hybrids'],
      ['Base Benchmark (1 km/L)', '1 km/L', '2.352146 US MPG', '2.824811 UK MPG', 'Baseline ratio reference']
    ]
  },

  example: {
    title: 'Example: Converting US MPG to km/L',
    description: 'Suppose a car window sticker lists an EPA highway fuel economy rating of 30 US MPG, and you want to convert it to kilometers per liter (km/L).',
    inputs: [
      { label: 'Starting Economy', value: '30 Miles per Gallon (US MPG)' },
      { label: 'Target Unit', value: 'Kilometers per Liter (km/L)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 US MPG = 0.425144 km/L.',
      'Step 2: Multiply the US MPG rating by the km/L factor: 30 × 0.425144.',
      'Step 3: Compute the converted efficiency: 30 × 0.425144 ≈ 12.754320 km/L.'
    ],
    calculation: '30 US MPG × 0.425144 (km/L)/US MPG = 12.754320 km/L',
    result: '12.754320 Kilometers per Liter (km/L) (≈ 12.75 km/L)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Fuel economy ratings are computed with high mathematical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'Notice that UK MPG values are always approximately 20.09% higher than US MPG values for the exact same vehicle. This is because 1 UK Imperial gallon (4.546 L) contains more fuel than 1 US liquid gallon (3.785 L), allowing a vehicle to travel further on a single UK gallon.'
    ]
  },

  faqs: [
    {
      question: 'Why is UK MPG higher than US MPG for the same car?',
      answer: 'An Imperial UK gallon is approximately 20.09% larger than a US liquid gallon (4.54609 liters vs. 3.78541 liters). Because a UK gallon holds more fuel, the vehicle travels about 20% more miles per gallon.'
    },
    {
      question: 'How do I convert US MPG to km/L in my head?',
      answer: 'Divide the US MPG value by 2.35 (or multiply by 0.425). For example, 24 US MPG ÷ 2.35 ≈ 10.2 km/L.'
    },
    {
      question: 'How do I convert km/L to Liters per 100 km (L/100km)?',
      answer: 'Divide 100 by the km/L value (L/100km = 100 ÷ km/L). For example, a car that achieves 15 km/L consumes 100 ÷ 15 = 6.67 L/100km.'
    },
    {
      question: 'What is considered good fuel economy for a passenger vehicle?',
      answer: 'For conventional gasoline sedans, ratings above 30 US MPG (~12.75 km/L or ~36 UK MPG) are considered efficient. For hybrid vehicles, ratings routinely exceed 50 US MPG (~21.25 km/L or ~60 UK MPG).'
    },
    {
      question: 'Does vehicle speed affect fuel efficiency?',
      answer: 'Yes. Aerodynamic drag increases with the square of vehicle speed. Driving at 75 mph (120 km/h) typically consumes 15% to 25% more fuel per mile than cruising at 55 mph (90 km/h).'
    }
  ],

  notes: {
    title: 'Important Notes & Fuel Standards',
    items: [
      'Gallon Standard Distinction: 1 US Liquid Gallon = 3.78541 Liters; 1 UK Imperial Gallon = 4.54609 Liters.',
      'Distance-per-Volume Metric: Higher numbers indicate greater fuel efficiency in km/L, US MPG, and UK MPG.',
      'Precision: Decimal outputs are rounded to up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
