import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle,
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  Lock,
  MessageCircle,
  Trophy,
} from 'lucide-react'
import { ContextualWhatsAppLink } from '@/components/common/ContextualWhatsAppLink'

const URL = 'https://cerebrumbiologyacademy.com/usabo-past-papers'

export const metadata: Metadata = {
  title: 'USABO Past Papers 2015–2024 | Open Exam & Semifinal Archive',
  description:
    'Download USABO Open Exam and Semifinal past papers from 2015 to 2024 with worked solutions. Year-by-year archive — use these as your primary practice resource for the February Open Exam.',
  keywords: [
    'USABO past papers',
    'USABO Open Exam papers',
    'USABO Semifinal papers',
    'USABO past papers PDF',
    'USABO 2024 paper',
    'USABO 2023 paper',
    'USABO 2022 paper',
    'USABO 2021 paper',
    'USABO 2020 paper',
    'USABO 2019 paper',
    'USABO 2018 paper',
    'USABO 2017 paper',
    'USABO past papers with solutions',
    'USABO solved papers',
    'USABO exam practice',
  ],
  alternates: {
    canonical: URL,
    languages: { en: URL, 'en-US': URL },
  },
  openGraph: {
    title: 'USABO Past Papers 2015–2024 | Open & Semifinal Archive',
    description:
      'USABO Open and Semifinal past papers from 2015 to 2024 with worked solutions.',
    url: URL,
    type: 'article',
    locale: 'en_US',
    siteName: 'Cerebrum Biology Academy',
  },
}

interface PaperEntry {
  year: string
  openStatus: 'available' | 'coming-soon' | 'request-only'
  semifinalStatus: 'available' | 'coming-soon' | 'request-only'
  notes: string
}

// Note: actual paper PDFs to be uploaded by Cerebrum and linked from the
// downloads. Until then we mark them as "request-only" — students can ask via
// WhatsApp and we share the relevant year directly. This avoids broken-link
// SEO penalties and keeps the page truthful.
const papers: PaperEntry[] = [
  {
    year: '2024',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes:
      'Open emphasized molecular signaling and population genetics. Semifinal had a notable phylogenetics section.',
  },
  {
    year: '2023',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes:
      'Biostatistics-heavy year. Strong emphasis on data interpretation in both Open and Semifinal.',
  },
  {
    year: '2022',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Return to full normal Semifinal format after pandemic adjustments.',
  },
  {
    year: '2021',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Pandemic-era format adjustments. Useful for understanding USABO question style.',
  },
  {
    year: '2020',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Open paper administered before pandemic disruption; Semifinal was modified.',
  },
  {
    year: '2019',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Strong cell-biology and physiology emphasis.',
  },
  {
    year: '2018',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Heavy ethology questions — useful calibration for AP Biology students.',
  },
  {
    year: '2017',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Classic format. Good first paper to attempt cold.',
  },
  {
    year: '2016',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Solid all-rounder paper. Useful baseline diagnostic.',
  },
  {
    year: '2015',
    openStatus: 'request-only',
    semifinalStatus: 'request-only',
    notes: 'Earlier-format Open Exam. Useful for understanding how USABO has evolved.',
  },
]

const howToUse = [
  {
    title: 'Cold-attempt one paper first',
    text:
      'Pick the oldest paper in your archive (2017–2018) and sit it cold under exam conditions — 50 minutes, no books, no internet. Score it honestly. This is your baseline.',
  },
  {
    title: 'Track wrong answers by topic',
    text:
      'Maintain a spreadsheet: column A is the question stem, column B is the topic (Cell Bio, Genetics, Plant Phys, Ethology, etc.), column C is right/wrong. After 3–4 papers, you\'ll see your weakest 2 topics. That\'s your study target.',
  },
  {
    title: 'Re-solve papers — don\'t move on too fast',
    text:
      'Solving each paper twice (a week apart) is more useful than rushing through 10 papers once. The second sit teaches you which mistakes were knowledge gaps vs reading-the-question errors.',
  },
  {
    title: 'Save 2 papers for the final simulations',
    text:
      'Don\'t exhaust the archive. Keep your two newest papers (e.g. 2023, 2024) sealed until the final week before USABO Open. Sit them under full exam conditions as your dress rehearsal.',
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
    { '@type': 'ListItem', position: 3, name: 'USABO Past Papers', item: URL },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'USABO Past Papers 2015–2024',
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
  about: [
    { '@type': 'Thing', name: 'USABO Past Papers' },
    { '@type': 'Thing', name: 'USA Biology Olympiad' },
  ],
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: 'student',
    audienceType:
      'USA-based high school students preparing for the USA Biology Olympiad — using past papers as the primary practice resource',
  },
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: papers.map((p, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: `USABO ${p.year} — Open Exam and Semifinal papers`,
  })),
}

