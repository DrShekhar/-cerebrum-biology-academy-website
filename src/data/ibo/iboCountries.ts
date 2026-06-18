/**
 * IBO country data — drives /ibo-coaching-{country} landing pages.
 *
 * The IBO (International Biology Olympiad) is reached through each country's
 * national olympiad. These pages capture the per-country "IBO {country}
 * selection" intent that the AEO layer already cites heavily but had no
 * landing page for (only /ibo-coaching-china existed). Each page is
 * differentiated by the REAL national selection route + national olympiad +
 * time zone, and links to the matching national-olympiad coaching page.
 */

export interface IBOCountryFaq {
  question: string
  answer: string
}

export interface IBOCountry {
  slug: string
  country: string
  flag: string
  /** Short national-olympiad name, e.g. "USABO" */
  nationalOlympiad: string
  /** Full name */
  nationalOlympiadFull: string
  /** Existing coaching page for that national olympiad */
  nationalOlympiadHref: string
  /** Ordered selection ladder to the IBO team */
  selectionSteps: string[]
  timezone: string
  heroBlurb: string
  faqs: IBOCountryFaq[]
}

export const IBO_COUNTRIES: IBOCountry[] = [
  {
    slug: 'usa',
    country: 'USA',
    flag: '🇺🇸',
    nationalOlympiad: 'USABO',
    nationalOlympiadFull: 'USA Biology Olympiad',
    nationalOlympiadHref: '/usabo-coaching',
    selectionSteps: [
      'USABO Open Exam (February) — 50 MCQ, school-administered',
      'USABO Semifinal (March) — theory + free-response; top ~10% of Open advance',
      'USABO National Finals (late May) — multi-day camp at a host university; top ~20 nationally',
      'Top 4 finalists form Team USA for the International Biology Olympiad',
    ],
    timezone: 'ET / PT',
    heroBlurb:
      'In the USA, the road to the IBO runs through USABO. We coach the full ladder — Open, Semifinal and National Finals — live in your US time zone, with AIIMS-trained biology faculty and a past-paper-saturation method.',
    faqs: [
      {
        question: 'How does a US student make the IBO team?',
        answer:
          'Through USABO: the Open exam in February, the Semifinal in March (top ~10% of Open advance), then National Finals in late May. The top 4 finalists represent the USA at the International Biology Olympiad. We coach every stage.',
      },
    ],
  },
  {
    slug: 'uk',
    country: 'UK',
    flag: '🇬🇧',
    nationalOlympiad: 'BBO',
    nationalOlympiadFull: 'British Biology Olympiad',
    nationalOlympiadHref: '/bbo-preparation',
    selectionSteps: [
      'Biology Challenge (Years 9–10) — an entry-level intro round',
      'British Biology Olympiad (BBO) — two timed online papers for sixth-form students',
      'Top BBO performers invited to selection and training',
      'Top 4 form Team UK for the International Biology Olympiad',
    ],
    timezone: 'GMT / BST',
    heroBlurb:
      'In the UK, the IBO route runs through the British Biology Olympiad (BBO). We coach the BBO papers and the selection rounds live in GMT/BST, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does a UK student make the IBO team?',
        answer:
          'Through the British Biology Olympiad (BBO): strong BBO performers are invited to selection and training, and the top 4 form Team UK for the International Biology Olympiad. We coach BBO and the selection rounds.',
      },
    ],
  },
  {
    slug: 'canada',
    country: 'Canada',
    flag: '🇨🇦',
    nationalOlympiad: 'CBO',
    nationalOlympiadFull: 'Canadian Biology Olympiad',
    nationalOlympiadHref: '/cbo-coaching',
    selectionSteps: [
      'Canadian Biology Olympiad (CBO) national exam',
      'National team selection and training camp',
      'Top 4 form Team Canada for the International Biology Olympiad',
    ],
    timezone: 'ET / PT',
    heroBlurb:
      'In Canada, the IBO route runs through the Canadian Biology Olympiad (CBO). We coach the CBO and the selection process live in Canadian time zones, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does a Canadian student make the IBO team?',
        answer:
          'Through the Canadian Biology Olympiad (CBO): top performers advance to national team selection and training, and the top 4 represent Canada at the International Biology Olympiad.',
      },
    ],
  },
  {
    slug: 'singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    nationalOlympiad: 'SBO',
    nationalOlympiadFull: 'Singapore Biology Olympiad',
    nationalOlympiadHref: '/sbo-coaching',
    selectionSteps: [
      'Singapore Biology Olympiad (SBO)',
      'National team selection and training',
      'Team Singapore for the International Biology Olympiad',
    ],
    timezone: 'SGT',
    heroBlurb:
      'In Singapore, the IBO route runs through the Singapore Biology Olympiad (SBO). We coach the SBO and selection live in SGT, with AIIMS-trained biology faculty and Campbell-based depth.',
    faqs: [
      {
        question: 'How does a Singapore student make the IBO team?',
        answer:
          'Through the Singapore Biology Olympiad (SBO): top performers progress to national team selection and training for the International Biology Olympiad. We coach SBO and the selection stages.',
      },
    ],
  },
  {
    slug: 'australia',
    country: 'Australia',
    flag: '🇦🇺',
    nationalOlympiad: 'ABO',
    nationalOlympiadFull: 'Australian Biology Olympiad',
    nationalOlympiadHref: '/abo-biology-olympiad-coaching',
    selectionSteps: [
      'Australian Biology Olympiad (ABO) exam — via Australian Science Innovations',
      'Summer School selection for top performers',
      'Top 4 form Team Australia for the International Biology Olympiad',
    ],
    timezone: 'AEST',
    heroBlurb:
      'In Australia, the IBO route runs through the Australian Biology Olympiad (ABO). We coach the ABO and the summer-school selection live in AEST, with AIIMS-trained biology faculty.',
    faqs: [
      {
        question: 'How does an Australian student make the IBO team?',
        answer:
          'Through the Australian Biology Olympiad (ABO, run by Australian Science Innovations): top performers are invited to the Summer School selection, and the top 4 form Team Australia for the International Biology Olympiad.',
      },
    ],
  },
]

export const IBO_COUNTRY_BY_SLUG: Record<string, IBOCountry> = Object.fromEntries(
  IBO_COUNTRIES.map((c) => [c.slug, c])
)
