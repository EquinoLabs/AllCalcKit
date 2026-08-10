export interface VariableDefinition {
  symbol: string;
  name: string;
  description: string;
}

export interface ExampleInput {
  label: string;
  value: string;
}

export interface ExampleCalculation {
  title?: string;
  description?: string;
  inputs?: ExampleInput[];
  steps?: string[];
  calculation?: string;
  result?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableData {
  title?: string;
  description?: string;
  headers: string[];
  rows: (string | number)[][];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface CalculatorContent {
  id: string;

  intro?: {
    title?: string;
    paragraphs: string[];
  };

  howToUse?: {
    title?: string;
    description?: string;
    steps: string[];
  };

  howItWorks?: {
    title?: string;
    paragraphs?: string[];
    formula?: string;
    formulaExplanation?: string;
    variables?: VariableDefinition[];
  };

  conversionTable?: TableData;

  example?: ExampleCalculation;

  resultExplanation?: {
    title?: string;
    paragraphs: string[];
  };

  notes?: {
    title?: string;
    items: string[];
  };

  faqs?: FaqItem[];
}
