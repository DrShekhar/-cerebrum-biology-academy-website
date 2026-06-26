# USA Pages — Full Audit: SEO · AEO · GEO · UI · UX

**Date:** 26 Jun 2026 · 5-agent parallel audit (one per dimension), all USA verticals. AP/USABO/IBO SEO/AEO/GEO were just fixed separately — this pass focuses on MCAT/DAT/USMLE/Brain Bee/honors/college + the ~52 new pages, and gives UI/UX a first review. Code-level (no rendered-pixel check). No files modified.

**Headline:** Schema discipline, canonicals, titles, and the data-driven templates are in good shape. The real damage: (1) a **shared comparison template leaks India-NEET copy + a +91-call-first CTA to US buyers**, (2) **several high-intent pages have no conversion path**, (3) **Canadian cities are tagged `addressCountry: US`**, (4) pricing/best-* pages ship **no schema**, and (5) UI/UX consistency gaps (two hero styles, off-palette gradients, +91 without US framing).

---

## P0 — fix now

**1. `CompetitorComparisonLanding` shows India-NEET content + leads with a +91 call to US buyers** (UX/SEO/trust). `src/components/seo/CompetitorComparisonLanding.tsx` — affects the US-facing `cerebrum-vs-kaplan-mcat`, `-blueprint-mcat`, `-princeton-review-mcat`, `cerebrum-vs-khan-academy-ap-biology`:
- L137 primary above-fold CTA = `tel:+918826444334` ("Book Free Demo Class"); L160 "Or call +91…".
- L44/165/409 hardcoded "India's only… NEET coaching", "98% NEET-UG qualification rate", "680+ medical-college selections"; L179 "for **NEET Biology**" rendered on MCAT/AP pages; L442 footer "Best NEET Biology Coaching India".
- Fix: make WhatsApp the primary CTA (demote/remove the +91 tel), and move the NEET stat/subhead/footer-link strings into per-page `config` so US pages pass US proof (AP-5 / MCAT B/B) + a US cross-link.

**2. Zero conversion path on high-intent pages** (UX). No WhatsApp/form/demo on: the 8 AP unit pages + `/ap-biology-units` (its closing `MessageCircle` links to a guide, not WhatsApp), `ap-biology-score-5-study-guide`, `ap-biology-frq-rubric-mastery`, `ap-biology-vs-ib-biology`, `gamsat-vs-mcat-biology`, `dat-vs-mcat-biology`. These are Google entry points that end on a "read another page" link. Fix: append a shared WhatsApp/`GlobalEnquiryForm` CTA block (one pattern, replicated).

**3. Canadian cities emit `addressCountry: 'US'`** (GEO correctness). `DATBiologyCityTemplate.tsx:28` + `MCATBiologyCityTemplate.tsx:32` hardcode `'US'` while metro `stateCode` is ON/BC/QC → invalid `addressRegion:'ON', addressCountry:'US'` on toronto/vancouver/montreal. Fix: add `countryCode` to the metro config (default `'US'`, `'CA'` for those) and read it — `USMLEStep1CityTemplate.tsx:32` is the correct reference.

**4. Pricing + best-* pages ship NO structured data** (AEO/GEO). `mcat-biology-pricing`, `dat-biology-pricing`, `usmle-step-1-biology-pricing` emit zero JSON-LD (highest "cost" buyer-intent, content already there). `best-mcat-biology-tutor`, `best-dat-biology-tutor`, `best-usmle-step-1-biology-tutor` (funnel tops) emit zero JSON-LD + no `areaServed`. Fix: add FAQ+Breadcrumb (+Offer/Course w/ `priceCurrency:USD`, `areaServed: Country US`) — copy already exists in-page.

---

## P1 — significant

**SEO**
- **MCAT head-term cannibalization:** `/mcat-biology` (hub) and `/mcat-biology-preparation` both target "MCAT biology tutoring" with **zero links between them**. Fix: hub links down to prep; narrow prep's title/H1; add "part of the MCAT hub" backlink. (DAT does this right.)
- **State hubs near-orphan** (8 × only 1 inbound, from best-biology-tutor-usa) and **cross-vertical hubs thin** (us-biology-competitions-hub / us-biology-pathway, 2 inbound each). Fix: backlink state hubs from in-state city/vertical pages; link the competitions hub from Brain Bee/USABO/IBO and the pathway hub from honors/college/AP.

