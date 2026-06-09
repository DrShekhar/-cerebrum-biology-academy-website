import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertCircle,
  Award,
  Calendar,
  ChevronRight,
  ExternalLink,
  Info,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'

const URL = 'https://cerebrumbiologyacademy.com/usabo-2026-results'

export const metadata: Metadata = {
  title: 'USABO 2026 Results, Cutoffs & Dates | Open Exam, Semifinal, Finalists',
  description:
    'USABO 2026 Open Exam date, Semifinal date, expected cutoffs, and the historical cutoff range for Semifinalist qualification. Plus the 2025 results recap and what they tell us about Cerebrum students who qualified.',
  keywords: [
    'USABO 2026 results',
    'USABO 2026 cutoff',
    'USABO Semifinalist cutoff 2026',
    'USABO 2026 Open Exam date',
    'USABO 2026 Semifinal date',
    'USABO Finalists 2026',
    'USABO 2025 results',
    'USABO 2025 cutoff',
    'USABO results announcement',
    'USABO scoring distribution',
    'USABO national finalists',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'USABO 2026 Results, Cutoffs & Dates',
    description:
      'USABO 2026 Open Exam + Semifinal dates, expected cutoffs, and 2025 results recap.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'USABO 2026 Results, Cutoffs & Dates | Open Exam, Semifinal, Finalists',
    description: 'USABO 2026 Open Exam date, Semifinal date, expected cutoffs, and the historical cutoff range for Semifinalist qualification. Plus the 2025 results recap and what they tell us about Cerebrum student...',
  },
}

const expectedDates = [
  {
    stage: 'USABO Open Exam',
    expectedWindow: 'First or second week of February 2026',
    format: '50 MCQ, 50 minutes, school-administered, single sitting',
    nextStep: 'Top performers (~10% of registrants) advance to the Semifinal',
  },
  {
    stage: 'USABO Semifinal',
    expectedWindow: 'Mid-March 2026',
    format: 'Theory + free-response, 3 hours, individually proctored',
    nextStep: 'Top ~20 students nationally are designated USABO Finalists',
  },
  {
    stage: 'USABO National Finals',
    expectedWindow: 'Late May / early June 2026',
    format: 'Multi-day camp at a host university — theory, lab, and ethics rounds',
    nextStep: 'Top 4 form the US team for IBO 2026',
  },
  {
    stage: 'IBO 2026',
    expectedWindow: 'July 2026',
    format: 'Hosted by the year\'s designated country — 80+ nations compete',
    nextStep: 'Medals (Gold ~10%, Silver ~20%, Bronze ~30%)',
  },
]

const historicalCutoffs = [
  {
    year: '2024',
    openCutoff: 'Approximately 30/50 to advance to Semifinal',
    semifinalNote: 'Semifinalist field of ~750 students; Finalist top 20 announced in late March',
    teamHost: 'IBO 2024 hosted in Astana, Kazakhstan — US team brought home 4 medals',
  },
  {
    year: '2023',
    openCutoff: 'Approximately 29/50 to advance to Semifinal',
    semifinalNote: 'Strong year for biostats-heavy questions; Finalist scoring concentrated tightly',
    teamHost: 'IBO 2023 hosted in Al Ain, UAE — US team standard medal performance',
  },
  {
    year: '2022',
    openCutoff: 'Approximately 28/50 to advance to Semifinal',
    semifinalNote: 'First post-COVID return to full normal-format Semifinal',
    teamHost: 'IBO 2022 hosted in Yerevan, Armenia',
  },
]

