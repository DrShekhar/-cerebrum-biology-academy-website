/**
 * /college-biology-tutor
 *
 * College / intro biology hub — the funnel rung between high-school Honors
 * (/honors-biology-tutor) and the pre-med exams (MCAT/DAT/USMLE). Targets US
 * university freshmen/sophomores in General Biology / Bio 101-102 / Intro to
 * Cell & Molecular Biology, and pre-meds protecting the GPA that medical-school
 * admission turns on. Distinct level and audience from the Honors page (high
 * school) and from the MCAT page (admission exam) — not a duplicate.
 *
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
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
  Microscope,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/college-biology-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'College Biology Tutor (Online) — Bio 101 & Intro Biology | Cerebrum',
  description:
    'Specialist tutoring for college General/Intro Biology — Bio 101-102, cell & molecular biology, genetics, physiology. Protect the GPA pre-med admission turns on, master the weed-out course, and build straight toward the MCAT. AIIMS-trained faculty, small live online classes in your time zone, free trial.',
  keywords: [
    'college biology tutor',
    'general biology tutor',
    'intro biology tutor',
    'bio 101 tutor',
    'biology 101 help',
    'college biology tutor online',
    'pre med biology tutor',
    'cell and molecular biology tutor',
    'university biology tutor',
    'molecular biology tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'College Biology Tutor (Online) — Bio 101 & Intro Biology · Cerebrum Biology Academy',
    description:
      'Specialist tutoring for college General/Intro Biology — protect your pre-med GPA, beat the weed-out course, build toward the MCAT. AIIMS-trained faculty, your time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'College Biology Tutor (Online) — Bio 101 & Intro Biology',
    description:
      'Specialist tutoring for college General/Intro Biology and pre-med prerequisites. AIIMS-trained faculty, small live classes in your time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Cell biology, membranes, transport and the cell cycle',
  'Molecular biology — DNA, replication, transcription, translation, gene regulation',
  'Metabolism and biochemistry — enzymes, respiration, photosynthesis',
  'Mendelian & molecular genetics and problem-solving',
  'Human/animal physiology and the organ systems',
  'Evolution, ecology and the diversity of life',
  'Problem sets, exam strategy and writing lab reports',
]

const WHY = [
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a generalist TA',
    text: 'One subject, taught in depth by AIIMS-trained faculty — among the most selective medical training in the world. The conceptual clarity a 300-person lecture hall cannot give you.',
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'Built for the pre-med track',
    text: 'Intro biology is a pre-med prerequisite and a GPA that medical-school admissions scrutinise. We teach for the deep understanding the MCAT and med school will later assume — not just for the next midterm.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your time zone, around your schedule',
    text: 'Live online classes in your time zone (ET/CT/MT/PT, or anywhere), fitted around lectures and labs, every session recorded. 1:1 and small-batch options.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Beat the weed-out course',
    text: 'General Biology is often the course designed to thin the pre-med herd. We turn it into the course that proves you belong — with a clear week-by-week plan synced to your syllabus.',
  },
]

const NEXT_STEPS = [
  {
    icon: Stethoscope,
    name: 'MCAT Biology & Biochemistry',
    detail:
      'The natural next step for pre-meds — B/B section specialist coaching toward your test date.',
    href: '/mcat-biology',
  },
  {
    icon: BookOpen,
    name: 'DAT / OAT Biology',
    detail: 'Dental and optometry admissions — the biological-sciences survey, same depth.',
    href: '/dat-biology-preparation',
  },
  {
    icon: Award,
    name: 'USMLE Step 1 foundations',
    detail: 'Physiology, biochemistry and micro/immuno foundations for medical students.',
    href: '/usmle-step-1-biology-preparation',
  },
  {
    icon: GraduationCap,
    name: 'Still in high school?',
    detail: 'Honors / high-school biology and AP Biology — build the base before college.',
    href: '/honors-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this for?',
    answer:
      'College students taking General/Introductory Biology — typically first- and second-year courses such as Bio 101-102, Introduction to Cell & Molecular Biology, or Organismal Biology — at any university, in any country. It is especially built for pre-med students who need both the grade and the lasting understanding.',
  },
  {
    question: 'How is this different from your MCAT or high-school biology tutoring?',
    answer:
      'Three different rungs. Honors / high-school biology builds the foundation before college. College / intro biology (this page) is your university coursework and pre-med prerequisite — the GPA stage. MCAT Biology then prepares the admission exam itself. We coach all three and connect them, so the understanding compounds instead of restarting each time.',
  },
  {
    question: 'Can you teach to my specific course and textbook?',
    answer:
      'Yes. We work to your syllabus, lectures, problem sets and exams (Campbell Biology, Molecular Biology of the Cell, or whatever your course uses), and to your professor’s emphasis — while building the conceptual depth that pays off later in the MCAT and medical school.',
  },
  {
    question: 'Why does the pre-med GPA matter so much here?',
    answer:
      'Medical-school admission weighs your science (BCPM) GPA heavily, and introductory biology is a large, early part of it. A strong, genuinely understood foundation protects the GPA now and makes the MCAT far easier later — which is exactly why we teach for understanding, not cramming.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS New Delhi is India’s apex medical institution — internationally ranked among the most selective medical schools in the world, comparable to Harvard Medical School and Oxford. AIIMS-trained faculty bring clinical and physiological depth that makes intro biology click and connects directly to the pre-med path.',
  },
  {
    question: 'How do classes and time zones work?',
    answer:
      'Live online, scheduled around your lectures and labs in your own time zone (ET/CT/MT/PT, GMT/BST, IST or anywhere), with every session recorded. 1:1 and small-batch options.',
  },
  {
    question: 'How do I pass college intro biology / Bio 101?',
    answer:
      'Passing — and beating — Bio 101 is about converting a fast 300-person lecture into genuine understanding, then keeping pace with the syllabus. Our method: a biology specialist re-teaches each topic clearly (cells, molecular biology, metabolism, genetics, physiology), we sync a week-by-week plan to your course and textbook, drill your professor’s problem-set and exam style, and review every midterm against an error log. The goal is not just a pass but the deep understanding the MCAT later assumes. Live online in your time zone, free trial first.',
  },
  {
    question: 'Can you tutor Anatomy & Physiology and Genetics too?',
    answer:
      'Yes. Beyond General/Intro Biology we coach Anatomy & Physiology (A&P), Genetics, Cell & Molecular Biology and Biochemistry — the core pre-med biology sequence — to your specific course and textbook. The same AIIMS-trained faculty teach all of them, so the understanding compounds across courses instead of restarting each term.',
  },
  {
    question: 'Why is my pre-med GPA dropping in intro bio, and how do you fix it?',
    answer:
      'Introductory biology is often deliberately built as a weed-out course — large classes, fast pacing, and exams that punish surface memorisation — so even strong students can see their science (BCPM) GPA slip. We fix it by closing the conceptual gaps a lecture hall can’t, syncing a clear plan to your syllabus, drilling your exact exam and problem-set style, and teaching for the lasting understanding that protects the GPA now and makes the MCAT far easier later. Live online in your time zone, free trial first.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your course, university and country, and we match you to the right tutor and time-zone slot — for students of any nationality.',
  },
]

export default function CollegeBiologyTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'College & Intro Biology Tutoring (Online, Worldwide)',
    description:
      'Specialist tutoring for college General/Introductory Biology — Bio 101-102, cell & molecular biology, genetics, metabolism and physiology — for university students and pre-meds of any nationality. Protects the pre-med GPA and builds toward the MCAT. AIIMS-trained faculty, live online.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'Undergraduate (introductory / general biology, pre-med prerequisite)',
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
      { '@type': 'ListItem', position: 3, name: 'College Biology Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'College Biology Tutor',
          'General / Introductory Biology',
          'Cell and Molecular Biology',
          'Pre-Med Biology',
          'Online Biology Tutor',
        ]}
        jobTitle="Biology Specialist Faculty — College, MCAT, Pre-Med"
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
            <li className="text-slate-700">College Biology Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <FlaskConical className="h-3.5 w-3.5" />
            College & intro biology · pre-med · any country
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            College Biology tutor &mdash;{' '}
            <span className="text-blue-700">protect the GPA your future depends on.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist tutoring for college General and Introductory Biology &mdash; Bio 101-102,
            cell &amp; molecular biology, genetics, metabolism and physiology. We turn the pre-med
            weed-out course into a strength: a strong, genuinely understood biology grade now, and a
            head start on the MCAT later. Faculty trained at AIIMS New Delhi (among the most
            selective medical schools in the world). Live online in your time zone.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/mcat-biology"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Heading to the MCAT?
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we cover</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The full introductory-biology sequence most universities run across the first two
              years &mdash; taught to your syllabus and textbook.
            </p>
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
            Why a biology specialist for college biology
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
              Where college biology leads
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Intro biology is the foundation for every health-professions path. As you progress, we
              coach these too &mdash; the same faculty, the same connected understanding.
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

        {/* Tutoring by course */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Tutoring by course</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Taking a specific course? We coach each one to your syllabus and exams.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { name: 'Biology 101 / Intro Biology', href: '/biology-101-tutor' },
                { name: 'Anatomy & Physiology (A&P I/II)', href: '/anatomy-and-physiology-tutor' },
                { name: 'Genetics', href: '/genetics-tutor' },
                { name: 'Microbiology', href: '/microbiology-tutor' },
                { name: 'Cell & Molecular Biology', href: '/cell-and-molecular-biology-tutor' },
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
            source="college-biology-tutor"
            title="Book a free college biology trial"
            subtitle="Any student, any nationality, any country. Tell us your course, university and country — we reply within a day in your time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              College biology tutoring &mdash; questions
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
              Strong in college biology &mdash; ready for the MCAT and med school
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist foundation that protects your pre-med GPA and makes the MCAT far easier
              &mdash; for students anywhere. Free trial first.
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
