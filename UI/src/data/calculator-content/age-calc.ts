import type { CalculatorContent } from './types';

export const ageCalcContent: CalculatorContent = {
  id: 'age-calc',

  intro: {
    title: 'What is an Age Calculator?',
    paragraphs: [
      'An age calculator determines your exact chronological age by calculating the time elapsed between your date of birth and a specific target date. While we typically state our age in whole years, many official, legal, medical, and personal situations require knowing your exact age in years, months, and days.',
      'This calculator provides a complete chronological age breakdown, the total cumulative days you have lived, and a real-time countdown to your next birthday. You can calculate your current age today or check what your age will be on any future or past date.'
    ]
  },

  howToUse: {
    title: 'How to Use the Age Calculator',
    description: 'Calculate your exact age and birthday countdown in a few simple clicks:',
    steps: [
      'Select your Date of Birth in the first date picker field.',
      'Select the target date in the "Age at Date" field (this defaults to today\'s date, but can be changed to any date).',
      'View your exact chronological age displayed in Years, Months, and Days.',
      'Check your total lifespan statistics below the main result, including total days lived and the number of days remaining until your next birthday.'
    ]
  },

  howItWorks: {
    title: 'How Age Calculation Works',
    paragraphs: [
      'Chronological age calculation compares your birth date to the target date using the standard Gregorian calendar. Because months vary in length (28, 29, 30, or 31 days) and leap years add an extra day to February every four years, exact age calculation requires date-by-date adjustment rather than simple division by 365.',
      'The calculation subtracts the birth year, month, and day from the target date. If the target day is less than the birth day, days are borrowed from the preceding month. If the target month is less than the birth month, months are borrowed from the preceding year.'
    ],
    formula: 'Age = Target Date − Date of Birth (Adjusted for calendar month lengths and leap years)',
    formulaExplanation: 'Total days lived is the exact number of 24-hour days elapsed between both calendar dates.',
    variables: [
      {
        symbol: 'Date of Birth',
        name: 'Birth Date',
        description: 'The starting date of birth.'
      },
      {
        symbol: 'Age at Date',
        name: 'Target Date',
        description: 'The reference date to calculate age against (defaults to today).'
      },
      {
        symbol: 'Exact Age',
        name: 'Chronological Age',
        description: 'The completed years, remaining months, and remaining days.'
      },
      {
        symbol: 'Total Days',
        name: 'Cumulative Lifespan',
        description: 'The absolute total count of days lived including all leap days.'
      }
    ]
  },

  conversionTable: {
    title: 'Milestone Ages & Lifespan Equivalents',
    description: 'Common milestone ages converted into approximate months, weeks, and total days:',
    headers: ['Milestone Age', 'Months', 'Weeks (approx.)', 'Total Days (approx.)', 'Typical Significance'],
    rows: [
      ['1 Year', '12 Months', '52 Weeks', '365 Days', 'First birthday / Infant milestone'],
      ['5 Years', '60 Months', '260 Weeks', '1,826 Days', 'Starting primary school'],
      ['18 Years', '216 Months', '939 Weeks', '6,574 Days', 'Legal adulthood / Voting eligibility'],
      ['21 Years', '252 Months', '1,095 Weeks', '7,670 Days', 'Full legal age in many jurisdictions'],
      ['30 Years', '360 Months', '1,565 Weeks', '10,957 Days', 'Three decades milestone'],
      ['50 Years', '600 Months', '2,608 Weeks', '18,262 Days', 'Golden half-century milestone'],
      ['65 Years', '780 Months', '3,391 Weeks', '23,741 Days', 'Traditional retirement benchmark'],
      ['100 Years', '1,200 Months', '5,217 Weeks', '36,525 Days', 'Centenarian milestone (includes ~24 leap years)']
    ]
  },

  example: {
    title: 'Example: Calculating Age for a Specific Date',
    description: 'Suppose a person born on January 1, 2000 wants to find their exact age on August 10, 2026.',
    inputs: [
      { label: 'Date of Birth', value: 'January 1, 2000' },
      { label: 'Age at Date', value: 'August 10, 2026' }
    ],
    steps: [
      'Step 1: Calculate completed years: 2026 − 2000 = 26 full years.',
      'Step 2: Calculate completed months: August (month 8) − January (month 1) = 7 months.',
      'Step 3: Calculate completed days: 10 − 1 = 9 days.',
      'Step 4: Total days calculation: Accounts for 7 leap years (2000, 2004, 2008, 2012, 2016, 2020, 2024), totaling 9,718 days.'
    ],
    calculation: '2026-08-10 − 2000-01-01 = 26 Years, 7 Months, 9 Days',
    result: '26 Years, 7 Months, 9 Days (9,718 Total Days Lived)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Your chronological age reflects the completed years, whole months, and remaining days since your birth according to the Gregorian calendar. Because month lengths range from 28 to 31 days, your age in months and days is calculated using the exact calendar days of each intermediate month.',
      'The "Next Birthday In" counter tells you the exact number of days remaining until your birth month and day occur next on the calendar.'
    ]
  },

  faqs: [
    {
      question: 'How is exact age calculated with varying month lengths and leap years?',
      answer: 'The calculator compares the day, month, and year of both dates. When borrowing days, it uses the actual number of days in the specific month being borrowed from (for example, 31 days for July, 28 or 29 days for February). Leap years are automatically included in the total day count.'
    },
    {
      question: 'Can I calculate my age at a past or future date?',
      answer: 'Yes. By changing the "Age at Date" field, you can calculate how old you were on a historical event date (like graduation or wedding) or how old you will be on a future date (such as retirement).'
    },
    {
      question: 'Why does my total days lived differ from multiplying my age by 365?',
      answer: 'A standard calendar year has 365 days, but every four years a leap year adds an extra day (February 29). Multiplying by 365 ignores these extra leap days, whereas this calculator counts every actual calendar day lived.'
    },
    {
      question: 'How is age calculated for someone born on a leap day (February 29)?',
      answer: 'In non-leap years, people born on February 29 celebrate their birthday on either February 28 or March 1 depending on legal jurisdiction. The calculator measures exact elapsed calendar days from February 29.'
    },
    {
      question: 'Is chronological age the same as biological age?',
      answer: 'No. Chronological age is the exact calendar time passed since birth. Biological age refers to the physiological condition and health of your body cells and tissues, which can be influenced by diet, exercise, genetics, and lifestyle.'
    }
  ],

  notes: {
    title: 'Important Notes & Calendar Standards',
    items: [
      'Calendar Standard: Calculations follow the standard Gregorian calendar used worldwide.',
      'Valid Date Range: The target comparison date must be on or after your birth date. Selecting a target date before your birth date will display an invalid selection notice.',
      'Timezone Consistency: Date pickers use your local device calendar date, ensuring calculations remain consistent with your local day.'
    ]
  }
};
