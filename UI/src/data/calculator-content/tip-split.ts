import type { CalculatorContent } from './types';

export const tipSplitContent: CalculatorContent = {
  id: 'tip-split',

  intro: {
    title: 'What is a Tip & Bill Splitter?',
    paragraphs: [
      'A Tip & Bill Splitter is a social dining and hospitality expense calculation tool that calculates total gratuity and divides restaurant, bar, or café bills evenly among friends, colleagues, or dining groups.',
      'Instead of performing awkward mental math or negotiating payment shares after a group meal, this calculator determines the exact total tip, tip per person, and grand total payment required from each individual diner. The tool supports multiple global currencies (USD, INR, EUR, GBP) and updates in real time as you adjust the bill, tip percentage, and guest count.'
    ]
  },

  howToUse: {
    title: 'How to Use the Tip & Bill Splitter',
    description: 'Split your dining check and tip in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Enter the receipt amount in the "Total Bill Amount" box (e.g. $120).',
      'Adjust the "Tip Percentage" slider to choose your desired gratuity level (e.g. 15% standard, 18% good, 20% excellent).',
      'Set the "Number of People" slider to match how many diners are splitting the meal (e.g. 3 People).',
      'Review the Total Pay Per Person, Total Tip Amount, and Tip Per Person in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Tip & Bill Splitting Works',
    paragraphs: [
      'The calculation first computes the total gratuity by multiplying the bill amount by the selected tip percentage. The bill and tip are combined into a grand total, which is then divided equally by the number of diners.',
      'Equally distributing both the meal base and the server\'s gratuity ensures transparent fairness when paying with group peer-to-peer payment apps (such as Venmo, Zelle, Revolut, or UPI).'
    ],
    formula: 'Total Tip = Bill × (Tip % ÷ 100)  |  Per Person = (Bill + Total Tip) ÷ People',
    formulaExplanation: 'Where Bill is the food and drink check, Tip % is the gratuity rate, and People is the number of sharing diners.',
    variables: [
      {
        symbol: 'Bill Amount',
        name: 'Check Total',
        description: 'The total cost of food and beverages listed on the restaurant check.'
      },
      {
        symbol: 'Tip Percentage',
        name: 'Gratuity Rate',
        description: 'The percentage added as a service tip (commonly 15%, 18%, or 20%).'
      },
      {
        symbol: 'Number of People',
        name: 'Diners Count',
        description: 'The total count of individuals sharing the bill equally.'
      },
      {
        symbol: 'Total Tip Amount',
        name: 'Cumulative Gratuity',
        description: 'The total dollar gratuity given to the service staff.'
      },
      {
        symbol: 'Total Pay Per Person',
        name: 'Individual Share',
        description: 'The exact amount each individual must contribute (food share + individual tip).'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Tipping Benchmarks ($100 Bill Split Among 4 Diners)',
    description: 'Individual and group payment amounts across standard service quality tiers:',
    headers: ['Tip Percentage', 'Service Quality Tier', 'Total Tip on $100', 'Grand Total', 'Pay Per Person (4 Diners)'],
    rows: [
      ['0% Tip', 'No tip / Service included in menu', '$0.00', '$100.00', '$25.00 / person'],
      ['10% Tip', 'Fair / basic counter service', '$10.00', '$110.00', '$27.50 / person'],
      ['15% Tip', 'Customary North American standard', '$15.00', '$115.00', '$28.75 / person'],
      ['18% Tip', 'Good, attentive table service', '$18.00', '$118.00', '$29.50 / person'],
      ['20% Tip', 'Great / exceptional dining hospitality', '$20.00', '$120.00', '$30.00 / person'],
      ['25% Tip', 'Outstanding / luxury fine dining service', '$25.00', '$125.00', '$31.25 / person']
    ]
  },

  example: {
    title: 'Example: Splitting a $120 Dinner at 15% Tip Among 3 Diners',
    description: 'Suppose you and 2 friends share a $120 dinner tab and want to leave a standard 15% tip.',
    inputs: [
      { label: 'Total Bill Amount', value: '$120.00' },
      { label: 'Tip Percentage', value: '15%' },
      { label: 'Number of People', value: '3 People' }
    ],
    steps: [
      'Step 1: Calculate total tip: $120.00 × 0.15 = $18.00.',
      'Step 2: Calculate grand total bill: $120.00 + $18.00 = $138.00.',
      'Step 3: Divide grand total by 3 diners: $138.00 ÷ 3 = $46.00 per person.',
      'Step 4: Verify tip per person: $18.00 ÷ 3 = $6.00 tip per person.'
    ],
    calculation: 'Total Tip = $18.00 → Grand Total = $138.00 → Per Person = $46.00',
    result: 'Total Pay Per Person: $46.00 | Total Tip: $18.00 | Tip Per Person: $6.00'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The large highlighted number shows exactly how much cash or digital transfer each diner must send to cover both the meal and gratuity cleanly.',
      'The breakdown cards separate the server\'s tip from the total cost for complete financial clarity.'
    ]
  },

  faqs: [
    {
      question: 'What is the standard restaurant tipping percentage?',
      answer: 'In the United States and Canada, 15% to 20% is standard practice: 15% for acceptable service, 18% for good service, and 20% or more for attentive, excellent service.'
    },
    {
      question: 'Should tips be calculated before or after tax?',
      answer: 'Standard dining etiquette recommends calculating tips on the pre-tax subtotal so gratuity reflects service rather than local government tax, though calculating on the total is also widely accepted.'
    },
    {
      question: 'What is an automatic gratuity or service charge?',
      answer: 'Many restaurants automatically add an 18% to 20% service charge for large groups (typically parties of 6 or more). Always check your itemized receipt before adding additional tip.'
    },
    {
      question: 'How do tipping customs differ in Europe and Asia?',
      answer: 'In Europe, service is frequently included (service compris) and leaving small round-up change is common. In Japan and South Korea, tipping is not customary and can even be considered impolite.'
    },
    {
      question: 'How should we handle uneven individual orders?',
      answer: 'If some diners ordered expensive entrees or specialty cocktails, use the calculator to determine the shared base and have those diners add their itemized differences directly.'
    }
  ],

  notes: {
    title: 'Important Notes & Dining Etiquette',
    items: [
      'Dynamic Sliders: Easily adjust tip rates (0–40%) and group sizes (1–20 diners) with instant visual feedback.',
      'Multi-Currency Support: Fully supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Two-Decimal Currency: Outputs are formatted to two decimal places for easy sharing via peer-to-peer mobile apps.'
    ]
  }
};
