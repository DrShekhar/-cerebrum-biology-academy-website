/**
 * Gurugram locality enrichment — the curated subset of /neet-coaching-gurugram/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B #4, Jul 2026).
 *
 * The other 26 Gurugram area slugs stay consolidated (301 → /neet-coaching-gurugram)
 * via EXPLICIT exact-source redirects (areaPageConsolidationRedirects in
 * src/config/seo-redirects.mjs). The blanket /neet-coaching-gurugram/:area
 * catch-all was removed from next.config.mjs (path-to-regexp v8 in Next 15 can't
 * express "catch-all EXCEPT these 8"). These 8 are absent from every Gurugram
 * redirect list AND given genuinely unique prose + metadata (below) so they
 * render, index, and clear Google's doorway bar — matching the proven Faridabad
 * pattern (src/data/faridabad-enriched.ts).
 *
 * Centre of reference: Unit 17, M2K Corporate Park, Sector 51, Gurugram 122018.
 *
 * SOURCE OF TRUTH for the indexable set — keep in sync with:
 *   - the redirect lists in src/config/seo-redirects.mjs (the 8 must NOT appear)
 *   - the gurugramLocalityRoutes map in src/app/sitemap.ts
 */

export const INDEXABLE_GURUGRAM_LOCALITIES = [
  'golf-course-road',
  'sohna-road',
  'dlf-phase-1',
  'dlf-phase-2',
  'sushant-lok',
  'sector-56',
  'south-city-1',
  'sector-14',
] as const

export interface GurugramEnrichment {
  metaTitle: string
  metaDescription: string
  /** Genuinely unique intro prose — rendered above the templated body. */
  intro: string
}

