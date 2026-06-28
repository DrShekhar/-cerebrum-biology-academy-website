/**
 * /mcat-biology-biochem-intensive
 *
 * NEW cohort/enrollment landing page (additive — does not touch the evergreen
 * /mcat-biology hub or /mcat-biology-tutor-global service page). Targets
 * section-specialist enrollment intent: "MCAT biology tutor", "MCAT biochemistry
 * help", "MCAT BBLS section prep", "MCAT biology intensive course".
 *
 * Positioning: Cerebrum is NOT a full 4-section MCAT course provider. This page
 * sells section-specialist coaching for the "Biological and Biochemical Foundations
 * of Living Systems" (BBLS) section (~59 questions). Pairs cleanly with any full
 * QBank (UWorld, AAMC) or generalist course (Blueprint, Kaplan). No competitor
 * sells a live BBLS-only specialist; Blueprint/Kaplan/Princeton Review each teach
 * bio/biochem as one quarter of a four-section programme; Sketchy is self-paced
 * visual mnemonics ($249–$349, no live human). Cerebrum's edge: AIIMS-trained
 * faculty (AIIMS is one of the most biology-intensive medical entrances anywhere),
 * ~$60–$90/hr vs $156–$329/hr US tutoring, and IST/flexible scheduling.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_PATH = '/mcat-biology-biochem-intensive'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const WA = '918826444334'
const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export const metadata: Metadata = {
  title: 'MCAT Biology & Biochemistry Intensive — Live BBLS Section Coaching | Cerebrum',
  description:
    'Live, section-specialist MCAT coaching for the Biological and Biochemical Foundations of Living Systems (BBLS) section. AIIMS-trained faculty, ~$60–90/hr, small-batch cohorts for Jan/Mar/Apr/May 2027 test dates. Pairs with any QBank or full course.',
  keywords: [
    'MCAT biology intensive',
    'MCAT biochemistry tutor',
    'MCAT BBLS section prep',
    'MCAT biology tutor online',
    'MCAT biology biochemistry course',
    'MCAT section specialist',
    'MCAT biology help',
    'MCAT biochemistry coaching',
    'MCAT prep online live',
    'MCAT biology retaker',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'MCAT Biology & Biochemistry Intensive — Live BBLS Section Coaching',
    description:
      'Live section-specialist coaching for the MCAT BBLS section (~59 questions). AIIMS-trained faculty, small-batch cohorts, $60–90/hr. For Jan–May 2027 test dates.',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biology & Biochemistry Intensive — Live BBLS Section Coaching | Cerebrum',
    description:
      'Live MCAT bio/biochem section coaching by AIIMS-trained specialists. Small-batch cohorts for 2027 test dates. Pairs with UWorld/AAMC.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const cohorts = [
  {
    name: 'Bio/Biochem Foundations Content Review',
    window: 'Rolling enrollment — start any month',
    detail:
      'A systematic live walkthrough of every BBLS content area: cellular and molecular biology, biochemistry pathways, physiology and organ systems, genetics, and evolution. Taught in small batches with weekly live sessions, active-recall exercises, and WhatsApp doubt support. Designed to build the foundational knowledge layer before you move to passage drilling.',
    best: 'Best for students beginning MCAT prep or rebuilding shaky content before a 2027 test date.',
    icon: CalendarDays,
  },
  {
    name: 'Passage & Discrete Drilling Intensive',
    window: '8–10 weeks before your chosen test date (Jan / Mar / Apr / May 2027)',
    detail:
      'A high-tempo live intensive that drills MCAT-style biology and biochemistry passages and discrete questions. Each session works through real AAMC-style passages, breaks down answer-elimination logic, and identifies the exact content gaps costing you points on BBLS. Timed under exam conditions weekly. Run 8–10 weeks before your target test date.',
    best: 'Best for students who have content but are losing BBLS points on passages and discrete questions.',
    icon: Target,
  },
  {
    name: '1:1 Section-Rescue Track',
    window: 'Rolling — first session schedulable within 48 hours',
    detail:
      'A fully personalised one-to-one track designed for MCAT retakers who already know their BBLS score and need targeted section rescue. Faculty reviews your AAMC MCAT Score Report, pinpoints your weakest content categories and passage skills, and builds a weekly session plan around them. Schedule flexibly across US-evening, UK, Gulf and Asia-Pacific time zones.',
    best: 'Best for retakers, non-traditional applicants, and IMG/NRI students preparing outside US time zones.',
    icon: Users,
  },
]

const curriculum = [
  'Cellular & molecular biology: membrane transport, signal transduction, cell cycle, gene expression, protein synthesis, enzyme kinetics',
  'Biochemistry: metabolism (glycolysis, TCA, oxidative phosphorylation, fatty acid pathways), amino acids, enzymes, cofactors, and thermodynamics',
  'Physiology: cardiovascular, respiratory, renal, endocrine, nervous system, and immune function at the MCAT passage level',
  'Genetics & molecular genetics: Mendelian inheritance, chromosomal disorders, recombinant DNA, CRISPR-adjacent concepts tested in recent AAMC materials',
  'Evolution & ecology: natural selection, population genetics, Hardy–Weinberg, speciation — the discrete-heavy BBLS subdomain most students under-prepare',
  'Passage reading strategy: identifying the research design, distinguishing passage-based from content-based questions, and eliminating wrong answers systematically',
  'AAMC-style discrete question mastery: the single-statement factual discretes that reward deep content recall over reasoning shortcuts',
  'Score-report-guided gap analysis: for retakers, session plans built directly from AAMC percentile breakdowns across the 10 BBLS content categories',
]

const faqs = [
  {
    question: 'Is this a full MCAT course or just the biology and biochemistry section?',
    answer:
      'This is a section-specialist programme for the MCAT "Biological and Biochemical Foundations of Living Systems" (BBLS) section only — roughly 59 of the 230 scored questions. We do not teach Cars, Psych/Soc, or Chem/Phys here. This coaching pairs naturally with any full QBank (UWorld, Kaplan Qbank, AAMC official materials) or a full-course provider. Many students use us specifically because Blueprint, Kaplan, and Princeton Review teach bio/biochem as one quarter of a whole-exam programme, while Cerebrum is a biology-only specialist.',
  },
  {
    question: 'When should I start, and which test dates do the cohorts target?',
    answer:
      'The Passage Drilling Intensive is timed to run 8–10 weeks before a target test date. For 2027 MCAT administrations in January, March, April, and May, message us and we will confirm the current cohort schedule. The Content Review and 1:1 Section-Rescue tracks are rolling — you can start any month. Message us on WhatsApp with your target test date and we will suggest the right entry point.',
  },
  {
    question: 'How is Cerebrum different from Blueprint, Kaplan, or Sketchy?',
    answer:
      "Blueprint and Kaplan are full-course providers; their bio/biochem content is taught as one of four sections, by tutors who rotate across all subjects. Their 1:1 tutoring runs approximately $156–$329 per hour. Sketchy's Science Review ($249–$349) is a self-paced visual-mnemonic tool with no live human. Cerebrum is a biology-only specialist: AIIMS-trained faculty bring degree-level depth in cellular biology, biochemistry, and physiology (AIIMS is one of the most biology-intensive medical entrances in the world), at approximately $60–$90 per hour for 1:1 coaching. A subject-matter specialist who works through MCAT passages with you live is the alternative none of those providers offer at a comparable price.",
  },
  {
    question: 'Who teaches the intensive?',
    answer:
      'Sessions are led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) and senior biology specialists. AIIMS entrance preparation demands a depth of biological and biochemical reasoning that maps closely onto what the MCAT BBLS section tests — cell biology, biochemistry, physiology, and genetics at a level beyond what most pre-med coursework covers. Cerebrum faculty have coached students for NEET, AIIMS, IBO, IB, AP, and MCAT; the bio/biochem section is not a side offering — it is the core of what we teach.',
  },
  {
    question: 'Is this suitable for international students, NRI applicants, and IMGs?',
    answer:
      'Yes. All sessions are live online and scheduled flexibly across time zones: US-Eastern and Pacific evenings, UK daytimes, Gulf (GST), and Asia-Pacific mornings. Recordings are provided if you miss a session. We work with pre-meds in the US, Canada, the UK, UAE, India, Singapore, and beyond, including international medical graduates (IMGs) seeking US residency who need to retake or first-sit the MCAT.',
  },
  {
    question: 'How much does the MCAT biology coaching cost?',
    answer:
      'One-to-one coaching with a senior faculty member is approximately $60–$90 per hour USD, which is 40–70% below the typical US tutoring market rate ($156–$329/hr for Blueprint/Kaplan-level tutors). Small-batch group cohorts are lower per hour. The Passage Drilling Intensive is priced per cohort — message us with your test date for current availability and the exact cohort rate. We do not publish a fixed price list for cohort programmes because scheduling and batch sizes vary.',
  },
  {
    question: 'Do you offer a free trial or diagnostic?',
    answer:
      'Yes — a free 30-minute diagnostic session. A senior faculty member reviews your MCAT background (or AAMC score report if you are a retaker), works through one BBLS passage with you, identifies your top two content or skill gaps, and recommends the right track and time-zone slot. No payment is required for the diagnostic.',
  },
  {
    question: 'Can I use this alongside UWorld or AAMC official materials?',
    answer:
      'Absolutely — that is the intended model. This programme is built to complement, not replace, a QBank. Students typically do independent UWorld or AAMC passage sets between sessions, then bring their error patterns to the live class for coached analysis. Faculty can also work directly through AAMC official passages or Section Bank questions in session if you prefer.',
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'MCAT Biology & Biochemistry Intensive — BBLS Section Coaching',
  description:
    'Live, section-specialist MCAT coaching for the Biological and Biochemical Foundations of Living Systems (BBLS) section. AIIMS-trained faculty, small-batch and 1:1 tracks, rolling and cohort-based enrollment for 2027 MCAT test dates.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'Post-Secondary',
  educationalCredentialAwarded: 'MCAT BBLS Section Preparation',
  teaches: [
    'MCAT Biology — cellular and molecular biology',
    'MCAT Biochemistry — metabolism, enzymes, amino acids',
    'MCAT Physiology — organ systems at passage level',
    'MCAT Genetics and molecular genetics',
    'MCAT Passage reading and answer-elimination strategy',
    'AAMC MCAT BBLS section mastery',
  ],
  provider: {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Cerebrum Biology Academy',
    url: SITE_URL,
  },
  hasCourseInstance: [
    {
      '@type': 'CourseInstance',
      name: 'MCAT Bio/Biochem Foundations Content Review',
      courseMode: 'Online',
      courseWorkload: 'P12W',
    },
    {
      '@type': 'CourseInstance',
      name: 'MCAT Passage & Discrete Drilling Intensive',
      courseMode: 'Online',
      courseWorkload: 'P10W',
    },
    {
      '@type': 'CourseInstance',
      name: 'MCAT 1:1 Section-Rescue Track',
      courseMode: 'Online',
      courseWorkload: 'PT1H',
    },
  ],
}

export default function McatBiologyBiochemIntensivePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <FAQSchema questions={faqs} pageUrl={PAGE_URL} />
      <CerebrumPersonSchema
        knowsAbout={[
          'MCAT Biology',
          'MCAT Biochemistry',
          'Biological and Biochemical Foundations of Living Systems',
          'MCAT cellular and molecular biology',
          'MCAT physiology',
        ]}
        jobTitle="Founder & Lead MCAT Biology Faculty"
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <BreadcrumbSchema
          items={[
            { label: 'MCAT Biology', href: '/mcat-biology' },
            { label: 'Bio/Biochem Intensive', isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" /> Live cohorts · Jan / Mar / Apr / May 2027 test dates
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              MCAT Biology &amp; Biochemistry Intensive
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              The only live, section-specialist coaching for the MCAT{' '}
              <strong>Biological and Biochemical Foundations of Living Systems</strong> (BBLS)
              section — approximately 59 questions. Taught by AIIMS-trained biology faculty, not a
              generalist tutor rotating across all four MCAT sections. Pairs with any QBank (UWorld,
              AAMC) or full-course provider.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Content review, passage drilling, and 1:1 section-rescue tracks — rolling + cohort
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Cell biology · biochemistry · physiology · genetics · AAMC passage strategy
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                ~$60–90/hr · US / UK / Gulf / Asia-Pacific time zones · free 30-min diagnostic
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink(
                  'Hi! I want to join the MCAT Biology & Biochemistry Intensive. Please share the next cohort dates, my test date options, and pricing.'
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Book a free diagnostic <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div id="enquire" className="scroll-mt-24">
            <GlobalEnquiryForm
              title="Book your free MCAT BBLS diagnostic"
              subtitle="Tell us your target MCAT test date and current BBLS situation — we will match you to the right track and time-zone slot, and reply within a day."
              source="mcat-bio-intensive"
            />
          </div>
        </div>
      </section>

      {/* Cohorts / enrollment windows */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Three tracks — pick the one that fits your test date
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            MCAT test dates run throughout the year. Whether you are building content from scratch,
            drilling passages eight weeks out, or rescuing a retake BBLS score, there is a track for
            your situation.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {cohorts.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <c.icon className="h-7 w-7 text-blue-600" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{c.window}</p>
                <p className="mt-3 text-sm text-slate-700">{c.detail}</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{c.best}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What the intensive covers
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Every content area tested in the MCAT BBLS section, taught at the depth the exam
            actually demands — not a surface overview.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {curriculum.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200"
              >
                <FlaskConical className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Cerebrum */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Why a BBLS specialist beats a generalist MCAT course
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">AIIMS-trained faculty</h3>
              <p className="mt-2 text-sm text-slate-700">
                Taught by faculty who cleared AIIMS — one of the most biology-intensive medical
                entrances in the world. That is degree-level depth in biochemistry, cell biology,
                and physiology, not a generalist tutor who rotates across all four MCAT sections and
                ten other subjects.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Target className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                No competitor owns this niche
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Blueprint, Kaplan, and Princeton Review teach BBLS as one quarter of their
                programme. Sketchy is self-paced visual mnemonics with no live human. No major
                provider sells live, specialist-only BBLS coaching. That gap is why students —
                especially retakers with a specific section weakness — find us.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Clock className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                40–70% below US tutoring rates
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                US-market 1:1 tutoring (Blueprint, Kaplan, Princeton Review) runs approximately
                $156–$329 per hour. Cerebrum&apos;s senior-faculty 1:1 rate is approximately
                $60–$90/hr USD, with small-batch cohort rates lower still — without trading off
                faculty depth.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Looking for broader MCAT biology context? See our{' '}
            <Link href="/mcat-biology" className="font-semibold text-blue-700 underline">
              MCAT Biology hub
            </Link>
            , the{' '}
            <Link
              href="/mcat-biology-tutor-global"
              className="font-semibold text-blue-700 underline"
            >
              MCAT biology tutor programme
            </Link>
            , or the{' '}
            <Link href="/mcat-biology" className="font-semibold text-blue-700 underline">
              MCAT biology high-yield topics
            </Link>{' '}
            resource.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            MCAT biology &amp; biochemistry intensive — FAQs
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to master the MCAT BBLS section?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Book a free 30-minute diagnostic. A senior faculty member will review your MCAT
            situation, work through one BBLS passage with you, pinpoint your top two gaps, and
            recommend the right track and time-zone slot.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                'Hi! I want to book a free MCAT BBLS diagnostic and join the Bio/Biochem Intensive. Please share available tracks and my test-date options.'
              )}
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Book a free diagnostic <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
