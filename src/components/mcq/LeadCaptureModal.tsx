'use client'

import { useState } from 'react'
interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LeadData) => Promise<void>
  questionsAnswered: number
  accuracy: number
  xpEarned: number
  variant: 'soft' | 'hard'
}

interface LeadData {
  phone: string
  name?: string
  email?: string
  studentClass?: string
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  questionsAnswered,
  accuracy,
  xpEarned,
  variant,
}: LeadCaptureModalProps) {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!phone || phone.length < 10) {
      setError('Please enter a valid WhatsApp number')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        phone,
        name: name || undefined,
        email: email || undefined,
        studentClass: studentClass || undefined,
      })
      onClose()
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    if (variant === 'soft') {
      onClose()
    }
  }

  return (
<>
{isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeInUp"
          onClick={variant === 'soft' ? handleSkip : undefined}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp"
          >
            {/* Header */}
            <div className="bg-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🎉</span>
                {variant === 'soft' && (
                  <button
                    onClick={handleSkip}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {variant === 'soft' ? 'Save Your Progress!' : 'Continue Practicing'}
              </h2>
              <p className="text-white/90">
                {variant === 'soft'
                  ? "Don't lose your amazing progress! Save your streak and XP."
                  : 'Enter your WhatsApp number to continue unlimited practice.'}
              </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{questionsAnswered}</p>
                <p className="text-xs text-gray-500">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
                <p className="text-xs text-gray-500">Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{xpEarned}</p>
                <p className="text-xs text-gray-500">XP Earned</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="flex-1 rounded-r-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  We'll send your progress and daily tips via WhatsApp
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class <span className="text-gray-400">(optional)</span>
                </label>
                <select
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your class</option>
                  <option value="CLASS_11">Class 11</option>
                  <option value="CLASS_12">Class 12</option>
                  <option value="DROPPER">Dropper/Repeater</option>
                </select>
              </div>

              {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-indigo-500 text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Progress & Continue'}
              </button>

              {variant === 'soft' && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
                >
                  Maybe later
                </button>
              )}
            </form>

            {/* Benefits */}
            <div className="px-6 pb-6">
              <p className="text-xs text-gray-500 mb-2">By saving, you get:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Save your streak & XP permanently
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Appear on the leaderboard
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Get daily practice reminders
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span> Unlock badges and achievements
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
</>
)
}
