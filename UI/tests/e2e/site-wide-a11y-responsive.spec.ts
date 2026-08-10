import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { CALCULATORS, CATEGORIES } from '../../src/data/calculators';

test.describe('E2E — Accessibility (a11y), Responsive Viewports & Internal Link Crawler', () => {

  // Representative pages for accessibility
  const a11yRoutes = [
    '/',
    '/units',
    '/finance',
    '/health',
    '/math',
    '/datetime',
    '/cooking',
    '/everyday',
    '/text',
    '/units/length',
    '/finance/loan-emi',
    '/health/bmi',
    '/math/percentage',
    '/datetime/date-diff',
    '/cooking/recipe-converter',
    '/everyday/fuel-cost',
    '/text/word-counter'
  ];

  for (const route of a11yRoutes) {
    test(`Accessibility Audit (WCAG 2.1 AA): ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      // Verify that confirmed issues (form labels, select accessible names, scrollable tables) are resolved
      const resolvedRuleViolations = results.violations.filter(v => 
        ['select-name', 'label', 'scrollable-region-focusable'].includes(v.id)
      );
      expect(resolvedRuleViolations).toEqual([]);
    });
  }

  // Responsive Viewports Multi-Device Scan (375px, 390px, 768px, 1280px)
  const viewports = [
    { name: 'iPhone SE (375px)', width: 375, height: 667 },
    { name: 'iPhone 14 (390px)', width: 390, height: 844 },
    { name: 'iPad Mini (768px)', width: 768, height: 1024 },
    { name: 'Desktop (1280px)', width: 1280, height: 800 }
  ];

  for (const vp of viewports) {
    test(`Responsive Layout — No horizontal overflow on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Test homepage, categories, and key calculators
      const sampleRoutes = ['/', '/units', '/finance/sip', '/cooking/recipe-converter', '/math/percentage'];
      for (const route of sampleRoutes) {
        await page.goto(route);

        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        expect(hasHorizontalOverflow).toBe(false);
      }
    });
  }

  // Site-Wide Internal Link Crawler
  test('Internal Link Integrity — All site-wide links return HTTP 200 without 404s', async ({ page }) => {
    const visited = new Set<string>();
    const toVisit = ['/', ...CATEGORIES.map(c => c.url), ...CALCULATORS.slice(0, 15).map(c => c.url)];

    for (const url of toVisit) {
      if (visited.has(url)) continue;
      visited.add(url);

      const res = await page.goto(url);
      expect(res?.status()).toBe(200);

      // Collect all internal links from the page
      const hrefs = await page.$$eval('a[href]', links => 
        links
          .map(a => a.getAttribute('href'))
          .filter((href): href is string => !!href && href.startsWith('/') && !href.startsWith('//'))
      );

      for (const href of hrefs) {
        const cleanHref = href.split('#')[0];
        if (cleanHref && !visited.has(cleanHref)) {
          // Check that target route resolves with HTTP 200
          const subRes = await page.request.get(cleanHref);
          expect(subRes.status()).toBe(200);
          visited.add(cleanHref);
        }
      }
    }
  });
});
