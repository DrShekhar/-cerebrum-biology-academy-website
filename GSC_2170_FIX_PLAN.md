# GSC 2,170 Not-Indexed Pages — Fix Plan (March 1, 2026)

## Current State
- **Not Indexed**: 2,170 pages | **Indexed**: 1,980 pages
- **Existing redirects**: 560 in seo-redirects.mjs + 268 in next.config.mjs
- **Hardcoded SEO routes**: 514 directories in src/app/
- **Git**: Clean, on `main` branch

## Breakdown of 2,170 Not-Indexed Pages

| Reason | Pages | Action Needed |
|--------|-------|---------------|
| Not found (404) | 726 | TASK 1: Add missing 301 redirects |
| Page with redirect | 381 | No action (working correctly) |
| Crawled - not indexed | 265 | TASK 2: Fix thin content or noindex |
| Excluded by noindex | 226 | Verify intentional |
| Alternate page with canonical | 69 | No action (working correctly) |
| Blocked by robots.txt | 54 | Verify intentional |
| Duplicate without canonical | 30 | TASK 3: Add canonical tags |
| Redirect error | 9 | Fix broken redirects |
| Server error (5xx) | 6 | Fix server errors |
| Soft 404 | 1 | Fix soft 404 |
| Other reasons | ~203 | Investigate |

**Pages requiring NO action**: 381 (redirects) + 69 (canonical working) = **450 pages are fine**
**Pages requiring action**: ~1,720

---

## TASK 1: Fix 726 404 URLs (Add Missing 301 Redirects)

### Problem
GSC reports 726 404 URLs. We already have 238 GSC 404 cleanup redirects.
~488 URLs still returning 404 without redirects.

### Prerequisites
- **USER ACTION REQUIRED**: Export 404 URL list from GSC
  - Go to GSC → Indexing → Pages → "Not found (404)" → Export
  - Save CSV to project root as `gsc-404-export.csv`

### Execution Plan (3 Batches)

#### Batch 1A: Categorize 404 URLs (no code changes)
1. Parse the exported CSV
2. Categorize URLs into groups:
   - **City/locality pages** → redirect to parent city hub
   - **Old blog posts** → redirect to /blog or related post
   - **Old course URLs** → redirect to /courses or specific course
   - **API/asset URLs** → ignore (not real pages)
   - **Truly dead pages** → redirect to closest relevant page
3. Cross-reference against existing 560 redirects to find gaps
4. **Output**: Categorized list with redirect targets

#### Batch 1B: Add Redirect Rules (code changes)
1. Add new redirects to `src/config/seo-redirects.mjs` under a new array: `gsc404CleanupBatch2Redirects`
2. Process in sub-batches of ~50 redirects each (to stay within context)
3. Import new array in `next.config.mjs`
4. **Commit after each sub-batch of ~50 redirects**

#### Batch 1C: Update Sitemap
1. Add new redirect array to sitemap exclusion filter in `src/app/sitemap.ts`
2. Verify no 404 URLs appear in any sitemap
3. **Commit**: "fix(seo): exclude batch 2 404 redirects from sitemap"

### Estimated Impact: -726 not-indexed pages (404s resolved)

---

## TASK 2: Audit & Fix 514 Hardcoded SEO Routes + 265 Crawled-Not-Indexed

### Problem
- 514 hardcoded SEO route folders in src/app/
- Only ~10 have real data in intent-pages-data.ts
- Many are thin/duplicate (same template, city name swapped)
- 265 pages Google crawled but refused to index (quality signal)

### Prerequisites
- **USER ACTION REQUIRED**: Export "Crawled - currently not indexed" URLs from GSC
  - Go to GSC → Indexing → Pages → "Crawled - currently not indexed" → Export
  - Save CSV to project root as `gsc-crawled-not-indexed-export.csv`

### Execution Plan (5 Batches)

#### Batch 2A: Audit Route Content Quality
1. Scan all 514 hardcoded SEO route page.tsx files
2. Categorize each into:
   - **RICH**: Has unique content, custom component, >5KB (KEEP indexed)
   - **TEMPLATE**: Uses IntentLandingPage with data entry (KEEP if data exists)
   - **THIN**: <2KB, generic template, just city name swap (NOINDEX or REDIRECT)
   - **EMPTY**: No data entry, renders shell (REDIRECT to parent)
3. **Output**: Classification spreadsheet/JSON

#### Batch 2B: Noindex Thin Pages (code changes)
For pages classified as THIN:
1. Add `robots: { index: false, follow: true }` to their metadata
2. Process in batches of ~20 pages per commit
3. Pattern: Add noindex to metadata export in each page.tsx
4. **Commit after each batch of ~20 pages**

#### Batch 2C: Redirect Empty Pages (code changes)
For pages classified as EMPTY:
1. Add 301 redirects to `seo-redirects.mjs` under new array: `thinPageConsolidationBatch2Redirects`
2. Map each empty page to its closest parent hub:
   - `affordable-neet-coaching-{city}` → `/neet-coaching-{city}`
   - `aakash-alternative-{city}` → `/best-neet-coaching-{city}` or `/neet-coaching-{city}`
   - `allen-alternative-{city}` → `/best-neet-coaching-{city}` or `/neet-coaching-{city}`
   - `top-10-neet-coaching-{city}` → `/neet-coaching-{city}`
   - `when-to-start-neet-coaching-{city}` → `/neet-coaching-{city}`
3. **Commit after each batch of ~50 redirects**

#### Batch 2D: Remove Redirected Routes from Sitemap
1. Add new arrays to sitemap exclusion filter
2. Verify excluded pages don't appear in any sitemap
3. **Commit**: "fix(seo): exclude thin/empty page redirects from sitemap"

