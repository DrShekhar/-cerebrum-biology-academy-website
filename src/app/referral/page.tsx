'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Gift,
  Copy,
  Check,
  Share2,
  Users,
  IndianRupee,
  Trophy,
  MessageCircle,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

interface ReferralStats {
  code: string
  discount: number
  uses: number
  maxUses: number
  totalEarnings: number
  redemptions: Array<{
    id: string
    redeemedBy: string
    createdAt: string
    discountGiven: number
  }>
}

export default function ReferralPage() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [showGenerateForm, setShowGenerateForm] = useState(true)

  useEffect(() => {
    const savedEmail = localStorage.getItem('referral_email')
    if (savedEmail) {
      setEmail(savedEmail)
      fetchReferralCode(savedEmail)
    }
  }, [])

  const fetchReferralCode = async (userEmail: string) => {
    try {
      const response = await fetch(`/api/referral/generate?email=${encodeURIComponent(userEmail)}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setReferralStats(data)
          setShowGenerateForm(false)
        }
      }
    } catch (err) {
      console.error('Error fetching referral code:', err)
    }
  }

  const generateReferralCode = async () => {
    if (!email || !name) {
      setError('Please enter your name and email')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/referral/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (data.success) {
        setReferralStats(data)
        setShowGenerateForm(false)
        localStorage.setItem('referral_email', email)
      } else {
        setError(data.error || 'Failed to generate referral code')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (referralStats?.code) {
      navigator.clipboard.writeText(referralStats.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOnWhatsApp = () => {
    const message = `Hey! Use my referral code ${referralStats?.code} to get Rs.${referralStats?.discount} off on Cerebrum Biology Academy courses! Join India's best NEET Biology coaching. https://cerebrumbiologyacademy.com/courses?ref=${referralStats?.code}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  const shareViaEmail = () => {
    const subject = `Get Rs.${referralStats?.discount} off on NEET Biology Coaching`
    const body = `Hi,\n\nI'm sharing my referral code for Cerebrum Biology Academy - India's best NEET Biology coaching.\n\nUse code: ${referralStats?.code}\nDiscount: Rs.${referralStats?.discount} off\n\nEnroll here: https://cerebrumbiologyacademy.com/courses?ref=${referralStats?.code}\n\nBest of luck for NEET!`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div
          className="text-center mb-12 animate-fadeInUp"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-500 rounded-full mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Refer & Earn Rewards
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your love for learning! Refer friends to Cerebrum Biology Academy and earn rewards
            while they get exclusive discounts.
          </p>
        </div>

        {/* How It Works */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fadeInUp"
        >
          {[
            {
              icon: Share2,
              title: 'Share Your Code',
              description: 'Get your unique referral code and share it with friends',
              color: 'from-purple-500 to-purple-600',
            },
            {
              icon: Users,
              title: 'Friends Join',
              description: 'When they enroll using your code, they get Rs.500 off',
              color: 'from-blue-500 to-blue-600',
            },
            {
              icon: IndianRupee,
              title: 'You Earn',
              description: 'You earn Rs.500 for every successful referral',
              color: 'bg-green-600',
            },
          ].map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div
                className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${step.color} rounded-full mb-4`}
              >
                <step.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>

        {/* Generate or Display Referral Code */}
        <div
         className="animate-fadeInUp">
          {showGenerateForm ? (
            <Card className="p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Get Your Referral Code
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button onClick={generateReferralCode} disabled={isLoading} className="w-full">
                  {isLoading ? 'Generating...' : 'Generate My Referral Code'}
                </Button>
              </div>
            </Card>
          ) : (
            referralStats && (
              <div className="space-y-6">
                {/* Referral Code Card */}
                <Card className="p-8 bg-indigo-500 text-white">
                  <div className="text-center">
                    <p className="text-purple-100 mb-2">Your Referral Code</p>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <span className="text-4xl font-bold tracking-wider">
                        {referralStats.code}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                        <p className="text-lg sm:text-2xl font-bold">{referralStats.uses}</p>
                        <p className="text-xs text-purple-100">Referrals</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                        <p className="text-lg sm:text-2xl font-bold">
                          {referralStats.maxUses - referralStats.uses}
                        </p>
                        <p className="text-xs text-purple-100">Remaining</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-2 sm:p-3">
                        <p className="text-lg sm:text-2xl font-bold">
                          Rs.{referralStats.uses * referralStats.discount}
                        </p>
                        <p className="text-xs text-purple-100">Earned</p>
                      </div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={shareOnWhatsApp}
                        className="bg-green-600 hover:bg-green-600 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        onClick={shareViaEmail}
                        variant="outline"
                        className="border-white text-white hover:bg-white/10"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Redemption History */}
                {referralStats.redemptions && referralStats.redemptions.length > 0 && (
                  <Card className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                      Your Successful Referrals
                    </h3>
                    <div className="space-y-3">
                      {referralStats.redemptions.map((redemption) => (
                        <div
                          key={redemption.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{redemption.redeemedBy}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(redemption.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <span className="text-green-600 font-semibold">
                            +Rs.{redemption.discountGiven}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )
          )}
        </div>

        {/* Leaderboard Preview */}
        <div
          className="mt-12 animate-fadeInUp"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
                Top Referrers This Month
              </h3>
              <span className="text-sm text-gray-500">Updated daily</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Priya S.', referrals: 12, earnings: 6000, rank: 1 },
                { name: 'Arjun K.', referrals: 8, earnings: 4000, rank: 2 },
                { name: 'Sneha R.', referrals: 6, earnings: 3000, rank: 3 },
              ].map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.rank === 1
                      ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1
                          ? 'bg-yellow-400 text-yellow-900'
                          : user.rank === 2
                            ? 'bg-gray-300 text-gray-700'
                            : 'bg-orange-300 text-orange-800'
                      }`}
                    >
                      {user.rank}
                    </span>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{user.referrals} referrals</p>
                    <p className="text-sm text-green-600">Rs.{user.earnings.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Terms */}
        <div
          className="mt-8 text-center text-sm text-gray-500 animate-fadeInUp"
        >
          <p>
            By participating, you agree to our{' '}
            <Link href="/terms-of-service" className="text-purple-600 hover:underline">
              referral program terms
            </Link>
            .
          </p>
          <p className="mt-2">
            Each referral code can be used up to 10 times. Rewards are credited after the referred
            student completes enrollment.
          </p>
        </div>
      </div>
    </div>
  )
}
