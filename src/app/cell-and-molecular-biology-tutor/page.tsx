/**
 * /cell-and-molecular-biology-tutor
 *
 * Cell & Molecular Biology — the combined upper-intro / sophomore course that
 * goes deep on membranes/transport, signalling, the cell cycle, the central dogma,
 * gene regulation and the techniques (PCR, blotting, CRISPR) that define a modern
 * molecular-biology course. Distinct from Bio 101 (broad survey) by its depth and
 * its technique/mechanism focus; the gateway to upper-division biology and pre-med.
 * ADDITIVE: new route; no existing page touched. No fabricated stats.
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
  Dna,
  FlaskConical,
  Home,
  Microscope,
  Sparkles,
  Stethoscope,
} from 'lucide-react'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const CANONICAL = '/cell-and-molecular-biology-tutor'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

export const metadata: Metadata = {
  title: 'Cell & Molecular Biology Tutor (Online) | Cerebrum',
  description:
    'Specialist tutor for college Cell & Molecular Biology. Go deep on membranes and transport, cell signalling, the cell cycle, the central dogma, gene regulation, and the lab techniques (PCR, blotting, sequencing, CRISPR) modern courses test. Taught to your syllabus and textbook. AIIMS-trained faculty, small live online classes in your US time zone (ET/CT/MT/PT), free trial.',
  keywords: [
    'cell and molecular biology tutor',
    'molecular biology tutor',
    'cell biology tutor',
    'cell molecular biology help online',
    'central dogma tutor',
    'cell signaling tutor',
    'gene regulation tutor',
    'molecular biology techniques tutor',
    'pcr crispr biology tutor',
    'cell cycle tutor',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: { en: PAGE_URL, 'en-US': PAGE_URL, 'en-GB': PAGE_URL, 'x-default': PAGE_URL },
  },
  openGraph: {
    title: 'Cell & Molecular Biology Tutor (Online) · Cerebrum Biology Academy',
    description:
      'Specialist Cell & Molecular Biology tutoring — membranes, signalling, cell cycle, central dogma, gene regulation, and techniques (PCR, blotting, CRISPR). AIIMS-trained faculty, your US time zone.',
    url: PAGE_URL,
    locale: 'en',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Cell & Molecular Biology Tutor (Online)',
    description:
      'Specialist Cell & Molecular Biology tutoring — mechanism and technique focus. AIIMS-trained faculty, your US time zone.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const COVERS = [
  'Membrane structure and transport — diffusion, osmosis, channels, pumps, and electrochemical gradients',
  'Cell signalling — receptors, second messengers, kinase cascades and signal-transduction pathways',
  'The cytoskeleton, cell junctions, the extracellular matrix and intracellular trafficking',
  'The cell cycle, its checkpoints, regulation by cyclins/CDKs, and apoptosis',
  'The central dogma in depth — replication, transcription, RNA processing and translation, step by step',
  'Gene regulation — operons, transcription factors, epigenetics and post-transcriptional control',
  'Molecular techniques — PCR, gel electrophoresis, Southern/Northern/Western blotting, cloning and sequencing',
  'Genome editing and modern tools — CRISPR-Cas9, and how to reason through an experimental design question',
]

const WHY = [
  {
    icon: <Atom className="h-5 w-5 text-blue-600" />,
    title: 'Depth, not just a survey',
    text: 'Bio 101 surveys the cell; this course interrogates the mechanism. We teach signalling cascades and the central dogma at the level of cause and effect, so you can predict what a mutation or inhibitor does rather than recall a diagram.',
  },
  {
    icon: <FlaskConical className="h-5 w-5 text-blue-600" />,
    title: 'Techniques and experiment design',
    text: 'Modern cell/molecular exams test methods and data: PCR, blotting, cloning, sequencing and CRISPR, plus "what does this gel/experiment show?" questions. We train you to read and design experiments, where a lot of the grade lives.',
  },
  {
    icon: <Stethoscope className="h-5 w-5 text-blue-600" />,
    title: 'A biology specialist, not a generalist TA',
    text: 'One subject, taught in depth by faculty trained at AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. The mechanistic clarity that connects molecules to cell behaviour.',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-600" />,
    title: 'Your US time zone, around your schedule',
    text: 'Live online in ET, CT, MT or PT, scheduled around lectures and lab, every session recorded for review before exams. One-on-one and small-batch options.',
  },
]

const NEXT_STEPS = [
  {
    icon: Dna,
    name: 'Genetics',
    detail:
      'The natural partner course — the inheritance patterns whose molecular basis you learn here.',
    href: '/genetics-tutor',
  },
  {
    icon: Stethoscope,
    name: 'MCAT Biology & Biochemistry',
    detail:
      'For pre-meds — the molecular depth the B/B section assumes; carry the mechanism forward.',
    href: '/mcat-biology',
  },
  {
    icon: BookOpen,
    name: 'Biology 101',
    detail:
      'The first-year general-biology survey that introduces the cell before you go deep here.',
    href: '/biology-101-tutor',
  },
  {
    icon: Award,
    name: 'College biology hub',
    detail: 'The full college-biology track and the pre-med funnel, in one place.',
    href: '/college-biology-tutor',
  },
]

const FAQS = [
  {
    question: 'Who is this Cell & Molecular Biology tutoring for?',
    answer:
      'College students taking the combined Cell & Molecular Biology course — typically a sophomore- or junior-level requirement for biology, biochemistry, biotech, neuroscience and pre-health majors (often a "Cell Biology," "Molecular Biology" or "Introduction to Cell & Molecular Biology" course numbered in the 200s-300s). It suits the student ready to move from surveying the cell to understanding its mechanisms.',
  },
  {
    question: 'How is this different from Bio 101 or general biology?',
    answer:
      'Bio 101 surveys cells as one topic among many across the whole of biology. Cell & Molecular Biology spends an entire term going deep on the cell itself — membranes, signalling, the cycle, the central dogma, gene regulation and the techniques used to study them — at a mechanistic, predict-the-outcome level. If you want a broad first-year course, start with Bio 101; this page is for the dedicated upper-intro cell/molecular course.',
  },
  {
    question: 'Do you cover molecular techniques like PCR, blotting and CRISPR?',
    answer:
      'Yes, and in depth, because they are heavily tested. We cover PCR, gel electrophoresis, Southern/Northern/Western blotting, cloning, DNA sequencing and CRISPR-Cas9 — not just what each does, but how to interpret the data they produce and how to design an experiment to answer a question. Experiment-and-data questions are where many students lose marks, so we drill them directly.',
  },
  {
    question: 'How do you tutor my exact course and textbook?',
    answer:
      'Send us your syllabus, problem sets, past exams and textbook edition (Molecular Biology of the Cell (Alberts), Lodish, Karp, or your assigned text). We rebuild tutoring around your topic order, your professor’s emphasis (some courses are heavily molecular, others more cellular), and your real exam format.',
  },
  {
    question: 'What is AIIMS, for a family who hasn’t heard of it?',
    answer:
      'AIIMS — India’s apex medical institute, peer to Harvard Medical School in selectivity. Faculty trained there bring the molecular and clinical depth that makes signalling pathways, gene regulation and the central dogma make sense mechanistically — and connects them to disease and the pre-med path.',
  },
  {
    question: 'How much does Cell & Molecular Biology tutoring cost?',
    answer:
      'Pricing is quoted to your course, session frequency and time zone — transparently, with no obligation. Tell us where you are in the course and how often you want to meet in the free trial and we will quote exact options.',
  },
  {
    question: 'How do classes and time zones work?',
    answer:
      'Live online, scheduled around your lectures and lab in your own US time zone (ET/CT/MT/PT, or anywhere in the world), with every session recorded for review. One-on-one and small-batch options.',
  },
  {
    question: 'How do I start?',
    answer:
      'Book a free trial. Tell us your course, university and country, and we match you to the right tutor and a time-zone slot — students of any nationality welcome.',
  },
]

export default function CellAndMolecularBiologyTutorPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${PAGE_URL}#course`,
    name: 'Cell & Molecular Biology Tutoring (Online, Worldwide)',
    description:
      'Specialist tutoring for college Cell & Molecular Biology — membranes and transport, cell signalling, the cell cycle, the central dogma, gene regulation, and the molecular techniques (PCR, blotting, sequencing, CRISPR) modern courses test. Taught to your syllabus and textbook by AIIMS-trained faculty, live online in US time zones.',
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
      { '@type': 'ListItem', position: 3, name: 'Cell & Molecular Biology Tutor', item: PAGE_URL },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'Cell and Molecular Biology Tutor',
          'Molecular Biology',
          'Cell Signalling',
          'Gene Regulation',
          'Molecular Biology Techniques',
        ]}
        jobTitle="Biology Specialist Faculty — Cell & Molecular Biology, College, Pre-Med"
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
            <li className="text-slate-700">Cell &amp; Molecular Biology Tutor</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900">
            <Microscope className="h-3.5 w-3.5" />
            Cell &amp; molecular biology · mechanism &amp; technique · US time zones
          </span>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Cell &amp; Molecular Biology tutor &mdash;{' '}
            <span className="text-blue-700">understand the mechanism, not just the diagram.</span>
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-600">
            Specialist tutoring for the combined Cell &amp; Molecular Biology course &mdash; the
            term you go deep on membranes and transport, cell signalling, the cell cycle, the
            central dogma, gene regulation, and the techniques (PCR, blotting, sequencing, CRISPR)
            that modern exams test through data and experiment-design questions. We teach for the
            predict-the-outcome understanding upper-division biology and the MCAT assume. Taught by
            faculty trained at AIIMS &mdash; India&rsquo;s apex medical institute, peer to Harvard
            Medical School in selectivity. Live online in your US time zone
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#enquiry"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
            >
              Request a free trial
            </a>
            <Link
              href="/genetics-tutor"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-5 py-3 text-base font-semibold text-blue-700 hover:bg-blue-50"
            >
              Also taking Genetics?
            </Link>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-5xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What we cover</h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              The full cell/molecular arc &mdash; from membranes to genome editing &mdash; with the
              data and experiment-design questions each topic is tested on, taught to your syllabus
              and textbook.
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
            Why a specialist for Cell &amp; Molecular Biology
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
              Where Cell &amp; Molecular Biology leads
            </h2>
            <p className="mt-3 max-w-3xl text-slate-600">
              Cell/molecular is the gateway to upper-division biology and the pre-med path. We coach
              the courses around it too &mdash; the same faculty, the same connected understanding.
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
            source="cell-and-molecular-biology-tutor"
            title="Book a free Cell & Molecular Biology trial"
            subtitle="Any student, any nationality. Tell us your course, university and country, and which topics or techniques you're stuck on — we reply within a day in your US time zone."
          />
        </section>

        {/* FAQ */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Cell &amp; Molecular Biology tutoring &mdash; questions
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
              Master the cell at the level your degree and the MCAT demand
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              A specialist, mechanism-first approach to cell and molecular biology &mdash; including
              the techniques and data questions &mdash; for students anywhere. Free trial first.
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
