# docs/dev-v.1.2_Translation_Planning.md

# Internationalization (i18n) & Localization Planning (dev-v.1.2)

**Status:** Planned

**Priority:** Medium

**Risk Level:** 🟡 Medium

**Target Release:** dev-v.1.2

---

# 1. Overview

Transform AllCalcKit into a multilingual calculator platform.

Objectives:

- Remove language barriers.
- Improve accessibility.
- Expand global reach.
- Improve international SEO.

---

# 2. Product Philosophy

Translation should not depend on browser translation tools.

Translation should be implemented as a first-class platform feature.

---

# 3. Architecture Principles

## Approved Strategy

✅ Static localization.

---

## Rejected Strategies

❌ Google Translate API.

Reasons:

- Runtime dependency
- API cost
- Additional latency
- Poor SEO

---

❌ Client-side translation.

Reasons:

- Not indexable
- Poor SEO
- Translation quality issues

---

# 4. URL Structure

## English

```text
/en/units/length
```

---

## Hindi

```text
/hi/units/length
```

---

## French

```text
/fr/unites/longueur
```

---

## German

```text
/de/einheiten/lange
```

---

# 5. Language Rollout Strategy

## Phase 1

Languages:

- English
- Hindi

---

## Phase 2

Languages:

- French
- German

---

## Future

Additional languages should be determined using analytics.

---

# 6. Content Architecture

Current architecture:

```text
calculator-content/

    length.ts

    bmi.ts

    percentage.ts
```

---

Proposed architecture:

```text
calculator-content/

    en/

        length.ts

        bmi.ts

    hi/

        length.ts

        bmi.ts

    fr/

        length.ts

        bmi.ts

    de/

        length.ts

        bmi.ts
```

---

# 7. Metadata Translation

Translate:

- Titles
- Meta descriptions
- FAQs
- Educational content
- Breadcrumbs
- JSON-LD
- Internal links

---

# 8. hreflang Implementation

Required:

```html
<link
    rel="alternate"
    hreflang="en"
    href="/en/units/length"
/>

<link
    rel="alternate"
    hreflang="hi"
    href="/hi/units/length"
/>
```

Purpose:

Allow search engines to recognize equivalent pages across multiple languages.

---

# 9. SEO Benefits

Expected improvements:

- Better rankings in local-language searches.
- Better international indexing.
- Lower bounce rates.
- Increased session duration.

---

# 10. PWA Requirements

The following functionality must continue working:

- Offline mode
- Service worker caching
- Page preloading
- Static generation

Language switching must not break PWA caching.

---

# 11. Analytics Requirements

Track:

- Traffic by country
- Traffic by language
- Bounce rate
- Session duration
- Conversion by language

Use analytics to prioritize future languages.

---

# 12. Migration Strategy

## Step 1

Introduce language-aware content directories.

Do not add translations.

---

## Step 2

Implement routing support.

---

## Step 3

Implement language switching.

---

## Step 4

Add Hindi translations.

---

## Step 5

Validate:

- SEO
- hreflang
- PWA
- Lighthouse

---

## Step 6

Expand to French and German.

---

# 13. Risks

| Risk | Mitigation |
| --- | --- |
| Duplicate content | hreflang |
| Maintenance complexity | Separate content directories |
| PWA conflicts | Cache validation |
| SEO regressions | Incremental rollout |

---

# 14. Success Criteria

English:

```text
/en/
```

Hindi:

```text
/hi/
```

Requirements:

- Search engines recognize both versions.
- Users can switch languages.
- Offline support remains functional.
- Lighthouse scores remain stable.