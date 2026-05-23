/**
 * /dse-biology-tutor-hong-kong
 *
 * Hong Kong HKDSE Biology tutoring landing page.
 *
 * HKDSE (Hong Kong Diploma of Secondary Education) Biology is a HK-specific
 * exam administered by HKEAA — distinct from IB Biology. It's the local
 * track for Hong Kong public + DSS school students applying to HKU, CUHK,
 * HKUST, PolyU and overseas universities.
 *
 * Primary keyword: "DSE Biology tutor Hong Kong" — uncontested in
 * Cerebrum's content cluster.
 *
 * Geo-gate: hidden from India IPs via hideFromCountries(['IN']). Indian
 * traffic to this page is almost never qualified.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { hideFromCountries } from '@/lib/geo/hideFromCountries'
import { MessageCircle, MapPin, Clock, CheckCircle2, Calendar, Award } from 'lucide-react'

/**
 * Force runtime rendering so the India geo-gate fires on every request.
 * Without this, Next.js statically pre-renders the page at build time and the
 * `await headers()` check inside hideFromCountries() would be bypassed by the
 * static cache. Middleware in middleware.ts also gates this path as a
 * second-line defence (the two are intentionally redundant).
 */
export const dynamic = 'force-dynamic'

const CANONICAL = 'https://cerebrumbiologyacademy.com/dse-biology-tutor-hong-kong'

export const metadata: Metadata = {
  title: 'HKDSE Biology Tutor Hong Kong | 2025 Syllabus, Paper 1 & 2 Coaching | Cerebrum',
  description:
    'Expert HKDSE Biology tutoring in Hong Kong for the 2025-reformed syllabus. Paper 1 MC + Paper 2 SAQ specialist coaching. HK$500–750/hr group, HK$900–1,400/hr 1:1 with examiner-trained faculty.',
  keywords: [
    'DSE Biology tutor Hong Kong',
    'HKDSE Biology tuition',
    'DSE Biology Paper 1 coaching',
    'DSE Biology Paper 2 SAQ tutor',
    'HKDSE 2025 syllabus Biology',
    'DSE Biology Level 5 5* 5** tutor',
    'HKDSE Biology Form 5 Form 6 coaching',
    'DSE Biology online tutor Hong Kong',
    'best DSE Biology tutor HK',
    'JUPAS Biology preparation',
  ],
  alternates: {
    canonical: CANONICAL,
    languages: {
      'en-HK': CANONICAL,
      en: CANONICAL,
      'x-default': CANONICAL,
    },
  },
  openGraph: {
    title: 'HKDSE Biology Tutor Hong Kong | 2025 Syllabus | Cerebrum',
    description:
      'Expert HKDSE Biology tutoring in Hong Kong for the 2025-reformed syllabus. Paper 1 + Paper 2 specialist coaching, HK$500–750/hr.',
    url: CANONICAL,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    locale: 'en_HK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HKDSE Biology Tutor Hong Kong',
    description: 'Expert HKDSE Biology coaching for 2025 syllabus. Paper 1 + Paper 2 specialist.',
  },
  robots: { index: true, follow: true },
}

const hkSchools = [
  'Diocesan Boys School (DBS)',
  'Diocesan Girls School (DGS)',
  'Queen Elizabeth School (QES)',
  'La Salle College',
  "St Paul's Co-educational College",
  "St Paul's Convent School",
  'Wah Yan College',
  "King's College",
  "St Stephen's Girls College",
  'Heep Yunn School',
  'Maryknoll Convent School',
  'Sing Yin Secondary School',
  'Tang King Po School',
  'Ying Wa College',
  'Pui Ching Middle School',
  'Marymount Secondary School',
]

