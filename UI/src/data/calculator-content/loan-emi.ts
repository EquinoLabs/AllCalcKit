import type { CalculatorContent } from './types';

export const loanEmiContent: CalculatorContent = {
  id: 'loan-emi',

  intro: {
    title: 'What is a Loan & EMI Calculator?',
    paragraphs: [
      'A Loan & EMI (Equated Monthly Installment) Calculator is a debt amortization and financial planning tool that calculates the exact fixed monthly payment required to repay a personal loan, home mortgage, auto loan, or student debt over a designated tenure at a fixed annual interest rate.',
      'By adjusting the loan principal amount, annual interest rate percentage, and loan duration, you can immediately preview your monthly EMI, total interest liability, total repayment amount, and a visual principal-to-interest breakdown. The calculator supports multiple global currencies (USD, INR, EUR, GBP) and updates in real time as you move the sliders.'
    ]
  },

  howToUse: {
    title: 'How to Use the Loan & EMI Calculator',
    description: 'Calculate your loan repayment schedule in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Adjust the "Loan Amount" slider or enter your principal borrowing requirement (e.g. $100,000).',
      'Set your lender\'s quoted "Interest Rate (% p.a.)" annual percentage rate (e.g. 8.5%).',
      'Select the "Loan Tenure (Years)" duration over which you plan to repay the loan (e.g. 5 Years).',
      'Review your Monthly Repayment (EMI), Total Interest, Total Payable, and visual Principal vs. Interest percentage allocation.'
    ]
  },

  howItWorks: {
    title: 'How Loan EMI Calculation Works',
    paragraphs: [
      'Most consumer and commercial loans utilize reducing-balance amortization. In this structure, every monthly payment is divided into two parts: one portion pays the interest accrued on the remaining principal balance for that month, and the remainder pays down the principal.',
      'In the early months of a loan, when the principal balance is highest, interest constitutes a larger share of the monthly EMI. As the principal is progressively paid down, interest charges shrink and principal reduction accelerates.'
    ],
    formula: 'EMI = [P × r × (1 + r)ⁿ] ÷ [(1 + r)ⁿ − 1]',
    formulaExplanation: 'Where P is principal, r is the periodic monthly interest rate (Annual Rate ÷ 12 ÷ 100), and n is the total number of monthly installments (Years × 12).',
    variables: [
      {
        symbol: 'P (Principal)',
        name: 'Loan Amount',
        description: 'The initial lump sum borrowed from the bank or financial institution.'
      },
      {
        symbol: 'r (Monthly Rate)',
        name: 'Periodic Rate',
        description: 'Annual interest rate divided by 12 months and 100 (e.g., 8.5% annual = 0.007083 monthly).'
      },
      {
        symbol: 'n (Tenure Months)',
        name: 'Payment Periods',
        description: 'Total number of monthly payment installments over the life of the loan (Years × 12).'
      },
      {
        symbol: 'EMI',
        name: 'Monthly Repayment',
        description: 'The fixed equal dollar amount paid each calendar month until the debt is fully amortized.'
      },
      {
        symbol: 'Total Interest',
        name: 'Cost of Borrowing',
        description: 'Total cumulative interest charges paid over the full duration of the loan (Total Payable − Principal).'
      }
    ]
  },

  conversionTable: {
    title: 'Loan Comparison Benchmarks ($100,000 Borrowed)',
    description: 'Sample repayment profiles for common loan terms and interest rates:',
    headers: ['Loan Type', 'Interest Rate (% p.a.)', 'Tenure', 'Monthly EMI', 'Total Interest Paid', 'Total Repayment'],
    rows: [
      ['3-Year Auto / Personal', '7.5%', '3 Years (36 mo)', '$3,111', '$11,986', '$111,986'],
      ['5-Year Auto / Business', '8.5%', '5 Years (60 mo)', '$2,052', '$23,099', '$123,099'],
      ['10-Year Student / Home', '6.5%', '10 Years (120 mo)', '$1,135', '$36,257', '$136,257'],
      ['15-Year Fixed Mortgage', '6.0%', '15 Years (180 mo)', '$844', '$51,894', '$151,894'],
      ['20-Year Home Loan', '6.5%', '20 Years (240 mo)', '$746', '$78,934', '$178,934'],
      ['30-Year Fixed Mortgage', '7.0%', '30 Years (360 mo)', '$665', '$139,509', '$239,509']
    ]
  },

  example: {
    title: 'Example: Repaying a $100,000 Loan at 8.5% over 5 Years',
    description: 'Suppose you borrow $100,000 for a car or home renovation at an 8.5% annual interest rate over a 5-year tenure (60 monthly payments).',
    inputs: [
      { label: 'Loan Principal', value: '$100,000' },
      { label: 'Annual Interest Rate', value: '8.5% p.a.' },
      { label: 'Loan Tenure', value: '5 Years (60 Months)' }
    ],
    steps: [
      'Step 1: Calculate monthly interest rate: r = 8.5 ÷ 12 ÷ 100 = 0.0070833.',
      'Step 2: Calculate compound growth factor: (1 + 0.0070833)⁶⁰ ≈ 1.5273.',
      'Step 3: Calculate monthly EMI: [100,000 × 0.0070833 × 1.5273] ÷ [1.5273 − 1] = $2,051.65 (rounded to $2,052).',
      'Step 4: Calculate total payable: $2,051.65 × 60 months = $123,099.',
      'Step 5: Calculate total interest: $123,099 − $100,000 = $23,099 (81% Principal, 19% Interest).'
    ],
    calculation: 'EMI = $2,052 / month → Total Payable = $123,099 → Total Interest = $23,099',
    result: 'Monthly EMI: $2,052 | Total Interest: $23,099 | Total Payable: $123,099'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Choosing a shorter tenure increases your monthly EMI but dramatically reduces total lifetime interest paid. For example, shortening a $100,000 loan from 30 years to 15 years can save more than $80,000 in interest.',
      'The visual percentage bar indicates what fraction of your total out-of-pocket payments goes toward the actual borrowed capital (Principal) versus the bank\'s finance charge (Interest).'
    ]
  },

  faqs: [
    {
      question: 'What is an Equated Monthly Installment (EMI)?',
      answer: 'An EMI is a fixed, equal monthly payment made by a borrower to a financial lender on a set date each month to gradually extinguish both the loan principal and accrued interest over a designated tenure.'
    },
    {
      question: 'Why does a longer tenure result in paying more total interest?',
      answer: 'While a longer tenure lowers the monthly installment by spreading repayments over more months, interest accrues on the unpaid balance for a much longer period, significantly increasing total cumulative finance charges.'
    },
    {
      question: 'How do extra principal payments or prepayments help?',
      answer: 'Prepayments reduce the outstanding principal balance immediately. Because subsequent interest charges are calculated on a smaller principal balance, making occasional extra payments can shave years off your loan tenure and save thousands in interest.'
    },
    {
      question: 'What is the difference between fixed-rate and floating-rate loans?',
      answer: 'A fixed-rate loan maintains an unchanging interest rate and EMI throughout the entire duration. A floating-rate loan adjusts periodically based on central bank benchmark rates, which can raise or lower your monthly EMI.'
    },
    {
      question: 'Does this calculator include property taxes and insurance?',
      answer: 'No. This calculator computes the pure principal and interest (P&I) payment. Mortgages often include escrow charges for property taxes and homeowners insurance (PITI), which add to the total monthly housing cost.'
    }
  ],

  notes: {
    title: 'Important Notes & Amortization Standards',
    items: [
      'Reducing Balance Method: Uses standard monthly reducing balance compounding used by international banks and credit unions.',
      'Multi-Currency Support: Supports USD ($), INR (₹), EUR (€), and GBP (£) with locale-formatted integers and currency symbols.',
      'Exclusions: Figures represent pure Principal and Interest (P&I). Loan origination fees, closing costs, insurance, and taxes are excluded.'
    ]
  }
};
