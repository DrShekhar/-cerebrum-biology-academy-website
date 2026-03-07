# Plan: Fix ~2000 Local SEO Pages Stuck in Google Indexing

## Problem Summary
541+ local SEO pages are stuck in "Discovered - currently not indexed" or "Crawled - currently not indexed" in GSC. Google refuses to index them because:

1. **Massive cannibalization** — 4-5 pages per city compete for the SAME keyword ("best neet coaching [city]")
2. **Tuition/Tutor duplication** — 50+ pages exist in both `/biology-tuition-*` AND `/biology-tutor-*` for identical areas
3. **Template thin content** — 130+ pages use `CityHubPage` with just the city name swapped (Google sees these as near-duplicates)
4. **Inflated sitemap priorities** — ALL local pages set to 0.85-0.9 priority, making Google ignore the signal entirely
5. **Crawl budget waste** — 541 local SEO URLs compete for crawl budget with core pages

## Page Inventory

| Category | Count | Content Type | Action |
|----------|-------|-------------|--------|
| `neet-coaching-*` (Content component) | 169 | Unique | KEEP — fix priorities |
| `neet-coaching-*` (inline client) | 85 | Semi-template | KEEP — enrich top 20 |
| `neet-coaching-*` (server) | 49 | Template | KEEP — lower priority |
| `neet-coaching-*` (SchoolLanding) | 35 | Data-driven | KEEP — lower priority |
| `neet-coaching-*` (CityHubPage) | 10 | Template | KEEP — lower priority |
| `biology-tutor-*` | 33 | Template | CONSOLIDATE with tuition |
| `biology-classes-*` (CityHubPage) | 23 | Template | KEEP — lower priority |
| `biology-tuition-*` | 12 | Mixed | KEEP (redirect tutor dupes here) |
| `best-neet-coaching-*` | 8 | Unique | KEEP — these are canonical |
| `top-10-neet-coaching-*` | 5 | Unique | REDIRECT → best-neet-coaching |
| `which-neet-coaching-*` | 5 | Unique | REDIRECT → best-neet-coaching |
| `affordable-neet-coaching-*` | 6 | Unique | REDIRECT → best-neet-coaching |
| `top-5-neet-coaching-*` | 2 | Unique | REDIRECT → best-neet-coaching |
| `biology-coaching-*` | 16 | Mixed | KEEP — lower priority |
| `best-biology-tuition-*` | 8 | CityHubPage | KEEP — lower priority |
| `[localSlug]` dynamic | 73 | Data-driven | KEEP — already unique |
| **TOTAL** | **541** | | |

---

## Phase 1: Immediate Fixes (Day 1) — Stop the Bleeding

### 1A. Add Cannibalization Redirects (~20 redirects)
Consolidate competing pages to single canonical per city.

**Redirects to add to `seo-redirects.mjs`:**
```
top-5-neet-coaching-* → best-neet-coaching-*
top-10-neet-coaching-* → best-neet-coaching-*
which-neet-coaching-is-best-in-* → best-neet-coaching-*
affordable-neet-coaching-* → best-neet-coaching-*
```

**Cities**: Faridabad (4), Ghaziabad (3), Gurugram (4), Greater Noida (3), Noida (3), Delhi (up to 3)
**Total**: ~20 redirects
**Pages removed from index**: ~18 (authority flows to 5-6 canonical pages)

### 1B. Consolidate Biology Tuition → Tutor (~15 redirects)
Since `biology-tutor-*` has 33 pages (more coverage), redirect the 12 `biology-tuition-*` pages to their tutor equivalents.

```
/biology-tuition → /biology-tutor
/biology-tuition-noida → /biology-tutor-noida
/biology-tuition-ghaziabad → /biology-tutor-ghaziabad
/biology-tuition-faridabad → /biology-tutor-faridabad
/biology-tuition-south-delhi → /biology-tutor-south-delhi
/biology-tuition-gurugram → /biology-tutor-gurugram
/biology-tuition-near-me → /biology-tutors-near-me
/biology-tuition-class-11 → /biology-tutor-class-11-cbse
/biology-tuition-class-12 → /biology-tutor-class-12-cbse
/biology-tuition-class-9-10 → /biology-tutor-class-9-cbse
/biology-tuition-class-11-noida → /biology-tutor-class-11-cbse
/biology-tuition-class-12-noida → /biology-tutor-class-12-cbse
```

