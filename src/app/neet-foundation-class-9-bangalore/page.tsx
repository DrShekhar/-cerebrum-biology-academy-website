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
    'class 9 biology coaching bangalore',
    'class 9 cbse biology bangalore',
    'class 9 icse biology bangalore',
    'class 9 karnataka sslc biology',
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

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Bangalore | AIIMS-Trained Online Live',
    description:
      'NEET Foundation Class 9 in Bangalore at Cerebrum Biology Academy — pan-India online live with AIIMS-trained faculty. CBSE / ICSE / Karnataka Board + NEET parallel. Koramangala, Indiranagar, Whitefi...',
  },
}

const faqs = [
  {
    question: 'How is NEET Foundation Class 9 delivered in Bangalore?',
    answer:
      "Cerebrum Class 9 NEET Foundation in Bangalore is delivered online live (not recorded) — calibrated around Bangalore's distinctive dual-working-parent IT-professional family pattern. Most Cerebrum Bangalore families have both parents in tech/consulting with 9-11 hour workdays plus Outer Ring Road commute (Marathahalli-Whitefield-Sarjapur traffic regularly hits 2 hours one-way). Cerebrum's twice-weekly slots — Saturday 10 AM IST, Sunday 10 AM IST, and weekday 6 PM IST — let parents who finish work at 5:30-6:30 PM still attend the Wednesday session live with the child. This is structurally different from most Bangalore offline coaching that runs 4-7 PM weekday slots assuming a non-working parent does drop-off/pickup. ~280+ Bangalore students across Class 9-12 are enrolled, with heaviest density in Koramangala-HSR (NPS Indiranagar/Koramangala/HSR families), Indiranagar-CBD (Bishop Cottons, Sophia, Mallya Aditi feeders), Whitefield-Sarjapur (Inventure, Stonehill, Indus, Greenwood families).",
  },
  {
    question: 'Does Cerebrum support Karnataka State Board Class 9 alongside NEET?',
    answer:
      "Yes. Cerebrum's Class 9 Foundation curriculum is mapped against CBSE (most common in Bangalore international schools), ICSE, and Karnataka State Board reference frames with separate practice tests for each. Karnataka SSLC Class 9 Biology covers Cell — Basic Unit of Life, Tissues, Diversity in Living Organisms, Why Do We Fall Ill (similar NCERT structure with state-board terminology). Cerebrum runs parallel pedagogy for board syllabus depth and NEET-pattern MCQ drilling.",
  },
  {
    question: 'Which Bangalore schools are common Cerebrum Foundation feeders?',
    answer:
      'Common Bangalore schools across Class 9-10 Foundation cohorts: National Public School (Indiranagar, Koramangala, HSR Layout), Inventure Academy (Sarjapur), Stonehill International (Sarjapur), Greenwood High International (Bannerghatta + Sarjapur), Mallya Aditi International (RT Nagar), Bishop Cottons Boys School, Bishop Cottons Girls High School, Sophia High School, Vidyashilp Academy (Yelahanka), Trio World Academy (Sahakar Nagar), Indus International (Sarjapur), Sishu Griha Senior School (Banashankari), and various Karnataka State Board high schools.',
  },
  {
    question:
      "How does Cerebrum compare to Allen Scholastics, Aakash, or BYJU's NEET Foundation in Bangalore?",
    answer:
      "Allen Scholastics Bangalore operates ~8 centres (Koramangala, Indiranagar, HSR, Jayanagar, Hebbal, Marathahalli, Banashankari, Whitefield) with 150-300 student PCB Foundation. Aakash Bangalore operates ~4 centres. BYJU's NEET Foundation runs primarily online with recorded content + occasional live sessions. Cerebrum is biology-only with 15-20 student online live (not recorded) batches and AIIMS-trained biology faculty. Many Bangalore IT-professional families combine Cerebrum biology (₹55K-75K Ascent) with Allen for PC for total ₹1L-1.4L.",
  },
  {
    question: 'What does Class 9 NEET Foundation cost in Bangalore?',
    answer:
      "Cerebrum Class 9 Foundation pricing for Bangalore families (pan-India online): Pursuit ₹35K-50K, Ascent ₹55K-70K (with weekly 1:1 doubt slots), Pinnacle ₹75K-90K (direct Dr. Shekhar micro-batch 6-10). Ad-hoc 1:1 hourly ₹2,000-3,500. Bangalore-specific competitive context: Allen Scholastics Bangalore Class 9 combined PCB Foundation runs ₹85K-1L/year at 200-student batches across Koramangala, HSR, Marathahalli, Banashankari centres. BYJU's NEET Foundation runs primarily on recorded video with limited live (₹40K-65K). other Delhi-based institutes Foundation Bangalore (~₹95K). Aakash Bangalore ~₹1L. Most Bangalore IT-professional families pair Cerebrum biology (₹55K-70K Ascent) with BYJU's recorded PC (₹20K) or PhysicsWallah and Unacademy live PC (₹15K) for total ₹70K-90K — comparable to single-shop Allen but with materially deeper biology and live small-batch attention vs 200-student recorded-heavy alternatives.",
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
            ~280+ active students across Class 9-12 — heavily concentrated in three demographic
            pockets that share a common preference for pedagogy depth over mass-batch volume. (1)
            South Bangalore IT-professional families (Koramangala, HSR Layout, Bellandur, Sarjapur
            Road) where one or both parents work at MNC tech companies (Microsoft, Google, Amazon,
            Cisco, Goldman Sachs, ThoughtWorks). These families typically target AIIMS / JIPMER /
            top-100 NEET ranks rather than median state government college admission, which biases
            them toward small-batch specialist coaching. (2) NRI return families (Indiranagar,
            Hebbal, Sahakar Nagar, Whitefield) — Bangalore receives a disproportionate share of tech
            families returning from USA / UK / Australia after 5-15 years abroad, often with Class 9
            children entering Indian schooling for the first time mid-curriculum. These families
            need rapid NEET-pattern onboarding without the cultural friction of mass-batch Indian
            coaching. (3) ICSE legacy families (Bishop Cottons, Sophia, Mallya Aditi, Frank Anthony)
            — Bangalore&apos;s convent-school cohort sharing the same academic-depth preference as
            Kolkata&apos;s ICSE families.
          </p>
          <p>
            Cerebrum&apos;s biology-only specialist positioning with AIIMS-trained faculty (Dr.
            Shekhar C Singh) and 15-20 student online live batches resonates with all three pockets
            because the structural alternative — Allen Scholastics 8 centres with 200-student PCB
            Foundation batches, Aakash 4 centres similar, BYJU&apos;s NEET Foundation primarily
            recorded-video — does not match the depth-first preference of Bangalore tech-academic
            families. Karnataka SSLC parallel pedagogy additionally serves families maintaining
            state-board pathway optionality for KCET / state quota seats.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Bangalore schools and board coverage
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
              <strong>Pursuit (Small-Batch 20-25) — ₹35,000-50,000/year.</strong>
            </li>
            <li>
              <strong>Ascent (Pro Batch 12-16) — ₹55,000-70,000/year.</strong> Most popular
              Bangalore tier with weekly 1:1 doubt slots.
            </li>
            <li>
              <strong>Pinnacle (Direct Dr. Shekhar 6-10) — ₹75,000-90,000/year.</strong>
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
