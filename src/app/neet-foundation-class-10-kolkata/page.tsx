/**
 * /neet-foundation-class-10-kolkata
 *
 * NEET Foundation Class 10 city page — Kolkata. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-kolkata'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Kolkata | Madhyamik + ICSE + CBSE Parallel',
  description:
    'NEET Foundation Class 10 in Kolkata at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board Madhyamik + NEET parallel. Ballygunge, Salt Lake, New Town, Park Street catchments. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 kolkata',
    'class 10 biology coaching kolkata',
    'class 10 icse biology kolkata',
    'class 10 madhyamik biology wbbse',
    'class 10 cbse biology kolkata',
    'best class 10 foundation kolkata',
    'la martiniere south point class 10',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Kolkata | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Kolkata — Madhyamik + ICSE + CBSE boards + NEET parallel.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Kolkata?',
    answer:
      "Cerebrum Class 10 NEET Foundation in Kolkata is delivered online live (not recorded) with three-track parallel pedagogy: CBSE Class 10, ICSE Class 10, AND West Bengal Madhyamik (WBBSE). Kolkata is unique in that ICSE Class 10 (ICSE board, not ISC) holds the strongest academic prestige in the local family hierarchy — La Martiniere, Don Bosco, St. Xavier's Class 10 ICSE results are widely benchmarked against CBSE 90%+. Cerebrum runs ICSE-specific weekly mocks with examiner-aligned long-answer format alongside CBSE descriptive format and Madhyamik's bilingual-friendly diagram-heavy paper structure. Q4 (Jan-March) intensifies whichever board the student's school follows. Madhyamik students additionally get state-board terminology drilling (different from NCERT English-medium phrasing).",
  },
  {
    question:
      'Will Cerebrum prepare my child for West Bengal Madhyamik Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation runs parallel pedagogy for CBSE, ICSE, AND West Bengal Board Madhyamik reference frames. WBBSE Madhyamik Class 10 Life Science covers Life and its Diversity, Continuity of Life, Heredity, Evolution, Environment, Human Health and Diseases — content closely parallels NCERT Class 10 Biology with West-Bengal-specific terminology. Separate weekly tests in Madhyamik format (descriptive long-answer with diagrams) alongside CBSE / ICSE board format and NEET-pattern MCQ format. Madhyamik results from Cerebrum Kolkata Class 10 students consistently average 90%+ in Life Science.",
  },
  {
    question: 'Which Kolkata schools feed Cerebrum Class 10 Foundation?',
    answer:
      "ICSE feeders (Kolkata's strongest academic tradition): La Martiniere for Boys, La Martiniere for Girls, Don Bosco Park Circus, St. Xavier's Collegiate School, South Point School, Modern High School for Girls, Loreto House, Pratt Memorial, St. James'. CBSE feeders: DPS Ruby Park, DPS Megacity Newtown, Lakshmipat Singhania Academy, Sushila Birla Girls' School, BD Memorial, Future Foundation School, Heritage School. International curriculum feeders: Calcutta International School, Indus International (Newtown). WBBSE Madhyamik feeders include various West-Bengal-Board-affiliated English-medium and Bengali-medium-with-English-track schools across Kolkata Municipal Corporation and Bidhannagar Municipal Corporation.",
  },
  {
    question:
      'How does Cerebrum compare to the 2nd-largest national NEET chain Kolkata, Pathfinder, or other IIT-JEE-first coachings Kolkata for Class 10 NEET?',
    answer:
      'the 2nd-largest national NEET chain Scholastics Kolkata operates ~4 centres with 150-300 student Class 10 PCB Foundation batches. Pathfinder Kolkata (locally-headquartered) runs strong NEET prep with similar mass-batch model. other IIT-JEE-first coachings Kolkata operates 1-2 centres focused on JEE+NEET combined. For Class 10 specifically, all three deprioritise Madhyamik/ICSE board strategy in favour of NEET-only drilling. For families targeting both Kolkata board 90%+ AND NEET-ready foundations, Cerebrum is structurally different (biology-only, 15-20 student batches, AIIMS-trained faculty, parallel board + NEET pedagogy). Many Kolkata families pair Cerebrum biology (₹55K-75K Ascent) with the 2nd-largest national NEET chain/Pathfinder for PC.',
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Kolkata?',
    answer:
      'Cerebrum Class 10 Foundation pricing for Kolkata families (pan-India online): Pursuit ₹35K-55K, Ascent ₹55K-75K, Pinnacle ₹75K-95K, ad-hoc 1:1 ₹2,000-3,500/hr. Kolkata Class 10 cost comparison: the 2nd-largest national NEET chain Scholastics Kolkata Class 10 PCB (~₹85K-1L, 250-student); Pathfinder Kolkata Class 10 (Kolkata-headquartered, ~₹85K-1.05L, strong ICSE-aware mass batches); other IIT-JEE-first coachings Kolkata Class 10 (~₹90K-1.15L); Future Foundation Class 10 (~₹80K-95K). The Kolkata ICSE-legacy academic-family pattern strongly favours pedagogy depth: Cerebrum biology Ascent (₹65K) + other online-only platforms PC (₹15-20K) = ₹80-85K total with materially deeper biology, ICSE-specific board parallel, and 15-20 student attention vs Pathfinder/the 2nd-largest national NEET chain 200-300 student batches.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Kolkata',
  description:
    'Class 10 NEET Foundation biology coaching for Kolkata students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board Madhyamik + NEET parallel pedagogy.',
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
    { '@type': 'ListItem', position: 4, name: 'Kolkata', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Kolkata and we want to start NEET Foundation alongside Madhyamik / CBSE / ICSE board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10KolkataPage() {
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
            <span className="text-white">Kolkata</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Kolkata
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Kolkata students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / West Bengal Board
            Madhyamik + NEET parallel pedagogy. Q4 board prep intensified for Class 10 finals.
            Particularly suited to Kolkata&apos;s strong ICSE academic tradition. Serving
            Ballygunge, Park Street, Alipore, Salt Lake, New Town catchments. ₹35K-₹95K/year.
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
            Class 10 board + NEET parallel for Kolkata students
          </h2>
          <p>
            Kolkata Class 10 students must perform on CBSE / ICSE / West Bengal Board Madhyamik
            finals (which determine high-school transcript for West Bengal state government medical
            college quota equivalence and which set Class 11-12 stream selection). Cerebrum runs all
            three board tracks plus NEET in parallel — separate weekly tests in each format, with Q4
            board prep intensified specifically for Class 10 finals.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Kolkata Class 10 feeder schools
          </h2>
          <p>
            ICSE Class 10 (the most prestigious local academic credential, often weighted more than
            CBSE 95%+ by South Kolkata families): La Martiniere for Boys, La Martiniere for Girls,
            Don Bosco Park Circus, St. Xavier&apos;s Collegiate School, South Point High School,
            Modern High School for Girls, Loreto House, Pratt Memorial, St. James&apos;. CBSE Class
            10 feeders: DPS Ruby Park, DPS Megacity Newtown, Lakshmipat Singhania Academy, Sushila
            Birla Girls&apos;, Birla High School (Ranikuthi, Mukundapur), BD Memorial, Future
            Foundation School, Heritage School (Anandapur). International curriculum (IGCSE Class
            10): Calcutta International School, Indus Valley World School (Newtown). WBBSE Madhyamik
            feeders include Bengali-medium-with-English-section schools across Kolkata Municipal
            Corporation, Howrah, and the Bidhannagar (Salt Lake / New Town) corridor.
          </p>
          <p>
            <strong>Madhyamik Class 10 Life Science specifics.</strong> WBBSE Madhyamik Class 10
            Life Science covers Life and its Diversity, Continuity of Life, Heredity, Evolution,
            Environment, Human Health and Diseases. Madhyamik examination paper format is heavily
            descriptive (5-mark + 3-mark + 2-mark + 1-mark sections) with significant diagram
            labelling — different from CBSE multi-format and ICSE long-answer. Cerebrum runs
            separate Madhyamik-format weekly mocks for state-board students.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Kolkata pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-75,000/year.</strong> Most popular Kolkata
              tier.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Kolkata pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-kolkata"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in Kolkata
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Kolkata Class 10 Foundation families
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
            Book a free Class 10 demo from Kolkata
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
