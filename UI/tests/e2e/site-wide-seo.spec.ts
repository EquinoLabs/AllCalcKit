import { test, expect } from '@playwright/test';
import { CALCULATORS, CATEGORIES } from '../../src/data/calculators';

test.describe('E2E — Site-Wide SEO, Metadata & Structured Data Suite', () => {

  // All 39 Calculator Routes
  for (const calc of CALCULATORS) {
    test(`SEO & Metadata: ${calc.name} (${calc.url})`, async ({ page }) => {
      const res = await page.goto(calc.url);
      expect(res?.status()).toBe(200);

      // Exactly one non-empty H1
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);
      const h1Text = await h1s.first().textContent();
      expect(h1Text?.trim().length).toBeGreaterThan(3);

      // Document Title
      const title = await page.title();
      expect(title).toContain(calc.name);
      expect(title).toContain('All Calc Kit');

      // Meta Description
      const metaDesc = page.locator('meta[name="description"]');
      await expect(metaDesc).toHaveCount(1);
      const descContent = await metaDesc.getAttribute('content');
      expect(descContent?.trim().length).toBeGreaterThan(15);

      // Canonical URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      const canonicalHref = await canonical.getAttribute('href');
      expect(canonicalHref).toBe(`https://allcalckit.com${calc.url}`);

      // Educational Content Container
      await expect(page.locator('article')).toBeVisible();

      // Breadcrumb Navigation
      const breadcrumbs = page.locator('nav a');
      await expect(breadcrumbs.first()).toHaveAttribute('href', '/');

      // Footer Quick Tools Section
      const quickTools = page.locator('footer');
      await expect(quickTools).toContainText('Quick Tools');
      const quickLinks = quickTools.locator('a');
      expect(await quickLinks.count()).toBeGreaterThanOrEqual(8);

      // Valid Schema.org JSON-LD if present
      const jsonLd = page.locator('script[type="application/ld+json"]');
      const count = await jsonLd.count();
      for (let i = 0; i < count; i++) {
        const text = await jsonLd.nth(i).textContent();
        if (text) {
          expect(() => JSON.parse(text)).not.toThrow();
          const parsed = JSON.parse(text);
          expect(parsed['@context']).toBe('https://schema.org');
        }
      }
    });
  }

  // All 8 Category Routes
  for (const cat of CATEGORIES) {
    test(`SEO & Metadata: Category ${cat.name} (${cat.url})`, async ({ page }) => {
      const res = await page.goto(cat.url);
      expect(res?.status()).toBe(200);

      // Exactly one non-empty H1
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);

      // Document Title
      const title = await page.title();
      expect(title).toContain(cat.name);

      // Canonical URL
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveCount(1);
      expect(await canonical.getAttribute('href')).toBe(`https://allcalckit.com${cat.url}`);

      // Calculator Links exist on category hub
      const calcCards = page.locator('main a[href^="/"]');
      expect(await calcCards.count()).toBeGreaterThan(0);
    });
  }
});
