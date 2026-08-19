# AllCalcKit — Calculator Page Content Enhancement

## Implementation PRD / Development Plan

### Status

Planned

### Scope

This document covers **only the enhancement of individual calculator pages**.

It does NOT cover:

* Related calculator / internal linking improvements
* New calculators
* Search improvements
* Category page changes
* Breadcrumb changes
* Site-wide SEO redesign
* Monetization changes

---

# 1. Objective

Currently, AllCalcKit calculator pages primarily contain:

1. Breadcrumb navigation
2. Calculator title
3. Short description
4. Interactive calculator
5. Basic "How to use" / formula guide

The goal is to evolve each calculator page into a **complete, useful calculator resource**.

The final page should satisfy two audiences:

### User

A user should be able to:

* Understand what the calculator calculates.
* Enter the correct values.
* Understand the result.
* Learn the formula or methodology.
* See a practical example.
* Understand important assumptions or limitations.
* Find answers to common questions.

### Search engines

The page should contain enough unique, useful, semantically relevant content to establish the page's topic and search intent naturally.

This should be achieved through **high-quality content**, not keyword stuffing.

---

# 2. Core Principle

Do NOT simply add large blocks of generic text to every calculator.

Bad approach:

```text
BMI Calculator

Calculate your BMI using our BMI calculator.

What is BMI?

BMI is a useful calculation...
BMI calculator...
BMI calculation...
BMI calculator online...
```

This creates repetitive, low-value content.

Instead, every calculator should have content that is **specific to the calculation being performed**.

For example, the BMI page should explain BMI.

The EMI page should explain loan EMI.

The SIP page should explain SIP returns.

The Length Converter should explain unit conversion.

The Word Counter should explain words, characters, sentences, etc.

---

# 3. Target Page Structure

The calculator page should eventually follow this structure:

```text
┌──────────────────────────────────────┐
│ Breadcrumb                           │
│ Home / Category / Calculator         │
├──────────────────────────────────────┤
│                                      │
│ H1: Calculator Name                  │
│ Short description                    │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ │      INTERACTIVE CALCULATOR      │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: What is [Calculator]?            │
│                                      │
│ Explanation                          │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: How to Use the [Calculator]     │
│                                      │
│ 1. Step                              │
│ 2. Step                              │
│ 3. Step                              │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: [Calculator] Formula             │
│                                      │
│ Formula                              │
│ Variable explanations                │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: Example Calculation              │
│                                      │
│ Inputs → Calculation → Result        │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: Understanding Your Result       │
│                                      │
│ Result interpretation                │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: Important Notes / Considerations │
│                                      │
│ Assumptions / limitations            │
│                                      │
├──────────────────────────────────────┤
│                                      │
│ H2: Frequently Asked Questions       │
│                                      │
│ Q1                                   │
│ A1                                   │
│                                      │
│ Q2                                   │
│ A2                                   │
│                                      │
│ Q3                                   │
│ A3                                   │
│                                      │
└──────────────────────────────────────┘
```

Not every calculator needs every section.

The content model must support optional sections.

---

# 4. Important UX Rule

The calculator itself should remain **above the educational content**.

Do NOT push the actual calculator far down the page.

The primary intent of a visitor arriving at:

```text
/bmi
/finance/loan-emi
/units/length
```

is usually to use the tool.

Therefore:

```text
Breadcrumb
↓
Title + description
↓
Calculator
↓
Educational content
```

is the preferred structure.

---

# 5. Existing Architecture

The current project uses Astro and dynamically generates calculator pages through:

```text
src/pages/[category]/[calc].astro
```

Calculator metadata currently lives in:

```text
src/data/calculators.ts
```

Individual calculator implementations live in:

```text
src/components/calculators/
```

Examples:

```text
BmiCalculator.astro
EmiCalculator.astro
SipCalculator.astro
BmrCalculator.astro
TdeeCalculator.astro
...
```

