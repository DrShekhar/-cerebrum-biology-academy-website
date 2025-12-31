'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, BookOpen, Target, Clock, CheckCircle2 } from 'lucide-react'

interface TopicLandingPageProps {
  topic: string
  topicSlug: string
  title: string
  description: string
  questionCount: number
  chapters: string[]
  neetWeightage: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  importantSubtopics: string[]
  sampleQuestions?: { question: string; answer: string }[]
  ncertReference: string
  filterParams: string
}

export function TopicLandingPage({
  topic,
  topicSlug,
  title,
  description,
  questionCount,
  chapters,
  neetWeightage,
  difficulty,
  importantSubtopics,
  sampleQuestions,
  ncertReference,
  filterParams,
}: TopicLandingPageProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [shouldRedirect, setShouldRedirect] = useState(true)

  useEffect(() => {
    if (!shouldRedirect) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push(`/neet-biology-mcq?${filterParams}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, filterParams, shouldRedirect])

  const handleStayOnPage = () => {
    setShouldRedirect(false)
  }

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-amber-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700',
  }

  return (
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
            <span className="text-sage-600 font-medium">{topic}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Auto-redirect Banner */}
        {shouldRedirect && (
          <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <p className="text-sage-800 font-medium">
                  Redirecting to practice in {countdown} seconds...
                </p>
                <p className="text-sage-600 text-sm">You'll start practicing {topic} MCQs</p>
              </div>
            </div>
            <button
              onClick={handleStayOnPage}
              className="px-4 py-2 text-sage-700 hover:bg-sage-100 rounded-lg transition-colors text-sm font-medium"
            >
              Stay on this page
            </button>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            {questionCount}+ Questions Available
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-4">{title}</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{description}</p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
            <div className="text-2xl font-bold text-sage-600">{questionCount}+</div>
            <div className="text-sm text-stone-600">Questions</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
            <div className="text-2xl font-bold text-yellow-600">{neetWeightage}</div>
            <div className="text-sm text-stone-600">NEET Weightage</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}
            >
              {difficulty}
            </span>
            <div className="text-sm text-stone-600 mt-1">Difficulty</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200/50 text-center">
            <div className="text-2xl font-bold text-specimen-600">{chapters.length}</div>
            <div className="text-sm text-stone-600">Chapters</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-10">
          <Link
            href={`/neet-biology-mcq?${filterParams}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-sage-500 to-sage-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-sage-500/25 hover:scale-[1.02] transition-all"
          >
            <Target className="w-5 h-5" />
            Start Practicing {topic} MCQs
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Chapters Covered */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
          <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sage-600" />
            NCERT Chapters Covered
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {chapters.map((chapter, index) => (
              <div key={index} className="flex items-center gap-2 text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-sage-500 flex-shrink-0" />
                <span>{chapter}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-stone-500 mt-4">Reference: {ncertReference}</p>
        </section>

        {/* Important Subtopics */}
        <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
          <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-600" />
            Important Topics for NEET
          </h2>
          <div className="flex flex-wrap gap-2">
            {importantSubtopics.map((subtopic, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-amber-50 text-yellow-700 rounded-full text-sm font-medium"
              >
                {subtopic}
              </span>
            ))}
          </div>
        </section>

        {/* Sample Questions */}
        {sampleQuestions && sampleQuestions.length > 0 && (
          <section className="bg-white rounded-xl p-6 shadow-sm border border-stone-200/50 mb-8">
            <h2 className="text-xl font-bold text-ink mb-4">Sample Questions</h2>
            <div className="space-y-4">
              {sampleQuestions.map((sq, index) => (
                <div key={index} className="border-l-4 border-sage-400 pl-4">
                  <p className="font-medium text-stone-800 mb-2">
                    Q{index + 1}. {sq.question}
                  </p>
                  <p className="text-sage-600 text-sm">Answer: {sq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="prose prose-stone max-w-none mb-10">
          <h2>Why Practice {topic} MCQs for NEET?</h2>
          <p>
            {topic} is one of the most important topics for NEET Biology, with a weightage of{' '}
            {neetWeightage}. Mastering this topic through regular MCQ practice can significantly
            boost your NEET score. Our free {topic} MCQ practice includes questions from NCERT
            textbooks and previous year NEET papers.
          </p>

          <h3>How to Score Well in {topic}</h3>
          <ul>
            <li>Focus on understanding concepts from NCERT thoroughly</li>
            <li>Practice diagram-based questions regularly</li>
            <li>Solve previous year NEET questions from this topic</li>
            <li>Review your mistakes and weak areas consistently</li>
            <li>Use our spaced repetition system for better retention</li>
          </ul>
        </section>

        {/* Related Topics */}
        <section className="bg-sage-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold text-ink mb-4">Practice More Topics</h2>
          <div className="flex flex-wrap gap-3">
            {topicSlug !== 'human-physiology' && (
              <Link
                href="/neet-biology-mcq/human-physiology"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Human Physiology
              </Link>
            )}
            {topicSlug !== 'genetics-evolution' && (
              <Link
                href="/neet-biology-mcq/genetics-evolution"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Genetics & Evolution
              </Link>
            )}
            {topicSlug !== 'ecology' && (
              <Link
                href="/neet-biology-mcq/ecology"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Ecology
              </Link>
            )}
            {topicSlug !== 'reproduction' && (
              <Link
                href="/neet-biology-mcq/reproduction"
                className="px-4 py-2 bg-white rounded-lg text-sage-700 hover:bg-sage-100 transition-colors text-sm font-medium"
              >
                Reproduction
              </Link>
            )}
            <Link
              href="/neet-biology-mcq/pyq-2024"
              className="px-4 py-2 bg-white rounded-lg text-yellow-700 hover:bg-amber-50 transition-colors text-sm font-medium"
            >
              NEET 2024 PYQs
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <div className="text-center">
          <Link
            href={`/neet-biology-mcq?${filterParams}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-500 to-sage-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Start Free Practice Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
