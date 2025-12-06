'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Calculator,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Info,
  AlertCircle,
  BookOpen,
  Trophy,
  GraduationCap,
  BarChart3,
  RefreshCw,
  HelpCircle,
} from 'lucide-react'

export default function CalculatorPage() {
  const [physicsCorrect, setPhysicsCorrect] = useState<number>(0)
  const [physicsWrong, setPhysicsWrong] = useState<number>(0)
  const [chemistryCorrect, setChemistryCorrect] = useState<number>(0)
  const [chemistryWrong, setChemistryWrong] = useState<number>(0)
  const [biologyCorrect, setBiologyCorrect] = useState<number>(0)
  const [biologyWrong, setBiologyWrong] = useState<number>(0)

  const calculateScore = useMemo(() => {
    const physics = physicsCorrect * 4 - physicsWrong * 1
    const chemistry = chemistryCorrect * 4 - chemistryWrong * 1
    const biology = biologyCorrect * 4 - biologyWrong * 1
    const total = Math.max(0, physics + chemistry + biology)

    return {
      physics: Math.max(0, physics),
      chemistry: Math.max(0, chemistry),
      biology: Math.max(0, biology),
      total,
    }
  }, [physicsCorrect, physicsWrong, chemistryCorrect, chemistryWrong, biologyCorrect, biologyWrong])

  const estimateRank = (score: number): string => {
    if (score >= 700) return '1 - 100'
    if (score >= 680) return '100 - 500'
    if (score >= 650) return '500 - 2,000'
    if (score >= 620) return '2,000 - 5,000'
    if (score >= 600) return '5,000 - 10,000'
    if (score >= 580) return '10,000 - 20,000'
    if (score >= 550) return '20,000 - 35,000'
    if (score >= 520) return '35,000 - 50,000'
    if (score >= 480) return '50,000 - 80,000'
    if (score >= 450) return '80,000 - 1,00,000'
    if (score >= 400) return '1,00,000 - 1,50,000'
    if (score >= 350) return '1,50,000 - 2,50,000'
    if (score >= 300) return '2,50,000 - 4,00,000'
    if (score >= 200) return '4,00,000 - 6,00,000'
    return '6,00,000+'
  }

  const getCollegeChances = (score: number) => {
    if (score >= 680) {
      return {
        category: 'Excellent',
        color: 'green',
        chances: [
          { name: 'AIIMS Delhi', probability: 'High' },
          { name: 'JIPMER', probability: 'High' },
          { name: 'Top Government Medical Colleges', probability: 'Very High' },
          { name: 'AFMC', probability: 'High' },
        ],
      }
    }
    if (score >= 620) {
      return {
        category: 'Very Good',
        color: 'blue',
        chances: [
          { name: 'AIIMS (Other than Delhi)', probability: 'Moderate-High' },
          { name: 'State Government Medical Colleges', probability: 'High' },
          { name: 'Top State Quota Seats', probability: 'Very High' },
          { name: 'ESIC Medical Colleges', probability: 'High' },
        ],
      }
    }
    if (score >= 550) {
      return {
        category: 'Good',
        color: 'yellow',
        chances: [
          { name: 'Government Medical Colleges', probability: 'Moderate' },
          { name: 'State Quota Seats', probability: 'High' },
          { name: 'Deemed Universities', probability: 'Very High' },
          { name: 'Private Medical Colleges', probability: 'Very High' },
        ],
      }
    }
    if (score >= 450) {
      return {
        category: 'Moderate',
        color: 'orange',
        chances: [
          { name: 'Private Medical Colleges', probability: 'High' },
          { name: 'Deemed Universities', probability: 'Moderate-High' },
          { name: 'State Private Quota', probability: 'High' },
          { name: 'Management Quota', probability: 'Very High' },
        ],
      }
    }
    return {
      category: 'Needs Improvement',
      color: 'red',
      chances: [
        { name: 'Private Medical Colleges', probability: 'Low-Moderate' },
        { name: 'Management Quota', probability: 'Moderate' },
        { name: 'Consider Re-attempt', probability: 'Recommended' },
        { name: 'BDS/BAMS/BHMS', probability: 'Good Alternative' },
      ],
    }
  }

  const resetCalculator = () => {
    setPhysicsCorrect(0)
    setPhysicsWrong(0)
    setChemistryCorrect(0)
    setChemistryWrong(0)
    setBiologyCorrect(0)
    setBiologyWrong(0)
  }

  const totalAttempted =
    physicsCorrect +
    physicsWrong +
    chemistryCorrect +
    chemistryWrong +
    biologyCorrect +
    biologyWrong
  const accuracy =
    totalAttempted > 0
      ? ((physicsCorrect + chemistryCorrect + biologyCorrect) / totalAttempted) * 100
      : 0

  const collegeChances = getCollegeChances(calculateScore.total)

  const stats = [
    { number: '720', label: 'Maximum Score', description: 'Total marks in NEET' },
    { number: '180', label: 'Total Questions', description: '45 per subject' },
    { number: '+4/-1', label: 'Marking Scheme', description: 'Per question' },
    { number: '200', label: 'Minutes', description: 'Exam duration' },
  ]

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; light: string; border: string }> = {
      green: {
        bg: 'bg-green-500',
        text: 'text-green-600',
        light: 'bg-green-50',
        border: 'border-green-500',
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        light: 'bg-blue-50',
        border: 'border-blue-500',
      },
      yellow: {
        bg: 'bg-yellow-500',
        text: 'text-yellow-600',
        light: 'bg-yellow-50',
        border: 'border-yellow-500',
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        light: 'bg-orange-50',
        border: 'border-orange-500',
      },
      red: {
        bg: 'bg-red-500',
        text: 'text-red-600',
        light: 'bg-red-50',
        border: 'border-red-500',
      },
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-6 flex justify-center">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 border border-white/30">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-xs sm:text-sm font-medium">
                  NEET 2025 Score & Rank Predictor
                </span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              NEET Score Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8">
              Calculate your expected NEET score, estimate your rank, and discover your chances of
              admission to top medical colleges across India.
            </p>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Based on NEET 2024 cutoffs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>Real-time rank estimation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                <span>College admission chances</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Enter Your Answers</h2>
                <button
                  onClick={resetCalculator}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Physics */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold">P</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Physics</h3>
                    <p className="text-xs text-gray-500">45 questions (180 marks)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Correct</label>
                    <input
                      type="number"
                      min="0"
                      max="45"
                      value={physicsCorrect}
                      onChange={(e) =>
                        setPhysicsCorrect(Math.min(45, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Wrong</label>
                    <input
                      type="number"
                      min="0"
                      max="45"
                      value={physicsWrong}
                      onChange={(e) =>
                        setPhysicsWrong(Math.min(45, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Chemistry */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">C</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chemistry</h3>
                    <p className="text-xs text-gray-500">45 questions (180 marks)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Correct</label>
                    <input
                      type="number"
                      min="0"
                      max="45"
                      value={chemistryCorrect}
                      onChange={(e) =>
                        setChemistryCorrect(
                          Math.min(45, Math.max(0, parseInt(e.target.value) || 0))
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Wrong</label>
                    <input
                      type="number"
                      min="0"
                      max="45"
                      value={chemistryWrong}
                      onChange={(e) =>
                        setChemistryWrong(Math.min(45, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Biology */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Biology (Botany + Zoology)</h3>
                    <p className="text-xs text-gray-500">90 questions (360 marks)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Correct</label>
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={biologyCorrect}
                      onChange={(e) =>
                        setBiologyCorrect(Math.min(90, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Wrong</label>
                    <input
                      type="number"
                      min="0"
                      max="90"
                      value={biologyWrong}
                      onChange={(e) =>
                        setBiologyWrong(Math.min(90, Math.max(0, parseInt(e.target.value) || 0)))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      {totalAttempted}/180
                    </div>
                    <div className="text-xs text-gray-600">Attempted</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-green-600">
                      {physicsCorrect + chemistryCorrect + biologyCorrect}
                    </div>
                    <div className="text-xs text-gray-600">Correct</div>
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      {accuracy.toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-600">Accuracy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Score Card */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                <h2 className="text-lg font-semibold mb-4 opacity-90">Your Estimated Score</h2>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                  {calculateScore.total}
                </div>
                <div className="text-purple-200 mb-4 sm:mb-6">out of 720 marks</div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">{calculateScore.physics}</div>
                    <div className="text-xs opacity-75">Physics</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">{calculateScore.chemistry}</div>
                    <div className="text-xs opacity-75">Chemistry</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold">{calculateScore.biology}</div>
                    <div className="text-xs opacity-75">Biology</div>
                  </div>
                </div>
              </div>

              {/* Rank Estimation */}
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Estimated Rank</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {estimateRank(calculateScore.total)}
                </div>
                <p className="text-sm text-gray-500">Based on NEET 2024 score vs rank analysis</p>
              </div>

              {/* College Chances */}
              <div
                className={`bg-white rounded-2xl p-6 shadow-xl border-l-4 ${getColorClasses(collegeChances.color).border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 ${getColorClasses(collegeChances.color).light} rounded-lg flex items-center justify-center`}
                  >
                    <GraduationCap
                      className={`w-5 h-5 ${getColorClasses(collegeChances.color).text}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Admission Chances</h3>
                    <span
                      className={`text-sm font-medium ${getColorClasses(collegeChances.color).text}`}
                    >
                      {collegeChances.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {collegeChances.chances.map((chance, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-sm text-gray-700">{chance.name}</span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          chance.probability === 'Very High' || chance.probability === 'High'
                            ? 'bg-green-100 text-green-700'
                            : chance.probability.includes('Moderate')
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {chance.probability}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
            Tips to Improve Your NEET Score
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Focus on Biology</h3>
              <p className="text-sm text-gray-600">
                Biology carries 360 marks (50% of total). Master NCERT thoroughly - 90% questions
                come directly from NCERT.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Practice Mock Tests</h3>
              <p className="text-sm text-gray-600">
                Take at least 2 full-length mock tests every week. Analyze your mistakes and work on
                weak areas.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Time Management</h3>
              <p className="text-sm text-gray-600">
                Attempt Biology first (easiest to score), then Physics/Chemistry. Don&apos;t spend
                more than 2 mins per question.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-yellow-300" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Want to Improve Your Score?
          </h2>
          <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join Cerebrum Biology Academy and get expert guidance to score 300+ in Biology. Our
            students have consistently achieved top ranks in NEET.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-purple-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              View Our Courses
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/demo-booking"
              className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
            >
              Book Free Demo Class
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    How accurate is this rank prediction?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Our predictions are based on historical NEET data and cutoff trends. While we
                    strive for accuracy, actual ranks may vary by 5-10% depending on exam difficulty
                    and competition.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    What is the NEET marking scheme?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Each correct answer awards +4 marks, while each wrong answer deducts -1 mark.
                    Unanswered questions carry no penalty. Total marks = 720 (180 questions × 4
                    marks).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    What score do I need for government medical college?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    For general category students, a score of 600+ (rank under 15,000) gives a good
                    chance at state government medical colleges. For top colleges like AIIMS Delhi,
                    680+ is typically required.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    How can I improve my Biology score specifically?
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Focus on NCERT line-by-line reading, practice diagrams regularly, solve previous
                    year questions topic-wise, and take our specialized Biology course for
                    comprehensive preparation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