**AEO**
- **Subject-prep pages missing Person schema** (E-E-A-T): dat-biology-preparation, dat-biology-organic-chem-prep, dat-perceptual-ability-biology, mcat-biology-bb-section-prep, mcat-biology-passage-strategy, usmle-step-1-{biochemistry,physiology,microbiology-immunology}-prep. Add `<CerebrumPersonSchema/>`.
- **llms.txt missing ~25 high-value pages:** the two cross-vertical hubs, all `best-*` tutor pages, all 7 by-course pages, all 8 state hubs, the guides + worth-it pages. Add a "By US course / by state / buyer-intent" sub-section.
- **`CompetitorComparisonLanding` lacks Person/Course schema** (FAQ+Breadcrumb present) — add to template (propagates to 5 pages).

**GEO**
- Missing `areaServed` on mcat-biology hub (CollectionPage), mcat-biology-high-yield-topics-2026, mcat-biochemistry-prep, brain-bee-study-guide, + the pricing/best-* pages (see P0-4). honors/college use bare-string `areaServed` (promote to typed Country).

**UI**
- **Two unreconciled hero styles** across the new pages: dark-gradient family (MCAT/USABO/AP guides + units) vs light-hero family (honors/college/worth/state/brain-bee) + a one-off `bg-slate-950` on ap-biology-class-11. Pick one (or formally bless the split as guide-vs-informational).
- **Off-palette gradients:** `from-slate-900 via-blue-950 to-slate-900` (~12 new pages) and `BestVerticalLanding` green→blue (`:288`,`:454`, ~58 pages) aren't in DESIGN_REFERENCE's 8 approved gradients. Decision: normalize to `from-slate-900 to-slate-800` / add to the approved list (the green→blue is already sitewide).

**UX**
- **+91 without "free from the US" framing** on MCAT-Houston (`:237,413`) and the USABO city template (`USABOCityTemplate.tsx:361`, ~20 pages). Brain Bee does it right — copy that microcopy over.
- **Two divergent CTA systems** (GlobalEnquiryForm on ~28 pages vs WhatsApp-only on hubs/comparisons/cities) — non-WhatsApp users on hubs have no capture fallback. Standardize / add the form as secondary capture.

---

## P2 — polish
- **UI a11y:** add `focus-visible:outline` to the `<summary>` of ~10 FAQ accordions; `aria-hidden="true"` on decorative icons/carets.
- **UI mobile:** 3 comparison tables (`gamsat-vs-mcat`, `bbo-vs-usabo`, `ap-biology-vs-college-bio-mcat-bridge`) are `overflow-x-auto`-only — port the `cerebrum-vs-kaplan-ap-biology` table→card mobile pattern.
- **`biology-101-tutor` vs `college-biology-tutor`** mild title overlap (hierarchy otherwise sound).
- **AP-metro data has no machine-readable IANA tz** (display string only) — optional.
- Funnel coherence: ensure every node terminates in a CTA, not just a sibling link.

---

## Confirmed clean (no action)
- No fabricated `aggregateRating`/`Review` anywhere in scope (the 2026-06 strip held); no duplicate `#organization` nodes; no India coords / `addressCountry:IN` leak on US pages.
- Canonicals self-referential; sitemap covers all USA pages incl. the 52 new ones; titles/metas unique (data-driven city pages); stats centralized + consistent (founded 2014/AIIMS/98%/680+/5.0-38).
- State hubs: correct typed State+Country areaServed, correct timezones, zero broken in-state links.
- UI: single h1 per page, keyed maps, no broken grids, no cyan/pink/emerald violations.

## Highest-ROI fixes
1. **CompetitorComparisonLanding** (P0-1) — one template fix de-NEETs + de-+91s 5 US comparison pages.
2. **Zero-CTA pages** (P0-2) — shared CTA block across ~14 entry pages.
3. **Canadian-cities-tagged-US** (P0-3) + **pricing/best-* schema** (P0-4) — small, correctness/AEO.
4. **llms.txt buyer-intent/hub/state coverage** (P1) — one file, ~25 pages discoverable.
