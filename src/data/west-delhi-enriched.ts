/**
 * West Delhi locality enrichment — the curated 8 /neet-coaching-west-delhi/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * West Delhi's localities had NO standalone twin (unlike South Delhi, which is
 * already covered by standalone pages), so un-redirecting these is additive, not
 * cannibalistic. The rest of the /:area family stays consolidated via explicit
 * exact-source redirects (areaPageConsolidationRedirects + the 3 gap slugs in
 * westDelhiConsolidationRedirects). No West Delhi physical centre exists, so the
 * intros are honestly framed around live online small-batch classes, leaning on
 * the area's strong Blue Line metro character.
 *
 * SOURCE OF TRUTH — keep in sync with src/config/seo-redirects.mjs (the 8 must
 * NOT appear in any redirect list) and the westDelhiLocalityRoutes map in sitemap.ts.
 */

export const INDEXABLE_WEST_DELHI_LOCALITIES = [
  'rajouri-garden',
  'punjabi-bagh',
  'paschim-vihar',
  'tilak-nagar',
  'uttam-nagar',
  'subhash-nagar',
  'kirti-nagar',
  'moti-nagar',
] as const

export interface WestDelhiEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const westDelhiEnriched: Record<string, WestDelhiEnrichment> = {
  'rajouri-garden': {
    metaTitle: 'NEET Biology Coaching in Rajouri Garden, West Delhi | Cerebrum',
    metaDescription:
      'Rajouri Garden is a busy coaching hub — we compete on depth, not crowd size. Live online NEET Biology classes, small batches, AIIMS-trained faculty, for DAV/Ryan/Cambridge students.',
    intro:
      'Rajouri Garden is one of West Delhi’s busiest coaching hubs, so students here are spoilt for choice — and often lost in oversized classrooms. Our answer is the opposite: small, examiner-informed NEET Biology batches taught live online by AIIMS-trained faculty, where every student is actually tracked. For DAV, Ryan and Cambridge students on the Rajouri Garden metro spine, it is the depth a competitive market rarely delivers.',
  },
  'punjabi-bagh': {
    metaTitle: 'NEET Biology Coaching in Punjabi Bagh, West Delhi | Cerebrum',
    metaDescription:
      'Punjabi Bagh’s affluent business families want premium, personal NEET Biology coaching. Live online small batches with AIIMS-trained faculty and one-to-one mentorship.',
    intro:
      'Punjabi Bagh is among West Delhi’s most affluent addresses — wide roads, established business families, and high expectations of anything called premium. For NEET aspirants here that means personal attention, not a packed hall: our live online Biology programme runs small batches with AIIMS-trained faculty and genuine one-to-one mentorship, matched to the standard Punjabi Bagh families expect.',
  },
  'paschim-vihar': {
    metaTitle: 'NEET Biology Coaching in Paschim Vihar, West Delhi | Cerebrum',
    metaDescription:
      'Paschim Vihar’s large, education-focused colonies — live online NEET Biology coaching with small batches and AIIMS-trained faculty, timed around the area’s school schedules.',
    intro:
      'Paschim Vihar sprawls across its lettered blocks into one of West Delhi’s largest residential colonies, home to educated families who take their children’s education seriously. NEET aspirants here want structure and rigour close to home, which is exactly what our live online Biology classes provide — small batches, AIIMS-trained faculty and testing built in — reachable from every block without a commute, and timed around local school hours.',
  },
  'tilak-nagar': {
    metaTitle: 'NEET Biology Coaching in Tilak Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Tilak Nagar — established, metro-connected West Delhi. Live online NEET Biology coaching with AIIMS-trained faculty and small batches for DAV and Bal Bharati students.',
    intro:
      'Tilak Nagar is a settled West Delhi colony with a strong education culture and excellent metro links between Subhash Nagar and Janakpuri. Its NEET aspirants — many from DAV and Bal Bharati — want a serious Biology programme without trading their evenings to travel across the city for it. Our live online small-batch classes, taught by AIIMS-trained faculty, bring that rigour straight to them.',
  },
  'uttam-nagar': {
    metaTitle: 'NEET Biology Coaching in Uttam Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Uttam Nagar — dense, value-conscious West Delhi. Serious NEET Biology coaching that is genuinely worth it: live online small batches, AIIMS-trained faculty, no premium markup.',
    intro:
      'Uttam Nagar is one of the most densely populated pockets of Delhi, and its families are rightly value-conscious — they want NEET preparation that is genuinely worth the spend, not a brand markup. Our live online Biology programme is built for exactly that: examiner-level teaching from AIIMS-trained faculty in small batches, delivered without the overheads of a marquee coaching centre, so quality never depends on a premium price tag.',
  },
  'subhash-nagar': {
    metaTitle: 'NEET Biology Coaching in Subhash Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Subhash Nagar’s own-metro connectivity meets serious NEET Biology coaching. Live online small batches with AIIMS-trained faculty, timed around West Delhi school schedules.',
    intro:
      'Subhash Nagar sits on its own Blue Line station, giving its students some of the best connectivity in West Delhi — but the smartest way to spend that time is on Biology, not on a commute. Our live online classes give Subhash Nagar’s NEET aspirants small, disciplined batches and AIIMS-trained faculty, with the depth of a specialist coaching centre and none of the travel.',
  },
  'kirti-nagar': {
    metaTitle: 'NEET Biology Coaching in Kirti Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Kirti Nagar’s business families want quality NEET Biology coaching for their children. Live online small batches, AIIMS-trained faculty, one-to-one mentorship — no commute.',
    intro:
      'Kirti Nagar is best known for Asia’s largest furniture market, but behind the showrooms sit established residential blocks and business families who want the best education for their children. For their NEET aspirants, our live online Biology programme delivers small-batch, examiner-informed teaching from AIIMS-trained faculty and real one-to-one mentorship — serious preparation that fits around a busy family enterprise.',
  },
  'moti-nagar': {
    metaTitle: 'NEET Biology Coaching in Moti Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Moti Nagar — mixed residential-commercial West Delhi with its own metro. Live online NEET Biology coaching, small batches and AIIMS-trained faculty, no cross-city travel.',
    intro:
      'Moti Nagar blends residential blocks with commercial pockets and enjoys its own Blue Line station between Kirti Nagar and Ramesh Nagar. Its NEET aspirants want a Biology programme they can rely on close to home rather than a long haul to a South or Central Delhi centre — and our live online small-batch classes, led by AIIMS-trained faculty, give them exactly that depth without the distance.',
  },
}

export function getWestDelhiEnrichment(slug: string): WestDelhiEnrichment | undefined {
  return westDelhiEnriched[slug]
}