Do not duplicate calculator logic into the content system.

The content system should be completely separate from the calculation logic.

---

# 6. Recommended Content Architecture

Do NOT put large blocks of prose directly inside:

```text
src/pages/[category]/[calc].astro
```

The dynamic page should remain clean.

Create a dedicated content data structure.

Recommended structure:

```text
src/data/
├── calculators.ts
├── calculatorContent.ts
└── units.ts
```

Alternative:

```text
src/data/calculator-content/
├── bmi.ts
├── loan-emi.ts
├── sip.ts
├── percentage.ts
└── ...
```

For the current project size, either approach is acceptable.

Prefer a single structured content file initially if it keeps the implementation simpler.

---

# 7. Content Data Model

Create a type/interface similar to:

```ts
export interface CalculatorContent {
  introduction?: string;

  howToUse?: string[];

  formula?: {
    expression?: string;
    explanation?: string;
    variables?: {
      symbol: string;
      name: string;
      description: string;
    }[];
  };

  example?: {
    description?: string;
    inputs?: {
      label: string;
      value: string;
    }[];
    calculation?: string;
    result?: string;
  };

  resultExplanation?: string;

  notes?: string[];

  faqs?: {
    question: string;
    answer: string;
  }[];
}
```

The exact TypeScript structure can be adjusted if a better architecture fits the existing project.

The important requirement is that the structure supports **different content sections per calculator**.

---

# 8. Content Should Be Data-Driven

The page should retrieve content using the calculator ID.

Conceptually:

```ts
const content = CALCULATOR_CONTENT[calc.id];
```

Example:

```ts
CALCULATOR_CONTENT = {
  bmi: {
    introduction: "...",
    howToUse: [...],
    formula: {...},
    example: {...},
    resultExplanation: "...",
    notes: [...],
    faqs: [...]
  },

  "loan-emi": {
    introduction: "...",
    howToUse: [...],
    formula: {...},
    example: {...},
    resultExplanation: "...",
    notes: [...],
    faqs: [...]
  }
}
```

This allows:

```text
One page template
+
Unique content per calculator
=
Consistent site architecture
```

---

# 9. Section 1 — Introduction

Every calculator should have a short introduction.

Suggested location:

```text
Calculator
↓
What is [Calculator]?
```

The introduction should explain:

* What the calculator does.
* What the calculation means.
* What inputs are required.
* Why someone would use it.

Target:

```text
1–3 paragraphs
```

Avoid unnecessarily long introductions.

Example style:

```text
## What is a BMI Calculator?

A BMI calculator estimates your body mass index using your
height and weight. BMI is calculated by dividing weight in
kilograms by height in meters squared.

This calculator can be used to quickly estimate BMI and
understand which standard BMI category the result falls into.
```

The actual wording must be specific to the calculator.

---

# 10. Section 2 — How to Use

The current project already has a basic:

```text
How to use [Calculator]
```

section.

Expand/refactor this into a proper content section.

Example:

```text
## How to Use the BMI Calculator

1. Enter your weight.
2. Select the appropriate weight unit.
3. Enter your height.
4. Select the appropriate height unit.
5. Click Calculate.
6. Review your BMI result and category.
```

The instructions must correspond exactly to the actual calculator UI.

DO NOT invent inputs that the calculator doesn't have.

The local AI must inspect the corresponding calculator component before writing these instructions.

---

# 11. Section 3 — Formula

Where a meaningful formula exists, explain it.

Example:

```text
## BMI Formula

BMI is calculated using:

BMI = weight / height²

Where:

Weight = body weight in kilograms
Height = height in meters
```

For financial calculations, explain each variable.

Example:

```text
EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:

P = principal loan amount
r = monthly interest rate
n = total number of monthly payments
```

For converters, a traditional formula section may not make sense.

Instead use:

```text
## How Unit Conversion Works
```

For tools such as Word Counter, use:

```text
## How Word Counting Works
```

