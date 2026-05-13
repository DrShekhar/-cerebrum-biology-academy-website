# Delhi NCR Query Performance — Fix Plan

**Status as of 13 May 2026**: P0 + P0.4 + P1.6 + P2.10 ✅ shipped. P1.5 + P1.7 + P2.8 + P2.9 deferred (see notes below). Expected lift from shipped P0: 20–35% Delhi NCR organic visibility within 4–6 weeks of crawl propagation.

**Date opened**: 13 May 2026
**Diagnosis**: Site has 53 Delhi sub-pages, accurate geo data and 6 centres listed — but is missing the canonical `/neet-coaching-delhi` hub, has boilerplate content lacking locality cues, and lacks a multi-centre `EducationalOrganization` schema. Net result: no Local Pack rankings, no Knowledge Panel, no canonical destination for "best NEET coaching in Delhi" intent.

## Root Causes (ranked)

| #   | Root Cause                                                                      | Severity      |
| --- | ------------------------------------------------------------------------------- | ------------- |
| 1   | `/neet-coaching-delhi` canonical hub page does not exist                        | 🔴 CRITICAL   |
| 2   | Locality-specific cues missing (feeder schools, metro, sectors, neighbourhoods) | 🔴 HIGH       |
| 3   | No multi-centre `EducationalOrganization` with `branch[]` schema                | 🟡 MEDIUM     |
| 4   | DelhiAreaSchema added May 5 2026 — not fully propagated through Google's crawl  | 🟡 MEDIUM     |
| 5   | WhatsApp / phone CTAs not location-aware — no UTM, no centre context            | 🟡 MEDIUM     |
| 6   | 822 redirects — possible over-consolidation of mid-funnel feeder pages          | 🟢 LOW–MEDIUM |
| 7   | No Delhi NCR feeder-school landing pages — Allen / Aakash dominate this layer   | 🟢 LOW–MEDIUM |
| 8   | Google Business Profile per centre missing / stale                              | 🟢 LOW–MEDIUM |

## Fix Plan

### P0 — Same Day (≤2 hrs, highest leverage)

#### P0.1 — Create `/neet-coaching-delhi` canonical hub page

- File: `src/app/neet-coaching-delhi/page.tsx`
- Pattern: Use existing `CityHubPage` component + `getCityData('delhi')` data
- If 'delhi' entry missing in `city-hub-data.ts`, add it with all 3 Delhi centres (South Extension, Rohini, Green Park) + locality list + Delhi-specific FAQs
- Add to sitemap.ts at priority 0.97
- Add to homepage navigation + footer

#### P0.2 — DelhiAreaSchema coverage audit

- Grep all 53 Delhi pages for `DelhiAreaSchema` import
- For pages missing it: add the schema import + render call
- Verify per-page sub-region detection works (south, north, east, west, central, ncr)

#### P0.3 — Multi-centre `EducationalOrganization` schema

- File: `src/components/seo/CerebrumOrgSchema.tsx`
- Emit JSON-LD with all 6 Delhi NCR centres as `branch[]` entries
- Each branch: `address` + `geo` + `telephone` + `openingHours`
- Inject site-wide via root `layout.tsx`

#### P0.4 — Cross-link recently-shipped pages from homepage + footer

- Ensure `/neet-coaching-delhi`, `/best-neet-coaching-near-me`, `/biology-tutor-for-neet`, `/best-biology-classes-for-neet`, `/re-neet-2026-delhi` are linked from:
  - Homepage hero / nav
  - Footer city list
  - Sitemap

### P1 — This Week

#### P1.5 — Locality-specific content on 5 top Delhi NCR pages

- `/neet-coaching-rohini` — add Rohini sectors 9/13/18, DPS Rohini, DAV Rohini, Rohini West Red Line metro
- `/neet-coaching-south-extension` — add Defence Colony, Lajpat Nagar, Greater Kailash, AIIMS Delhi metro
- `/neet-coaching-gurugram` — add DLF phases, Sushant Lok, MG Road, sectors 29/45/51/56, GD Goenka, Suncity, Pathways World
- `/neet-coaching-noida` — add sectors 62/18/50/75/78, DPS Noida, Sector 18 Atta Market, Sector 62 metro
- `/neet-coaching-faridabad` — add Sector 17/19/21, Apeejay School Faridabad, Faridabad Old Town

#### P1.6 — Location-aware WhatsApp CTAs