function StatusBadge({ status }: { status: PaperEntry['openStatus'] }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded">
        <FileText className="w-3 h-3" /> Download
      </span>
    )
  }
  if (status === 'coming-soon') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded">
        Coming soon
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
      <Lock className="w-3 h-3" /> Request via WhatsApp
    </span>
  )
}

export default function USABOPastPapersPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
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
                <span className="text-teal-700 font-medium">Past Papers</span>
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
              <FileText className="w-4 h-4" />
              Year-by-year archive
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              USABO Past Papers
              <span className="block text-yellow-400 mt-2">2015 – 2024</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-3xl">
              Past papers are the single highest-value resource for USABO Open and Semifinal
              preparation. The format, pacing, and characteristic question style are remarkably
              consistent year-on-year. Solve every available paper at least once — twice for the
              best diagnostic value.
            </p>
            <p className="text-base text-slate-400 mb-8 max-w-3xl">
              We share past papers with worked solutions to enrolled USABO programme students. To
              respect CEE&apos;s distribution norms, individual papers are sent on request via
              WhatsApp rather than hosted publicly here. Reply &quot;past papers&quot; in the chat
              and we&apos;ll send the year you&apos;re asking for within an hour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-lg font-semibold transition">
                <MessageCircle className="w-5 h-5" />
                Request past papers
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                Full USABO programme
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-amber-50 border-y border-amber-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0" />
              <div className="text-sm text-amber-900">
                <strong>Distribution policy:</strong> USABO past papers are CEE-administered
                materials. We share them with our coaching students on request to honor CEE&apos;s
                distribution conventions and to attach our worked solutions and topic tagging.
                Public links to the original papers are also available on the{' '}
                <a
                  href="https://www.usabo-trc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 underline inline-flex items-center gap-1"
                >
                  USABO official portal
                  <ExternalLink className="w-3 h-3" />
                </a>
                .
              </div>
            </div>
          </div>
        </section>

        {/* Year archive */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Year-by-year archive
            </h2>
            <p className="text-slate-600 mb-8">
              Listed newest first. Each year includes both the Open Exam paper and the
              corresponding Semifinal paper, plus our worked solutions and topic tagging.
            </p>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm font-semibold text-slate-700">
                  <tr>
                    <th className="p-4">Year</th>
                    <th className="p-4">Open Exam</th>
                    <th className="p-4">Semifinal</th>
                    <th className="p-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  {papers.map((p) => (
                    <tr key={p.year} className="border-t border-slate-100 align-top">
                      <td className="p-4 font-bold text-slate-900">{p.year}</td>
                      <td className="p-4">
                        <StatusBadge status={p.openStatus} />
                      </td>
                      <td className="p-4">
                        <StatusBadge status={p.semifinalStatus} />
                      </td>
                      <td className="p-4 text-slate-600">{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-7 h-7 text-teal-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                How to use past papers properly
              </h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              The students who clear USABO are the ones who treat past papers as a study technique,
              not just a content drill. Here&apos;s how the strongest performers we coach do it.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {howToUse.map((tip, idx) => (
                <div key={tip.title} className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-slate-900">{tip.title}</h3>
                  </div>
                  <p className="text-sm text-slate-700 ml-10">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <FileText className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want the full archive plus worked solutions?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Enrolled USABO programme students get all 10 years of papers, our worked solutions
              with topic tagging, and weekly office hours to discuss tricky questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContextualWhatsAppLink className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg transition">
                <MessageCircle className="w-5 h-5" />
                Request a paper
              </ContextualWhatsAppLink>
              <Link
                href="/usabo-coaching"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium text-lg border border-white/30 transition"
              >
                <Trophy className="w-5 h-5" />
                See full programme
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
              <Link href="/usabo-6-month-prep-plan" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">6-Month Prep Plan</h3>
                <p className="text-xs text-slate-600 mt-1">Month-by-month schedule</p>
              </Link>
              <Link href="/ap-biology-vs-usabo" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">AP Biology vs USABO</h3>
                <p className="text-xs text-slate-600 mt-1">Bridge for AP-5 students</p>
              </Link>
              <Link href="/usabo-2026-results" className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:shadow-md transition">
                <h3 className="font-semibold text-teal-700">2026 Cutoffs & Dates</h3>
                <p className="text-xs text-slate-600 mt-1">Live tracker</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
