# Feature 3: Shareable Results

## What this is
A "Share this result" button on calculator pages that lets a user share their specific
calculation — either as a link (URL with the inputs encoded as query params, so opening
it reproduces the same result) or as a generated image/card suitable for social sharing.

## Scope for this pass
Start with **link sharing only** (simpler, no image generation needed). Image/card
generation can be a future enhancement if link sharing proves popular.

## Implementation approach

### Link sharing (this pass)
1. On supported calculator pages, encode the current input values into the URL as
   query parameters when the user clicks "Share" (e.g.
   `/finance/loan-emi?amount=250000&rate=8.5&years=20`).
2. On page load, check for these query parameters and pre-fill the calculator's inputs
   if present, so the shared link reproduces the exact same result the sharer saw.
3. The "Share" button should use the browser's native `navigator.share()` API where
   available (mobile — gives a native share sheet), falling back to a simple
   "copy link to clipboard" button with a brief confirmation (e.g. "Link copied!") on
   desktop browsers that don't support `navigator.share()`.
4. Build this as a small reusable component/script pattern (not copy-pasted per page)
   since multiple calculators will use it — e.g. a shared utility function that reads/
   writes URL query params for a given set of input element IDs.

## Which tools to add this to (this pass)
Start with 2-3 tools where sharing a result genuinely makes sense — the new Rent vs Buy
calculator (Feature 2) and Loan/EMI Calculator are strong candidates, since "look what
I calculated" is a natural share moment for financial decisions. Don't roll out to all
tools yet.

## What NOT to do
- Do not build image/card generation in this pass — link-based sharing only.
- Do not store shared results server-side (no database) — everything is encoded in the
  URL itself, which requires no backend at all.
- Be careful with input validation on page load: if someone shares a malformed or
  tampered URL, the page should fail gracefully (fall back to default/empty inputs)
  rather than crash.

## Testing
- Generate a share link, open it in a new incognito tab, confirm the calculator
  pre-fills correctly with the same result.
- Test on both a mobile browser (confirm native share sheet appears) and desktop
  (confirm clipboard copy + confirmation message works).
- Test a deliberately malformed URL (missing/invalid query params) to confirm it
  doesn't break the page.
