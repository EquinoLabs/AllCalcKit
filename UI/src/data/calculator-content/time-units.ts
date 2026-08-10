import type { CalculatorContent } from './types';

export const timeUnitsContent: CalculatorContent = {
  id: 'time-units',

  intro: {
    title: 'What is a Time Unit Converter?',
    paragraphs: [
      'A time unit converter is a precision chronological calculation tool that converts spans of duration across standard timekeeping and calendar units: Seconds (s), Minutes (min), Hours (h), Days (d), Weeks (wk), Average Months (mo), and Astronomical Years (yr).',
      'Whether you are calculating project management milestones, logging decimal timesheet hours for payroll, computing race split times, converting media runtime durations, or planning multi-week schedules, fast and exact duration conversion is essential. All calculations update in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Time Unit Converter',
    description: 'Convert between any duration or calendar units in three simple steps:',
    steps: [
      'Select your starting time unit from the "From Unit" dropdown (such as Hours).',
      'Select your desired target unit from the "To Target" dropdown (such as Minutes).',
      'Type any numeric duration value into the starting input field.',
      'View your converted result immediately in the target display box, with the live calculation formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Time Conversion Works',
    paragraphs: [
      'Timekeeping combines sexagesimal (base 60) subdivisions for minutes and seconds, duodecimal (base 24) increments for days, and astronomical calendar cycles for months and years.',
      'The calculator uses the standard SI Second (s) as its universal reference baseline. Your starting duration is multiplied by its defined second ratio to determine the total seconds, and then divided by the target unit\'s ratio to compute the exact converted output.'
    ],
    formula: 'Converted Duration = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of seconds (s) equal to 1 unit of that time measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Duration',
        description: 'The numeric duration of time you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The number of seconds (s) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The number of seconds (s) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Duration',
        name: 'Final Output',
        description: 'The resulting time span expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Time & Duration Conversion Factors',
    description: 'Standard values of supported time units compared to the base Second (s):',
    headers: ['Unit Name', 'Symbol', 'Equivalent in Seconds (s)', 'Equivalent in Hours (h)', 'Equivalent in Days (d)'],
    rows: [
      ['Second', 's', '1 s', '0.000278 h', '0.000012 d'],
      ['Minute', 'min', '60 s', '0.016667 h', '0.000694 d'],
      ['Hour', 'h', '3,600 s', '1 h', '0.041667 d (1/24 day)'],
      ['Day', 'd', '86,400 s', '24 h', '1 d'],
      ['Week', 'wk', '604,800 s', '168 h', '7 d'],
      ['Month (average)', 'mo', '2,629,746 s', '730.485 h', '30.437 d (365.25 ÷ 12)'],
      ['Year (Julian average)', 'yr', '31,556,952 s', '8,766 h', '365.25 d']
    ]
  },

  example: {
    title: 'Example: Converting Hours to Days (h to d)',
    description: 'Suppose a work sprint or equipment rental period is scheduled for 45 hours, and you want to convert that duration into days.',
    inputs: [
      { label: 'Starting Duration', value: '45 Hours (h)' },
      { label: 'Target Unit', value: 'Days (d)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 day = 24 hours (86,400 seconds).',
      'Step 2: Convert hours to base seconds: 45 × 3,600 = 162,000 seconds.',
      'Step 3: Divide by the day factor: 162,000 ÷ 86,400 = 1.875 days.'
    ],
    calculation: '45 h ÷ 24 h/day = 1.875 days',
    result: '1.875 Days (d) (1 day, 21 hours)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Time results are calculated with high mathematical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'To convert a decimal day or hour into human-readable minutes, multiply the decimal fraction by 60. For example, 1.875 days equals 1 full day plus (0.875 × 24 = 21) hours.'
    ]
  },

  faqs: [
    {
      question: 'How many seconds are in a 24-hour day?',
      answer: 'There are exactly 86,400 seconds in a standard 24-hour day (24 hours × 60 minutes × 60 seconds).'
    },
    {
      question: 'How do I convert decimal hours (e.g. 7.75 hours) into hours and minutes?',
      answer: 'Keep the whole number as hours (7 hours) and multiply the decimal remainder by 60 (0.75 × 60 = 45 minutes). Therefore, 7.75 hours equals 7 hours and 45 minutes.'
    },
    {
      question: 'Why is an average month defined as 30.4375 days?',
      answer: 'Because calendar months vary between 28 and 31 days, astronomical and engineering standards use an annualized average month calculated as 365.25 days divided by 12 months (30.4375 days or 2,629,746 seconds).'
    },
    {
      question: 'How many hours are in an average year?',
      answer: 'An average astronomical year (accounting for leap years at 365.25 days) contains exactly 8,766 hours. A standard 365-day calendar year contains 8,760 hours.'
    },
    {
      question: 'What is the international scientific definition of a second?',
      answer: 'In the International System of Units (SI), a second is defined by taking the fixed numerical value of the cesium frequency (the transition frequency between hyperfine energy levels of the cesium-133 atom) as exactly 9,192,631,770 Hz.'
    }
  ],

  notes: {
    title: 'Important Notes & Time Standards',
    items: [
      'Astronomical Calendar Standard: Month and year conversions use standard Julian annualized averages (365.25 days per year, 30.4375 days per month) to account for leap years.',
      'Sexagesimal Scale: Seconds and minutes scale in increments of 60 rather than decimal 10 or 100.',
      'Precision: Decimal outputs are rounded to up to 6 decimal places with clean zero trimming for maximum clarity.'
    ]
  }
};
