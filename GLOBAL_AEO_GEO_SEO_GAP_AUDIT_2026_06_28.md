# GLOBAL AEO / GEO / SEO GAP AUDIT — International Biology Verticals
**Date:** 2026-06-28 · **Scope:** AP Biology, USABO/IBO/BBO/national olympiads, IB Biology, A-Level, IGCSE/GCSE, MCAT/GAMSAT, global geo-targeting · **Method:** 6 parallel read-only specialist agents · **No code changed during audit.**

> **Owner constraints honored throughout:** no recommendation removes/redirects a ranking page or reduces traffic/leads; thin content is fixed by ENRICHMENT not deletion; every page keeps a frictionless WhatsApp CTA; all fixes are additive.

---

## ✅ WAVE 1 (P0) — SHIPPED 2026-06-28 (unpushed, type-check clean)
8 files changed. Two audit P0s were grep-artifact FALSE POSITIVES (verified against source before acting).

| Item | Status | What changed |
|------|--------|--------------|
| P0-1 UK redirect-shadow | ✅ FIXED | Removed stale `/best-biology-tutor-uk → /a-level-biology-tutor` (seo-redirects.mjs); 502-line UK hub now serves |
| P0-2 `/biology-olympiad` 404 | ✅ FIXED | Added 301 `/biology-olympiad → /biology-olympiads` (aeoCitationRedirects, applied via middleware) |
| P0-3 10 sitemap-missing pages | ⚪ FALSE POSITIVE | All emitted dynamically via `...GLOBAL_EXAMS.map()` + `...IBO_COUNTRIES.map()`; subagent grep missed dynamic generation. No change. |
| P0-4 `/global` no hreflang | ✅ FIXED | Added `en` + `x-default` → `/global` (overrides root x-default→India) |
| P0-5 `/ap-biology` canonical | ✅ FIXED | Self-canonical (was pointing to `/ap-biology-tutor`) |
| P0-6 `/courses/ap-biology` metadata | ⚪ FALSE POSITIVE | `layout.tsx` already has full metadata + Course/Breadcrumb/FAQ schema, intentional canonical to tutor page. No change. |
| P0-7 placeholder testimonials | ✅ FIXED | `placeholderTestimonials()` now returns `[]`; CountryTestimonials hides section on all 27 pages (no fabricated social proof) |
| P0-8 Person-schema fragmentation | ✅ FIXED | AP + USABO hubs now use canonical `…#person` @id; SEOLandingPage (126 pages incl. IB/IGCSE hubs) swapped legacy NEET-only schema → `CerebrumPersonSchema` |
| P0-9 AP pricing contradictions | ✅ FIXED | `/ap-biology` hub aligned to canonical Pursuit/Ascent/Pinnacle $2,500/$4,500/$7,000 (pricing-matrix.ts); hourly rates kept as à-la-carte; tutor page already labeled "pay-as-you-go hour packages" (no conflict). Owner to confirm hourly rates current. |
| P0-10 stale MCQ stat + header | ✅ FIXED | `19,619` → `10,000+` ×3 in llms-full.txt; header globalized (keeps "India's #1 NEET" claim) |

**Remaining P0 needing OWNER input:** none blocking — but confirm AP hourly rates ($120–150 / $60–75 / $40) are current.

## ✅ WAVE 2 (thin content + fabrication) — SHIPPED 2026-06-28 (unpushed, type-check clean)
| Item | Status | What changed |
|------|--------|--------------|
| GAMSAT 8 "thin" city pages | ⚪ FALSE ALARM | Verified rendered output is ~500–700 UNIQUE words each (real med schools, GAMSAT cutoffs, local geography, native-currency pricing, 4 FAQs). The flag was page.tsx wrapper-size, not content. Left intact — enrichment would be make-work + fabrication risk. |
| IBO country pages (uk/canada/singapore/australia) | ✅ ENRICHED | 1 FAQ → 4 FAQs each (web-verified national pathway: BBO/UKBC, CBO, SBO/SIBiol, ASO/ASI) in `src/data/ibo/iboCountries.ts`. Now meets Google's 3+ FAQ rich-result bar + real AEO depth. |
| `/ap-biology-to-neet-preparation` | ✅ FIXED | 6 stub FAQs → substantive answers (AP↔NEET overlap, NCERT-specific gaps, exam differences). Stripped FABRICATED stats: "98% conversion rate", "98% Success Rate", "650+ Average Score", "98% transitioned" across page/layout/PageContent. KEPT canonical "98% NEET-UG qualification rate" where used correctly. |

