import type { CalculatorContent } from './types';

export const dateDiffContent: CalculatorContent = {
  id: 'date-diff',

  intro: {
    title: 'What is a Date Difference Calculator?',
    paragraphs: [
      'A date difference calculator computes the exact time and duration between two calendar dates. Whether you are tracking a project timeline, planning a vacation, calculating a lease agreement, estimating delivery windows, or counting down to a special occasion, finding the exact number of days between two dates is an everyday task.',
      'This tool provides an instant breakdown of the total days, full weeks and remaining days, and total hours between any two dates. It automatically accounts for varying month lengths and leap years.'
    ]
  },

  howToUse: {
    title: 'How to Use the Date Difference Calculator',
    description: 'Calculate the duration between two dates with these simple steps:',
    steps: [
      'Select your starting date in the "Start Date" picker.',
      'Select your ending date in the "End Date" picker.',
      'View your total time difference instantly in Days in the main result card.',
      'Review the secondary breakdown showing the equivalent time in Weeks & Days, as well as total elapsed Hours.'
    ]
  },

  howItWorks: {
    title: 'How Date Difference Calculation Works',
    paragraphs: [
      'The calculator measures the exact calendar duration by finding the absolute difference between your start date and end date.',
      'It converts both calendar dates into timestamps, calculates the elapsed time, and divides by 86,400,000 milliseconds (the exact number of milliseconds in a standard 24-hour day). It then converts the total day count into completed 7-day weeks, remaining days, and total hours.'
    ],
    formula: 'Total Days = |End Date − Start Date| in Milliseconds ÷ 86,400,000 ms',
    formulaExplanation: 'Weeks are calculated as Total Days ÷ 7 (rounded down), and Hours are Total Days × 24.',
    variables: [
      {
        symbol: 'Start Date',
        name: 'Beginning Date',
        description: 'The starting date of your time period.'
      },
      {
        symbol: 'End Date',
        name: 'Ending Date',
        description: 'The final date of your time period.'
      },
      {
        symbol: 'Total Days',
        name: 'Calendar Days',
        description: 'The exact count of days between both dates.'
      },
      {
        symbol: 'Weeks & Days',
        name: 'Weekly Breakdown',
        description: 'Total completed 7-day weeks plus leftover days.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Calendar Durations & Conversions',
    description: 'Reference guide for standard calendar periods and their day/hour equivalents:',
    headers: ['Time Period', 'Total Days', 'Weeks & Days', 'Total Hours', 'Common Usage'],
    rows: [
      ['1 Week', '7 Days', '1 Wk, 0 Days', '168 Hours', 'Standard weekly sprint / cycle'],
      ['2 Weeks (Fortnight)', '14 Days', '2 Wks, 0 Days', '336 Hours', 'Bi-weekly pay period / notice'],
      ['30-Day Month', '30 Days', '4 Wks, 2 Days', '720 Hours', 'Standard billing month'],
      ['31-Day Month', '31 Days', '4 Wks, 3 Days', '744 Hours', 'Full calendar month'],
      ['Quarter (approx.)', '91 Days', '13 Wks, 0 Days', '2,184 Hours', 'Quarterly financial period (Q1–Q4)'],
      ['Half Year', '182 Days', '26 Wks, 0 Days', '4,368 Hours', 'Semi-annual period'],
      ['1 Common Year', '365 Days', '52 Wks, 1 Day', '8,760 Hours', 'Standard 12-month calendar year'],
      ['1 Leap Year', '366 Days', '52 Wks, 2 Days', '8,784 Hours', 'Calendar year with Feb 29 included']
    ]
  },

  example: {
    title: 'Example: Measuring Time Across a Calendar Year',
    description: 'Suppose you want to calculate the duration between January 1, 2026 and December 31, 2026.',
    inputs: [
      { label: 'Start Date', value: 'January 1, 2026' },
      { label: 'End Date', value: 'December 31, 2026' }
    ],
    steps: [
      'Step 1: Calculate the difference between Jan 1, 2026 and Dec 31, 2026.',
      'Step 2: Total days elapsed between the two dates = 364 days.',
      'Step 3: Convert to weeks: 364 ÷ 7 = exactly 52 weeks and 0 days.',
      'Step 4: Convert to hours: 364 days × 24 hours/day = 8,736 hours.'
    ],
    calculation: '2026-12-31 − 2026-01-01 = 364 Days (52 Weeks, 0 Days)',
    result: '364 Days (52 Wks, 0 Days / 8,736 Hours)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The result represents the elapsed time between midnight on your Start Date and midnight on your End Date. For example, between Monday and Wednesday of the same week, the calculator counts 2 days (Monday to Tuesday, and Tuesday to Wednesday).',
      'The secondary breakdown translates this total into completed 7-day weeks plus remaining days, and calculates the total continuous hours elapsed.'
    ]
  },

  faqs: [
    {
      question: 'Does the calculator include both the start and end dates?',
      answer: 'The calculation measures the duration between the two dates (midnight to midnight). If you need an inclusive count that includes both full calendar days (such as counting both the first and last day of a vacation), simply add 1 day to the result.'
    },
    {
      question: 'How are leap years handled in date difference calculations?',
      answer: 'Leap years are automatically included. If the date range spans across February 29 of a leap year (such as 2024 or 2028), the extra leap day is accurately included in the total day count.'
    },
    {
      question: 'What happens if I select an End Date that is earlier than the Start Date?',
      answer: 'The calculator calculates the absolute time difference between the two dates, so you will receive the correct duration regardless of which order you select the dates.'
    },
    {
      question: 'How do I convert calendar days into working business days?',
      answer: 'Calendar days count all 7 days of each week. To estimate working days (Monday through Friday), multiply the number of full weeks by 5 and add any weekday remainder, while accounting for public holidays.'
    },
    {
      question: 'Can I calculate date differences across multiple years or centuries?',
      answer: 'Yes. The calculator supports calculations across multiple decades and centuries using the international Gregorian calendar.'
    }
  ],

  notes: {
    title: 'Important Notes & Calendar Guidelines',
    items: [
      'Daylight Saving Time: Calculations use standard 24-hour calendar days to ensure results remain consistent without Daylight Saving Time 1-hour distortions.',
      'Timezone Setting: The date selectors use your device\'s local calendar date.',
      'Gregorian Calendar: Dates follow standard worldwide Gregorian calendar rules.'
    ]
  }
};
