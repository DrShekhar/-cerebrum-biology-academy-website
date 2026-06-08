import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Target,
  TrendingUp,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'

const URL = 'https://cerebrumbiologyacademy.com/usabo-6-month-prep-plan'

export const metadata: Metadata = {
  title: 'USABO 6-Month Prep Plan | Month-by-Month Schedule for the Open Exam',
  description:
    'A realistic 6-month USABO preparation plan for US high school students aiming at the February Open Exam. Month-by-month topics, weekly hours, books, past-paper drills, and the pitfalls that derail most candidates.',
  keywords: [
    'USABO 6 month prep plan',
    'how to prepare for USABO',
    'USABO study plan',
    'USABO preparation timeline',
    'USABO Open Exam prep',
    'USABO study schedule',
    'USABO month by month',
    'USABO from zero',
    'USABO with AP Biology background',
    'USABO weekly hours',
    'USABO Campbell Biology study plan',
    'USABO Alberts Lehninger',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'USABO 6-Month Prep Plan | Month-by-Month Schedule',
    description:
      'A realistic 6-month USABO preparation plan with weekly hours, monthly topics, and past-paper drills.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USABO 6-Month Prep Plan | Month-by-Month Schedule for the Open Exam',
    description: 'A realistic 6-month USABO preparation plan for US high school students aiming at the February Open Exam. Month-by-month topics, weekly hours, books, past-paper drills, and the pitfalls that derail ...',
  },
}

const months = [
  {
    n: 1,
    title: 'Month 1 — September: Foundation reset',
    weeklyHours: '8–10 hrs/week',
    goals: [
      'Read Campbell Biology Units 1–3 (chemistry of life, cell, energy) cover-to-cover',
      'Build a study journal — handwritten notes per chapter, focusing on figures',
      'Sit one diagnostic USABO Open paper from 2018–2020 to set a baseline',
    ],
    pitfall:
      'Skipping chemistry-of-life because "it\'s easy." USABO returns to amino-acid R-groups, peptide bonds, and buffer chemistry every year.',
  },
  {
    n: 2,
    title: 'Month 2 — October: Molecular & genetics depth',
    weeklyHours: '10–12 hrs/week',
    goals: [
      'Campbell Units 3–5 (genetics, molecular biology, gene regulation)',
      'Add Alberts Molecular Biology of the Cell — chapters 4, 6, 7, 8, 17',
      'Solve 1 USABO Open paper per week, time-boxed (50 minutes)',
      'Track weak topics in a spreadsheet — wrong answers by Campbell chapter',
    ],
    pitfall:
      'Reading Alberts cover-to-cover. It\'s a reference, not a textbook. Use it to dig into specific molecular mechanisms USABO has historically tested.',
  },
  {
    n: 3,
    title: 'Month 3 — November: Animal physiology + ethology',
    weeklyHours: '10–12 hrs/week',
    goals: [
      'Campbell Unit 7 (animal form & function, chapters 40–49) at full depth',
      'Read Tinbergen-style ethology references — fixed action patterns, kin selection, optimal foraging',
      'Solve 2 USABO Open papers per week + start Semifinal-format free-response practice',
      'Add Lehninger chapters 14–19 (metabolism) for biochem depth',
    ],
    pitfall:
      'Treating animal physiology as memorisation. USABO probes the mechanism — why the loop of Henle has descending vs ascending permeability, not just that it does.',
  },
  {
    n: 4,
    title: 'Month 4 — December: Plants + ecology + biostatistics',
    weeklyHours: '10–12 hrs/week',
    goals: [
      'Campbell Unit 6 (plant form & function) and Unit 8 (ecology) at depth',
      'Add Raven & Johnson Biology for taxonomic / botanical breadth',
      'Read a primer on chi-square, t-test, ANOVA interpretation — at least at the figure-reading level',
      '3 timed Open papers per week (now under exam conditions, no breaks)',
    ],
    pitfall:
      'Ignoring biostats. Recent USABO Open and Semifinal papers expect you to read a p-value table and infer the result. AP Biology under-trains this skill.',
  },
  {
    n: 5,
    title: 'Month 5 — January: Past-paper saturation + weak-area surgery',
    weeklyHours: '12–15 hrs/week',
    goals: [
      'Solve every available USABO Open paper from 2015–2024',
      'Re-solve the 3 papers where you scored lowest, now timed',
      'Surgery week: focus only on the bottom-3 topics from your spreadsheet',
      'Read past Semifinal papers if you\'re aiming beyond Open cutoff',
      'Stop adding new content; consolidate what you have',
    ],
    pitfall:
      'Adding more textbooks in January. The biology has to be in your head by now. January is for retrieval and pacing, not reading.',
  },
  {
    n: 6,
    title: 'Month 6 — February: Simulations + exam tactics',
    weeklyHours: '8–10 hrs/week (taper into exam)',
    goals: [
      '2 full Open simulations under exam conditions in week 1',
      'Targeted revision on weakest 3 topics from drill data',
      'Sleep, exercise, no all-nighters — exam form is now physical, not academic',
      'Day before: light review only, walk through a recent paper for confidence',
      'Sit USABO Open in week 2',
    ],
    pitfall:
      'Cramming the night before. USABO Open is a 50-minute pacing test as much as a knowledge test — fatigue costs more points than missing one obscure chapter.',
  },
]