#### Batch 2E: Delete Empty Route Folders (optional, after redirects are live)
1. After confirming redirects work in production, delete the empty page.tsx folders
2. This reduces codebase bloat from 514 → only RICH + TEMPLATE pages
3. **Do this in a later session after verifying redirects on Vercel**

### Estimated Impact: -265 crawled-not-indexed + prevents future thin content issues

---

## TASK 3: Fix 30 "Duplicate Without User-Selected Canonical" Pages

### Problem
30 pages where Google found duplicates but no canonical tag was set.
Google picked a canonical itself — but it may have picked wrong.

### Prerequisites
- **USER ACTION REQUIRED**: Export "Duplicate without user-selected canonical" URLs from GSC
  - Go to GSC → Indexing → Pages → "Duplicate without user-selected canonical" → Export
  - Save CSV to project root as `gsc-duplicate-no-canonical-export.csv`

### Execution Plan (2 Batches)

#### Batch 3A: Identify Duplicate Pairs
1. Parse exported CSV to get the 30 URLs
2. For each URL, determine:
   - What is the preferred canonical version?
   - Is there already a canonical tag (that Google is ignoring)?
   - Is there a www vs non-www issue?
   - Is there a trailing slash vs no-trailing-slash issue?
   - Are there query parameter variants?
3. **Output**: Mapping of duplicate URL → canonical URL

#### Batch 3B: Add Canonical Tags (code changes)
1. For each of the 30 pages, add/fix `alternates: { canonical: '...' }` in metadata
2. If page uses `generatePageMetadata()`, verify canonical in `src/lib/seo/metadata.ts`
3. If page has inline metadata, add canonical directly
4. Add redirects where appropriate (e.g., www→non-www variants)
5. **Commit**: "fix(seo): add canonical tags to 30 duplicate pages"

### Estimated Impact: -30 not-indexed pages

---

## BONUS: Quick Wins (No Export Needed)

### B1: Fix 9 Redirect Errors
1. Check which redirects are broken (circular? chain? wrong target?)
2. Fix in seo-redirects.mjs or next.config.mjs
3. **Commit**: "fix(seo): resolve 9 broken redirect errors"

### B2: Fix 6 Server Errors (5xx)
1. Identify which pages are returning 500 errors
2. Fix the underlying code issue
3. **Commit**: "fix: resolve 6 server errors on SEO pages"

### B3: Verify 226 Noindex Pages
1. Cross-reference 226 noindex URLs against intentional noindex list
2. If any are accidentally noindexed, remove the noindex tag
3. **Commit if changes needed**: "fix(seo): remove accidental noindex from X pages"

### B4: Verify 54 Robots.txt Blocked Pages
1. Check if the 54 blocked URLs should actually be indexed
2. Update robots.txt if needed
3. **Commit if changes needed**: "fix(seo): unblock X pages from robots.txt"

---

## Execution Order & Context Window Strategy

### Session 1 (Current): Planning + Quick Wins
- [x] Create this plan
- [ ] B1: Fix 9 redirect errors (if URLs visible in GSC)
- [ ] B2: Fix 6 server errors (if URLs visible in GSC)
- [ ] Commit plan to git

### Session 2: Task 1 (404 Redirects) — NEEDS CSV EXPORT
- [ ] Batch 1A: Categorize 404 URLs
- [ ] Batch 1B: Add redirects (commit every ~50)
- [ ] Batch 1C: Update sitemap
- **Expected commits**: 8-12

### Session 3: Task 2 (Audit Routes) — Part 1
- [ ] Batch 2A: Audit all 514 routes (produce classification)
- [ ] Batch 2B: Noindex thin pages (commit every ~20)
- **Expected commits**: 5-8

### Session 4: Task 2 (Audit Routes) — Part 2
- [ ] Batch 2C: Redirect empty pages (commit every ~50)
- [ ] Batch 2D: Update sitemap exclusions
- **Expected commits**: 5-8

### Session 5: Task 3 (Duplicate Canonicals) — NEEDS CSV EXPORT
- [ ] Batch 3A: Identify duplicate pairs
- [ ] Batch 3B: Add canonical tags
- [ ] Bonus tasks B3, B4
- **Expected commits**: 2-3

### Session 6: Cleanup & Verification
- [ ] Batch 2E: Delete empty route folders (after production verification)
- [ ] Run full build to verify no breakage
- [ ] Deploy and request re-indexing in GSC

---

## Expected Overall Impact

| Metric | Before | After (Expected) |
|--------|--------|-------------------|
| Not Indexed | 2,170 | ~800-1,000 |
| 404 errors | 726 | ~0-50 |
| Crawled not indexed | 265 | ~50-100 |
| Duplicates without canonical | 30 | 0 |
| Redirect errors | 9 | 0 |
| Server errors | 6 | 0 |

**Target**: Reduce not-indexed from 2,170 → under 1,000 (54% improvement)

Note: "Page with redirect" (381) and "Alternate page with proper canonical" (69) are EXPECTED and will always show. "Excluded by noindex" (226) is intentional for thin/private pages.

---

## Files That Will Be Modified

| File | Tasks |
|------|-------|
| `src/config/seo-redirects.mjs` | Task 1, Task 2 |
| `next.config.mjs` | Task 1, Task 2 |
| `src/app/sitemap.ts` | Task 1, Task 2 |
| `src/lib/seo/metadata.ts` | Task 3 |
| Various `src/app/*/page.tsx` | Task 2 (noindex), Task 3 (canonical) |
| `middleware.ts` | If redirect errors found |
| `public/robots.txt` | If blocked pages need unblocking |
