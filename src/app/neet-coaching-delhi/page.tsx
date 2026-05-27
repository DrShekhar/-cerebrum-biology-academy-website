import { Metadata } from 'next'
import Link from 'next/link'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const cityData = getCityData('delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'best neet coaching in delhi',
    'best neet biology coaching delhi',
    'neet coaching delhi',
    'neet coaching delhi south extension',
    'neet coaching delhi rohini',
    'neet coaching delhi green park',
    'best biology coaching delhi',
    'aiims faculty neet delhi',
    'cerebrum biology academy delhi',
    'top neet coaching delhi 2026',
    'neet coaching south delhi',
    'neet coaching north delhi',
    'dr shekhar singh delhi',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `${BASE_URL}/neet-coaching-delhi`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  other: { 'article:modified_time': '2026-05-27' },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-delhi`,
  },
}

const delhiWa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Delhi and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings at South Extension / Rohini / Green Park or online."
  )

// LocalBusiness schema aggregating Cerebrum's 3 Delhi offline centres.
// Critical for "near me" queries — Google + AI assistants surface a
// brand with structured local presence over one with generic content.
const delhiMultiLocationSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-delhi#delhi-local',
  name: 'Cerebrum Biology Academy — Delhi',
  url: `${BASE_URL}/neet-coaching-delhi`,
  description:
    "India's only biology-only specialist NEET coaching with 3 offline centres in Delhi proper (South Extension flagship, Rohini, Green Park) plus pan-India online live. AIIMS-trained faculty led by Dr. Shekhar C Singh.",
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '485',
    bestRating: '5',
    worstRating: '1',
  },
  department: [
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-delhi#south-extension',
      name: 'Cerebrum Biology Academy — South Extension (Flagship)',
      url: `${BASE_URL}/neet-coaching-south-extension`,
      telephone: '+91-88264-44334',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'South Extension Part II',
        addressLocality: 'South Extension',
        addressRegion: 'Delhi',
        postalCode: '110049',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 28.5694, longitude: 77.2256 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Sunday',
          opens: '10:00',
          closes: '18:00',
        },
      ],
      areaServed: ['South Delhi', 'Greater Kailash', 'Lajpat Nagar', 'Hauz Khas', 'Vasant Vihar'],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-delhi#rohini',
      name: 'Cerebrum Biology Academy — Rohini',
      url: `${BASE_URL}/neet-coaching-rohini`,
      telephone: '+91-88264-44334',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rohini Sector 3',
        addressLocality: 'Rohini',
        addressRegion: 'Delhi',
        postalCode: '110085',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 28.7335, longitude: 77.1196 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      areaServed: ['Rohini', 'Pitampura', 'North Delhi', 'Kohat Enclave', 'Shalimar Bagh'],
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://cerebrumbiologyacademy.com/neet-coaching-delhi#green-park',
      name: 'Cerebrum Biology Academy — Green Park',
      url: `${BASE_URL}/neet-coaching-delhi`,
      telephone: '+91-88264-44334',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Green Park',
        addressLocality: 'Green Park',
        addressRegion: 'Delhi',
        postalCode: '110016',
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 28.5586, longitude: 77.2069 },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      areaServed: ['Green Park', 'Hauz Khas', 'R.K. Puram', 'Vasant Vihar', 'Safdarjung Enclave'],
    },
  ],
}

export const revalidate = 86400

export default function NEETCoachingDelhiPage() {
  return (
    <>
      <DelhiAreaSchema
        pageSlug="neet-coaching-delhi"
        serviceName="Best NEET Biology Coaching in Delhi"
        description="India's only biology-only specialist NEET coaching in Delhi. 3 offline centres + online live classes. AIIMS-trained faculty led by Dr. Shekhar C Singh."
      />
      <LocalBusinessSchema />
      <NEETSchemaStack
        pageUrl={`${BASE_URL}/neet-coaching-delhi`}
        pageName="Best NEET Biology Coaching in Delhi"
        personKnowsAbout={[
          'NEET Coaching Delhi',
          'Best NEET Coaching Delhi',
          'NEET Biology Coaching Delhi',
          'AIIMS-Trained NEET Faculty Delhi',
          'NEET Coaching Delhi Feeder Schools (DPS RK Puram, Sanskriti, Modern, Springdales, Sardar Patel, Vasant Valley, Mother’s International, Shri Ram, Apeejay)',
          'NEET Coaching South Delhi / North Delhi / East Delhi / West Delhi',
          'NEET Coaching Dwarka, Mayur Vihar, Karol Bagh, Connaught Place',
          'Cerebrum Biology Academy 3 Delhi Centres',
        ]}
        courseName="Best NEET Biology Coaching in Delhi — Programme"
        courseDescription="Biology-only specialist NEET coaching for Delhi aspirants across 3 offline centres (South Extension flagship, Rohini, Green Park) plus pan-India online live. AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student batches, Pursuit/Ascent/Pinnacle tiers ₹40K-₹1.56L/year. 680+ medical college selections, 98% NEET-UG qualification rate."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(delhiMultiLocationSchema) }}
      />

      {/* Strategic content block above CityHubPage — surfaces feeder
          schools, locality coverage, and competitive positioning that
          CityHubPage delegate alone doesn't surface prominently. */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white">
        <div className="mx-auto max-w-5xl px-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-slate-900 mb-6">
            India&apos;s Only Biology-Only NEET Specialist · 3 Delhi Centres
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Best NEET Biology Coaching in Delhi
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Cerebrum Biology Academy operates 3 offline centres across Delhi proper — South
            Extension Part II (flagship), Rohini, and Green Park — plus pan-India online live
            classes with the same AIIMS-trained faculty. Led by Dr. Shekhar C Singh (AIIMS Delhi
            alumnus, 2014 founder), with 680+ medical college selections, 98% NEET-UG qualification
            rate, and 15-20 student batches across Pursuit / Ascent / Pinnacle tiers
            (₹40K-₹1.56L/year).
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={delhiWa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold"
            >
              Call +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Delhi NEET coaching — why families choose Cerebrum over the largest national NEET chains / other IIT-JEE-first coachings /
            other online-only platforms
          </h2>
          <p>
            Delhi NEET aspirants have several generalist NEET coaching options — the largest national NEET chain (Kalu Sarai /
            Punjabi Bagh), the 2nd-largest national NEET chain (multiple centres), other IIT-JEE-first coachings (Punjabi Bagh / South Ex),
            other online-only platforms (online), other Kota-origin chains, other Kota-origin chains. These chains run combined Physics +
            Chemistry + Biology batches of 200-400 students with rotating subject faculty. Cerebrum
            is structurally different: the only NEET coaching institute in India built exclusively
            around biology — the highest-scoring NEET subject at 360/720 marks (50% of total). 15-20
            student batches, AIIMS-trained faculty continuity year-over-year, half the cost of Kota
            relocation. Most Cerebrum Delhi students pair Cerebrum biology with other online-only platforms or
            other multi-subject tutoring platforms for Physics + Chemistry — total stack ₹70K-₹1.1L vs the largest national NEET chain full PCB at ₹1.5L+ and
            Kota relocation at ₹2L-₹2.5L all-in.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Delhi feeder schools we serve
          </h2>
          <p>Cerebrum Delhi cohort spans 20+ feeder schools across the city:</p>
          <ul>
            <li>
              <strong>South Delhi / Diplomatic Enclave</strong> — DPS RK Puram, Modern School
              Barakhamba, Sanskriti School, Mother&apos;s International School, Vasant Valley
              School, Sardar Patel Vidyalaya, Springdales School (Pusa Road + Dhaula Kuan), Apeejay
              School South Extension, The Shri Ram School (Vasant Vihar), DPS Mathura Road, Tagore
              International School (Vasant Vihar / East of Kailash)
            </li>
            <li>
              <strong>North / West Delhi</strong> — DPS Rohini, Bal Bharati Public School (Rohini /
              Pitampura), Modern Public School Sector 17 Rohini, Mt. Abu Public School, Maharaja
              Agrasen Model School, Mata Jai Kaur Public School
            </li>
            <li>
              <strong>East Delhi</strong> — DPS Mayur Vihar, Vasant Public School (Patparganj),
              Modern Public School (Shalimar Bagh / Patparganj), Father Agnel School, ASN Senior
              Secondary
            </li>
            <li>
              <strong>West Delhi / Dwarka</strong> — DPS Dwarka, ITL Public School Dwarka, Mount
              Carmel School Dwarka, Bhatnagar International School, Indraprastha Public School
              Dwarka, ND DAV Public School Janakpuri, Bal Bharati Janakpuri
            </li>
            <li>
              <strong>Central Delhi (Karol Bagh / Connaught Place catchment)</strong> — Springdales
              Pusa Road, Punjab Public School, St. Columba&apos;s School, Convent of Jesus and Mary,
              Bal Bhavan Public School, Sri Sathya Sai Vidya Vihar
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Delhi NCR locality coverage
          </h2>
          <p>
            Cerebrum operates 3 offline centres in Delhi proper — South Extension Part II (flagship,
            full Pinnacle 1:1 Dr. Shekhar access), Rohini (West/North Delhi catchment), and Green
            Park (South Delhi catchment near Hauz Khas / Vasant Vihar / R.K. Puram). For families
            outside the 30-minute commute radius of these offline centres, pan-India online live
            batches serve all Delhi catchments — Dwarka, Mayur Vihar, Karol Bagh, Connaught Place,
            Janakpuri, Mehrauli, Najafgarh, Patparganj, Saket, Greater Kailash, CR Park, Malviya
            Nagar, Lajpat Nagar, Hauz Khas, Vasant Kunj, RK Puram, Vasant Vihar, Defence Colony, New
            Friends Colony, Mayur Vihar Phase 1/2/3.
          </p>
          <p>
            Plus separate canonical NCR hubs for Gurugram (DLF / Sushant Lok / Sohna Road / Cyber
            City catchments), Noida (Sector 18 / 62 / 15 / Indirapuram), Faridabad (Sector 21 / 28 /
            NIT / Old Faridabad), Ghaziabad (Indirapuram / Vaishali / Vasundhara / Raj Nagar), and
            Greater Noida (Knowledge Park / Pari Chowk).
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Quick links — Delhi NCR programmes
          </h2>
          <ul>
            <li>
              <Link href="/neet-coaching-south-delhi" className="text-blue-600 hover:underline">
                NEET Coaching South Delhi (Greater Kailash / Lajpat Nagar / Hauz Khas / CR Park)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-north-delhi" className="text-blue-600 hover:underline">
                NEET Coaching North Delhi (Civil Lines / Model Town / Pitampura)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-east-delhi" className="text-blue-600 hover:underline">
                NEET Coaching East Delhi (Mayur Vihar / Preet Vihar / Patparganj / Laxmi Nagar)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-west-delhi" className="text-blue-600 hover:underline">
                NEET Coaching West Delhi (Janakpuri / Dwarka / Rajouri Garden / Punjabi Bagh)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-rohini" className="text-blue-600 hover:underline">
                NEET Coaching Rohini (Sector 3-24 / Pitampura)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-south-extension" className="text-blue-600 hover:underline">
                NEET Coaching South Extension (Flagship centre)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-dwarka" className="text-blue-600 hover:underline">
                NEET Coaching Dwarka (Sector 8-21 / DPS Dwarka catchment)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-mayur-vihar" className="text-blue-600 hover:underline">
                NEET Coaching Mayur Vihar (Phase 1-3 / DPS Mayur Vihar)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-karol-bagh" className="text-blue-600 hover:underline">
                NEET Coaching Karol Bagh (Pusa Road / Patel Nagar / Rajinder Nagar)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-connaught-place" className="text-blue-600 hover:underline">
                NEET Coaching Connaught Place (Central Delhi / Lutyens belt)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-gurugram" className="text-blue-600 hover:underline">
                NEET Coaching Gurugram (DLF / Sushant Lok / Sohna Road)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-noida" className="text-blue-600 hover:underline">
                NEET Coaching Noida (Sector 18-62 / Indirapuram-adjacent)
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-faridabad" className="text-blue-600 hover:underline">
                NEET Coaching Faridabad
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-ghaziabad" className="text-blue-600 hover:underline">
                NEET Coaching Ghaziabad (Indirapuram / Vaishali / Crossing Republik)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Explore Other Programmes in Delhi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <Link href="/ib-biology/delhi-ncr" className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">IB Biology Delhi</span>
            </Link>
            <Link href="/ap-biology-tutor-delhi-ncr" className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">AP Biology Delhi</span>
            </Link>
            <Link href="/nseb-coaching" className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">NSEB Olympiad</span>
            </Link>
            <Link href="/biology-olympiads/india/delhi" className="block p-3 rounded-lg border border-slate-200 hover:border-green-400 hover:shadow text-center transition">
              <span className="font-medium text-slate-900 text-sm">Biology Olympiad Delhi</span>
            </Link>
          </div>
        </div>
      </section>

      <CityHubPage data={cityData} />
      <StickyMobileCTABar waUrl={delhiWa} />
    </>
  )
}
