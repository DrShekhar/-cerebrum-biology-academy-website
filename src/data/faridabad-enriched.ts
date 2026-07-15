/**
 * Faridabad locality enrichment — the curated subset of /neet-coaching-faridabad/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * The other 37 area slugs stay consolidated (301 → /neet-coaching-faridabad) via
 * EXPLICIT exact-source redirects (areaPageConsolidationRedirects +
 * faridabadConsolidationRedirects in src/config/seo-redirects.mjs). The blanket
 * /neet-coaching-faridabad/:area catch-all was removed from next.config.mjs
 * because path-to-regexp v8 (Next 15) can't express "catch-all EXCEPT these 8".
 * These 8 are absent from every Faridabad redirect list AND given genuinely
 * unique prose + metadata (below) so they render, index, and clear Google's
 * doorway-uniqueness bar rather than reading as template-swapped near-duplicates.
 *
 * SOURCE OF TRUTH for the indexable set — keep in sync with:
 *   - the redirect lists in src/config/seo-redirects.mjs (the 8 must NOT appear)
 *   - the faridabadLocalityRoutes map in src/app/sitemap.ts
 */

export const INDEXABLE_FARIDABAD_LOCALITIES = [
  'sector-16',
  'sector-15',
  'sector-14',
  'sector-21',
  'nit-faridabad',
  'old-faridabad',
  'sector-28',
  'sector-84',
] as const

export interface FaridabadEnrichment {
  metaTitle: string
  metaDescription: string
  /** Genuinely unique intro prose — rendered in place of the templated hero. */
  intro: string
}

