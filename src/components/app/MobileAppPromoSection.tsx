'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DevicePhoneMobileIcon,
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  PlayCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  TrophyIcon,
  BoltIcon,
  ArrowDownTrayIcon,
  QrCodeIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import {
  StarIcon as StarSolid,
  SparklesIcon as SparklesSolid,
  TrophyIcon as TrophySolid,
} from '@heroicons/react/24/solid'
import { PremiumCard, PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'

interface MobileAppPromoSectionProps {
  onDownloadApp?: (platform: 'ios' | 'android' | 'sms') => void
  onViewScreenshots?: () => void
  onLearnMore?: () => void
}

interface AppFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  stats?: string
}

interface AppScreenshot {
  id: string
  title: string
  description: string
  image: string
  type: 'dashboard' | 'live-class' | 'ai-solver' | 'analytics' | 'community'
}

export function MobileAppPromoSection({
  onDownloadApp,
  onViewScreenshots,
  onLearnMore,
}: MobileAppPromoSectionProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [showQRCode, setShowQRCode] = useState(false)
  const [appStats, setAppStats] = useState({
    downloads: 50000,
    rating: 4.7,
    questionsSolved: 10000000,
    activeUsers: 95,
  })

  const appFeatures: AppFeature[] = [
    {
      id: 'ai-doubt-solver',
      title: 'AI Doubt Solver',
      description:
        'Instant biology doubt resolution with photo-based question solving. Available 24/7.',
      icon: SparklesSolid,
      gradient: 'from-purple-500 to-blue-500',
      stats: '50K+ doubts solved daily',
    },
    {
      id: 'personalized-study',
      title: 'Personalized Study Plan',
      description:
        'Daily targets based on weak areas with adaptive learning algorithm and progress tracking.',
      icon: AcademicCapIcon,
      gradient: 'from-green-500 to-teal-500',
      stats: 'AI-powered adaptation',
    },
    {
      id: 'live-classes',
      title: 'Live Classes',
      description:
        'Attend classes from anywhere with interactive doubt sessions and recorded lectures.',
      icon: PlayCircleIcon,
      gradient: 'from-red-500 to-pink-500',
      stats: '500+ hours of content',
    },
    {
      id: 'mock-tests',
      title: 'Mock Tests',
      description: 'Chapter-wise tests and full NEET mock exams with instant results and analysis.',
      icon: ClockIcon,
      gradient: 'from-orange-500 to-yellow-500',
      stats: '1000+ practice tests',
    },
    {
      id: 'performance-analytics',
      title: 'Performance Analytics',
      description: 'Weakness identification, peer comparison, and predictive score analysis.',
      icon: ChartBarIcon,
      gradient: 'from-indigo-500 to-purple-500',
      stats: 'ML-powered insights',
    },
    {
      id: 'community-support',
      title: 'Community Support',
      description: 'Connect with batch mates, study groups, and daily motivational content.',
      icon: UserGroupIcon,
      gradient: 'from-cyan-500 to-blue-500',
      stats: '25K+ active community',
    },
  ]

  const appScreenshots: AppScreenshot[] = [
    {
      id: 'dashboard',
      title: 'Smart Dashboard',
      description: 'Your personalized learning hub with AI-driven insights and daily targets',
      image: '/illustrations/app-dashboard.svg',
      type: 'dashboard',
    },
    {
      id: 'live-class',
      title: 'Live Classes',
      description: 'Attend interactive Biology classes with real-time doubt clearing',
      image: '/illustrations/app-live-class.svg',
      type: 'live-class',
    },
    {
      id: 'ai-solver',
      title: 'AI Doubt Solver',
      description: 'Take a photo of any Biology question and get instant AI-powered solutions',
      image: '/illustrations/app-ai-solver.svg',
      type: 'ai-solver',
    },
    {
      id: 'analytics',
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and predictive scoring',
      image: '/illustrations/app-analytics.svg',
      type: 'analytics',
    },
    {
      id: 'community',
      title: 'Study Community',
      description: 'Connect with fellow NEET aspirants and join study groups',
      image: '/illustrations/app-community.svg',
      type: 'community',
    },
  ]

  useEffect(() => {
    // Auto-rotate screenshots
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % appScreenshots.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleDownload = (platform: 'ios' | 'android' | 'sms') => {
    onDownloadApp?.(platform)

    // Track download intent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'app_download_intent', {
        platform: platform,
        app_name: 'Cerebrum Biology Academy',
      })
    }

    if (platform === 'ios') {
      window.open('https://apps.apple.com/app/cerebrum-biology-academy/id123456789', '_blank')
    } else if (platform === 'android') {
      window.open('https://play.google.com/store/apps/details?id=com.cerebrum.biology', '_blank')
    } else if (platform === 'sms') {
      // SMS download link
      const phoneNumber = prompt('Enter your phone number to receive download link:')
      if (phoneNumber) {
        alert(`Download link sent to ${phoneNumber}`)
      }
    }
  }

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev + 1) % appScreenshots.length)
  }

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev - 1 + appScreenshots.length) % appScreenshots.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <DevicePhoneMobileIcon className="w-12 h-12 text-blue-400" />
            <SparklesSolid className="w-8 h-8 text-yellow-400" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your NEET Success Partner
            </span>
            <br />
            <span className="text-white">in Your Pocket</span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Study Anywhere, Anytime with AI-Powered Learning
          </p>

          {/* App Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-green-400">
                <AnimatedCounter value={appStats.downloads} suffix="+" />
              </div>
              <div className="text-blue-200 text-sm">Downloads</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center space-x-1 text-3xl font-bold text-yellow-400">
                <span>{appStats.rating}</span>
                <StarSolid className="w-6 h-6" />
              </div>
              <div className="text-blue-200 text-sm">Rating</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-purple-400">
                <AnimatedCounter value={appStats.questionsSolved / 1000000} suffix="M+" />
              </div>
              <div className="text-blue-200 text-sm">Questions Solved</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-cyan-400">{appStats.activeUsers}%</div>
              <div className="text-blue-200 text-sm">Daily Active Users</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-8 text-center lg:text-left">
              Powerful Features Designed for NEET Success
            </h3>

            <div className="grid gap-6">
              {appFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <PremiumCard
                    variant="default"
                    className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
                        <p className="text-blue-200 text-sm mb-2">{feature.description}</p>
                        {feature.stats && (
                          <div className="text-xs text-cyan-400 font-medium">{feature.stats}</div>
                        )}
                      </div>
                    </div>
                  </PremiumCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* App Screenshots Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">See the App in Action</h3>
              <p className="text-blue-200">Experience the future of NEET preparation</p>
            </div>

            <div className="relative max-w-sm mx-auto">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-black rounded-[2.5rem] p-2">
                  <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/19.5]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentScreenshot}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={appScreenshots[currentScreenshot].image}
                          alt={appScreenshots[currentScreenshot].title}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay with app interface elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h4 className="font-bold text-lg mb-1">
                            {appScreenshots[currentScreenshot].title}
                          </h4>
                          <p className="text-sm text-gray-200">
                            {appScreenshots[currentScreenshot].description}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevScreenshot}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <button
                onClick={nextScreenshot}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              {/* Screenshot Indicators */}
              <div className="flex justify-center space-x-2 mt-6">
                {appScreenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScreenshot(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentScreenshot ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-lg mb-8">
            <TrophySolid className="w-6 h-6" />
            <span>Download now and get 7 days premium access FREE!</span>
            <BoltIcon className="w-6 h-6" />
          </div>
        </motion.div>

        {/* Download CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Download the App Now</h3>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            {/* App Store Button */}
            <motion.button
              onClick={() => handleDownload('ios')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">📱</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </motion.button>

            {/* Google Play Button */}
            <motion.button
              onClick={() => handleDownload('android')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">▶</span>
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400">GET IT ON</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </motion.button>
          </div>

          {/* Alternative Download Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            {/* QR Code */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setShowQRCode(!showQRCode)}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
              >
                <QrCodeIcon className="w-5 h-5" />
                <span>Scan QR Code</span>
              </motion.button>

              <AnimatePresence>
                {showQRCode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute mt-20 bg-white p-4 rounded-xl shadow-xl"
                  >
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                      <QrCodeIcon className="w-16 h-16 text-gray-500" />
                    </div>
                    <p className="text-black text-xs mt-2 text-center">Scan to download</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SMS Option */}
            <PremiumButton
              onClick={() => handleDownload('sms')}
              variant="secondary"
              size="sm"
              className="border-blue-400 text-blue-300 hover:bg-blue-400 hover:text-white"
            >
              <ChatBubbleBottomCenterTextIcon className="w-4 h-4 mr-2" />
              Text APP to 92999-12345
            </PremiumButton>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-blue-200 text-sm">
            <p>🔒 100% Secure Download • 📱 Works on iOS 12+ and Android 8+ • 💾 Only 25MB</p>
          </div>
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl" />
    </section>
  )
}
