'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  Phone,
  MessageSquare,
  Clock,
  FileText,
  CalendarDays,
} from 'lucide-react'
import { PremiumCard, PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { ConversionTracker } from '@/lib/abTesting/conversionTracking'

function ThankYouContent() {
  const searchParams = useSearchParams()
  const form = searchParams?.get('form') || 'general'
  const [countdown, setCountdown] = useState(120) // 2 minutes countdown

  useEffect(() => {
    // Track thank you page view (method is private, use trackConversion instead)
    ConversionTracker.trackConversion('page_view', 0, {
      testId: 'thank-you',
      variantId: 'default',
      pageType: 'thank-you',
    })

    // Google Ads conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/THANKYOU_CONVERSION_LABEL',
        value: 1.0,
        currency: 'INR',
      })
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getContent = () => {
    switch (form) {
      case 'failure-analysis':
        return {
          title: '🎉 Success! Your Failure Analysis is Being Prepared',
          subtitle: 'Thank you for taking the first step towards your NEET success',
          message:
            'Our expert team is analyzing your previous NEET performance and preparing a personalized roadmap for your success.',
          whatsappMessage:
            'Your detailed failure analysis report will be delivered to your WhatsApp within 2 minutes.',
          callMessage:
            'Our counselor will call you within 2 hours to discuss your personalized success strategy.',
          nextSteps: [
            'Check your WhatsApp for detailed analysis report',
            'Receive call from our expert counselor',
            'Book your free one-on-one counseling session',
            'Get personalized study plan and timeline',
            'Join our specialized repeater program',
          ],
        }
      case 'enrollment':
        return {
          title: '🎊 Congratulations! Welcome to Cerebrum Family',
          subtitle: 'Your enrollment has been confirmed successfully',
          message:
            'You have taken the most important step towards your medical career. Our team is excited to guide you to success.',
          whatsappMessage: 'Enrollment confirmation and course details sent to your WhatsApp.',
          callMessage: 'Your dedicated counselor will call you within 1 hour for orientation.',
          nextSteps: [
            'Receive enrollment confirmation on WhatsApp',
            'Get orientation call from your counselor',
            'Access your student portal and study materials',
            'Join your batch WhatsApp group',
            'Attend your first class orientation session',
          ],
        }
      default:
        return {
          title: '✅ Thank You for Your Interest',
          subtitle: 'We have received your inquiry successfully',
          message: 'Our team will get back to you shortly with the information you requested.',
          whatsappMessage: 'You will receive a confirmation message on WhatsApp shortly.',
          callMessage: 'Our team will call you within 2 hours to assist you further.',
          nextSteps: [
            'Check your WhatsApp for confirmation',
            'Receive call from our team',
            'Get answers to all your questions',
            'Explore our course offerings',
            'Take the next step in your NEET journey',
          ],
        }
    }
  }

  const content = getContent()

  const handleWhatsAppContact = () => {
    ConversionTracker.trackWhatsAppClick()
    const message = 'Hi! I just submitted a form on your website and wanted to follow up.'
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918826444334?text=${encodedMessage}`, '_blank')
  }

  const handleCallNow = () => {
    ConversionTracker.trackPhoneCall()
    window.open('tel:+918826444334', '_self')
  }

  const handleBookCounseling = () => {
    ConversionTracker.trackDemoBooking()
    window.location.href = '/enrollment?source=thank-you'
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {content.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">{content.subtitle}</p>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">{content.message}</p>
        </motion.div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Delivery Status */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PremiumCard variant="premium" size="lg" className="bg-green-50 border-green-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-800 mb-2">WhatsApp Delivery</h3>
                  <p className="text-green-700 mb-3">{content.whatsappMessage}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">ETA: {formatTime(countdown)}</span>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>

          {/* Call Back Status */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <PremiumCard variant="premium" size="lg" className="bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">Counselor Call</h3>
                  <p className="text-blue-700 mb-3">{content.callMessage}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">Within 2 hours</span>
                  </div>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <PremiumCard variant="luxury" size="lg">
            <div className="text-center mb-8">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                What Happens Next?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Here's your step-by-step journey to NEET success
              </p>
            </div>

            <div className="space-y-4">
              {content.nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 font-medium">{step}</p>
                </motion.div>
              ))}
            </div>
          </PremiumCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Our team is available 24/7 to help you with any questions
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <PremiumButton
              onClick={handleWhatsAppContact}
              variant="medical"
              size="lg"
              className="w-full sm:w-auto min-h-[44px]"
            >
              <MessageSquare className="w-5 h-5 mr-3" />
              WhatsApp Now
            </PremiumButton>

            <PremiumButton
              onClick={handleCallNow}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-h-[44px]"
            >
              <Phone className="w-5 h-5 mr-3" />
              Call +91 88264 44334
            </PremiumButton>

            <PremiumButton
              onClick={handleBookCounseling}
              variant="luxury"
              size="lg"
              className="w-full sm:w-auto min-h-[44px]"
            >
              <CalendarDays className="w-5 h-5 mr-3" />
              Book Free Counseling
            </PremiumButton>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <PremiumCard variant="premium" className="bg-gray-50">
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                  <AnimatedCounter value={2341} />
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">Students Succeeded</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">98%</div>
                <div className="text-gray-600 text-xs sm:text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">24/7</div>
                <div className="text-gray-600 text-xs sm:text-sm">Support Available</div>
              </div>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          <p>🔒 Your information is secure and will never be shared with third parties</p>
          <p className="mt-2">✅ Join 10,000+ students who chose Cerebrum for their NEET success</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
