import { test, expect } from '@playwright/test';
import { serializeGroupForShare } from '../../src/utils/moneySplit/sharing';
import type { Group } from '../../src/utils/moneySplit/types';

test.describe('E2E — Money Split Stateful Mini-App Workflows (v1.2 UX Refinements)', () => {

  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test for clean state
    await page.goto('/finance/money-split');
    await page.evaluate(() => {
      localStorage.removeItem('ack_money_split_groups');
      localStorage.removeItem('ack_money_split_active_group_id');
    });
    await page.reload();
  });

  test('Complete Lifecycle: Create group -> Add members -> Add/Edit expenses -> Balances -> Persistence', async ({ page }) => {
    // 1. First-time visit: Welcome view is displayed
    await expect(page.locator('#ms-welcome-view')).toBeVisible();
    await expect(page.locator('#ms-new-group-name')).toBeVisible();

    // 2. Create a new group
    await page.fill('#ms-new-group-name', 'Goa Road Trip 2026');
    await page.selectOption('#ms-new-group-currency', 'INR');
    await page.click('#ms-create-group-form button[type="submit"]');

    // 3. Workspace renders with active group title & navigation buttons
    await expect(page.locator('#ms-group-view')).toBeVisible();
    await expect(page.locator('#ms-open-my-groups-btn')).toBeVisible();
    await expect(page.locator('#ms-active-group-title')).toHaveText('Goa Road Trip 2026');
    await expect(page.locator('#ms-active-group-currency')).toHaveText('INR');

    // 4. Add 3 participants
    await page.fill('#ms-add-participant-input', 'Lakshya');
    await page.click('#ms-add-participant-form button[type="submit"]');

    await page.fill('#ms-add-participant-input', 'Rahul');
    await page.click('#ms-add-participant-form button[type="submit"]');

    await page.fill('#ms-add-participant-input', 'Ananya');
    await page.click('#ms-add-participant-form button[type="submit"]');

    await expect(page.locator('#ms-participants-list')).toContainText('Lakshya');
    await expect(page.locator('#ms-participants-list')).toContainText('Rahul');
    await expect(page.locator('#ms-participants-list')).toContainText('Ananya');
    await expect(page.locator('#ms-participant-count-badge')).toHaveText('3');

    // 5. Add Expense 1: Equal Split (Pizza ₹1200 paid by Rahul)
    await page.fill('#ms-exp-desc', 'Beach Pizza & Drinks');
    await page.fill('#ms-exp-amount', '1200');
    // Select Rahul as payer
    const rahulOption = await page.locator('#ms-exp-payer option', { hasText: 'Rahul' }).getAttribute('value');
    await page.selectOption('#ms-exp-payer', rahulOption!);
    await page.click('#ms-submit-expense-btn');

    // Verify Expense in list & Expense History title (Task 3)
    await expect(page.locator('#ms-expenses-list')).toContainText('Beach Pizza & Drinks');
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹1,200.00');
    await expect(page.locator('#ms-expense-badge')).toHaveText('1');

    // Verify Balances
    // Rahul paid 1200, owes 400 -> Net = +800
    // Lakshya paid 0, owes 400 -> Net = -400
    // Ananya paid 0, owes 400 -> Net = -400
    await expect(page.locator('#ms-balances-list')).toContainText('+₹800.00');
    await expect(page.locator('#ms-balances-list')).toContainText('-₹400.00');

    // 6. Add Expense 2: Percentage Split (Cab ₹1000 paid by Lakshya: Lakshya 50%, Rahul 30%, Ananya 20%)
    await page.fill('#ms-exp-desc', 'Taxi to North Goa');
    await page.fill('#ms-exp-amount', '1000');
    const lakshyaOption = await page.locator('#ms-exp-payer option', { hasText: 'Lakshya' }).getAttribute('value');
    await page.selectOption('#ms-exp-payer', lakshyaOption!);

    // Switch to Percentage Tab
    await page.click('.ms-method-tab[data-method="percentage"]');

    // Fill percentages
    const allocInputs = page.locator('#ms-allocation-rows input[data-p-alloc]');
    await allocInputs.nth(0).fill('50'); // Lakshya 50%
    await allocInputs.nth(1).fill('30'); // Rahul 30%
    await allocInputs.nth(2).fill('20'); // Ananya 20%

    await page.click('#ms-submit-expense-btn');

    // Verify 2 expenses recorded
    await expect(page.locator('#ms-expense-count-display')).toContainText('2 bills');
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹2,200.00');

    // 7. Edit Expense: Modify Pizza from 1200 to 1500
    await page.locator('#ms-expenses-list > div', { hasText: 'Beach Pizza & Drinks' }).locator('[data-edit-expense]').click();
    await expect(page.locator('#ms-expense-form-title')).toContainText('Editing: Beach Pizza & Drinks');

    await page.fill('#ms-exp-amount', '1500');
    await page.click('#ms-submit-expense-btn');

    // Verify updated total spend (1500 + 1000 = 2500)
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹2,500.00');

    // 8. Participant Deletion Blocking: Attempting to remove Rahul who paid for pizza
    const rahulDelBtn = page.locator('#ms-participants-list [data-del-participant]').nth(1);
    await rahulDelBtn.click();
    await expect(page.locator('#ms-participant-alert')).toBeVisible();
    await expect(page.locator('#ms-participant-alert')).toContainText('Cannot remove "Rahul"');

    // 9. Persistence Across Page Reload
    await page.reload();
    await expect(page.locator('#ms-group-view')).toBeVisible();
    await expect(page.locator('#ms-active-group-title')).toHaveText('Goa Road Trip 2026');
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹2,500.00');
    await expect(page.locator('#ms-participants-list')).toContainText('Lakshya');

    // 10. Copy Summary action
    await page.click('#ms-copy-summary-btn');
    await expect(page.locator('#ms-copy-summary-text')).toContainText('Copied');
  });

  test('Task 1: Redesign Group Navigation & My Groups Modal Switching', async ({ page }) => {
    // 1. Create first group
    await page.fill('#ms-new-group-name', 'Pune Flat 402');
    await page.selectOption('#ms-new-group-currency', 'INR');
    await page.click('#ms-create-group-form button[type="submit"]');

    // 2. Add members & expense to group 1
    await page.fill('#ms-add-participant-input', 'Amit');
    await page.click('#ms-add-participant-form button[type="submit"]');
    await page.fill('#ms-add-participant-input', 'Rohan');
    await page.click('#ms-add-participant-form button[type="submit"]');

    // 3. Create second group via + New Group button
    await page.click('#ms-new-group-btn');
    await expect(page.locator('#ms-new-group-modal')).toBeVisible();
    await page.fill('#ms-modal-group-name', 'Shimla Splits');
    await page.selectOption('#ms-modal-group-currency', 'INR');
    await page.click('#ms-modal-create-group-form button[type="submit"]');

    // Verify Shimla Splits is active
    await expect(page.locator('#ms-active-group-title')).toHaveText('Shimla Splits');
    await expect(page.locator('#ms-total-groups-badge')).toHaveText('2');

    // 4. Open My Groups modal
    await page.click('#ms-open-my-groups-btn');
    await expect(page.locator('#ms-my-groups-modal')).toBeVisible();

    // Verify both groups appear in the modal
    await expect(page.locator('#ms-my-groups-list')).toContainText('Shimla Splits');
    await expect(page.locator('#ms-my-groups-list')).toContainText('Pune Flat 402');

    // Switch back to Pune Flat 402
    await page.locator('#ms-my-groups-list button[data-open-group]').click();
    await expect(page.locator('#ms-my-groups-modal')).toBeHidden();
    await expect(page.locator('#ms-active-group-title')).toHaveText('Pune Flat 402');
    await expect(page.locator('#ms-participants-list')).toContainText('Amit');
  });

  test('Task 2: Application Modals for Expense and Group Deletion (No native confirm)', async ({ page }) => {
    // 1. Create group and add participants
    await page.fill('#ms-new-group-name', 'Weekend Dinner');
    await page.click('#ms-create-group-form button[type="submit"]');

    await page.fill('#ms-add-participant-input', 'Vikram');
    await page.click('#ms-add-participant-form button[type="submit"]');
    await page.fill('#ms-add-participant-input', 'Sneha');
    await page.click('#ms-add-participant-form button[type="submit"]');

    // 2. Add an expense
    await page.fill('#ms-exp-desc', 'Italian Feast');
    await page.fill('#ms-exp-amount', '1800');
    const vikramOption = await page.locator('#ms-exp-payer option', { hasText: 'Vikram' }).getAttribute('value');
    await page.selectOption('#ms-exp-payer', vikramOption!);
    await page.click('#ms-submit-expense-btn');

    await expect(page.locator('#ms-expenses-list')).toContainText('Italian Feast');

    // 3. Test Delete Expense Modal (Cancel flow)
    await page.locator('#ms-expenses-list [data-del-expense]').click();
    await expect(page.locator('#ms-delete-expense-modal')).toBeVisible();
    await expect(page.locator('#ms-del-exp-target-desc')).toContainText('Italian Feast');

    // Click Cancel
    await page.click('#ms-cancel-del-exp-btn');
    await expect(page.locator('#ms-delete-expense-modal')).toBeHidden();
    await expect(page.locator('#ms-expenses-list')).toContainText('Italian Feast');

    // 4. Test Delete Expense Modal (Confirm flow)
    await page.locator('#ms-expenses-list [data-del-expense]').click();
    await expect(page.locator('#ms-delete-expense-modal')).toBeVisible();
    await page.click('#ms-confirm-del-exp-btn');
    await expect(page.locator('#ms-delete-expense-modal')).toBeHidden();
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹0.00');

    // 5. Test Delete Group Modal (Cancel flow)
    await page.click('#ms-delete-group-btn');
    await expect(page.locator('#ms-delete-group-modal')).toBeVisible();
    await expect(page.locator('#ms-del-group-target-name')).toHaveText('Weekend Dinner');

    await page.click('#ms-cancel-del-group-btn');
    await expect(page.locator('#ms-delete-group-modal')).toBeHidden();
    await expect(page.locator('#ms-active-group-title')).toHaveText('Weekend Dinner');

    // 6. Test Delete Group Modal (Confirm flow)
    await page.click('#ms-delete-group-btn');
    await expect(page.locator('#ms-delete-group-modal')).toBeVisible();
    await page.click('#ms-confirm-del-group-btn');
    await expect(page.locator('#ms-delete-group-modal')).toBeHidden();

    // Reverts to welcome view when all groups deleted
    await expect(page.locator('#ms-welcome-view')).toBeVisible();
  });

  test('Task 4: Edge Case Splits: Payer Excluded and Self-Only Expenses', async ({ page }) => {
    // 1. Create group
    await page.fill('#ms-new-group-name', 'Office Outing');
    await page.click('#ms-create-group-form button[type="submit"]');

    await page.fill('#ms-add-participant-input', 'Lakshya');
    await page.click('#ms-add-participant-form button[type="submit"]');
    await page.fill('#ms-add-participant-input', 'Rahul');
    await page.click('#ms-add-participant-form button[type="submit"]');
    await page.fill('#ms-add-participant-input', 'Priya');
    await page.click('#ms-add-participant-form button[type="submit"]');

    // 2. Payer excluded from split: Lakshya pays ₹1000 for Rahul and Priya only
    await page.fill('#ms-exp-desc', 'Movie Tickets for Rahul and Priya');
    await page.fill('#ms-exp-amount', '1000');
    const lakshyaOption = await page.locator('#ms-exp-payer option', { hasText: 'Lakshya' }).getAttribute('value');
    await page.selectOption('#ms-exp-payer', lakshyaOption!);

    // Uncheck Lakshya in split participants
    const lakshyaCheckbox = page.locator('#ms-allocation-rows [data-p-row]').filter({ hasText: 'Lakshya' }).locator('input[type="checkbox"]');
    await lakshyaCheckbox.uncheck();

    await page.click('#ms-submit-expense-btn');

    // Rahul and Priya owe ₹500 each; Lakshya gets back ₹1000
    await expect(page.locator('#ms-balances-list')).toContainText('+₹1,000.00');
    await expect(page.locator('#ms-balances-list')).toContainText('-₹500.00');

    // 3. Self-only expense: Rahul pays ₹300 for himself only
    await page.fill('#ms-exp-desc', 'Rahul Personal Coffee');
    await page.fill('#ms-exp-amount', '300');
    const rahulOption = await page.locator('#ms-exp-payer option', { hasText: 'Rahul' }).getAttribute('value');
    await page.selectOption('#ms-exp-payer', rahulOption!);

    // Check only Rahul
    await page.click('#ms-deselect-all-btn');
    const rahulCheckbox = page.locator('#ms-allocation-rows [data-p-row]').filter({ hasText: 'Rahul' }).locator('input[type="checkbox"]');
    await rahulCheckbox.check();

    await page.click('#ms-submit-expense-btn');

    // Expense is recorded in history (2 bills)
    await expect(page.locator('#ms-expense-count-display')).toContainText('2 bills');
    // Total spend includes ₹1000 + ₹300 = ₹1300
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹1,300.00');
    // Lakshya still gets back +₹1000, Priya still owes -₹500, Rahul net owes -₹500 (since 300 - 300 = 0 change)
    await expect(page.locator('#ms-balances-list')).toContainText('+₹1,000.00');
    await expect(page.locator('#ms-balances-list')).toContainText('-₹500.00');
  });

  test('Share URL and Import Modal workflow', async ({ page }) => {
    const sharedGroup: Group = {
      id: 'shared_trip_999',
      name: 'Manali Snow Expedition',
      currency: 'INR',
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      participants: [
        { id: 'sp1', name: 'Trekker Alex' },
        { id: 'sp2', name: 'Trekker Sam' }
      ],
      expenses: [
        {
          id: 'se1',
          description: 'Cottage Booking',
          amount: 4000,
          paidBy: 'sp1',
          participantIds: ['sp1', 'sp2'],
          splitMethod: 'equal',
          allocations: [],
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      ]
    };

    const encoded = serializeGroupForShare(sharedGroup);

    // Open URL with ?data=
    await page.goto(`/finance/money-split?data=${encoded}`);

    // Import modal should appear automatically
    await expect(page.locator('#ms-import-modal')).toBeVisible();
    await expect(page.locator('#ms-import-name')).toHaveText('Manali Snow Expedition');
    await expect(page.locator('#ms-import-members')).toHaveText('2 members');

    // Confirm Import
    await page.click('#ms-import-confirm-btn');

    // Verify imported group is active
    await expect(page.locator('#ms-import-modal')).toBeHidden();
    await expect(page.locator('#ms-active-group-title')).toHaveText('Manali Snow Expedition');
    await expect(page.locator('#ms-total-spend-display')).toContainText('₹4,000.00');
    await expect(page.locator('#ms-participants-list')).toContainText('Trekker Alex');
  });

  test('v1.3 Collapsible Expense History: Hidden when <=4 expenses, Collapsed/Expanded toggle when >4 expenses', async ({ page }) => {
    // 1. Create Group with 2 members
    await page.fill('#ms-new-group-name', 'Trip with Many Bills');
    await page.selectOption('#ms-new-group-currency', 'INR');
    await page.click('#ms-create-group-form button[type="submit"]');

    await page.fill('#ms-add-participant-input', 'Member A');
    await page.click('#ms-add-participant-form button[type="submit"]');
    await page.fill('#ms-add-participant-input', 'Member B');
    await page.click('#ms-add-participant-form button[type="submit"]');

    // 0 expenses: Toggle wrapper is hidden
    await expect(page.locator('#ms-expenses-toggle-wrapper')).toBeHidden();

    // Helper to add quick expense
    const addBill = async (desc: string, amount: number) => {
      await page.fill('#ms-exp-desc', desc);
      await page.fill('#ms-exp-amount', String(amount));
      const payerVal = await page.locator('#ms-exp-payer option').nth(1).getAttribute('value');
      if (payerVal) {
        await page.selectOption('#ms-exp-payer', payerVal);
      }
      await page.click('#ms-submit-expense-btn');
    };

    // 2. Add 4 expenses (Items 01 to 04)
    for (let i = 1; i <= 4; i++) {
      const numStr = String(i).padStart(2, '0');
      await addBill(`Item Alpha ${numStr}`, i * 100);
    }

    await expect(page.locator('#ms-expense-badge')).toHaveText('4');
    // For 4 expenses, toggle wrapper must still be hidden
    await expect(page.locator('#ms-expenses-toggle-wrapper')).toBeHidden();
    // All 4 items are displayed in the DOM
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(4);

    // 3. Add 5th expense (Item Alpha 05) -> Threshold crossed (>4)
    await addBill('Item Alpha 05', 500);
    await expect(page.locator('#ms-expense-badge')).toHaveText('5');

    // Toggle wrapper must now be visible
    await expect(page.locator('#ms-expenses-toggle-wrapper')).toBeVisible();
    // Single extra expense: "↓ Show 1 More Expense"
    await expect(page.locator('#ms-expenses-toggle-text')).toHaveText('↓ Show 1 More Expense');
    // Only 4 expenses shown initially (newest first: Item 05, 04, 03, 02)
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(4);
    await expect(page.locator('#ms-expenses-list')).toContainText('Item Alpha 05');
    await expect(page.locator('#ms-expenses-list')).not.toContainText('Item Alpha 01');

    // 4. Add Items 06 to 12 (Total = 12 expenses)
    for (let i = 6; i <= 12; i++) {
      const numStr = String(i).padStart(2, '0');
      await addBill(`Item Alpha ${numStr}`, i * 100);
    }

    await expect(page.locator('#ms-expense-badge')).toHaveText('12');
    await expect(page.locator('#ms-expenses-toggle-wrapper')).toBeVisible();
    // 12 - 4 = 8 more: "↓ Show 8 More Expenses"
    await expect(page.locator('#ms-expenses-toggle-text')).toHaveText('↓ Show 8 More Expenses');
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(4);
    // Item Alpha 12 is on top
    await expect(page.locator('#ms-expenses-list')).toContainText('Item Alpha 12');
    await expect(page.locator('#ms-expenses-list')).not.toContainText('Item Alpha 01');

    // 5. Expand the list
    await page.click('#ms-expenses-toggle-btn');
    await expect(page.locator('#ms-expenses-toggle-text')).toHaveText('↑ Show Less');
    // All 12 cards now rendered in the DOM
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(12);
    await expect(page.locator('#ms-expenses-list')).toContainText('Item Alpha 12');
    await expect(page.locator('#ms-expenses-list')).toContainText('Item Alpha 01');

    // 6. Collapse the list back
    await page.click('#ms-expenses-toggle-btn');
    await expect(page.locator('#ms-expenses-toggle-text')).toHaveText('↓ Show 8 More Expenses');
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(4);
    await expect(page.locator('#ms-expenses-list')).not.toContainText('Item Alpha 01');

    // 7. Delete an expense when collapsed
    await page.locator('#ms-expenses-list > div').first().locator('[data-del-expense]').click();
    await expect(page.locator('#ms-delete-expense-modal')).toBeVisible();
    await page.click('#ms-confirm-del-exp-btn');
    await expect(page.locator('#ms-delete-expense-modal')).toBeHidden();

    // Now 11 expenses -> 11 - 4 = 7
    await expect(page.locator('#ms-expense-badge')).toHaveText('11');
    await expect(page.locator('#ms-expenses-toggle-text')).toHaveText('↓ Show 7 More Expenses');
    await expect(page.locator('#ms-expenses-list > div')).toHaveCount(4);
  });

});
