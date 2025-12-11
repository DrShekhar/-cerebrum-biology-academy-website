'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Phone, Mail, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface BlogLeadCaptureProps {
  articleSlug: string
  articleTitle: string
  chapterName?: string
}

export function BlogLeadCapture({ articleSlug, articleTitle, chapterName }: BlogLeadCaptureProps) {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validatePhone = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(value)
  }

  const validateEmail = (value: string): boolean => {
    if (!value) return true
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/blog/capture-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          email: email || undefined,
          name: name || undefined,
          source: 'blog_inline',
          articleSlug,
          articleTitle,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        className="my-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-3 text-green-700">
          <CheckCircle className="w-8 h-8" />
          <div>
            <h3 className="text-lg font-bold">Thank You!</h3>
            <p className="text-sm text-green-600">
              We'll send you the study materials on WhatsApp shortly.
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="my-8 p-6 md:p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-sm font-medium text-blue-100">Free Study Material</span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-2">
          {chapterName ? `Get ${chapterName} Notes PDF` : 'Get Free NEET Biology Study Notes'}
        </h3>
        <p className="text-blue-100 mb-6 text-sm md:text-base">
          Enter your details to receive comprehensive study materials, previous year questions, and
          expert tips directly on WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Mobile Number *"
                required
                className="w-full pl-10 pr-4 py-3 bg-white/95 text-gray-900 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500"
                style={{ fontSize: '16px' }}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (Optional)"
                className="w-full pl-10 pr-4 py-3 bg-white/95 text-gray-900 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name (Optional)"
              className="w-full pl-10 pr-4 py-3 bg-white/95 text-gray-900 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none placeholder-gray-500"
              style={{ fontSize: '16px' }}
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm bg-red-500/20 px-3 py-2 rounded-lg">{error}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !phone}
            className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {isSubmitting ? 'Sending...' : 'Get Free Notes on WhatsApp'}
          </Button>

          <p className="text-xs text-blue-200 text-center">
            By submitting, you agree to receive study materials via WhatsApp. No spam.
          </p>
        </form>

        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-100">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>NCERT-aligned notes</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Previous year questions</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Expert tips</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
