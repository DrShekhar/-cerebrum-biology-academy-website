'use client'

import { useState, useEffect } from 'react'
import { Gift, Copy, Share2, MessageCircle, CheckCircle, Loader2 } from 'lucide-react'

interface ReferralShareProps {
  userName: string
  userEmail: string
}

export function ReferralShare({ userName, userEmail }: ReferralShareProps) {
  const [referralCode, setReferralCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    generateReferralCode()
  }, [])

  const generateReferralCode = async () => {
    try {
      const response = await fetch('/api/referral/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setReferralCode(data.code)
      }
    } catch (error) {
      console.error('Failed to generate referral code:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `Hey! I just booked a demo class with Cerebrum Biology Academy and it was amazing! 🎓

Use my referral code "${referralCode}" when you book your demo and we'll both get ₹500 off our next course! 🎉

Book your free demo: https://cerebrumbiologyacademy.com/demo-booking

Perfect for NEET Biology preparation! 📚`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const shareGeneric = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cerebrum Biology Academy - Referral Code',
          text: `Use my code "${referralCode}" and get ₹500 off! Book your free NEET Biology demo now.`,
          url: 'https://cerebrumbiologyacademy.com/demo-booking',
        })
      } catch (error) {
        console.error('Share failed:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
          <span className="text-gray-600">Generating your referral code...</span>
        </div>
      </div>
    )
  }

  if (!referralCode) {
    return null
  }

  return (
    <div
      className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-xl p-6 border-2 border-purple-200 animate-fadeInUp"
    >
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-6 h-6 text-purple-600" />
        <h3 className="font-bold text-gray-900 text-lg">Share & Earn ₹500!</h3>
      </div>

      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        Love your demo? Share your unique referral code with friends. When they book using your
        code, <strong>you both get ₹500 off</strong> your next course enrollment! 🎉
      </p>

      <div className="bg-white rounded-lg p-4 mb-4 border-2 border-purple-300">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">Your Referral Code</p>
            <p className="text-2xl font-bold text-purple-600 tracking-wider">{referralCode}</p>
          </div>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={shareViaWhatsApp}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
        >
          <MessageCircle className="w-5 h-5" />
          Share on WhatsApp
        </button>

        {navigator.share && (
          <button
            onClick={shareGeneric}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-purple-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-600">₹500</p>
            <p className="text-xs text-gray-600">For you</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">+</p>
            <p className="text-xs text-gray-600">Per referral</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">₹500</p>
            <p className="text-xs text-gray-600">For friend</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        * Discount applicable on course enrollment. Valid for up to 10 uses.
      </p>
    </div>
  )
}
