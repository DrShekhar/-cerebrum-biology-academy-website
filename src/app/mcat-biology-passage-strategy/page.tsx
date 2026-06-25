/**
 * /mcat-biology-passage-strategy
 *
 * Section-specific page targeting "MCAT biology passage strategy".
 * Passage-based reasoning is the MCAT-specific skill that AP / IB
 * Biology students don't develop from prior coursework.
 *
 * Distinct from /mcat-biology-preparation (content hub) and any
 * content-review page.
 *
 * Server component. Plain WhatsApp anchors. USD pricing only.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  Home,
  MessageCircle,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/mcat-biology-passage-strategy'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

const WHATSAPP_HREF = `https://wa.me/918826444334?text=${encodeURIComponent(
  'Hi! I want focused MCAT biology passage strategy coaching (B/B passages). Please share programme details and the diagnostic passage block.'
)}`

export const metadata: Metadata = {
  title: 'MCAT Biology Passage Strategy | Bio/Biochem Section Skill',
  description:
    'MCAT biology passage strategy — reading, reasoning, and timing for the B/B section. 96-second pacing, the 4 question types, when to skim vs deep-read, AAMC-grade passage drilling.',
  keywords: [
    'MCAT biology passage strategy',
    'MCAT B/B passage practice',
    'MCAT passage-based questions biology',
    'MCAT passage reading technique',
    'MCAT bio passage timing',
    'MCAT bio passage 96 seconds',
    'MCAT passage question types',
    'MCAT biology passage tips',
    'AAMC passage strategy',
    'MCAT B/B time management',
    'MCAT discrete vs passage',
    'MCAT passage skim deep read',
  ],
  openGraph: {
    title: 'MCAT Biology Passage Strategy — Reading, Reasoning, Time',
    description:
      'The passage-reasoning playbook for the MCAT B/B section. 96-second pacing, 4 question types, skim vs deep-read.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT Biology Passage Strategy',
    description: "The MCAT-specific skill AP and IB Biology don't train.",
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const passageFAQs = [
  {
    question: 'How long should I spend on each MCAT biology passage?',
    answer:
      'The B/B section gives you 95 minutes for 59 questions, which works out to ~96 seconds per question. Since 44 of those questions are inside 10 passages, the per-passage time budget is roughly 8.5-9.5 minutes including reading the passage. The discrete (non-passage) 15 questions should average 60-75 seconds each, banking the saved time for the harder passages. Students who lock in this pacing rhythm during practice almost never run out of time on test day.',
  },
  {
    question:
      'Should I read the MCAT biology passage before the questions, or look at questions first?',
    answer:
      'Read the passage first, but read it strategically — title, opening paragraph, then study any figures and tables, then skim the remaining paragraphs while noting unfamiliar terms. This takes roughly 90 seconds for a typical 400-word B/B passage. Looking at questions first ("question stacking") tends to cost more time than it saves on B/B because the passages are dense with figures that need orientation. CARS strategy advice does not transfer to B/B — biology passages reward content reading, not pure structural analysis.',
  },
  {
    question: 'What types of questions appear within an MCAT biology passage set?',
    answer:
      'Four recurring types per passage. (1) Pure recall — tests whether you know a fact independent of the passage, e.g., "which enzyme catalyses step 3 of glycolysis?" (2) Recall + passage integration — combines a known fact with information from the passage, e.g., "given the passage\'s pH conditions, would this enzyme be most active?" (3) Novel data interpretation — gives you a graph or table in the passage and asks you to interpret a value or trend. (4) Experimental design — asks you to predict the effect of a change to the experimental setup. Within most passages you\'ll see a mix of all four; the time-cheap ones are usually the recall questions, the time-expensive ones are usually experimental design.',
  },
  {
    question: 'How do MCAT passages differ from AP Biology, IB Biology, or other prior coursework?',
    answer:
      'Structurally and skill-wise they are different. AP Biology Free Response Questions are graded essays with rubric points — you write answers, not pick from four options. IB Biology Paper 2 includes extended response (data-based but graded essay format). Recall-based single-stem exams such as NEET test each item in isolation with no passage at all. MCAT B/B is the only one of these formats that gives you a 200-400 word passage with figures and then a set of multiple-choice questions that test passage application. The passage-reasoning skill must be specifically trained — content review alone, even comprehensive content review, does not transfer.',
  },
  {
    question: 'Should I drill passages from third-party prep books or only AAMC official passages?',
    answer:
      "Both, in that order. Third-party passages (Kaplan, Jack Westin) are useful for the first 60-80 passages of practice because they're higher volume and let you build pattern recognition cheaply. Once you've done that volume, switch to AAMC official material — the AAMC Question Pack 1, Question Pack 2, AAMC Section Bank, and the four AAMC official full-length practice tests. AAMC passages are calibrated more accurately to test-day difficulty and reasoning style. Save the AAMC officials for the final 6-8 weeks before your test date.",
  },
  {
    question: 'I keep getting passages right in practice but losing time. How do I fix it?',
    answer:
      "This is the most common B/B plateau. Three fixes in order. First, set a 9-minute timer per passage in practice and physically move on when it rings — you will lose 1-2 questions early on, then recover. Second, on your first read of the passage, do not stop to re-read confusing sentences; mark them and continue. Most of the confusion resolves once you see the questions. Third, run an error analysis on missed questions and tag each one as content-gap, reasoning-gap, or time-gap — most students discover they have a 70/30 split between reasoning gaps and time gaps, and pure content review won't solve either.",
  },
]

export default function MCATBiologyPassageStrategyPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MCAT Biology Passage Strategy — Reading, Reasoning, Time',
    description:
      'Focused training on MCAT B/B section passage reasoning — the skill that AP and IB Biology preparation do not develop. Includes pacing drills, question-type recognition, error analysis, and AAMC official passage scaffolding.',
    url: PAGE_URL,
    inLanguage: 'en-US',
    availableLanguage: ['English'],
    educationalLevel: 'Pre-Medical',
    coursePrerequisites:
      'MCAT B/B content review complete or in progress; introductory undergraduate biology',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: SITE_URL,
      sameAs: SITE_URL,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: passageFAQs.map((f) => ({
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
        name: 'MCAT Biology',
        item: `${SITE_URL}/mcat-biology-preparation`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Passage Strategy',
        item: PAGE_URL,
      },
    ],
  }

  return (
    <>
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
        {/* Breadcrumb */}
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-700">
                  <Home className="w-4 h-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link
                  href="/mcat-biology-preparation"
                  className="text-gray-600 hover:text-blue-700"
                >
                  MCAT Biology
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-blue-700 font-medium">Passage Strategy</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              The MCAT-specific skill AP and IB Biology don&apos;t train
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT Biology Passage Strategy —
              <span className="block text-teal-300 mt-2">Reading, Reasoning, Time</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              Passage-based reasoning is the single most distinctive MCAT skill — and the area where
              pre-med applicants (AP, IB, and A-Level Biology backgrounds, as well as international
              students from exams such as NEET) most consistently underperform on first attempt.
              This is the playbook: pacing, the four recurring question types, when to skim, when to
              deep-read, and how to drill passages productively.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-teal-300" />
                ~96 seconds per question
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-teal-300" />4 question types decoded
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-teal-300" />
                AAMC-style drilling
              </span>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Talk to a passage-strategy coach on WhatsApp
            </a>
          </div>
        </section>

        {/* Why passages are different */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why MCAT biology passages are different
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Almost every other biology exam a pre-med student has sat tests content directly. AP
              Biology FRQs grade prose answers against a rubric. IB Biology Paper 2 includes
              extended-response questions where the data is in the question and the answer is graded
              for content. Recall-based single-stem exams such as NEET test each item in isolation,
              with no passage at all. None of these formats train the specific MCAT skill — reading
              a 200-400 word passage with figures, then answering a set of 4-7 multiple choice
              questions that mostly depend on the passage.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The B/B section places 10 such passages in front of you, plus 15 discrete (non-
              passage) questions intermixed, all inside 95 minutes. The passages cover unfamiliar
              enzymes, made-up regulatory pathways, real or fabricated experimental data, and
              clinical scenarios. The questions rarely ask "what does Campbell say" — they ask
              "given this passage, what is the most likely explanation". This is a different
              cognitive skill from content recall, and it has to be specifically trained.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The good news: passage strategy is more trainable than content depth. Most students
              see their B/B score move 4-6 points in the final six weeks of prep purely from passage
              volume and error analysis — even without adding new content. Content is the
              foundation; passage strategy is the lever.
            </p>
          </div>
        </section>

        {/* Passage structure */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Passage structure: what you&apos;re reading
            </h2>
            <p className="text-slate-600 mb-8">
              Every B/B passage has the same skeleton. Recognising the parts in the first 20 seconds
              saves time across the entire question set.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'Title + abstract',
                  body: 'The first paragraph (sometimes labelled an "abstract" or just sitting unlabelled at the top) tells you the biological system, the experimental question, and often the central finding. Skim this in 15-20 seconds. If you stop here knowing the system and the question, the rest of the passage is navigation.',
                },
                {
                  title: 'Methods / experimental setup',
                  body: 'A short prose section describing how the experiment was run, what the controls were, and what was measured. Usually 1-2 paragraphs. You don\'t need to memorise this — you need to know where to look back if a question asks "the control group differed from the experimental group in...". Tag it and move on.',
                },
                {
                  title: 'Figures + tables',
                  body: 'The single most important block. Most B/B passages contain 1-3 figures (often graphs, gel images, or kinetic plots) plus a table or two. Spend 60-90 seconds on these. Note units on every axis. Identify what changes between conditions. Roughly half the passage questions are answerable from figures alone.',
                },
                {
                  title: 'Discussion / conclusions',
                  body: 'The final paragraph or two usually offer the researchers\' interpretation of their data. Useful for questions that ask "what does the passage suggest". Often a fast skim — 15 seconds — is enough; you can return for specific phrasing if a question requires it.',
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600 mt-6">
              Plus: 15 discrete questions are intermixed throughout the section — these are
              single-stem questions independent of any passage. Treat them as your time bank. Aim
              for 60-75 seconds each, leaving budget for the harder passage questions.
            </p>
          </div>
        </section>

        {/* Time pressure math */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              The time pressure math
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              95 minutes ÷ 59 questions = 96.6 seconds per question on average. Inside that average,
              you have two distinct budgets. Discrete questions (15 of them) should run 60-75
              seconds each — they are usually testing recall with no passage navigation. That
              releases 21-26 minutes for the discrete block alone, leaving 69-74 minutes for the 10
              passages.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              That gives you roughly 7-7.5 minutes per passage including reading. Inside a passage,
              the rhythm typically looks like: 90 seconds reading the passage, then ~5.5 minutes for
              4-7 questions. The first 2-3 questions of any passage should run 60-75 seconds each
              (they tend to be the easier ones). The last 2-3 questions of a hard passage may run
              90-120 seconds. Average must hold.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The practical implication: in early practice, set a 7.5-minute timer per passage and
              physically move on when it rings, even if you haven&apos;t finished. You will lose 1-2
              questions in your first few attempts; within 3-4 weeks, your reading speed and
              question-answering rhythm align to the timer and you stop leaving questions blank on
              the back half of the section.
            </p>
          </div>
        </section>

        {/* The 4 question types */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The 4 question types per passage
            </h2>
            <p className="text-slate-600 mb-8">
              Recognising the question type before you start solving cuts decision time. Each type
              has a different ideal approach.
            </p>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  type: 'Type 1 — Pure recall',
                  body: 'Asks a question whose answer is independent of the passage. Example: "which amino acid is most likely to be found buried in a protein interior?" These should be the fastest — answer from memory, do not re-read the passage. If you don\'t know it, eliminate two options and guess.',
                  approach: 'Approach: ~45 seconds. No passage re-read.',
                },
                {
                  type: 'Type 2 — Recall + passage integration',
                  body: 'Combines a known concept with a fact from the passage. Example: "given the passage\'s mutation, which downstream pathway is most affected?" Approach: identify the concept you need (pathway X), find the passage\'s relevant detail (mutation Y), combine.',
                  approach: 'Approach: ~75 seconds. One targeted passage lookup.',
                },
                {
                  type: 'Type 3 — Novel data interpretation',
                  body: 'Gives you a figure or table and asks for a value, a trend, or an inference. Example: "in figure 2, at substrate concentration 5 mM, what is the approximate enzyme velocity?" Approach: go straight to the figure, note units, read the value or the trend.',
                  approach: 'Approach: ~75 seconds. Figure-driven, not text-driven.',
                },
                {
                  type: 'Type 4 — Experimental design / prediction',
                  body: 'Asks you to predict the effect of changing a variable in the experiment. Example: "if the researchers had used a non-competitive inhibitor instead, the Vmax would..." Approach: name the concept (e.g., non-competitive inhibition lowers Vmax), apply it to the passage\'s setup.',
                  approach: 'Approach: ~100 seconds. Conceptual reasoning > passage navigation.',
                },
              ].map((q) => (
                <div
                  key={q.type}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{q.type}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-2">{q.body}</p>
                  <p className="text-xs text-teal-700 font-medium">{q.approach}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reading strategy: skim vs deep-read */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Reading strategy: skim, deep-read, or figures-first?
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The default workflow that scales across passage types: read the opening paragraph
              carefully (15-20 seconds), then jump to any figures or tables and study them carefully
              with attention to axis labels and units (60-90 seconds), then skim the remaining prose
              paragraphs (20-30 seconds, marking unfamiliar terms). Total reading time: roughly
              90-110 seconds. From there, you go straight to the questions.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The "answer first, justify later" mental move is critical. For most passage questions,
              you can form a tentative answer from your existing knowledge in 10-15 seconds, then
              use the next 30-60 seconds to confirm or refute it against the passage. This is faster
              than the inverse workflow (read passage carefully → derive answer from scratch).
              Confirmed-answer is much faster than derived-answer once you have the content depth.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Exception: experimental-design questions (type 4) usually require derived answers. The
              passage gives you the setup; the answer requires applying a concept (e.g., effect of
              non-competitive inhibition on Vmax) to that setup. For these, give yourself the full
              ~100 seconds and don&apos;t rush the reasoning.
            </p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Common passage-strategy mistakes
            </h2>
            <p className="text-slate-600 mb-8">
              Six patterns that explain the majority of B/B passage point losses we see in
              diagnostic mocks. Fix one of these and your B/B score moves 1-2 points.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Over-engaging with the passage',
                  body: "Reading every word of a 400-word passage takes 90-120 seconds at typical speed — and you don't need most of it. Strategic reading (opening + figures + skim) takes 60-90 seconds and gives you the same information for 80% of questions.",
                },
                {
                  title: 'Treating B/B like reading comprehension',
                  body: 'CARS strategies (structure mapping, author tone, main idea) do not transfer to B/B. Biology passages are content-dense, not argument-dense — you read for facts and figures, not for structure.',
                },
                {
                  title: 'Ignoring figure data on first pass',
                  body: 'Roughly half of B/B passage questions are answerable from figures alone. Students who treat figures as decoration during the first read end up making 3-4 round trips back to the same graph, costing 90+ seconds.',
                },
                {
                  title: 'Re-reading the same paragraph repeatedly',
                  body: "Once you've read a paragraph, re-reading it rarely produces new information — and almost never on a second pass that comes 5 minutes later. If you didn't get it the first time, mark the term and skip; the question will tell you whether you need to return.",
                },
                {
                  title: 'Lingering on the first question of every passage',
                  body: "Many students spend 90 seconds on each passage's first question (because they're still settling into the passage). This is a discipline issue — by question 2 you should be at full pace.",
                },
                {
                  title: 'Not tagging missed questions for error analysis',
                  body: "Without tagging each missed question as content-gap, reasoning-gap, or time-gap, you can't target your remaining study time. Most students discover their gaps are 60-70% reasoning + time and only 30-40% content — but pure content review is still where they spend their hours.",
                },
              ].map((m) => (
                <div key={m.title} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to drill passages */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How to drill MCAT biology passages productively
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Drill in blocks, not in singletons. A block is 4-5 passages back-to-back under timer,
              roughly mimicking the 35-40 minute density of a real B/B section. Single-passage
              practice is fine for the first 20-30 passages while you&apos;re still learning the
              structure, but after that point, block practice is where the time-management gains
              compound. Aim for 4-5 blocks per week in the final 6-8 weeks of prep.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Always run an error analysis after a block. For every missed question, tag the loss as
              one of three types. Content-gap: you didn&apos;t know the underlying biology — go read
              that section. Reasoning-gap: you knew the biology but misread the passage,
              misinterpreted the figure, or failed to integrate the data — drill more passages with
              similar question types. Time-gap: you knew the answer but ran out of time — work on
              pacing, not content. This three-bucket sort is the most important data point in the
              final stretch of MCAT prep.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Source quality matters. The hierarchy in descending priority: AAMC official material
              (Question Pack 1, Question Pack 2, Section Bank, four official full-length practice
              tests) ≫ Jack Westin / UWorld passages ≥ Kaplan passages ≥ everything else. Save AAMC
              officials for the last 6-8 weeks because they are the closest calibration to test-day
              style — there is no substitute for AAMC&apos;s own question writers.
            </p>
            <p className="text-slate-700 leading-relaxed">
              One concrete weekly rhythm that works for most students in the final 8 weeks: two
              passage blocks early in the week (Mon/Tue), one block of error analysis review (Wed),
              one full-length B/B section under timer (Sat), and one rest day. Repeat for 8 weeks
              and most students see 4-6 point B/B gains from passage strategy alone.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Passage-strategy coaching — pricing
            </h2>
            <p className="text-slate-600 mb-8">
              Passage strategy is bundled inside the full B/B programme — same three tiers. Ad-hoc
              passage-strategy tutoring outside the programme is $150/hour with senior faculty. USD
              only.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Self-Paced</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  300+ practice passages with explanations, recorded walkthroughs of all four
                  question types, AAMC official passage workflow guide, WhatsApp doubt access.
                </p>
              </div>
              <div className="bg-teal-50 rounded-xl p-6 border-2 border-teal-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Small-Batch</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$999</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Self-Paced plus weekly live passage blocks (4-6 students), monthly
                  full-length B/B mocks, senior-faculty error-analysis sessions, peer Slack.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">1:1 Senior Faculty</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$1,499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Small-Batch plus weekly 90-minute 1:1 passage drilling, personalised
                  error-tag scorecard, custom passage selection on weak topics, unlimited WhatsApp.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Ad-hoc tutoring: $150/hour with senior faculty for passage-strategy gap-fill sessions.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
              Passage Strategy — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {passageFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-slate-50 p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-teal-700 group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </h3>
                  </summary>
                  <p className="mt-4 leading-relaxed text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <BookOpen className="w-12 h-12 text-teal-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Train the MCAT skill no other biology exam tests.
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Talk to a Cerebrum passage-strategy coach on WhatsApp. We&apos;ll send a 4-passage
              diagnostic block and a tagged error-analysis worksheet before you commit.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Start passage strategy on WhatsApp
            </a>
          </div>
        </section>

        {/* Cross-link footer (neutral anchor) */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href="/mcat-biology-preparation"
              className="text-teal-700 hover:text-teal-900 font-medium underline"
            >
              See the full MCAT Biology programme
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
