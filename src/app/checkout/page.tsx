'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { routes } from '@/config/routes'
import {
  ShoppingCart,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Lock,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'
import {
  CourseSelector,
  TierSelector,
  BatchSelector,
  PaymentPlanSelector,
  CounselorPreference,
  defaultBatches,
} from '@/components/checkout'
import type { PaymentPlanType } from '@/components/checkout'
import {
  ClassLevel,
  CourseType,
  TierLevel,
  allClassPricing,
  getPricingForClass,
  getTierDetails,
} from '@/data/pricing'
import { cn } from '@/lib/utils'

type CheckoutStep =
  | 'course'
  | 'tier'
  | 'batch'
  | 'payment-plan'
  | 'counselor'
  | 'billing'
  | 'review'

const stepLabels: Record<CheckoutStep, string> = {
  course: 'Course',
  tier: 'Batch Type',
  batch: 'Timing',
  'payment-plan': 'Payment Plan',
  counselor: 'Counselor',
  billing: 'Your Info',
  review: 'Review',
}

const stepOrder: CheckoutStep[] = [
  'course',
  'tier',
  'batch',
  'payment-plan',
  'counselor',
  'billing',
  'review',
]

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('course')
  const [expandedSummary, setExpandedSummary] = useState(false)

  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>(null)
  const [selectedCourseType, setSelectedCourseType] = useState<CourseType | null>(null)
  const [selectedTier, setSelectedTier] = useState<TierLevel | null>(null)
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<PaymentPlanType | null>(null)
  const [wantsCounselor, setWantsCounselor] = useState<boolean | null>(null)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const classParam = searchParams.get('class') as ClassLevel | null
    const courseType = searchParams.get('type') as CourseType | null
    const tier = searchParams.get('tier') as TierLevel | null

    if (classParam) {
      setSelectedClass(classParam)
      if (courseType) {
        setSelectedCourseType(courseType)
        if (tier) {
          setSelectedTier(tier)
          setCurrentStep('batch')
        } else {
          setCurrentStep('tier')
        }
      } else {
        const classPricing = allClassPricing.find((c) => c.class === classParam)
        if (classPricing?.availableCourseTypes.length === 1) {
          setSelectedCourseType(classPricing.availableCourseTypes[0])
          setCurrentStep('tier')
        }
      }
    }
  }, [searchParams])

  const tiers = useMemo(() => {
    if (!selectedClass || !selectedCourseType) return []
    return getPricingForClass(selectedClass, selectedCourseType) || []
  }, [selectedClass, selectedCourseType])

  const selectedTierData = useMemo(() => {
    return tiers.find((t) => t.tier === selectedTier)
  }, [tiers, selectedTier])

  const prices = useMemo(() => {
    if (!selectedTierData) return null
    return selectedTierData.prices
  }, [selectedTierData])

  const calculateTotal = () => {
    if (!prices || !selectedPaymentPlan) return 0
    return prices[selectedPaymentPlan]
  }

  const calculateGST = () => {
    return Math.round(calculateTotal() * 0.18)
  }

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateGST()
  }

  const calculateFirstPayment = () => {
    const total = calculateGrandTotal()
    if (selectedPaymentPlan === 'lumpSum') return total
    if (selectedPaymentPlan === 'twoInstallments') return Math.round(total * 0.5)
    if (selectedPaymentPlan === 'threeInstallments') return Math.round(total * 0.4)
    return total
  }

  const validateBillingForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid phone number'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const canProceedToNext = (): boolean => {
    switch (currentStep) {
      case 'course':
        return !!selectedClass && !!selectedCourseType
      case 'tier':
        return !!selectedTier
      case 'batch':
        return !!selectedBatch
      case 'payment-plan':
        return !!selectedPaymentPlan
      case 'counselor':
        return wantsCounselor !== null
      case 'billing':
        return validateBillingForm()
      case 'review':
        return true
      default:
        return false
    }
  }

  const goToNextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const goToPreviousStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handleSubmitForCounselor = async () => {
    if (!validateBillingForm()) return

    setLoading(true)
    try {
      const selectedBatchData = defaultBatches.find((b) => b.id === selectedBatch)
      const classData = allClassPricing.find((c) => c.class === selectedClass)

      await fetch('/api/applications/counselor-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerDetails: formData,
          courseSelection: {
            classLevel: selectedClass,
            classDisplayName: classData?.displayName,
            courseType: selectedCourseType,
            tier: selectedTier,
            tierName: getTierDetails(selectedTier!)?.name,
            batchId: selectedBatch,
            batchName: selectedBatchData?.name,
            batchTiming: selectedBatchData?.time,
            paymentPlan: selectedPaymentPlan,
            totalAmount: calculateGrandTotal(),
          },
          status: 'PENDING_COUNSELOR',
        }),
      })

      router.push('/admissions/counselor-requested')
    } catch (error) {
      console.error('Error submitting counselor request:', error)
      setLoading(false)
    }
  }

  const handleProceedToPayment = async () => {
    if (!validateBillingForm()) return

    setLoading(true)

    try {
      const selectedBatchData = defaultBatches.find((b) => b.id === selectedBatch)
      const classData = allClassPricing.find((c) => c.class === selectedClass)

      const response = await fetch('/api/enrollment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          classLevel: selectedClass,
          courseType: selectedCourseType,
          tier: selectedTier,
          batchId: selectedBatch,
          batchName: selectedBatchData?.name,
          paymentPlan: selectedPaymentPlan,
          amount: calculateFirstPayment(),
          installmentAmount: calculateFirstPayment(),
          totalAmount: calculateGrandTotal(),
          wantsCounselor: wantsCounselor || false,
        }),
      })

      if (!response.ok) throw new Error('Failed to create order')

      const { orderId, enrollmentId, amount, currency, key, prefill } = await response.json()

      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        const options = {
          key: key || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount,
          currency: currency,
          name: 'Cerebrum Biology Academy',
          description: `${classData?.displayName} - ${getTierDetails(selectedTier!)?.name}`,
          order_id: orderId,
          prefill: prefill || {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#2563eb',
          },
          handler: async function (response: any) {
            // Verify the payment
            try {
              const verifyResponse = await fetch('/api/enrollment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  enrollmentId: enrollmentId,
                }),
              })

              if (verifyResponse.ok) {
                const batchData = selectedBatchData
                router.push(
                  `/purchase/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&enrollment_id=${enrollmentId}&batch=${encodeURIComponent(batchData?.name || '')}&timing=${encodeURIComponent(batchData?.time || '')}`
                )
              } else {
                router.push(
                  `/purchase/failed?order_id=${response.razorpay_order_id}&reason=verification_failed`
                )
              }
            } catch (verifyError) {
              console.error('Verification error:', verifyError)
              router.push(
                `/purchase/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&enrollment_id=${enrollmentId}`
              )
            }
          },
          modal: {
            ondismiss: function () {
              setLoading(false)
            },
          },
        }

        const rzp = new (window as any).Razorpay(options)
        rzp.open()
      }
    } catch (error) {
      console.error('Payment error:', error)
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'course':
        return (
          <CourseSelector
            selectedClass={selectedClass}
            selectedCourseType={selectedCourseType}
            onClassSelect={setSelectedClass}
            onCourseTypeSelect={setSelectedCourseType}
          />
        )
      case 'tier':
        return <TierSelector tiers={tiers} selectedTier={selectedTier} onSelect={setSelectedTier} />
      case 'batch':
        return (
          <BatchSelector
            batches={defaultBatches}
            selectedBatch={selectedBatch}
            onSelect={setSelectedBatch}
          />
        )
      case 'payment-plan':
        return prices ? (
          <PaymentPlanSelector
            prices={prices}
            selectedPlan={selectedPaymentPlan}
            onSelect={setSelectedPaymentPlan}
          />
        ) : null
      case 'counselor':
        return <CounselorPreference wantsCounselor={wantsCounselor} onSelect={setWantsCounselor} />
      case 'billing':
        return renderBillingForm()
      case 'review':
        return renderReviewStep()
      default:
        return null
    }
  }

  const renderBillingForm = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Student's Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={cn(
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            )}
            placeholder="Enter student's full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={cn(
                'w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.email ? 'border-red-500' : 'border-gray-300'
              )}
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={cn(
                'w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.phone ? 'border-red-500' : 'border-gray-300'
              )}
              placeholder="10-digit mobile number"
              maxLength={10}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
            Parent/Guardian Name
          </label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Parent or guardian name"
          />
        </div>

        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Parent's Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="parentPhone"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleInputChange}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Parent's phone number"
              maxLength={10}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Street address"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="State"
          />
        </div>
      </div>
    </div>
  )

  const renderReviewStep = () => {
    const classData = allClassPricing.find((c) => c.class === selectedClass)
    const tierDetails = selectedTier ? getTierDetails(selectedTier) : null
    const batchData = defaultBatches.find((b) => b.id === selectedBatch)

    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Review Your Enrollment</h3>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Course Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Class</span>
                <span className="font-medium">{classData?.displayName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Batch Type</span>
                <span className="font-medium">{tierDetails?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timing</span>
                <span className="font-medium">
                  {batchData?.name} ({batchData?.time})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days</span>
                <span className="font-medium">{batchData?.days.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Your Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Payment Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Course Fee</span>
                <span className="font-medium">₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">₹{calculateGST().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2 text-base font-bold">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{calculateGrandTotal().toLocaleString('en-IN')}
                </span>
              </div>
              {selectedPaymentPlan !== 'lumpSum' && (
                <div className="flex justify-between text-blue-700 bg-blue-100 -mx-4 px-4 py-2 mt-2">
                  <span>Pay Now</span>
                  <span className="font-bold">
                    ₹{calculateFirstPayment().toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderOrderSummary = () => {
    const classData = allClassPricing.find((c) => c.class === selectedClass)
    const tierDetails = selectedTier ? getTierDetails(selectedTier) : null
    const batchData = defaultBatches.find((b) => b.id === selectedBatch)

    const hasSelections = selectedClass || selectedTier || selectedBatch

    if (!hasSelections) {
      return (
        <div className="text-center py-8">
          <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Select a course to see order summary</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {selectedClass && (
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-medium text-gray-900">{classData?.displayName}</p>
          </div>
        )}

        {selectedTier && tierDetails && (
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm text-gray-500">Batch Type</p>
            <p className="font-medium text-gray-900">{tierDetails.name}</p>
            <p className="text-xs text-gray-500">{tierDetails.subtitle}</p>
          </div>
        )}

        {selectedBatch && batchData && (
          <div className="border-b border-gray-100 pb-3">
            <p className="text-sm text-gray-500">Timing</p>
            <p className="font-medium text-gray-900">{batchData.name}</p>
            <p className="text-xs text-gray-500">{batchData.time}</p>
          </div>
        )}

        {prices && selectedPaymentPlan && (
          <>
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium">₹{calculateGST().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span className="text-blue-600">
                  ₹{calculateGrandTotal().toLocaleString('en-IN')}
                </span>
              </div>
              {selectedPaymentPlan !== 'lumpSum' && (
                <div className="flex justify-between text-sm text-blue-600 bg-blue-50 -mx-4 px-4 py-2 rounded-lg">
                  <span>Due Today</span>
                  <span className="font-bold">
                    ₹{calculateFirstPayment().toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    )
  }

  const currentStepIndex = stepOrder.indexOf(currentStep)
  const isLastStep = currentStep === 'review'

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={routes.admissions}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admissions
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Enroll Now</h1>
            <p className="text-gray-600 mt-1">Complete your enrollment in a few simple steps</p>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="flex items-center min-w-max">
              {stepOrder.map((step, index) => {
                const isActive = index === currentStepIndex
                const isCompleted = index < currentStepIndex

                return (
                  <div key={step} className="flex items-center">
                    <button
                      onClick={() => index < currentStepIndex && setCurrentStep(step)}
                      disabled={index > currentStepIndex}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                        isActive && 'bg-blue-100 text-blue-700',
                        isCompleted && 'text-green-600 hover:bg-green-50 cursor-pointer',
                        !isActive && !isCompleted && 'text-gray-400'
                      )}
                    >
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium',
                          isActive && 'bg-blue-600 text-white',
                          isCompleted && 'bg-green-600 text-white',
                          !isActive && !isCompleted && 'bg-gray-200 text-gray-500'
                        )}
                      >
                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <span className="text-sm font-medium hidden sm:inline">
                        {stepLabels[step]}
                      </span>
                    </button>
                    {index < stepOrder.length - 1 && (
                      <div
                        className={cn(
                          'w-8 h-0.5 mx-1',
                          index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'
                        )}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                {renderStepContent()}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={currentStepIndex === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>

                  {isLastStep ? (
                    wantsCounselor ? (
                      <Button
                        variant="primary"
                        onClick={handleSubmitForCounselor}
                        loading={loading}
                        className="flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Request Counselor Call
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleProceedToPayment}
                        loading={loading}
                        className="flex items-center gap-2"
                      >
                        <Lock className="w-4 h-4" />
                        Pay ₹{calculateFirstPayment().toLocaleString('en-IN')}
                      </Button>
                    )
                  ) : (
                    <Button
                      variant="primary"
                      onClick={goToNextStep}
                      disabled={!canProceedToNext()}
                      className="flex items-center gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 mt-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
                    <p className="text-sm text-gray-700">
                      Your payment is protected with 256-bit SSL encryption. We use Razorpay,
                      India's most trusted payment gateway.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                  </div>
                  <button
                    onClick={() => setExpandedSummary(!expandedSummary)}
                    className="lg:hidden p-1"
                  >
                    {expandedSummary ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className={cn('lg:block', expandedSummary ? 'block' : 'hidden')}>
                  {renderOrderSummary()}

                  <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>Instant access after payment</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span>24/7 support available</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      Need help? Call us at{' '}
                      <a
                        href="tel:+918826444334"
                        className="text-blue-600 font-medium hover:underline"
                      >
                        +91 88264 44334
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-16 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading checkout...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
