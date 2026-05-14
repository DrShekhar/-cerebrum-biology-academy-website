/**
 * /neet-foundation-class-9-bangalore
 *
 * NEET Foundation Class 9 city page — Bangalore. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-bangalore'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Bangalore | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Bangalore at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Karnataka Board + NEET parallel. Koramangala, Indiranagar, Whitefield, HSR, Jayanagar catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 bangalore',
    'class 9 neet preparation bangalore',
    'class 9 biology coaching bangalore',
    'class 9 cbse biology bangalore neet',
    'class 9 icse biology bangalore',
    'class 9 karnataka board neet',
    'class 9 neet koramangala',
    'class 9 neet indiranagar',
    'class 9 neet whitefield',
    'class 9 neet hsr layout',
    'best class 9 foundation bangalore',
    'online class 9 neet bengaluru',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Bangalore | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Bangalore — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Bangalore?',
    answer:
      'Cerebrum Class 9 NEET Foundation in Bangalore is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching the Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots — Saturday morning (10 AM - 12 PM IST), Sunday morning, plus weekday evening 6 PM - 8 PM IST. ~280+ Bangalore students across Class 9-12 are actively enrolled across Koramangala, Indiranagar, Whitefield, HSR Layout, Jayanagar, Hebbal, Sarjapur Road catchments.',
  },
  {
    question: 'Does Cerebrum support Karnataka State Board Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE (most common in Bangalore international schools), ICSE, and Karnataka State Board reference frames with separate practice tests for each. Karnataka SSLC Class 9 Biology covers Cell — Basic Unit of Life, Tissues, Diversity in Living Organisms, Why Do We Fall Ill (similar NCERT structure with state-board terminology). Cerebrum runs parallel pedagogy for board syllabus depth and NEET-pattern MCQ drilling.",
  },
  {
    question: 'Which Bangalore schools are common Cerebrum Foundation feeders?',
    answer:
      'Common Bangalore feeder schools across Class 9-10 Foundation cohorts: National Public School (Indiranagar, Koramangala, HSR Layout), Inventure Academy (Sarjapur), Stonehill International (Sarjapur), Greenwood High International (Bannerghatta + Sarjapur), Mallya Aditi International (RT Nagar), Bishop Cottons Boys School, Bishop Cottons Girls High School, Sophia High School, Vidyashilp Academy (Yelahanka), Trio World Academy (Sahakar Nagar), Indus International (Sarjapur), Sishu Griha Senior School (Banashankari), and various Karnataka State Board high schools.',
  },
  {
    question:
      "How does Cerebrum compare to Aakash Scholastics, Allen, or BYJU's NEET Foundation in Bangalore?",
    answer:
      "Aakash Scholastics Bangalore operates ~8 centres (Koramangala, Indiranagar, HSR, Jayanagar, Hebbal, Marathahalli, Banashankari, Whitefield) with 150-300 student PCB Foundation. Allen Bangalore operates ~4 centres. BYJU's NEET Foundation runs primarily online with recorded content + occasional live sessions. Cerebrum is biology-only with 15-20 student online live (not recorded) batches and AIIMS-trained biology faculty. Many Bangalore IT-professional families combine Cerebrum biology (₹55K-75K Ascent) with Aakash for PC for total ₹1L-1.4L.",
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Bangalore?',
    answer:
      'Cerebrum Class 9 Foundation pricing (pan-India online, applies to Bangalore): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Aakash Scholastics Bangalore Class 9 combined PCB Foundation (~₹85K-1L/year, 200-student batch), Cerebrum biology-only Ascent at ₹65K offers materially deeper biology pedagogy and 15-20 student structure at lower price.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Bangalore',
  description:
    'Class 9 NEET Foundation biology coaching for Bangalore students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Karnataka Board + NEET parallel pedagogy.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'Class 9 Pre-NEET Foundation',
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
        name: 'Foundation Pursuit Class 9',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 9',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 9',
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
    { '@type': 'ListItem', position: 4, name: 'Bangalore', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Bangalore and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9BangalorePage() {
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
            <Link href="/best-neet-foundation-class-9" className="hover:text-white">
              Class 9
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Bangalore</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Bangalore
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Bangalore students — pan-India online live (not
            recorded) with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Karnataka
            Board + NEET-pattern parallel pedagogy. Serving Koramangala, Indiranagar, Whitefield,
            HSR Layout, Jayanagar, Hebbal, Sarjapur Road catchments. ₹35K-₹90K/year.
            Weekend-friendly scheduling for Bangalore IT-professional families.
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
            Bangalore Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Bangalore is Cerebrum&apos;s second-largest pan-India online cohort after Mumbai, with
            ~280+ active students across Class 9-12. Bangalore IT-professional families
            disproportionately prioritise both board academic excellence (Karnataka SSLC, CBSE,
            ICSE) and serious NEET preparation. Cerebrum&apos;s biology-only specialist positioning
            resonates with this cohort because most Bangalore generalist NEET coaching (Aakash,
            Allen, BYJU&apos;s) is engineered for the broader market while AIIMS-trained biology
            pedagogy is a specialist differentiator.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Bangalore feeder schools and board coverage
          </h2>
          <p>
            CBSE feeders (highest concentration in Bangalore): National Public School (Indiranagar,
            Koramangala, HSR Layout, RR Nagar), Delhi Public School (East, North, South), Vidya
            Niketan, Sishu Griha. ICSE feeders: Bishop Cottons Boys / Girls, Sophia High School,
            Frank Anthony Public School. International curriculum feeders (IGCSE/IB+ Class 9):
            Inventure Academy (Sarjapur), Stonehill International (Sarjapur), Indus International,
            Greenwood High International, Mallya Aditi International (RT Nagar). Karnataka State
            Board feeders span the broader Bangalore high-school catchment.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Bangalore pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-70,000/year.</strong> Most popular
              Bangalore tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Bangalore pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-bangalore"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in Bangalore
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
            FAQs from Bangalore Class 9 Foundation families
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
            Book a free Class 9 demo from Bangalore
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
