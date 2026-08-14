# Enhancement 05: UI/UX Information Hierarchy & Responsive Layout Refactor

Date: 2026-08-14

---

# Objective

Improve readability and reduce cognitive overload on complex calculators without changing any calculation logic.

The goal of this enhancement is not to redesign the website.

The goal is to improve information hierarchy so users can immediately identify:

1. The final answer.
2. The most important supporting metrics.
3. Optional details.
4. Mathematical explanations.

This enhancement is strictly a UI/UX refactor.

No mathematical formulas, calculator behavior, routes, URLs, state management, or existing functionality should change.

---

# Scope (This Pass Only)

Apply this enhancement ONLY to calculators that contain a large amount of information.

Included:

- Loan / EMI Calculator (Comparison Mode)
- Rent vs. Buy Calculator

Excluded:

- Unit converters
- BMI calculator
- Age calculator
- Tip & Bill Splitter
- Other simple calculators

Do not roll out changes to all calculators during this pass.

The goal is to establish a reusable visual pattern first.

---

# Current UX Problems

## Problem 1: Weak Information Hierarchy

Primary results, supporting metrics, explanations, and detailed calculations all compete for attention.

Users should immediately understand:

"What is the answer?"

before seeing:

"How was the answer calculated?"

---

## Problem 2: Dense Result Areas

Large result sections feel visually crowded.

Symptoms:

- Multiple cards appear compressed.
- Large blocks of text compete with numerical results.
- Tables visually dominate the page.
- Important values don't stand out enough.

---

## Problem 3: Desktop Space Is Underutilized

Most calculators use a fixed-width container.

Complex calculators don't take advantage of additional horizontal space on larger displays.

Large empty margins appear on both sides of the page.

---

## Problem 4: Share Actions Compete With Results

The Share Result button sometimes appears inside the result area, creating additional visual noise.

Sharing should feel like an action, not part of the calculation itself.

---

# Design Principles

Follow this hierarchy:

```text
Primary Decision
        ↓
Key Metrics
        ↓
Detailed Analysis
        ↓
Mathematical Explanation
```

Users should never be overwhelmed by every piece of information simultaneously.

---

# Change 1: Introduce Layout Tiers

Do not force every calculator into the same width.

---

## Tier 1: Standard Calculators

Examples:

- BMI
- Tip Calculator
- Age Calculator
- Unit Converters

Keep the existing layout.

```css
max-width: 1200px;
```

---

## Tier 2: Advanced Calculators

Examples:

- Loan Comparison
- Rent vs. Buy

Expand the desktop layout.

```css
max-width: 1440px;
```

Apply only on large screens.

Mobile layouts should remain unchanged.

---

# Change 2: Redesign the Result Hero Section

The hero section should communicate only one thing:

"What should the user do?"

---

## Loan Comparison

Current:

```text
Scenario B offers the lower lifetime borrowing cost.

Scenario B reduces lifetime borrowing costs by ₹59,25,593.
```

Proposed:

```text
✓ Lower Lifetime Borrowing Cost

Scenario B

₹59,25,593 saved
```

Requirements:

- Larger typography.
- More whitespace.
- Larger vertical padding.
- Fewer sentences.

---

## Rent vs. Buy

Current:

```text
Renting preserves ₹41,59,914 more liquid capital over 15 years.

Unrecoverable cost to rent is ₹20,152 vs. ₹41,80,066 to buy.
```

Proposed:

```text
✓ Renting Is The Better Financial Choice

₹41,59,914

Additional liquid capital over 15 years.
```

Requirements:

- Emphasize the number.
- Reduce explanatory text.

---

# Change 3: Standardize Metric Cards

Create a consistent metric-card pattern.

Current cards feel compressed.

---

## Recommended Structure

```text
+------------------------+
| MONTHLY EMI            |
| ₹46,135/mo             |
| Lower monthly payment  |
+------------------------+
```

Requirements:

- Larger padding.
- Better spacing.
- Improved line height.
- Equal card heights.
- Consistent typography.

---

## Suggested CSS

```css
padding: 32px;

line-height: 1.7;

gap: 24px;
```

---

# Change 4: Collapse Secondary Information

Detailed information should be hidden by default.

---

## Rent vs. Buy

Visible by default:

- Final recommendation.
- Key financial metrics.

Collapsed by default:

```text
▶ Year-by-Year Financial Comparison

▶ Explain Calculation
```

---

## Loan Comparison

Visible by default:

- Recommendation banner.
- Monthly EMI comparison.
- Interest comparison.
- Total borrowing cost comparison.

Collapsed by default:

```text
▶ Comparison Matrix
```

---

# Change 5: Increase Vertical Spacing

Increase spacing between major sections.

---

Current:

```text
Result
↓
Cards
↓
Table
↓
Explanation
```

Everything appears visually compressed.

---

Recommended spacing:

```css
Section gap:

32px → 48px

Card gap:

16px → 24px

Container padding:

24px → 32px
```

---

# Change 6: Reposition Share Actions

Sharing should not compete with results.

Preferred locations:

Option A:

```text
Calculator Header
```

Option B:

```text
Result Hero (top-right corner)
```

Choose one location and use it consistently.

---

# What NOT To Change

Do NOT modify:

- Calculation formulas.
- Financial models.
- Shareable URLs.
- Query parameters.
- State management.
- Comparison logic.
- Existing calculations.
- Currency handling.
- Tests.

This enhancement is presentation-only.

---

# Testing

## Functional Regression

Verify:

- All calculations remain identical.
- Comparison mode still works.
- Sharing still works.
- URLs still restore state.
- Existing tests continue to pass.

---

## Visual Regression

### Desktop

Verify:

- Advanced calculators use the wider layout.
- Result sections feel less crowded.
- Tables remain readable.
- Information hierarchy is improved.

---

### Mobile

Verify:

- No horizontal scrolling.
- Cards stack correctly.
- Collapsible sections function correctly.
- Larger desktop layouts don't affect mobile behavior.

---

# Success Criteria

A user should be able to answer these questions within 5 seconds:

Loan Comparison:

- Which loan is better?
- How much money will I save?

Rent vs. Buy:

- Which option is better?
- How much money will I save?

The mathematical explanation should remain available, but it should no longer compete for attention.