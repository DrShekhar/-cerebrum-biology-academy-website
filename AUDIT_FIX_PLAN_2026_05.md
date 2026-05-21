# Audit Fix Plan — May 2026

Based on parallel agent audits (UI/UX, Tech SEO, AEO/GEO, Performance, Content Cannibalization) run on 2026-05-21.

## Guardrails (apply to every phase)
- **Branch**: `audit-fix-2026-05` off main, no force pushes
- **Commit cadence**: per-issue or per-batch; never mix risk tiers in one commit
- **Per-commit verification**: `npx tsc --noEmit` + local `npm run build` for any structural change
- **GSC baseline**: snapshot impressions, CTR, top-100 URL indexability **before** Phase 4 (cannibalization). Compare weekly.
- **No deploy without explicit ask** (memory rule, all phases)
- **Hands off**: payment webhooks, Razorpay flow, demo/contact forms, sitemap.ts route lists, redirect destinations that already 301 — these stay frozen

---

## Phase 1 — Pure additive fixes (zero ranking / lead risk)

### 1a. UI/UX accessibility (~4 hrs)
- Add `id="main-content"` to every `<main>` element
- Add `aria-label` to icon-only buttons in `HeaderHybrid.tsx`, `Modal.tsx`, mobile nav
- `text-gray-400` → `text-gray-600` in `ErrorBoundary.tsx` and low-contrast helper text
- Fix H1→H3 skips on ~15 course pages (insert `<h2>` or demote `<h3>` → `<h2>`)
- Add `role="alert" aria-live="polite"` to Footer newsletter error message

### 1b. Performance additive (~3 hrs)
- Add `priority` + `sizes` to hero `<Image>` on top-20 landing pages
- Add `export const revalidate = 86400` (or 3600 for blog) to:
  - `/biology-notes/[slug]/page.tsx`
  - `/blog/[slug]/page.tsx`
  - City hub templates lacking it
- Skip any page already marked `dynamic = 'force-dynamic'`

### 1c. AEO additive (~6 hrs)
- Roll out `CerebrumPersonSchema` to 274 non-NCR service pages via layout.tsx
- Add `AuthorByline` component to blog post template ("Written by Dr. Shekhar C Singh", links to master entity page)
- Add 3 missing llms.txt Q&A blocks (crash-course, time management, NEET 2026 marks distribution)

### 1d. Error handling (~30 min)
- Replace `throw new Error(...)` with `notFound()` in:
  - `/demo/join/page.tsx`
  - `/claudechat/page.tsx`
  - `/demo-booking/reschedule/page.tsx`

**Risk to rankings/leads**: ~zero. Additive or visual-only. No URL change. No schema removal. No content removal.

---

## Phase 2 — Schema integrity (content-aware but additive)

