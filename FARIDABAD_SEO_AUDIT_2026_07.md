# Faridabad SEO/GEO/AEO Audit — Jul 7, 2026
(Full details in session; key refs below. 4,202 matches / ~210 files audited.)

## SOLID
Hub neet-coaching-faridabad (2,013 lines, hand-written, full NEETSchemaStack); NAP street+PIN+phone consistent; area/sector/school thin pages properly 301'd; llms-full.txt has a dedicated Faridabad block; strong internal-link mesh; faridabadSchema.ts deletion clean.

## CONFLICTS & BUGS (ranked)
1. PIN CONFLICT (LIVE on 4 pages): LocalBusinessSchema.tsx geo=28.4089,77.3178 (contactInfo.ts:153) vs hasMap ll=28.3870,77.3070 (:239) — 2.5km apart; dead static geo at :228.
2. neet-dropper-batch-faridabad: noindex (page.tsx:55) BUT in sitemap (sitemap.ts:1662).
3. faridabadConsolidationRedirects = [] (seo-redirects.mjs:2741) — ~37 planned 3A-3G redirects NEVER implemented (no-op spread in next.config.mjs:1622); ~37 template satellites (7 alternatives etc.) left live+indexed. Gurugram/Ghaziabad arrays (:2752,:2760) also empty.
4. SEOFooterLinks.tsx:37,48,63 → 301'd URLs (top-10/which-is-best/biology-classes faridabad) — site-wide footer 301 hops.
5. Maps embed CID is FAKE placeholder (centerMapping.ts:36 "0xhuda_market_sector17"); same pattern rohini/greenpark. g.page/cerebrum-biology-academy-faridabad likely dead (contactInfo.ts:157,286).
6. Hub city-specific FAQs (page.tsx:148-215, genuinely local) rendered HTML-ONLY; schema uses generic boilerplate FAQSchema (StructuredData.tsx:380) — AEO invisible.
7. StructuredData.tsx:13 says "4 centers" (vs 5 everywhere else); landmark arrays disagree (contactInfo.ts:158 vs LocalBusinessSchema.tsx:235).
8. 3 fake hardcoded reviews in LocalBusinessSchema.tsx:255-273 (review-spam risk — same class as the June strip; these survived).
9. apeejay/dps-faridabad school pages possibly BOTH in sitemap (sitemap.ts:549-550) and redirected (seo-redirects.mjs:4478-4484) — verify emission.
10. faridabad-areas.ts (1,268 lines rich per-area copy) stranded — feeds only noindexed/redirected [area] pages.

## GAPS vs May NCR uplift
Person/5-schema stack reached hub only; satellites best-neet-coaching/test-series/parents-guide/batches have LocalBusinessSchema only (fees/tuition/tutor/alternatives DID get CerebrumPersonSchema — partial). Hub inline EducationalOrganization (page.tsx:1815) lacks address/geo/phone. HowToReachSection likely not mounted on hub.

## FIX ORDER
1 pin conflict → 2 sitemap/noindex → 3 decide consolidation (populate array OR keep+differentiate) → 4 footer 301s → 5 city FAQPage JSON-LD → 6 real Maps CID + GBP link (owner) → 7 extend schema stack to satellites → 8 counts/landmarks → 9 strip fake reviews → 10 verify school-page double-emission.
