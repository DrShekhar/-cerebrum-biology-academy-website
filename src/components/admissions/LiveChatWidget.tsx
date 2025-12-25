'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Phone,
  HelpCircle,
  ChevronRight,
  Clock,
  CreditCard,
  BookOpen,
  Users,
  Calendar,
} from 'lucide-react'
import { trackChatWidget, trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics'

interface FAQ {
  id: string
  question: string
  answer: string
  icon: React.ReactNode
}

interface LiveChatWidgetProps {
  whatsappNumber?: string
}

export function LiveChatWidget({ whatsappNumber = '+918826444334' }: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null)

  const faqs: FAQ[] = [
    {
      id: 'fees',
      question: 'What are the course fees?',
      answer:
        'Our course fees range from ₹45,000 (Crash Course) to ₹1,20,000 (Foundation Batch). We offer flexible EMI options and scholarships up to 50% for meritorious students.',
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: 'batches',
      question: 'Which batch is right for me?',
      answer:
        'Foundation Batch (Class 11) for 2-year prep, Target Batch (Class 12) for 1-year intensive prep, Dropper Batch for repeaters, and Crash Course for last-minute revision. Our counselor can help you choose.',
      icon: <BookOpen className="w-4 h-4" />,
    },
    {
      id: 'timings',
      question: 'What are the class timings?',
      answer:
        'We offer flexible timings: Morning (6 AM - 12 PM), Afternoon (12 PM - 6 PM), and Evening (6 PM - 10 PM). Choose what suits your schedule best.',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: 'demo',
      question: 'Can I attend a demo class?',
      answer:
        'Yes! We offer a FREE demo class and diagnostic test. You can experience our teaching methodology before enrolling. Book your slot now!',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: 'faculty',
      question: 'Who are the faculty members?',
      answer:
        'Our faculty includes AIIMS-trained experts with 15+ years of NEET coaching experience. Dr. Shekhar C Singh (Biology) leads our team with proven results.',
      icon: <Users className="w-4 h-4" />,
    },
  ]

  const handleWhatsAppRedirect = (message?: string) => {
    const defaultMessage = 'Hi, I have a question about NEET coaching at Cerebrum Biology Academy.'
    const encodedMessage = encodeURIComponent(message || defaultMessage)
    window.open(
      `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          trackChatWidget.opened()
        }}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <HelpCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-sm font-medium pr-1">Quick Help</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] max-w-[calc(100vw-2rem)] sm:w-96 sm:max-w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Quick Help</h3>
                    <p className="text-xs text-blue-100">Get instant answers</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setSelectedFAQ(null)
                  }}
                  className="text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {selectedFAQ ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <button
                    onClick={() => setSelectedFAQ(null)}
                    className="text-blue-600 text-sm mb-3 flex items-center gap-1 hover:underline"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to questions
                  </button>

                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {selectedFAQ.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm mb-2">
                          {selectedFAQ.question}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {selectedFAQ.answer}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">Need more details?</p>
                  <button
                    onClick={() =>
                      handleWhatsAppRedirect(`Hi, I have a question about: ${selectedFAQ.question}`)
                    }
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Select a question or chat with us on WhatsApp
                  </p>

                  <div className="space-y-2 mb-4">
                    {faqs.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => {
                          setSelectedFAQ(faq)
                          trackChatWidget.faqClicked(faq.id)
                        }}
                        className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-3 group"
                      >
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                          {faq.icon}
                        </div>
                        <span className="text-sm text-gray-700 flex-1">{faq.question}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-3">Can't find your answer?</p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          handleWhatsAppRedirect()
                          trackWhatsAppClick('chat_widget')
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </button>
                      <a
                        href={`tel:${whatsappNumber}`}
                        onClick={() => trackPhoneClick('chat_widget')}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call Now
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
