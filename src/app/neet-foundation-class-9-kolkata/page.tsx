/**
 * /neet-foundation-class-9-kolkata
 *
 * NEET Foundation Class 9 city page — Kolkata. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-kolkata'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Kolkata | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Kolkata at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board (Madhyamik) + NEET parallel. Ballygunge, Park Street, Salt Lake, New Town, Alipore catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 kolkata',
    'class 9 biology coaching kolkata',
    'class 9 icse biology kolkata',
    'class 9 cbse biology kolkata',
    'class 9 madhyamik biology wbbse',
    'best class 9 foundation kolkata',
    'la martiniere neet preparation',
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

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Kolkata | AIIMS-Trained Online Live',
    description: 'NEET Foundation Class 9 in Kolkata at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / West Bengal Board (Madhyamik) + NEET parallel. Ballygunge, Park Stre...',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Kolkata?',
    answer:
      "Cerebrum Class 9 NEET Foundation in Kolkata is delivered online live (not recorded) and resonates structurally with Kolkata's distinctive ICSE-legacy academic culture. Kolkata holds India's strongest ICSE convent tradition — La Martiniere, Don Bosco Park Circus, St. Xavier's Collegiate, South Point, Modern High, Loreto, Pratt Memorial all run pedagogy that materially outperforms the national CBSE average on conceptual depth (ICSE Class 9-10 Biology terminology is more rigorous than CBSE NCERT). Cerebrum's biology-only specialist positioning with small-batch (15-20) AIIMS-trained pedagogy matches the ICSE-school cultural preference for depth over volume. ~140+ Kolkata students across Class 9-12 enrolled, density in South Kolkata (Ballygunge, Park Street, Alipore feeding from La Martiniere / Don Bosco / St. Xavier's / Modern High), Salt Lake-New Town (DPS Ruby Park / Megacity, Heritage School, BD Memorial), and Tollygunge-Behala south-extensions.",
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
      'How does Cerebrum compare to the 2nd-largest national NEET chain Kolkata, Pathfinder, or other IIT-JEE-first coachings Kolkata for Class 9?',
    answer:
      'the 2nd-largest national NEET chain Scholastics Kolkata operates ~4 centres (Park Street, Salt Lake, Howrah, Behala) with 150-300 student Class 9 PCB Foundation batches. Pathfinder (Kolkata-headquartered) runs strong local NEET prep with similar mass-batch model. other IIT-JEE-first coachings Kolkata operates 1-2 centres focused on JEE+NEET combined. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty — structurally different positioning. Kolkata families with strong ICSE academic tradition disproportionately value pedagogy depth; Cerebrum biology + the 2nd-largest national NEET chain/Pathfinder PC is a common Kolkata pattern.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Kolkata?',
    answer:
      "Cerebrum Class 9 Foundation pricing for Kolkata families (pan-India online): Pursuit ₹35K-50K, Ascent ₹55K-70K, Pinnacle ₹75K-90K, ad-hoc 1:1 ₹2,000-3,500/hr. Kolkata Class 9 competitive context: the 2nd-largest national NEET chain Scholastics Kolkata Class 9 PCB (~₹75K-95K, 4 centres Park Street/Salt Lake/Howrah/Behala, 200-student batches); Pathfinder Kolkata (Kolkata-headquartered, ~₹70K-90K, strong local brand with ICSE-aware pedagogy); other IIT-JEE-first coachings Kolkata Class 9 (~₹85K-1L, JEE-leaning); Future Foundation Class 9 prep (~₹65K-85K). Kolkata's ICSE-legacy families pattern: Cerebrum biology Ascent (₹65K) + other online-only platforms live PC (₹15K) = ₹80K total with materially deeper biology than the 2nd-largest national NEET chain standalone, suited to families who value academic depth over mass-batch volume.",
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
            Kolkata feeder schools and board coverage
          </h2>
          <p>
            ICSE legacy (Kolkata&apos;s strongest tradition): La Martiniere for Boys (Loudon
            Street), La Martiniere for Girls (Rawdon Street), Don Bosco Park Circus, St.
            Xavier&apos;s Collegiate School (Mother Teresa Sarani), South Point School (Mandeville
            Gardens), Modern High School for Girls (Syed Amir Ali Avenue), Loreto House (Middleton
            Row), Pratt Memorial School (Mandeville Gardens), St. James&apos; School (Park Street).
            CBSE feeders: Delhi Public School Ruby Park, DPS Megacity Newtown, Lakshmipat Singhania
            Academy, Sushila Birla Girls&apos; School, Birla High School (Ranikuthi + Mukundapur),
            BD Memorial Institute, Future Foundation School, Heritage School (Anandapur).
            International curriculum feeders: Calcutta International School (Anandapur), Indus
            Valley World School (Newtown), Akshar School (Newtown). West Bengal Board (WBBSE
            Madhyamik) feeders span the broader Kolkata Municipal Corporation and Bidhannagar
            Municipal Corporation school ecosystem, plus aided Bengali-medium-with-English-section
            schools in greater Kolkata (Howrah district, North 24 Parganas, South 24 Parganas).
          </p>
          <p>
            <strong>Board context.</strong> Most Cerebrum Kolkata Class 9 cohort skews ICSE (~55%),
            CBSE (~30%), WBBSE Madhyamik (~15%) reflecting the South Kolkata / Salt Lake / Newtown
            academic family demographic. Cerebrum runs all three board tracks in parallel with
            separate weekly tests in each format — ICSE long-answer descriptive (most rigorous
            terminology requirement of the three), CBSE NCERT-aligned multi-format, and Madhyamik
            bilingual-friendly diagram-heavy paper structure. WBBSE Madhyamik Class 9 Life Science
            curriculum covers Levels of Organisation of Life, Physiological Processes, Heredity,
            Continuity and Evolution.
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
      <StickyMobileCTABar waUrl={wa} />
    </main>
  )
}