const faqs = [
  {
    question: 'What is changing in the HKDSE Biology 2025 syllabus?',
    answer:
      'HKEAA introduced the reformed HKDSE Biology syllabus starting from the 2025 examination. Key shifts: stronger emphasis on practical experimental design (Paper 1 Section B), revised molecular biology and genetics weighting, updated ecology and biodiversity topics aligned with current research, and tighter integration with biotechnology applications. Our coaching follows the 2025 HKEAA Curriculum & Assessment Guide line-by-line — many Form 5–6 students under the reformed syllabus have outdated textbooks, which is why specialist coaching matters this year.',
  },
  {
    question: 'How does HKDSE Biology differ from IB Biology HL/SL?',
    answer:
      'HKDSE Biology and IB Biology cover overlapping concepts but use very different exam formats. HKDSE has Paper 1 (multiple-choice + short structured questions, 2.5 hrs) and Paper 2 (data-based + essay-style questions, 1.5 hrs) — both Chinese or English medium. IB Biology has Paper 1 (MC), Paper 2 (data + essays), and Internal Assessment (24 marks, individual scientific investigation). Mastery in one does not directly transfer to the other. Cerebrum offers both DSE Biology and IB Biology tracks with separate faculty preparation pathways.',
  },
  {
    question: 'What score levels do your DSE Biology students typically achieve?',
    answer:
      'Our DSE Biology coaching targets Level 5 / 5* / 5** — the band that opens HKU Medicine, CUHK Medicine, HKUST, PolyU Health Sciences, and overseas Russell Group / Ivy League admissions. Form 6 students joining our intensive crash programme typically lift one full HKDSE band over a 4–6 month preparation cycle. We track Form 5 mid-year mocks and Form 6 January mocks as benchmarking checkpoints.',
  },
  {
    question: 'How much does HKDSE Biology tutoring cost in Hong Kong?',
    answer:
      'Our HKDSE Biology coaching is priced at HK$500–750/hour for small group sessions (4–8 Form 5/6 students) and HK$900–1,400/hour for 1:1 with examiner-trained faculty. Annual Form 6 intensive package (40–60 sessions covering full syllabus revision + paper-pattern training + mock series) starts at HK$28,000. Compare: elite HK private tutors charge HK$800–1,500/hour for 1:1 with no group option, and brand-name HK tutorial centres pack 50+ students per session at HK$150–250/hour with limited per-student attention.',
  },
  {
    question: 'Do you offer in-person classes or only online?',
    answer:
      'We offer live online HKDSE Biology classes for Hong Kong students, timed for Hong Kong evenings (HKT 19:00–22:00) and weekend mornings. All sessions are interactive video with a digital whiteboard, recorded for revision, and supported by WhatsApp doubt-clearing across HKT hours. Students at Mid-Levels, Pok Fu Lam, Repulse Bay, Sai Kung, Kowloon Tong and across the territory join from home — saving 2+ hours of MTR travel daily compared to brick-and-mortar tutorial centres in Causeway Bay or Mong Kok.',
  },
  {
    question: 'Can I prepare for both HKDSE Biology and HKBO (Hong Kong Biology Olympiad)?',
    answer:
      'Yes — many of our top Form 5/6 students do exactly this. HKBO is administered by HKAGE + CUHK with a single MCQ screening round, then Phase I/II training for top scorers leading to IBO Hong Kong team selection. The HKBO Phase I content extends beyond DSE Biology into university-level cell biology, biochemistry, and molecular biology. We offer a combined HKDSE + HKBO track for ambitious students, with shared core biology foundations and a separate olympiad-extension module.',
  },
  {
    question: 'What JUPAS programmes does strong HKDSE Biology unlock?',
    answer:
      'A Level 5 / 5* in HKDSE Biology is essential for HKU MBBS (typically 5*+ across all electives), CUHK MBBS, HKU Dentistry, HKU Pharmacy, CUHK Pharmacy, PolyU Physiotherapy / Optometry / Nursing, HKUST Life Science / Biotechnology, and CityU Veterinary Medicine. For overseas applications, strong DSE Biology supports UK Russell Group medicine (Imperial, UCL, KCL, Edinburgh, Manchester), Ivy League biology majors, and Australian/Canadian medicine pathways via DSE conversion equivalents.',
  },
  {
    question: 'My child is a Cantonese-medium DSE student. Can your English-medium tutors help?',
    answer:
      "Yes — and this is a sub-segment we serve directly. Our tutors teach in English (Hong Kong's academic medium for DSE Biology). For Cantonese-medium students, we use a bilingual reference approach: concepts are explained in English using HKEAA examiner-pattern language, with Cantonese/Mandarin glossary support on request. Many Cantonese-medium DSE Biology students score better in the English paper format with our coaching than they would in Cantonese-only local tutorial centres.",
  },
]

function CourseSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'HKDSE Biology Tutoring — Hong Kong',
    description:
      'Specialist HKDSE Biology coaching for Form 5 + Form 6 students. 2025-reformed syllabus, Paper 1 MC + structured + Paper 2 data + essay specialist preparation.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    courseCode: 'HKDSE-BIO',
    educationalLevel: 'Senior Secondary (Form 5 + Form 6)',
    teaches: 'HKDSE Biology Paper 1 + Paper 2 examination preparation',
    inLanguage: 'en-HK',
    availableLanguage: ['English'],
    audience: {
      '@type': 'EducationalAudience',
      audienceType: 'Hong Kong Form 5 and Form 6 students',
      geographicArea: {
        '@type': 'Country',
        name: 'Hong Kong',
      },
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'HKD',
      price: '500',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'HKD',
        price: 500,
        unitText: 'HOUR',
        minPrice: 500,
        maxPrice: 750,
      },
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseSchedule: {
          '@type': 'Schedule',
          repeatFrequency: 'P1W',
          byDay: ['Tuesday', 'Thursday', 'Saturday'],
        },
        location: {
          '@type': 'VirtualLocation',
          url: CANONICAL,
        },
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function DSEBiologyHongKongPage() {
  await hideFromCountries(['IN'])

  return (
    <>
      <CourseSchema />
      <FAQSchema questions={faqs} pageUrl={CANONICAL} />
      <BreadcrumbSchema
        items={[
          { label: 'Home', href: 'https://cerebrumbiologyacademy.com/' },
          { label: 'Hong Kong', href: 'https://cerebrumbiologyacademy.com/ib-biology/hong-kong' },
          { label: 'HKDSE Biology Tutor', isCurrentPage: true },
        ]}
        showSchemaOnly
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
                <Calendar className="w-4 h-4" />
                2025 HKEAA Reformed Syllabus · Form 5 + Form 6
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                HKDSE Biology Tutor in Hong Kong
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-6">
                Specialist HKDSE Biology coaching for Hong Kong Form 5 + Form 6 students under the
                reformed 2025 syllabus. Paper 1 (MC + structured) + Paper 2 (data + essay)
                examiner-pattern preparation. Targeting Level 5 / 5* / 5** for HKU, CUHK, HKUST,
                PolyU, and overseas Russell Group medicine + biology admissions.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  HK$500–750 / hour group
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  HKT evening + weekend
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Examiner-trained faculty
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* TL;DR */}
          <section className="mb-12 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6">
            <h2 className="text-xl font-bold text-amber-900 mb-3">The Short Answer</h2>
            <p className="text-amber-950 leading-relaxed">
              Cerebrum Biology Academy offers <strong>HKDSE Biology tutoring</strong> for Hong Kong
              Form 5 + Form 6 students under the reformed <strong>2025 HKEAA syllabus</strong>. Live
              online sessions in HKT evening / weekend slots, group classes at{' '}
              <strong>HK$500–750/hour</strong> (4–8 students) and 1:1 examiner-led at{' '}
              <strong>HK$900–1,400/hour</strong>. Specialist preparation for Paper 1 (MC +
              structured) and Paper 2 (data-based + essay). Annual Form 6 intensive package from
              HK$28,000 covering full revision + paper-pattern training + 8+ mock papers with
              examiner-pattern feedback.
            </p>
          </section>

          {/* Why Cerebrum for HKDSE */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why HKDSE Biology Students in Hong Kong Choose Cerebrum
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  2025 Reformed Syllabus Specialist
                </h3>
                <p className="text-gray-600 text-sm">
                  The HKEAA 2025 syllabus reform changed practical experimental design weighting,
                  molecular biology depth, and biotechnology applications. Our curriculum follows
                  the new Curriculum &amp; Assessment Guide line-by-line — many Form 5–6 students
                  are still using outdated textbooks aligned with the pre-2025 syllabus.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Paper 1 + Paper 2 Pattern Mastery
                </h3>
                <p className="text-gray-600 text-sm">
                  Paper 1 (MC + short structured, 2.5 hrs) and Paper 2 (data-based + essay-style,
                  1.5 hrs) require distinct strategies. Our coaching includes weekly paper-pattern
                  drills with examiner-trained marking schemes — Form 6 students see 1+ band lift in
                  4–6 months.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Hong Kong Time Zone &amp; Top Schools
                </h3>
                <p className="text-gray-600 text-sm">
                  Live online sessions in HKT 19:00–22:00 weekday + weekend morning slots. Students
                  from DBS, DGS, QES, La Salle, St Paul&apos;s, Wah Yan, King&apos;s, Ying Wa, Pui
                  Ching and other top HK Form 5/6 schools join from Mid-Levels, Pok Fu Lam, Repulse
                  Bay, Sai Kung, Kowloon Tong and across the territory.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  HKBO + JUPAS Cross-Track Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Ambitious Form 5/6 students often layer HKBO (Hong Kong Biology Olympiad)
                  preparation on top of HKDSE Biology. Our combined track adds an olympiad extension
                  module (university-level cell biology, biochemistry, molecular biology) for HKBO
                  Phase I / Phase II training without losing DSE focus.
                </p>
              </div>
            </div>
          </section>

          {/* HK Schools served */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              HKDSE Biology Students from Top Hong Kong Schools
            </h2>
            <p className="text-gray-600 mb-4">
              Our HKDSE Biology coaching has supported Form 5 and Form 6 students from a wide range
              of Hong Kong&apos;s leading senior secondary schools:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {hkSchools.map((school) => (
                <div
                  key={school}
                  className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-200 text-sm text-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  {school}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              School names are descriptive of students we&apos;ve coached; we are not affiliated
              with, endorsed by, or partnered with any individual school.
            </p>
          </section>

          {/* Pricing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">HKDSE Biology Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Group Sessions</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">HK$500–750/hr</div>
                <p className="text-sm text-gray-600">
                  4–8 Form 5/6 students. Live online. HKT evening or weekend morning slots. Includes
                  weekly homework + WhatsApp doubt support.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-500">
                <div className="text-sm text-blue-700 mb-1 font-semibold">
                  Form 6 Intensive (Recommended)
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-2">From HK$28,000/yr</div>
                <p className="text-sm text-blue-900">
                  40–60 sessions covering full syllabus revision + paper-pattern training + 8+ mock
                  papers with examiner-pattern feedback. Target: Level 5 / 5* / 5**.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">1:1 Examiner</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">HK$900–1,400/hr</div>
                <p className="text-sm text-gray-600">
                  Individual coaching with examiner-trained faculty. Best for Form 6 students
                  targeting 5** band, or for Form 5 mocks-recovery candidates.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Book a Free HKDSE Biology Demo
              </h2>
              <p className="text-blue-100 mb-6">
                30-minute live demo with our HKDSE Biology faculty. Bring a past paper question or a
                syllabus topic you find difficult — we&apos;ll show you the examiner-pattern
                approach.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/918826444334?text=Hi%20Cerebrum%2C%20I%27m%20a%20HKDSE%20Biology%20student%20in%20Hong%20Kong%20and%20would%20like%20to%20book%20a%20free%20demo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp for Demo
                </a>
                <Link
                  href="/ib-biology/hong-kong"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl transition-colors"
                >
                  Also Doing IB Biology? →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions — HKDSE Biology Hong Kong
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-gray-500 group-open:rotate-180 transition-transform">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Hong Kong Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'IB Biology Tutor Hong Kong', href: '/ib-biology/hong-kong' },
                { label: 'AP Biology Tutor Hong Kong', href: '/ap-biology-tutor-hong-kong' },
                { label: 'Best IB Biology Tutor', href: '/best-ib-biology-tutor' },
                {
                  label: 'Top IB Biology Coaching Global',
                  href: '/top-ib-biology-coaching-global',
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
