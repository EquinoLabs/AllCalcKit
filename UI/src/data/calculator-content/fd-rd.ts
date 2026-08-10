import type { CalculatorContent } from './types';

export const fdRdContent: CalculatorContent = {
  id: 'fd-rd',

  intro: {
    title: 'What is an FD & RD Investment Calculator?',
    paragraphs: [
      'An FD & RD (Fixed Deposit & Recurring Deposit) Calculator is a guaranteed-return banking and savings projection tool that calculates the maturity amount, total capital invested, and quarterly compounded interest earned on bank term deposits.',
      'Fixed Deposits (FDs) allow investors to lock in a single lump-sum deposit for a designated term at a guaranteed fixed interest rate. Recurring Deposits (RDs) allow savers to build wealth through disciplined monthly installments. Both deposit types are backed by bank insurance schemes and offer risk-free capital preservation with quarterly compounding interest.'
    ]
  },

  howToUse: {
    title: 'How to Use the FD & RD Calculator',
    description: 'Calculate your term deposit maturity in five simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Choose your deposit mode by clicking "FD" (for a single one-time lump sum) or "RD" (for regular monthly deposits).',
      'Enter your deposit amount in the "Deposit Amount" box (e.g. $50,000 for FD, or $2,000 for monthly RD).',
      'Enter the bank\'s quoted "Interest Rate (% p.a.)" annual percentage rate (e.g. 7.5%).',
      'Enter your deposit "Tenure (Years)" horizon (e.g. 3 Years).',
      'Review your guaranteed Maturity Amount, Total Capital Invested, and Net Interest Earned in the results card.'
    ]
  },

  howItWorks: {
    title: 'How FD & RD Compounding Works',
    paragraphs: [
      'By standard commercial banking convention, interest on term deposits is compounded quarterly (4 times per year).',
      'For Fixed Deposits (FDs), the entire lump sum earns quarterly compounded interest across the full duration. For Recurring Deposits (RDs), each monthly installment earns interest for the specific number of months remaining until maturity.'
    ],
    formula: 'FD: M = P × (1 + r ÷ 4)⁴ᵗ  |  RD: M = ∑ P × (1 + r ÷ 4)^(4 × MonthsLeft ÷ 12)',
    formulaExplanation: 'Where P is the deposit amount, r is the annual interest rate as a decimal, and t is tenure in years with quarterly compounding (n = 4).',
    variables: [
      {
        symbol: 'P (Deposit Amount)',
        name: 'Principal Sum',
        description: 'The lump-sum amount (for FD) or regular monthly installment (for RD).'
      },
      {
        symbol: 'r (Annual Rate)',
        name: 'Contracted Rate',
        description: 'The fixed annual interest rate percentage offered by the banking institution.'
      },
      {
        symbol: 't (Tenure Years)',
        name: 'Deposit Horizon',
        description: 'Total duration of the term deposit in years.'
      },
      {
        symbol: 'M (Maturity Amount)',
        name: 'Total Payout',
        description: 'The final gross proceeds payable to the depositor upon completion of the term.'
      },
      {
        symbol: 'Interest Earned',
        name: 'Net Gain',
        description: 'Total interest credited over the tenure (Maturity Amount − Total Invested).'
      }
    ]
  },

  conversionTable: {
    title: 'FD vs. RD Comparison ($50,000 Total Capital @ 7.5% p.a.)',
    description: 'Comparing maturity amounts for lump-sum FD vs. equivalent monthly RD contributions:',
    headers: ['Deposit Type', 'Tenure', 'Total Capital Deposited', 'Quarterly Interest Earned', 'Final Maturity Value'],
    rows: [
      ['1-Year Fixed Deposit (FD)', '1 Year', '$50,000 (Lump sum)', '$3,857', '$53,857'],
      ['1-Year Recurring Deposit (RD)', '1 Year', '$50,000 ($4,167/mo)', '$2,084', '$52,084'],
      ['3-Year Fixed Deposit (FD)', '3 Years', '$50,000 (Lump sum)', '$12,486', '$62,486'],
      ['3-Year Recurring Deposit (RD)', '3 Years', '$50,000 ($1,389/mo)', '$6,145', '$56,145'],
      ['5-Year Fixed Deposit (FD)', '5 Years', '$50,000 (Lump sum)', '$22,497', '$72,497'],
      ['5-Year Recurring Deposit (RD)', '5 Years', '$50,000 ($833/mo)', '$10,854', '$60,854']
    ]
  },

  example: {
    title: 'Example: 3-Year Fixed Deposit of $50,000 at 7.5% p.a.',
    description: 'Suppose you deposit $50,000 into a 3-year bank Fixed Deposit paying 7.5% annual interest compounded quarterly.',
    inputs: [
      { label: 'Deposit Mode', value: 'Fixed Deposit (FD)' },
      { label: 'Deposit Amount', value: '$50,000' },
      { label: 'Interest Rate', value: '7.5% p.a.' },
      { label: 'Tenure', value: '3 Years' }
    ],
    steps: [
      'Step 1: Calculate quarterly interest rate: r ÷ 4 = 0.075 ÷ 4 = 0.01875.',
      'Step 2: Calculate total compounding quarters: 4 × 3 = 12 quarters.',
      'Step 3: Calculate quarterly growth factor: (1 + 0.01875)¹² ≈ 1.249724.',
      'Step 4: Calculate maturity amount: $50,000 × 1.249724 = $62,486.20 (rounded to $62,486).',
      'Step 5: Calculate interest earned: $62,486 − $50,000 = $12,486.'
    ],
    calculation: 'M = 50,000 × (1 + 0.075/4)¹² = $62,486 | Interest = $12,486',
    result: 'Maturity Amount: $62,486 | Total Invested: $50,000 | Interest Earned: $12,486'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'A Fixed Deposit earns more total interest than a Recurring Deposit of equal total capital because the entire lump sum compounds for the full tenure, whereas RD monthly deposits compound only for their remaining months.',
      'Bank FDs and RDs offer guaranteed capital safety, making them ideal for short-term goals and emergency funds where stock market volatility must be avoided.'
    ]
  },

  faqs: [
    {
      question: 'What is the main difference between an FD and an RD?',
      answer: 'A Fixed Deposit (FD) requires depositing your entire lump sum up front at account opening. A Recurring Deposit (RD) allows you to deposit a set monthly amount over time, helping you build savings incrementally.'
    },
    {
      question: 'Why do banks compound deposit interest quarterly instead of annually?',
      answer: 'Standard banking regulations mandate quarterly compounding for term deposits, which gives depositors a slightly higher effective annual yield (APY) compared to simple annual compounding.'
    },
    {
      question: 'Do senior citizens get higher FD interest rates?',
      answer: 'Yes. Most commercial banks provide senior citizens (typically age 60 and older) an additional 0.25% to 0.75% interest rate above standard card rates.'
    },
    {
      question: 'Can I withdraw an FD or RD before the maturity date?',
      answer: 'Yes, premature withdrawal is usually allowed, though banks typically charge a small penalty (0.5% to 1.0% interest rate reduction) on early closures.'
    },
    {
      question: 'Is interest income from FDs and RDs subject to income tax?',
      answer: 'Yes. Interest earned on fixed and recurring deposits is taxable as regular income according to your marginal income tax bracket, and banks may deduct tax at source (TDS) if earnings exceed statutory thresholds.'
    }
  ],

  notes: {
    title: 'Important Notes & Deposit Guidelines',
    items: [
      'Quarterly Compounding Standard: Follows the standard 4-times-per-year compounding formula used by international banking institutions.',
      'Multi-Currency Support: Supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Pre-Tax Nominal Values: Maturity figures represent gross payouts before applicable income tax withholding.'
    ]
  }
};
