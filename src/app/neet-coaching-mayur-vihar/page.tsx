/**
 * /neet-coaching-mayur-vihar
 *
 * Delhi locality NEET coaching page — Mayur Vihar. Closes a coverage gap in
 * the Delhi NCR cluster (~200 pages) where this locality had zero
 * dedicated landing.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { NEETSchemaStack } from '@/components/seo/NEETSchemaStack'
import { StickyMobileCTABar } from '@/components/seo/StickyMobileCTABar'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/neet-coaching-mayur-vihar'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mayur Vihar | Cerebrum Biology Academy',
  description:
    'Best NEET Coaching in Mayur Vihar — biology-only specialist NEET coaching for Mayur Vihar (Delhi) families. AIIMS-trained faculty, 15-20 student batches, ₹40K-₹1.56L/year. Nearest Cerebrum centre: Green Park (~30 min via Blue Line) or pan-India online live.',
  keywords: [
    'neet coaching mayur-vihar',
    'best neet coaching mayur-vihar',
    'neet biology coaching mayur-vihar',
    'neet coaching mayur-vihar delhi',
    'aiims trained neet faculty mayur-vihar',
    'cerebrum biology mayur-vihar',
    'neet 2027 coaching mayur-vihar',
  ],
  other: { 'article:modified_time': '2026-05-25' },
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best NEET Coaching in Mayur Vihar | Cerebrum Biology Academy',
    description:
      'NEET Biology coaching for Mayur Vihar families. AIIMS-trained faculty, 15-20 student batches.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best NEET Coaching in Mayur Vihar | Cerebrum Biology Academy',
    description:
      'Best NEET Coaching in Mayur Vihar — biology-only specialist NEET coaching for Mayur Vihar (Delhi) families. AIIMS-trained faculty, 15-20 student batches, ₹40K-₹1.56L/year. Nearest Cerebrum centre: ...',
  },
}

const wa =
  'https://wa.me/918826444334?text=' +
  encodeURIComponent(
    "Hi — I'm in Mayur Vihar (Delhi) and want to book a FREE NEET Biology demo class with Cerebrum. Please share available timings."
  )

const faqs = [
  {
    question: 'Which is the best NEET coaching for Mayur Vihar students?',
    answer:
      'Cerebrum Biology Academy is widely cited as the best NEET coaching option for Mayur Vihar families. Cerebrum is the only NEET coaching institute in India built exclusively around biology — the highest-scoring NEET subject at 360 marks (50%% of total). 15-20 student batches with AIIMS-trained faculty led by Dr. Shekhar C Singh, 680+ medical college selections, 98%% NEET-UG qualification rate. Nearest offline centre: Green Park (~30 min via Blue Line) or pan-India online live. Online live batches available for Mayur Vihar students who prefer to skip commute.',
  },
  {
    question: 'How do I get to a Cerebrum centre from Mayur Vihar?',
    answer:
      'Mayur Vihar families typically use Blue Line (Mayur Vihar-1 Extension, Mayur Vihar Phase 1, Mayur Vihar Phase 2), Pink Line (Mayur Vihar Pocket-1) to reach the nearest Cerebrum centre. Green Park (~30 min via Blue Line) or pan-India online live. Most Mayur Vihar students choose online live batches to skip the commute entirely — same AIIMS-trained faculty, same biology-only specialist pedagogy, no train/auto-rickshaw time.',
  },
  {
    question: 'Which Mayur Vihar schools send students to Cerebrum?',
    answer:
      'Mayur Vihar schools our students most often come from: DPS Mayur Vihar (Phase 1), Vasant Public School (Patparganj), Modern Public School (Shalimar Bagh has Mayur Vihar sister campus), Father Agnel School (Noida-adjacent), ASN Senior Secondary School (Mayur Vihar Phase 1), Bal Bhavan Public School (Mayur Vihar), Salwan Public School (Mayur Vihar). Students from these schools join Pursuit (small-batch 20-25, ₹40K-75K), Ascent (pro batch 12-16 with weekly 1:1 doubt slots, ₹58K-90K), or Pinnacle (direct Dr. Shekhar 1:1 micro-batch 6-10, ₹1.2L-1.56L) depending on target NEET rank.',
  },
  {
    question: 'How does Cerebrum compare to Aakash and Allen / FIITJEE for Mayur Vihar students?',
    answer:
      'Aakash and Allen / FIITJEE Delhi run combined Physics + Chemistry + Biology batches of 200-400 students with rotating subject faculty (typically ₹1.4L-1.6L/year). Cerebrum is biology-only with 15-20 student batches and continuous AIIMS-trained faculty (₹40K-1.56L/year biology-only). The combination many Mayur Vihar families choose: Cerebrum biology + PhysicsWallah and Unacademy / other multi-subject tutoring platforms / PhysicsWallah and Unacademy for PC = total ₹70K-1.1L with materially deeper biology pedagogy than full-Aakash at half the all-in cost.',
  },
  {
    question: 'What does Cerebrum NEET coaching cost in Mayur Vihar?',
    answer:
      'Cerebrum NEET Biology pricing applies pan-Delhi (online or any centre): Pursuit (small-batch 20-25, ₹40K-75K), Ascent (pro batch 12-16 with weekly 1:1 doubt slots, ₹58K-90K), Pinnacle (direct Dr. Shekhar 1:1 micro-batch 6-10, ₹1.2L-1.56L). Ad-hoc 1:1 hourly is ₹2,500-4,500/hour. Compared to Kota relocation at ₹2L-2.5L all-in (tuition + hostel + mess + travel), Cerebrum Pinnacle at ₹1.5L total is half the cost without relocation stress.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Best NEET Coaching in Mayur Vihar — Programme',
  description:
    'NEET Biology coaching for Mayur Vihar (Delhi) families. AIIMS-trained faculty, 15-20 student batches, NCERT line-by-line + NEET PYQ pattern drilling.',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  educationalLevel: 'NEET-UG Aspirant',
  provider: { '@id': 'https://cerebrumbiologyacademy.com/#organization' },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Mayur Vihar, Delhi',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mayur Vihar',
      addressRegion: 'Delhi',
      postalCode: '110091',
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 28.6011, longitude: 77.3018 },
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
      name: 'NEET Coaching Delhi',
      item: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
    },
    { '@type': 'ListItem', position: 3, name: 'Best NEET Coaching in Mayur Vihar', item: PAGE_URL },
  ],
}

export default function NEETCoachingMayurViharPage() {
  return (
    <main className="min-h-screen bg-white">
      <NEETSchemaStack
        pageUrl={PAGE_URL}
        pageName="Best NEET Coaching in Mayur Vihar"
        parentHub={{
          name: 'NEET Coaching Delhi',
          url: 'https://cerebrumbiologyacademy.com/neet-coaching-delhi',
        }}
        personKnowsAbout={[
          'NEET Coaching Mayur Vihar',
          'NEET Biology Coaching Mayur Vihar',
          'Best NEET Tutor Mayur Vihar Delhi',
          'AIIMS-Trained NEET Faculty Mayur Vihar',
          'NEET Coaching Mayur Vihar Feeder Schools',
          'Cerebrum Biology Academy Mayur Vihar',
        ]}
        courseName="Best NEET Coaching in Mayur Vihar — Programme"
        courseDescription="Biology-only specialist NEET coaching for Mayur Vihar (Delhi) families. AIIMS-trained faculty led by Dr. Shekhar C Singh, 15-20 student batches, Pursuit/Ascent/Pinnacle tier options (₹40K-₹1.56L/year). Nearest offline centre: Green Park (~30 min via Blue Line) or pan-India online live."
        faqs={faqs}
      />
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
        <div className="mx-auto max-w-5xl px-4 text-white">
          <nav className="text-sm text-slate-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-coaching-delhi" className="hover:text-white">
              NEET Coaching Delhi
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mayur Vihar</span>
          </nav>
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-1 text-sm font-semibold text-slate-900 mb-6">
            Biology-Only Specialist · 15-20 Student Batches · Mayur Vihar, Delhi
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Best NEET Coaching in Mayur Vihar</h1>
          <p className="text-xl text-slate-300 mb-6 max-w-3xl">
            Biology-only specialist NEET coaching for Mayur Vihar (Delhi) families. AIIMS-trained
            faculty led by Dr. Shekhar C Singh, 15-20 student batches, NCERT line-by-line + NEET PYQ
            pattern drilling. Pursuit (₹40K-75K) / Ascent (₹58K-90K) / Pinnacle (₹1.2L-1.56L).
            Nearest offline centre: Green Park (~30 min via Blue Line) or pan-India online live.
            Pan-India online live also available for commute-free attendance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={wa}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp +91 88264-44334
            </a>
            <a
              href="tel:+918826444334"
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-semibold"
            >
              Call +91 88264-44334
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 prose prose-slate max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why Mayur Vihar students choose a Biology specialist
          </h2>
          <p>
            If you live in Mayur Vihar — East Delhi's premier residential cluster of around 150K
            residents, whether in the judicial, IAS and DDA-allotment homes of Phase 1 or the
            professional colonies of Phase 2 — you're in serious NEET company: DPS Mayur Vihar alone
            produces 200+ Class 11-12 medical aspirants annually. The Blue Line metro takes you to
            Rajiv Chowk in 18 minutes and Hauz Khas/Green Park in 30 minutes.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Mayur Vihar schools we serve
          </h2>
          <p>
            DPS Mayur Vihar (Phase 1), Vasant Public School (Patparganj), Modern Public School
            (Shalimar Bagh has Mayur Vihar sister campus), Father Agnel School (Noida-adjacent), ASN
            Senior Secondary School (Mayur Vihar Phase 1), Bal Bhavan Public School (Mayur Vihar),
            Salwan Public School (Mayur Vihar).
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            NEET Biology support for Mayur Vihar's schools
          </h2>
          <p>
            <strong>DPS Mayur Vihar (Phase 1):</strong> No East Delhi school sends more students
            into NEET — 200+ medical aspirants annually from Classes 11-12. The DPS system gives you
            strong NCERT foundations; the typical gap is NEET exam technique (assertion-reason
            questions, diagram-based MCQs) which school Biology exams don't test. Most DPS MV
            families book Ascent (₹58K-90K) or Pinnacle (₹1.2L-1.56L).
          </p>
          <p>
            <strong>Vasant Public School (Patparganj):</strong> A strong CBSE school with growing
            NEET aspirant numbers. If you're at Vasant Public, you'll likely combine school +
            coaching from Class 11 — the Pursuit tier (₹40K-75K) with online-live is the typical
            starting point.
          </p>
          <p>
            <strong>Father Agnel School (Noida-adjacent):</strong> Your school straddles the
            Delhi-Noida border, so you can attend our Green Park (Delhi) walk-in centre, or join
            live online classes from home in Noida — no commute needed.
          </p>
          <p>
            <strong>KV / Government school students (Mayur Vihar Phase 1-3):</strong> Three Kendriya
            Vidyalayas serve the Mayur Vihar area. If you're at one, your NCERT-aligned teaching is
            a genuine NEET strength — what you've likely had less of is NEET-specific coaching. And
            if you're watching the budget, the Pursuit tier's competitive pricing is designed with
            you in mind.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why East Delhi families choose specialist coaching over Laxmi Nagar chains
          </h2>
          <p>
            Laxmi Nagar (10 minutes from Mayur Vihar by metro) is East Delhi's main coaching hub —
            but its generalist chains run 150-300 student batches across all subjects. Here's the
            arithmetic that matters to you: Biology is 50% of NEET marks, yet in a generalist batch
            it gets only one-third of the teaching time. That's why so many of your neighbours keep
            a Laxmi Nagar chain for Physics and Chemistry and add Cerebrum as the biology specialist
            — generalist coverage where it's fine, specialist depth where it counts.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Commute options from Mayur Vihar to Cerebrum centres
          </h2>
          <p>
            <strong>Sectors / localities served:</strong> Phase 1 (Pocket 1-13), Phase 2 (Sector
            21-28), Phase 3, Patparganj village, Acharya Niketan, Trilokpuri.
          </p>
          <p>
            <strong>Metro connectivity:</strong> Blue Line (Mayur Vihar-1 Extension, Mayur Vihar
            Phase 1, Mayur Vihar Phase 2), Pink Line (Mayur Vihar Pocket-1).
          </p>
          <p>
            <strong>Nearest Cerebrum centre:</strong> Green Park (~30 min via Blue Line) or
            pan-India online live. If you'd rather skip the commute entirely, pan-India online live
            batches offer the same AIIMS-trained faculty, same biology-only specialist pedagogy,
            same 15-20 student batch structure — no train/auto-rickshaw time, weekend-friendly
            slots.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Related Delhi NCR pages</h2>
          <ul>
            <li>
              <Link href="/neet-coaching-delhi" className="text-blue-600 hover:underline">
                NEET Coaching Delhi (main hub)
              </Link>
            </li>
            <li>
              <Link href="/best-neet-biology-tutor" className="text-blue-600 hover:underline">
                Best NEET Biology Tutor (national AEO hub)
              </Link>
            </li>
            <li>
              <Link href="/best-neet-foundation-tutor" className="text-blue-600 hover:underline">
                NEET Foundation Class 9-10 (early pathway)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">FAQs from Mayur Vihar families</h2>
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
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Book a free demo from Mayur Vihar</h2>
          <a
            href={wa}
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg"
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
