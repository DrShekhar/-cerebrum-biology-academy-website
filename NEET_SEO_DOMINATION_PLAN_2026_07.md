# NEET Search Domination Plan — Jul 2026 (targeting NEET 2027)

Combines: (a) city-page coverage audit, (b) keyword/market research, (c) the biology-specialist wedge.
Goal: dominate "NEET coaching", "online NEET coaching", "NEET dropper/repeater", "NEET biology" search across Indian cities + AI answer engines (AEO).

---

## 0. The core problem (from the audit)

Indexability is INVERTED vs. commercial intent:

| Segment | State | Consequence |
|---|---|---|
| `neet-dropper-batch-<city>` (56) | **100% noindex** | entire repeater/dropper intent un-rankable |
| `online-neet-coaching-<city>` (56) | **51 noindex / 5 indexed** | "online NEET coaching <city>" un-rankable except 5 NCR cities |
| `best-neet-coaching-<city>` (8) | indexed, **NCR only** | highest-CPC term uncovered for every tier-1 hub |
| `neet-coaching-<city>` plain (436) | **all indexed** incl. ~49 fees-* + 68 school doorways | scaled-content risk; thin tail dilutes quality signal |
| `neet-coaching-near-me-<city>` (56) | all indexed, ~60-70% unique | the one strong indexed city page |

The dropper/online pages were noindexed because they render only ~4% unique copy. BUT the shared data
(`src/data/locality-content/near-me-cities*.ts`, 57 unique `NearMeCityData` entries) already contains
rich per-city prose (`cityContext`, `whyOnlineHere`, `typicalAspirant`, hand-written `localFaqs`) that the
near-me template uses fully. **The fix is to make dropper/online render that unique prose, then re-index —
not to leave the highest-intent segment dark.**

**Guardrail:** never re-index a templated page without first injecting ≥40% unique copy (scaled-content
policy). Pair every re-index with uniqueness.

---

## 1. Keyword landscape (research)

- **Temporal anchor:** NEET 2027 ≈ first Sunday of May 2027. "NEET 2027" is the modifier everyone is racing to own.
- **Head terms:** `neet coaching in <city>`, `best neet coaching <city>`, `online neet coaching`, `neet coaching near me`, `neet dropper batch 2027`, `neet repeater course`, `best neet coaching for droppers`, `neet biology coaching`, `neet coaching fees`.
- **AEO questions (Google + AI engines):** how to start NEET 2027 dropper prep; how long does a dropper need (10-12 mo); mistake-audit / where did I lose marks; online vs offline for droppers; which coaching is best for droppers; what is a repeater course; NEET 2027 exam date.
- **Competitor patterns:** PW = 102 dropper batches (86 online) → volume play; rivals localize sub-city (Hyderabad → Kukatpally/Miyapur/Ameerpet/LB Nagar/Dilsukhnagar/Secunderabad); fees-transparency is a search magnet.
- **Cerebrum wedge (own these):** biology-specialist (360/720 = 50%); "mistake-audit / where you lost marks" dropper framing; AI + 1:1 mentorship; NEET 2027 freshness. No generalist chain owns "NEET *Biology*" like a specialist can.

---

## 2. City tiering

- **Tier 1 (12 hubs):** Kota, Delhi, Hyderabad, Bangalore, Chennai, Mumbai, Kolkata, Pune, Jaipur, Indore, Lucknow, Patna.
- **Tier 1 South add:** Visakhapatnam, Vijayawada, Coimbatore, Kochi, Madurai.
- **NCR (already full family):** Delhi, Noida, Gurugram, Faridabad, Ghaziabad, Greater Noida, Meerut.
- **Total-gap cities (plain page only):** Nagpur, Ahmedabad (no D/O), Agra, Jodhpur, Udaipur, Gwalior; Pune (no online).

---

## 3. The plan — 4 waves (priority order)

