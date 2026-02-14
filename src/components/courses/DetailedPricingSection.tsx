'use client'

import { useState } from 'react'
import { CourseProgram, CourseSeries, CourseTierDetails } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/switch'
import {
  Check,
  X,
  Star,
  Crown,
  Target,
  Calculator,
  CreditCard,
  Gift,
  Clock,
  Users,
  ArrowRight,
  Shield,
  Zap,
  MessageCircle,
} from 'lucide-react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

interface DetailedPricingSectionProps {
  course: CourseProgram
}

// Feature comparison data
const featureComparison = [
  {
    feature: 'Live Classes',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Core Teaching',
  },
  {
    feature: 'Recorded Videos',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Core Teaching',
  },
  {
    feature: 'Personal Mentoring',
    pursuit: false,
    ascent: false,
    pinnacle: true,
    category: 'Core Teaching',
  },
  {
    feature: 'Doubt Sessions',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Core Teaching',
  },
  {
    feature: 'Printed Materials',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Study Materials',
  },
  {
    feature: 'Digital Notes',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Study Materials',
  },
  {
    feature: 'Worksheets',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Study Materials',
  },
  {
    feature: 'Previous Year Papers',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Study Materials',
  },
  {
    feature: 'Weekly Tests',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Assessment',
  },
  {
    feature: 'Test Series',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Assessment',
  },
  {
    feature: 'Mock Tests',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Assessment',
  },
  {
    feature: 'Performance Tracking',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Assessment',
  },
  {
    feature: 'All India Ranking',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Assessment',
  },
  {
    feature: 'Parent Counseling',
    pursuit: false,
    ascent: false,
    pinnacle: true,
    category: 'Support',
  },
  {
    feature: 'Career Guidance',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Support',
  },
  {
    feature: 'Regular Feedback',
    pursuit: false,
    ascent: true,
    pinnacle: true,
    category: 'Support',
  },
  {
    feature: 'Study Planning',
    pursuit: false,
    ascent: false,
    pinnacle: true,
    category: 'Support',
  },
  {
    feature: 'Revision Sessions',
    pursuit: true,
    ascent: true,
    pinnacle: true,
    category: 'Support',
  },
]

const featureCategories = ['Core Teaching', 'Study Materials', 'Assessment', 'Support']

