/**
 * Ghaziabad locality enrichment — the curated 8 /neet-coaching-ghaziabad/[area]
 * pages that are UN-REDIRECTED and indexable (Tier B, Jul 2026).
 *
 * These 8 have NO standalone twin. The big Ghaziabad localities that DO have
 * standalone pages (indirapuram, vaishali, vasundhara, crossing-republik,
 * raj-nagar, raj-nagar-extension, lal-kuan) stay redirected. No Ghaziabad
 * physical centre exists, so intros are honestly framed around live online
 * small-batch classes on the area's Red/Blue Line metro spine.
 *
 * SOURCE OF TRUTH — keep in sync with src/config/seo-redirects.mjs (the 8 must NOT
 * appear in any redirect list) and the ghaziabadLocalityRoutes map in sitemap.ts.
 */

export const INDEXABLE_GHAZIABAD_LOCALITIES = [
  'kaushambi',
  'sahibabad',
  'mohan-nagar',
  'vijay-nagar',
  'wave-city',
  'vaibhav-khand',
  'govindpuram',
  'pratap-vihar',
] as const

export interface GhaziabadEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const ghaziabadEnriched: Record<string, GhaziabadEnrichment> = {
  kaushambi: {
    metaTitle: 'NEET Biology Coaching in Kaushambi, Ghaziabad (near Anand Vihar) | Cerebrum',
    metaDescription:
      'Kaushambi — Blue Line, next to Anand Vihar ISBT. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, for a fast-connected Ghaziabad–Delhi border catchment.',
    intro:
      'If you live in Kaushambi — on the Blue Line right beside Anand Vihar ISBT, one of the best-connected pockets on the Ghaziabad–Delhi border and a busy commercial-residential hub — you want serious NEET Biology preparation that keeps pace with that connectivity rather than adding a commute. Our live online classes bring small, examiner-informed batches and AIIMS-trained faculty straight to you, wherever you are on either side of the border.',
  },
  sahibabad: {
    metaTitle: 'NEET Biology Coaching in Sahibabad, Ghaziabad | Cerebrum',
    metaDescription:
      'Sahibabad — industrial-residential Ghaziabad on the Red Line near Dilshad Garden. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, working-family friendly.',
    intro:
      'If your family is settled in Sahibabad — an established industrial and residential belt linked to Delhi via Dilshad Garden and its own Red Line stations — you’re likely a working-professional household in one of its long-settled colonies, and your deciding factor is reliable access. Live online delivers it perfectly: small Biology batches taught by AIIMS-trained faculty, on a schedule that fits your working household, with none of the travel to a distant coaching centre.',
  },
  'mohan-nagar': {
    metaTitle: 'NEET Biology Coaching in Mohan Nagar, Ghaziabad | Cerebrum',
    metaDescription:
      'Mohan Nagar — key Red Line junction in the Sahibabad zone. Live online NEET Biology coaching with AIIMS-trained faculty and small, focused batches, excellent Delhi connectivity.',
    intro:
      'If you’re preparing for NEET from Mohan Nagar — a key junction on the Red Line in the Sahibabad zone, a commercial-and-residential crossroads with strong links into Delhi — you’re likely from a working-professional home and want a Biology programme that matches that busy rhythm. We keep our live online batches small and disciplined, led by AIIMS-trained faculty, reaching you without the crossing into a Delhi coaching hub.',
  },
  'vijay-nagar': {
    metaTitle: 'NEET Biology Coaching in Vijay Nagar, Ghaziabad | Cerebrum',
    metaDescription:
      'Vijay Nagar — one of Ghaziabad’s oldest established colonies. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, timed around local school hours.',
    intro:
      'If you’ve grown up in Vijay Nagar — one of Ghaziabad’s oldest and most established residential colonies, central and well-served by schools and markets — you come from a settled local family and probably want dependable, rigorous Biology teaching close to home rather than a long commute into Delhi. Our live online small-batch classes, led by AIIMS-trained faculty, deliver exactly that depth right where you are in the neighbourhood.',
  },
  'wave-city': {
    metaTitle: 'NEET Biology Coaching in Wave City, Ghaziabad (NH-24) | Cerebrum',
    metaDescription:
      'Wave City — modern integrated township on NH-24. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, purpose-built for a new, far-out catchment.',
    intro:
      'If you’ve moved to Wave City — the modern integrated township stretched along NH-24, with planned residential, commercial and recreational zones drawing young families — you know yours is a fast-growing but far-out address. That distance is exactly why live online fits: our small, examiner-informed NEET Biology batches and AIIMS-trained faculty reach you directly, so you never trade hours of highway commuting for classroom rigour.',
  },
  'vaibhav-khand': {
    metaTitle: 'NEET Biology Coaching in Vaibhav Khand, Indirapuram (Ghaziabad) | Cerebrum',
    metaDescription:
      'Vaibhav Khand — premium central Indirapuram (ATS Advantage & high-rises) near Vaishali metro. Live online NEET Biology coaching, small batches, AIIMS-trained faculty.',
    intro:
      'If you live in Vaibhav Khand — one of central Indirapuram’s premium pockets, anchored by ATS Advantage and other high-rises and well-connected to the Vaishali metro — your child is probably at Cambridge School, Presidium or a neighbouring Indirapuram school, and you expect a premium standard. Our live online Biology programme delivers it in substance: small batches, AIIMS-trained faculty and one-to-one mentorship, right into your tower without a commute.',
  },
  govindpuram: {
    metaTitle: 'NEET Biology Coaching in Govindpuram, Ghaziabad (Trans-Hindon) | Cerebrum',
    metaDescription:
      'Govindpuram — growing Trans-Hindon Ghaziabad near GT Road/NH-58. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, value-focused families.',
    intro:
      'If Govindpuram is home — a fast-growing Trans-Hindon residential area of builder floors and apartments close to GT Road and NH-58 — you’re probably value-conscious: you want quality without a premium markup. Our live online Biology programme is built for exactly that: examiner-level teaching from AIIMS-trained faculty in small batches, delivered without the overheads of a marquee centre, so the depth you get doesn’t depend on the price you pay.',
  },
  'pratap-vihar': {
    metaTitle: 'NEET Biology Coaching in Pratap Vihar, Ghaziabad | Cerebrum',
    metaDescription:
      'Pratap Vihar — established central Ghaziabad residential colony. Live online NEET Biology coaching with AIIMS-trained faculty and small, focused batches, no commute.',
    intro:
      'If you live in Pratap Vihar — an established residential colony in central Ghaziabad, with settled markets and schools and mid-range, family-oriented housing — you want a serious Biology programme you can rely on locally rather than a trek to a distant coaching hub. Our live online small-batch classes, taught by AIIMS-trained faculty with regular testing, bring that rigour right into your neighbourhood.',
  },
}

export function getGhaziabadEnrichment(slug: string): GhaziabadEnrichment | undefined {
  return ghaziabadEnriched[slug]
}
