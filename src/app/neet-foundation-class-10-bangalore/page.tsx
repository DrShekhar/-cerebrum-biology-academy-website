/**
 * /neet-foundation-class-10-bangalore
 *
 * NEET Foundation Class 10 city page — Bangalore. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-bangalore'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Bangalore | Karnataka SSLC + CBSE + ICSE Parallel',
  description:
    'NEET Foundation Class 10 in Bangalore at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Karnataka SSLC + NEET parallel. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 bangalore',
    'class 10 neet preparation bangalore',
    'class 10 biology coaching bangalore',
    'class 10 cbse board neet bangalore',
    'class 10 icse biology bangalore',
    'class 10 karnataka sslc biology neet',
    'class 10 neet koramangala indiranagar',
    'class 10 neet whitefield hsr',
    'best class 10 foundation bangalore',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Bangalore | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Bangalore — Karnataka SSLC + CBSE + ICSE boards + NEET parallel.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Bangalore?',
    answer:
      'Cerebrum Class 10 NEET Foundation in Bangalore is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). Q4 (January - March) intensifies board exam preparation for CBSE / ICSE / Karnataka SSLC Class 10 finals.',
  },
  {
    question: 'Will Cerebrum prepare my child for Karnataka SSLC Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation runs parallel pedagogy for CBSE, ICSE, AND Karnataka SSLC (Secondary School Leaving Certificate) reference frames. Karnataka SSLC Class 10 Biology covers Heredity and Evolution, Life Processes, Control and Coordination, How Do Organisms Reproduce, Our Environment, Management of Natural Resources. Separate weekly tests in Karnataka SSLC format (descriptive 1/2/3/5-mark answers, diagrams) alongside CBSE / ICSE board format and NEET-pattern MCQ format. Karnataka SSLC results from Cerebrum Bangalore Class 10 students consistently average 90%+ in biology.",
  },
  {
    question: 'Which Bangalore schools feed Cerebrum Class 10 Foundation?',
    answer:
      'CBSE/ICSE/IGCSE feeders: National Public School (Indiranagar, Koramangala, HSR Layout, RR Nagar), Delhi Public School (East, North, South), Bishop Cottons Boys / Girls, Sophia High School, Vidya Niketan, Inventure Academy (Sarjapur), Stonehill International, Indus International, Greenwood High International, Mallya Aditi International, Trio World Academy, Sishu Griha, Vidyashilp Academy. Karnataka SSLC feeders include all major English-medium aided / unaided high schools across Bangalore Urban district.',
  },
  {
    question:
      "How does Cerebrum compare to Aakash Scholastics or BYJU's NEET Foundation in Bangalore for Class 10?",
    answer:
      "Aakash Scholastics Bangalore operates ~8 centres with 150-300 student Class 10 PCB Foundation batches. BYJU's NEET Foundation runs primarily online with recorded content. For Class 10 specifically, Cerebrum runs separate Karnataka SSLC board-format weekly mocks (Aakash and BYJU's deprioritise SSLC in favour of NEET-only drilling). For families targeting both Karnataka SSLC 90%+ AND NEET-ready foundations, Cerebrum is structurally different. Many Bangalore IT families combine Cerebrum biology (₹55K-75K Ascent) with Aakash for PC for total ₹1L-1.4L.",
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Bangalore?',
    answer:
      'Cerebrum Class 10 Foundation pricing (pan-India online, applies to Bangalore): Pursuit ₹35K-55K, Ascent ₹55K-75K (with weekly 1:1 doubt slots + biweekly board + NEET mocks), Pinnacle ₹75K-95K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Aakash Scholastics Bangalore Class 10 combined PCB Foundation (~₹95K-1.2L/year, 250-student batch), Cerebrum biology-only Ascent at ₹65K offers deeper biology pedagogy and 15-20 student structure at lower price.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Bangalore',
  description:
    'Class 10 NEET Foundation biology coaching for Bangalore students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Karnataka SSLC + NEET parallel pedagogy.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'Class 10 Pre-NEET Foundation',
  provider: {
    '@type': 'EducationalOrganization',
    '@id': 'https://cerebrumbiologyacademy.com/#organization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  areaServed: {
    '@type': 'City',
    name: 'Bangalore',
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'Online',
    courseWorkload: 'PT4H',
    location: { '@type': 'VirtualLocation', url: PAGE_URL },
    offers: [
      {
        '@type': 'Offer',
        name: 'Foundation Pursuit Class 10',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 10',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 10',
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
    { '@type': 'ListItem', position: 4, name: 'Bangalore', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Bangalore and we want to start NEET Foundation alongside Karnataka SSLC / CBSE / ICSE board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10BangalorePage() {
  return (
    <main className="min-h-screen bg-white">
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
            <span className="text-white">Bangalore</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Bangalore
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Bangalore students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Karnataka SSLC + NEET
            parallel pedagogy. Q4 board prep intensified for Class 10 finals. Serving Koramangala,
            Indiranagar, Whitefield, HSR Layout, Jayanagar, Hebbal catchments. ₹35K-₹95K/year.
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
            Class 10 board + NEET parallel for Bangalore students
          </h2>
          <p>
            Bangalore Class 10 students must perform on CBSE / ICSE / Karnataka SSLC finals (which
            determine high-school transcript for state government medical college quotas via
            Karnataka SSLC equivalence and which set Class 11 PUC science stream selection).
            Cerebrum runs both tracks in parallel — separate weekly tests in board format (Karnataka
            SSLC, CBSE, ICSE) and NEET MCQ format. Q4 intensifies board exam preparation with weekly
            board-format mocks specifically for Class 10 finals.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Bangalore pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-75,000/year.</strong> Most popular
              Bangalore tier with weekly 1:1 doubt slots + biweekly board + NEET mocks.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Bangalore pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-bangalore"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in Bangalore
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-bangalore" className="text-blue-600 hover:underline">
                NEET Coaching Bangalore (Class 11/12 programmes)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Bangalore Class 10 Foundation families
          </h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <summary className="text-lg font-semibold text-slate-900 cursor-pointer">
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
            Book a free Class 10 demo from Bangalore
          </h2>
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
