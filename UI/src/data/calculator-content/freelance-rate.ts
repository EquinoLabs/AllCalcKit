import type { CalculatorContent } from './types';

export const freelanceRateContent: CalculatorContent = {
  id: 'freelance-rate',

  intro: {
    title: 'What is a Freelance Hourly Rate Calculator?',
    paragraphs: [
      'A Freelance Hourly Rate Calculator helps freelancers, contractors, and independent consultants convert a target annual take-home salary into a sustainable, profitable hourly and daily billing rate.',
      'Unlike full-time employees whose employers cover healthcare, paid time off, equipment, software, retirement, and employer payroll taxes, freelancers must factor all overhead expenses and unbillable hours into their client rate.',
      'This calculator calculates the exact minimum billing rate required to meet your personal net income goal after accounting for self-employment taxes, business expenses, paid vacations, and unexpected downtime.'
    ]
  },

  howToUse: {
    title: 'How to Use the Freelance Rate Calculator',
    description: 'Calculate your optimal freelance rate in four steps:',
    steps: [
      'Enter your desired Annual Take-Home Salary (the net money you want in your bank account each year).',
      'Set your realistic Billable Hours per week (typically 20–30 hours/week, since 10–20 hours are spent on marketing, proposals, invoicing, and client communication).',
      'Choose your planned Vacation and Holiday weeks per year (typically 3–5 weeks).',
      'Enter your estimated Annual Business Expenses (software subscriptions, hardware, insurance, coworking, accounting).',
      'Adjust your Tax Buffer (25–35% for self-employment and income taxes) and Profit Margin (15–20% buffer for business reinvestment).',
      'Review your recommended minimum Hourly Rate, Daily Rate, and Monthly Invoicing Targets.'
    ]
  },

  howItWorks: {
    title: 'How the Freelance Rate Calculation Works',
    paragraphs: [
      'The calculator determines your billable working capacity each year and establishes the total gross revenue required to deliver your target net salary after expenses and taxes.',
      'Working Weeks = 52 Weeks − Vacation Weeks. Total Billable Hours/Year = Working Weeks × Billable Hours/Week.',
      'Gross Revenue Needed = (Target Salary + Annual Expenses) × (1 + Profit Margin) ÷ (1 − Tax Buffer Rate).'
    ],
    formula: 'Hourly Rate = Gross Annual Revenue Required ÷ Total Annual Billable Hours',
    formulaExplanation: 'Where Gross Revenue Required covers base salary, software overhead, self-employment tax obligations, and a business resilience profit buffer.',
    variables: [
      {
        symbol: 'S (Salary)',
        name: 'Target Annual Salary',
        description: 'Desired annual personal take-home compensation.'
      },
      {
        symbol: 'E (Expenses)',
        name: 'Annual Operating Expenses',
        description: 'Business software, equipment, legal, and operational overhead.'
      },
      {
        symbol: 'H_b (Billable Hours)',
        name: 'Weekly Billable Hours',
        description: 'Actual hours spent on paid client deliverables per week.'
      },
      {
        symbol: 'T (Tax Buffer)',
        name: 'Tax & Overhead Rate',
        description: 'Estimated self-employment and income tax percentage reserved.'
      }
    ]
  },

  conversionTable: {
    title: 'Freelance Rate Benchmark by Target Salary (25 hrs/wk, 4 wks vacation)',
    description: 'Reference minimum billing rates across common annual compensation targets:',
    headers: ['Target Take-Home Salary', 'Annual Billable Hours', 'Min. Hourly Rate', 'Min. Daily Rate (8h)', 'Monthly Invoicing Goal'],
    rows: [
      ['$60,000 / year', '1,200 hours', '$80.56 / hr', '$644 / day', '$8,056 / month'],
      ['$80,000 / year', '1,200 hours', '$107.41 / hr', '$859 / day', '$10,741 / month'],
      ['$100,000 / year', '1,200 hours', '$134.17 / hr', '$1,073 / day', '$13,417 / month'],
      ['$150,000 / year', '1,200 hours', '$201.25 / hr', '$1,610 / day', '$20,125 / month'],
      ['$200,000 / year', '1,200 hours', '$268.33 / hr', '$2,147 / day', '$26,833 / month']
    ]
  },

  example: {
    title: 'Example: Setting a Freelance Software Engineering Rate',
    description: 'Alex wants $100,000 net take-home pay, working 25 billable hours/week with 4 weeks off:',
    inputs: [
      { label: 'Target Salary', value: '$100,000/yr' },
      { label: 'Billable Hours', value: '25 hrs/wk (48 working weeks = 1,200 hrs/yr)' },
      { label: 'Business Expenses', value: '$5,000/yr' },
      { label: 'Tax & Profit Buffers', value: '25% Taxes, 15% Profit' }
    ],
    steps: [
      'Operating baseline required = $100,000 + $5,000 = $105,000.',
      'With 15% profit buffer = $105,000 × 1.15 = $120,750.',
      'Gross required with 25% tax reserve = $120,750 ÷ (1 − 0.25) = $161,000.',
      'Hourly billing rate = $161,000 ÷ 1,200 billable hours = $134.17/hour.'
    ],
    calculation: '$161,000 gross revenue ÷ 1,200 billable hours = $134.17 / hour',
    result: 'Alex should bill a minimum of $134.17/hr ($1,073/day) to sustainably clear $100,000 net salary.'
  },

  resultExplanation: {
    title: 'Understanding Your Rate Structure',
    paragraphs: [
      'Your hourly rate is not pure profit—it is a comprehensive business price that funds your lifestyle, overhead, tax reserves, and business buffer.',
      'Billing by day or project value (fixed milestone pricing) derived from your calculated hourly floor protects your margins and delivers higher profitability.'
    ]
  },

  notes: {
    title: 'Tips for Pricing Your Freelance Services',
    items: [
      'Value-Based Pricing: Treat this calculated rate as your absolute minimum floor. Charge higher for high-impact or urgent client projects.',
      'Retainers: Convert reliable clients into monthly retainers calculated as (Hourly Rate × 15–20 hours) with a slight priority discount.',
      'Emergency Reserves: Maintain 3–6 months of living expenses in a business savings account to navigate seasonal dry spells.'
    ]
  },

  faqs: [
    {
      question: 'Why can’t I just divide my full-time salary by 2,080 hours?',
      answer: 'Full-time jobs assume 40 billable hours every week for 52 weeks (2,080 hours), with paid holidays and employer-paid taxes. Freelancers rarely bill 40 hours weekly because marketing, administration, and non-billable client management take 30–50% of the working week. Freelancers must also pay both halves of FICA/payroll taxes and cover their own healthcare and equipment.'
    },
    {
      question: 'What is a good billable hours target for freelancers?',
      answer: 'Most successful solo consultants bill between 20 and 28 hours per week. Billing 30+ hours consistently often leads to burnout and leaves insufficient time for business development, accounting, and professional growth.'
    },
    {
      question: 'How much should I set aside for freelance taxes?',
      answer: 'In the US, independent contractors generally set aside 25% to 35% of gross earnings for federal income tax, state income tax, and the 15.3% self-employment tax (Social Security + Medicare). In other countries (UK, EU, India), tax buffer requirements range between 20% and 40% depending on local tax brackets and GST/VAT registration.'
    }
  ]
};
