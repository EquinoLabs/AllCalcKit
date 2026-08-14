# Money Split Tool - Technical Planning Document (dev-v.1.1)

**Document Version:** 2.0

**Status:** Planned

**Target Release:** `dev-v.1.1`

**Feature Type:** Finance Tool + Persistent Mini-Application

**Priority:** High

**Risk Level:** 🟢 Low-Medium

---

# 1. Overview

Introduce a new finance utility inspired by Splitwise that enables users to create, manage, save, and share expense groups.

The objective is **not** to clone Splitwise.

The objective is to recreate the most useful parts of the Splitwise experience while remaining fully compatible with the existing AllCalcKit architecture.

Unlike Splitwise, this implementation will prioritize:

- Simplicity
- Privacy
- Offline support
- Shareability
- Zero account requirements
- Zero cost

The feature should remain lightweight and should continue to follow the existing design principles of AllCalcKit.

---

# 2. Core Product Philosophy

The Money Split tool is the **first stateful mini-application inside AllCalcKit**.

Unlike traditional calculators, users are expected to return and continue working with previously created data.

Therefore, the Money Split tool should behave as a **mini-app** rather than as a one-time calculator.

Users should be able to:

- Create multiple groups
- Add participants
- Add expenses
- Save groups automatically
- Return later and continue editing
- Share groups with others

The user should **never** be forced to recreate a group after closing the browser.

---

# 3. Architectural Constraints

The feature must preserve the existing AllCalcKit architecture.

## Mandatory Requirements

- Static-first
- Client-side calculations
- Astro-compatible
- Cloudflare Pages-compatible
- PWA-compatible
- SEO-friendly
- Offline-capable

---

## Explicitly Excluded from MVP

The following features are intentionally postponed:

- Authentication
- Login
- User accounts
- Databases
- Cloud synchronization
- Real-time collaboration
- Cloudflare Functions
- Server-side persistence
- Payment tracking
- Receipt uploads
- Debt simplification

---

# 4. User Workflow

```text
Money Split
        ↓

My Groups
        ↓

Create Group
        ↓

Add Participants
        ↓

Add Expenses
        ↓

Review Summary
        ↓

Share Group
```

---

# 5. URL Structure

Primary route:

```text
/finance/money-split
```

The route should remain statically generated.

No server-side routing should be introduced.

---

# 6. Group Management

## Create Group

Users can create a group.

Examples:

- Goa Trip
- Apartment Expenses
- Office Lunch
- Weekend Ride

---

## Group Data Structure

Conceptual model:

```typescript
interface Group {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;

    participants: Participant[];

    expenses: Expense[];
}
```

---

## Group Operations

Supported operations:

- Create group
- Open group
- Edit group
- Delete group

---

## Delete Protection

Deleting a group should require confirmation.

Example:

```text
Delete Goa Trip?

Cancel | Delete
```

---

# 7. Multiple Groups

Users should be able to create multiple groups.

Example:

```text
My Groups

🏖 Goa Trip

🏠 Apartment Expenses

🍕 Office Lunch

🚗 Weekend Ride
```

---

## Group Limit

No artificial limit should be imposed.

Browser storage limitations should determine the practical limit.

---

# 8. Participant Management

Users can add multiple participants.

Example:

```text
Lakshya

Rahul

Ananya

Priya

Shivam
```

---

## Participant Rules

Minimum participants per expense:

```text
2
```

Participant names should be:

- Editable
- Removable
- Reusable

---

## Participant Data Structure

```typescript
interface Participant {
    id: string;
    name: string;
}
```

---

# 9. Expense Management

Users should be able to add multiple expenses.

---

## Required Fields

| Field | Required |
| --- | --- |
| Expense name | Yes |
| Amount | Yes |
| Paid by | Yes |
| Participants | Yes |
| Split method | Yes |

---

## Example

```text
Expense:

Pizza

Amount:

₹1000

Paid By:

Rahul
```

---

## Expense Data Structure

```typescript
interface Expense {
    id: string;

    description: string;

    amount: number;

    paidBy: string;

    participantIds: string[];

    splitMethod:
        | "equal"
        | "percentage"
        | "exact";

    allocations: Allocation[];
}
```

---

## Allocation Structure

```typescript
interface Allocation {
    participantId: string;

    value: number;
}
```

---

# 10. Selective Participation

Expenses should not automatically include every group member.

Example:

Group:

```text
Lakshya

Rahul

Ananya

Priya

Shivam
```

Expense participants:

```text
☑ Lakshya

☑ Rahul

☑ Ananya

☐ Priya

☐ Shivam
```

Only selected participants should participate in that expense.

---

# 11. Split Methods

---

## Equal Split

Example:

```text
₹1000

3 participants
```

Result:

```text
Lakshya → ₹333.33

Rahul → ₹333.33

Ananya → ₹333.34
```

---

## Equal Split Validation

The implementation must correctly handle floating-point rounding.

Example:

```text
1000 ÷ 3
```

Should become:

```text
333.33

333.33

333.34
```

The final total must always equal the original expense.

---

## Percentage Split

Example:

```text
Lakshya → 20%

Rahul → 70%

Ananya → 10%
```

Validation:

```text
20 + 70 + 10 = 100%
```

---

## Exact Amount Split

Example:

```text
Lakshya → ₹200

Rahul → ₹700

Ananya → ₹100
```

Validation:

```text
200 + 700 + 100 = ₹1000
```

This feature is considered a **core requirement** because it is one of the primary capabilities missing from Google Pay groups.

---

# 12. Who Paid vs Who Owes

The application must distinguish between:

```text
Who paid
```

and

```text
Who owes
```

---

## Example

