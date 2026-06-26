# AP Biology · USABO · IBO (USA) — SEO/AEO/GEO Audit

**Date:** 26 Jun 2026 · 3-agent deep audit (one per vertical, each covering SEO + AEO + GEO). Post-build state. No files modified.

**Headline:** Canonicals are clean and schema hygiene mostly holds (no fabricated review markup). After the big build, the damage is concentrated in: (1) **hub-identity ambiguity** (AP 3-way, IBO 2-way), (2) a **systemic breadcrumb bug** affecting every `best-*` page, (3) **orphans** (0-inbound pages), (4) **accuracy contradictions** (IBO syllabus weightings, AP success %, USABO cutoffs) and **price inconsistencies**, and (5) a **doorway page** (`ibo-preparation-gurugram`).

---

## CROSS-CUTTING (fix once, helps all three)

**X1 — P1 SYSTEMIC: `BestVerticalLanding` breadcrumb parent is hardcoded to `/best-biology-teacher-india`.** `src/components/seo/BestVerticalLanding.tsx:243-247` → so `best-usabo-coach`, and likely `best-ap-biology-tutor-usa` / `best-mcat-biology-tutor` / `best-dat-biology-tutor` / `best-usmle-step-1-biology-tutor`, all breadcrumb under an *India teacher* page instead of their own vertical hub. Fix: parameterize the breadcrumb parent (prop) and pass the correct hub per page.

**X2 — P1/P2: Price contradictions within each vertical** (same product, different numbers). USABO: `$4,500` (best-usabo-coach) vs `$999–2,499` (top) vs `$2,500/4,500/6,000` (llms-full). IBO: `$4,500` vs `$1,499–2,999`. Fix: reconcile each to the canonical matrix (`olympiadPricingProducts` / `GeoAwareSharedPricingMatrix`).

---

## AP BIOLOGY (USA)

**P0 — 3-way (really 5-way) hub identity.** `/ap-biology` calls itself "AP Biology Tutoring Hub"; `/ap-biology-tutor` is the de-facto hub (38 inbound, breadcrumb target, llms.txt:41,73); but **nav/header/footer all point to `/ap-biology-tutor-global`** (navigationConfig.ts:273, HeaderHybrid.tsx:85, Footer.tsx:157). Plus `/courses/ap-biology` is a 5th indexable surface. → **Decision: make `/ap-biology-tutor` the canonical US hub**; repoint nav/header/footer to it; demote `/ap-biology` (canonical → `/ap-biology-tutor` or make a pure nav index); keep `/ap-biology-tutor-global` for "worldwide/any-nationality" only; canonical `/courses/ap-biology` → hub.
**P0 — keyword cannibalization.** `/ap-biology-tutor` keyword array carries `'best ap biology tutor'` (cannibalizes best-usa) and `'ap bio tutoring online'` (cannibalizes online-tutor); `/best-ap-biology-tutor-usa` title says "USA & Global" + India/Canada keywords (bleeds into global). Fix: strip the cross-targeted keywords; one query per page.
**P0 — orphans.** `/is-ap-biology-worth-taking` (0 inbound), `/ap-biology` hub (3 inbound, none from nav/spokes), `/top-ap-biology-coaching-global` (0), `/top-ap-biology-coaching-usa` (1). Fix: link from `/ap-biology-tutor` + relevant spokes.
**P1 — success-stat inconsistency/fabrication risk.** "90% score 4–5" (ap-biology-tutor layout.tsx:10, page.tsx:214,691,933) vs "~78% in our 2025-26 cohort" (ap-biology page.tsx:102) — two unsourced, mutually inconsistent claims on hub-class pages. **Needs owner's real figure** (or soften). Also HKIS "95%/82%" third-party stat in FAQ schema (metros.ts:1421,1444) — verify or soften.
**P1 — link units hub + ranking pages from `/ap-biology-tutor`.** `/ap-biology-units` not linked from `/ap-biology` or `/ap-biology-online-tutor`.
**P2 — GEO:** one metro missing `addressRegion`; `areaServed` AdministrativeArea uses a marketing string ("NYC + Long Island + Westchester") not a real admin area; stale "2024 + 2025 FRQ" copy (2026 FRQs now exist).
**Clean:** exam facts accurate (8 CED units, May, 1-5, FRQ); canonicals self-referential.

---

## USABO (USA)

