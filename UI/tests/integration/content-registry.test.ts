import { describe, it, expect } from 'vitest';
import { CALCULATORS } from '../../src/data/calculators';
import { CALCULATOR_CONTENT, getCalculatorContent } from '../../src/data/calculator-content';

describe('Integration — Calculator Content Registry', () => {
  it('has a registered content object for all 40 calculators', () => {
    for (const calc of CALCULATORS) {
      const content = getCalculatorContent(calc.id);
      expect(content, `Missing content for calculator id: ${calc.id}`).toBeDefined();
      expect(content!.id).toBe(calc.id);
    }
  });

  it('every content file contains complete required sections', () => {
    for (const [id, content] of Object.entries(CALCULATOR_CONTENT)) {
      expect(content.intro.title, `Intro title missing in ${id}`).toBeTruthy();
      expect(content.intro.paragraphs.length, `Intro paragraphs empty in ${id}`).toBeGreaterThanOrEqual(1);

      expect(content.howToUse.title, `howToUse title missing in ${id}`).toBeTruthy();
      expect(content.howToUse.steps.length, `howToUse steps empty in ${id}`).toBeGreaterThanOrEqual(3);

      expect(content.howItWorks.title, `howItWorks title missing in ${id}`).toBeTruthy();
      expect(content.howItWorks.formula, `howItWorks formula missing in ${id}`).toBeTruthy();

      expect(content.conversionTable.headers.length, `table headers empty in ${id}`).toBeGreaterThanOrEqual(2);
      expect(content.conversionTable.rows.length, `table rows empty in ${id}`).toBeGreaterThanOrEqual(3);

      expect(content.example.title, `example title missing in ${id}`).toBeTruthy();
      expect(content.example.steps.length, `example steps empty in ${id}`).toBeGreaterThanOrEqual(2);

      expect(content.resultExplanation.paragraphs.length, `resultExplanation empty in ${id}`).toBeGreaterThanOrEqual(1);

      expect(content.faqs.length, `faqs count < 3 in ${id}`).toBeGreaterThanOrEqual(3);

      expect(content.notes.items.length, `notes empty in ${id}`).toBeGreaterThanOrEqual(2);
    }
  });
});
