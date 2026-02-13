'use client'

import { useState } from 'react'
import { Gift, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface ReferralInputProps {
  onReferralApplied: (code: string, discount: number) => void
  onReferralRemoved: () => void
}

export function ReferralInput({ onReferralApplied, onReferralRemoved }: ReferralInputProps) {
  const [referralCode, setReferralCode] = useState('')
  const [validating, setValidating] = useState(false)
  const [applied, setApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [error, setError] = useState('')

  const validateReferralCode = async () => {
    if (!referralCode.trim()) {
      setError('Please enter a referral code')
      return
    }

    setValidating(true)
    setError('')

    try {
      const response = await fetch('/api/referral/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: referralCode.toUpperCase().trim() }),
      })

      const data = await response.json()

      if (data.valid) {
        setApplied(true)
        setDiscount(data.discount)
        onReferralApplied(data.code, data.discount)
      } else {
        setError(data.message || 'Invalid referral code')
      }
    } catch (err) {
      setError('Failed to validate code. Please try again.')
    } finally {
      setValidating(false)
    }
  }

  const removeReferralCode = () => {
    setReferralCode('')
    setApplied(false)
    setDiscount(0)
    setError('')
    onReferralRemoved()
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">Have a Referral Code?</h3>
      </div>

      {!applied ? (
        <div>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => {
                setReferralCode(e.target.value.toUpperCase())
                setError('')
              }}
              placeholder="Enter code (e.g., NEHA1A2B)"
              maxLength={10}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
            />
            <button
              onClick={validateReferralCode}
              disabled={validating || !referralCode.trim()}
              className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {validating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Apply'
              )}
            </button>
          </div>
{error && (
              <div
                className="flex items-start gap-2 text-red-600 text-sm animate-fadeInUp"
              >
                <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
<p className="text-xs text-gray-500 mt-3">
            Get ₹500 off when you use a friend's referral code!
          </p>
        </div>
      ) : (
        <div
          className="bg-white rounded-lg p-4 border-2 border-green-600 animate-fadeInUp"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Code Applied: {referralCode}</p>
                <p className="text-sm text-green-700">You saved ₹{discount}! 🎉</p>
              </div>
            </div>
            <button
              onClick={removeReferralCode}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
