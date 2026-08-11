# Feature 5: PWA / Offline Support

## What this is
Makes the site installable (add to home screen on mobile, install as an app on
desktop Chrome/Edge) and usable offline, since almost all calculators are already
pure client-side JS with no server dependency.

## Why this first (per build order in 00-overview.md)
This is the most foundational and lowest-risk of the 5 features — it's mostly
configuration, doesn't touch existing page logic, and has a clear pass/fail test
(it either installs and works offline, or it doesn't).

## Implementation approach

### 1. Web App Manifest
Check if `UI/public/site.webmanifest` already exists (the homepage HTML references
`<link rel="manifest" href="/site.webmanifest">`, so it may already be partially set
up). If it exists, review and ensure it has:
- `name` and `short_name` ("All Calc Kit" / "CalcKit")
- `icons` (should already have favicon/apple-touch-icon assets based on existing
  `<link rel="icon">` tags — reuse these, generate additional sizes if needed:
  typically 192x192 and 512x512 PNGs are required for install prompts)
- `start_url` (likely `/`)
- `display: "standalone"` (removes browser chrome when installed, makes it feel
  like a real app)
- `theme_color` and `background_color` (match the site's existing black/white
  dark-mode-first design)

If it doesn't exist or is incomplete, create/complete it.

### 2. Service Worker for offline support
Since Astro output is static, a simple service worker can cache the built assets
(HTML, CSS, JS) on first visit, so subsequent visits (and offline use) work without
a network connection.

**Recommended approach:** use `@vite-pwa/astro` (a maintained Astro integration for
PWA support) rather than hand-writing a service worker from scratch — it handles
cache versioning/invalidation automatically, which avoids a whole category of bugs
(stale cached assets after a new deploy — relevant given today's asset-hash mismatch
incident earlier). Check current documentation for this package before implementing,
since setup steps may have changed.

Key behavior to configure:
- Cache the app shell (HTML/CSS/JS) so the site loads offline after first visit.
- Ensure the service worker's cache invalidates correctly on new deployments (do NOT
  want a repeat of today's stale-asset problem, this time caused by an overly
  aggressive service worker cache instead of Cloudflare).
- The contact form's `/api/contact` endpoint requires network access (it's a real
  server call to Resend) — make sure the service worker does NOT try to cache or
  intercept that request; only static assets should be cached.

### 3. Install prompt (optional, nice-to-have)
Browsers show a native install prompt automatically once PWA criteria are met (valid
manifest + service worker + served over HTTPS, which the site already is via
Cloudflare). A custom "Install App" button that triggers the prompt programmatically
is optional polish, not required for this pass.

## What NOT to do
- Do not attempt to make the contact form work offline (queuing submissions for later
  send) — that's real added complexity for a feature (contact form) that inherently
  requires connectivity anyway.
- Do not hand-roll a service worker from scratch if `@vite-pwa/astro` (or an
  equivalent current, maintained package) is a viable option — reduces bug surface.

## Testing
- Chrome DevTools → Application tab → confirm the manifest is valid (no warnings) and
  the service worker registers successfully.
- Test install: use the browser's install option (desktop Chrome address bar icon, or
  mobile "Add to Home Screen"), confirm it installs and opens without browser chrome.
- Test offline: after visiting the site once, turn off network (DevTools → Network →
  Offline, or airplane mode on mobile), reload — confirm the site still loads and
  calculators still work.
- **Critical regression check:** after this feature ships and any future deploy
  happens, confirm the service worker correctly picks up new content (doesn't keep
  serving a stale cached version indefinitely) — test this explicitly on the first
  deploy after this feature merges.
