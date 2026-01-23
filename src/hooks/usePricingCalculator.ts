import { useState, useCallback } from 'react'
import { CourseSelectionData } from './useCourseSelectorState'
import { CourseData } from './useCourseAPI'

export interface PricingPlan {
  id: string
  name: string
  type: 'full-payment' | 'quarterly' | 'monthly' | 'custom'
  totalAmount: number
  installments: PricingInstallment[]
  processingFee: number
  discount: {
    amount: number
    percentage: number
    reason: string[]
  }
  benefits: string[]
  popular?: boolean
  savings?: number
}

export interface PricingInstallment {
  number: number
  amount: number
  dueDate: Date
  description: string
  late_fee?: number
}

export interface ScholarshipEligibility {
  type: 'merit' | 'financial' | 'special' | 'early-bird'
  name: string
  discount: number
  eligibility: string[]
  requirements: string[]
  deadline?: Date
  maxBeneficiaries?: number
  claimed?: boolean
}

export interface PricingBreakdown {
  basePrice: number
  discounts: {
    scholarships: number
    earlyBird: number
    family: number
    referral: number
    loyalty: number
  }
  taxes: {
    gst: number
    serviceTax: number
  }
  fees: {
    processing: number
    payment: number
    material: number
  }
  finalAmount: number
  savings: number
}

export interface PricingCalculation {
  course: CourseData
  plans: PricingPlan[]
  breakdown: PricingBreakdown
  scholarships: ScholarshipEligibility[]
  recommendations: {
    bestValue: string
    leastEMI: string
    quickStart: string
  }
  comparison: {
    competitors: Array<{
      name: string
      price: number
      features: string[]
    }>
    valueProposition: string[]
  }
}

