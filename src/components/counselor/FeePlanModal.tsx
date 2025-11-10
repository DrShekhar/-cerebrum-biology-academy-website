'use client'

import { useState, useEffect } from 'react'
import type { Lead } from '@/app/counselor/leads/page'

interface FeePlanModalProps {
  lead: Lead
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function FeePlanModal({ lead, isOpen, onClose, onSuccess }: FeePlanModalProps) {
  const [courseName, setCourseName] = useState('')
  const [originalAmount, setOriginalAmount] = useState<number>(75000)
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [numberOfInstallments, setNumberOfInstallments] = useState<number>(3)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30)
  const [installmentFrequency, setInstallmentFrequency] = useState<
    'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
  >('MONTHLY')
  const [notes, setNotes] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculations
  const discountAmount = Math.round((originalAmount * discountPercent) / 100)
  const finalAmount = originalAmount - discountAmount
  const downPayment = Math.round((finalAmount * downPaymentPercent) / 100)
  const remainingAmount = finalAmount - downPayment
  const installmentAmount = Math.round(remainingAmount / numberOfInstallments)

  if (!isOpen) return null

  const handleCreate = async () => {
    if (!courseName.trim()) {
      setError('Please enter a course name')
      return
    }

    try {
      setCreating(true)
      setError(null)

      const response = await fetch('/api/counselor/fee-plans/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: lead.id,
          courseName,
          originalAmount,
          discountPercent,
          discountAmount,
          finalAmount,
          numberOfInstallments,
          downPayment,
          installmentFrequency,
          startDate: new Date().toISOString(),
          notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create fee plan')
      }

      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create fee plan')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Create Fee Plan</h2>
            <p className="text-sm opacity-90">{lead.studentName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g., NEET Dropper 2025"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Amount (₹) *
                </label>
                <input
                  type="number"
                  value={originalAmount}
                  onChange={(e) => setOriginalAmount(Number(e.target.value))}
                  min="0"
                  step="1000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount (%) - {discountPercent}%
                </label>
                <input
                  type="range"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  min="0"
                  max="50"
                  step="5"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment (%) - {downPaymentPercent}%
                </label>
                <input
                  type="range"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  min="10"
                  max="100"
                  step="10"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Installments
                </label>
                <select
                  value={numberOfInstallments}
                  onChange={(e) => setNumberOfInstallments(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[1, 2, 3, 4, 5, 6, 9, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Installment' : 'Installments'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Installment Frequency
                </label>
                <select
                  value={installmentFrequency}
                  onChange={(e) =>
                    setInstallmentFrequency(e.target.value as 'WEEKLY' | 'MONTHLY' | 'QUARTERLY')
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special terms or conditions..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Payment Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-indigo-100">
                    <span className="text-gray-600">Original Amount</span>
                    <span className="font-semibold text-gray-900">
                      ₹{originalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-indigo-100">
                      <span className="text-green-600">Discount ({discountPercent}%)</span>
                      <span className="font-semibold text-green-600">
                        - ₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-2 border-b-2 border-indigo-300">
                    <span className="font-bold text-gray-900">Final Amount</span>
                    <span className="font-bold text-xl text-indigo-600">
                      ₹{finalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  Installment Breakdown
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-semibold text-gray-900">Down Payment</div>
                      <div className="text-xs text-gray-600">Due at enrollment</div>
                    </div>
                    <div className="font-bold text-green-600">
                      ₹{downPayment.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {numberOfInstallments} {installmentFrequency.toLowerCase()} installments
                      </div>
                      <div className="text-xs text-gray-600">Remaining amount</div>
                    </div>
                    <div className="font-bold text-blue-600">
                      ₹{installmentAmount.toLocaleString('en-IN')} each
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Total Payable:</span>
                        <span className="font-semibold">
                          ₹{finalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>You Save:</span>
                          <span className="font-semibold">
                            ₹{discountAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={creating}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating || !courseName.trim()}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {creating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Create Fee Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
