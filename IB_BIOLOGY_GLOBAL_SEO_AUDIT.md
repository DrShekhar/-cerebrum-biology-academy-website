# IB Biology Global SEO / AEO / GEO Audit

**Date:** 2026-04-25
**Scope:** Cerebrum's IB Biology tutor / tuition / online classes pages — global coverage, schema quality, content depth, gap analysis vs the global IB market.
**Source data:** `/src/app/ib-biology*` directories, `/src/data/ib-biology/`, `/src/app/sitemap.ts`.

---

## TL;DR

**The IB Biology infrastructure is the most mature international SEO surface on the site** — far ahead of the NEET city pages we just shipped. It already has:

- ✅ A proper dynamic city route `/ib-biology/[city]` with **27 cities** pre-built
- ✅ Strong schema on every city page (FAQPage + BreadcrumbList + LocalBusiness/Service + localized currency offers)
- ✅ A geo-aware pricing matrix component (`GeoAwarePricingMatrix`) that auto-detects visitor country
- ✅ Localised metadata, hreflang, openGraph.locale per city
- ✅ Per-city school lists, neighbourhoods, and timezone-aware copy
- ✅ Course schema with HL (PT240H) / SL (PT150H) workload, instructor (Dr. Shekhar Singh, AIIMS), aggregateRating
- ✅ Content support pages: 2025 syllabus, IA guide/topics/rubric/examples/troubleshooting, EE topics/examples, Paper 1 & 2 guides, HL vs SL, past papers

**Two issues to fix:**

1. **Cannibalization** — 6 hub pages target overlapping intent for "IB Biology tutor"
2. **Geographic gaps** — entire continents missing (China, Japan, Korea, Africa, Latin America); thin in US (only NY+Boston) and EU (only Geneva, Zurich, Amsterdam)

---

## Existing pages — inventory

### Hub pages (not city-specific)

| URL                          | LOC | Purpose                | Schema                            |
| ---------------------------- | --- | ---------------------- | --------------------------------- |
| `/ib-biology`                | 661 | Main IB Biology hub    | Inline JSON-LD                    |
| `/ib-biology-tutor`          | 898 | Tutor-keyword landing  | EducationalOrganization + FAQPage |
| `/ib-biology-tutors`         | 319 | Tutors index page      | (uses [tutor] subroute)           |
| `/ib-biology-tutor-online`   | 108 | "tutor online" variant | Course + Breadcrumb + GeoPricing  |
| `/ib-biology-tuition`        | 111 | "tuition" variant      | Course + Breadcrumb + GeoPricing  |
| `/ib-biology-online-classes` | 855 | "online classes" hub   | Heavy content                     |

### Dynamic city pages

| URL pattern          | Count         | Coverage                    |
| -------------------- | ------------- | --------------------------- |
| `/ib-biology/[city]` | **27 cities** | 15 international + 12 India |

**International cities (15):** London, Singapore, Dubai, Hong Kong, Toronto, Vancouver, Sydney, Melbourne, New York, Boston, Geneva, Zurich, Amsterdam, Bangkok, Kuala Lumpur

**India cities (12):** Delhi, Gurugram, Mumbai, Bangalore, Pune, Hyderabad, Noida, Chennai, South Delhi, Faridabad, Rohini, Kolkata

### Per-tutor pages

| URL pattern                  | Source                          |
| ---------------------------- | ------------------------------- |
| `/ib-biology-tutors/[tutor]` | `src/data/ib-biology/tutors.ts` |

### Content / topical authority pages (already built)

