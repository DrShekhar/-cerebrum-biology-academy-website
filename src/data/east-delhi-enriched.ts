/**
 * East Delhi locality enrichment — the curated 8 /neet-coaching-east-delhi/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * These localities had NO standalone twin, so un-redirecting is additive, not
 * cannibalistic (dilshad-garden, which IS covered by a standalone page, was left
 * redirected). The rest of the /:area family stays consolidated via explicit
 * exact-source redirects (areaPageConsolidationRedirects + the 3 gap slugs in
 * eastDelhiConsolidationRedirects). No East Delhi physical centre exists, so the
 * intros are honestly framed around live online small-batch classes on the
 * area's strong metro spine.
 *
 * SOURCE OF TRUTH — keep in sync with src/config/seo-redirects.mjs (the 8 must
 * NOT appear in any redirect list) and the eastDelhiLocalityRoutes map in sitemap.ts.
 */

export const INDEXABLE_EAST_DELHI_LOCALITIES = [
  'laxmi-nagar',
  'preet-vihar',
  'mayur-vihar-phase-1',
  'anand-vihar',
  'nirman-vihar',
  'krishna-nagar',
  'vivek-vihar',
  'ip-extension',
] as const

export interface EastDelhiEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const eastDelhiEnriched: Record<string, EastDelhiEnrichment> = {
  'laxmi-nagar': {
    metaTitle: 'NEET Biology Coaching in Laxmi Nagar, East Delhi | Cerebrum',
    metaDescription:
      'Laxmi Nagar is East Delhi’s coaching capital — we win on quality, not crowd size. Live online NEET Biology, small batches, AIIMS-trained faculty, real one-to-one tracking.',
    intro:
      'Laxmi Nagar is East Delhi’s coaching capital, packed with institutes running hundred-strong classrooms. That density is exactly why serious NEET aspirants come to us for the opposite experience: small, examiner-informed Biology batches taught live online by AIIMS-trained faculty, where every student is genuinely tracked rather than lost in a hall. It is quality over quantity, on the same metro line, without the crowd.',
  },
  'preet-vihar': {
    metaTitle: 'NEET Biology Coaching in Preet Vihar, East Delhi | Cerebrum',
    metaDescription:
      'Preet Vihar’s DPS families want personalised NEET Biology coaching, not mass classes. Live online small batches with AIIMS-trained faculty and one-to-one mentorship.',
    intro:
      'Preet Vihar is one of East Delhi’s most sought-after residential addresses, home to DPS Preet Vihar and educated families who expect more than a production-line coaching centre. Our live online Biology programme gives their NEET aspirants small batches, AIIMS-trained faculty and genuine one-to-one mentorship — serious preparation with the personal attention Preet Vihar families are looking for, a couple of metro stops from the Laxmi Nagar crush.',
  },
  'mayur-vihar-phase-1': {
    metaTitle: 'NEET Biology Coaching in Mayur Vihar Phase 1, East Delhi | Cerebrum',
    metaDescription:
      'Mayur Vihar Phase 1 — one of East Delhi’s largest DDA colonies, metro-connected. Live online NEET Biology coaching with small batches and AIIMS-trained faculty.',
    intro:
      'Mayur Vihar Phase 1 is one of the largest DDA colonies in East Delhi, a settled middle-class community with its own metro station and a strong education culture. Its NEET aspirants want dependable, rigorous Biology preparation close to home rather than a daily trek to a coaching hub — and our live online small-batch classes, led by AIIMS-trained faculty, deliver exactly that depth right across the phase.',
  },
  'anand-vihar': {
    metaTitle: 'NEET Biology Coaching near Anand Vihar, East Delhi | Cerebrum',
    metaDescription:
      'Anand Vihar — East Delhi’s transport gateway (ISBT + railway). Live online NEET Biology coaching that reaches students across the border belt, small batches, AIIMS-trained faculty.',
    intro:
      'Anand Vihar is East Delhi’s transport gateway — the Inter-State Bus Terminal and railway station pull in students from across the Delhi–UP border. That wide catchment is precisely where live online teaching shines: our small, examiner-informed NEET Biology batches reach a student in Anand Vihar or just over the border in Kaushambi equally well, with AIIMS-trained faculty and no dependence on where the nearest classroom happens to be.',
  },
  'nirman-vihar': {
    metaTitle: 'NEET Biology Coaching in Nirman Vihar, East Delhi | Cerebrum',
    metaDescription:
      'Nirman Vihar — vibrant commercial-residential East Delhi, next to Laxmi Nagar. Live online NEET Biology coaching with small batches and AIIMS-trained faculty, no crowded halls.',
    intro:
      'Nirman Vihar blends commercial bustle with residential blocks and sits right beside the Laxmi Nagar coaching belt on the Blue Line. Students here have every mass-coaching option on their doorstep — which is exactly why the ones serious about a medical seat choose our live online model instead: small batches, AIIMS-trained faculty and real accountability, none of the anonymity of a packed hall.',
  },
  'krishna-nagar': {
    metaTitle: 'NEET Biology Coaching in Krishna Nagar, East Delhi | Cerebrum',
    metaDescription:
      'Krishna Nagar — one of East Delhi’s oldest, market-driven business communities. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, structured mentorship.',
    intro:
      'Krishna Nagar is one of the oldest established localities in East Delhi, built around a busy market and a strong business community that takes its children’s education seriously. For NEET aspirants from these business households, our live online Biology programme brings structured, examiner-level teaching from AIIMS-trained faculty and small-batch mentorship — the discipline of a specialist coaching centre, delivered without the commute out of the neighbourhood.',
  },
  'vivek-vihar': {
    metaTitle: 'NEET Biology Coaching in Vivek Vihar, East Delhi | Cerebrum',
    metaDescription:
      'Vivek Vihar — settled East Delhi residential near Anand Vihar. Live online NEET Biology coaching with AIIMS-trained faculty and small batches, timed around local school hours.',
    intro:
      'Vivek Vihar is a well-established residential colony beside Anand Vihar, with good schools and educated families who plan early for medicine. Its NEET aspirants want a serious, consistent Biology programme they can rely on close to home, and our live online small-batch classes — taught by AIIMS-trained faculty and timed around local school schedules — give them exactly that without a cross-city commute.',
  },
  'ip-extension': {
    metaTitle: 'NEET Biology Coaching in IP Extension, East Delhi | Cerebrum',
    metaDescription:
      'IP Extension (Indraprastha Extension) — upscale East Delhi, DPS & Amity families. Premium live online NEET Biology coaching, small batches, AIIMS-trained faculty, personal mentorship.',
    intro:
      'IP Extension — Indraprastha Extension — is one of East Delhi’s most upscale colonies, home to professionals and business families from DPS IP Extension, Amity and The Indian School. Their NEET aspirants expect a premium standard, and our live online Biology programme delivers it in substance rather than signage: small batches, AIIMS-trained faculty and one-to-one mentorship, matched to IP Extension’s expectations and reachable without leaving the colony.',
  },
}

export function getEastDelhiEnrichment(slug: string): EastDelhiEnrichment | undefined {
  return eastDelhiEnriched[slug]
}
