import type { CalculatorContent } from './types';

export const electricityBillContent: CalculatorContent = {
  id: 'electricity-bill',

  intro: {
    title: 'What is an Appliance Electricity Bill Estimator?',
    paragraphs: [
      'An Appliance Electricity Bill Estimator is a household energy management and utility budgeting tool that calculates the electricity consumption (in kilowatt-hours, kWh) and financial running cost of any home or office electronic appliance.',
      'By entering an appliance\'s rated power wattage, your average daily operating hours, and your local electricity tariff per kWh, you can immediately project your daily power consumption, monthly electric bill impact (30 days), and full annual operating expense. The calculator supports multiple currencies (USD, INR, EUR, GBP) and updates in real time as you adjust numbers.'
    ]
  },

  howToUse: {
    title: 'How to Use the Electricity Bill Estimator',
    description: 'Estimate appliance electricity costs in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency dropdown.',
      'Enter the appliance\'s power rating in "Appliance Power Rating (Watts)" (e.g. 1500 W for an air conditioner or space heater).',
      'Enter your average "Daily Usage (Hours per Day)" (e.g. 8 hours).',
      'Enter your utility company\'s "Electricity Cost per kWh" from your electric bill (e.g. $0.15 per kWh).',
      'Review your Estimated Monthly Cost (30 Days), Daily Consumption (kWh), and Annual Cost in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Electricity Bill Calculation Works',
    paragraphs: [
      'Electric utility companies bill customers based on kilowatt-hours (kWh)—where 1 kWh equals 1,000 Watts of electrical power consumed continuously for one hour.',
      'To calculate consumption, the tool multiplies an appliance\'s rated wattage by daily operating hours and divides by 1,000 to convert to kilowatt-hours. Multiplying daily kWh by 30 days and the unit tariff produces your monthly cost.'
    ],
    formula: 'Monthly Cost = [(Power in Watts × Daily Hours) ÷ 1,000] × 30 Days × Cost per kWh',
    formulaExplanation: 'Where (Watts × Hours) ÷ 1,000 gives daily kilowatt-hours (kWh), which is projected over 30 days and multiplied by the utility rate.',
    variables: [
      {
        symbol: 'Power (Watts)',
        name: 'Appliance Wattage',
        description: 'The maximum power consumption rating of the appliance in Watts (W).'
      },
      {
        symbol: 'Daily Hours',
        name: 'Operating Duration',
        description: 'Number of hours the appliance runs actively per 24-hour day.'
      },
      {
        symbol: 'Cost per kWh',
        name: 'Electricity Rate / Tariff',
        description: 'The combined supply and delivery charge billed by your electric utility per kilowatt-hour.'
      },
      {
        symbol: 'Daily kWh',
        name: 'Energy Consumed',
        description: 'Total kilowatt-hours of electrical energy consumed per day.'
      },
      {
        symbol: 'Monthly / Annual Cost',
        name: 'Projected Utility Expense',
        description: 'Estimated financial cost to run the appliance over 30 days and 365 days.'
      }
    ]
  },

  conversionTable: {
    title: 'Typical Household Appliance Power Ratings & Monthly Costs',
    description: 'Estimated consumption and monthly cost assuming an average electricity tariff of $0.15 per kWh:',
    headers: ['Appliance', 'Average Power (Watts)', 'Typical Daily Use', 'Daily Energy (kWh)', 'Est. Monthly Cost ($0.15/kWh)'],
    rows: [
      ['LED Light Bulb', '9 W', '6 hours', '0.054 kWh', '$0.24 / month'],
      ['Ceiling Fan', '75 W', '8 hours', '0.60 kWh', '$2.70 / month'],
      ['Laptop Computer', '60 W', '8 hours', '0.48 kWh', '$2.16 / month'],
      ['Desktop Gaming PC', '400 W', '4 hours', '1.60 kWh', '$7.20 / month'],
      ['Refrigerator (Duty Cycle)', '150 W avg', '24 hours (cycled)', '1.80 kWh', '$8.10 / month'],
      ['Window / Split AC (1.5 Ton)', '1,500 W', '8 hours', '12.00 kWh', '$54.00 / month'],
      ['Portable Space Heater', '1,500 W', '6 hours', '9.00 kWh', '$40.50 / month'],
      ['Electric Water Heater', '4,000 W', '3 hours', '12.00 kWh', '$54.00 / month'],
      ['Electric Vehicle (EV) Level 2', '7,200 W', '4 hours', '28.80 kWh', '$129.60 / month']
    ]
  },

  example: {
    title: 'Example: Estimating the Monthly Cost of a 1,500W Air Conditioner',
    description: 'Suppose you run a 1,500-Watt air conditioner for 8 hours each day during the summer, with electricity priced at $0.15 per kWh.',
    inputs: [
      { label: 'Power Rating', value: '1,500 Watts' },
      { label: 'Daily Usage', value: '8 Hours / Day' },
      { label: 'Electricity Tariff', value: '$0.15 / kWh' }
    ],
    steps: [
      'Step 1: Calculate daily energy consumption: (1,500 W × 8 hours) ÷ 1,000 = 12.00 kWh per day.',
      'Step 2: Calculate monthly energy consumption: 12.00 kWh/day × 30 days = 360 kWh per month.',
      'Step 3: Calculate monthly cost: 360 kWh × $0.15/kWh = $54.00 per month.',
      'Step 4: Calculate annual cost: 12.00 kWh/day × 365 days × $0.15 = $657.00 per year.'
    ],
    calculation: 'Daily = (1500 × 8)/1000 = 12 kWh → Monthly = 12 × 30 × $0.15 = $54.00',
    result: 'Estimated Monthly Cost: $54.00 | Daily Consumption: 12.00 kWh | Annual Cost: $657.00'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The calculated cost is based on continuous rated power. Appliances with thermostats (such as refrigerators and modern inverter air conditioners) cycle on and off, which may result in slightly lower real-world average consumption.',
      'To lower high monthly power bills, look for high-wattage heating and cooling devices that run for long hours, as they represent the largest portion of home electricity usage.'
    ]
  },

  faqs: [
    {
      question: 'What is a kilowatt-hour (kWh)?',
      answer: 'A kilowatt-hour (kWh) is the standard billing unit of electrical energy. It equals 1,000 Watts of power consumed continuously for one full hour (e.g. running a 1,000W microwave for 1 hour consumes exactly 1 kWh).'
    },
    {
      question: 'Where can I find my appliance\'s wattage rating?',
      answer: 'Wattage is listed on the manufacturer label or specification plate on the back or underside of the device. If the label only lists Volts (V) and Amperes (A), multiply Volts × Amps = Watts (e.g. 120V × 10A = 1,200 Watts).'
    },
    {
      question: 'How do I find my electricity rate per kWh?',
      answer: 'Inspect your monthly electric utility bill. Find the total electricity charges (including both supply and delivery/transmission fees) and divide by total kWh used, or look for the stated rate per kWh (typically between $0.10 and $0.35/kWh).'
    },
    {
      question: 'Do appliances like refrigerators consume full wattage 24 hours a day?',
      answer: 'No. Refrigerator compressors cycle on and off to maintain a set temperature, typically running actively for only 30% to 50% of the day once cooled.'
    },
    {
      question: 'What household appliances consume the most electricity?',
      answer: 'Heating and cooling systems (HVAC), electric water heaters, space heaters, clothes dryers, electric ovens, and electric vehicle chargers have the highest power draws in modern homes.'
    }
  ],

  notes: {
    title: 'Important Notes & Energy Considerations',
    items: [
      'Conversion Factor: Wattage is divided by 1,000 to convert from instantaneous Watts (W) to energy units in kilowatt-hours (kWh).',
      'Multi-Currency Support: Supports USD ($), INR (₹), EUR (€), and GBP (£) with persistent currency selection.',
      'Duty Cycle Variations: Thermostat-controlled appliances draw peak power intermittently rather than constantly.'
    ]
  }
};
