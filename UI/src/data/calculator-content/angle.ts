import type { CalculatorContent } from './types';

export const angleContent: CalculatorContent = {
  id: 'angle',

  intro: {
    title: 'What is an Angle Converter?',
    paragraphs: [
      'An angle converter is a geometric and trigonometric calculation tool that converts angular rotational values across standard mathematical and engineering units: Degrees (°), Radians (rad), Gradians (grad / gon), and Turns (full revolutions).',
      'Whether you are solving calculus problems where trigonometric functions require radians, programming 3D rotations and physics engines in game development, aligning mechanical gears and CAD drawings, or conducting land surveying, converting angles accurately is essential. All conversions calculate in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Angle Converter',
    description: 'Convert between any angular measurement units in three simple steps:',
    steps: [
      'Select your starting angle unit from the "From Unit" dropdown (such as Degrees, °).',
      'Select your desired target unit from the "To Target" dropdown (such as Radians, rad).',
      'Type any numeric angle value into the starting input field.',
      'View your converted result immediately in the target display box, with the live calculation formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Angle Conversion Works',
    paragraphs: [
      'Circular geometry defines a full rotation as 360 degrees, 2π radians (approx. 6.283185 rad), 400 gradians, or exactly 1 turn.',
      'The calculator uses the standard Degree (°) as its central reference baseline. Your starting angle is multiplied by its defined degree ratio to determine the base degrees, and then divided by the target unit\'s ratio to compute the exact converted output.'
    ],
    formula: 'Converted Angle = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of degrees (°) equal to 1 unit of that angular measurement.',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Angle',
        description: 'The numeric angular value you wish to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The angle in degrees (°) equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The angle in degrees (°) equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Angle',
        name: 'Final Output',
        description: 'The resulting angle expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Angular Benchmarks & Circle Divisions',
    description: 'Universal physical and geometric angle reference points across all supported units:',
    headers: ['Circle Division', 'Degrees (°)', 'Radians (rad)', 'Gradians (grad)', 'Turns (rev)'],
    rows: [
      ['Zero Angle', '0°', '0 rad', '0 grad', '0 turn'],
      ['Acute 30° Angle (π/6)', '30°', '0.523599 rad', '33.333333 grad', '0.083333 turn (1/12)'],
      ['Acute 45° Angle (π/4)', '45°', '0.785398 rad', '50 grad', '0.125 turn (1/8)'],
      ['Acute 60° Angle (π/3)', '60°', '1.047198 rad', '66.666667 grad', '0.166667 turn (1/6)'],
      ['Right Angle (Quarter Circle)', '90°', '1.570796 rad (π/2)', '100 grad', '0.25 turn (1/4)'],
      ['Straight Angle (Half Circle)', '180°', '3.141593 rad (π)', '200 grad', '0.5 turn (1/2)'],
      ['Three-Quarter Circle', '270°', '4.712389 rad (3π/2)', '300 grad', '0.75 turn (3/4)'],
      ['Full Rotation (Complete Circle)', '360°', '6.283185 rad (2π)', '400 grad', '1 turn (1.0)']
    ]
  },

  example: {
    title: 'Example: Converting a Right Angle (Degrees to Radians)',
    description: 'Suppose you have a 90-degree right angle (90°) and want to convert it to radians for a trigonometric formula.',
    inputs: [
      { label: 'Starting Angle', value: '90 Degrees (°)' },
      { label: 'Target Unit', value: 'Radians (rad)' }
    ],
    steps: [
      'Step 1: Identify the standard conversion factor: 1 radian = 180° ÷ π ≈ 57.295780° (or 1° = π ÷ 180 rad).',
      'Step 2: Multiply 90 by π/180: 90 × (3.14159265 ÷ 180).',
      'Step 3: Compute the converted angle: 90 ÷ 57.295780 ≈ 1.570796 rad (exact π/2).'
    ],
    calculation: '90° × (π ÷ 180°) = π/2 ≈ 1.570796 rad',
    result: '1.570796 Radians (rad) (Exact π/2)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Angle results are computed using full mathematical precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'In pure mathematics, angles are typically expressed in radians because derivatives of trigonometric functions like sin(x) and cos(x) require radian arguments to remain clean.'
    ]
  },

  faqs: [
    {
      question: 'Why are radians preferred in calculus and engineering?',
      answer: 'Radians connect arc length directly to radius (Arc Length = Radius × Radians). This natural geometric relationship eliminates conversion constants in calculus formulas such as d/dx[sin(x)] = cos(x).'
    },
    {
      question: 'How do I convert degrees to radians manually?',
      answer: 'Multiply the angle in degrees by π and divide by 180 (Radians = Degrees × π ÷ 180). For example, 180° × π ÷ 180 = π ≈ 3.141593 rad.'
    },
    {
      question: 'What is a gradian (grad or gon)?',
      answer: 'A gradian is a metric unit of angular measurement where a right angle is divided into 100 gradians and a full circle contains 400 gradians. It is commonly used in civil engineering and European land surveying.'
    },
    {
      question: 'How many degrees are in 1 radian?',
      answer: 'One radian is equal to 180° ÷ π, which is approximately 57.295780 degrees (or 57° 17\' 45").'
    },
    {
      question: 'What is a turn (or revolution)?',
      answer: 'A turn (also called a cycle or revolution) represents one complete 360-degree rotation of a circle (1 turn = 360° = 2π rad = 400 grad).'
    }
  ],

  notes: {
    title: 'Important Notes & Angular Standards',
    items: [
      'Geometric Equivalence: 1 full turn = 360° = 2π radians (approx. 6.283185 rad) = 400 gradians.',
      'Calculus Standard: Trigonometric functions in programming languages (JavaScript, Python, C++) evaluate angular inputs in radians by default.',
      'Precision: Decimal outputs are rounded to up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