export function DetailedPricingSection({ course }: DetailedPricingSectionProps) {
  const [selectedTier, setSelectedTier] = useState<CourseSeries>('ascent')
  const [paymentMode, setPaymentMode] = useState<'oneTime' | 'installment'>('installment')
  const [emiTenure, setEmiTenure] = useState(6)
  const [emiAmount, setEmiAmount] = useState(50000)

  // Calculate EMI
  const calculateEMI = (principal: number, tenure: number, rate: number = 12) => {
    const monthlyRate = rate / (12 * 100)
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1)
    return Math.round(emi)
  }

  const getTierIcon = (tier: CourseSeries) => {
    switch (tier) {
      case 'pinnacle':
        return <Crown className="h-5 w-5" />
      case 'ascent':
        return <Star className="h-5 w-5" />
      case 'pursuit':
        return <Target className="h-5 w-5" />
    }
  }

  const getTierColor = (tier: CourseSeries) => {
    switch (tier) {
      case 'pinnacle':
        return 'from-purple-600 to-purple-800'
      case 'ascent':
        return 'from-blue-600 to-blue-800'
      case 'pursuit':
        return 'from-green-600 to-green-800'
    }
  }

  const getTierBadge = (tier: CourseSeries) => {
    switch (tier) {
      case 'pinnacle':
        return { text: 'Most Premium', color: 'bg-purple-500' }
      case 'ascent':
        return { text: 'Most Popular', color: 'bg-blue-500' }
      case 'pursuit':
        return { text: 'Best Value', color: 'bg-green-600' }
    }
  }

  const PricingCard = ({
    tier,
    details,
    isHighlighted = false,
  }: {
    tier: CourseSeries
    details: CourseTierDetails
    isHighlighted?: boolean
  }) => {
    const badge = getTierBadge(tier)
    const oneTimePrice =
      paymentMode === 'oneTime' ? details.payment.oneTime.discountedAmount : details.price

    return (
      <Card
        className={`relative overflow-hidden transition-all duration-200 ${
          isHighlighted ? 'ring-2 ring-blue-500 scale-105 shadow-xl' : 'hover:shadow-lg'
        }`}
      >
        {/* Badge */}
        {isHighlighted && (
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${badge.color} text-white px-4 py-1 rounded-full text-xs font-semibold`}
          >
            {badge.text}
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${getTierColor(tier)} text-white mb-3`}
            >
              {getTierIcon(tier)}
            </div>
            <h3 className="text-xl font-bold text-gray-900 capitalize">{tier} Series</h3>
            <p className="text-sm text-gray-600 mt-1">
              Perfect for{' '}
              {tier === 'pinnacle'
                ? 'premium learners'
                : tier === 'ascent'
                  ? 'serious aspirants'
                  : 'budget-conscious students'}
            </p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-900">₹{oneTimePrice.toLocaleString()}</div>
            {paymentMode === 'oneTime' && details.payment.oneTime.discount > 0 && (
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm text-gray-500 line-through">
                  ₹{details.price.toLocaleString()}
                </span>
                <Badge className="bg-green-100 text-green-800">
                  {details.payment.oneTime.discount}% OFF
                </Badge>
              </div>
            )}
            <div className="text-sm text-gray-600 mt-1">
              Batch Size: {details.batchSize} students
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3 mb-6">
            {details.additionalBenefits.slice(0, 4).map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Enrollment Bonus */}
          {details.enrollmentBonus && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Enrollment Bonus</span>
              </div>
              <ul className="space-y-1">
                {details.enrollmentBonus.slice(0, 2).map((bonus, idx) => (
                  <li key={idx} className="text-xs text-yellow-700">
                    • {bonus}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <Button
            className={`w-full ${isHighlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            size="lg"
            onClick={() => setSelectedTier(tier)}
          >
            {isHighlighted ? 'Choose This Plan' : 'Select Plan'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Select the tier that best fits your learning needs and budget. All plans include our
            proven curriculum and expert faculty guidance.
          </p>
        </div>

        {/* Payment Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
              <Label className="flex items-center gap-2 cursor-pointer">
                <Switch
                  checked={paymentMode === 'oneTime'}
                  onCheckedChange={(checked) => setPaymentMode(checked ? 'oneTime' : 'installment')}
                />
                <span className="text-sm font-medium">Pay Full Amount</span>
                <Badge className="bg-green-100 text-green-800">5% OFF</Badge>
              </Label>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <PricingCard tier="pursuit" details={course.tiers.pursuit} />
          <PricingCard tier="ascent" details={course.tiers.ascent} isHighlighted={true} />
          <PricingCard tier="pinnacle" details={course.tiers.pinnacle} />
        </div>

        {/* Feature Comparison Table */}
        <Card className="mb-12">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Detailed Feature Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-3 px-4 font-semibold text-green-700">
                      <div className="flex items-center justify-center gap-2">
                        <Target className="h-4 w-4" />
                        Pursuit
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-blue-700">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="h-4 w-4" />
                        Ascent
                      </div>
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-purple-700">
                      <div className="flex items-center justify-center gap-2">
                        <Crown className="h-4 w-4" />
                        Pinnacle
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureCategories.map((category) => (
                    <>
                      <tr key={category} className="bg-gray-50">
                        <td colSpan={4} className="py-2 px-4 font-medium text-gray-800 text-sm">
                          {category}
                        </td>
                      </tr>
                      {featureComparison
                        .filter((f) => f.category === category)
                        .map((feature) => (
                          <tr key={feature.feature} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-700">{feature.feature}</td>
                            <td className="text-center py-3 px-4">
                              {feature.pursuit ? (
                                <Check className="h-4 w-4 text-green-600 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-gray-300 mx-auto" />
                              )}
                            </td>
                            <td className="text-center py-3 px-4">
                              {feature.ascent ? (
                                <Check className="h-4 w-4 text-green-600 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-gray-300 mx-auto" />
                              )}
                            </td>
                            <td className="text-center py-3 px-4">
                              {feature.pinnacle ? (
                                <Check className="h-4 w-4 text-green-600 mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-gray-300 mx-auto" />
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* EMI Calculator */}
        <Card className="mb-12">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              EMI Calculator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emiAmount">Course Fee (₹)</Label>
                  <Input
                    id="emiAmount"
                    type="number"
                    value={emiAmount}
                    onChange={(e) => setEmiAmount(Number(e.target.value))}
                    placeholder="Enter course fee"
                  />
                </div>
                <div>
                  <Label htmlFor="emiTenure">EMI Tenure (months)</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={emiTenure}
                    onChange={(e) => setEmiTenure(Number(e.target.value))}
                  >
                    <option value={3}>3 months</option>
                    <option value={6}>6 months</option>
                    <option value={9}>9 months</option>
                    <option value={12}>12 months</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-4">EMI Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Monthly EMI:</span>
                    <span className="font-bold text-blue-900">
                      ₹{calculateEMI(emiAmount, emiTenure).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Total Interest:</span>
                    <span className="font-bold text-blue-900">
                      ₹
                      {(
                        calculateEMI(emiAmount, emiTenure) * emiTenure -
                        emiAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-blue-200 pt-2">
                    <span className="text-blue-700">Total Amount:</span>
                    <span className="font-bold text-blue-900">
                      ₹{(calculateEMI(emiAmount, emiTenure) * emiTenure).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-blue-600">
                  *Interest rate: 12% per annum (varies by bank partner)
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center bg-green-50 border-green-200">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-green-800 mb-2">Money-Back Guarantee</h4>
            <p className="text-sm text-green-700">Full refund within 15 days if not satisfied</p>
          </Card>
          <Card className="p-6 text-center bg-blue-50 border-blue-200">
            <Zap className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-blue-800 mb-2">Instant Access</h4>
            <p className="text-sm text-blue-700">Start learning immediately after enrollment</p>
          </Card>
          <Card className="p-6 text-center bg-purple-50 border-purple-200">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-purple-800 mb-2">Limited Seats</h4>
            <p className="text-sm text-purple-700">Hurry! Only few seats remaining</p>
          </Card>
        </div>

        {/* Parent-Specific CTA */}
        <Card className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">👨‍👩‍👧 Are You a Parent?</h3>
                <p className="text-gray-600 mb-4">
                  We understand your concerns about your child's NEET preparation. Chat directly
                  with our counselors to understand fee structure, batch timings, and how we track
                  student progress.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() =>
                      trackAndOpenWhatsApp({
                        source: 'pricing-parent-cta',
                        message: WHATSAPP_MESSAGES.parentFees,
                        campaign: 'parent-engagement',
                      })
                    }
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-5 rounded-lg shadow-md hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat as Parent
                  </button>
                  <a
                    href="/about"
                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-5 rounded-lg border border-gray-300 shadow-sm transition-all duration-300"
                  >
                    <Users className="h-5 w-5" />
                    Parent Guide
                  </a>
                </div>
              </div>
              <div className="hidden md:block text-6xl">👨‍👩‍👧‍👦</div>
            </div>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-indigo-500 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your NEET Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students and take the first step towards your medical
              career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'pricing-section-cta',
                    message: WHATSAPP_MESSAGES.pricing,
                    campaign: 'pricing-page',
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Enroll Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Clock className="h-5 w-5 mr-2" />
                Book Free Counseling
              </Button>
            </div>
            <div className="mt-4 text-xs text-blue-200">
              Limited time offer: Free study materials worth ₹5,000 with every enrollment
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
