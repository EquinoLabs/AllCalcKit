import type { CalculatorContent } from './types';

export const compoundInterestContent: CalculatorContent = {
  id: 'compound-interest',

  intro: {
    title: 'What is a Compound Interest Calculator?',
    paragraphs: [
      'A Compound Interest Calculator is a financial projection and wealth growth tool that calculates the exponential expansion of capital when earned interest is continuously reinvested to generate additional interest over time.',
      'Unlike simple interest (where interest is earned solely on the initial principal sum), compound interest creates an accelerating "snowball effect" as interest accumulates on both the principal and all previously accrued interest. Whether you are forecasting returns on high-yield savings accounts (HYSAs), certificates of deposit (CDs), bonds, dividend reinvestments, or retirement portfolios, understanding compounding is fundamental to financial growth.'
    ]
  },

  howToUse: {
    title: 'How to Use the Compound Interest Calculator',
    description: 'Calculate compounded savings growth in five simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Enter your starting deposit in the "Initial Principal" box (e.g. $10,000).',
      'Enter your annual percentage yield in "Annual Interest Rate (% p.a.)" (e.g. 7%).',
      'Enter your target savings duration in "Time Period (Years)" (e.g. 5 Years).',
      'Choose your "Compounding Frequency" from the dropdown (Monthly, Quarterly, Annually, or Daily).',
      'Review your Final Future Balance, Total Principal deposited, and Total Interest earned in the summary card.'
    ]
  },

  howItWorks: {
    title: 'How Compound Interest Works',
    paragraphs: [
      'The mathematical power of compounding arises from calculating interest periodically and adding it back into the principal balance. During the next period, interest is calculated on this larger combined balance.',
      'Higher compounding frequencies (such as daily or monthly compounding) yield slightly higher final balances than annual compounding because interest is credited and begins generating returns sooner.'
    ],
    formula: 'A = P × (1 + r ÷ n)ⁿᵗ',
    formulaExplanation: 'Where P is the initial principal, r is the annual interest rate as a decimal (Rate ÷ 100), n is the compounding frequency per year, and t is the time in years.',
    variables: [
      {
        symbol: 'P (Principal)',
        name: 'Initial Investment',
        description: 'The starting lump-sum deposit before any interest is earned.'
      },
      {
        symbol: 'r (Annual Rate)',
        name: 'Nominal Interest Rate',
        description: 'The annual interest percentage expressed as a decimal (e.g. 7% = 0.07).'
      },
      {
        symbol: 'n (Frequency)',
        name: 'Compounding Periods',
        description: 'Number of times interest is calculated and added per year (Daily: 365, Monthly: 12, Quarterly: 4, Annual: 1).'
      },
      {
        symbol: 't (Time)',
        name: 'Duration in Years',
        description: 'Total number of years the capital remains invested.'
      },
      {
        symbol: 'A (Future Balance)',
        name: 'Maturity Amount',
        description: 'The final accumulated balance including initial principal and total compounded interest.'
      }
    ]
  },

  conversionTable: {
    title: 'Compounding Growth Trajectory ($10,000 Principal @ 7% p.a.)',
    description: 'Comparing monthly compounding growth milestones across different time horizons:',
    headers: ['Investment Period', 'Compounding Frequency', 'Total Principal', 'Total Interest Earned', 'Final Future Balance'],
    rows: [
      ['1 Year', 'Monthly (n=12)', '$10,000', '$723', '$10,723'],
      ['3 Years', 'Monthly (n=12)', '$10,000', '$2,329', '$12,329'],
      ['5 Years', 'Monthly (n=12)', '$10,000', '$4,176', '$14,176'],
      ['10 Years', 'Monthly (n=12)', '$10,000', '$10,097', '$20,097 (Doubled)'],
      ['15 Years', 'Monthly (n=12)', '$10,000', '$18,489', '$28,489'],
      ['20 Years', 'Monthly (n=12)', '$10,000', '$30,387', '$40,387 (Quadrupled)'],
      ['30 Years', 'Monthly (n=12)', '$10,000', '$71,165', '$81,165 (Over 8x Principal)']
    ]
  },

  example: {
    title: 'Example: Compounding $10,000 at 7% over 5 Years (Monthly)',
    description: 'Suppose you deposit $10,000 into a high-yield investment paying 7% annual interest compounded monthly for 5 years.',
    inputs: [
      { label: 'Initial Principal', value: '$10,000' },
      { label: 'Annual Interest Rate', value: '7.0% p.a.' },
      { label: 'Time Horizon', value: '5 Years' },
      { label: 'Compounding Frequency', value: 'Monthly (n = 12)' }
    ],
    steps: [
      'Step 1: Calculate periodic rate: r ÷ n = 0.07 ÷ 12 = 0.0058333.',
      'Step 2: Calculate total compounding periods: n × t = 12 × 5 = 60 periods.',
      'Step 3: Calculate growth factor: (1 + 0.0058333)⁶⁰ ≈ 1.417625.',
      'Step 4: Calculate final balance: A = $10,000 × 1.417625 = $14,176.25 (rounded to $14,176).',
      'Step 5: Calculate total interest earned: $14,176 − $10,000 = $4,176.'
    ],
    calculation: 'A = 10,000 × (1 + 0.07/12)⁶⁰ = $14,176 | Interest = $4,176',
    result: 'Final Balance: $14,176 | Total Principal: $10,000 | Total Interest: $4,176'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Time is the single most impactful factor in compound growth. Over a 5-year span, interest adds 41% to your capital; over 30 years, interest contributes over 700% to your final balance.',
      'By applying the "Rule of 72" (72 ÷ Interest Rate), you can quickly approximate that at a 7% interest rate, your money will double every 10.3 years without adding a single extra dollar.'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between simple interest and compound interest?',
      answer: 'Simple interest is earned strictly on the original principal deposit. Compound interest is calculated on both the original principal and the accumulated interest from prior periods, generating exponential growth.'
    },
    {
      question: 'What is the Rule of 72 in finance?',
      answer: 'The Rule of 72 is a quick mental math shortcut to estimate how many years it takes for an investment to double at a fixed annual interest rate: divide 72 by the annual interest rate (e.g. at 8%, 72 ÷ 8 = 9 years to double).'
    },
    {
      question: 'How does compounding frequency impact total interest earned?',
      answer: 'More frequent compounding (such as daily or monthly vs. annually) calculates and credits interest sooner, meaning subsequent interest calculations operate on larger balances and produce slightly higher overall yields.'
    },
    {
      question: 'What is the difference between APR and APY?',
      answer: 'APR (Annual Percentage Rate) is the nominal stated annual rate without compounding. APY (Annual Percentage Yield) reflects the true effective annual rate taking compounding into account.'
    },
    {
      question: 'How does inflation affect compound growth?',
      answer: 'Inflation reduces the purchasing power of your money over time. To calculate real wealth expansion, subtract the inflation rate from your nominal compound growth rate.'
    }
  ],

  notes: {
    title: 'Important Notes & Compounding Standards',
    items: [
      'Discrete Compounding Formula: Computes exact future values using standard discrete interest formula A = P(1 + r/n)^(nt).',
      'Multi-Currency Formatting: Full compatibility with USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Pre-Tax Nominal Figures: Calculations represent gross nominal earnings before income taxes or inflation adjustments.'
    ]
  }
};
