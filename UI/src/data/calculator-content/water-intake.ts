import type { CalculatorContent } from './types';

export const waterIntakeContent: CalculatorContent = {
  id: 'water-intake',

  intro: {
    title: 'What is a Daily Water Intake Hydration Calculator?',
    paragraphs: [
      'A Daily Water Intake Hydration Calculator is a health and wellness tool that calculates personalized daily fluid requirements based on body weight, daily exercise duration, and environmental climate conditions.',
      'Water makes up approximately 60% of adult body mass and is essential for cellular nutrient delivery, joint lubrication, cardiovascular blood volume, cognitive alertness, and body temperature regulation. Rather than relying on one-size-fits-all rules, this calculator tailors your hydration target in Liters, standard 8 oz (250 ml) glasses, and fluid ounces.'
    ]
  },

  howToUse: {
    title: 'How to Use the Water Intake Calculator',
    description: 'Determine your optimal daily hydration target in four simple steps:',
    steps: [
      'Enter your body weight in kilograms in the "Body Weight (kg)" box (e.g. 70 kg).',
      'Enter your average physical activity in "Daily Exercise Duration (Minutes)" (e.g. 30 min).',
      'Select your local environmental weather in the "Climate Type" dropdown (Normal / Moderate, Hot / Humid +0.5 L, or Cold / Indoor AC −0.2 L).',
      'Review your Daily Recommended Water in Liters/day, standard 8 oz Glasses (250ml) count, and Fluid Ounces (fl oz).'
    ]
  },

  howItWorks: {
    title: 'How Daily Water Requirements Work',
    paragraphs: [
      'Clinical sports physiology establishes a baseline water requirement of 35 milliliters per kilogram of body weight for healthy sedentary adults.',
      'Physical activity increases sweat loss and respiratory water vapor, requiring approximately 350 mL of additional water for every 30 minutes of exercise. Tropical or humid climates further increase sweat rate, adding 500 mL to daily requirements.'
    ],
    formula: 'Daily Liters = (Weight × 0.035) + [(Exercise ÷ 30) × 0.35] + Climate Offset',
    formulaExplanation: 'Where Weight is in kg, Exercise is in minutes, and Climate Offset is +0.5 L (hot/humid), 0 L (moderate), or −0.2 L (cold/AC).',
    variables: [
      {
        symbol: 'Weight (kg)',
        name: 'Body Mass',
        description: 'Current body weight in kilograms (baseline rate: 35 mL of water per kg).'
      },
      {
        symbol: 'Exercise (min)',
        name: 'Daily Activity',
        description: 'Minutes spent in active workout, sports, or heavy physical exertion (adds 350 mL per 30 min).'
      },
      {
        symbol: 'Climate Offset',
        name: 'Environmental Factor',
        description: 'Adjustment for ambient humidity and temperature (+0.5 L hot, 0 L normal, −0.2 L cold/AC).'
      },
      {
        symbol: 'Liters / Day',
        name: 'Total Volume',
        description: 'Total daily fluid intake required to maintain peak physiological hydration.'
      },
      {
        symbol: 'Glasses (250 ml)',
        name: 'Standard Cups',
        description: 'Equivalent count of standard 8-fluid-ounce (250 mL) drinking glasses.'
      }
    ]
  },

  conversionTable: {
    title: 'Hydration Benchmarks (30 Min Exercise, Moderate Climate)',
    description: 'Daily water targets across various body weight categories:',
    headers: ['Body Weight', 'Daily Liters Target', '8 oz Glasses (250 ml)', 'Fluid Ounces (fl oz)'],
    rows: [
      ['50 kg (110 lbs)', '2.10 Liters/day', '8 Glasses', '71 fl oz'],
      ['60 kg (132 lbs)', '2.45 Liters/day', '10 Glasses', '83 fl oz'],
      ['70 kg (154 lbs)', '2.80 Liters/day', '11 Glasses', '95 fl oz (Default)'],
      ['80 kg (176 lbs)', '3.15 Liters/day', '13 Glasses', '107 fl oz'],
      ['90 kg (198 lbs)', '3.50 Liters/day', '14 Glasses', '118 fl oz'],
      ['100 kg (220 lbs)', '3.85 Liters/day', '15 Glasses', '130 fl oz']
    ]
  },

  example: {
    title: 'Example: 70 kg Adult with 30 Minutes of Daily Exercise',
    description: 'Calculating optimal water intake for a 70 kg person performing a 30-minute workout in moderate climate conditions.',
    inputs: [
      { label: 'Body Weight', value: '70 kg' },
      { label: 'Daily Exercise', value: '30 Minutes' },
      { label: 'Climate', value: 'Normal / Moderate (0 L)' }
    ],
    steps: [
      'Step 1: Calculate baseline metabolic water: 70 kg × 0.035 L/kg = 2.45 Liters.',
      'Step 2: Calculate exercise sweat supplement: (30 min ÷ 30) × 0.35 L = 0.35 Liters.',
      'Step 3: Combine with climate offset: 2.45 + 0.35 + 0.00 = 2.80 Liters/day.',
      'Step 4: Convert to 250ml glasses: 2.80 × 1000 ÷ 250 = 11.2 (rounded to 11 Glasses).',
      'Step 5: Convert to fluid ounces: 2.80 × 33.814 = 94.68 (rounded to 95 fl oz).'
    ],
    calculation: 'Water = (70 × 0.035) + 0.35 = 2.80 Liters/day (11 Glasses / 95 fl oz)',
    result: 'Daily Water: 2.80 Liters / day | 11 Glasses (250ml) | 95 fl oz'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Food provides roughly 20% of your daily water intake through moisture in fruits, vegetables, and cooked meals. The calculated number represents your total target across water, beverages, and hydrating foods.',
      'A simple visual indicator of proper hydration is urine color: it should ideally be pale straw or light transparent yellow. Dark amber urine indicates you need to drink more water immediately.'
    ]
  },

  faqs: [
    {
      question: 'Is the "8 glasses of water a day" rule accurate?',
      answer: 'The traditional "8x8" rule (eight 8-ounce glasses, or ~2 Liters) is an oversimplified guideline. A 100 kg athlete requires significantly more fluid than a 50 kg sedentary individual, making weight- and activity-based calculation far more accurate.'
    },
    {
      question: 'Do coffee, tea, and other beverages count toward my daily water target?',
      answer: 'Yes. Moderate consumption of coffee, tea, fruit juices, and milk contributes to daily fluid hydration. However, plain water remains the healthiest choice as it contains no added sugars or calories.'
    },
    {
      question: 'How should I time my water intake around workouts?',
      answer: 'Drink about 500 mL (16 oz) of water 2 hours before exercise, 200–250 mL every 20 minutes during workouts, and rehydrate thoroughly post-workout.'
    },
    {
      question: 'What are the early signs of mild dehydration?',
      answer: 'Early symptoms include dry mouth, dark yellow urine, afternoon fatigue, headaches, decreased workout stamina, and lightheadedness.'
    },
    {
      question: 'Can you drink too much water (hyponatremia)?',
      answer: 'Yes, though rare, drinking extreme quantities of plain water in a short time without electrolytes can dilute sodium levels in the bloodstream, causing a condition called hyponatremia. Space your water intake evenly throughout the day.'
    }
  ],

  notes: {
    title: 'Important Notes & Hydration Guidelines',
    items: [
      'Physiological Formula: Incorporates clinical baseline fluid guidelines (35 mL/kg) plus sweat replacement factors.',
      'Multi-Unit Readouts: Displays volume in Liters, standard 8 oz (250 ml) cups, and US fluid ounces.',
      'Individual Variability: Fluid needs increase during illness, fever, high-altitude travel, pregnancy, and breastfeeding.'
    ]
  }
};
