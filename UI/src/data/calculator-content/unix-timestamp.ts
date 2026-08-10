import type { CalculatorContent } from './types';

export const unixTimestampContent: CalculatorContent = {
  id: 'unix-timestamp',

  intro: {
    title: 'What is a Unix Timestamp Converter?',
    paragraphs: [
      'A Unix Timestamp Converter is a developer and system administration tool that translates Unix epoch timestamps into human-readable dates and converts calendar dates back into epoch integers.',
      'Unix time (also known as POSIX time or Epoch time) represents the total number of seconds that have elapsed since the Unix Epoch: January 1, 1970, at 00:00:00 UTC (excluding leap seconds). It is the standard method for recording creation timestamps in databases, JWT authentication tokens, server logs, webhooks, and REST APIs worldwide. The converter supports both 10-digit (seconds) and 13-digit (milliseconds) formats with bidirectional real-time synchronization.'
    ]
  },

  howToUse: {
    title: 'How to Use the Unix Timestamp Converter',
    description: 'Convert between timestamps and human calendar dates in either direction:',
    steps: [
      'To convert a timestamp, type any 10-digit (seconds) or 13-digit (milliseconds) epoch number into the timestamp box, or click "Use Current Now" to capture the live timestamp.',
      'To convert from a calendar date, choose any date and time using the "Date Time Input" picker.',
      'View your converted output formatted simultaneously in your browser\'s Local Date Time and standardized UTC Date String.'
    ]
  },

  howItWorks: {
    title: 'How Unix Timestamp Conversion Works',
    paragraphs: [
      'Because Unix time measures continuous seconds from a fixed global moment (Jan 1, 1970 00:00:00 UTC), it is completely timezone-agnostic and immune to daylight saving changes.',
      'Converting from an epoch timestamp to a human date involves multiplying the seconds by 1,000 (if 10 digits) and adding those milliseconds to the January 1, 1970 anchor. Converting from a calendar date to a timestamp extracts the total milliseconds elapsed and divides by 1,000.'
    ],
    formula: 'Timestamp (seconds) = ⌊ (Date in ms since 1970-01-01 UTC) ÷ 1,000 ⌋',
    formulaExplanation: 'Where the resulting integer represents total elapsed seconds since 00:00:00 UTC on January 1, 1970.',
    variables: [
      {
        symbol: 'Unix Timestamp',
        name: 'Epoch Integer',
        description: 'The number of elapsed seconds (10-digit) or milliseconds (13-digit) since Jan 1, 1970 UTC.'
      },
      {
        symbol: 'Local Date Time',
        name: 'Local Representation',
        description: 'The date and time formatted in your web browser\'s local time zone.'
      },
      {
        symbol: 'UTC Date String',
        name: 'Universal Coordinated Time',
        description: 'The Greenwich Mean Time / UTC calendar string (ISO standard representation).'
      },
      {
        symbol: 'Date Time Picker',
        name: 'Calendar Input',
        description: 'Interactive calendar selector for picking any arbitrary past or future datetime.'
      }
    ]
  },

  conversionTable: {
    title: 'Historic & Future Unix Epoch Milestones',
    description: 'Significant benchmark moments in computing history and future epoch limits:',
    headers: ['Unix Timestamp (s)', 'UTC Date & Time', 'Milestone Significance'],
    rows: [
      ['0', '1970-01-01 00:00:00 UTC', 'The official Unix Epoch origin'],
      ['500,000,000', '1985-11-05 00:53:20 UTC', 'Half-billion second milestone'],
      ['1,000,000,000', '2001-09-09 01:46:40 UTC', 'The 1-Billionth Second milestone (celebrated globally)'],
      ['1,500,000,000', '2017-07-14 02:40:00 UTC', 'Mid-2010s computing milestone'],
      ['1,700,000,000', '2023-11-14 22:13:20 UTC', 'Late 2023 milestone'],
      ['2,000,000,000', '2033-05-18 03:33:20 UTC', 'The 2-Billionth Second milestone'],
      ['2,147,483,647', '2038-01-19 03:14:07 UTC', 'Year 2038 Problem (maximum 32-bit signed integer)']
    ]
  },

  example: {
    title: 'Example: Converting Unix Timestamp 1700000000',
    description: 'Suppose a database record contains the epoch creation timestamp 1700000000 and you want to find its UTC and calendar date.',
    inputs: [
      { label: 'Unix Timestamp', value: '1700000000 (Seconds)' }
    ],
    steps: [
      'Step 1: Multiply by 1,000 to convert seconds to milliseconds: 1,700,000,000,000 ms.',
      'Step 2: Add 1,700,000,000,000 ms to the base epoch (January 1, 1970 00:00:00 UTC).',
      'Step 3: Format the resulting date into UTC: Tuesday, November 14, 2023 22:13:20 GMT.'
    ],
    calculation: '1,700,000,000 seconds after 1970-01-01T00:00:00Z = Tue, 14 Nov 2023 22:13:20 GMT',
    result: 'UTC: Tue, 14 Nov 2023 22:13:20 GMT'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The converter displays both your Local Date Time and the official UTC Date String so you can easily verify logs across different global servers without confusion.',
      'If you paste a 13-digit number (e.g., from JavaScript Date.now()), the tool automatically detects the millisecond precision and parses the exact time.'
    ]
  },

  faqs: [
    {
      question: 'What is the Unix Epoch?',
      answer: 'The Unix Epoch is January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC). Unix creators chose this arbitrary anchor point as the zero-second baseline for computing time.'
    },
    {
      question: 'How do I know if my timestamp is in seconds or milliseconds?',
      answer: 'Standard Unix timestamps in seconds are 10 digits long (e.g., 1700000000 for the 2020s). JavaScript, Java, and browser timestamps in milliseconds are 13 digits long (e.g., 1700000000000).'
    },
    {
      question: 'What is the Year 2038 Problem (Y2038)?',
      answer: 'Older 32-bit systems store timestamps as signed 32-bit integers, which max out at 2,147,483,647 on January 19, 2038 at 03:14:07 UTC. Beyond this moment, 32-bit systems will roll over into negative numbers (dating back to December 13, 1901). Modern 64-bit systems avoid this problem for the next 292 billion years.'
    },
    {
      question: 'Why do APIs and databases use Unix timestamps instead of text dates?',
      answer: 'Unix timestamps represent an absolute integer that eliminates timezone confusion, daylight saving time shifts, language translation discrepancies, and date formatting ambiguities (such as MM/DD/YYYY vs. DD/MM/YYYY).'
    },
    {
      question: 'Do Unix timestamps account for leap seconds?',
      answer: 'No. Unix time assumes every calendar day consists of exactly 86,400 seconds. When official leap seconds occur, Unix time repeats or skips a second to stay synchronized with solar time.'
    }
  ],

  notes: {
    title: 'Important Notes & Epoch Standards',
    items: [
      'Auto-Precision Detection: Supports both 10-digit second and 13-digit millisecond epoch timestamps.',
      'Timezone Agnostic: The Unix integer represents an identical universal moment across all global timezones.',
      'Two-Way Sync: Modifying either the numeric timestamp or the interactive datetime picker instantly synchronizes all outputs.'
    ]
  }
};
