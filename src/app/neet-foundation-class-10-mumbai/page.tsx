/**
 * /neet-foundation-class-10-mumbai
 *
 * NEET Foundation Class 10 city page — Mumbai. Pan-India online live.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-mumbai'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Mumbai | Board + NEET Parallel Online',
  description:
    'NEET Foundation Class 10 in Mumbai at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board parallel with NEET-pattern pedagogy. ₹35K-95K/year.',
  keywords: [
    'neet foundation class 10 mumbai',
    'class 10 biology coaching mumbai',
    'class 10 cbse board biology mumbai',
    'class 10 icse biology mumbai',
    'class 10 maharashtra ssc biology',
    'best class 10 foundation mumbai',
    'class 10 board + neet parallel coaching',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 10 in Mumbai | Cerebrum Biology Academy',
    description:
      'Class 10 NEET Foundation Mumbai — boards + NEET parallel, AIIMS-trained, online live.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 10 in Mumbai | Board + NEET Parallel Online',
    description:
      'NEET Foundation Class 10 in Mumbai at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board parallel with NEET-pattern pedagogy. ₹35K-95K/year.',
  },
}

const faqs = [
  {
    question: 'How is Class 10 NEET Foundation delivered in Mumbai?',
    answer:
      "Cerebrum Class 10 NEET Foundation in Mumbai is delivered via online live (not recorded) sessions because Class 10 board pressure makes train-commute time unaffordable — most Mumbai Class 10 students lose 7-12 study hours weekly to offline batch commute (Mumbai Suburban Railway peak congestion plus auto/cab to centre). Cerebrum's twice-weekly 2-hour slots run Saturday 10 AM IST, Sunday 10 AM IST, and weekday 6 PM IST — calibrated around Mumbai school dismissal (2:30-4 PM at DAIS BKC, Cathedral, Bombay Scottish). Maharashtra State Board (SSC) Class 10 students additionally benefit because SSC board prep peaks Jan-March, exactly when Cerebrum's Q4 board-intensive sprint runs (weekly long-answer mocks in Maharashtra Board format with diagram standards). The Mumbai cohort skews heavier toward CBSE/ICSE (BKC, Bandra, Powai) vs SSC, but the parallel pedagogy covers both.",
  },
  {
    question:
      'Will Cerebrum prepare my child for Maharashtra State Board Class 10 boards alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 10 Foundation curriculum runs parallel pedagogy for CBSE, ICSE, AND Maharashtra State Board reference frames. Maharashtra Board Class 10 Biology covers Heredity and Evolution, Life Processes in Living Organisms Part 1 & 2, Environmental Management, Disaster Management. Separate weekly tests in Maharashtra Board format (descriptive long-answer with diagrams) alongside CBSE / ICSE board format and NEET-pattern MCQ format. Most Cerebrum Mumbai Class 10 students score 90%+ in their respective board exams.",
  },
  {
    question: 'Which Mumbai schools feed Cerebrum Class 10 Foundation?',
    answer:
      'CBSE/ICSE feeders: Dhirubhai Ambani International (BKC), Cathedral & John Connon (Fort), Bombay Scottish (Mahim), Jamnabai Narsee (Vile Parle), American School of Bombay (BKC), Oberoi International (Goregaon), Hill Spring International (Tardeo), Singapore International (Dahisar), JBCN International (Borivali), Mukesh Patel School (Bhandup), Hiranandani Foundation (Powai + Thane). Maharashtra Board feeders include Bombay Municipal Board English-medium Class 10 sections, Vidya Mandir networks, and aided Marathi-medium English-track schools.',
  },
  {
    question: 'How does Cerebrum Mumbai compare to Allen Scholastics / Aakash Foundation Mumbai?',
    answer:
      'Allen Scholastics Mumbai operates ~12 centres with 150-300 student PCB Foundation batches. Aakash Mumbai operates ~6 centres. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty (Dr. Shekhar C Singh) directly leading curriculum. For Class 10 specifically, Cerebrum runs separate board-format weekly mocks (Allen deprioritises boards). Many Mumbai families pair Cerebrum biology (₹55K-75K Ascent) with Allen / Aakash for PC for total ₹1L-1.4L — comparable to single-shop pricing with materially better biology and board parallel pedagogy.',
  },
  {
    question: 'What does Class 10 NEET Foundation cost in Mumbai?',
    answer:
      'Cerebrum Class 10 Foundation pricing for Mumbai families (pan-India online): Pursuit ₹35K-55K, Ascent ₹55K-75K (with weekly 1:1 doubt slots + biweekly board + NEET mocks), Pinnacle ₹75K-95K (direct Dr. Shekhar micro-batch 6-10). Ad-hoc 1:1 hourly ₹2,000-3,500. Three Mumbai-specific cost comparisons: (1) Allen Scholastics Mumbai Class 10 combined PCB Foundation runs ~₹95K-1.2L/year at 250-student batches across Andheri/Borivali/Thane/Powai centres; (2) Aakash Mumbai Class 10 Foundation ~₹1.1L-1.3L at 6 centres; (3) The hidden Mumbai cost: 8-12 hours weekly commute saved by Cerebrum online vs offline centres in Borivali or Thane. Cerebrum biology-only Ascent ₹65K + PhysicsWallah and Unacademy PCB ₹15K = ₹80K total with better biology pedagogy than Allen standalone — common Mumbai pattern for CBSE families targeting AIIMS / state quota via SSC parallel.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 10 Biology in Mumbai',
  description:
    'Class 10 NEET Foundation biology coaching for Mumbai students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel pedagogy.',
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
    name: 'Mumbai',
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
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
    { '@type': 'ListItem', position: 4, name: 'Mumbai', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 10 in Mumbai and we want to start NEET Foundation alongside CBSE / ICSE / Maharashtra Board prep. Please share Cerebrum online live details and pricing.'
  )

export default function NEETFoundationClass10MumbaiPage() {
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
            <span className="text-white">Mumbai</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 10 in Mumbai
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 10 NEET Foundation Biology for Mumbai students — pan-India online live with
            AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE / Maharashtra Board + NEET
            parallel pedagogy. Q4 board prep intensified for Class 10 finals. Serving Andheri,
            Thane, Borivali, Powai, BKC, Bandra catchments. ₹35K-₹95K/year.
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
            Class 10 board + NEET parallel for Mumbai students
          </h2>
          <p>
            Mumbai Class 10 students must perform on CBSE / ICSE / Maharashtra State Board finals
            (which determine high-school transcript for state government medical college quotas via
            SSLC equivalence and which set the Class 11 stream selection at most Mumbai schools).
            Cerebrum runs both tracks in parallel — separate weekly tests in board format
            (Maharashtra Board, CBSE, ICSE) and NEET MCQ format. Q4 (January - March) intensifies
            board exam preparation with weekly board-format mocks and additional Sunday-afternoon
            revision slots specifically for Class 10 finals.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 10 Foundation pricing (Mumbai pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 20-25) — ₹35,000-55,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 12-16) — ₹55,000-75,000/year.</strong> Most popular Mumbai
              tier with weekly 1:1 doubt slots + biweekly board + NEET mocks.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 6-10) — ₹75,000-95,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Mumbai pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-10" className="text-blue-600 hover:underline">
                Class 10 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-9-mumbai"
                className="text-blue-600 hover:underline"
              >
                Class 9 Foundation in Mumbai
              </Link>
            </li>
            <li>
              <Link href="/neet-coaching-mumbai" className="text-blue-600 hover:underline">
                NEET Coaching Mumbai (Class 11/12 programmes)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            FAQs from Mumbai Class 10 Foundation families
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
            Book a free Class 10 demo from Mumbai
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
