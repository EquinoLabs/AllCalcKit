# AllCalcKit v1.1 — Feature Roadmap Overview

## Context
This version adds 5 features to the site. All are intentionally **client-side only** —
no backend, no database, no authentication, no LLM/AI. This keeps the stack exactly
as simple as what's already working (static Astro build + Cloudflare Pages Functions
for the contact form only).

## The 5 features (see individual docs for full detail)
1. `01-explain-this-result.md` — static "how this is calculated" content panel per tool
2. `02-life-decision-calculators.md` — 1-2 new calculators (Rent vs Buy is the pick)
3. `03-shareable-results.md` — shareable link/image for a calculation result
4. `04-comparison-mode.md` — side-by-side scenario comparison on select tools
5. `05-pwa-offline.md` — installable, offline-capable PWA

## Recommended build order
Build and test each feature independently, in this order, since later ones can reuse
patterns from earlier ones:

1. **PWA (05)** first — foundational, touches site-wide config, no risk of conflicting
   with other feature code, and easiest to verify (either it installs/works offline or
   it doesn't).
2. **Explain This Result (01)** second — pure content + one reusable component, no
   interactivity risk, easy to review page by page.
3. **Comparison Mode (04)** third — a reusable UI pattern, pick 1-2 tools to pilot it on
   before considering wider rollout.
4. **Shareable Results (03)** fourth — benefits from having comparison mode's data
   shape already figured out, since "share a comparison" may be a natural extension.
5. **Life-Decision Calculators (02)** last — entirely new tools, easiest to slot in once
   the other UI patterns (explain panel, share button, comparison) exist, so the new
   tools can use them from day one instead of retrofitting later.

## Branching & merge process (carry over from today's incident)
- All work happens on the feature branch already created off `dev-v.1.0` — NOT directly
  on `main`. `main` is protected via the GitHub ruleset already configured.
- Consider a sub-branch per feature (e.g. `feature/pwa`, `feature/explain-panel`) merged
  into the v1.1 branch as each is finished and tested, rather than one giant branch with
  all 5 features mixed together — easier to isolate if one feature causes a problem.
- Before merging the v1.1 branch into `main`:
  1. `npm run build` locally — confirm `dist/` is a flat static folder (no `client/`+`server/`
     split, unless a feature intentionally requires SSR again — none of these 5 should).
  2. Run the test suite (`npm test`).
  3. Test the contact form specifically via Wrangler (`npx wrangler pages dev dist`) — it's
     unrelated to these 5 features but is the most fragile part of the stack, worth a
     regression check on every release.
  4. Manually click through the site locally, including at least one page from each of
     the 5 new features.
  5. Only then merge to `main`, let Cloudflare deploy, and re-verify on the live domain
     (styled correctly, `.pages.dev` loads, contact form sends) before considering it done.

## Explicitly out of scope for this version
- No login/signup, no user accounts, no database
- No LLM/AI features (natural-language search parsing is a candidate for a *future*
  version, not this one)
- No SSR — everything stays static + Pages Functions only where already in use
