/**
 * /biology-tutor-california
 *
 * California state aggregator hub. Curates the real per-metro California biology
 * routes (Bay Area, Los Angeles, San Diego, and the magnet-school pages) and
 * adds California-specific context: UC/CSU AP-credit & a-g requirements, the
 * large UC/CSU pre-med pipeline, and Pacific-time scheduling.
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
const CANONICAL = '/biology-tutor-california'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Tutor in California — AP Biology, USABO, MCAT & DAT · Cerebrum',
  description:
    'Specialist online biology tutoring across California — SF Bay Area, Los Angeles, San Diego and the top magnet schools. AP Biology (score-5 + FRQ), USABO, MCAT and DAT, aligned to UC/CSU a-g and AP-credit. AIIMS-trained faculty (apex medical school, peer to Harvard Med), small live batches in Pacific Time, free trial.',
  keywords: [
    'biology tutor California',
    'AP Biology tutor California',
    'AP Biology tutor Bay Area',
    'AP Biology tutor Los Angeles',
    'AP Biology tutor San Diego',
    'USABO coaching California',
    'MCAT biology tutor California',
    'DAT biology tutor California',
    'online biology tutor California',
    'UC pre-med biology tutor',
    'a-g biology California',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology Tutor in California · Cerebrum Biology Academy',
    description:
      'AP Biology · USABO · MCAT · DAT across the Bay Area, Los Angeles and San Diego. AIIMS-trained faculty, small live online batches in Pacific Time.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology Tutor in California — AP · USABO · MCAT · DAT',
    description:
      'Specialist California biology coaching across the Bay Area, LA and San Diego. AIIMS-trained faculty, Pacific-Time live batches.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const CITY_LINKS = [
  {
    metro: 'San Francisco Bay Area & Silicon Valley',
    note: 'SF, Peninsula, San Jose / Fremont — including Gunn, Harker and Mission San Jose.',
    links: [
      { label: 'AP Biology — Bay Area', href: '/ap-biology-tutor-bay-area' },
      { label: 'AP Biology — Gunn (Palo Alto)', href: '/ap-biology-tutor-gunn-palo-alto' },
      { label: 'AP Biology — Harker (San Jose)', href: '/ap-biology-tutor-harker' },
      {
        label: 'AP Biology — Mission San Jose (Fremont)',
        href: '/ap-biology-tutor-mission-san-jose',
      },
      { label: 'USABO — Bay Area', href: '/usabo-coaching-bay-area' },
      { label: 'MCAT Biology — Bay Area', href: '/mcat-biology-tutor-bay-area' },
      { label: 'DAT Biology — Bay Area', href: '/dat-biology-tutor-bay-area' },
    ],
  },
  {
    metro: 'Los Angeles',
    note: 'Greater LA, the South Bay and the San Gabriel Valley.',
    links: [
      { label: 'AP Biology — Los Angeles', href: '/ap-biology-tutor-los-angeles' },
      { label: 'USABO — Los Angeles', href: '/usabo-coaching-los-angeles' },
      { label: 'MCAT Biology — Los Angeles', href: '/mcat-biology-tutor-los-angeles' },
      { label: 'DAT Biology — Los Angeles', href: '/dat-biology-tutor-los-angeles' },
    ],
  },
  {
    metro: 'San Diego',
    note: 'San Diego County, including the UC San Diego pre-med pipeline.',
    links: [
      { label: 'AP Biology — San Diego', href: '/ap-biology-tutor-san-diego' },
      { label: 'USABO — San Diego', href: '/usabo-coaching-san-diego' },
      { label: 'MCAT Biology — San Diego', href: '/mcat-biology-tutor-san-diego' },
    ],
  },
]

const WHY = [
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School and Stanford Med — bring research and clinical depth that maps onto AP, USABO and MCAT reasoning.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Tuned to UC / CSU expectations',
    text: 'California students plan around the UC/CSU a-g course list and AP-credit policies. We coach AP Biology to the score that earns UC/CSU credit and strengthens a pre-med application to UCLA, Berkeley and UCSD.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Pacific Time scheduling',
    text: 'Live classes in PT, scheduled around the California school day, with every session recorded. No awkward time-zone math.',
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
    detail: 'All 8 College Board units, FRQ rubric mastery and score-5 targeting for the May exam.',
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
    detail: 'MCAT Bio/Biochem depth for the UC/CSU pre-med pipeline.',
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
    question: 'Which California cities does Cerebrum cover?',
    answer:
      'We coach students across California online, with dedicated pages for the San Francisco Bay Area & Silicon Valley (including Gunn, Harker and Mission San Jose), Los Angeles and San Diego. Live classes run in Pacific Time around the California school day.',
  },
  {
    question: 'Will AP Biology earn UC or CSU credit?',
    answer:
      'The UC and CSU systems publish AP-credit and a-g course policies that reward strong AP scores. We coach AP Biology to a score-5 target with full FRQ-rubric practice so California students maximize the credit and the pre-med strength of the result. Always confirm the current policy with your specific campus.',
  },
  {
    question: 'What is AIIMS, for a California family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School, Stanford and Johns Hopkins in selectivity. AIIMS-trained faculty bring clinical and research depth that directly strengthens AP Biology, USABO and MCAT preparation.',
  },
  {
    question: 'Do you support UC/CSU pre-med students for the MCAT and DAT?',
    answer:
      'Yes. Beyond high-school AP and USABO, we coach the pre-med biology layer — MCAT Bio/Biochem and DAT survey of natural sciences — for students at and applying to UCLA, Berkeley, UCSD and the CSU campuses.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your exam (AP, USABO, MCAT, DAT…), grade and California city, and we match you to the right tutor and a Pacific-Time slot. Use the form on this page or WhatsApp +91 88264 44334.',
  },
]

export default function BiologyTutorCaliforniaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology Coaching for California Students — AP, USABO, MCAT, DAT',
    description:
      'Specialist biology coaching for California students across AP Biology, USABO, MCAT and DAT, aligned to UC/CSU a-g and AP-credit policies. AIIMS-trained faculty, live online in Pacific Time.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + pre-medical',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'California' },
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
      { '@type': 'ListItem', position: 3, name: 'California', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology Tutor California',
          'AP Biology Tutor California',
          'USABO Coach',
          'MCAT Bio/Biochem Tutor',
          'DAT Biology Tutor',
        ]}
        jobTitle="California Biology Specialist Faculty — AP / USABO / MCAT / DAT"
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
            <li className="text-slate-700">California</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 California · Pacific Time · any nationality
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology tutor in California &mdash;{' '}
            <span className="text-blue-700">AP, USABO, MCAT &amp; DAT.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            One subject, taught by specialists, across the San Francisco Bay Area, Los Angeles and
            San Diego. Cerebrum coaches California students for AP Biology (score-5 + FRQ), the USA
            Biology Olympiad, and the pre-med layer (MCAT, DAT) &mdash; aligned to UC/CSU a-g and
            AP-credit policies and the UCLA / Berkeley / UCSD pre-med pipeline. Faculty are trained
            at AIIMS New Delhi &mdash; among the most selective medical schools in the world, peer
            to Harvard Medical School and Stanford. Live online in Pacific Time.
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
              <MapPin className="h-6 w-6 text-blue-600" /> California coaching by metro
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Local context, your time zone. Each metro has a dedicated page with school-level
              detail; we also coach anywhere in California online.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
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
              Biology in California — what shapes the prep
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                California families plan around the <strong>UC and CSU a-g course list</strong>,
                where laboratory science (including biology) is a required area, and around each
                system’s <strong>AP-credit policy</strong>, which rewards strong AP exam scores. A
                score-5 AP Biology result is therefore a credit and admissions asset, not just a
                transcript line.
              </p>
              <p>
                The state’s pre-med pipeline is among the deepest in the country — UCLA, UC
                Berkeley, UC San Diego and the CSU campuses send large cohorts toward medical and
                dental school. That makes a clean ladder from <strong>honors/AP biology</strong>{' '}
                into <strong>USABO</strong> and then the <strong>MCAT and DAT</strong> especially
                valuable for California students.
              </p>
              <p>
                Magnet and selective schools — Gunn (Palo Alto), Harker (San Jose) and Mission San
                Jose (Fremont) — run accelerated tracks; our school-specific pages match that pace.
              </p>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why California families choose a biology specialist
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
              Exam hubs for California students
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
              source="california-hub"
              title="Book a free trial — California biology coaching"
              subtitle="Any California student, any biology exam. Tell us your exam, grade and city — we reply within a day in Pacific Time."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology coaching in California &mdash; common questions
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
              A biology specialist for California students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              AP · USABO · MCAT · DAT — Bay Area, LA and San Diego, in Pacific Time, a free trial
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
