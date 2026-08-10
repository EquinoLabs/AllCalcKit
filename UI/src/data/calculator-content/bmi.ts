import type { CalculatorContent } from './types';

export const bmiContent: CalculatorContent = {
  id: 'bmi',

  intro: {
    title: 'What is a BMI Calculator?',
    paragraphs: [
      'A Body Mass Index (BMI) Calculator is an internationally recognized clinical screening tool developed by the World Health Organization (WHO) that evaluates whether an individual has a healthy body weight relative to their height.',
      'By dividing body mass by the square of body height, BMI categorizes individuals into standardized health classifications: Underweight, Normal Weight, Overweight, and Obese. The calculator supports both Metric (cm / kg) and Imperial (feet, inches / lbs) units with an interactive colored health bar gauge that tracks your body mass status in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the BMI Calculator',
    description: 'Calculate your Body Mass Index in four simple steps:',
    steps: [
      'Choose your preferred unit system by toggling between "Metric (cm/kg)" and "Imperial (ft/lbs)".',
      'Enter your height:',
      '• In Metric mode: Enter your height in centimeters (e.g. 175 cm).',
      '• In Imperial mode: Enter your height in feet and inches (e.g. 5 ft 9 in).',
      'Enter your weight:',
      '• In Metric mode: Enter your weight in kilograms (e.g. 70 kg).',
      '• In Imperial mode: Enter your weight in pounds (e.g. 154 lbs).',
      'Review your numeric BMI score, WHO category badge (Normal Weight, Overweight, etc.), visual gauge indicator, and personalized health guidance.'
    ]
  },

  howItWorks: {
    title: 'How Body Mass Index (BMI) Works',
    paragraphs: [
      'The BMI formula assesses mass proportional to surface area rather than volume, creating a standardized index of body fatness across different heights.',
      'In Metric units, weight in kilograms is divided by height in meters squared. In Imperial units, weight in pounds is divided by height in inches squared and multiplied by the conversion factor 703.'
    ],
    formula: 'Metric: BMI = kg ÷ (m)²  |  Imperial: BMI = (lbs ÷ in²) × 703',
    formulaExplanation: 'Where kg is mass in kilograms, m is height in meters (cm ÷ 100), lbs is weight in pounds, and in is total height in inches ((ft × 12) + in).',
    variables: [
      {
        symbol: 'Height (cm / ft+in)',
        name: 'Stature',
        description: 'Standing height measured barefoot from heel to vertex.'
      },
      {
        symbol: 'Weight (kg / lbs)',
        name: 'Total Body Mass',
        description: 'Total body weight measured on a calibrated scale.'
      },
      {
        symbol: '703',
        name: 'Imperial Constant',
        description: 'Conversion constant (0.453592 kg/lb ÷ (0.0254 m/in)²) to harmonize imperial and metric formulas.'
      },
      {
        symbol: 'BMI Score',
        name: 'Body Mass Index',
        description: 'Dimensionless ratio expressing body weight relative to squared height.'
      },
      {
        symbol: 'Classification',
        name: 'WHO Health Tier',
        description: 'Medical weight category (Underweight < 18.5, Normal 18.5–24.9, Overweight 25–29.9, Obese ≥ 30).'
      }
    ]
  },

  conversionTable: {
    title: 'World Health Organization (WHO) BMI Classifications',
    description: 'International clinical adult BMI cutoff ranges and associated health risk levels:',
    headers: ['BMI Range (kg/m²)', 'Weight Classification', 'Color Indicator', 'Associated Health Risk'],
    rows: [
      ['< 16.0', 'Severe Underweight', 'Blue', 'High risk of nutritional deficiency and weakened immunity'],
      ['16.0 – 16.9', 'Moderate Underweight', 'Blue', 'Moderate risk of energy deficiency'],
      ['17.0 – 18.4', 'Mild Underweight', 'Blue', 'Slightly below optimal body mass parameters'],
      ['18.5 – 24.9', 'Normal Weight', 'Emerald', 'Lowest statistical risk of cardiovascular and metabolic illness'],
      ['25.0 – 29.9', 'Overweight (Pre-obesity)', 'Amber', 'Moderate increase in cardiovascular and blood pressure risks'],
      ['30.0 – 34.9', 'Obese (Class I)', 'Rose', 'Elevated risk of type 2 diabetes and hypertension'],
      ['35.0 – 39.9', 'Obese (Class II)', 'Rose', 'High risk of chronic metabolic and joint complications'],
      ['≥ 40.0', 'Obese (Class III / Severe)', 'Rose', 'Very high risk; clinical medical intervention advised']
    ]
  },

  example: {
    title: 'Example: Calculating BMI for 175 cm Height and 70 kg Weight',
    description: 'Suppose an adult measures 175 cm in height and weighs 70 kg (equivalent to 5 ft 9 in and 154 lbs).',
    inputs: [
      { label: 'Height', value: '175 cm (1.75 m) / 5 ft 9 in' },
      { label: 'Weight', value: '70 kg (154 lbs)' }
    ],
    steps: [
      'Step 1 (Metric): Convert height to meters: 175 cm ÷ 100 = 1.75 m.',
      'Step 2 (Metric): Square the height in meters: 1.75 × 1.75 = 3.0625 m².',
      'Step 3 (Metric): Divide body weight by squared height: 70 kg ÷ 3.0625 m² = 22.857 (rounded to 22.9).',
      'Step 4 (Imperial verification): Height in inches = (5 × 12) + 9 = 69 in. BMI = (154 ÷ 69²) × 703 = 22.7.',
      'Step 5: Match against WHO guidelines: 22.9 falls within the 18.5 to 24.9 Normal Weight category.'
    ],
    calculation: 'BMI = 70 ÷ (1.75)² = 22.86 → 22.9 kg/m²',
    result: 'BMI Score: 22.9 | Category: Normal Weight (Healthy Range)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'A BMI between 18.5 and 24.9 is considered the optimal statistical window for longevity and minimal chronic disease risk.',
      'Limitations: BMI does not distinguish between lean muscle mass and adipose fat tissue. Muscular athletes, bodybuilders, and pregnant women may score in the "Overweight" or "Obese" tiers despite having low body fat, while older adults with low muscle mass may register a "Normal" score despite excess visceral fat.'
    ]
  },

  faqs: [
    {
      question: 'What is Body Mass Index (BMI)?',
      answer: 'BMI is a simple mathematical index of weight-for-height used universally by healthcare providers and the World Health Organization to classify body mass in adult populations.'
    },
    {
      question: 'What is considered a healthy BMI score?',
      answer: 'For adults aged 20 and older, a BMI between 18.5 and 24.9 is classified as Normal Weight, associated with lowest risk of chronic cardiovascular and metabolic diseases.'
    },
    {
      question: 'Why might BMI be inaccurate for athletes and bodybuilders?',
      answer: 'BMI measures total weight without differentiating between dense muscle tissue and body fat. Athletes with high muscle mass often register as "overweight" or "obese" despite having exceptional cardiovascular fitness and low body fat.'
    },
    {
      question: 'Is the BMI formula the same for men and women?',
      answer: 'Yes, the mathematical formula is identical for all adult men and women. However, women naturally carry a slightly higher percentage of essential body fat than men at the same BMI.'
    },
    {
      question: 'How does the Imperial 703 constant work?',
      answer: 'The factor 703 converts pounds to kilograms (0.453592) and square inches to square meters (0.0254²). Dividing 0.453592 by 0.00064516 yields 703.07, ensuring identical mathematical results across imperial and metric systems.'
    }
  ],

  notes: {
    title: 'Important Notes & Clinical Considerations',
    items: [
      'WHO Population Guidelines: Follows standardized international World Health Organization adult classification cutoff standards.',
      'Screening Tool Only: BMI is an epidemiological screening indicator, not a definitive medical diagnosis. Consult healthcare professionals for personalized body composition assessments.',
      'Unit Flexibility: Seamless toggle between Metric (cm/kg) and Imperial (ft/lbs) formats.'
    ]
  }
};
