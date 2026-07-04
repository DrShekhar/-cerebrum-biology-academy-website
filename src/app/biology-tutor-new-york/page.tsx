/**
 * /biology-tutor-new-york
 *
 * New York State aggregator hub. Curates the real per-metro/per-school NY
 * biology routes (NYC, Long Island, and the specialized high schools) and adds
 * NY-specific context: the Regents Living Environment exam, the NYC specialized
 * high schools, the SUNY system, and Eastern-Time scheduling.
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
const CANONICAL = '/biology-tutor-new-york'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Tutor in New York — Regents Living Environment, AP, USABO & MCAT · Cerebrum',
  description:
    'Specialist online biology tutoring across New York — NYC, Long Island and the specialized high schools (Stuyvesant, Bronx Science, Hunter). Regents Living Environment, AP Biology (score-5 + FRQ), USABO, MCAT and DAT. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live batches in Eastern Time, free trial.',
  keywords: [
    'biology tutor New York',
    'Regents Living Environment tutor',
    'AP Biology tutor NYC',
    'AP Biology tutor Long Island',
    'AP Biology tutor Stuyvesant',
    'AP Biology tutor Bronx Science',
    'USABO coaching New York',
    'MCAT biology tutor New York',
    'DAT biology tutor New York',
    'online biology tutor New York',
    'SUNY pre-med biology',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Tutor in New York · Cerebrum Biology Academy',
    description:
      'Regents Living Environment · AP Biology · USABO · MCAT · DAT across NYC, Long Island and the specialized high schools. AIIMS-trained faculty, Eastern-Time live batches.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor in New York — Regents · AP · USABO · MCAT · DAT',
    description:
      'Specialist NY biology coaching across NYC, Long Island and the specialized high schools. AIIMS-trained faculty, Eastern-Time live batches.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const CITY_LINKS = [
  {
    metro: 'New York City',
    note: 'The five boroughs and the specialized high schools.',
    links: [
      { label: 'AP Biology — New York City', href: '/ap-biology-tutor-new-york' },
      { label: 'AP Biology — Stuyvesant', href: '/ap-biology-tutor-stuyvesant' },
      { label: 'AP Biology — Bronx Science', href: '/ap-biology-tutor-bronx-science' },
      { label: 'AP Biology — Hunter College HS', href: '/ap-biology-tutor-hunter-college-hs' },
      { label: 'USABO — New York', href: '/usabo-coaching-new-york' },
      { label: 'MCAT Biology — New York', href: '/mcat-biology-tutor-new-york' },
      { label: 'DAT Biology — New York', href: '/dat-biology-tutor-new-york' },
    ],
  },
  {
    metro: 'Long Island',
    note: 'Nassau and Suffolk counties.',
    links: [{ label: 'AP Biology — Long Island', href: '/ap-biology-tutor-long-island' }],
  },
]

const WHY = [
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School and Columbia — bring research and clinical depth that maps onto Regents, AP, USABO and MCAT reasoning.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Regents and AP in one plan',
    text: 'New York students sit the Regents Living Environment exam and, at competitive schools, AP Biology. We coach both — Regents Part D labs and the AP score-5/FRQ target — without doubling your tutoring.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Eastern Time scheduling',
    text: 'Live classes in ET, scheduled around the New York school day, with every session recorded.',
  },
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Built for selective schools',
    text: 'Stuyvesant, Bronx Science and Hunter run accelerated tracks; we match that pace with 1:1 and micro-batch teaching plus weekly written feedback.',
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
    detail: 'MCAT Bio/Biochem depth for the SUNY and private-university pre-med pipeline.',
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
    question: 'Which New York locations does Cerebrum cover?',
    answer:
      'We coach students across New York State online, with dedicated pages for New York City (including Stuyvesant, Bronx Science and Hunter College HS) and Long Island. Live classes run in Eastern Time around the New York school day.',
  },
  {
    question: 'Do you prepare students for the Regents Living Environment exam?',
    answer:
      'Yes. The Regents Living Environment exam is New York’s high-school biology assessment, including the Part D laboratory component. We coach the content and the lab-skills it tests, and pair it with AP Biology for students taking both.',
  },
  {
    question: 'What is AIIMS, for a New York family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Columbia in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens Regents, AP, USABO and MCAT preparation.',
  },
  {
    question: 'Do you support SUNY and pre-med students for the MCAT and DAT?',
    answer:
      'Yes. Beyond high-school Regents, AP and USABO, we coach the pre-med biology layer — MCAT Bio/Biochem and DAT survey of natural sciences — for students across the SUNY system and New York’s private universities.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (Regents, AP, USABO, MCAT, DAT…), grade and NY location, and we match you to the right tutor and an Eastern-Time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BiologyTutorNewYorkPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for New York Students — Regents, AP, USABO, MCAT, DAT',
    description:
      'Specialist biology coaching for New York students across the Regents Living Environment exam, AP Biology, USABO, MCAT and DAT, with school-specific support for the NYC specialized high schools. AIIMS-trained faculty, live online in Eastern Time.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'New York' },
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
      { '@type': 'ListItem', position: 3, name: 'New York', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Tutor New York',
          'Regents Living Environment Tutor',
          'AP Biology Tutor NYC',
          'USABO Coach',
          'MCAT Bio/Biochem Tutor',
          'DAT Biology Tutor',
        ]}
        jobTitle="New York Biology Specialist Faculty — Regents / AP / USABO / MCAT / DAT"
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
            <li className="text-slate-700">New York</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 New York · Eastern Time · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology tutor in New York &mdash;{' '}
            <span className="text-blue-700">Regents, AP, USABO &amp; MCAT.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists, across New York City, Long Island and the
            specialized high schools (Stuyvesant, Bronx Science, Hunter). Cerebrum coaches NY
            students for the Regents Living Environment exam, AP Biology (score-5 + FRQ), the USA
            Biology Olympiad, and the pre-med layer (MCAT, DAT) &mdash; aligned to the SUNY
            pipeline. Faculty are trained at AIIMS New Delhi &mdash; among the most selective
            medical schools in the world, peer to Harvard Medical School and Columbia. Live online
            in Eastern Time.
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
              <MapPin className="h-6 w-6 text-blue-600" /> New York coaching by area
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Each area has a dedicated page with school-level
              detail; we also coach anywhere in New York online.
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
              Biology in New York — what shapes the prep
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                New York high-schoolers sit the <strong>Regents Living Environment</strong> exam,
                the state biology assessment that includes a Part D laboratory component. At
                competitive schools, students layer <strong>AP Biology</strong> on top — so we coach
                both together rather than as separate jobs.
              </p>
              <p>
                The city’s <strong>specialized high schools</strong> — Stuyvesant, Bronx Science and
                Hunter College HS — run accelerated science tracks and feed deep olympiad and
                research cultures, which is why we keep school-specific pages for them.
              </p>
              <p>
                For pre-med, the <strong>SUNY system</strong> and New York’s private universities
                form a large pipeline; a clean ladder from honors/AP biology into{' '}
                <strong>USABO</strong> and then the <strong>MCAT and DAT</strong> serves NY students
                well.
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why New York families choose a biology specialist
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
              Exam hubs for New York students
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
              source="new-york-hub"
              title="Book a free trial — New York biology coaching"
              subtitle="Any New York student, any biology exam. Tell us your exam, grade and area — we reply within a day in Eastern Time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in New York &mdash; common questions
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
              A biology specialist for New York students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Regents · AP · USABO · MCAT · DAT — NYC, Long Island and the specialized high schools,
              in Eastern Time, a free trial first.
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
