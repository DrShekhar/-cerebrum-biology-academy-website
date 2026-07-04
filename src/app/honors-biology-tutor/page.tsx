/**
 * /honors-biology-tutor
 *
 * Universal high-school / Honors Biology hub — the missing top-of-funnel.
 * Every AP / USABO / Brain Bee student takes Honors (or high-school) biology
 * first; "honors biology tutor" + "high school biology tutor" are high-volume
 * searches with zero prior coverage. Universal framing (any nationality, any
 * country), live online in the student's time zone. Feeds the AP / USABO /
 * Brain Bee / IB funnels.
 *
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
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
const CANONICAL = '/honors-biology-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Honors Biology Tutor (Online, Any Country) — High School Biology | Cerebrum',
  description:
    'Specialist Honors & high-school Biology tutoring for any student, anywhere — build a genuinely strong foundation (cells, genetics, physiology, ecology) and set up for AP Biology, USABO, the Brain Bee or IB. AIIMS-trained faculty, small live online classes in your time zone, free trial.',
  keywords: [
    'honors biology tutor',
    'honors biology tutor online',
    'high school biology tutor',
    'high school biology tutor online',
    'biology tutor for high school',
    'online biology tutor',
    'biology tutor near me',
    '9th grade biology tutor',
    '10th grade biology tutor',
    'pre-AP biology tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Honors Biology Tutor (Online, Any Country) · Cerebrum Biology Academy',
    description:
      'Specialist Honors & high-school Biology tutoring for any student — strong foundations + a path to AP, USABO, Brain Bee and IB. AIIMS-trained faculty, your time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Honors Biology Tutor (Online, Any Country)',
    description:
      'Specialist Honors / high-school Biology tutoring for any student, anywhere. AIIMS-trained faculty, small live classes in your time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Cell biology, biochemistry and the chemistry of life',
  'Genetics, DNA, inheritance and molecular biology',
  'Human physiology and the body systems',
  'Ecology, evolution and biodiversity',
  'Lab skills, data analysis and experimental design',
  'Exam and free-response technique for your school’s assessments',
]

const WHY = [
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a multi-subject tutor',
    text: 'One subject, taught in depth by AIIMS-trained faculty — among the most selective medical training in the world. Concepts taught for understanding, not memorisation.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Builds the foundation AP/USABO assume',
    text: 'A strong Honors year is what makes AP Biology, the USA Biology Olympiad, the Brain Bee and IB achievable. We build that base deliberately.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your time zone, small live batches',
    text: 'Live online classes scheduled around your school day, in your time zone, with recordings. 1:1 and micro-batch options — open to any nationality, any country.',
  },
  {
    icon: <Award className="h-5 w-5 text-blue-600" />,
    title: 'Grades now + a clear next step',
    text: 'We lift your current Honors/high-school grade and map the path to the next level when you’re ready.',
  },
]

const NEXT_STEPS = [
  {
    icon: BookOpen,
    name: 'AP Biology',
    detail: 'The natural next step after Honors — score-5 coaching, all 8 College Board units.',
    href: '/ap-biology-tutor-global',
  },
  {
    icon: Trophy,
    name: 'USABO / Biology Olympiad',
    detail: 'For students who want to compete — olympiad-depth beyond any school syllabus.',
    href: '/usabo-coaching',
  },
  {
    icon: Brain,
    name: 'Brain Bee (Neuroscience)',
    detail: 'A neuroscience competition for ages 13–19 — a great enrichment track from Honors.',
    href: '/brain-bee-coaching',
  },
  {
    icon: GraduationCap,
    name: 'IB Biology (HL/SL)',
    detail: 'For students in the IB Diploma — full syllabus, IA & EE mentorship.',
    href: '/ib-biology-tutor-global',
  },
  {
    icon: GraduationCap,
    name: 'College / Intro Biology',
    detail:
      'Heading to university? Bio 101 & general biology for pre-meds — builds toward the MCAT.',
    href: '/college-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this for?',
    answer:
      'Any student taking Honors Biology or high-school biology — typically grades 9–11 (or the international equivalent), at any school, in any country. No nationality or curriculum assumed; classes are live online in your time zone.',
  },
  {
    question: 'How is Honors Biology different from AP Biology?',
    answer:
      'Honors (or high-school) biology builds the core foundation — cells, genetics, physiology, ecology. AP Biology then goes deeper, with College Board exam pressure. A strong Honors year is the single best predictor of an AP-5; we teach Honors so AP becomes straightforward.',
  },
  {
    question: 'Can you help with my exact school’s tests, not just a generic syllabus?',
    answer:
      'Yes. We coach to your school’s topics and assessment style — quizzes, tests, labs and finals — while building the conceptual depth that pays off in AP/USABO/IB later.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. AIIMS-trained faculty bring depth that strengthens even foundational high-school biology.',
  },
  {
    question: 'How do classes and time zones work?',
    answer:
      'Live online, scheduled around your school day in your own time zone (ET/CT/MT/PT, GMT/BST, IST or anywhere), with every session recorded. 1:1 and small-batch options.',
  },
  {
    question: 'How do I get an A in Honors Biology?',
    answer:
      'An A in Honors Biology comes from understanding the core systems — cells, genetics, physiology, ecology — rather than memorising for each test, then applying that understanding to your school’s exact assessments. Our method: teach each topic for genuine understanding with an AIIMS-trained biology specialist, drill your school’s test and free-response style, practise data analysis and experimental-design questions, and revise against an error log. Live online in your time zone, free trial first.',
  },
  {
    question: 'Honors Biology vs AP Biology — which is harder?',
    answer:
      'AP Biology is harder: it goes deeper than Honors and adds College Board exam pressure with rubric-graded free-response questions, where Honors (or high-school) biology builds the underlying foundation. The two are a sequence, not rivals — a strong Honors year is the single best predictor of an AP-5, which is exactly why we teach Honors so that AP later becomes straightforward.',
  },
  {
    question: 'How much does an online Honors Biology tutor cost?',
    answer:
      'Honors / high-school biology is priced per programme depending on whether you choose 1:1 or a small live batch and how many sessions you need. Contact us for a quote and start with a free trial — tell us your grade, school and country and we’ll match you to the right tutor, time-zone slot and a clear price.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your grade, school and country, and we match you to the right tutor and time-zone slot — for students of any nationality.',
  },
]

export default function HonorsBiologyTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Honors & High School Biology Tutoring (Online, Worldwide)',
    description:
      'Specialist Honors and high-school biology tutoring for students of any nationality — strong foundations in cells, genetics, physiology and ecology, with a clear path to AP Biology, USABO, the Brain Bee and IB. AIIMS-trained faculty, live online.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'High school (Honors / pre-AP)',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
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
      { '@type': 'ListItem', position: 3, name: 'Honors Biology Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Honors Biology Tutor',
          'High School Biology Tutor',
          'Pre-AP Biology',
          'Online Biology Tutor',
        ]}
        jobTitle="Biology Specialist Faculty — Honors, AP, IB, Olympiad"
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
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-blue-700">
                <Home className="h-3.5 w-3.5" /> Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" />
            <li className="text-slate-700">Honors Biology Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <GraduationCap className="h-3.5 w-3.5" />
            Honors & high-school biology · any country
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Honors Biology tutor &mdash;{' '}
            <span className="text-blue-700">strong foundations, taught by specialists.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist Honors and high-school Biology tutoring for any student, anywhere. We build a
            genuinely strong base — cells, genetics, physiology, ecology — that lifts your grade now
            and sets you up for AP Biology, the USA Biology Olympiad, the Brain Bee or IB. Faculty
            trained at AIIMS New Delhi (among the most selective medical schools in the world). Live
            online in your time zone.
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/ap-biology-tutor-global"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Heading to AP Biology?
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we cover</h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {COVERS.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-slate-700 ring-1 ring-slate-200"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why us */}
        <section className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why a biology specialist for Honors biology
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
        </section>

        {/* Next steps */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Where Honors biology can take you
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              A strong Honors year opens every advanced biology path. When you’re ready, we coach
              these too.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {NEXT_STEPS.map((e) => (
                <Link
                  key={e.name}
                  href={e.href}
                  className="block rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-lg hover:ring-blue-400"
                >
                  <e.icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-3 text-base font-bold text-slate-900">{e.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{e.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Also for high-school students */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Also for high-school biology students
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                {
                  name: 'Biology EOC / state exam prep (FL, TX, GA…)',
                  href: '/biology-eoc-exam-prep',
                },
                { name: 'NGSS biology help', href: '/ngss-biology-help' },
                { name: 'College / intro biology', href: '/college-biology-tutor' },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="honors-biology-tutor"
            title="Book a free Honors Biology trial"
            subtitle="Any student, any nationality, any country. Tell us your grade, school and country — we reply within a day in your time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Honors Biology tutoring &mdash; questions
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
              Strong in Honors biology — ready for anything next
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist foundation that lifts your grade and opens AP, USABO, Brain Bee and IB —
              for students anywhere. Free trial first.
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
                href="/best-biology-tutor-global"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                See all biology programmes
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
