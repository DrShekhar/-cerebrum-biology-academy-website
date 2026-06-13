/**
 * /mcat-biology-bb-section-prep
 *
 * Section-specific landing page targeting the primary keyword
 * "MCAT B/B section prep" — the deepest treatment on the site of just
 * the Biological & Biochemical Foundations of Living Systems section.
 *
 * Distinct from /mcat-biology-preparation (broad hub) and
 * /ap-biology-vs-college-bio-mcat-bridge (pipeline comparison).
 *
 * Server component. No client state. Plain WhatsApp anchors.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  ChevronRight,
  Clock,
  Home,
  MessageCircle,
  Microscope,
  Target,
  TrendingUp,
} from 'lucide-react'

const CANONICAL = '/mcat-biology-bb-section-prep'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const PAGE_URL = `${SITE_URL}${CANONICAL}`

const WHATSAPP_HREF = `https://wa.me/918826444334?text=${encodeURIComponent(
  'Hi! I want focused MCAT B/B section prep (Bio/Biochem). Please share the programme details and a personalised study plan.'
)}`

export const metadata: Metadata = {
  title: 'MCAT B/B Section Prep | Bio/Biochem Foundations | Cerebrum',
  description:
    'MCAT B/B section prep — Biological & Biochemical Foundations. AAMC content outline mapping, 300+ passage drills, 125+ score targeting from biology-specialist faculty.',
  keywords: [
    'MCAT B/B section prep',
    'MCAT Bio/Biochem section',
    'MCAT Biological and Biochemical Foundations',
    'MCAT Section 1 prep',
    'MCAT B/B 125+',
    'MCAT Bio Biochem study plan',
    'AAMC B/B content outline',
    'MCAT 59 questions section',
    'MCAT biology section coaching',
    'MCAT Bio/Biochem score targeting',
    'MCAT B/B passage practice',
    'MCAT first section strategy',
  ],
  openGraph: {
    title: 'MCAT B/B Section Prep — Biological & Biochemical Foundations',
    description:
      '59 questions, 95 minutes, scored 118-132. Bio specialist coaching for the B/B section — AAMC outline, passage drills, 125+ targeting.',
    type: 'article',
    url: PAGE_URL,
    siteName: 'Cerebrum Biology Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCAT B/B Section Prep',
    description:
      'Biological & Biochemical Foundations — section-specific prep from biology specialists.',
  },
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
}

const bbFAQs = [
  {
    question: 'What is the MCAT B/B section and how is it scored?',
    answer:
      'The B/B section — formally Biological and Biochemical Foundations of Living Systems — is the first scored section of the MCAT. It contains 59 multiple-choice questions answered in 95 minutes and is scored on a scale of 118-132, with 125 as the scaled midpoint. Roughly 65% of the questions are introductory biology, ~25% are biochemistry, and the remaining ~10% are split between general chemistry and organic chemistry as they relate to living systems. About 44 of the 59 questions are passage-based (grouped in sets of 4-7 questions per passage); the rest are discrete questions independent of any passage.',
  },
  {
    question: 'How many B/B questions come from passages versus discrete questions?',
    answer:
      'AAMC builds the B/B section around 10 passages with 4-7 associated questions each, plus 15 discrete questions intermixed throughout the section. Passages mean you must read a 200-400 word stimulus (often with one or more figures or tables) before answering the question set. Discrete questions look like a single stem with four options and no passage. The passage-based questions are where most students lose time, not points — managing the 96-second per-question average is the actual challenge.',
  },
  {
    question: 'What B/B score should I target for a competitive medical school application?',
    answer:
      'A 125 on B/B is the scaled midpoint of the section. A 127 is roughly the median for accepted MD applicants in recent AAMC matriculant data. A 128+ puts you comfortably in the range of 515+ total-score applicants who target top-25 programmes. For students aiming at the very top of US allopathic admissions (Harvard, Hopkins, Stanford, NYU), B/B section scores of 129-130 are typical because the section rewards depth in biology — the area Indian-American and NRI students often bring strongest from their pre-med coursework.',
  },
  {
    question: 'Why do biology specialists outperform generalist tutors on the B/B section?',
    answer:
      'Generalist MCAT tutors (other generalist MCAT brands) rotate faculty across all four sections of the MCAT — the same instructor who teaches you C/P passages on Monday teaches B/B passages on Wednesday. Biology specialists, by design, only teach biology and biochemistry, which lets them go deeper on the integrative passage questions where two or three biology concepts meet. For example, a metabolism passage that links enzyme kinetics + glycolysis regulation + diabetes physiology is one question to a specialist and three context-switches to a generalist. This depth is structural, not a marketing claim.',
  },
  {
    question: 'How long should I prepare specifically for the B/B section?',
    answer:
      'Most students do well with 8-12 weeks of focused B/B preparation alongside their broader MCAT plan, totalling roughly 120-160 hours just on this section. Phase one (~3 weeks) covers Campbell Biology content review with AAMC outline mapping. Phase two (~3 weeks) layers in first-semester biochemistry from Lehninger. Phase three (~3-4 weeks) is passage drilling — at least 100 AAMC-style passages with timed full-length practice. Students who already have AP Biology or first-year undergraduate biology can compress phase one; students rebuilding from a NEET / IB background should plan the full timeline.',
  },
  {
    question: 'What are the most common failure modes on the B/B section?',
    answer:
      'Four patterns recur. First, running out of time — students linger too long on the first 2-3 passages and then rush the final 20 questions. Second, over-memorising — students arrive having memorised Campbell chapters but freeze when a passage presents a novel enzyme or pathway they have never seen, even though all the data they need is in the passage. Third, ignoring biochemistry — Campbell-only students underprepare for the ~25% of the section that is biochemistry-dense (amino acids, enzyme kinetics, metabolism integration). Fourth, treating B/B like a reading comprehension test — re-reading every passage line-by-line when the questions are mostly answerable from the figures, tables, and 1-2 key sentences.',
  },
]

export default function MCATBBSectionPrepPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'MCAT B/B Section Prep — Biological & Biochemical Foundations',
    description:
      'Section-specific MCAT preparation for the Biological and Biochemical Foundations of Living Systems section. AAMC content outline mapping, passage drilling, biochemistry integration, 125+ score targeting.',
    url: PAGE_URL,
    inLanguage: 'en-US',
    availableLanguage: ['English'],
    educationalLevel: 'Pre-Medical',
    coursePrerequisites:
      'Introductory undergraduate biology; first-semester biochemistry recommended',
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
    mainEntity: bbFAQs.map((f) => ({
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
        name: 'B/B Section Prep',
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
                <span className="text-blue-700 font-medium">B/B Section Prep</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Microscope className="w-4 h-4" />
              MCAT Section 1 · 59 questions · 95 minutes · scored 118-132
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              MCAT B/B Section Prep —
              <span className="block text-blue-300 mt-2">
                Master the Biological &amp; Biochemical Foundations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl leading-relaxed">
              The deepest section-specific preparation on the web for the Biological and Biochemical
              Foundations of Living Systems. Built around the AAMC content outline, taught by
              biology specialists, drilled on 300+ passages — designed for students targeting a 125+
              on B/B alone and a 515+ overall.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Clock className="w-4 h-4 text-blue-300" />
                8-12 week timeline
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <Target className="w-4 h-4 text-blue-300" />
                125+ score targeting
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-sm">
                <TrendingUp className="w-4 h-4 text-blue-300" />
                AAMC content outline aligned
              </span>
            </div>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Talk to a B/B specialist on WhatsApp
            </a>
          </div>
        </section>

        {/* What the B/B section actually is */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              What the B/B section actually is
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The Biological and Biochemical Foundations of Living Systems section — universally
              shortened to B/B — is the first scored section you sit on test day. It runs 59
              questions in 95 minutes and is scored on a 118-132 scale where 125 is the scaled
              midpoint. Roughly 65% of the question content is introductory biology (cell biology,
              molecular biology, genetics, physiology, evolution), ~25% is biochemistry (amino
              acids, enzyme kinetics, metabolism), ~5% is general chemistry as it relates to living
              systems (acid-base, thermodynamics), and ~5% is organic chemistry (functional groups,
              biological reaction mechanisms).
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              The section weighs roughly 25% of your total MCAT score — your B/B scaled score is one
              of the four sections that add up to your composite score of 472-528. Because B/B is
              the section most heavily dependent on biology depth, it is also the section where
              Indian-American and NRI students consistently outperform when coached by a biology
              specialist rather than a generalist test-prep instructor.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Structurally, B/B presents 10 passages with 4-7 associated questions per passage,
              interspersed with 15 discrete (non-passage) questions. You see one passage at a time,
              must answer its full question set, then advance. This format penalises students who
              over-engage with passages and rewards students who read strategically and return to
              difficult questions later.
            </p>
          </div>
        </section>

        {/* AAMC content outline */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              The AAMC content outline (concise)
            </h2>
            <p className="text-slate-600 mb-8">
              AAMC publishes a content outline for B/B organised into four Foundational Concepts.
              Cerebrum&apos;s curriculum is mapped one-to-one against this outline so nothing in our
              coverage is wasted on off-syllabus material.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  code: '1A-1D',
                  title: 'Foundational Concept 1 — Biomolecules',
                  body: 'Structure and function of proteins, nucleic acids, carbohydrates, and lipids. Amino acid chemistry, protein folding, enzyme kinetics, DNA replication and repair, transcription, translation, gene regulation. The most biochemistry-heavy block.',
                },
                {
                  code: '2A-2C',
                  title: 'Foundational Concept 2 — Cell & Organism Systems',
                  body: 'Cell membrane transport, organelle structure and function, cellular respiration and metabolism, cell cycle and division, viral and microbial biology. The block where Campbell Biology coverage is densest.',
                },
                {
                  code: '3A-3B',
                  title: 'Foundational Concept 3 — Organ Systems',
                  body: 'Cardiovascular, respiratory, renal, gastrointestinal, endocrine, immune, nervous, reproductive, integumentary, and musculoskeletal systems. Tested in the context of integrative passages, often with clinical scenarios.',
                },
                {
                  code: '4A-4F (B/B-relevant)',
                  title: 'Foundational Concept 4 — Living Systems Chemistry',
                  body: 'Translational physics and chemistry that show up in B/B — primarily acid-base equilibria, redox chemistry of metabolism, and thermodynamics of biological reactions. Lighter coverage than the C/P section.',
                },
              ].map((c) => (
                <div
                  key={c.code}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm"
                >
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-2">
                    {c.code}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6 italic">
              Source: AAMC Official Guide to the MCAT Exam. Content outline subject to AAMC updates;
              Cerebrum syncs curriculum to current AAMC publications each admissions cycle.
            </p>
          </div>
        </section>

        {/* Score targeting */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Score targeting on B/B
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The B/B scaled score range is 118-132. A 125 sits at the scaled midpoint and
              corresponds, in recent AAMC percentile tables, to roughly the 50th percentile of all
              test-takers. A 127 is around the section median for matriculated MD students at US
              allopathic schools. A 128 or higher puts you in the top quartile for B/B and is the
              practical floor for students applying to programmes with median total scores of 518+.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              We coach students by the gap between their starting diagnostic and their target. A
              student with a baseline of 121 targeting 128 has a +7 point gap and should plan
              roughly 200 hours of focused B/B work alongside the rest of their MCAT prep. A student
              starting at 124 targeting 127 has a tighter +3 gap and can usually achieve it in
              80-100 focused hours, mostly through passage drilling rather than additional content
              review.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Score plateaus on B/B above 128 are almost always a passage-strategy problem, not a
              content gap. Students who plateau between 126 and 128 typically know the biology cold
              but are losing 2-3 points to time management or to over-reading dense passages.
            </p>
          </div>
        </section>

        {/* Why bio specialists do this section better */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Why biology specialists handle this section differently
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Generalist test-prep agencies (other generalist MCAT brands, other generalist MCAT
              brands) build their products around a single instructor or small team covering all
              four MCAT sections. That model works for CARS and for the chemistry-heavy C/P section
              because they reward a consistent test-taking framework. It works less well for B/B
              because the integrative biology passages reward depth that generalist teaching cannot
              provide across the breadth of MCAT content.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              A typical hard B/B passage might combine an unfamiliar enzyme&apos;s kinetics, a
              regulatory pathway from the Krebs cycle, and a clinical scenario involving a metabolic
              disorder. For a biology specialist, that is one integrated question — they routinely
              draw the regulatory diagram from memory, recognise the kinetics pattern, and explain
              the clinical link. For a generalist who teaches biology two days a week and physics
              two days a week, that same question is three context-switches. Students notice the
              difference in the quality of explanations after about four sessions.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Cerebrum exists because biology specialists provide structurally better B/B coaching.
              Most of our students pair our B/B section work with a generalist provider for the C/P
              and CARS sections — we don&apos;t pretend to be the right fit for full-stack MCAT
              prep, and this honesty is part of our positioning.
            </p>
          </div>
        </section>

        {/* Failure modes */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Common failure modes on B/B
            </h2>
            <p className="text-slate-600 mb-8">
              Four patterns explain the majority of B/B score plateaus we see in diagnostic mocks.
              Each one is fixable — but only after the student recognises which one is theirs.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: 'Running out of time on the back half',
                  body: 'Students linger on the first 2-3 passages, build a false confidence from getting those right, then realise at question 40 that they have 25 minutes left for 19 questions. The fix is a strict 8.5-minute cap per passage on practice runs, enforced by an audible timer.',
                },
                {
                  title: 'Over-memorising for a passage-based test',
                  body: 'B/B does not reward knowing every fact in Campbell — it rewards being able to apply core principles to passages with novel enzymes, novel pathways, and novel data. Students who treat B/B like a memorisation test underperform students with weaker raw content knowledge but better passage reasoning.',
                },
                {
                  title: 'Ignoring biochemistry integration',
                  body: 'Campbell-only students underprepare for the ~25% of the section that is biochemistry-dense. AAMC writes metabolism passages that require integrating enzyme kinetics + regulatory pathways + clinical context. Without first-semester biochemistry (Lehninger), these passages routinely lose 3-5 points.',
                },
                {
                  title: 'Treating passages like reading comprehension',
                  body: 'The best B/B test-takers read passages strategically — they skim the introduction, study the figures, note any unfamiliar terms in 30 seconds, and start answering. Students who read line-by-line lose 1-2 minutes per passage to a section that gives them 9.5 minutes per passage on average.',
                },
              ].map((m) => (
                <div key={m.title} className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{m.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How Cerebrum coaches this */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              How Cerebrum coaches the B/B section
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Our B/B programme runs in three phases. Phase one is Campbell Biology end-to-end with
              chapter-level mapping to the AAMC content outline — we mark which Campbell sections
              are AAMC-tested, which are tested only in passages, and which can be safely skipped.
              This phase typically takes 3-4 weeks for a student starting from undergraduate
              biology, longer for students rebuilding from NEET or IB Biology backgrounds.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Phase two layers in first-semester biochemistry via Lehninger Principles of
              Biochemistry. We focus on the chapters that map to AAMC&apos;s biomolecules outline:
              amino acid structure, protein folding, enzyme kinetics, glycolysis, the citric acid
              cycle, oxidative phosphorylation, fatty acid metabolism, and metabolic regulation.
              This is the phase Campbell-only prep skips, and it&apos;s where most students recover
              the biggest score gains.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Phase three is passage drilling. We provide 300+ B/B-style passages, weekly timed
              passage blocks, and full-length B/B mocks every two weeks. Senior faculty review every
              missed passage in 1:1 sessions and identify whether the loss was a content gap, a
              passage-reading gap, or a time-management gap. This diagnostic layer is where most
              students see their B/B score move 3-5 points in the final 6 weeks of prep.
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              MCAT B/B section coaching — pricing
            </h2>
            <p className="text-slate-600 mb-8">
              Three product tiers for the full B/B programme. Ad-hoc tutoring outside the programme
              is $150/hour with senior faculty. All pricing in USD — our audience is Indian-American
              and NRI families paying in dollars.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">Self-Paced</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Async coverage of Campbell + Lehninger, AAMC outline mapping, 300+ practice
                  passages, recorded video library, WhatsApp doubt access.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Small-Batch</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$999</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Self-Paced plus weekly 2-hour live sessions (4-6 students max),
                  monthly full-length B/B mocks, peer Slack channel, senior faculty office hours.
                </p>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-1">1:1 Senior Faculty</h3>
                <div className="text-3xl font-bold text-slate-900 mb-1">$1,499</div>
                <p className="text-xs text-slate-600 mb-4">full programme · 4-6 months</p>
                <p className="text-sm text-slate-700">
                  Everything in Small-Batch plus weekly 90-minute 1:1 video sessions, personalised
                  study plan, custom passage drilling on weak topics, unlimited WhatsApp faculty
                  access.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6">
              Ad-hoc tutoring: $150/hour with senior faculty for gap-fill sessions outside a
              packaged programme.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
              B/B Section — Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {bbFAQs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-gray-200 bg-white p-6 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none">
                    <h3 className="flex items-center justify-between text-lg font-semibold text-gray-900">
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-blue-600 group-open:rotate-180 transition-transform">
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
        <section className="py-16 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <BookOpen className="w-12 h-12 text-blue-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Ready to target 125+ on the B/B section?</h2>
            <p className="text-lg text-slate-300 mb-8">
              Talk to a Cerebrum biology specialist on WhatsApp. We&apos;ll send a diagnostic
              passage set and review your target score before you commit to a programme.
            </p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Start B/B section prep on WhatsApp
            </a>
          </div>
        </section>

        {/* Cross-link footer (neutral anchor) */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href="/mcat-biology-preparation"
              className="text-blue-700 hover:text-blue-900 font-medium underline"
            >
              See the full MCAT Biology programme
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
