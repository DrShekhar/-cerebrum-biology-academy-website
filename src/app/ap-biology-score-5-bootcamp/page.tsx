/**
 * /ap-biology-score-5-bootcamp
 *
 * NEW cohort/enrollment landing page (additive — does not touch the evergreen
 * /ap-biology hub or /ap-biology-tutor service page). Targets time-bound
 * enrollment intent: "AP Biology bootcamp", "AP Biology intensive class",
 * "AP Biology crash course online", "AP Biology score 5 class".
 *
 * Mapped to the competitor enrollment calendar (USA_COMPETITOR_INTELLIGENCE_2026_06_28.md):
 * AP exam ~early May 2027; Aim Academy live course starts late Aug; Princeton
 * Review cram runs Apr–May. The specialist live SPRING intensive is white space
 * no competitor owns. Live, AIIMS-faculty, score-5-focused — vs Kaplan ($399,
 * 16h, Barron's content), Princeton ($6,000 tutoring), Khan/Fiveable (self-paced).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_PATH = '/ap-biology-score-5-bootcamp'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const WA = '918826444334'
const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export const metadata: Metadata = {
  title: 'AP Biology Score-5 Bootcamp — Live Cohorts 2026–27 | Cerebrum',
  description:
    'Live, biology-only AP Biology bootcamp led by AIIMS-trained faculty. Fall 2026 year-long cohort + Jan–Apr 2027 spring intensive before the May AP exam. Units 1–8, FRQ rubric mastery, 13 labs, full mocks. Free trial.',
  keywords: [
    'AP Biology bootcamp',
    'AP Biology intensive',
    'AP Biology crash course online',
    'AP Biology score 5 class',
    'AP Biology spring intensive 2027',
    'live AP Biology course',
    'AP Biology exam prep class',
    'AP Biology online cohort',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'AP Biology Score-5 Bootcamp — Live Cohorts 2026–27',
    description:
      'Live AP Biology bootcamp with AIIMS-trained biology specialists. Fall 2026 cohort + spring 2027 intensive. Units 1–8, FRQ mastery, 13 labs, mocks.',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology Score-5 Bootcamp — Live Cohorts 2026–27 | Cerebrum',
    description:
      'Live, biology-only AP Biology bootcamp. Fall 2026 cohort + Jan–Apr 2027 spring intensive before the May AP exam.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const cohorts = [
  {
    name: 'Fall Year-Long Cohort',
    window: 'Starts late August 2026',
    detail:
      'Tracks the US school year alongside your AP Biology class. Weekly live small-batch sessions, all 8 College Board CED units, continuous FRQ practice, and monthly full-length mocks through to the May 2027 exam.',
    best: 'Best for students who want steady, year-long support from day one.',
    icon: CalendarDays,
  },
  {
    name: 'Spring Score-5 Intensive',
    window: 'January – April 2027 (before the early-May AP exam)',
    detail:
      'A 12–14 week exam-season sprint: unit-weighted revision (time matched to College Board exam %), intensive FRQ rubric drilling, the 13 required labs, timed mocks, and a final-week exam simulation. Built for the Apr–May crunch that Khan Academy and self-paced tools cannot coach live.',
    best: 'Best for students who want a focused push to a 5 before the exam.',
    icon: Target,
  },
  {
    name: '1:1 Senior-Faculty Track',
    window: 'Rolling — first session within 48 hours',
    detail:
      'Fully personalised private coaching with senior faculty, scheduled in your US time zone (ET/CT/MT/PT). Start any week of the year; pace and focus set to your diagnostic.',
    best: 'Best for retakers, score-jumpers, and students on a non-US calendar.',
    icon: Users,
  },
]

const curriculum = [
  'All 8 College Board CED units (Chemistry of Life → Ecology), taught unit-weighted to exam %',
  'FRQ rubric mastery — the cornerstone differentiator: long & short free-response, scored to the official College Board rubric',
  'The 13 required AP Biology lab investigations + experimental-design and data-analysis drills',
  'The 6 AP science practices (concept explanation, visual models, data analysis, argumentation, statistics)',
  'Quantitative skills: chi-square, Hardy–Weinberg, standard error — the most-missed FRQ math',
  'Full-length, timed mock exams with personalised error analysis',
  'Active-recall decks and spaced-repetition schedules for retention',
  'Direct WhatsApp doubt support between sessions',
]

const faqs = [
  {
    question: 'When does the AP Biology bootcamp start?',
    answer:
      'There are three entry points. The Fall Year-Long Cohort starts in late August 2026 and runs alongside the US school year to the May 2027 exam. The Spring Score-5 Intensive runs January–April 2027, before the early-May AP Biology exam. The 1:1 Senior-Faculty Track has rolling enrollment — your first session is scheduled within 48 hours. Message us on WhatsApp for the next live cohort date.',
  },
  {
    question: 'How is this different from Kaplan, Khan Academy, or Fiveable?',
    answer:
      "Kaplan's AP Biology course is 16 hours of live instruction built on licensed Barron's content; Khan Academy and Fiveable are self-paced video/AI tools with no live teacher; Princeton Review's comparable option is a $6,000 private-tutoring package. Cerebrum is a biology-only specialist: live small-batch coaching led by AIIMS-trained faculty, with FRQ rubric feedback a human expert gives in real time — the part AI graders and recorded videos cannot do. Only about 18.9% of students score a 5, and the gap is almost always FRQ and experimental design, which is exactly what we drill live.",
  },
  {
    question: 'Who teaches the bootcamp?',
    answer:
      'Cohorts are led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) and senior biology specialists. AIIMS is among the most biology-intensive medical entrances in the world, so faculty bring degree-level depth in cell biology, genetics, biochemistry, and physiology — deeper than a generalist tutor who rotates across subjects.',
  },
  {
    question: 'Is the bootcamp suitable for international and NRI students?',
    answer:
      'Yes. Classes are live online and scheduled in US time zones (ET/CT/MT/PT), with recordings if you miss a session. We coach AP Biology students in the US, Canada, the UAE, India, Singapore, Hong Kong and beyond — including IB-to-AP switchers and students sitting AP for US college admissions.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Annual programmes follow our standard tiers: Pursuit $2,500/yr (group-first, monthly 1:1), Ascent $4,500/yr (bi-weekly senior 1:1, 36+ live hours), and Pinnacle $7,000/yr (weekly senior 1:1, 48+ live hours, USABO bridge). À-la-carte 1:1 hourly is also available (senior faculty $120–150/hr, junior $60–75/hr, small batch $40/hr). The spring intensive is priced per cohort — message us for the current rate and seat availability. All pricing is in USD.',
  },
  {
    question: 'Do you offer a free trial?',
    answer:
      'Yes — a free 30-minute diagnostic session. A senior tutor checks your current AP Biology level, walks through one FRQ with you, identifies your top two weak units, and recommends the right track. No payment is taken at the trial.',
  },
  {
    question: 'When is the 2027 AP Biology exam?',
    answer:
      'The AP Biology exam is administered by the College Board in early May each year; the 2027 exam falls in the first half of May 2027. Our Spring Score-5 Intensive is timed to finish with a full exam simulation in the week before it. Confirm the exact 2027 date on the College Board AP calendar.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AP Biology Score-5 Bootcamp',
  description:
    'Live, biology-only AP Biology bootcamp led by AIIMS-trained faculty. Covers College Board Units 1–8, FRQ rubric mastery, the 13 required labs, and full-length mocks. Fall 2026 year-long cohort and Jan–Apr 2027 spring intensive.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Advanced Placement',
  educationalCredentialAwarded: 'AP Biology Score 5 Preparation',
  teaches: [
    'AP Biology Units 1-8',
    'AP Biology Free-Response Questions',
    'AP Biology required laboratory investigations',
    'AP science practices and quantitative skills',
  ],
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'AP Biology Fall Year-Long Cohort',
      courseMode: 'Online',
      courseWorkload: 'P1Y',
    },
    {
      '@type': 'CourseInstance',
      name: 'AP Biology Spring Score-5 Intensive',
      courseMode: 'Online',
      courseWorkload: 'P14W',
    },
  ],
}

export default function APBiologyScore5BootcampPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <CerebrumPersonSchema
        knowsAbout={[
          'AP Biology',
          'AP Biology Free-Response Questions',
          'AP Biology score-5 preparation',
          'College Board AP Biology CED',
          'AP Biology required labs',
        ]}
        jobTitle="Founder & Lead AP Biology Faculty"
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <BreadcrumbSchema
          items={[
            { label: 'AP Biology', href: '/ap-biology' },
            { label: 'Score-5 Bootcamp', isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" /> Live cohorts · 2026–27
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              AP Biology Score-5 Bootcamp
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              A live, biology-only bootcamp led by AIIMS-trained faculty — not a recorded video
              library and not a generalist test-prep machine. We coach the part that actually
              separates a 4 from a 5: the free-response rubric, experimental design, and the
              quantitative skills most students lose marks on.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Fall 2026 year-long cohort + Jan–Apr 2027 spring intensive
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                All 8 CED units · FRQ rubric mastery · 13 required labs · full mocks
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                US time-zone slots (ET/CT/MT/PT) · free 30-minute diagnostic
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink(
                  'Hi! I want to join the AP Biology Score-5 Bootcamp. Please share the next cohort dates, seats and pricing.'
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a free trial <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div id="enquire" className="scroll-mt-24">
            <GlobalEnquiryForm
              title="Book your free AP Biology trial"
              subtitle="Tell us your target exam date and current level — we'll match you to the right cohort and US time-zone slot, and reply within a day."
              source="ap-biology-bootcamp"
            />
          </div>
        </div>
      </section>

      {/* Cohorts / enrollment windows */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Choose your start — three ways in
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            AP Biology is a fall-to-spring journey ending with the early-May exam. Pick the entry
            point that fits where you are in the year.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cohorts.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <c.icon className="h-7 w-7 text-blue-600" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{c.window}</p>
                <p className="mt-3 text-sm text-slate-700">{c.detail}</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{c.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What the bootcamp covers
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {curriculum.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <FlaskConical className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why a biology specialist beats a generalist course
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">AIIMS-trained faculty</h3>
              <p className="mt-2 text-sm text-slate-700">
                Taught by faculty who cleared AIIMS — one of the most biology-intensive medical
                entrances in the world. That is degree-level depth in genetics, biochemistry and
                physiology, not a tutor rotating across ten subjects.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Target className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Live FRQ rubric feedback</h3>
              <p className="mt-2 text-sm text-slate-700">
                Only ~18.9% of students score a 5, and the gap is almost always free-response and
                experimental design. A human expert tells you exactly why an answer lost the point —
                something AI graders and recorded videos cannot.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Clock className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Built around the exam date</h3>
              <p className="mt-2 text-sm text-slate-700">
                Year-long or spring-intensive, every cohort ends with a full timed simulation before
                the early-May AP Biology exam — with US time-zone slots and recordings.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Prefer to go deeper first? See our{' '}
            <Link href="/ap-biology" className="font-semibold text-blue-700 underline">
              AP Biology overview
            </Link>
            , the{' '}
            <Link href="/ap-biology-tutor" className="font-semibold text-blue-700 underline">
              AP Biology tutor programme
            </Link>
            , or the unit-by-unit{' '}
            <Link
              href="/ap-biology-score-5-study-guide"
              className="font-semibold text-blue-700 underline"
            >
              score-5 study guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            AP Biology bootcamp — FAQs
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to aim for a 5?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Book a free 30-minute diagnostic. We&apos;ll check your level, walk through one FRQ, and
            recommend the right cohort and time-zone slot.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                'Hi! I want to book a free AP Biology diagnostic and join the Score-5 Bootcamp. Please share the next cohort dates.'
              )}
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Book a free trial <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
