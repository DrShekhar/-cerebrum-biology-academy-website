import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, FileText, Target, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NEET 2024 Biology PYQ | Previous Year Questions with Answers',
  description:
    'Practice NEET 2024 Biology Previous Year Questions (PYQs) with detailed solutions. All 90 Biology questions from NEET 2024 exam. Free practice with explanations.',
  keywords: [
    'NEET 2024 Biology PYQ',
    'NEET 2024 Previous Year Questions',
    'NEET 2024 Biology Questions',
    'NEET Biology PYQ with solutions',
    'NEET 2024 answer key Biology',
    'NEET 2024 Biology paper',
    'NEET PYQ practice',
  ],
  openGraph: {
    title: 'NEET 2024 Biology PYQ | Previous Year Questions',
    description:
      'Practice all 90 Biology questions from NEET 2024 with detailed solutions. Free PYQ practice for NEET 2026 preparation.',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/pyq-2024',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq/pyq-2024',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'NEET 2024 Biology Previous Year Questions',
  description:
    'Practice all 90 Biology questions from NEET 2024 exam with detailed solutions and explanations.',
  educationalLevel: 'High School',
  isAccessibleForFree: true,
  provider: {
    '@type': 'Organization',
    name: 'Cerebrum Biology Academy',
  },
}

export default function PYQ2024Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-parchment via-sage-50/30 to-stone-50">
        {/* Breadcrumb */}
        <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Link href="/" className="hover:text-sage-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-stone-400" />
              <Link href="/neet-biology-mcq" className="hover:text-sage-600 transition-colors">
                NEET Biology MCQ
              </Link>
              <ChevronRight className="w-4 h-4 text-stone-400" />
              <span className="text-yellow-600 font-medium">NEET 2024 PYQ</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Previous Year Questions
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">
              NEET 2024 Biology Previous Year Questions
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Practice all 90 Biology questions from NEET 2024 exam with detailed solutions. Master
              the exam pattern and boost your preparation for NEET 2026.
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-yellow-600">90</div>
              <div className="text-sm text-stone-600">Questions</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-sage-600">360</div>
              <div className="text-sm text-stone-600">Marks</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-5 h-5 text-specimen-600" />
                <span className="text-lg font-bold text-specimen-600">60</span>
              </div>
              <div className="text-sm text-stone-600">Min (Recommended)</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-green-600">Free</div>
              <div className="text-sm text-stone-600">With Solutions</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-10">
            <Link
              href="/neet-biology-mcq?isPYQOnly=true&pyqYear=2024"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all"
            >
              <Target className="w-5 h-5" />
              Start NEET 2024 PYQ Practice
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Topic-wise Distribution */}
          <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
            <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              NEET 2024 Biology Topic-wise Distribution
            </h2>
            <div className="space-y-3">
              {[
                { topic: 'Human Physiology', questions: 14, percentage: '15.5%' },
                { topic: 'Genetics & Evolution', questions: 12, percentage: '13.3%' },
                { topic: 'Ecology', questions: 10, percentage: '11.1%' },
                { topic: 'Reproduction', questions: 10, percentage: '11.1%' },
                { topic: 'Cell Biology', questions: 9, percentage: '10%' },
                { topic: 'Plant Physiology', questions: 8, percentage: '8.9%' },
                { topic: 'Biotechnology', questions: 7, percentage: '7.8%' },
                { topic: 'Diversity in Living World', questions: 8, percentage: '8.9%' },
                { topic: 'Structural Organization', questions: 6, percentage: '6.7%' },
                { topic: 'Biology in Human Welfare', questions: 6, percentage: '6.7%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-stone-700">{item.topic}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: item.percentage }}
                      />
                    </div>
                    <span className="text-sm font-medium text-stone-600 w-20 text-right">
                      {item.questions} Qs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Practice PYQs */}
          <section className="prose prose-stone max-w-none mb-10">
            <h2>Why Practice NEET 2024 PYQs?</h2>
            <ul>
              <li>
                <strong>Understand the latest pattern:</strong> NEET 2024 represents the current
                exam pattern and difficulty level
              </li>
              <li>
                <strong>Identify important topics:</strong> See which topics were heavily tested in
                the recent exam
              </li>
              <li>
                <strong>Practice time management:</strong> Get familiar with the question style and
                complexity
              </li>
              <li>
                <strong>Build confidence:</strong> Solving actual NEET questions boosts exam
                readiness
              </li>
            </ul>

            <h3>NEET 2024 Biology Exam Analysis</h3>
            <p>
              NEET 2024 Biology section was moderate in difficulty with a good mix of NCERT-based
              and application-based questions. Human Physiology and Genetics dominated the paper,
              accounting for nearly 30% of questions. Diagram-based and matching type questions were
              prominent.
            </p>
          </section>

          {/* Other Years */}
          <section className="bg-amber-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-ink mb-4">Practice More PYQs</h2>
            <div className="flex flex-wrap gap-3">
              {[2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                <Link
                  key={year}
                  href={`/neet-biology-mcq?isPYQOnly=true&pyqYear=${year}`}
                  className="px-4 py-2 bg-white rounded-lg text-yellow-700 hover:bg-amber-100 transition-colors text-sm font-medium"
                >
                  NEET {year}
                </Link>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <div className="text-center">
            <Link
              href="/neet-biology-mcq?isPYQOnly=true&pyqYear=2024"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Free PYQ Practice Now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
