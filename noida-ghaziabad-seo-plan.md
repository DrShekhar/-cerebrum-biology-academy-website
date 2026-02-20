# Noida, Greater Noida & Ghaziabad — SEO/AEO/GEO Implementation Plan

**Date:** February 19, 2026
**Status:** Awaiting Approval
**Implementation:** Sonnet agents (parallel teams)
**Content Rule:** Cerebrum is always positioned as #1 choice. No competitor praise.

---

## Current State

| City | Area Pages | Standalone Pages | School Pages | Coordinates |
|------|-----------|-----------------|-------------|-------------|
| Noida | 30 (dynamic) | ~24 | 0 | Missing |
| Greater Noida | ~9 (in noida-areas.ts) | 3 | 0 | Missing |
| Ghaziabad | 14 (dynamic) | ~4 | 0 | Missing |
| **Total existing** | **53** | **~31** | **0** | **0** |

### Faridabad benchmark (what we just built): 45 area + 34 standalone + 10 school = **89 pages**

---

## What We're Building

| # | Workstream | New Pages | Template Source |
|---|-----------|-----------|----------------|
| 1 | Infrastructure fixes (coordinates, bug fix) | 0 | — |
| 2 | Missing area sub-pages (Noida + Ghaziabad) | 8 | Dynamic route data entries |
| 3 | School-specific pages (Noida + Ghaziabad) | 15 | `SchoolLandingPage` component |
| 4 | Noida standalone keyword pages | 18 | Faridabad equivalents |
| 5 | Ghaziabad standalone keyword pages | 12 | Faridabad equivalents |
| 6 | Greater Noida standalone keyword pages | 6 | Faridabad equivalents |
| 7 | MCQ cross-links on Noida + Ghaziabad area pages | 0 | Faridabad AreaPageContent pattern |

**Total: 59 new pages + infrastructure fixes**

---

## Workstream 1: Infrastructure Fixes (0 new pages)

### 1A. Add NOIDA_AREA_COORDINATES to metrics.ts

Add lat/lng for all 30 Noida area slugs used in `noida-areas.ts`.

**File:** `src/lib/constants/metrics.ts`

Key coordinates:
| Area | Lat | Lng |
|------|-----|-----|
| sector-18 | 28.5685 | 77.3210 |
| sector-62 (center) | 28.6280 | 77.3649 |
| sector-15 | 28.5800 | 77.3100 |
| sector-44 | 28.5750 | 77.3500 |
| sector-16 | 28.5700 | 77.3150 |
| sector-50 | 28.5900 | 77.3400 |
| sector-76 | 28.6200 | 77.3800 |
| sector-77 | 28.6250 | 77.3850 |
| sector-78 | 28.6300 | 77.3900 |
| sector-137 | 28.5100 | 77.3600 |
| ...all 30 areas | | |

### 1B. Add GHAZIABAD_AREA_COORDINATES to metrics.ts

Add lat/lng for all 14 Ghaziabad area slugs.

Key coordinates:
| Area | Lat | Lng |
|------|-----|-----|
| indirapuram | 28.6410 | 77.3580 |
| vaishali | 28.6420 | 77.3380 |
| kaushambi | 28.6450 | 77.3250 |
| raj-nagar-extension | 28.7200 | 77.4500 |
| crossings-republik | 28.6600 | 77.4300 |
| vasundhara | 28.6600 | 77.3650 |
| ...all 14 areas | | |

### 1C. Fix Ghaziabad Schema Bug

**File:** `src/app/neet-coaching-ghaziabad/[area]/page.tsx`

**Bug:** Schema has hardcoded `addressLocality: 'Noida'` and `pincode: '201301'`. Should use Ghaziabad-specific values from the area data (e.g., `area.pincode`, `addressLocality: 'Ghaziabad'`).

### 1D. Add MCQ cross-links to Noida AreaPageContent

