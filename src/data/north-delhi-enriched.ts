/**
 * North Delhi locality enrichment — the curated 5 /neet-coaching-north-delhi/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * These 5 have NO standalone twin (rohini/pitampura/model-town/shalimar-bagh/
 * gtb-nagar/mukherjee-nagar/wazirpur are already covered by standalone pages and
 * stay redirected). No North Delhi physical centre exists, so intros are honestly
 * framed around live online small-batch classes on the area's metro spine.
 *
 * SOURCE OF TRUTH — keep in sync with src/config/seo-redirects.mjs (the 5 must NOT
 * appear in any redirect list) and the northDelhiLocalityRoutes map in sitemap.ts.
 */

export const INDEXABLE_NORTH_DELHI_LOCALITIES = [
  'kamla-nagar',
  'ashok-vihar',
  'kingsway-camp',
  'adarsh-nagar',
  'prashant-vihar',
] as const

export interface NorthDelhiEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const northDelhiEnriched: Record<string, NorthDelhiEnrichment> = {
  'kamla-nagar': {
    metaTitle: 'NEET Biology Coaching in Kamla Nagar, North Delhi (near DU) | Cerebrum',
    metaDescription:
      'Kamla Nagar next to Delhi University — a student epicentre. Live online NEET Biology coaching with small batches and AIIMS-trained faculty, structured amid all the buzz.',
    intro:
      'Kamla Nagar sits right beside Delhi University — Hindu, SRCC and Miranda House are minutes away — which makes it one of North Delhi’s liveliest student neighbourhoods and a magnet for coaching. For NEET aspirants here the challenge isn’t options, it’s focus. Our live online Biology programme brings small, examiner-informed batches and AIIMS-trained faculty with the discipline the DU-adjacent buzz can lack, reachable from the Vishwavidyalaya metro belt without joining another crowded classroom.',
  },
  'ashok-vihar': {
    metaTitle: 'NEET Biology Coaching in Ashok Vihar, North Delhi | Cerebrum',
    metaDescription:
      'Ashok Vihar (Phases 1–4) near Netaji Subhash Place — DAV, Ryan and Modern School families. Live online NEET Biology coaching, small batches, AIIMS-trained faculty.',
    intro:
      'Ashok Vihar is a settled North Delhi colony across Phases 1 to 4, anchored by DAV, Ryan and Modern School and the Netaji Subhash Place commercial hub next door. Its NEET aspirants come from education-focused families who want serious Biology preparation without a long commute, so we run small live online batches led by AIIMS-trained faculty — the depth of a specialist centre delivered right into the neighbourhood off the NSP and Shalimar Bagh metro lines.',
  },
  'kingsway-camp': {
    metaTitle: 'NEET Biology Coaching in Kingsway Camp, North Delhi (near DU & GTB) | Cerebrum',
    metaDescription:
      'Kingsway Camp near Delhi University and GTB Hospital — medical-minded families. Live online NEET Biology coaching with AIIMS-trained faculty and small, focused batches.',
    intro:
      'Kingsway Camp sits between Delhi University and GTB Hospital, so it draws an unusually academic and medically-minded community — exactly the households planning early for a medical seat. That makes it one of our natural catchments: our live online Biology classes give Kingsway Camp students small batches and AIIMS-trained faculty, matched to serious aspirants, and reachable straight off the GTB Nagar and Vishwavidyalaya metro stations.',
  },
  'adarsh-nagar': {
    metaTitle: 'NEET Biology Coaching in Adarsh Nagar, North Delhi | Cerebrum',
    metaDescription:
      'Adarsh Nagar — well-connected North Delhi on the Yellow Line. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, timed around local school hours.',
    intro:
      'Adarsh Nagar is a well-connected North Delhi colony on the Yellow Line between Azadpur and Model Town, home to families from DAV, Sarvodaya and Ryan who value reliable education. Rather than send their children across the city to a coaching hub, its NEET aspirants get our live online Biology classes — small batches, AIIMS-trained faculty and testing built in — delivered locally and scheduled around Adarsh Nagar’s school timetables.',
  },
  'prashant-vihar': {
    metaTitle: 'NEET Biology Coaching in Prashant Vihar, North Delhi (Rohini zone) | Cerebrum',
    metaDescription:
      'Prashant Vihar in the Rohini zone — quiet, education-focused colonies near Rohini West/Pitampura metro. Live online NEET Biology coaching, small batches, AIIMS-trained faculty.',
    intro:
      'Prashant Vihar is a quiet, well-kept colony in the Rohini zone, the kind of education-focused North Delhi pocket where families plan seriously for medicine. For their NEET aspirants we keep our live online Biology batches small and the mentorship personal, taught by AIIMS-trained faculty — a specialist Biology programme they can rely on close to home, a short hop from the Rohini West and Pitampura metro stations.',
  },
}

export function getNorthDelhiEnrichment(slug: string): NorthDelhiEnrichment | undefined {
  return northDelhiEnriched[slug]
}
