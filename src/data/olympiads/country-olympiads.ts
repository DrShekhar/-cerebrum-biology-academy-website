/**
 * Country-specific biology olympiad reference data.
 *
 * Covers English-speaking markets NOT already served by a
 * dedicated page (USABO, BBO, SBO, CBO, ASOB, JBO, CNBO, KBO,
 * INBO/NSEB, IBO). New-Zealand, Ireland, South Africa, Nigeria,
 * Philippines, Malaysia.
 *
 * Each entry drives the /biology-olympiad/[country] dynamic
 * route — page copy, FAQs, schemas, hreflang, pricing currency
 * ordering.
 */

import type { CurrencyInfo } from '@/data/shared/currencies'

export interface CountryOlympiadFAQ {
  question: string
  answer: string
}

export interface CountryOlympiadEntry {
  /** URL slug used in /biology-olympiad/[slug]. */
  slug: string
  /** Country name. */
  country: string
  /** ISO-2 country code for hreflang + geo. */
  iso: string
  /** Olympiad acronym (e.g., NZIBO). */
  acronym: string
  /** Full olympiad name. */
  fullName: string
  /** Flag emoji. */
  flag: string
  /** hreflang locale (e.g., en-NZ). */
  locale: string
  /** Organisation running the olympiad. */
  organisedBy: string
  /** Typical exam window (short phrase). */
  examWindow: string
  /** One-line positioning summary for hero. */
  pitch: string
  /** Paragraph-length intro for the page body. */
  intro: string
  /** Country-specific pathway/selection steps. */
  pathway: Array<{ stage: string; name: string; note: string }>
  /** Currency order for GeoAwareSharedPricingMatrix equivalents. */
  currencyOrder: CurrencyInfo['code'][]
  /** Cross-links to related olympiads. */
  relatedLinks: Array<{ label: string; href: string }>
  /** Country-specific FAQ (4-6). */
  faqs: CountryOlympiadFAQ[]
}