**File:** `src/app/neet-coaching-noida/[area]/AreaPageContent.tsx`

Add "Free NEET Practice Tools" section (same pattern as Faridabad AreaPageContent):
- MCQ Practice (19,600+ Questions) → /mcq
- NEET Score Calculator → /neet-score-calculator
- Rank Predictor → /neet-rank-predictor
- College Predictor → /neet-college-predictor

### 1E. Add MCQ cross-links to Ghaziabad AreaPageContent

**File:** `src/app/neet-coaching-ghaziabad/[area]/AreaPageContent.tsx`

Same section as above.

---

## Workstream 2: Missing Area Sub-Pages (8 new pages)

### Pattern
Add entries to `noida-areas.ts` and `ghaziabad-areas.ts`. Dynamic routes auto-generate pages.

### 2A. New Noida Area Entries (4 areas)

**File:** `src/data/noida-areas.ts`

| Slug | Name | Type | Distance | Why |
|------|------|------|----------|-----|
| `sector-12` | Sector 12 | residential | 5 km | Schools catchment, active searches |
| `sector-25` | Sector 25 | residential | 4 km | Near Film City, residential demand |
| `film-city` | Film City | commercial | 4 km | Landmark-based searches |
| `atta-market` | Atta Market | commercial | 3 km | Landmark-based searches, high footfall |

### 2B. New Ghaziabad Area Entries (4 areas)

**File:** `src/data/ghaziabad-areas.ts`

| Slug | Name | Type | Distance | Why |
|------|------|------|----------|-----|
| `mohan-nagar` | Mohan Nagar | commercial | 12 km | Active searches, commercial hub |
| `sahibabad` | Sahibabad | industrial | 10 km | Industrial/residential, metro access |
| `raj-nagar` | Raj Nagar | residential | 14 km | Distinct from Raj Nagar Extension |
| `wave-city` | Wave City | township | 18 km | Large developing township |

---

## Workstream 3: School-Specific Pages (15 pages)

### Pattern
Add entries to `src/data/school-seo/school-pages-data.ts`. Create thin `page.tsx` wrappers.

### 3A. Noida Schools (8 pages)

| Page Slug | School | Location | Distance |
|-----------|--------|----------|----------|
| `neet-coaching-dps-noida-students` | DPS Noida | Sector 30 | 4 km |
| `neet-coaching-amity-noida-students` | Amity International | Sector 44 | 3 km |
| `neet-coaching-ryan-noida-students` | Ryan International | Sector 39 | 3 km |
| `neet-coaching-lotus-valley-noida-students` | Lotus Valley | Sector 126 | 7 km |
| `neet-coaching-kv-noida-students` | Kendriya Vidyalaya Noida | Sector 24 | 4 km |
| `neet-coaching-pathways-noida-students` | Pathways World School | Sector 100 | 5 km |
| `neet-coaching-jaypee-noida-students` | Jaypee Public School | Sector 128 | 8 km |
| `neet-coaching-somerville-noida-students` | Somerville School | Sector 22 | 4 km |

### 3B. Ghaziabad Schools (5 pages)

| Page Slug | School | Location | Distance |
|-----------|--------|----------|----------|
| `neet-coaching-dps-indirapuram-students` | DPS Indirapuram | Indirapuram | 8 km |
| `neet-coaching-cambridge-ghaziabad-students` | Cambridge School | Indirapuram | 8 km |
| `neet-coaching-gd-goenka-ghaziabad-students` | GD Goenka | Indirapuram | 9 km |
| `neet-coaching-kr-mangalam-ghaziabad-students` | K.R. Mangalam | Vaishali | 5 km |
| `neet-coaching-presidium-ghaziabad-students` | Presidium School | Indirapuram | 8 km |

### 3C. Greater Noida Schools (2 pages)

