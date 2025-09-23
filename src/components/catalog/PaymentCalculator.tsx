'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, CreditCard, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import { type Course, type InstallmentOption } from '@/data/courseData'

interface PaymentCalculatorProps {
  courses: Course[]
  onClose: () => void
}

interface PaymentPlan {
  totalAmount: number
  downPayment: number
  monthlyPayment: number
  duration: number
  totalInterest: number
  savings: number
}

export function PaymentCalculator({ courses, onClose }: PaymentCalculatorProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(courses[0] || null)
  const [selectedInstallment, setSelectedInstallment] = useState<InstallmentOption | null>(null)
  const [customDownPayment, setCustomDownPayment] = useState(0)
  const [customDuration, setCustomDuration] = useState(12)

  const customPaymentPlan = useMemo((): PaymentPlan | null => {
    if (!selectedCourse) return null

    const principal = selectedCourse.currentPrice - customDownPayment
    const monthlyPayment = principal / customDuration
    const interestRate = 0.015 // 1.5% per month for custom plans
    const totalInterest = principal * interestRate * customDuration
    const totalAmount = selectedCourse.currentPrice + totalInterest
    const originalSavings = selectedCourse.originalPrice - selectedCourse.currentPrice

    return {
      totalAmount,
      downPayment: customDownPayment,
      monthlyPayment: monthlyPayment + totalInterest / customDuration,
      duration: customDuration,
      totalInterest,
      savings: originalSavings,
    }
  }, [selectedCourse, customDownPayment, customDuration])

  const predefinedPlan = useMemo((): PaymentPlan | null => {
    if (!selectedCourse || !selectedInstallment) return null

    const originalSavings = selectedCourse.originalPrice - selectedCourse.currentPrice
    const additionalCost = selectedInstallment.additionalCost || 0

    return {
      totalAmount: selectedCourse.currentPrice + additionalCost,
      downPayment: selectedInstallment.downPayment,
      monthlyPayment: selectedInstallment.monthlyAmount,
      duration: selectedInstallment.duration,
      totalInterest: additionalCost,
      savings: originalSavings - additionalCost,
    }
  }, [selectedCourse, selectedInstallment])

  const handleCourseChange = (course: Course) => {
    setSelectedCourse(course)
    setSelectedInstallment(course.installmentOptions[0] || null)
    setCustomDownPayment(Math.round(course.currentPrice * 0.2)) // 20% default
  }

  if (!selectedCourse) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Payment Calculator</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="text-blue-100 mt-2">
            Calculate your optimal payment plan with AI-powered recommendations
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Selection & Settings */}
            <div className="space-y-6">
              {/* Course Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Course</h3>
                <div className="space-y-3">
                  {courses.slice(0, 8).map((course) => (
                    <button
                      key={course.id}
                      onClick={() => handleCourseChange(course)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedCourse.id === course.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.series} Series</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ₹{(course.currentPrice / 1000).toFixed(0)}K
                          </p>
                          {course.originalPrice > course.currentPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              ₹{(course.originalPrice / 1000).toFixed(0)}K
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Plan Options */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>

                {/* Predefined Installment Plans */}
                {selectedCourse.installmentOptions.length > 0 && (
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-gray-700">Recommended Plans</h4>
                    {selectedCourse.installmentOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedInstallment(option)}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          selectedInstallment === option
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h5 className="font-medium text-gray-900">
                              {option.duration} Months Plan
                            </h5>
                            <p className="text-sm text-gray-600">
                              ₹{(option.downPayment / 1000).toFixed(0)}K down + ₹
                              {(option.monthlyAmount / 1000).toFixed(1)}K/month
                            </p>
                          </div>
                          {option.savings && option.savings > 0 && (
                            <div className="text-green-600 text-sm font-medium">
                              Save ₹{(option.savings / 1000).toFixed(0)}K
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Plan */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-4">Custom Plan</h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Down Payment (₹)
                      </label>
                      <input
                        type="number"
                        value={customDownPayment}
                        onChange={(e) => setCustomDownPayment(Number(e.target.value))}
                        min={0}
                        max={selectedCourse.currentPrice}
                        step={1000}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {((customDownPayment / selectedCourse.currentPrice) * 100).toFixed(0)}% of
                        total amount
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration (months)
                      </label>
                      <select
                        value={customDuration}
                        onChange={(e) => setCustomDuration(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[6, 9, 12, 18, 24].map((months) => (
                          <option key={months} value={months}>
                            {months} months
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => setSelectedInstallment(null)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        !selectedInstallment
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Use Custom Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary & Analysis */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Summary
                </h3>

                {(predefinedPlan || customPaymentPlan) && (
                  <div className="space-y-4">
                    {(() => {
                      const plan = selectedInstallment ? predefinedPlan : customPaymentPlan
                      if (!plan) return null

                      return (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-4">
                              <p className="text-sm text-gray-600">Course Price</p>
                              <p className="text-xl font-bold text-gray-900">
                                ₹{(selectedCourse.currentPrice / 1000).toFixed(0)}K
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                              <p className="text-sm text-gray-600">Down Payment</p>
                              <p className="text-xl font-bold text-blue-600">
                                ₹{(plan.downPayment / 1000).toFixed(0)}K
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                              <p className="text-sm text-gray-600">Monthly Payment</p>
                              <p className="text-xl font-bold text-green-600">
                                ₹{(plan.monthlyPayment / 1000).toFixed(1)}K
                              </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                              <p className="text-sm text-gray-600">Duration</p>
                              <p className="text-xl font-bold text-purple-600">
                                {plan.duration} months
                              </p>
                            </div>
                          </div>

                          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-medium text-gray-900">Total Amount</p>
                              <p className="text-2xl font-bold text-gray-900">
                                ₹{(plan.totalAmount / 1000).toFixed(0)}K
                              </p>
                            </div>
                            {plan.totalInterest > 0 && (
                              <p className="text-sm text-gray-600">
                                Includes ₹{(plan.totalInterest / 1000).toFixed(0)}K processing fee
                              </p>
                            )}
                          </div>

                          {plan.savings > 0 && (
                            <div className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4">
                              <div className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-green-600" />
                                <p className="font-medium text-green-800">
                                  You save ₹{(plan.savings / 1000).toFixed(0)}K
                                </p>
                              </div>
                              <p className="text-sm text-green-700 mt-1">
                                Compared to original price of ₹
                                {(selectedCourse.originalPrice / 1000).toFixed(0)}K
                              </p>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>

              {/* Payment Schedule */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Payment Schedule
                </h3>

                {(predefinedPlan || customPaymentPlan) && (
                  <div className="space-y-3">
                    {(() => {
                      const plan = selectedInstallment ? predefinedPlan : customPaymentPlan
                      if (!plan) return null

                      const schedule = []

                      // Down payment
                      if (plan.downPayment > 0) {
                        schedule.push({
                          month: 0,
                          description: 'Down Payment',
                          amount: plan.downPayment,
                          type: 'down',
                        })
                      }

                      // Monthly payments
                      for (let i = 1; i <= plan.duration; i++) {
                        schedule.push({
                          month: i,
                          description: `Month ${i}`,
                          amount: plan.monthlyPayment,
                          type: 'monthly',
                        })
                      }

                      return schedule.slice(0, 6).map((payment, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {payment.description}
                          </span>
                          <span
                            className={`font-bold ${
                              payment.type === 'down' ? 'text-blue-600' : 'text-green-600'
                            }`}
                          >
                            ₹{(payment.amount / 1000).toFixed(1)}K
                          </span>
                        </div>
                      ))
                    })()}

                    {((selectedInstallment ? predefinedPlan : customPaymentPlan)?.duration || 0) >
                      5 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        ... and{' '}
                        {((selectedInstallment ? predefinedPlan : customPaymentPlan)?.duration ||
                          0) - 5}{' '}
                        more payments
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Important Notes */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• All payments are processed securely through Razorpay</li>
                      <li>• EMI options subject to approval and documentation</li>
                      <li>• Early payment discounts available on request</li>
                      <li>• 100% refund within 7 days of enrollment</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Proceed with This Plan
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
