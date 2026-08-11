import { describe, it, expect } from 'vitest';
import { EXPLAIN_CONTENT, getExplainContent } from '../../src/data/explainContent';

describe('Explain This Result Panel Data', () => {
  const top5ToolIds = ['loan-emi', 'currency', 'bmi', 'percentage', 'tip-split'];

  it('contains valid explain data for all top 5 calculators', () => {
    top5ToolIds.forEach((id) => {
      const content = getExplainContent(id);
      expect(content).toBeDefined();
      expect(content?.id).toBe(id);
      expect(content?.title).toBeTruthy();
      expect(content?.formula).toBeTruthy();
      expect(content?.formulaExplanation).toBeTruthy();
      expect(content?.useCase).toBeTruthy();

      // Example checks
      expect(content?.example).toBeDefined();
      expect(content?.example.steps.length).toBeGreaterThan(0);
      expect(content?.example.result).toBeTruthy();

      // Check all step strings are non-empty
      content?.example.steps.forEach((step) => {
        expect(typeof step).toBe('string');
        expect(step.trim().length).toBeGreaterThan(5);
      });
    });
  });

  it('safely returns undefined for unconfigured tools without throwing', () => {
    expect(getExplainContent('non-existent-tool')).toBeUndefined();
    expect(getExplainContent('length')).toBeUndefined();
    expect(getExplainContent('')).toBeUndefined();
  });

  it('has valid variable definitions for formulas that define variables', () => {
    Object.values(EXPLAIN_CONTENT).forEach((content) => {
      if (content.variables) {
        expect(content.variables.length).toBeGreaterThan(0);
        content.variables.forEach((v) => {
          expect(v.symbol).toBeTruthy();
          expect(v.name).toBeTruthy();
          expect(v.description).toBeTruthy();
        });
      }
    });
  });
});
