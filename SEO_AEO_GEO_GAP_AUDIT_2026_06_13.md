# SEO / AEO / GEO Gap Audit — 2026-06-13

5-agent parallel audit (technical-crawl · structured-data/entity · AEO · on-page/content · local/geographic-GEO).
Each agent grounded against the prior `AEO_GEO_SEO_GAP_AUDIT_2026_06.md` and reports **current** gaps only
(verified against live code; already-fixed June items excluded). All evidence is `file:line`.

---

## Executive summary

The June remediation landed the *canonical* layer (llms.txt fact block, single Org component, review strip in
the main SEO components, redirect/sitemap overhaul, real opening hours/coords) — but four systemic problems
**survived or regressed**, and they're the highest-leverage fixes now:

1. **Stat/entity contradictions never propagated to the long-tail.** The canonical numbers live in
   `metrics.ts` + `llms.txt`, but the files/components AI engines and Google actually read still carry the old
   ones — **485+/4.9 reviews** (canonical 5.0/38), **6 centres** (canonical 5), **98% redefined** as "600+ scorers",
   success rates of **98/97/92%**, and 3+ pricing tables per vertical. This is the single most repeated finding
   across all 5 dimensions.
2. **The fabricated-review strip was incomplete.** Live fake `review[]` markup still renders on **every locality
   page** (`localitySchema.ts:152`), plus a dead-but-loaded `ratingSchema.ts`, a `CitationBadge` self-rating, and
   a fake `g.page/r/...review` link in 7 files. Same Google review-policy exposure the June strip targeted.
3. **The founder/Org entity re-fragmented.** `NEETSchemaStack` (87 pages) emits a **per-page Person `@id`** and a
   **duplicate Org node** (claiming "6 centres") — silently undoing the entity-consolidation work. Plus
   ~288 international pages declare `addressCountry: "IN"`, telling Google London/Dubai/Houston are in India.
4. **Competitor pages can't rank for their own queries.** ~150 "vs Allen / Aakash alternative" pages use
   euphemisms ("the largest national NEET chain") in **titles and H1s**; 3 Narayana titles are grammatically
   broken ("Best a leading national educational institution Alternative").

Cross-cutting: indexation hygiene (soft-404 route shapes in the sitemap, blanket `lastmod`), cannibalization
remainder (48 fees pages still indexed, tuition-vs-tutor), and a large orphan-page problem (~230 NCR + 500+
international pages with no inbound links; the linking component `RelatedPages.tsx` is dead code).

---

## P0 — Highest leverage (mostly code-only, do first)

| # | Gap | Evidence | Fix | Owner? |
|---|-----|----------|-----|--------|
| P0-1 | **Person entity fragmented across 87 pages** — per-page `@id` instead of canonical | `NEETSchemaStack.tsx:97` (canonical at `CerebrumPersonSchema.tsx:118`) | Use canonical `…/dr-shekhar-singh-neet-biology-faculty#person` | code |
| P0-2 | **Live fabricated reviews on every locality page** (fake authors, ratingValue 5) | `lib/seo/localitySchema.ts:152-164` → emitted `locations/[city]/[locality]/page.tsx:76` | Delete the `review:` block (mirror June strip) | code |
| P0-3 | **Dead-but-loaded fake reviews / self-ratings** | `lib/seo/ratingSchema.ts:68-104,149-186` (0 importers); `CitationBadge.tsx:62-67` | Delete `ratingSchema.ts`; drop `reviewRating` from CitationBadge | code |
| P0-4 | **288 international pages claim `addressCountry: "IN"`** | `LocalitySchema.tsx:94` (default 'IN'); london/dubai/houston pages pass no country | Map city→ISO-2 and pass `country`; require it for intl NEET pages | code |
| P0-5 | **Duplicate Org node w/ "6 centres" on 87 pages** | `NEETSchemaStack.tsx:128-139` (+`LocalBusinessSchema.tsx:465`) vs `CerebrumOrgSchema.tsx:73` | Replace inline org with bare `{'@id':'…#organization'}` reference | code |
| P0-6 | **~150 competitor pages euphemize the competitor in titles+H1s** (rank for nothing) | `aakash-alternative-*`, `allen-alternative-*`, `cerebrum-vs-*` `page.tsx:6-10` + content H1s (142 files w/ euphemism in `title:`) | Restore real names (Aakash/Allen/PW/Vedantu/Unacademy/Narayana/Career Point) | code (brand-policy ack) |
| P0-7 | **3 grammatically broken Narayana titles+H1s** ("Best a leading…") | `narayana-alternative-{gurugram,faridabad,noida}/page.tsx:7-37,17X` | Rewrite to "Best Narayana Alternative in {city} 2026 …" | code |

