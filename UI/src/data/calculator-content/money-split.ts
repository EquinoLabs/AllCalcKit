import type { CalculatorContent } from './types';

export const moneySplitContent: CalculatorContent = {
  id: 'money-split',

  intro: {
    title: 'Free Group Expense Splitter & Settlement Calculator',
    paragraphs: [
      'The Money Split tool on All Calc Kit is a fast, lightweight, and privacy-first expense-sharing mini-application. Designed for vacations, room-sharing, group dinners, and road trips, it allows you to create groups, add participants, record shared expenses, and instantly compute net settlement balances without requiring user accounts or logins.',
      'Unlike traditional cloud platforms, all your group data, participants, and expense ledgers are saved directly on your local device using secure browser storage. All calculations run offline in real time, and you can share full interactive group links or clean WhatsApp settlement summaries with a single click.'
    ]
  },

  howToUse: {
    title: 'How to Manage & Split Group Expenses',
    description: 'Track group expenses in 4 simple steps:',
    steps: [
      'Create a new group (e.g., "Goa Trip" or "Apartment Expenses") and choose your preferred currency.',
      'Add group participants by entering their names.',
      'Add expenses by specifying the total amount, who paid, who was involved, and your split method (Equal, Percentage, or Exact Amount).',
      'Review real-time net settlement balances to see who owes whom, and share the full group link or copy the WhatsApp text summary.'
    ]
  },

  howItWorks: {
    title: 'The Mathematics of Net Balance Settlement',
    paragraphs: [
      'To determine who owes money and who should receive money, each participant has two running metrics: Total Amount Paid and Total Share Owed.',
      'Equal splits divide the total bill among selected participants down to the exact cent or paise. Any fractional remainder is deterministically allocated to ensure the sum of all individual shares matches the original invoice to 100% precision.',
      'Net balance is calculated by subtracting a participant’s total owed share from the total amount they paid out of pocket.'
    ],
    formula: 'Net Balance = Total Paid − Total Owed',
    formulaExplanation: 'If Net Balance > 0, the participant is owed money from the group. If Net Balance < 0, the participant owes that amount to the group. If Net Balance = 0, the participant is fully settled.',
    variables: [
      { symbol: 'Total Paid', name: 'Total Out-of-Pocket Payments', description: 'Sum of all group invoices paid by this specific participant' },
      { symbol: 'Total Owed', name: 'Total Allocated Expense Shares', description: 'Sum of all individual shares allocated to this participant across all expenses' },
      { symbol: 'Net Balance', name: 'Settlement Standing', description: 'Final net financial position for group balance settlement' }
    ]
  },

  conversionTable: {
    title: 'Comparison of Expense Split Methods',
    description: 'Select the optimal split method based on your group situation:',
    headers: ['Split Method', 'Best Used For', 'Calculation Rule', 'Validation Constraint'],
    rows: [
      ['Equal Split', 'Group meals, road trip fuel, Airbnb rentals', 'Total Amount ÷ Active Participants', 'Automatic 100% remainder cent allocation'],
      ['Percentage Split', 'Unequal consumption, income-proportional bills', 'Total Amount × (Assigned % ÷ 100)', 'Sum of all participant percentages must equal 100%'],
      ['Exact Amount Split', 'Itemized dinner bills, grocery receipts, custom shares', 'Exact custom amounts per person', 'Sum of all individual amounts must equal total bill']
    ]
  },

  example: {
    title: 'Example: 3-Friend Weekend Trip Settlement',
    description: 'Lakshya, Rahul, and Ananya take a weekend trip. Two expenses are recorded:',
    inputs: [
      { label: 'Expense 1 (Pizza & Drinks)', value: '₹1,000 paid by Rahul (Split equally among 3)' },
      { label: 'Expense 2 (Cab Fare)', value: '₹600 paid by Lakshya (Split equally among 3)' }
    ],
    steps: [
      'Expense 1 Breakdown: Rahul paid ₹1,000. Each person owes ₹333.33 (Lakshya receives ₹0.01 deterministic remainder = ₹333.34).',
      'Expense 2 Breakdown: Lakshya paid ₹600. Each person owes ₹200.00.',
      'Total Paid: Lakshya = ₹600, Rahul = ₹1,000, Ananya = ₹0.',
      'Total Owed: Lakshya = ₹533.34, Rahul = ₹533.33, Ananya = ₹533.33.',
      'Net Balance Calculation: Lakshya = ₹600 − ₹533.34 = +₹66.66 | Rahul = ₹1,000 − ₹533.33 = +₹466.67 | Ananya = ₹0 − ₹533.33 = −₹533.33.'
    ],
    calculation: 'Sum of Receivers (+₹66.66 + +₹466.67 = +₹533.33) == Sum of Owers (−₹533.33)',
    result: 'Rahul receives ₹466.67, Lakshya receives ₹66.66, and Ananya pays ₹533.33.'
  },

  resultExplanation: {
    title: 'Understanding Settlement Balances',
    paragraphs: [
      'In any closed group ledger, the total amount owed by all debtors always equals the total amount receivable by all creditors. This ensures a balanced, zero-sum financial ledger.',
      'Participants who paid more than their fair share will have a positive green balance (+), while participants who consumed more than they paid will have a negative red balance (−).'
    ]
  },

  notes: {
    title: 'Important Usage & Privacy Information',
    items: [
      '100% Private & Offline: All group data and calculations are stored exclusively in your local web browser. No accounts or server connections are needed.',
      'Automatic Saving: Every group edit, participant update, or expense modification is saved instantly to your device.',
      'Safe Sharing: Shared group links contain self-contained URL payloads and never overwrite existing local groups without your explicit consent.'
    ]
  },

  faqs: [
    {
      question: 'How does the Money Split calculator handle uneven division rounding?',
      answer: 'Our calculation engine uses integer arithmetic in cents/paise rather than standard floating-point division. When an amount like ₹1,000 or $100 is divided among 3 people, the 1-cent/paise remainder is deterministically allocated to ensure the sum of all individual shares matches the original invoice to 100% precision without any lost pennies.'
    },
    {
      question: 'Do I need an account or internet connection to use Money Split?',
      answer: 'No. All Calc Kit is completely free, privacy-focused, and requires no account or login. All group calculations and data persistence happen locally in your browser, allowing the tool to work completely offline.'
    },
    {
      question: 'Will my saved groups disappear if I close my browser?',
      answer: 'No. Groups are automatically saved to your browser’s localStorage. When you return to the page or launch All Calc Kit as a PWA, your groups and expenses will still be there.'
    },
    {
      question: 'Can I split an expense unevenly or by exact amounts?',
      answer: 'Yes! Money Split supports three distinct split methods: Equal Split (divided evenly among selected members), Percentage Split (assigned custom percentage shares summing to 100%), and Exact Amount Split (custom itemized amounts per member).'
    },
    {
      question: 'How do shareable group links work?',
      answer: 'When you click "Share Group", the entire group ledger is serialized into a secure, URL-safe data link. When someone opens that link, they are prompted with an import dialog allowing them to view or save the group to their own device.'
    }
  ]
};