| URL                                  | Purpose                          |
| ------------------------------------ | -------------------------------- |
| `/ib-biology-2025-syllabus`          | Syllabus reference               |
| `/ib-biology-ia-guide`               | IA process guide                 |
| `/ib-biology-ia-topics`              | IA topic ideas                   |
| `/ib-biology-ia-rubric-2025`         | Rubric breakdown                 |
| `/ib-biology-ia-examples`            | Worked IAs                       |
| `/ib-biology-ia-troubleshooting`     | Common IA issues                 |
| `/ib-biology-extended-essay`         | EE hub                           |
| `/ib-biology-ee-topics`              | EE topic ideas                   |
| `/ib-biology-ee-examples`            | Worked EEs                       |
| `/ib-biology-paper-1-guide`          | Paper 1 strategy                 |
| `/ib-biology-paper-2-guide`          | Paper 2 strategy                 |
| `/ib-biology-past-papers`            | Past papers hub                  |
| `/ib-biology-hl-vs-sl`               | HL vs SL comparison              |
| `/ib-biology-vs/[curriculum]`        | IB vs CBSE / A-Level / AP / etc. |
| `/ib-biology-olympiad-parallel-prep` | IB + Olympiad cross-sell         |
| `/how-to-score-7-ib-biology`         | Score-7 strategy                 |

**Verdict on existing infrastructure:** Excellent topical authority. Few coaching brands globally have this depth on IB Biology.

---

## SEO / AEO / GEO quality on city pages

Every `/ib-biology/[city]` page emits the following schema (verified from `/src/app/ib-biology/[city]/page.tsx`):

### SEO

- ✅ Per-city title: `IB Biology Tutor [City] | HL & SL, IA Coaching | Cerebrum`
- ✅ Per-city description with timezone, country, currency
- ✅ City-specific keyword cluster (IB tutor, tuition, coaching, HL, SL, IA help)
- ✅ Canonical URL per city
- ✅ Hreflang: `en-{countryCode}` + `en` + `x-default`
- ✅ openGraph.locale localized per country
- ✅ `dynamicParams = false` + static generation

### AEO (rich-results)

- ✅ **FAQPage** (5 city-specific questions per page)
- ✅ **BreadcrumbList**
- ✅ **LocalBusiness** schema (when `inPersonCentre` exists — Delhi, Gurugram, South Delhi, Faridabad, Rohini)
- ✅ **Service** schema (when no physical centre — all international + non-centre India cities)

### GEO

- ✅ `areaServed.@type: City` with `containedInPlace` country
- ✅ `priceSpecification.priceCurrency` localized (GBP, SGD, AED, HKD, CAD, AUD, USD, CHF, EUR, THB, MYR, INR)
- ✅ `priceSpecification.unitText: HOUR` with realistic per-hour rate per market
- ✅ `availableLanguage: English`
- ✅ `address` + `telephone` on physical centres

**This is the gold standard the NEET city pages should aspire to.**

---

## 🔴 Issue 1 — Hub-page cannibalization

Six URLs all target near-identical intent:

1. `/ib-biology` (the canonical hub)
2. `/ib-biology-tutor` (898 LOC, the deepest)
3. `/ib-biology-tutors` (the tutor _index_ — different intent, OK)
4. `/ib-biology-tutor-online` (108 LOC, thin)
5. `/ib-biology-tuition` (111 LOC, thin)
6. `/ib-biology-online-classes` (855 LOC)

Searches like "IB Biology tutor", "IB Biology tutoring", "IB Biology online tutor", "IB Biology tuition", "IB Biology classes online" will all match multiple pages.

### Recommendation — canonical policy

| Page                         | Role                                                        | Canonical strategy                                       |
| ---------------------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| `/ib-biology`                | **Topical hub** — content authority, links to all sub-pages | Keep as primary, internally link from everywhere         |
| `/ib-biology-tutor`          | **Commercial — "tutor" keyword**                            | Keep, ensure canonical points to itself                  |
| `/ib-biology-online-classes` | **Commercial — "online classes" keyword**                   | Keep                                                     |
| `/ib-biology-tuition`        | **Commercial — "tuition" keyword**                          | Keep, but add depth (currently thin at 111 LOC)          |
| `/ib-biology-tutor-online`   | Variant, near-duplicate of `/ib-biology-tutor`              | Either canonical to `/ib-biology-tutor` or merge content |
| `/ib-biology-tutors`         | **Tutors directory** (different intent)                     | Keep — links to per-tutor pages                          |

**Action:** Add a clear canonical to `/ib-biology-tutor-online` pointing to `/ib-biology-tutor` (or differentiate content if keeping as separate keyword target).

