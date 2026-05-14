/**
 * /neet-foundation-class-10-hyderabad
 *
 * NEET Foundation Class 10 city page — Hyderabad. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-hyderabad'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Hyderabad | Telangana SSC + CBSE + ICSE Parallel',
  description:
    'NEET Foundation Class 10 in Hyderabad at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Telangana SSC / AP SSC + NEET parallel. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 hyderabad',
    'class 10 neet preparation hyderabad',
    'class 10 biology coaching hyderabad',
    'class 10 cbse board neet hyderabad',
    'class 10 telangana ssc biology neet',
    'class 10 ap ssc biology neet',
    'class 10 neet ameerpet kukatpally',
    'class 10 neet hitec city',
    'best class 10 foundation hyderabad',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Hyderabad | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Hyderabad — Telangana SSC + CBSE + ICSE boards + NEET parallel.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Hyderabad?',
    answer:
      'Cerebrum Class 10 NEET Foundation in Hyderabad is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching the Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). Q4 (January - March) intensifies board exam preparation for CBSE / ICSE / Telangana SSC / AP SSC Class 10 finals.',
  },
  {
    question:
      'Will Cerebrum prepare my child for Telangana SSC / AP SSC Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation runs parallel pedagogy for CBSE, ICSE, Telangana SSC, AND AP SSC reference frames. Telangana / AP SSC Class 10 Biology covers Heredity and Evolution, Life Processes in Living Organisms, Control and Coordination, Reproduction, Our Environment, Management of Natural Resources. Separate weekly tests in Telangana / AP SSC format (descriptive long-answer with diagrams) alongside CBSE / ICSE board format and NEET-pattern MCQ format. SSC results from Cerebrum Hyderabad Class 10 students consistently average 90%+ in biology.",
  },
  {
    question: 'Which Hyderabad schools feed Cerebrum Class 10 Foundation?',
    answer:
      'CBSE/ICSE feeders: Hyderabad Public School (Begumpet, Ramanthapur), Delhi Public School (Hyderabad and Secunderabad), Chirec International, Bharatiya Vidya Bhavan, Birla Open Minds, Glendale Academy. International curriculum feeders: Oakridge International (Bachupally, Gachibowli), Indus International, Sancta Maria International, International School of Hyderabad. Telangana SSC / AP SSC feeders span various Telangana / AP State Board-affiliated English-medium high schools across the metro.',
  },
  {
    question:
      'How does Cerebrum compare to Sri Chaitanya / Narayana / Aakash NEET Foundation in Hyderabad for Class 10?',
    answer:
      "Hyderabad's local NEET coaching market is dominated by Sri Chaitanya and Narayana — both run mass-batch operations with 300-400+ student Class 10 Foundation batches. Aakash Scholastics Hyderabad runs ~6 centres with 200-300 student batches. For Class 10 boards specifically, all three local chains optimise for Telangana / AP SSC + IPE pathway rather than NCERT depth. Cerebrum is biology-only NCERT-mapped specialist with 15-20 student batches and AIIMS-trained faculty — structurally different positioning. Many Hyderabad families combine Cerebrum biology (₹55K-75K Ascent) with Sri Chaitanya / Narayana for PC for total ₹1L-1.4L.",
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Hyderabad?',
    answer:
      'Cerebrum Class 10 Foundation pricing (pan-India online, applies to Hyderabad): Pursuit ₹35K-55K, Ascent ₹55K-75K (with weekly 1:1 doubt slots + biweekly board + NEET mocks), Pinnacle ₹75K-95K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Sri Chaitanya / Narayana Hyderabad Class 10 Foundation (~₹85K-1.1L/year, 350-student batch) and Aakash Scholastics Hyderabad (~₹95K-1.2L/year, 250-student batch), Cerebrum biology-only Ascent at ₹65K offers deeper biology pedagogy and 15-20 student structure at lower price.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Hyderabad',
  description:
    'Class 10 NEET Foundation biology coaching for Hyderabad students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Telangana SSC / AP SSC + NEET parallel pedagogy.',
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
    name: 'Hyderabad',
    address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Hyderabad', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Hyderabad and we want to start NEET Foundation alongside Telangana SSC / CBSE / ICSE board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10HyderabadPage() {
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
            <span className="text-white">Hyderabad</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Hyderabad
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Hyderabad students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Telangana SSC / AP SSC +
            NEET parallel pedagogy. Q4 board prep intensified for Class 10 finals. Serving Ameerpet,
            Kukatpally, HITEC City, Banjara Hills, Jubilee Hills, Gachibowli catchments.
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
            Class 10 board + NEET parallel for Hyderabad students
          </h2>
          <p>
            Hyderabad Class 10 students must perform on CBSE / ICSE / Telangana SSC / AP SSC finals
            (SSC results affect IPE Intermediate stream selection and state government medical
            college quota equivalence). Cerebrum runs both tracks in parallel — separate weekly
            tests in board format (Telangana SSC, AP SSC, CBSE, ICSE) and NEET MCQ format. Q4
            intensifies board exam preparation with weekly board-format mocks specifically for Class
            10 finals.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Hyderabad pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-75,000/year.</strong> Most popular
              Hyderabad tier with weekly 1:1 doubt slots + biweekly board + NEET mocks.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Hyderabad pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-hyderabad"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in Hyderabad
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-hyderabad" className="text-blue-600 hover:underline">
                NEET Coaching Hyderabad (Class 11/12 programmes)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Hyderabad Class 10 Foundation families
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
            Book a free Class 10 demo from Hyderabad
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