Therefore:

**Do not force a "Formula" section onto every calculator.**

The content schema should support a custom section title/type where necessary.

---

# 12. Section 4 — Worked Example

Every calculator where a meaningful numerical example is possible should have one.

Structure:

```text
## Example Calculation

Suppose...

Inputs:
- ...
- ...
- ...

Calculation:

...

Result:

...
```

The example must be mathematically correct.

The implementation should avoid duplicating actual calculator computation logic where possible.

The example is explanatory content, not another calculator.

---

# 13. Section 5 — Understanding the Result

This section is extremely important.

A calculator should not simply say:

```text
Your result is 23.4
```

and leave the user wondering what that means.

Explain the result.

Examples:

### BMI

Explain the standard BMI ranges and what they generally indicate.

### EMI

Explain:

* Monthly payment
* Total interest
* Total repayment

### Percentage

Explain what the calculated percentage represents.

### Compound Interest

Explain:

* Principal
* Interest earned
* Final amount

### Unit Conversion

Explain the converted value and units.

### Date Difference

Explain what the number of days/weeks/months represents.

The content must be specific to the calculator.

---

# 14. Section 6 — Important Notes

Use this section only when meaningful.

Possible information:

* Assumptions
* Rounding behavior
* Unit conventions
* Limitations
* Standard formulas
* Region-specific rules
* Approximation warnings

Example:

```text
## Important Notes

- Results are rounded for display.
- Interest calculations assume the selected
  compounding frequency.
- Actual loan payments may differ depending on
  lender-specific terms and fees.
```

Do not add generic disclaimers to every calculator.

Only include notes that genuinely help the user understand the result.

---

# 15. Section 7 — FAQs

Each calculator should eventually have approximately:

```text
3–6 FAQs
```

Do not manufacture questions just to hit a number.

FAQs should answer questions a real user might ask.

For BMI:

```text
What is BMI?
How is BMI calculated?
What inputs are needed to calculate BMI?
What do BMI categories mean?
Is BMI suitable for everyone?
```

For EMI:

```text
What is EMI?
How is EMI calculated?
Does a higher loan tenure reduce EMI?
What happens to total interest when tenure increases?
```

For a unit converter:

```text
How do I convert meters to feet?
How many feet are in a meter?
What units does this converter support?
```

For Word Counter:

```text
What counts as a word?
Does the counter count characters?
Does it count spaces?
```

FAQs must be calculator-specific.

---

# 16. FAQ Structured Data

If FAQ structured data is already implemented globally, reuse the existing implementation where appropriate.

Do not create multiple conflicting JSON-LD blocks.

If FAQ content is available:

```ts
content.faqs
```

the page can generate corresponding FAQ structured data.

However:

**The visible FAQ content must exist on the page.**

Do not generate hidden FAQ content solely for search engines.

---

# 17. Content Length

Do NOT enforce a universal word count.

The goal is:

> Enough content to fully explain the calculator without adding fluff.

As a rough guideline:

### Simple tools

Examples:

```text
Word Counter
Case Converter
Color Converter
Unix Timestamp
```

Approximately:

```text
300–600 words
```

may be enough.

### Standard calculators

Examples:

```text
Percentage
BMI
Age
Date Difference
Fuel Cost
```

Approximately:

```text
500–900 words
```

may be appropriate.

### Complex calculators

Examples:

```text
EMI
SIP
Compound Interest
TDEE
GST
```

Approximately:

```text
700–1200+ words
```

may be appropriate if the subject genuinely requires it.

These are guidelines, NOT SEO targets.

Never add filler to reach a word count.

---

# 18. Different Calculator Types Need Different Content

The implementation must NOT assume every calculator follows the exact same sections.

## Type A — Mathematical calculators

Examples:

```text
Percentage
Fraction / Decimal
Prime Checker
Compound Interest
```

Preferred content:

```text
What it calculates
How to use
Formula / Method
Example
Understanding the result
FAQs
```