---

## 🟠 Issue 2 — Geographic coverage gaps

Compared to the actual global IB market, several major IB hubs are **completely missing**.

### A. China (entire country missing) — 🔴 P0

| City                              | Why it matters             | Notable IB schools                                                           |
| --------------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| **Shanghai**                      | Largest IB market in China | Shanghai American School, SCIS, YCIS, Dulwich Pudong, Concordia              |
| **Beijing**                       | Second-largest             | International School of Beijing, Western Academy of Beijing, Dulwich Beijing |
| **Shenzhen**                      | Growing IB cluster         | Shen Wai International, QSI, ISN                                             |
| **Suzhou / Hangzhou / Guangzhou** | Tier-2 IB hubs             | Various international schools                                                |

### B. Japan, Korea (missing) — 🔴 P0

| City                 | Notes                                                         |
| -------------------- | ------------------------------------------------------------- |
| **Tokyo**            | 60+ IB schools, including Yokohama, Senri Osaka satellites    |
| **Seoul**            | Korea's premier IB hub — Dwight Seoul, KIS, SIS Seoul Foreign |
| **Osaka / Yokohama** | Secondary Japanese IB markets                                 |

### C. US — only 2 cities (NY, Boston). Missing — 🟠 P1

USA has ~1,800 IB-authorized schools. Major missing markets:

- **Houston / Dallas / Austin** (Texas)
- **Chicago**
- **San Francisco / Bay Area**
- **Los Angeles / Orange County**
- **Washington DC** (NoVA + MoCo)
- **Atlanta**
- **Seattle**
- **Miami**

### D. Canada — missing big metros

- **Calgary** (Alberta IB cluster)
- **Ottawa**
- **Montreal**

### E. UK — only London. Missing — 🟠 P1

UK has 200+ IB schools. Other concentrations:

- **Manchester** (Greater Manchester IB schools)
- **Birmingham**
- **Edinburgh** (Scotland — Fettes, ESMS)
- **Bristol** (Bristol Grammar, Clifton)
- **Cambridge** (international students)

### F. Europe — only Geneva, Zurich, Amsterdam. Missing — 🟠 P1

