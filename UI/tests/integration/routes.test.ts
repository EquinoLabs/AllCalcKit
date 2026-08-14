import { describe, it, expect } from 'vitest';
import { CALCULATORS, CATEGORIES } from '../../src/data/calculators';
import { CALCULATOR_CONTENT } from '../../src/data/calculator-content';

describe('Integration — Routing & Calculator Registry', () => {
  it('contains exactly 41 calculators in the master catalog', () => {
    expect(CALCULATORS).toHaveLength(41);
  });

  it('contains exactly 8 top-level categories', () => {
    expect(CATEGORIES).toHaveLength(8);
  });

  it('every calculator references a valid categoryId', () => {
    const validCategoryIds = new Set(CATEGORIES.map(c => c.id));
    for (const calc of CALCULATORS) {
      expect(validCategoryIds.has(calc.categoryId)).toBe(true);
      expect(calc.url).toBe(`/${calc.categoryId}/${calc.id}`);
    }
  });

  it('every calculator has unique ID and URL', () => {
    const ids = CALCULATORS.map(c => c.id);
    const urls = CALCULATORS.map(c => c.url);
    expect(new Set(ids).size).toBe(41);
    expect(new Set(urls).size).toBe(41);
  });
});
