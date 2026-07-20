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
  'dlf-phase-2',
  'sector-56',
  'sector-14',
  'sector-82',
  'sector-84',
  'sector-85',
  'sector-86',
  'sector-89',
  'sector-92',
  'sector-95',
  'sector-102',
  'sector-104',
  'sector-106',
  'sector-108',
  'sector-110',
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
  'sector-82': {
    metaTitle: 'NEET Biology Coaching in Sector 82, New Gurugram (Dwarka Expressway) | Cerebrum',
    metaDescription:
      'Sector 82 on the Dwarka Expressway — Vatika, Experion and ATS families. Live online NEET Biology with AIIMS faculty, plus our Sector 51 centre.',
    intro:
      'Sector 82 sits right on the Dwarka Expressway, one of New Gurugram’s best-connected addresses to Delhi, with communities like Vatika Turning Point, Experion Heart Song and ATS Destinaire. Because it is about 16 km from our Sector 51 centre, most Sector 82 families study NEET Biology with us live online — the same AIIMS-trained faculty and small batches as the classroom — and come in to the M2K Corporate Park centre for offline tests and mentoring when they want the in-person touch.',
  },
  'sector-84': {
    metaTitle: 'NEET Biology Coaching in Sector 84, New Gurugram | Cerebrum',
    metaDescription:
      'Sector 84 New Gurugram — affordable high-rise families (ROF, Signature Global). Live online NEET Biology, EMI-friendly, from our Sector 51 centre.',
    intro:
      'Sector 84 is one of New Gurugram’s value-housing pockets, with ROF Amaltas, Signature Global and Trehan communities drawing first-time-homebuyer families who want quality without a premium price. At roughly 17 km from our Sector 51 centre, these students learn best on our live online small-batch track — biology-only, AIIMS-trained faculty, EMI-friendly fees — with the option to attend in person at Sector 51.',
  },
  'sector-85': {
    metaTitle: 'NEET Biology Coaching in Sector 85, New Gurugram (SPR) | Cerebrum',
    metaDescription:
      'Sector 85 off the Southern Peripheral Road — M3M Woodshire, Vatika India Next. Live online NEET Biology with AIIMS faculty + our Sector 51 centre.',
    intro:
      'Sector 85 is filling fast along the Southern Peripheral Road, with M3M Woodshire and Vatika India Next bringing in young professional families. It is about 14 km from our Sector 51 centre, so the practical choice here is our live online NEET Biology track — small batches, real diagnostics, the same faculty as the centre — with in-person tests and mentoring available at M2K Corporate Park whenever families prefer.',
  },
  'sector-86': {
    metaTitle: 'NEET Biology Coaching in Sector 86, New Gurugram | Cerebrum',
    metaDescription:
      'Sector 86 (Vatika India Next) — IT and corporate families. Live online NEET Biology, small batches, AIIMS faculty, plus our Sector 51 centre.',
    intro:
      'Sector 86 anchors the Vatika India Next township, home to IT and corporate professionals used to a fast, results-driven pace — which is exactly how we teach NEET Biology, with tight feedback loops and honest diagnostics. About 15 km from our Sector 51 centre, Sector 86 students overwhelmingly take our live online small-batch classes, dropping in to the centre for offline tests when it suits their week.',
  },
  'sector-89': {
    metaTitle: 'NEET Biology Coaching in Sector 89, New Gurugram | Cerebrum',
    metaDescription:
      'Sector 89 near Pataudi Road — growing New Gurugram families (GLS, Satya). EMI-friendly live online NEET Biology from our Sector 51 centre.',
    intro:
      'Sector 89 near Pataudi Road is a growing, affordable-to-mid New Gurugram sector where GLS Arawali and Satya communities are drawing young families making their first real investment in coaching. At about 16 km from our Sector 51 centre, we serve Sector 89 through live online small-batch NEET Biology with EMI-friendly fees — the same AIIMS-trained faculty as the classroom — and keep the Sector 51 centre open for anyone who wants offline tests or mentoring.',
  },
  'sector-92': {
    metaTitle: 'NEET Biology Coaching in Sector 92, New Gurugram | Cerebrum',
    metaDescription:
      'Sector 92 (Bestech Park View, Mapsko) New Gurugram. Live online NEET Biology, small batches, AIIMS faculty, plus our Sector 51 centre.',
    intro:
      'Sector 92 has grown into an established New Gurugram high-rise cluster around Bestech Park View Ananda and Mapsko Casa Bella, with families who have been here long enough to want serious, structured biology teaching. About 15 km from our Sector 51 centre, they mostly take our live online NEET and foundation batches — identical faculty and material to the centre — and visit Sector 51 for offline mock tests when they choose.',
  },
  'sector-95': {
    metaTitle: 'NEET Biology Coaching in Sector 95, New Gurugram (Dwarka Expressway) | Cerebrum',
    metaDescription:
      'Sector 95 on the New Gurugram / Dwarka Expressway edge (Signature Global, Godrej). Live online NEET Biology from our Sector 51 centre.',
    intro:
      'Sector 95 straddles New Gurugram and the Dwarka Expressway, where Signature Global and Godrej communities are pulling in young families at pace. At about 17 km from our Sector 51 centre, Sector 95 students study NEET Biology with us live online in small batches — the same AIIMS-trained faculty as the classroom — with the option to attend the M2K Corporate Park centre in person for tests and one-on-one mentoring.',
  },
  'sector-102': {
    metaTitle: 'NEET Biology Coaching in Sector 102, Dwarka Expressway | Cerebrum',
    metaDescription:
      'Sector 102 Dwarka Expressway (Adani Oyster Grande, Shapoorji Joyville). Live online NEET Biology with AIIMS faculty + our Sector 51 centre.',
    intro:
      'Sector 102 is a prime Dwarka Expressway address close to the Delhi border, with communities like Adani Oyster Grande and Shapoorji Joyville. It is about 16 km from our Sector 51 centre, so Sector 102 families almost always begin on our live online NEET Biology track — small batches, AIIMS-trained faculty, recordings for revision — with the M2K Corporate Park centre open for offline tests and mentoring whenever they prefer.',
  },
  'sector-104': {
    metaTitle: 'NEET Biology Coaching in Sector 104, Dwarka Expressway | Cerebrum',
    metaDescription:
      'Sector 104 Dwarka Expressway (Chintels Serenity, Godrej Air). Live online NEET Biology, small batches, AIIMS faculty, plus our Sector 51 centre.',
    intro:
      'Sector 104 lines the Dwarka Expressway with mid-to-premium high-rises such as Chintels Serenity and Godrej Air, home to families who expect real academic rigour. At roughly 17 km from our Sector 51 centre, Sector 104 students choose our live online small-batch NEET and foundation classes — the same faculty and material as the classroom — and use the Sector 51 centre for in-person tests and mentoring.',
  },
  'sector-106': {
    metaTitle: 'NEET Biology Coaching in Sector 106, Dwarka Expressway | Cerebrum',
    metaDescription:
      'Sector 106 Dwarka Expressway (Godrej Nature Plus, Conscient). Live online NEET Biology from our Sector 51 centre, AIIMS faculty.',
    intro:
      'Sector 106 is one of the greener Dwarka Expressway sectors, anchored by Godrej Nature Plus and Conscient Heritage communities that attract families looking for space and calm. About 18 km from our Sector 51 centre, Sector 106 students rely on our live online NEET Biology track — small batches, AIIMS-trained faculty, same material as the classroom — with the option to attend the M2K Corporate Park centre in person for tests and mentoring.',
  },
  'sector-108': {
    metaTitle: 'NEET Biology Coaching in Sector 108, Dwarka Expressway | Cerebrum',
    metaDescription:
      'Sector 108 Dwarka Expressway (Shapoorji Joyville, Ansal Heights). Live online NEET Biology, small batches, AIIMS faculty + our Sector 51 centre.',
    intro:
      'Sector 108 is a fast-filling Dwarka Expressway sector with communities like Shapoorji Joyville and Ansal Heights bringing in a steady flow of young families. At about 18 km from our Sector 51 centre, most Sector 108 students take our live online small-batch NEET and foundation classes — biology-only, AIIMS-trained faculty — and drop in to the M2K Corporate Park centre for offline mock tests and mentoring.',
  },
  'sector-110': {
    metaTitle: 'NEET Biology Coaching in Sector 110, Dwarka Expressway | Cerebrum',
    metaDescription:
      'Sector 110 at the Delhi end of the Dwarka Expressway (Vatika Sovereign, Chintels). Live online NEET Biology from our Sector 51 centre.',
    intro:
      'Sector 110 sits at the Delhi end of the Dwarka Expressway — closest of all our New Gurugram sectors to Dwarka and IGI Airport — with communities like Vatika Sovereign Park and Chintels Paradiso. At roughly 19 km from our Sector 51 centre, Sector 110 families almost always study with us live online: the same AIIMS-trained faculty and small batches as the classroom, plus the option to visit the M2K Corporate Park centre in person for tests and one-on-one mentoring.',
  },
}

export function getGurugramEnrichment(slug: string): GurugramEnrichment | undefined {
  return gurugramEnriched[slug]
}