const resources = [
  {
    name: 'Campbell Biology (12th ed)',
    role: 'Primary text — covers ~80% of Open Exam content',
    use: 'All 6 months',
  },
  {
    name: 'Alberts — Molecular Biology of the Cell',
    role: 'Molecular depth beyond Campbell — chromatin, DNA repair, cell signaling',
    use: 'Months 2–4',
  },
  {
    name: 'Lehninger — Principles of Biochemistry',
    role: 'Metabolism, enzyme kinetics, regulation',
    use: 'Months 3–4',
  },
  {
    name: 'Raven & Johnson — Biology',
    role: 'Taxonomic and botanical breadth',
    use: 'Month 4',
  },
  {
    name: 'USABO Past Papers (2015–2024)',
    role: 'Pacing + format familiarity',
    use: 'Months 2–6 (intensifying)',
  },
  {
    name: 'CEE / USABO official syllabus',
    role: 'Authoritative scope of the exam',
    use: 'Reference',
  },
]

const faqs = [
  {
    question: 'Is 6 months enough to prepare for USABO from scratch?',
    answer:
      'For a strong honors-biology student, yes — but assume 12–15 hrs/week from December onwards. If you\'re starting from zero biology, 9 months is more realistic. If you have AP-5 already, 6–8 weeks of focused bridging work is typically enough to clear Open.',
  },
  {
    question: 'How many hours per week is realistic on top of school?',
    answer:
      'Months 1–4: 8–12 hrs/week including reading, drills, and reviews. Months 5–6: 12–15 hrs/week as past-paper volume rises. Junior-year students juggling AP coursework typically protect Sunday mornings + 2 weekday evenings.',
  },
  {
    question: 'Should I read all of Alberts and all of Lehninger?',
    answer:
      'No. Both are reference texts, not start-to-finish reads. Alberts: chapters 4, 6, 7, 8, 17 are the highest-yield. Lehninger: chapters 14–19 (metabolism) and the enzyme kinetics chapter. Use them when a USABO past-paper question reveals you need more depth on a specific mechanism.',
  },
  {
    question: 'What if I miss the February Open Exam?',
    answer:
      'You take it next year. Many USA Finalists qualified on their second or third attempt. Use the year for deeper Alberts and Lehninger reading, and for ethology / biosystematics — the units that take longest to internalize.',
  },
  {
    question: 'Can my school still register if it\'s not currently a USABO school?',
    answer:
      'Yes — schools can register annually with the Center for Excellence in Education (CEE), which administers USABO. Registration is generally inexpensive and any US high school can sign up. Speak to your AP Biology teacher first; if they\'re willing to coordinate, the path is straightforward.',
  },
  {
    question: 'Do I need a tutor, or can I self-study?',
    answer:
      'Self-study is workable for the Open Exam if you\'re disciplined and have access to past papers and the reference set. A tutor adds the most value at three points: (1) building the right monthly plan up front, (2) interpreting your past-paper mistakes correctly, and (3) Semifinal preparation, where free-response analytical reasoning is hard to self-grade.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'USABO Coaching',
      item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    },
    { '@type': 'ListItem', position: 3, name: '6-Month Prep Plan', item: URL },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to prepare for the USABO Open Exam in 6 months',
  description:
    'A month-by-month preparation plan for US high school students sitting the USA Biology Olympiad Open Exam in February.',
  totalTime: 'P6M',
  url: URL,
  inLanguage: 'en-US',
  step: months.map((m) => ({
    '@type': 'HowToStep',
    position: m.n,
    name: m.title,
    text: m.goals.join(' '),
    timeRequired: 'P1M',
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'USABO 6-Month Prep Plan: Month-by-Month Schedule for the Open Exam',
  url: URL,
  inLanguage: 'en-US',
  datePublished: '2026-04-29',
  dateModified: '2026-04-29',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: 'https://cerebrumbiologyacademy.com/logo.png' },
  },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType: 'USA-based high school students preparing for the USA Biology Olympiad Open Exam',
  },
}

