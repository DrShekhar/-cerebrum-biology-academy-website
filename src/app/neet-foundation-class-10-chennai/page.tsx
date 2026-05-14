/**
 * /neet-foundation-class-10-chennai
 *
 * NEET Foundation Class 10 city page — Chennai. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-chennai'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Chennai | Samacheer Kalvi + CBSE + ICSE Parallel',
  description:
    'NEET Foundation Class 10 in Chennai at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Tamil Nadu Samacheer Kalvi + NEET parallel. T. Nagar, Adyar, Anna Nagar, Velachery, OMR catchments. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 chennai',
    'class 10 neet preparation chennai',
    'class 10 biology coaching chennai',
    'class 10 samacheer kalvi biology neet',
    'class 10 cbse board neet chennai',
    'class 10 tamil nadu board neet',
    'class 10 neet adyar omr',
    'class 10 neet anna nagar',
    'best class 10 foundation chennai',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Chennai | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Chennai — Samacheer Kalvi + CBSE + ICSE boards + NEET parallel.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Chennai?',
    answer:
      'Cerebrum Class 10 NEET Foundation in Chennai is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching the Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). Q4 (January - March) intensifies board exam preparation for CBSE / ICSE / Tamil Nadu Samacheer Kalvi Class 10 finals.',
  },
  {
    question:
      'Will Cerebrum prepare my child for Tamil Nadu Samacheer Kalvi Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation runs parallel pedagogy for CBSE, ICSE, AND Tamil Nadu Samacheer Kalvi (Equitable Education) reference frames. Tamil Nadu State Board Class 10 Science (Biology section) covers Heredity and Evolution, Life Processes, Control and Coordination, Reproduction in Organisms, Environment and Sustainable Development. Separate weekly tests in Tamil Nadu Board format (descriptive long-answer with diagrams, often bilingual English/Tamil-friendly question paper) alongside CBSE / ICSE board format and NEET-pattern MCQ format. SSLC results from Cerebrum Chennai Class 10 students consistently average 90%+ in biology.",
  },
  {
    question:
      'Tamil Nadu uses Class 12 board marks for state medical college admissions — does Cerebrum help with that?',
    answer:
      "Yes — and this is uniquely important for Chennai families. Tamil Nadu's state government medical college admission system (TNMSC) uses a weighted average of Class 12 board marks AND NEET-UG score (specific weighting changes year-to-year per Tamil Nadu government notification). This means Tamil Nadu Class 12 board marks materially affect medical college admission outcomes — unlike most other states where NEET-UG alone determines admission. Cerebrum's Class 10 Foundation Tamil Nadu Board parallel track is the foundation for strong Class 11-12 Tamil Nadu Board performance, which in turn affects TNMSC ranking.",
  },
  {
    question: 'Which Chennai schools feed Cerebrum Class 10 Foundation?',
    answer:
      "CBSE/ICSE feeders: PSBB (Nungambakkam, KK Nagar, T. Nagar), DAV Boys/Girls, Velammal Vidyalaya CBSE branches, Vidya Mandir Mylapore, Sishya School, Chettinad Vidyashram, Sankara Senior Secondary, Bhavan's Rajaji Vidyashram. International curriculum feeders: AISC (American International School Chennai), British International School Chennai, KC High International. Tamil Nadu Samacheer Kalvi feeders span the wider Chennai state-board school ecosystem.",
  },
  {
    question: 'How does Cerebrum compare to Velammal or Aakash for Class 10 NEET in Chennai?',
    answer:
      'Velammal Group runs integrated school-plus-NEET coaching from Class 9 onwards with 200-400 student Class 10 batches. Aakash Chennai operates ~5 centres with 200-300 student Class 10 PCB Foundation batches. For Class 10 specifically, Velammal and Aakash both deprioritise Tamil Nadu Samacheer Kalvi board strategy in favour of NEET-only drilling. For families targeting both Tamil Nadu Class 10 board 90%+ AND TNMSC-relevant Class 11-12 trajectory AND NEET-ready foundations, Cerebrum is structurally different. Many Chennai families pair Cerebrum biology (₹55K-75K Ascent) with Velammal/Aakash for PC.',
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Chennai?',
    answer:
      'Cerebrum Class 10 Foundation pricing (pan-India online, applies to Chennai): Pursuit ₹35K-55K, Ascent ₹55K-75K (with weekly 1:1 doubt slots + biweekly board + NEET mocks), Pinnacle ₹75K-95K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Velammal integrated coaching (~₹1.3L-1.6L/year combined PCB) and Aakash Scholastics Chennai Class 10 (~₹95K-1.2L/year, 250-student batch), Cerebrum biology-only Ascent at ₹65K offers deeper biology pedagogy and 15-20 student structure.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Chennai',
  description:
    'Class 10 NEET Foundation biology coaching for Chennai students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Tamil Nadu Samacheer Kalvi + NEET parallel pedagogy.',
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
    name: 'Chennai',
    address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Chennai', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Chennai and we want to start NEET Foundation alongside Samacheer Kalvi / CBSE / ICSE board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10ChennaiPage() {
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
            <span className="text-white">Chennai</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Chennai
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Chennai students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Tamil Nadu Samacheer
            Kalvi + NEET parallel pedagogy. Q4 board prep intensified for Class 10 finals. Tamil
            Nadu Board parallel track particularly important for TNMSC state college admissions
            trajectory. Serving T. Nagar, Adyar, Anna Nagar, Velachery, OMR catchments.
            ₹35K-₹95K/year.
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
            Class 10 board + NEET parallel for Chennai students (with TNMSC context)
          </h2>
          <p>
            Chennai Class 10 students must perform on CBSE / ICSE / Tamil Nadu Samacheer Kalvi
            finals — but Tamil Nadu has additional weight because the state government medical
            college admission system (TNMSC) uses a weighted average of Class 12 board marks AND
            NEET-UG score for state quota seats. Strong Class 10 Tamil Nadu Board performance is the
            foundation for strong Class 11-12 state board performance, which materially affects
            TNMSC ranking. Cerebrum runs Class 10 Tamil Nadu Board + CBSE + ICSE + NEET in parallel
            with separate weekly tests in each format.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Chennai pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-75,000/year.</strong> Most popular Chennai
              tier with weekly 1:1 doubt slots + biweekly board + NEET mocks.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Chennai pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-chennai"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in Chennai
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Chennai Class 10 Foundation families
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
            Book a free Class 10 demo from Chennai
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
    </main>
  )
}
