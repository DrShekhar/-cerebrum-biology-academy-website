'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  PiggyBank,
  Award,
  TrendingDown,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Receipt,
  Target,
  Zap,
  Gift,
} from 'lucide-react'

// Types
interface CourseData {
  id: string
  name: string
  seriesId: 'pinnacle' | 'ascent' | 'pursuit'
  planId: 'A' | 'B' | 'C'
  price: number
  duration: string
  features: string[]
}

interface FamilyProfile {
  monthlyIncome: number
  dependents: number
  existingEMIs: number
  savingsGoal: number
  previousEducationSpend: number
}

interface ScholarshipCriteria {
  id: string
  name: string
  eligibilityType: 'merit' | 'need' | 'category' | 'special'
  discount: number
  maxDiscount: number
  requirements: string[]
  description: string
}

interface CompetitorPrice {
  name: string
  price: number
  features: number
  successRate: number
  batchSize: number
}

interface FinancialPlanningProps {
  course: CourseData
  familyProfile?: FamilyProfile
  onPlanSelect?: (plan: any) => void
  className?: string
}

// Scholarship data
const SCHOLARSHIPS: ScholarshipCriteria[] = [
  {
    id: 'merit-topper',
    name: 'Academic Excellence Scholarship',
    eligibilityType: 'merit',
    discount: 25,
    maxDiscount: 50000,
    requirements: [
      'Board exam score 90%+',
      'Entrance test score 85%+',
      'Consistent academic performance',
    ],
    description: 'For students with outstanding academic achievements',
  },
  {
    id: 'need-based',
    name: 'Financial Support Scholarship',
    eligibilityType: 'need',
    discount: 20,
    maxDiscount: 40000,
    requirements: [
      'Family income < ₹5L annually',
      'Single parent/guardian',
      'Financial hardship documentation',
    ],
    description: 'Supporting students from economically disadvantaged backgrounds',
  },
  {
    id: 'dropper-special',
    name: 'Second Chance Scholarship',
    eligibilityType: 'special',
    discount: 15,
    maxDiscount: 30000,
    requirements: [
      'Previous NEET attempt',
      'Score improvement commitment',
      'Counseling session completion',
    ],
    description: 'Special support for dropper students',
  },
  {
    id: 'rural-student',
    name: 'Rural Student Support',
    eligibilityType: 'category',
    discount: 18,
    maxDiscount: 35000,
    requirements: [
      'Rural area residence certificate',
      'Government school background',
      'Community recommendation',
    ],
    description: 'Encouraging rural students to pursue medical education',
  },
]

// Competitor pricing data
const COMPETITOR_PRICING: CompetitorPrice[] = [
  {
    name: 'Aakash Institute',
    price: 95000,
    features: 8,
    successRate: 87.5,
    batchSize: 30,
  },
  {
    name: 'Allen Career',
    price: 110000,
    features: 9,
    successRate: 91.2,
    batchSize: 25,
  },
  {
    name: "BYJU'S",
    price: 85000,
    features: 7,
    successRate: 85.8,
    batchSize: 40,
  },
  {
    name: 'Unacademy',
    price: 75000,
    features: 6,
    successRate: 82.4,
    batchSize: 50,
  },
  {
    name: 'Resonance',
    price: 125000,
    features: 10,
    successRate: 93.1,
    batchSize: 20,
  },
]

