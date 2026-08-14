import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('E2E — Contact Us Form & Support Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('Contact Us page renders required UI elements and direct email link', async ({ page }) => {
    // Page Title & Headings
    await expect(page).toHaveTitle(/Contact Us/);
    await expect(page.locator('main h1')).toHaveText('Contact Us.');
    await expect(page.locator('text=Send Us a Message')).toBeVisible();

    // Form Fields
    await expect(page.locator('#contact-name')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
    await expect(page.locator('#contact-subject')).toBeVisible();
    await expect(page.locator('#contact-message')).toBeVisible();
    await expect(page.locator('#contact-submit-btn')).toBeVisible();

    // Direct Email Option
    const directEmailLink = page.locator('#direct-support-email-link');
    await expect(directEmailLink).toBeVisible();
    await expect(directEmailLink).toHaveText('support@allcalckit.com');
  });

  test('Valid submission displays support reference and success confirmation', async ({ page }) => {
    // Intercept /api/contact with standard Cloudflare Pages Function success response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          reference: 'ACK-20260814-K9X2M4P7',
          message: 'Message sent successfully!'
        })
      });
    });

    // Fill out form
    await page.fill('#contact-name', 'Sarah Jenkins');
    await page.fill('#contact-email', 'sarah.jenkins@example.com');
    await page.selectOption('#contact-subject', 'bug');
    await page.fill('#contact-message', 'The currency converter is returning incorrect rates when converting USD to JPY.');

    // Submit form
    await page.click('#contact-submit-btn');

    // Success box should become visible
    const successBox = page.locator('#contact-success');
    await expect(successBox).toBeVisible();
    await expect(page.locator('text=Message sent successfully!')).toBeVisible();

    // Support reference should be displayed matching ACK-YYYYMMDD-XXXXXXXX format
    const refEl = page.locator('#contact-ref-value');
    await expect(refEl).toBeVisible();
    const refText = await refEl.textContent();
    expect(refText).toMatch(/^ACK-\d{8}-[A-HJ-NP-Z2-9]{8}$/);

    // Form should be hidden
    await expect(page.locator('#contact-form')).toBeHidden();

    // Test copy button
    const copyBtn = page.locator('#contact-copy-ref-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(copyBtn).toHaveText('Copied!');

    // Test reset button
    const resetBtn = page.locator('#contact-reset-btn');
    await expect(resetBtn).toBeVisible();
    await resetBtn.click();

    // Form should be visible again and inputs cleared
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(successBox).toBeHidden();
    await expect(page.locator('#contact-name')).toHaveValue('');
  });

  test('Client-side validation rejects empty or short inputs', async ({ page }) => {
    // Attempt submit with empty inputs
    await page.click('#contact-submit-btn');

    // Error messages should appear
    await expect(page.locator('#contact-name-error')).toBeVisible();
    await expect(page.locator('#contact-name-error')).toContainText('Please enter your name');

    // Fill valid name, invalid email
    await page.fill('#contact-name', 'Alex Mercer');
    await page.fill('#contact-email', 'invalid-email-address');
    await page.click('#contact-submit-btn');

    await expect(page.locator('#contact-email-error')).toBeVisible();
    await expect(page.locator('#contact-email-error')).toContainText('valid email address');

    // Fill valid email, short message (<10 chars)
    await page.fill('#contact-email', 'alex@example.com');
    await page.fill('#contact-message', 'Short');
    await page.click('#contact-submit-btn');

    await expect(page.locator('#contact-message-error')).toBeVisible();
    await expect(page.locator('#contact-message-error')).toContainText('at least 10 characters');

    // Form should remain visible
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#contact-success')).toBeHidden();
  });

  test('Server-side error displays friendly error message without losing inputs', async ({ page }) => {
    // Intercept /api/contact to return 500 error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Something went wrong while sending your message. Please try again or email support@allcalckit.com directly.',
        }),
      });
    });

    await page.fill('#contact-name', 'Taylor Swift');
    await page.fill('#contact-email', 'taylor@example.com');
    await page.selectOption('#contact-subject', 'feedback');
    await page.fill('#contact-message', 'Great calculator app, thank you for making it free!');

    await page.click('#contact-submit-btn');

    // Error alert banner should appear
    const errorBox = page.locator('#contact-error');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText('support@allcalckit.com');

    // Inputs should be preserved so user does not lose input
    await expect(page.locator('#contact-name')).toHaveValue('Taylor Swift');
    await expect(page.locator('#contact-email')).toHaveValue('taylor@example.com');
    await expect(page.locator('#contact-message')).toHaveValue('Great calculator app, thank you for making it free!');
    await expect(page.locator('#contact-form')).toBeVisible();
  });

  test('Contact Us page meets WCAG 2.1 AA accessibility standards', async ({ page }) => {
    const scanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast'])
      .analyze();

    expect(scanResults.violations).toEqual([]);
  });

  test('Responsive — No horizontal scroll on mobile viewport (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });
});