## P1 — Consistency & indexation (code-only)

| # | Gap | Evidence | Fix |
|---|-----|----------|-----|
| P1-1 | **Stat contradictions across the AI-quoted long files** — 485+/4.9 reviews, 6 centres, "98% = 600+ scorers" | `public/humans.txt:38,40,119,121-122`; `public/llms-full.txt:1017,1048,1824,1851,205,224` | Global-replace to canonical 5.0/38, 5 centres, "98% NEET-UG qualification rate" |
| P1-2 | **"485+ reviews" / "6 centres" / "680+ students" in live components** | `BestVerticalLanding.tsx:465,519`; `CompetitorComparisonLanding.tsx:409`; `PeopleAlsoAsk.tsx:218,345`; `HomeFAQSection.tsx:28` (says 5, lists 6) | Route all through `CEREBRUM_METRICS`; 38 reviews, 5 centres, "680+ selections" ≠ student count |
| P1-3 | **Pricing tables disagree** — NEET ₹40K–1.56L vs ₹35K–2.4L; MCAT $449 vs $499; DAT $399 vs $449 | `llms.txt:30,47,50` vs `llms-full.txt:918,2127,2144`; `metrics.ts:43-46` a 3rd set | One table per vertical from `pricing-matrix.ts`, used identically |
| P1-4 | **Contradictory success rates in copy** — 98/97/92%, "98% achieve 650+" | `layout.tsx:66`; `neet-result-2025-gurugram:57`; `igcse-to-neet…:269`; `ap-biology-to-neet…:114` | One canonical, dated, *defined* rate; per-vertical metrics labelled distinctly |
| P1-5 | **2 sitemap-submitted soft-404 route shapes** (client `notFound()` → Google sees 200 shell) | `sitemap.ts:7936,7945`; `online-biology-classes-in/[city]`, `online-biology-classes-international/[curriculum]` (no `generateStaticParams`/`dynamicParams=false`) | Server-render + `generateStaticParams` + `dynamicParams=false` |
| P1-6 | **Blanket `lastModified = 2026-06-08`** on ~1,400 URLs (Google ignores uniform lastmod) | `sitemap.ts:571` applied everywhere | git-derive per-route dates at build |
| P1-7 | **Faridabad pin 2.6 km off / Gurugram 3 conflicting pins**; geo hardcoded in component not `CONTACT_INFO` | `LocalBusinessSchema.tsx:214,67,78` vs `contactInfo.ts:153`/`metrics.ts:206` | Feed geo from `CONTACT_INFO.centers` (needs P2-owner coords) |
| P1-8 | **48 `neet-coaching-fees-*` still `index,follow`** (96% sibling dupes) + tuition-vs-tutor dup | `neet-coaching-fees-allahabad:42`; `biology-tuition-*` vs `biology-tutor-*` same `CityHubPage` | noindex fees or Tier-B merge w/ anchors; 301 one tuition/tutor noun (~30) |
| P1-9 | **~230 NCR + 500+ international orphan pages**; linking component is dead code; footer 301 hop | `RelatedPages.tsx` (0 importers); `best-biology-tutor-global:100-138` (region hubs only); `SEOFooterLinks.tsx:16` → redirect source | Wire `RelatedPages`/build geo hubs; point footer at `/neet-coaching-gurugram` |
| P1-10 | **5 more client soft-404 dynamic routes** (off-sitemap, crawler-discovered 200 shells) | `programs/[...slug]`, `neet-coaching-near/[school]`, `neet-college-predictor/college/[slug]`, `free-resources/[id]`, `courses/series/[class]/plan-[plan]` | `generateStaticParams`+`dynamicParams=false` or server `notFound()` |

## P2 — Needs OWNER input (then code)

