/**
 * /best-biology-tutor-uk
 *
 * UK country authority hub (Phase 1 of the US/UK dominance plan). Crowns the
 * existing + new UK biology content — A-Level Biology across every board
 * (AQA / OCR / Edexcel / WJEC-Eduqas / Cambridge International), GCSE & IGCSE,
 * the British Biology Olympiad (BBO) and IBO route, IB Biology HL/SL, and
 * GAMSAT for graduate-entry medicine — into one "UK students start here" entry
 * point with UK-tuned SEO/AEO/GEO.
 *
 * ADDITIVE: a new route; does not touch any existing page/layout.
 * Universal framing (any nationality, UK-based) — AIIMS translated for a UK
 * audience. Links only verified existing routes. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  FlaskConical,
  GraduationCap,
  Home,
  MapPin,
  Microscope,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import { A_LEVEL_BOARDS } from '@/data/a-level/boards'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/best-biology-tutor-uk'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Best Biology Tutor in the UK — A-Level · GCSE · BBO · IB Biology',
  description:
    'Specialist UK biology tuition for any student: A-Level Biology across every board (AQA, OCR, Edexcel, WJEC/Eduqas, Cambridge International), GCSE & IGCSE, the British Biology Olympiad (BBO) and IBO, IB Biology HL/SL, and GAMSAT. AIIMS-trained faculty (apex medical school, peer to Oxford & Cambridge medicine), small live online batches in UK time, free assessment.',
  keywords: [
    'best biology tutor UK',
    'A-level biology tutor',
    'A-level biology tutor online',
    'AQA biology tutor',
    'OCR biology tutor',
    'Edexcel biology tutor',
    'GCSE biology tutor',
    'IGCSE biology tutor',
    'BBO coaching',
    'British Biology Olympiad tutor',
    'IB Biology tutor UK',
    'GAMSAT biology tutor',
    'online biology tutor UK',
    'biology tutor London',
    'A-level biology revision',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Best Biology Tutor in the UK · Cerebrum Biology Academy',
    description:
      'A-Level (all boards) · GCSE & IGCSE · BBO · IBO · IB Biology · GAMSAT. AIIMS-trained faculty, small live online batches in UK time.',
    url: PAGE_URL,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Best Biology Tutor in the UK — A-Level · GCSE · BBO · IB',
    description:
      'Specialist UK biology tuition for any student. AIIMS-trained faculty, exam-board-specific A-Level coaching, UK time zones.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const EXAMS = [
  {
    icon: BookOpen,
    name: 'A-Level Biology',
    detail:
      'Every board — AQA (7402), OCR (H420), Edexcel SNAB (9BN0), WJEC/Eduqas and Cambridge International (9700). Paper-by-paper coaching and required-practical mastery.',
    href: '/a-level-biology-tutor',
  },
  {
    icon: GraduationCap,
    name: 'GCSE & IGCSE Biology',
    detail:
      'Foundation and Higher tier GCSE plus IGCSE — building the cell biology, genetics and physiology that A-Level then assumes.',
    href: '/gcse-biology-tuition',
  },
  {
    icon: Trophy,
    name: 'BBO — British Biology Olympiad',
    detail:
      'The Royal Society of Biology olympiad for sixth-formers — past-paper depth beyond the A-Level spec, the UK route toward the IBO.',
    href: '/top-bbo-coaching-uk',
  },
  {
    icon: Award,
    name: 'IBO (UK route)',
    detail:
      'International Biology Olympiad preparation for UK students, through the BBO selection ladder.',
    href: '/ibo-coaching-uk',
  },
  {
    icon: Microscope,
    name: 'IB Biology (HL & SL)',
    detail:
      'For UK IB World Schools — Internal Assessment & Extended Essay mentorship and Paper 1/2 technique on the current syllabus.',
    href: '/ib-biology-tuition',
  },
  {
    icon: Stethoscope,
    name: 'GAMSAT (graduate medicine)',
    detail:
      'Section 3 biological-sciences depth for graduate-entry medicine and dentistry in the UK and Ireland.',
    href: '/gamsat-biology-tutor-london',
  },
]

const WHY = [
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, comparable in selectivity to Oxford and Cambridge medicine. That clinical depth maps straight onto A-Level synoptic, BBO and GAMSAT reasoning.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Exam-board-specific, not generic',
    text: 'We teach to your exact spec — the AQA Paper 3 essay, the OCR "Unified biology" synoptic paper, the SNAB core practicals, the Cambridge examined practical. Not a one-size syllabus.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'UK time (GMT / BST)',
    text: 'Live classes scheduled around the UK school day, with every session recorded for revision. 1:1 booked to your calendar.',
  },
  {
    icon: <FlaskConical className="h-5 w-5 text-blue-600" />,
    title: 'Practicals treated as exam content',
    text: 'Required practicals, PAGs, core practicals and the Cambridge practical papers — coached for the marks they earn, not signed off as an afterthought.',
  },
]

const CITY_SLUGS = [
  ['london', 'London'],
  ['manchester', 'Manchester'],
  ['birmingham', 'Birmingham'],
  ['leeds', 'Leeds'],
  ['edinburgh', 'Edinburgh'],
  ['bristol', 'Bristol'],
  ['cambridge', 'Cambridge'],
  ['oxford', 'Oxford'],
] as const

const FAQS = [
  {
    question: 'Is Cerebrum only for Indian or international students in the UK?',
    answer:
      'No. Cerebrum coaches any student in the UK, of any nationality, for any biology exam — A-Level (every board), GCSE, IGCSE, the British Biology Olympiad, IB Biology or GAMSAT. These are standard UK qualifications; our biology-only specialisation and AIIMS-trained faculty apply to every student.',
  },
  {
    question: 'Do you cover my exam board?',
    answer:
      'Yes — we have dedicated, spec-specific pages for AQA (7402), OCR Biology A (H420), Edexcel Biology A / SNAB (9BN0), WJEC and Eduqas, and Cambridge International (9700). Each is taught to its exact paper structure, topics and practical model rather than a generic syllabus.',
  },
  {
    question: 'What is AIIMS, for a UK family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Oxford and Cambridge medicine in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens A-Level synoptic questions, BBO and GAMSAT preparation.',
  },
  {
    question: 'How do UK time zones and scheduling work?',
    answer:
      'Live online classes run in UK time (GMT / BST), scheduled around the school day, with every session recorded for revision. 1:1 tutoring is booked to your calendar.',
  },
  {
    question: 'How does pricing work for UK students?',
    answer:
      'A-Level programmes run in three tiers quoted in pounds — see the per-board pages for the full breakdown. The right plan depends on the exam, tier (1:1 vs small batch) and hours, so a free assessment comes first, then we share the quote. Payment via card / bank transfer / Wise / Stripe.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free assessment. Tell us your exam (A-Level board, GCSE, IGCSE, BBO, IB, GAMSAT…), year group and town, and we match you to the right tutor and time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BestBiologyTutorUKPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for UK Students — A-Level, GCSE, IGCSE, BBO, IB, GAMSAT',
    description:
      'Specialist biology coaching for UK students across A-Level Biology (every board), GCSE & IGCSE, the British Biology Olympiad, IBO, IB Biology HL/SL and GAMSAT. AIIMS-trained faculty, live online in UK time.',
    url: PAGE_URL,
    inLanguage: 'en-GB',
    educationalLevel: 'UK secondary + sixth form + graduate medicine',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UK biology exams coached by Cerebrum',
    itemListElement: EXAMS.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: e.name,
      url: `${SITE_URL}${e.href}`,
    })),
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Global',
        item: `${SITE_URL}/best-biology-tutor-global`,
      },
      { '@type': 'ListItem', position: 3, name: 'UK', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Best Biology Tutor UK',
          'A-Level Biology Tutor',
          'AQA Biology Tutor',
          'OCR Biology Tutor',
          'Edexcel Biology Tutor',
          'GCSE Biology Tutor',
          'British Biology Olympiad Coach',
          'IB Biology Tutor',
          'GAMSAT Biology Tutor',
        ]}
        jobTitle="UK Biology Specialist Faculty — A-Level / GCSE / BBO / IB / GAMSAT"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-blue-700">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/best-biology-tutor-global" className="hover:text-blue-700">
                Global
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">UK</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇬🇧 Biology tuition for UK students · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            The best biology tutor in the UK &mdash;{' '}
            <span className="text-blue-700">A-Level, GCSE, BBO &amp; IB.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists — to your exact exam board. Cerebrum coaches UK
            students for A-Level Biology (AQA, OCR, Edexcel, WJEC/Eduqas, Cambridge International),
            GCSE &amp; IGCSE, the British Biology Olympiad and IBO, IB Biology HL/SL, and GAMSAT for
            graduate medicine. Faculty are trained at AIIMS New Delhi &mdash; among the most
            selective medical schools in the world, comparable to Oxford and Cambridge medicine
            &mdash; so the depth applies to every UK biology exam. Live online in UK time.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free assessment
            </a>
            <Link
              href="/a-level-biology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              A-Level Biology by board &amp; city
            </Link>
          </div>
        </section>

        {/* Exams */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Every UK biology exam &mdash; one specialist faculty
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {EXAMS.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
                >
                  <e.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{e.detail}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                    Explore <ChevronRight className="h-3.5 w-3.5" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* A-Level by board */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              A-Level Biology &mdash; pick your exam board
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Each board has its own papers, topics and practical model. We teach to yours exactly.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {A_LEVEL_BOARDS.map((b) => (
                <Link
                  key={b.slug}
                  href={`/${b.routeSlug}`}
                  className="block rounded-2xl border border-slate-200 p-5 transition hover:border-blue-400 hover:shadow-md"
                >
                  <h3 className="text-base font-bold text-slate-900">
                    {b.board} <span className="text-slate-400">· {b.specCode}</span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.tagline}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Global exam hubs (open to any nationality):{' '}
              <Link href="/a-level-biology-tutor-global" className="text-blue-700 underline">
                A-Level Biology
              </Link>{' '}
              ·{' '}
              <Link href="/ib-biology-tutor-global" className="text-blue-700 underline">
                IB Biology
              </Link>{' '}
              ·{' '}
              <Link href="/biology-olympiad-tutor-global" className="text-blue-700 underline">
                Biology Olympiad
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why UK families choose a biology specialist
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY.map((c) => (
                <div key={c.title} className="rounded-xl border border-slate-200 bg-white p-5">
                  {c.icon}
                  <h3 className="mt-3 text-sm font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEO — by city */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
              <MapPin className="h-6 w-6 text-blue-600" /> A-Level Biology by UK city
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, UK time. Don&rsquo;t see your city? We coach students anywhere in the
              UK online &mdash; just ask.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {CITY_SLUGS.map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/a-level-biology/${slug}`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry" className="bg-slate-50">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="uk-hub"
              title="Book a free assessment — UK biology tuition"
              subtitle="Any UK student, any nationality, any biology exam. Tell us your exam board, year group and town — we reply within a day in UK time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology tuition in the UK &mdash; common questions
            </h2>
            <div className="mt-7 divide-y divide-slate-200">
              {FAQS.map((f, idx) => (
                <details key={idx} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-slate-900">
                    <span>{f.question}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 py-14 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <Sparkles className="mx-auto h-10 w-10 text-amber-300" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              The #1 biology specialist for UK students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A-Level (all boards) · GCSE · IGCSE · BBO · IBO · IB · GAMSAT — one faculty, UK time,
              a free assessment first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Request a free assessment
              </a>
              <Link
                href="/best-biology-tutor-global"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                Outside the UK? See global
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
