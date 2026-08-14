# Feature 2: Life-Decision Calculators

## What this is
New calculators aimed at actual decisions, not just unit math. Unlike your existing
tools (length, weight, currency, etc.) these help someone decide between options.

## Scope for this pass
Build **one** new calculator first, fully polished with Explain-This-Result panel,
comparison mode, and share button already wired in (since those features should
exist by the time this is built, per the recommended build order in 00-overview.md).
Do not attempt multiple new calculators in the same pass — ship one well, evaluate,
then decide on a second for a future version.

### Pick: Rent vs Buy Calculator
Recommended first pick — high search volume, genuinely useful, not already commoditized
on the site.

**Suggested inputs:**
- Monthly rent (current or estimated)
- Home purchase price
- Down payment (% or amount)
- Mortgage interest rate (%)
- Loan term (years) — can reuse logic/patterns from the existing Loan/EMI calculator
- Property tax rate (%) and/or estimated annual amount
- Estimated annual home maintenance/repair cost (often modeled as ~1% of home value)
- Estimated annual home insurance cost
- Expected annual home appreciation rate (%)
- Expected investment return rate (%) — for opportunity cost of the down payment if
  invested instead
- Time horizon (years) — how long they plan to stay

**Suggested outputs:**
- Total cost of renting over the time horizon
- Total cost of buying over the time horizon (mortgage payments + taxes + insurance +
  maintenance, minus estimated home equity/appreciation gained)
- A clear "renting is cheaper by $X" or "buying is cheaper by $X" headline result
- Optionally, a breakeven year (the point at which buying becomes cheaper than renting,
  if it does within the time horizon)

**Category placement:** likely fits under "Currency & Finance" alongside Loan/EMI,
or could justify a new category if more life-decision tools are added later — decide
based on whether a 2nd tool is planned soon; if not, just add it to Finance for now.

## Implementation approach
1. Follow the exact same page/component structure as an existing finance calculator
   (e.g. `UI/src/pages/finance/loan-emi.astro`) — reuse its patterns for currency
   selector, slider inputs, result card styling, so it fits the site's existing design
   language exactly.
2. Add the new tool's metadata to the site's calculator registry/search data (the same
   `CALCULATORS` array structure used elsewhere) so it shows up in Cmd+K search and any
   category listing pages.
3. Add it to the relevant category page in the "Currency & Finance" section and to the
   homepage's complete directory grid, matching how other finance tools are listed there.
4. Include the Explain-This-Result panel (Feature 1) with the formula/methodology
   explained, since financial calculators particularly benefit from users understanding
   the assumptions behind the number.

## What NOT to do
- Do not build more than one new calculator in this pass.
- Do not skip the disclaimer: financial calculators should note this is an estimate for
  informational purposes, not financial advice (matches the site's existing tone — check
  if other finance tools already have similar disclaimer language and match it).

## Testing
- Verify the math against a known reference (a real rent-vs-buy calculator or manual
  spreadsheet calculation) with the same inputs, to confirm formula correctness before
  shipping — financial calculators need to be accurate, this is not a cosmetic feature.
- Confirm it appears correctly in Cmd+K search and the Finance category page.
