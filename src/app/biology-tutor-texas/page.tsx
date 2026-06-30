/**
 * /biology-tutor-texas
 *
 * Texas state aggregator hub. Curates the real per-metro Texas biology routes
 * (Houston, Dallas, Austin) and adds Texas-specific context: the STAAR Biology
 * EOC, the UT-Austin and Texas A&M pipelines, and Central-Time scheduling.
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
const CANONICAL = '/biology-tutor-texas'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Tutor in Texas — STAAR Biology EOC, AP, USABO, MCAT & DAT · Cerebrum',
  description:
    'Specialist online biology tutoring across Texas — Houston, Dallas and Austin. STAAR Biology EOC support, AP Biology (score-5 + FRQ), USABO, MCAT and DAT, aligned to UT-Austin and Texas A&M pipelines. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live batches in Central Time, free trial.',
  keywords: [
    'biology tutor Texas',
    'STAAR Biology EOC tutor',
    'AP Biology tutor Texas',
    'AP Biology tutor Houston',
    'AP Biology tutor Dallas',
    'AP Biology tutor Austin',
    'USABO coaching Texas',
    'MCAT biology tutor Texas',
    'DAT biology tutor Texas',
    'online biology tutor Texas',
    'UT Austin pre-med biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Tutor in Texas · Cerebrum Biology Academy',
    description:
      'STAAR Biology EOC · AP Biology · USABO · MCAT · DAT across Houston, Dallas and Austin. AIIMS-trained faculty, small live online batches in Central Time.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor in Texas — STAAR EOC · AP · USABO · MCAT · DAT',
    description:
      'Specialist Texas biology coaching across Houston, Dallas and Austin. AIIMS-trained faculty, Central-Time live batches.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const CITY_LINKS = [
  {
    metro: 'Houston',
    note: 'Greater Houston and the Texas Medical Center pre-med catchment.',
    links: [
      { label: 'AP Biology — Houston & Dallas', href: '/ap-biology-tutor-houston-dallas' },
      { label: 'USABO — Houston', href: '/usabo-coaching-houston' },
      { label: 'MCAT Biology — Houston', href: '/mcat-biology-tutor-houston' },
      { label: 'DAT Biology — Houston', href: '/dat-biology-tutor-houston' },
    ],
  },
  {
    metro: 'Dallas–Fort Worth',
    note: 'The DFW metroplex and its competitive ISD honors/AP tracks.',
    links: [
      { label: 'AP Biology — Houston & Dallas', href: '/ap-biology-tutor-houston-dallas' },
      { label: 'USABO — Dallas & Austin', href: '/usabo-coaching-dallas-austin' },
      { label: 'MCAT Biology — Dallas', href: '/mcat-biology-tutor-dallas' },
      { label: 'DAT Biology — Dallas', href: '/dat-biology-tutor-dallas' },
    ],
  },
  {
    metro: 'Austin',
    note: 'Austin and the UT-Austin pre-med catchment.',
    links: [
      { label: 'AP Biology — Austin', href: '/ap-biology-tutor-austin' },
      { label: 'USABO — Dallas & Austin', href: '/usabo-coaching-dallas-austin' },
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
    title: 'STAAR EOC and AP in one plan',
    text: 'Texas students sit the STAAR Biology End-of-Course exam and, in many districts, AP Biology. We coach both — EOC reporting categories and the AP score-5/FRQ target — without doubling your tutoring.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Central Time scheduling',
    text: 'Live classes in CT, scheduled around the Texas school day, with every session recorded. No awkward time-zone math.',
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
    name: 'STAAR Biology EOC',
    detail: 'End-of-Course Biology — reporting categories, released-test practice and pacing.',
    href: '/biology-eoc-exam-prep',
  },
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
    detail: 'MCAT Bio/Biochem depth for the UT-Austin / A&M pre-med pipeline.',
    href: '/mcat-biology',
  },
]

const FAQS = [
  {
    question: 'Which Texas cities does Cerebrum cover?',
    answer:
      'We coach students across Texas online, with dedicated pages for Houston, Dallas–Fort Worth and Austin. Live classes run in Central Time around the Texas school day.',
  },
  {
    question: 'Do you prepare students for the STAAR Biology EOC?',
    answer:
      'Yes. The STAAR Biology End-of-Course exam is a Texas graduation requirement organized into reporting categories. We coach it using released-test practice and category-by-category pacing, and pair it with AP Biology for students taking both.',
  },
  {
    question: 'What is AIIMS, for a Texas family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Johns Hopkins in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP Biology, USABO and MCAT preparation.',
  },
  {
    question: 'Do you support UT-Austin and Texas A&M pre-med students?',
    answer:
      'Yes. Beyond high-school STAAR, AP and USABO, we coach the pre-med biology layer — MCAT Bio/Biochem and DAT survey of natural sciences — for students in the UT-Austin and Texas A&M pipelines.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (STAAR EOC, AP, USABO, MCAT, DAT…), grade and Texas city, and we match you to the right tutor and a Central-Time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BiologyTutorTexasPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for Texas Students — STAAR EOC, AP, USABO, MCAT, DAT',
    description:
      'Specialist biology coaching for Texas students across the STAAR Biology EOC, AP Biology, USABO, MCAT and DAT, aligned to UT-Austin and Texas A&M pipelines. AIIMS-trained faculty, live online in Central Time.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'Texas' },
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
      { '@type': 'ListItem', position: 3, name: 'Texas', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Tutor Texas',
          'STAAR Biology EOC Tutor',
          'AP Biology Tutor Texas',
          'USABO Coach',
          'MCAT Bio/Biochem Tutor',
          'DAT Biology Tutor',
        ]}
        jobTitle="Texas Biology Specialist Faculty — STAAR / AP / USABO / MCAT / DAT"
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
            <li className="text-slate-700">Texas</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 Texas · Central Time · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology tutor in Texas &mdash;{' '}
            <span className="text-blue-700">STAAR EOC, AP, USABO, MCAT &amp; DAT.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists, across Houston, Dallas–Fort Worth and Austin.
            Cerebrum coaches Texas students for the STAAR Biology EOC, AP Biology (score-5 + FRQ),
            the USA Biology Olympiad, and the pre-med layer (MCAT, DAT) &mdash; built around the
            UT-Austin and Texas A&amp;M pipelines. Faculty are trained at AIIMS New Delhi &mdash;
            among the most selective medical schools in the world, peer to Harvard Medical School.
            Live online in Central Time.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
              <MapPin className="h-6 w-6 text-blue-600" /> Texas coaching by metro
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Each metro has a dedicated page; we also coach anywhere
              in Texas online.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {CITY_LINKS.map((c) => (
                <div key={c.metro} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">{c.metro}</h3>
                  <p className="mt-2 text-sm text-slate-600">{c.note}</p>
                  <ul className="mt-4 space-y-2">
                    {c.links.map((l) => (
                      <li key={l.label + l.href}>
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
              Biology in Texas — what shapes the prep
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Texas high-schoolers sit the <strong>STAAR Biology End-of-Course exam</strong>, a
                graduation requirement organized into reporting categories. Strong students often
                pair it with <strong>AP Biology</strong>, so we coach the two together — EOC pacing
                plus the AP score-5/FRQ target — rather than as separate jobs.
              </p>
              <p>
                The state’s pre-med pipeline runs through <strong>UT-Austin</strong> and{' '}
                <strong>Texas A&amp;M</strong>, with Houston’s Texas Medical Center anchoring a huge
                clinical ecosystem. That makes a clean ladder from honors/AP biology into{' '}
                <strong>USABO</strong> and then the <strong>MCAT and DAT</strong> valuable for Texas
                students.
              </p>
              <p>
                Competitive ISDs across DFW, Houston and Austin run fast honors/AP tracks; our metro
                pages match that pace.
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why Texas families choose a biology specialist
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
              Exam hubs for Texas students
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
              source="texas-hub"
              title="Book a free trial — Texas biology coaching"
              subtitle="Any Texas student, any biology exam. Tell us your exam, grade and city — we reply within a day in Central Time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in Texas &mdash; common questions
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
              A biology specialist for Texas students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              STAAR EOC · AP · USABO · MCAT · DAT — Houston, Dallas and Austin, in Central Time, a
              free trial first.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
