# NRI NEET City-Page Gap List — Repo Audit

**Source:** Cross-reference of `NRI_NEET_MARKET_AUDIT.md` targets vs existing `src/app/neet-coaching-*` and `src/app/international/[country]` routes.
**Audit date:** 2026-04-24

Legend: ✅ exists (full) · ⚠️ exists but thin/needs depth · 🟡 exists under different slug · ❌ missing

---

## Section 1 — Tier A Gulf (primary market, highest SEO priority)

### UAE — 🇦🇪

| Target city    | Slug                           | Status     | Notes                                                                                                                |
| -------------- | ------------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Dubai          | `/neet-coaching-dubai-uae`     | ✅ Full    | 62 LOC + PageContent + LocalitySchema + 8 FAQs. Stats need verification (98%). Fees in INR — should localize to AED. |
| Sharjah        | `/neet-coaching-sharjah-uae`   | ✅ Full    | 62 LOC + PageContent                                                                                                 |
| Abu Dhabi      | `/neet-coaching-abu-dhabi-uae` | ✅ Full    | 62 LOC + PageContent                                                                                                 |
| Al Ain         | `/neet-coaching-al-ain-uae`    | ⚠️ Thin    | **Only 15 LOC, no FAQs/schema in page.tsx.** Audit PageContent.tsx for depth.                                        |
| Ajman          | —                              | ❌ Missing | Overflow from Sharjah. Medium volume. Build.                                                                         |
| Ras Al Khaimah | —                              | ❌ Missing | Small but growing Indian pop. Optional.                                                                              |

### Saudi Arabia — 🇸🇦

| Target city | Slug                                 | Status     | Notes                                                                                          |
| ----------- | ------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| Riyadh      | `/neet-coaching-riyadh-saudi-arabia` | ✅ Full    | 61 LOC                                                                                         |
| Jeddah      | `/neet-coaching-jeddah-saudi-arabia` | ✅ Full    | 61 LOC                                                                                         |
| Dammam      | `/neet-coaching-dammam-saudi-arabia` | ✅ Full    | 46 LOC + layout                                                                                |
| Al Khobar   | —                                    | ❌ Missing | Usually paired with Dammam (Eastern Province). Consider merging under Dammam or separate page. |

### Qatar — 🇶🇦

| Target city | Slug                        | Status  | Notes  |
| ----------- | --------------------------- | ------- | ------ |
| Doha        | `/neet-coaching-doha-qatar` | ✅ Full | 61 LOC |

### Oman — 🇴🇲

| Target city | Slug                          | Status     | Notes                                            |
| ----------- | ----------------------------- | ---------- | ------------------------------------------------ |
| Muscat      | `/neet-coaching-muscat-oman`  | ✅ Full    | 61 LOC                                           |
| Salalah     | `/neet-coaching-salalah-oman` | ⚠️ Thin    | **15 LOC, same shell pattern as Al Ain.** Audit. |
| Sohar       | —                             | ❌ Missing | Part of 21-school Indian network. Low priority.  |
| Sur         | —                             | ❌ Missing | Low priority.                                    |

### Kuwait — 🇰🇼

| Target city | Slug                         | Status     | Notes                               |
| ----------- | ---------------------------- | ---------- | ----------------------------------- |
| Kuwait City | `/neet-coaching-kuwait-city` | ✅ Full    | 62 LOC                              |
| Salmiya     | —                            | ❌ Missing | Dense Indian community area. Build. |

### Bahrain — 🇧🇭

| Target city | Slug                     | Status                | Notes                                                                                                                                                                                                                                                      |
| ----------- | ------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Manama      | `/neet-coaching-bahrain` | 🟡 Under country slug | Page is named by country, not city. Either: (a) rename canonical to `/neet-coaching-manama-bahrain` + 301 from `/neet-coaching-bahrain`, OR (b) keep as country-level and add a separate `/neet-coaching-manama-bahrain`. **Decide before building more.** |
| Riffa       | —                        | ❌ Missing            | Secondary city. Low priority.                                                                                                                                                                                                                              |

