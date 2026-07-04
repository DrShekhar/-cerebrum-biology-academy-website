/**
 * /us-biology-competitions-hub
 *
 * Cross-vertical hub tying the three US biology-competition clusters together:
 * USABO, IBO (Team USA) and the Brain Bee. The Brain Bee cluster was previously
 * orphaned (linked only from / and /global); this page links it into the wider
 * competition ecosystem and captures broad informational queries such as
 * "biology competitions for high school students USA" and "biology olympiad USA".
 *
 * ADDITIVE: a new route; does not touch any existing page/layout.
 * Links only verified existing routes. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  GraduationCap,
  Home,
  Microscope,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/us-biology-competitions-hub'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology Competitions for High School Students in the USA — USABO, IBO & Brain Bee',
  description:
    'A complete guide to the major US biology competitions: the USA Biology Olympiad (USABO) and IBO Team USA, and the Brain Bee neuroscience competition. Who each is for, the college-admissions value, and how to prepare with AIIMS-trained faculty (apex medical school, peer to Harvard Med) in your US time zone. Free trial.',
  keywords: [
    'biology competitions for high school students USA',
    'biology olympiad USA',
    'USABO',
    'USABO coaching',
    'how to qualify for USABO',
    'IBO Team USA',
    'how to make US IBO team',
    'Brain Bee competition',
    'Brain Bee coaching USA',
    'high school biology olympiad',
    'science competitions for college admissions',
    'neuroscience competition high school',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'US Biology Competitions Hub — USABO, IBO & Brain Bee · Cerebrum Biology Academy',
    description:
      'USABO, IBO Team USA and the Brain Bee explained: who they are for, their college-admissions value, and how to prepare. AIIMS-trained faculty, US time zones.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'US Biology Competitions — USABO, IBO & Brain Bee',
    description:
      'The major US biology competitions explained, plus expert coaching from AIIMS-trained biology specialists in your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COMPETITIONS = [
  {
    icon: Trophy,
    name: 'USA Biology Olympiad (USABO)',
    who: 'High-school students (any grade) strong in biology who want the most prestigious US biology competition.',
    what: 'A multi-stage contest: the Open Exam, the Semifinal Exam, and the National Finals. Top finishers are invited to the National Finals, from which Team USA is selected. Content goes well beyond AP Biology — cell & molecular biology, genetics, anatomy & physiology, ecology, ethology and biosystematics.',
    value:
      'A semifinalist or finalist placement is one of the strongest biology credentials a US applicant can carry into selective college admissions — it signals genuine subject mastery, not just coursework.',
    href: '/usabo-coaching',
    cta: 'USABO coaching',
  },
  {
    icon: Award,
    name: 'International Biology Olympiad (IBO) — Team USA',
    who: 'The top USABO National Finalists who go on to represent the United States.',
    what: 'After the USABO National Finals, four students are selected and trained as Team USA for the International Biology Olympiad — a global competition with theory and practical (lab) examinations against the best high-school biologists in the world.',
    value:
      'Reaching Team USA is among the rarest and most prestigious distinctions a high-school biologist can earn anywhere — internationally recognized and exceptional in any admissions file.',
    href: '/ibo-coaching-usa',
    cta: 'IBO Team USA coaching',
  },
  {
    icon: Brain,
    name: 'The Brain Bee (Neuroscience)',
    who: 'High-school students (typically grades 9–12) interested in neuroscience, the brain and medicine.',
    what: 'A neuroscience competition with local, national and international levels. It tests neuroanatomy, neurophysiology, brain disorders, and includes live oral and patient-diagnosis rounds — a different skill set from the written olympiad exams.',
    value:
      'The Brain Bee is an accessible, distinctive entry point into competitive biology and a strong signal for students aiming at neuroscience, pre-med or psychology — and it pairs naturally with a later USABO attempt.',
    href: '/brain-bee-coaching',
    cta: 'Brain Bee coaching',
  },
]

const USABO_GUIDES = [
  { label: 'USABO coaching', href: '/usabo-coaching' },
  { label: 'How to qualify for USABO', href: '/how-to-qualify-for-usabo' },
  { label: 'USABO syllabus', href: '/usabo-syllabus' },
  { label: 'Best USABO books', href: '/best-usabo-books' },
  { label: 'Is USABO worth it?', href: '/is-usabo-worth-it' },
]

const IBO_GUIDES = [
  { label: 'How to make the US IBO team', href: '/how-to-make-us-ibo-team' },
  { label: 'IBO coaching (USA)', href: '/ibo-coaching-usa' },
]

const BRAINBEE_GUIDES = [
  { label: 'Brain Bee coaching', href: '/brain-bee-coaching' },
  { label: 'Brain Bee study guide', href: '/brain-bee-study-guide' },
  { label: 'Brain Bee neuroanatomy guide', href: '/brain-bee-neuroanatomy-guide' },
]

const WHY = [
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'Built for how each contest scores',
    text: 'USABO past-paper saturation, IBO practical-lab technique, and the Brain Bee’s neuroanatomy and live oral / diagnosis rounds — we coach the specific demands of each competition, not generic content review.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School and Oxford. That clinical and research depth is exactly what olympiad-level biology rewards.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone',
    text: 'Live classes in Eastern, Central, Mountain or Pacific time, scheduled around the US school day, with every session recorded for revision.',
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-blue-600" />,
    title: 'A clear competition runway',
    text: 'Start with the Brain Bee or AP, progress to USABO, and aim for IBO Team USA — one specialist faculty across the whole ladder.',
  },
]

const FAQS = [
  {
    question: 'Which biology competition should I choose — USABO, IBO or the Brain Bee?',
    answer:
      'Start from your interests and grade. The Brain Bee is the most accessible entry point and ideal if you love neuroscience or are aiming at pre-med; it has live oral and patient-diagnosis rounds. USABO is the flagship US biology olympiad and the most prestigious general-biology contest — open to all high-school students and the route to Team USA. IBO is not something you enter directly: it is reached by being one of the top USABO National Finalists selected as Team USA. A common path is Brain Bee first, then USABO, then aiming for IBO.',
  },
  {
    question: 'Do biology competitions actually help with college admissions?',
    answer:
      'Yes. A USABO Semifinalist or Finalist placement, a Brain Bee national/international result, or selection to IBO Team USA are genuine, verifiable signals of subject mastery that stand out in selective US college applications — far more than coursework alone. They demonstrate initiative, depth and the ability to perform under competition conditions, which is exactly what admissions readers look for in a prospective biology, neuroscience or pre-med applicant.',
  },
  {
    question: 'Can I do more than one biology competition?',
    answer:
      'Absolutely, and many strong students do. The Brain Bee (neuroscience) and USABO (general biology) test overlapping but distinct content, so preparing for one strengthens the other. A typical multi-competition student does the Brain Bee in an earlier grade, then sits USABO, and — if they reach the National Finals — competes for Team USA at the IBO. We help you sequence them so the workload is realistic alongside school.',
  },
  {
    question: 'When should I start preparing for biology competitions?',
    answer:
      'Earlier is better. Grades 9–10 are an ideal time to begin with the Brain Bee and to build the foundation USABO demands, because olympiad content goes well beyond standard high-school biology and takes time to absorb. Starting in grade 9 or 10 leaves room for multiple attempts and for the competition track to mature before college applications. That said, motivated students can begin in grade 11 and still place well with focused, exam-specific coaching.',
  },
  {
    question: 'What is AIIMS, for a US family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School, Johns Hopkins and Oxford in selectivity. AIIMS-trained faculty bring the clinical and research depth that olympiad-level biology competitions reward.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us the competition you are aiming for (USABO, the Brain Bee, or the IBO track), your grade and US state, and we match you to the right tutor and time-zone slot. Use the form on this page or WhatsApp via +91 88264 44334.',
  },
]

export default function USBiologyCompetitionsHubPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'US Biology Competition Coaching — USABO, IBO Team USA & the Brain Bee',
    description:
      'Coaching for the major US biology competitions: the USA Biology Olympiad (USABO), the International Biology Olympiad (IBO) Team USA route, and the Brain Bee neuroscience competition. AIIMS-trained faculty, live online in US time zones.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'United States' },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'details p'],
    },
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'US biology competitions',
    itemListElement: COMPETITIONS.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${SITE_URL}${c.href}`,
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
        name: 'USA',
        item: `${SITE_URL}/best-biology-tutor-usa`,
      },
      { '@type': 'ListItem', position: 3, name: 'Biology Competitions', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'USA Biology Olympiad (USABO) Coach',
          'IBO Team USA Coach',
          'Brain Bee Neuroscience Coach',
          'High School Biology Competition Coach',
          'Biology Olympiad USA',
        ]}
        jobTitle="US Biology Competition Faculty — USABO / IBO / Brain Bee"
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
            <li className="text-slate-700">Biology Competitions</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 Biology competitions for US high schoolers
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            US biology competitions, explained &mdash;{' '}
            <span className="text-blue-700">USABO, IBO Team USA &amp; the Brain Bee.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Three competitions, one ladder. This hub explains what each contest is, who it is for,
            and why it matters for college admissions &mdash; the USA Biology Olympiad (USABO) and
            the IBO Team USA route, plus the Brain Bee neuroscience competition. Then it points you
            to the right preparation. Faculty are trained at AIIMS New Delhi &mdash; among the most
            selective medical schools in the world, peer to Harvard Medical School and Oxford. Live
            online in your US time zone.
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

        {/* The three competitions */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The three major US biology competitions
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {COMPETITIONS.map((c) => (
                <div
                  key={c.name}
                  className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-slate-200"
                >
                  <c.icon className="h-7 w-7 text-blue-600" />
                  <h3 className="mt-3 text-lg font-bold text-slate-900">{c.name}</h3>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Who it’s for
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{c.who}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    What it is
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{c.what}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Admissions value
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">{c.value}</p>
                  <Link
                    href={c.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
                  >
                    {c.cta} <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guides by competition */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Go deeper on each competition
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">USABO</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {USABO_GUIDES.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
                      >
                        <ChevronRight className="h-3.5 w-3.5" /> {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500">
                  See also{' '}
                  <Link href="/usabo-past-papers" className="text-blue-700 underline">
                    USABO past papers
                  </Link>{' '}
                  and{' '}
                  <Link href="/ap-biology-vs-usabo" className="text-blue-700 underline">
                    AP Biology vs USABO
                  </Link>
                  .
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">IBO (Team USA)</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {IBO_GUIDES.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
                      >
                        <ChevronRight className="h-3.5 w-3.5" /> {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900">Brain Bee</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {BRAINBEE_GUIDES.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="inline-flex items-center gap-1 text-sm text-blue-700 hover:underline"
                      >
                        <ChevronRight className="h-3.5 w-3.5" /> {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why prepare with a biology specialist
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
            <p className="mt-6 text-sm text-slate-500">
              Building toward competitions through coursework first? See how the{' '}
              <Link href="/us-biology-pathway" className="text-blue-700 underline">
                US biology pathway
              </Link>{' '}
              connects honors, AP and college biology to the competition track — and explore{' '}
              <Link href="/ap-biology-tutor" className="text-blue-700 underline">
                AP Biology tutoring
              </Link>{' '}
              as a foundation.
            </p>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquiry">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="us-competitions-hub"
              title="Book a free trial — US biology competition coaching"
              subtitle="USABO, IBO Team USA, or the Brain Bee. Tell us your target competition, grade and state — we reply within a day in your time zone."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              US biology competitions &mdash; common questions
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
              From your first competition to Team USA
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              USABO · IBO · Brain Bee — one specialist faculty across the whole ladder, in your US
              time zone, a free trial first.
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
                href="/us-biology-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Compass className="h-5 w-5" />
                See the full US biology pathway
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
