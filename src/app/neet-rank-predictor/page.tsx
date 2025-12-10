'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  TrendingUp,
  Award,
  Target,
  ArrowRight,
  CheckCircle,
  Info,
  BookOpen,
  Users,
  GraduationCap,
  BarChart3,
} from 'lucide-react'

const marksToRankData = [
  { marks: 720, rank: 1 },
  { marks: 715, rank: 10 },
  { marks: 710, rank: 50 },
  { marks: 705, rank: 100 },
  { marks: 700, rank: 200 },
  { marks: 690, rank: 500 },
  { marks: 680, rank: 1000 },
  { marks: 670, rank: 2000 },
  { marks: 660, rank: 4000 },
  { marks: 650, rank: 6000 },
  { marks: 640, rank: 10000 },
  { marks: 630, rank: 15000 },
  { marks: 620, rank: 20000 },
  { marks: 610, rank: 28000 },
  { marks: 600, rank: 35000 },
  { marks: 590, rank: 45000 },
  { marks: 580, rank: 55000 },
  { marks: 570, rank: 68000 },
  { marks: 560, rank: 82000 },
  { marks: 550, rank: 100000 },
  { marks: 540, rank: 120000 },
  { marks: 530, rank: 145000 },
  { marks: 520, rank: 170000 },
  { marks: 510, rank: 200000 },
  { marks: 500, rank: 235000 },
  { marks: 490, rank: 275000 },
  { marks: 480, rank: 320000 },
  { marks: 470, rank: 370000 },
  { marks: 460, rank: 425000 },
  { marks: 450, rank: 485000 },
  { marks: 440, rank: 550000 },
  { marks: 430, rank: 620000 },
  { marks: 420, rank: 695000 },
  { marks: 410, rank: 775000 },
  { marks: 400, rank: 860000 },
  { marks: 350, rank: 1200000 },
  { marks: 300, rank: 1500000 },
  { marks: 250, rank: 1750000 },
  { marks: 200, rank: 1900000 },
  { marks: 150, rank: 2000000 },
]

function predictRank(marks: number): { rank: number; percentile: number } {
  if (marks >= 720) return { rank: 1, percentile: 100 }
  if (marks < 150) return { rank: 2100000, percentile: 0 }

  for (let i = 0; i < marksToRankData.length - 1; i++) {
    if (marks <= marksToRankData[i].marks && marks > marksToRankData[i + 1].marks) {
      const upperMarks = marksToRankData[i].marks
      const lowerMarks = marksToRankData[i + 1].marks
      const upperRank = marksToRankData[i].rank
      const lowerRank = marksToRankData[i + 1].rank

      const ratio = (upperMarks - marks) / (upperMarks - lowerMarks)
      const predictedRank = Math.round(upperRank + ratio * (lowerRank - upperRank))
      const percentile = Math.round((1 - predictedRank / 2400000) * 10000) / 100

      return { rank: predictedRank, percentile: Math.min(100, Math.max(0, percentile)) }
    }
  }

  return { rank: 1500000, percentile: 37.5 }
}

function getCollegeChances(rank: number): {
  government: string
  aiims: string
  stateQuota: string
  private: string
  deemed: string
} {
  if (rank <= 50) {
    return {
      government: 'Very High - Top Government Medical Colleges',
      aiims: 'High - AIIMS Delhi possible',
      stateQuota: 'Excellent - Any state college',
      private: 'Any college of choice',
      deemed: 'Any college of choice',
    }
  } else if (rank <= 500) {
    return {
      government: 'Very High - Top Government Colleges',
      aiims: 'Possible - AIIMS other branches',
      stateQuota: 'Excellent - Top state colleges',
      private: 'Any college of choice',
      deemed: 'Any college of choice',
    }
  } else if (rank <= 5000) {
    return {
      government: 'High - Good Government Colleges',
      aiims: 'Low - Few AIIMS branches',
      stateQuota: 'Very Good - Good state colleges',
      private: 'Excellent chances',
      deemed: 'Excellent chances',
    }
  } else if (rank <= 20000) {
    return {
      government: 'Moderate - Some Government Colleges',
      aiims: 'Very Low',
      stateQuota: 'Good - State quota possible',
      private: 'High chances',
      deemed: 'High chances',
    }
  } else if (rank <= 50000) {
    return {
      government: 'Low - Few Government options',
      aiims: 'Not possible',
      stateQuota: 'Moderate chances',
      private: 'Good chances',
      deemed: 'Good chances',
    }
  } else if (rank <= 100000) {
    return {
      government: 'Very Low - Limited options',
      aiims: 'Not possible',
      stateQuota: 'Low chances',
      private: 'Moderate chances',
      deemed: 'Moderate chances',
    }
  } else {
    return {
      government: 'Very difficult',
      aiims: 'Not possible',
      stateQuota: 'Low chances',
      private: 'Some options available',
      deemed: 'Some options available',
    }
  }
}

