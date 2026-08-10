import { test, expect } from '@playwright/test';

test.describe('E2E — Everyday, Cooking & Text Calculators Functional Workflows', () => {

  // 1. Recipe Batch & Ingredient Scaler
  test.describe('Recipe Scaler (/cooking/recipe-converter)', () => {
    test('scales initial ingredients proportionally to target servings', async ({ page }) => {
      await page.goto('/cooking/recipe-converter');

      await expect(page.locator('#recipe-scale-badge')).toContainText('Multiplier: 2.50x');

      const rows = page.locator('.ingredient-row');
      await expect(rows).toHaveCount(2);

      // Row 1: 2 cups -> 5 cups
      await expect(rows.nth(0).locator('.ing-result')).toHaveText('5 cups');
      // Row 2: 300 grams -> 750 grams
      await expect(rows.nth(1).locator('.ing-result')).toHaveText('750 grams');
    });

    test('adds new ingredient row and participates in scaling', async ({ page }) => {
      await page.goto('/cooking/recipe-converter');

      await page.click('#add-ingredient-btn');

      const rows = page.locator('.ingredient-row');
      await expect(rows).toHaveCount(3);

      const newRow = rows.nth(2);
      await newRow.locator('.ing-name').fill('Vanilla Extract');
      await newRow.locator('.ing-qty').fill('1');
      await newRow.locator('.ing-unit').fill('tsp');
      await newRow.locator('.ing-qty').dispatchEvent('input');

      await expect(newRow.locator('.ing-result')).toHaveText('2.5 tsp');
    });

    test('changing target servings updates multiplier badge and all rows', async ({ page }) => {
      await page.goto('/cooking/recipe-converter');

      await page.locator('#recipe-orig-servings').fill('4');
      await page.locator('#recipe-target-servings').fill('20');
      await page.locator('#recipe-target-servings').dispatchEvent('input');

      await expect(page.locator('#recipe-scale-badge')).toContainText('Multiplier: 5.00x');

      const rows = page.locator('.ingredient-row');
      await expect(rows.nth(0).locator('.ing-result')).toHaveText('10 cups');
      await expect(rows.nth(1).locator('.ing-result')).toHaveText('1,500 grams');
    });
  });

  // 2. Fuel Trip Cost Calculator
  test.describe('Fuel Trip Cost Calculator (/everyday/fuel-cost)', () => {
    test('calculates fuel requirements and total trip cost', async ({ page }) => {
      await page.goto('/everyday/fuel-cost');

      await page.locator('#fuel-dist').fill('350');
      await page.locator('#fuel-eff').fill('15');
      await page.locator('#fuel-price').fill('1.50');
      await page.locator('#fuel-dist').dispatchEvent('input');

      await expect(page.locator('#fuel-cost-val')).toContainText('35.00');
      await expect(page.locator('#fuel-vol-val')).toHaveText('23.3 Units');
      await expect(page.locator('#fuel-unit-cost')).toContainText('0.10');
    });

    test('recalculates on updated mileage and price inputs', async ({ page }) => {
      await page.goto('/everyday/fuel-cost');

      await page.locator('#fuel-dist').fill('600');
      await page.locator('#fuel-eff').fill('20');
      await page.locator('#fuel-price').fill('2.00');
      await page.locator('#fuel-dist').dispatchEvent('input');

      await expect(page.locator('#fuel-cost-val')).toContainText('60.00');
      await expect(page.locator('#fuel-vol-val')).toHaveText('30.0 Units');
    });

    test('handles zero distance safely without NaN', async ({ page }) => {
      await page.goto('/everyday/fuel-cost');

      await page.locator('#fuel-dist').fill('0');
      await page.locator('#fuel-dist').dispatchEvent('input');

      await expect(page.locator('#fuel-cost-val')).toContainText('0.00');
      await expect(page.locator('#fuel-vol-val')).toHaveText('0.0 Units');
    });
  });

  // 3. Electricity Bill Estimator
  test.describe('Electricity Bill Estimator (/everyday/electricity-bill)', () => {
    test('calculates daily power consumption and monthly electricity cost', async ({ page }) => {
      await page.goto('/everyday/electricity-bill');

      await page.locator('#elec-watts').fill('1500');
      await page.locator('#elec-hours').fill('8');
      await page.locator('#elec-rate').fill('0.15');
      await page.locator('#elec-watts').dispatchEvent('input');

      await expect(page.locator('#elec-kwh-day')).toHaveText('12.00 kWh');
      await expect(page.locator('#elec-month-cost')).toContainText('54.00');
      await expect(page.locator('#elec-year-cost')).toContainText('657.00');
    });

    test('recalculates when changing appliance wattage and daily usage', async ({ page }) => {
      await page.goto('/everyday/electricity-bill');

      await page.locator('#elec-watts').fill('2000');
      await page.locator('#elec-hours').fill('5');
      await page.locator('#elec-rate').fill('0.15');
      await page.locator('#elec-watts').dispatchEvent('input');

      await expect(page.locator('#elec-kwh-day')).toHaveText('10.00 kWh');
      await expect(page.locator('#elec-month-cost')).toContainText('45.00');
    });

    test('handles zero wattage input without NaN', async ({ page }) => {
      await page.goto('/everyday/electricity-bill');

      await page.locator('#elec-watts').fill('0');
      await page.locator('#elec-watts').dispatchEvent('input');

      await expect(page.locator('#elec-month-cost')).toContainText('0.00');
      await expect(page.locator('#elec-kwh-day')).toHaveText('0.00 kWh');
    });
  });

  // 4. Color Code Converter
  test.describe('Color Code Converter (/text/color-converter)', () => {
    test('converts HEX to RGB, HSL, and updates preview box', async ({ page }) => {
      await page.goto('/text/color-converter');

      await page.locator('#color-hex').fill('#FF0000');
      await page.locator('#color-hex').dispatchEvent('input');

      await expect(page.locator('#color-rgb')).toHaveValue('rgb(255, 0, 0)');
      await expect(page.locator('#color-hsl')).toHaveValue('hsl(0, 100%, 50%)');
    });

    test('supports lowercase HEX input correctly', async ({ page }) => {
      await page.goto('/text/color-converter');

      await page.locator('#color-hex').fill('#00ff00');
      await page.locator('#color-hex').dispatchEvent('input');

      await expect(page.locator('#color-rgb')).toHaveValue('rgb(0, 255, 0)');
      await expect(page.locator('#color-hsl')).toHaveValue('hsl(120, 100%, 50%)');
    });

    test('color picker input updates HEX and RGB values', async ({ page }) => {
      await page.goto('/text/color-converter');

      await page.locator('#color-picker').fill('#0000ff');
      await page.locator('#color-picker').dispatchEvent('input');

      await expect(page.locator('#color-hex')).toHaveValue('#0000FF');
      await expect(page.locator('#color-rgb')).toHaveValue('rgb(0, 0, 255)');
    });
  });

  // 5. Text Case Converter
  test.describe('Text Case Converter (/text/case-converter)', () => {
    test('transforms text to UPPERCASE and lowercase', async ({ page }) => {
      await page.goto('/text/case-converter');

      const textarea = page.locator('#case-input');
      await textarea.fill('hello world');

      // UPPERCASE
      await page.click('button[data-case="upper"]');
      await expect(textarea).toHaveValue('HELLO WORLD');

      // lowercase
      await page.click('button[data-case="lower"]');
      await expect(textarea).toHaveValue('hello world');
    });

    test('transforms text to Title Case, camelCase, snake_case, and kebab-case', async ({ page }) => {
      await page.goto('/text/case-converter');

      const textarea = page.locator('#case-input');

      // Title Case
      await textarea.fill('hello world test');
      await page.click('button[data-case="title"]');
      await expect(textarea).toHaveValue('Hello World Test');

      // camelCase
      await textarea.fill('hello world test');
      await page.click('button[data-case="camel"]');
      await expect(textarea).toHaveValue('helloWorldTest');

      // snake_case
      await textarea.fill('hello world test');
      await page.click('button[data-case="snake"]');
      await expect(textarea).toHaveValue('hello_world_test');

      // kebab-case
      await textarea.fill('hello world test');
      await page.click('button[data-case="kebab"]');
      await expect(textarea).toHaveValue('hello-world-test');
    });
  });
});
