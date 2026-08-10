import type { CalculatorContent } from './types';

export const taxGstContent: CalculatorContent = {
  id: 'tax-gst',

  intro: {
    title: 'What is a GST & Sales Tax Calculator?',
    paragraphs: [
      'A GST & Sales Tax Calculator is an essential commercial pricing, invoicing, and retail accounting tool that calculates consumption taxes across goods and services in two distinct operational modes: Tax-Exclusive (adding tax onto a base price) and Tax-Inclusive (extracting the embedded tax component from a final price).',
      'Whether you are a business owner issuing client invoices, a consumer verifying restaurant and retail store receipts, an online seller configuring e-commerce catalog pricing, or an accountant reconciling VAT or GST tax returns, accurate tax computation prevents costly accounting errors. The calculator supports multiple currencies (USD, INR, EUR, GBP) and updates in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the GST & Sales Tax Calculator',
    description: 'Calculate consumption tax or extract embedded taxes in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Enter the price into the "Amount" box (e.g. $1,000).',
      'Enter the applicable tax percentage in "Tax Rate (% GST / VAT / Sales Tax)", or click one of the quick presets (5%, 12%, 18%).',
      'Choose your Tax Mode:',
      '• Select "Exclusive (+ Add Tax)" if your starting amount is the pre-tax base price and you need to compute the added tax and final invoice total.',
      '• Select "Inclusive (- Extract Tax)" if your starting amount already includes tax and you need to discover the underlying pre-tax base price and exact tax portion.',
      'Review your Gross Total Amount, Net Base Price, and Tax Amount in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Tax Calculation & Reverse Extraction Work',
    paragraphs: [
      'Adding tax to a base amount requires multiplying the net price by the tax percentage. However, extracting embedded tax from a gross price is a common source of mathematical error.',
      'To extract tax from a tax-inclusive total (reverse tax calculation), you must divide the gross price by (1 + Tax Rate ÷ 100), rather than multiplying by the tax percentage. The difference between the gross total and this net base reveals the exact tax collected.'
    ],
    formula: 'Exclusive: Total = Net × (1 + r)  |  Inclusive: Net = Gross ÷ (1 + r), Tax = Gross − Net',
    formulaExplanation: 'Where r is the tax rate as a decimal (Tax Rate ÷ 100). For an 18% rate, divide the gross total by 1.18 to find the net base.',
    variables: [
      {
        symbol: 'Amount',
        name: 'Input Price',
        description: 'The starting monetary amount entered (Net price in exclusive mode; Gross total in inclusive mode).'
      },
      {
        symbol: 'Tax Rate (%)',
        name: 'GST / VAT / Sales Tax Rate',
        description: 'The statutory tax percentage applied to the transaction (e.g. 5%, 12%, 18%, 20%).'
      },
      {
        symbol: 'Gross Total',
        name: 'Final Customer Price',
        description: 'The total price payable by the buyer, including all applicable consumption taxes.'
      },
      {
        symbol: 'Net Base Price',
        name: 'Pre-Tax Value',
        description: 'The underlying revenue retained by the seller before consumption taxes are applied.'
      },
      {
        symbol: 'Tax Amount',
        name: 'Tax Liability',
        description: 'The exact monetary tax component payable to the government tax authority.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Global Tax Slabs & Regional Benchmarks',
    description: 'Typical consumption tax rates across common goods, services, and international jurisdictions:',
    headers: ['Tax Rate (%)', 'Common Region / System', 'Typical Applicable Goods & Services'],
    rows: [
      ['5%', 'India GST, Canada GST, UAE/Saudi VAT', 'Essential food items, life-saving medicines, basic transport'],
      ['7% – 10%', 'United States (State + Local Sales Tax)', 'Average combined retail sales tax across US states and municipalities'],
      ['12%', 'India GST, International VAT tier', 'Processed foods, business apparel, standard consumer hardware'],
      ['18%', 'India GST standard slab', 'IT software, telecommunications, financial services, consumer electronics'],
      ['20%', 'United Kingdom VAT, France VAT', 'Standard European VAT on general goods and professional services'],
      ['28%', 'India GST luxury tier', 'Automobiles, luxury goods, aerated beverages, high-end hospitality']
    ]
  },

  example: {
    title: 'Example: Calculating 18% GST (Exclusive vs. Inclusive)',
    description: 'Suppose you have an amount of $1,000 with an 18% tax rate and want to compare both calculation modes.',
    inputs: [
      { label: 'Amount', value: '$1,000.00' },
      { label: 'Tax Rate', value: '18% GST' }
    ],
    steps: [
      'Exclusive Mode (+ Add Tax): Starting with Net Base = $1,000.00. Tax = $1,000 × 0.18 = $180.00. Gross Total = $1,180.00.',
      'Inclusive Mode (- Extract Tax): Starting with Gross Total = $1,000.00. Net Base = $1,000 ÷ 1.18 = $847.46. Tax = $1,000 − $847.46 = $152.54.'
    ],
    calculation: 'Exclusive: $1,000 + $180 = $1,180  |  Inclusive: $1,000 ÷ 1.18 = $847.46 (Tax: $152.54)',
    result: 'Exclusive Gross: $1,180.00 (Tax $180) | Inclusive Net: $847.46 (Tax $152.54)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'In Exclusive mode, tax is added on top of your amount. In Inclusive mode, the tool performs reverse extraction to isolate the pre-tax base cost and the embedded tax.',
      'For dual-component taxes like Indian GST (which splits equally into CGST and SGST for intra-state transactions), an 18% tax amount simply divides evenly into 9% Central GST and 9% State GST.'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between Tax Exclusive and Tax Inclusive pricing?',
      answer: 'Tax-exclusive pricing means the advertised price does not include tax, so tax is added on at final checkout. Tax-inclusive pricing means the sticker price is the final price and already incorporates all taxes.'
    },
    {
      question: 'How do you extract embedded tax from a gross price?',
      answer: 'Divide the gross total by (1 + Tax Rate ÷ 100). For an 18% tax rate, divide the gross amount by 1.18. Subtracting this result from the gross amount gives the exact tax component.'
    },
    {
      question: 'What is the difference between GST, VAT, and Sales Tax?',
      answer: 'Sales tax is a single-stage tax levied only on the final retail sale to the consumer. VAT (Value Added Tax) and GST (Goods and Services Tax) are multi-stage taxes collected at each step of the supply chain, allowing businesses to claim input tax credits on business purchases.'
    },
    {
      question: 'How are CGST and SGST divided in India?',
      answer: 'For transactions within the same Indian state, the total GST rate is divided equally between the Central Government (CGST) and State Government (SGST). For example, an 18% GST rate comprises 9% CGST and 9% SGST.'
    },
    {
      question: 'Why does US sales tax vary from city to city?',
      answer: 'The United States has no national sales tax. Instead, individual states, counties, and cities each set their own local sales tax rates, which combine at checkout.'
    }
  ],

  notes: {
    title: 'Important Notes & Taxation Guidelines',
    items: [
      'Exact Reverse Mathematics: Uses mathematically precise reverse divisor logic Total ÷ (1 + r) to avoid rounding discrepancies.',
      'Multi-Currency Support: Fully supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency settings.',
      'Preset Slugs: One-click presets (5%, 12%, 18%) provide rapid testing for standard commercial tax brackets.'
    ]
  }
};
