/**
 * /us-biology-pathway
 *
 * Cross-vertical "ladder" hub mapping the full US biology journey:
 * honors / high-school biology → AP Biology → college / intro biology →
 * pre-med admissions exams (MCAT, DAT, USMLE), with the competition track
 * (USABO / IBO / Brain Bee) branching off. Ties together the otherwise siloed
 * US clusters and captures broad informational queries like "what order to take
 * biology courses" and "US biology course progression".
 *
 * ADDITIVE: a new route; does not touch any existing page/layout.
 * Links only verified existing routes. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  GraduationCap,
  Home,
  Microscope,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/us-biology-pathway'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'The US Biology Pathway — Honors to AP to College to Pre-Med, Step by Step',
  description:
    'The complete US biology ladder explained: honors / high-school biology, the EOC, AP Biology, college intro biology (Biology 101, Anatomy & Physiology), and the pre-med admissions exams (MCAT, DAT, USMLE Step 1) — plus the competition track (USABO, IBO, Brain Bee) that branches off. What order to take biology courses, how the stages connect, and when to start. AIIMS-trained faculty (apex medical school, peer to Harvard Med), US time zones.',
  keywords: [
    'US biology pathway',
    'what order to take biology courses',
    'high school to college biology progression',
    'honors biology vs AP biology vs college biology',
    'pre-med biology requirements',
    'when to start pre-med prep',
    'AP biology to college biology',
    'pre-med exams MCAT DAT USMLE',
    'biology course sequence USA',
    'biology tutor USA',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'The US Biology Pathway — Honors → AP → College → Pre-Med · Cerebrum Biology Academy',
    description:
      'The full US biology ladder: honors, AP, college intro biology, and pre-med exams (MCAT, DAT, USMLE) — plus the competition track. How the stages connect and when to start.',
    url: PAGE_URL,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'The US Biology Pathway — Honors to AP to College to Pre-Med',
    description:
      'What order to take biology courses and how each stage connects, mapped end to end. AIIMS-trained biology specialists, US time zones.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const STAGES = [
  {
    step: '1',
    icon: GraduationCap,
    stage: 'High school: honors & on-level biology',
    detail:
      'Your foundation. Honors / Pre-AP biology builds the concept mastery and lab reasoning that everything above depends on. In many states this is also where the Biology EOC (End-of-Course) exam sits.',
    links: [
      { label: 'Honors biology tutor', href: '/honors-biology-tutor' },
      { label: 'Biology EOC exam prep', href: '/biology-eoc-exam-prep' },
    ],
  },
  {
    step: '2',
    icon: BookOpen,
    stage: 'AP Biology',
    detail:
      'The bridge from high school to college. AP Biology covers all 8 College Board units and, with a score of 5, can earn college credit and signal readiness for selective programs. This is also the natural launchpad into the competition track.',
    links: [
      { label: 'AP Biology tutor', href: '/ap-biology-tutor' },
      { label: 'AP Biology score-5 study guide', href: '/ap-biology-score-5-study-guide' },
    ],
  },
  {
    step: '3',
    icon: Microscope,
    stage: 'College & intro biology',
    detail:
      'Undergraduate general biology (Biology 101), cell & molecular biology, genetics, and Anatomy & Physiology. These courses set your science GPA — the foundation pre-med admissions weigh heavily.',
    links: [
      { label: 'College biology tutor', href: '/college-biology-tutor' },
      { label: 'Biology 101 tutor', href: '/biology-101-tutor' },
      { label: 'Anatomy & Physiology tutor', href: '/anatomy-and-physiology-tutor' },
    ],
  },
  {
    step: '4',
    icon: Stethoscope,
    stage: 'Pre-med & professional-school exams',
    detail:
      'The gateway exams to medical, dental and licensure pathways: the MCAT (medical school), the DAT (dental school), and USMLE Step 1 biology foundations for med students. Deep, integrated biology is the common thread.',
    links: [
      { label: 'MCAT biology', href: '/mcat-biology' },
      { label: 'DAT biology preparation', href: '/dat-biology-preparation' },
      { label: 'USMLE Step 1 biology preparation', href: '/usmle-step-1-biology-preparation' },
    ],
  },
]

const WHY = [
  {
    icon: <Compass className="h-5 w-5 text-blue-600" />,
    title: 'One faculty, the whole ladder',
    text: 'The same biology-only specialists take a student from honors and AP through college biology and into MCAT / DAT / USMLE prep — no restarting with a new tutor at each stage.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Stage-appropriate, not generic',
    text: 'AP FRQ rubrics, college exam technique, MCAT passage reasoning — each stage is coached for how it is actually assessed, so the prep compounds instead of repeating.',
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'AIIMS-trained clinical depth',
    text: 'Faculty trained at AIIMS New Delhi — among the most selective medical schools in the world, peer to Harvard Medical School and Oxford — bring the clinical perspective pre-med exams reward.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone',
    text: 'Live classes in Eastern, Central, Mountain or Pacific time, scheduled around school or college, with every session recorded for revision.',
  },
]

const FAQS = [
  {
    question: 'What order should I take biology courses in the US?',
    answer:
      'The standard ladder is: honors / on-level high-school biology first (your foundation, plus the Biology EOC in many states), then AP Biology, then college introductory biology (Biology 101 and cell/molecular biology) followed by Anatomy & Physiology, and finally the pre-med admissions exams — MCAT for medical school, DAT for dental school, and USMLE Step 1 once you are in medical school. Each stage assumes mastery of the one below it, which is why a strong honors and AP foundation makes everything afterward easier.',
  },
  {
    question: 'How do honors, AP and college biology connect?',
    answer:
      'They are a continuum of increasing depth. Honors biology teaches the core concepts and lab reasoning; AP Biology covers the same domains in college-level detail across all 8 College Board units and, with a score of 5, can grant credit and demonstrate readiness; college biology (Biology 101, cell & molecular, genetics, Anatomy & Physiology) then goes deeper still and sets your science GPA. Skipping the foundation rarely works — students who rush into AP or college biology without solid honors-level mastery tend to struggle, which is exactly the gap specialist coaching closes.',
  },
  {
    question: 'When should I start pre-med preparation?',
    answer:
      'Pre-med preparation really begins with your science GPA, so it starts in your earliest college biology courses — Biology 101, cell & molecular biology, genetics and Anatomy & Physiology — not the year you sit the MCAT. Most students take the MCAT after completing the core pre-med science sequence (often the end of sophomore or during junior year), and dedicated MCAT prep typically runs several months before the test. The DAT follows a similar timeline for dental applicants. USMLE Step 1 comes later, during medical school. The earlier you build deep, retained biology, the lighter the dedicated-prep phase becomes.',
  },
  {
    question: 'How does the competition track fit into this pathway?',
    answer:
      'The biology competition track — USABO, IBO Team USA and the Brain Bee — branches off the high-school stages rather than replacing them. AP-level and honors biology build the foundation, while the olympiad track adds depth that goes well beyond standard coursework. Competitions are best started in grades 9–11, alongside your courses, and they strengthen college applications. See the US biology competitions hub for how USABO, IBO and the Brain Bee compare.',
  },
  {
    question: 'What is AIIMS, for a US family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi (All India Institute of Medical Sciences) is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School, Johns Hopkins and Oxford in selectivity. AIIMS-trained faculty bring clinical and research depth that strengthens biology at every stage, from AP to the MCAT.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your current stage (honors, AP, college, or pre-med exam prep), your grade or year, and your US state, and we match you to the right tutor and time-zone slot. Use the form on this page or WhatsApp via +91 88264 44334.',
  },
]

export default function USBiologyPathwayPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'The US Biology Pathway — Honors to AP to College to Pre-Med',
    description:
      'Coaching across the full US biology ladder: honors / high-school biology and the EOC, AP Biology, college intro biology (Biology 101, Anatomy & Physiology), and pre-med exams (MCAT, DAT, USMLE Step 1), with a branching competition track (USABO, IBO, Brain Bee). AIIMS-trained faculty, live online in US time zones.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'US high school + college + pre-medical',
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
    name: 'Stages of the US biology pathway',
    itemListElement: STAGES.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.stage,
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
      { '@type': 'ListItem', position: 3, name: 'US Biology Pathway', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'US Biology Course Progression',
          'Honors Biology Tutor',
          'AP Biology Tutor',
          'College Biology Tutor',
          'Pre-Med Biology Tutor',
          'MCAT Biology Tutor',
          'DAT Biology Tutor',
          'USMLE Step 1 Biology Tutor',
        ]}
        jobTitle="US Biology Pathway Faculty — Honors / AP / College / Pre-Med"
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
            <li className="text-slate-700">US Biology Pathway</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            🇺🇸 The full US biology ladder
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            The US biology pathway &mdash;{' '}
            <span className="text-blue-700">honors → AP → college → pre-med.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            What order should you take biology courses, and how does each stage connect? This hub
            maps the whole journey: honors / high-school biology and the EOC, AP Biology, college
            intro biology (Biology 101 and Anatomy &amp; Physiology), and the pre-med admissions
            exams (MCAT, DAT, USMLE Step 1) &mdash; with the competition track (USABO, IBO, Brain
            Bee) branching off along the way. Faculty are trained at AIIMS New Delhi &mdash; among
            the most selective medical schools in the world, peer to Harvard Medical School and
            Oxford. Live online in your US time zone.
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

        {/* The ladder */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The pathway, stage by stage
            </h2>
            <div className="mt-8 space-y-5">
              {STAGES.map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200 sm:flex-row"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <s.icon className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-900">{s.stage}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-50"
                        >
                          {l.label} <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Competition branch */}
        <section>
          <div className="mx-auto max-w-5xl px-4 py-14">
            <div className="rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-7">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                  The competition track — branching off the ladder
                </h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
                Alongside the coursework ladder, ambitious students take on the US biology
                competitions. The USA Biology Olympiad (USABO) and IBO Team USA, plus the Brain Bee
                neuroscience competition, add depth far beyond standard high-school biology and
                strengthen college applications. They build on the same AP and honors foundation, so
                they fit naturally between stages 1 and 2 of the pathway.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/us-biology-competitions-hub"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Award className="h-4 w-4" /> US biology competitions hub
                </Link>
                <Link
                  href="/usabo-coaching"
                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                >
                  USABO coaching <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/brain-bee-coaching"
                  className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
                >
                  Brain Bee coaching <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Why follow the pathway with one specialist
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

        {/* Enquiry form */}
        <section id="enquiry">
          <div className="mx-auto max-w-xl px-4 py-14">
            <GlobalEnquiryForm
              source="us-pathway-hub"
              title="Book a free trial — wherever you are on the pathway"
              subtitle="Honors, AP, college biology, or pre-med exam prep. Tell us your stage, grade or year and state — we reply within a day in your time zone."
            />
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              The US biology pathway &mdash; common questions
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
              One ladder, one specialist faculty
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Honors · AP · college biology · MCAT / DAT / USMLE — coached end to end in your US
              time zone, a free trial first.
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
                href="/us-biology-competitions-hub"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                <Trophy className="h-5 w-5" />
                Explore the competition track
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
