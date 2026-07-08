/**
 * /campbell-biology-summer-program-india  (NATIONAL / India audience)
 *
 * India-framed sibling of /campbell-biology-summer-program. Positions
 * Campbell Biology as the summer edge for NEET droppers/aspirants and
 * Class 11–12 students who want depth beyond NCERT, plus Indian students
 * targeting AP/IB or the INBO/IBO olympiad track. INR pricing framing,
 * NEET + NCERT crosswalk emphasis, IST scheduling.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Microscope,
  Phone,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/campbell-biology-summer-program-india'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Campbell Biology Summer Program India — NEET Edge · Class 11–12 · Olympiad | Cerebrum',
  description:
    'India’s intensive summer program on Campbell Biology — the global-standard text — for NEET aspirants, droppers, and Class 11–12 students who want depth beyond NCERT, plus INBO/IBO olympiad and AP/IB aspirants. Live online in IST with AIIMS-trained faculty Dr. Shekhar C Singh. Free demo class.',
  keywords: [
    'campbell biology summer program india',
    'campbell biology for neet',
    'campbell biology course india',
    'campbell biology for class 11',
    'campbell biology for class 12',
    'campbell biology neet foundation',
    'biology summer course india',
    'neet biology summer intensive',
    'campbell biology online india',
    'campbell biology for indian students',
    'biology olympiad summer prep india INBO',
    'beyond ncert biology campbell',
    'summer biology crash course neet',
    'campbell biology tutor india',
  ],
  alternates: {
    canonical: PAGE_URL,
    // Reciprocal with the global sibling: en-IN here, x-default points at the
    // global page so non-India queries resolve there (not to this page).
    languages: {
      'en-IN': PAGE_URL,
      'x-default': `${SITE_URL}/campbell-biology-summer-program`,
    },
  },
  openGraph: {
    title: 'Campbell Biology Summer Program India · Cerebrum Biology Academy',
    description:
      'Campbell Biology summer intensive for NEET, Class 11–12, and olympiad aspirants — live online in IST with AIIMS-trained faculty.',
    url: PAGE_URL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Campbell Biology Summer Program India — NEET · Class 11–12 · Olympiad',
    description:
      'Depth beyond NCERT: Campbell Biology summer intensive for NEET and olympiad aspirants, live online with AIIMS-trained faculty.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const UNITS = [
  { n: '1', title: 'Chemistry of Life', ch: 'Ch 1–5', neet: 'Biomolecules' },
  { n: '2', title: 'The Cell', ch: 'Ch 6–12', neet: 'Cell, respiration, photosynthesis' },
  { n: '3', title: 'Genetics', ch: 'Ch 13–21', neet: 'Genetics & molecular biology' },
  { n: '4', title: 'Evolution', ch: 'Ch 22–25', neet: 'Evolution' },
  { n: '5', title: 'Biological Diversity', ch: 'Ch 26–34', neet: 'Diversity of living organisms' },
  { n: '6', title: 'Plant Form & Function', ch: 'Ch 35–39', neet: 'Plant physiology' },
  { n: '7', title: 'Animal Form & Function', ch: 'Ch 40–51', neet: 'Human physiology' },
  { n: '8', title: 'Ecology', ch: 'Ch 52–56', neet: 'Ecology & environment' },
]

const TRACKS = [
  {
    icon: Target,
    title: 'NEET aspirants & droppers',
    body: 'NCERT is the NEET bible — but Campbell gives you the conceptual why behind it. A summer of Campbell (mapped to the NEET syllabus and NCERT lines) turns memorized facts into understanding that survives tricky NEET assertion-reason and application questions.',
  },
  {
    icon: GraduationCap,
    title: 'Class 11 → 12 bridge',
    body: 'Use the summer between Class 11 and 12 to cover the highest-weightage units (genetics, human physiology, plant physiology, ecology) in Campbell depth — you enter Class 12 already ahead.',
  },
  {
    icon: Microscope,
    title: 'Biology Olympiad (INBO / IBO)',
    body: 'Campbell is the primary reference for the Indian National Biology Olympiad and IBO. Summer is the window to read it cover-to-cover with a mentor and drill olympiad-level questions.',
  },
  {
    icon: BookOpen,
    title: 'AP / IB aspirants in India',
    body: 'For Indian students in international schools or planning US/UK admissions, Campbell is the AP Biology and IB HL backbone — get ahead over the summer.',
  },
]

const FAQS = [
  {
    q: 'How does Campbell Biology help with NEET when NCERT is the main book?',
    a: 'NCERT stays your primary NEET source — we map every Campbell unit to the NEET syllabus and the exact NCERT lines. Campbell adds the conceptual depth and diagrams that make NCERT stick, which is exactly what NEET’s application-based and assertion-reason questions test. Think of it as understanding the "why" so the NCERT facts become unforgettable.',
  },
  {
    q: 'When does the summer program run and in which time zone?',
    a: 'The full intensive runs 6–8 weeks (roughly 60–90 hours) with a 4-week fast-track option for the highest-weightage NEET units. All classes are live online, scheduled in IST — morning and evening batches available.',
  },
  {
    q: 'Is it suitable for a NEET dropper?',
    a: 'Yes — droppers get the most from it. Summer is the ideal time to rebuild your biology foundation in Campbell depth before the intensive dropper year, especially for the units where you lost marks.',
  },
  {
    q: 'Do I need to buy Campbell Biology?',
    a: 'Any edition works (11th/12th/AP) — we provide the chapter-to-unit and NCERT crosswalk on day one. We also share chapter-wise concept notes, so the textbook is a reference, not a requirement.',
  },
  {
    q: 'Who teaches it and is it 1:1 or batch?',
    a: 'Dr. Shekhar C Singh (AIIMS Delhi-trained, 15+ years) leads the faculty. Choose 1:1 for a personalized pace or a small batch grouped by goal (NEET / olympiad / AP-IB). Every session is live — not recorded.',
  },
  {
    q: 'What do I get with the program?',
    a: 'Live classes, Campbell-to-NCERT-to-NEET mapped notes, chapter-wise MCQ practice from our 19,000+ question bank, active-recall quizzes, doubt-clearing, progress tracking, and a certificate of completion.',
  },
]

export default function CampbellBiologySummerProgramIndiaPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Campbell Biology Summer Program India',
    description:
      'Campbell Biology summer intensive for NEET aspirants, Class 11–12 students, and INBO/IBO olympiad aspirants in India. Live online in IST with AIIMS-trained faculty.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT80H',
      location: { '@type': 'VirtualLocation', url: PAGE_URL },
    },
    inLanguage: 'en-IN',
    url: PAGE_URL,
    about: [
      'Campbell Biology',
      'NEET Biology',
      'Class 11 Biology',
      'Class 12 Biology',
      'Biology Olympiad',
    ],
  }

  return (
    <main className="min-h-screen bg-white">
      <CerebrumPersonSchema
        knowsAbout={[
          'Campbell Biology',
          'NEET-UG Biology',
          'NCERT Biology Class 11',
          'NCERT Biology Class 12',
          'Biology Olympiad (INBO/IBO)',
          'NEET Foundation Biology',
          'Summer Biology Intensive',
        ]}
        jobTitle="Founder & Lead NEET Biology Faculty"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-700 px-4 py-16 text-white">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Sparkles className="h-4 w-4" /> India summer intensive · Live online · IST
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Campbell Biology Summer Program
            <span className="block text-2xl font-semibold text-blue-100 md:text-3xl">
              for NEET, Class 11–12 & Olympiad aspirants in India
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-blue-50">
            Depth beyond NCERT. Spend the summer mastering Campbell Biology — the global-standard
            text — mapped chapter-by-chapter to the NEET syllabus, with AIIMS-trained faculty. Turn
            memorized facts into the understanding NEET actually tests.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/book-free-demo"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50"
            >
              <CalendarDays className="h-4 w-4" /> Book a free demo class
            </Link>
            <a
              href="https://wa.me/918826444334?text=I'm%20interested%20in%20the%20Campbell%20Biology%20Summer%20Program%20(India)"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-50">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> 6–8 weeks · 4-week fast-track
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" /> 1:1 or small batch
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" /> Mapped to NCERT + NEET syllabus
            </span>
          </div>
        </div>
      </section>

      {/* Why Campbell for NEET */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Why Campbell Biology over the summer — for Indian students
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            NCERT wins NEET, but the toppers understand biology, they don&apos;t just memorize it.
            <em> Campbell Biology</em> is where that understanding comes from — it&apos;s the text
            behind AP, IB, and every biology olympiad. A structured summer of Campbell, mapped to
            NCERT and the NEET syllabus, is the highest-leverage thing a serious aspirant can do
            before the academic grind resumes.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {TRACKS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-gray-200 p-5">
                <t.icon className="h-6 w-6 text-blue-700" />
                <h3 className="mt-3 font-semibold text-gray-900">{t.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum with NEET mapping */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">Campbell units mapped to NEET topics</h2>
          <p className="mt-3 text-gray-600">
            Every unit ties directly to your NCERT chapters and NEET weightage, then drills with
            chapter-wise MCQs from our 19,000+ question bank.
          </p>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase text-gray-500">
                  <th className="px-4 py-3">Unit</th>
                  <th className="px-4 py-3">Campbell theme</th>
                  <th className="px-4 py-3">Chapters</th>
                  <th className="px-4 py-3">NEET / NCERT topic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {UNITS.map((u) => (
                  <tr key={u.n}>
                    <td className="px-4 py-3 font-semibold text-blue-700">{u.n}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{u.title}</td>
                    <td className="px-4 py-3 text-gray-500">{u.ch}</td>
                    <td className="px-4 py-3 text-gray-600">{u.neet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900">What&apos;s included</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              'Live online classes in IST (morning & evening batches)',
              'Campbell → NCERT → NEET mapped concept notes and diagrams',
              'Chapter-wise MCQ practice from our 19,000+ question bank',
              'Assertion-reason and application-question drills',
              '1:1 doubt-clearing and progress tracking',
              'Certificate of completion for the summer intensive',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-xl border border-gray-100 bg-gray-50 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8 shrink-0 text-blue-700" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Taught by Dr. Shekhar C Singh & specialist biology faculty
                </h2>
                <p className="mt-2 text-gray-600">
                  AIIMS Delhi-trained, 15+ years coaching NEET and biology aspirants. Cerebrum is a
                  biology-specialist academy — every session is live with a biology teacher who
                  knows both Campbell depth and exactly what NEET rewards.
                </p>
                <Link
                  href="/dr-shekhar-singh-biology-faculty-india"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
                >
                  <BookOpen className="h-4 w-4" /> About the faculty
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-blue-700 p-6 text-center text-white">
            <h2 className="text-xl font-bold">Get the summer edge for NEET</h2>
            <p className="mt-2 text-sm text-blue-50">
              Book a free demo class — we&apos;ll assess your level and map the right summer track.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/book-free-demo"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 hover:bg-blue-50"
              >
                Book free demo
              </Link>
              <Link
                href="/campbell-biology-summer-program"
                className="rounded-xl border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Outside India? See the global program →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