---

## Type B — Financial calculators

Examples:

```text
EMI
SIP
FD/RD
Compound Interest
GST
Discount
```

Preferred content:

```text
What it calculates
How to use
Formula
Variables
Worked example
Understanding the result
Important assumptions
FAQs
```

Be especially careful about:

* Interest rates
* Compounding
* Rounding
* Taxes
* Region-specific terminology

Do not present estimates as guaranteed financial outcomes.

---

## Type C — Health calculators

Examples:

```text
BMI
BMR
TDEE
Water Intake
```

Preferred content:

```text
What it calculates
How to use
Formula / methodology
Example
Understanding the result
Limitations
FAQs
```

Health content must be written carefully.

Do not make diagnostic claims.

Do not tell users that a calculator result proves they have a medical condition.

Use wording such as:

```text
estimate
screening measure
general reference
```

where appropriate.

---

## Type D — Unit converters

Examples:

```text
Length
Weight
Temperature
Area
Speed
Pressure
Energy
Data
```

Preferred content:

```text
What the converter does
Supported units
How conversion works
Common conversions
FAQs
```

Do NOT force an artificial formula section if the content would be repetitive.

---

## Type E — Date/time tools

Examples:

```text
Age
Date Difference
Date Add
Unix Timestamp
```

Preferred content:

```text
What the calculator does
How to use
How the calculation works
Example
Important date/time considerations
FAQs
```

---

## Type F — Utility tools

Examples:

```text
Word Counter
Case Converter
Color Converter
Recipe Scaler
```

Preferred content:

```text
What the tool does
How to use
Supported functionality
Example
Common use cases
FAQs
```

---

# 19. Visual Design

The new content must match the existing AllCalcKit visual language.

Do NOT turn the page into a generic blog article.

Use the existing:

* typography
* spacing
* borders
* neutral palette
* dark mode
* card styles
* rounded corners
* responsive behavior

The calculator should remain visually dominant.

Educational sections should feel like part of the calculator product.

---

# 20. Recommended Visual Hierarchy

Use approximately:

```text
H1
Calculator Name

Calculator UI

H2
What is...

H2
How to Use...

H2
Formula / How It Works

H2
Example

H2
Understanding Your Result

H2
Important Notes

H2
Frequently Asked Questions

H3
FAQ question
```

Do not use H1 for multiple sections.

Use semantic HTML:

```html
<article>
<section>
<h2>
<h3>
<p>
<ul>
<ol>
<table>
```

where appropriate.

---

# 21. Formula Presentation

Formulas should be visually distinguishable.

Example:

```text
BMI = weight / height²
```

could be displayed inside a small formula card.

Variable definitions can use a table:

| Symbol | Meaning               |
| ------ | --------------------- |
| P      | Principal amount      |
| r      | Monthly interest rate |
| n      | Number of payments    |

The implementation should keep formulas readable on mobile.

Do not use huge mathematical typography.

---

# 22. Tables

Use tables when they genuinely improve understanding.

Good examples:

### EMI

| Variable | Meaning               |
| -------- | --------------------- |
| P        | Loan principal        |
| r        | Monthly interest rate |
| n        | Number of payments    |

### Unit converter

| Unit    | Equivalent      |
| ------- | --------------- |
| 1 meter | 100 centimeters |
| 1 meter | 3.28084 feet    |

### BMI

A range/category table may be useful where appropriate.

Tables must be responsive on mobile.

Avoid tables simply to make pages longer.

---

# 23. Content Accuracy Requirements

This is critical.

The coding AI must NOT generate content blindly.

Before writing content for each calculator:

1. Open the calculator component.
2. Identify all actual inputs.
3. Identify the calculation logic.
4. Identify units.
5. Identify rounding behavior.
6. Identify edge cases.
7. Identify what the UI actually displays.
8. Write content based on the implementation.

For example, if the calculator supports:

