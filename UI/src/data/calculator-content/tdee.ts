import type { CalculatorContent } from './types';

export const tdeeContent: CalculatorContent = {
  id: 'tdee',

  intro: {
    title: 'What is a TDEE (Total Daily Energy Expenditure) Calculator?',
    paragraphs: [
      'A Total Daily Energy Expenditure (TDEE) Calculator is an essential energy balance and nutritional planning tool that estimates the total number of calories your body burns in a 24-hour period by combining your basal resting metabolism with your daily physical activity level.',
      'Knowing your exact TDEE eliminates the guesswork from dieting. Whether your goal is to maintain current body weight, achieve steady and sustainable fat loss through a structured calorie deficit, or build lean muscular mass with a controlled caloric surplus, your TDEE represents the definitive baseline from which all calorie and macronutrient targets are built.'
    ]
  },

  howToUse: {
    title: 'How to Use the TDEE Calculator',
    description: 'Calculate your maintenance, fat loss, and muscle gain calorie targets in four simple steps:',
    steps: [
      'Enter your chronological age in the "Age" input box (e.g. 25).',
      'Enter your standing height in centimeters in the "Height (cm)" box (e.g. 175 cm).',
      'Enter your current body weight in kilograms in the "Weight (kg)" box (e.g. 70 kg).',
      'Select your "Daily Activity Level" from the dropdown (Sedentary, Lightly Active, Moderately Active, Very Active, or Athlete / Physical Labor).',
      'Review your Maintenance Calories (TDEE), Weight Loss Target (-500 kcal/day), and Muscle Gain Target (+300 kcal/day) in the summary card.'
    ]
  },

  howItWorks: {
    title: 'How Total Daily Energy Expenditure Works',
    paragraphs: [
      'Your daily caloric expenditure comprises four key physiological components: Basal Metabolic Rate (BMR, ~60–70%), Non-Exercise Activity Thermogenesis (NEAT, ~15%), Exercise Activity Thermogenesis (EAT, ~5–10%), and the Thermic Effect of Food (TEF, ~10%).',
      'The calculator first establishes your baseline BMR using the clinical Mifflin-St Jeor formula, then multiplies it by a standardized Physical Activity Level (PAL) coefficient to calculate your total daily maintenance calories.'
    ],
    formula: 'TDEE = BMR × Activity Multiplier  |  Weight Loss = TDEE − 500  |  Muscle Gain = TDEE + 300',
    formulaExplanation: 'Where BMR is calculated from weight, height, and age, and the activity multiplier ranges from 1.2 (sedentary) to 1.9 (athlete).',
    variables: [
      {
        symbol: 'BMR (Base)',
        name: 'Basal Metabolic Rate',
        description: 'Resting caloric energy burned at complete rest to power internal organs and vital systems.'
      },
      {
        symbol: 'Activity Multiplier',
        name: 'Physical Activity Level (PAL)',
        description: 'Standardized multiplier reflecting daily occupational movement, steps, and exercise frequency.'
      },
      {
        symbol: 'TDEE',
        name: 'Maintenance Calories',
        description: 'The exact daily calorie intake required to maintain your current body weight.'
      },
      {
        symbol: 'Weight Loss (-500)',
        name: 'Fat Loss Deficit',
        description: 'Daily target producing a 3,500 kcal weekly deficit (approx. 0.5 kg or 1 lb fat loss per week).'
      },
      {
        symbol: 'Muscle Gain (+300)',
        name: 'Hypertrophy Surplus',
        description: 'Controlled caloric surplus providing extra energy for muscle protein synthesis with minimal fat gain.'
      }
    ]
  },

  conversionTable: {
    title: 'TDEE by Activity Level (25 yrs, 175 cm, 70 kg Male Profile)',
    description: 'Demonstrating how daily movement and exercise increase daily calorie requirements:',
    headers: ['Activity Level', 'PAL Multiplier', 'Maintenance (TDEE)', 'Weight Loss (-500 kcal)', 'Muscle Gain (+300 kcal)'],
    rows: [
      ['Sedentary (Desk Job, little to no exercise)', '1.200', '2,009 kcal/day', '1,509 kcal/day', '2,309 kcal/day'],
      ['Lightly Active (Exercise 1–3 days/week)', '1.375', '2,301 kcal/day', '1,801 kcal/day', '2,601 kcal/day'],
      ['Moderately Active (Exercise 3–5 days/week)', '1.550', '2,594 kcal/day', '2,094 kcal/day', '2,894 kcal/day'],
      ['Very Active (Hard training 6–7 days/week)', '1.725', '2,887 kcal/day', '2,387 kcal/day', '3,187 kcal/day'],
      ['Athlete / Demanding Physical Labor', '1.900', '3,180 kcal/day', '2,680 kcal/day', '3,480 kcal/day']
    ]
  },

  example: {
    title: 'Example: 25-Year-Old Male with Sedentary Desk Job',
    description: 'Calculating maintenance and target calories for a 25-year-old male (175 cm, 70 kg) working an office desk job with minimal exercise.',
    inputs: [
      { label: 'Age', value: '25 Years' },
      { label: 'Height', value: '175 cm' },
      { label: 'Weight', value: '70 kg' },
      { label: 'Daily Activity', value: 'Sedentary (Multiplier: 1.20)' }
    ],
    steps: [
      'Step 1: Calculate BMR: (10 × 70) + (6.25 × 175) − (5 × 25) + 5 = 700 + 1,093.75 − 125 + 5 = 1,673.75 kcal.',
      'Step 2: Multiply by Sedentary activity factor (1.20): 1,673.75 × 1.20 = 2,008.5 kcal (rounded to 2,009 kcal).',
      'Step 3: Calculate Weight Loss target: 2,009 − 500 = 1,509 kcal/day.',
      'Step 4: Calculate Muscle Gain target: 2,009 + 300 = 2,309 kcal/day.'
    ],
    calculation: 'TDEE = 1,673.75 × 1.20 = 2,009 kcal/day | Loss = 1,509 kcal | Gain = 2,309 kcal',
    result: 'Maintenance (TDEE): 2,009 kcal/day | Weight Loss: 1,509 kcal | Muscle Gain: 2,309 kcal'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Eating at your TDEE maintains your current body weight. Eating 500 calories below your TDEE creates a 3,500-calorie weekly deficit, which safely produces approximately 0.5 kg (1 lb) of fat loss per week.',
      'A lean surplus of 300 calories above your TDEE provides the additional fuel required for muscle hypertrophy during resistance training while minimizing excess fat gain.'
    ]
  },

  faqs: [
    {
      question: 'What is Total Daily Energy Expenditure (TDEE)?',
      answer: 'TDEE is the total number of calories you burn each day across all activities, including basic organ function (BMR), general daily movement (NEAT), workouts (EAT), and food digestion (TEF).'
    },
    {
      question: 'Which activity level should I select?',
      answer: 'If you have an office desk job and do not work out, select Sedentary. If you work at a desk but exercise 3 to 4 days a week, select Moderately Active. If you work on your feet all day (such as a nurse or construction worker), select Very Active.'
    },
    {
      question: 'How large of a calorie deficit is recommended for fat loss?',
      answer: 'A moderate deficit of 300 to 500 kcal per day below your TDEE is standard. This creates steady, sustainable fat loss (0.5 to 1 lb per week) without triggering severe hunger, lethargy, or muscle loss.'
    },
    {
      question: 'Why do my maintenance calories change as I lose or gain weight?',
      answer: 'A smaller body mass requires less energy to move and sustain itself. As you lose weight, your BMR and TDEE naturally decrease, meaning you must periodically recalculate your targets.'
    },
    {
      question: 'How should I track my progress against this calculation?',
      answer: 'Use your calculated TDEE as a baseline for 2 to 3 weeks while weighing yourself daily and tracking weekly averages. If your weight is stable, your calculated TDEE is accurate; if you lose or gain weight unexpectedly, adjust your daily intake by 100 to 150 kcal.'
    }
  ],

  notes: {
    title: 'Important Notes & Nutritional Guidelines',
    items: [
      'Standardized PAL Multipliers: Uses clinical physical activity level standards ranging from 1.20 to 1.90.',
      'Dynamic Goal Targets: Generates maintenance, fat loss (-500 kcal), and muscle hypertrophy (+300 kcal) targets instantly.',
      'Baseline Indicator: Use these numbers as a scientific starting point and adjust intake by ±100 kcal based on real-world scale trends over 2–3 weeks.'
    ]
  }
};
