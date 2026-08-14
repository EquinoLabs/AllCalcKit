import { test, expect } from '@playwright/test';

test.describe('Feature 3: Shareable Results E2E Workflows', () => {

  test.describe('1. Loan & EMI Calculator Sharing (/finance/loan-emi)', () => {
    test('copies shareable URL with parameters and restores exact state upon opening', async ({ page, context }) => {
      // Grant clipboard permissions
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);

      await page.goto('/finance/loan-emi');

      // Adjust inputs
      const amountInp = page.locator('#emi-amount');
      const rateInp = page.locator('#emi-rate');
      const tenureInp = page.locator('#emi-tenure');
      const shareBtn = page.locator('#emi-share-btn');

      await amountInp.fill('500000');
      await amountInp.dispatchEvent('input');

      await rateInp.fill('7.5');
      await rateInp.dispatchEvent('input');

      await tenureInp.fill('15');
      await tenureInp.dispatchEvent('input');

      // Verify calculation updated
      await expect(page.locator('#emi-monthly-result')).toContainText('$4,635');

      // Click Share Result
      await shareBtn.click();

      // Check temporary confirmation state
      await expect(shareBtn).toContainText('Link copied!');

      // Read clipboard
      const clipboardText = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      expect(clipboardText).toContain('/finance/loan-emi?');
      expect(clipboardText).toContain('amount=500000');
      expect(clipboardText).toContain('rate=7.5');
      expect(clipboardText).toContain('years=15');
      expect(clipboardText).toContain('currency=USD');

      // Open new URL in page to verify values are restored exactly
      await page.goto(clipboardText);

      await expect(amountInp).toHaveValue('500000');
      await expect(rateInp).toHaveValue('7.5');
      await expect(tenureInp).toHaveValue('15');
      await expect(page.locator('#emi-monthly-result')).toContainText('$4,635');
    });

    test('restores INR currency and Indian formatted amounts from shared URL', async ({ page }) => {
      await page.goto('/finance/loan-emi?amount=2500000&rate=8.5&years=20&currency=INR');

      const amountInp = page.locator('#emi-amount');
      const rateInp = page.locator('#emi-rate');
      const tenureInp = page.locator('#emi-tenure');

      await expect(amountInp).toHaveValue('2500000');
      await expect(rateInp).toHaveValue('8.5');
      await expect(tenureInp).toHaveValue('20');
      await expect(page.locator('#emi-amount-val')).toContainText('₹25,00,000 (25 Lakh)');
      await expect(page.locator('#emi-monthly-result')).toContainText('₹21,696');
    });

    test('copies shareable comparison URL when comparison mode is ON and restores both scenarios', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);

      await page.goto('/finance/loan-emi');

      // Enable comparison mode
      await page.click('#emi-compare-toggle');
      await expect(page.locator('#emi-compare-view')).toBeVisible();

      // Configure Scenario A: $200k @ 9.0% for 10 years
      const scenAAmount = page.locator('#scenario-a-amount');
      const scenARate = page.locator('#scenario-a-rate');
      const scenATenure = page.locator('#scenario-a-tenure');

      await scenAAmount.fill('200000');
      await scenAAmount.dispatchEvent('input');
      await scenARate.fill('9');
      await scenARate.dispatchEvent('input');
      await scenATenure.fill('10');
      await scenATenure.dispatchEvent('input');

      // Configure Scenario B: $200k @ 7.5% for 10 years
      const scenBAmount = page.locator('#scenario-b-amount');
      const scenBRate = page.locator('#scenario-b-rate');
      const scenBTenure = page.locator('#scenario-b-tenure');

      await scenBAmount.fill('200000');
      await scenBAmount.dispatchEvent('input');
      await scenBRate.fill('7.5');
      await scenBRate.dispatchEvent('input');
      await scenBTenure.fill('10');
      await scenBTenure.dispatchEvent('input');

      // Click the single Share Result button in the header
      const shareBtn = page.locator('#emi-share-btn');
      await shareBtn.click();
      await expect(shareBtn).toContainText('Link copied!');

      const clipboardText = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      expect(clipboardText).toContain('compare=true');
      expect(clipboardText).toContain('amountA=200000');
      expect(clipboardText).toContain('rateA=9');
      expect(clipboardText).toContain('yearsA=10');
      expect(clipboardText).toContain('amountB=200000');
      expect(clipboardText).toContain('rateB=7.5');
      expect(clipboardText).toContain('yearsB=10');

      // Navigate to the comparison URL
      await page.goto(clipboardText);

      // Verify comparison mode is automatically enabled
      await expect(page.locator('#emi-compare-view')).toBeVisible();
      await expect(page.locator('#emi-compare-toggle')).toHaveAttribute('aria-checked', 'true');

      // Verify Scenario A restored exactly
      await expect(page.locator('#scenario-a-amount')).toHaveValue('200000');
      await expect(page.locator('#scenario-a-rate')).toHaveValue('9');
      await expect(page.locator('#scenario-a-tenure')).toHaveValue('10');

      // Verify Scenario B restored exactly
      await expect(page.locator('#scenario-b-amount')).toHaveValue('200000');
      await expect(page.locator('#scenario-b-rate')).toHaveValue('7.5');
      await expect(page.locator('#scenario-b-tenure')).toHaveValue('10');

      // Verify comparison summary displays updated recommendation
      await expect(page.locator('#comparison-recommendation-title')).toContainText('Scenario B offers the lower lifetime borrowing cost');
    });

    test('restores comparison mode directly with INR currency and 50 Lakh amounts', async ({ page }) => {
      await page.goto('/finance/loan-emi?compare=true&amountA=5000000&rateA=9&yearsA=20&amountB=5000000&rateB=7&yearsB=20&currency=INR');

      await expect(page.locator('#emi-compare-view')).toBeVisible();
      await expect(page.locator('#scenario-a-amount')).toHaveValue('5000000');
      await expect(page.locator('#scenario-a-rate')).toHaveValue('9');
      await expect(page.locator('#scenario-a-tenure')).toHaveValue('20');
      await expect(page.locator('#scenario-a-amount-val')).toContainText('₹50,00,000 (50 Lakh)');

      await expect(page.locator('#scenario-b-amount')).toHaveValue('5000000');
      await expect(page.locator('#scenario-b-rate')).toHaveValue('7');
      await expect(page.locator('#scenario-b-tenure')).toHaveValue('20');
      await expect(page.locator('#scenario-b-amount-val')).toContainText('₹50,00,000 (50 Lakh)');
    });
  });

  test.describe('2. Rent vs. Buy Calculator Sharing (/finance/rent-vs-buy)', () => {
    test('copies shareable URL with 12 parameters and restores full simulation state', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);

      await page.goto('/finance/rent-vs-buy');

      // Adjust renting parameters
      await page.locator('#rvb-horizon').fill('10');
      await page.locator('#rvb-horizon').dispatchEvent('input');

      await page.locator('#rvb-rent').fill('30000');
      await page.locator('#rvb-rent').dispatchEvent('input');

      await page.locator('#rvb-rent-growth').fill('6.0');
      await page.locator('#rvb-rent-growth').dispatchEvent('input');

      await page.locator('#rvb-renters-ins').fill('7000');
      await page.locator('#rvb-renters-ins').dispatchEvent('input');

      await page.locator('#rvb-inv-return').fill('12.0');
      await page.locator('#rvb-inv-return').dispatchEvent('input');

      // Adjust buying parameters
      await page.locator('#rvb-price').fill('8000000');
      await page.locator('#rvb-price').dispatchEvent('input');

      await page.locator('#rvb-down-pct').fill('25');
      await page.locator('#rvb-down-pct').dispatchEvent('input');

      await page.locator('#rvb-mortgage-rate').fill('8.5');
      await page.locator('#rvb-mortgage-rate').dispatchEvent('input');

      await page.locator('#rvb-prop-tax').fill('0.5');
      await page.locator('#rvb-prop-tax').dispatchEvent('input');

      await page.locator('#rvb-maint').fill('1.2');
      await page.locator('#rvb-maint').dispatchEvent('input');

      await page.locator('#rvb-appreciation').fill('5.0');
      await page.locator('#rvb-appreciation').dispatchEvent('input');

      const shareBtn = page.locator('#rvb-share-btn');
      await shareBtn.click();

      await expect(shareBtn).toContainText('Link copied!');

      const clipboardText = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      expect(clipboardText).toContain('/finance/rent-vs-buy?');
      expect(clipboardText).toContain('years=10');
      expect(clipboardText).toContain('rent=30000');
      expect(clipboardText).toContain('homePrice=8000000');

      // Navigate to shared link and verify all 12 parameters are restored
      await page.goto(clipboardText);

      await expect(page.locator('#rvb-horizon')).toHaveValue('10');
      await expect(page.locator('#rvb-rent')).toHaveValue('30000');
      await expect(page.locator('#rvb-rent-growth')).toHaveValue('6');
      await expect(page.locator('#rvb-renters-ins')).toHaveValue('7000');
      await expect(page.locator('#rvb-inv-return')).toHaveValue('12');
      await expect(page.locator('#rvb-price')).toHaveValue('8000000');
      await expect(page.locator('#rvb-down-pct')).toHaveValue('25');
      await expect(page.locator('#rvb-mortgage-rate')).toHaveValue('8.5');
      await expect(page.locator('#rvb-prop-tax')).toHaveValue('0.5');
      await expect(page.locator('#rvb-maint')).toHaveValue('1.2');
      await expect(page.locator('#rvb-appreciation')).toHaveValue('5');

      // Verify verdict headline is rendered with non-zero results
      await expect(page.locator('#rvb-headline')).not.toHaveText('Buying builds ₹0 more net wealth.');
    });

    test('supports short human-readable parameter aliases (misc, investment, down, mortgage, tax)', async ({ page }) => {
      const aliasUrl = '/finance/rent-vs-buy?unit=INR&years=12&rent=28000&rentGrowth=4.5&misc=6000&investment=10&homePrice=8500000&down=15&mortgage=9.0&tax=0.6&maintenance=1.2&appreciation=4.5';
      await page.goto(aliasUrl);

      await expect(page.locator('#rvb-horizon')).toHaveValue('12');
      await expect(page.locator('#rvb-rent')).toHaveValue('28000');
      await expect(page.locator('#rvb-renters-ins')).toHaveValue('6000');
      await expect(page.locator('#rvb-inv-return')).toHaveValue('10');
      await expect(page.locator('#rvb-price')).toHaveValue('8500000');
      await expect(page.locator('#rvb-down-pct')).toHaveValue('15');
      await expect(page.locator('#rvb-mortgage-rate')).toHaveValue('9');
      await expect(page.locator('#rvb-prop-tax')).toHaveValue('0.6');
    });
  });

  test.describe('3. Malformed and Out-of-Range Parameter Resilience', () => {
    test('Loan EMI survives corrupt, NaN, and out-of-range URL params without crashing', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await page.goto('/finance/loan-emi?amount=invalid&rate=9999&years=-5&currency=BITCOIN');

      expect(errors).toHaveLength(0);

      // Verify standard defaults are maintained
      await expect(page.locator('#emi-rate')).toHaveValue('8.5');
      await expect(page.locator('#emi-tenure')).toHaveValue('5');
      await expect(page.locator('#emi-monthly-result')).not.toHaveText('');
    });

    test('Loan EMI Comparison mode survives corrupt, NaN, and negative parameters safely', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await page.goto('/finance/loan-emi?compare=true&amountA=abc&rateB=-100&yearsB=9999&currency=FAKE');

      expect(errors).toHaveLength(0);

      // Verify comparison mode opens and default fallback values are safely applied
      await expect(page.locator('#emi-compare-view')).toBeVisible();
      await expect(page.locator('#scenario-a-amount')).toHaveValue('100000');
      await expect(page.locator('#scenario-b-rate')).toHaveValue('8');
      await expect(page.locator('#scenario-b-tenure')).toHaveValue('5');
      await expect(page.locator('#emi-comparison-summary')).toBeVisible();
    });

    test('Rent vs. Buy survives corrupt, NaN, and negative parameters safely', async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', err => errors.push(err.message));

      await page.goto('/finance/rent-vs-buy?rent=corrupted&homePrice=-9999&down=500&tax=invalid');

      expect(errors).toHaveLength(0);

      // Verify page loaded and defaults were kept
      await expect(page.locator('#rvb-horizon')).toHaveValue('15');
      await expect(page.locator('#rvb-down-pct')).toHaveValue('20');
      await expect(page.locator('#rvb-headline')).toBeVisible();
    });
  });

  test.describe('4. Native Web Share API Integration', () => {
    test('triggers navigator.share when available and shows success state', async ({ page }) => {
      await page.goto('/finance/loan-emi');

      // Inject mock for navigator.share
      await page.evaluate(() => {
        (window as any).__shareCalls = [];
        (navigator as any).share = async (data: any) => {
          (window as any).__shareCalls.push(data);
          return Promise.resolve();
        };
      });

      const shareBtn = page.locator('#emi-share-btn');
      await shareBtn.click();

      // Check native share was called
      const calls = await page.evaluate(() => (window as any).__shareCalls);
      expect(calls.length).toBe(1);
      expect(calls[0].url).toContain('/finance/loan-emi');

      // Check feedback
      await expect(shareBtn).toContainText('Shared successfully!');
    });
  });
});
