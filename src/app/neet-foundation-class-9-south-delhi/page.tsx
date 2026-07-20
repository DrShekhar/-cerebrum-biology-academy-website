/**
 * /neet-foundation-class-9-south-delhi
 *
 * NEET Foundation Class 9 city page — Delhi proper (covers South Delhi
 * flagship, Green Park). South-Delhi sub-geo page — distinct localities/schools.
 * Closes the Delhi gap in the existing Foundation city cluster
 * (Faridabad, Ghaziabad, Gurugram, Noida, Greater Noida had pages but
 * Delhi proper did not).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-south-delhi'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in South Delhi | South Ex, GK & Defence Colony',
  description:
    'NEET Foundation Class 9 in South Delhi at Cerebrum Biology Academy — South Extension flagship, Green Park, Greater Kailash. Board + NEET parallel, AIIMS-trained faculty, batches of 15-20. ₹35K-90K/year. Free demo available.',
  keywords: [
    'neet foundation class 9 south delhi',
    'class 9 biology tuition south delhi',
    'class 9 neet foundation south extension',
    'class 9 foundation greater kailash',
    'class 9 cbse biology south delhi',
    'class 9 icse biology south delhi',
    'best class 9 foundation south delhi',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in South Delhi | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation in South Delhi — South Extension & Green Park centres. AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in South Delhi | South Ex, GK & Defence Colony',
    description:
      'NEET Foundation Class 9 in South Delhi at Cerebrum Biology Academy — South Extension flagship, Green Park, Greater Kailash. Board + NEET parallel, AIIMS-trained faculty, batches of 15-20. ₹35K-90K/year. Free demo...',
  },
}

const faqs = [
  {
    question: 'Where in South Delhi can my Class 9 child attend Cerebrum NEET Foundation?',
    answer:
      'Cerebrum has two South Delhi centres serving Class 9 Foundation — South Extension Part II (flagship, full faculty access; central to Greater Kailash, Defence Colony, Lajpat Nagar, Kalkaji) and Green Park (near Hauz Khas, Saket, R.K. Puram families). Both run Class 9 Foundation batches with the same AIIMS-trained faculty. Live online Class 9 Foundation is also available across South Delhi where commute is impractical.',
  },
  {
    question: 'What is the Class 9 NEET Foundation timing in South Delhi?',
    answer:
      "Cerebrum Class 9 Foundation in South Delhi runs in 2-hour weekend-friendly slots: Saturday morning (10 AM - 12 PM), Sunday morning (10 AM - 12 PM), plus a weekday evening 6 PM - 8 PM IST option for students with weekend extracurriculars. Most students attend twice weekly (4 hours total weekly). Schedule is calibrated specifically so Foundation doesn't crowd out school + activities + family time.",
  },
  {
    question:
      'How does Cerebrum South Delhi compare to FIITJEE Foundation or Allen Scholastics in South Delhi?',
    answer:
      'Three structural differences. (1) Subject focus: Cerebrum is biology-only specialist; FIITJEE Foundation and Allen Scholastics are combined PCB Foundation with generalist faculty. (2) Batch size: Cerebrum 15-20 students per Class 9 batch vs FIITJEE/Allen 150-300 students. (3) Faculty: Cerebrum South Delhi has AIIMS-trained biology specialists from day one; generalist Foundation typically uses school-teacher-level instructors for Class 9-10 batches (senior faculty work Class 11-12). For biology pedagogy specifically, Cerebrum South Delhi is structurally different.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in South Delhi?',
    answer:
      'Cerebrum Class 9 Foundation in South Delhi runs ₹35,000-₹90,000/year across three tiers. Pursuit (small-batch 20-25 students): ₹35K-50K. Ascent (pro batch 12-16 with weekly 1:1 doubt slots): ₹55K-70K. Pinnacle (direct Dr. Shekhar micro-batch 6-10 at South Extension flagship): ₹75K-90K. Ad-hoc 1:1 Class 9 hourly: ₹2,000-3,500/hr. CBSE / ICSE board exam preparation is included in all tiers — separate weekly tests in board format alongside NEET-pattern drilling.',
  },
  {
    question:
      'My child goes to DPS RK Puram / Modern School Barakhamba / Sanskriti — which centre is closest?',
    answer:
      "DPS RK Puram, Modern School Barakhamba, Sanskriti School and other R.K. Puram / Vasant Vihar feeder schools → Green Park or South Extension are closest. DPS Vasant Kunj, The Shri Ram School Vasant Vihar, Mother's International → Green Park. DPS Mathura Road, Sardar Patel Vidyalaya, families in Greater Kailash / Defence Colony / Lajpat Nagar / Kalkaji / Saket → South Extension flagship. Live online Class 9 Foundation is available across the rest of South Delhi where offline commute is impractical.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in South Delhi',
  description:
    'Class 9 NEET Foundation biology coaching in South Delhi at Cerebrum Biology Academy — two South Delhi centres (South Extension flagship + Green Park) plus online live. Board + NEET parallel pedagogy from AIIMS-trained faculty.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'Class 9 Pre-NEET Foundation',
  educationalCredentialAwarded: 'NEET Foundation Class 9 Biology',
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
        name: 'Foundation Pursuit Class 9 (Small-Batch 20-25)',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 9 (Pro Batch 12-16)',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 9 (Direct Dr. Shekhar 6-10)',
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
      name: 'Class 9 Foundation',
      item: 'https://cerebrumbiologyacademy.com/best-neet-foundation-class-9',
    },
    { '@type': 'ListItem', position: 4, name: 'South Delhi', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in South Delhi and we want to start NEET Foundation at Cerebrum. Please share details on the South Extension / Green Park centres, pricing, and demo class timings.'
  )

export default function NEETFoundationClass9DelhiPage() {
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
            <Link href="/best-neet-foundation-class-9" className="hover:text-white">
              Class 9
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Delhi</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in South Delhi
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology at Cerebrum — two South Delhi centres (South Extension
            flagship + Green Park) plus online live. AIIMS-trained biology specialists, batches of
            15-20, CBSE / ICSE board + NEET-pattern parallel pedagogy. ₹35K-₹90K/year.
            Weekend-friendly scheduling for Class 9 students balancing school + activities.
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
            South Delhi centres + online live for Class 9 NEET Foundation
          </h2>
          <ul>
            <li>
              <strong>South Extension Part II (flagship)</strong> — full faculty access including
              Dr. Shekhar Pinnacle micro-batches. Serves DPS Mathura Road, Sardar Patel Vidyalaya,
              Modern School Vasant Vihar, Vasant Valley School, Apeejay South Extension families.
            </li>
            <li>
              <strong>Greater Kailash &amp; Defence Colony</strong> — served from the South
              Extension flagship (5-15 min away). Lajpat Nagar, Kalkaji, East of Kailash and Saket
              families attend here.
            </li>
            <li>
              <strong>Green Park</strong> — South Delhi catchment near Hauz Khas, Vasant Vihar, R.K.
              Puram. Serves DPS RK Puram, Modern School Barakhamba, Sanskriti School, Mother's
              International, The Shri Ram School Vasant Vihar families.
            </li>
            <li>
              <strong>Online live</strong> — for families in East Delhi (DPS Mayur Vihar, Sanskriti
              Mayur Vihar), Dwarka, or wherever commute is impractical. Same AIIMS-trained faculty
              as the offline centres.
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (South Delhi)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 20-25) — ₹35,000-50,000/year.</strong> Full Class 9
              biology coverage, weekly chapter tests, monthly board-format mocks.
            </li>
            <li>
              <strong>Ascent (Pro Batch 12-16) — ₹55,000-70,000/year.</strong> Plus weekly 1:1 doubt
              slots, biweekly NEET-pattern conceptual mocks. Most popular tier.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 6-10) — ₹75,000-90,000/year.</strong> South
              Extension flagship only. Direct AIIMS Delhi alumnus mentoring.
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
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-south-delhi"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in South Delhi
              </Link>
            </li>
            <li>
              <Link href="/biology-tutor-class-9-cbse" className="text-blue-600 hover:underline">
                CBSE Class 9 Biology tutor
              </Link>
            </li>
            <li>
              <Link href="/biology-tutor-class-9-icse" className="text-blue-600 hover:underline">
                ICSE Class 9 Biology tutor
              </Link>
            </li>
            <li>
              <Link href="/animal-tissues-class-9" className="text-blue-600 hover:underline">
                Animal Tissues Class 9 (NCERT chapter)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from South Delhi Class 9 Foundation families
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
            Book a free Class 9 demo at Cerebrum South Delhi
          </h2>
          <p className="text-blue-100 mb-8">
            30-minute diagnostic with senior faculty. Bring your child&apos;s most recent school
            biology test or NCERT Class 9 textbook page — we will benchmark baseline and recommend
            tier.
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
