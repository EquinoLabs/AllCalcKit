import type { CalculatorContent } from './types';

export const fuelCostContent: CalculatorContent = {
  id: 'fuel-cost',

  intro: {
    title: 'What is a Fuel Trip Cost & Consumption Calculator?',
    paragraphs: [
      'A Fuel Trip Cost & Consumption Calculator is a travel budgeting and driving expense estimation tool that calculates the total gasoline, petrol, or diesel cost and fuel volume required for any road trip, daily commute, or fleet route.',
      'By entering your total travel distance, your vehicle\'s average fuel efficiency (in km/L or MPG), and the local fuel price per liter or gallon, you can immediately estimate your total trip expense, fuel volume needed, and cost per kilometer or mile. The tool supports multiple global currencies (USD, INR, EUR, GBP) and updates in real time as you adjust your parameters.'
    ]
  },

  howToUse: {
    title: 'How to Use the Fuel Trip Cost Calculator',
    description: 'Calculate fuel expenses for any driving route in four simple steps:',
    steps: [
      'Select your preferred currency (USD $, INR ₹, EUR €, or GBP £) from the top-right currency selector.',
      'Enter your total "Trip Distance" in kilometers or miles (e.g. 350 km).',
      'Enter your vehicle\'s average "Vehicle Mileage" in km/L or MPG (e.g. 15 km/L).',
      'Enter the current "Fuel Price per Liter / Gallon" (e.g. $1.50 per liter).',
      'View your Total Estimated Trip Cost, exact Fuel Required volume, and Cost per Distance Unit in the results card.'
    ]
  },

  howItWorks: {
    title: 'How Fuel Cost Calculation Works',
    paragraphs: [
      'Trip fuel economics depend on two simple relationships: dividing your total distance by your vehicle\'s fuel economy determines the total volume of fuel consumed, and multiplying that fuel volume by the unit fuel price yields the total trip expense.',
      'The calculation works consistently across both Metric (km, km/L, price/Liter) and Imperial (miles, MPG, price/Gallon) systems, provided your units match.'
    ],
    formula: 'Total Cost = (Trip Distance ÷ Vehicle Mileage) × Fuel Price',
    formulaExplanation: 'Where Distance ÷ Mileage equals total fuel volume required, and multiplying by Fuel Price gives the final trip cost.',
    variables: [
      {
        symbol: 'Trip Distance',
        name: 'Route Length',
        description: 'Total distance traveled on your journey (in kilometers or miles).'
      },
      {
        symbol: 'Vehicle Mileage',
        name: 'Fuel Economy',
        description: 'Average distance your vehicle travels per unit of fuel (in km/L or MPG).'
      },
      {
        symbol: 'Fuel Price',
        name: 'Unit Fuel Cost',
        description: 'Current retail price of gasoline/diesel per liter or per gallon.'
      },
      {
        symbol: 'Fuel Required',
        name: 'Volume Consumed',
        description: 'Total liters or gallons of fuel needed to complete the trip.'
      },
      {
        symbol: 'Cost per Unit',
        name: 'Unit Operating Cost',
        description: 'Direct fuel expense incurred for each individual kilometer or mile driven.'
      }
    ]
  },

  conversionTable: {
    title: 'Estimated Trip Fuel Costs for Standard Distances',
    description: 'Calculations based on an average car (15 km/L or 35.3 MPG) at $1.50 per liter ($5.68/gal):',
    headers: ['Trip Scenario', 'Distance (km / miles)', 'Fuel Required', 'Estimated Total Cost', 'Cost per km / mile'],
    rows: [
      ['Daily Work Commute', '25 km (15.5 mi)', '1.67 Liters (0.44 gal)', '$2.50', '$0.10 / km ($0.16 / mi)'],
      ['City Day Trip', '100 km (62.1 mi)', '6.67 Liters (1.76 gal)', '$10.00', '$0.10 / km ($0.16 / mi)'],
      ['Regional Weekend Getaway', '350 km (217.5 mi)', '23.33 Liters (6.16 gal)', '$35.00', '$0.10 / km ($0.16 / mi)'],
      ['Interstate Road Trip', '750 km (466.0 mi)', '50.00 Liters (13.21 gal)', '$75.00', '$0.10 / km ($0.16 / mi)'],
      ['Long-Haul Cross-Country', '1,500 km (932.1 mi)', '100.00 Liters (26.42 gal)', '$150.00', '$0.10 / km ($0.16 / mi)']
    ]
  },

  example: {
    title: 'Example: Planning a 350 km Weekend Road Trip',
    description: 'Suppose you are planning a 350 km road trip in a car that averages 15 km/L, with petrol priced at $1.50 per liter.',
    inputs: [
      { label: 'Trip Distance', value: '350 km' },
      { label: 'Vehicle Mileage', value: '15 km/L' },
      { label: 'Fuel Price', value: '$1.50 / Liter' }
    ],
    steps: [
      'Step 1: Calculate total fuel required: 350 km ÷ 15 km/L = 23.33 Liters.',
      'Step 2: Calculate total trip cost: 23.33 Liters × $1.50/L = $35.00.',
      'Step 3: Calculate unit cost per distance: $35.00 ÷ 350 km = $0.10 per kilometer.'
    ],
    calculation: 'Fuel = 350 ÷ 15 = 23.33 L → Total Cost = 23.33 × $1.50 = $35.00',
    result: 'Total Cost: $35.00 | Fuel Required: 23.3 Liters | Cost / km: $0.10 / km'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The calculated cost reflects pure fuel expenditure. For a complete driving budget, you may also want to budget for toll roads and parking fees.',
      'To split gas fairly on a group road trip or carpool, simply divide the Total Estimated Trip Cost by the number of traveling passengers (e.g. $35.00 ÷ 4 travelers = $8.75 per person).'
    ]
  },

  faqs: [
    {
      question: 'What is the formula to calculate fuel trip cost?',
      answer: 'Trip Cost = (Distance ÷ Fuel Mileage) × Fuel Price per unit. For example, driving 300 miles at 30 MPG with gas at $3.50/gal equals (300 ÷ 30) × $3.50 = $35.00.'
    },
    {
      question: 'Can I use this calculator for both kilometers and miles?',
      answer: 'Yes. As long as your distance and vehicle efficiency share the same base (kilometers with km/L and price/liter, or miles with MPG and price/gallon), the mathematical output is 100% accurate.'
    },
    {
      question: 'How can I calculate fuel cost per person for carpooling?',
      answer: 'Take the Total Estimated Trip Cost produced by the calculator and divide it by the total number of passengers in the vehicle.'
    },
    {
      question: 'Why is highway fuel efficiency usually higher than city driving?',
      answer: 'Highway driving involves maintaining a steady cruising speed in high gear, whereas city driving requires constant braking, idling at traffic lights, and accelerating in lower gears, which consumes significantly more fuel.'
    },
    {
      question: 'How do driving habits affect real-world fuel economy?',
      answer: 'Aggressive acceleration, speeding over 65 mph (105 km/h), under-inflated tires, heavy rooftop cargo, and excessive air conditioning can reduce fuel efficiency by 15% to 30%.'
    }
  ],

  notes: {
    title: 'Important Notes & Driving Considerations',
    items: [
      'Unit Consistency: Ensure distance, mileage, and fuel price match your chosen measurement system (Metric vs. Imperial).',
      'Multi-Currency Persistence: Selecting USD ($), INR (₹), EUR (€), or GBP (£) updates all currency symbols instantly and saves your preference.',
      'Driving Conditions: Real-world fuel economy varies depending on terrain, traffic congestion, vehicle payload, and climate control usage.'
    ]
  }
};