**P0 — 5 city pages orphaned** (sitemap-only inbound): the hub city grid (`usabo-coaching/page.tsx:539`) lists only 14 of 19 — missing **san-diego, denver, phoenix, twin-cities, research-triangle**. Fix: add the 5 slugs to the hub grid.
**P1 — 3 cities missing FAQPage + BreadcrumbList schema:** `usabo-coaching-{miami,portland,philadelphia}` emit only `Course` (Miami even passes 5 FAQs that are never rendered as schema). Fix: add breadcrumb+faq JSON-LD matching Boston.
**P1 — `best-usabo-coach` breadcrumbs under India teacher page** (the X1 systemic bug).
**P1 — geo cannibalization:** `usabo-coaching-los-angeles` claims "+ San Diego" + Torrey Pines schools while a dedicated `usabo-coaching-san-diego` exists. Fix: strip SD from LA; route to SD page.
**P1 — fabricated cutoffs:** `usabo-2026-results` states precise "30/50, 29/50, 28/50 to advance" + "~750 semifinalists" (page.tsx:83-103) — CEE doesn't publish these. Fix: hedge/remove (the pathway pages already correctly hedge "~10%").
**P1 — stale "11 US city cohorts"** (best-usabo-coach:7,55,123 — 19 exist) + best-vs-top "best usabo coach" FAQ overlap.
**P1 — city pages under-link** guides/siblings (`USABOCityTemplate.tsx:584-622` omits how-to-qualify, syllabus, books, worth-it; no nearby-cohort links).
**P2 — `usabo-past-papers` vs `usabo-past-papers-archive`** overlap (canonical one to the other); price reconciliation (X2); exam-date wording drift (Jan/Feb vs Feb).
**Clean:** canonicals + x-default (the old `/biology-olympiads` x-default bug is fixed); no fabricated ratings; pathway facts (Open→Semifinal→National→Team USA→IBO, CEE, Campbell) accurate; 19 cities have correct areaServed + state code + timezone (incl. Phoenix MST-no-DST).

---

## IBO (USA)

**P0 — `ibo-coaching-usa` ↔ `how-to-make-us-ibo-team` cannibalize** "make Team USA IBO" and don't cross-link (the link is one-directional). Fix: differentiate intent (transactional hub vs informational pathway) + add reciprocal link (template needs an optional related-href).
**P0 — parallel IBO city doorway exists:** `/ibo-preparation-gurugram` — exactly the doorway the earlier audit said not to build (IBO is a ~4-students/country annual event; no local market). Fix: 301 → `/ibo-preparation` or de-city-fy. (Its Person schema is also wrong-vertical: NEET-Gurugram knowsAbout on an IBO page.)
**P0 — fabricated/contradictory IBO syllabus weighting:** "Cell Biology" is variously 20% / 25% / **40%** across the cluster, and `ibo-preparation` contradicts itself (cards vs FAQ). The "40%" (best-ibo-preparation:49,153; top-ibo) is wrong. Fix: standardize to the official IBO theory split (~Cell 25 / Plant 15 / Animal 25 / Ethology 5 / Genetics-Evolution 20 / Ecology 10 / Biosystematics 5) and drop the 40% claims.
**P1 — hub ambiguity:** country pages breadcrumb to `/ibo-preparation` (correct), but `/ibo-preparation` itself + `/top-ibo-coaching` breadcrumb UP to `/best-ibo-preparation`. Pick `/ibo-preparation` as the apex; others chain up to it.
**P1 — USABO city pages don't link the US IBO pathway** (`USABOCityTemplate.tsx:617` → only `/ibo-preparation`). Fix: add `/how-to-make-us-ibo-team`.
**P1 — `60/40` theory/practical asserted as fixed fact** (IBO has often been ~50/50). Fix: qualify. Price contradiction (X2). `how-to-make-us-ibo-team` not in llms.txt + lacks `#organization` ref / `spatialCoverage`.
**P2 — no dedicated "Is IBO worth it?" answer** (USABO has one); provider schema inconsistent (inline vs `@id`).
**Resolved since last audit:** `ibo-coaching-usa` now emits FAQPage (7Q) + Course + Breadcrumb + Person + `areaServed: USA` + ET/PT timezone; IBO has a standalone llms.txt block; no US IBO city doorways (US geo correctly folded into USABO city pages — contrast the India Gurugram violation).

---

## Biggest cross-vertical priorities
1. **Hub decisions** — AP → `/ap-biology-tutor` (repoint nav/header/footer); IBO → `/ibo-preparation`. Fix breadcrumbs + the X1 systemic `best-*` breadcrumb bug.
2. **Orphan rescue** — 5 USABO cities + AP `is-ap-biology-worth-taking`/`top-ap-*` + cross-link the US IBO pathway from USABO cities.
3. **Accuracy** — standardize IBO syllabus weightings (kill the 40%), hedge USABO cutoffs, reconcile AP success % (owner), reconcile all three price sets.
4. **Schema** — 3 USABO cities missing FAQ/Breadcrumb; de-cannibalize AP/USABO/IBO keyword overlaps; kill/redirect the `ibo-preparation-gurugram` doorway.
