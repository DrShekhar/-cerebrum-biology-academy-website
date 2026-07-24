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
      'If you’re preparing for NEET in Rajouri Garden — one of West Delhi’s busiest coaching hubs — you’re spoilt for choice, and at real risk of getting lost in an oversized classroom. We offer you the opposite: small, examiner-informed NEET Biology batches taught live online by AIIMS-trained faculty, where you are actually tracked. Whether your school is DAV, Ryan or Cambridge on the Rajouri Garden metro spine, it is the depth a competitive market rarely delivers.',
  },
  'punjabi-bagh': {
    metaTitle: 'NEET Biology Coaching in Punjabi Bagh, West Delhi | Cerebrum',
    metaDescription:
      'Punjabi Bagh’s affluent business families want premium, personal NEET Biology coaching. Live online small batches with AIIMS-trained faculty and one-to-one mentorship.',
    intro:
      'If you live in Punjabi Bagh — among West Delhi’s most affluent addresses, with its wide roads and established business families — you hold anything called premium to a high standard. For your NEET preparation that should mean personal attention, not a packed hall: our live online Biology programme runs small batches with AIIMS-trained faculty and genuine one-to-one mentorship, matched to the standard you expect.',
  },
  'paschim-vihar': {
    metaTitle: 'NEET Biology Coaching in Paschim Vihar, West Delhi | Cerebrum',
    metaDescription:
      'Paschim Vihar’s large, education-focused colonies — live online NEET Biology coaching with small batches and AIIMS-trained faculty, timed around the area’s school schedules.',
    intro:
      'If your home is in one of Paschim Vihar’s lettered blocks — sprawling into one of West Delhi’s largest residential colonies, where educated families take their children’s education seriously — you want structure and rigour close to home. That is exactly what our live online Biology classes give you: small batches, AIIMS-trained faculty and testing built in — reachable from every block without a commute, and timed around your school hours.',
  },
  'tilak-nagar': {
    metaTitle: 'NEET Biology Coaching in Tilak Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Tilak Nagar — established, metro-connected West Delhi. Live online NEET Biology coaching with AIIMS-trained faculty and small batches for DAV and Bal Bharati students.',
    intro:
      'If you’re a NEET aspirant in Tilak Nagar — a settled West Delhi colony with a strong education culture and excellent metro links between Subhash Nagar and Janakpuri — you shouldn’t have to trade your evenings travelling across the city for a serious Biology programme. Whether you study at DAV or Bal Bharati, our live online small-batch classes, taught by AIIMS-trained faculty, bring that rigour straight to you.',
  },
  'uttam-nagar': {
    metaTitle: 'NEET Biology Coaching in Uttam Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Uttam Nagar — dense, value-conscious West Delhi. Serious NEET Biology coaching that is genuinely worth it: live online small batches, AIIMS-trained faculty, no premium markup.',
    intro:
      'If you live in Uttam Nagar — one of the most densely populated pockets of Delhi — you’re rightly value-conscious: you want NEET preparation that is genuinely worth the spend, not a brand markup. Our live online Biology programme is built for exactly that: examiner-level teaching from AIIMS-trained faculty in small batches, delivered without the overheads of a marquee coaching centre, so the quality you get never depends on a premium price tag.',
  },
  'subhash-nagar': {
    metaTitle: 'NEET Biology Coaching in Subhash Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Subhash Nagar’s own-metro connectivity meets serious NEET Biology coaching. Live online small batches with AIIMS-trained faculty, timed around West Delhi school schedules.',
    intro:
      'Living on Subhash Nagar’s own Blue Line station gives you some of the best connectivity in West Delhi — but the smartest way to spend that time is on Biology, not on a commute. Our live online classes give you small, disciplined batches and AIIMS-trained faculty, with the depth of a specialist coaching centre and none of the travel your NEET preparation would otherwise cost.',
  },
  'kirti-nagar': {
    metaTitle: 'NEET Biology Coaching in Kirti Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Kirti Nagar’s business families want quality NEET Biology coaching for their children. Live online small batches, AIIMS-trained faculty, one-to-one mentorship — no commute.',
    intro:
      'Kirti Nagar may be best known for Asia’s largest furniture market, but if yours is one of the established business families in the residential blocks behind the showrooms, you want the best education for your children. For your NEET aspirant, our live online Biology programme delivers small-batch, examiner-informed teaching from AIIMS-trained faculty and real one-to-one mentorship — serious preparation that fits around a busy family enterprise.',
  },
  'moti-nagar': {
    metaTitle: 'NEET Biology Coaching in Moti Nagar, West Delhi | Cerebrum',
    metaDescription:
      'Moti Nagar — mixed residential-commercial West Delhi with its own metro. Live online NEET Biology coaching, small batches and AIIMS-trained faculty, no cross-city travel.',
    intro:
      'If you live in Moti Nagar — residential blocks blended with commercial pockets, with your own Blue Line station between Kirti Nagar and Ramesh Nagar — you want a NEET Biology programme you can rely on close to home rather than a long haul to a South or Central Delhi centre. Our live online small-batch classes, led by AIIMS-trained faculty, give you exactly that depth without the distance.',
  },
}

export function getWestDelhiEnrichment(slug: string): WestDelhiEnrichment | undefined {
  return westDelhiEnriched[slug]
}