**Pages removed from index**: ~12

### 1C. About Page Redirect (1 redirect)
```
/about-cerebrum-biology-academy → /about
```

**Total Phase 1 redirects**: ~33
**Total pages consolidated**: ~31 (authority consolidates to fewer, stronger pages)

---

## Phase 2: Sitemap Priority Fix (Day 1-2)

### Problem
ALL local SEO pages are at priority 0.85-0.9 in sitemap.ts. When everything is "high priority", nothing is. Google ignores the priority signal entirely.

### Fix: Tier-based Priority System

| Tier | Pages | Priority | Criteria |
|------|-------|----------|----------|
| Tier 1 | Home, /courses, /demo-booking, /about, /success-stories | 1.0 | Core conversion pages |
| Tier 2 | /locations/*, /best-neet-coaching-*, /neet-coaching-[major-city] | 0.8 | High-intent landing pages |
| Tier 3 | neet-coaching-* (with unique Content component, 169 pages) | 0.6 | Unique content local pages |
| Tier 4 | biology-tutor-*, biology-classes-*, [localSlug], school pages | 0.4 | Template/data-driven pages |
| Tier 5 | biology-coaching-*, best-biology-tuition-* (CityHubPage) | 0.3 | Pure template pages |

### Implementation
In `sitemap.ts`, change the hardcoded priority values:
- Lines 3425-7980: Local SEO pages currently at 0.85-0.9 → reduce to 0.4-0.6 based on tier
- Line 8021: `localAreaRoutes` priority 0.85 → change to 0.5
- Keep only Tier 1-2 pages at 0.8+

### Files to modify
- `src/app/sitemap.ts` — Update ~400 hardcoded priority values in the "Additional SEO Pages" section

---

## Phase 3: Thin Content Enrichment (Day 2-5)

### Problem
46 pages use `CityHubPage` component — same template, city name swapped. Google sees these as near-duplicates and refuses to index them.

### Fix Strategy: Add Unique Signals to CityHubPage

Modify `src/components/seo/CityHubPage.tsx` to accept and render:
1. **City-specific FAQ section** (5 unique Q&As per city from `CityHubData`)
2. **Local landmarks/directions** ("5 min from [Metro Station], near [Landmark]")
3. **City-specific testimonial** (1 student name + score from that area)
4. **Nearby schools served** (list 5-8 schools in that area)
5. **Local competition comparison** (brief table comparing 2-3 local coaching centers)

### Data Source
Enrich `src/data/city-seo/cities.ts` with per-city unique fields:
```typescript
interface CityHubData {
  // existing fields...
  faqs: { question: string; answer: string }[]  // 5 per city
  nearbySchools: string[]  // 5-8 schools
  landmarks: string[]  // 2-3 landmarks
  localTestimonial?: { name: string; score: string; college: string }
}
```

### Priority
Focus on Tier 2-3 cities first (the ones most likely to rank):
1. Delhi, Noida, Gurugram, Faridabad, Ghaziabad (5 cities)
2. South Delhi areas (8 areas)
3. Rohini, Green Park, Dwarka (3 areas)

---

## Phase 4: noindex Low-Value Pages (Day 2)

### Problem
Some pages will never rank because they target ultra-low-volume keywords or duplicate higher-ranking pages. These waste crawl budget.

### Candidates for noindex
- `biology-coaching-*` pages that overlap with `neet-coaching-*` for same city (16 pages)
- Any `neet-coaching-*` pages with < 10 monthly search volume for their target keyword

### Implementation
Add `robots: { index: false, follow: true }` to metadata of identified pages. This preserves link equity flow while removing them from the index competition.

### Estimated pages to noindex: 15-25

---

## Phase 5: GSC Re-indexing Push (Day 3)

### 5A. IndexNow API Integration
Add IndexNow to notify Bing/Yandex immediately when pages change.

Create `src/app/api/indexnow/route.ts`:
```typescript
// Submit batch of URLs to IndexNow API
// Bing indexes within hours, Google may follow
```

### 5B. GSC URL Inspection API (Manual)
For the ~50 highest-priority pages:
1. Go to GSC → URL Inspection
2. Submit each URL for re-indexing
3. Priority order: Tier 1 → Tier 2 → Tier 3 pages
4. GSC limit: ~10 URLs/day for inspection, but bulk submission via sitemap resubmit is unlimited

### 5C. Sitemap Resubmit
After all changes deployed:
1. Resubmit sitemap in GSC
2. Use "Request indexing" for top 50 consolidated canonical pages
3. Google will recrawl within 1-2 weeks

---

## Phase 6: Internal Linking Boost (Day 3-5)

### Problem
Many local SEO pages are orphans — no other page links to them. Google deprioritizes pages with no internal links.

### Fix: Add Internal Link Blocks

1. **Location hub pages** (`/locations/*`) — Add "Nearby Coaching Centers" section linking to 3-5 nearby `neet-coaching-*` pages
2. **Best-neet-coaching pages** — Add "Also serving nearby areas" footer linking to 3-4 adjacent area pages
3. **Footer** — Already has location links (done in previous commit)
4. **Blog posts** — Add contextual links to relevant local pages in existing NEET-related posts

### Implementation
- Modify 6 location pages to add "nearby" section
- Modify 5 best-neet-coaching pages to add area links
- Add 2-3 internal links in top 10 blog posts

---

## Execution Timeline

| Day | Task | Impact | Effort |
|-----|------|--------|--------|
| Day 1 | Phase 1: Add ~33 redirects | Eliminates 31 competing pages | 2 hours |
| Day 1-2 | Phase 2: Fix sitemap priorities | Tells Google what to crawl first | 2-3 hours |
| Day 2 | Phase 4: noindex 15-25 low-value pages | Reduces crawl waste | 1 hour |
| Day 2-5 | Phase 3: Enrich CityHubPage + data | Makes 46 pages unique | 4-6 hours |
| Day 3 | Phase 5: GSC resubmit + IndexNow | Triggers recrawl | 1 hour |
| Day 3-5 | Phase 6: Internal linking | Boosts page authority | 2-3 hours |

**Total active effort**: ~13-16 hours across 5 days
**Expected indexing improvement**: 2-4 weeks after deployment

---

## Files to Modify

| File | Action |
|------|--------|
| `src/config/seo-redirects.mjs` | Add ~33 cannibalization redirects |
| `src/app/sitemap.ts` | Fix priorities for 400+ local pages |
| `src/components/seo/CityHubPage.tsx` | Add FAQ, schools, landmarks sections |
| `src/data/city-seo/cities.ts` | Add per-city unique data |
| ~15-25 page layout.tsx files | Add noindex for low-value pages |
| 6 location pages | Add internal linking section |
| 5 best-neet-coaching pages | Add area cross-links |

---

## Expected Results

| Metric | Before | After (4 weeks) | After (8 weeks) |
|--------|--------|-----------------|-----------------|
| Indexed local SEO pages | ~100 of 541 | ~250 of 510 | ~400 of 510 |
| Pages competing per keyword | 4-5 | 1 | 1 |
| Crawl budget on local pages | Wasted on dupes | Focused on canonical | Efficient |
| Average sitemap priority | 0.85 (meaningless) | Tiered 0.3-0.8 | Tiered |
| "Discovered not indexed" | ~2000 | ~1000 | ~300 |

---

## Verification Checklist

After deployment:
- [ ] All 33 redirects return 301 (test with curl)
- [ ] `node scripts/audit-redirects.mjs` — 0 chains, 0 conflicts
- [ ] Sitemap priorities properly tiered (spot-check 10 URLs)
- [ ] noindex pages return `<meta name="robots" content="noindex, follow">`
- [ ] CityHubPage renders FAQ section for enriched cities
- [ ] GSC sitemap resubmitted
- [ ] Top 50 pages submitted for re-indexing in GSC
- [ ] Monitor GSC weekly for 4 weeks

---

## Priority Recommendation

**Do Phase 1 + Phase 2 FIRST** — these are the highest-impact, lowest-effort fixes. Consolidating 31 cannibalized pages and fixing sitemap priorities will immediately tell Google "these are the pages that matter." Phase 3-6 can follow incrementally.