```text
Principal
Annual Interest Rate
Loan Tenure
```

do not write that users enter:

```text
Processing Fee
Insurance
Down Payment
```

unless those fields actually exist.

---

# 24. Mathematical Accuracy

Every worked example and formula must be independently verified.

For each calculator:

```text
Formula
↓
Example inputs
↓
Manual calculation
↓
Expected result
↓
Compare with actual calculator
```

The example must produce a result consistent with the implementation.

Do not use approximate numbers without clearly indicating that they are approximate.

---

# 25. Avoid Keyword Stuffing

Do NOT add:

```text
BMI calculator
BMI calculator online
BMI calculator free
BMI calculator India
best BMI calculator
BMI calculator online free
BMI calculation
BMI calculator tool
```

repeatedly.

Instead use natural language.

Keywords should arise naturally from explaining the subject.

The primary SEO improvement comes from:

```text
Useful content
+
Clear page structure
+
Specific terminology
+
Accurate explanations
```

not keyword density.

---

# 26. Avoid Duplicate Content

This is extremely important because AllCalcKit has many calculators.

Do not create the same generic paragraph on every page:

```text
Use our free online calculator to quickly and accurately
calculate your result. Enter your values and click calculate.
```

Some UI instructions can naturally be similar, but the educational content must be calculator-specific.

For example:

Bad:

```text
This calculator provides fast and accurate results.
```

repeated 35 times.

Good:

```text
The EMI calculation uses the principal amount,
monthly interest rate, and total number of payments
to estimate the fixed monthly repayment.
```

---

# 27. Don't Add Artificial "SEO Sections"

Avoid sections such as:

```text
Why use our calculator?
Why choose AllCalcKit?
Best calculator online
Free online calculator
```

unless there is a genuine product reason.

The page should focus on the user's problem.

---

# 28. Content Should Be Evergreen Where Possible

Avoid unnecessary statements that become outdated.

For example:

Bad:

```text
In 2026, this is the most popular...
```

Better:

```text
This calculator is commonly used to estimate...
```

Region-specific rules should only be mentioned when the calculator actually depends on them.

---

# 29. Region-Specific Information

Some calculators may have regional behavior.

For example:

```text
GST
Currency
Tax
```

Do not silently present a region-specific rule as universally applicable.

Clearly identify assumptions.

Example:

```text
This calculator uses the GST rates configured in the tool.
Tax rules may change, so verify the applicable rate for your
transaction.
```

The exact content should match the implementation.

---

# 30. Mobile Requirements

All educational content must work well on mobile.

Requirements:

* No horizontal overflow.
* Formula blocks must wrap.
* Tables must be responsive.
* Paragraph width should remain readable.
* FAQ content should not create excessive vertical density.
* Headings should scale appropriately.
* Existing dark mode must remain correct.

Do not sacrifice the existing calculator UX to add content.

---

# 31. Performance Requirements

All content should be statically rendered by Astro.

Do NOT introduce a client-side CMS or large JavaScript content system.

Preferred:

```text
TypeScript data
↓
Astro build
↓
Static HTML
```

Avoid:

```text
fetch content from API
↓
JavaScript renders article
```

unless there is a compelling reason.

The educational content should add essentially no meaningful client-side JavaScript.

---

# 32. SEO Metadata

This task should NOT redesign the site's existing metadata system.

However, while implementing the content system, ensure each calculator has:

```text
Unique title
Unique meta description
Canonical URL
```

The title and description should accurately represent the calculator.

Do not use the new content as an excuse to add hundreds of keywords to the meta keywords tag.

The actual page content matters much more.

---

# 33. Suggested Content Schema

A more flexible version of the content model could look like:

