import { describe, it, expect } from 'vitest';
import { CALCULATOR_CONTENT } from '../../src/data/calculator-content';

describe('Integration — Schema.org JSON-LD Generation', () => {
  it('generates valid FAQPage Schema for every calculator', () => {
    for (const [id, content] of Object.entries(CALCULATOR_CONTENT)) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };

      const serialized = JSON.stringify(faqSchema);
      expect(serialized).toBeTruthy();

      const parsed = JSON.parse(serialized);
      expect(parsed['@type']).toBe('FAQPage');
      expect(parsed.mainEntity.length).toBeGreaterThanOrEqual(3);
      expect(parsed.mainEntity[0]['@type']).toBe('Question');
      expect(parsed.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
    }
  });
});
