# AllCalcKit Testing

AllCalcKit uses a layered automated testing strategy to verify calculator logic, application integration, real browser behavior, accessibility, SEO, responsiveness, and navigation.

## Testing Stack

| Tool | Purpose |
|---|---|
| **Vitest** | Unit and integration testing |
| **Playwright** | End-to-end (E2E) browser and UI testing |
| **Axe / @axe-core/playwright** | Automated accessibility checks |
| **Chromium** | Primary browser used for E2E testing |
| **npm** | Test scripts and test execution |

## Current Test Count

**557 automated tests — 557 passing**

| Test Layer | Tests | What it checks |
|---|---:|---|
| Unit Tests (Vitest) | **136** | Calculator formulas, support reference generation, contact validation |
| Integration Tests (Vitest) | **15** | Routes, content registry, contact API endpoint, structured data |
| E2E Tests (Playwright) | **406** | Real browser UI, contact form submissions, navigation, and site behavior |
| **Total** | **557** | **557 passing** |

## 1. Unit Tests — 136

Unit tests test the calculation engines directly without opening a browser.

They cover:

- Unit conversions
- EMI, SIP, FD/RD and compound interest
- GST, discounts and tips
- BMI, BMR, TDEE and water intake
- Percentages, fractions, number bases and prime numbers
- Date and time calculations
- Recipe scaling
- Fuel and electricity calculations
- Word/text transformations
- Color conversions

### Edge Cases

The tests also check important boundary and safety cases:

- Zero and negative values
- Division-by-zero protection
- Very large financial values
- Long investment periods
- 0% and 100% tax rates
- Decimal values
- Leap years
- Month-end date calculations
- Unix epoch boundaries
- Invalid fractions
- Large prime numbers

**Purpose:** Verify that the underlying mathematical and calculation logic is correct and safe.

## 2. Integration Tests — 7

Integration tests verify that the different parts of the application are connected correctly.

They check:

- Calculator route registration
- Category routes
- Calculator content registry
- Required educational content
- Schema.org / JSON-LD generation
- FAQPage and application structured data

**Purpose:** Verify that the application is assembled correctly and required site data is present.

## 3. End-to-End Tests — 394

Playwright runs the website in a real browser and interacts with the actual UI.

All **39 calculators have functional E2E coverage**.

Examples of tested interactions include:

- Entering values into calculator inputs
- Selecting units from dropdowns
- Clicking buttons
- Using sliders
- Switching calculator modes
- Bidirectional input synchronization
- Adding/removing dynamic rows
- Copying results
- Checking calculated results
- Testing validation and error states

### Calculator Coverage

**39 / 39 calculators — 100% functional E2E coverage**

The E2E suites cover calculators across:

- Units & conversions
- Finance
- Health
- Mathematics
- Date & time
- Cooking
- Everyday utilities
- Text & color tools

## 4. Site-Wide Browser Checks

The Playwright suite also checks functionality beyond individual calculators.

### Responsive Testing

Pages are tested at multiple viewport sizes:

- **375px** — small mobile
- **390px** — mobile
- **768px** — tablet
- **1280px** — desktop

Checks include:

- No unwanted horizontal overflow
- Layout remains usable across viewport sizes
- Calculator controls remain accessible

### SEO Checks

The automated suite checks:

- HTTP 200 responses
- Page titles
- Meta descriptions
- Canonical URLs
- Exactly one `<h1>`
- Calculator and category routes

### Accessibility

Axe-based accessibility checks are included for detecting common WCAG issues.

The suite checks things such as:

- Form labels and associations
- Keyboard accessibility
- Color contrast
- Accessible interactive elements

### Navigation & Links

The site is crawled to verify:

- Internal links
- Footer links
- Calculator/category navigation
- No broken internal routes / 404 links

### Runtime Stability

Browser tests monitor for:

- Console errors
- Unhandled exceptions
- Unhandled promise rejections
- `NaN` results
- `Infinity` results

### Theme

The tests also verify:

- Light/dark mode behavior
- Theme persistence

### Structured Data

The generated JSON-LD is checked to ensure it:

- Parses as valid JSON
- Uses the Schema.org context
- Contains the expected structured data

## Running the Tests

From the UI project directory:

```bash
# Unit + integration tests
npm test

# Playwright E2E tests
npm run test:e2e

# Run the complete test suite
npm run test:all
```

The complete suite currently runs all **514 automated tests**.

## What These Tests Give Us

The testing system provides coverage at three levels:

```text
Unit
  ↓
Is the calculation logic correct?

Integration
  ↓
Is the application assembled correctly?

E2E / Browser
  ↓
Does the actual website work when a user interacts with it?
```

Together, these tests help catch:

- Incorrect calculations
- Broken calculator interactions
- Missing routes or content
- UI regressions
- Responsive layout problems
- Accessibility issues
- SEO/metadata problems
- Broken internal links
- Runtime JavaScript errors

## Important Note

Automated tests primarily verify **functionality and technical correctness**.

They do not completely replace manual QA for things such as:

- Visual polish
- Spacing and alignment
- Overall design quality
- Content readability
- User experience
- Whether an interaction feels intuitive

Manual review should therefore be performed before production release.

---

**Current status:** 557 automated tests, **557 passing**, with functional E2E coverage across all 39 calculators and Contact Us support workflow.
