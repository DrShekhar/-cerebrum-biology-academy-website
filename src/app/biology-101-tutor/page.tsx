/**
 * /biology-101-tutor
 *
 * The specific "Bio 101 / Bio 102" course page for US college freshmen taking
 * the first-year general-biology sequence. Distinct from the /college-biology-tutor
 * hub (which spans the whole intro sequence and the pre-med funnel): this page is
 * the named-course lander US students actually search for ("bio 101 help",
 * "biology 101 tutor"), focused tightly on the freshman two-semester sequence and
 * its first-college-exam panic. ADDITIVE: new route; no existing page touched.
 * No fabricated stats.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Atom,
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
const CANONICAL = '/biology-101-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Biology 101 Tutor (Online) — Bio 101 & 102 Help | Cerebrum',
  description:
    'One-on-one Bio 101 / Bio 102 tutoring for college freshmen. Survive the first-year general-biology sequence — cells, energy, DNA, genetics, evolution — taught to your exact syllabus and textbook. AIIMS-trained faculty, small live online classes in your US time zone (ET/CT/MT/PT), free trial.',
  keywords: [
    'biology 101 tutor',
    'bio 101 tutor',
    'biology 101 help',
    'bio 102 tutor',
    'general biology 101 tutor online',
    'intro biology tutor freshman',
    'how to pass biology 101',
    'college freshman biology tutor',
    'biology 1 and 2 tutor',
    'bio 101 study help',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Biology 101 Tutor (Online) — Bio 101 & 102 Help · Cerebrum Biology Academy',
    description:
      'One-on-one Bio 101 / Bio 102 tutoring for college freshmen — taught to your exact syllabus. AIIMS-trained faculty, small live classes in your US time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Biology 101 Tutor (Online) — Bio 101 & 102 Help',
    description:
      'One-on-one Bio 101 / Bio 102 tutoring for college freshmen, taught to your exact syllabus. AIIMS-trained faculty, your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Chemistry of life — water, pH, carbon, the four macromolecule families',
  'Cell structure, the membrane, and diffusion / osmosis / active transport',
  'Cellular energy — enzymes, cellular respiration and photosynthesis (the classic Bio 101 exam wall)',
  'The cell cycle, mitosis and meiosis — and why students confuse the two',
  'DNA structure, replication, transcription and translation (central dogma)',
  'Mendelian genetics, Punnett squares and basic inheritance problems',
  'Evolution, natural selection and an intro to ecology (the back half of Bio 102)',
  'Reading the textbook efficiently, building study sheets, and timing your first college exam',
]

const WHY = [
  {
    icon: <Microscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a generalist TA',
    text: 'Bio 101 is one subject taught in depth by AIIMS-trained faculty — AIIMS being India’s apex medical institute, peer to Harvard Medical School in selectivity. The clarity a 300-seat lecture hall and a rushed office hour cannot give you.',
  },
  {
    icon: <Atom className="h-5 w-5 text-blue-600" />,
    title: 'The freshman gap, closed early',
    text: 'High-school biology rarely prepares you for the pace and depth of Bio 101. We close the gap in the first weeks — before respiration, genetics and the first midterm bury you.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, around dorm life',
    text: 'Live online classes in ET, CT, MT or PT, scheduled around lectures, labs and everything else freshman year throws at you. Every session recorded for review before exams.',
  },
  {
    icon: <Target className="h-5 w-5 text-blue-600" />,
    title: 'Synced to your actual course',
    text: 'We teach to your syllabus, your professor’s emphasis, your lecture slides and your textbook (Campbell, OpenStax, Freeman, or whatever you were assigned) — not a generic outline.',
  },
]

const NEXT_STEPS = [
  {
    icon: BookOpen,
    name: 'College biology hub',
    detail:
      'The full intro-biology funnel across both years and the pre-med track — the parent course page.',
    href: '/college-biology-tutor',
  },
  {
    icon: Stethoscope,
    name: 'Anatomy & Physiology',
    detail:
      'The next prerequisite for nursing and allied-health majors after intro bio — A&P I & II.',
    href: '/anatomy-and-physiology-tutor',
  },
  {
    icon: GraduationCap,
    name: 'MCAT Biology & Biochemistry',
    detail: 'For pre-meds — the depth Bio 101 sets up, carried forward to the admission exam.',
    href: '/mcat-biology',
  },
  {
    icon: Award,
    name: 'Still in high school?',
    detail: 'Honors and AP Biology — build the foundation before you ever hit Bio 101.',
    href: '/honors-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is Biology 101 tutoring for?',
    answer:
      'College freshmen (and some sophomores) taking the introductory general-biology sequence — commonly numbered Bio 101 / Bio 102, BIOL 1010-1020, BSC 1010, or simply "General Biology I & II." It is built for the student facing their first fast, high-stakes college science course, whether you are pre-med, a biology major, or fulfilling a science requirement.',
  },
  {
    question: 'How is this different from your college biology hub page?',
    answer:
      'The college biology hub covers the whole intro sequence and the pre-med funnel across both years. This page is tightly focused on the first-year Bio 101 / 102 course itself — the specific class you are sitting in right now — and on getting you through it. If you want the bigger picture of where intro bio leads, start at the hub; if you need to pass Bio 101 this semester, start here.',
  },
  {
    question: 'How do you tutor my exact course and textbook?',
    answer:
      'Send us your syllabus, your professor’s lecture slides, your textbook edition (Campbell, OpenStax Biology, Freeman’s Biological Science, and so on) and your past quizzes. We rebuild the tutoring around that exact material — your topic order, your professor’s emphasis, and the question style on your real exams — instead of a generic Bio 101 outline.',
  },
  {
    question: 'Why do so many students struggle with Bio 101 specifically?',
    answer:
      'Bio 101 is often a student’s first encounter with college pacing: a topic a lecture, exams that reward understanding over memorisation, and far less hand-holding than high school. Cellular respiration, photosynthesis and the meiosis/genetics block in particular tend to be where grades slip. We re-teach those clearly, sync to your syllabus, and drill your professor’s exam style so the course becomes manageable.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. Faculty trained there bring physiological and molecular depth that makes first-year biology genuinely click, and connects it to the pre-med path many Bio 101 students are starting on.',
  },
  {
    question: 'How much does Bio 101 tutoring cost?',
    answer:
      'Pricing is quoted to your course, session frequency and time zone — transparently, with no obligation. Tell us your course and how often you want to meet in the free trial and we will quote exact options — no obligation.',
  },
  {
    question: 'How do classes and time zones work?',
    answer:
      'Live online, scheduled around your lectures and labs in your own US time zone (ET/CT/MT/PT, or anywhere in the world), with every session recorded so you can re-watch before exams. One-on-one and small-batch options.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your course number, university and country, and we match you to the right tutor and a time-zone slot — students of any nationality welcome.',
  },
]

export default function Biology101TutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Biology 101 & 102 Tutoring (Online, Worldwide)',
    description:
      'One-on-one and small-group tutoring for the first-year college general-biology sequence (Bio 101 / Bio 102): cells, energy, DNA, genetics and evolution, taught to your exact syllabus and textbook. AIIMS-trained faculty, live online in US time zones.',
    url: PAGE_URL,
    inLanguage: 'en',
    educationalLevel: 'Undergraduate',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['United States', 'Worldwide'],
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'details p'] },
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
      { '@type': 'ListItem', position: 3, name: 'Biology 101 Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Biology 101 Tutor',
          'Bio 101 and 102',
          'General Biology',
          'College Freshman Biology',
          'Online Biology Tutor',
        ]}
        jobTitle="Biology Specialist Faculty — Bio 101, College, Pre-Med"
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
            <li className="text-slate-700">Biology 101 Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <FlaskConical className="h-3.5 w-3.5" />
            Bio 101 &amp; 102 · college freshmen · US time zones
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Biology 101 tutor &mdash;{' '}
            <span className="text-blue-700">make your first college science course your best.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Focused tutoring for the first-year general-biology sequence &mdash; Bio 101 and Bio
            102. We re-teach the topics that trip freshmen up (cellular respiration, photosynthesis,
            meiosis and the genetics block), sync everything to your syllabus and textbook, and
            drill your professor&rsquo;s exact exam style. Faculty trained at AIIMS &mdash;
            India&rsquo;s apex medical institute, peer to Harvard Medical School in selectivity.
            Live online in your US time zone
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/college-biology-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              See the full college biology track
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              What we cover in Bio 101 &amp; 102
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The two-semester general-biology arc most US universities run in the freshman year
              &mdash; taught to your syllabus and textbook, in your topic order.
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
            Why a biology specialist for Bio 101
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
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Where Bio 101 leads</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Bio 101 is the gateway course for every biology and health-professions path. As you
              move on, we coach these too &mdash; the same faculty, the same connected
              understanding.
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

        {/* Enquiry */}
        <section id="enquiry" className="mx-auto max-w-xl px-4 py-14">
          <GlobalEnquiryForm
            source="biology-101-tutor"
            title="Book a free Bio 101 trial"
            subtitle="Any student, any nationality. Tell us your course number, university and country — we reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Biology 101 tutoring &mdash; questions
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
              Master Bio 101 now &mdash; and everything that builds on it
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist start to college biology that carries straight into A&amp;P, genetics and
              the MCAT &mdash; for students anywhere. Free trial first.
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
                href="/college-biology-tutor"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 text-base font-semibold hover:bg-white hover:text-slate-900"
              >
                Explore the college biology track
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
