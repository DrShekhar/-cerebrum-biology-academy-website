/**
 * /genetics-tutor
 *
 * College Genetics — the problem-heavy upper-intro course (Mendelian + molecular
 * genetics, pedigrees, linkage/mapping, population genetics). Distinct from the
 * other pages by its emphasis on problem-solving: genetics grades are decided by
 * worked problems, not recall, so this page leans into method and practice.
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
  Dna,
  GitBranch,
  Home,
  Sigma,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/genetics-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Genetics Tutor (Online) — College Genetics Problem Help | Cerebrum',
  description:
    'Specialist college Genetics tutor. Master the problem-solving that decides your grade — Mendelian crosses, pedigrees, linkage and gene mapping, chi-square, and population (Hardy-Weinberg) genetics — plus molecular genetics. Taught to your syllabus and textbook. AIIMS-trained faculty, small live online classes in your US time zone (ET/CT/MT/PT), free trial.',
  keywords: [
    'genetics tutor',
    'college genetics tutor',
    'genetics tutor online',
    'genetics problem help',
    'mendelian genetics tutor',
    'population genetics tutor',
    'hardy weinberg help',
    'gene mapping linkage tutor',
    'molecular genetics tutor',
    'pedigree analysis help',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Genetics Tutor (Online) — College Genetics Problem Help · Cerebrum Biology Academy',
    description:
      'Specialist college Genetics tutoring — Mendelian crosses, pedigrees, linkage/mapping, Hardy-Weinberg and molecular genetics, with a problem-solving method that lifts grades. AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Genetics Tutor (Online) — College Genetics Problem Help',
    description:
      'Specialist college Genetics tutoring with a problem-solving method — crosses, pedigrees, mapping, Hardy-Weinberg. AIIMS-trained faculty, your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Mendelian genetics — mono-, di- and trihybrid crosses, and probability shortcuts that beat big Punnett squares',
  'Extensions of Mendel — incomplete/co-dominance, multiple alleles, epistasis, pleiotropy, lethal alleles',
  'Pedigree analysis — autosomal vs X-linked, dominant vs recessive, and carrier probability',
  'Sex linkage, sex determination and non-Mendelian inheritance (mitochondrial, imprinting)',
  'Linkage, recombination and gene mapping — three-point crosses and map units',
  'The chi-square test — when to use it, degrees of freedom, and reading the table',
  'Molecular genetics — DNA replication, transcription, translation, mutation and gene regulation',
  'Population genetics — Hardy-Weinberg equilibrium, allele frequencies, selection and drift',
]

const WHY = [
  {
    icon: <Sigma className="h-5 w-5 text-blue-600" />,
    title: 'Genetics is won on problems, not flashcards',
    text: 'Your genetics grade is decided by worked problems under time pressure. We teach a repeatable method for each problem type — set up, reason, solve — and drill it until crosses, pedigrees and mapping become automatic.',
  },
  {
    icon: <GitBranch className="h-5 w-5 text-blue-600" />,
    title: 'The two halves connected',
    text: 'Most courses split into transmission (classical) genetics and molecular genetics, and students treat them as unrelated. We show how the DNA-level mechanism explains the cross-level pattern, so both halves reinforce each other.',
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a generalist TA',
    text: 'One subject, taught in depth by faculty trained at AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. The conceptual clarity behind every formula, not just the formula.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, around your schedule',
    text: 'Live online in ET, CT, MT or PT, scheduled around lectures and problem-set deadlines, every session recorded for review before exams. One-on-one and small-batch options.',
  },
]

const NEXT_STEPS = [
  {
    icon: BookOpen,
    name: 'Biology 101',
    detail:
      'The first-year general-biology base genetics builds on — cells, DNA and basic inheritance.',
    href: '/biology-101-tutor',
  },
  {
    icon: Dna,
    name: 'Cell & Molecular Biology',
    detail: 'Go deeper into the molecular machinery behind gene expression and regulation.',
    href: '/cell-and-molecular-biology-tutor',
  },
  {
    icon: Stethoscope,
    name: 'MCAT Biology & Biochemistry',
    detail: 'For pre-meds — genetics shows up across the B/B section; carry the method forward.',
    href: '/mcat-biology',
  },
  {
    icon: Award,
    name: 'College biology hub',
    detail: 'The full intro-to-upper biology track and the pre-med funnel, in one place.',
    href: '/college-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this Genetics tutoring for?',
    answer:
      'College students taking a dedicated Genetics course — typically a second- or third-year requirement for biology, biochemistry, biotech and pre-health majors (often numbered BIOL 3xx or similar). It is built for the student who understands the lectures but loses points on the genetics problem sets and exams, where most of the grade actually lives.',
  },
  {
    question: 'Genetics is so problem-heavy — how do you actually raise my grade?',
    answer:
      'By teaching method, not just content. For each problem type — dihybrid crosses, epistasis ratios, pedigrees, three-point mapping, chi-square, Hardy-Weinberg — we give you a fixed way to set the problem up, decide which rule applies, and check the answer. Then we drill past problem sets and old exams in your professor’s style until the setup is automatic. Pattern recognition under time pressure is what separates an A from a C in genetics.',
  },
  {
    question: 'Do you cover both classical and molecular genetics?',
    answer:
      'Yes. We cover transmission/classical genetics (Mendelian crosses, extensions, linkage, mapping, population genetics) and molecular genetics (replication, transcription, translation, mutation, gene regulation, and the techniques behind modern genetics). Crucially, we link them, so the molecular mechanism explains the inheritance pattern instead of the two feeling like separate courses.',
  },
  {
    question: 'How do you tutor my exact course and textbook?',
    answer:
      'Send us your syllabus, problem sets, past exams and textbook edition (Klug, Pierce, Hartwell, Brooker, and so on). We rebuild tutoring around your topic order, your professor’s preferred notation and problem style, and your real exam format — so practice transfers directly to your tests.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. Faculty trained there bring the molecular and clinical depth that makes inheritance patterns, mutation and gene regulation make sense at a mechanistic level, not just as rules to memorise.',
  },
  {
    question: 'How much does Genetics tutoring cost?',
    answer:
      'Pricing is quoted to your course, session frequency and time zone — transparently, with no obligation. Tell us where you are in the course and how often you want to meet in the free trial and we will quote exact options.',
  },
  {
    question: 'How do classes and time zones work?',
    answer:
      'Live online, scheduled around your lectures and problem-set deadlines in your own US time zone (ET/CT/MT/PT, or anywhere in the world), with every session recorded for review. One-on-one and small-batch options.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your course, university and country, and we match you to the right tutor and a time-zone slot — students of any nationality welcome.',
  },
]

export default function GeneticsTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'College Genetics Tutoring (Online, Worldwide)',
    description:
      'Specialist tutoring for college Genetics — Mendelian and molecular genetics, pedigree analysis, linkage and gene mapping, chi-square, and population (Hardy-Weinberg) genetics — with a problem-solving method that lifts grades. Taught to your syllabus and textbook by AIIMS-trained faculty, live online in US time zones.',
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
      { '@type': 'ListItem', position: 3, name: 'Genetics Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Genetics Tutor',
          'Mendelian Genetics',
          'Molecular Genetics',
          'Population Genetics',
          'Gene Mapping and Linkage',
        ]}
        jobTitle="Biology Specialist Faculty — Genetics, College, Pre-Med"
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
            <li className="text-slate-700">Genetics Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Dna className="h-3.5 w-3.5" />
            College genetics · problem-solving · US time zones
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Genetics tutor &mdash;{' '}
            <span className="text-blue-700">win the course on the problems that decide it.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist tutoring for college Genetics &mdash; the most problem-heavy course in the
            biology major. We teach a repeatable method for every problem type: Mendelian and
            extended crosses, pedigrees, linkage and gene mapping, chi-square, and Hardy-Weinberg
            population genetics, alongside the molecular genetics that explains them. Taught to your
            syllabus by faculty trained at AIIMS &mdash; India&rsquo;s apex medical institute, peer
            to Harvard Medical School in selectivity. Live online in your US time zone, from around
          </p>
          <div className="mt-7 flex flex-col gap-3 md:flex-row">
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
              The full genetics arc &mdash; classical through molecular through population &mdash;
              with the problem types each section is tested on, taught to your syllabus and
              textbook.
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
            Why a specialist for Genetics
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
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Where Genetics leads</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Genetics sits at the heart of the biology major and the pre-med path. We coach the
              courses around it too &mdash; the same faculty, the same connected understanding.
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
            source="genetics-tutor"
            title="Book a free Genetics trial"
            subtitle="Any student, any nationality. Tell us your course, university and country, and where in genetics you're stuck — we reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Genetics tutoring &mdash; questions
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
              Turn genetics problem sets into your strongest grade
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist, method-first approach to the most problem-heavy course in the major
              &mdash; for students anywhere. Free trial first.
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
