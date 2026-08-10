import type { CalculatorContent } from './types';

export const dataContent: CalculatorContent = {
  id: 'data',

  intro: {
    title: 'What is a Data Storage Converter?',
    paragraphs: [
      'A data storage converter is a digital capacity calculation tool that converts file sizes, memory quantities, and disk capacities between computing storage units: Bytes (B), Kilobytes (KB), Megabytes (MB), Gigabytes (GB), Terabytes (TB), and Petabytes (PB).',
      'Whether you are checking if a video file fits on a USB flash drive, configuring cloud storage plans, evaluating computer RAM memory, or understanding why a 1 TB hard drive reports less usable space in Windows, converting data storage accurately is essential. All calculations update in real time using standard binary computing factors.'
    ]
  },

  howToUse: {
    title: 'How to Use the Data Storage Converter',
    description: 'Convert between digital file sizes and storage units in three simple steps:',
    steps: [
      'Select your starting storage unit from the "From Unit" dropdown (such as Megabytes).',
      'Select your desired target unit from the "To Target" dropdown (such as Gigabytes).',
      'Type any numeric storage amount into the starting input field.',
      'View your converted result immediately in the target display box, with the live formula preview below and a one-click "Copy Result" button.'
    ]
  },

  howItWorks: {
    title: 'How Data Storage Conversion Works',
    paragraphs: [
      'Computer systems operate on binary code (base 2). Because of this binary architecture, data storage units increase by powers of 2 rather than powers of 10. Specifically, each unit step is 2¹⁰ = 1,024 times larger than the preceding unit.',
      'The calculator uses the Byte (B) as its central reference baseline. Your starting quantity is multiplied by its defined byte factor to find the total bytes, and then divided by the target unit\'s byte factor to produce the converted output.'
    ],
    formula: 'Converted Data = Starting Value × (Source Unit Factor ÷ Target Unit Factor)',
    formulaExplanation: 'Where each unit factor represents the exact number of bytes (B) in 1 unit of that digital measurement (increments of 1,024).',
    variables: [
      {
        symbol: 'Starting Value',
        name: 'Input Storage',
        description: 'The numeric amount of digital data you want to convert.'
      },
      {
        symbol: 'Source Unit Factor',
        name: 'Starting Unit Ratio',
        description: 'The exact number of bytes equal to 1 unit of your starting measurement.'
      },
      {
        symbol: 'Target Unit Factor',
        name: 'Target Unit Ratio',
        description: 'The exact number of bytes equal to 1 unit of your desired target measurement.'
      },
      {
        symbol: 'Converted Data',
        name: 'Final Output',
        description: 'The resulting storage capacity expressed in your chosen target unit.'
      }
    ]
  },

  conversionTable: {
    title: 'Binary Data Storage Units & Scale Ratios',
    description: 'Standard binary relationships of digital storage units relative to 1 Byte (B):',
    headers: ['Unit Name', 'Symbol', 'Binary Power', 'Equivalent in Bytes (B)', 'Typical Real-World Scale'],
    rows: [
      ['Byte', 'B', '2⁰ B', '1 Byte', 'A single character of plain text (8 bits)'],
      ['Kilobyte', 'KB', '2¹⁰ B', '1,024 Bytes', 'A short email or small text document'],
      ['Megabyte', 'MB', '2²⁰ B', '1,048,576 Bytes', 'A high-res JPEG photo or 3-minute MP3 song'],
      ['Gigabyte', 'GB', '2³⁰ B', '1,073,741,824 Bytes', 'A full-length HD movie or smartphone app'],
      ['Terabyte', 'TB', '2⁴⁰ B', '1,099,511,627,776 Bytes', 'A typical PC solid-state drive (SSD)'],
      ['Petabyte', 'PB', '2⁵⁰ B', '1,125,899,906,842,624 Bytes', 'Enterprise data centers & AI training sets']
    ]
  },

  example: {
    title: 'Example: Converting Megabytes to Gigabytes (MB to GB)',
    description: 'Suppose you have a video file measuring 4,096 Megabytes (MB) and want to find its size in Gigabytes (GB).',
    inputs: [
      { label: 'Starting Size', value: '4,096 Megabytes (MB)' },
      { label: 'Target Unit', value: 'Gigabytes (GB)' }
    ],
    steps: [
      'Step 1: Identify the standard binary ratio: 1 Gigabyte (GB) = 1,024 Megabytes (MB).',
      'Step 2: Divide the starting megabytes by 1,024: 4,096 ÷ 1,024.',
      'Step 3: Compute the converted size: 4,096 ÷ 1,024 = 4 GB.'
    ],
    calculation: '4,096 MB ÷ 1,024 MB/GB = 4 GB',
    result: '4 Gigabytes (GB) (Exact whole capacity)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Data results are calculated using standard computing binary increments of 1,024 and displayed with up to 6 decimal places, with unnecessary trailing zeros removed for clean presentation.',
      'When purchasing computer hard drives, note that manufacturers often label drives in decimal units (1,000-based), whereas operating systems like Windows calculate storage in binary (1,024-based). This is why a 1 TB drive typically reports approximately 931 GB of usable space.'
    ]
  },

  faqs: [
    {
      question: 'Why is 1 KB equal to 1,024 Bytes instead of 1,000 Bytes?',
      answer: 'Computers operate in binary (base-2 numbers: 0 and 1). Because 2¹⁰ = 1,024 is the closest power of two to 1,000, computer architecture adopted 1,024 as the standard unit multiplier for memory and file storage.'
    },
    {
      question: 'Why does my 1 TB drive show only ~931 GB in Windows?',
      answer: 'Hardware manufacturers market storage using decimal base-10 (1 TB = 1,000,000,000,000 bytes). Operating systems measure storage in binary base-2 (1 GiB = 1,073,741,824 bytes). Dividing 1,000,000,000,000 by 1,073,741,824 yields ~931.32 GB.'
    },
    {
      question: 'What is the difference between bits (b) and Bytes (B)?',
      answer: 'One Byte (B) consists of 8 bits (b). Network speeds and internet bandwidth are typically advertised in bits per second (e.g., 100 Mbps), whereas file sizes and storage capacity are measured in Bytes (e.g., 100 MB).'
    },
    {
      question: 'How much data can 1 Gigabyte (GB) store?',
      answer: 'One Gigabyte (1 GB) can hold approximately 250–300 standard MP3 songs, 300–400 smartphone photos, or about 1 hour of standard definition video.'
    },
    {
      question: 'What is a Petabyte (PB)?',
      answer: 'One Petabyte equals 1,024 Terabytes (over 1 million Gigabytes or 1.125 quadrillion bytes). Petabytes are used to measure massive cloud data centers, streaming server libraries, and AI model datasets.'
    }
  ],

  notes: {
    title: 'Important Notes & Data Standards',
    items: [
      'Binary Computing Standard: Calculations use binary 1,024 multipliers (2¹⁰) for computing precision across all unit steps.',
      'Bits vs. Bytes: 1 Byte (B) = 8 bits (b). Storage capacity is always expressed in uppercase Bytes.',
      'Precision: Results are shown with up to 6 decimal places with clean zero trimming for maximum clarity.'
    ]
  }
};