```text
Pizza

₹1000

Paid by:

Rahul
```

Participants:

```text
Lakshya

Rahul

Ananya
```

Equal split:

```text
Lakshya owes ₹333.33

Rahul owes ₹333.33

Ananya owes ₹333.34
```

Since Rahul paid ₹1000:

```text
Rahul should receive ₹666.67
```

---

# 13. Settlement Summary

The MVP should calculate net balances.

Formula:

```text
Total Paid

-

Total Owed

=

Net Balance
```

---

## Example

```text
Lakshya should receive ₹400

Rahul should pay ₹100

Ananya should pay ₹300
```

---

# 14. Debt Simplification

Not included in `dev-v.1.1`.

Future example:

```text
Rahul owes Lakshya ₹300.

Ananya owes Rahul ₹150.
```

Simplified:

```text
Rahul pays Lakshya ₹150.

Ananya pays Lakshya ₹150.
```

Move to `dev-v.2.0`.

---

# 15. Persistence

Persistence is a **mandatory requirement**.

Without persistence, the feature loses much of its practical value.

---

## Storage Strategy

Use:

```text
localStorage
```

Do not use:

```text
Database

Authentication

Cloud storage
```

---

## Automatic Saving

Users should never need to click a Save button.

Automatically save after:

- Group creation
- Participant addition
- Participant removal
- Expense creation
- Expense modification
- Expense deletion

---

## Persistence Across Sessions

Expected behavior:

```text
Day 1:

Create Goa Trip

Add expenses

Close browser
```

---

```text
Day 2:

Open Money Split

Goa Trip still exists
```

---

# 16. PWA Support

If AllCalcKit is installed as a PWA:

```text
Install AllCalcKit

↓

Open Money Split

↓

Groups remain available
```

---

## Important Limitation

`localStorage` is browser-specific.

Groups will not automatically synchronize across devices.

This limitation is acceptable for `dev-v.1.1`.

---

# 17. Shareable Links

Sharing and persistence are two separate mechanisms.

---

## Persistence

```text
Group

↓

localStorage
```

---

## Sharing

```text
Group

↓

Serialize

↓

Encode

↓

Generate URL

↓

Share
```

---

## Proposed URL

```text
/finance/money-split?data=<encoded-data>
```

---

## Requirements

- Self-contained
- No database
- Encoded
- Validated
- Safe to import

Invalid URLs must never crash the application.

---

# 18. Sharing Options

Preferred order:

1. Native Web Share API
2. Copy link
3. Copy summary

---

## Example Summary

```text
Goa Trip

Pizza → ₹1000

Hotel → ₹5000

Taxi → ₹800

Final Balances:

Lakshya should receive ₹1000.

Rahul should pay ₹400.

Ananya should pay ₹600.
```

---

# 19. Offline Requirements

The following functionality must continue working offline:

- Create groups
- Edit groups
- Delete groups
- Add participants
- Add expenses
- Calculate balances
- View saved groups

---

# 20. SEO Integration

Create:

```text
data/calculator-content/money-split.ts
```

---

## Content

Include:

- What is expense splitting?
- Equal splitting
- Percentage splitting
- Exact amount splitting
- Trip examples
- Roommate examples
- FAQs

---

## Structured Data

Reuse the existing FAQ generation system.

Do not create a new SEO implementation.

---

# 21. Suggested File Structure

```text
components/

    calculators/

        MoneySplitCalculator.astro

lib/

    calculators/

        moneySplit.ts

utils/

    moneySplit/

        persistence.ts

        sharing.ts

data/

    calculator-content/

        money-split.ts

tests/

    calculators/

        moneySplit.test.ts
```

---

# 22. Testing Strategy

## Unit Tests

Test:

- Equal split
- Percentage split
- Exact split
- Balance calculation
- Rounding
- Validation

---

## Persistence Tests

Test:

- Save group
- Restore group
- Delete group
- Multiple groups

---

## Share Tests

Test:

- Generate URL
- Import URL
- Invalid data

---

## E2E Tests

```text
Create group

↓

Add participants

↓

Add expenses

↓

Reload page

↓

Verify persistence

↓

Generate share link

↓

Import shared data
```

---

# 23. Testing Policy

During implementation:

```text
Run the smallest relevant test suite.
```

After implementation:

```bash
npm run test:all
```

---

# 24. Cloudflare Pages Compatibility

This is a hard requirement.

Avoid:

- Node-only dependencies
- Server-side APIs
- Filesystem access
- SMTP libraries

Local development success does not guarantee Cloudflare deployment success.

Production deployment must always be validated.

---

# 25. PWA Compatibility

The feature must not break:

- Service worker behavior
- Offline mode
- Installation
- Existing routes

Both browser and installed PWA usage should be tested.

---

# 26. MVP Acceptance Criteria

- [ ] Create multiple groups.
- [ ] Add participants.
- [ ] Add multiple expenses.
- [ ] Select participants per expense.
- [ ] Equal split works.
- [ ] Percentage split works.
- [ ] Exact split works.
- [ ] Balances are correct.
- [ ] Groups persist automatically.
- [ ] Groups survive browser restarts.
- [ ] Groups can be deleted.
- [ ] Share links work.
- [ ] Offline mode works.
- [ ] PWA behavior remains intact.
- [ ] SEO content is added.
- [ ] Tests pass.
- [ ] Production build succeeds.
- [ ] Cloudflare deployment succeeds.

---

# 27. Future Roadmap (dev-v.2.0)

Possible additions:

- Authentication
- Shared groups
- Cloud synchronization
- Real-time collaboration
- Debt simplification
- Payment tracking
- Receipt uploads

These features are intentionally excluded from `dev-v.1.1`.