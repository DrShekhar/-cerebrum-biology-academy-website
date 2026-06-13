# AEO / GEO / SEO Gap Audit — June 11, 2026

Four-agent audit of the full codebase. Scope: gaps (what's missing/weak), not integrity bugs —
those are in the June 11 integrity audit (dead cited URLs, sitemap 301s/404s, broken links,
shadowed pages) and tracked separately.

**Verified live**: robots.txt served in production is the generated `src/app/robots.ts` output
(2,474 bytes, includes GPTBot/Google-Extended/CCBot). The stale `public/robots.txt` (Feb 28,
1,631 bytes) is ignored by Next.js but should be deleted to remove ambiguity.

---

## THE BIG FOUR (fix before anything else)

### 1. Fabricated review schema on 221+ pages — active Google-policy violation

- `src/components/seo/LocalitySchema.tsx:162-185` (167 pages) + `src/components/seo/CitySchema.tsx:96-105`
  (54 pages) emit `aggregateRating: 5.0 / reviewCount: 38` plus two reviews authored by
  "Parent of NEET Aspirant" and "NEET 2024 Student" whose reviewBody template-injects the locality —
  the same review claims to be about every one of 220+ places.
- Reviews are **schema-only, never visible on-page** — direct violation of Google review-snippet
  policy. Identical 5.0/38 across all pages = manual-action footprint.
- Prior strike on record: `StructuredData.tsx:488-489` comment "GSC showed 36 invalid Review snippets".
- Same problem in `LocalBusinessSchema.tsx:38-57` (self-serving reviews on own LocalBusiness)
  with 3 conflicting rating counts (5.0/38, 5.0/35, 5.0/28).
- **Fix**: strip review+aggregateRating from LocalitySchema/CitySchema/LocalBusinessSchema; keep
  ratings only where genuine dated testimonials render visibly (src/data/realTestimonials).

### 2. Index bloat: ~1,300–1,500 near-duplicate URLs (scaled-content-abuse exposure)

- 57-city × 5-intent doorway matrix: 230 pages import the same `NEAR_ME_CITY_BY_SLUG` record.
  `neet-coaching-fees-{city}` siblings differ by **1 line of code** (~96% identical rendered copy);
  `neet-dropper-batch-*` ~96%; `near-me-*` ~75-80% shared frame.
- Estimate: ~350-450 substantively unique pages vs ~1,300-1,500 template permutations ≥75% identical.
- **Fix — 4-tier posture**:
  - Tier A keep & enrich (~350): hubs, blog, NCR centers, cornerstones, near-me for ~15 cities with real impressions.
  - Tier B merge (~210): collapse 5 intents → 1 page per city with #fees/#dropper anchors; 301 the rest.
  - Tier C noindex,follow (~400-600): zero-impression long-tail until ≥40% unique copy
    (precedent: 32 school feeders already correctly noindexed).
  - Tier D delete/410 after 90 days of zero impressions + zero links.
- Inconsistent school-feeder policy: 32 noindexed vs ~45 indexed (some priority 0.8,
  `/neet-coaching-dps-rk-puram-delhi` has no robots directive) — unify.

### 3. Entity-stat contradictions (AI engines can't trust the numbers)

- "98%" means 3 different things (600+ scores in llms.txt:2247, qualification rate in ai.txt:369,
  95%-scored-300+ in PeopleAlsoAsk.tsx:249).
- UI contradicts AEO files: 94.8% (`course-finder/page.tsx:64`, `SimplifiedCourseCards.tsx:55`,
  `EnhancedCourseFinderQuiz.tsx:226,236`), stray 95%/92%.
- "680+" used as both selections (43×) and "680+ students" (7×) vs "15,000+ Students" elsewhere.
- "15+ years experience" vs founded 2014 (=12 years in 2026).
- **Fix**: one canonical fact block (founded 2014, students taught, ONE success-rate definition,
  680+ selections, 485+ reviews) in the FIRST 2KB of llms.txt and referenced everywhere; fix the
  hardcoded UI strings.

### 4. Google Business Profile layer is dead/fake

- All 6 `g.page` links resolve to Google search pages, not profiles (`contactInfo.ts:75-187`),
  and are injected into every LocalBusiness sameAs (`LocalBusinessSchema.tsx:359`).
- Review link `g.page/r/CerebrumBiologyAcademy/review` is fabricated-format (`demo-feedback/page.tsx`).
- Map embeds mostly placeholders: fake `4v1234567890` timestamps; ~20 South Delhi pages embed the
  identical map; Rohini embed has invalid place ID.
- 24/7 hours (00:00-23:59) still live in 6+ inline schemas though `contactInfo.ts:306-310`
  documents this exact bug as "fixed" (contact/layout.tsx:52, all locations/\*/layout.tsx).
- Geo coordinates diverge per center (Rohini "source of truth" = Delhi centroid; Faridabad 2.6km
  apart between files; Gurugram 3 variants incl. placeholder digits).
- Noida declared a physical center in schema (`LocalBusinessSchema.tsx:263-309`, "6 offline
  centers" at :537) but `contactInfo.ts:176` says isPhysicalCenter: false — fake-location signal.
- **Fix**: get real GBP share links/CIDs; one LocalBusiness @id per center fed from CONTACT_INFO;
  real hours; verified coordinates; drop Noida's physical claim.

---

## AEO gaps (answer engines)

1. llms.txt is 277KB / ai.txt 256KB — 2.5× over the ~100KB practical ceiling; canonical fact block
   sits at line ~2245 (truncation zone). Not llmstxt.org-spec (should be H1 + blockquote + H2 link
   lists, ~15-20KB); move Q&A dump to llms-full.txt (currently smaller than llms.txt — inverted).
2. "Last Updated: April 2026" stamps stale (llms.txt:2545, ai.txt:2201); NEET-cancellation block
   dated 12 May reads stale.
3. robots.ts missing current-generation AI crawlers: ClaudeBot (current Anthropic token;
   Claude-Web/Anthropic-AI are legacy), OAI-SearchBot (ChatGPT citations), Perplexity-User,
   Applebot-Extended, Bytespider. Delete stale public/robots.txt.
4. /pricing has NO FAQ schema (top buyer-intent page); /best-neet-coaching-near-me also missing.
5. Direct-answer blocks: hubs lead with marketing prose; add 40-60-word `data-speakable="summary"`
   under H1 on courses/pricing/vertical hubs; Speakable schema only on homepage + scattered pages.
6. HowTo schema covers NEET/IB/USABO/AP only — missing MCAT, DAT, GAMSAT, USMLE, A-Level, olympiad funnel.
7. Missing question clusters: per-vertical fees in $/£ (data exists in src/data/\*/pricing-matrix.ts),
   "is X worth it", "how long to prepare" (non-NEET), syllabus questions, X-vs-Y (NEET vs IB,
   USMLE vs MCAT, DAT vs OAT), OAT entirely absent, free-resources per vertical.
8. middleware geo-404 (China cluster): consider UA allowlist for known AI bots regardless of IP.

## GEO gaps (local + international)

1. GBP layer (Big Four #4 above).
2. NAP: `+919953643938` on ~150 pages but absent from CONTACT_INFO (verify or replace);
   dummy `+919876543210` in IntelligentChatbot + SeminarRegistrationForm; "DC Chauk" vs
   "DC Chowk" 202/179 split; contact/layout.tsx:38 has wrong street ("M-3" vs canonical "D 35");
   `ConsistentNAP.tsx` exists but imported nowhere.
3. `LocalitySchema.tsx:91` hardcodes addressCountry:'IN' — every international page using it
   claims to be in India.
4. International pages missing schema/coords: nri-singapore, sydney, a-level-london, mcat-houston,
   gamsat-london. Singapore/Sydney ~75% boilerplate (doorway risk) — Singapore names zero schools
   though src/data/ib-biology/schools.ts has them.
5. Hardcoded FAQ prices contradict live pricing component (neet-coaching-london-uk/PageContent.tsx:51,
   neet-coaching-dubai-uae/page.tsx:101).
6. Hub orphans: 494 flat neet-coaching-{city} dirs + 50+ international city pages not linked from
   any geographic hub; /states/[state] doesn't link its city pages; no country hubs for US/UK/CA/AU.
7. /courses + online pages lack areaServed/availableLanguage.
8. Dead code to wire or delete: ConsistentNAP.tsx (261 lines), GoogleMyBusinessSchema.tsx (437),
   faridabadSchema.ts (438).

## On-page SEO gaps

1. 42 comparison titles/H1s contain euphemisms ("the largest national NEET chain" instead of
   Aakash/Allen — 178 files total) — pages can't rank for their own target queries; some
   grammatically broken ("Best a leading national educational institution Alternative in Faridabad").
2. 3 corrupted doubled titles: biology-tuition-class-11/layout.tsx, biology-coaching/layout.tsx,
   biology-teacher/layout.tsx (phrase repeated + stale 2025/2027 mashups).
3. 598 titles >60 chars (worst 140ch), 760 descriptions >165 chars.
4. Course schema missing on 9 of 20 /courses/\* product pages.
5. Zero-JSON-LD clusters: boards/\* (8), class-11/12, 5 vertical pricing pages (Offer-schema
   candidates), free-resources, mock-tests, testimonials, success-stories, book-free-demo.
6. Orphan clusters (0 inbound links): the 230-page near-me/dropper/fees/online build; 3 of 4 MCAT
   cornerstones; OCSC cornerstone; school feeders. RelatedPages.tsx exists, imported by 0 pages.
7. /biology-tutor head page is the thinnest (~700 words rendered) while its city children are fatter.
8. Blog: 39 posts future-dated (Jul-Dec 2026 publishedAt); only 57/202 link to any money page;
   cadence collapsed (93 in Feb → 4 in May).
9. 4 public routes on root-fallback metadata: purchase/[courseId], test/[testId], tests,
   claudechat-standalone.
10. Strengths (no action): H1 discipline clean, near-zero duplicate titles, 92% JSON-LD coverage,
    next/image + alt ~100%.

## Technical SEO gaps

1. Blanket sitemap lastModified = 2026-06-08 on ~1,400 unchanged URLs (sitemap.ts:529) — switch to
   git-derived per-route dates.
2. 8 dynamic routes lack dynamicParams=false (7 are client pages → 200-shell soft-404s):
   online-biology-classes-international/[curriculum], online-biology-classes-in/[city],
   programs/[...slug], programs/biology-olympiad/[country], neet-coaching-near/[school],
   free-resources/[id], neet-college-predictor/college/[slug], courses/series/[class]/plan-[plan].
3. 364 public top-level pages are 'use client' incl. 1,903-line neet-coaching-gurugram —
   convert to server components with leaf-client islands.
4. Shared First-Load JS 255-296KB: 5 site-wide client providers + 4 analytics suites + 7 global
   widgets in layout.tsx — consolidate analytics into GTM, gate providers to app routes.
5. Blog author schema not linked to canonical Person @id (TechArticleSchema.tsx:67) — one-line
   E-E-A-T entity-merge fix.
6. Two press pages (/about/media + /media-mentions-press-coverage) — consolidate before off-site
   push; verify all 10 sameAs profiles live (twitter.com + x.com both listed).
7. 7,942-line hand-maintained sitemap.ts — generate from filesystem; suspected missing `||` near
   line 330.

## Strategic context (outside the codebase)

- Off-site authority (Wikipedia, press, listicles, Quora, YouTube) remains the biggest AEO lever
  for AI training-recall — on-site is ahead of off-site (see OFF_SITE_AUTHORITY_ROADMAP.md).
- GSC re-indexing of the March fixes + the June deploy needs to be requested and given 2-4 weeks.
