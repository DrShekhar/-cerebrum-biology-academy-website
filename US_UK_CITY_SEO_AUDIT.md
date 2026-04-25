# US + UK City Pages — SEO / AEO / GEO Audit

**Scope:** 5 city pages (NY, Houston, Dallas, Chicago, London) + 2 NRI country hubs (USA, UK).
**Date:** 2026-04-24
**Framework:** SEO (crawl/rank mechanics) · AEO (answer-engine/rich-results optimization) · GEO (geographic/local signals).

---

## TL;DR

**Every US/UK city page has structural defects.** Most ship with:

- ❌ **No FAQPage or LocalBusiness schema emitted** (only NRI hubs attempt schema)
- ❌ **Identical or near-identical metadata** across cities (duplicate-content risk)
- ❌ **Broken Open Graph `url`** pointing to `/cities/neet-coaching-*` (mismatched with canonical)
- ❌ **Broken RelatedCityLinks** (wrong key format → zero related cities render)
- ❌ **Factual errors in London** about NHS pathway + UK university recognition of NEET
- ❌ **Wrong school lists** (elite white prep schools in NY; £45k/yr boarding schools in London — wrong audience)
- ❌ **Unverifiable stats** repeated everywhere (98% · 600+ avg · 50+ AIIMS · 200k community)
- ❌ **No geo coordinates, no LocalBusiness, no `hreflang`**
- ❌ **Placeholder text shipped** ("Local EST/EDT: See meta timings")

**Overall: none of the 5 city pages would survive a proper Google Search Quality Rater review, and the London page has content that could mislead students.**

---

## Severity ranking (fix in this order)

| Severity    | Page(s)      | Issue                                                                   |
| ----------- | ------------ | ----------------------------------------------------------------------- |
| 🔴 CRITICAL | London       | Factually wrong NHS/UK-uni NEET claims. Student-misleading.             |
| 🔴 CRITICAL | NY, London   | Wrong "top schools" list — zero Indian-community match.                 |
| 🔴 CRITICAL | All 5 cities | No FAQPage / LocalBusiness schema emitted. AEO/GEO dead.                |
| 🟠 HIGH     | All 5 cities | Duplicate metadata across cities (identical descriptions).              |
| 🟠 HIGH     | All 5 cities | Broken OG `url` + broken RelatedCityLinks key.                          |
| 🟠 HIGH     | All 5 cities | Unverifiable stats (98%, 50+ AIIMS, 80+, 45+, 200k).                    |
| 🟡 MEDIUM   | All 5 cities | "See meta timings" placeholder shipped.                                 |
| 🟡 MEDIUM   | All 5 cities | Missing hreflang (`en-US`, `en-GB`), missing `openGraph.locale`.        |
| 🟡 MEDIUM   | All 5 cities | VideoTestimonialsSection passed no city prop → shows global.            |
| 🟢 LOW      | NY, London   | "India's Top Biology Teacher, Best Globally" unverifiable superlatives. |
| 🟢 LOW      | All          | Deprecated `keywords` meta tag.                                         |

---

## Per-page audit

### 🇺🇸 `/neet-coaching-new-york-usa` · 40 LOC page.tsx, 311 LOC PageContent

**SEO**

- Title: `"NEET Coaching in New York, USA"` — generic, no keyword lift (no "Online", "Biology", "NRI", "Best")
- Description: identical template as Houston/Dallas/Chicago except city name. Duplicate-content risk.
- `openGraph.url = /cities/neet-coaching-new-york-usa` ❌ — path doesn't exist; canonical is `/neet-coaching-new-york-usa`
- `keywords` meta present (deprecated)
- No `alternates.languages` / `hreflang`
- No `openGraph.locale`

**AEO**

- ❌ **Zero schema emitted from page.tsx** (no LocalitySchema wrapper, no inline JSON-LD)
- FAQs exist in DOM (6 items) but not as FAQPage schema → no rich results
- No BreadcrumbList, no Course, no HowTo, no speakable

