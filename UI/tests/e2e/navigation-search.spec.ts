import { test, expect } from '@playwright/test';

test.describe('E2E — Search & Navigation Workflows', () => {
  test('Command Palette (Cmd+K) modal search & navigation', async ({ page }) => {
    await page.goto('/');

    const searchBtn = page.locator('#open-search-btn');
    const modal = page.locator('#search-modal');
    const searchInput = page.locator('#search-input');

    await searchBtn.click();
    await expect(modal).toBeVisible();

    await searchInput.fill('Loan');
    const firstResult = page.locator('#search-results a').first();
    await expect(firstResult).toContainText('Loan / EMI Calculator');

    await firstResult.click();
    await expect(page).toHaveURL('/finance/loan-emi');
  });

  test('Theme Toggle switches light and dark mode and persists in localStorage', async ({ page }) => {
    await page.goto('/');

    const toggle = page.locator('#theme-toggle');
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Click toggle to switch to light mode
    await toggle.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);

    const savedTheme = await page.evaluate(() => localStorage.getItem('ack_theme'));
    expect(savedTheme).toBe('light');

    // Click toggle again to switch back to dark mode
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('Footer Quick Tools and Category links resolve correctly', async ({ page }) => {
    await page.goto('/');

    const lengthLink = page.locator('footer a:has-text("Length Converter")').first();
    await expect(lengthLink).toHaveAttribute('href', '/units/length');

    const emiLink = page.locator('footer a:has-text("Loan / EMI Calculator")').first();
    await expect(emiLink).toHaveAttribute('href', '/finance/loan-emi');
  });
});
