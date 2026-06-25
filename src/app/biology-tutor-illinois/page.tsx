/**
 * /biology-tutor-illinois
 *
 * Illinois state aggregator hub. Curates the real Chicago-area biology routes
 * (including Walter Payton) and adds IL-specific context: the UIUC and
 * Northwestern pipelines, the Chicago selective-enrollment magnets, and
 * Central-Time scheduling.
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
const CANONICAL = '/biology-tutor-illinois'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Tutor in Illinois — AP Biology, USABO, MCAT & DAT · Cerebrum',
  description:
    'Specialist online biology tutoring across Illinois — Chicago and the selective-enrollment magnets (incl. Walter Payton). AP Biology (score-5 + FRQ), USABO, MCAT and DAT, aligned to the UIUC and Northwestern pipelines. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live batches in Central Time, free trial.',
  keywords: [
    'biology tutor Illinois',
    'AP Biology tutor Chicago',
    'AP Biology tutor Walter Payton',
    'USABO coaching Illinois',
    'MCAT biology tutor Chicago',
    'DAT biology tutor Chicago',
    'online biology tutor Illinois',
    'UIUC pre-med biology',
    'Northwestern pre-med biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Tutor in Illinois · Cerebrum Biology Academy',
    description:
      'AP Biology · USABO · MCAT · DAT across Chicago and its selective-enrollment magnets. AIIMS-trained faculty, small live online batches in Central Time.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor in Illinois — AP · USABO · MCAT · DAT',
    description:
      'Specialist IL biology coaching across Chicago and its magnets. AIIMS-trained faculty, Central-Time live batches.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const CITY_LINKS = [
  {
    metro: 'Chicago',
    note: 'The city and the suburbs, including selective-enrollment magnets like Walter Payton.',
    links: [
      { label: 'AP Biology — Chicago', href: '/ap-biology-tutor-chicago' },
      { label: 'AP Biology — Walter Payton', href: '/ap-biology-tutor-walter-payton' },
      { label: 'USABO — Chicago', href: '/usabo-coaching-chicago' },
      { label: 'MCAT Biology — Chicago', href: '/mcat-biology-tutor-chicago' },
      { label: 'DAT Biology — Chicago', href: '/dat-biology-tutor-chicago' },
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
    title: 'Built for selective-enrollment pace',
    text: 'Chicago’s selective-enrollment magnets run accelerated AP tracks. We coach AP Biology to a genuine score-5 with full FRQ-rubric practice so students keep up and stand out.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Central Time scheduling',
    text: 'Live classes in CT, scheduled around the Illinois school day, with every session recorded.',
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
    detail: 'MCAT Bio/Biochem depth for the UIUC and Northwestern pre-med pipeline.',
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
    question: 'Which Illinois locations does Cerebrum cover?',
    answer:
      'We coach students across Illinois online, with dedicated pages for Chicago and its selective-enrollment magnets (including Walter Payton). Live classes run in Central Time around the Illinois school day.',
  },
  {
    question: 'Do you coach for Chicago’s selective-enrollment magnet schools?',
    answer:
      'Yes. Chicago’s selective-enrollment magnets — Walter Payton among them — run fast AP tracks. We keep a school-specific page for Walter Payton and coach the AP score-5/FRQ target precisely.',
  },
  {
    question: 'What is AIIMS, for an Illinois family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Johns Hopkins in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP, USABO and MCAT preparation.',
  },
  {
    question: 'Do you support UIUC and Northwestern pre-med students?',
    answer:
      'Yes. Beyond high-school AP and USABO, we coach the pre-med biology layer — MCAT Bio/Biochem and DAT survey of natural sciences — for students in the UIUC and Northwestern pre-med pipeline.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (AP, USABO, MCAT, DAT…), grade and Illinois location, and we match you to the right tutor and a Central-Time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BiologyTutorIllinoisPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for Illinois Students — AP, USABO, MCAT, DAT',
    description:
      'Specialist biology coaching for Illinois students across AP Biology, USABO, MCAT and DAT, with school-specific support for Chicago’s selective-enrollment magnets and alignment to the UIUC and Northwestern pre-med pipelines. AIIMS-trained faculty, live online in Central Time.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'Illinois' },
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
      { '@type': 'ListItem', position: 3, name: 'Illinois', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Tutor Illinois',
          'AP Biology Tutor Chicago',
          'USABO Coach',
          'MCAT Bio/Biochem Tutor',
          'DAT Biology Tutor',
        ]}
        jobTitle="Illinois Biology Specialist Faculty — AP / USABO / MCAT / DAT"
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
            <li className="text-slate-700">Illinois</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 Illinois · Central Time · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology tutor in Illinois &mdash;{' '}
            <span className="text-blue-700">AP, USABO, MCAT &amp; DAT.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists, across Chicago and its selective-enrollment magnets
            (including Walter Payton). Cerebrum coaches Illinois students for AP Biology (score-5 +
            FRQ), the USA Biology Olympiad, and the pre-med layer (MCAT, DAT) &mdash; aligned to the
            UIUC and Northwestern pipelines. Faculty are trained at AIIMS New Delhi &mdash; among
            the most selective medical schools in the world, peer to Harvard Medical School. Live
            online in Central Time.
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
              <MapPin className="h-6 w-6 text-blue-600" /> Illinois coaching by area
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Each area has a dedicated page with school-level
              detail; we also coach anywhere in Illinois online.
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
              Biology in Illinois — what shapes the prep
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Chicago’s <strong>selective-enrollment magnet schools</strong> — Walter Payton among
                them — run fast, competitive AP tracks. Keeping pace there rewards precise{' '}
                <strong>score-5 and FRQ coaching</strong> over generic review.
              </p>
              <p>
                For pre-med, Illinois sends large cohorts through <strong>UIUC</strong> and{' '}
                <strong>Northwestern</strong>, with Chicago’s hospital and research network behind
                them. A clean ladder from honors/AP biology into <strong>USABO</strong> and then the{' '}
                <strong>MCAT and DAT</strong> serves Illinois students aiming at medicine and
                dentistry.
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why Illinois families choose a biology specialist
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
              Exam hubs for Illinois students
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
              source="illinois-hub"
              title="Book a free trial — Illinois biology coaching"
              subtitle="Any Illinois student, any biology exam. Tell us your exam, grade and area — we reply within a day in Central Time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in Illinois &mdash; common questions
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
              A biology specialist for Illinois students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              AP · USABO · MCAT · DAT — Chicago and its magnets, in Central Time, a free trial
              first.
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
