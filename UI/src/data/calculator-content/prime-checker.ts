import type { CalculatorContent } from './types';

export const primeCheckerContent: CalculatorContent = {
  id: 'prime-checker',

  intro: {
    title: 'What is a Prime Number Checker & Factorizer?',
    paragraphs: [
      'A Prime Number Checker is a number theory calculation tool that determines whether any given positive integer is a prime number or a composite number, while decomposing composite numbers into their complete prime factorization.',
      'A prime number is a natural integer greater than 1 that cannot be formed by multiplying two smaller natural numbers—meaning it has exactly two distinct positive divisors: 1 and itself. Prime numbers are the fundamental building blocks of arithmetic, essential to modern cybersecurity and cryptography (such as RSA public-key encryption), computer hashing algorithms, and mathematical problem-solving. All calculations execute instantly in real time.'
    ]
  },

  howToUse: {
    title: 'How to Use the Prime Number Checker',
    description: 'Test any integer for primality in three simple steps:',
    steps: [
      'Type any positive integer (from 1 up to 999,999,999) into the "Enter Any Integer" input box.',
      'Instantly check the Status Badge to see whether your number is Prime (green) or Composite (red).',
      'Review the Prime Factors breakdown to see the exact product decomposition, and see the Next Prime number in the sequence.'
    ]
  },

  howItWorks: {
    title: 'How Primality Testing & Factorization Works',
    paragraphs: [
      'To test whether a number N is prime, it is unnecessary to check all numbers up to N. If N is divisible by a number larger than its square root (√N), it must also be divisible by a smaller paired factor below √N.',
      'The calculator uses an optimized trial division algorithm with 6k ± 1 skipping. After verifying that N is greater than 1 and not divisible by 2 or 3, it tests potential divisors up to √N. If no divisor divides N evenly, N is confirmed prime. For composite numbers, prime factors are sequentially extracted to display the unique prime decomposition.'
    ],
    formula: 'N = p₁ᵃ¹ × p₂ᵃ² × ... × pₖᵃᵏ  (Testing potential factors d ≤ √N)',
    formulaExplanation: 'Where p₁, p₂, ... pₖ are prime factors and no composite divisor can exist without a factor less than or equal to √N.',
    variables: [
      {
        symbol: 'N',
        name: 'Input Integer',
        description: 'The positive whole number being tested for primality (N ≥ 1).'
      },
      {
        symbol: 'Prime Status',
        name: 'Primality Classification',
        description: 'Prime (exactly 2 divisors) or Composite (more than 2 divisors).'
      },
      {
        symbol: 'Prime Factors',
        name: 'Prime Decomposition',
        description: 'The unique set of prime numbers that multiply together to produce N.'
      },
      {
        symbol: 'Next Prime',
        name: 'Subsequent Prime',
        description: 'The smallest prime integer strictly greater than N.'
      }
    ]
  },

  conversionTable: {
    title: 'List of All 25 Prime Numbers Under 100',
    description: 'The complete sequence of prime numbers from 1 to 100 with key mathematical characteristics:',
    headers: ['Prime Number', 'Factors', 'Category / Note', 'Twin Prime Pair'],
    rows: [
      ['2', '1, 2', 'Smallest and only even prime number', 'N/A'],
      ['3', '1, 3', 'Smallest odd prime number', '(3, 5)'],
      ['5', '1, 5', 'Only prime ending in the digit 5', '(5, 7)'],
      ['7', '1, 7', 'Last single-digit prime number', '(5, 7)'],
      ['11', '1, 11', 'Smallest two-digit prime number', '(11, 13)'],
      ['13', '1, 13', 'Two-digit prime', '(11, 13)'],
      ['17', '1, 17', 'Two-digit prime', '(17, 19)'],
      ['19', '1, 19', 'Two-digit prime', '(17, 19)'],
      ['23', '1, 23', 'First prime in the 20s', 'N/A'],
      ['29', '1, 29', 'Two-digit prime', '(29, 31)'],
      ['31', '1, 31', 'Mersenne prime (2⁵ − 1)', '(29, 31)'],
      ['37', '1, 37', 'Two-digit prime', 'N/A'],
      ['41', '1, 41', 'Two-digit prime', '(41, 43)'],
      ['43', '1, 43', 'Two-digit prime', '(41, 43)'],
      ['47', '1, 47', 'Last prime under 50', 'N/A'],
      ['53, 59, 61, 67, 71, 73, 79, 83, 89, 97', '1, p', '10 remaining primes between 50 and 100', '(59, 61), (71, 73)']
    ]
  },

  example: {
    title: 'Example: Factoring Composite Number 84',
    description: 'Suppose you enter the number 84 to determine its primality and find its prime factorization.',
    inputs: [
      { label: 'Input Integer', value: '84' }
    ],
    steps: [
      'Step 1: Check primality: 84 is divisible by 2 (84 ÷ 2 = 42), so 84 is a composite number.',
      'Step 2: Extract factor 2: 42 ÷ 2 = 21.',
      'Step 3: Extract factor 3: 21 ÷ 3 = 7.',
      'Step 4: 7 is prime. The complete prime factorization is 2 × 2 × 3 × 7 (or 2² × 3 × 7).',
      'Step 5: Find the next prime strictly greater than 84: Next Prime = 89.'
    ],
    calculation: '84 = 2 × 2 × 3 × 7 (Composite)',
    result: 'Status: Composite | Prime Factors: 2 × 2 × 3 × 7 | Next Prime: 89'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'According to the Fundamental Theorem of Arithmetic, every integer greater than 1 is either a prime itself or can be represented as the unique product of prime numbers (disregarding order).',
      'If your number is prime, its only prime factor is itself. If your number is composite, the calculator displays every prime multiplier needed to reconstruct the original number.'
    ]
  },

  faqs: [
    {
      question: 'Why is 1 neither a prime nor a composite number?',
      answer: 'By mathematical definition, a prime number must have exactly two distinct positive divisors (1 and itself). Because 1 has only one positive divisor (1), it is classified as a unit, neither prime nor composite. This definition preserves the uniqueness of prime factorizations.'
    },
    {
      question: 'What is the only even prime number?',
      answer: 'The number 2 is the only even prime number. Every other even number is divisible by 2 and therefore composite.'
    },
    {
      question: 'Why are prime numbers critical to internet security and encryption?',
      answer: 'Modern cryptography (such as RSA encryption) relies on the fact that multiplying two huge prime numbers (hundreds of digits long) is instant for computers, but factoring the resulting massive composite number back into its prime components is practically impossible without the secret key.'
    },
    {
      question: 'How many prime numbers exist between 1 and 100?',
      answer: 'There are exactly 25 prime numbers between 1 and 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, and 97.'
    },
    {
      question: 'What are twin primes?',
      answer: 'Twin primes are pairs of prime numbers that differ by exactly 2 (such as 3 & 5, 5 & 7, 11 & 13, 17 & 19, and 41 & 43).'
    }
  ],

  notes: {
    title: 'Important Notes & Number Theory Standards',
    items: [
      'Domain: The checker evaluates positive whole numbers (integers ≥ 1) up to 999,999,999.',
      'Definition of 1: The number 1 is formally classified as a unit, neither prime nor composite.',
      'Performance: Uses an optimized O(√N) trial division algorithm for instant real-time computation.'
    ]
  }
};
