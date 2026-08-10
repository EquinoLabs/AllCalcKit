import type { CalculatorContent } from './types';

export const sipContent: CalculatorContent = {
  id: 'sip',

  intro: {
    title: 'What is a SIP Investment Calculator?',
    paragraphs: [
      'A Systematic Investment Plan (SIP) Calculator is a wealth projection and compound interest simulation tool that calculates the estimated future maturity value, total capital invested, and capital growth gains of regular monthly investments in mutual funds, index funds, ETFs, or stock portfolios.',
      'By investing a fixed sum every month rather than trying to time unpredictable stock market fluctuations, investors harness the mathematical power of dollar-cost / rupee-cost averaging and long-term exponential compounding. The calculator supports multiple currencies (USD, INR, EUR, GBP) and updates your future wealth projection instantly as you adjust the monthly amount, return rate, and time horizon.'
    ]
  },

  howToUse: {
    title: 'How to Use the SIP Investment Calculator',
    description: 'Project your future investment growth in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Adjust the "Monthly Investment" slider or enter the amount you plan to deposit each month (e.g. $5,000).',
      'Set your portfolio\'s "Expected Return Rate (% p.a.)" annual compound growth rate (e.g. 12% for equity mutual funds).',
      'Select your investment "Time Period (Years)" horizon (e.g. 10 Years).',
      'Review your Expected Total Value, Total Invested Amount, Estimated Returns (Wealth Gain), and visual percentage allocation bar.'
    ]
  },

  howItWorks: {
    title: 'How SIP Compounding Works',
    paragraphs: [
      'An SIP is mathematically modeled as an annuity due—a series of equal periodic payments made at the beginning of each monthly cycle, where each installment compounds independently over its remaining tenure.',
      'In the first few years of an SIP, your total portfolio value consists mostly of your out-of-pocket contributions. Over 10, 15, or 20+ years, exponential compounding accelerates, causing compounding interest returns to far exceed the total capital invested.'
    ],
    formula: 'M = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)',
    formulaExplanation: 'Where P is the monthly investment amount, i is the periodic monthly return (Annual Rate ÷ 12 ÷ 100), and n is total months (Years × 12).',
    variables: [
      {
        symbol: 'P (Monthly Amount)',
        name: 'Periodic Contribution',
        description: 'The fixed capital sum deposited into the investment fund every month.'
      },
      {
        symbol: 'i (Monthly Rate)',
        name: 'Periodic Growth Rate',
        description: 'Annual expected rate of return divided by 12 months and 100 (e.g. 12% p.a. = 0.01 per month).'
      },
      {
        symbol: 'n (Total Installments)',
        name: 'Investment Months',
        description: 'Total number of monthly deposits over the investment time horizon (Years × 12).'
      },
      {
        symbol: 'Invested Amount',
        name: 'Principal Outlay',
        description: 'Total cumulative cash invested out-of-pocket over the entire period (P × n).'
      },
      {
        symbol: 'Est. Returns (M − Total)',
        name: 'Compounded Wealth Gain',
        description: 'Net capital gains earned entirely from the compounding growth of fund assets.'
      }
    ]
  },

  conversionTable: {
    title: 'Wealth Growth Timeline ($5,000 Monthly SIP @ 12% p.a.)',
    description: 'Demonstrating how exponential compounding accelerates wealth generation over time:',
    headers: ['Time Horizon', 'Total Capital Invested', 'Estimated Returns (Gains)', 'Expected Total Value', 'Gains as % of Value'],
    rows: [
      ['1 Year (12 mo)', '$60,000', '$4,093', '$64,093', '6.4% (Initial phase)'],
      ['3 Years (36 mo)', '$180,000', '$37,869', '$217,869', '17.4%'],
      ['5 Years (60 mo)', '$300,000', '$112,439', '$412,439', '27.3%'],
      ['10 Years (120 mo)', '$600,000', '$560,441', '$1,160,441', '48.3% (Gains ≈ Capital)'],
      ['15 Years (180 mo)', '$900,000', '$1,599,559', '$2,499,559', '64.0% (Gains exceed Capital)'],
      ['20 Years (240 mo)', '$1,200,000', '$3,795,735', '$4,995,735', '76.0% (Gains > 3x Capital)'],
      ['25 Years (300 mo)', '$1,500,000', '$8,075,703', '$9,575,703', '84.3% (Gains > 5x Capital)']
    ]
  },

  example: {
    title: 'Example: Investing $5,000/Month at 12% for 10 Years',
    description: 'Suppose you set up a monthly SIP of $5,000 in a diversified equity index fund with an expected 12% average annual return over 10 years.',
    inputs: [
      { label: 'Monthly Deposit', value: '$5,000' },
      { label: 'Expected Return', value: '12% p.a.' },
      { label: 'Time Horizon', value: '10 Years (120 Months)' }
    ],
    steps: [
      'Step 1: Calculate monthly rate: i = 12 ÷ 12 ÷ 100 = 0.01.',
      'Step 2: Calculate total invested capital: $5,000 × 120 months = $600,000.',
      'Step 3: Apply annuity due compounding formula: M = 5,000 × [((1.01)¹²⁰ − 1) ÷ 0.01] × 1.01 = $1,160,441.',
      'Step 4: Calculate wealth gain: $1,160,441 − $600,000 = $560,441 (52% Invested, 48% Gains).'
    ],
    calculation: 'Total Value = $1,160,441 | Invested = $600,000 | Returns = $560,441',
    result: 'Expected Total: $1,160,441 | Invested: $600,000 | Est. Returns: $560,441'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The longer your investment duration, the more dramatic the wealth multiplication becomes. In a 10-year period, compound gains account for nearly half of your total portfolio, while in a 20-year period, compound gains account for over 75% of your total wealth.',
      'SIP investing removes emotional bias and eliminates the need to time market peaks and troughs through continuous cost averaging.'
    ]
  },

  faqs: [
    {
      question: 'What is a Systematic Investment Plan (SIP)?',
      answer: 'An SIP is an investment method in which an investor contributes a fixed amount of money at regular intervals (typically monthly) into a mutual fund or ETF portfolio, automating wealth accumulation.'
    },
    {
      question: 'What is dollar-cost averaging (rupee-cost averaging)?',
      answer: 'Because your monthly investment amount is fixed, you automatically buy more mutual fund units when market prices decline and fewer units when prices rise. Over time, this lowers your average cost per unit.'
    },
    {
      question: 'What is a realistic expected return rate for equity mutual funds?',
      answer: 'Historically, broad equity market indices (like the S&P 500 or Nifty 50) have delivered average annualized returns between 10% and 14% over multi-decade periods, though returns fluctuate year to year.'
    },
    {
      question: 'Can I stop, pause, or increase my monthly SIP?',
      answer: 'Yes. Most modern investment platforms and fund houses allow you to pause, stop, or step-up your monthly contribution at any time with no lock-in penalty.'
    },
    {
      question: 'How is SIP different from a lumpsum investment?',
      answer: 'A lumpsum investment commits an entire lump sum of money all at once, which carries timing risk if markets drop right after. An SIP spreads contributions across all market conditions, smoothing out volatility.'
    }
  ],

  notes: {
    title: 'Important Notes & Financial Disclaimer',
    items: [
      'Compounding Assumptions: Uses monthly annuity-due compounding corresponding to monthly deposits.',
      'Multi-Currency Support: Supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Market Risk: Mutual fund and equity returns fluctuate based on macroeconomic conditions; projections are for educational planning and illustration.'
    ]
  }
};
