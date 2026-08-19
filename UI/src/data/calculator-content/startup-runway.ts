import type { CalculatorContent } from './types';

export const startupRunwayContent: CalculatorContent = {
  id: 'startup-runway',

  intro: {
    title: 'What is a Startup Runway Calculator?',
    paragraphs: [
      'A Startup Runway Calculator models how many months a startup or early-stage business can operate before exhausting its cash reserves at its current net burn rate.',
      'Understanding cash runway is essential for tech founders and bootstrapping creators to plan fundraising milestones, make hiring decisions, manage operating expenses, and determine whether the company is "Default Alive" or "Default Dead".',
      'This tool projects multi-month cash flow dynamics with month-over-month (MoM) revenue growth and expense inflation.'
    ]
  },

  howToUse: {
    title: 'How to Use the Startup Runway Calculator',
    description: 'Calculate your company runway in four steps:',
    steps: [
      'Enter your Current Cash in Bank (total liquid cash balance available).',
      'Enter your Monthly Operating Expenses (gross monthly burn: payroll, servers, marketing, office).',
      'Enter your current Monthly Revenue (monthly recurring revenue / MRR).',
      'Adjust expected Month-over-Month (MoM) Revenue Growth % and Expense Growth %.',
      'Review your calculated Runway in Months, Zero Cash Date, Net Burn Rate, and Default Alive status.',
      'Export the 24-Month Cash Flow Forecast to CSV for investor updates or board decks.'
    ]
  },

  howItWorks: {
    title: 'How the Runway Calculation Works',
    paragraphs: [
      'Net Monthly Burn is calculated as Gross Monthly Expenses minus Monthly Revenue.',
      'In a static scenario, Runway = Cash Balance ÷ Net Monthly Burn.',
      'In dynamic growth scenarios, the calculator computes month-by-month compound growth for revenue and expenses until cash reaches zero or the startup crosses into cash-flow profitability (Default Alive).'
    ],
    formula: 'Static Runway (Months) = Total Cash Balance ÷ (Monthly Expenses − Monthly Revenue)',
    formulaExplanation: 'Where Net Burn is the monthly cash depletion rate. If revenue growth outpaces expenses before cash reaches zero, the company reaches profitability.',
    variables: [
      {
        symbol: 'C (Cash)',
        name: 'Cash Balance',
        description: 'Total liquid capital available in company bank accounts.'
      },
      {
        symbol: 'E (Expenses)',
        name: 'Monthly Gross Burn',
        description: 'Total operating expenses incurred per month.'
      },
      {
        symbol: 'R (Revenue)',
        name: 'Monthly Revenue',
        description: 'Total monthly cash collections / MRR.'
      },
      {
        symbol: 'g_rev (MoM Growth)',
        name: 'Revenue Growth Rate',
        description: 'Expected percentage growth in monthly revenue.'
      }
    ]
  },

  conversionTable: {
    title: 'Runway Health Benchmarks for Venture & Bootstrapped Startups',
    description: 'Standard operational runway classifications and recommended founder actions:',
    headers: ['Runway Duration', 'Health Status', 'Primary Risk', 'Founder Action Plan'],
    rows: [
      ['0 – 3 Months', 'Critical Red Alert', 'Imminent insolvency', 'Freeze hiring, cut non-core spend, bridge round'],
      ['4 – 6 Months', 'High Risk Danger Zone', 'Fundraising lag risk', 'Launch active fundraising pitch rounds immediately'],
      ['7 – 12 Months', 'Fundraising Window', 'Moderate compression', 'Refine pitch decks, investor pipeline & roadshow'],
      ['13 – 18 Months', 'Healthy Runway', 'Low execution risk', 'Focus on product-market fit, hiring & growth'],
      ['19+ Months / Alive', 'Default Alive / Secure', 'Negligible capital risk', 'Accelerate scalable growth & unit economics']
    ]
  },

  example: {
    title: 'Example: Seed Stage SaaS Cash Depletion Projection',
    description: 'A seed startup has $500,000 in bank, burns $40,000/mo, and collects $10,000/mo:',
    inputs: [
      { label: 'Cash in Bank', value: '$500,000' },
      { label: 'Monthly Expenses', value: '$40,000/mo' },
      { label: 'Monthly Revenue', value: '$10,000/mo' },
      { label: 'Net Monthly Burn', value: '$30,000/mo' }
    ],
    steps: [
      'Initial Net Monthly Burn = $40,000 expenses − $10,000 revenue = $30,000/month.',
      'Static Runway = $500,000 cash ÷ $30,000 net burn = 16.67 months.',
      'Annualized Burn Rate = $30,000 × 12 = $360,000/year.',
      'Zero Cash Date = Month 17.'
    ],
    calculation: '$500,000 cash ÷ $30,000 net burn = 16.7 Months',
    result: 'The startup has approximately 16.7 months of runway remaining before needing new capital.'
  },

  resultExplanation: {
    title: 'Understanding Runway & Default Alive Dynamics',
    paragraphs: [
      'Runway is a living metric that changes whenever hiring expands, marketing spend scales, or customer churn fluctuates.',
      'A startup with positive net burn that grows revenue faster than expenses will eventually reach cash flow breakeven (Default Alive), extending its runway to infinity.'
    ]
  },

  notes: {
    title: 'Startup Capital Management Principles',
    items: [
      'Fundraising Timing: Begin speaking to investors when you still have 9 to 12 months of runway remaining to avoid negotiating from weakness.',
      'Headcount Overhead: Every new hire adds gross burn for salaries, payroll taxes, benefits, equipment, and SaaS licenses.',
      'Buffer Allocation: Keep at least 2 months of runway reserved as a safety cushion for delayed enterprise customer receivables.'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between Gross Burn and Net Burn?',
      answer: 'Gross Burn is the total amount of cash your startup spends every month on all operations (salaries, software, rent, marketing). Net Burn is Gross Burn minus Monthly Revenue (the actual amount of cash leaving the bank account each month).'
    },
    {
      question: 'What does "Default Alive" vs "Default Dead" mean?',
      answer: 'Coined by Paul Graham (Y Combinator), a startup is "Default Alive" if its current revenue growth rate will allow it to reach profitability before running out of existing cash, without needing future fundraising. If it will exhaust its cash reserves before breaking even, it is "Default Dead" and must either accelerate growth, reduce burn, or raise capital.'
    },
    {
      question: 'How much runway should a seed or Series A startup maintain?',
      answer: 'Venture capitalists and financial advisors recommend maintaining at least 18 to 24 months of runway. Fundraising typically takes 3 to 6 months, so startups usually initiate their next fundraising round when 9 to 12 months of runway remain.'
    }
  ]
};
