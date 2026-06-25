# USA SEO / AEO / GEO Audit — Cerebrum Biology Academy

**Date:** 25 Jun 2026 · 4-agent deep audit (SEO structure · schema/GEO · AEO · on-page content). No files modified.

**Headline:** US page *coverage* is strong and the recent AEO/discoverability work holds (US routing blocks in llms.txt/ai.txt correct; review-schema strip intact — **no fabricated rating JSON-LD on any US page**). The real damage is in four clusters: (1) the MCAT hub + llms-full.txt were bulk-scrubbed into **broken euphemism placeholders** that never name competitors; (2) **conflicting prices** on MCAT and AP city pages; (3) **unverifiable US claims** (fabrication-policy risk — same family as the prior GSC strike); (4) **schema/sitemap/cannibalization** hygiene.

---

## P0 — Fix now

**1. `/mcat-biology` hub never names competitors + contains broken placeholder text.**
`src/app/mcat-biology/page.tsx` lines 40, 82, 85, 87, 102, 381-382, 421, 635-636, 687, 695. "other generalist test-prep brands" everywhere a name belongs, incl. nonsensical doubled phrases (L87, L421, L695: `…other generalist MCAT brands, other generalist MCAT brands…`). Never says "Kaplan"/"Princeton Review". Can't rank for comparison queries; LLMs learn no facts. → restore real names (Kaplan, The Princeton Review, Blueprint); delete duplicated tokens.

**2. `public/llms-full.txt` carries the same euphemism leak.** Lines 87, 141, 197, 511, 2132 (L2132 doubled). llms.txt:85 advertises "comparison (vs Kaplan, Princeton Review, Allen)" that this file doesn't deliver. → replace placeholders with real names.

**3. MCAT city pages show THREE conflicting price sets.** Body `$449/$899/$1,349` + `$135/hr` (`MCATBiologyCityTemplate.tsx:257-273,247`) vs Course schema `$499/$999/$1,499` (`:46-63`) vs meta "$499 to $1,499"/`$999`/`$150/hr` (`src/data/mcat/metros.ts:57,73,161…`). → one canonical price table feeding body + schema + meta.

**4. AP city pages show THREE conflicting price systems.** Meta "From $1,800" (`ap-biology-tutor-{new-york,boston,bay-area,atlanta,houston-dallas}/page.tsx:~21-23`) vs cards `$2,500–$7,000/yr` (`src/data/ap-biology/pricing-matrix.ts:28-66`) vs body `$1,800–$5,760 + $40/hr` (`src/data/ap-biology/metros.ts:93,177,359,477,533,590`) vs ranking `$499/$999/$1,499 + $150/hr` (`src/data/top-ranking-ap-biology-usa.ts:31,44`). → reconcile to one architecture.

---

## P1 — Significant

### Fabrication-policy risk (treat like the review-schema strip)
- **Unverifiable US outcomes stated as fact.** "Documented score-5 outcomes across 10+ US metros" / "AP Bio Score-5 Rate: Documented" (`top-ranking-ap-biology-usa.ts:28,39,64`); "Documented USABO Open/Semifinal/National qualifiers" (`top-ranking-usabo.ts:23,35`); "Avg +2 score points / 20 hrs" (`APBiologyCityTemplate.tsx:231`). No US results exist in canonical facts (llms.txt:8-9 = NEET/AIIMS/India only). → remove or qualify ("documented" → "targeted/our focus").
- **"PhD biology faculty"** (`APBiologyCityTemplate.tsx:224`; `ap-biology/metros.ts:700,815,890,969`) contradicts canonical "AIIMS-trained, 15+ yrs" (llms.txt:7 — never PhD). → standardize to "AIIMS-trained".
- **Specific unverified result:** "2025 USA Brain Bee national champion was an Atlanta-area teen" (`brain-bee/brainBeeCities.ts:213`, renders in Atlanta hero). → cite or remove.

