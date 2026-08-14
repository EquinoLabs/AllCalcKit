import { test, expect } from '@playwright/test';
import { CALCULATORS, CATEGORIES } from '../../src/data/calculators';

test.describe('E2E — Site-Wide Smoke & Route Verification', () => {
  test('Homepage loads with HTTP 200 and required elements', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/All Calc Kit/);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer').getByText('Quick Tools')).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  for (const cat of CATEGORIES) {
    test(`Category page: ${cat.name} (${cat.url})`, async ({ page }) => {
      const res = await page.goto(cat.url);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
    });
  }

  for (const calc of CALCULATORS) {
    test(`Calculator page: ${calc.name} (${calc.url})`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      const res = await page.goto(calc.url);
      expect(res?.status()).toBe(200);

      // Verify single H1
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(calc.name);

      // Verify educational content article
      await expect(page.locator('article')).toBeVisible();

      // Verify footer Quick Tools is present
      await expect(page.locator('footer').getByText('Quick Tools')).toBeVisible();

      expect(consoleErrors).toEqual([]);
    });
  }
});
