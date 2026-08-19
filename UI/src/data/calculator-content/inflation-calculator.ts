import type { CalculatorContent } from './types';

export const inflationCalculatorContent: CalculatorContent = {
  id: 'inflation-calculator',

  intro: {
    title: 'What is an Inflation & Purchasing Power Calculator?',
    paragraphs: [
      'An Inflation and Purchasing Power Calculator measures how the rising cost of goods and services erodes the real value of money over time.',
      'Inflation reduces what a fixed amount of currency can buy in the future. For example, a basket of groceries that cost $1,000 ten years ago requires significantly more money today due to compounding annual price inflation.',
      'This calculator determines future equivalent costs, total percentage inflation over multi-year horizons, and the exact percentage loss of purchasing power on cash savings.'
    ]
  },

  howToUse: {
    title: 'How to Use the Inflation Calculator',
    description: 'Calculate inflation impact in three steps:',
    steps: [
      'Enter your Starting Monetary Amount (e.g. $1,000, $10,000, or $100,000).',
      'Select your Time Horizon in years (1 to 40 years).',
      'Choose or adjust the expected Average Annual Inflation Rate % (using presets like 2.0% central bank target, 3.5% historical US average, or custom rates).',
      'Review your Future Equivalent Cost, Purchasing Power Loss %, and the Real Value of future cash in today’s purchasing power.'
    ]
  },

  howItWorks: {
    title: 'How Inflation and Purchasing Power Work',
    paragraphs: [
      'Future cost is calculated by compounding the starting amount at the annual inflation rate over N years: Future Cost = P × (1 + r)ⁿ.',
      'Purchasing power is the inverse of the price index: Real Value Today = P ÷ (1 + r)ⁿ.',
      'Purchasing Power Loss % = [1 − (1 ÷ (1 + r)ⁿ)] × 100.'
    ],
    formula: 'Future Equivalent Cost = Present Amount × (1 + Inflation Rate)ⁿ',
    formulaExplanation: 'Where n is the number of years. Compounding price growth increases the nominal cost of living exponentially over time.',
    variables: [
      {
        symbol: 'P (Present Amount)',
        name: 'Initial Capital',
        description: 'Monetary value today in base currency.'
      },
      {
        symbol: 'r (Inflation Rate)',
        name: 'Annual Inflation Rate',
        description: 'Annual percentage change in Consumer Price Index (CPI).'
      },
      {
        symbol: 'n (Years)',
        name: 'Time Horizon',
        description: 'Number of years into the future.'
      }
    ]
  },

  conversionTable: {
    title: 'Purchasing Power of $1,000 Over Time at 3.5% Historical Inflation',
    description: 'Decline in real cash value and required future cost across common time horizons:',
    headers: ['Time Horizon', 'Future Equivalent Cost', 'Cumulative Inflation', 'Real Value of $1,000 Today', 'Purchasing Power Loss'],
    rows: [
      ['5 Years', '$1,187.69', '+18.8%', '$841.97', '−15.8% Loss'],
      ['10 Years', '$1,410.60', '+41.1%', '$708.92', '−29.1% Loss'],
      ['15 Years', '$1,675.35', '+67.5%', '$596.89', '−40.3% Loss'],
      ['20 Years', '$1,989.79', '+99.0%', '$502.57', '−49.7% Loss (Halved)'],
      ['30 Years', '$2,806.79', '+180.7%', '$356.28', '−64.4% Loss']
    ]
  },

  example: {
    title: 'Example: $10,000 Cash Savings Over a 10-Year Horizon @ 3.5% Inflation',
    description: 'An individual holds $10,000 in uninvested cash for 10 years with 3.5% annual inflation:',
    inputs: [
      { label: 'Initial Amount', value: '$10,000' },
      { label: 'Time Horizon', value: '10 Years' },
      { label: 'Annual Inflation Rate', value: '3.5% / year' }
    ],
    steps: [
      'Compounding Factor = (1 + 0.035)¹⁰ ≈ 1.4106.',
      'Future equivalent cost for today’s $10,000 basket of goods = $10,000 × 1.4106 = $14,106.',
      'Real purchasing power of $10,000 cash in 10 years = $10,000 ÷ 1.4106 = $7,089.18.',
      'Purchasing power lost to inflation = −29.1%.'
    ],
    calculation: '$10,000 today will require $14,106 in 10 years to maintain standard of living',
    result: 'Uninvested cash loses nearly 30% of its real purchasing power over a 10-year period.'
  },

  resultExplanation: {
    title: 'Understanding Purchasing Power Erosion',
    paragraphs: [
      'While your nominal bank balance stays unchanged, general price inflation continuously diminishes how many goods, services, and assets each dollar can purchase.',
      'Investing in assets that earn rates of return above the prevailing inflation rate is essential for preserving generational purchasing power.'
    ]
  },

  notes: {
    title: 'Inflation Protection Strategies',
    items: [
      'TIPS (Treasury Inflation-Protected Securities): Government bonds whose principal value adjusts upward with the Consumer Price Index.',
      'Equity Diversification: Productive companies that possess pricing power can raise customer prices to match inflation, protecting equity earnings.',
      'Real Assets: Real estate and commodities historically appreciate in nominal value in tandem with general inflation.'
    ]
  },

  faqs: [
    {
      question: 'What is the "Rule of 72" in inflation?',
      answer: 'The Rule of 72 is a quick mental math shortcut to estimate how long it takes for the cost of living to double at a given inflation rate. Divide 72 by the annual inflation percentage. For instance, at 3.5% annual inflation, prices double every 72 ÷ 3.5 ≈ 20.6 years.'
    },
    {
      question: 'How does inflation affect my cash savings in bank accounts?',
      answer: 'If your savings account interest rate is lower than the annual inflation rate, your money is losing real purchasing power each year even though the nominal dollar balance is growing. To preserve wealth, investors allocate capital to inflation-resilient assets like real estate, equities, gold, and inflation-indexed bonds (TIPS).'
    },
    {
      question: 'What is CPI (Consumer Price Index)?',
      answer: 'The Consumer Price Index (CPI) is a macroeconomic measure examined by central banks and governments that tracks the weighted average price of a representative basket of consumer goods and services (housing, food, transportation, healthcare, energy).'
    }
  ]
};