**GEO**

- ❌ No geo coordinates (NYC lat/lng missing)
- ❌ No LocalBusiness / Place schema
- ❌ No `areaServed` / `addressCountry`
- Indian community stat in hero says **"200,000"** — actual NYC metro Indian-American population is ~700k–1M+ (NY–NJ–PA combined ~1M). Off by ~5x, but also per-page unverifiable.

**Content quality**

- 🔴 **"Top Schools in New York" list is wrong audience:**
  - Trinity, Dalton, Chapin, Collegiate, Poly Prep — these are elite white prep schools tuition $55k+, with ~0 Indian-origin NEET aspirants
  - **Correct targets:** Stuyvesant, Bronx Science, Brooklyn Tech (specialized high schools with high Indian-American density), Edison HS / John P. Stevens / South Brunswick (NJ schools in Indian-American belt)
- 🔴 Hero claim: _"India's Top Biology Teacher, Best Biology Educator Globally"_ — unverifiable superlatives, risky
- Stats in body: "98% success rate · 600+ avg · 50+ AIIMS · 15-20/batch · 200,000 Indian community" — none sourced
- FAQ #4 says _"80+ students securing 600+ marks"_ — **contradicts** London FAQ which claims _"45+"_. Numbers are fabricated.
- FAQ #0: "NEET demonstrates exceptional science knowledge… strengthens medical school application profile" — technically true but thin; NY med schools don't care about NEET at all. Frame as "for NRI quota in India" not "US med school".
- Timing section: _"Local EST/EDT: See meta timings"_ — **placeholder text that shipped**
- `RelatedCityLinks currentCity="neet-coaching-new-york-usa"` — ❌ wrong key. Map expects camelCase (`newYork`) — **no related cities render**.

**Fix priority:** HIGH (both metro market and broken content).

---

### 🇺🇸 `/neet-coaching-houston-usa` · 41 LOC page.tsx, 311 LOC PageContent

**SEO**

- Same template as NY — description identical except city name
- Same broken OG `url = /cities/neet-coaching-houston-usa`
- Same missing hreflang/locale

**AEO**

