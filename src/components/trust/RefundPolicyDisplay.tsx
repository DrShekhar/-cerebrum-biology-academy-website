'use client'

import React, { useState } from 'react'
import {
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Calculator,
  ChevronDown,
  ChevronUp,
  Calendar,
  Users,
  Award,
} from 'lucide-react'

interface RefundScenario {
  id: string
  title: string
  timeframe: string
  refundPercentage: number
  conditions: string[]
  processingTime: string
  color: string
  icon: React.ReactNode
}

interface RefundCalculation {
  courseFee: number
  scenario: string
  refundAmount: number
  deductions: { item: string; amount: number }[]
  processingDays: number
}

const RefundPolicyDisplay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'policy' | 'calculator' | 'process'>('policy')
  const [selectedScenario, setSelectedScenario] = useState<string>('')
  const [expandedFAQ, setExpandedFAQ] = useState<string>('')
  const [calculatorInputs, setCalculatorInputs] = useState({
    courseFee: 75000,
    enrollmentDate: '',
    withdrawalDate: '',
    courseType: 'ascent',
  })

  const refundScenarios: RefundScenario[] = [
    {
      id: 'cooling-off',
      title: 'Cooling-off Period',
      timeframe: 'Within 7 days of enrollment',
      refundPercentage: 100,
      conditions: [
        'No classes attended',
        'Study materials not accessed',
        'Online portal not activated',
      ],
      processingTime: '5-7 business days',
      color: 'emerald',
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      id: 'early-withdrawal',
      title: 'Early Withdrawal',
      timeframe: '8-30 days after enrollment',
      refundPercentage: 80,
      conditions: [
        'Less than 25% course completion',
        'Valid reason for withdrawal',
        'No test series accessed',
      ],
      processingTime: '10-14 business days',
      color: 'blue',
      icon: <Clock className="w-6 h-6" />,
    },
    {
      id: 'mid-course',
      title: 'Mid-Course Withdrawal',
      timeframe: '31-90 days after enrollment',
      refundPercentage: 50,
      conditions: [
        '25-50% course completion',
        'Medical/emergency reasons',
        'Documented circumstances',
      ],
      processingTime: '14-21 business days',
      color: 'amber',
      icon: <AlertCircle className="w-6 h-6" />,
    },
    {
      id: 'late-withdrawal',
      title: 'Late Withdrawal',
      timeframe: 'After 90 days',
      refundPercentage: 25,
      conditions: [
        'Exceptional circumstances only',
        'Medical emergency',
        'Case-by-case evaluation',
      ],
      processingTime: '21-30 business days',
      color: 'red',
      icon: <FileText className="w-6 h-6" />,
    },
  ]

  const faqData = [
    {
      id: 'eligibility',
      question: 'What makes me eligible for a refund?',
      answer:
        'Refund eligibility depends on timing, course completion percentage, and specific circumstances. Our policy ensures fairness while protecting both student and academy interests.',
    },
    {
      id: 'processing',
      question: 'How long does refund processing take?',
      answer:
        'Processing times vary by scenario: 5-7 days for cooling-off period, up to 30 days for complex cases. We provide regular updates throughout the process.',
    },
    {
      id: 'deductions',
      question: 'Are there any deductions from my refund?',
      answer:
        'Minimal processing fees (₹500-2000) may apply. Study materials accessed or physical resources provided may be deducted at cost price.',
    },
    {
      id: 'appeal',
      question: 'Can I appeal a refund decision?',
      answer:
        'Yes, all decisions can be appealed within 30 days. We have a dedicated review committee for fair assessment of special circumstances.',
    },
  ]

  const calculateRefund = (): RefundCalculation | null => {
    if (!calculatorInputs.enrollmentDate || !calculatorInputs.withdrawalDate) return null

    const enrollment = new Date(calculatorInputs.enrollmentDate)
    const withdrawal = new Date(calculatorInputs.withdrawalDate)
    const daysDiff = Math.ceil((withdrawal.getTime() - enrollment.getTime()) / (1000 * 3600 * 24))

    let scenario = ''
    let refundPercentage = 0
    let processingDays = 0

    if (daysDiff <= 7) {
      scenario = 'Cooling-off Period'
      refundPercentage = 100
      processingDays = 7
    } else if (daysDiff <= 30) {
      scenario = 'Early Withdrawal'
      refundPercentage = 80
      processingDays = 14
    } else if (daysDiff <= 90) {
      scenario = 'Mid-Course Withdrawal'
      refundPercentage = 50
      processingDays = 21
    } else {
      scenario = 'Late Withdrawal'
      refundPercentage = 25
      processingDays = 30
    }

    const baseRefund = (calculatorInputs.courseFee * refundPercentage) / 100
    const deductions = [
      { item: 'Processing Fee', amount: Math.min(2000, baseRefund * 0.02) },
      { item: 'Study Materials', amount: daysDiff > 7 ? 3000 : 0 },
    ]

    const totalDeductions = deductions.reduce((sum, deduction) => sum + deduction.amount, 0)
    const refundAmount = Math.max(0, baseRefund - totalDeductions)

    return {
      courseFee: calculatorInputs.courseFee,
      scenario,
      refundAmount,
      deductions: deductions.filter((d) => d.amount > 0),
      processingDays,
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div
        className="text-center mb-8 animate-fadeInUp"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-10 h-10 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-900">Transparent Refund Policy</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We believe in complete transparency. Our refund policy is designed to be fair, clear, and
          student-friendly with no hidden clauses.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[
          { id: 'policy', label: 'Refund Scenarios', icon: Shield },
          { id: 'calculator', label: 'Calculate Refund', icon: Calculator },
          { id: 'process', label: 'Process & FAQ', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === id
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-green-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </div>
{activeTab === 'policy' && (
          <div
            key="policy"
            className="space-y-6 animate-fadeInUp"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {refundScenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() =>
                    setSelectedScenario(selectedScenario === scenario.id ? '' : scenario.id)
                  }
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    selectedScenario === scenario.id
                      ? `border-${scenario.color}-500 bg-${scenario.color}-50`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg bg-${scenario.color}-100 text-${scenario.color}-600`}
                      >
                        {scenario.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                        <p className="text-sm text-gray-600">{scenario.timeframe}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold text-${scenario.color}-600`}>
                        {scenario.refundPercentage}%
                      </div>
                      <div className="text-xs text-gray-500">refund</div>
                    </div>
                  </div>
{selectedScenario === scenario.id && (
                      <div
                        className="space-y-4 pt-4 border-t border-gray-200 animate-fadeInUp"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Conditions:</h4>
                          <ul className="space-y-1">
                            {scenario.conditions.map((condition, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                {condition}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Processing time: {scenario.processingTime}</span>
                        </div>
                      </div>
                    )}
</div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div
            key="calculator"
            className="bg-white rounded-2xl border border-gray-200 p-8 animate-fadeInUp"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Refund Calculator
            </h3>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorInputs.courseFee}
                    onChange={(e) =>
                      setCalculatorInputs((prev) => ({
                        ...prev,
                        courseFee: Number(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                    placeholder="75000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Type
                  </label>
                  <select
                    value={calculatorInputs.courseType}
                    onChange={(e) =>
                      setCalculatorInputs((prev) => ({ ...prev, courseType: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  >
                    <option value="ascent">Ascent Series</option>
                    <option value="pinnacle">Pinnacle Series</option>
                    <option value="pursuit">Pursuit Series</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enrollment Date
                  </label>
                  <input
                    type="date"
                    value={calculatorInputs.enrollmentDate}
                    onChange={(e) =>
                      setCalculatorInputs((prev) => ({ ...prev, enrollmentDate: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Date
                  </label>
                  <input
                    type="date"
                    value={calculatorInputs.withdrawalDate}
                    onChange={(e) =>
                      setCalculatorInputs((prev) => ({ ...prev, withdrawalDate: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              </div>

              <div className="lg:pl-8">
                {calculateRefund() && (
                  <div
                    className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-4 animate-fadeInUp"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Refund Calculation</h4>

                    {(() => {
                      const calculation = calculateRefund()!
                      return (
                        <>
                          <div className="flex items-center justify-between py-2">
                            <span className="text-gray-600">Refund Scenario:</span>
                            <span className="font-medium text-gray-900">
                              {calculation.scenario}
                            </span>
                          </div>

                          <div className="flex items-center justify-between py-2">
                            <span className="text-gray-600">Course Fee:</span>
                            <span className="font-medium text-gray-900">
                              ₹{calculation.courseFee.toLocaleString()}
                            </span>
                          </div>

                          {calculation.deductions.map((deduction, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-1 text-sm"
                            >
                              <span className="text-gray-500">- {deduction.item}:</span>
                              <span className="text-red-600">
                                ₹{deduction.amount.toLocaleString()}
                              </span>
                            </div>
                          ))}

                          <div className="border-t border-gray-300 pt-3 mt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-semibold text-gray-900">
                                Refund Amount:
                              </span>
                              <span className="text-2xl font-bold text-green-600">
                                ₹{calculation.refundAmount.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Processing time: {calculation.processingDays} days</span>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}

                {!calculateRefund() && (
                  <div className="bg-gray-50 rounded-xl p-6 text-center">
                    <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">
                      Enter enrollment and withdrawal dates to calculate your refund
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div
            key="process"
            className="space-y-8 animate-fadeInUp"
          >
            {/* Process Steps */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Refund Process
              </h3>

              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    title: 'Submit Request',
                    description: 'Fill out the refund form with required documents',
                    time: '5 minutes',
                    icon: <FileText className="w-6 h-6" />,
                  },
                  {
                    step: 2,
                    title: 'Review & Verification',
                    description: 'Our team reviews your case and verifies eligibility',
                    time: '2-5 business days',
                    icon: <Users className="w-6 h-6" />,
                  },
                  {
                    step: 3,
                    title: 'Approval & Processing',
                    description: 'Approved refunds are processed to your original payment method',
                    time: '3-7 business days',
                    icon: <Award className="w-6 h-6" />,
                  },
                  {
                    step: 4,
                    title: 'Confirmation',
                    description: 'Receive confirmation with transaction reference',
                    time: 'Immediate',
                    icon: <CheckCircle className="w-6 h-6" />,
                  },
                ].map((processStep, index) => (
                  <div key={processStep.step} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        {processStep.icon}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-gray-900">
                          {processStep.step}. {processStep.title}
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {processStep.time}
                        </span>
                      </div>
                      <p className="text-gray-600">{processStep.description}</p>
                    </div>
                    {index < 3 && <div className="absolute left-6 mt-12 w-px h-6 bg-gray-200" />}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? '' : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
{expandedFAQ === faq.id && (
                        <div
                          className="px-6 pb-4 bg-gray-50 animate-fadeInUp"
                        >
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
</div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
              <p className="text-green-100 mb-6">
                Our dedicated support team is here to help with your refund queries
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors">
                  Contact Support
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Submit Refund Request
                </button>
              </div>
            </div>
          </div>
        )}
</div>
  )
}

export default RefundPolicyDisplay