### 2a. FAQ schema-to-content audit (~6 hrs)
- Script: extract every FAQPage schema's `mainEntity` and compare against visible H3/details
- For mismatches: regenerate schema from **visible** FAQ (don't change visible content to match stale schema)
- Start with top-50 traffic city pages

### 2b. Organization @id on city pages (~2 hrs)
- Add `"@id": "https://cerebrumbiologyacademy.com/#organization"` to LocalBusiness schemas on all 604 city pages

### 2c. HowTo schema (~3 hrs)
- Add HowTo schema to `/how-to-prepare-*` and `/*-preparation-guide` pages
- Generate from existing visible step content; skip if none

**Risk**: schema correctness fixes only. Mismatched FAQ schema risks Google penalty — fixing **reduces** risk.

---

## Phase 3 — Client-component metadata leak (structural, batched)

### 3a. Audit & categorize (~4 hrs)
- Script lists all 517 client pages, joined with GSC top-pages export
- Bucket A: top-100 traffic (one PR per ~10)
- Bucket B: mid-traffic (~300, batch 50/PR)
- Bucket C: low/no-traffic (~120, batch 100)

### 3b. Per-page split pattern
```
route/
  layout.tsx   ← NEW: server, exports generateMetadata, injects schemas
  page.tsx     ← keep 'use client', remove metadata exports
```
- Move `generateMetadata` + schema blocks to layout.tsx
- page.tsx keeps `'use client'` and identical UI

### 3c. Per-batch verification
- `npx tsc --noEmit`, build, spot-check 5 pages, verify `view-source:` metadata
- If any Bucket A URL drops >10% WoW in GSC, halt and investigate

**Risk**: medium structural risk if rushed. Mitigated by traffic-tiered batching. Title content stays identical — only export location changes.

---

## Phase 4 — Cannibalization (URL changes, redirects)

### 4a. /about consolidation (~15 min)
- 301: `/about` → `/about-cerebrum-biology-academy` in `seoPageConsolidationRedirects`
- Run `scripts/audit-redirects.mjs` to confirm 0 chains/conflicts

### 4b. "Best NEET coaching {city}" consolidation (~4 hrs)
- Canonical: `/best-neet-coaching-{city}`
- 301: `top-10-`, `top-5-`, `which-best-`, `affordable-` variants → canonical
- Bookmark GSC rankings beforehand; monitor 2-4 weeks

### 4c. Tuition vs tutor decision (~6 hrs research + 2 hrs redirects)
- Pull GSC per-city; keep variant with higher impressions/clicks
- Redirect loser → winner per city
- 5 cities/week, monitor, repeat

### 4d. Gurgaon ↔ Gurugram verification (~2 hrs)
- Script: check status of each `gurgaon` URL
- 301 any 200 duplicates → gurugram canonical
- Keep school-name slugs containing "Gurgaon" (e.g., "DPS Gurgaon")

### 4e. Missing hub pages (~6 hrs) — additive
- Create `/neet`, `/ap-biology`, `/mcat-biology` server pages
- Link to all spokes; add to sitemap (priority 0.9)
- Bidirectional links via breadcrumbs

**Risk**: medium. All 301s, not 404s. Run `scripts/audit-redirects.mjs` before every commit.

---

## Phase 5 — Performance infrastructure (build-time, no URL change)

### 5a. SEO barrel import refactor (~4 hrs)
- Replace `from '@/components/seo'` with explicit `from '@/components/seo/BreadcrumbSchema'`
- Verify bundle size drop via `npm run build:analyze`

### 5b. Reduce page-level `'use client'` (~20 hrs, iterative)
- Phase 3's layout/page split handles most cases
- Extract client islands for partial-interactive pages; leave fully-interactive pages as-is

### 5c. Re-enable `optimizeCss` (~3 hrs)
- Reproduce original MIME-type/CSP error locally
- Likely fix: CSP `style-src` directive — add `'unsafe-inline'` or nonce-based CSP
- Re-enable `optimizeCss: true`, verify build, test 5 random pages

### 5d. Bundle splitting / 8GB heap
- Run `npm run build:analyze`, identify chunks >500KB
- Don't refactor preemptively — wait for actual data
- Drop heap to 6GB only after chunks <500KB

**Risk**: low for 5a/5d (build-only). Medium for 5c (test thoroughly).

---

## Phase 6 — Out of scope this round
- Wikipedia article for Dr. Shekhar (6-month off-site effort)
- Quora/Reddit seeding (community work)
- Razorpay payment webhook stubs (blocked on credentials)
- MCQ tool (out of audit scope)

---

## Execution order
1. **Week 1**: Phase 1 (entirely additive)
2. **Week 2**: Phase 2 + start 5a/5c
3. **Weeks 3-5**: Phase 3 in batches (C → B → A)
4. **Weeks 4-6**: Phase 4 in parallel with Phase 3 (4a, 4e first)
5. **Week 6+**: 5b iterative, ongoing

## Rollback strategy
- Phase 1, 2, 5a: revert commit (pure additive, safe)
- Phase 3: revert moves metadata back into page.tsx, deletes layout.tsx — no content loss
- Phase 4: comment out one line in `seo-redirects.mjs` to undo
- Phase 5b/5c: feature-flag via env var if shipping mid-sprint
