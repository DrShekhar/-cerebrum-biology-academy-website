/**
 * /neet-foundation-class-9-kolkata
 *
 * NEET Foundation Class 9 city page — Kolkata. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-kolkata'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Kolkata | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Kolkata at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board (Madhyamik) + NEET parallel. Ballygunge, Park Street, Salt Lake, New Town, Alipore catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 kolkata',
    'class 9 neet preparation kolkata',
    'class 9 biology coaching kolkata',
    'class 9 madhyamik biology neet',
    'class 9 west bengal board neet',
    'class 9 cbse biology kolkata',
    'class 9 neet ballygunge',
    'class 9 neet salt lake',
    'class 9 neet new town',
    'class 9 neet park street alipore',
    'best class 9 foundation kolkata',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Kolkata | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Kolkata — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Kolkata?',
    answer:
      'Cerebrum Class 9 NEET Foundation in Kolkata is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty teaching Delhi NCR offline batches. Sessions are 2 hours twice weekly in IST-aligned slots (Saturday 10 AM, Sunday 10 AM, weekday 6 PM IST option). ~140+ Kolkata students across Class 9-12 are actively enrolled across Ballygunge, Park Street, Alipore, Salt Lake, New Town, Garia, Tollygunge, Howrah, Behala, Jadavpur catchments.',
  },
  {
    question: 'Does Cerebrum support West Bengal Board (Madhyamik) Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE (most common at Kolkata international/CBSE schools), ICSE (very strong in Kolkata's traditional convent school ecosystem), AND West Bengal Board (WBBSE) reference frames with separate practice tests for each. West Bengal Board Class 9 Biology covers similar NCERT-derived content with Bengal-specific terminology. Sessions are conducted in English; English/Bengali bilingual doubt support available via WhatsApp.",
  },
  {
    question: 'Which Kolkata schools are common Cerebrum Foundation feeders?',
    answer:
      "Common Kolkata feeder schools across Class 9-10 Foundation cohorts: ICSE legacy schools (Kolkata's strongest tradition) — La Martiniere for Boys, La Martiniere for Girls, Don Bosco Park Circus, St. Xavier's Collegiate School, South Point School, Modern High School for Girls, Loreto House, Pratt Memorial, St. James'. CBSE feeders: DPS Ruby Park, DPS Megacity Newtown, Lakshmipat Singhania Academy, Sushila Birla Girls' School, BD Memorial, Future Foundation School, Heritage School. International curriculum feeders: Calcutta International School, Indus International (Newtown). West Bengal Board (Madhyamik) feeders span the broader Kolkata Municipal Corporation and Bidhannagar Municipal Corporation school ecosystem.",
  },
  {
    question:
      'How does Cerebrum compare to Aakash Kolkata, Pathfinder, or FIITJEE Kolkata for Class 9?',
    answer:
      'Aakash Scholastics Kolkata operates ~4 centres (Park Street, Salt Lake, Howrah, Behala) with 150-300 student Class 9 PCB Foundation batches. Pathfinder (Kolkata-headquartered) runs strong local NEET prep with similar mass-batch model. FIITJEE Kolkata operates 1-2 centres focused on JEE+NEET combined. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty — structurally different positioning. Kolkata families with strong ICSE academic tradition disproportionately value pedagogy depth; Cerebrum biology + Aakash/Pathfinder PC is a common Kolkata pattern.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Kolkata?',
    answer:
      'Cerebrum Class 9 Foundation pricing (pan-India online, applies to Kolkata): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Aakash Scholastics Kolkata Class 9 combined PCB Foundation (~₹75K-95K/year, 200-student batch) and Pathfinder Kolkata (~₹70K-90K/year), Cerebrum biology-only Ascent at ₹65K offers materially deeper biology pedagogy and 15-20 student structure.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Kolkata',
  description:
    'Class 9 NEET Foundation biology coaching for Kolkata students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board (Madhyamik) + NEET parallel pedagogy.',
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
    name: 'Kolkata',
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Kolkata', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Kolkata and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9KolkataPage() {
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
            <span className="text-white">Kolkata</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Kolkata
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Kolkata students — pan-India online live (not
            recorded) with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / West
            Bengal Board (Madhyamik) + NEET-pattern parallel pedagogy. Serving Ballygunge, Park
            Street, Alipore, Salt Lake, New Town, Garia, Tollygunge catchments. ₹35K-₹90K/year.
            Particularly suited to Kolkata&apos;s strong ICSE academic tradition.
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
            Kolkata Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Kolkata has India&apos;s strongest ICSE academic tradition — La Martiniere, Don Bosco,
            St. Xavier&apos;s, South Point, Modern High, Loreto, Pratt Memorial all run ICSE-grade
            Class 9 pedagogy that materially outperforms the national CBSE average. Cerebrum&apos;s
            biology-only specialist positioning resonates with this academic-family cohort because
            Kolkata families disproportionately value pedagogy depth, faculty credentials, and
            small-batch attention over mass-batch test series. AIIMS-trained faculty (Dr. Shekhar C
            Singh) leading 15-20 student online live batches matches the Kolkata convent-school
            academic culture well.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Kolkata pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-70,000/year.</strong> Most popular Kolkata
              tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Kolkata pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-kolkata"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in Kolkata
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Kolkata Class 9 Foundation families
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
            Book a free Class 9 demo from Kolkata
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