```ts
export interface CalculatorContent {
  intro?: {
    title?: string;
    paragraphs: string[];
  };

  howToUse?: {
    title?: string;
    steps: string[];
  };

  howItWorks?: {
    title?: string;
    paragraphs?: string[];
    formula?: string;
    variables?: {
      symbol: string;
      name: string;
      description: string;
    }[];
  };

  example?: {
    title?: string;
    description?: string;
    inputs?: {
      label: string;
      value: string;
    }[];
    calculation?: string;
    result?: string;
  };

  result?: {
    title?: string;
    paragraphs: string[];
  };

  notes?: {
    title?: string;
    items: string[];
  };

  faqs?: {
    question: string;
    answer: string;
  }[];
}
```

This is a recommendation, not a strict API.

Adjust it to fit the existing project's TypeScript conventions.

---

# 34. Page Rendering Strategy

The dynamic calculator page:

```text
src/pages/[category]/[calc].astro
```

should roughly become:

```astro
<Layout ...>

  <Breadcrumb />

  <CalculatorHeader />

  <CalculatorWidget />

  <CalculatorContent content={content} />

</Layout>
```

The existing calculator selection logic should remain intact.

The content renderer should be responsible only for rendering the informational content.

---

# 35. Recommended Component Structure

If useful, create:

```text
src/components/calculator-content/
├── CalculatorContent.astro
├── ContentSection.astro
├── FormulaBlock.astro
├── ExampleBlock.astro
├── VariableTable.astro
└── FaqSection.astro
```

Do not over-engineer this.

If a single:

```text
CalculatorContent.astro
```

is sufficient, that is acceptable.

The goal is reusable rendering with calculator-specific data.

---

# 36. Initial Content Migration

Do NOT try to manually redesign all 40+ pages at once.

Implement the system first.

Then migrate calculators in batches.

Recommended first batch:

```text
BMI
EMI
SIP
Percentage
Compound Interest
Age
```

These provide good examples of different content types.

After validating the structure:

```text
Finance calculators
Health calculators
Math calculators
Date/time calculators
Unit converters
Utility calculators
```

---

# 37. Content Quality Checklist

Every calculator page should be reviewed against:

### Accuracy

* [ ] Formula is correct.
* [ ] Example is mathematically correct.
* [ ] Example matches calculator output.
* [ ] Inputs match the actual UI.
* [ ] Units match the implementation.
* [ ] Rounding behavior is accurate.

### Content

* [ ] Introduction explains the calculator.
* [ ] User knows how to use it.
* [ ] Calculation/method is explained where appropriate.
* [ ] Example exists where useful.
* [ ] Result is explained.
* [ ] Important limitations are mentioned where relevant.
* [ ] FAQs answer real questions.
* [ ] No filler content.

### SEO

* [ ] H1 is unique and descriptive.
* [ ] H2 hierarchy is logical.
* [ ] Important terminology occurs naturally.
* [ ] Content is unique to the calculator.
* [ ] No keyword stuffing.
* [ ] No hidden SEO text.
* [ ] Existing canonical remains correct.
* [ ] Existing metadata remains correct.

### UX

* [ ] Calculator remains above informational content.
* [ ] Content doesn't overwhelm the calculator.
* [ ] Mobile layout works.
* [ ] Dark mode works.
* [ ] Tables are responsive.
* [ ] Formula blocks are readable.
* [ ] Typography matches AllCalcKit.

### Performance

* [ ] Content is statically rendered.
* [ ] No unnecessary client-side JavaScript.
* [ ] No external API required for content.
* [ ] No significant bundle-size increase.

---

# 38. What NOT To Do

The implementation must NOT:

1. Create separate pages for every keyword variation.
2. Duplicate the same article across calculators.
3. Add hundreds of keywords to meta tags.
4. Hide SEO content from users.
5. Put the calculator below several paragraphs of content.
6. Add generic filler simply to increase word count.
7. Introduce a CMS unnecessarily.
8. Add client-side JavaScript for static content.
9. Modify calculator calculation logic unless an actual bug is discovered.
10. Change the existing visual identity unnecessarily.
11. Add internal-linking/related-calculator logic as part of this task.
12. Add hundreds of new calculators as part of this task.

