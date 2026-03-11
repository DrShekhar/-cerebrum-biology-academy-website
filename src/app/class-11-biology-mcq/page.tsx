import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Class 11 Biology MCQ Practice | 2,200+ Free Questions — NCERT Based',
  description:
    'Practice 2,200+ free Class 11 Biology MCQs based on NCERT. Covers Diversity, Structural Organisation, Cell Biology, Plant & Human Physiology. Start now!',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/class-11-biology-mcq',
  },

  openGraph: {
    title: 'Class 11 Biology MCQ Practice | 2,200+ Free Questions',
    description:
      'Practice 2,200+ free Class 11 Biology MCQs based on NCERT. Topic-wise practice with instant feedback.',
  },
}

const class11Topics = [
  { name: 'Diversity in the Living World', chapters: 3, questions: 420 },
  { name: 'Structural Organisation in Animals & Plants', chapters: 4, questions: 380 },
  { name: 'Cell: Structure and Function', chapters: 4, questions: 450 },
  { name: 'Plant Physiology', chapters: 5, questions: 500 },
  { name: 'Human Physiology', chapters: 6, questions: 450 },
]

export default function Class11BiologyMCQPage() {
  const totalQuestions = class11Topics.reduce((sum, t) => sum + t.questions, 0)
  const totalChapters = class11Topics.reduce((sum, t) => sum + t.chapters, 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Class 11 Biology MCQ Practice',
    description:
      'Free online MCQ practice for Class 11 Biology based on NCERT curriculum. 2,200+ questions covering all units.',
    educationalLevel: 'Class 11',
    about: {
      '@type': 'Thing',
      name: 'Biology',
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
              <span className="text-sage-600 font-medium">Class 11</span>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="text-lg">📘</span>
              {totalQuestions.toLocaleString()}+ NCERT Questions
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4 tracking-tight">
              Class 11 Biology MCQ Practice
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Master Class 11 Biology with {totalQuestions.toLocaleString()}+ free MCQs aligned to
              NCERT. Covers all {totalChapters} chapters across 5 units with instant feedback and
              explanations.
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
              <div className="text-2xl font-bold text-yellow-600">{totalChapters}</div>
              <div className="text-sm text-stone-600">Chapters</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-specimen-600">5</div>
              <div className="text-sm text-stone-600">Units</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
              <div className="text-2xl font-bold text-green-600">Free</div>
              <div className="text-sm text-stone-600">100% Free</div>
            </div>
          </div>

          <div className="text-center mb-12">
            <Link
              href="/neet-biology-mcq?source=ncert&ncertClass=11"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-sage-500 to-sage-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-sage-500/25 hover:scale-[1.02] transition-all"
            >
              Start Class 11 MCQ Practice
            </Link>
          </div>

          <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">Class 11 NCERT Units & Topics</h2>
            <div className="space-y-4">
              {class11Topics.map((unit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-ink">
                      Unit {index + 1}: {unit.name}
                    </h3>
                    <p className="text-sm text-stone-500">
                      {unit.chapters} chapters | {unit.questions}+ MCQs
                    </p>
                  </div>
                  <Link
                    href="/neet-biology-mcq?source=ncert&ncertClass=11"
                    className="px-4 py-2 bg-sage-100 text-sage-700 rounded-lg text-sm font-medium hover:bg-sage-200 transition-colors"
                  >
                    Practice
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-stone max-w-none mb-10">
            <h2>Why Practice Class 11 Biology MCQs?</h2>
            <p>
              Class 11 Biology lays the foundation for both board exams and NEET. Topics like Cell
              Biology, Plant Physiology, and Human Physiology carry significant weightage. Regular
              MCQ practice helps you retain concepts, identify weak areas, and build exam
              confidence.
            </p>
            <h3>How to Use This Practice Tool</h3>
            <ul>
              <li>Select Class 11 as your source in the MCQ tool</li>
              <li>Practice unit-wise or mix all chapters together</li>
              <li>Review explanations for every question</li>
              <li>Track your accuracy and progress over time</li>
            </ul>
          </section>

          <section className="bg-sage-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-ink mb-4">Explore More</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/class-11"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Class 11 Course
              </Link>
              <Link
                href="/courses/class-11"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Class 11 Foundation
              </Link>
              <Link
                href="/class-12-biology-mcq"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Class 12 Biology MCQ
              </Link>
              <Link
                href="/biology-olympiad-mcq"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Olympiad MCQ Practice
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
              href="/neet-biology-mcq?source=ncert&ncertClass=11"
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