| Page Slug | School | Location | Distance |
|-----------|--------|----------|----------|
| `neet-coaching-sharda-greater-noida-students` | Sharda University School | Knowledge Park | 18 km |
| `neet-coaching-dps-greater-noida-students` | DPS Greater Noida | Sector 132 | 10 km |

---

## Workstream 4: Noida Standalone Keyword Pages (18 pages)

All pages clone from Faridabad equivalents with location/contact substitutions.

### Contact Info: Noida Center
- Address: B-45, Sector 62, Noida 201301
- Phone: (from CONTACT_INFO.location.noida)
- Center: Sector 62 Noida Center

### 4A. Tier 1 — High Commercial Intent (8 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 1 | `best-neet-coaching-noida` | `best-neet-coaching-faridabad` | best NEET coaching Noida, top NEET institute Noida |
| 2 | `top-10-neet-coaching-noida` | `top-10-neet-coaching-faridabad` | top 10 NEET coaching in Noida, best NEET coaching centers |
| 3 | `neet-coaching-near-me-noida` | `neet-coaching-near-me-faridabad` | NEET coaching near me Noida, NEET institute near me |
| 4 | `affordable-neet-coaching-noida` | `affordable-neet-coaching-faridabad` | affordable NEET coaching Noida, cheap NEET coaching Noida |
| 5 | `neet-dropper-batch-noida` | `neet-dropper-batch-faridabad` | NEET dropper batch Noida, NEET repeater course Noida |
| 6 | `neet-crash-course-noida` | `neet-crash-course-faridabad` | NEET crash course Noida, NEET intensive Noida |
| 7 | `neet-test-series-noida` | `neet-test-series-faridabad` | NEET test series Noida, NEET mock test Noida |
| 8 | `neet-scholarship-noida` | `neet-scholarship-faridabad` | NEET scholarship Noida, NEET coaching with scholarship |

### 4B. Tier 2 — Program Duration Pages (4 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 9 | `1-year-neet-course-noida` | `1-year-neet-course-faridabad` | 1 year NEET course Noida |
| 10 | `2-year-neet-course-noida` | `2-year-neet-course-faridabad` | 2 year NEET course Noida |
| 11 | `neet-foundation-class-9-noida` | `neet-foundation-class-9-faridabad` | NEET foundation class 9 Noida |
| 12 | `neet-foundation-class-10-noida` | `neet-foundation-class-10-faridabad` | NEET foundation class 10 Noida |

### 4C. Tier 3 — Batch Type & Utility Pages (3 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 13 | `neet-evening-batch-noida` | `neet-evening-batch-faridabad` | NEET evening batch Noida |
| 14 | `neet-weekend-batch-noida` | `neet-weekend-batch-faridabad` | NEET weekend batch Noida |
| 15 | `free-neet-demo-class-noida` | `free-neet-demo-class-faridabad` | free NEET demo class Noida |

### 4D. Tier 4 — Competitor Capture Pages (3 pages)

Content rule: Position Cerebrum as the smarter choice. Do NOT praise competitors.

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 16 | `aakash-alternative-noida` | `aakash-alternative-faridabad` | Aakash alternative Noida, better than Aakash Noida |
| 17 | `allen-alternative-noida` | `allen-alternative-faridabad` | Allen alternative Noida, better than Allen Noida |
| 18 | `which-neet-coaching-is-best-in-noida` | `which-neet-coaching-is-best-in-faridabad` | which NEET coaching is best in Noida |

---

## Workstream 5: Ghaziabad Standalone Keyword Pages (12 pages)

### Contact Info: Ghaziabad (served by Noida Center)
- Address: B-45, Sector 62, Noida 201301 (nearest center)
- Note: Online + metro-accessible from all Ghaziabad areas via Blue Line

