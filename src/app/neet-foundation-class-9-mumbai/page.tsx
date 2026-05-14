/**
 * /neet-foundation-class-9-mumbai
 *
 * NEET Foundation Class 9 city page — Mumbai. Pan-India online live
 * delivery (no offline Mumbai centre yet) with the same AIIMS-trained
 * faculty as Delhi NCR offline batches. Targets Andheri, Thane,
 * Borivali, Powai, BKC catchments.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-mumbai'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Mumbai | AIIMS-Trained Online Live',
  description:
    'NEET Foundation Class 9 in Mumbai at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel. Andheri, Thane, Borivali, Powai, BKC catchments. ₹35K-90K/year.',
  keywords: [
    'neet foundation class 9 mumbai',
    'class 9 neet preparation mumbai',
    'class 9 biology coaching mumbai',
    'class 9 cbse biology mumbai neet',
    'class 9 icse biology mumbai',
    'class 9 maharashtra board neet',
    'class 9 neet andheri',
    'class 9 neet thane',
    'class 9 neet powai',
    'class 9 neet borivali',
    'best class 9 foundation mumbai',
    'online class 9 neet mumbai',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'NEET Foundation Class 9 in Mumbai | Cerebrum Biology Academy',
    description:
      'Class 9 NEET Foundation Mumbai — pan-India online live, AIIMS-trained, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Mumbai?',
    answer:
      'Cerebrum Class 9 NEET Foundation in Mumbai is delivered via pan-India online live (not recorded) sessions with the same AIIMS-trained biology faculty that teach the Delhi NCR offline batches. Sessions are 2 hours, twice weekly, in weekend-friendly slots — Saturday morning (10 AM - 12 PM IST), Sunday morning (10 AM - 12 PM), plus a weekday evening 6 PM - 8 PM IST option. ~320+ Mumbai students across Class 9-12 are actively enrolled across Andheri, Thane, Borivali, Powai, BKC, Bandra, Juhu, Goregaon catchments.',
  },
  {
    question: 'Does Cerebrum support Maharashtra State Board Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE (most common in Mumbai), ICSE, and Maharashtra State Board reference frames with separate practice tests for each format. Maharashtra State Board Class 9 Biology covers Diversity in Living Things, Cell — Structure and Function, Tissues, Plant and Animal Studies, Improvements in Food Resources, Pollution. Cerebrum runs parallel pedagogy for both Maharashtra Board syllabus depth and NEET-pattern MCQ drilling.",
  },
  {
    question: 'Which Mumbai schools are common Cerebrum Foundation feeders?',
    answer:
      'Common Mumbai feeder schools across Class 9-10 Foundation cohorts: Dhirubhai Ambani International School (BKC), Cathedral & John Connon School (Fort), Bombay Scottish School (Mahim), Jamnabai Narsee School (Vile Parle), American School of Bombay (BKC), Oberoi International School (Goregaon), Hill Spring International School (Tardeo), Singapore International School (Dahisar), JBCN International School (Borivali), Mukesh Patel School (Bhandup). For Maharashtra Board feeders: KES Shroff College Junior, Ramnarain Ruia Junior College, Mithibai College Junior, and various Mumbai School Board Class 9-10 sections.',
  },
  {
    question: 'How does Cerebrum compare to Aakash Scholastics or Allen Foundation in Mumbai?',
    answer:
      'Aakash Scholastics Mumbai operates ~12 centres (Andheri, Thane, Borivali, Powai, Mulund, BKC, Goregaon, Vashi, Dadar, Chembur, Kandivali, Vile Parle) with combined PCB Foundation batches of 150-300 students. Allen Mumbai operates ~6 centres. Cerebrum is biology-only with 15-20 student online live batches and AIIMS-trained biology faculty (Dr. Shekhar C Singh) leading curriculum directly. Many Mumbai families combine Cerebrum biology (₹55K-75K Ascent) with Aakash or Allen for PC, total ₹1L-1.4L — comparable to single-shop pricing with better biology pedagogy.',
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Mumbai?',
    answer:
      'Cerebrum Class 9 Foundation pricing (pan-India online, applies to Mumbai): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 10-12). Ad-hoc 1:1 hourly ₹2,000-3,500. Compared to Aakash Scholastics Mumbai Class 9 combined PCB Foundation (~₹85K-1L/year, 200-student batch), Cerebrum biology-only Ascent at ₹65K offers materially deeper biology pedagogy and 15-20 student structure at lower price.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'NEET Foundation Class 9 Biology in Mumbai',
  description:
    'Class 9 NEET Foundation biology coaching for Mumbai students — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Maharashtra Board + NEET parallel pedagogy.',
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
        name: 'Foundation Pursuit Class 9 (Small-Batch)',
        price: '35000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Ascent Class 9 (Pro Batch)',
        price: '55000',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: PAGE_URL,
      },
      {
        '@type': 'Offer',
        name: 'Foundation Pinnacle Class 9 (Direct Dr. Shekhar)',
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
    { '@type': 'ListItem', position: 4, name: 'Mumbai', item: PAGE_URL },
  ],
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    'Hi — my child is in Class 9 in Mumbai and we want to start NEET Foundation at Cerebrum. Please share online live class details, pricing, and demo timings.'
  )

export default function NEETFoundationClass9MumbaiPage() {
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
            <span className="text-white">Mumbai</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            NEET Foundation Class 9 in Mumbai
          </h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Class 9 NEET Foundation Biology for Mumbai students — pan-India online live (not
            recorded) with AIIMS-trained biology faculty, batches of 15-20, CBSE / ICSE /
            Maharashtra Board + NEET-pattern parallel pedagogy. Serving Andheri, Thane, Borivali,
            Powai, BKC, Bandra, Juhu, Goregaon catchments. ₹35K-₹90K/year. Weekend-friendly
            scheduling.
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
            Mumbai Class 9 NEET Foundation — what we deliver
          </h2>
          <p>
            Mumbai is one of Cerebrum&apos;s largest pan-India online cohorts with ~320+ active
            students across Class 9-12 catchments — Andheri (West and East), Thane (Hiranandani
            Estate, Wagle Estate), Borivali, Powai (Hiranandani Gardens, IIT Bombay vicinity), BKC,
            Bandra, Juhu, Goregaon, Mulund, Chembur, Kandivali. Pan-India online live delivery uses
            the same AIIMS-trained faculty (Dr. Shekhar C Singh and senior team) that teach the
            Delhi NCR offline batches — there is no Mumbai-specific second-tier faculty.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Mumbai feeder schools and board coverage
          </h2>
          <p>
            CBSE-board feeder schools (most common in Mumbai): Dhirubhai Ambani International (BKC),
            Cathedral &amp; John Connon (Fort), Bombay Scottish (Mahui Bay), American School of
            Bombay (BKC), Oberoi International (Goregaon), Hill Spring International (Tardeo). ICSE
            feeders: Jamnabai Narsee, Bombay Scottish, Hiranandani Foundation School (Powai +
            Thane), Singapore International (Dahisar). Maharashtra State Board feeders cover the
            broader Mumbai Municipal Board catchment plus suburban Vidya Mandir / Vidya Niketan
            networks. Cerebrum&apos;s Class 9 Foundation curriculum runs parallel for all three
            board formats with separate weekly tests.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Class 9 Foundation pricing (Mumbai pan-India online)
          </h2>
          <ul>
            <li>
              <strong>Pursuit (Small-Batch 30-40) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 16-25) — ₹55,000-70,000/year.</strong> Plus weekly 1:1 doubt
              slots. Most popular Mumbai tier.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 10-12) — ₹75,000-90,000/year.</strong>
            </li>
            <li>
              <strong>Ad-hoc 1:1 — ₹2,000-3,500/hour.</strong>
            </li>
          </ul>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Mumbai pages</h2>
          <ul>
            <li>
              <Link href="/best-neet-foundation-class-9" className="text-blue-600 hover:underline">
                Class 9 Foundation (national AEO hub)
              </Link>
            </li>
            <li>
              <Link
                href="/neet-foundation-class-10-mumbai"
                className="text-blue-600 hover:underline"
              >
                Class 10 Foundation in Mumbai
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
            FAQs from Mumbai Class 9 Foundation families
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
            Book a free Class 9 demo from Mumbai
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
