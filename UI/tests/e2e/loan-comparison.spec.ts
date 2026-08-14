import { test, expect } from '@playwright/test';

test.describe('E2E — Loan / EMI Comparison Mode (/finance/loan-emi)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/finance/loan-emi');
  });

  test('Single-calculator mode remains the default view', async ({ page }) => {
    const singleView = page.locator('#emi-single-view');
    const compareView = page.locator('#emi-compare-view');
    const compareToggle = page.locator('#emi-compare-toggle');

    await expect(singleView).toBeVisible();
    await expect(compareView).toBeHidden();
    await expect(compareToggle).toHaveAttribute('aria-checked', 'false');
  });

  test('Toggling comparison mode ON displays Scenario A, Scenario B, and Comparison Summary', async ({ page }) => {
    const compareToggle = page.locator('#emi-compare-toggle');
    await compareToggle.click();

    await expect(page.locator('#emi-single-view')).toBeHidden();
    await expect(page.locator('#emi-compare-view')).toBeVisible();
    await expect(compareToggle).toHaveAttribute('aria-checked', 'true');

    // Both scenario cards and summary exist and are visible
    await expect(page.locator('#scenario-a-card')).toBeVisible();
    await expect(page.locator('#scenario-b-card')).toBeVisible();
    await expect(page.locator('#emi-comparison-summary')).toBeVisible();
  });

  test('Preserves state when toggling comparison mode ON and OFF', async ({ page }) => {
    // 1. Modify single calculator values
    const amountInp = page.locator('#emi-amount');
    const rateInp = page.locator('#emi-rate');
    const tenureInp = page.locator('#emi-tenure');

    await amountInp.fill('200000');
    await rateInp.fill('9.5');
    await tenureInp.fill('7');
    await amountInp.dispatchEvent('input');
    await rateInp.dispatchEvent('input');
    await tenureInp.dispatchEvent('input');

    // 2. Toggle ON
    await page.click('#emi-compare-toggle');

    // Verify Scenario A inherited the single calculator values
    await expect(page.locator('#scenario-a-amount')).toHaveValue('200000');
    await expect(page.locator('#scenario-a-rate')).toHaveValue('9.5');
    await expect(page.locator('#scenario-a-tenure')).toHaveValue('7');

    // 3. Modify Scenario A while in comparison mode
    await page.locator('#scenario-a-amount').fill('350000');
    await page.locator('#scenario-a-amount').dispatchEvent('input');
    await page.locator('#scenario-a-rate').fill('7.8');
    await page.locator('#scenario-a-rate').dispatchEvent('input');

    // 4. Toggle OFF
    await page.click('#emi-compare-toggle');

    // Single calculator should have preserved Scenario A's latest state
    await expect(page.locator('#emi-amount')).toHaveValue('350000');
    await expect(page.locator('#emi-rate')).toHaveValue('7.8');
    await expect(page.locator('#emi-tenure')).toHaveValue('7');
  });

  test('Independent calculations & Scenario isolation', async ({ page }) => {
    await page.click('#emi-compare-toggle');

    const scenAAmount = page.locator('#scenario-a-amount');
    const scenARate = page.locator('#scenario-a-rate');
    const scenATenure = page.locator('#scenario-a-tenure');

    const scenBAmount = page.locator('#scenario-b-amount');
    const scenBRate = page.locator('#scenario-b-rate');
    const scenBTenure = page.locator('#scenario-b-tenure');

    // Set Scenario A: $100k @ 8.5% for 5 years
    await scenAAmount.fill('100000');
    await scenARate.fill('8.5');
    await scenATenure.fill('5');
    await scenAAmount.dispatchEvent('input');
    await scenARate.dispatchEvent('input');
    await scenATenure.dispatchEvent('input');

    // Set Scenario B: $100k @ 7.5% for 5 years
    await scenBAmount.fill('100000');
    await scenBRate.fill('7.5');
    await scenBTenure.fill('5');
    await scenBAmount.dispatchEvent('input');
    await scenBRate.dispatchEvent('input');
    await scenBTenure.dispatchEvent('input');

    // Capture initial Scenario B results
    const initialBMonthly = await page.locator('#scenario-b-monthly').textContent();
    const initialBInterest = await page.locator('#scenario-b-interest').textContent();

    // Modify Scenario A only ($150k @ 10% for 10 years)
    await scenAAmount.fill('150000');
    await scenARate.fill('10');
    await scenATenure.fill('10');
    await scenAAmount.dispatchEvent('input');
    await scenARate.dispatchEvent('input');
    await scenATenure.dispatchEvent('input');

    // Verify Scenario B is COMPLETELY unchanged
    await expect(page.locator('#scenario-b-amount')).toHaveValue('100000');
    await expect(page.locator('#scenario-b-rate')).toHaveValue('7.5');
    await expect(page.locator('#scenario-b-tenure')).toHaveValue('5');
    await expect(page.locator('#scenario-b-monthly')).toHaveText(initialBMonthly!);
    await expect(page.locator('#scenario-b-interest')).toHaveText(initialBInterest!);

    // Modify Scenario B only
    await scenBRate.fill('6.5');
    await scenBRate.dispatchEvent('input');

    // Verify Scenario A values remain unchanged
    await expect(page.locator('#scenario-a-amount')).toHaveValue('150000');
    await expect(page.locator('#scenario-a-rate')).toHaveValue('10');
    await expect(page.locator('#scenario-a-tenure')).toHaveValue('10');
  });

  test('Comparison difference calculations & Recommendation banner', async ({ page }) => {
    await page.click('#emi-compare-toggle');

    // Scenario A: $100,000 @ 8.5% for 5 years -> EMI: ~$2,052, Interest: ~$23,099, Total: ~$123,099
    await page.locator('#scenario-a-amount').fill('100000');
    await page.locator('#scenario-a-rate').fill('8.5');
    await page.locator('#scenario-a-tenure').fill('5');
    await page.locator('#scenario-a-amount').dispatchEvent('input');
    await page.locator('#scenario-a-rate').dispatchEvent('input');
    await page.locator('#scenario-a-tenure').dispatchEvent('input');

    // Scenario B: $100,000 @ 7.5% for 5 years -> EMI: ~$2,004, Interest: ~$20,228, Total: ~$120,228
    await page.locator('#scenario-b-amount').fill('100000');
    await page.locator('#scenario-b-rate').fill('7.5');
    await page.locator('#scenario-b-tenure').fill('5');
    await page.locator('#scenario-b-amount').dispatchEvent('input');
    await page.locator('#scenario-b-rate').dispatchEvent('input');
    await page.locator('#scenario-b-tenure').dispatchEvent('input');

    // Verify Recommendation banner identifies Scenario B as lower lifetime cost
    await expect(page.locator('#comparison-recommendation-title')).toContainText('Scenario B offers the lower lifetime borrowing cost');
    await expect(page.locator('#comparison-emi-diff-note')).toContainText('Scenario B requires');
    await expect(page.locator('#comparison-interest-diff-note')).toContainText('Scenario B reduces total borrowing cost');

    // Now invert: Make Scenario A cheaper (Scenario A rate: 6%)
    await page.locator('#scenario-a-rate').fill('6');
    await page.locator('#scenario-a-rate').dispatchEvent('input');

    await expect(page.locator('#comparison-recommendation-title')).toContainText('Scenario A offers the lower lifetime borrowing cost');
    await expect(page.locator('#comparison-emi-diff-note')).toContainText('Scenario A requires');
    await expect(page.locator('#comparison-interest-diff-note')).toContainText('Scenario A reduces total borrowing cost');
  });

  test('Copy Scenario A duplicates all inputs to Scenario B', async ({ page }) => {
    await page.click('#emi-compare-toggle');

    // Set distinctive inputs on Scenario A
    await page.locator('#scenario-a-amount').fill('250000');
    await page.locator('#scenario-a-rate').fill('9.2');
    await page.locator('#scenario-a-tenure').fill('12');
    await page.locator('#scenario-a-amount').dispatchEvent('input');
    await page.locator('#scenario-a-rate').dispatchEvent('input');
    await page.locator('#scenario-a-tenure').dispatchEvent('input');

    // Click "Copy Scenario A" button
    const copyBtn = page.locator('#scenario-b-copy');
    await copyBtn.click();

    // Verify Scenario B now matches Scenario A exactly
    await expect(page.locator('#scenario-b-amount')).toHaveValue('250000');
    await expect(page.locator('#scenario-b-rate')).toHaveValue('9.2');
    await expect(page.locator('#scenario-b-tenure')).toHaveValue('12');

    // Verify results match and summary reflects identical loans
    const aMonthly = await page.locator('#scenario-a-monthly').textContent();
    await expect(page.locator('#scenario-b-monthly')).toHaveText(aMonthly!);
    await expect(page.locator('#comparison-recommendation-title')).toContainText('same borrowing cost');
  });

  test('Reset functionality restores defaults for Scenario A and Scenario B independently', async ({ page }) => {
    await page.click('#emi-compare-toggle');

    // Modify both scenarios
    await page.locator('#scenario-a-amount').fill('500000');
    await page.locator('#scenario-a-rate').fill('12');
    await page.locator('#scenario-a-amount').dispatchEvent('input');
    await page.locator('#scenario-a-rate').dispatchEvent('input');

    await page.locator('#scenario-b-amount').fill('700000');
    await page.locator('#scenario-b-rate').fill('14');
    await page.locator('#scenario-b-amount').dispatchEvent('input');
    await page.locator('#scenario-b-rate').dispatchEvent('input');

    // Reset Scenario A
    await page.click('#scenario-a-reset');

    // Scenario A should be back to defaults
    await expect(page.locator('#scenario-a-amount')).toHaveValue('100000');
    await expect(page.locator('#scenario-a-rate')).toHaveValue('8.5');

    // Scenario B should NOT be affected by resetting Scenario A
    await expect(page.locator('#scenario-b-amount')).toHaveValue('700000');
    await expect(page.locator('#scenario-b-rate')).toHaveValue('14');

    // Reset Scenario B
    await page.click('#scenario-b-reset');
    await expect(page.locator('#scenario-b-amount')).toHaveValue('100000');
    await expect(page.locator('#scenario-b-rate')).toHaveValue('8');
  });

  test('Mobile responsive layout test (stacks vertically on small screens, side-by-side on desktop)', async ({ page }) => {
    await page.click('#emi-compare-toggle');

    // 1. Mobile Viewport (375x812)
    await page.setViewportSize({ width: 375, height: 812 });
    const scenABoxMobile = await page.locator('#scenario-a-card').boundingBox();
    const scenBBoxMobile = await page.locator('#scenario-b-card').boundingBox();

    expect(scenABoxMobile).not.toBeNull();
    expect(scenBBoxMobile).not.toBeNull();
    // On mobile, Scenario B is positioned below Scenario A (stacked vertically)
    expect(scenBBoxMobile!.y).toBeGreaterThanOrEqual(scenABoxMobile!.y + scenABoxMobile!.height - 10);

    // 2. Desktop Viewport (1280x800)
    await page.setViewportSize({ width: 1280, height: 800 });
    const scenABoxDesktop = await page.locator('#scenario-a-card').boundingBox();
    const scenBBoxDesktop = await page.locator('#scenario-b-card').boundingBox();

    expect(scenABoxDesktop).not.toBeNull();
    expect(scenBBoxDesktop).not.toBeNull();
    // On desktop (lg breakpoint), Scenario A and Scenario B are positioned side-by-side (same row Y position)
    expect(Math.abs(scenABoxDesktop!.y - scenBBoxDesktop!.y)).toBeLessThan(20);
    expect(scenBBoxDesktop!.x).toBeGreaterThan(scenABoxDesktop!.x);
  });
});
