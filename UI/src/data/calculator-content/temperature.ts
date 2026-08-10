import type { CalculatorContent } from './types';

export const temperatureContent: CalculatorContent = {
  id: 'temperature',

  intro: {
    title: 'What is a Temperature Converter?',
    paragraphs: [
      'A temperature converter is an indispensable tool that translates temperature readings across different thermal measurement scales: Celsius (°C), Fahrenheit (°F), and Kelvin (K). Whether you are following an international cooking recipe, reading a global weather report, traveling abroad, checking a child\'s fever, or conducting a science experiment, converting temperatures accurately is essential.',
      'Unlike measurements of length or weight, temperature scales use different starting reference points (zero points) and different degree increments. This converter provides real-time conversions between Celsius, Fahrenheit, and Kelvin using exact standard thermal equations.'
    ]
  },

  howToUse: {
    title: 'How to Use the Temperature Converter',
    description: 'Convert any temperature value with real-time accuracy:',
    steps: [
      'Select your starting temperature scale from the "From Unit" dropdown (Celsius, Fahrenheit, or Kelvin).',
      'Select your desired target scale from the "To Target" dropdown.',
      'Type any temperature value (positive, negative, or zero) into the input box.',
      'View your converted result immediately in the target display box, with the conversion formula shown below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Temperature Conversion Works',
    paragraphs: [
      'Because temperature scales have different zero points and interval sizes, temperature conversions require mathematical formulas with fixed offsets rather than simple multiplication.',
      'For example, the freezing point of water is 0° on the Celsius scale, but 32° on the Fahrenheit scale and 273.15 on the Kelvin scale. A 1° change in Celsius is equal to a 1.8° change in Fahrenheit (a 9/5 ratio).'
    ],
    formula: '°F = (°C × 9/5) + 32  |  °C = (°F − 32) × 5/9  |  K = °C + 273.15',
    formulaExplanation: 'Where °C is Celsius, °F is Fahrenheit, and K is Kelvin (the SI base unit for thermodynamic temperature).',
    variables: [
      {
        symbol: '°C (Celsius)',
        name: 'Celsius Degree',
        description: 'Metric temperature scale calibrated to water freezing (0°C) and boiling (100°C) at standard atmospheric pressure.'
      },
      {
        symbol: '°F (Fahrenheit)',
        name: 'Fahrenheit Degree',
        description: 'Imperial temperature scale with water freezing at 32°F and boiling at 212°F.'
      },
      {
        symbol: 'K (Kelvin)',
        name: 'Kelvin',
        description: 'Absolute thermodynamic scale starting at absolute zero (0 K = −273.15°C).'
      }
    ]
  },

  conversionTable: {
    title: 'Key Temperature Benchmarks & Reference Values',
    description: 'Universal physical reference points across all three major temperature scales:',
    headers: ['Physical Benchmark', 'Celsius (°C)', 'Fahrenheit (°F)', 'Kelvin (K)', 'Significance'],
    rows: [
      ['Absolute Zero', '−273.15 °C', '−459.67 °F', '0 K', 'Theoretical lower limit of temperature'],
      ['Equal Point', '−40 °C', '−40 °F', '233.15 K', 'Exact scale intersection point'],
      ['Water Freezing Point', '0 °C', '32 °F', '273.15 K', 'Standard ice formation threshold'],
      ['Room Temperature', '20 °C', '68 °F', '293.15 K', 'Standard comfortable indoor climate'],
      ['Human Body Temperature', '37 °C', '98.6 °F', '310.15 K', 'Average healthy human core temperature'],
      ['Moderate Oven Baking', '180 °C', '350 °F', '453.15 K', 'Common baking temperature for cookies and cakes'],
      ['Hot Oven Roasting', '200 °C', '400 °F', '473.15 K', 'Standard roasting temperature for vegetables and meats'],
      ['Water Boiling Point', '100 °C', '212 °F', '373.15 K', 'Standard boiling point at 1 atmosphere sea level']
    ]
  },

  example: {
    title: 'Example: Converting Body Temperature (°C to °F)',
    description: 'Suppose a medical thermometer reads a normal human body temperature of 37°C, and you want to convert it to Fahrenheit (°F).',
    inputs: [
      { label: 'Starting Temperature', value: '37 °C (Celsius)' },
      { label: 'Target Scale', value: 'Fahrenheit (°F)' }
    ],
    steps: [
      'Step 1: Multiply the Celsius temperature by 9/5 (1.8): 37 × 1.8 = 66.6.',
      'Step 2: Add the Fahrenheit offset of 32: 66.6 + 32 = 98.6.',
      'Step 3: Converted result is 98.6°F.'
    ],
    calculation: '(37°C × 9/5) + 32 = 66.6 + 32 = 98.6°F',
    result: '98.6 °F (Normal body temperature)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Temperature results are calculated to full precision and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean reading.',
      'Because the relationship between Celsius and Fahrenheit is linear with different slopes, notice that negative temperatures converge until they become exactly equal at −40° (−40°C = −40°F).'
    ]
  },

  faqs: [
    {
      question: 'At what temperature are Celsius and Fahrenheit equal?',
      answer: 'Celsius and Fahrenheit are equal at −40 degrees (−40°C = −40°F). You can verify this using the formula: (−40 × 9/5) + 32 = −72 + 32 = −40.'
    },
    {
      question: 'Why doesn\'t Kelvin use a degree symbol (°)?',
      answer: 'Kelvin is an absolute thermodynamic temperature scale rather than a relative arbitrary scale. Its units are simply called "kelvins" (symbol: K), not "degrees Kelvin."'
    },
    {
      question: 'How can I quickly estimate Celsius to Fahrenheit in my head?',
      answer: 'For a quick mental estimate, double the Celsius temperature and add 30. For example, 20°C × 2 + 30 = 70°F (the exact answer is 68°F, which is close enough for casual weather estimates).'
    },
    {
      question: 'What is absolute zero?',
      answer: 'Absolute zero (0 K, −273.15°C, or −459.67°F) is the theoretical lowest possible temperature where fundamental particles have minimum thermal vibrational motion.'
    },
    {
      question: 'What are standard oven temperature equivalents in recipes?',
      answer: 'Standard conversions used in baking: 150°C ≈ 300°F, 180°C ≈ 350°F, 200°C ≈ 400°F, and 220°C ≈ 425°F.'
    }
  ],

  notes: {
    title: 'Important Notes & Temperature Standards',
    items: [
      'Scale Offsets: Temperature conversions involve fixed baseline shifts (+32, −32, +273.15), meaning a temperature of 0 does not convert to 0 on another scale.',
      'Absolute Zero Limit: Temperatures cannot drop below absolute zero (0 K, −273.15°C, −459.67°F) under standard physical laws.',
      'Precision: Decimal results are rounded to up to 6 decimal places with clean zero trimming for maximum readability.'
    ]
  }
};