const SCHOLARSHIP_PROGRAMS: ScholarshipEligibility[] = [
  {
    type: 'merit',
    name: 'Academic Excellence Scholarship',
    discount: 25,
    eligibility: ['Class 12 > 85%', 'Previous NEET attempt > 400'],
    requirements: ['Academic certificates', 'NEET scorecard'],
    deadline: new Date('2025-12-31'),
    maxBeneficiaries: 100,
  },
  {
    type: 'financial',
    name: 'Financial Support Scholarship',
    discount: 30,
    eligibility: ['Family income < ₹3L/year', 'Single parent/guardian'],
    requirements: ['Income certificate', 'Bank statements', 'Family details'],
    deadline: new Date('2025-11-30'),
    maxBeneficiaries: 50,
  },
  {
    type: 'special',
    name: 'Women in Medicine Scholarship',
    discount: 20,
    eligibility: ['Female candidates', 'STEM background'],
    requirements: ['Identity proof', 'Academic records'],
    maxBeneficiaries: 75,
  },
  {
    type: 'early-bird',
    name: 'Early Enrollment Discount',
    discount: 15,
    eligibility: ['Enroll within 7 days', 'Pay advance fee'],
    requirements: ['Quick enrollment', 'Advance payment'],
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
]

const COMPETITOR_DATA = [
  {
    name: 'Allen Digital',
    price: 50000,
    features: ['Online Classes', 'Test Series', 'Study Material'],
  },
  {
    name: 'Aakash Digital',
    price: 65000,
    features: ['Live Classes', 'Recorded Content', 'Doubt Sessions'],
  },
  {
    name: 'Resonance',
    price: 80000,
    features: ['Comprehensive Program', 'Personal Mentoring', 'Advanced Tests'],
  },
  {
    name: "BYJU'S",
    price: 70000,
    features: ['Adaptive Learning', 'AI-powered', 'Mobile App'],
  },
]

export const usePricingCalculator = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const calculateScholarshipEligibility = useCallback(
    (selectionData: CourseSelectionData): ScholarshipEligibility[] => {
      return SCHOLARSHIP_PROGRAMS.map((scholarship) => {
        let eligible = true

        // Check eligibility criteria
        if (scholarship.type === 'merit') {
          // Mock merit check - in real app, this would check actual scores
          eligible = selectionData.goals.targetScore > 400
        } else if (scholarship.type === 'financial') {
          eligible = selectionData.budget.familyIncome === 'below-3l'
        } else if (scholarship.type === 'special') {
          // Mock gender check - in real app, this would check profile data
          eligible = true // Assume eligible for demo
        } else if (scholarship.type === 'early-bird') {
          eligible = true // Always available for demo
        }

        return {
          ...scholarship,
          claimed: eligible && Math.random() > 0.7, // 30% chance of being claimed
        }
      }).filter((s) => !s.claimed)
    },
    []
  )

  const calculateDiscounts = useCallback(
    (
      basePrice: number,
      selectionData: CourseSelectionData,
      scholarships: ScholarshipEligibility[]
    ) => {
      const discounts = {
        scholarships: 0,
        earlyBird: 0,
        family: 0,
        referral: 0,
        loyalty: 0,
      }

      // Apply best scholarship discount
      const bestScholarship = scholarships.reduce(
        (best, current) => (current.discount > best.discount ? current : best),
        { discount: 0 } as ScholarshipEligibility
      )

      if (bestScholarship.discount > 0) {
        discounts.scholarships = (basePrice * bestScholarship.discount) / 100
      }

      // Early bird discount (if enrolled quickly)
      if (selectionData.budget.paymentPreference === 'full-payment') {
        discounts.earlyBird = basePrice * 0.05 // 5% early bird discount
      }

      // Family discount (if multiple enrollments)
      if (Math.random() > 0.8) {
        // 20% chance of family discount
        discounts.family = basePrice * 0.1 // 10% family discount
      }

      // Referral discount
      if (Math.random() > 0.7) {
        // 30% chance of referral
        discounts.referral = basePrice * 0.05 // 5% referral discount
      }

      return discounts
    },
    []
  )

  const calculateTaxes = useCallback((amount: number) => {
    return {
      gst: amount * 0.18, // 18% GST
      serviceTax: 0, // No additional service tax
    }
  }, [])

  const calculateFees = useCallback((amount: number, paymentType: string) => {
    const fees = {
      processing: Math.min(1000, amount * 0.01), // 1% processing fee, max ₹1000
      payment: 0,
      material: 2000, // Fixed material fee
    }

    // Payment gateway fees
    if (paymentType === 'credit-card') {
      fees.payment = amount * 0.025 // 2.5% for credit cards
    } else if (paymentType === 'debit-card') {
      fees.payment = amount * 0.015 // 1.5% for debit cards
    } else if (paymentType === 'upi' || paymentType === 'netbanking') {
      fees.payment = Math.min(500, amount * 0.005) // 0.5% for UPI/NetBanking, max ₹500
    }

    return fees
  }, [])

  const generateInstallments = useCallback(
    (
      totalAmount: number,
      planType: PricingPlan['type'],
      startDate: Date = new Date(),
      paymentPreference?: string
    ): PricingInstallment[] => {
      const installments: PricingInstallment[] = []

      switch (planType) {
        case 'full-payment':
          installments.push({
            number: 1,
            amount: totalAmount,
            dueDate: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000), // 1 week
            description: 'Full payment',
            late_fee: 0,
          })
          break

        case 'quarterly':
          const quarterlyAmount = Math.ceil(totalAmount / 4)
          for (let i = 0; i < 4; i++) {
            installments.push({
              number: i + 1,
              amount: i === 3 ? totalAmount - quarterlyAmount * 3 : quarterlyAmount, // Adjust last installment
              dueDate: new Date(startDate.getTime() + i * 3 * 30 * 24 * 60 * 60 * 1000), // Every 3 months
              description: `Quarterly payment ${i + 1}`,
              late_fee: quarterlyAmount * 0.02, // 2% late fee
            })
          }
          break

        case 'monthly':
          const monthlyAmount = Math.ceil(totalAmount / 12)
          for (let i = 0; i < 12; i++) {
            installments.push({
              number: i + 1,
              amount: i === 11 ? totalAmount - monthlyAmount * 11 : monthlyAmount, // Adjust last installment
              dueDate: new Date(startDate.getTime() + i * 30 * 24 * 60 * 60 * 1000), // Every month
              description: `Monthly payment ${i + 1}`,
              late_fee: monthlyAmount * 0.02, // 2% late fee
            })
          }
          break

        case 'custom':
          // Custom plan based on user preferences
          const customInstallments = paymentPreference === 'flexible' ? 6 : 3
          const customAmount = Math.ceil(totalAmount / customInstallments)
          for (let i = 0; i < customInstallments; i++) {
            installments.push({
              number: i + 1,
              amount:
                i === customInstallments - 1
                  ? totalAmount - customAmount * (customInstallments - 1)
                  : customAmount,
              dueDate: new Date(startDate.getTime() + i * 2 * 30 * 24 * 60 * 60 * 1000), // Every 2 months
              description: `Custom payment ${i + 1}`,
              late_fee: customAmount * 0.015, // 1.5% late fee
            })
          }
          break
      }

      return installments
    },
    []
  )

  const calculatePricing = useCallback(
    async (
      selectionData: CourseSelectionData,
      course?: CourseData
    ): Promise<PricingCalculation> => {
      setLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

        if (!course) {
          throw new Error('Course data is required for pricing calculation')
        }

        const basePrice = course.price.base
        const scholarships = calculateScholarshipEligibility(selectionData)
        const discounts = calculateDiscounts(basePrice, selectionData, scholarships)

        const discountedAmount =
          basePrice - Object.values(discounts).reduce((sum, discount) => sum + discount, 0)
        const taxes = calculateTaxes(discountedAmount)
        const fees = calculateFees(
          discountedAmount,
          selectionData.budget.paymentPreference || 'upi'
        )

        const finalAmount =
          discountedAmount +
          taxes.gst +
          taxes.serviceTax +
          fees.processing +
          fees.payment +
          fees.material

        const breakdown: PricingBreakdown = {
          basePrice,
          discounts,
          taxes,
          fees,
          finalAmount,
          savings: basePrice - finalAmount,
        }

        // Generate different payment plans
        const plans: PricingPlan[] = [
          {
            id: 'full-payment',
            name: 'Full Payment',
            type: 'full-payment',
            totalAmount: finalAmount * 0.95, // 5% discount for full payment
            installments: generateInstallments(
              finalAmount * 0.95,
              'full-payment',
              undefined,
              selectionData.budget.paymentPreference
            ),
            processingFee: fees.processing,
            discount: {
              amount: finalAmount * 0.05,
              percentage: 5,
              reason: ['Full payment discount', 'No EMI charges'],
            },
            benefits: ['5% additional discount', 'No EMI processing', 'Immediate access'],
            popular: true,
            savings: finalAmount * 0.05,
          },
          {
            id: 'quarterly',
            name: 'Quarterly Payment',
            type: 'quarterly',
            totalAmount: finalAmount * 1.02, // 2% convenience fee
            installments: generateInstallments(
              finalAmount * 1.02,
              'quarterly',
              undefined,
              selectionData.budget.paymentPreference
            ),
            processingFee: fees.processing,
            discount: {
              amount: 0,
              percentage: 0,
              reason: [],
            },
            benefits: ['Manageable payments', 'Flexible timing', 'Good value'],
            popular: false,
          },
          {
            id: 'monthly',
            name: 'Monthly EMI',
            type: 'monthly',
            totalAmount: finalAmount * 1.05, // 5% convenience fee
            installments: generateInstallments(
              finalAmount * 1.05,
              'monthly',
              undefined,
              selectionData.budget.paymentPreference
            ),
            processingFee: fees.processing,
            discount: {
              amount: 0,
              percentage: 0,
              reason: [],
            },
            benefits: ['Lowest monthly payment', 'Extended timeline', 'Budget friendly'],
            popular: false,
          },
          {
            id: 'custom',
            name: 'Custom Plan',
            type: 'custom',
            totalAmount: finalAmount * 1.03, // 3% convenience fee
            installments: generateInstallments(
              finalAmount * 1.03,
              'custom',
              undefined,
              selectionData.budget.paymentPreference
            ),
            processingFee: fees.processing,
            discount: {
              amount: 0,
              percentage: 0,
              reason: [],
            },
            benefits: ['Tailored to your needs', 'Flexible schedule', 'Personalized'],
            popular: false,
          },
        ]

        const recommendations = {
          bestValue: plans.find((p) => p.popular)?.id || 'full-payment',
          leastEMI: plans.reduce((min, current) =>
            current.installments[0].amount < min.installments[0].amount ? current : min
          ).id,
          quickStart: 'full-payment',
        }

        const comparison = {
          competitors: COMPETITOR_DATA,
          valueProposition: [
            '94.2% NEET qualification rate',
            'Personal mentoring included',
            'Comprehensive study material',
            'Mobile app access',
            'Doubt sessions unlimited',
          ],
        }

        return {
          course,
          plans,
          breakdown,
          scholarships,
          recommendations,
          comparison,
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to calculate pricing'
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [
      calculateScholarshipEligibility,
      calculateDiscounts,
      calculateTaxes,
      calculateFees,
      generateInstallments,
    ]
  )

  const getPricingBreakdown = useCallback((planId: string, calculation: PricingCalculation) => {
    const plan = calculation.plans.find((p) => p.id === planId)
    if (!plan) return null

    return {
      ...calculation.breakdown,
      selectedPlan: plan,
      monthlyAmount: plan.installments[0]?.amount || 0,
      totalSavings: calculation.breakdown.savings + (plan.savings || 0),
    }
  }, [])

  const getDiscountEligibility = useCallback(
    (selectionData: CourseSelectionData) => {
      return calculateScholarshipEligibility(selectionData)
    },
    [calculateScholarshipEligibility]
  )

  const comparePlans = useCallback((planIds: string[], calculation: PricingCalculation) => {
    return planIds
      .map((id) => calculation.plans.find((p) => p.id === id))
      .filter(Boolean) as PricingPlan[]
  }, [])

  const validatePaymentData = useCallback((paymentData: any): boolean => {
    const required = ['amount', 'method', 'planId']
    return required.every(
      (field) => paymentData[field] !== undefined && paymentData[field] !== null
    )
  }, [])

  return {
    loading,
    error,
    calculatePricing,
    getPricingBreakdown,
    getDiscountEligibility,
    comparePlans,
    validatePaymentData,
    scholarshipPrograms: SCHOLARSHIP_PROGRAMS,
    competitorData: COMPETITOR_DATA,
  }
}