| # | Gap | Evidence | Needs from owner |
|---|-----|----------|------------------|
| P2-1 | **GBP layer dead/fake** — all 6 `g.page` slugs resolve to search; fake review link; invented Maps place-IDs/timestamps | `contactInfo.ts:75,97,113,137,157,189`; `centerMapping.ts:26-39`; fake `g.page/r/…review` (7 files) | Real GBP share links/CIDs + real Maps embed iframes per centre |
| P2-2 | **True Faridabad (Sector 17) & Gurugram (Sector 51) pins** | conflicting values P1-7 | Confirm exact lat/long per centre |
| P2-3 | **`+919953643938` on ~37 Noida/Ghaziabad pages, not in canonical NAP** | `grep 9953643938 src/lib/constants` = empty; `neet-evening-batch-noida:162` | Confirm if real Noida line → add to `CONTACT_INFO`, else replace with `+918826444334` |
| P2-4 | **Award years/names disagree** Person vs Org; LinkedIn slug + Twitter handle differ | `CerebrumPersonSchema.tsx:79-80` vs `CerebrumOrgSchema.tsx:115-117,111-112`; 3 Twitter handles | Confirm real awards + the one real LinkedIn/X profile |
| P2-5 | **"19,000+ MCQ" overstated** (only 10,133 in batch files) | `llms.txt:28` | Verify DB count or change to "10,000+" |

## P3 — Low / hygiene (code-only quick wins)

- `all-locations/page.tsx:245` "6 offline centers" → **5** (`:152` already says 5). One line.
- Dead `getOpeningHoursSchema()` returns stale 07:00–21:00 (`centerMapping.ts:141-156`) — align to 09:00–20:00 or delete.
- Add `sitemap-locations.xml` to `robots.ts:151` (route exists, orphaned from discovery) — or delete the route.
- `Bytespider`/`Amazonbot` missing from `robots.ts` though `ai.txt:11` welcomes Bytespider — make the two agree.
- Dead citation URLs in `llms-full.txt`: `/parent-reviews` (:1017), `/pursuit-tier` (:1009) 404 → repoint to `/reviews`,`/testimonials`,`/pricing`.
- 6 dead self-canonical files that are themselves redirect sources (`book-demo/layout.tsx:18`, `courses/intensive-neet-biology/*`, `test-series:25`, `boards/state-boards:13`, `biology-tuition-south-delhi/layout.tsx:25`) — delete.
- `/global` over-limit title (79ch) + description (276ch) → trim desc to ~155ch; add `areaServed`+`availableLanguage` to `/global` + USABO Course schema.
- `next.config.mjs:1751` preloads a font path that's 301'd (`:750`) sitewide — point at the hashed `next/font` asset or remove.
- Root `/` missing explicit `alternates.canonical`; drop the bare `en` hreflang (keep `en-IN`+`x-default`) (`layout.tsx:98-106`).
- `ArticleSchema.tsx:61-63` sets `creator`=Dr.Shekhar unconditionally even for other authors; `CitySchema.tsx:104` Course provider has no `@id`.
- ~1,962 titles >60ch / ~677 descriptions >165ch (the euphemism rewrite P0-6 fixes the worst); 20 duplicate nav→same-URL pairs (UX).
- Add `X-Robots-Tag: noindex` header to the China-geo 404 branch (`middleware.ts:289`).

---

## Verified FIXED since June (not re-flagged)
robots.txt deleted; AI-crawler tokens (ClaudeBot/OAI-SearchBot/Perplexity-User/Applebot-Extended) added; sitemap
dynamically filters redirect arrays; `/neet-coaching-delhi` un-shadowed; `/` vs `/global` correctly not hreflang-paired;
aggregateRating stripped from the major SEO components; `CerebrumAggregateRating` gutted; `GoogleMyBusinessSchema`/
`ConsistentNAP`/`faridabadSchema` deleted; 09:00–20:00 hours in `CONTACT_INFO`; Rohini/South-Ext coords; "DC Chowk"
standardized; contact street "D 35"; Noida physical-center claim removed; Tier-C doorway noindex (108 files); homepage
titles clean; single-H1 discipline; zero "guaranteed/100% selection" claims live; "future-dated blog posts" now in the
past (item closed); 218 broken city-hub links redirected.

## Theme takeaway
Three of the four systemic issues are **one-source-of-truth propagation** problems: the canonical values exist
(`CEREBRUM_METRICS`, `CONTACT_INFO`, canonical `@id`s) but components/long-files hardcode their own copies. The durable
fix is to make `NEETSchemaStack`, the locality/landing components, and the public `*.txt` files **read from those single
sources** rather than re-stating values — which also prevents the next drift.