**Next:** Wave 3 (country hubs). Branch unpushed; deploy only on owner request.

---

## 0. HEADLINE — what's actually blocking the global brand

The international footprint is already huge (~1,800 route dirs; AP 82 pages, Olympiad ~108, IB/A-Level/IGCSE ~110, MCAT/GAMSAT ~45, NRI/global ~50). The gaps are **not "build more"** first — they are **6 silent leaks where existing, good pages are invisible to Google/AI**, plus **structural white space in non-US markets** (Canada/Australia/Europe/US-IB), plus **3 policy/accuracy risks** that can trigger penalties.

---

## 1. P0 — SILENT LEAKS (existing good pages that can't rank/convert). Fix first.

| # | Issue | Where | Effect | Source agent |
|---|-------|-------|--------|--------------|
| **P0-1** | **`/best-biology-tutor-uk` is redirect-shadowed** — a rich ~900-line UK hub exists + is in sitemap, but `seo-redirects.mjs:4956` 301s it to `/a-level-biology-tutor`. Page is never served. | `src/config/seo-redirects.mjs:4956` | Entire UK country hub invisible to users + Googlebot | GEO, Indexing |
| **P0-2** | **`/biology-olympiad` root 404** — dir has only `[country]/`, no `page.tsx`, no redirect. Any AI citation/backlink dies. | `src/app/biology-olympiad/` | Dead landing for the category head term | Olympiad |
| **P0-3** | **10 live pages missing from sitemap** — all 6 `*-tutor-global` hubs (ap/mcat/a-level/biology-olympiad/ib/neet) + `ibo-coaching-{australia,canada,singapore,uk}`. `index,follow` but no discovery signal. | `src/app/sitemap.ts` | 10 commercial hubs undiscovered | Indexing, Olympiad |
| **P0-4** | **`/global` has ZERO hreflang** → root layout's `x-default → /` (India NEET) wins sitewide. A US/UK searcher for generic "biology tutor" can be served the India page. | `src/app/global/page.tsx` | Global front-door mis-routes to India page | GEO |
| **P0-5** | **`/ap-biology` hub canonical points to `/ap-biology-tutor`** — 950 lines of unique hub content (CED grid, pricing, FAQs) can't earn rankings. | `src/app/ap-biology/page.tsx:49` | Flagship AP hub self-suppressed | AP |
| **P0-6** | **`/courses/ap-biology` has zero metadata** (`'use client'`, no layout) → inherits root title; H1 "AP Biology Coaching Delhi" floats untagged. | `src/app/courses/ap-biology/` | Untagged page, accidental cannibalization | AP |

**Why P0:** every item above is an existing asset producing zero return. Fixes are 1–10 lines each, fully additive, zero risk to India rankings.

---

## 2. P0 — POLICY & ACCURACY RISKS (penalty exposure)

