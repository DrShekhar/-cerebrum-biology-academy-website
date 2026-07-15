/**
 * Country-level IB Biology tutor hubs — /ib-biology-tutor-{slug}.
 *
 * IB Biology coverage was previously only city-level (/ib-biology/[city]) and
 * school-level (/ib-biology-tutor-{school}). A searcher on the COUNTRY query
 * ("IB Biology tutor UAE / Switzerland / Singapore / UK / USA") landed on a
 * single city page rather than a hub with real topical authority. These hubs
 * aggregate the existing city + school pages for a country — pure curation, no
 * fabricated content — and link down to them for internal-link authority.
 */
import { cities, type CityConfig } from '@/data/ib-biology/cities'
import { ibBiologySchools, type IBBiologySchool } from '@/data/ib-biology/schools'

export interface IBCountryHub {
  /** Route suffix — full route is /ib-biology-tutor-{slug} */
  slug: string
  countryCode: string
  countryName: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroTagline: string
  heroSubtitle: string
  faqs: { question: string; answer: string }[]
}

export const IB_COUNTRY_HUBS: IBCountryHub[] = [
  {
    slug: 'uk',
    countryCode: 'GB',
    countryName: 'the United Kingdom',
    metaTitle: 'IB Biology Tutor UK | HL & SL, 2025 Syllabus | Cerebrum Biology Academy',
    metaDescription:
      'IB Biology tutoring across the UK — HL & SL, 2025 syllabus, Internal Assessment supervision, and Paper 1 + Paper 2 technique. Live sessions aligned to UK school timetables. Covering IB World Schools in London and beyond.',
    keywords: [
      'IB Biology tutor UK',
      'IB Biology tutor London',
      'IB Biology HL tutor UK',
      'IB Biology SL tutor UK',
      'IB Biology tutor England',
    ],
    heroTagline: 'IB Biology Tutor — United Kingdom',
    heroSubtitle:
      'Examiner-informed IB Biology tutoring for students at IB World Schools across the UK — HL and SL, aligned to your school timetable, with IA supervision and exam-technique coaching.',
    faqs: [
      {
        question: 'Do you tutor IB Biology students across the UK?',
        answer:
          'Yes. We tutor IB Biology (HL and SL) online for students at IB World Schools throughout the UK, with live sessions scheduled around UK school timetables and WhatsApp support before mocks and exams.',
      },
      {
        question: 'Do you follow the 2025 IB Biology syllabus?',
        answer:
          'Yes — all our UK tutoring follows the current syllabus (first assessment May 2025): the four themes, Paper 1 (1A multiple choice + 1B data) and Paper 2, plus the individual Scientific Investigation.',
      },
    ],
  },
  {
    slug: 'usa',
    countryCode: 'US',
    countryName: 'the United States',
    metaTitle: 'IB Biology Tutor USA | HL & SL, 2025 Syllabus | Cerebrum Biology Academy',
    metaDescription:
      'IB Biology tutoring across the USA — HL & SL, 2025 syllabus, Internal Assessment supervision, and Paper 1 + Paper 2 strategy. Online sessions across US time zones for students at IB World Schools nationwide.',
    keywords: [
      'IB Biology tutor USA',
      'IB Biology tutor America',
      'IB Biology HL tutor USA',
      'IB Biology SL tutor USA',
      'online IB Biology tutor US',
    ],
    heroTagline: 'IB Biology Tutor — United States',
    heroSubtitle:
      'IB Biology tutoring (HL and SL) for students at IB World Schools across the USA — scheduled across US time zones, with IA supervision and Paper 1 + Paper 2 exam strategy.',
    faqs: [
      {
        question: 'Do you tutor IB Biology across US time zones?',
        answer:
          'Yes. We schedule live IB Biology sessions across Eastern, Central, Mountain, and Pacific time zones, and provide asynchronous support so US students are never limited by geography.',
      },
      {
        question: 'Is your tutoring on the 2025 IB Biology syllabus?',
        answer:
          'Yes — the current syllabus (first assessment May 2025): four themes, Paper 1 (1A + 1B) and Paper 2, and the Scientific Investigation. We do not teach the retired Options or Paper 3.',
      },
    ],
  },
  {
    slug: 'uae',
    countryCode: 'AE',
    countryName: 'the UAE',
    metaTitle: 'IB Biology Tutor UAE | Dubai & Abu Dhabi, HL & SL | Cerebrum Biology Academy',
    metaDescription:
      'IB Biology tutoring across the UAE — HL & SL, 2025 syllabus, IA supervision, Paper 1 + Paper 2 technique. Live sessions on Gulf Standard Time for students at IB World Schools in Dubai, Abu Dhabi and beyond.',
    keywords: [
      'IB Biology tutor UAE',
      'IB Biology tutor Dubai',
      'IB Biology tutor Abu Dhabi',
      'IB Biology HL tutor UAE',
      'IB Biology SL tutor UAE',
    ],
    heroTagline: 'IB Biology Tutor — UAE',
    heroSubtitle:
      'IB Biology tutoring (HL and SL) for students at IB World Schools across the UAE — live sessions on Gulf Standard Time, with IA supervision and exam-technique coaching for Paper 1 and Paper 2.',
    faqs: [
      {
        question: 'Do you tutor IB Biology students in Dubai and Abu Dhabi?',
        answer:
          'Yes. We tutor IB Biology (HL and SL) for students at IB World Schools across the UAE, with live sessions on Gulf Standard Time and support timed to your school’s assessment calendar.',
      },
      {
        question: 'Do you cover the 2025 IB Biology syllabus in the UAE?',
        answer:
          'Yes — the current syllabus (first assessment May 2025): the four themes, Paper 1 (1A + 1B) and Paper 2, and the Scientific Investigation IA.',
      },
    ],
  },
  {
    slug: 'singapore',
    countryCode: 'SG',
    countryName: 'Singapore',
    metaTitle: 'IB Biology Tutor Singapore | HL & SL, 2025 Syllabus | Cerebrum Biology Academy',
    metaDescription:
      'IB Biology tutoring in Singapore — HL & SL, 2025 syllabus, Internal Assessment supervision, and Paper 1 + Paper 2 technique. Live sessions on Singapore time for students at IB World Schools including UWCSEA and beyond.',
    keywords: [
      'IB Biology tutor Singapore',
      'IB Biology HL tutor Singapore',
      'IB Biology SL tutor Singapore',
      'IB Biology tuition Singapore',
    ],
    heroTagline: 'IB Biology Tutor — Singapore',
    heroSubtitle:
      'IB Biology tutoring (HL and SL) for students at Singapore’s IB World Schools — live sessions on Singapore time, with IA supervision and Paper 1 + Paper 2 exam-technique coaching.',
    faqs: [
      {
        question: 'Which IB schools in Singapore do you tutor for?',
        answer:
          'We tutor IB Biology students across Singapore’s IB World Schools. Our sessions calibrate deep classroom coverage to the exact IB Paper 2 mark scheme and support the Scientific Investigation through the DP internal-assessment cycle.',
      },
      {
        question: 'Do you follow the 2025 IB Biology syllabus?',
        answer:
          'Yes — the current syllabus (first assessment May 2025): four themes, Paper 1 (1A + 1B) and Paper 2, and the individual Scientific Investigation.',
      },
    ],
  },
  {
    slug: 'switzerland',
    countryCode: 'CH',
    countryName: 'Switzerland',
    metaTitle: 'IB Biology Tutor Switzerland | HL & SL, 2025 Syllabus | Cerebrum Biology Academy',
    metaDescription:
      'IB Biology tutoring across Switzerland — HL & SL, 2025 syllabus, IA supervision, Paper 1 + Paper 2 technique. Live sessions on Central European Time for students at IB World Schools in Geneva, Zurich and beyond.',
    keywords: [
      'IB Biology tutor Switzerland',
      'IB Biology tutor Geneva',
      'IB Biology tutor Zurich',
      'IB Biology HL tutor Switzerland',
      'IB Biology SL tutor Switzerland',
    ],
    heroTagline: 'IB Biology Tutor — Switzerland',
    heroSubtitle:
      'IB Biology tutoring (HL and SL) for students at IB World Schools across Switzerland — live sessions on Central European Time, with IA supervision and Paper 1 + Paper 2 exam-technique coaching.',
    faqs: [
      {
        question: 'Do you tutor IB Biology students across Switzerland?',
        answer:
          'Yes. We tutor IB Biology (HL and SL) for students at IB World Schools throughout Switzerland — including Geneva and Zurich — with live sessions on Central European Time.',
      },
      {
        question: 'Is your tutoring on the 2025 IB Biology syllabus?',
        answer:
          'Yes — the current syllabus (first assessment May 2025): the four themes, Paper 1 (1A + 1B) and Paper 2, and the Scientific Investigation IA.',
      },
    ],
  },
]

export function getCountryHub(slug: string): IBCountryHub | undefined {
  return IB_COUNTRY_HUBS.find((h) => h.slug === slug)
}

/** Existing /ib-biology/[city] pages for a country. */
export function citiesForCountry(countryCode: string): CityConfig[] {
  return Object.values(cities).filter((c) => c.countryCode === countryCode)
}

/** Existing /ib-biology-tutor-{school} pages for a country. */
export function schoolsForCountry(countryCode: string): IBBiologySchool[] {
  return ibBiologySchools.filter((s) => s.countryCode === countryCode)
}
