import type { CalculatorContent } from './types';

export const numberBaseContent: CalculatorContent = {
  id: 'number-base',

  intro: {
    title: 'What is a Number Base Converter?',
    paragraphs: [
      'A number base converter is a positional notation calculation tool that translates numbers across the four primary radix systems used in computer science, digital electronics, and software engineering: Decimal (Base 10), Binary (Base 2), Hexadecimal (Base 16), and Octal (Base 8).',
      'Whether you are debugging low-level firmware code, configuring Unix file permissions (such as chmod 755), inspecting network IP and MAC addresses, analyzing hex color codes, or studying computer architecture, converting between number bases accurately is essential. All four bases synchronize automatically in real time as you type.'
    ]
  },

  howToUse: {
    title: 'How to Use the Number Base Converter',
    description: 'Convert values between any of the four number base systems:',
    steps: [
      'Type a number into any of the four base input boxes: Decimal (0–9), Binary (0–1), Hexadecimal (0–9, A–F), or Octal (0–7).',
      'Watch all other three number base inputs update automatically in real time.',
      'Copy the converted notation directly from its corresponding text field.'
    ]
  },

  howItWorks: {
    title: 'How Number Base Conversion Works',
    paragraphs: [
      'Every number base is a positional system where the position of each digit represents an increasing power of the base (radix). In Decimal (Base 10), each position is a power of 10 (1, 10, 100, 1000). In Binary (Base 2), each position is a power of 2 (1, 2, 4, 8, 16). In Hexadecimal (Base 16), values from 10 to 15 are represented by letters A through F (A=10, B=11, C=12, D=13, E=14, F=15). In Octal (Base 8), digits range from 0 to 7.',
      'To convert from any base to Decimal, multiply each digit by the base raised to its position power and sum the results. To convert from Decimal to any target base, repeatedly divide the integer by the target base and collect the remainders in reverse order.'
    ],
    formula: 'Value₁₀ = (dₙ × Baseⁿ) + ... + (d₁ × Base¹) + (d₀ × Base⁰)',
    formulaExplanation: 'Where d represents each individual digit in the number, and Base is the radix of the positional system.',
    variables: [
      {
        symbol: 'Decimal (Base 10)',
        name: 'Standard Base',
        description: 'Everyday human counting system using digits 0 through 9.'
      },
      {
        symbol: 'Binary (Base 2)',
        name: 'Machine Code',
        description: 'Fundamental computer architecture system using bits 0 and 1.'
      },
      {
        symbol: 'Hexadecimal (Base 16)',
        name: 'Hex Notation',
        description: 'Compact byte representation using digits 0–9 and letters A–F (1 hex digit = 4 bits).'
      },
      {
        symbol: 'Octal (Base 8)',
        name: 'Octal Notation',
        description: 'Compact 3-bit representation using digits 0–7 (frequently used in Unix permissions).'
      }
    ]
  },

  conversionTable: {
    title: 'Standard Computing Benchmarks Across Number Bases',
    description: 'Reference values comparing Decimal, Binary, Hexadecimal, and Octal equivalents:',
    headers: ['Decimal (Base 10)', 'Binary (Base 2)', 'Hexadecimal (Base 16)', 'Octal (Base 8)', 'Significance in Computing'],
    rows: [
      ['0', '00000000', '00', '000', 'Null / Zero byte'],
      ['1', '00000001', '01', '001', 'Least Significant Bit (LSB) set'],
      ['7', '00000111', '07', '007', 'Maximum 3-bit binary value'],
      ['8', '00001000', '08', '010', 'Octal base rollover (2³)'],
      ['10', '00001010', '0A', '012', 'Decimal base rollover'],
      ['15', '00001111', '0F', '017', 'Maximum 4-bit nibble value'],
      ['16', '00010000', '10', '020', 'Hexadecimal base rollover (2⁴)'],
      ['64', '01000000', '40', '100', 'Power of 2 (2⁶)'],
      ['127', '01111111', '7F', '177', 'Maximum 7-bit signed ASCII character'],
      ['128', '10000000', '80', '200', '8-bit Most Significant Bit (MSB) set'],
      ['255', '11111111', 'FF', '377', 'Maximum 8-bit unsigned Byte (1 byte)'],
      ['1024', '10000000000', '400', '2000', '1 Kilobyte binary boundary (2¹⁰)']
    ]
  },

  example: {
    title: 'Example: Converting Decimal 255 across All Bases',
    description: 'Suppose you enter the decimal number 255 (the maximum value of an 8-bit byte) and want to find its binary, hexadecimal, and octal forms.',
    inputs: [
      { label: 'Starting Value', value: '255 (Decimal Base 10)' }
    ],
    steps: [
      'Step 1: Convert to Binary by decomposing into powers of 2 (128+64+32+16+8+4+2+1) → 11111111₂.',
      'Step 2: Convert to Hexadecimal by grouping binary into two 4-bit nibbles (1111₂ = F₁₆, 1111₂ = F₁₆) → FF₁₆.',
      'Step 3: Convert to Octal by grouping binary into 3-bit sets (011₂ = 3₈, 111₂ = 7₈, 111₂ = 7₈) → 377₈.'
    ],
    calculation: '255₁₀ = 11111111₂ = FF₁₆ = 377₈',
    result: 'Binary: 11111111 | Hex: FF | Octal: 377'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Hexadecimal is widely favored in programming because exactly two hex digits represent one 8-bit byte (each hex digit maps to exactly 4 binary bits).',
      'Octal represents 3 binary bits per digit. This makes octal the ideal notation for Unix file permissions (where 3 bits control read, write, and execute permissions for user, group, and others).'
    ]
  },

  faqs: [
    {
      question: 'What are the four primary number bases used in computing?',
      answer: 'Binary (base 2: digits 0, 1), Octal (base 8: digits 0–7), Decimal (base 10: digits 0–9), and Hexadecimal (base 16: digits 0–9 and letters A–F).'
    },
    {
      question: 'What do the letters A through F mean in Hexadecimal?',
      answer: 'Because base 16 needs single characters for values 10 through 15, letters are used: A = 10, B = 11, C = 12, D = 13, E = 14, and F = 15.'
    },
    {
      question: 'Why do programmers use Hexadecimal instead of Binary?',
      answer: 'Binary strings are long and difficult for humans to read (e.g. 1111111111110000). Hexadecimal condenses every 4 binary bits into a single character (e.g. FFF0), making memory addresses, color codes, and byte values compact and easy to inspect.'
    },
    {
      question: 'How do Unix file permissions relate to Octal numbers?',
      answer: 'Unix file permissions assign 3 bits to permissions: Read (4), Write (2), and Execute (1). Adding these gives an octal digit from 0 to 7. A command like "chmod 755" sets permissions 7 (rwx) for owner, 5 (r-x) for group, and 5 (r-x) for others.'
    },
    {
      question: 'How do I convert Binary to Hexadecimal quickly?',
      answer: 'Divide the binary number into groups of 4 bits from right to left (padding with leading zeros if needed). Convert each 4-bit group into its single hex digit (for example, 1101 1010 becomes DA in hex).'
    }
  ],

  notes: {
    title: 'Important Notes & Number Base Standards',
    items: [
      'Character Validation: Binary accepts only 0 and 1; Octal accepts 0–7; Decimal accepts 0–9; Hexadecimal accepts 0–9 and A–F.',
      'Instant Synchronization: Typing into any field automatically recomputes the other three fields in real time.',
      'Positional Precision: Numbers are treated as exact non-negative integers across all radix representations.'
    ]
  }
};
