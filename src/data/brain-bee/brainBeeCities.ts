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
      'Atlanta is a live Brain Bee market. With Emory and Georgia State nearby, the region has real neuroscience depth. We coach contenders here in Eastern Time.',
    faqs: [
      {
        question: 'Which Atlanta students is this for?',
        answer:
          'Students from Walton, Northview, Gwinnett School of Mathematics, Science & Technology and similar schools who want to place at a local Brain Bee chapter and advance toward nationals.',
      },
    ],
  },
  {
    slug: 'seattle',
    cityName: 'Greater Seattle',
    region: 'Washington (Puget Sound)',
    timezone: 'PT (Pacific)',
    neuroHubs: 'the Allen Institute for Brain Science, University of Washington and Fred Hutch',
    schools: ['Lakeside', 'Tesla STEM', 'Interlake', 'Newport', 'Bellevue'],
    heroBlurb:
      'Seattle is one of the strongest neuroscience cities in the world — home to the Allen Institute for Brain Science. We coach Brain Bee contenders across the Puget Sound on a schedule that fits a demanding STEM-magnet and AP load.',
    faqs: [
      {
        question: 'Which Seattle-area students is this for?',
        answer:
          'Students across Greater Seattle and the Eastside — including Lakeside, Tesla STEM, Interlake, Newport and Bellevue — aiming to place at a local Brain Bee chapter and advance toward the USA National Championship.',
      },
      {
        question: 'Do you teach in Pacific Time?',
        answer:
          'Yes — all live classes run in PT, scheduled around the school day. With the Allen Institute, UW and Fred Hutch nearby, neuroscience is a natural extension subject for strong Seattle biology students.',
      },
    ],
  },
  {
    slug: 'san-diego',
    cityName: 'San Diego',
    region: 'Southern California',
    timezone: 'PT (Pacific)',
    neuroHubs: 'UC San Diego, the Salk Institute and Scripps Research',
    schools: ['Canyon Crest Academy', 'Torrey Pines', 'Westview', 'Del Norte', 'La Jolla'],
    heroBlurb:
      'San Diego pairs elite public STEM schools with a world-class neuroscience cluster (UCSD, Salk, Scripps). We coach Brain Bee contenders here around a heavy AP and research-extracurricular schedule.',
    faqs: [
      {
        question: 'Which San Diego students is this for?',
        answer:
          'Students across San Diego County — including Canyon Crest Academy, Torrey Pines, Westview, Del Norte and La Jolla — aiming to win a local Brain Bee chapter and progress to nationals.',
      },
      {
        question: 'Do you teach in Pacific Time?',
        answer:
          'Yes — live classes run in PT around the school day. With UCSD, the Salk Institute and Scripps Research in the metro, neuroscience is a natural fit for strong San Diego biology students.',
      },
    ],
  },
  {
    slug: 'denver',
    cityName: 'Denver & Boulder',
    region: 'Colorado (Front Range)',
    timezone: 'MT (Mountain)',
    neuroHubs: 'the CU Anschutz Medical Campus and CU Boulder',
    schools: ['Cherry Creek', 'Fairview (Boulder)', 'Peak to Peak', 'DSST', 'Boulder High'],
    heroBlurb:
      'The Colorado Front Range fields strong, science-driven students from Denver to Boulder. We coach Brain Bee contenders here in Mountain Time, around a demanding AP and activities load.',
    faqs: [
      {
        question: 'Which Colorado students is this for?',
        answer:
          'Students across Denver and Boulder — including Cherry Creek, Fairview, Peak to Peak, DSST and Boulder High — aiming to place at a local Brain Bee chapter and advance toward nationals.',
      },
      {
        question: 'Do you teach in Mountain Time?',
        answer:
          'Yes — all live classes run in MT, scheduled around the school day. The CU Anschutz Medical Campus and CU Boulder make neuroscience a natural extension for strong Front Range biology students.',
      },
    ],
  },
  {
    slug: 'twin-cities',
    cityName: 'Minneapolis–St. Paul (Twin Cities)',
    region: 'Minnesota',
    timezone: 'CT (Central)',
    neuroHubs: 'the University of Minnesota and Mayo Clinic',
    schools: ['Wayzata', 'Edina', 'Eden Prairie', 'Minnetonka', 'Mounds View'],
    heroBlurb:
      'The Twin Cities have a deep bench of academically competitive suburban high schools and a strong medical-research base (U of M, Mayo Clinic). We coach Brain Bee contenders here in Central Time.',
    faqs: [
      {
        question: 'Which Twin Cities students is this for?',
        answer:
          'Students across Minneapolis–St. Paul — including Wayzata, Edina, Eden Prairie, Minnetonka and Mounds View — aiming to win a local Brain Bee chapter and progress to the national championship.',
      },
      {
        question: 'Do you teach in Central Time?',
        answer:
          'Yes — live classes run in CT around the school day. With the University of Minnesota and Mayo Clinic in the region, neuroscience is a natural extension subject for strong Twin Cities biology students.',
      },
    ],
  },
  {
    slug: 'research-triangle',
    cityName: 'Research Triangle (Raleigh–Durham)',
    region: 'North Carolina',
    timezone: 'ET (Eastern)',
    neuroHubs: 'Duke University, UNC Chapel Hill and NC State',
    schools: ['NC School of Science & Mathematics', 'Enloe', 'Green Hope', 'Panther Creek', 'Cary'],
    heroBlurb:
      'The Research Triangle is one of the densest research regions in the US, anchored by Duke, UNC and NC State. We coach Brain Bee contenders here — including NCSSM students — in Eastern Time.',
    faqs: [
      {
        question: 'Which Triangle students is this for?',
        answer:
          'Students across Raleigh–Durham–Chapel Hill — including the NC School of Science & Mathematics, Enloe, Green Hope, Panther Creek and Cary — aiming to place at a local Brain Bee chapter and advance to nationals.',
      },
      {
        question: 'Do you teach in Eastern Time?',
        answer:
          'Yes — all live classes run in ET around the school day. With Duke, UNC and NC State in the Triangle, neuroscience is a natural extension subject for strong North Carolina biology students.',
      },
    ],
  },
  {
    slug: 'phoenix',
    cityName: 'Phoenix & Scottsdale',
    region: 'Arizona',
    timezone: 'MST (Arizona, no DST)',
    neuroHubs: 'the Barrow Neurological Institute, ASU and Mayo Clinic Arizona',
    schools: ['BASIS Scottsdale', 'BASIS Chandler', 'Hamilton', 'Chandler', 'Corona del Sol'],
    heroBlurb:
      'Phoenix is home to the Barrow Neurological Institute — one of the world’s leading neuroscience centers — and a powerful BASIS charter network. We coach Brain Bee contenders here in Arizona time.',
    faqs: [
      {
        question: 'Which Phoenix-area students is this for?',
        answer:
          'Students across Phoenix, Scottsdale and Chandler — including BASIS Scottsdale, BASIS Chandler, Hamilton, Chandler and Corona del Sol — aiming to win a local Brain Bee chapter and progress to nationals.',
      },
      {
        question: 'What time zone are classes in?',
        answer:
          'Live classes run in Arizona time (MST, no daylight saving) around the school day. With the Barrow Neurological Institute, ASU and Mayo Clinic Arizona in the metro, neuroscience is a natural fit for strong Phoenix biology students.',
      },
    ],
  },
]

export const BRAIN_BEE_CITY_BY_SLUG: Record<string, BrainBeeCity> = Object.fromEntries(
  BRAIN_BEE_CITIES.map((c) => [c.slug, c])
)