- **Paris** (École Jeannine Manuel, AIS Paris, ISP)
- **Brussels** (St. John's, BEPS, ISB)
- **Berlin / Frankfurt / Munich** (multiple international schools)
- **Vienna** (AIS, Vienna International)
- **Madrid / Barcelona** (multiple IB schools)
- **Stockholm / Copenhagen / Oslo / Helsinki** (Nordic IB)
- **Dublin** (St. Andrew's College — Ireland's flagship IB)
- **Rome / Milan** (Marymount, ASMilan)
- **Prague / Budapest / Warsaw** (Eastern Europe IB)

### G. Middle East — only Dubai. Missing — 🟡 P2

- **Abu Dhabi** (Cranleigh, GEMS World Academy)
- **Doha** (Doha College, ACS Doha)
- **Riyadh / Jeddah** (KAUST Schools, Multinational International)
- **Manama / Muscat / Kuwait City** (smaller IB clusters)
- **Cairo** (CAC, AISE)
- **Beirut / Amman** (regional IB students often join coaching from Dubai)

### H. Africa — entire continent missing — 🟡 P2

- **Cape Town** (Reddam, AIS Cape Town)
- **Johannesburg** (Hillcrest, AIS Joburg)
- **Nairobi** (ISK, Brookhouse, GEMS Cambridge)
- **Lagos / Abuja** (limited but growing IB)

### I. Latin America — entire continent missing — 🟢 P3

- **Mexico City** (Greengates, Edron Academy, ASF)
- **São Paulo** (Graded School, St Paul's)
- **Buenos Aires / Santiago / Lima / Bogotá** (smaller)

### J. India — 12 cities. Few gaps remain — 🟢 P3

Already strong. Optional adds:

- **Lucknow** (Step by Step IB)
- **Ahmedabad** (Riverside, Anand Niketan)
- **Coimbatore / Chandigarh / Indore** (limited IB but feeders)

---

## Priority gap list — recommended sprint order

### P0 — Major missing markets (~8 cities, biggest SEO holes)

1. **Tokyo** (Japan)
2. **Seoul** (Korea)
3. **Shanghai** (China)
4. **Beijing** (China)
5. **Houston** (US)
6. **Chicago** (US)
7. **San Francisco / Bay Area** (US)
8. **Paris** (France)

### P1 — Tier-1 expansion (~10 cities)

9. **Washington DC**
10. **Los Angeles**
11. **Atlanta**
12. **Calgary**
13. **Manchester**
14. **Edinburgh**
15. **Berlin**
16. **Madrid**
17. **Brussels**
18. **Dublin**

### P2 — MENA + Africa (~7 cities)

19. **Abu Dhabi**
20. **Doha**
21. **Riyadh**
22. **Cairo**
23. **Cape Town**
24. **Johannesburg**
25. **Nairobi**

### P3 — LATAM + India fillers (~5 cities)

26. **Mexico City**
27. **São Paulo**
28. **Lucknow**
29. **Ahmedabad**
30. **Shenzhen**

**Total: 30 new cities → grows from 27 to 57 cities.**

Each new city is **~5 minutes of work** (just adding a `CityConfig` entry to `/src/data/ib-biology/cities.ts`) plus ~30 seconds in sitemap. The route, schema, layout, geo-pricing, FAQ generation are **all automatic**.

---

## Quality issues on existing pages

### `/ib-biology-tutor-online` (108 LOC) — looks thin

- Uses `SEOLandingPage` shared component (renders content from `internationalSEOPages` data)
- Has Course schema + Breadcrumb + GeoAwarePricingMatrix — schema-rich
- **Concern:** the actual rendered content depth depends on what's in the SEO data file. Could be near-duplicate of `/ib-biology-tutor` (898 LOC).

### `/ib-biology-tuition` (111 LOC) — same pattern as above

- Same `SEOLandingPage` rendering
- Same schema setup
- **Concern:** likely near-duplicate of `/ib-biology-tutor`

**Action:** Inspect `internationalSEOPages['ib-biology-tutor-online']` and `internationalSEOPages['ib-biology-tuition']` data definitions to confirm content uniqueness vs. canonical `/ib-biology-tutor`.

### `/ib-biology` (661 LOC) — main hub

- Has FAQ schema, EducationalOrganization schema
- Uses `aggregateRating: { ratingValue: '5.0', reviewCount: '38' }` — same as NEET pages (pulled from main Google Reviews count)
- Should review: is "95% of students score 6-7" verifiable? If not, replace with factual framing.

### `/ib-biology-tutor` (898 LOC) — deepest hub

- Same FAQ schema
- Claim: "98% success rate in scoring 6-7" — **needs verification or removal**
- Most depth, best for capturing high-intent commercial searches

---

## Schema upgrades to consider

### Add to city pages

- `Course.educationalLevel`: "International Baccalaureate Diploma Programme" (currently in hub pages but not city pages — could enrich rich results)
- `Course.timeRequired`: HL = "PT240H", SL = "PT150H"
- `Course.instructor` array per city (link to specific tutors from `tutors.ts`)
- `Review` array (real testimonials with `reviewBody`, `author`, `datePublished` — currently only aggregate rating)

### Add to hub pages

- `BreadcrumbList` from Home (already on subpages, missing on `/ib-biology` itself)
- `Course.coursePrerequisites`: "GCSE Biology / equivalent / IB MYP Year 5 Sciences"
- `Course.educationalCredentialAwarded`: "IB Biology HL/SL grade 7" (target outcome schema)

---

## Cross-vertical opportunities

### 1. NEET ↔ IB cross-sell (already implemented)

The `/ib-biology/[city]/page.tsx` route includes an `IB_TO_OLYMPIAD_CITY` map for India cities. Each India IB page links to the matching olympiad page. **Good.**

### 2. IB ↔ NEET cross-sell (gap)

Indian NEET city pages (e.g., `/neet-coaching-south-extension`) don't currently advertise the IB Biology programme to international-school students. Adding an "Are you on the IB pathway?" callout linking to `/ib-biology/[city]` would capture switchers.

### 3. CBSE / IGCSE ↔ IB

The `/ib-biology-vs/[curriculum]` dynamic route exists. Make sure it covers: cbse, igcse, a-level, ap, edexcel — all the major comparison searches.

---

## Recommended action plan

### Sprint 1 — Add 8 P0 cities (~1 hour)

Just append 8 entries to `cities.ts` + 8 entries to sitemap.ts. The dynamic route handles everything else (schema, layout, geo-pricing, hreflang).

Cities: **Tokyo, Seoul, Shanghai, Beijing, Houston, Chicago, San Francisco / Bay Area, Paris**

### Sprint 2 — Add P1 cities (~1 hour)

10 more cities: Washington DC, LA, Atlanta, Calgary, Manchester, Edinburgh, Berlin, Madrid, Brussels, Dublin

### Sprint 3 — Cannibalization fix (~30 min)

1. Add canonical from `/ib-biology-tutor-online` → `/ib-biology-tutor`
2. Differentiate `/ib-biology-tuition` content (it's currently near-duplicate of /ib-biology-tutor)
3. Consider 301 of the weakest variant if content differentiation isn't possible

### Sprint 4 — Schema enrichment (~30 min)

Add Course schema to city pages with HL/SL workload + tutor instructors.

### Sprint 5 — Stat verification (~ongoing)

Audit and either source or remove unverifiable claims:

- "95% of students score 6-7"
- "98% success rate"
- "200 reviews"

### Sprint 6 — MENA + Africa + LATAM coverage (~2 hours)

Add 12 more cities: Abu Dhabi, Doha, Riyadh, Cairo, Cape Town, Johannesburg, Nairobi, Mexico City, São Paulo, Lucknow, Ahmedabad, Shenzhen

**Total time to take coverage from 27 → 57 cities + cleanup: ~5 hours.**

---

## Files to modify

| Sprint                    | Files                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Sprint 1-2, 6 (city adds) | `src/data/ib-biology/cities.ts` (+30 entries), `src/app/sitemap.ts` (+30 sitemap entries)                               |
| Sprint 3 (cannibal fix)   | `src/app/ib-biology-tutor-online/page.tsx`, `src/app/ib-biology-tuition/page.tsx`, possibly `src/data/seo-landing/*.ts` |
| Sprint 4 (schema)         | `src/app/ib-biology/[city]/page.tsx` (extend `LocalBusinessSchema` to also emit Course schema)                          |
| Sprint 5 (stats)          | All 6 hub pages — find/scrub `95%`, `98%`, `200 reviews`                                                                |

---

## Comparable competitors (for keyword reference)

| Competitor                   | Coverage strategy                   | What they don't have                           |
| ---------------------------- | ----------------------------------- | ---------------------------------------------- |
| **TutorChase**               | Marketplace; lots of cities indexed | No per-city schema, no examiner-led IA support |
| **Lanterna**                 | Strong content + summer school      | No India presence, no in-person centres        |
| **Revision Village**         | Resource site, not tutor            | No tutoring at all, just videos + papers       |
| **Crimson Education**        | Premium global tutoring             | $150+/hr, no India offer, no centre            |
| **EJX (Edge to Excellence)** | Boutique, India-focused             | No global city pages                           |

**Cerebrum's edge:** the only player with both **global online coverage** AND **physical centres in India** AND **examiner-led IA support** AND **deep topical content** (IA guide, EE topics, paper guides, score-7 strategy). The 27-city schema-rich infrastructure is a big moat.

---

## What to ship next (recommended)

If you want me to proceed:

1. **Add 8 P0 cities** to `cities.ts` + sitemap (Tokyo, Seoul, Shanghai, Beijing, Houston, Chicago, SF Bay, Paris) → unlocks 8 new high-intent pages with full schema, ~1 hour
2. **Cannibalization audit** — read the actual `internationalSEOPages` data for the thin variants and decide canonical strategy
3. **Stat scrub** — pass through hub pages and remove unverifiable "95%/98% success rate" claims

Tell me which to start with.
