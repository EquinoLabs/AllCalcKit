export interface ExplainVariable {
  symbol: string;
  name: string;
  description: string;
}

export interface ExplainExample {
  title?: string;
  scenario?: string;
  inputs?: { label: string; value: string }[];
  steps: string[];
  result: string;
}

export interface ExplainContent {
  id: string;
  title?: string;
  formula: string;
  formulaExplanation?: string;
  variables?: ExplainVariable[];
  example: ExplainExample;
  useCase: string;
}

export const EXPLAIN_CONTENT: Record<string, ExplainContent> = {
  'loan-emi': {
    id: 'loan-emi',
    title: 'How Loan & EMI is Calculated',
    formula: 'EMI = [P × r × (1 + r)ⁿ] ÷ [(1 + r)ⁿ − 1]',
    formulaExplanation: 'Where P is the loan principal, r is the monthly interest rate (Annual Rate ÷ 12 ÷ 100), and n is the total number of monthly payments (Years × 12).',
    variables: [
      { symbol: 'P', name: 'Principal Loan Amount', description: 'The total lump-sum amount borrowed.' },
      { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual interest rate divided by 12 months and 100.' },
      { symbol: 'n', name: 'Loan Tenure in Months', description: 'Total number of monthly repayment installments.' },
      { symbol: 'EMI', name: 'Equated Monthly Installment', description: 'The fixed equal payment made every month.' }
    ],
    example: {
      title: 'Worked Example: $100,000 at 8.5% for 5 Years',
      scenario: 'Suppose you take a $100,000 loan at an 8.5% annual interest rate with a 5-year repayment tenure (60 monthly installments).',
      inputs: [
        { label: 'Principal (P)', value: '$100,000' },
        { label: 'Annual Rate', value: '8.5%' },
        { label: 'Tenure', value: '5 Years (60 mo)' }
      ],
      steps: [
        'Calculate monthly rate: r = 8.5 / 1200 = 0.0070833',
        'Calculate compounding multiplier: (1 + 0.0070833)⁶⁰ = 1.5273',
        'Calculate monthly EMI: [100,000 × 0.0070833 × 1.5273] / [1.5273 − 1] = $2,051.65 / mo',
        'Calculate total payable: $2,051.65 × 60 = $123,099.16 (Total Interest: $23,099.16)'
      ],
      result: 'Monthly EMI: $2,051.65 | Total Interest: $23,099.16'
    },
    useCase: 'Used by prospective homebuyers, vehicle purchasers, and borrowers to accurately budget monthly commitments, compare loan quotes from competing banks, and understand total borrowing costs.'
  },

  'currency': {
    id: 'currency',
    title: 'How Currency Conversion is Calculated',
    formula: 'Converted Amount = Base Amount × (Target Rate ÷ Base Rate)',
    formulaExplanation: 'When converting between currencies using mid-market exchange rates, the source amount is multiplied by the relative exchange rate between the two currencies.',
    variables: [
      { symbol: 'Base Amount', name: 'Starting Currency Quantity', description: 'The amount in your initial source currency.' },
      { symbol: 'Target Rate', name: 'Exchange Rate Multiplier', description: 'Units of target currency per unit of base currency.' },
      { symbol: 'Converted Amount', name: 'Target Currency Total', description: 'The resulting monetary value in the target currency.' }
    ],
    example: {
      title: 'Worked Example: Converting $500 USD to EUR at 0.92',
      scenario: 'Suppose you want to convert $500 USD into Euros (EUR) when the current mid-market exchange rate is 1 USD = 0.9200 EUR.',
      inputs: [
        { label: 'Base Currency', value: '$500.00 USD' },
        { label: 'Exchange Rate', value: '1 USD = 0.9200 EUR' },
        { label: 'Inverse Rate', value: '1 EUR = 1.0870 USD' }
      ],
      steps: [
        'Identify target exchange rate: 1 USD = 0.9200 EUR',
        'Multiply base amount by rate: $500.00 × 0.9200 = €460.00 EUR',
        'Verify inverse parity: €460.00 × 1.0870 = $500.00 USD'
      ],
      result: 'Converted Result: €460.00 EUR (at 1 USD = 0.9200 EUR)'
    },
    useCase: 'Used by international travelers, remote contractors, e-commerce shoppers, and global businesses to price foreign goods accurately and monitor foreign exchange rate movements.'
  },

  'bmi': {
    id: 'bmi',
    title: 'How Body Mass Index (BMI) is Calculated',
    formula: 'Metric: BMI = Weight (kg) ÷ [Height (m)]²   |   Imperial: BMI = [Weight (lbs) × 703] ÷ [Height (in)]²',
    formulaExplanation: 'Body Mass Index (BMI) evaluates body mass relative to height squared. Standard WHO categories: Underweight (< 18.5), Normal Weight (18.5–24.9), Overweight (25.0–29.9), and Obese (≥ 30.0).',
    variables: [
      { symbol: 'Weight', name: 'Body Mass', description: 'Total body mass measured in kilograms (kg) or pounds (lbs).' },
      { symbol: 'Height', name: 'Body Height', description: 'Stature measured in meters (m) or inches (in).' },
      { symbol: 'BMI', name: 'Body Mass Index', description: 'Standard ratio index expressed in kg/m².' }
    ],
    example: {
      title: 'Worked Example: 70 kg Weight at 175 cm Height',
      scenario: 'Suppose an individual weighs 70 kg (154.3 lbs) and has a height of 175 cm (1.75 meters / 5 ft 9 in).',
      inputs: [
        { label: 'Weight', value: '70 kg' },
        { label: 'Height', value: '1.75 m (175 cm)' }
      ],
      steps: [
        'Convert height to meters squared: 1.75 × 1.75 = 3.0625 m²',
        'Divide weight by height squared: 70 ÷ 3.0625 = 22.86 kg/m²',
        'Compare against WHO categories: 22.86 falls within the healthy Normal Weight range (18.5 – 24.9)'
      ],
      result: 'BMI: 22.9 kg/m² — Healthy / Normal Weight'
    },
    useCase: 'Used by individuals, fitness coaches, and healthcare professionals as an initial non-invasive screening metric to identify weight-related health categories and track fitness goals.'
  },

  'percentage': {
    id: 'percentage',
    title: 'How Percentage Calculations Work',
    formula: 'Percentage = (Part ÷ Whole) × 100   |   Percentage Change = [(New − Old) ÷ |Old|] × 100',
    formulaExplanation: 'A percentage indicates parts per hundred. For percentage change (increase or decrease), the absolute difference is divided by the initial starting value.',
    variables: [
      { symbol: 'Part', name: 'Fractional Value', description: 'The portion or subset of the total.' },
      { symbol: 'Whole', name: 'Base / Total Value', description: 'The complete reference amount (100%).' },
      { symbol: 'Percent (%)', name: 'Relative Proportion', description: 'The ratio expressed as a number out of 100.' }
    ],
    example: {
      title: 'Worked Example: 15% Discount on $80 and Price Change from $50 to $65',
      scenario: 'Evaluating both a percentage of a quantity and a percentage change over time.',
      inputs: [
        { label: 'Value A', value: '15% of $80.00' },
        { label: 'Value B', value: 'Price increased from $50.00 to $65.00' }
      ],
      steps: [
        'Calculate percentage of value: (15 ÷ 100) × $80.00 = 0.15 × 80 = $12.00 savings ($68.00 final)',
        'Calculate percentage change: Difference = $65.00 − $50.00 = +$15.00',
        'Divide difference by baseline: ($15.00 ÷ $50.00) × 100 = 0.30 × 100 = +30.0% increase'
      ],
      result: 'Part = $12.00 | Growth Rate = +30.0%'
    },
    useCase: 'Used across retail discounts, sales tax additions, financial return calculations, grading rubrics, price inflation tracking, and business metrics.'
  },

  'tip-split': {
    id: 'tip-split',
    title: 'How Tip & Bill Split is Calculated',
    formula: 'Tip = Subtotal × (Tip % ÷ 100)   |   Per Person = (Subtotal + Tip) ÷ Diners',
    formulaExplanation: 'Gratuity is calculated by multiplying the check subtotal by the chosen tip percentage. The sum of the subtotal and tip is divided equally among the total number of dining partners.',
    variables: [
      { symbol: 'Subtotal', name: 'Base Bill Amount', description: 'Total food and drink charges before gratuity.' },
      { symbol: 'Tip %', name: 'Gratuity Percentage', description: 'Standard tip rate (e.g. 15%, 18%, 20%).' },
      { symbol: 'Diners', name: 'Group Split Count', description: 'Number of individuals sharing the expense.' },
      { symbol: 'Per Person', name: 'Individual Share', description: 'Amount owed per diner including gratuity.' }
    ],
    example: {
      title: 'Worked Example: $120.00 Bill with 18% Tip Split 4 Ways',
      scenario: 'A dining party of 4 receives a restaurant check totaling $120.00 and decides to leave an 18% gratuity.',
      inputs: [
        { label: 'Bill Subtotal', value: '$120.00' },
        { label: 'Tip Percentage', value: '18%' },
        { label: 'Number of Diners', value: '4 People' }
      ],
      steps: [
        'Calculate total tip: $120.00 × (18 / 100) = $120.00 × 0.18 = $21.60 tip',
        'Calculate total bill with tip: $120.00 + $21.60 = $141.60 grand total',
        'Divide grand total among 4 diners: $141.60 ÷ 4 = $35.40 per person',
        'Tip portion per person: $21.60 ÷ 4 = $5.40 tip per person'
      ],
      result: 'Total Tip: $21.60 | Total Bill: $141.60 | Each Pays: $35.40'
    },
    useCase: 'Used when dining out, booking group rides, sharing event expenses, or splitting hotel tabs to guarantee fair contributions and prevent awkward calculation errors.'
  }
};

export function getExplainContent(id: string): ExplainContent | undefined {
  return EXPLAIN_CONTENT[id];
}
