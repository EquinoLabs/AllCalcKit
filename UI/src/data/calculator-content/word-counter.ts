import type { CalculatorContent } from './types';

export const wordCounterContent: CalculatorContent = {
  id: 'word-counter',

  intro: {
    title: 'What is a Word & Character Counter?',
    paragraphs: [
      'A word and character counter is an essential text analysis tool for writers, students, journalists, social media marketers, and developers. Whether you are drafting an essay, writing a tweet, optimizing SEO meta descriptions, or submitting an academic abstract, keeping track of word counts and character constraints is critical.',
      'This tool evaluates your text in real time as you type or paste content. It provides instant metrics for total words, characters, sentences, and estimated silent reading time without saving or uploading your text.'
    ]
  },

  howToUse: {
    title: 'How to Use the Word & Character Counter',
    description: 'Analyze any text snippet with instant real-time feedback:',
    steps: [
      'Type directly into the text editor or paste text from your clipboard.',
      'Review the live summary cards below the editor displaying Words, Characters, Sentences, and Reading Time.',
      'Edit or add text to see all metrics re-calculate automatically with zero delay.'
    ]
  },

  howItWorks: {
    title: 'How Text Analysis Works',
    paragraphs: [
      'The counter evaluates your text using standard string parsing and linguistic rules.',
      'Words are identified by separating non-empty text strings delimited by whitespace (spaces, tabs, and line breaks). Characters measure the total count of letters, numbers, spaces, and punctuation symbols. Sentences are counted by identifying sentence-ending punctuation (. ! ?), and reading time is estimated using an average reading speed of 200 words per minute (WPM).'
    ],
    formula: 'Reading Time (seconds) = (Word Count ÷ 200 WPM) × 60',
    formulaExplanation: 'Reading time under 60 seconds is shown in seconds (s), while longer reading times are displayed in minutes (m).',
    variables: [
      {
        symbol: 'Words',
        name: 'Word Count',
        description: 'Total individual words separated by whitespace.'
      },
      {
        symbol: 'Characters',
        name: 'Character Count',
        description: 'Total characters including letters, numbers, spaces, and punctuation.'
      },
      {
        symbol: 'Sentences',
        name: 'Sentence Count',
        description: 'Count of complete sentences delimited by periods, exclamation marks, or question marks.'
      },
      {
        symbol: 'Reading Time',
        name: 'Estimated Reading Duration',
        description: 'Estimated time required for an adult to read the text silently at 200 WPM.'
      }
    ]
  },

  conversionTable: {
    title: 'Common Character & Word Limits Reference',
    description: 'Standard character and word count guidelines across popular platforms and publications:',
    headers: ['Platform / Medium', 'Typical Limit', 'Metric', 'Recommended Target'],
    rows: [
      ['X (Twitter) Post', '280 characters', 'Characters', '240–260 characters for optimal engagement'],
      ['SEO Meta Description', '155–160 characters', 'Characters', '150–158 characters to avoid search snippet truncation'],
      ['SEO Title Tag', '50–60 characters', 'Characters', '55 characters maximum'],
      ['LinkedIn Post', '3,000 characters', 'Characters', '1,000–1,500 characters for readability'],
      ['Instagram Caption', '2,200 characters', 'Characters', '125 characters before "more" fold'],
      ['Standard College Essay', '500–1,000 words', 'Words', 'Typically 2–4 double-spaced pages'],
      ['Academic Abstract', '150–250 words', 'Words', 'Concise summary of research papers'],
      ['Blog Post / Article', '1,200–2,000 words', 'Words', 'In-depth informational content (6–10 min read)']
    ]
  },

  example: {
    title: 'Example: Analyzing a Sample Paragraph',
    description: 'Consider the following sample text snippet: "The quick brown fox jumps over the lazy dog. It was a bright and sunny afternoon!"',
    inputs: [
      { label: 'Sample Text', value: '"The quick brown fox jumps over the lazy dog. It was a bright and sunny afternoon!"' }
    ],
    steps: [
      'Step 1: Count words: 17 individual words separated by spaces.',
      'Step 2: Count characters: 81 total characters (including letters, spaces, and punctuation).',
      'Step 3: Count sentences: 2 sentences ending with a period (.) and exclamation mark (!).',
      'Step 4: Estimate reading time: (17 ÷ 200) × 60 = 5.1 seconds (rounded up to 6s).'
    ],
    calculation: '17 words, 81 chars, 2 sentences → (17 ÷ 200) × 60 = ~6s',
    result: '17 Words, 81 Characters, 2 Sentences (~6s Reading Time)'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'The word and character counts give you exact precision when meeting editorial requirements, assignment limits, or social media character caps.',
      'The reading time metric is calibrated to a standard adult reading speed of 200 words per minute. If you are preparing a speech or presentation, spoken delivery is typically slower (around 130 to 150 words per minute).'
    ]
  },

  faqs: [
    {
      question: 'How is the estimated reading time calculated?',
      answer: 'Reading time is calculated using an established average adult reading speed of 200 words per minute (WPM). The formula divides total words by 200 and converts the result into seconds or minutes.'
    },
    {
      question: 'Are spaces and punctuation marks included in the character count?',
      answer: 'Yes. The character counter measures every character in your text, including letters, digits, spaces, line breaks, and punctuation marks, matching standard platform character counter behavior.'
    },
    {
      question: 'Is my text private and secure?',
      answer: 'Yes, 100%. All counting and text analysis runs entirely in your browser using client-side JavaScript. Your text is never uploaded, saved, or transmitted to any server.'
    },
    {
      question: 'How does the counter distinguish between words and sentences?',
      answer: 'Words are separated by whitespace characters (spaces, tabs, and line breaks). Sentences are identified by terminal punctuation marks such as periods (.), question marks (?), and exclamation points (!).'
    },
    {
      question: 'What is the difference between silent reading time and speaking time?',
      answer: 'Most adults read silently at approximately 200 to 250 words per minute. Speaking time is slower, averaging 130 to 150 words per minute to allow for clear pronunciation, emphasis, and audience comprehension.'
    }
  ],

  notes: {
    title: 'Important Notes & Usage Guidelines',
    items: [
      'Client-Side Privacy: All text is processed entirely on your device with complete privacy.',
      'Hyphenated Words: Words connected by hyphens without spaces (e.g., "state-of-the-art") are counted as a single word in standard whitespace tokenization.',
      'Multiple Punctuation: Consecutive punctuation marks (e.g., "..." or "?!") are treated as a single sentence boundary.'
    ]
  }
};