export const countryOlympiads: CountryOlympiadEntry[] = [
  {
    slug: 'new-zealand',
    country: 'New Zealand',
    iso: 'NZ',
    acronym: 'NZIBO',
    fullName: 'New Zealand International Biology Olympiad',
    flag: '🇳🇿',
    locale: 'en-NZ',
    organisedBy: 'NZIBO Trust (in partnership with the Royal Society Te Apārangi)',
    examWindow: 'August-September screening, January training camp',
    pitch: 'NZIBO coaching for New Zealand school students aiming for the IBO team.',
    intro:
      'The New Zealand International Biology Olympiad (NZIBO) selects four students each year to represent New Zealand at the International Biology Olympiad. Students take a screening exam in August-September, with the top 24 invited to a residential training camp in January before the final team of four is selected. Our programme runs fully online for NZ students and follows the Campbell Biology syllabus used by NZIBO trainers.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'August-September, online paper' },
      { stage: 'Round 2', name: 'Training camp', note: 'January, residential, top ~24' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent NZ at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['NZD', 'USD', 'AUD', 'GBP', 'SGD', 'INR'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'Australia (ASOB)', href: '/asob-coaching' },
    ],
    faqs: [
      {
        question: 'What is NZIBO and who organises it?',
        answer:
          'The New Zealand International Biology Olympiad (NZIBO) is run by the NZIBO Trust and selects four students annually to represent New Zealand at the IBO. The screening exam is held in August-September, and the top 24 attend a January training camp before final team selection.',
      },
      {
        question: 'When should I start NZIBO preparation?',
        answer:
          'Year 12 students who plan to sit the August-September screening paper should begin a Campbell-based programme the preceding December-January to cover all four IBO themes with past-paper practice. Our Complete Olympiad Year matches this 9-12 month window.',
      },
      {
        question: 'Is NZIBO coaching available online for NZ students?',
        answer:
          'Yes. Our programme runs fully online on NZ-friendly timings. Live classes are scheduled across NZ evenings with recordings for every session. 1:1 elite mentoring by IBO medallists is also NZ-timezone compatible.',
      },
      {
        question: 'What does NZIBO coaching cost in New Zealand dollars?',
        answer:
          'Fees are in USD reference pricing with NZD auto-shown to New Zealand visitors on the pricing section below. Complete Olympiad Year is approximately NZ$7,500 equivalent; 1:1 Elite Mentoring is approximately NZ$150 per hour; Small-Batch Weekend is approximately NZ$85 per hour.',
      },
      {
        question: 'Do you cover IBO practical-round skills for NZIBO camp students?',
        answer:
          'Yes. IBO practicals cover Biochemistry, Plant Anatomy, Animal Anatomy and Physiology, and Bioinformatics/Ecology — roughly 50% of the IBO medal total. We integrate equipment-adjusted lab skills training into the programme from Round 2 preparation onwards.',
      },
    ],
  },
  {
    slug: 'ireland',
    country: 'Ireland',
    iso: 'IE',
    acronym: 'IrBO',
    fullName: 'Irish Biology Olympiad',
    flag: '🇮🇪',
    locale: 'en-IE',
    organisedBy: 'Irish Science Teachers Association (ISTA) with University College Dublin',
    examWindow: 'February screening, April camp',
    pitch: 'IrBO coaching for Irish post-primary students aiming for the IBO team.',
    intro:
      'The Irish Biology Olympiad (IrBO) selects the four students who represent Ireland at the IBO. Organised by the Irish Science Teachers Association with University College Dublin, the pathway runs a February screening paper followed by an April training weekend and final team selection. Our Irish programme follows the Leaving Certificate extension plus Campbell Biology, which aligns with IrBO trainer expectations.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'February, school-based paper' },
      { stage: 'Round 2', name: 'Training weekend', note: 'April at UCD, top ~20' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent Ireland at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['EUR', 'GBP', 'USD', 'INR', 'AED', 'SGD'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'UK (BBO)', href: '/bbo-preparation' },
    ],
    faqs: [
      {
        question: 'How does IrBO differ from the UK BBO?',
        answer:
          'IrBO is a shorter pathway — a single February paper followed by an April training weekend, versus the BBO single-sitting paper awarding medals. IrBO directly selects the Irish team for IBO; BBO top performers go into a separate UK selection process. Both use Campbell Biology as the core textbook.',
      },
      {
        question: 'Is the Leaving Cert Biology syllabus enough for IrBO?',
        answer:
          'No. The Leaving Cert covers the foundations but IrBO questions pull from first-year university-level biology on genetics, molecular biology, and experimental design. Campbell Biology (11th-12th edition) plus past-paper practice is the required extension for a competitive score.',
      },
      {
        question: 'When should an Irish student start IrBO preparation?',
        answer:
          'Students typically sit the February screening in Fifth or Sixth Year. Begin structured Campbell preparation the preceding September for a 5-6 month ramp. Sixth Year students may prefer our Elite 1:1 track for a faster topic-by-topic approach.',
      },
      {
        question: 'Do you run IrBO coaching in EUR?',
        answer:
          'Pricing is USD-referenced with EUR auto-displayed on the pricing section for Irish visitors. Complete Olympiad Year is approximately €4,150 equivalent; 1:1 Elite Mentoring is approximately €85 per hour.',
      },
      {
        question: 'Can Irish students join the IBO prep track after IrBO selection?',
        answer:
          'Yes. Selected team members receive accelerated IBO practical-skills coaching and team-strategy mentoring between April camp and the July IBO. Our programme bridges both stages.',
      },
    ],
  },
  {
    slug: 'south-africa',
    country: 'South Africa',
    iso: 'ZA',
    acronym: 'SABO',
    fullName: 'South African Biology Olympiad',
    flag: '🇿🇦',
    locale: 'en-ZA',
    organisedBy: 'South African Agency for Science and Technology Advancement (SAASTA)',
    examWindow: 'March-April screening, June camp',
    pitch: 'SABO coaching for Grade 11-12 South African learners targeting the IBO team.',
    intro:
      'The South African Biology Olympiad (SABO) is run by SAASTA and selects the national IBO team. The March-April screening exam feeds into a June training camp, with final team selection for the July IBO. Our programme is fully online for South African learners and follows the Campbell Biology syllabus aligned to SABO trainer expectations.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'March-April school paper' },
      { stage: 'Round 2', name: 'Training camp', note: 'June, top ~20' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent SA at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['ZAR', 'USD', 'GBP', 'EUR', 'AED', 'INR'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'UK (BBO)', href: '/bbo-preparation' },
    ],
    faqs: [
      {
        question: 'What is SABO and who runs it?',
        answer:
          'The South African Biology Olympiad (SABO) is organised by SAASTA (South African Agency for Science and Technology Advancement). Grade 11-12 learners sit a March-April screening exam, the top ~20 attend a June training camp, and the top 4 represent South Africa at the IBO.',
      },
      {
        question: 'Is SABO coaching available in ZAR?',
        answer:
          'Pricing is USD-referenced and ZAR auto-displayed for South African visitors. Complete Olympiad Year is approximately R82,000 equivalent; 1:1 Elite Mentoring is approximately R1,650 per hour; Small-Batch Weekend is approximately R910 per hour.',
      },
      {
        question: 'Can South African students still qualify if they miss the school screening?',
        answer:
          "SABO uses school-administered screening, so direct registration must be through the student's school via SAASTA. We recommend students confirm enrolment with their biology teacher. For students outside the formal route, we also prepare learners for UK BBO and IBO open tracks where permissible.",
      },
      {
        question: 'Which textbooks work best alongside the CAPS syllabus?',
        answer:
          'The CAPS Life Sciences curriculum forms the foundation but is not sufficient for SABO. Campbell Biology (11th-12th edition) is the primary olympiad reference. We also use Raven Biology for genetics and Taylor for ecology. Past papers from 2015 onwards are essential.',
      },
    ],
  },
  {
    slug: 'nigeria',
    country: 'Nigeria',
    iso: 'NG',
    acronym: 'NBO',
    fullName: 'Nigerian Biology Olympiad',
    flag: '🇳🇬',
    locale: 'en-NG',
    organisedBy: 'Nigerian Mathematical Centre / Science Teachers Association of Nigeria',
    examWindow: 'March screening, May camp',
    pitch: 'Biology Olympiad coaching for Nigerian senior secondary students.',
    intro:
      'Nigeria selects its IBO team through a national biology olympiad administered by the Nigerian Mathematical Centre working with the Science Teachers Association of Nigeria. Senior secondary students sit a March screening paper, with top performers invited to a May training camp. Our online programme follows Campbell Biology and tailors past-paper practice to West-African-standard syllabi overlap.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'March, school-level paper' },
      { stage: 'Round 2', name: 'Training camp', note: 'May, top ~20' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent Nigeria at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['USD', 'GBP', 'EUR', 'INR', 'AED', 'ZAR'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'UK (BBO)', href: '/bbo-preparation' },
    ],
    faqs: [
      {
        question: 'How is the Nigerian Biology Olympiad structured?',
        answer:
          'Senior secondary students sit a March screening exam administered through the Nigerian Mathematical Centre / STAN network. Top performers attend a May training camp, and the final four selected represent Nigeria at the July IBO.',
      },
      {
        question: "Can students outside Nigeria's top federal schools qualify?",
        answer:
          'Yes. Screening is open to any senior secondary student at a participating school. Our programme covers private, federal, and state school students — the determining factor is preparation depth, not school type.',
      },
      {
        question: 'Is WAEC Biology enough for the Nigerian olympiad?',
        answer:
          'No. WAEC provides the foundation but olympiad questions go beyond it into university-level cell biology, genetics, and biostatistics. Campbell Biology (11th-12th edition) plus past-paper practice is required. Our programme bridges the WAEC-to-olympiad gap in 6-9 months.',
      },
      {
        question: 'What does coaching cost in Nigerian naira or USD?',
        answer:
          'Pricing is USD-referenced on the pricing section below. Nigerian visitors see USD as the primary rate; NGN conversion is straightforward at current FX. Complete Olympiad Year: $4,500. 1:1 Elite Mentoring: $90/hour. Small-Batch Weekend: $50/hour.',
      },
    ],
  },
  {
    slug: 'philippines',
    country: 'Philippines',
    iso: 'PH',
    acronym: 'PBO',
    fullName: 'Philippine Biology Olympiad',
    flag: '🇵🇭',
    locale: 'en-PH',
    organisedBy: 'Philippine Society for Biochemistry and Molecular Biology / DOST-SEI',
    examWindow: 'November screening, February camp',
    pitch: 'Philippine Biology Olympiad coaching for senior high school students.',
    intro:
      'The Philippine Biology Olympiad selects four students to represent the Philippines at the IBO each year. Coordinated by the Philippine Society for Biochemistry and Molecular Biology with support from DOST-SEI, students sit a November screening paper followed by a February training camp. Our programme follows Campbell Biology and aligns with DOST-SEI trainer expectations.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'November, registered paper' },
      { stage: 'Round 2', name: 'Training camp', note: 'February, top ~20' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent PH at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['USD', 'SGD', 'HKD', 'INR', 'AED', 'GBP'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'Singapore (SBO)', href: '/sbo-coaching' },
    ],
    faqs: [
      {
        question: 'Is the Philippine Biology Olympiad the same as the IBO?',
        answer:
          'No. The Philippine Biology Olympiad is the national selection round; the top 4 students from it represent the Philippines at the International Biology Olympiad (IBO). The national round is organised by the Philippine Society for Biochemistry and Molecular Biology with DOST-SEI coordination.',
      },
      {
        question: 'Which senior high students are eligible?',
        answer:
          'Grade 11-12 senior high school students enrolled in a Philippine school are eligible via school registration. DOST-SEI scholars and Philippine Science High School System students are the most common applicants, but any STEM-track senior high student may apply.',
      },
      {
        question: 'Is K-12 Biology enough for PH olympiad prep?',
        answer:
          'K-12 provides the foundation but the olympiad requires first-year university-level depth on molecular biology, genetics, and experimental design. Campbell Biology (11th-12th edition) is the required extension, plus at least 5 years of past-paper practice for problem patterns.',
      },
      {
        question: 'Does coaching run on Philippine time?',
        answer:
          'Yes. Live sessions are scheduled on Asia-Pacific timings (UTC+8 compatible with Manila). All sessions are recorded. 1:1 Elite Mentoring is scheduled per student preference.',
      },
    ],
  },
  {
    slug: 'malaysia',
    country: 'Malaysia',
    iso: 'MY',
    acronym: 'MBO',
    fullName: 'Malaysian Biology Olympiad',
    flag: '🇲🇾',
    locale: 'en-MY',
    organisedBy: 'Ministry of Education Malaysia / Universiti Kebangsaan Malaysia',
    examWindow: 'April screening, August camp',
    pitch: 'Malaysian Biology Olympiad coaching for upper secondary and form 6 students.',
    intro:
      'The Malaysian Biology Olympiad is organised by the Ministry of Education Malaysia with Universiti Kebangsaan Malaysia providing the academic lead. Upper secondary and Form 6 students sit an April screening paper, with top performers attending an August training camp before final team selection for the IBO. Our programme follows Campbell Biology and is fully online on Malaysian timings.',
    pathway: [
      { stage: 'Round 1', name: 'Screening exam', note: 'April, school-registered paper' },
      { stage: 'Round 2', name: 'Training camp', note: 'August, top ~20' },
      { stage: 'Finals', name: 'Team selection', note: 'Top 4 represent Malaysia at IBO' },
      { stage: 'IBO', name: 'International finals', note: 'July' },
    ],
    currencyOrder: ['MYR', 'SGD', 'USD', 'HKD', 'INR', 'GBP'],
    relatedLinks: [
      { label: 'All Olympiads', href: '/biology-olympiads' },
      { label: 'IBO (finals)', href: '/ibo-preparation' },
      { label: 'Singapore (SBO)', href: '/sbo-coaching' },
    ],
    faqs: [
      {
        question: 'Who administers the Malaysian Biology Olympiad?',
        answer:
          'The olympiad is administered by the Ministry of Education Malaysia with Universiti Kebangsaan Malaysia (UKM) providing academic direction. Schools register their senior-secondary and Form 6 students; the April screening exam feeds into an August training camp.',
      },
      {
        question: 'Is SPM / STPM Biology sufficient for olympiad prep?',
        answer:
          'No. SPM and STPM provide foundational coverage but olympiad questions pull from first-year university-level biology across genetics, molecular biology, and experimental analysis. Campbell Biology (11th-12th edition) plus at least 5 years of national past papers is the minimum prep.',
      },
      {
        question: 'Can Malaysian students join our Singapore SBO cohort?',
        answer:
          'We run one Asia-Pacific cohort that covers Malaysian, Singaporean, Hong Kong, and Philippine students on the same curriculum — students benefit from peer learning across markets. Country-specific past papers are layered on top of the shared core.',
      },
      {
        question: 'What does coaching cost in MYR?',
        answer:
          'Pricing is USD-referenced with MYR auto-displayed for Malaysian visitors. Complete Olympiad Year: approximately RM20,250 equivalent. 1:1 Elite Mentoring: approximately RM405 per hour. Small-Batch Weekend: approximately RM225 per hour.',
      },
    ],
  },
]

export function findCountryOlympiad(slug: string): CountryOlympiadEntry | null {
  return countryOlympiads.find((c) => c.slug === slug) ?? null
}
