/**
 * /ib-biology-ia-mentorship
 *
 * NEW structured lead-gen page for live IB Biology Internal Assessment (IA)
 * mentorship — a distinct PRODUCT from the evergreen /ib-biology-ia-guide
 * informational page and the general /ib-biology-tutor service page.
 *
 * Targets enrollment intent from DP2 students and parents:
 * "IB Biology IA help", "IB Biology IA mentoring", "IB IA coaching",
 * "IB Biology internal assessment tutor", "IB IA research question help".
 *
 * Market gap (as of late June 2026):
 * Clastify — async, one-shot examiner review (~$49.99/submission) + exemplar
 * library; no live iterative sessions.
 * Lanterna — live 1:1 but pricey (~£58/hr, GBP/UK-centric general IB tutoring).
 * Revision Village ($249/course) — self-paced video + AI; no live teacher.
 * Nobody offers a structured, live, multi-session IA mentorship product that
 * walks the student through the full journey from research question to final
 * draft. That gap is this page's core pitch.
 *
 * Academic-integrity note: framing is strictly coaching/feedback on the
 * student's own work — no promise to write or co-author the IA.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'
import { GlobalEnquiryForm } from '@/components/seo/GlobalEnquiryForm'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  FlaskConical,
  GraduationCap,
  MessageCircle,
  Microscope,
  Target,
  Trophy,
} from 'lucide-react'

const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_PATH = '/ib-biology-ia-mentorship'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const WA = '918826444334'
const waLink = (text: string) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`

export const metadata: Metadata = {
  title: 'IB Biology IA Mentorship — Live Multi-Session Coaching | Cerebrum',
  description:
    'Live, structured IB Biology Internal Assessment mentorship with AIIMS-trained faculty. Multi-session coaching from research question through final draft: experimental design, data analysis, statistical tests, evaluation, and write-up. HL and SL. Message us for the next intake.',
  keywords: [
    'IB Biology IA mentorship',
    'IB Biology internal assessment help',
    'IB Biology IA coaching',
    'IB IA research question help',
    'IB Biology IA tutor',
    'IB Biology HL IA mentoring',
    'IB Biology SL IA coaching',
    'IB Biology IA 2025 syllabus',
    'IB Biology experimental design help',
    'IB Biology IA data analysis',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'IB Biology IA Mentorship — Live Multi-Session Coaching',
    description:
      'Structured live IB Biology IA mentorship with AIIMS-trained biology faculty. From research question to final draft — experimental design, data analysis, statistical tests, write-up. HL and SL.',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB Biology IA Mentorship — Live Multi-Session Coaching | Cerebrum',
    description:
      'Live structured IB Biology IA mentorship. Multi-session coaching from RQ to final draft, HL and SL, with AIIMS-trained biology faculty.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const packages = [
  {
    name: 'Full IA Mentorship',
    window: '~6–8 live sessions · RQ to final draft',
    detail:
      'The complete journey. Session 1 scopes a viable, assessable research question aligned with the new IB Biology syllabus (first assessment May 2025). Subsequent sessions work through experimental design, independent/dependent/controlled variables, data collection planning, statistical analysis (t-test, error bars, chi-square), evaluation of method and results, and a structured write-up review. Each session closes with clear next-steps the student completes independently before the following session — keeping academic integrity intact.',
    best: 'Best for students who want structured, coach-guided support from the very beginning.',
    icon: BookOpen,
  },
  {
    name: 'IA Rescue',
    window: '2–3 sessions · draft-to-submission fix',
    detail:
      "Already have a draft but it needs work before your school's internal deadline? We diagnose the biggest criterion gaps — typically Exploration (design quality) and Analysis (statistical justification) — give specific feedback on each section, and coach you through the revisions. You do the rewriting; we tell you exactly what to fix and why, referencing the 2025 mark scheme.",
    best: 'Best for DP2 students who have a draft but know it is not hitting full marks.',
    icon: Target,
  },
  {
    name: 'Rolling 1:1',
    window: 'Book individual sessions as needed',
    detail:
      'Flexible single sessions on any part of the IA — stuck on choosing a statistical test, unsure whether your method is controlled well enough, or need a walkthrough of the Evaluation criteria. Book as few or as many sessions as your timeline requires. First session typically available within 48 hours.',
    best: 'Best for students who have targeted questions and prefer to work at their own pace.',
    icon: Clock,
  },
]

const whatItCovers = [
  'Choosing a viable, original research question (RQ) that is achievable in a school lab setting and scores well on the Exploration criterion',
  'Experimental design: independent, dependent, and controlled variables; method justification; safety and ethical considerations under the new IB Biology syllabus',
  'Data collection planning — raw data tables, units, significant figures, uncertainties, and qualitative observations',
  'Statistical analysis coaching: mean, standard deviation, standard error of the mean, t-test, error bars, chi-square — knowing which test to use and why',
  'Graph construction, caption writing, and interpreting trends with reference to biological theory',
  'Evaluation of method: identifying and explaining limitations, suggesting realistic improvements, linking results back to the RQ',
  'Write-up structure and register: Personal Engagement, Exploration, Analysis, Evaluation, and Communication criterion-by-criterion guidance',
  'Mark-scheme walkthrough: understanding how examiners apply each criterion band so you can self-assess your own draft',
]

const faqs = [
  {
    question: 'When should I start IB Biology IA mentorship?',
    answer:
      "IB IA internal deadlines typically fall September–November of DP2 (your second IB year). The May 2027 exam session runs approximately April 23–May 19, 2027. To work through the full mentorship comfortably, most students benefit from starting in September or October 2026. If your school's internal deadline is earlier, message us as soon as possible so we can map your timeline. IA Rescue sessions can be run right up to the submission deadline.",
  },
  {
    question: 'How is this different from Clastify, Lanterna, or Revision Village?',
    answer:
      'Clastify is an async, one-shot examiner review (around $49.99 per submission) and an exemplar library — you send in a draft, get written comments back, and the session is over. Lanterna offers live 1:1 IB tutoring but is priced in GBP (around £58/hr), UK-centric, and a general IB service across all subjects. Revision Village ($249/year) is self-paced video and AI tools with no live teacher. None of them offers a structured, live multi-session programme that walks you from choosing a research question through to a polished final draft with iterative feedback at every stage. That is the gap we are filling — biology-specialist-led, live, and structured around the 2025 IB Biology mark scheme.',
  },
  {
    question: 'Who teaches the IA mentorship sessions?',
    answer:
      'Sessions are led by Dr. Shekhar C Singh (AIIMS New Delhi alumnus, founder of Cerebrum Biology Academy) and senior IB Biology specialists. AIIMS is one of the most biology-intensive medical entrances globally, so faculty bring genuine degree-level depth in experimental biology, genetics, cell biology, and physiology — not a generalist tutor covering ten subjects. Faculty are trained on the new IB Biology syllabus (first assessment May 2025) and the updated internal assessment mark scheme.',
  },
  {
    question: 'Does this cover the new IB Biology syllabus (first assessment May 2025)?',
    answer:
      'Yes. All mentorship sessions work with the 2023 IB Biology guide that first assessed in May 2025. The internal assessment criteria and mark scheme have not changed significantly in their core structure, but the content topics and command terms align to the updated syllabus. We are also familiar with the HL extension topics and their relevance to IA research questions.',
  },
  {
    question: 'Is this suitable for both HL and SL students?',
    answer:
      'Yes. The IA criteria and structure are identical for HL and SL in IB Biology. The main difference is content depth: HL students often have more options for research questions drawing on HL-only topics (e.g., D4 Natural selection, C3 Integration of body systems). We tailor the research question scoping session to your level and the biology concepts you are comfortable investigating.',
  },
  {
    question: 'Will you write or co-author my IA for me?',
    answer:
      "No — and that is by design. The IB takes academic integrity seriously, and any IA that is not the student's own work risks disqualification. Our role is strictly coaching and feedback: we help you understand what is required at each stage, give specific feedback on your drafts, explain exactly what the mark scheme is looking for, and guide your thinking — but you design the experiment, collect the data, and write every word. This protects you and ensures the skills you build are real.",
  },
  {
    question: 'What time zones do sessions run in?',
    answer:
      'Sessions are live online and scheduled to fit your time zone. We work with IB students across the US, UK, UAE, India, Singapore, Hong Kong, Australia, and beyond. We will find a slot that works for you — message us with your school location and preferred session times.',
  },
  {
    question: 'How much does IB Biology IA mentorship cost?',
    answer:
      "Pricing is in USD. As a guide, 1:1 sessions with senior faculty run approximately $90–130 per hour. Package rates for Full IA Mentorship and IA Rescue are available — message us on WhatsApp with your current IA stage and deadline, and we will send you the current package rate and availability. We do not publish a fixed price because session count depends on the student's starting point and how much work is needed.",
  },
]

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'IB Biology Internal Assessment Mentorship',
  description:
    'Structured live IB Biology IA mentorship programme. Multi-session coaching from research question through final draft: experimental design, data analysis, statistical tests, evaluation, and write-up. Covers the IB Biology 2025 syllabus. HL and SL supported.',
  url: PAGE_URL,
  inLanguage: 'en-US',
  educationalLevel: 'International Baccalaureate',
  educationalCredentialAwarded: 'IB Biology Internal Assessment preparation',
  teaches: [
    'IB Biology Internal Assessment research question development',
    'IB Biology experimental design',
    'IB Biology data analysis and statistical tests',
    'IB Biology IA evaluation and write-up',
    'IB Biology 2025 syllabus IA criteria',
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
      name: 'IB Biology Full IA Mentorship',
      courseMode: 'Online',
      courseWorkload: 'P8W',
    },
    {
      '@type': 'CourseInstance',
      name: 'IB Biology IA Rescue',
      courseMode: 'Online',
      courseWorkload: 'P2W',
    },
  ],
}

export default function IBBiologyIAMentorshipPage() {
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
          'IB Biology Internal Assessment',
          'IB Biology HL',
          'IB Biology SL',
          'IB Biology 2025 syllabus',
          'experimental design',
          'data analysis',
        ]}
        jobTitle="Founder & Lead IB Biology Faculty"
      />

      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <BreadcrumbSchema
          items={[
            { label: 'IB Biology', href: '/ib-biology' },
            { label: 'IA Mentorship', isCurrentPage: true },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              <Trophy className="h-4 w-4" /> Live mentorship · HL &amp; SL · 2025 syllabus
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              IB Biology IA Mentorship
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              The IB Internal Assessment is worth 20% of your final grade and it is the one part
              where a live expert coach — not a video library or an async review — makes the
              difference. We walk you through the whole IA: from choosing a research question that
              is both viable and assessable, through experimental design, data collection,
              statistical analysis, evaluation, and the final write-up. All live, all iterative, all
              on your timeline.
            </p>
            <ul className="mt-5 space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                Structured multi-session programme — not a one-shot async review
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                New IB Biology syllabus (first assessment May 2025) · HL and SL both supported
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                AIIMS-trained biology faculty · live online · your time zone
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={waLink(
                  'Hi! I need IB Biology IA mentorship. Please share the next intake dates and package options.'
                )}
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a
                href="#enquire"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Request IA intake info <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div id="enquire" className="scroll-mt-24">
            <GlobalEnquiryForm
              title="Request IA mentorship intake info"
              subtitle="Tell us your IA topic (if you have one), your school deadline, and your level (HL or SL) — we will reply within a day with the next intake and package options."
              source="ib-ia-mentorship"
            />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Three ways to work with us on your IA
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            IB IA internal deadlines typically fall September–November of DP2. Whether you are
            starting from scratch or rescuing a draft, message us for the next available intake and
            current package rates.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <pkg.icon className="h-7 w-7 text-blue-600" />
                <h3 className="mt-3 text-lg font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{pkg.window}</p>
                <p className="mt-3 text-sm text-slate-700">{pkg.detail}</p>
                <p className="mt-3 text-sm font-medium text-slate-900">{pkg.best}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Pricing is in USD. As a guide, senior faculty 1:1 sessions run approximately $90–130 per
            hour. Message us for the current Full IA Mentorship and IA Rescue package rates.
          </p>
        </div>
      </section>

      {/* What it covers */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            What the mentorship covers
          </h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Every section below maps directly to an IB Biology IA criterion or a common mark-loss
            point. Sessions are iterative — you work, we review, you revise.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {whatItCovers.map((item) => (
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
            Why live iterative coaching beats a one-shot review
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Microscope className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Biology expert, not generalist
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Faculty cleared AIIMS — one of the most biology-intensive medical entrances in the
                world. They understand the science behind your investigation, not just the IB
                criteria. That means they can tell you whether your method is biologically sound,
                not just whether it is formatted correctly.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <Target className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">Iterative, not one-shot</h3>
              <p className="mt-2 text-sm text-slate-700">
                Clastify sends written comments on a finished draft and the session is over. A
                one-shot review cannot help you redesign a flawed method, walk you through choosing
                the right statistical test, or explain why the examiner would award Band 1 not Band
                2 on the Evaluation criterion. Multiple live sessions can.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">New-syllabus mark scheme</h3>
              <p className="mt-2 text-sm text-slate-700">
                The new IB Biology guide (first assessment May 2025) changed content topics and
                updated command terms. We coach to the current mark scheme in real time — so the
                feedback you receive reflects exactly what an examiner reading your IA today is
                looking for, not a syllabus from five years ago.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm text-slate-600">
            Want more IB Biology context first? Read our{' '}
            <Link href="/ib-biology-ia-guide" className="font-semibold text-blue-700 underline">
              IB Biology IA guide
            </Link>
            , explore the{' '}
            <Link href="/ib-biology-tutor" className="font-semibold text-blue-700 underline">
              IB Biology tutor programme
            </Link>
            , or see the{' '}
            <Link
              href="/how-to-score-7-ib-biology"
              className="font-semibold text-blue-700 underline"
            >
              how to score 7 in IB Biology
            </Link>{' '}
            guide. For the full IB Biology overview, visit{' '}
            <Link href="/ib-biology" className="font-semibold text-blue-700 underline">
              /ib-biology
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            IB Biology IA mentorship — FAQs
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
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to take the stress out of your IB Biology IA?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-blue-100">
            Message us with your IA topic or idea, your school&apos;s internal deadline, and your
            level (HL or SL). We&apos;ll share the next available intake, the right package for your
            timeline, and current pricing — within a day.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={waLink(
                'Hi! I need help with my IB Biology IA. Please share the next intake and package options.'
              )}
              className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href="#enquire"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
            >
              Request intake info <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