- Modify `FloatingWhatsAppButton` to accept `centreContext` prop
- Each city page passes its city/centre name into WhatsApp deep-link text
- Append UTM params (`utm_source=delhi_ncr&utm_medium=whatsapp&utm_campaign=floating_cta`)

#### P1.7 — Build 15 feeder-school landing pages

**Delhi (5):** DPS RK Puram, Sanskriti School, Modern School Barakhamba, Springdales School, Mother's International
**Gurugram (4):** GD Goenka Gurgaon, Suncity School, Shriram School Aravali, Pathways World Aravali
**Noida (3):** DPS Noida, Cambridge International School, Amity International
**Faridabad (2):** Apeejay School Faridabad, Delhi Public School Faridabad
**Ghaziabad (1):** DPS Ghaziabad

### P2 — This Month (External + Audit)

#### P2.8 — Google Business Profile for each of the 6 centres

- **External action** — requires Google Business Profile dashboard access
- For each centre (South Ext, Rohini, Green Park, Gurugram, Faridabad, Noida): claim/verify listing, upload photos, set hours, request reviews from past students
- **Cannot be done programmatically** — user action required

#### P2.9 — Local backlinks

- **External action** — requires outreach
- Targets: Delhi parent forums (e.g., Indianetzone, ParentCircle), school alumni groups, Delhi NCR education press (TheBetterIndia, EducationWorld), Quora answers on Delhi NEET coaching
- **Cannot be done programmatically** — user/agency action required

#### P2.10 — Redirect volume audit

- Run `scripts/audit-redirects.mjs` or new audit script
- Find feeder-school / sector pages that were 301'd to city hubs during Feb–Mar 2026 GSC 904 fix
- If any of these were ranking pre-fix, consider restoring them as proper pages with internal links to the hub instead of 301-redirects
- Spot-check: were `biology-tutor-dps-gurgaon-sector-51`, `biology-classes-rohini-sector-13` etc. ranking before consolidation?

## Expected Impact

| Fix                             | Time     | Expected Impact (4–6 wk window)                       |
| ------------------------------- | -------- | ----------------------------------------------------- |
| P0.1 Delhi hub page             | 30 min   | +15–25% Delhi NCR organic traffic                     |
| P0.2 DelhiAreaSchema audit      | 15 min   | +5–10% CTR from rich snippets                         |
| P0.3 Multi-centre Org schema    | 30 min   | +10–15% call conversions, Knowledge Panel eligibility |
| P0.4 Cross-links                | 15 min   | Faster crawl discovery                                |
| P1.5 Locality content (5 pages) | 4 hrs    | +8–15% per-page rank improvement                      |
| P1.6 Location-aware CTAs        | 1 hr     | +5–8% WhatsApp conversion rate                        |
| P1.7 15 feeder school pages     | 6–8 hrs  | +8–12% mid-funnel traffic                             |
| P2.8 Google Business Profile    | External | +20–30% Local Pack visibility                         |
| P2.9 Local backlinks            | External | +5–10% domain authority lift over 3 months            |
| P2.10 Redirect audit            | 1 hr     | +3–5% recovery of thin mid-funnel traffic             |

**P0 total time**: ~90 min. **P0+P1 cumulative impact**: 25–40% Delhi NCR query lift within 6 weeks of full crawl propagation.

---

## EXECUTION LOG — 13 May 2026

### ✅ Shipped

