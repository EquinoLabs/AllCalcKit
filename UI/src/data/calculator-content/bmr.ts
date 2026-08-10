import type { CalculatorContent } from './types';

export const bmrContent: CalculatorContent = {
  id: 'bmr',

  intro: {
    title: 'What is a BMR (Basal Metabolic Rate) Calculator?',
    paragraphs: [
      'A Basal Metabolic Rate (BMR) Calculator is a metabolic physiological tool that calculates the minimum number of calories (energy in kcal/day) your body requires to maintain vital, involuntary life-sustaining functions while at complete physical and digestive rest.',
      'Even when resting in bed all day, your body expends significant energy powering your heartbeat, respiration, brain function, cellular protein synthesis, and core body temperature regulation. BMR accounts for approximately 60% to 75% of your total daily energy expenditure and serves as the essential biological baseline for designing personalized diet, fat loss, muscle building, and sports nutrition plans.'
    ]
  },

  howToUse: {
    title: 'How to Use the BMR Calculator',
    description: 'Calculate your resting daily calorie requirement in four simple steps:',
    steps: [
      'Select your "Biological Sex" by clicking the "Male" or "Female" button.',
      'Enter your chronological age in the "Age (yrs)" input box (e.g. 28).',
      'Enter your standing height in the "Height (cm)" box (e.g. 175 cm).',
      'Enter your current body weight in the "Weight (kg)" box (e.g. 70 kg).',
      'Review your Basal Metabolic Rate in kilocalories per day (kcal/day) in the summary card.'
    ]
  },

  howItWorks: {
    title: 'How Basal Metabolic Rate Works',
    paragraphs: [
      'Our calculator uses the Mifflin-St Jeor Equation, recognized by the Academy of Nutrition and Dietetics as the most reliable and accurate formula for estimating resting metabolic rate in healthy individuals.',
      'The formula calculates resting energy expenditure based on body mass, stature, and age, with sex-specific constant adjustments reflecting physiological differences in lean muscle mass and body fat distribution.'
    ],
    formula: 'Men: (10 × W) + (6.25 × H) − (5 × A) + 5  |  Women: (10 × W) + (6.25 × H) − (5 × A) − 161',
    formulaExplanation: 'Where W is weight in kilograms, H is height in centimeters, and A is age in years.',
    variables: [
      {
        symbol: 'W (Weight)',
        name: 'Body Mass (kg)',
        description: 'Total weight in kilograms (accounts for 10 kcal per kg of body mass).'
      },
      {
        symbol: 'H (Height)',
        name: 'Stature (cm)',
        description: 'Standing height in centimeters (accounts for 6.25 kcal per cm of height).'
      },
      {
        symbol: 'A (Age)',
        name: 'Chronological Age',
        description: 'Age in years (metabolic rate naturally declines by approx. 5 kcal per year of age).'
      },
      {
        symbol: '+5 / −161',
        name: 'Sex Adjustment Factor',
        description: 'Physiological constant (+5 for males, −161 for females) accounting for baseline muscle-to-fat ratios.'
      },
      {
        symbol: 'BMR (kcal/day)',
        name: 'Basal Metabolic Rate',
        description: 'The net calories burned in 24 hours at complete physical rest.'
      }
    ]
  },

  conversionTable: {
    title: 'BMR Reference Benchmarks (Mifflin-St Jeor Standard)',
    description: 'Sample resting metabolic rates across common age, height, and weight profiles:',
    headers: ['Biological Sex', 'Age', 'Height', 'Weight', 'Estimated BMR (kcal/day)'],
    rows: [
      ['Male', '20 yrs', '175 cm (5\'9")', '70 kg (154 lbs)', '1,699 kcal/day'],
      ['Male', '28 yrs', '175 cm (5\'9")', '70 kg (154 lbs)', '1,659 kcal/day (Default)'],
      ['Male', '40 yrs', '175 cm (5\'9")', '80 kg (176 lbs)', '1,699 kcal/day'],
      ['Male', '55 yrs', '180 cm (5\'11")', '85 kg (187 lbs)', '1,705 kcal/day'],
      ['Female', '20 yrs', '165 cm (5\'5")', '55 kg (121 lbs)', '1,320 kcal/day'],
      ['Female', '28 yrs', '165 cm (5\'5")', '60 kg (132 lbs)', '1,330 kcal/day'],
      ['Female', '40 yrs', '165 cm (5\'5")', '65 kg (143 lbs)', '1,320 kcal/day'],
      ['Female', '55 yrs', '165 cm (5\'5")', '70 kg (154 lbs)', '1,295 kcal/day']
    ]
  },

  example: {
    title: 'Example: 28-Year-Old Male (175 cm, 70 kg)',
    description: 'Calculating the resting metabolic rate for a 28-year-old male measuring 175 cm tall and weighing 70 kg.',
    inputs: [
      { label: 'Biological Sex', value: 'Male' },
      { label: 'Age', value: '28 Years' },
      { label: 'Height', value: '175 cm' },
      { label: 'Weight', value: '70 kg' }
    ],
    steps: [
      'Step 1: Calculate weight contribution: 10 × 70 kg = 700 kcal.',
      'Step 2: Calculate height contribution: 6.25 × 175 cm = 1,093.75 kcal.',
      'Step 3: Calculate age reduction: 5 × 28 years = 140 kcal.',
      'Step 4: Add male constant (+5): 700 + 1,093.75 − 140 + 5 = 1,658.75 kcal.',
      'Step 5: Round to nearest whole integer: 1,659 kcal/day.'
    ],
    calculation: 'BMR = (10 × 70) + (6.25 × 175) − (5 × 28) + 5 = 1,659 kcal/day',
    result: 'Basal Metabolic Rate: 1,659 kcal/day'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Your BMR score represents the baseline calories required just to stay alive if you were to remain completely inactive in bed for 24 hours.',
      'To calculate your actual daily maintenance calories (TDEE), your BMR must be multiplied by an activity factor (e.g. 1.2 for sedentary desk work, 1.55 for moderate exercise, or 1.9 for intense athletic training).'
    ]
  },

  faqs: [
    {
      question: 'What is Basal Metabolic Rate (BMR)?',
      answer: 'BMR is the baseline number of calories your body burns in 24 hours to support involuntary biological functions like respiration, heartbeat, brain activity, and cellular repair while at total rest.'
    },
    {
      question: 'How does BMR differ from TDEE (Total Daily Energy Expenditure)?',
      answer: 'BMR is your baseline resting calorie burn with zero movement. TDEE includes your BMR plus the energy burned through daily steps, physical work, workouts, and the thermic effect of digesting food.'
    },
    {
      question: 'Why is the Mifflin-St Jeor formula widely used by nutritionists?',
      answer: 'Clinical validation studies have proven the Mifflin-St Jeor formula to be more accurate than older legacy equations (such as Harris-Benedict), predicting resting metabolic rates within ±10% of laboratory indirect calorimetry.'
    },
    {
      question: 'Can you increase your Basal Metabolic Rate?',
      answer: 'Yes. Engaging in strength training to build lean muscle mass elevates your resting metabolic rate because skeletal muscle is more metabolically active than fat tissue even when resting.'
    },
    {
      question: 'Is it safe to eat fewer calories than your BMR?',
      answer: 'Eating significantly below your BMR for extended periods is generally discouraged because it can trigger metabolic slowdown, muscle wasting, hormonal imbalances, and chronic fatigue. Always consult a certified dietitian.'
    }
  ],

  notes: {
    title: 'Important Notes & Metabolic Considerations',
    items: [
      'Mifflin-St Jeor Accuracy: Uses the gold-standard Mifflin-St Jeor equation recommended by dietetic associations worldwide.',
      'Involuntary Calorie Floor: Represents the biological floor of caloric requirement before factoring in daily movement or exercise.',
      'Fast Real-Time Computation: Calculates resting caloric needs dynamically upon any input adjustment.'
    ]
  }
};
