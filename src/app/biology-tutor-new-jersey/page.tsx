/**
 * /biology-tutor-new-jersey
 *
 * New Jersey state aggregator hub. Curates the real per-state NJ biology routes
 * (AP, USABO, MCAT, DAT) and adds NJ-specific context: the strong AP cohort
 * culture, the NJSLA science assessment, the Rutgers pre-med pipeline, and
 * Eastern-Time scheduling.
 *
 * ADDITIVE: a new route. Links only verified existing routes. No fabricated
 * stats. AIIMS glossed once for a US audience.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
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

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/biology-tutor-new-jersey'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Tutor in New Jersey — AP Biology, USABO, MCAT & DAT · Cerebrum',
  description:
    'Specialist online biology tutoring across New Jersey for one of the nation’s strongest AP cohorts. AP Biology (score-5 + FRQ), USABO, MCAT and DAT, aligned to the Rutgers pre-med pipeline. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live batches in Eastern Time, free trial.',
  keywords: [
    'biology tutor New Jersey',
    'AP Biology tutor New Jersey',
    'AP Biology tutor NJ',
    'USABO coaching New Jersey',
    'MCAT biology tutor New Jersey',
    'DAT biology tutor New Jersey',
    'online biology tutor New Jersey',
    'Rutgers pre-med biology',
    'NJ science tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Tutor in New Jersey · Cerebrum Biology Academy',
    description:
      'AP Biology · USABO · MCAT · DAT for New Jersey’s strong AP cohort. AIIMS-trained faculty, small live online batches in Eastern Time.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor in New Jersey — AP · USABO · MCAT · DAT',
    description:
      'Specialist NJ biology coaching for a strong AP cohort. AIIMS-trained faculty, Eastern-Time live batches.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const CITY_LINKS = [
  {
    metro: 'New Jersey (statewide)',
    note: 'From Bergen and Middlesex to the Princeton corridor — competitive districts and a strong AP culture.',
    links: [
      { label: 'AP Biology — New Jersey', href: '/ap-biology-tutor-new-jersey' },
      { label: 'USABO — New Jersey', href: '/usabo-coaching-new-jersey' },
      { label: 'MCAT Biology — New Jersey', href: '/mcat-biology-tutor-new-jersey' },
      { label: 'DAT Biology — New Jersey', href: '/dat-biology-tutor-new-jersey' },
    ],
  },
]

const WHY = [
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School and Johns Hopkins — bring research and clinical depth that maps onto AP, USABO and MCAT reasoning.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Built for a strong AP cohort',
    text: 'New Jersey runs one of the most competitive AP cultures in the country. We coach AP Biology to a genuine score-5 with full FRQ-rubric practice, so students stand out in a high-achieving field.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Eastern Time scheduling',
    text: 'Live classes in ET, scheduled around the New Jersey school day, with every session recorded.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Small live batches, not a video library',
    text: '1:1 and micro-batch with weekly written feedback — a biology-only specialist, not a multi-subject test-prep mill.',
  },
]

const EXAM_HUBS = [
  {
    icon: BookOpen,
    name: 'AP Biology',
    detail: 'All 8 College Board units, FRQ rubric mastery and score-5 targeting.',
    href: '/ap-biology-tutor',
  },
  {
    icon: Trophy,
    name: 'USABO',
    detail: 'USA Biology Olympiad — Open, Semifinal and National Finals, the Team USA route.',
    href: '/usabo-coaching',
  },
  {
    icon: Stethoscope,
    name: 'MCAT Biology',
    detail: 'MCAT Bio/Biochem depth for the Rutgers and tri-state pre-med pipeline.',
    href: '/mcat-biology',
  },
  {
    icon: GraduationCap,
    name: 'Honors / Pre-AP Biology',
    detail: 'Concept mastery and lab reasoning, a runway into AP and olympiad tracks.',
    href: '/honors-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Which parts of New Jersey does Cerebrum cover?',
    answer:
      'We coach students across all of New Jersey online — from the Bergen and Middlesex districts to the Princeton corridor — with dedicated AP, USABO, MCAT and DAT pages. Live classes run in Eastern Time around the New Jersey school day.',
  },
  {
    question: 'Why does New Jersey need a biology specialist?',
    answer:
      'New Jersey runs one of the strongest AP cultures in the country, so the bar to stand out in AP Biology is high. A biology-only specialist coaches the score-5/FRQ target precisely, plus the USABO ladder, rather than offering generic multi-subject review.',
  },
  {
    question: 'What is AIIMS, for a New Jersey family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Johns Hopkins in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP Biology, USABO and MCAT preparation.',
  },
  {
    question: 'Do you support Rutgers and tri-state pre-med students?',
    answer:
      'Yes. Beyond high-school AP and USABO, we coach the pre-med biology layer — MCAT Bio/Biochem and DAT survey of natural sciences — for students in the Rutgers and wider tri-state pre-med pipeline.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (AP, USABO, MCAT, DAT…), grade and NJ district, and we match you to the right tutor and an Eastern-Time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BiologyTutorNewJerseyPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for New Jersey Students — AP, USABO, MCAT, DAT',
    description:
      'Specialist biology coaching for New Jersey students across AP Biology, USABO, MCAT and DAT, built for the state’s strong AP cohort and aligned to the Rutgers pre-med pipeline. AIIMS-trained faculty, live online in Eastern Time.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'Country', name: 'United States' },
    ],
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'details p'],
    },
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
      { '@type': 'ListItem', position: 2, name: 'USA', item: `${SITE_URL}/best-biology-tutor-usa` },
      { '@type': 'ListItem', position: 3, name: 'New Jersey', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Tutor New Jersey',
          'AP Biology Tutor New Jersey',
          'USABO Coach',
          'MCAT Bio/Biochem Tutor',
          'DAT Biology Tutor',
        ]}
        jobTitle="New Jersey Biology Specialist Faculty — AP / USABO / MCAT / DAT"
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

      <main className="min-h-screen bg-white">
        <nav className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
          <ol className="flex items-center gap-1">
            <li>
              <Link href="/" className="hover:text-blue-700 flex items-center gap-1">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li>
              <Link href="/best-biology-tutor-usa" className="hover:text-blue-700">
                USA
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">New Jersey</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 New Jersey · Eastern Time · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology tutor in New Jersey &mdash;{' '}
            <span className="text-blue-700">AP, USABO, MCAT &amp; DAT.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists, for one of the nation’s strongest AP cohorts.
            Cerebrum coaches New Jersey students for AP Biology (score-5 + FRQ), the USA Biology
            Olympiad, and the pre-med layer (MCAT, DAT) &mdash; aligned to the Rutgers pre-med
            pipeline. Faculty are trained at AIIMS New Delhi &mdash; among the most selective
            medical schools in the world, peer to Harvard Medical School. Live online in Eastern
            Time.
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/best-biology-tutor-usa"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              All US biology coaching
            </Link>
          </div>
        </section>

        {/* Cities */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 md:text-3xl">
              <MapPin className="h-6 w-6 text-blue-600" /> New Jersey coaching
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Each track has a dedicated page; we coach students
              across every New Jersey district online.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {CITY_LINKS.map((c) => (
                <div key={c.metro} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">{c.metro}</h3>
                  <p className="mt-2 text-sm text-slate-600">{c.note}</p>
                  <ul className="mt-4 space-y-2">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
                        >
                          <ChevronRight className="h-3.5 w-3.5" /> {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State context */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology in New Jersey — what shapes the prep
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                New Jersey consistently posts one of the country’s{' '}
                <strong>strongest AP cultures</strong>, with large numbers of students sitting AP
                Biology in highly competitive districts. The bar to truly stand out is high, which
                makes precise <strong>score-5 and FRQ coaching</strong>
                more valuable than generic review.
              </p>
              <p>
                For pre-med, <strong>Rutgers</strong> anchors the in-state pipeline, with the
                broader tri-state region adding depth. A clean ladder from honors/AP biology into{' '}
                <strong>USABO</strong> and then the <strong>MCAT and DAT</strong> serves NJ students
                who are aiming at medicine and dentistry.
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why New Jersey families choose a biology specialist
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

        {/* Exam hubs */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Exam hubs for New Jersey students
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {EXAM_HUBS.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
                >
                  <e.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{e.detail}</p>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-500">
              See also the{' '}
              <Link href="/best-biology-tutor-usa" className="text-blue-700 underline">
                USA biology hub
              </Link>{' '}
              and{' '}
              <Link href="/best-dat-biology-tutor" className="text-blue-700 underline">
                DAT biology
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="new-jersey-hub"
              title="Book a free trial — New Jersey biology coaching"
              subtitle="Any New Jersey student, any biology exam. Tell us your exam, grade and district — we reply within a day in Eastern Time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in New Jersey &mdash; common questions
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
              A biology specialist for New Jersey students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              AP · USABO · MCAT · DAT — for a strong AP cohort, in Eastern Time, a free trial first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 md:flex-row">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold hover:bg-blue-700"
              >
                <CheckCircle2 className="h-5 w-5" />
                Request a free trial
              </a>
              <Link
                href="/best-biology-tutor-usa"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                See all US coaching
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
