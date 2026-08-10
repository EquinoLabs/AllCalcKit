import type { CalculatorContent } from './types';

export const currencyContent: CalculatorContent = {
  id: 'currency',

  intro: {
    title: 'What is a Live Currency Converter?',
    paragraphs: [
      'A Live Currency Converter is a foreign exchange (Forex) calculation tool that translates money amounts between world currencies using real-time market exchange rates.',
      'Whether you are budgeting international travel expenses, purchasing items from overseas e-commerce stores, sending cross-border remittances to family, invoicing international freelance clients, or tracking foreign currency movements, accurate exchange rate conversions prevent unexpected financial losses. The converter features live exchange rates, one-click currency swapping, and instant preset pairs.'
    ]
  },

  howToUse: {
    title: 'How to Use the Live Currency Converter',
    description: 'Convert between world currencies in four simple steps:',
    steps: [
      'Enter the monetary value you wish to convert in the "From Base" amount box (e.g., 100).',
      'Select your origin currency from the "From Base" dropdown menu (such as USD — US Dollar).',
      'Select your desired target currency from the "Converted Target" dropdown (such as EUR — Euro), or click one of the popular quick presets (e.g. USD→EUR or USD→INR).',
      'View your converted total instantly, check the live exchange rate note at the bottom, or click the center Swap button to reverse the conversion.'
    ]
  },

  howItWorks: {
    title: 'How Currency Conversion Works',
    paragraphs: [
      'Foreign exchange rates fluctuate continuously throughout global trading hours based on supply, demand, inflation, central bank interest rates, and geopolitical stability.',
      'In international Forex networks, currency values are pegged against standard base anchors (such as the US Dollar). To convert between any two currencies A and B, the calculator normalizes Currency A against the USD base rate and multiplies by Currency B\'s exchange rate.'
    ],
    formula: 'Target Amount = Base Amount × (Target Rate ÷ Base Rate)',
    formulaExplanation: 'Where Base Rate and Target Rate represent each currency\'s exchange valuation relative to the global USD benchmark.',
    variables: [
      {
        symbol: 'Base Amount',
        name: 'Origin Value',
        description: 'The monetary amount in your starting currency.'
      },
      {
        symbol: 'From Currency',
        name: 'Base Currency',
        description: 'The 3-letter ISO 4217 currency code you are converting from (e.g. USD, GBP, EUR).'
      },
      {
        symbol: 'To Currency',
        name: 'Target Currency',
        description: 'The destination currency you wish to convert into (e.g. EUR, INR, JPY).'
      },
      {
        symbol: 'Exchange Rate',
        name: 'Mid-Market Rate',
        description: 'The live ratio determining how many units of the target currency equal 1 unit of the base currency.'
      }
    ]
  },

  conversionTable: {
    title: 'Major Global Reserve & Trade Currencies',
    description: 'Standard international currency codes and global economic roles:',
    headers: ['Code', 'Currency Name', 'Symbol', 'Economic Region / Significance'],
    rows: [
      ['USD', 'US Dollar', '$', 'Primary global reserve currency and international trade benchmark'],
      ['EUR', 'Euro', '€', 'Official currency of 20 European Union member nations'],
      ['GBP', 'British Pound Sterling', '£', 'United Kingdom currency; oldest continuously used currency'],
      ['INR', 'Indian Rupee', '₹', 'Currency of India; major emerging global economic market'],
      ['JPY', 'Japanese Yen', '¥', 'Major Asian reserve and international carry-trade currency'],
      ['CAD', 'Canadian Dollar', 'C$', 'Major commodity-backed North American trading currency'],
      ['AUD', 'Australian Dollar', 'A$', 'Key Asia-Pacific resource and commodity trade currency'],
      ['AED', 'UAE Dirham', 'AED', 'Official currency of the United Arab Emirates (pegged to USD)'],
      ['CHF', 'Swiss Franc', 'CHF', 'Traditional European safe-haven and private banking currency'],
      ['SGD', 'Singapore Dollar', 'S$', 'Leading Southeast Asian financial and commerce hub currency']
    ]
  },

  example: {
    title: 'Example: Converting $100 USD to Euros (EUR)',
    description: 'Suppose you want to convert 100 US Dollars to Euros when the live market exchange rate is 1 USD = 0.92 EUR.',
    inputs: [
      { label: 'Amount', value: '$100.00' },
      { label: 'From Currency', value: 'USD (US Dollar)' },
      { label: 'To Currency', value: 'EUR (Euro)' },
      { label: 'Exchange Rate', value: '1 USD = 0.9200 EUR' }
    ],
    steps: [
      'Step 1: Identify base amount: $100.00 USD.',
      'Step 2: Apply the live mid-market exchange rate: 100 × 0.92 = 92.00.',
      'Step 3: Result: 100 USD converts to 92.00 EUR.',
      'Step 4: Rate note indicates: 1 USD = 0.9200 EUR.'
    ],
    calculation: '100 USD × 0.9200 = 92.00 EUR',
    result: '100.00 USD = 92.00 EUR (at 1 USD = 0.9200 EUR)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The converted total is calculated using real-time mid-market rates—the pure midpoint between wholesale buying and selling rates in global financial markets with zero added retail markup.',
      'Commercial banks, credit card processors, and currency exchange kiosks at airports typically apply a 1% to 5% spread or transaction commission on top of this mid-market rate.'
    ]
  },

  faqs: [
    {
      question: 'What is the mid-market exchange rate?',
      answer: 'The mid-market rate (also called the interbank rate) is the true, unfiltered midpoint between the buy and sell prices of two currencies on global wholesale markets. It represents the fairest benchmark rate possible.'
    },
    {
      question: 'Why do airport exchange counters offer lower rates than this converter?',
      answer: 'Airport kiosks and commercial retail exchange booths charge high profit spreads (often 5% to 15% worse than mid-market rates) plus service fees to cover prime location rents and cash handling overhead.'
    },
    {
      question: 'How often do foreign exchange rates change?',
      answer: 'Forex exchange rates fluctuate 24 hours a day, 5 days a week during active global market trading hours. Our tool fetches live rate updates to keep calculations current.'
    },
    {
      question: 'What does the Swap button do?',
      answer: 'Clicking the Swap button instantly inverts your conversion direction (for example, switching from USD→EUR to EUR→USD) and recalculates the new reciprocal exchange rate.'
    },
    {
      question: 'What is a foreign transaction fee on a credit card?',
      answer: 'When using a credit card abroad, many issuing banks charge a 1% to 3% foreign transaction fee on top of the wholesale Visa/Mastercard exchange rate for converting currency.'
    }
  ],

  notes: {
    title: 'Important Notes & Forex Standards',
    items: [
      'Mid-Market Precision: Calculated using pure interbank benchmark rates without hidden broker markups.',
      'Offline Resilience: Automatically uses reliable baseline fallback rates if your network connection is interrupted.',
      'Real-Time Inversion: Reversing currencies with the swap button recalculates reciprocal ratios dynamically.'
    ]
  }
};
