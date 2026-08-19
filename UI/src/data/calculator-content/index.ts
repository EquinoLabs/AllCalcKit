import type { CalculatorContent } from './types';
import { lengthContent } from './length';
import { percentageContent } from './percentage';
import { ageCalcContent } from './age-calc';
import { dateDiffContent } from './date-diff';
import { wordCounterContent } from './word-counter';
import { weightContent } from './weight';
import { temperatureContent } from './temperature';
import { volumeContent } from './volume';
import { areaContent } from './area';
import { speedContent } from './speed';
import { dataContent } from './data';
import { pressureContent } from './pressure';
import { energyContent } from './energy';
import { timeUnitsContent } from './time-units';
import { angleContent } from './angle';
import { fuelEfficiencyContent } from './fuel-efficiency';
import { cookingUnitsContent } from './cooking-units';
import { fractionDecimalContent } from './fraction-decimal';
import { numberBaseContent } from './number-base';
import { primeCheckerContent } from './prime-checker';
import { caseConverterContent } from './case-converter';
import { colorConverterContent } from './color-converter';
import { dateAddContent } from './date-add';
import { unixTimestampContent } from './unix-timestamp';
import { recipeConverterContent } from './recipe-converter';
import { fuelCostContent } from './fuel-cost';
import { electricityBillContent } from './electricity-bill';
import { currencyContent } from './currency';
import { loanEmiContent } from './loan-emi';
import { sipContent } from './sip';
import { compoundInterestContent } from './compound-interest';
import { fdRdContent } from './fd-rd';
import { taxGstContent } from './tax-gst';
import { discountContent } from './discount';
import { tipSplitContent } from './tip-split';
import { bmiContent } from './bmi';
import { bmrContent } from './bmr';
import { tdeeContent } from './tdee';
import { waterIntakeContent } from './water-intake';
import { rentVsBuyContent } from './rent-vs-buy';
import { moneySplitContent } from './money-split';
import { freelanceRateContent } from './freelance-rate';
import { startupRunwayContent } from './startup-runway';
import { cryptoDcaContent } from './crypto-dca';
import { inflationCalculatorContent } from './inflation-calculator';

export * from './types';
export { 
  lengthContent, 
  percentageContent, 
  ageCalcContent, 
  dateDiffContent, 
  wordCounterContent,
  weightContent,
  temperatureContent,
  volumeContent,
  areaContent,
  speedContent,
  dataContent,
  pressureContent,
  energyContent,
  timeUnitsContent,
  angleContent,
  fuelEfficiencyContent,
  cookingUnitsContent,
  fractionDecimalContent,
  numberBaseContent,
  primeCheckerContent,
  caseConverterContent,
  colorConverterContent,
  dateAddContent,
  unixTimestampContent,
  recipeConverterContent,
  fuelCostContent,
  electricityBillContent,
  currencyContent,
  loanEmiContent,
  sipContent,
  compoundInterestContent,
  fdRdContent,
  taxGstContent,
  discountContent,
  tipSplitContent,
  bmiContent,
  bmrContent,
  tdeeContent,
  waterIntakeContent,
  rentVsBuyContent,
  moneySplitContent,
  freelanceRateContent,
  startupRunwayContent,
  cryptoDcaContent,
  inflationCalculatorContent
};

export const CALCULATOR_CONTENT: Record<string, CalculatorContent> = {
  length: lengthContent,
  percentage: percentageContent,
  'age-calc': ageCalcContent,
  'date-diff': dateDiffContent,
  'word-counter': wordCounterContent,
  weight: weightContent,
  temperature: temperatureContent,
  volume: volumeContent,
  area: areaContent,
  speed: speedContent,
  data: dataContent,
  pressure: pressureContent,
  energy: energyContent,
  'time-units': timeUnitsContent,
  angle: angleContent,
  'fuel-efficiency': fuelEfficiencyContent,
  'cooking-units': cookingUnitsContent,
  'fraction-decimal': fractionDecimalContent,
  'number-base': numberBaseContent,
  'prime-checker': primeCheckerContent,
  'case-converter': caseConverterContent,
  'color-converter': colorConverterContent,
  'date-add': dateAddContent,
  'unix-timestamp': unixTimestampContent,
  'recipe-converter': recipeConverterContent,
  'fuel-cost': fuelCostContent,
  'electricity-bill': electricityBillContent,
  currency: currencyContent,
  'loan-emi': loanEmiContent,
  sip: sipContent,
  'compound-interest': compoundInterestContent,
  'fd-rd': fdRdContent,
  'tax-gst': taxGstContent,
  discount: discountContent,
  'tip-split': tipSplitContent,
  bmi: bmiContent,
  bmr: bmrContent,
  tdee: tdeeContent,
  'water-intake': waterIntakeContent,
  'rent-vs-buy': rentVsBuyContent,
  'money-split': moneySplitContent,
  'freelance-rate': freelanceRateContent,
  'startup-runway': startupRunwayContent,
  'crypto-dca': cryptoDcaContent,
  'inflation-calculator': inflationCalculatorContent,
};

export function getCalculatorContent(id: string): CalculatorContent | undefined {
  return CALCULATOR_CONTENT[id];
}

