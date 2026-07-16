/**
 * Noida locality enrichment — the curated subset of /neet-coaching-noida/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * The other 26 Noida area slugs stay consolidated (301 → /neet-coaching-noida) via
 * EXPLICIT exact-source redirects (areaPageConsolidationRedirects in
 * src/config/seo-redirects.mjs). The /neet-coaching-noida/:area catch-all was
 * removed from next.config.mjs. These 8 are absent from every Noida redirect list
 * AND given genuinely unique prose + metadata (below) so they render, index, and
 * clear Google's doorway bar — matching the proven Faridabad/Gurugram pattern.
 *
 * Noida sectors sit well beyond the NCR centres (5–35 km), so these pages are
 * honestly framed around LIVE ONLINE small-batch classes tailored to each
 * catchment (no fabricated "centre in Noida").
 *
 * SOURCE OF TRUTH for the indexable set — keep in sync with:
 *   - the redirect lists in src/config/seo-redirects.mjs (the 8 must NOT appear)
 *   - the noidaLocalityRoutes map in src/app/sitemap.ts
 */

export const INDEXABLE_NOIDA_LOCALITIES = [
  'sector-50',
  'sector-76',
  'sector-78',
  'sector-137',
  'sector-150',
  'gaur-city',
  'knowledge-park',
  'jaypee-greens',
] as const

export interface NoidaEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const noidaEnriched: Record<string, NoidaEnrichment> = {
  'sector-50': {
    metaTitle: 'NEET Biology Coaching in Sector 50, Noida (Aqua Line) | Cerebrum',
    metaDescription:
      'Sector 50 families near the Aqua Line — live online NEET Biology classes with AIIMS-trained faculty and small batches, tailored to Ryan, Pathways and Genesis Global students.',
    intro:
      'Sector 50 sits at the head of Noida’s Aqua Line corridor, and its families increasingly want serious NEET Biology preparation without the daily haul into Delhi. That is exactly what our live online programme is built for — small, examiner-informed Biology batches taught by AIIMS-trained faculty, with the same rigour as a classroom and none of the commute. Students from Ryan International, Pathways and Genesis Global here get a schedule that works around their school day.',
  },
  'sector-76': {
    metaTitle: 'NEET Biology Coaching in Sector 76, Noida | Cerebrum',
    metaDescription:
      'Sector 76 — premium Aqua Line living, DPS/Amity/Shiv Nadar students. Live online NEET Biology coaching with small batches and personal mentorship, no commute to Delhi.',
    intro:
      'Sector 76 is one of the well-established premium pockets along the Aqua Line, home to families from DPS Greater Noida, Amity Global and Shiv Nadar. For NEET aspirants here the deciding factor is usually depth without disruption — a Biology programme rigorous enough for an AIIMS-level target that still fits around a demanding school. Our live online classes deliver exactly that: small batches, real diagnostics and one-to-one mentorship, with no cross-city travel.',
  },
  'sector-78': {
    metaTitle: 'NEET Biology Coaching in Sector 78, Noida | Cerebrum',
    metaDescription:
      'Sector 78’s premium societies — DPS Noida, Ryan, Lotus Valley. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, tailored to the sector’s school timetables.',
    intro:
      'Sector 78 packs several premium housing societies and a strong set of feeder schools — DPS Noida, Ryan International and Lotus Valley among them. The NEET aspirants who come to us from here want structure and accountability more than another crowded classroom, so we keep our live online Biology batches small and the mentorship personal. Sessions are timed to slot cleanly around Sector 78’s school schedules.',
  },
  'sector-137': {
    metaTitle: 'NEET Biology Coaching in Sector 137, Noida (Expressway) | Cerebrum',
    metaDescription:
      'Sector 137 on the Noida Expressway — ATS/Supertech families. Live online NEET Biology coaching that removes the long commute: small batches, AIIMS-trained faculty, personal attention.',
    intro:
      'Sector 137 is one of the premium anchors of the Noida Expressway belt, with ATS, Supertech and other luxury societies drawing young, ambitious families. At roughly eighteen kilometres out, this is precisely the catchment where a live online programme wins: our small-batch NEET Biology classes bring examiner-level teaching straight to the student, no expressway commute eating three hours a day. Personal attention and regular testing keep the rigour high.',
  },
  'sector-150': {
    metaTitle: 'NEET Biology Coaching in Sector 150, Noida (Sports City) | Cerebrum',
    metaDescription:
      'Sector 150 — Noida’s Sports City. Live online NEET Biology coaching with small batches and AIIMS-trained faculty, so students keep a premium lifestyle and a serious medical goal in step.',
    intro:
      'Sector 150 — Noida’s Sports City — pairs world-class sports facilities with a wave of premium residential projects, and the families settling here expect that same standard from education. For a serious NEET Biology plan at this distance, live online is the sensible answer: small, disciplined batches taught by AIIMS-trained faculty, so a student can keep training, studying and aiming for medicine without a punishing commute.',
  },
  'gaur-city': {
    metaTitle: 'NEET Biology Coaching in Gaur City, Noida Extension | Cerebrum',
    metaDescription:
      'Gaur City — Noida Extension’s largest township (50,000+ homes). Live online NEET Biology coaching with small batches and AIIMS-trained faculty, built for this huge catchment.',
    intro:
      'Gaur City is the single largest integrated township in Noida Extension — tens of thousands of apartments across Gaur City 1, 2 and beyond, and a correspondingly huge population of NEET aspirants. What the area lacks is a serious, examiner-grade Biology option nearby, which is exactly the gap our live online programme fills: small-batch classes with AIIMS-trained faculty, real testing and mentorship, reaching every tower without anyone leaving the township.',
  },
  'knowledge-park': {
    metaTitle: 'NEET Biology Coaching in Knowledge Park, Greater Noida | Cerebrum',
    metaDescription:
      'Knowledge Park — Greater Noida’s education & IT hub. Live online NEET Biology coaching with AIIMS-trained faculty and small batches for students across the university belt.',
    intro:
      'Knowledge Park is Greater Noida’s education and IT hub, ringed by universities and tech campuses, so it draws a genuinely academic community. NEET aspirants here are used to a serious learning environment and want their Biology preparation to match it. Our live online classes give them examiner-informed, small-batch teaching from AIIMS-trained faculty — the depth of a specialist coaching centre, delivered across the Knowledge Park belt without the travel.',
  },
  'jaypee-greens': {
    metaTitle: 'NEET Biology Coaching in Jaypee Greens, Greater Noida | Cerebrum',
    metaDescription:
      'Jaypee Greens — premium golf township. Live online NEET Biology coaching with small batches, AIIMS-trained faculty and personal mentorship, no commute out of the township.',
    intro:
      'Jaypee Greens is a premium integrated township built around a golf course and luxury residences, and its families expect the best of everything, education included. For a serious NEET Biology goal from a location this far out, live online is the natural fit: our small, examiner-informed batches bring AIIMS-trained teaching and one-to-one mentorship right into the home, so a Jaypee Greens student never has to trade hours of commuting for classroom rigour.',
  },
}

export function getNoidaEnrichment(slug: string): NoidaEnrichment | undefined {
  return noidaEnriched[slug]
}
