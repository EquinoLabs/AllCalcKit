import { test, expect } from '@playwright/test';

test.describe('E2E — Interactive Calculator Functional Workflows', () => {
  test('Length Converter — Conversion, Unit Swap & Copy', async ({ page, context }) => {
    await page.goto('/units/length');

    const fromInput = page.locator('#val-from-length-&-distance');
    const toInput = page.locator('#val-to-length-&-distance');
    const fromSelect = page.locator('#unit-from-length-&-distance');
    const toSelect = page.locator('#unit-to-length-&-distance');
    const swapBtn = page.locator('#swap-btn-length-&-distance');
    const copyBtn = page.locator('#copy-btn-length-&-distance');

    await fromInput.fill('5');
    await fromSelect.selectOption('mi');
    await toSelect.selectOption('km');

    await expect(toInput).toHaveValue('8.04672');

    // Unit swap test
    await swapBtn.click();
    await expect(fromSelect).toHaveValue('km');
    await expect(toSelect).toHaveValue('mi');
    await expect(toInput).toHaveValue('3.106856');

    // Copy action test
    await copyBtn.click();
    await expect(copyBtn).toContainText('Copied!');
  });

  test('BMI Calculator — Metric vs Imperial unit toggle & calculation', async ({ page }) => {
    await page.goto('/health/bmi');

    const hInput = page.locator('#bmi-height');
    const wInput = page.locator('#bmi-weight');
    const bmiVal = page.locator('#bmi-val');
    const bmiCat = page.locator('#bmi-category');

    await hInput.fill('175');
    await wInput.fill('70');

    await expect(bmiVal).toHaveText('22.9');
    await expect(bmiCat).toContainText('Normal');

    // Toggle to Imperial
    await page.click('#unit-imperial');
    await expect(page.locator('#bmi-unit-h')).toHaveText('Height (in)');
    await expect(page.locator('#bmi-unit-w')).toHaveText('Weight (lbs)');
  });

  test('Loan / EMI Calculator — Input and slider synchronization', async ({ page }) => {
    await page.goto('/finance/loan-emi');

    const amtInp = page.locator('#emi-amount');
    const rateInp = page.locator('#emi-rate');
    const tenureInp = page.locator('#emi-tenure');
    const monthlyRes = page.locator('#emi-monthly-result');

    await amtInp.fill('100000');
    await rateInp.fill('8.5');
    await tenureInp.fill('5');

    await expect(monthlyRes).toContainText('2,052');
  });

  test('Tip & Bill Splitter — Per-person calculation', async ({ page }) => {
    await page.goto('/finance/tip-split');

    const billInp = page.locator('#tip-bill');
    const pctInp = page.locator('#tip-pct');
    const peopleInp = page.locator('#tip-people');
    const perPerson = page.locator('#tip-per-person');

    await billInp.fill('120');
    await pctInp.fill('15');
    await peopleInp.fill('3');

    await expect(perPerson).toContainText('46.00');
  });

  test('Word & Character Counter — Real-time typing analysis', async ({ page }) => {
    await page.goto('/text/word-counter');

    const textarea = page.locator('#word-counter-input');
    await textarea.fill('Testing real time word count speed.');

    await expect(page.locator('#cnt-words')).toHaveText('6');
    await expect(page.locator('#cnt-sentences')).toHaveText('1');
  });
});