const liveTracker = [
  {
    label: 'Registration window',
    statusKey: 'window-2026',
    statusText: 'Schools register through CEE — opens September; closes January',
  },
  {
    label: 'Open Exam date — confirmed',
    statusKey: 'open-date',
    statusText: 'Will be confirmed by CEE in late autumn 2025',
  },
  {
    label: 'Open Exam cutoff (this year)',
    statusKey: 'open-cutoff',
    statusText: 'Will be published once the Open is graded — expected early March 2026',
  },
  {
    label: 'Semifinalist list',
    statusKey: 'semifinalist',
    statusText: 'Released by CEE in early/mid March',
  },
  {
    label: 'Finalist list (Top 20)',
    statusKey: 'finalist',
    statusText: 'Released by CEE in late March / early April',
  },
  {
    label: 'IBO 2026 team (Top 4)',
    statusKey: 'team',
    statusText: 'Announced after the National Finals camp in late May / early June',
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
    { '@type': 'ListItem', position: 3, name: 'USABO 2026 Results & Dates', item: URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'USABO 2026 Results, Cutoffs & Dates',
  url: URL,
  inLanguage: 'en-US',
  datePublished: '2026-04-29',
  dateModified: '2026-06-08',
  author: { '@type': 'Organization', name: 'Cerebrum Biology Academy' },
  publisher: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
    logo: { '@type': 'ImageObject', url: 'https://cerebrumbiologyacademy.com/logo.png' },
  },
  about: [
    { '@type': 'Thing', name: 'USABO 2026' },
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
    { '@type': 'Thing', name: 'Biology Olympiad Cutoffs' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'USA-based high school students and parents tracking USABO 2026 dates, cutoffs, and results',
  },
}

export default function USABO2026ResultsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
                <span className="text-teal-700 font-medium">USABO 2026 Results & Dates</span>
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
              Live tracker for USABO 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              USABO 2026 Results,
              <span className="block text-yellow-400 mt-2">Cutoffs & Dates</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              Everything we know about the 2026 cycle — Open Exam window (early February),
              Semifinal date (mid-March), expected cutoff ranges based on 2022–2024 history, and a
              live tracker for cutoffs and Finalist announcements once CEE publishes them.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              All exam dates and cutoffs are confirmed by the Center for Excellence in Education
              (CEE), which administers USABO. The numbers below are factual where stated and
              labelled &quot;expected&quot; or &quot;historical range&quot; everywhere we&apos;re
              estimating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition">
                <MessageCircle className="w-5 h-5" />
                Get notified on cutoff release
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See USABO programme
              </Link>
            </div>
          </div>
        </section>

        {/* Important note */}
        <section className="py-8 bg-amber-50 border-y border-amber-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div className="text-sm text-amber-900">
                <strong>This page is updated as CEE releases data.</strong> The Open Exam date,
                cutoff, and Semifinalist list are published by CEE through their member schools and
                the official USABO portal. We post updates here within 48 hours of each
                announcement. For real-time confirmation always check the CEE / USABO official
                website directly.
              </div>
            </div>
          </div>
        </section>

        {/* Expected dates */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                USABO 2026 expected dates
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Stage-by-stage windows based on the historical USABO calendar. CEE confirms specific
              dates each autumn.
            </p>
            <div className="space-y-4">
              {expectedDates.map((d, i) => (
                <div
                  key={d.stage}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold mr-2">
                        {i + 1}
                      </span>
                      {d.stage}
                    </h3>
                    <span className="text-sm font-medium text-teal-700 bg-teal-100 px-3 py-1 rounded-full mt-2 md:mt-0">
                      {d.expectedWindow}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2 md:ml-8">
                    <strong>Format: </strong>{d.format}
                  </p>
                  <p className="text-sm text-slate-700 md:ml-8">
                    <strong>Next step: </strong>{d.nextStep}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live tracker */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-7 h-7 text-orange-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                USABO 2026 live tracker
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Status updates as CEE releases each milestone. Subscribe via WhatsApp to get notified
              within 24 hours of each announcement.
            </p>
            <div className="space-y-3">
              {liveTracker.map((row) => (
                <div
                  key={row.statusKey}
                  className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-xl p-4 border border-slate-200"
                >
                  <span className="font-semibold text-slate-900">{row.label}</span>
                  <span className="text-sm text-slate-700 mt-1 md:mt-0 md:text-right">
                    {row.statusText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Historical cutoffs */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-7 h-7 text-yellow-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Historical cutoffs (2022–2024)
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              The Open Exam cutoff to advance to the Semifinal has historically sat around the
              28–30/50 mark, depending on year difficulty. Use this as a calibration target — but
              CEE sets the cutoff each year based on the actual score distribution.
            </p>
            <div className="space-y-4">
              {historicalCutoffs.map((y) => (
                <div key={y.year} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">USABO {y.year}</h3>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li>
                      <strong>Open cutoff: </strong>{y.openCutoff}
                    </li>
                    <li>
                      <strong>Semifinal: </strong>{y.semifinalNote}
                    </li>
                    <li>
                      <strong>IBO link: </strong>{y.teamHost}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-xl flex gap-3">
              <Info className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <strong>How to use these:</strong> if you&apos;re consistently scoring 30+/50 on
                past Open papers under timed conditions, you&apos;re in Semifinalist range. 35+/50
                puts you in serious Finalist contention. 40+/50 is the team-camp tier.
              </p>
            </div>
          </div>
        </section>

        {/* Sources & disclaimer */}
        <section className="py-12 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Sources & disclaimer</h2>
            <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside">
              <li>
                Official source for dates and cutoffs:{' '}
                <a
                  href="https://www.usabo-trc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline inline-flex items-center gap-1"
                >
                  USABO official portal (CEE)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                Historical cutoffs are from publicly published USABO records and member-school
                announcements — they are estimates of the official cutoff and not exact figures.
              </li>
              <li>
                Cerebrum Biology Academy is an independent coaching provider and is not affiliated
                with CEE or the USABO administration.
              </li>
              <li>
                We update this page within 48 hours of each official announcement.
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get the cutoff alert via WhatsApp
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We&apos;ll notify you within 24 hours of CEE&apos;s Open cutoff and Semifinalist list
              releases, plus next-steps guidance for either outcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition">
                <MessageCircle className="w-5 h-5" />
                Subscribe to alerts
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-6-month-prep-plan"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <Calendar className="w-5 h-5" />
                See 6-month prep plan
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Related guides</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/usabo-coaching" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">USABO Coaching</h3>
                <p className="text-xs text-slate-600 mt-1">Full pathway preparation</p>
              </Link>
              <Link href="/ap-biology-vs-usabo" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">Bridge guide for AP-5 students</p>
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