### 5A. Tier 1 — High Commercial Intent (5 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 1 | `best-neet-coaching-ghaziabad` | `best-neet-coaching-faridabad` | best NEET coaching Ghaziabad |
| 2 | `neet-coaching-near-me-ghaziabad` | `neet-coaching-near-me-faridabad` | NEET coaching near me Ghaziabad |
| 3 | `affordable-neet-coaching-ghaziabad` | `affordable-neet-coaching-faridabad` | affordable NEET coaching Ghaziabad |
| 4 | `neet-dropper-batch-ghaziabad` | `neet-dropper-batch-faridabad` | NEET dropper batch Ghaziabad |
| 5 | `neet-crash-course-ghaziabad` | `neet-crash-course-faridabad` | NEET crash course Ghaziabad |

### 5B. Tier 2 — Program & Utility Pages (4 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 6 | `neet-scholarship-ghaziabad` | `neet-scholarship-faridabad` | NEET scholarship Ghaziabad |
| 7 | `neet-test-series-ghaziabad` | `neet-test-series-faridabad` | NEET test series Ghaziabad |
| 8 | `is-coaching-necessary-for-neet-ghaziabad` | `is-coaching-necessary-for-neet-faridabad` | is coaching necessary for NEET Ghaziabad |
| 9 | `neet-coaching-fees-ghaziabad` | `neet-coaching-fees-faridabad` | NEET coaching fees Ghaziabad |

### 5C. Tier 3 — Competitor Capture Pages (3 pages)

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 10 | `aakash-alternative-ghaziabad` | `aakash-alternative-faridabad` | Aakash alternative Ghaziabad |
| 11 | `allen-alternative-ghaziabad` | `allen-alternative-faridabad` | Allen alternative Ghaziabad |
| 12 | `which-neet-coaching-is-best-in-ghaziabad` | `which-neet-coaching-is-best-in-faridabad` | which NEET coaching is best Ghaziabad |

---

## Workstream 6: Greater Noida Standalone Pages (6 pages)

### Contact Info: Greater Noida (served by Noida Center)
- Nearest center: Sector 62 Noida (15-20 km depending on area)
- Online classes available for all Greater Noida students

| # | Slug | Template From | Target Keywords |
|---|------|--------------|-----------------|
| 1 | `best-neet-coaching-greater-noida` | `best-neet-coaching-faridabad` | best NEET coaching Greater Noida |
| 2 | `affordable-neet-coaching-greater-noida` | `affordable-neet-coaching-faridabad` | affordable NEET coaching Greater Noida |
| 3 | `neet-dropper-batch-greater-noida` | `neet-dropper-batch-faridabad` | NEET dropper batch Greater Noida |
| 4 | `neet-crash-course-greater-noida` | `neet-crash-course-faridabad` | NEET crash course Greater Noida |
| 5 | `neet-scholarship-greater-noida` | `neet-scholarship-faridabad` | NEET scholarship Greater Noida |
| 6 | `aakash-alternative-greater-noida` | `aakash-alternative-faridabad` | Aakash alternative Greater Noida |

---

## Workstream 7: MCQ Cross-Links (0 new pages)

Already covered in Workstream 1D and 1E above.

---

## Execution Order

### Phase 1 — Infrastructure (no new pages)
1. Add NOIDA_AREA_COORDINATES to `metrics.ts` (30 entries)
2. Add GHAZIABAD_AREA_COORDINATES to `metrics.ts` (14 entries)
3. Fix Ghaziabad schema bug in `[area]/page.tsx`
4. Add MCQ cross-links to Noida `AreaPageContent.tsx`
5. Add MCQ cross-links to Ghaziabad `AreaPageContent.tsx`
6. **Git commit:** "Fix Ghaziabad schema bug, add coordinates, MCQ cross-links"

### Phase 2 — Area Pages (8 new pages, auto-generated)
7. Add 4 new Noida area entries to `noida-areas.ts`
8. Add 4 new Ghaziabad area entries to `ghaziabad-areas.ts`
9. Verify all new area pages render
10. **Git commit:** "Add 8 area pages (Noida + Ghaziabad)"

