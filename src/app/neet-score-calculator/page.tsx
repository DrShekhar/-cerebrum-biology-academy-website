'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Target,
  ArrowRight,
  CheckCircle,
  Info,
  BookOpen,
  TrendingUp,
  Award,
  BarChart3,
  Percent,
  MessageCircle,
  Calendar,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface SubjectScores {
  correct: string
  incorrect: string
  unattempted: string
}

interface SubjectResult {
  score: number
  maxScore: number
  attempted: number
  totalQuestions: number
  accuracy: number
}

interface CalculationResult {
  physics: SubjectResult
  chemistry: SubjectResult
  biology: SubjectResult
  totalScore: number
  maxScore: number
  totalAttempted: number
  totalQuestions: number
  overallAccuracy: number
  percentage: number
}

const SUBJECT_CONFIG = {
  physics: { name: 'Physics', totalQuestions: 45, maxMarks: 180, color: 'blue' },
  chemistry: { name: 'Chemistry', totalQuestions: 45, maxMarks: 180, color: 'green' },
  biology: { name: 'Biology', totalQuestions: 90, maxMarks: 360, color: 'orange' },
}

function calculateSubjectScore(
  correct: number,
  incorrect: number,
  totalQuestions: number
): SubjectResult {
  const score = correct * 4 - incorrect * 1
  const maxScore = totalQuestions * 4
  const attempted = correct + incorrect
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0

  return {
    score: Math.max(0, score),
    maxScore,
    attempted,
    totalQuestions,
    accuracy,
  }
}

