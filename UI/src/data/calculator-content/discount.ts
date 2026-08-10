import type { CalculatorContent } from './types';

export const discountContent: CalculatorContent = {
  id: 'discount',

  intro: {
    title: 'What is a Discount & Sale Price Calculator?',
    paragraphs: [
      'A Discount & Sale Price Calculator is a smart shopping and retail math tool that calculates the final sale price and total money saved when an item is marked down by a percentage discount.',
      'Whether you are shopping seasonal clearance sales (such as Black Friday or Cyber Monday), evaluating promotional coupon promo codes, calculating retail store markdowns, or planning your family shopping budget, knowing your exact final price before reaching the checkout counter prevents overspending. The calculator supports multiple currencies (USD, INR, EUR, GBP) and updates in real time as you adjust the price and discount percentage.'
    ]
  },

  howToUse: {
    title: 'How to Use the Discount Calculator',
    description: 'Calculate your sale price and savings in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Enter the original sticker price in the "Original Price" box (e.g. $250).',
      'Adjust the "Discount Off (%)" slider or type your discount percentage, or click one of the quick preset buttons (10%, 20%, 25%, 33%, 50% OFF).',
      'Review your Final Discounted Price, Total Savings amount, and original price confirmation in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Percentage Discount Calculation Works',
    paragraphs: [
      'Discount calculations multiply the original retail price by the discount percentage to determine your total monetary savings. Subtracting these savings from the original price gives the final out-of-pocket price.',
      'Quick mental shortcuts make everyday shopping simple: moving the decimal point one spot to the left gives 10% off; doubling that gives 20% off; dividing by 4 gives 25% off; and dividing by 2 gives 50% off.'
    ],
    formula: 'Final Price = Original Price × (1 − Discount Rate ÷ 100)  |  Savings = Original Price × (Discount Rate ÷ 100)',
    formulaExplanation: 'Where Discount Rate is the percentage markdown (e.g. 25% off leaves 75% of the original price payable).',
    variables: [
      {
        symbol: 'Original Price',
        name: 'Sticker Price',
        description: 'The initial retail list price of the product or service before any markdown.'
      },
      {
        symbol: 'Discount Off (%)',
        name: 'Markdown Percentage',
        description: 'The percentage reduction applied to the retail price (e.g. 10%, 25%, 50%).'
      },
      {
        symbol: 'Total Savings',
        name: 'Money Saved',
        description: 'The exact monetary dollar savings deducted from the original price.'
      },
      {
        symbol: 'Final Price',
        name: 'Discounted Price',
        description: 'The final net amount payable by the consumer at checkout.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Retail Discount Slabs ($100 Item Baseline)',
    description: 'Standard discount rates, dollar savings, and payable prices on a $100 product:',
    headers: ['Discount Percentage', 'Fraction Equivalent', 'Money Saved on $100', 'Final Payable Price', 'Typical Retail Offer'],
    rows: [
      ['10% OFF', '1/10 off', '$10.00', '$90.00', 'Newsletter signup / first-time customer coupon'],
      ['15% OFF', '3/20 off', '$15.00', '$85.00', 'Store loyalty reward / student discount'],
      ['20% OFF', '1/5 off', '$20.00', '$80.00', 'Standard weekend promotional coupon'],
      ['25% OFF', '1/4 off', '$25.00', '$75.00', 'Seasonal flash sale (Quarter off)'],
      ['33% OFF', '1/3 off', '$33.00', '$67.00', 'One-third off seasonal promotion'],
      ['40% OFF', '2/5 off', '$40.00', '$60.00', 'Mid-season fashion clearance'],
      ['50% OFF', '1/2 off', '$50.00', '$50.00', 'Half-price / Buy One Get One (BOGO) baseline'],
      ['70% OFF', '7/10 off', '$70.00', '$30.00', 'Deep inventory liquidation / warehouse clearance']
    ]
  },

  example: {
    title: 'Example: 25% Off a $250 Winter Jacket',
    description: 'Suppose a jacket with an original retail price of $250 is on sale for 25% off during a seasonal promotion.',
    inputs: [
      { label: 'Original Price', value: '$250.00' },
      { label: 'Discount Percentage', value: '25% OFF' }
    ],
    steps: [
      'Step 1: Calculate monetary savings: $250.00 × (25 ÷ 100) = $62.50.',
      'Step 2: Subtract savings from original price: $250.00 − $62.50 = $187.50.',
      'Step 3: Verify fraction: Paying 75% of $250 = 0.75 × 250 = $187.50.'
    ],
    calculation: 'Savings = 250 × 0.25 = $62.50 → Final Price = 250 − 62.50 = $187.50',
    result: 'Final Discounted Price: $187.50 | Total Savings: $62.50'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The green savings badge highlights exactly how much cash you keep in your wallet from the sale.',
      'In most retail regions, applicable sales taxes are calculated on the discounted final price ($187.50) rather than the pre-sale retail price ($250.00), saving you additional money on sales tax.'
    ]
  },

  faqs: [
    {
      question: 'What is the formula to calculate a percentage discount?',
      answer: 'Savings = Original Price × (Discount % ÷ 100), and Final Price = Original Price − Savings. Alternatively, multiply Original Price by (1 − Discount % ÷ 100).'
    },
    {
      question: 'How do stacked or double discounts work (e.g. 20% off + extra 20% off)?',
      answer: 'Consecutive discounts do not add together (20% + 20% ≠ 40%). Instead, the second discount applies to the already discounted price: $100 − 20% = $80, and $80 − 20% = $64, giving an effective 36% total discount.'
    },
    {
      question: 'Is sales tax calculated before or after a discount?',
      answer: 'In the vast majority of jurisdictions, sales tax is assessed on the final discounted price after store markdowns and coupons are applied, which reduces your total tax liability.'
    },
    {
      question: 'How does a "Buy One, Get One 50% Off" (BOGO 50%) deal compare?',
      answer: 'If both items have equal value, a BOGO 50% deal equals a 25% overall discount across the two products (paying 150% of the single item price for 2 items).'
    },
    {
      question: 'What is a quick mental math shortcut for finding 20% off?',
      answer: 'Find 10% by moving the decimal point one place to the left, then double that number. For example, for an $80 item: 10% is $8.00, so 20% is $16.00 off, leaving a final price of $64.00.'
    }
  ],

  notes: {
    title: 'Important Notes & Shopping Guidelines',
    items: [
      'Real-Time Two-Way Sync: The interactive range slider, percentage input box, and quick preset buttons stay synchronized dynamically.',
      'Multi-Currency Support: Fully supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Tax Timing: Final out-of-pocket register totals may vary depending on whether your jurisdiction taxes pre-coupon or post-coupon amounts.'
    ]
  }
};
