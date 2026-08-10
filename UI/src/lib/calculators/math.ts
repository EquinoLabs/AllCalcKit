/**
 * Pure Math & Number Calculation Engine for AllCalcKit
 */

export function calculatePercentageMode1(percent: number, total: number): number {
  if (isNaN(percent) || isNaN(total)) return 0;
  return (percent / 100) * total;
}

export function calculatePercentageMode2(part: number, total: number): number | null {
  if (isNaN(part) || isNaN(total) || total === 0) return null;
  return (part / total) * 100;
}

export function calculatePercentageMode3(v1: number, v2: number): number | null {
  if (isNaN(v1) || isNaN(v2) || v1 === 0) return null;
  return ((v2 - v1) / v1) * 100;
}

export interface NumberBaseResult {
  decimal: string;
  binary: string;
  octal: string;
  hexadecimal: string;
}

export function convertNumberBase(value: string, fromBase: 2 | 8 | 10 | 16): NumberBaseResult | null {
  if (!value || value.trim() === '') return null;
  const cleaned = value.trim();
  const parsed = parseInt(cleaned, fromBase);
  if (isNaN(parsed)) return null;

  return {
    decimal: parsed.toString(10),
    binary: parsed.toString(2),
    octal: parsed.toString(8),
    hexadecimal: parsed.toString(16).toUpperCase(),
  };
}

export interface FractionResult {
  decimal: number;
  simplifiedNumerator: number;
  simplifiedDenominator: number;
  mixedWhole: number;
  mixedRemainder: number;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export function decimalToFraction(decimal: number): FractionResult | null {
  if (isNaN(decimal)) return null;
  const precision = 1000000;
  const numerator = Math.round(decimal * precision);
  const denominator = precision;
  const divisor = gcd(Math.abs(numerator), denominator);

  const simpNum = numerator / divisor;
  const simpDen = denominator / divisor;
  const whole = Math.floor(Math.abs(simpNum) / simpDen);
  const remainder = Math.abs(simpNum) % simpDen;

  return {
    decimal,
    simplifiedNumerator: simpNum,
    simplifiedDenominator: simpDen,
    mixedWhole: simpNum < 0 ? -whole : whole,
    mixedRemainder: remainder,
  };
}

export function fractionToDecimal(numerator: number, denominator: number): FractionResult | null {
  if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return null;
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  const simpNum = numerator / divisor;
  const simpDen = denominator / divisor;
  const dec = numerator / denominator;
  const whole = Math.floor(Math.abs(simpNum) / simpDen);
  const remainder = Math.abs(simpNum) % simpDen;

  return {
    decimal: parseFloat(dec.toFixed(6)),
    simplifiedNumerator: simpNum,
    simplifiedDenominator: simpDen,
    mixedWhole: simpNum < 0 ? -whole : whole,
    mixedRemainder: remainder,
  };
}

export interface PrimeCheckResult {
  isPrime: boolean;
  factors: number[];
  primeFactors: number[];
  nextPrime: number;
}

export function checkPrime(n: number): PrimeCheckResult {
  if (n <= 1 || !Number.isInteger(n)) {
    return { isPrime: false, factors: [], primeFactors: [], nextPrime: 2 };
  }

  const factors: number[] = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  factors.sort((a, b) => a - b);
  const isPrime = factors.length === 2;

  // Prime factorization
  const primeFactors: number[] = [];
  let temp = n;
  for (let d = 2; d * d <= temp; d++) {
    while (temp % d === 0) {
      primeFactors.push(d);
      temp /= d;
    }
  }
  if (temp > 1) primeFactors.push(temp);

  // Next prime
  let next = n + 1;
  while (true) {
    let nextIsPrime = true;
    for (let i = 2; i * i <= next; i++) {
      if (next % i === 0) {
        nextIsPrime = false;
        break;
      }
    }
    if (nextIsPrime) break;
    next++;
  }

  return { isPrime, factors, primeFactors, nextPrime: next };
}
