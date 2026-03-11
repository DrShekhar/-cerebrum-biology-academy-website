import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Biology Olympiad MCQ Practice | 5,900+ Free Questions — Campbell Biology Based',
  description:
    'Practice 5,900+ free Biology Olympiad MCQs based on Campbell Biology. Covers all 8 units with MTF, Data Interpretation, and Experimental Design questions. NSEB, USABO, IBO prep.',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-mcq',
  },

  openGraph: {
    title: 'Biology Olympiad MCQ Practice | 5,900+ Free Questions',
    description:
      'Practice 5,900+ free Biology Olympiad MCQs based on Campbell Biology. NSEB, USABO, and IBO preparation.',
  },
}

const campbellUnits = [
  { unit: 1, name: 'The Chemistry of Life', questions: 720 },
  { unit: 2, name: 'The Cell', questions: 780 },
  { unit: 3, name: 'Genetics', questions: 810 },
  { unit: 4, name: 'Mechanisms of Evolution', questions: 650 },
  { unit: 5, name: 'The Evolutionary History of Biological Diversity', questions: 780 },
  { unit: 6, name: 'Plant Form and Function', questions: 700 },
  { unit: 7, name: 'Animal Form and Function', questions: 760 },
  { unit: 8, name: 'Ecology', questions: 700 },
]

const questionTypes = [
  { type: 'Standard MCQ', description: 'Single correct answer from 4 options' },
  { type: 'Match the Following (MTF)', description: 'Match items in two columns correctly' },
  { type: 'Data Interpretation', description: 'Analyze graphs, tables, and experimental data' },
  {
    type: 'Experimental Design',
    description: 'Identify variables, controls, and experimental flaws',
  },
  { type: 'Assertion-Reason', description: 'Evaluate statement and reason relationships' },
  {
    type: 'Diagram-Based',
    description: 'Identify structures, pathways, and biological processes',
  },
]

export default function BiologyOlympiadMCQPage() {
  const totalQuestions = campbellUnits.reduce((sum, u) => sum + u.questions, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Biology Olympiad MCQ Practice',
    description:
      'Free online MCQ practice for Biology Olympiad preparation based on Campbell Biology. 5,900+ questions across 8 units.',
    educationalLevel: 'Advanced',
    about: {
      '@type': 'Thing',
      name: 'Biology Olympiad',
    },
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    isAccessibleForFree: true,
    numberOfQuestions: totalQuestions,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gradient-to-br from-parchment via-sage-50/30 to-stone-50">
        <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Link href="/" className="hover:text-sage-600 transition-colors">
                Home
              </Link>
              <span className="text-stone-400">/</span>
              <Link href="/neet-biology-mcq" className="hover:text-sage-600 transition-colors">
                Biology MCQ Practice
              </Link>
              <span className="text-stone-400">/</span>
              <span className="text-sage-600 font-medium">Olympiad</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="text-lg">🏆</span>
              {totalQuestions.toLocaleString()}+ Olympiad-Level Questions
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">
              Biology Olympiad MCQ Practice
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {totalQuestions.toLocaleString()}+ free MCQs based on Campbell Biology for NSEB, INBO,
              USABO, and IBO preparation. Includes Match the Following, Data Interpretation, and
              Experimental Design questions.
            </p>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-sage-600">
                {totalQuestions.toLocaleString()}+
              </div>
              <div className="text-sm text-stone-600">Questions</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-yellow-600">8</div>
              <div className="text-sm text-stone-600">Campbell Units</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-specimen-600">6</div>
              <div className="text-sm text-stone-600">Question Types</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-green-600">Free</div>
              <div className="text-sm text-stone-600">100% Free</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <Link
              href="/neet-biology-mcq?source=olympiad"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-sage-500 to-sage-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-sage-500/25 hover:scale-[1.02] transition-all"
            >
              Start Olympiad MCQ Practice
            </Link>
          </div>

          <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">Campbell Biology Units</h2>
            <div className="space-y-4">
              {campbellUnits.map((unit) => (
                <div
                  key={unit.unit}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-ink">
                      Unit {unit.unit}: {unit.name}
                    </h3>
                    <p className="text-sm text-stone-500">{unit.questions}+ MCQs</p>
                  </div>
                  <Link
                    href="/neet-biology-mcq?source=olympiad"
                    className="px-4 py-2 bg-sage-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors"
                  >
                    Practice
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">Question Types</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {questionTypes.map((qt, index) => (
                <div key={index} className="p-4 bg-amber-50 rounded-lg">
                  <h3 className="font-semibold text-ink mb-1">{qt.type}</h3>
                  <p className="text-sm text-stone-600">{qt.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-stone max-w-none mb-10">
            <h2>Why Practice Biology Olympiad MCQs?</h2>
            <p>
              Biology Olympiad competitions like NSEB, USABO, and IBO test deep conceptual
              understanding beyond NCERT level. Our Olympiad MCQ bank is based on Campbell Biology
              and designed to match the difficulty and question styles of international Biology
              Olympiad exams. Regular practice builds the analytical skills needed to tackle
              data-interpretation and experimental-design questions.
            </p>
            <h3>Who Is This For?</h3>
            <ul>
              <li>NSEB/INBO aspirants (Indian Biology Olympiad pathway)</li>
              <li>USABO aspirants (USA Biology Olympiad)</li>
              <li>IBO hopefuls preparing for international competition</li>
              <li>Advanced students wanting Campbell Biology-level challenge</li>
            </ul>
          </section>

          <section className="bg-sage-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-ink mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/biology-olympiad-coaching"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Olympiad Coaching
              </Link>
              <Link
                href="/campbell-biology"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Campbell Biology Coaching
              </Link>
              <Link
                href="/usabo-coaching"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                USABO Coaching
              </Link>
              <Link
                href="/class-11-biology-mcq"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Class 11 Biology MCQ
              </Link>
              <Link
                href="/class-12-biology-mcq"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Class 12 Biology MCQ
              </Link>
              <Link
                href="/neet-biology-mcq"
                className="px-4 py-2 bg-white rounded-lg text-yellow-700 hover:bg-amber-50 transition-colors text-sm font-medium"
              >
                All Biology MCQs
              </Link>
            </div>
          </section>

          <div className="text-center">
            <Link
              href="/neet-biology-mcq?source=olympiad"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-500 to-sage-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Start Free Practice Now
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