export default function NEETScoreCalculatorPage() {
  const [physics, setPhysics] = useState<SubjectScores>({
    correct: '',
    incorrect: '',
    unattempted: '',
  })
  const [chemistry, setChemistry] = useState<SubjectScores>({
    correct: '',
    incorrect: '',
    unattempted: '',
  })
  const [biology, setBiology] = useState<SubjectScores>({
    correct: '',
    incorrect: '',
    unattempted: '',
  })
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [error, setError] = useState<string>('')

  const validateSubject = (
    subject: SubjectScores,
    subjectName: string,
    totalQuestions: number
  ): string | null => {
    const correct = parseInt(subject.correct) || 0
    const incorrect = parseInt(subject.incorrect) || 0
    const unattempted = parseInt(subject.unattempted) || 0

    if (correct < 0 || incorrect < 0 || unattempted < 0) {
      return `${subjectName}: Values cannot be negative`
    }

    const total = correct + incorrect + unattempted
    if (total !== totalQuestions) {
      return `${subjectName}: Total questions must equal ${totalQuestions} (currently ${total})`
    }

    return null
  }

  const handleCalculate = () => {
    setError('')

    // Validate all subjects
    const physicsError = validateSubject(physics, 'Physics', 45)
    const chemistryError = validateSubject(chemistry, 'Chemistry', 45)
    const biologyError = validateSubject(biology, 'Biology', 90)

    const validationError = physicsError || chemistryError || biologyError
    if (validationError) {
      setError(validationError)
      return
    }

    // Calculate scores
    const physicsResult = calculateSubjectScore(
      parseInt(physics.correct) || 0,
      parseInt(physics.incorrect) || 0,
      45
    )
    const chemistryResult = calculateSubjectScore(
      parseInt(chemistry.correct) || 0,
      parseInt(chemistry.incorrect) || 0,
      45
    )
    const biologyResult = calculateSubjectScore(
      parseInt(biology.correct) || 0,
      parseInt(biology.incorrect) || 0,
      90
    )

    const totalScore = physicsResult.score + chemistryResult.score + biologyResult.score
    const totalAttempted =
      physicsResult.attempted + chemistryResult.attempted + biologyResult.attempted
    const totalCorrect =
      (parseInt(physics.correct) || 0) +
      (parseInt(chemistry.correct) || 0) +
      (parseInt(biology.correct) || 0)
    const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0

    setResult({
      physics: physicsResult,
      chemistry: chemistryResult,
      biology: biologyResult,
      totalScore,
      maxScore: 720,
      totalAttempted,
      totalQuestions: 180,
      overallAccuracy,
      percentage: Math.round((totalScore / 720) * 100 * 10) / 10,
    })
    setShowResult(true)
  }

  const handleReset = () => {
    setPhysics({ correct: '', incorrect: '', unattempted: '' })
    setChemistry({ correct: '', incorrect: '', unattempted: '' })
    setBiology({ correct: '', incorrect: '', unattempted: '' })
    setResult(null)
    setShowResult(false)
    setError('')
  }

  const updateSubject = (
    setter: React.Dispatch<React.SetStateAction<SubjectScores>>,
    field: keyof SubjectScores,
    value: string
  ) => {
    setter((prev) => ({ ...prev, [field]: value }))
  }

  const getScoreColor = (score: number, maxScore: number): string => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    if (percentage >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPerformanceMessage = (percentage: number): { message: string; color: string } => {
    if (percentage >= 90)
      return { message: 'Excellent! Top medical colleges possible', color: 'text-green-600' }
    if (percentage >= 80)
      return { message: 'Great score! Government colleges likely', color: 'text-blue-600' }
    if (percentage >= 70)
      return { message: 'Good score! Many options available', color: 'text-purple-600' }
    if (percentage >= 60)
      return { message: 'Decent score. Private colleges possible', color: 'text-yellow-600' }
    return { message: 'Keep practicing. More effort needed', color: 'text-red-600' }
  }

  const SubjectInput = ({
    subject,
    setSubject,
    config,
  }: {
    subject: SubjectScores
    setSubject: React.Dispatch<React.SetStateAction<SubjectScores>>
    config: (typeof SUBJECT_CONFIG)[keyof typeof SUBJECT_CONFIG]
  }) => (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-${config.color}-100`}
        >
          <BookOpen className={`h-4 w-4 text-${config.color}-600`} />
        </span>
        {config.name}
        <span className="ml-auto text-sm font-normal text-gray-500">
          ({config.totalQuestions} questions, {config.maxMarks} marks)
        </span>
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Correct Answers
          </label>
          <input
            type="number"
            min="0"
            max={config.totalQuestions}
            value={subject.correct}
            onChange={(e) => updateSubject(setSubject, 'correct', e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <p className="mt-1 text-xs text-green-600">+4 marks each</p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Incorrect Answers
          </label>
          <input
            type="number"
            min="0"
            max={config.totalQuestions}
            value={subject.incorrect}
            onChange={(e) => updateSubject(setSubject, 'incorrect', e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <p className="mt-1 text-xs text-red-600">-1 mark each</p>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Unattempted
          </label>
          <input
            type="number"
            min="0"
            max={config.totalQuestions}
            value={subject.unattempted}
            onChange={(e) => updateSubject(setSubject, 'unattempted', e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-center focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <p className="mt-1 text-xs text-gray-500">0 marks</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'NEET Score Calculator 2026',
            description:
              'Free NEET Score Calculator to calculate your marks based on correct, incorrect and unattempted questions. Get subject-wise score breakdown for Physics, Chemistry, and Biology.',
            url: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              ratingCount: '2450',
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NEET Score Calculator',
                item: 'https://cerebrumbiologyacademy.com/neet-score-calculator',
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-orange-600 pt-16 pb-24 text-white md:pt-24 md:pb-32">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET Score Calculator</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET Score Calculator 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-orange-100 md:text-xl">
              Free NEET marks calculator to compute your score using the official marking scheme.
              Get subject-wise breakdown for Physics, Chemistry, and Biology.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Calculator className="h-5 w-5" />
                <span className="font-semibold">100% Accurate</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Subject-wise Analysis</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">Accuracy Tracker</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="relative z-10 -mt-16 px-4 sm:px-6 md:-mt-20 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Calculate Your NEET Score</h2>
                <p className="text-gray-600">
                  Enter your answers for each subject to get instant score calculation
                </p>
              </div>

              {!showResult ? (
                <div className="space-y-6">
                  {/* NEET Marking Scheme Info */}
                  <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
                    <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold">NEET Marking Scheme:</p>
                      <ul className="mt-1 space-y-1">
                        <li>+4 marks for each correct answer</li>
                        <li>-1 mark for each incorrect answer (negative marking)</li>
                        <li>0 marks for unattempted questions</li>
                      </ul>
                    </div>
                  </div>

                  {/* Subject Inputs */}
                  <SubjectInput
                    subject={physics}
                    setSubject={setPhysics}
                    config={SUBJECT_CONFIG.physics}
                  />
                  <SubjectInput
                    subject={chemistry}
                    setSubject={setChemistry}
                    config={SUBJECT_CONFIG.chemistry}
                  />
                  <SubjectInput
                    subject={biology}
                    setSubject={setBiology}
                    config={SUBJECT_CONFIG.biology}
                  />

                  {/* Error Message */}
                  {error && (
                    <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>
                  )}

                  <button
                    onClick={handleCalculate}
                    className="w-full rounded-lg bg-orange-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:bg-orange-700"
                  >
                    Calculate My Score
                  </button>
                </div>
              ) : (
                result && (
                  <div className="space-y-6">
                    {/* Total Score */}
                    <div className="rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 p-6 text-center text-white">
                      <p className="mb-2 text-orange-100">Your NEET Score</p>
                      <p className="text-5xl font-bold">{result.totalScore}</p>
                      <p className="mt-1 text-xl text-orange-100">out of 720</p>
                      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                        <span className="rounded-full bg-white/20 px-3 py-1">
                          {result.percentage}% Score
                        </span>
                        <span className="rounded-full bg-white/20 px-3 py-1">
                          {result.overallAccuracy}% Accuracy
                        </span>
                      </div>
                    </div>

                    {/* Performance Message */}
                    <div
                      className={`rounded-lg border-2 p-4 text-center ${
                        getPerformanceMessage(result.percentage).color
                      }`}
                      style={{
                        borderColor: 'currentColor',
                        backgroundColor:
                          result.percentage >= 70
                            ? 'rgb(240, 253, 244)'
                            : result.percentage >= 60
                              ? 'rgb(254, 252, 232)'
                              : 'rgb(254, 242, 242)',
                      }}
                    >
                      <p className="font-semibold">
                        {getPerformanceMessage(result.percentage).message}
                      </p>
                    </div>

                    {/* Subject-wise Breakdown */}
                    <div>
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Subject-wise Breakdown
                      </h3>
                      <div className="space-y-4">
                        {/* Physics */}
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-semibold text-gray-900">Physics</span>
                            <span
                              className={`text-xl font-bold ${getScoreColor(result.physics.score, 180)}`}
                            >
                              {result.physics.score}/180
                            </span>
                          </div>
                          <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-blue-600 transition-all"
                              style={{ width: `${(result.physics.score / 180) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>
                              Attempted: {result.physics.attempted}/{result.physics.totalQuestions}
                            </span>
                            <span>Accuracy: {result.physics.accuracy}%</span>
                          </div>
                        </div>

                        {/* Chemistry */}
                        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-semibold text-gray-900">Chemistry</span>
                            <span
                              className={`text-xl font-bold ${getScoreColor(result.chemistry.score, 180)}`}
                            >
                              {result.chemistry.score}/180
                            </span>
                          </div>
                          <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-green-600 transition-all"
                              style={{ width: `${(result.chemistry.score / 180) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>
                              Attempted: {result.chemistry.attempted}/
                              {result.chemistry.totalQuestions}
                            </span>
                            <span>Accuracy: {result.chemistry.accuracy}%</span>
                          </div>
                        </div>

                        {/* Biology */}
                        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="font-semibold text-gray-900">Biology</span>
                            <span
                              className={`text-xl font-bold ${getScoreColor(result.biology.score, 360)}`}
                            >
                              {result.biology.score}/360
                            </span>
                          </div>
                          <div className="mb-2 h-2 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-orange-600 transition-all"
                              style={{ width: `${(result.biology.score / 360) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>
                              Attempted: {result.biology.attempted}/{result.biology.totalQuestions}
                            </span>
                            <span>Accuracy: {result.biology.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-sm text-gray-600">Total Score</p>
                        <p className="text-2xl font-bold text-gray-900">{result.totalScore}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-sm text-gray-600">Percentage</p>
                        <p className="text-2xl font-bold text-orange-600">{result.percentage}%</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-sm text-gray-600">Attempted</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {result.totalAttempted}/180
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-sm text-gray-600">Accuracy</p>
                        <p className="text-2xl font-bold text-green-600">
                          {result.overallAccuracy}%
                        </p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-4">
                      <button
                        onClick={() => trackAndOpenWhatsApp({
                          source: 'score-calculator-result',
                          message: `Hi! I scored ${result.totalScore}/720 in my NEET practice test. Physics: ${result.physics.score}/180, Chemistry: ${result.chemistry.score}/180, Biology: ${result.biology.score}/360. I would like to get a personalized analysis.`,
                          campaign: 'score-calculator',
                        })}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-green-700 cursor-pointer"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Get Personalized Analysis on WhatsApp
                      </button>

                      <div className="flex gap-4">
                        <button
                          onClick={handleReset}
                          className="flex-1 rounded-lg border-2 border-orange-600 px-6 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                        >
                          Calculate Again
                        </button>
                        <Link
                          href="/neet-rank-predictor"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
                        >
                          Predict Rank
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* How Scoring Works */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET Marking Scheme Explained
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-green-600">+4 Marks</h3>
                <p className="font-semibold text-gray-900">Correct Answer</p>
                <p className="mt-2 text-sm text-gray-600">
                  Each correct answer awards you 4 marks. Maximum possible score is 720.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <span className="text-2xl font-bold text-red-600">-1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-red-600">-1 Mark</h3>
                <p className="font-semibold text-gray-900">Incorrect Answer</p>
                <p className="mt-2 text-sm text-gray-600">
                  Each wrong answer deducts 1 mark. Negative marking applies for wrong attempts.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <span className="text-2xl font-bold text-gray-600">0</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-600">0 Marks</h3>
                <p className="font-semibold text-gray-900">Unattempted</p>
                <p className="mt-2 text-sm text-gray-600">
                  Questions left blank receive no marks. No penalty for skipping questions.
                </p>
              </div>
            </div>

            {/* Question Distribution */}
            <div className="mx-auto mt-12 max-w-3xl">
              <h3 className="mb-6 text-center text-xl font-semibold text-gray-900">
                NEET Question Distribution
              </h3>
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <table className="w-full">
                  <thead className="bg-orange-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">Subject</th>
                      <th className="px-6 py-4 text-center">Questions</th>
                      <th className="px-6 py-4 text-center">Max Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Physics</td>
                      <td className="px-6 py-4 text-center">45</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600">180</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">Chemistry</td>
                      <td className="px-6 py-4 text-center">45</td>
                      <td className="px-6 py-4 text-center font-semibold text-green-600">180</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        Biology (Botany + Zoology)
                      </td>
                      <td className="px-6 py-4 text-center">90</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">360</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 font-bold text-gray-900">Total</td>
                      <td className="px-6 py-4 text-center font-bold">180</td>
                      <td className="px-6 py-4 text-center font-bold text-orange-600">720</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-orange-500">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Want to Improve Your NEET Score?
                  </h2>
                  <p className="mb-6 text-orange-100">
                    Join Cerebrum Biology Academy and get expert guidance to maximize your Biology
                    score. Our students consistently score 320+ in Biology.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Detailed answer explanations for every question</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Strategy to minimize negative marking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Time management techniques for NEET</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Weekly mock tests with analysis</span>
                    </li>
                  </ul>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-orange-600 transition-colors hover:bg-orange-50 sm:w-auto sm:px-6 sm:text-base"
                    >
                      <Calendar className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">Book Free Demo</span>
                    </Link>
                    <button
                      onClick={() => trackAndOpenWhatsApp({
                        source: 'score-calculator-cta',
                        message: 'Hi! I want to improve my NEET score. Please share details about your courses.',
                        campaign: 'score-calculator',
                      })}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border-2 border-white px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto sm:px-6 sm:text-base cursor-pointer"
                    >
                      <MessageCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">Chat on WhatsApp</span>
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-orange-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="mx-auto max-w-3xl space-y-4">
              {[
                {
                  question: 'How is NEET score calculated?',
                  answer:
                    'NEET score is calculated using the formula: (Number of correct answers x 4) - (Number of incorrect answers x 1). Unattempted questions carry no marks. The maximum score is 720 marks.',
                },
                {
                  question: 'What is negative marking in NEET?',
                  answer:
                    'NEET has negative marking where 1 mark is deducted for every wrong answer. This means you lose 1 mark for incorrect responses, while correct answers give you 4 marks.',
                },
                {
                  question: 'How many questions are there in NEET?',
                  answer:
                    'NEET has 180 questions in total: 45 in Physics, 45 in Chemistry, and 90 in Biology (45 Botany + 45 Zoology). Total marks are 720.',
                },
                {
                  question: 'What is a good NEET score?',
                  answer:
                    'A score of 600+ (83%+) is considered excellent for government medical colleges. 550-600 is good for state quota seats. 500+ opens doors to private medical colleges.',
                },
                {
                  question: 'How to avoid negative marking in NEET?',
                  answer:
                    'Only attempt questions you are confident about. If you can eliminate 2 options, the probability favors attempting. Practice with mock tests to improve accuracy.',
                },
              ].map((faq, index) => (
                <details key={index} className="group rounded-lg border border-gray-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="border-t border-gray-200 p-4 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Related Tools & Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-rank-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-orange-600">
                  Rank Predictor
                </h3>
                <p className="text-sm text-gray-600">Predict your AIR based on marks</p>
              </Link>

              <Link
                href="/neet-college-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-orange-600">
                  College Predictor
                </h3>
                <p className="text-sm text-gray-600">Find colleges based on your rank</p>
              </Link>

              <Link
                href="/neet-2026-cutoff"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-orange-600">
                  NEET 2026 Cutoff
                </h3>
                <p className="text-sm text-gray-600">Expected category-wise cutoff marks</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-orange-600">
                  Biology Syllabus
                </h3>
                <p className="text-sm text-gray-600">Complete NEET Biology syllabus 2026</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
