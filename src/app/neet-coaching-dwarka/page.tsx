/**
 * /neet-coaching-dwarka
 *
 * Delhi locality NEET coaching page — Dwarka. Closes a coverage gap in
 * the Delhi NCR cluster (~200 pages) where this catchment had zero
 * dedicated landing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-dwarka'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dwarka | Cerebrum Biology Academy',
  description:
    'Best NEET Coaching in Dwarka — biology-only specialist NEET coaching for Dwarka (Delhi) families. AIIMS-trained faculty, 15-20 student batches, ₹40K-₹1.56L/year. Nearest Cerebrum centre: Green Park (Hauz Khas catchment) — ~30 minutes via Blue Line + Yellow Line, or online live.',
  keywords: [
    'neet coaching dwarka',
    'best neet coaching dwarka',
    'neet biology coaching dwarka',
    'neet coaching dwarka delhi',
    'aiims trained neet faculty dwarka',
    'cerebrum biology dwarka',
    'neet 2027 coaching dwarka',
  ],
  other: { 'article:modified_time': '2026-05-25' },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best NEET Coaching in Dwarka | Cerebrum Biology Academy',
    description:
      'NEET Biology coaching for Dwarka families. AIIMS-trained faculty, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Coaching in Dwarka | Cerebrum Biology Academy',
    description:
      'Best NEET Coaching in Dwarka — biology-only specialist NEET coaching for Dwarka (Delhi) families. AIIMS-trained faculty, 15-20 student batches, ₹40K-₹1.56L/year. Nearest Cerebrum centre: Green Park...',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Dwarka (Delhi) and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings."
  )

const faqs = [
  {
    question: 'Which is the best NEET coaching for Dwarka students?',
    answer:
      'Cerebrum Biology Academy is widely cited as the best NEET coaching option for Dwarka families. Cerebrum is the only NEET coaching institute in India built exclusively around biology — the highest-scoring NEET subject at 360 marks (50%% of total). 15-20 student batches with AIIMS-trained faculty led by Dr. Shekhar C Singh, 680+ medical college selections, 98%% NEET-UG qualification rate. Nearest offline centre: Green Park (Hauz Khas catchment) — ~30 minutes via Blue Line + Yellow Line, or online live. Online live batches available for Dwarka students who prefer to skip commute.',
  },
  {
    question: 'How do I get to a Cerebrum centre from Dwarka?',
    answer:
      'Dwarka families typically use Blue Line (Dwarka Sec 9/10/11/12/13/14/21), Magenta Line (Janakpuri West) to reach the nearest Cerebrum centre. Green Park (Hauz Khas catchment) — ~30 minutes via Blue Line + Yellow Line, or online live. Most Dwarka students choose online live batches to skip the commute entirely — same AIIMS-trained faculty, same biology-only specialist pedagogy, no train/auto-rickshaw time.',
  },
  {
    question: 'Which Dwarka schools send students to Cerebrum?',
    answer:
      'Common Dwarka feeder schools across the Cerebrum cohort: DPS Dwarka (Sector 3 + Sector 19), ITL Public School (Sector 9), Mount Carmel School Dwarka, Bhatnagar International School (Sector 12), Indraprastha Public School Dwarka, Maxfort School Dwarka, Sri Venkateshwar International School (Sector 18), Sapphire International School, K.R. Mangalam World School Vikaspuri. Students from these schools join Pursuit (small-batch 30-40, ₹40K-75K), Ascent (pro batch 16-25 with weekly 1:1 doubt slots, ₹58K-90K), or Pinnacle (direct Dr. Shekhar 1:1 micro-batch 10-12, ₹1.2L-1.56L) depending on target NEET rank.',
  },
  {
    question: 'How does Cerebrum compare to Aakash and Allen / FIITJEE for Dwarka students?',
    answer:
      'Aakash and Allen / FIITJEE Delhi run combined Physics + Chemistry + Biology batches of 200-400 students with rotating subject faculty (typically ₹1.4L-1.6L/year). Cerebrum is biology-only with 15-20 student batches and continuous AIIMS-trained faculty (₹40K-1.56L/year biology-only). Most strategic Dwarka pattern: Cerebrum biology + PhysicsWallah and Unacademy / other multi-subject tutoring platforms / PhysicsWallah and Unacademy for PC = total ₹70K-1.1L with materially deeper biology pedagogy than full-Aakash at half the all-in cost.',
  },
  {
    question: 'What does Cerebrum NEET coaching cost in Dwarka?',
    answer:
      'Cerebrum NEET Biology pricing applies pan-Delhi (online or any centre): Pursuit (small-batch 30-40, ₹40K-75K), Ascent (pro batch 16-25 with weekly 1:1 doubt slots, ₹58K-90K), Pinnacle (direct Dr. Shekhar 1:1 micro-batch 10-12, ₹1.2L-1.56L). Ad-hoc 1:1 hourly is ₹2,500-4,500/hour. Compared to Kota relocation at ₹2L-2.5L all-in (tuition + hostel + mess + travel), Cerebrum Pinnacle at ₹1.5L total is half the cost without relocation stress.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Best NEET Coaching in Dwarka — Programme',
  description:
    'NEET Biology coaching for Dwarka (Delhi) families. AIIMS-trained faculty, 15-20 student batches, NCERT line-by-line + NEET PYQ pattern drilling.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'NEET-UG Aspirant',
  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Dwarka, Delhi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dwarka',
      addressRegion: 'Delhi',
      postalCode: '110075',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 28.5921, longitude: 77.046 },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'NEET Coaching Delhi',
      item: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
    },
    { '@type': 'ListItem', position: 3, name: 'Best NEET Coaching in Dwarka', item: PAGE_URL },
  ],
}

export default function NEETCoachingDwarkaPage() {
  return (
    <main className="min-h-screen bg-white">
      <NEETSchemaStack
        pageUrl={PAGE_URL}
        pageName="Best NEET Coaching in Dwarka"
        parentHub={{
          name: 'NEET Coaching Delhi',
          url: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
        }}
        personKnowsAbout={[
          'NEET Coaching Dwarka',
          'NEET Biology Coaching Dwarka',
          'Best NEET Tutor Dwarka Delhi',
          'AIIMS-Trained NEET Faculty Dwarka',
          'NEET Coaching Dwarka Feeder Schools',
          'Cerebrum Biology Academy Dwarka',
        ]}
        courseName="Best NEET Coaching in Dwarka — Programme"
        courseDescription="Biology-only specialist NEET coaching for Dwarka (Delhi) families. AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student batches, Pursuit/Ascent/Pinnacle tier options (₹40K-₹1.56L/year). Nearest offline centre: Green Park (Hauz Khas catchment) — ~30 minutes via Blue Line + Yellow Line, or online live."
        faqs={faqs}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16">
        <div className="mx-auto max-w-5xl px-4 text-white">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-delhi" className="hover:text-white">
              NEET Coaching Delhi
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Dwarka</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-slate-900 mb-6">
            Biology-Only Specialist · 15-20 Student Batches · Dwarka Catchment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best NEET Coaching in Dwarka</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only specialist NEET coaching for Dwarka (Delhi) families. AIIMS-trained faculty
            led by Dr. Shekhar C Singh, 15-20 student batches, NCERT line-by-line + NEET PYQ pattern
            drilling. Pursuit (₹40K-75K) / Ascent (₹58K-90K) / Pinnacle (₹1.2L-1.56L). Nearest
            offline centre: Green Park (Hauz Khas catchment) — ~30 minutes via Blue Line + Yellow
            Line, or online live. Pan-India online live also available for commute-free attendance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
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
            Dwarka NEET catchment — what makes this market distinctive
          </h2>
          <p>
            Dwarka is one of Delhi's largest planned sub-cities (~200K residents, ~1,500+ annual
            NEET aspirants from CBSE-heavy feeder schools). The corridor from DPS Dwarka Sector 19
            through ITL Sector 9 to Mount Carmel forms a high-density academic catchment. Most
            families are dual-working professionals — IAS/IPS, AIIMS Delhi staff, judiciary,
            corporate executives. Cerebrum's Green Park centre is ~30 minutes via Dwarka-Delhi Metro
            Blue Line (Dwarka → Rajiv Chowk → Khan Market → Hauz Khas Green Park).
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Dwarka feeder schools we serve
          </h2>
          <p>
            DPS Dwarka (Sector 3 + Sector 19), ITL Public School (Sector 9), Mount Carmel School
            Dwarka, Bhatnagar International School (Sector 12), Indraprastha Public School Dwarka,
            Maxfort School Dwarka, Sri Venkateshwar International School (Sector 18), Sapphire
            International School, K.R. Mangalam World School Vikaspuri.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why Dwarka families choose biology-only coaching over generalist chains
          </h2>
          <p>
            Dwarka has branches of the Allen, Aakash and PW — but their Dwarka centres run 100-200+
            student batches across Physics, Chemistry, and Biology with rotating faculty. The
            structural problem: Biology is 360/720 NEET marks (50% of total), yet generalist chains
            allocate it only one-third of teaching time. Dwarka parents — many of whom are AIIMS
            Delhi staff, IAS/IPS officers, or judiciary professionals — understand this arithmetic.
            They keep the generalist chain for Physics + Chemistry and add Cerebrum for Biology
            depth. This "pair-and-specialist" model is the dominant pattern in Dwarka.
          </p>
          <p>
            The Dwarka demographic is distinctive: the sub-city was planned for government housing
            (DDA flats, AWHO, CGHS), so the parent population skews toward educated professionals
            who research coaching quality rather than defaulting to brand-name chains. This makes
            Dwarka one of Cerebrum's highest-conversion catchments in Delhi — families here evaluate
            on results, not advertising spend.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Dwarka school-by-school NEET Biology analysis
          </h2>
          <p>
            <strong>DPS Dwarka (Sector 3 + Sector 19):</strong> Two campuses, strong CBSE science
            departments. DPS Dwarka students typically have solid NCERT foundations but need the
            NEET-specific pattern drilling (assertion-reason, match-the-following, diagram-based
            MCQs) that school Biology doesn't cover. Most DPS Dwarka families book the Ascent tier
            (₹58K-90K).
          </p>
          <p>
            <strong>ITL Public School (Sector 9):</strong> Known for academic rigour. ITL students
            enter NEET prep with above-average Biology foundations. The gap is usually in Human
            Physiology and Genetics — the two highest-weightage NEET chapters. Our coaching
            emphasises these for ITL students.
          </p>
          <p>
            <strong>Mount Carmel School:</strong> Strong overall academics but Biology department is
            smaller than DPS/ITL. Mount Carmel students often need foundational reinforcement
            alongside NEET-specific coaching — the Pursuit tier (₹40K-75K) is the typical entry
            point.
          </p>
          <p>
            <strong>Government school students (Sector 8, 12, 17 KVs):</strong> Kendriya Vidyalaya
            students have NCERT-aligned teaching (advantage for NEET) but less exam-technique
            exposure. KV families are price-sensitive — the Pursuit tier with online-live delivery
            is the recommended entry point.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Commute options from Dwarka to Cerebrum centres
          </h2>
          <p>
            <strong>Sectors / localities served:</strong> Sector 8, Sector 10, Sector 11, Sector 12,
            Sector 13, Sector 14, Sector 17, Sector 19, Sector 21, Sector 22, Sector 23.
          </p>
          <p>
            <strong>Metro connectivity:</strong> Blue Line (Dwarka Sec 9/10/11/12/13/14/21), Magenta
            Line (Janakpuri West).
          </p>
          <p>
            <strong>Nearest Cerebrum centre:</strong> Green Park (Hauz Khas catchment) — ~30 minutes
            via Blue Line + Yellow Line, or online live. For Dwarka families who prefer to skip the
            commute entirely, pan-India online live batches offer the same AIIMS-trained faculty,
            same biology-only specialist pedagogy, same 15-20 student batch structure — no
            train/auto-rickshaw time, weekend-friendly slots.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Delhi NCR pages</h2>
          <ul>
            <li>
              <Link href="/neet-coaching-delhi" className="text-blue-600 hover:underline">
                NEET Coaching Delhi (main hub)
              </Link>
            </li>
            <li>
              <Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">
                Best NEET Biology Tutor (national AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/best-neet-foundation-tutor" className="text-blue-600 hover:underline">
                NEET Foundation Class 9-10 (early pathway)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Dwarka families</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg">
                  {f.question}
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Dwarka</h2>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