export default function NEETRankPredictorPage() {
  const [marks, setMarks] = useState<string>('')
  const [result, setResult] = useState<{
    rank: number
    percentile: number
    chances: ReturnType<typeof getCollegeChances>
  } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handlePredict = () => {
    const marksNum = parseInt(marks)
    if (isNaN(marksNum) || marksNum < 0 || marksNum > 720) {
      alert('Please enter valid marks between 0 and 720')
      return
    }

    const prediction = predictRank(marksNum)
    const chances = getCollegeChances(prediction.rank)
    setResult({ ...prediction, chances })
    setShowResult(true)
  }

  const handleReset = () => {
    setMarks('')
    setResult(null)
    setShowResult(false)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'NEET Rank Predictor 2026',
            description:
              'Free NEET Rank Predictor tool to estimate your All India Rank based on marks. Get accurate predictions for NEET 2026.',
            url: 'https://www.cerebrumbiologyacademy.com/neet-rank-predictor',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
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
                item: 'https://www.cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'NEET Rank Predictor',
                item: 'https://www.cerebrumbiologyacademy.com/neet-rank-predictor',
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 py-16 text-white md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="container relative mx-auto px-4">
            <nav className="mb-6 text-sm">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>NEET Rank Predictor</span>
            </nav>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET Rank Predictor 2026</h1>
            <p className="mb-6 max-w-2xl text-lg text-orange-100 md:text-xl">
              Free tool to predict your NEET 2026 All India Rank based on your expected marks. Get
              accurate rank prediction and college admission chances.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Calculator className="h-5 w-5" />
                <span className="font-semibold">100% Free</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Based on 2024 Data</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Instant Results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="-mt-8 px-4">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                    <Calculator className="h-8 w-8 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Enter Your NEET Marks</h2>
                  <p className="text-gray-600">Get instant rank prediction for NEET 2026</p>
                </div>

                {!showResult ? (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="marks"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Expected NEET Marks (Out of 720)
                      </label>
                      <input
                        type="number"
                        id="marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        min="0"
                        max="720"
                        placeholder="Enter marks (0-720)"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      />
                    </div>

                    <button
                      onClick={handlePredict}
                      className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:from-orange-700 hover:to-red-700"
                    >
                      Predict My Rank
                    </button>

                    <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4">
                      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                      <p className="text-sm text-blue-800">
                        This prediction is based on NEET 2024 data and historical trends. Actual
                        ranks may vary based on paper difficulty and number of candidates.
                      </p>
                    </div>
                  </div>
                ) : (
                  result && (
                    <div className="space-y-6">
                      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-center text-white">
                        <p className="mb-2 text-orange-100">Your Predicted NEET Rank</p>
                        <p className="text-5xl font-bold">{result.rank.toLocaleString('en-IN')}</p>
                        <p className="mt-2 text-orange-100">Percentile: {result.percentile}%</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-4">
                          <p className="text-sm text-gray-600">Marks Entered</p>
                          <p className="text-2xl font-bold text-gray-900">{marks}/720</p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                          <p className="text-sm text-gray-600">Percentile</p>
                          <p className="text-2xl font-bold text-orange-600">{result.percentile}%</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">
                          College Admission Chances
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                            <span className="font-medium text-gray-700">Government Medical</span>
                            <span className="text-sm text-green-700">
                              {result.chances.government}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                            <span className="font-medium text-gray-700">AIIMS</span>
                            <span className="text-sm text-blue-700">{result.chances.aiims}</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                            <span className="font-medium text-gray-700">State Quota</span>
                            <span className="text-sm text-purple-700">
                              {result.chances.stateQuota}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-orange-50 p-3">
                            <span className="font-medium text-gray-700">Private Medical</span>
                            <span className="text-sm text-orange-700">
                              {result.chances.private}
                            </span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-gray-100 p-3">
                            <span className="font-medium text-gray-700">Deemed University</span>
                            <span className="text-sm text-gray-700">{result.chances.deemed}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleReset}
                          className="flex-1 rounded-lg border-2 border-orange-600 px-6 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                        >
                          Try Again
                        </button>
                        <Link
                          href="/neet-college-predictor"
                          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700"
                        >
                          Find Colleges
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Marks vs Rank Table */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              NEET Marks vs Rank Reference Table
            </h2>

            <div className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-orange-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left">NEET Marks</th>
                      <th className="px-6 py-4 text-center">Expected Rank</th>
                      <th className="px-6 py-4 text-center">College Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">710-720</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">1-50</td>
                      <td className="px-6 py-4 text-center text-gray-600">AIIMS Delhi, Top GMCs</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">690-710</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        50-500
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        AIIMS, JIPMER, Top GMCs
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">660-690</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        500-5,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        Government Medical Colleges
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">620-660</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        5,000-20,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        State GMCs, Some Private
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">580-620</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        20,000-55,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        State Quota, Private Colleges
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">540-580</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        55,000-1,20,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        Private, Deemed Universities
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">500-540</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        1,20,000-2,35,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">Private Colleges, BDS</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">450-500</td>
                      <td className="px-6 py-4 text-center font-semibold text-orange-600">
                        2,35,000-4,85,000
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        BAMS, BHMS, BDS Private
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Note: Ranks are approximate and based on previous year data. Actual ranks depend on
                exam difficulty and competition.
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              How NEET Rank Predictor Works
            </h2>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
                  1
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Enter Your Marks</h3>
                <p className="text-gray-600">
                  Enter your expected or actual NEET marks (out of 720) in the calculator above.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
                  2
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Algorithm Processing</h3>
                <p className="text-gray-600">
                  Our algorithm uses previous year NEET data and statistical models to predict your
                  rank.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
                  3
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Get Results</h3>
                <p className="text-gray-600">
                  Receive your predicted rank, percentile, and college admission chances instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-orange-600 to-red-600">
              <div className="grid items-center md:grid-cols-2">
                <div className="p-8 text-white md:p-12">
                  <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                    Improve Your NEET Rank with Expert Guidance
                  </h2>
                  <p className="mb-6 text-orange-100">
                    Join Cerebrum Biology Academy to maximize your Biology score and improve your
                    overall NEET rank. Our comprehensive course helps you score 350+ in Biology.
                  </p>
                  <ul className="mb-6 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>NCERT-focused Biology preparation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>1000+ chapter-wise MCQs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Previous year paper analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span>Expert faculty from top medical colleges</span>
                    </li>
                  </ul>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/demo"
                      className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-orange-600 transition-colors hover:bg-orange-50"
                    >
                      Book Free Demo Class
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Explore Courses
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative h-full min-h-[400px] bg-gradient-to-br from-orange-500/30 to-transparent">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="h-48 w-48 text-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>

            <div className="mx-auto max-w-3xl space-y-4">
              {[
                {
                  question: 'How accurate is the NEET Rank Predictor?',
                  answer:
                    'Our NEET Rank Predictor is based on previous year data and provides an approximate rank. Actual ranks may vary by 5-10% depending on exam difficulty and number of candidates.',
                },
                {
                  question: 'What data is used for rank prediction?',
                  answer:
                    'We use NEET 2024 official data, historical trends from 2019-2024, and statistical interpolation to provide accurate predictions.',
                },
                {
                  question: 'Can I use this for NEET 2026?',
                  answer:
                    'Yes, this predictor gives a good estimate for NEET 2026 based on historical patterns. The actual cutoffs may shift slightly based on paper difficulty.',
                },
                {
                  question: 'What marks do I need for government medical college?',
                  answer:
                    'For government medical colleges, you typically need 600+ marks (rank below 35,000) for General category. Reserved categories may get admission with slightly lower marks.',
                },
                {
                  question: 'How to improve my NEET rank?',
                  answer:
                    'Focus on high-weightage chapters (Human Physiology, Genetics, Ecology), master NCERT thoroughly, solve previous year papers, and take regular mock tests.',
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

        {/* Related Pages */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Related Tools & Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <Link
                href="/neet-college-predictor"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
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
                href="/neet-2026-exam-date"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-orange-600">
                  NEET 2026 Exam Date
                </h3>
                <p className="text-sm text-gray-600">Complete schedule and important dates</p>
              </Link>

              <Link
                href="/neet-biology-syllabus-2026"
                className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <BookOpen className="h-6 w-6 text-orange-600" />
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
