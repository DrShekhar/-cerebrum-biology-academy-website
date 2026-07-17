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
      'Kaushambi sits on the Blue Line right beside Anand Vihar ISBT, one of the best-connected pockets on the Ghaziabad–Delhi border and a busy commercial-residential hub. Its NEET aspirants want serious Biology preparation that keeps pace with that connectivity rather than adding a commute — so our live online classes bring small, examiner-informed batches and AIIMS-trained faculty straight to Kaushambi, wherever the student is on either side of the border.',
  },
  sahibabad: {
    metaTitle: 'NEET Biology Coaching in Sahibabad, Ghaziabad | Cerebrum',
    metaDescription:
      'Sahibabad — industrial-residential Ghaziabad on the Red Line near Dilshad Garden. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, working-family friendly.',
    intro:
      'Sahibabad is an established industrial and residential belt linked to Delhi via Dilshad Garden and its own Red Line stations, home to working-professional families across long-settled colonies. For their NEET aspirants the deciding factor is reliable access, which live online delivers perfectly: small Biology batches taught by AIIMS-trained faculty, on a schedule that fits a working household, with none of the travel to a distant coaching centre.',
  },
  'mohan-nagar': {
    metaTitle: 'NEET Biology Coaching in Mohan Nagar, Ghaziabad | Cerebrum',
    metaDescription:
      'Mohan Nagar — key Red Line junction in the Sahibabad zone. Live online NEET Biology coaching with AIIMS-trained faculty and small, focused batches, excellent Delhi connectivity.',
    intro:
      'Mohan Nagar is a key junction on the Red Line in the Sahibabad zone, a commercial-and-residential crossroads with strong links into Delhi. Its NEET aspirants — many from working-professional homes — want a Biology programme that matches that busy rhythm, so we keep our live online batches small and disciplined, led by AIIMS-trained faculty, reaching every Mohan Nagar student without the crossing into a Delhi coaching hub.',
  },
  'vijay-nagar': {
    metaTitle: 'NEET Biology Coaching in Vijay Nagar, Ghaziabad | Cerebrum',
    metaDescription:
      'Vijay Nagar — one of Ghaziabad’s oldest established colonies. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, timed around local school hours.',
    intro:
      'Vijay Nagar is one of Ghaziabad’s oldest and most established residential colonies, central and well-served by schools and markets. Its NEET aspirants come from settled local families who want dependable, rigorous Biology teaching close to home rather than a long commute into Delhi — and our live online small-batch classes, led by AIIMS-trained faculty, deliver exactly that depth across the neighbourhood.',
  },
  'wave-city': {
    metaTitle: 'NEET Biology Coaching in Wave City, Ghaziabad (NH-24) | Cerebrum',
    metaDescription:
      'Wave City — modern integrated township on NH-24. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, purpose-built for a new, far-out catchment.',
    intro:
      'Wave City is a modern integrated township stretched along NH-24, with planned residential, commercial and recreational zones drawing young families to a fast-growing but far-out address. That distance is exactly why live online fits: our small, examiner-informed NEET Biology batches and AIIMS-trained faculty reach Wave City directly, so a student never trades hours of highway commuting for classroom rigour.',
  },
  'vaibhav-khand': {
    metaTitle: 'NEET Biology Coaching in Vaibhav Khand, Indirapuram (Ghaziabad) | Cerebrum',
    metaDescription:
      'Vaibhav Khand — premium central Indirapuram (ATS Advantage & high-rises) near Vaishali metro. Live online NEET Biology coaching, small batches, AIIMS-trained faculty.',
    intro:
      'Vaibhav Khand is one of central Indirapuram’s premium pockets, anchored by ATS Advantage and other high-rises and well-connected to the Vaishali metro. Its families — from Cambridge School, Presidium and the neighbouring Indirapuram schools — expect a premium standard, and our live online Biology programme delivers it in substance: small batches, AIIMS-trained faculty and one-to-one mentorship, right into the tower without a commute.',
  },
  govindpuram: {
    metaTitle: 'NEET Biology Coaching in Govindpuram, Ghaziabad (Trans-Hindon) | Cerebrum',
    metaDescription:
      'Govindpuram — growing Trans-Hindon Ghaziabad near GT Road/NH-58. Live online NEET Biology coaching, small batches, AIIMS-trained faculty, value-focused families.',
    intro:
      'Govindpuram is a fast-growing Trans-Hindon residential area of builder floors and apartments close to GT Road and NH-58, drawing value-conscious families who want quality without a premium markup. Our live online Biology programme is built for exactly that: examiner-level teaching from AIIMS-trained faculty in small batches, delivered without the overheads of a marquee centre, so Govindpuram’s NEET aspirants get depth that doesn’t depend on price.',
  },
  'pratap-vihar': {
    metaTitle: 'NEET Biology Coaching in Pratap Vihar, Ghaziabad | Cerebrum',
    metaDescription:
      'Pratap Vihar — established central Ghaziabad residential colony. Live online NEET Biology coaching with AIIMS-trained faculty and small, focused batches, no commute.',
    intro:
      'Pratap Vihar is an established residential colony in central Ghaziabad with settled markets and schools and mid-range, family-oriented housing. Its NEET aspirants want a serious Biology programme they can rely on locally rather than a trek to a distant coaching hub — so our live online small-batch classes, taught by AIIMS-trained faculty with regular testing, bring that rigour right into the neighbourhood.',
  },
}

export function getGhaziabadEnrichment(slug: string): GhaziabadEnrichment | undefined {
  return ghaziabadEnriched[slug]
}
