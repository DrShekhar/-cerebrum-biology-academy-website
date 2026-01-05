'use client'

import { useState, useMemo } from 'react'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  Search,
  HelpCircle,
  Clock,
  Calendar,
  BookOpen,
  Video,
  Star,
  Users,
  Shield,
} from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
  icon: React.ReactNode
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Is the demo really free?',
    answer:
      'Yes! The demo class is completely free with no hidden charges. You will receive a full 45-minute personalized session with our AIIMS expert, free study materials worth ₹2,000, and a customized NEET strategy session at absolutely no cost.',
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: 2,
    question: 'What happens after I book?',
    answer:
      "After booking, you'll receive an instant confirmation via WhatsApp and email. 30 minutes before your scheduled demo, you'll receive the Zoom meeting link and password. Our instructor will personally welcome you and conduct the session.",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    id: 3,
    question: 'Can I reschedule?',
    answer:
      'Absolutely! You can reschedule your demo up to 2 hours before the scheduled time. Simply contact us via WhatsApp at +91 88264 44334 or email support@cerebrumbiologyacademy.com with your new preferred time.',
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: 4,
    question: 'Do I need any preparation?',
    answer:
      'No prior preparation needed! Just join with an open mind and any specific doubts you have. We recommend keeping a notebook handy to take notes. If you have previous NEET question papers or specific topics you struggle with, feel free to bring them up during the session.',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 5,
    question: 'Will I get study materials?',
    answer:
      'Yes! During the demo, you will receive free digital study materials including chapter-wise notes, important diagrams, mnemonics, and previous year NEET questions. These materials are worth ₹2,000 and are yours to keep regardless of enrollment.',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 6,
    question: 'How long is the demo?',
    answer:
      'The demo session is 45 minutes long. This includes: 30 minutes of concept explanation and teaching methodology demonstration, 10 minutes for your questions and doubts, and 5 minutes for discussing our courses and personalized NEET strategy.',
    icon: <Video className="w-4 h-4" />,
  },
  {
    id: 7,
    question: 'Is it one-on-one or group?',
    answer:
      'Our demo classes are strictly one-on-one sessions! You get the undivided attention of our AIIMS expert for the full 45 minutes. This ensures personalized teaching tailored to your specific needs, learning pace, and areas of concern.',
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: 8,
    question: "What if I'm not satisfied?",
    answer:
      "Your satisfaction is our priority! If you're not completely satisfied with the demo, we offer a 100% money-back guarantee on any course enrollment. But we're confident you'll love our teaching methodology - 94.2% of demo attendees enroll within 24 hours!",
    icon: <Shield className="w-4 h-4" />,
  },
]

export function FAQAccordion() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return faqs
    const query = searchQuery.toLowerCase()
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h3>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search FAQ"
        />
      </div>

      {filteredFAQs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No matching questions found. Try a different search term.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={openId === faq.id}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {faq.icon}
                  </div>
                  <span className="font-medium text-gray-900">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-4 pb-4 pt-2 text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Still have questions?</strong> Contact us on WhatsApp at{' '}
          <button
            onClick={async () => {
              await trackAndOpenWhatsApp({
                source: 'faq-accordion-support',
                message: WHATSAPP_MESSAGES.enquiry,
                campaign: 'faq-support',
              })
            }}
            className="font-semibold underline hover:text-blue-700 cursor-pointer"
          >
            +91 88264 44334
          </button>{' '}
          or email{' '}
          <a
            href="mailto:support@cerebrumbiologyacademy.com"
            className="font-semibold underline hover:text-blue-700"
          >
            support@cerebrumbiologyacademy.com
          </a>
        </p>
      </div>
    </div>
  )
}
