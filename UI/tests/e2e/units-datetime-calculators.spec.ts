import { test, expect } from '@playwright/test';

test.describe('E2E — Remaining Unit Converters & Date-Time Functional Workflows', () => {

  // 1. Weight & Mass Converter (/units/weight)
  test.describe('Weight & Mass Converter (/units/weight)', () => {
    test('converts pounds to kilograms and handles swap', async ({ page }) => {
      await page.goto('/units/weight');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);
      const swapBtn = page.locator('button[aria-label="Swap units"]').first();

      await fromSelect.selectOption('lb');
      await toSelect.selectOption('kg');
      await fromInput.fill('150');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('68.0388');

      // Test Swap
      await swapBtn.click();
      await expect(fromSelect).toHaveValue('kg');
      await expect(toSelect).toHaveValue('lb');
      await expect(toInput).toHaveValue('330.693663');
    });
  });

  // 2. Temperature Converter (/units/temperature)
  test.describe('Temperature Converter (/units/temperature)', () => {
    test('converts Celsius to Fahrenheit, Kelvin, and parity point -40', async ({ page }) => {
      await page.goto('/units/temperature');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      // 0 °C = 32 °F
      await fromSelect.selectOption('c');
      await toSelect.selectOption('f');
      await fromInput.fill('0');
      await fromInput.dispatchEvent('input');
      await expect(toInput).toHaveValue('32');

      // 100 °C = 212 °F
      await fromInput.fill('100');
      await fromInput.dispatchEvent('input');
      await expect(toInput).toHaveValue('212');

      // -40 parity point
      await fromInput.fill('-40');
      await fromInput.dispatchEvent('input');
      await expect(toInput).toHaveValue('-40');

      // Celsius to Kelvin
      await toSelect.selectOption('k');
      await fromInput.fill('0');
      await fromInput.dispatchEvent('input');
      await expect(toInput).toHaveValue('273.15');
    });
  });

  // 3. Volume Converter (/units/volume)
  test.describe('Volume Converter (/units/volume)', () => {
    test('converts US Gallons to Liters and Milliliters', async ({ page }) => {
      await page.goto('/units/volume');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('gal');
      await toSelect.selectOption('l');
      await fromInput.fill('1');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('3.78541');

      // 1.5 Liters to mL
      await fromSelect.selectOption('l');
      await toSelect.selectOption('ml');
      await fromInput.fill('1.5');
      await fromInput.dispatchEvent('input');
      await expect(toInput).toHaveValue('1500');
    });
  });

  // 4. Area Converter (/units/area)
  test.describe('Area Converter (/units/area)', () => {
    test('converts Square Feet to Square Meters', async ({ page }) => {
      await page.goto('/units/area');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('sqft');
      await toSelect.selectOption('sqm');
      await fromInput.fill('1500');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('139.3545');
    });
  });

  // 5. Speed Converter (/units/speed)
  test.describe('Speed Converter (/units/speed)', () => {
    test('converts Miles per hour (mph) to Kilometers per hour (km/h)', async ({ page }) => {
      await page.goto('/units/speed');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('mph');
      await toSelect.selectOption('kmh');
      await fromInput.fill('60');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('96.56064');
    });
  });

  // 6. Data Storage Converter (/units/data)
  test.describe('Data Storage Converter (/units/data)', () => {
    test('converts Gigabytes (GB) to Megabytes (MB)', async ({ page }) => {
      await page.goto('/units/data');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('gb');
      await toSelect.selectOption('mb');
      await fromInput.fill('2');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('2048');
    });
  });

  // 7. Pressure Converter (/units/pressure)
  test.describe('Pressure Converter (/units/pressure)', () => {
    test('converts PSI to Bar', async ({ page }) => {
      await page.goto('/units/pressure');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('psi');
      await toSelect.selectOption('bar');
      await fromInput.fill('32');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('2.206323');
    });
  });

  // 8. Energy Converter (/units/energy)
  test.describe('Energy Converter (/units/energy)', () => {
    test('converts Kilocalories (kcal) to Joules (J)', async ({ page }) => {
      await page.goto('/units/energy');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('kcal');
      await toSelect.selectOption('j');
      await fromInput.fill('100');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('418400');
    });
  });

  // 9. Time Unit Converter (/units/time-units)
  test.describe('Time Unit Converter (/units/time-units)', () => {
    test('converts Days to Hours', async ({ page }) => {
      await page.goto('/units/time-units');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('day');
      await toSelect.selectOption('hr');
      await fromInput.fill('7');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('168');
    });
  });

  // 10. Angle Converter (/units/angle)
  test.describe('Angle Converter (/units/angle)', () => {
    test('converts Degrees to Radians', async ({ page }) => {
      await page.goto('/units/angle');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('deg');
      await toSelect.selectOption('rad');
      await fromInput.fill('180');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('3.141593');
    });
  });

  // 11. Fuel Efficiency Converter (/units/fuel-efficiency)
  test.describe('Fuel Efficiency Converter (/units/fuel-efficiency)', () => {
    test('converts Miles per Gallon to km/L', async ({ page }) => {
      await page.goto('/units/fuel-efficiency');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('mpg_us');
      await toSelect.selectOption('kml');
      await fromInput.fill('25');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('10.6286');
    });
  });

  // 12. Cooking Measurements (/cooking/cooking-units)
  test.describe('Cooking Measurements (/cooking/cooking-units)', () => {
    test('converts Tablespoons to Teaspoons', async ({ page }) => {
      await page.goto('/cooking/cooking-units');

      const fromInput = page.locator('input[type="number"]').first();
      const toInput = page.locator('input[readonly]').first();
      const fromSelect = page.locator('select').first();
      const toSelect = page.locator('select').nth(1);

      await fromSelect.selectOption('tbsp');
      await toSelect.selectOption('tsp');
      await fromInput.fill('2');
      await fromInput.dispatchEvent('input');

      await expect(toInput).toHaveValue('6');
    });
  });

  // 13. Date Difference Calculator (/datetime/date-diff)
  test.describe('Date Difference Calculator (/datetime/date-diff)', () => {
    test('calculates exact day span between fixed calendar dates', async ({ page }) => {
      await page.goto('/datetime/date-diff');

      await page.locator('#dd-start').fill('2026-01-01');
      await page.locator('#dd-end').fill('2026-12-31');
      await page.locator('#dd-start').dispatchEvent('input');

      await expect(page.locator('#dd-result')).toHaveText('364 Days');
      await expect(page.locator('#dd-weeks')).toHaveText('52 Wks, 0 Days');
      await expect(page.locator('#dd-hours')).toHaveText('8,736 Hours');
    });
  });

  // 14. Date Add / Subtract (/datetime/date-add)
  test.describe('Date Add / Subtract Calculator (/datetime/date-add)', () => {
    test('adds 90 days to March 1, 2026', async ({ page }) => {
      await page.goto('/datetime/date-add');

      await page.locator('#da-start').fill('2026-03-01');
      await page.locator('#da-years').fill('0');
      await page.locator('#da-months').fill('0');
      await page.locator('#da-days').fill('90');
      await page.locator('#da-start').dispatchEvent('input');

      await expect(page.locator('#da-result')).toContainText('May 30, 2026');
    });
  });

  // 15. Unix Timestamp Converter (/datetime/unix-timestamp)
  test.describe('Unix Timestamp Converter (/datetime/unix-timestamp)', () => {
    test('converts 10-digit epoch timestamp to UTC date', async ({ page }) => {
      await page.goto('/datetime/unix-timestamp');

      await page.locator('#ts-input').fill('1700000000');
      await page.locator('#ts-input').dispatchEvent('input');

      await expect(page.locator('#ts-utc-val')).toContainText('Tue, 14 Nov 2023 22:13:20 GMT');
    });
  });
});