---

## Section 2 — Tier B SE Asia + Africa (secondary)

| Target city            | Country | Slug                                   | Status     | Notes                                         |
| ---------------------- | ------- | -------------------------------------- | ---------- | --------------------------------------------- |
| Singapore              | 🇸🇬      | `/neet-coaching-singapore-city`        | ✅ Full    | 46 LOC + layout                               |
| Kuala Lumpur           | 🇲🇾      | `/neet-coaching-kuala-lumpur-malaysia` | ✅ Full    | 46 LOC + layout                               |
| Johor Bahru            | 🇲🇾      | —                                      | ❌ Missing | Smaller expat pocket. Low priority.           |
| Penang                 | 🇲🇾      | —                                      | ❌ Missing | Low priority.                                 |
| Bangkok                | 🇹🇭      | `/neet-coaching-bangkok-thailand`      | ✅ Full    | 62 LOC                                        |
| Chiang Mai             | 🇹🇭      | `/neet-coaching-chiang-mai-thailand`   | ✅ Exists  | Niche — not flagged in audit but already live |
| Lagos                  | 🇳🇬      | `/neet-coaching-lagos-nigeria`         | ✅ Full    | 46 LOC + layout                               |
| Abuja                  | 🇳🇬      | —                                      | ❌ Missing | Secondary to Lagos. Optional.                 |
| Cairo                  | 🇪🇬      | `/neet-coaching-cairo-egypt`           | ✅ Exists  | Not in audit tier but already live            |
| West Africa (regional) | —       | `/neet-coaching-west-africa`           | ✅ Exists  | Regional hub page                             |

**SE Asia/Africa verdict:** Strong coverage. Only meaningful gap is Abuja and Johor Bahru if we want completeness, but ROI low.

---

## Section 3 — Tier C West (niche but high-value)

### USA — 🇺🇸

| Target metro    | Slug                          | Status                   | Notes                                                                                                                                                                     |
| --------------- | ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New York / NJ   | `/neet-coaching-new-york-usa` | ✅ Full                  | 40 LOC. **Should also build dedicated `/neet-coaching-edison-nj` or `/neet-coaching-jersey-city-nj` — Edison/JC have the densest Indian-American population per capita.** |
| Houston         | `/neet-coaching-houston-usa`  | ✅ Full                  | 62 LOC                                                                                                                                                                    |
| Dallas          | `/neet-coaching-dallas-usa`   | ✅ Full                  | 62 LOC + layout                                                                                                                                                           |
| Chicago         | `/neet-coaching-chicago-usa`  | ✅ Full                  | 62 LOC + layout                                                                                                                                                           |
| **SF Bay Area** | —                             | ❌ **MISSING — TOP GAP** | Fremont + Sunnyvale + San Jose = highest-income Indian-American cluster. Build `/neet-coaching-san-francisco-bay-area-usa` or `/neet-coaching-fremont-ca-usa`.            |
| Atlanta         | —                             | ❌ Missing               | Johns Creek + Alpharetta. Build.                                                                                                                                          |
| Washington DC   | —                             | ❌ Missing               | Fairfax, Loudoun, MoCo. Build.                                                                                                                                            |
| Boston          | —                             | ❌ Missing               | Burlington, Westford. Build.                                                                                                                                              |
| Seattle         | —                             | ❌ Missing               | Bellevue, Redmond. Build.                                                                                                                                                 |
| Los Angeles     | —                             | ❌ Missing               | Irvine, Cerritos. Lower priority.                                                                                                                                         |
| Philadelphia    | —                             | ❌ Missing               | Low priority.                                                                                                                                                             |
| Detroit         | —                             | ❌ Missing               | Low priority.                                                                                                                                                             |

### UK — 🇬🇧