| # | Issue | Where | Risk |
|---|-------|-------|------|
| **P0-7** | **27 `programs/biology-olympiad/[country]` pages render PLACEHOLDER testimonials** (`// PLACEHOLDER: Add genuine {country} student quote`) — fabricated social proof now visible to Google. Same class as the review schema you stripped Jun 11. | `src/config/olympiad-countries.ts` + template | Trust/spam penalty |
| **P0-8** | **Person-schema fragmentation** — AP hub emits `@id …#ap-biology`, USABO hub `@id …#usabo` (separate entities Google won't merge); IB Biology + IGCSE hubs emit the **legacy NEET-only `DrShekharSinghSchema`** (10 NEET topics, no `@id`). Your two most important international-curriculum pages tell Google "Dr. Shekhar = NEET only." | `ap-biology-tutor/page.tsx:268`, `usabo-coaching/page.tsx`, `SEOLandingPage.tsx:44` | Entity authority not consolidating globally |
| **P0-9** | **3 irreconcilable AP pricing structures** ($499/$999/$1,499 vs $1,800–$5,760 vs $2,500/$4,500/$7,000) across hub/tutor/coaching pages. AI Overviews scrape all → "pricing varies" or wrong cite. | AP hub, `/ap-biology-tutor`, `/top-ap-biology-coaching-usa` | AEO answer poisoning |
| **P0-10** | **Stale `19,619` MCQ count** in `llms-full.txt` ×3 (lines 244/2435/2568) vs verified 10,133. Cited 3× wrong vs 1× right in llms.txt. Header still says "India's #1 NEET-UG institute" (contradicts global llms.txt). | `public/llms-full.txt` | AI engines cite wrong stat / wrong positioning |

---

## 3. P1 — GEOGRAPHIC WHITE SPACE (the global-brand build list)

### 3a. Country HUBS that don't exist (infrastructure in `countries.ts` is ready)
| Market | Status | Recommended additive hub |
|--------|--------|--------------------------|
| **Canada** | AP/MCAT/DAT/CBO pages exist but nothing links them; AP Toronto mislabeled `en-US` | `/best-biology-tutor-canada` (en-CA) |
| **Australia** | GAMSAT 3 cities + 1 IB school only; largest GAMSAT market | `/best-biology-tutor-australia` (en-AU) |
| **Continental Europe** | 40+ IB school pages but 0 country hubs; **France = 0 pages** | `/best-biology-tutor-{germany,switzerland,netherlands}` |
| **Ireland** | 1 GAMSAT + 1 IB school; Leaving Cert + HPAT uncovered | `/best-biology-tutor-ireland` (en-IE) |

### 3b. IB international-school coverage — **USA = 0 pages** (2nd-largest IB market, ~1,000+ schools)
India has 29 school pages; USA has zero — yet NYC schools (UNIS, Dwight NY, Léman Manhattan) are **already named in city data**. Also near-zero: Middle East beyond Dubai, SE Asia beyond Singapore, Africa, LatAm.
- P0/P1 schools: `/ib-biology-tutor-unis-new-york`, `-dwight-school-new-york`, `-leman-manhattan`, `-cranleigh-abu-dhabi`, `-qatar-academy-doha`, `-iskl-kuala-lumpur`, `-international-school-manila`, `-isk-nairobi`, `-nido-de-aguilas-santiago`

### 3c. Olympiad country coverage — "all national olympiads" claim has holes
- **`/ibo-coaching-india` MISSING** despite India being #1 market (only informational guide exists). P0.
- IBO coaching pages = 6 of ~80 nations. Missing high-value: Japan, South Korea, Germany, New Zealand, Ireland.
- National olympiads missing dedicated pages: Germany (GBO — and `/german-biology-olympiad` dead-ends to `/courses`), Netherlands, Brazil, France, Hong Kong, Thailand, Indonesia.
- USABO depth gaps: `/usabo-semifinal-prep`, `/usabo-cutoff-scores`, `/usabo-national-finals-prep`.
- BBO/CBO have hubs but **zero depth pages** (no past-papers, no cutoffs).

### 3d. AP geo white space (markets named in your own FAQ answers but no page)
UK/London, Australia/Sydney, Seoul, Tokyo, Montreal, plus USABO-feeder schools (Montgomery Blair, IMSA, NCSSM, Bergen County Academies).

### 3e. IGCSE/GCSE — weakest cluster
No board-specific pages (`/cambridge-igcse-biology-tutor` 0610, `/edexcel-igcse-biology-tutor` 4BI1); no IGCSE country/city pages (Singapore/Dubai/India/Malaysia); no `/igcse-biology` hub; `gcse-biology-tuition` vs `gcse-biology-tutor-online` are near-duplicate templates.

---

## 4. P1 — THIN CONTENT / DUPLICATE-FAMILY RISK (enrich, never delete)

| Family | Count | Risk | Action |
|--------|-------|------|--------|
| **GAMSAT city** (auckland, birmingham, brisbane, dublin, edinburgh, manchester, melbourne, wellington) | 8 thin (~900 B) vs London/Sydney rich (~13 KB) | **HIGH — #1 scaled-content risk** | Add local context + 2 FAQs + med-school cutoff table per city in `src/data/gamsat/metros.ts` |
| Global Exam Hubs (`*-tutor-global`) | 6 | MEDIUM | Differentiated by exam; ensure server-rendered FAQ |
| MCAT smaller metros (Baltimore, Cleveland, Columbus, St. Louis, Montreal) | 5 | MEDIUM | 3rd unique paragraph each |
| AP secondary metros + `/ap-biology-to-neet-preparation` (stub FAQs + fabricated 98%) | — | MED | Rewrite stub FAQs, drop fabricated stat |
| Olympiad: `top-ibo-coaching` (60 lines), `abo` (no FAQ schema), IBO country pages (1 FAQ each <3 min for rich results) | — | MED | Add 4+ FAQs each |

---

## 5. P1/P2 — AEO & SCHEMA DEPTH

- **Zero speakable schema** on any global hub. Add to `/ap-biology-tutor`, `/usabo-coaching`, `/ib-biology-tuition`, `/mcat-biology`.
- **IB Biology hub has no FAQPage schema** (FAQs render visually but aren't machine-readable); **A-Level hub has no Course/Person schema**.
- Missing buyer Q&A blocks in `llms-full.txt`: IB ("score a 7", IA word count), GAMSAT (Section III), A-Level (A*, board comparison), OAT (no block at all).
- `CerebrumPersonSchema.knowsAbout` missing: IGCSE 0610, OAT, Brain Bee, A-Level boards.
- Missing comparison pages (competitors named but no page): Gold Standard GAMSAT, Revision Village IB, Khan Academy MCAT, Becker USMLE.
- Missing AEO pages: `/ib-biology-paper-3-guide`, `/ib-biology-ia-word-count`, `/a-level-biology-vs-ap-biology`, `/cambridge-igcse-biology-past-papers`.
- OrgSchema `areaServed` missing 18 served countries; all contactPoints use India phone only.
- robots.ts solid (11 AI bots); minor: add Bytespider/DuckAssistBot, give Bingbot explicit llms.txt allow.

---

## 6. WHATSAPP CTA INTEGRITY (owner priority) — overall GOOD

- **No global revenue page lacks a WhatsApp CTA** via its template. `wa.me/918826444334` is correct & well-formed everywhere; no stray `919953643938`.
- **True gaps (small):**
  - `/ap-biology-vs-college-bio-mcat-bridge` — only `/book-free-demo`, no wa.me. Add CTA.
  - `/neet-coaching-nri-kuwait` + `/neet-coaching-nri-bahrain` — display text reads `+91-8826444334` (missing a digit); link dials correctly. Fix display.
  - Global Exam Hub template + several templates lack a **sticky mobile CTA bar** (link present, just not sticky). Add `StickyMobileCTABar`.
  - Verify `IndiaOlympiadSchoolTemplate` (17 school pages) and `/boards/igcse` render WA CTA.

---

## 7. INTERNAL LINKING / HUB GAPS
- AP hub links only 6 of 24 US metros; 0 school feeders; unit pages orphaned from city pages.
- No `/a-level-biology` index hub; board pages + city pages isolated.
- No `/igcse-biology` hub; 4 IGCSE/GCSE pages don't link each other.
- 5 USABO city pages orphaned from `/biology-olympiads` hub (`USABO_CITY_SLUGS` missing denver/phoenix/san-diego/twin-cities/research-triangle).
- IB school pages lack "related schools in [city]" cross-links; UK IB schools don't link to A-Level pages.

---

## 8. RECOMMENDED EXECUTION ORDER

**Wave 1 — Silent-leak + policy fixes (hours, pure-additive, highest ROI):** P0-1…P0-10. Unblocks UK hub, 10 sitemap pages, /global hreflang, AP hub canonical, courses metadata; removes placeholder testimonials; consolidates Person entity; reconciles AP pricing to one source of truth; corrects MCQ stat + llms-full header.

**Wave 2 — Enrichment of existing thin pages:** GAMSAT 8 cities, MCAT 5 metros, olympiad low-FAQ pages, AP stub FAQs. Keeps everything indexable; no new URLs.

**Wave 3 — Country hubs (additive):** Canada, Australia, Ireland, Germany/Switzerland/Netherlands; `/ibo-coaching-india`; `/a-level-biology` + `/igcse-biology` hubs.

**Wave 4 — New long-tail pages:** US IB schools, missing IBO countries, IGCSE board/city pages, AEO answer pages, comparison pages.

**Wave 5 — Schema/AEO depth:** speakable on hubs, IB FAQPage, A-Level Course/Person, llms-full buyer Q&A blocks, OrgSchema areaServed, knowsAbout additions.

---

## 9. SCORECARD

| Vertical / dimension | Score | Headline gap |
|---|---|---|
| AP Biology | 6.1/10 | hub canonical bug, pricing contradictions, UK/AU/Seoul/Tokyo white space |
| Biology Olympiad | 5.5/10 | `/biology-olympiad` 404, no `/ibo-coaching-india`, placeholder testimonials, BBO/CBO no depth |
| IB / A-Level / IGCSE | 6/10 | **USA IB schools = 0**, IGCSE board/hub gaps, no A-Level hub |
| GEO / international | 5/10 | `/global` no hreflang, no Canada/AU/EU hubs, geo-pricing only on /global |
| AEO / answer-engine | 6/10 | Person fragmentation, no speakable, IB no FAQPage, stale MCQ stat |
| Indexing / thin / CTA | 6.5/10 | UK hub redirect-shadow, 10 sitemap-missing, GAMSAT 8 thin, 2 WA display bugs |

**All findings are additive-only and respect: no ranking-page removal, no traffic/lead reduction, WhatsApp CTA preserved, enrichment over deletion.**
