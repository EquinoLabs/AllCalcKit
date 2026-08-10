import { test, expect } from '@playwright/test';

test.describe('E2E — Math & Health Calculators Functional Workflows', () => {

  // 1. Percentage Calculator Suite
  test.describe('Percentage Calculator (/math/percentage)', () => {
    test('Mode 1: Calculates percentage value (15% of 200 = 30)', async ({ page }) => {
      await page.goto('/math/percentage');

      await page.locator('#p1-pct').fill('15');
      await page.locator('#p1-total').fill('200');
      await page.locator('#p1-pct').dispatchEvent('input');

      await expect(page.locator('#p1-result')).toHaveText('30');
      await expect(page.locator('#p1-label')).toContainText('What is 15% of 200?');
    });

    test('Mode 2: Calculates percentage share and handles 0 total safely', async ({ page }) => {
      await page.goto('/math/percentage');

      await page.locator('#p2-part').fill('45');
      await page.locator('#p2-total').fill('150');
      await page.locator('#p2-part').dispatchEvent('input');

      await expect(page.locator('#p2-result')).toHaveText('30%');

      // Divide by zero protection
      await page.locator('#p2-total').fill('0');
      await page.locator('#p2-total').dispatchEvent('input');
      await expect(page.locator('#p2-result')).toHaveText('N/A');
    });

    test('Mode 3: Calculates percentage increase and decrease', async ({ page }) => {
      await page.goto('/math/percentage');

      // Increase (80 to 100 = +25%)
      await page.locator('#p3-v1').fill('80');
      await page.locator('#p3-v2').fill('100');
      await page.locator('#p3-v1').dispatchEvent('input');
      await expect(page.locator('#p3-result')).toHaveText('+25%');

      // Decrease (200 to 150 = -25%)
      await page.locator('#p3-v1').fill('200');
      await page.locator('#p3-v2').fill('150');
      await page.locator('#p3-v1').dispatchEvent('input');
      await expect(page.locator('#p3-result')).toHaveText('-25%');

      // Zero initial value
      await page.locator('#p3-v1').fill('0');
      await page.locator('#p3-v1').dispatchEvent('input');
      await expect(page.locator('#p3-result')).toHaveText('N/A');
    });
  });

  // 2. Number Base System Converter
  test.describe('Number Base System Converter (/math/number-base)', () => {
    test('Decimal input synchronizes Binary, Hexadecimal, and Octal', async ({ page }) => {
      await page.goto('/math/number-base');

      await page.locator('#base-dec').fill('255');
      await page.locator('#base-dec').dispatchEvent('input');

      await expect(page.locator('#base-bin')).toHaveValue('11111111');
      await expect(page.locator('#base-hex')).toHaveValue('FF');
      await expect(page.locator('#base-oct')).toHaveValue('377');
    });

    test('Hexadecimal input synchronizes Decimal, Binary, and Octal', async ({ page }) => {
      await page.goto('/math/number-base');

      await page.locator('#base-hex').fill('1A');
      await page.locator('#base-hex').dispatchEvent('input');

      await expect(page.locator('#base-dec')).toHaveValue('26');
      await expect(page.locator('#base-bin')).toHaveValue('11010');
      await expect(page.locator('#base-oct')).toHaveValue('32');
    });

    test('Lowercase hexadecimal input works seamlessly', async ({ page }) => {
      await page.goto('/math/number-base');

      await page.locator('#base-hex').fill('ff');
      await page.locator('#base-hex').dispatchEvent('input');

      await expect(page.locator('#base-dec')).toHaveValue('255');
      await expect(page.locator('#base-bin')).toHaveValue('11111111');
    });

    test('Binary input synchronizes all other bases', async ({ page }) => {
      await page.goto('/math/number-base');

      await page.locator('#base-bin').fill('1010');
      await page.locator('#base-bin').dispatchEvent('input');

      await expect(page.locator('#base-dec')).toHaveValue('10');
      await expect(page.locator('#base-hex')).toHaveValue('A');
      await expect(page.locator('#base-oct')).toHaveValue('12');
    });
  });

  // 3. Fraction ↔ Decimal Converter
  test.describe('Fraction ↔ Decimal Converter (/math/fraction-decimal)', () => {
    test('Decimal to simplified fraction conversion (0.75 -> 3/4)', async ({ page }) => {
      await page.goto('/math/fraction-decimal');

      await page.locator('#frac-dec').fill('0.75');
      await page.locator('#frac-dec').dispatchEvent('input');

      await expect(page.locator('#frac-result')).toHaveText('3 / 4');
      await expect(page.locator('#frac-num')).toHaveValue('3');
      await expect(page.locator('#frac-den')).toHaveValue('4');
      await expect(page.locator('#frac-dec-val')).toHaveText('0.75');
    });

    test('Improper fraction to decimal and mixed number (7/4 -> 1.75 and 1 3/4)', async ({ page }) => {
      await page.goto('/math/fraction-decimal');

      await page.locator('#frac-num').fill('7');
      await page.locator('#frac-den').fill('4');
      await page.locator('#frac-num').dispatchEvent('input');

      await expect(page.locator('#frac-dec')).toHaveValue('1.75');
      await expect(page.locator('#frac-mixed')).toHaveText('1 3/4');
      await expect(page.locator('#frac-result')).toHaveText('7 / 4');
    });

    test('Denominator zero input does not crash calculation', async ({ page }) => {
      await page.goto('/math/fraction-decimal');

      await page.locator('#frac-den').fill('0');
      await page.locator('#frac-den').dispatchEvent('input');

      // The UI remains stable and interactive
      await expect(page.locator('#frac-result')).toBeVisible();
    });
  });

  // 4. Prime Number Checker
  test.describe('Prime Number Checker (/math/prime-checker)', () => {
    test('identifies prime numbers correctly (17)', async ({ page }) => {
      await page.goto('/math/prime-checker');

      await page.locator('#prime-input').fill('17');
      await page.locator('#prime-input').dispatchEvent('input');

      await expect(page.locator('#prime-badge')).toContainText('17 is a PRIME Number');
      await expect(page.locator('#prime-next')).toHaveText('19');
    });

    test('identifies composite numbers and shows factor decomposition (12)', async ({ page }) => {
      await page.goto('/math/prime-checker');

      await page.locator('#prime-input').fill('12');
      await page.locator('#prime-input').dispatchEvent('input');

      await expect(page.locator('#prime-badge')).toContainText('12 is COMPOSITE');
      await expect(page.locator('#prime-factors')).toHaveText('2 × 2 × 3');
      await expect(page.locator('#prime-next')).toHaveText('13');
    });

    test('verifies large prime number (104,729)', async ({ page }) => {
      await page.goto('/math/prime-checker');

      await page.locator('#prime-input').fill('104729');
      await page.locator('#prime-input').dispatchEvent('input');

      await expect(page.locator('#prime-badge')).toContainText('104729 is a PRIME Number');
    });

    test('handles negative/zero input safely with helper validation message', async ({ page }) => {
      await page.goto('/math/prime-checker');

      await page.locator('#prime-input').fill('-5');
      await page.locator('#prime-input').dispatchEvent('input');

      await expect(page.locator('#prime-badge')).toHaveText('Enter a positive integer');
    });
  });

  // 5. BMR (Basal Metabolic Rate) Calculator
  test.describe('BMR Calculator (/health/bmr)', () => {
    test('calculates male BMR baseline (28 yrs, 175 cm, 70 kg -> 1,659 kcal/day)', async ({ page }) => {
      await page.goto('/health/bmr');

      await page.locator('#bmr-age').fill('28');
      await page.locator('#bmr-height').fill('175');
      await page.locator('#bmr-weight').fill('70');
      await page.locator('#bmr-age').dispatchEvent('input');

      await expect(page.locator('#bmr-result')).toContainText('1,659');
    });

    test('toggling gender to Female recalculates with offset (1,493 kcal/day)', async ({ page }) => {
      await page.goto('/health/bmr');

      await page.locator('#bmr-age').fill('28');
      await page.locator('#bmr-height').fill('175');
      await page.locator('#bmr-weight').fill('70');

      // Click Female
      await page.click('#bmr-gender-f');
      await expect(page.locator('#bmr-result')).toContainText('1,493');

      // Click Male back
      await page.click('#bmr-gender-m');
      await expect(page.locator('#bmr-result')).toContainText('1,659');
    });
  });

  // 6. TDEE (Daily Calorie Intake) Calculator
  test.describe('TDEE Calculator (/health/tdee)', () => {
    test('calculates Sedentary maintenance and target calories', async ({ page }) => {
      await page.goto('/health/tdee');

      await page.locator('#tdee-age').fill('25');
      await page.locator('#tdee-height').fill('175');
      await page.locator('#tdee-weight').fill('70');
      await page.locator('#tdee-activity').selectOption('1.2');
      await page.locator('#tdee-age').dispatchEvent('input');

      await expect(page.locator('#tdee-result')).toContainText('2,009');
      await expect(page.locator('#tdee-loss')).toHaveText('1,509 kcal');
      await expect(page.locator('#tdee-gain')).toHaveText('2,309 kcal');
    });

    test('changing activity level to Moderately Active (1.55) increases maintenance calories', async ({ page }) => {
      await page.goto('/health/tdee');

      await page.locator('#tdee-age').fill('25');
      await page.locator('#tdee-height').fill('175');
      await page.locator('#tdee-weight').fill('70');
      await page.locator('#tdee-activity').selectOption('1.55');
      await page.locator('#tdee-age').dispatchEvent('input');

      await expect(page.locator('#tdee-result')).toContainText('2,594');
      await expect(page.locator('#tdee-loss')).toHaveText('2,094 kcal');
      await expect(page.locator('#tdee-gain')).toHaveText('2,894 kcal');
    });
  });

  // 7. Daily Water Intake Calculator
  test.describe('Daily Water Intake Calculator (/health/water-intake)', () => {
    test('calculates baseline daily hydration target', async ({ page }) => {
      await page.goto('/health/water-intake');

      await page.locator('#water-weight').fill('70');
      await page.locator('#water-exercise').fill('30');
      await page.locator('#water-climate').selectOption('0');
      await page.locator('#water-weight').dispatchEvent('input');

      await expect(page.locator('#water-liters')).toContainText('2.80');
      await expect(page.locator('#water-glasses')).toHaveText('11 Glasses');
      await expect(page.locator('#water-oz')).toHaveText('95 fl oz');
    });

    test('climate selection (Hot / Humid) increases recommended water intake', async ({ page }) => {
      await page.goto('/health/water-intake');

      await page.locator('#water-weight').fill('70');
      await page.locator('#water-exercise').fill('30');
      await page.locator('#water-climate').selectOption('0.5');
      await page.locator('#water-climate').dispatchEvent('input');

      await expect(page.locator('#water-liters')).toContainText('3.30');
      await expect(page.locator('#water-glasses')).toHaveText('13 Glasses');
      await expect(page.locator('#water-oz')).toHaveText('112 fl oz');
    });
  });

  // 8. Age & Birthday Calculator
  test.describe('Age & Birthday Calculator (/health/age-calc)', () => {
    test('calculates exact age for fixed DOB and target date', async ({ page }) => {
      await page.goto('/health/age-calc');

      await page.locator('#age-dob').fill('2000-01-01');
      await page.locator('#age-target-date').fill('2026-01-01');
      await page.locator('#age-dob').dispatchEvent('input');

      await expect(page.locator('#age-main-result')).toHaveText('26 Years, 0 Months, 0 Days');
    });

    test('calculates leap year birthday accurately', async ({ page }) => {
      await page.goto('/health/age-calc');

      await page.locator('#age-dob').fill('2000-02-29');
      await page.locator('#age-target-date').fill('2024-02-29');
      await page.locator('#age-dob').dispatchEvent('input');

      await expect(page.locator('#age-main-result')).toHaveText('24 Years, 0 Months, 0 Days');
    });

    test('handles future date of birth with invalid date validation message', async ({ page }) => {
      await page.goto('/health/age-calc');

      await page.locator('#age-dob').fill('2030-01-01');
      await page.locator('#age-target-date').fill('2026-01-01');
      await page.locator('#age-dob').dispatchEvent('input');

      await expect(page.locator('#age-main-result')).toHaveText('Invalid Date Selection');
    });
  });
});
