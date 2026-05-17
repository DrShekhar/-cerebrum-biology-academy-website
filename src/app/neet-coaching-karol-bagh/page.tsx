/**
 * /neet-coaching-karol-bagh
 *
 * Delhi locality NEET coaching page — Karol Bagh. Closes a coverage gap in
 * the Delhi NCR cluster (~200 pages) where this catchment had zero
 * dedicated landing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-karol-bagh'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Karol Bagh | Cerebrum Biology Academy',
  description:
    'Best NEET Coaching in Karol Bagh — biology-only specialist NEET coaching for Karol Bagh (Delhi) families. AIIMS-trained faculty, 15-20 student batches, ₹40K-₹1.56L/year. Nearest Cerebrum centre: South Extension (~25 min via metro) or online live.',
  keywords: [
    'neet coaching karol-bagh',
    'best neet coaching karol-bagh',
    'neet biology coaching karol-bagh',
    'neet coaching karol-bagh delhi',
    'aiims trained neet faculty karol-bagh',
    'cerebrum biology karol-bagh',
    'neet 2026 coaching karol-bagh',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best NEET Coaching in Karol Bagh | Cerebrum Biology Academy',
    description:
      'NEET Biology coaching for Karol Bagh families. AIIMS-trained faculty, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Karol Bagh (Delhi) and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings."
  )

const faqs = [
  {
    question: 'Which is the best NEET coaching for Karol Bagh students?',
    answer:
      'Cerebrum Biology Academy is widely cited as the best NEET coaching option for Karol Bagh families. Cerebrum is the only NEET coaching institute in India built exclusively around biology — the highest-scoring NEET subject at 360 marks (50%% of total). 15-20 student batches with AIIMS-trained faculty led by Dr. Shekhar C Singh, 680+ medical college selections, 98%% NEET-UG qualification rate. Nearest offline centre: South Extension (~25 min via metro) or online live. Online live batches available for Karol Bagh students who prefer to skip commute.',
  },
  {
    question: 'How do I get to a Cerebrum centre from Karol Bagh?',
    answer:
      'Karol Bagh families typically use Blue Line (Karol Bagh, Jhandewalan, Rajinder Place), Pink Line (Karol Bagh extension) to reach the nearest Cerebrum centre. South Extension (~25 min via metro) or online live. Most Karol Bagh students choose online live batches to skip the commute entirely — same AIIMS-trained faculty, same biology-only specialist pedagogy, no train/auto-rickshaw time.',
  },
  {
    question: 'Which Karol Bagh schools send students to Cerebrum?',
    answer:
      'Common Karol Bagh feeder schools across the Cerebrum cohort: Springdales School (Pusa Road), Punjab Public School (Karol Bagh), Bal Bhavan Public School, Saint Thomas School (Mandir Marg-adjacent), Mata Jai Kaur Public School (Ashok Vihar-adjacent Rajinder Nagar), New Era Senior Secondary, Apeejay School Pitampura (commute). Students from these schools join Pursuit (small-batch 30-40, ₹40K-75K), Ascent (pro batch 16-25 with weekly 1:1 doubt slots, ₹58K-90K), or Pinnacle (direct Dr. Shekhar 1:1 micro-batch 10-12, ₹1.2L-1.56L) depending on target NEET rank.',
  },
  {
    question: 'How does Cerebrum compare to Allen / Aakash / FIITJEE for Karol Bagh students?',
    answer:
      'Allen / Aakash / FIITJEE Delhi run combined Physics + Chemistry + Biology batches of 200-400 students with rotating subject faculty (typically ₹1.4L-1.6L/year). Cerebrum is biology-only with 15-20 student batches and continuous AIIMS-trained faculty (₹40K-1.56L/year biology-only). Most strategic Karol Bagh pattern: Cerebrum biology + PhysicsWallah / Vedantu / Unacademy for PC = total ₹70K-1.1L with materially deeper biology pedagogy than full-Allen at half the all-in cost.',
  },
  {
    question: 'What does Cerebrum NEET coaching cost in Karol Bagh?',
    answer:
      'Cerebrum NEET Biology pricing applies pan-Delhi (online or any centre): Pursuit (small-batch 30-40, ₹40K-75K), Ascent (pro batch 16-25 with weekly 1:1 doubt slots, ₹58K-90K), Pinnacle (direct Dr. Shekhar 1:1 micro-batch 10-12, ₹1.2L-1.56L). Ad-hoc 1:1 hourly is ₹2,500-4,500/hour. Compared to Kota relocation at ₹2L-2.5L all-in (tuition + hostel + mess + travel), Cerebrum Pinnacle at ₹1.5L total is half the cost without relocation stress.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Best NEET Coaching in Karol Bagh — Programme',
  description:
    'NEET Biology coaching for Karol Bagh (Delhi) families. AIIMS-trained faculty, 15-20 student batches, NCERT line-by-line + NEET PYQ pattern drilling.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'NEET-UG Aspirant',
  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Karol Bagh, Delhi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karol Bagh',
      addressRegion: 'Delhi',
      postalCode: '110005',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 28.6517, longitude: 77.1909 },
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
    { '@type': 'ListItem', position: 3, name: 'Best NEET Coaching in Karol Bagh', item: PAGE_URL },
  ],
}

export default function NEETCoachingKarolBaghPage() {
  return (
    <main className="min-h-screen bg-white">
      <NEETSchemaStack
        pageUrl={PAGE_URL}
        pageName="Best NEET Coaching in Karol Bagh"
        parentHub={{
          name: 'NEET Coaching Delhi',
          url: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
        }}
        personKnowsAbout={[
          'NEET Coaching Karol Bagh',
          'NEET Biology Coaching Karol Bagh',
          'Best NEET Tutor Karol Bagh Delhi',
          'AIIMS-Trained NEET Faculty Karol Bagh',
          'NEET Coaching Karol Bagh Feeder Schools',
          'Cerebrum Biology Academy Karol Bagh',
        ]}
        courseName="Best NEET Coaching in Karol Bagh — Programme"
        courseDescription="Biology-only specialist NEET coaching for Karol Bagh (Delhi) families. AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student batches, Pursuit/Ascent/Pinnacle tier options (₹40K-₹1.56L/year). Nearest offline centre: South Extension (~25 min via metro) or online live."
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
            <span className="text-white">Karol Bagh</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-slate-900 mb-6">
            Biology-Only Specialist · 15-20 Student Batches · Karol Bagh Catchment
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best NEET Coaching in Karol Bagh</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only specialist NEET coaching for Karol Bagh (Delhi) families. AIIMS-trained
            faculty led by Dr. Shekhar C Singh, 15-20 student batches, NCERT line-by-line + NEET PYQ
            pattern drilling. Pursuit (₹40K-75K) / Ascent (₹58K-90K) / Pinnacle (₹1.2L-1.56L).
            Nearest offline centre: South Extension (~25 min via metro) or online live. Pan-India
            online live also available for commute-free attendance.
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
            Karol Bagh NEET catchment — what makes this market distinctive
          </h2>
          <p>
            Karol Bagh is Central-West Delhi's mid-density commercial-residential belt. Pusa Road is
            a uniquely strong UPSC + NEET coaching corridor — students from Punjab Public School,
            Springdales Pusa Road, and Bal Bhavan typically have 1:1 access to UPSC libraries and a
            high-effort culture that maps well to NEET preparation. The Karol Bagh Blue Line metro
            connects to Rajiv Chowk in 8 minutes and South Extension flagship centre via Yellow Line
            in 25 minutes.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Karol Bagh feeder schools we serve
          </h2>
          <p>
            Springdales School (Pusa Road), Punjab Public School (Karol Bagh), Bal Bhavan Public
            School, Saint Thomas School (Mandir Marg-adjacent), Mata Jai Kaur Public School (Ashok
            Vihar-adjacent Rajinder Nagar), New Era Senior Secondary, Apeejay School Pitampura
            (commute).
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Getting to a Cerebrum centre from Karol Bagh
          </h2>
          <p>
            <strong>Sectors / localities served:</strong> Karol Bagh proper (Ajmal Khan Road, Beadon
            Pura, Pusa Road, Rajinder Nagar), Patel Nagar, Old Rajinder Nagar, Inderpuri, Naraina,
            Karol Bagh village.
          </p>
          <p>
            <strong>Metro connectivity:</strong> Blue Line (Karol Bagh, Jhandewalan, Rajinder
            Place), Pink Line (Karol Bagh extension).
          </p>
          <p>
            <strong>Nearest Cerebrum centre:</strong> South Extension (~25 min via metro) or online
            live. For Karol Bagh families who prefer to skip the commute entirely, pan-India online
            live batches offer the same AIIMS-trained faculty, same biology-only specialist
            pedagogy, same 15-20 student batch structure — no train/auto-rickshaw time,
            weekend-friendly slots.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Karol Bagh families</h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Karol Bagh</h2>
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
