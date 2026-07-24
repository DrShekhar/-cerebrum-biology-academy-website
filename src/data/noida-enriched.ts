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
      'If you live in Sector 50, at the head of Noida’s Aqua Line corridor, you probably want serious NEET Biology preparation without the daily haul into Delhi. That is exactly what our live online programme is built for — small, examiner-informed Biology batches taught by AIIMS-trained faculty, with the same rigour as a classroom and none of the commute. If you’re at Ryan International, Pathways or Genesis Global, you get a schedule that works around your school day.',
  },
  'sector-76': {
    metaTitle: 'NEET Biology Coaching in Sector 76, Noida | Cerebrum',
    metaDescription:
      'Sector 76 — premium Aqua Line living, DPS/Amity/Shiv Nadar students. Live online NEET Biology coaching with small batches and personal mentorship, no commute to Delhi.',
    intro:
      'If your home is in Sector 76 — one of the well-established premium pockets along the Aqua Line — you’re likely at DPS Greater Noida, Amity Global or Shiv Nadar. As a NEET aspirant here, your deciding factor is usually depth without disruption: a Biology programme rigorous enough for an AIIMS-level target that still fits around a demanding school. Our live online classes deliver exactly that — small batches, real diagnostics and one-to-one mentorship, with no cross-city travel.',
  },
  'sector-78': {
    metaTitle: 'NEET Biology Coaching in Sector 78, Noida | Cerebrum',
    metaDescription:
      'Sector 78’s premium societies — DPS Noida, Ryan, Lotus Valley. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, tailored to the sector’s school timetables.',
    intro:
      'If you’re a NEET aspirant in Sector 78 — packed with premium housing societies and a strong set of feeder schools, DPS Noida, Ryan International and Lotus Valley among them — you probably want structure and accountability more than another crowded classroom. That is why we keep our live online Biology batches small and the mentorship personal, with sessions timed to slot cleanly around your school schedule.',
  },
  'sector-137': {
    metaTitle: 'NEET Biology Coaching in Sector 137, Noida (Expressway) | Cerebrum',
    metaDescription:
      'Sector 137 on the Noida Expressway — ATS/Supertech families. Live online NEET Biology coaching that removes the long commute: small batches, AIIMS-trained faculty, personal attention.',
    intro:
      'If you live in Sector 137 — one of the premium anchors of the Noida Expressway belt, in an ATS, Supertech or other luxury society — you’re roughly eighteen kilometres out, and yours is precisely the catchment where a live online programme wins. Our small-batch NEET Biology classes bring examiner-level teaching straight to you, with no expressway commute eating three hours of your day, while personal attention and regular testing keep the rigour high.',
  },
  'sector-150': {
    metaTitle: 'NEET Biology Coaching in Sector 150, Noida (Sports City) | Cerebrum',
    metaDescription:
      'Sector 150 — Noida’s Sports City. Live online NEET Biology coaching with small batches and AIIMS-trained faculty, so students keep a premium lifestyle and a serious medical goal in step.',
    intro:
      'If you’ve settled in Sector 150 — Noida’s Sports City, pairing world-class sports facilities with a wave of premium residential projects — you expect that same standard from education. For a serious NEET Biology plan at this distance, live online is the sensible answer: small, disciplined batches taught by AIIMS-trained faculty, so you can keep training, studying and aiming for medicine without a punishing commute.',
  },
  'gaur-city': {
    metaTitle: 'NEET Biology Coaching in Gaur City, Noida Extension | Cerebrum',
    metaDescription:
      'Gaur City — Noida Extension’s largest township (50,000+ homes). Live online NEET Biology coaching with small batches and AIIMS-trained faculty, built for this huge catchment.',
    intro:
      'If you live in Gaur City — the single largest integrated township in Noida Extension, with tens of thousands of apartments across Gaur City 1, 2 and beyond — you know how many NEET aspirants share your towers, and how little the area offers by way of a serious, examiner-grade Biology option nearby. That is exactly the gap our live online programme fills for you: small-batch classes with AIIMS-trained faculty, real testing and mentorship, reaching your tower without your ever leaving the township.',
  },
  'knowledge-park': {
    metaTitle: 'NEET Biology Coaching in Knowledge Park, Greater Noida | Cerebrum',
    metaDescription:
      'Knowledge Park — Greater Noida’s education & IT hub. Live online NEET Biology coaching with AIIMS-trained faculty and small batches for students across the university belt.',
    intro:
      'If you’re preparing for NEET from Knowledge Park — Greater Noida’s education and IT hub, ringed by universities and tech campuses — you belong to a genuinely academic community, used to a serious learning environment, and you want your Biology preparation to match it. Our live online classes give you examiner-informed, small-batch teaching from AIIMS-trained faculty — the depth of a specialist coaching centre, delivered across the Knowledge Park belt without the travel.',
  },
  'jaypee-greens': {
    metaTitle: 'NEET Biology Coaching in Jaypee Greens, Greater Noida | Cerebrum',
    metaDescription:
      'Jaypee Greens — premium golf township. Live online NEET Biology coaching with small batches, AIIMS-trained faculty and personal mentorship, no commute out of the township.',
    intro:
      'If home is Jaypee Greens — a premium integrated township built around a golf course and luxury residences — you expect the best of everything, education included. For a serious NEET Biology goal from a location this far out, live online is the natural fit: our small, examiner-informed batches bring AIIMS-trained teaching and one-to-one mentorship right into your home, so you never have to trade hours of commuting for classroom rigour.',
  },
}

export function getNoidaEnrichment(slug: string): NoidaEnrichment | undefined {
  return noidaEnriched[slug]
}