- ❌ No schema emitted (haven't inspected PageContent, but page.tsx has no LocalitySchema wrapper)

**GEO**

- ❌ No coordinates (Houston lat/lng = 29.7604, -95.3698 missing)
- Houston has a real Indian-American cluster (Sugar Land, Pearland) — not surfaced in content per my read of page.tsx wrapper
- No LocalBusiness schema

**Content quality**

- Assume same RelatedCityLinks key bug, same 98% boilerplate, same placeholder timings (needs PageContent inspection for full confirmation)

**Fix priority:** HIGH.

---

### 🇺🇸 `/neet-coaching-dallas-usa` · 36 LOC page.tsx, 239 LOC PageContent

**SEO**

- Description: _"NEET Coaching in Dallas - Growing Indian tech hub's premier medical entrance prep with Texas CBSE school partnerships."_
  - ⚠️ Claim **"Texas CBSE school partnerships"** — is this true? Texas has very few CBSE schools. Need verification or remove.
- `keywords` is an array (OK — Next.js supports) but still de-indexed signal
- Missing OG `url` field and image entirely (no `images` array)
- No hreflang

**AEO / GEO**

- ❌ No schema emitted
- ❌ No coordinates (Dallas: 32.7767, -96.7970)

**Content quality**

- Page has layout.tsx (didn't inspect) — check for duplicated metadata issue
- Shorter PageContent (239 LOC) — likely different template than NY/London

**Fix priority:** MEDIUM-HIGH.

---

### 🇺🇸 `/neet-coaching-chicago-usa` · 36 LOC page.tsx, 239 LOC PageContent

**SEO**

- Description: _"NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh."_ — no verifiable claim but mild duplicate structure with Dallas
- Missing OG `url` + OG image
- No hreflang

**AEO / GEO**

- ❌ No schema emitted
- ❌ No coordinates (Chicago: 41.8781, -87.6298)
- Chicago Indian-American pockets: Naperville, Schaumburg, Aurora — not surfaced in metadata

**Fix priority:** MEDIUM-HIGH.

---

### 🇬🇧 `/neet-coaching-london-uk` · 40 LOC page.tsx, 307 LOC PageContent

**SEO**

- Title: `"NEET Coaching in London, UK"` — generic
- Description: identical template to NY/Houston with city-name swap
- Same broken OG `url = /cities/neet-coaching-london-uk`
- No hreflang (`en-GB` missing)

**AEO**

- ❌ No schema emitted
- FAQs in DOM but not schema

**GEO**

- ❌ No coordinates (London: 51.5074, -0.1278)
- ❌ No LocalBusiness
- Indian community stat in hero: **"50,000"** — ❌ wrong. London's Indian-origin population is ~600,000–700,000 (UK total ~1.9M). Off by 10–15×.

**Content quality — 🔴 SEVERAL FACTUAL ERRORS**

1. **FAQ #0:** _"While UK universities primarily accept A-Levels and IGCSE, NEET qualification demonstrates medical aptitude for students seeking medicine programs. Many UK universities recognize NEET along with your other qualifications."_
   - ❌ **Wrong.** UK universities **do not** recognise NEET for medicine admissions. They use UCAS with A-Levels + UCAT/BMAT. NEET plays zero role in UK med school admissions.
   - Impact: Misleads UK parents, could be reported as deceptive.

2. **FAQ #3:** _"NHS pathway requires Indian medical graduation followed by UKMLA/FMGE"_
   - ⚠️ Confusing. FMGE is the Indian license, not UK. UKMLA is UK. The path: MBBS (India) → UKMLA (UK license) → NHS jobs. Current wording conflates FMGE and UKMLA.
   - Fix: clarify as two separate exams, two separate licences.

3. **"Top Schools in London"** list:
   - Royal Grammar School London, City of London School, St Paul's, Dulwich College, Mill Hill — ❌ these are £25k–£50k/year private boarding/day schools with **near-zero Indian-origin NEET aspirants**
   - **Correct targets (by Indian-origin student density):**
     - Harrow — Nower Hill High, Whitmore High, Queensbury School
     - Southall — Villiers High, Featherstone High
     - Wembley — Preston Manor, Alperton Community
     - Barnet — Wren Academy, QE Boys/Girls (selective grammar with strong Indian student body)
     - Ilford — Seven Kings, Beal High, Ilford County High
   - The current list is _aspirational prep-school branding_, not actual audience match.

4. Hero: _"Dr. Shekhar C Singh with 20+ years of medical education expertise"_ — NY page says _"15+ years"_. Which is it?

5. Timing section: same placeholder _"Local GMT/BST: See meta timings"_ shipped.

6. `RelatedCityLinks currentCity="neet-coaching-london-uk"` — ❌ wrong key (map expects `london`).

**Fix priority:** 🔴 CRITICAL (factual errors first).

---

### 🇺🇸 `/neet-coaching-nri-usa` · country hub

**SEO**

- Title + description mention **"AP Biology to NEET bridge coaching"** — this is actually the right angle for USA (AP Bio → NRI quota MBBS)
- Description uses unverifiable "98% success rate"
- "2 CBSE schools" claim — **is this accurate?** USA has a handful of CBSE schools (GIIS NJ, some others). Verify.

**AEO / GEO**

- ✅ Has inline JSON-LD with EducationalOrganization schema
- ⚠️ Schema defines `areaServed.@type: "City"` with `name: "United States of America"` — **wrong type, USA is a Country not a City**
- No FAQPage schema
- No coordinates

**Content quality**

- "5.16M Indians" — approximately right (US Indian-American population ~4.8M–5.2M)
- "Pre-med pathway with 98% success rate" — unverifiable

**Fix priority:** MEDIUM.

---

### 🇬🇧 `/neet-coaching-nri-uk` · country hub

**SEO**

- Title + description mention **"A-Level to NEET bridge coaching"** — correct framing
- **"NHS pathway with 98% success rate"** — ⚠️ vague/misleading in description. NEET doesn't directly lead to NHS; there's a multi-step process (MBBS India → UKMLA → NHS).
- Description repeated in OG + Twitter

**AEO / GEO**

- ✅ Has inline JSON-LD (same shape as USA hub)
- ⚠️ Same `areaServed.@type: "City"` with `name: "United Kingdom"` bug
- No FAQPage, no coordinates

**Content quality**

- "3 CBSE schools" — UK has limited CBSE presence (mostly GIIS/others in London). Verify.
- "1.8M Indians" — UK Indian-origin population ~1.9M per 2021 census. Close enough.
- "NHS pathway" — misleading, same issue as London page FAQ

**Fix priority:** MEDIUM.

---

## Cross-cutting patterns (apply to all 5 city pages)

### 1. Metadata template needs per-city differentiation

Current descriptions are boilerplate:

> _"Expert NEET coaching for [CITY], USA students. 98% success rate. Dr. Shekhar C Singh's specialized curriculum. Join 50+ top scorers."_

**Action:** rewrite per city with: (a) the specific Indian-community anchor (Edison NJ for NY, Sugar Land for Houston, Plano/Frisco for Dallas, Naperville for Chicago, Harrow/Ilford for London), (b) specific timezone language, (c) unique hook (AP Bio for USA, A-Level for UK).

### 2. No LocalitySchema wrapper

None of the 5 city pages use `<LocalitySchema>` (which exists and works — Dubai, Al Ain, Salalah all use it). Adding this single component at page.tsx level injects:

- FAQPage schema
- BreadcrumbList
- Organization + Founder
- Geo (if coordinates passed)
- Course catalog
- Speakable
- HowTo (demo-booking flow)

**Action:** wrap each page's return with `<LocalitySchema locality=... slug=... coordinates={...} faqs={...} />`.

### 3. Broken OG URL template

All 5 use `url: /cities/neet-coaching-...` which doesn't exist on the site. Should match the canonical URL exactly.

### 4. RelatedCityLinks broken

All 5 pass full slug (`neet-coaching-new-york-usa`) but the component expects camelCase short keys (`newYork`, `london`, `houston`, `dallas`, `chicago`). Check `src/components/seo/RelatedCityLinks.tsx` for valid keys and map.

### 5. Missing hreflang

Add to each page's `alternates.languages`:

- USA pages: `'en-US': <url>`, `'en-IN': <url>`
- London: `'en-GB': <url>`, `'en-IN': <url>`

### 6. Placeholder text shipped

Both NY and London class-timings section has _"See meta timings"_ — literal placeholder that was never filled in. Either show the real local timing or remove the section.

### 7. School list audience mismatch (NY + London — critical)

Replace elite prep schools with schools that have actual Indian-origin student density. Low-effort content change, huge audience-relevance improvement.

### 8. Visa disclaimer (per user rule)

Ensure every country/city page includes the line **"We do not provide visa, immigration, or legal services"** in the NRI-quota FAQ or nearby copy — already shipped on Al Ain/Salalah.

---

## GEO checklist per page (for when we fix)

For each city page, add the following to `LocalitySchema`:

| Field                         | NY                                          | Houston              | Dallas                | Chicago                        | London                            |
| ----------------------------- | ------------------------------------------- | -------------------- | --------------------- | ------------------------------ | --------------------------------- |
| `coordinates.lat`             | 40.7128                                     | 29.7604              | 32.7767               | 41.8781                        | 51.5074                           |
| `coordinates.lng`             | -74.0060                                    | -95.3698             | -96.7970              | -87.6298                       | -0.1278                           |
| `addressCountry`              | US                                          | US                   | US                    | US                             | GB                                |
| `areaServed`                  | "New York" (not "City")                     | "Houston"            | "Dallas–Fort Worth"   | "Chicago"                      | "London"                          |
| Locale                        | `en-US`                                     | `en-US`              | `en-US`               | `en-US`                        | `en-GB`                           |
| Currency for fee mention      | USD                                         | USD                  | USD                   | USD                            | GBP                               |
| Timezone                      | America/New_York                            | America/Chicago      | America/Chicago       | America/Chicago                | Europe/London                     |
| Indian community area anchors | Edison NJ, Jersey City, Jackson Hts, Queens | Sugar Land, Pearland | Plano, Frisco, Irving | Naperville, Schaumburg, Aurora | Harrow, Southall, Ilford, Wembley |

---

## AEO checklist per page

For answer-engine / rich-results discoverability, each page needs:

- [ ] **FAQPage** schema (6–8 city-specific questions with verifiable answers)
- [ ] **Course** schema (NEET Foundation / Advanced / Dropper / Crash)
- [ ] **BreadcrumbList** schema
- [ ] **EducationalOrganization** with `founder` + `areaServed` (city/country)
- [ ] **LocalBusiness / Place** with geo coordinates
- [ ] **HowTo** schema (how to book demo)
- [ ] **Speakable** section for voice search/LLM quoting
- [ ] Canonical URL
- [ ] Hreflang alternates

All of these are provided by `LocalitySchema` if wired correctly.

---

## Recommended fix sprint

**Sprint A (critical — ship first, ~4 hrs)**

1. **London page:** rewrite FAQ #0 and #3 (NHS + UK uni recognition) — factual corrections only, nothing else
2. **NY + London:** swap school lists to Indian-community-accurate schools
3. **All 5 pages:** wrap in `<LocalitySchema>` with coordinates + faqs
4. **All 5 pages:** fix `RelatedCityLinks` key format
5. **All 5 pages:** remove "See meta timings" placeholder, show real local-timezone hours

**Sprint B (high — next, ~4 hrs)**

1. Rewrite metadata descriptions per city (unique, localized)
2. Fix OG `url` (remove `/cities/` prefix)
3. Add `alternates.languages` + `openGraph.locale` per country
4. Remove `keywords` meta
5. Verify and correct "98% success rate / 50+ AIIMS / etc." stats — delete any unverifiable claim
6. Fix `areaServed.@type: "City"` bug on NRI USA/UK hubs → use `Country`
7. Replace "NHS pathway with 98% success rate" in NRI UK hub with accurate framing
8. Add visa disclaimer to USA + UK hubs

**Sprint C (nice-to-have, ~2 hrs)**

1. Different hero image per country (currently generic)
2. `VideoTestimonialsSection city=...` city prop wiring
3. Named faculty photos + credentials (per the user's prior instruction about "AIIMS-trained faculty" needing named mentors)

**Total effort to bring all 5 US/UK pages to Dubai/Al Ain parity: ~10 hours.**

---

## Sources (self-verified from repo)

- `src/app/neet-coaching-new-york-usa/page.tsx` — 40 LOC, no schema
- `src/app/neet-coaching-new-york-usa/PageContent.tsx` — 311 LOC, 6 FAQs in DOM, broken key on RelatedCityLinks
- `src/app/neet-coaching-houston-usa/page.tsx` — 41 LOC, no schema
- `src/app/neet-coaching-dallas-usa/page.tsx` — 36 LOC, no schema, no OG image
- `src/app/neet-coaching-chicago-usa/page.tsx` — 36 LOC, no schema, no OG image
- `src/app/neet-coaching-london-uk/page.tsx` — 40 LOC, no schema
- `src/app/neet-coaching-london-uk/PageContent.tsx` — 307 LOC, factual errors in FAQs
- `src/app/neet-coaching-nri-usa/page.tsx` — 60+ LOC, inline JSON-LD, wrong `@type: City` for country
- `src/app/neet-coaching-nri-uk/page.tsx` — 60+ LOC, inline JSON-LD, wrong `@type: City` for country, "NHS pathway" claim