### SEO structure
- **7 indexable `*-tutor-global` hubs + `ibo-coaching-usa` missing from `sitemap.ts`** (ap/mcat/biology-olympiad/neet/ib/a-level-tutor-global :26; ibo-coaching-usa :33). Only `best-biology-tutor-global` is included. → add to a sitemap array.
- **`neet-biology-tutor-global` fully orphaned** (not in sitemap + 0 internal inbound). → sitemap + footer/hub link.
- **Cannibalization (the historical #1 risk):**
  - USABO: `best-usabo-coach` (`:9-19`) and `top-usabo-coaching` (`:10-11`) both target `best usabo coach` + `top usabo coaching`. → split intent, cross-link.
  - AP-USA: `best-ap-biology-tutor-usa`, `top-ap-biology-coaching-usa`, the USA hub, and `ap-biology-tutor-global` all overlap on "best/AP biology tutor (usa)". → trim generic terms from the global hub; one query per page.
  - MCAT: `best-mcat-biology-tutor` vs `mcat-biology` hub (lower risk; monitor).
- **MCAT city pages orphaned** — hub links only 5/14 (`mcat-biology/page.tsx`); template has no nearby-cities block. → render full `mcatMetroSlugs`.
- **DAT city pages orphaned** — hub links only 2 (`best-dat-biology-tutor`). → add full list.

### Schema / GEO
- **Duplicate `#organization` node** re-declared (thinner, divergent) in `BestVerticalLanding.tsx:126-140` (best-ap/dat/mcat/usabo/usmle) and `brain-bee-coaching/page.tsx:306-307` — conflicts with the canonical root `CerebrumOrgSchema`. → drop; reference `{ '@id': '…/#organization' }` only.
- **`top-ap-biology-coaching-usa` emits India/NEET Course schema** via `NEETSchemaStack` — `inLanguage:'en-IN'`, `priceCurrency:'INR'`, `educationalLevel:'NEET-UG Aspirant'`, "680+ medical college selections" (`NEETSchemaStack.tsx:138-160`) on a USA AP page. → pass AP-USA/USD overrides. Also **missing FAQPage** (no `faqs` passed, `page.tsx:41`).
- **`BestVerticalLanding` emits no `areaServed`** — the 5 "…USA" pages have zero geo signal. → add `Country: United States` to courseSchema.

### AEO
- **MCAT hub orphans its own comparison pages** — no link to `/cerebrum-vs-{kaplan,princeton-review,blueprint}-mcat` (these are clean, name competitors 29×). → add a "Compare" section.
- **USA hub omits Honors + College links** that llms.txt:73 promotes. → add cards.
- **Brain Bee "Call +91" without international-WhatsApp framing** (`brain-bee-coaching/page.tsx:415,673`). → add "WhatsApp works free from the US — no international call; classes in ET/CT/MT/PT."

### Content
- **19 USABO city pages near-identical title + description** (`USABO Coaching for ${city} Students | AIIMS-Trained Faculty`); >70% shared body, unique = heroBlurb+rigourBlurb+schools+1-2 FAQs. Thin/doorway pattern. → differentiate titles + expand unique copy.

---

## P2 — Polish

- **hreflang uneven:** `BestVerticalLanding` injects none (best-ap/dat/mcat/usabo/usmle + many city pages have canonical only); USABO cities lack `x-default`; `usabo-coaching/layout.tsx:61` x-default → `/biology-olympiads` (different URL). → standardize `{ en, 'en-US', 'x-default'(self) }`, easiest via the shared templates.
- **Unused live `ReviewSchema`/`ReviewListSchema`** (`StructuredData.tsx:1266-1344`) emit self-serving `@type:Review` — currently no importers, re-introduction footgun. → neutralize/delete like `CerebrumAggregateRating`.
- **No `speakable` schema on US pages** (global only has a `data-speakable` HTML attr, no SpeakableSpecification JSON-LD). → add to best-biology-tutor-usa + `*-global` hubs + BestVerticalLanding.
- **brain-bee-coaching missing BreadcrumbList.**
- **honors/college `areaServed: 'Worldwide'`** despite US framing — consider including United States.
- **India-first signals to US visitors:** "AAMC-to-NCERT crosswalk" (`top-ranking-ap-biology-usa.ts:20,30`; `top-ap-biology-coaching-usa/page.tsx:8,34,51`) — reframe as "College Board CED alignment"; visible "+91" / "Call us" secondary CTAs on US city templates (label "WhatsApp — free from the US").
- **USABO USD pricing only in schema, never on the visible page** (`USABOCityTemplate.tsx:176-201`) — surface on-page or align schema to "contact for pricing".
- **FAQ buyer-intent gaps:** USA hub + honors/college lack "what does it cost" / "online vs in-person".

---

## Confirmed clean (no action)
- Review-schema strip holds — no `aggregateRating`/`Review`/`reviewCount`/`ratingValue` on any US page.
- All US URLs in llms.txt/ai.txt resolve (no 404/redirect); US canonicals are self-referential to live pages; no US page is a redirect source.
- AI crawler tokens all allowed (robots.ts); no stale `public/robots.txt`.
- No US page carries India coordinates / `addressCountry: IN` / fake US `LocalBusiness`.
- Brand stats (98% / 680+ / 67+ AIIMS / 5.0·38 / 2014 / 15+ yr) consistent across US pages; the % figures finders flagged are exam-content stats, not brand claims.
- `best-biology-tutor-usa`, honors, college pages well-localized (USD, AIIMS glossed, no ₹/NEET framing). Dedicated vs-Kaplan/Princeton/Blueprint pages name competitors correctly.