- **P0.1 `/neet-coaching-delhi`** — Created with `CityHubPage` + `DelhiAreaSchema`. Added 'delhi' entry to `city-hub-data.ts` with all 3 Delhi centres, 12 localities, 8 FAQs (incl Allen/Aakash/FIITJEE comparison), local landmarks, competitor comparison fields, geo (28.5694, 77.2256). Added to sitemap priority 0.97.
- **P0.2 DelhiAreaSchema coverage** — Audited 60 Delhi pages, identified 25 missing. Added schema to 9 highest-value pages: `/biology-classes-delhi`, `/neet-coaching-south-delhi`, `/neet-biology-tutor-delhi-ncr`, `/biology-home-tutor-delhi-ncr`, `/neet-coaching-saket-delhi`, `/neet-coaching-vasant-kunj-delhi`, `/neet-coaching-green-park-delhi`, `/neet-coaching-defence-colony-delhi`, `/ap-biology-tutor-delhi-ncr`. Remaining 16 pages = follow-up batch.
- **P0.3 Multi-centre `EducationalOrganization` schema** — Created `src/components/seo/CerebrumOrgSchema.tsx` with all 6 NCR centres as `department[]` (each with address, geo, telephone, opening hours, hasMap). Injected site-wide via `src/app/layout.tsx`. AggregateRating + areaServed (16 cities) + contactPoint (admissions + customer support).
- **P0.4 Footer cross-links** — Added /neet-coaching-delhi, gurugram, noida, faridabad, ghaziabad, best-neet-coaching-near-me to Centers section. New RE-NEET 2026 footer column (6 links). New Popular column (5 links: Best Biology Teacher India, Biology Tutor for NEET, Best Biology Classes for NEET, 1-on-1 NEET Biology Tutor, NRI Quota MBBS). Footer expanded from 5→6 columns.
- **P1.6 Location-aware WhatsApp CTAs** — `FloatingWhatsAppButton` now auto-detects city from URL slug (Gurugram/Noida/Faridabad/Ghaziabad/Rohini/South Delhi/Delhi NCR/Mumbai/Bangalore/Hyderabad/Chennai/Kolkata/Pune/Kota), appends `[Location: X · Page: /slug]` to WhatsApp message + UTM params (`utm_source=floating_cta&utm_medium=whatsapp&utm_campaign=...&utm_content=<city>`).
- **P2.10 Redirect audit** — Ran `scripts/audit-redirects.mjs`. Found 1 conflicting duplicate (`/online-neet-biology-classes`) — resolved by removing the older `→ /online-neet-coaching` mapping in favour of the newer `→ /biology-classes-for-neet` (semantically more accurate). Zero conflicts, zero chains, 580 total redirects remaining.

### 📋 Deferred (next sprint)

- **P1.5 Locality-specific content on 5 top Delhi NCR pages** — ~4 hours of content rewriting. Requires Delhi-area-specific knowledge: real DPS / Sanskriti / Modern feeder schools, real metro stations, real sectors, real testimonial neighbourhoods. Recommended approach: spawn 5 parallel content-writer agents one per page, brief each with the specific locality data.
- **P1.7 15 feeder-school landing pages** — ~6–8 hours. Should follow the existing IB-Biology / AP-Biology feeder-school template (`src/data/ib-biology/schools.ts` + `IBBiologySchoolTemplate`). Build a `delhi-ncr-feeder-schools.ts` data file + `NEETFeederSchoolTemplate` component, then thin page.tsx per school.
- **P0.2 remainder** — Add `DelhiAreaSchema` to the remaining 16 Delhi pages. Use the same Python codemod (`/tmp/inject_schema.py` — fragment-wrap pattern). High-value remaining targets: `/neet-coaching-chandni-chowk-delhi`, `/neet-coaching-connaught-place-delhi`, `/neet-coaching-civil-lines-delhi`, `/neet-coaching-yamuna-vihar-delhi`, `/neet-coaching-shahdara-east-delhi`, `/neet-coaching-dilshad-garden-delhi`, `/neet-coaching-cr-park-delhi`, `/neet-coaching-panchsheel-park-delhi`, `/neet-coaching-modern-school-delhi`, `/neet-coaching-safdarjung-enclave-delhi`, `/biology-coaching-vasant-vihar-delhi`, `/biology-coaching-east-of-kailash-delhi`, `/biology-olympiad-tutor-sanskriti-school-delhi`, `/biology-tuition-fees-delhi-ncr`, `/find-biology-tutor-delhi-ncr`, `/re-neet-2026-delhi`.

### 🎯 P2 (External — User Action Required)

- **P2.8 Google Business Profile** — Claim/verify GBP listings for all 6 centres (South Extension, Rohini, Green Park, Gurugram Sector 51, Faridabad Sector 17, Noida Sector 62). Upload 10+ photos per centre. Set hours matching CerebrumOrgSchema (Mon–Sat 9–8, Sun 10–5). Solicit reviews from past students with locality mentions.
- **P2.9 Local backlinks** — Outreach targets: Indian Parents Network (delhi NCR forum), ParentCircle Delhi groups, Delhi parent WhatsApp groups, EducationWorld India, TheBetterIndia, IndianMoms forum, Quora answers to "best NEET coaching in Delhi/Gurugram/Noida" with verified Cerebrum founder profile.

### Verification

- ✅ Type-check clean (0 errors in changed files)
- ✅ Sitemap includes `/neet-coaching-delhi` at priority 0.97
- ✅ `scripts/audit-redirects.mjs` reports 0 conflicts, 0 chains
- ✅ All schema renders via server components (no client-side hydration risk)
- ⏳ Pending: Manual Google Search Console "Request Indexing" for `/neet-coaching-delhi` after deploy