export const faridabadEnriched: Record<string, FaridabadEnrichment> = {
  'sector-16': {
    metaTitle: 'NEET Biology Coaching in Sector 16 Faridabad — Next to Our Centre | Cerebrum',
    metaDescription:
      'Sector 16 sits right beside our Sector 17 centre — walk-in doubt sessions, in-person practicals, and small NEET Biology batches for St. John’s School and nearby families.',
    intro:
      'Sector 16 sits directly beside our Sector 17 centre — for many families here, “NEET coaching near me” quite literally means us. St. John’s School and the sector’s residential floors feed a steady stream of Class 11 and 12 students who can walk in for a doubt session between school and dinner. That proximity is the whole point: same-day doubt clearing, in-person practicals, and the option to add a Biology session before a school test without a commute eating the evening.',
  },
  'sector-15': {
    metaTitle: 'NEET Biology Coaching near Sector 15 Faridabad (Neelam Chowk) | Cerebrum',
    metaDescription:
      'Sector 15 students from DAV and Crown Heights chasing the last 40–50 NEET Biology marks — NCERT command plus high-yield practice, 2 km from our Sector 17 centre.',
    intro:
      'Sector 15 is one of Faridabad’s established premium pockets, anchored by DAV Sec 15 and Crown Heights and the busy Neelam Chowk Ajronda junction. Students here tend to arrive with solid school foundations and are chasing the last mile — the 40 or 50 NEET Biology marks that separate a good score from an AIIMS-competitive one. Our teaching from the Sector 17 centre, two kilometres up the road, targets exactly that gap: NCERT line-by-line command paired with high-yield application practice.',
  },
  'sector-14': {
    metaTitle: 'NEET Biology Coaching for Sector 14 Faridabad (DAV & MRIS) | Cerebrum',
    metaDescription:
      'Sector 14 is a school-dense catchment — DAV and Manav Rachna (MRIS) side by side. NEET Biology depth on top of a serious academic base, 2 km from our Sector 17 centre.',
    intro:
      'Few Faridabad sectors are as school-dense as Sector 14 — DAV Public School and Manav Rachna International (MRIS) sit almost side by side, with Apeejay a short distance on. That makes it one of our strongest catchment areas: students who already have a serious academic environment and want NEET Biology depth on top of it. Our Sector 17 centre is two kilometres away, and we schedule Biology batches to dovetail with the DAV and MRIS timetables so students aren’t choosing between school and prep.',
  },
  'sector-21': {
    metaTitle: 'NEET Biology Coaching near Sector 21 Faridabad (Badkhal Mor) | Cerebrum',
    metaDescription:
      'Sector 21 students from MVN, DAV and Greenfields who commit to NEET early — Class 11 Biology foundation batches built for the two-year plan, 3 km from our Sector 17 centre.',
    intro:
      'Sector 21 is a settled residential sector whose students come largely from MVN, DAV and Greenfields — schools with strong science streams and parents who take the NEET decision seriously early. The Badkhal Mor and Bata Chowk metro stations frame the sector, and our Sector 17 centre is a straightforward three-kilometre run in. We see a lot of two-year-plan students from Sector 21, and our Class 11 Biology foundation batches are designed for exactly that head start.',
  },
  'nit-faridabad': {
    metaTitle: 'NEET Biology Coaching near NIT Faridabad — School-Hour Batches | Cerebrum',
    metaDescription:
      'NIT Faridabad has the city’s densest school and family cluster. Evening and weekend NEET Biology batches timed around NIT DAV school hours, a short metro hop from our Sector 17 centre.',
    intro:
      'NIT — New Industrial Township — is where planned Faridabad began, and it still has the city’s densest cluster of families and schools. Students here typically juggle demanding schedules at NIT DAV and the neighbourhood’s older establishments with NEET prep, alongside the family business or workshop many grow up around. Our Sector 17 centre is a short hop up the Old Faridabad Metro corridor, so NIT students reach us without crossing the city — and our evening and weekend Biology batches are timed to sit around NIT school hours.',
  },
  'old-faridabad': {
    metaTitle: 'NEET Biology Coaching in Old Faridabad — Two Metro Stops Away | Cerebrum',
    metaDescription:
      'Old Faridabad’s trader and business families making the jump into medicine — structured, small-batch NEET Biology teaching two Metro stops from our Sector 17 centre.',
    intro:
      'Old Faridabad is the original city — the market, the railway station, the bus stand, and generations of trader and business families clustered around them. NEET aspirants here almost always come from academically ambitious business households making the jump into medicine, and they value a coach who holds them to a plan. The Old Faridabad Metro station puts our Sector 17 centre two stops away, and our small-batch Biology teaching is built for students who want structure rather than a crowded classroom.',
  },
  'sector-28': {
    metaTitle: 'NEET Biology Coaching near Sector 28 Faridabad Metro | Cerebrum',
    metaDescription:
      'Sector 28 is Faridabad’s commercial and metro pivot. Reliable access for working families and a wide arc of sectors — small, flexibly-timed NEET Biology batches from our Sector 17 centre.',
    intro:
      'Sector 28 is Faridabad’s commercial pivot, built around its own metro station and drawing students from a wide arc of surrounding sectors and working households. For families here the deciding factor is usually access — a centre they can reach reliably around work and school runs — and our Sector 17 location is a short, well-connected hop from the Sector 28 interchange. Ryan International and the neighbourhood schools feed our Biology batches, which we keep small and flexibly timed.',
  },
  'sector-84': {
    metaTitle: 'NEET Biology Coaching for Sector 84 Greater Faridabad (Neharpar) | Cerebrum',
    metaDescription:
      'Sector 84 in Greater Faridabad (Neharpar) is ~15 km out — so we build a hybrid plan: live online Biology weekdays, centre visits for full tests and practicals. Near Escorts Mujesar Metro.',
    intro:
      'Sector 84 is part of Greater Faridabad — the fast-growing Neharpar belt east of the old city, with Omaxe New Heights and a wave of new residential projects. It’s the one catchment where distance genuinely matters: at roughly fifteen kilometres from our Sector 17 centre, we build Sector 84 students a hybrid plan — live online Biology classes for weekday depth, with centre visits for full-length tests and practicals. The Escorts Mujesar metro terminus anchors the area and makes those centre visits straightforward.',
  },
}

export function getFaridabadEnrichment(slug: string): FaridabadEnrichment | undefined {
  return faridabadEnriched[slug]
}

export function isIndexableFaridabadLocality(slug: string): boolean {
  return (INDEXABLE_FARIDABAD_LOCALITIES as readonly string[]).includes(slug)
}