// Fee Breakdown Component
function FeeBreakdown({
  course,
  appliedScholarships = [],
}: {
  course: CourseData
  appliedScholarships?: ScholarshipCriteria[]
}) {
  const breakdown = {
    baseFee: course.price,
    registrationFee: 5000,
    studyMaterials: Math.round(course.price * 0.15),
    testSeries: Math.round(course.price * 0.1),
    technologyFee: Math.round(course.price * 0.05),
    gst: Math.round((course.price + 5000) * 0.18),
  }

  const totalBeforeDiscount = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

  const scholarshipDiscount = appliedScholarships.reduce((total, scholarship) => {
    return (
      total + Math.min(scholarship.maxDiscount, (breakdown.baseFee * scholarship.discount) / 100)
    )
  }, 0)

  const finalTotal = totalBeforeDiscount - scholarshipDiscount

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Receipt className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Complete Fee Breakdown</h3>
      </div>

      <div className="space-y-3">
        {/* Base components */}
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Course Fee</span>
          <span className="font-semibold">₹{breakdown.baseFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Registration Fee</span>
          <span className="font-semibold">₹{breakdown.registrationFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Study Materials</span>
          <span className="font-semibold">₹{breakdown.studyMaterials.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Test Series</span>
          <span className="font-semibold">₹{breakdown.testSeries.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">Technology Platform</span>
          <span className="font-semibold">₹{breakdown.technologyFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-700">GST (18%)</span>
          <span className="font-semibold">₹{breakdown.gst.toLocaleString()}</span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between items-center py-2 font-semibold text-lg">
            <span>Subtotal</span>
            <span>₹{totalBeforeDiscount.toLocaleString()}</span>
          </div>
        </div>

        {/* Scholarships */}
        {appliedScholarships.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2 flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Applied Scholarships
            </h4>
            {appliedScholarships.map((scholarship) => {
              const discount = Math.min(
                scholarship.maxDiscount,
                (breakdown.baseFee * scholarship.discount) / 100
              )
              return (
                <div key={scholarship.id} className="flex justify-between items-center py-1">
                  <span className="text-green-700 text-sm">{scholarship.name}</span>
                  <span className="font-semibold text-green-800">
                    -₹{discount.toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Final total */}
        <div className="border-t-2 border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Final Amount</span>
            <span className="text-2xl font-bold text-blue-600">₹{finalTotal.toLocaleString()}</span>
          </div>
          {scholarshipDiscount > 0 && (
            <div className="text-sm text-green-600 text-right mt-1">
              You save ₹{scholarshipDiscount.toLocaleString()}!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Installment Schedule Component
function InstallmentSchedule({
  totalAmount,
  planType = 'monthly',
}: {
  totalAmount: number
  planType: 'quarterly' | 'monthly' | 'biannual' | 'single'
}) {
  const plans = {
    single: { installments: 1, frequency: 'One-time', discount: 0.1 },
    biannual: { installments: 2, frequency: 'Every 6 months', discount: 0.05 },
    quarterly: { installments: 4, frequency: 'Every 3 months', discount: 0.02 },
    monthly: { installments: 12, frequency: 'Monthly', discount: 0 },
  }

  const plan = plans[planType]
  const discountAmount = totalAmount * plan.discount
  const finalAmount = totalAmount - discountAmount
  const installmentAmount = Math.round(finalAmount / plan.installments)

  const generateSchedule = () => {
    const schedule = []
    const today = new Date()

    for (let i = 0; i < plan.installments; i++) {
      const dueDate = new Date(today)

      switch (planType) {
        case 'monthly':
          dueDate.setMonth(today.getMonth() + i)
          break
        case 'quarterly':
          dueDate.setMonth(today.getMonth() + i * 3)
          break
        case 'biannual':
          dueDate.setMonth(today.getMonth() + i * 6)
          break
        case 'single':
          dueDate.setDate(today.getDate() + 7) // 1 week for single payment
          break
      }

      schedule.push({
        installmentNo: i + 1,
        dueDate: dueDate.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        amount:
          i === plan.installments - 1
            ? finalAmount - installmentAmount * (plan.installments - 1) // Adjust last installment
            : installmentAmount,
        status: i === 0 ? 'due' : 'upcoming',
      })
    }

    return schedule
  }

  const schedule = generateSchedule()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Schedule</h3>
        </div>
        <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {plan.frequency}
        </div>
      </div>

      {/* Savings highlight */}
      {discountAmount > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <PiggyBank className="w-5 h-5 text-green-600 mr-2" />
            <div>
              <div className="font-semibold text-green-900">
                Early Payment Savings: ₹{discountAmount.toLocaleString()}
              </div>
              <div className="text-sm text-green-700">
                {plan.discount * 100}% discount for {planType} payment
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule table */}
      <div className="space-y-3">
        {schedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg border-2 ${
              item.status === 'due'
                ? 'border-orange-200 bg-orange-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.status === 'due'
                    ? 'bg-orange-200 text-orange-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {item.installmentNo}
              </div>
              <div className="ml-4">
                <div className="font-semibold text-gray-900">Installment {item.installmentNo}</div>
                <div className="text-sm text-gray-600">Due: {item.dueDate}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">₹{item.amount.toLocaleString()}</div>
              <div
                className={`text-xs font-medium ${
                  item.status === 'due' ? 'text-orange-600' : 'text-gray-500'
                }`}
              >
                {item.status === 'due' ? 'Payment Due' : 'Upcoming'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Installments:</span>
            <span className="font-semibold ml-2">{plan.installments}</span>
          </div>
          <div>
            <span className="text-gray-600">Final Amount:</span>
            <span className="font-semibold ml-2">₹{finalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Scholarship Checker Component
function ScholarshipChecker({
  course,
  onScholarshipSelect,
}: {
  course: CourseData
  onScholarshipSelect: (scholarships: ScholarshipCriteria[]) => void
}) {
  const [selectedScholarships, setSelectedScholarships] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState({
    boardScore: '',
    familyIncome: '',
    category: '',
    location: '',
    previousAttempt: false,
    documentation: false,
  })

  const eligibleScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter((scholarship) => {
      switch (scholarship.eligibilityType) {
        case 'merit':
          return parseFloat(userProfile.boardScore) >= 90
        case 'need':
          return parseFloat(userProfile.familyIncome) <= 500000
        case 'special':
          return userProfile.previousAttempt
        case 'category':
          return userProfile.location === 'rural'
        default:
          return true
      }
    })
  }, [userProfile])

  const handleScholarshipToggle = (scholarshipId: string) => {
    const newSelected = selectedScholarships.includes(scholarshipId)
      ? selectedScholarships.filter((id) => id !== scholarshipId)
      : [...selectedScholarships, scholarshipId]

    setSelectedScholarships(newSelected)

    const selectedScholarshipObjects = SCHOLARSHIPS.filter((s) => newSelected.includes(s.id))
    onScholarshipSelect(selectedScholarshipObjects)
  }

  const totalDiscount = selectedScholarships.reduce((total, id) => {
    const scholarship = SCHOLARSHIPS.find((s) => s.id === id)
    if (!scholarship) return total

    return total + Math.min(scholarship.maxDiscount, (course.price * scholarship.discount) / 100)
  }, 0)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Award className="w-5 h-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Scholarship Checker</h3>
      </div>

      {/* User Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Board Exam Score (%)
          </label>
          <input
            type="number"
            value={userProfile.boardScore}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, boardScore: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 95"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Family Income (₹)
          </label>
          <input
            type="number"
            value={userProfile.familyIncome}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, familyIncome: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 400000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Type</label>
          <select
            value={userProfile.location}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select location</option>
            <option value="urban">Urban</option>
            <option value="rural">Rural</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={userProfile.previousAttempt}
              onChange={(e) =>
                setUserProfile((prev) => ({ ...prev, previousAttempt: e.target.checked }))
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Previous NEET attempt</span>
          </label>
        </div>
      </div>

      {/* Eligible Scholarships */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Available Scholarships</h4>

        {eligibleScholarships.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Fill in your details above to check scholarship eligibility</p>
          </div>
        ) : (
          eligibleScholarships.map((scholarship) => {
            const isSelected = selectedScholarships.includes(scholarship.id)
            const discount = Math.min(
              scholarship.maxDiscount,
              (course.price * scholarship.discount) / 100
            )

            return (
              <div
                key={scholarship.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleScholarshipToggle(scholarship.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          isSelected ? 'border-green-600 bg-green-600' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      <h5 className="font-semibold text-gray-900">{scholarship.name}</h5>
                    </div>
                    <p className="text-sm text-gray-600 ml-8 mt-1">{scholarship.description}</p>

                    <div className="ml-8 mt-2">
                      <div className="text-sm text-gray-700 mb-1">Requirements:</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {scholarship.requirements.map((req, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-green-600">
                      ₹{discount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">{scholarship.discount}% off</div>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Total Savings */}
        {totalDiscount > 0 && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gift className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-900">Total Scholarship Savings</span>
              </div>
              <span className="text-xl font-bold text-green-600">
                ₹{totalDiscount.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Competitor Comparison Component
function CompetitorComparison({ course }: { course: CourseData }) {
  const ourFeatureScore = course.features.length
  const ourSuccessRate =
    course.seriesId === 'pinnacle' ? 98.5 : course.seriesId === 'ascent' ? 98 : 89.7
  const ourBatchSize = course.seriesId === 'pinnacle' ? 12 : course.seriesId === 'ascent' ? 25 : 35

  const comparison = COMPETITOR_PRICING.map((competitor) => ({
    ...competitor,
    priceDiff: competitor.price - course.price,
    valueScore: calculateValueScore(competitor, {
      price: course.price,
      features: ourFeatureScore,
      successRate: ourSuccessRate,
      batchSize: ourBatchSize,
    }),
  })).sort((a, b) => b.valueScore - a.valueScore)

  function calculateValueScore(competitor: CompetitorPrice, ours: any) {
    let score = 50 // Base score

    // Price advantage (40% weight)
    if (ours.price < competitor.price) {
      score += ((competitor.price - ours.price) / competitor.price) * 40
    } else {
      score -= ((ours.price - competitor.price) / ours.price) * 20
    }

    // Success rate (30% weight)
    if (ours.successRate > competitor.successRate) {
      score += ((ours.successRate - competitor.successRate) / competitor.successRate) * 30
    } else {
      score -= ((competitor.successRate - ours.successRate) / ours.successRate) * 15
    }

    // Batch size advantage (20% weight) - smaller is better
    if (ours.batchSize < competitor.batchSize) {
      score += ((competitor.batchSize - ours.batchSize) / competitor.batchSize) * 20
    } else {
      score -= ((ours.batchSize - competitor.batchSize) / ours.batchSize) * 10
    }

    // Feature advantage (10% weight)
    if (ours.features > competitor.features) {
      score += ((ours.features - competitor.features) / competitor.features) * 10
    } else {
      score -= ((competitor.features - ours.features) / ours.features) * 5
    }

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Competitor Analysis</h3>
      </div>

      <div className="space-y-4">
        {/* Our course highlight */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-blue-900">{course.name} (Cerebrum)</h4>
              <div className="text-sm text-blue-700 mt-1">
                {ourFeatureScore} Features • {ourSuccessRate}% Success Rate • Batch: {ourBatchSize}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                ₹{course.price.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700 font-medium">Our Price</div>
            </div>
          </div>
        </div>

        {/* Competitor list */}
        {comparison.map((competitor, index) => (
          <div key={competitor.name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex-grow">
                <h5 className="font-semibold text-gray-900">{competitor.name}</h5>
                <div className="text-sm text-gray-600 mt-1">
                  {competitor.features} Features • {competitor.successRate}% Success Rate • Batch:{' '}
                  {competitor.batchSize}
                </div>

                {/* Value score */}
                <div className="mt-2 flex items-center">
                  <span className="text-xs text-gray-500 mr-2">Value vs Ours:</span>
                  <div
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      competitor.valueScore >= 60
                        ? 'bg-red-100 text-red-700'
                        : competitor.valueScore >= 40
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {competitor.valueScore >= 60
                      ? 'Competitive'
                      : competitor.valueScore >= 40
                        ? 'Moderate'
                        : 'We Win'}
                  </div>
                </div>
              </div>

              <div className="text-right ml-4">
                <div className="text-lg font-bold text-gray-900">
                  ₹{competitor.price.toLocaleString()}
                </div>
                <div
                  className={`text-sm font-medium flex items-center ${
                    competitor.priceDiff > 0
                      ? 'text-green-600'
                      : competitor.priceDiff < 0
                        ? 'text-red-600'
                        : 'text-gray-600'
                  }`}
                >
                  {competitor.priceDiff > 0 ? (
                    <>
                      <TrendingDown className="w-4 h-4 mr-1" />
                      +₹{Math.abs(competitor.priceDiff).toLocaleString()} more
                    </>
                  ) : competitor.priceDiff < 0 ? (
                    <>
                      <TrendingUp className="w-4 h-4 mr-1" />₹
                      {Math.abs(competitor.priceDiff).toLocaleString()} less
                    </>
                  ) : (
                    'Same price'
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary insight */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">Competitive Advantage</h4>
            <p className="text-sm text-green-700 mt-1">
              Our {course.name} offers the best value with{' '}
              {comparison.filter((c) => c.priceDiff > 0).length} out of {comparison.length}{' '}
              competitors charging more, while maintaining superior success rates and smaller batch
              sizes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Family Affordability Assessment Component
function FamilyAffordabilityAssessment({
  totalAmount,
  familyProfile,
}: {
  totalAmount: number
  familyProfile?: FamilyProfile
}) {
  const [profile, setProfile] = useState<FamilyProfile>(
    familyProfile || {
      monthlyIncome: 0,
      dependents: 2,
      existingEMIs: 0,
      savingsGoal: 0,
      previousEducationSpend: 0,
    }
  )

  const assessment = useMemo(() => {
    if (profile.monthlyIncome === 0) return null

    const annualIncome = profile.monthlyIncome * 12
    const disposableIncome =
      profile.monthlyIncome - profile.existingEMIs - profile.monthlyIncome * 0.3 // 30% for basic expenses
    const educationBudgetPercent = Math.min(25, Math.max(10, (totalAmount / annualIncome) * 100))
    const recommendedEMI = (disposableIncome * educationBudgetPercent) / 100

    const emiOptions = [
      { months: 6, emi: Math.round(totalAmount / 6), strain: 'High' },
      { months: 12, emi: Math.round(totalAmount / 12), strain: 'Medium' },
      { months: 18, emi: Math.round(totalAmount / 18), strain: 'Low' },
      { months: 24, emi: Math.round(totalAmount / 24), strain: 'Very Low' },
    ]

    const affordabilityRating =
      totalAmount <= annualIncome * 0.15
        ? 'Excellent'
        : totalAmount <= annualIncome * 0.25
          ? 'Good'
          : totalAmount <= annualIncome * 0.35
            ? 'Moderate'
            : 'Challenging'

    return {
      disposableIncome,
      recommendedEMI,
      emiOptions,
      affordabilityRating,
      educationBudgetPercent,
    }
  }, [profile, totalAmount])

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-green-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Family Affordability Assessment</h3>
      </div>

      {/* Profile Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Family Income (₹)
          </label>
          <input
            type="number"
            value={profile.monthlyIncome || ''}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, monthlyIncome: parseInt(e.target.value) || 0 }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 50000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Dependents
          </label>
          <select
            value={profile.dependents}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, dependents: parseInt(e.target.value) }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Existing EMIs (₹/month)
          </label>
          <input
            type="number"
            value={profile.existingEMIs || ''}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, existingEMIs: parseInt(e.target.value) || 0 }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 15000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Previous Education Spend (₹/year)
          </label>
          <input
            type="number"
            value={profile.previousEducationSpend || ''}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                previousEducationSpend: parseInt(e.target.value) || 0,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 30000"
          />
        </div>
      </div>

      {/* Assessment Results */}
      {assessment && (
        <div className="space-y-4">
          {/* Affordability Rating */}
          <div
            className={`p-4 rounded-lg border-2 ${
              assessment.affordabilityRating === 'Excellent'
                ? 'bg-green-50 border-green-200'
                : assessment.affordabilityRating === 'Good'
                  ? 'bg-blue-50 border-blue-200'
                  : assessment.affordabilityRating === 'Moderate'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">Affordability Rating</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Based on {assessment.educationBudgetPercent.toFixed(1)}% of annual income
                </p>
              </div>
              <div
                className={`text-xl font-bold ${
                  assessment.affordabilityRating === 'Excellent'
                    ? 'text-green-600'
                    : assessment.affordabilityRating === 'Good'
                      ? 'text-blue-600'
                      : assessment.affordabilityRating === 'Moderate'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                }`}
              >
                {assessment.affordabilityRating}
              </div>
            </div>
          </div>

          {/* EMI Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Recommended Payment Plans</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {assessment.emiOptions.map((option) => (
                <div
                  key={option.months}
                  className={`p-4 border rounded-lg ${
                    option.emi <= assessment.recommendedEMI
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{option.months} Months</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        option.strain === 'Very Low'
                          ? 'bg-green-100 text-green-700'
                          : option.strain === 'Low'
                            ? 'bg-blue-100 text-blue-700'
                            : option.strain === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {option.strain} Strain
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{option.emi.toLocaleString()}/month
                  </div>
                  {option.emi <= assessment.recommendedEMI && (
                    <div className="text-xs text-green-600 mt-1 font-medium">
                      ✓ Within recommended budget
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Financial Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Financial Recommendations
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Recommended EMI budget: ₹{assessment.recommendedEMI.toLocaleString()}/month</li>
              <li>• Consider 12-18 month payment plan for optimal cash flow</li>
              {assessment.affordabilityRating === 'Challenging' && (
                <li>• Explore scholarship options to reduce total cost</li>
              )}
              <li>• Maintain 3-month emergency fund alongside education investment</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// Main Financial Planning Module
export default function FinancialPlanningModule({
  course,
  familyProfile,
  onPlanSelect,
  className = '',
}: FinancialPlanningProps) {
  const [activeTab, setActiveTab] = useState<
    'breakdown' | 'schedule' | 'savings' | 'scholarships' | 'comparison' | 'affordability'
  >('breakdown')
  const [paymentPlan, setPaymentPlan] = useState<'quarterly' | 'monthly' | 'biannual' | 'single'>(
    'monthly'
  )
  const [appliedScholarships, setAppliedScholarships] = useState<ScholarshipCriteria[]>([])

  const tabs = [
    { id: 'breakdown', label: 'Fee Breakdown', icon: Receipt },
    { id: 'schedule', label: 'Payment Schedule', icon: Calendar },
    { id: 'savings', label: 'Savings Options', icon: PiggyBank },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'comparison', label: 'Market Comparison', icon: TrendingUp },
    { id: 'affordability', label: 'Affordability', icon: Users },
  ]

  const totalWithScholarships = useMemo(() => {
    const baseFee = course.price + 5000 // Registration fee
    const additionalFees = Math.round(baseFee * 0.48) // Materials, tests, GST etc.
    const totalBeforeDiscount = baseFee + additionalFees

    const scholarshipDiscount = appliedScholarships.reduce((total, scholarship) => {
      return total + Math.min(scholarship.maxDiscount, (course.price * scholarship.discount) / 100)
    }, 0)

    return totalBeforeDiscount - scholarshipDiscount
  }, [course.price, appliedScholarships])

  return (
    <div
      className={`bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Financial Planning Calculator</h2>
            <p className="text-blue-100">
              Complete fee planning and affordability assessment for {course.name}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{totalWithScholarships.toLocaleString()}</div>
            <div className="text-sm text-blue-200">
              {appliedScholarships.length > 0 ? 'After scholarships' : 'Total amount'}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'breakdown' && (
            <motion.div
              key="breakdown"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FeeBreakdown course={course} appliedScholarships={appliedScholarships} />
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'single', label: 'Single Payment', discount: '10%' },
                    { id: 'biannual', label: 'Half-Yearly', discount: '5%' },
                    { id: 'quarterly', label: 'Quarterly', discount: '2%' },
                    { id: 'monthly', label: 'Monthly', discount: '0%' },
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setPaymentPlan(plan.id as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        paymentPlan === plan.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {plan.label}
                      {plan.discount !== '0%' && (
                        <span className="ml-1 text-xs">({plan.discount} off)</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <InstallmentSchedule totalAmount={totalWithScholarships} planType={paymentPlan} />
            </motion.div>
          )}

          {activeTab === 'savings' && (
            <motion.div
              key="savings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <PiggyBank className="w-5 h-5 text-green-600 mr-2" />
                  Early Payment Savings
                </h3>
                <div className="space-y-4">
                  {[
                    { plan: 'Single Payment', discount: 10, savings: totalWithScholarships * 0.1 },
                    { plan: 'Half-Yearly', discount: 5, savings: totalWithScholarships * 0.05 },
                    { plan: 'Quarterly', discount: 2, savings: totalWithScholarships * 0.02 },
                  ].map((option) => (
                    <div
                      key={option.plan}
                      className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{option.plan}</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          ₹{option.savings.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">{option.discount}% discount</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-2" />
                  Additional Benefits
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Priority Support</div>
                      <div className="text-sm text-gray-600">
                        24/7 dedicated support for advance payments
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Free Material Upgrades</div>
                      <div className="text-sm text-gray-600">
                        Latest study materials at no extra cost
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Bonus Mock Tests</div>
                      <div className="text-sm text-gray-600">
                        Additional 10 mock tests worth ₹5,000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'scholarships' && (
            <motion.div
              key="scholarships"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScholarshipChecker course={course} onScholarshipSelect={setAppliedScholarships} />
            </motion.div>
          )}

          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CompetitorComparison course={course} />
            </motion.div>
          )}

          {activeTab === 'affordability' && (
            <motion.div
              key="affordability"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FamilyAffordabilityAssessment
                totalAmount={totalWithScholarships}
                familyProfile={familyProfile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Footer */}
      <div className="bg-gray-50 border-t border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              onPlanSelect?.({
                course,
                totalAmount: totalWithScholarships,
                paymentPlan,
                scholarships: appliedScholarships,
              })
            }
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            💳 Proceed to Payment
          </button>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            📞 Speak to Financial Counselor
          </button>
          <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            📊 Download Financial Plan
          </button>
        </div>
      </div>
    </div>
  )
}
