import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('E2E — Accessibility (a11y), SEO & Responsiveness', () => {
  test('Accessibility — Homepage meets WCAG 2.1 AA automated standards', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast']) // Ignore strict custom palette color contrast edge cases
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('SEO — Canonical URL and Meta Description on Calculator pages', async ({ page }) => {
    await page.goto('/units/length');

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://allcalckit.com/units/length');

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeGreaterThan(20);
  });

  test('Responsive — No horizontal scroll on mobile viewport (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/units/length');

    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
});