### WAVE 0 — Reclaim what's already built (highest ROI; mostly re-index + uniqueness)
0.1 **Differentiate + re-index dropper & online for Tier-1 cities.** Make `DropperBatchTemplate` / online pages render the unique per-city prose already in the data (cityContext, whyOnlineHere, localFaqs) so each ≥40% unique, then flip `robots` to `index,follow`. Recovers the dropper/repeater + online segments for ~17 highest-value cities. Files: `neet-dropper-batch-*/page.tsx`, `online-neet-coaching-*/page.tsx`, `DropperBatchTemplate.tsx`.
0.2 **Suppress/consolidate thin doorways in the plain family** (49 `fees-*`, 68 `dps-*`/`amity-*` school pages): fold fees into each city page's fees section; `noindex,follow` the school-name doorways. Protects the whole subdomain's quality signal (same fix already applied to dropper/online, never applied here).
0.3 **Resolve plain-vs-near-me cannibalization:** one canonical indexed city page per city per head term. Recommend: near-me = "near me / online-from-<city>" intent; plain hub = "NEET coaching <city>" intent; cross-link + set canonicals so they stop competing.
0.4 **De-stale "best" + dropper titles:** `2026` → `2027` cycle (`best-neet-coaching-*`), verify dropper "2027" copy current.

### WAVE 1 — Cover the highest-CPC uncovered term
1.1 **Build `best-neet-coaching-<city>` for Tier-1 (12) + South (5).** Highest-intent uncovered head term; model on `best-neet-coaching-noida/`. Unique comparison content (vs Allen/Aakash/PW *by name*), biology-specialist angle, NEET 2027, fees table.
1.2 **Fill total-gap cities:** add `NearMeCityData` entries + the 3 family pages for Nagpur, Agra, Jodhpur, Udaipur, Gwalior; add Pune online + Ahmedabad dropper/online (data may already exist).

### WAVE 2 — NEET 2027 + biology wedge + fees
2.1 **Indexable "NEET 2027 <city>" angle** — unique cutoff/timeline/mistake-audit content per Tier-1 city (not just a noindexed dropper title).
2.2 **Per-city biology-specialist tutor pages** (`biology-tutor-<city>`) for Tier-1 — leverages the actual differentiator (currently NCR-only).
2.3 **Indexable fees pages** with unique per-city fee content (fees is top-of-funnel; currently thin doorways).

### WAVE 3 — AEO / GEO domination
3.1 **Move the richest AEO markup (Speakable/Person/FAQ) onto indexed pages** — right now it's strongest on noindexed droppers.
3.2 **Question-hub content** answering the AEO queries (how-to-start-2027, mistake-audit, online-vs-offline, how-long-does-a-dropper-need) — win AI-answer citations.
3.3 **llms.txt / ai.txt** city + dropper coverage refresh so AI engines recommend Cerebrum per city + for NEET 2027 droppers.

---

## 4. Content requirements per page (to be rankable, not a doorway)

Every city intent page must have, before it earns `index,follow`:
- ≥40% unique prose (pull from `cityContext`/`whyOnlineHere`/`typicalAspirant`).
- Unique per-city FAQs (the data's `localFaqs`, not the 7 templated dropper FAQs).
- GEO signal: `majorAreas`, `stateQuotaCollege`, feeder schools, local coaching landscape.
- Biology wedge (360/720), NEET 2027, mistake-audit dropper framing.
- Course + FAQPage + Breadcrumb + LocalBusiness JSON-LD; Speakable summary.
- Canonical clarity (one page per city per head term).

---

## 5. Sequencing & effort (recommended)

1. **Wave 0.2 + 0.4** (suppress doorways, de-stale) — days, low risk, protects quality.
2. **Wave 0.1** (differentiate + re-index dropper/online Tier-1) — the single biggest rankability lever.
3. **Wave 0.3** (cannibalization canonicals).
4. **Wave 1.1** (best-<city> Tier-1/South).
5. **Wave 1.2** (fill gap cities).
6. **Waves 2-3** (2027 temporal, biology tutor, fees, AEO).

Biggest lever = Wave 0.1 (indexability inversion), not new-page volume: the two highest-intent segments are
~100% dark today. Rebalancing what Google may rank moves rankings more than building more pages.
