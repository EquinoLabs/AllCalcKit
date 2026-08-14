import type { CalculatorContent } from './types';

export const rentVsBuyContent: CalculatorContent = {
  id: 'rent-vs-buy',

  intro: {
    title: 'What is a Rent vs. Buy Calculator?',
    paragraphs: [
      'A Rent vs. Buy Calculator is a comprehensive real estate and personal finance decision-support tool that models the true long-term financial cost of renting a property versus buying a home over a specific time horizon.',
      'Unlike simplified comparisons that only weigh monthly rent against a monthly mortgage payment, this calculator accounts for every economic dimension of housing: mortgage amortization, down payment opportunity costs, property taxes, homeowners insurance, routine maintenance, brokerage fees, moving overhead, home appreciation, selling agent commissions, and closing transaction costs.',
      'By projecting both paths year-by-year, the calculator identifies which option builds more net wealth and pinpoints your exact breakeven year—the moment buying becomes financially superior to renting.'
    ]
  },

  howToUse: {
    title: 'How to Use the Rent vs. Buy Calculator',
    description: 'Compare your housing options in five simple steps:',
    steps: [
      'Set your current or prospective Monthly Rent and expected annual rent inflation rate.',
      'Enter estimated Misc. Housing Costs (such as annual brokerage amortizations, moving costs, and security deposit overhead).',
      'Enter the Target Home Purchase Price, your Planned Down Payment percentage (e.g. 20%), and prevailing Mortgage Interest Rate.',
      'Adjust ongoing ownership parameters including annual Property Tax Rate, Home Insurance, and Maintenance allocation (~1% of home value/year).',
      'Set expected macroeconomic assumptions: Annual Home Appreciation Rate and Investment Return Rate (opportunity return if upfront capital is invested in the stock market).',
      'Slide the Time Horizon to see the total unrecoverable cost of each path, your net wealth advantage, and your exact Breakeven Year.'
    ]
  },

  howItWorks: {
    title: 'How the Rent vs. Buy Calculation Works',
    paragraphs: [
      'The comparison evaluates the unrecoverable costs of both housing strategies over your selected time horizon.',
      'When renting, your unrecoverable costs include all rent paid, periodic brokerage, moving expenses, and miscellaneous overhead, offset by the investment gains earned on your upfront capital (down payment and buying closing costs) had they remained invested in market index funds.',
      'When buying, your unrecoverable costs include mortgage interest, property taxes, routine maintenance, homeowners insurance, purchase closing fees, and eventual selling broker commissions, offset by the capital appreciation of the property and accumulated loan principal equity.'
    ],
    formula: 'Net Advantage = Unrecoverable Cost of Renting (T) − Unrecoverable Cost of Buying (T)',
    formulaExplanation: 'Where Unrecoverable Cost of Renting = Total Rent + Misc. Housing Costs − Investment Returns on Initial Capital, and Unrecoverable Cost of Buying = Total Cash Outflows − (Future Home Value − Selling Costs − Remaining Loan Balance).',
    variables: [
      {
        symbol: 'P (Home Price)',
        name: 'Target Purchase Price',
        description: 'The full purchase valuation of the prospective home.'
      },
      {
        symbol: 'R (Monthly Rent)',
        name: 'Base Rental Rate',
        description: 'Monthly rental fee for an equivalent living space, compounding annually with rent inflation.'
      },
      {
        symbol: 'r_m (Mortgage Rate)',
        name: 'Annual Borrowing Rate',
        description: 'Fixed annual interest rate on the amortized mortgage loan.'
      },
      {
        symbol: 'g_home',
        name: 'Appreciation Rate',
        description: 'Expected annual increase in property market value.'
      },
      {
        symbol: 'r_inv',
        name: 'Investment Rate',
        description: 'Expected annual return if down payment funds are invested in diversified market portfolios.'
      },
      {
        symbol: 'Breakeven Year',
        name: 'Crossover Horizon',
        description: 'The earliest year in which the cumulative unrecoverable cost of buying drops below that of renting.'
      }
    ]
  },

  conversionTable: {
    title: 'Rent vs. Buy Benchmark Horizons (₹75 Lakhs Home vs. ₹25,000/mo Rent)',
    description: 'Sample unrecoverable financial outcomes across varied holding periods with 20% down, 8.5% mortgage rate, 4% home appreciation, and 11% investment return:',
    headers: ['Holding Period', 'Total Rent (Unrecoverable Cost)', 'Total Buy (Unrecoverable Cost)', 'Better Option', 'Net Wealth Advantage'],
    rows: [
      ['Year 1', '₹3,05,000', '₹8,24,000', 'Renting', 'Renting preserves ₹5,19,000 more capital'],
      ['Year 3', '₹9,97,000', '₹13,65,000', 'Renting', 'Renting preserves ₹3,68,000 more capital'],
      ['Year 5', '₹18,39,000', '₹17,80,000', 'Buying', 'Buying builds ₹59,000 more net wealth'],
      ['Year 10', '₹45,70,000', '₹21,50,000', 'Buying', 'Buying builds ₹24,20,000 more net wealth'],
      ['Year 15 (Benchmark)', '₹85,35,000', '₹12,40,000', 'Buying', 'Buying builds ₹72,95,000 more net wealth'],
      ['Year 20', '₹1,42,20,000', '-₹11,50,000', 'Buying', 'Buying builds ₹1,53,70,000 more net wealth']
    ]
  },

  example: {
    title: 'Example: Comparing a ₹75 Lakhs Home with ₹25,000/Month Rent over 15 Years',
    description: 'Suppose you are deciding between renting an apartment for ₹25,000/month (with 5% annual increases) or purchasing a ₹75,00,000 home with ₹15,00,000 (20%) down at an 8.5% 30-year fixed mortgage rate over a 15-year horizon.',
    inputs: [
      { label: 'Monthly Rent', value: '₹25,000/mo (5% annual growth)' },
      { label: 'Home Price', value: '₹75,00,000 (₹15,00,000 down @ 8.5%)' },
      { label: 'Time Horizon', value: '15 Years' },
      { label: 'Assumptions', value: '4% Appreciation, 11% Investment Return, 0.4% Property Tax, 1% Maintenance, ₹5,000/yr Misc Rental Costs' }
    ],
    steps: [
      'Step 1 (Renting Outflows): Cumulative rent over 15 years totals ₹64,73,000 + ₹75,000 miscellaneous rental expenses (brokerage/moving) = ₹65,48,000.',
      'Step 2 (Renting Opportunity Gain): ₹17,25,000 initial capital (₹15,00,000 down + ₹2,25,000 closing costs) invested at 11% earns substantial compounding returns.',
      'Step 3 (Buying Outflows): Monthly mortgage EMI (₹52,069/mo) + Property Taxes + Maintenance + Initial Closing + Down Payment = total cash outlay.',
      'Step 4 (Buying Proceeds): Property appreciates at 4% annually. After selling costs (6%) and paying off remaining loan balance, significant equity is recovered.',
      'Step 5 (Unrecoverable Buy Cost): Total cash outlay − recovered net sales equity = Unrecoverable buying cost.',
      'Step 6 (Verdict): Over 15 years, home equity buildup and property appreciation overcome initial buying costs, delivering substantial wealth advantage.'
    ],
    calculation: 'Unrecoverable Rent Cost vs. Unrecoverable Buy Cost over 15 Years',
    result: 'Clear year-by-year clarity on whether homeownership or renting maximizes your net worth.'
  },

  resultExplanation: {
    title: 'Understanding Your Decision & Breakeven Point',
    paragraphs: [
      'In the first 2 to 4 years of homeownership, renting is almost always cheaper because upfront buying closing costs (2–4%) and future selling commissions (5–6%) outweigh initial principal paydown.',
      'As your holding period extends beyond the breakeven year (typically 4 to 6 years in balanced markets), home equity buildup and fixed mortgage payments compound in your favor against rising rental rates.',
      'If you plan to relocate within 3 years, renting offers superior flexibility and lower unrecoverable transaction friction. For time horizons of 10–15+ years in appreciating markets, purchasing typically generates greater long-term net wealth.'
    ]
  },

  faqs: [
    {
      question: 'What is the "5% Rule" in the Rent vs. Buy decision?',
      answer: 'The 5% rule is a popular rule of thumb suggesting that the annual unrecoverable cost of owning a home is approximately 5% of its value (1% property tax + 1% maintenance + ~3% cost of capital/debt interest). If you can rent an equivalent home for less than 5% of its purchase price per year (or ~0.42% per month), renting is often financially advantageous.'
    },
    {
      question: 'Why is renting often cheaper in the short term?',
      answer: 'High transaction friction—namely 2–4% purchase closing costs and 5–6% selling broker fees—creates a substantial hurdle. In the first few years, most of your monthly mortgage payment goes toward interest rather than principal equity, making short-term buying more expensive than renting.'
    },
    {
      question: 'How does opportunity cost affect the calculation?',
      answer: 'When you buy, your down payment and closing costs are locked into home equity. When you rent, that same lump sum can be invested in broad-market index funds (historically returning ~10–12% in India). Our calculator factors in this opportunity cost so the comparison is fully mathematically fair.'
    },
    {
      question: 'Is maintenance really 1% of the home value per year?',
      answer: 'The standard financial planning guideline recommends budgeting ~1% of your home value annually for routine maintenance, society maintenance charges, appliance replacements, and repairs. Factoring this in prevents underestimating total ownership costs.'
    },
    {
      question: 'Does this calculator constitute official financial advice?',
      answer: 'No. This calculator is an educational and analytical estimation tool designed to model financial scenarios. Real estate markets, local property taxes, society charges, and individual tax deductions vary. Always consult a certified financial planner (CFP) or licensed mortgage professional before making major real estate decisions.'
    }
  ],

  notes: {
    title: 'Important Financial Notes & Assumptions',
    items: [
      'Opportunity Cost: The down payment lump sum is assumed to compound annually at your chosen investment rate if renting.',
      'Selling Friction: Real estate commissions (typically 5–6%) and transfer taxes are deducted from final sales proceeds.',
      'Tax Deductibility: In certain jurisdictions, mortgage interest and property taxes may offer itemized income tax savings.',
      'Inflation Dynamics: Rental rates compound annually with rent inflation, whereas 30-year fixed principal & interest payments remain locked.'
    ]
  }
};
