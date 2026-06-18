/**
 * Brain Bee US-city data — drives /brain-bee-coaching/[city] pages.
 *
 * Each entry carries REAL local detail (named competitive high schools,
 * real neuroscience universities/medical schools in the metro, time zone)
 * so every city page is genuinely differentiated — index-safe, not a
 * doorway clone (the USABO city-page model, NOT the noindexed dropper one).
 *
 * Honesty notes:
 *  - `neuroHubs` are real neuroscience institutions in/near the metro; we
 *    describe them as neuroscience hubs, NOT as official Brain Bee chapter
 *    organisers (chapter hosts vary year to year and aren't verified per city).
 *  - `schools` are well-known academically competitive high schools; copy
 *    frames them as where strong science-competition students come from, NOT
 *    as a claim that Cerebrum has coached them (this is a new offering).
 */

export interface BrainBeeCityFaq {
  question: string
  answer: string
}

export interface BrainBeeCity {
  slug: string
  cityName: string
  region: string
  timezone: string
  neuroHubs: string
  schools: string[]
  heroBlurb: string
  faqs: BrainBeeCityFaq[]
}

export const BRAIN_BEE_CITIES: BrainBeeCity[] = [
  {
    slug: 'new-york',
    cityName: 'New York City & Long Island',
    region: 'New York / New Jersey metro',
    timezone: 'ET (Eastern)',
    neuroHubs: 'Columbia, NYU, Weill Cornell and Mount Sinai',
    schools: [
      'Stuyvesant',
      'Bronx Science',
      'Hunter College HS',
      'Brooklyn Tech',
      'Jericho',
      'Great Neck',
    ],
    heroBlurb:
      'The NYC and Long Island corridor fields some of the most competitive science students in the country. We coach Brain Bee contenders here on a schedule that fits a demanding magnet-school + AP load.',
    faqs: [
      {
        question: 'Which New York students is this for?',
        answer:
          'Students across NYC and Long Island — including those at Stuyvesant, Bronx Science, Hunter College HS, Brooklyn Tech, Jericho and Great Neck — who want to place at a local Brain Bee chapter and advance toward the USA National Championship.',
      },
      {
        question: 'Do you teach in Eastern Time?',
        answer:
          'Yes — all live classes run in ET, scheduled around the school day. New York sits close to several major neuroscience hubs (Columbia, NYU, Weill Cornell, Mount Sinai), which makes neuroscience a natural extension subject for strong NYC biology students.',
      },
    ],
  },
  {
    slug: 'bay-area',
    cityName: 'San Francisco Bay Area',
    region: 'Northern California',
    timezone: 'PT (Pacific)',
    neuroHubs: 'Stanford, UC Berkeley and UCSF',
    schools: ['Lowell', 'Mission San Jose', 'Henry M. Gunn', 'The Harker School', 'Monta Vista'],
    heroBlurb:
      'The Bay Area’s science-magnet culture and proximity to Stanford, Berkeley and UCSF make it one of the strongest Brain Bee feeder regions. We coach contenders here in Pacific Time.',
    faqs: [
      {
        question: 'Which Bay Area students is this for?',
        answer:
          'Students from Lowell, Mission San Jose, Gunn, The Harker School, Monta Vista and similar Bay Area schools aiming to win a local Brain Bee chapter and progress to nationals.',
      },
      {
        question: 'What time do classes run?',
        answer:
          'Live in Pacific Time, scheduled around school. The region’s neuroscience depth (Stanford, UC Berkeley, UCSF) means many strong biology students naturally gravitate to neuroscience competition.',
      },
    ],
  },
  {
    slug: 'boston',
    cityName: 'Greater Boston',
    region: 'Massachusetts',
    timezone: 'ET (Eastern)',
    neuroHubs: 'Harvard, MIT and Boston University',
    schools: ['Boston Latin', 'Phillips Academy Andover', 'Lexington', 'Acton-Boxborough'],
    heroBlurb:
      'Greater Boston’s dense academic ecosystem — Harvard, MIT, BU — makes it a natural Brain Bee stronghold. We coach contenders here in Eastern Time.',
    faqs: [
      {
        question: 'Which Boston students is this for?',
        answer:
          'Students from Boston Latin, Phillips Academy Andover, Lexington, Acton-Boxborough and similar schools who want to place at a local Brain Bee and advance toward the USA National Championship.',
      },
    ],
  },
  {
    slug: 'houston',
    cityName: 'Houston',
    region: 'Texas (Gulf Coast)',
    timezone: 'CT (Central)',
    neuroHubs: 'Baylor College of Medicine and Rice University',
    schools: ['DeBakey HS for Health Professions', 'Carnegie Vanguard', 'Bellaire'],
    heroBlurb:
      'Houston’s health-professions magnet pipeline — anchored by the Texas Medical Center — produces strong pre-med and neuroscience-curious students. We coach Brain Bee contenders here in Central Time.',
    faqs: [
      {
        question: 'Which Houston students is this for?',
        answer:
          'Students from DeBakey HS for Health Professions, Carnegie Vanguard, Bellaire and similar schools — especially health-track students — aiming for a local Brain Bee chapter and nationals.',
      },
    ],
  },
  {
    slug: 'dallas-austin',
    cityName: 'Dallas & Austin',
    region: 'Texas',
    timezone: 'CT (Central)',
    neuroHubs: 'UT Southwestern and UT Austin',
    schools: ['TAG Magnet (Dallas)', 'Liberal Arts & Science Academy / LASA (Austin)', 'Westwood'],
    heroBlurb:
      'The Dallas–Austin corridor pairs strong magnet schools with major research universities (UT Southwestern, UT Austin). We coach Brain Bee contenders across both metros in Central Time.',
    faqs: [
      {
        question: 'Which Texas students is this for?',
        answer:
          'Students from TAG Magnet in Dallas, LASA in Austin, Westwood and similar schools aiming to win a local Brain Bee chapter and advance to the USA National Championship.',
      },
    ],
  },
  {
    slug: 'chicago',
    cityName: 'Chicago',
    region: 'Illinois',
    timezone: 'CT (Central)',
    neuroHubs: 'Northwestern and the University of Chicago',
    schools: ['Walter Payton', 'Northside College Prep', 'Illinois Math & Science Academy (IMSA)'],
    heroBlurb:
      'Chicago’s selective-enrollment and IMSA pipeline, alongside Northwestern and UChicago, makes it a strong Brain Bee region. We coach contenders here in Central Time.',
    faqs: [
      {
        question: 'Which Chicago students is this for?',
        answer:
          'Students from Walter Payton, Northside College Prep, IMSA and similar schools who want to place at a local Brain Bee chapter and progress toward nationals.',
      },
    ],
  },
  {
    slug: 'los-angeles',
    cityName: 'Greater Los Angeles',
    region: 'Southern California',
    timezone: 'PT (Pacific)',
    neuroHubs: 'UCLA and USC',
    schools: ['Harvard-Westlake', 'Gretchen Whitney', 'Arcadia', 'Troy (Fullerton)'],
    heroBlurb:
      'Greater LA’s competitive private and magnet schools, near UCLA and USC, feed a strong neuroscience-competition cohort. We coach Brain Bee contenders here in Pacific Time.',
    faqs: [
      {
        question: 'Which Los Angeles students is this for?',
        answer:
          'Students from Harvard-Westlake, Gretchen Whitney, Arcadia, Troy and similar schools aiming for a local Brain Bee chapter and the USA National Championship.',
      },
    ],
  },
  {
    slug: 'philadelphia',
    cityName: 'Philadelphia',
    region: 'Pennsylvania',
    timezone: 'ET (Eastern)',
    neuroHubs: 'the University of Pennsylvania and CHOP',
    schools: ['Julia R. Masterman', 'Central HS', 'Lower Merion'],
    heroBlurb:
      'Philadelphia’s magnet schools sit beside Penn and CHOP — a deep neuroscience and clinical-research base. We coach Brain Bee contenders here in Eastern Time.',
    faqs: [
      {
        question: 'Which Philadelphia students is this for?',
        answer:
          'Students from Masterman, Central HS, Lower Merion and similar schools who want to win a local Brain Bee chapter and advance toward nationals.',
      },
    ],
  },
  {
    slug: 'northern-virginia-dc',
    cityName: 'Northern Virginia & Washington DC',
    region: 'Virginia · Maryland · DC',
    timezone: 'ET (Eastern)',
    neuroHubs: 'Georgetown, the NIH (Bethesda) and Johns Hopkins (Baltimore)',
    schools: ['Thomas Jefferson HS for Science & Technology (TJHSST)', 'Langley', 'McLean'],
    heroBlurb:
      'The DC metro — home to TJHSST, the NIH and Johns Hopkins nearby — is one of the strongest STEM-competition regions in the US. We coach Brain Bee contenders here in Eastern Time.',
    faqs: [
      {
        question: 'Which DC-area students is this for?',
        answer:
          'Students from Thomas Jefferson (TJHSST), Langley, McLean and similar Northern Virginia / DC / Maryland schools aiming for a local Brain Bee chapter and the USA National Championship.',
      },
    ],
  },
  {
    slug: 'atlanta',
    cityName: 'Atlanta',
    region: 'Georgia',
    timezone: 'ET (Eastern)',
    neuroHubs: 'Emory and Georgia State',
    schools: ['Walton', 'Northview', 'Gwinnett School of Mathematics, Science & Technology'],
    heroBlurb:
      'Atlanta is a live Brain Bee market — the 2025 USA Brain Bee national champion was an Atlanta-area teen. With Emory and Georgia State nearby, the region has real neuroscience depth. We coach contenders here in Eastern Time.',
    faqs: [
      {
        question: 'Which Atlanta students is this for?',
        answer:
          'Students from Walton, Northview, Gwinnett School of Mathematics, Science & Technology and similar schools who want to place at a local Brain Bee chapter and advance toward nationals.',
      },
    ],
  },
]

export const BRAIN_BEE_CITY_BY_SLUG: Record<string, BrainBeeCity> = Object.fromEntries(
  BRAIN_BEE_CITIES.map((c) => [c.slug, c])
)
