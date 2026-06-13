/**
 * /neet-foundation-class-10-pune
 *
 * NEET Foundation Class 10 city page — Pune. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-pune'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Pune | Maharashtra SSC + CBSE + ICSE Parallel',
  description:
    'NEET Foundation Class 10 in Pune at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra SSC + NEET parallel. Koregaon Park, Aundh, Hinjewadi, Kothrud catchments. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 pune',
    'class 10 biology coaching pune',
    'class 10 cbse board biology pune',
    'class 10 maharashtra ssc biology',
    'class 10 icse biology pune',
    'best class 10 foundation pune',
    'pune fyjc science stream prep',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Pune | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Pune — Maharashtra SSC + CBSE + ICSE boards + NEET parallel.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 10 in Pune | Maharashtra SSC + CBSE + ICSE Parallel',
    description:
      'NEET Foundation Class 10 in Pune at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra SSC + NEET parallel. Koregaon Park, Aundh, Hinjewadi, Koth...',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Pune?',
    answer:
      "Cerebrum Class 10 NEET Foundation in Pune is delivered online live (not recorded) with Maharashtra SSC pedagogy parallel to NEET. Pune Class 10 students have a unique constraint: Maharashtra State Board (SSC) results determine eligibility for Junior College PCB stream selection at top FYJC colleges (Fergusson Junior, BMCC Junior, Symbiosis Junior, MIT Junior, Sinhgad Junior) where competition for science seats is severe. Cerebrum's Q4 (Jan-March) board-intensive sprint runs separate Maharashtra SSC format mocks (descriptive 5/3/2/1-mark answers, diagram precision) alongside CBSE/ICSE alternatives. Pune families typically split: 60% CBSE/ICSE (Symbiosis International, Bishop's, DPS, Vibgyor) and 40% Maharashtra SSC (Pune Municipal Corporation school network plus aided English-medium SSC schools). Cerebrum runs all three board tracks plus NEET in parallel.",
  },
  {
    question: 'Will Cerebrum prepare my child for Maharashtra SSC Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation runs parallel pedagogy for CBSE, ICSE, AND Maharashtra State Board (SSC) reference frames. Maharashtra SSC Class 10 Biology covers Heredity and Evolution, Life Processes in Living Organisms Part 1 & 2, Environmental Management, Disaster Management. Separate weekly tests in Maharashtra SSC format (descriptive long-answer with diagrams) alongside CBSE / ICSE board format and NEET-pattern MCQ format. SSC results from Cerebrum Pune Class 10 students consistently average 90%+ in biology.",
  },
  {
    question: 'Which Pune schools feed Cerebrum Class 10 Foundation?',
    answer:
      "CBSE/ICSE/International feeders: Symbiosis International, Mercedes-Benz International (Hadapsar), Indus International (Bavdhan), Vibgyor High (multiple campuses), Bishop's School (Camp + Undri), Loyola High School, Mahindra International, MIT Vishwashanti Gurukul, Pawar Public School, DPS Pune, Hutchings High School, Akshara International, DSK World. Maharashtra SSC feeders include various Marathi-medium-with-English-track and English-medium Maharashtra Board schools across Pune Municipal Corporation and Pimpri-Chinchwad Municipal Corporation.",
  },
  {
    question:
      'How does Cerebrum compare to the 2nd-largest national NEET chain Pune or Sinhgad Foundation for Class 10 NEET?',
    answer:
      'the 2nd-largest national NEET chain Scholastics Pune operates ~5 centres with 150-300 student Class 10 PCB Foundation batches. Sinhgad Foundation (Pune-headquartered) runs Class 10 prep with similar mass-batch model. the largest national NEET chain Pune operates 1-2 centres. For Class 10 specifically, all three deprioritise Maharashtra SSC board strategy in favour of NEET-only drilling. For families targeting both Maharashtra SSC 90%+ AND NEET-ready foundations for Class 11-12, Cerebrum is structurally different (biology-only, 15-20 student batches, AIIMS-trained faculty, parallel board + NEET pedagogy). Many Pune families pair Cerebrum biology (₹55K-75K Ascent) with the 2nd-largest national NEET chain/Sinhgad for PC.',
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Pune?',
    answer:
      'Cerebrum Class 10 Foundation pricing for Pune families (pan-India online): Pursuit ₹35K-55K, Ascent ₹55K-75K, Pinnacle ₹75K-95K, ad-hoc 1:1 ₹2,000-3,500/hr. Pune Class 10 cost comparison: the 2nd-largest national NEET chain Scholastics Pune Class 10 combined PCB (~₹95K-1.2L, 250-student batch); Sinhgad Foundation Class 10 (~₹85K-1.05L, 300-student); Lakshya Pune Class 10 (~₹85K-1.1L); the largest national NEET chain Pune Class 10 (~₹1.05L-1.25L); other IIT-JEE-first coachings Pune (~₹90K-1.1L, biased toward JEE pathway). Postgraduate-medical-family Pune cohort selects Cerebrum biology Ascent (₹65K) + other online-only platforms PC (₹15-20K) for total ₹80-85K with materially better biology and Maharashtra SSC parallel pedagogy that the mass-batch alternatives deprioritise (most Pune mass-batch Foundation deprioritises SSC in favour of NEET-only drilling, which hurts FYJC science stream eligibility).',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Pune',
  description:
    'Class 10 NEET Foundation biology coaching for Pune students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra SSC + NEET parallel pedagogy.',
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
    name: 'Pune',
    address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Pune', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Pune and we want to start NEET Foundation alongside Maharashtra SSC / CBSE / ICSE board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10PunePage() {
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
            <span className="text-white">Pune</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Pune
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Pune students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Maharashtra SSC + NEET
            parallel pedagogy. Q4 board prep intensified for Class 10 finals. Serving Koregaon Park,
            Kalyani Nagar, Aundh, Baner, Hinjewadi, Kothrud catchments. ₹35K-₹95K/year.
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
            Class 10 board + NEET parallel for Pune students
          </h2>
          <p>
            Pune Class 10 students must perform on CBSE / ICSE / Maharashtra SSC finals (which
            determine high-school transcript for Maharashtra state government medical college quotas
            via SSC equivalence and which set Class 11 stream selection at most Pune schools).
            Cerebrum runs all three board tracks plus NEET in parallel — separate weekly tests in
            each format, with Q4 board prep intensified specifically for Class 10 finals.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Pune pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-75,000/year.</strong> Most popular Pune
              tier.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Pune pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/neet-foundation-class-9-pune" className="text-blue-600 hover:underline">
                Class 9 Foundation in Pune
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Pune Class 10 Foundation families
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
            Book a free Class 10 demo from Pune
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
