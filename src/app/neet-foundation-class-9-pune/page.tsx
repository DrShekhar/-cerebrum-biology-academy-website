/**
 * /neet-foundation-class-9-pune
 *
 * NEET Foundation Class 9 city page — Pune. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-pune'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Pune | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Pune at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel. Koregaon Park, Kalyani Nagar, Aundh, Baner, Hinjewadi, Kothrud catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 pune',
    'class 9 biology coaching pune',
    'class 9 cbse biology pune',
    'class 9 icse biology pune',
    'class 9 maharashtra ssc biology pune',
    'best class 9 foundation pune',
    'symbiosis school neet class 9',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Pune | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Pune — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Pune | AIIMS-Trained Online Live',
    description:
      'NEET Foundation Class 9 in Pune at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel. Koregaon Park, Kalyani Nagar, Aundh,...',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Pune?',
    answer:
      "Cerebrum Class 9 NEET Foundation in Pune is delivered online live (not recorded) and resonates structurally with Pune's unusual academic-family base. Pune has the highest density of postgraduate-medical and biomedical-research families in India outside Delhi NCR (driven by AFMC Pune, BJ Medical College, IISER Pune, NCL, Symbiosis Medical, NIO biology research), and these families select coaching by pedagogy depth rather than mass-batch brand recall. Cerebrum's 15-20 student online live batches with AIIMS-trained faculty match this preference. ~180+ Pune students across Class 9-12 enrolled, density in Koregaon Park-Kalyani Nagar (Symbiosis International, Mercedes-Benz International, The Bishop's Co-Ed), Aundh-Baner-Hinjewadi (Pawar Public, Vibgyor, DPS Pune), Bavdhan-Kothrud (Indus International, MIT Vishwashanti), and the Camp legacy school cluster (Bishop's Camp, Loyola, Hutchings).",
  },
  {
    question: 'Does Cerebrum support Maharashtra State Board Class 9 alongside NEET in Pune?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE (most common at Pune international schools), ICSE, and Maharashtra State Board (SSC) reference frames with separate practice tests for each. Maharashtra State Board Class 9 Biology covers Diversity in Living Things, Cell — Structure and Function, Tissues, Plant and Animal Studies, Improvements in Food Resources, Pollution and its Control. Same curriculum/board context as Mumbai but with Pune-specific timing flexibility for Pune-IT-corridor families.",
  },
  {
    question: 'Which Pune schools are common Cerebrum Foundation feeders?',
    answer:
      "Common Pune feeder schools across Class 9-10 Foundation cohorts: Symbiosis International School (Viman Nagar), Mercedes-Benz International School (Hadapsar), Indus International School (Bavdhan), Vibgyor High (Balewadi, Magarpatta, Kondhwa), Bishop's School (Camp + Undri), Loyola High School (Camp), Mahindra International School (Lavale), MIT Vishwashanti Gurukul (Loni Kalbhor), Pawar Public School (Hinjewadi, Bavdhan), DPS Pune, The Bishop's Co-Ed (Kalyani Nagar), Hutchings High School (Camp), Akshara International (Wakad), DSK World (Wadgaon Sheri), Sanskriti School (Bhosari). Maharashtra State Board feeders span the broader Pune Municipal Corporation school catchment.",
  },
  {
    question: 'How does Cerebrum compare to Allen Pune or Aakash Pune for Class 9 Foundation?',
    answer:
      "Allen Scholastics Pune operates ~5 centres (Camp, Pimpri-Chinchwad, Kothrud, Aundh, Hadapsar) with 150-300 student PCB Foundation batches. Aakash Pune operates 1-2 centres. Local players: Sinhgad Foundation, Lakshya by Bansal Pune. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty — structurally different positioning. Pune's strong IT-professional and academic family base disproportionately values pedagogy depth over mass-batch test series. Common Pune pattern: Cerebrum biology (₹55K-75K Ascent) + Allen for PC for total ₹1L-1.4L.",
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Pune?',
    answer:
      "Cerebrum Class 9 Foundation pricing for Pune families (pan-India online): Pursuit ₹35K-50K, Ascent ₹55K-70K, Pinnacle ₹75K-90K, ad-hoc 1:1 ₹2,000-3,500/hr. Pune-specific competitive context: Allen Scholastics Pune Class 9 combined PCB (~₹85K-1L, 200-student, 5 centres Camp/Pimpri/Kothrud/Aundh/Hadapsar); Sinhgad Foundation Class 9 (Pune-headquartered, ~₹70K-90K, 250-student); Lakshya by Bansal Pune (~₹75K-95K); Aakash Pune (~₹95K-1.15L). Pune's postgraduate-medical-family demographic disproportionately selects pedagogy depth over mass-batch test series — Cerebrum biology Ascent (₹65K) + PhysicsWallah and Unacademy PC (₹15K) = ₹80K total with materially deeper biology than Allen standalone, and AIIMS faculty resonates with AFMC/BJMC academic-family preference.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Pune',
  description:
    'Class 9 NEET Foundation biology coaching for Pune students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel pedagogy.',
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
    { '@type': 'ListItem', position: 4, name: 'Pune', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Pune and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9PunePage() {
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
            <span className="text-white">Pune</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Pune
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Pune students — pan-India online live (not recorded)
            with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Maharashtra State
            Board + NEET-pattern parallel pedagogy. Serving Koregaon Park, Kalyani Nagar, Aundh,
            Baner, Hinjewadi, Wakad, Kothrud, Bavdhan catchments. ₹35K-₹90K/year.
            Pune-IT-professional-family timing flexibility.
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
            Pune Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Pune has a uniquely IT-professional and academic family base — Hinjewadi-Wakad IT
            corridor, Symbiosis / FLAME / SP College academic ecosystem, plus high concentration of
            engineering and medical professional families across Koregaon Park, Kalyani Nagar, and
            Aundh. This cohort disproportionately values pedagogy depth over mass-batch test series.
            Cerebrum&apos;s biology-only specialist positioning with 15-20 student online live
            batches and AIIMS-trained faculty resonates structurally with Pune families targeting
            AIIMS / top-100 NEET ranks rather than median-tier state government college admissions.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Pune pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 20-25) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 12-16) — ₹55,000-70,000/year.</strong> Most popular Pune
              tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 6-10) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Pune pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/neet-foundation-class-10-pune" className="text-blue-600 hover:underline">
                Class 10 Foundation in Pune
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Pune Class 9 Foundation families
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
          <h2 className="text-3xl font-bold text-white mb-4">Book a free Class 9 demo from Pune</h2>
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
