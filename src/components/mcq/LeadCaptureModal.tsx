'use client'

import { MessageCircle, Phone, CheckCircle } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

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
  questionsAnswered,
  accuracy,
  xpEarned,
  variant,
}: LeadCaptureModalProps) {
  const handleSkip = () => {
    onClose()
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeInUp"
          onClick={handleSkip}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeInUp"
          >
            <div className="bg-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🎉</span>
                <button
                  onClick={handleSkip}
                  className="text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Skip"
                >
                  ✕
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2">Great Progress!</h2>
              <p className="text-white/90">
                Keep practicing to improve your NEET Biology score. Connect with us for personalized
                guidance!
              </p>
            </div>

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

            <div className="p-6 space-y-3">
              <button
                type="button"
                onClick={() =>
                  trackAndOpenWhatsApp({
                    source: 'mcq-lead-capture',
                    message: `Hi! I just practiced ${questionsAnswered} NEET Biology questions with ${accuracy}% accuracy. I want personalized guidance to improve my score. Please help!`,
                    campaign: 'mcq-practice',
                  })
                }
                className="w-full flex items-center justify-center gap-2 py-4 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <MessageCircle className="w-6 h-6" />
                Get Guidance via WhatsApp
              </button>

              <a
                href="tel:+918826444334"
                className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all min-h-[56px] touch-manipulation"
              >
                <Phone className="w-6 h-6" />
                Call: +91 88264 44334
              </a>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full py-2 text-gray-500 text-sm hover:text-gray-700 transition-colors"
              >
                Skip — Continue practicing
              </button>
            </div>

            <div className="px-6 pb-6">
              <p className="text-xs text-gray-500 mb-2">Connect with us to:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {[
                  'Get a personalized study plan',
                  'Join expert-led NEET Biology classes',
                  'Access premium practice questions',
                  'Track your daily progress',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