export const gurugramEnriched: Record<string, GurugramEnrichment> = {
  'golf-course-road': {
    metaTitle: 'NEET Biology Coaching on Golf Course Road, Gurugram | Cerebrum',
    metaDescription:
      'Golf Course Road students from Pathways, Heritage and GD Goenka chasing an AIIMS-competitive NEET Biology score — examiner-level teaching, 5 km from our Sector 51 centre.',
    intro:
      'Golf Course Road is Gurugram’s most sought-after address — ultra-luxury condominiums, corporate headquarters, and a cluster of the city’s top schools in Pathways, Heritage and GD Goenka. Students here usually arrive with a strong academic base and a clear medical ambition; what they want is the last-mile push — the NEET Biology depth and exam precision that turn a good school record into an AIIMS-competitive score. Our Sector 51 centre is a short run down the Golf Course Road corridor, and the Sector 54 Chowk Rapid Metro keeps it easy to reach.',
  },
  'sohna-road': {
    metaTitle: 'NEET Biology Coaching near Sohna Road, Gurugram | Cerebrum',
    metaDescription:
      'Sohna Road’s fast-growing residential belt — Vatika, Omaxe and the SPR societies. NEET Biology coaching with flexible batches, a short hop from our Sector 51 centre near Subhash Chowk.',
    intro:
      'Sohna Road is one of Gurugram’s fastest-growing residential corridors, lined with new premium projects around Subhash Chowk, Vatika Business Park and the Southern Peripheral Road societies. The families moving in are young, ambitious and planning early for medicine — and our Sector 51 centre sits just off the same corridor, so Sohna Road students reach us without fighting cross-city traffic. We keep batches small and flexibly timed to fit the commute patterns of this belt.',
  },
  'dlf-phase-1': {
    metaTitle: 'NEET Biology Coaching in DLF Phase 1, Gurugram | Cerebrum',
    metaDescription:
      'DLF Phase 1 families from DPS Gurugram, Heritage and Pathways — structured NEET Biology coaching along the MG Road / Guru Dronacharya Metro corridor from our Sector 51 centre.',
    intro:
      'DLF Phase 1 is Gurugram’s original planned township — home to executives, entrepreneurs and long-settled families whose children fill DPS Gurugram, Heritage and Pathways. It is one of our strongest catchments precisely because expectations here are high: parents want a coach who can add real NEET Biology rigour on top of an already-serious school. The Guru Dronacharya and Sikanderpur metro stations and the MG Road corridor connect Phase 1 straight to our Sector 51 centre.',
  },
  'dlf-phase-2': {
    metaTitle: 'NEET Biology Coaching in DLF Phase 2 (near Cyber City) | Cerebrum',
    metaDescription:
      'DLF Phase 2 sits beside Cyber City — IT-professional families from Scottish High and Amity. Personalised NEET Biology coaching, easy from Sikanderpur Metro to our Sector 51 centre.',
    intro:
      'DLF Phase 2 lives in the shadow of Cyber City and Cyber Hub, and its student profile reflects that — children of IT and corporate professionals from Scottish High, GD Goenka and Amity, used to a fast, results-driven environment. That is exactly how we coach NEET Biology: tight feedback loops, real diagnostics, and a plan that respects a busy household’s time. Sikanderpur Metro links Phase 2 directly to the corridor that reaches our Sector 51 centre.',
  },
  'sushant-lok': {
    metaTitle: 'NEET Biology Coaching in Sushant Lok, Gurugram | Cerebrum',
    metaDescription:
      'Sushant Lok — one of Gurugram’s first planned areas, near HUDA City Centre Metro. NEET Biology coaching from DPS, Amity and Blue Bells students, close to our Sector 51 centre.',
    intro:
      'Sushant Lok is one of Gurugram’s earliest planned residential areas, and decades on it still draws professional families who value its schools and metro links — DPS Gurugram, Amity and Blue Bells all feed our batches. The HUDA City Centre and IFFCO Chowk metro stations make it one of the best-connected catchments for reaching our Sector 51 centre, and we build Biology schedules that slot neatly around Sushant Lok’s school timetables.',
  },
  'sector-56': {
    metaTitle: 'NEET Biology Coaching in Sector 56, Gurugram (near HUDA City Centre) | Cerebrum',
    metaDescription:
      'Sector 56 is metro-convenient — HUDA City Centre and the Sector 55–56 Rapid Metro. Small, well-timed NEET Biology batches just 4 km from our Sector 51 centre.',
    intro:
      'Sector 56 is one of the most convenient catchments we serve — barely four kilometres from our Sector 51 centre, with both the HUDA City Centre metro and the Sector 55–56 Rapid Metro station on its doorstep. That access is the whole appeal for the families here: a serious NEET Biology programme their child can reach on a short, predictable commute. DPS Gurugram, Amity and GD Goenka students from Sector 56 are a regular part of our batches.',
  },
  'south-city-1': {
    metaTitle: 'NEET Biology Coaching in South City 1, Gurugram | Cerebrum',
    metaDescription:
      'South City 1, a well-planned township near HUDA City Centre Metro. Specialised NEET Biology coaching for DPS, Amity and GD Goenka families, 5 km from our Sector 51 centre.',
    intro:
      'South City 1 is a settled, well-planned township whose families take education seriously and plan for medicine early. It sits on the HUDA City Centre metro line and the Sector 42–43 Rapid Metro, so the five kilometres to our Sector 51 centre are an easy run. Students here — largely from DPS Gurugram, Amity and GD Goenka — tend to want a two-year, foundation-first Biology plan, which is exactly what our Class 11 batches are built around.',
  },
  'sector-14': {
    metaTitle: 'NEET Biology Coaching in Sector 14, Old Gurugram | Cerebrum',
    metaDescription:
      'Sector 14 in Old Gurugram — DAV, Ryan and St. Xavier’s families near IFFCO Chowk and MG Road Metro. Structured NEET Biology coaching from our Sector 51 centre.',
    intro:
      'Sector 14 belongs to Old Gurugram — the established, tree-lined part of the city with long-standing schools like DAV, Ryan International and St. Xavier’s, and the Civil Hospital nearby. Its students come from settled local families who want dependable, structured NEET Biology teaching rather than a coaching-factory experience. The IFFCO Chowk and MG Road metro stations connect Sector 14 to the corridor that reaches our Sector 51 centre.',
  },
}

export function getGurugramEnrichment(slug: string): GurugramEnrichment | undefined {
  return gurugramEnriched[slug]
}