| Target city   | Slug                       | Status                    | Notes                                                                   |
| ------------- | -------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| London        | `/neet-coaching-london-uk` | ✅ Full                   | 40 LOC                                                                  |
| **Leicester** | —                          | ❌ **MISSING — HIGH GAP** | Largest Indian-origin city in UK per capita (~28% of residents). Build. |
| Birmingham    | —                          | ❌ Missing                | Second-largest Indian UK community. Build.                              |
| Manchester    | —                          | ❌ Missing                | Build.                                                                  |
| Glasgow       | —                          | ❌ Missing                | Smaller. Low priority.                                                  |

### Canada — 🇨🇦

| Target city                | Slug                              | Status                    | Notes                                                                                         |
| -------------------------- | --------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------- |
| Toronto                    | `/neet-coaching-toronto-canada`   | ✅ Full                   | + layout + PageContent                                                                        |
| Vancouver                  | `/neet-coaching-vancouver-canada` | ✅ Full                   | + layout + PageContent                                                                        |
| **Brampton / Mississauga** | —                                 | ❌ **MISSING — HIGH GAP** | Peel Region = largest South Asian cluster in Canada. Technically GTA but distinct SEO intent. |
| Calgary                    | —                                 | ❌ Missing                | Growing Indian community. Build.                                                              |
| Edmonton                   | —                                 | ❌ Missing                | Medium priority.                                                                              |
| Montreal                   | —                                 | ❌ Missing                | Low priority (French-dominant).                                                               |

### Australia — 🇦🇺

| Target city | Slug                                 | Status     | Notes                            |
| ----------- | ------------------------------------ | ---------- | -------------------------------- |
| Sydney      | `/neet-coaching-sydney-australia`    | ✅ Full    | + layout + PageContent           |
| Melbourne   | `/neet-coaching-melbourne-australia` | ✅ Full    | + layout + PageContent           |
| Brisbane    | —                                    | ❌ Missing | Growing Indian community. Build. |
| Perth       | —                                    | ❌ Missing | Medium.                          |
| Adelaide    | —                                    | ❌ Missing | Low priority.                    |

### New Zealand — 🇳🇿

| Target city | Slug | Status     | Notes                                                             |
| ----------- | ---- | ---------- | ----------------------------------------------------------------- |
| Auckland    | —    | ❌ Missing | Largest Indian NZ community. Build (low effort, low competition). |
| Wellington  | —    | ❌ Missing | Low priority.                                                     |

---

## Section 4 — Neighbouring / SAARC (not NRI strictly, already covered)

| City               | Slug                               | Status    |
| ------------------ | ---------------------------------- | --------- |
| Colombo, Sri Lanka | `/neet-coaching-colombo-sri-lanka` | ✅ Full   |
| Kathmandu, Nepal   | `/neet-coaching-kathmandu-nepal`   | ✅ Full   |
| Dhaka, Bangladesh  | `/neet-coaching-dhaka-bangladesh`  | ✅ Exists |
| Lahore, Pakistan   | `/neet-coaching-lahore-pakistan`   | ✅ Exists |

---

## Section 5 — NRI Country Hub Pages

These are the **country-level conversion pages** separate from individual city pages.

| Country      | Slug                              | Status                          |
| ------------ | --------------------------------- | ------------------------------- | ---------------------------------------------------------------- |
| USA          | `/neet-coaching-nri-usa`          | ✅ Exists                       |
| UK           | `/neet-coaching-nri-uk`           | ✅ Exists                       |
| Singapore    | `/neet-coaching-nri-singapore`    | ✅ Exists                       |
| Saudi Arabia | `/neet-coaching-nri-saudi-arabia` | ✅ Exists                       |
| Qatar        | `/neet-coaching-nri-qatar`        | ✅ Exists                       |
| Oman         | `/neet-coaching-nri-oman`         | ✅ Exists                       |
| Nepal        | `/neet-coaching-nri-nepal`        | ✅ Exists                       |
| Malaysia     | `/neet-coaching-nri-malaysia`     | ✅ Exists                       |
| Canada       | `/neet-coaching-nri-canada`       | ✅ Exists                       |
| Australia    | `/neet-coaching-nri-australia`    | ✅ Exists                       |
| **UAE**      | —                                 | ❌ **MISSING — SURPRISING GAP** | UAE is the #1 market but no `/neet-coaching-nri-uae` hub. Build. |
| **Kuwait**   | —                                 | ❌ Missing                      | Build.                                                           |
| **Bahrain**  | —                                 | ❌ Missing                      | Build.                                                           |
| Thailand     | —                                 | ❌ Missing                      | Low priority (city page enough).                                 |
| Nigeria      | —                                 | ❌ Missing                      | Low priority.                                                    |

