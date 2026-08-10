import type { CalculatorContent } from './types';

export const caseConverterContent: CalculatorContent = {
  id: 'case-converter',

  intro: {
    title: 'What is a Text Case Converter?',
    paragraphs: [
      'A Text Case Converter is an instant string transformation and typography tool that converts text across six standard casing conventions: UPPERCASE, lowercase, Title Case, camelCase, kebab-case, and snake_case.',
      'Whether you are a writer formatting article headlines, a software developer creating variable names and database columns, a webmaster generating SEO-friendly URL slugs, or a marketer cleaning up unformatted copy, converting text case with a single click saves valuable time. All transformations run instantly in your browser.'
    ]
  },

  howToUse: {
    title: 'How to Use the Text Case Converter',
    description: 'Transform your text into any casing style in three simple steps:',
    steps: [
      'Type or paste your text into the multi-line input box.',
      'Click any of the transformation buttons (UPPERCASE, lowercase, Title Case, camelCase, kebab-case, or snake_case).',
      'Copy the converted text directly from the box for use in your code, document, or publication.'
    ]
  },

  howItWorks: {
    title: 'How Text Case Transformation Works',
    paragraphs: [
      'Different software languages, operating systems, and publishing styles enforce distinct letter casing rules to ensure legibility and syntactic validity.',
      'The converter processes the input string using targeted regular expressions (regex) and character mapping: standard letter casing shifts alphabetic ASCII codes, Title Case capitalizes the first character of each word, and programmatic cases (camelCase, kebab-case, snake_case) sanitize whitespace and punctuation into standardized delimiters.'
    ],
    formula: 'UPPERCASE: c → UPPER(c)  |  kebab-case: [whitespace/special] → "-"  |  snake_case: [whitespace/special] → "_"',
    formulaExplanation: 'Where text is parsed into word tokens and restructured according to the selected delimiter and capitalization rules.',
    variables: [
      {
        symbol: 'UPPERCASE',
        name: 'All Caps',
        description: 'Converts every alphabetic character to its capital uppercase form.'
      },
      {
        symbol: 'lowercase',
        name: 'All Small',
        description: 'Converts every alphabetic character to its lowercase form.'
      },
      {
        symbol: 'Title Case',
        name: 'Headline Case',
        description: 'Capitalizes the first letter of each word in the sentence.'
      },
      {
        symbol: 'camelCase',
        name: 'Programming Variable',
        description: 'Removes spaces and capitalizes each subsequent word, starting with lowercase (e.g. userProfile).'
      },
      {
        symbol: 'kebab-case',
        name: 'URL Slug / CSS',
        description: 'Converts to lowercase and separates words with hyphens (e.g. user-profile).'
      },
      {
        symbol: 'snake_case',
        name: 'Database / Python',
        description: 'Converts to lowercase and separates words with underscores (e.g. user_profile).'
      }
    ]
  },

  conversionTable: {
    title: 'Text Case Styles & Industry Use Cases',
    description: 'Comparison of all 6 supported case formats using the example phrase "all calc kit precision":',
    headers: ['Case Style', 'Transformed Output', 'Delimiters', 'Common Industry Application'],
    rows: [
      ['UPPERCASE', 'ALL CALC KIT PRECISION', 'Spaces preserved', 'Acronyms, legal disclaimers, SQL keywords (SELECT, FROM)'],
      ['lowercase', 'all calc kit precision', 'Spaces preserved', 'Email addresses, body copy, uniform search indexing'],
      ['Title Case', 'All Calc Kit Precision', 'Capitalized words', 'Article headlines, book titles, website navigation buttons'],
      ['camelCase', 'allCalcKitPrecision', 'No spaces (Caps)', 'JavaScript/TypeScript variables, Java methods, JSON keys'],
      ['kebab-case', 'all-calc-kit-precision', 'Hyphens (-)', 'SEO web URLs, REST API routes, CSS class names'],
      ['snake_case', 'all_calc_kit_precision', 'Underscores (_)', 'Python variables, SQL database table columns, file names']
    ]
  },

  example: {
    title: 'Example: Converting a Sentence across Multiple Cases',
    description: 'Suppose you paste the phrase "All Calc Kit Precision Tools" and want to convert it for web development.',
    inputs: [
      { label: 'Original Text', value: 'All Calc Kit Precision Tools' }
    ],
    steps: [
      'Step 1: Click "kebab-case" to generate a clean URL slug: "all-calc-kit-precision-tools".',
      'Step 2: Click "camelCase" to generate a JavaScript variable name: "allCalcKitPrecisionTools".',
      'Step 3: Click "snake_case" to generate a database column name: "all_calc_kit_precision_tools".',
      'Step 4: Click "UPPERCASE" to generate an SQL constant: "ALL CALC KIT PRECISION TOOLS".'
    ],
    calculation: '"All Calc Kit Precision Tools" → kebab: all-calc-kit-precision-tools | camel: allCalcKitPrecisionTools',
    result: 'kebab-case: all-calc-kit-precision-tools | camelCase: allCalcKitPrecisionTools'
  },

  resultExplanation: {
    title: 'Understanding Your Result',
    paragraphs: [
      'Transformations happen directly in your text box, allowing you to cycle through multiple styles until you find the exact format needed.',
      'When converting to programmatic formats (camelCase, kebab-case, snake_case), special punctuation marks such as quotes, commas, and periods are cleanly stripped to produce valid code identifiers and web slugs.'
    ]
  },

  faqs: [
    {
      question: 'What is the difference between camelCase and PascalCase?',
      answer: 'camelCase begins with a lowercase letter and capitalizes subsequent words (e.g., "myVariableName"), commonly used for variables and functions. PascalCase capitalizes every word including the first (e.g., "MyVariableName"), commonly used for classes and React components.'
    },
    {
      question: 'Why should website URLs use kebab-case instead of snake_case?',
      answer: 'Search engines like Google treat hyphens (-) as word separators, indexing "my-page" as "my page". Underscores (_) are treated as character joiners, meaning "my_page" may be indexed as a single unrecognized token "mypage".'
    },
    {
      question: 'When should I use snake_case vs. camelCase in programming?',
      answer: 'Python, Ruby, Rust, and SQL databases conventionally use snake_case (e.g., user_account_id). JavaScript, TypeScript, Java, and Swift use camelCase for variables and methods (e.g., userAccountId).'
    },
    {
      question: 'Does Title Case capitalize small words like "in", "and", and "the"?',
      answer: 'Automated software title casing capitalizes the first letter of every word for consistency. In formal editorial styles (such as APA or Chicago), minor articles and short prepositions may remain lowercase.'
    },
    {
      question: 'Is my text private and secure when using this converter?',
      answer: 'Yes. All string operations execute 100% locally in your browser\'s memory. No text is ever transmitted to an external server or saved in a database.'
    }
  ],

  notes: {
    title: 'Important Notes & Formatting Standards',
    items: [
      '100% Client-Side Privacy: All string transformations occur entirely within your browser with zero data logging.',
      'Sanitization: Programmatic cases (camelCase, kebab-case, snake_case) automatically strip unsupported punctuation to produce clean code tokens.',
      'Non-Destructive: You can apply consecutive transformations back-to-back without losing your original text structure.'
    ]
  }
};
