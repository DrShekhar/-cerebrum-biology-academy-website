import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Target, Award, Clock, GraduationCap } from 'lucide-react'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { LeadCaptureForm } from '@/components/landing/LeadCaptureForm'
import { FloatingWhatsAppButton } from '@/components/landing/FloatingWhatsAppButton'

const PAGE_URL = 'https://cerebrumbiologyacademy.com/ap-biology-class-11'
const CAMPAIGN = 'ap-biology-class-11'

export const metadata: Metadata = {
  title: 'AP Biology for Class 11 / Grade 11 Students | Cerebrum Biology Academy',
  description:
    'AP Biology coaching for Class 11 and Grade 11 students worldwide. 8-unit curriculum coverage, FRQ practice, AP exam preparation, and optional bridge to NEET Biology for US-returning students.',
  keywords: [
    'AP Biology Class 11',
    'AP Biology Grade 11',
    'AP Biology tutor Class 11',
    'AP Biology syllabus Grade 11',
    'AP Biology units 1-8',
    'AP Biology FRQ practice',
    'AP Biology exam preparation',
    'Class 11 AP Biology tuition',
    'AP Biology online tutor',
    'AP Bio Class 11 course',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en-US': PAGE_URL,
      en: PAGE_URL,
      'x-default': PAGE_URL,
    },
  },
  openGraph: {
    title: 'AP Biology for Class 11 / Grade 11 Students',
    description:
      'Complete AP Biology coverage for Class 11 / Grade 11 students. 8 CollegeBoard units, FRQ practice, and optional NEET bridge.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology for Class 11 / Grade 11 Students',
    description:
      'Complete AP Biology coverage with 8-unit curriculum, FRQ practice, and optional NEET bridge for returning students.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

// The 8 units as specified by College Board's 2024 Course & Exam Description.
const apUnits = [
  {
    unit: 'Unit 1',
    title: 'Chemistry of Life',
    weight: '8-11%',
    body: 'Water properties, biological macromolecules (carbohydrates, lipids, proteins, nucleic acids), and the chemistry of monomers and polymers. Foundational for all subsequent units.',
  },
  {
    unit: 'Unit 2',
    title: 'Cell Structure and Function',
    weight: '10-13%',
    body: 'Prokaryotic vs eukaryotic cells, organelles (mitochondria, chloroplasts, endomembrane system), membrane transport, compartmentalisation, and cell size / surface area relationships.',
  },
  {
    unit: 'Unit 3',
    title: 'Cellular Energetics',
    weight: '12-16%',
    body: 'Enzymes (induced-fit, kinetics, regulation), cellular respiration (glycolysis, Krebs, electron transport), photosynthesis (light + Calvin cycle), and metabolic fitness.',
  },
  {
    unit: 'Unit 4',
    title: 'Cell Communication and Cell Cycle',
    weight: '10-15%',
    body: 'Signal transduction pathways, feedback mechanisms, cell-cycle regulation, mitosis, and cancer biology basics.',
  },
  {
    unit: 'Unit 5',
    title: 'Heredity',
    weight: '8-11%',
    body: 'Meiosis, Mendelian genetics, pedigree analysis, non-Mendelian inheritance, chromosomal inheritance, and Hardy-Weinberg equilibrium calculations.',
  },
  {
    unit: 'Unit 6',
    title: 'Gene Expression and Regulation',
    weight: '12-16%',
    body: 'DNA structure and replication, transcription, translation, gene expression regulation (operons, epigenetics), mutation types, and biotechnology (PCR, gel electrophoresis, cloning).',
  },
  {
    unit: 'Unit 7',
    title: 'Natural Selection',
    weight: '13-20%',
    body: 'Evidence for evolution, mechanisms of evolution (selection, drift, gene flow, mutation), speciation, phylogenetics, and the origin of life. The largest AP Biology unit by weight.',
  },
  {
    unit: 'Unit 8',
    title: 'Ecology',
    weight: '10-15%',
    body: 'Population ecology (logistic + exponential growth), community ecology, ecosystem dynamics, biogeochemical cycles, and human impact on ecosystems.',
  },
]

const examFormat = [
  {
    label: 'Section I — Multiple Choice',
    detail:
      '60 questions in 90 minutes. 50% of the exam score. Mix of standalone MCQs + question sets referencing data, experiments, or models.',
  },
  {
    label: 'Section II — Free Response',
    detail:
      '6 FRQs in 90 minutes. 50% of the exam score. Includes 2 long-form questions (8-10 points each, one on interpreting/designing experiments) + 4 short-answer questions.',
  },
  {
    label: 'Score scale',
    detail:
      '5 = extremely well qualified, 4 = well qualified, 3 = qualified (passing), 2 = possibly qualified, 1 = no recommendation. Most US colleges accept score 4+ for credit.',
  },
]

const studyTimeline = [
  {
    phase: 'Aug-Oct (Start of Junior Year)',
    focus: 'Foundation',
    body: 'Cover Units 1-3 (Chemistry, Cell Structure, Cellular Energetics). These are the most-tested topics by % of exam weight. Build note-taking system — flashcards for vocabulary, concept maps for pathways.',
  },
  {
    phase: 'Nov-Jan',
    focus: 'Core concepts',
    body: 'Work through Units 4-6 (Cell Communication, Heredity, Gene Expression). These dominate free-response questions. Start doing practice FRQs from past exams — at least 2 per week by December.',
  },
  {
    phase: 'Feb-Mar',
    focus: 'Depth + Practice',
    body: 'Cover Unit 7 (Natural Selection — largest unit) and Unit 8 (Ecology). Transition to full-length practice tests. Target 55+ raw score on MCQ + 35+ on FRQs for a likely 5.',
  },
  {
    phase: 'Apr-May',
    focus: 'Revision + Exam',
    body: 'Full-length timed tests weekly. Review weak areas via College Board CED and unit reviews. Exam is first week of May. Final week: rest + light review, not new material.',
  },
]

const faqs = [
  {
    question: 'What are the 8 AP Biology units?',
    answer:
      'The 8 units per College Board 2024 Course & Exam Description are: Unit 1 Chemistry of Life (8-11%), Unit 2 Cell Structure and Function (10-13%), Unit 3 Cellular Energetics (12-16%), Unit 4 Cell Communication and Cell Cycle (10-15%), Unit 5 Heredity (8-11%), Unit 6 Gene Expression and Regulation (12-16%), Unit 7 Natural Selection (13-20% — the largest unit), and Unit 8 Ecology (10-15%). Students should allocate prep time proportional to unit weight.',
  },
  {
    question: 'What is the AP Biology exam format?',
    answer:
      'Two sections. Section I is 60 multiple-choice questions in 90 minutes (50% of score). Section II is 6 free-response questions in 90 minutes (50% of score) — 2 long-form (one asks students to design or interpret an experiment) plus 4 short-answer. Total exam: 3 hours. Calculator permitted throughout. Total score reported 1-5; most US colleges accept 4+ for credit.',
  },
  {
    question: 'Is AP Biology harder than NEET Biology?',
    answer:
      'They test different skills. AP emphasises experimental design, data interpretation, and concept application via FRQs; NEET emphasises rapid pattern recognition across 90 MCQs in 45 minutes with negative marking. In absolute depth, AP and NEET overlap 70% on content (both at Campbell Biology level) but AP goes deeper on biostatistics, experimental design, and phylogenetics; NEET goes deeper on plant and animal physiology recall. Most Class 11 AP students find the NEET Biology transition requires 2-3 months of focused recall + speed practice.',
  },
  {
    question: 'Can I prepare for AP Biology alongside CBSE Class 11?',
    answer:
      'Yes. Overlap between AP Biology and CBSE Class 11 Biology is approximately 65%. CBSE covers all 8 AP units but at different depths — AP goes deeper on Units 3, 6, and 7 (Energetics, Gene Regulation, Natural Selection); CBSE goes deeper on Unit 8 Ecology. Running both in parallel adds roughly 3-5 hours/week to a Class 11 schedule. Many Indian students use AP Biology as depth training for NEET.',
  },
  {
    question: 'When should I take AP Biology — Grade 11 or Grade 12?',
    answer:
      'Both are common. Taking it in Grade 11 gives you the score in hand for college applications due in October-November of Grade 12 — this is the more strategic choice. Grade 12 timing works if you prefer concentrating AP and SAT Subject Tests together, though SAT Subject Tests have been discontinued by College Board. Most US college admissions officers see AP Biology in Grade 11 as evidence of rigour.',
  },
  {
    question: 'How do you structure AP Biology coaching for international students?',
    answer:
      'Our AP Biology coaching is fully online, scheduled to fit US timezones (6-9 PM ET evening batches, plus Saturday 10 AM ET intensive). Curriculum follows College Board CED with unit-wise teaching, FRQ practice weekly, and two full-length practice exams before May. We also offer 1:1 tutoring at a premium tier and a bridge programme for returning Indian students transitioning from AP Biology to NEET.',
  },
  {
    question: 'What does AP Biology coaching cost?',
    answer:
      'Our Complete AP Biology Year programme (Aug-May, covers the full curriculum + practice exams): $1,800 flat. 1:1 Elite Mentoring: $90 per hour. Small-Batch AP cohort (4-6 students): $50 per hour. Pricing is USD-referenced; the AP bridge-to-NEET programme (for Indian students returning after AP) is separate — see /ap-biology-to-neet-preparation for that pathway.',
  },
  {
    question: 'Can AP Biology students use their score for Indian universities like AIIMS?',
    answer:
      'No. Indian medical admissions (AIIMS, JIPMER, MAMC) require NEET-UG score; AP scores are not accepted. AP Biology + SAT Biology is accepted at international universities (Harvard, Stanford, Oxford, Singapore medical schools). If you plan to return to India for medical admission, use our AP-to-NEET bridge programme which retools AP knowledge for NEET pattern in 6-8 months.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AP Biology Class 11 / Grade 11 Programme',
  description:
    'Complete AP Biology coaching for Class 11 / Grade 11 students worldwide. 8-unit College Board curriculum, free-response practice, and AP exam preparation.',
  url: PAGE_URL,
  provider: {
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy',
    url: 'https://cerebrumbiologyacademy.com',
  },
  educationalLevel: 'High School — Grade 11 / Class 11',
  about: 'AP Biology — 8 units per College Board Course & Exam Description',
  inLanguage: 'en-US',
  teaches: apUnits.map((u) => `${u.title} (${u.weight})`),
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'Complete AP Biology Year',
      description:
        '9-month programme covering all 8 units + weekly FRQs + 2 full-length practice exams before the May AP exam.',
      courseMode: 'Online',
      courseWorkload: 'PT5H',
      inLanguage: 'en-US',
      offers: {
        '@type': 'Offer',
        price: 1800,
        priceCurrency: 'USD',
        url: `${PAGE_URL}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'CourseInstance',
      name: '1:1 Elite AP Biology Mentoring',
      description:
        'One-on-one sessions with a senior biology tutor. Custom pace, FRQ coaching, and topic-specific deep-dives.',
      courseMode: 'Online',
      courseWorkload: 'PT1H',
      inLanguage: 'en-US',
      offers: {
        '@type': 'Offer',
        price: 90,
        priceCurrency: 'USD',
        url: `${PAGE_URL}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
    {
      '@type': 'CourseInstance',
      name: 'Small-Batch AP Biology Weekend',
      description:
        'Weekend small-group AP Biology cohort (4-6 students) for students balancing school with AP prep.',
      courseMode: 'Online',
      courseWorkload: 'PT3H',
      inLanguage: 'en-US',
      offers: {
        '@type': 'Offer',
        price: 50,
        priceCurrency: 'USD',
        url: `${PAGE_URL}#pricing`,
        availability: 'https://schema.org/InStock',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to prepare for AP Biology in Class 11 / Grade 11',
  description:
    'A 4-phase preparation plan for AP Biology Class 11 students targeting a score of 4 or 5 on the May AP exam.',
  totalTime: 'P9M',
  inLanguage: 'en-US',
  step: studyTimeline.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: `${s.phase}: ${s.focus}`,
    text: s.body,
  })),
  tool: [
    { '@type': 'HowToTool', name: 'Campbell Biology 11th or 12th edition' },
    { '@type': 'HowToTool', name: 'College Board AP Biology Course & Exam Description (CED)' },
    { '@type': 'HowToTool', name: 'AP Biology released exams (2012 onwards)' },
  ],
}

export default function APBiologyClass11Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { label: 'Class 11 Biology', href: '/class-11-biology-by-curriculum' },
          { label: 'AP Biology Class 11', isCurrentPage: true },
        ]}
        showSchemaOnly
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-start lg:gap-12">
              <div className="order-2 lg:order-1 lg:col-span-3">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  <BookOpen className="h-3.5 w-3.5 text-green-400" />
                  For US Grade 11 / Class 11 · College Board 8-unit CED
                </div>

                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  AP Biology for
                  <br />
                  <span className="text-green-400">Class 11 / Grade 11 students.</span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                  Complete 9-month programme covering all 8 College Board units, weekly FRQ
                  practice, two full-length mock exams, and optional bridge to NEET Biology for
                  students returning to India after Grade 12.
                </p>

                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">Units</dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">8</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Programme length
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">9 mo</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-slate-400">
                      Target score
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-white">4 or 5</dd>
                  </div>
                </dl>
              </div>

              <div className="order-1 lg:order-2 lg:col-span-2">
                <LeadCaptureForm
                  source="hero"
                  campaign={CAMPAIGN}
                  heading="Book a free AP Biology demo"
                  subheading="Tell us your Grade, school, and AP exam year. We match you to the right mentor in 15 minutes."
                  showFaculty
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8 Units */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                The 8 College Board units.
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                AP Biology is organised into 8 units per the 2024 College Board Course &amp; Exam
                Description. Our curriculum follows the same structure with per-unit teaching, FRQ
                practice, and unit-end mock assessments.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {apUnits.map((u) => (
                <div key={u.unit} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                        {u.unit}
                      </p>
                      <span className="text-xs font-medium text-slate-500">{u.weight}</span>
                    </div>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">{u.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exam format */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              AP Biology exam format.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Two sections, 3 hours total, evenly weighted between MCQ and free-response. Calculator
              permitted throughout.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {examFormat.map((e) => (
                <div key={e.label} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-slate-900">{e.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study timeline */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              9-month study timeline.
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Our Complete AP Biology Year runs August to May, matching the US school calendar. Here
              is the phase-by-phase focus and what you should be doing each month.
            </p>

            <div className="mt-10 space-y-4">
              {studyTimeline.map((s, i) => (
                <div
                  key={s.phase}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                      {s.phase}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.focus}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="border-b border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Why Grade 11 students pick Cerebrum for AP Biology.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'FRQ-focused practice',
                  body: 'Weekly free-response questions with model answers + examiner-style rubric feedback. FRQs are where most 3s and 4s lose points — we drill them relentlessly from week 2.',
                },
                {
                  icon: Clock,
                  title: 'US timezone batches',
                  body: 'Live classes scheduled for 6-9 PM ET weekdays plus Saturday 10 AM ET intensives. Fits standard US high-school evening study windows.',
                },
                {
                  icon: GraduationCap,
                  title: 'Bridge to NEET option',
                  body: 'Indian students returning after Grade 12 can transition to NEET Biology via our AP-to-NEET bridge (6-8 months). Same faculty, same core curriculum, different exam pattern.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <item.icon className="h-5 w-5 text-green-700" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              AP Biology Class 11 questions, answered.
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-xl border border-slate-200 bg-white p-5 open:border-green-300"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900">{f.question}</span>
                    <span className="mt-0.5 text-slate-400 group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-slate-700">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="border-b border-slate-200 py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Related pages.
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: 'AP Biology Tutor (all grades)', href: '/ap-biology-tutor' },
                { label: 'AP Biology Online Tutor', href: '/ap-biology-online-tutor' },
                { label: 'AP Biology → NEET Bridge', href: '/ap-biology-to-neet-preparation' },
                {
                  label: 'Class 11 Biology by Curriculum',
                  href: '/class-11-biology-by-curriculum',
                },
                { label: 'IB Biology (HL/SL)', href: '/ib-biology' },
                { label: 'CBSE Class 11 Biology', href: '/courses/class-11' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-green-300 hover:shadow-sm"
                >
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-green-700">
                    {l.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-green-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Closing form */}
        <section className="bg-slate-950 py-14 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ready to start AP Biology?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  Free demo, no commitment. We confirm your grade, school, and AP exam year and
                  assign a mentor within 15 minutes (working hours).
                </p>
              </div>
              <div className="lg:col-span-3">
                <LeadCaptureForm
                  source="final-cta"
                  campaign={CAMPAIGN}
                  heading="Book your AP Biology demo"
                  subheading="Same form, same promise."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Legal footer */}
        <section className="bg-white py-6">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
              <a href="/privacy-policy" className="underline hover:text-slate-900">
                Privacy
              </a>
              <a href="/terms-of-service" className="underline hover:text-slate-900">
                Terms
              </a>
              <a href="/contact" className="underline hover:text-slate-900">
                Contact
              </a>
            </div>
          </div>
        </section>

        <FloatingWhatsAppButton
          message="Hi Cerebrum, I am a Grade 11 / Class 11 student preparing for AP Biology. Please share the programme and schedule."
          campaign={CAMPAIGN}
          tooltip="AP Bio Grade 11? Chat with us"
        />
      </main>
    </>
  )
}
