import type { CalculatorContent } from './types';

export const speedContent: CalculatorContent = {
  id: 'speed',

  intro: {
    title: 'What is a Speed Converter?',
    paragraphs: [
      'A speed converter is a versatile velocity calculation tool that converts speed rates across metric, imperial, nautical, and supersonic scales. Whether you are driving internationally and converting highway speed limits between kilometers per hour (km/h) and miles per hour (mph), tracking athletic sprinting speeds in meters per second (m/s), planning nautical voyages in knots, or analyzing aircraft speeds in Mach, fast and accurate speed conversion is crucial.',
      'This tool supports 6 standard velocity units: kilometers per hour, meters per second, miles per hour, knots, feet per second, and Mach. Results update in real time with exact physical ratios.'
    ]
  },

  howToUse: {
    title: 'How to Use the Speed Converter',
    description: 'Convert any speed or velocity reading in three simple steps:',
    steps: [
      'Select your starting speed unit from the "From Unit" dropdown (such as Kilometers per hour).',
      'Select your target unit from the "To Target" dropdown (such as Miles per hour).',
      'Type any numeric speed value into the starting input field.',
      'View your converted result immediately in the target display box, with the live formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Speed Conversion Works',
    paragraphs: [
      'Speed represents the rate of distance covered per unit of time (Speed = Distance ÷ Time). Converting between speed units involves converting both the distance unit and the time unit simultaneously.',
      'The calculator uses kilometers per hour (km/h) as its central reference baseline. Your starting speed is multiplied by its unit ratio to calculate the equivalent speed in km/h, and then divided by the target unit\'s ratio to yield the converted result.'
    ],
    formula: 'Converted Speed = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of kilometers per hour (km/h) equal to 1 unit of that speed.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Speed',
        description: 'The numeric rate of motion you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The speed in km/h equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The speed in km/h equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Speed',
        name: 'Final Output',
        description: 'The resulting velocity expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Speed & Velocity Conversion Factors',
    description: 'Standard values of supported speed units compared to the base kilometer per hour (km/h):',
    headers: ['Unit Name', 'Symbol', 'Domain', 'Equivalent in km/h', 'Equivalent in mph (approx.)'],
    rows: [
      ['Kilometers per hour', 'km/h', 'Road / Metric (Base)', '1 km/h', '0.621371 mph'],
      ['Feet per second', 'ft/s', 'Ballistics / Physics', '1.09728 km/h', '0.681818 mph'],
      ['Miles per hour', 'mph', 'Road / Imperial & US', '1.609344 km/h', '1 mph'],
      ['Knots', 'kt', 'Maritime & Aviation', '1.852 km/h', '1.150779 mph'],
      ['Meters per second', 'm/s', 'SI Scientific Base', '3.6 km/h', '2.236936 mph'],
      ['Mach (Speed of Sound)', 'M', 'Aviation / Supersonic', '1,234.8 km/h', '767.269 mph']
    ]
  },

  example: {
    title: 'Example: Converting Highway Speed (km/h to mph)',
    description: 'Suppose you are driving in a country with a 100 km/h highway speed limit and want to convert it to miles per hour (mph).',
    inputs: [
      { label: 'Starting Speed', value: '100 Kilometers per hour (km/h)' },
      { label: 'Target Unit', value: 'Miles per hour (mph)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 mph = 1.609344 km/h.',
      'Step 2: Divide the km/h speed by the mph factor: 100 ÷ 1.609344.',
      'Step 3: Compute the converted speed: 100 ÷ 1.609344 ≈ 62.137119 mph.'
    ],
    calculation: '100 km/h ÷ 1.609344 km/h/mph = 62.137119 mph',
    result: '62.137119 Miles per hour (mph) (≈ 62.14 mph)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Speed results are calculated with full numeric precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'For quick everyday estimates, 60 mph is approximately 96.5 km/h, 100 km/h is roughly 62 mph, and 1 knot is approximately 1.15 mph.'
    ]
  },

  faqs: [
    {
      question: 'How can I quickly convert km/h to mph in my head?',
      answer: 'For a quick mental estimate, multiply the km/h value by 0.6 (or multiply by 6 and drop the zero). For example, 100 km/h × 0.6 = 60 mph (the exact value is 62.14 mph).'
    },
    {
      question: 'What is a knot and why is it used in maritime navigation?',
      answer: 'One knot equals one nautical mile per hour (exactly 1.852 km/h or ~1.151 mph). Nautical miles are directly tied to Earth\'s coordinates (1 nautical mile = 1 minute of latitude), making knots the standard for maritime and aviation navigation.'
    },
    {
      question: 'How fast is Mach 1?',
      answer: 'Mach 1 represents the local speed of sound in air. At standard sea-level atmospheric pressure and 20°C (68°F), Mach 1 is approximately 1,234.8 km/h (767.27 mph or 343 m/s).'
    },
    {
      question: 'How do I convert meters per second (m/s) to km/h?',
      answer: 'Multiply the speed in m/s by 3.6. For example, a sprinter running at 10 m/s is moving at 10 × 3.6 = 36 km/h (22.37 mph).'
    },
    {
      question: 'What is the difference between speed and velocity?',
      answer: 'Speed is a scalar quantity measuring how fast an object is moving regardless of direction. Velocity is a vector quantity that specifies both the speed and the directional trajectory of motion.'
    }
  ],

  notes: {
    title: 'Important Notes & Speed Standards',
    items: [
      'International Nautical Standard: 1 knot is legally defined as exactly 1.852 km/h (1 international nautical mile per hour).',
      'Mach Baseline: Mach speed varies depending on ambient air temperature and altitude; this calculator uses the standard sea-level baseline of 1,234.8 km/h (343 m/s at 20°C).',
      'Precision: Results are shown with up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
