# Feature 1: "Explain This Result" Panel

## What this is
A collapsible content section added to each calculator page, below the interactive
tool, explaining: the formula used, a worked example, and 1-2 sentences on why/when
someone would use this. This is **static, hand-written content** — not AI-generated,
not dynamic based on user input.

## Why
1. Genuinely useful to users who want to understand the number, not just see it.
2. Search engines and AI answer engines (Google AI Overviews, Perplexity, ChatGPT
   search) favor pages with real explanatory content over bare input/output tools —
   this directly helps SEO/discoverability.

## Scope for this pass
Do NOT attempt all 40+ tools at once. Start with the 5 most-trafficked tools (check
Google Analytics for the actual top 5 by pageviews before starting — do not guess).
Likely candidates based on the "popular" flag already in the site's calculator data:
Currency Converter, Loan/EMI Calculator, BMI Calculator, Percentage Calculator,
Tip & Bill Splitter — but confirm against real analytics data first.

## Implementation approach
1. Build ONE reusable Astro component, e.g. `UI/src/components/ExplainPanel.astro`,
   that accepts props: `formula` (string or markdown), `example` (string), `useCase`
   (string), and renders a collapsible `<details>` section (matching the existing FAQ
   section's `<details>`/`<summary>` pattern already used on the homepage — reuse that
   exact styling for consistency).
2. For each of the 5 target calculator pages, add content data (formula, example,
   use case) — either inline in the page file, or centralized in a data file like
   `UI/src/data/explainContent.ts` keyed by tool id (reuse the existing `CALCULATORS`
   id scheme already used for search, e.g. `"bmi"`, `"loan-emi"`, `"currency"`).
3. Import and render `<ExplainPanel />` on each of the 5 target pages, passing the
   right content.

## What NOT to do
- Do not generate this content via an LLM/AI API call.
- Do not make this dynamic/interactive beyond expand-collapse — it's static content.
- Do not touch the calculator logic/JS itself on these pages, only add the new panel
  below the existing tool.

## Testing
- Visually confirm the panel renders correctly, expands/collapses, and matches site
  styling (dark/light mode both) on all 5 target pages.
- Confirm no regression to the existing calculator functionality on those pages.
