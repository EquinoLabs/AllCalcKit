import type { CalculatorContent } from './types';

export const dateAddContent: CalculatorContent = {
  id: 'date-add',

  intro: {
    title: 'What is a Date Add / Subtract Calculator?',
    paragraphs: [
      'A Date Add / Subtract Calculator is a calendar arithmetic tool that calculates future or past calendar dates by adding or subtracting years, months, and days from any starting date.',
      'Whether you are calculating invoice payment deadlines (such as Net 30, Net 60, or Net 90 terms), tracking residential lease notices, computing warranty expirations, projecting pregnancy due dates, scheduling project milestones, or planning visa stay limits, accurate date arithmetic is essential. The calculator accounts for leap years and varying month lengths in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Date Add / Subtract Calculator',
    description: 'Calculate target calendar dates in three simple steps:',
    steps: [
      'Select your starting date from the "Start Date" picker (defaults to today\'s date).',
      'Choose your operation by selecting "+ Add Time" (to project a future date) or "- Subtract Time" (to calculate a past date).',
      'Enter the number of Years, Months, and Days you wish to shift.',
      'View the calculated target date immediately in the results card, including the full day of the week, month, day, and year.'
    ]
  },

  howItWorks: {
    title: 'How Date Arithmetic Works',
    paragraphs: [
      'Calendar calculations must account for the irregularities of the Gregorian calendar: months contain anywhere from 28 to 31 days, and leap years add an extra 29th day to February every 4 years (with century exceptions).',
      'The calculator applies year, month, and day offsets sequentially. Year additions update the calendar year; month additions adjust the month index (rolling over the year if exceeding 12); and day additions traverse exact calendar day counts, advancing smoothly across month and year boundaries.'
    ],
    formula: 'Target Date = Start Date ± (Years × 365.25d + Months × MonthLength + Days)',
    formulaExplanation: 'Where year, month, and day increments are applied sequentially using standard Gregorian calendar rollover rules.',
    variables: [
      {
        symbol: 'Start Date',
        name: 'Anchor Date',
        description: 'The starting calendar point from which time is added or subtracted.'
      },
      {
        symbol: 'Operation',
        name: 'Add / Subtract',
        description: 'Direction of chronological displacement (+ for future dates, − for past dates).'
      },
      {
        symbol: 'Years / Months / Days',
        name: 'Time Offset',
        description: 'The specific integer units of duration added to or subtracted from the anchor date.'
      },
      {
        symbol: 'Target Date',
        name: 'Calculated Date',
        description: 'The resulting calendar date formatted with its corresponding day of the week.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Business, Legal & Medical Date Intervals',
    description: 'Common standardized time spans frequently used in planning and contracts:',
    headers: ['Interval Span', 'Duration Breakdown', 'Common Legal / Practical Application'],
    rows: [
      ['Net 30 Days', '30 Days (~1 Month)', 'Standard commercial invoice payment deadline'],
      ['Net 60 Days', '60 Days (~2 Months)', 'Extended vendor payment terms, lease termination notice'],
      ['Net 90 Days', '90 Days (~3 Months / Quarter)', 'Corporate financial quarterly reporting (Q1–Q4), probation periods'],
      ['180 Days (6 Months)', '180 Days (~26 Weeks)', 'Semi-annual insurance renewals, international tourist visa allowances'],
      ['280 Days (40 Weeks)', '280 Days (~9.2 Months)', 'Standard human full-term pregnancy gestational duration'],
      ['365 Days (1 Year)', '1 Year (366 in leap year)', 'Annual software subscription renewals, commercial leases'],
      ['1,000 Days', '~2 Years, 9 Months', 'Major infrastructure & strategic multi-year milestones']
    ]
  },

  example: {
    title: 'Example: Projecting a Future Project Deadline',
    description: 'Suppose a project kicks off on January 1, 2026, and you need to calculate the delivery date after adding 1 month and 15 days.',
    inputs: [
      { label: 'Start Date', value: 'January 1, 2026' },
      { label: 'Operation', value: '+ Add Time' },
      { label: 'Time Offset', value: '0 Years, 1 Month, 15 Days' }
    ],
    steps: [
      'Step 1: Start with January 1, 2026.',
      'Step 2: Add 1 month to advance the date to February 1, 2026.',
      'Step 3: Add 15 days to February 1, 2026, advancing to February 16, 2026.',
      'Step 4: Determine the day of the week: February 16, 2026 falls on a Monday.'
    ],
    calculation: 'Jan 1, 2026 + 1 Month + 15 Days = Monday, February 16, 2026',
    result: 'Monday, February 16, 2026'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The calculated date includes the day of the week (Monday through Sunday) so you can immediately tell whether a deadline falls on a weekend or business day.',
      'When adding months to dates at the end of a month (such as January 31), the calendar automatically handles short months like February by advancing into the first days of March if necessary.'
    ]
  },

  faqs: [
    {
      question: 'How does the calculator handle leap years?',
      answer: 'The calculator uses the official Gregorian calendar rules. Leap years (years divisible by 4, except century years not divisible by 400) automatically include February 29th when your date range crosses late February.'
    },
    {
      question: 'Can I use this calculator to find past dates?',
      answer: 'Yes. Simply click the "- Subtract Time" button to calculate what date occurred a specific number of years, months, or days in the past.'
    },
    {
      question: 'How do I calculate an invoice due date for Net 30 or Net 60 terms?',
      answer: 'Select your invoice issue date as the "Start Date", keep the operation as "+ Add Time", and enter 30 or 60 in the "Days" field (leaving Years and Months at 0).'
    },
    {
      question: 'How do doctors calculate an estimated pregnancy due date?',
      answer: 'Obstetricians typically use Naegele\'s rule: add 1 year, subtract 3 months, and add 7 days to the first day of the last menstrual period (LMP)—which is mathematically equivalent to adding 280 days (40 weeks).'
    },
    {
      question: 'What happens if I add 1 month to January 31st?',
      answer: 'Because February has only 28 days (or 29 in a leap year), adding 1 month to January 31 shifts 31 days forward, which lands on March 2nd or 3rd depending on the year.'
    }
  ],

  notes: {
    title: 'Important Notes & Calendar Standards',
    items: [
      'Gregorian Calendar Compliance: Calculations automatically adjust for varying month lengths (28, 29, 30, and 31 days) and quadrennial leap years.',
      'Weekday Identification: The output displays the exact day of the week to assist with business scheduling and weekend avoidance.',
      'Range: Supports date additions and subtractions up to 100 years, 120 months, and 1,000 days.'
    ]
  }
};
