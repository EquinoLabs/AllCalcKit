import { test, expect } from '@playwright/test';

test.describe('E2E — Financial Calculators Functional Workflows', () => {

  // 1. SIP Investment Calculator
  test.describe('SIP Investment Calculator (/finance/sip)', () => {
    test('calculates investment returns and updates value cards', async ({ page }) => {
      await page.goto('/finance/sip');

      const monthlyInp = page.locator('#sip-monthly');
      const rateInp = page.locator('#sip-rate');
      const yearsInp = page.locator('#sip-years');

      const totalVal = page.locator('#sip-total-val');
      const investedVal = page.locator('#sip-invested');
      const returnsVal = page.locator('#sip-returns');

      await monthlyInp.fill('5000');
      await rateInp.fill('12');
      await yearsInp.fill('10');

      // Trigger change/input event
      await monthlyInp.dispatchEvent('input');

      await expect(totalVal).toContainText('1,161,695');
      await expect(investedVal).toContainText('600,000');
      await expect(returnsVal).toContainText('561,695');
    });

    test('slider interactions update display badges and recalculate', async ({ page }) => {
      await page.goto('/finance/sip');

      const monthlyInp = page.locator('#sip-monthly');
      const monthlyValBadge = page.locator('#sip-monthly-val');
      const totalVal = page.locator('#sip-total-val');

      await monthlyInp.fill('10000');
      await monthlyInp.dispatchEvent('input');

      await expect(monthlyValBadge).toHaveText('10,000');
      await expect(totalVal).toContainText('2,323,391');
    });

    test('boundary minimum contribution and duration ($500 for 1 year)', async ({ page }) => {
      await page.goto('/finance/sip');

      await page.locator('#sip-monthly').fill('500');
      await page.locator('#sip-monthly').dispatchEvent('input');
      await page.locator('#sip-years').fill('1');
      await page.locator('#sip-years').dispatchEvent('input');

      await expect(page.locator('#sip-invested')).toContainText('6,000');
      await expect(page.locator('#sip-total-val')).toContainText('6,405');
    });
  });

  // 2. FD & RD Calculator
  test.describe('FD & RD Calculator (/finance/fd-rd)', () => {
    test('calculates Fixed Deposit (FD) quarterly compounded returns', async ({ page }) => {
      await page.goto('/finance/fd-rd');

      const amtInp = page.locator('#fdrd-amt');
      const rateInp = page.locator('#fdrd-rate');
      const yearsInp = page.locator('#fdrd-years');

      await amtInp.fill('50000');
      await rateInp.fill('7.5');
      await yearsInp.fill('3');
      await amtInp.dispatchEvent('input');

      await expect(page.locator('#fdrd-maturity')).toContainText('62,486');
      await expect(page.locator('#fdrd-invested')).toContainText('50,000');
      await expect(page.locator('#fdrd-interest')).toContainText('12,486');
    });

    test('switches to Recurring Deposit (RD) mode and verifies label and math', async ({ page }) => {
      await page.goto('/finance/fd-rd');

      const btnRd = page.locator('#fdrd-mode-rd');
      const labelAmt = page.locator('#fdrd-label-amt');
      const amtInp = page.locator('#fdrd-amt');
      const rateInp = page.locator('#fdrd-rate');
      const yearsInp = page.locator('#fdrd-years');

      await btnRd.click();
      await expect(labelAmt).toHaveText('Monthly Deposit Amount');

      await amtInp.fill('5000');
      await rateInp.fill('7.5');
      await yearsInp.fill('3');
      await amtInp.dispatchEvent('input');

      await expect(page.locator('#fdrd-maturity')).toContainText('202,265');
      await expect(page.locator('#fdrd-invested')).toContainText('180,000');
      await expect(page.locator('#fdrd-interest')).toContainText('22,265');
    });

    test('mode toggle switches between FD and RD seamlessly', async ({ page }) => {
      await page.goto('/finance/fd-rd');

      await page.click('#fdrd-mode-rd');
      await expect(page.locator('#fdrd-label-amt')).toHaveText('Monthly Deposit Amount');

      await page.click('#fdrd-mode-fd');
      await expect(page.locator('#fdrd-label-amt')).toHaveText('Total Deposit Amount');
    });
  });

  // 3. Compound Interest Calculator
  test.describe('Compound Interest Calculator (/finance/compound-interest)', () => {
    test('calculates monthly compounding final balance and interest', async ({ page }) => {
      await page.goto('/finance/compound-interest');

      await page.locator('#ci-principal').fill('10000');
      await page.locator('#ci-rate').fill('7');
      await page.locator('#ci-years').fill('5');
      await page.locator('#ci-freq').selectOption('12');
      await page.locator('#ci-principal').dispatchEvent('input');

      await expect(page.locator('#ci-balance-val')).toContainText('14,176');
      await expect(page.locator('#ci-principal-val')).toContainText('10,000');
      await expect(page.locator('#ci-interest-val')).toContainText('4,176');
    });

    test('changing compounding frequency to Annual updates final balance', async ({ page }) => {
      await page.goto('/finance/compound-interest');

      await page.locator('#ci-principal').fill('10000');
      await page.locator('#ci-rate').fill('7');
      await page.locator('#ci-years').fill('5');
      await page.locator('#ci-freq').selectOption('1');
      await page.locator('#ci-principal').dispatchEvent('input');

      await expect(page.locator('#ci-balance-val')).toContainText('14,026');
      await expect(page.locator('#ci-interest-val')).toContainText('4,026');
    });
  });

  // 4. GST & Sales Tax Calculator
  test.describe('GST & Sales Tax Calculator (/finance/tax-gst)', () => {
    test('Tax Exclusive (+ Add Tax) mode with 18% preset', async ({ page }) => {
      await page.goto('/finance/tax-gst');

      await page.locator('#tax-amount').fill('1000');
      await page.click('button[data-tax="18"]');

      await expect(page.locator('#tax-total-val')).toContainText('1,180.00');
      await expect(page.locator('#tax-net-val')).toContainText('1,000.00');
      await expect(page.locator('#tax-tax-val')).toContainText('180.00');
    });

    test('Tax Exclusive with 5% preset button', async ({ page }) => {
      await page.goto('/finance/tax-gst');

      await page.locator('#tax-amount').fill('1000');
      await page.click('button[data-tax="5"]');

      await expect(page.locator('#tax-total-val')).toContainText('1,050.00');
      await expect(page.locator('#tax-tax-val')).toContainText('50.00');
    });

    test('Tax Inclusive (- Extract Tax) mode calculation', async ({ page }) => {
      await page.goto('/finance/tax-gst');

      await page.click('#tax-mode-sub');
      await page.locator('#tax-amount').fill('1000');
      await page.click('button[data-tax="18"]');

      await expect(page.locator('#tax-total-val')).toContainText('1,000.00');
      await expect(page.locator('#tax-net-val')).toContainText('847.46');
      await expect(page.locator('#tax-tax-val')).toContainText('152.54');
    });
  });

  // 5. Discount Calculator
  test.describe('Discount Calculator (/finance/discount)', () => {
    test('calculates final price and savings with numeric input', async ({ page }) => {
      await page.goto('/finance/discount');

      await page.locator('#disc-price').fill('250');
      await page.locator('#disc-pct-input').fill('25');
      await page.locator('#disc-price').dispatchEvent('input');

      await expect(page.locator('#disc-final-price')).toContainText('187.50');
      await expect(page.locator('#disc-savings')).toContainText('62.50');
      await expect(page.locator('#disc-orig')).toContainText('250.00');
    });

    test('preset buttons (50% OFF) update percentage and prices', async ({ page }) => {
      await page.goto('/finance/discount');

      await page.locator('#disc-price').fill('200');
      await page.click('button[data-disc="50"]');

      await expect(page.locator('#disc-final-price')).toContainText('100.00');
      await expect(page.locator('#disc-savings')).toContainText('100.00');
    });

    test('decimal price and preset discount ($49.99 @ 33% OFF)', async ({ page }) => {
      await page.goto('/finance/discount');

      await page.locator('#disc-price').fill('49.99');
      await page.click('button[data-disc="33"]');

      await expect(page.locator('#disc-final-price')).toContainText('33.49');
      await expect(page.locator('#disc-savings')).toContainText('16.50');
    });
  });

  // 6. Currency Converter
  test.describe('Currency Converter (/finance/currency)', () => {
    test.beforeEach(async ({ page }) => {
      // Mock exchange rate API to ensure 100% deterministic and offline-resilient tests
      await page.route('**/latest/USD', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            result: 'success',
            rates: {
              USD: 1.0,
              EUR: 0.92,
              GBP: 0.78,
              INR: 83.85,
              JPY: 147.2,
              TZS: 2680.0
            }
          })
        });
      });
    });

    test('converts 100 USD to EUR', async ({ page }) => {
      await page.goto('/finance/currency');

      await page.locator('#curr-amount').fill('100');
      await page.locator('#curr-from').selectOption('USD');
      await page.locator('#curr-to').selectOption('EUR');
      await page.locator('#curr-amount').dispatchEvent('input');

      await expect(page.locator('#curr-result')).toHaveValue('92.00');
      await expect(page.locator('#curr-rate-info')).toContainText('1 USD = 0.9200 EUR');
    });

    test('currency swap button exchanges currencies and updates conversion', async ({ page }) => {
      await page.goto('/finance/currency');

      await page.locator('#curr-amount').fill('100');
      await page.locator('#curr-from').selectOption('USD');
      await page.locator('#curr-to').selectOption('EUR');
      await page.locator('#curr-amount').dispatchEvent('input');
      await expect(page.locator('#curr-result')).toHaveValue('92.00');

      // Click swap button
      await page.click('#curr-swap-btn');

      await expect(page.locator('#curr-from')).toHaveValue('EUR');
      await expect(page.locator('#curr-to')).toHaveValue('USD');
      await expect(page.locator('#curr-result')).toHaveValue('108.70');
    });

    test('popular pair preset button (USD->INR)', async ({ page }) => {
      await page.goto('/finance/currency');

      await page.locator('#curr-amount').fill('100');
      await page.click('button[data-pair="USD,INR"]');

      await expect(page.locator('#curr-from')).toHaveValue('USD');
      await expect(page.locator('#curr-to')).toHaveValue('INR');
      await expect(page.locator('#curr-result')).toHaveValue('8,385.00');
    });
  });

  // 7. Rent vs. Buy Decision Engine
  test.describe('Rent vs. Buy Decision Engine (/finance/rent-vs-buy)', () => {
    test('renders verdict hero, 3 summary cards, and manages table expansion state', async ({ page }) => {
      await page.goto('/finance/rent-vs-buy');

      // Hero banner elements
      await expect(page.locator('#rvb-verdict-card')).toBeVisible();
      await expect(page.locator('#rvb-badge')).toBeVisible();
      await expect(page.locator('#rvb-headline')).toBeVisible();
      await expect(page.locator('#rvb-subheadline')).toBeVisible();
      await expect(page.locator('#rvb-share-btn')).toBeVisible();

      // 3 Supporting Metric Cards
      await expect(page.locator('#rvb-monthly-mortgage')).toBeVisible();
      await expect(page.locator('#rvb-monthly-rent-display')).toBeVisible();
      await expect(page.locator('#rvb-breakeven-pill')).toBeVisible();
      await expect(page.locator('#rvb-net-rent')).toBeVisible();
      await expect(page.locator('#rvb-tot-rent')).toBeVisible();
      await expect(page.locator('#rvb-net-buy')).toBeVisible();
      await expect(page.locator('#rvb-tot-buy-outflows')).toBeVisible();

      // Table is collapsed by default
      const tableWrapper = page.locator('#rvb-table-wrapper');
      await expect(tableWrapper).toHaveClass(/hidden/);

      // Toggle table to expand
      await page.click('#rvb-table-toggle');
      await expect(tableWrapper).not.toHaveClass(/hidden/);
      await expect(page.locator('#rvb-table-body tr')).toHaveCount(30);

      // Toggle table to collapse again
      await page.click('#rvb-table-toggle');
      await expect(tableWrapper).toHaveClass(/hidden/);

      // Explain Calculation is collapsed by default
      const details = page.locator('#rvb-explain-details');
      await expect(details).toBeVisible();
      await expect(details).not.toHaveAttribute('open', '');
    });
  });
});