**Plus:** `/international/[country]` dynamic route covers: `us, uk, ca, au, sg, ae, ie, hk, nz, za, sa, bd, lk, eg, pk` + IB expansion markets. **This is a parallel URL system — review for cannibalization with `/neet-coaching-nri-*` slugs.**

---

## Section 6 — Missing hub / conversion pages (strategic)

| Page                         | Priority | Why                                                                                                                                                                                  |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/nri-quota-mbbs`            | **P0**   | Single canonical conversion page for the Tier C (USA/UK/Canada/Aus) market who pursue NEET specifically for NRI quota MBBS in India. This is the highest-willingness-to-pay segment. |
| `/neet-exam-centres-abroad`  | **P1**   | Authority page mapping all 14 overseas NEET exam centres with NTA logistics, admit card process, travel for neighbouring countries. Ranks for high-volume informational intent.      |
| `/cbse-students-abroad-neet` | **P1**   | Hub targeting the CBSE Gulf Sahodaya community (193 schools). Links out to all Tier A city pages.                                                                                    |
| `/nri-neet-fees-documents`   | **P2**   | Documentation hub (parent employment cert, visa, work permit for NRI NEET registration).                                                                                             |

---

## Section 7 — Quality flags on existing pages

### Pages that look like shells (15 LOC) — need depth verification

- `/neet-coaching-al-ain-uae/page.tsx` — 15 lines
- `/neet-coaching-salalah-oman/page.tsx` — 15 lines

**Action:** open both `PageContent.tsx` files. If they render minimal content, enrich to match Dubai/Sharjah depth.

### Cross-cutting content issues (from prior audits)

- **Unverifiable stats everywhere**: "98% success rate", "67+ AIIMS", "695/720" — repeated on every city page. Previously flagged. Either verify & source, or delete.
- **Fee display**: Dubai page quotes fees in ₹ INR. Should use AED for UAE, SAR for Saudi, QAR for Qatar, etc. `GeoAwarePricingMatrix` exists — migrate.
- **FAQ boilerplate**: every city page has near-identical FAQ text. Risk: Google treats as duplicate content. Needs city-specific FAQ variants (real schools, real fees, real commute).
- **"AIIMS-qualified faculty"**: repeated on every page as boilerplate. Replace with named faculty where real, cut if not sourceable.

---

## Section 8 — Competitor footprint (for priority calibration)

| Competitor                 | Gulf                 | USA    | UK     | SE Asia |
| -------------------------- | -------------------- | ------ | ------ | ------- |
| ATP STEM                   | Strong (UAE core)    | —      | —      | —       |
| Allen Overseas             | Medium               | Weak   | Medium | —       |
| Aakash (digital + centres) | Medium (Saudi/UAE)   | Weak   | Weak   | —       |
| TestprepKart               | Medium (online only) | Medium | Medium | Weak    |
| Vibrant Academy            | UAE niche            | —      | —      | —       |

**Implication:** USA metros + Leicester + Brampton are the least-contested high-intent markets. Build those first before doubling depth on already-competitive Gulf cities.

---

## Recommended SEO plan — priority order

### Sprint 1 (ship in 2 weeks) — High-value missing pages

1. `/nri-quota-mbbs` — conversion hub (P0)
2. `/neet-coaching-nri-uae` — fills a surprising country-hub gap
3. `/neet-coaching-san-francisco-bay-area-usa` — top USA metro gap
4. `/neet-coaching-edison-nj-usa` or `/neet-coaching-new-jersey-usa` — Indian-American hub
5. `/neet-coaching-leicester-uk` — top UK gap (very low competition)
6. `/neet-coaching-brampton-canada` — Peel Region South Asian hub
7. Depth-audit + rewrite Al Ain + Salalah PageContents

### Sprint 2 (next 2 weeks) — Fill Tier A/C holes

1. `/neet-coaching-ajman-uae`
2. `/neet-coaching-salmiya-kuwait`
3. `/neet-coaching-nri-kuwait`, `/neet-coaching-nri-bahrain`
4. `/neet-coaching-atlanta-usa`, `/neet-coaching-washington-dc-usa`, `/neet-coaching-boston-usa`
5. `/neet-coaching-birmingham-uk`, `/neet-coaching-manchester-uk`
6. `/neet-coaching-calgary-canada`
7. `/neet-coaching-brisbane-australia`
8. `/neet-coaching-auckland-new-zealand`
9. Decide Manama canonical (rename or add)

### Sprint 3 (next 2 weeks) — Authority hubs + content debt

1. `/neet-exam-centres-abroad` — 14-centre informational hub
2. `/cbse-students-abroad-neet` — CBSE Gulf Sahodaya hub
3. Cross-page quality pass: verify stats, swap INR → local currency, de-duplicate FAQ boilerplate
4. Investigate cannibalization between `/neet-coaching-nri-*` slug family and `/international/[country]` dynamic route — decide canonical for each market

### Sprint 4 (ongoing) — Low-priority fillers

1. Remaining USA metros (Seattle, LA, DC)
2. Edmonton, Montreal, Perth, Adelaide
3. Abuja, Johor Bahru, Khobar, Sohar
4. Secondary UK: Glasgow

---

## Cannibalization risk to resolve before scaling

The repo has **3 parallel URL families** targeting similar intent:

1. `/neet-coaching-<city>-<country>` — city pages (specific intent: "best NEET coaching in X")
2. `/neet-coaching-nri-<country>` — country hubs (broader intent: "NEET prep for NRI from X")
3. `/international/<country>` — internationalized marketing pages (general tutoring, broader than NEET only)

**Before building more**, write a short canonical policy:

- Which family is canonical for each intent?
- What hreflang applies to each?
- Which redirects to which?
- Are these linked from each other correctly?

Without this, new pages will just cannibalize existing ones.

---

## Cross-ref to existing project docs

- Market audit: `NRI_NEET_MARKET_AUDIT.md`
- Cannibalization audit (Mar 2026): `SEO_CANNIBALIZATION_AUDIT.md`, `CANNIBALIZATION_FIX_PLAN.md`
- Redirect config: `src/config/seo-redirects.mjs`
- Country config: `src/lib/international/countries.ts`

---

## Headcount scorecard

| Tier                 | Target cities | Exist (full) | Exist (thin) | Missing                       |
| -------------------- | ------------- | ------------ | ------------ | ----------------------------- |
| A — Gulf priority    | 9             | 8            | 0            | 1 (Manama under country slug) |
| A — Gulf secondary   | ~10           | 1            | 2            | 7                             |
| B — SE Asia + Africa | ~10           | 6            | 0            | 4                             |
| C — USA metros       | ~12           | 4            | 0            | 8                             |
| C — UK cities        | ~5            | 1            | 0            | 4                             |
| C — Canada cities    | ~5            | 2            | 0            | 3                             |
| C — Australia cities | ~5            | 2            | 0            | 3                             |
| C — NZ               | ~2            | 0            | 0            | 2                             |
| NRI country hubs     | 15            | 10           | 0            | 5                             |
| Strategic hubs       | 4             | 0            | 0            | 4                             |
| **Total**            | **~77**       | **34**       | **2**        | **41**                        |

**~46% coverage of audited targets. Biggest gaps: USA metros (8) + NRI country hubs (5) + strategic hubs (4).**