---

# 39. Success Criteria

The task is considered successful when:

### Architecture

The project has a reusable calculator content system.

```text
Calculator ID
      ↓
Calculator metadata
      +
Calculator content
      ↓
Reusable Astro page
```

### User experience

A visitor can:

```text
Understand the calculator
        ↓
Use the calculator
        ↓
Understand the calculation
        ↓
Understand the result
        ↓
Get answers to common questions
```

without leaving the calculator page.

### SEO

Each calculator page contains meaningful, unique, topic-specific text that naturally establishes its search intent.

### Engineering

Adding content for a new calculator should require approximately:

```text
1 content object
+
calculator-specific information
```

rather than editing the page template.

---

# 40. Example Final Page

A completed BMI page should conceptually look like:

```text
Home / Health / BMI Calculator

BMI Calculator

Calculate your Body Mass Index using your height and weight.

┌──────────────────────────────┐
│                              │
│      BMI CALCULATOR          │
│                              │
│      [inputs]                │
│      [Calculate]             │
│                              │
│      Result: 23.4            │
│                              │
└──────────────────────────────┘


## What is a BMI Calculator?

[Unique explanation of BMI]


## How to Use the BMI Calculator

1. ...
2. ...
3. ...


## BMI Formula

BMI = weight / height²

Where:

Weight = ...
Height = ...


## Example Calculation

Suppose...

Input:
Weight = ...
Height = ...

Calculation:
...

Result:
...


## Understanding Your BMI

[Explain result/categories]


## Important Notes

- ...
- ...


## Frequently Asked Questions

### What is BMI?

...

### How is BMI calculated?

...

### Is BMI suitable for everyone?

...


```

This is the target experience.

---

# 41. Implementation Order

Implement in this exact order:

### Step 1 — Create content types

Create the TypeScript interfaces.

### Step 2 — Create content storage

Create:

```text
src/data/calculatorContent.ts
```

or an equivalent content directory.

### Step 3 — Create reusable renderer

Create:

```text
CalculatorContent.astro
```

and supporting components only if necessary.

### Step 4 — Integrate into `[calc].astro`

Retrieve content using:

```ts
calc.id
```

and render it after the calculator.

### Step 5 — Migrate existing "How to use" content

Move existing structured `howToUse` information into the new system rather than duplicating it.

### Step 6 — Implement six pilot calculators

Start with:

```text
BMI
EMI
SIP
Percentage
Compound Interest
Age
```

### Step 7 — Test

Check:

```text
Desktop
Mobile
Dark mode
Build
HTML output
Page source
SEO metadata
Formula accuracy
Example accuracy
```

### Step 8 — Migrate remaining calculators

Only after the structure has been validated.

---

# 42. Important Instruction For the Coding AI

Before making code changes:

**Inspect the existing implementation thoroughly.**

Specifically inspect:

```text
src/pages/[category]/[calc].astro
src/data/calculators.ts
src/components/calculators/*.astro
src/layouts/Layout.astro
```

Understand how each calculator works before generating its content.

Do not blindly rewrite existing architecture.

Prefer small, maintainable changes that integrate with the current Astro architecture.

The current calculator functionality is already working and should remain unchanged.

---

# 43. Final Product Philosophy

The purpose of this work is NOT:

> "Make every calculator page longer."

The purpose is:

> **Make every calculator page the best self-contained resource for using and understanding that particular calculator.**

A user who searches for:

```text
"EMI calculator"
```

should get a page where they can:

```text
Calculate EMI
        ↓
Understand EMI
        ↓
Understand the formula
        ↓
See an example
        ↓
Understand their result
        ↓
Get answers to common questions
```

Likewise, a user searching for:

```text
"meters to feet converter"
```

should get a page specifically useful for meter-to-feet conversion rather than a generic SEO article.

Quality, usefulness, accuracy and uniqueness take priority over page length and keyword count.
