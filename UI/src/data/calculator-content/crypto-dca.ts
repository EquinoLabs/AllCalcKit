import type { CalculatorContent } from './types';

export const cryptoDcaContent: CalculatorContent = {
  id: 'crypto-dca',

  intro: {
    title: 'What is a Crypto & DCA Calculator?',
    paragraphs: [
      'A Crypto & Investment DCA (Dollar-Cost Averaging) Calculator models the compounding growth and return on investment (ROI) of investing fixed amounts into volatile assets like Bitcoin, Ethereum, or equity index funds at regular intervals.',
      'Dollar-Cost Averaging eliminates the emotional stress of timing the market by automatically purchasing more units when prices are low and fewer units when prices are high, lowering your average cost basis over time.',
      'This calculator projects total invested capital, future accumulated wealth, and total percentage returns across daily, weekly, bi-weekly, or monthly investment cadences.'
    ]
  },

  howToUse: {
    title: 'How to Use the Crypto & DCA Calculator',
    description: 'Simulate your DCA accumulation strategy in four steps:',
    steps: [
      'Enter your Recurring Purchase Amount (e.g. $50, $100, $500).',
      'Select your Purchase Frequency: Daily, Weekly, Bi-Weekly, or Monthly.',
      'Set your planned Investment Horizon in months (e.g. 12, 24, 36, 60 months).',
      'Choose expected Average Annual Growth Rate (%) based on historical asset benchmarks.',
      'View estimated Total Portfolio Wealth, Total Invested Capital, Net Dollar Profit, and ROI %.'
    ]
  },

  howItWorks: {
    title: 'How Dollar-Cost Averaging (DCA) Works',
    paragraphs: [
      'Each recurring purchase contributes new principal that compounds at the periodic rate of return over the remainder of the investment term.',
      'The formula applies an annuity compounding sequence where periodic contributions accumulate with interest over N purchase intervals.',
      'Total Profit = Future Portfolio Value − Total Invested Capital. ROI % = (Total Profit ÷ Total Invested) × 100.'
    ],
    formula: 'Future Value = P × [((1 + r)ⁿ − 1) ÷ r] × (1 + r)',
    formulaExplanation: 'Where P is the recurring purchase amount, r is the periodic rate of return per compounding interval, and n is the total number of recurring buys.',
    variables: [
      {
        symbol: 'P (Amount)',
        name: 'Recurring Buy Amount',
        description: 'Fixed currency amount invested in each scheduled interval.'
      },
      {
        symbol: 'n (Periods)',
        name: 'Total Purchases',
        description: 'Total number of recurring purchases executed over the time horizon.'
      },
      {
        symbol: 'r (Periodic Rate)',
        name: 'Rate per Interval',
        description: 'Annual growth rate divided by the number of purchase intervals per year.'
      }
    ]
  },

  conversionTable: {
    title: 'DCA Growth Projections ($100/mo at Various Return Rates over 2 Years)',
    description: 'Comparison of portfolio value across realistic investment return benchmarks:',
    headers: ['Asset / Strategy Benchmark', 'Annual Return (%)', 'Total Invested', 'Estimated Future Value', 'Net Profit (ROI %)'],
    rows: [
      ['Conservative / High-Yield Savings', '5% / yr', '$2,400', '$2,527', '+$127 (+5.3%)'],
      ['S&P 500 Historical Benchmark', '10% / yr', '$2,400', '$2,661', '+$261 (+10.9%)'],
      ['Growth Equities / Tech Index', '15% / yr', '$2,400', '$2,804', '+$404 (+16.8%)'],
      ['Bitcoin / Top Crypto DCA', '25% / yr', '$2,400', '$3,115', '+$715 (+29.8%)'],
      ['High-Growth Aggressive Strategy', '40% / yr', '$2,400', '$3,649', '+$1,249 (+52.0%)']
    ]
  },

  example: {
    title: 'Example: $200 Monthly DCA into Bitcoin / Crypto for 2 Years',
    description: 'An investor commits to buying $200 of crypto monthly for 24 months with a 20% annual return:',
    inputs: [
      { label: 'Recurring Amount', value: '$200 / month' },
      { label: 'Horizon', value: '24 Months (2 Years)' },
      { label: 'Purchases', value: '24 Scheduled Buys' },
      { label: 'Annual Growth Rate', value: '20% / year' }
    ],
    steps: [
      'Total Invested Capital = $200 × 24 = $4,800.',
      'Monthly interest rate = 20% ÷ 12 = 1.6667% per month.',
      'Future Value of Annuity = $200 × [((1 + 0.016667)²⁴ − 1) ÷ 0.016667] × 1.016667 = $5,945.',
      'Net Profit = $5,945 − $4,800 = +$1,145 (+23.9% ROI).'
    ],
    calculation: '$200/mo for 24 months @ 20% return = $5,945 Future Portfolio',
    result: 'The portfolio accumulates $5,945 from an invested capital of $4,800, generating $1,145 in profit.'
  },

  resultExplanation: {
    title: 'Understanding DCA Accumulation & Volatility Smoothing',
    paragraphs: [
      'Dollar-Cost Averaging automatically dampens market cycles by acquiring more units when the asset is undervalued and fewer units when prices surge.',
      'Consistent automated execution prevents emotional panic-selling during drawdowns, compounding long-term returns.'
    ]
  },

  notes: {
    title: 'Best Practices for Crypto & Index DCA',
    items: [
      'Automate Execution: Set up automatic recurring buys through your preferred exchange or brokerage to remove manual intervention.',
      'Long-Term Mindset: DCA strategies yield the most predictable results over horizons of 3 to 5+ years.',
      'Custody & Security: For cryptocurrency investments, transfer accumulated holdings periodically to a secure hardware wallet.'
    ]
  },

  faqs: [
    {
      question: 'What is Dollar-Cost Averaging (DCA)?',
      answer: 'Dollar-Cost Averaging is an investment strategy where an investor divides the total amount to be invested across periodic purchases of a target asset in an effort to reduce the impact of volatility on the overall purchase.'
    },
    {
      question: 'Is DCA better than Lumpsum investing?',
      answer: 'Historically, in steadily rising markets (like the S&P 500), lumpsum investing outperforms DCA approximately 66% of the time because capital is put to work earlier. However, for volatile assets like Bitcoin or during uncertain market environments, DCA significantly reduces downside risk, eliminates emotional market-timing mistakes, and produces better risk-adjusted returns.'
    },
    {
      question: 'What frequency is best for DCA (Daily, Weekly, or Monthly)?',
      answer: 'Academic studies show minimal statistical difference between daily, weekly, and monthly DCA over a 3- to 5-year time horizon. Weekly or monthly DCA is generally ideal for balancing convenience, paycheck alignment, and transaction fee minimization.'
    }
  ]
};
