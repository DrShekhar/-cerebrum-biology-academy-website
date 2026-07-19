/**
 * /neet-foundation-class-10-south-delhi
 *
 * NEET Foundation Class 10 — South Delhi sub-geo page (South Ex flagship
 * catchment). Distinct from the Delhi page: South-Delhi-only localities/schools.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-south-delhi'

export const metadata: Metadata = {
  title:
    'NEET Foundation Class 10 in South Delhi | Board + NEET Parallel · South Ex, GK & Defence Colony',
  description:
    'NEET Foundation Class 10 in South Delhi at Cerebrum Biology Academy — South Extension flagship, Green Park, Greater Kailash. CBSE / ICSE boards + NEET parallel pedagogy. AIIMS-trained faculty, batches of 15-20. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 south delhi',
    'class 10 biology coaching south delhi',
    'class 10 neet foundation south extension',
    'class 10 foundation greater kailash',
    'class 10 cbse biology south delhi',
    'class 10 icse biology south delhi',
    'best class 10 foundation south delhi',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in South Delhi | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation in South Delhi — boards + NEET parallel. AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title:
      'NEET Foundation Class 10 in South Delhi | Board + NEET Parallel · South Ex, GK & Defence Colony',
    description:
      'NEET Foundation Class 10 in South Delhi at Cerebrum Biology Academy — South Extension flagship, Green Park, Greater Kailash. CBSE / ICSE boards + NEET parallel pedagogy. AIIMS-trained faculty, batches of 15-20. ₹...',
  },
}

const faqs = [
  {
    question:
      'Can Cerebrum South Delhi prepare my child for Class 10 boards AND NEET at the same time?',
    answer:
      'Yes — this is the core differentiator of Cerebrum Class 10 Foundation in South Delhi. The same AIIMS-trained biology faculty teach both CBSE / ICSE Class 10 syllabus depth (Life Processes, Control and Coordination, How Do Organisms Reproduce, Heredity and Evolution, Our Environment) AND NEET-pattern MCQ drilling. Separate weekly tests in board format (long-answer with diagrams) and NEET MCQ format. Class 10 board results from Cerebrum Foundation South Delhi students consistently average 90%+ in biology while simultaneously building NEET-ready conceptual foundations for Class 11.',
  },
  {
    question: 'Which South Delhi centres run Class 10 NEET Foundation?',
    answer:
      "Two South Delhi centres serve Class 10 Foundation. South Extension Part II (flagship, full faculty access including Dr. Shekhar Pinnacle micro-batches; central to Greater Kailash, Defence Colony, Lajpat Nagar, Kalkaji; serves DPS Mathura Road, Sardar Patel Vidyalaya, Vasant Valley families). Green Park (near Hauz Khas and Saket; serves DPS RK Puram, Modern Barakhamba, Sanskriti, Mother's International families). Live online Class 10 Foundation is also available across South Delhi where offline commute is impractical.",
  },
  {
    question: 'What is the Class 10 Foundation timing in South Delhi?',
    answer:
      'Class 10 Foundation in South Delhi runs in 2-hour weekend-friendly slots: Saturday morning (10 AM - 12 PM IST), Sunday morning (10 AM - 12 PM), and a weekday evening 6 PM - 8 PM IST option. Most students attend twice weekly (4 hours total). Q4 (January - March) intensifies board exam preparation with weekly board-format mocks and additional Sunday-afternoon revision slots specifically for CBSE / ICSE Class 10 finals.',
  },
  {
    question:
      'How does Cerebrum South Delhi compare to Allen Scholastics for Class 10 in South Delhi?',
    answer:
      'Three structural differences specifically for Class 10. (1) Subject focus: Cerebrum South Delhi is biology-only specialist with AIIMS-trained Class 10 faculty; Allen Scholastics is combined PCB Foundation with school-teacher-level Class 10 instructors. (2) Batch size: Cerebrum 15-20 students vs Allen 200-300+. (3) Board strategy: Cerebrum runs separate weekly board-format mocks with examiner-aligned answer-writing standards; Allen deprioritises boards in favour of NEET-only drilling. For students targeting 90%+ in Class 10 boards AND NEET-ready foundations, Cerebrum South Delhi is structurally different.',
  },
  {
    question: 'What does Class 10 NEET Foundation cost in South Delhi?',
    answer:
      'Cerebrum Class 10 Foundation in South Delhi runs ₹35,000-₹95,000/year. Pursuit (small-batch 20-25): ₹35K-55K. Ascent (pro batch 12-16 with weekly 1:1 doubt slots): ₹55K-75K. Pinnacle (direct Dr. Shekhar 6-10 student micro-batch at South Extension flagship): ₹75K-95K. Ad-hoc 1:1 Class 10 hourly: ₹2,000-3,500/hr. Board exam preparation included in all tiers. Compared to Allen Scholastics combined PCB Foundation Class 10 in South Delhi (~₹95K-1.2L/year, 250-student batch), Cerebrum biology-only Ascent at ₹65K offers deeper biology pedagogy and 15-20 student structure at lower price.',
  },
  {
    question:
      'Should I do Cerebrum Foundation for Class 10 boards or just intensive Class 11 NEET prep later?',
    answer:
      'Class 10 Foundation is high-leverage specifically because Class 10 NCERT Biology (Life Processes, Control and Coordination, How Do Organisms Reproduce, Heredity and Evolution) directly bridges into Class 11 Plant Biology + Class 12 Human Physiology + Reproduction + Genetics. Students who underprepare Class 10 typically need a 2-3 month Class 11 Q1 catch-up phase. Starting Cerebrum Foundation in Class 10 means entering Class 11 already comfortable with the conceptual frame for Class 11 NCERT — eliminating the catch-up phase and producing a structural runway advantage.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in South Delhi',
  description:
    'Class 10 NEET Foundation biology coaching in South Delhi at Cerebrum Biology Academy — two South Delhi centres (South Extension flagship + Green Park) plus online live. CBSE / ICSE boards + NEET parallel pedagogy from AIIMS-trained faculty.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'Class 10 Pre-NEET Foundation',
  educationalCredentialAwarded: 'NEET Foundation Class 10 Biology',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'South Delhi',
    address: { '@type': 'PostalAddress', addressLocality: 'South Delhi', addressCountry: 'IN' },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['OnSite', 'Online'],
    courseWorkload: 'PT4H',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'Foundation Pursuit Class 10 (Small-Batch 20-25)',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 10 (Pro Batch 12-16)',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 10 (Direct Dr. Shekhar 6-10)',
        price: '75000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
    ],
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
      name: 'NEET Foundation',
      item: 'https://cerebrumbiologyacademy.com/best-neet-foundation-tutor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Class 10 Foundation',
      item: 'https://cerebrumbiologyacademy.com/best-neet-foundation-class-10',
    },
    { '@type': 'ListItem', position: 4, name: 'South Delhi', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in South Delhi and we want to start NEET Foundation alongside CBSE / ICSE board preparation. Please share Cerebrum South Delhi details — South Extension / Green Park, pricing, schedule.'
  )

export default function NEETFoundationClass10DelhiPage() {
  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={['NEET Delhi', 'NEET Biology Delhi', 'Medical entrance coaching Delhi']}
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
        <div className="max-w-5xl mx-auto px-4">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/best-neet-foundation-tutor" className="hover:text-white">
              NEET Foundation
            </Link>
            <span className="mx-2">/</span>
            <Link href="/best-neet-foundation-class-10" className="hover:text-white">
              Class 10
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Delhi</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in South Delhi
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology at Cerebrum South Delhi — two South Delhi centres
            (South Extension flagship + Green Park) plus pan-India online live. AIIMS-trained
            biology specialists, batches of 15-20, CBSE / ICSE boards + NEET-pattern parallel
            pedagogy. ₹35K-₹95K/year. Board prep intensified Q4. Class 10 NCERT Biology bridged
            forward into Class 11 readiness.
          </p>
          <a
            href={wa}
            className="inline-flex bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp +91 88264-44334
          </a>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            South Delhi centres + online live for Class 10 NEET Foundation
          </h2>
          <ul>
            <li>
              <strong>South Extension Part II (flagship)</strong> — full faculty access, Dr. Shekhar
              Pinnacle micro-batches. DPS Mathura Road, Sardar Patel Vidyalaya, Vasant Valley,
              Modern Vasant Vihar, Apeejay South Extension feeder families.
            </li>
            <li>
              <strong>Greater Kailash &amp; Defence Colony</strong> — served from the South
              Extension flagship (5-15 min away). Lajpat Nagar, Kalkaji, East of Kailash and Saket
              families attend here.
            </li>
            <li>
              <strong>Green Park</strong> — South Delhi catchment near Hauz Khas, Vasant Vihar, R.K.
              Puram. DPS RK Puram, Modern School Barakhamba, Sanskriti School, Mother&apos;s
              International, The Shri Ram School Vasant Vihar feeder families.
            </li>
            <li>
              <strong>Online live</strong> — East Delhi (DPS Mayur Vihar), Dwarka, and wherever
              offline commute is impractical. Same AIIMS-trained faculty as the offline centres.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 board + NEET parallel pedagogy
          </h2>
          <p>
            Class 10 students must perform on CBSE / ICSE / State Board finals (which determine
            high-school transcript for state government medical college quotas and which set Class
            11 stream selection at most schools). At the same time, Class 10 NCERT Biology directly
            bridges into Class 11 Plant Biology and Class 12 Reproduction + Genetics. Cerebrum
            handles both in parallel: separate weekly tests in board format (long-answer with
            diagrams) and NEET MCQ format, with board prep intensified in Q4 (January - March) ahead
            of the CBSE / ICSE final exams.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Delhi)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 20-25) — ₹35,000-55,000/year.</strong> Full Class 10
              biology coverage + early NEET-pattern MCQ, board strategy, weekly chapter tests.
            </li>
            <li>
              <strong>Ascent (Pro Batch 12-16) — ₹55,000-75,000/year.</strong> Plus weekly 1:1 doubt
              slots, biweekly NEET-pattern mocks + biweekly board-format mocks. Most popular tier
              for 90%+ board target.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 6-10) — ₹75,000-95,000/year.</strong> South
              Extension flagship only. AIIMS Delhi alumnus 1:1 mentoring.
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Related South Delhi pages
          </h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-south-delhi"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in South Delhi
              </Link>
            </li>
            <li>
              <Link href="/class-10-board-neet-coaching" className="text-blue-600 hover:underline">
                Class 10 Board + NEET coaching strategy
              </Link>
            </li>
            <li>
              <Link
                href="/class-10-biology-coaching-south-delhi"
                className="text-blue-600 hover:underline"
              >
                Class 10 Biology coaching South Delhi (programme detail)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Delhi Class 10 Foundation families
          </h2>
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
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Book a free Class 10 demo at Cerebrum South Delhi
          </h2>
          <p className="text-blue-100 mb-8">
            30-minute diagnostic with senior faculty. Bring your child&apos;s most recent school
            biology test or NCERT Class 10 textbook chapter — we will benchmark baseline and
            recommend tier.
          </p>
          <a
            href={wa}
            className="inline-flex bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