export default function USABO6MonthPrepPlanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-white">
        <nav className="bg-gray-100 py-3 px-4">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">Home</Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <Link href="/usabo-coaching" className="text-gray-600 hover:text-teal-600">USABO Coaching</Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
                <span className="text-teal-700 font-medium">6-Month Prep Plan</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              September → February
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              USABO 6-Month Prep Plan
              <span className="block text-yellow-400 mt-2">Month-by-month schedule for Open Exam</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              A realistic, week-by-week roadmap for US high-school students sitting the USABO Open
              Exam in February. Includes monthly goals, reading lists, weekly hour expectations,
              and the specific pitfalls that derail most first-time candidates.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              Designed for students with a strong honors-biology background. AP-5 students can
              compress the first three months — see our{' '}
              <Link href="/ap-biology-vs-usabo" className="text-yellow-300 underline hover:text-yellow-200">
                AP Biology vs USABO bridge
              </Link>
              {' '}for the 6-week version.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition">
                <MessageCircle className="w-5 h-5" />
                Get a personalised plan
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See full programme
              </Link>
            </div>
          </div>
        </section>

        {/* Months */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              Month-by-month plan
            </h2>
            <div className="space-y-5">
              {months.map((m) => (
                <div
                  key={m.n}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{m.title}</h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      <Clock className="w-4 h-4" /> {m.weeklyHours}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {m.goals.map((g) => (
                      <li key={g} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">
                      <strong>Common pitfall: </strong>
                      {m.pitfall}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Reference set</h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              The books and resources that earn their place in a USABO library. Buy in this
              order — Campbell first; Alberts and Lehninger only after you start hitting Campbell&apos;s
              ceiling.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {resources.map((r) => (
                <div key={r.name} className="bg-white rounded-xl p-5 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-1">{r.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{r.role}</p>
                  <span className="inline-block text-xs font-medium text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                    {r.use}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What success looks like */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-7 h-7 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                What &quot;on track&quot; looks like by month
              </h2>
            </div>
            <ul className="space-y-3 mt-6">
              <li className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>End of Month 2:</strong> Diagnostic Open paper now scoring 50% (started
                  near 30% in Month 1).
                </span>
              </li>
              <li className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>End of Month 4:</strong> Consistently 65–70% on past Open papers under
                  timed conditions.
                </span>
              </li>
              <li className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>End of Month 5:</strong> Hitting 75%+ on most papers; weak-topic spread
                  has narrowed to two units.
                </span>
              </li>
              <li className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Day before exam:</strong> One light run-through, no new content.
                  Confidence comes from repetition, not novelty.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-xl border border-slate-200 open:shadow-md"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <GraduationCap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want a plan tailored to your starting point?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We coach the full pathway in US time zones — from Month 1 reading to USABO Finalist
              and the IBO selection camp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition">
                <MessageCircle className="w-5 h-5" />
                Book a free counselling call
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See USABO programme
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/ap-biology-vs-usabo" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">Bridge guide for AP-5 students</p>
              </Link>
              <Link href="/usabo-coaching" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Full Open + Semifinal pathway</p>
              </Link>
              <Link href="/usabo-past-papers" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">USABO Past Papers</h3>
                <p className="text-xs text-slate-600 mt-1">2015–2024 archive</p>
              </Link>
              <Link href="/ibo-preparation" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">IBO Preparation</h3>
                <p className="text-xs text-slate-600 mt-1">After USABO Finalist</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