### Phase 3 — School Pages (15 pages)
11. Add 15 school entries to `school-pages-data.ts`
12. Create 15 thin `page.tsx` files
13. **Git commit:** "Add 15 school-specific pages (Noida + Ghaziabad + Greater Noida)"

### Phase 4 — Noida Standalone Pages (18 pages)
14. Create 8 Tier 1 high-commercial-intent pages
15. Create 4 Tier 2 program duration pages
16. Create 3 Tier 3 batch/utility pages
17. Create 3 Tier 4 competitor capture pages
18. **Git commit:** "Add 18 Noida standalone keyword pages"

### Phase 5 — Ghaziabad Standalone Pages (12 pages)
19. Create 5 Tier 1 pages
20. Create 4 Tier 2 pages
21. Create 3 Tier 3 competitor pages
22. **Git commit:** "Add 12 Ghaziabad standalone keyword pages"

### Phase 6 — Greater Noida Standalone Pages (6 pages)
23. Create 6 standalone pages
24. **Git commit:** "Add 6 Greater Noida standalone keyword pages"

### Phase 7 — Verification
25. `npx tsc --noEmit` — zero new type errors
26. `npm run build` — all pages statically generate
27. Prettier format all new files
28. Spot-check pages
29. **Final commit if any formatting fixes needed**

---

## Parallel Agent Strategy

Using **Sonnet** agents for implementation:

| Agent | Workstream | Pages | Est. Size |
|-------|-----------|-------|-----------|
| infra-agent | Phase 1 (infrastructure) + Phase 2 (area data) | 0+8 | ~15KB edits |
| school-agent | Phase 3 (school pages) | 15 | ~30KB |
| noida-agent-a | Phase 4A-4B (Noida Tier 1-2, pages 1-12) | 12 | ~250KB |
| noida-agent-b | Phase 4C-4D (Noida Tier 3-4, pages 13-18) | 6 | ~120KB |
| ghaziabad-agent | Phase 5 (all Ghaziabad) | 12 | ~240KB |
| greater-noida-agent | Phase 6 (all Greater Noida) | 6 | ~120KB |

**6 agents running in parallel**, all using Sonnet model.

---

## Content Guidelines (ALL pages)

1. **Cerebrum = #1 choice.** Every page positions Cerebrum as the top, recommended option.
2. **No competitor praise.** When comparing, highlight Cerebrum strengths vs competitor weaknesses (large batches, expensive fees, not biology-specific).
3. **Competitor fee data (for comparison sections):**
   - Aakash: 1.36L-3.5L/year (large batches 50-70 students)
   - Allen: 1.5L-2.8L/year (no local Noida center)
   - Narayana: 1.7L-3.5L/year (large batches)
   - Physics Wallah: Online only (no personal attention)
   - Cerebrum: 45K-1.56L/year (small batches 15-20 students, AIIMS faculty)
4. **Noida-specific details:**
   - Center: B-45, Sector 62, Noida 201301
   - Metro: Sector 62 Metro (Blue Line)
   - USPs: AIIMS-trained faculty, small batches (15 students), 19,600+ MCQ bank, Biology Olympiad #1
5. **Ghaziabad note:** Served by Noida center (Blue Line metro direct) + online classes
6. **Greater Noida note:** Served by Noida center + online classes
7. **AEO/GEO:** Include voiceSearchPhrases and aiCitationFacts where applicable

---

## Expected Outcome

| Metric | Before | After |
|--------|--------|-------|
| Noida pages | ~54 | ~80 (+26) |
| Ghaziabad pages | ~18 | ~34 (+16) |
| Greater Noida pages | ~12 | ~20 (+8) |
| School pages | 0 | 15 |
| Coordinates in metrics.ts | 0 | 44 |
| **Total new pages** | — | **59** |
| **Total all 3 cities** | **~84** | **~134** |

Combined with Faridabad (89 pages), this brings total SEO pages across all cities to **220+**.
