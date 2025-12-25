'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useTransform } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  CheckCircle2,
  X,
  Star,
  Trophy,
  Heart,
  ShieldCheck,
  GraduationCap,
  Users,
  Clock,
  IndianRupee,
  Phone,
  FileDown,
  PlayCircle,
  Lightbulb,
  Flame,
} from 'lucide-react'

interface DifferentiationSectionProps {
  onBookTrial?: () => void
  onDownloadComparison?: () => void
  onTalkToStudents?: () => void
  className?: string
}

// Comparison data structure
const comparisonData = [
  {
    feature: 'Batch Size (Students)',
    cerebrum: '15-25 only',
    allen: '100+ (Factory model)',
    aakash: '80+ (Crowded)',
    jpt: '40+ (Still too many)',
    cereb_icon: '👑',
    highlight: true,
  },
  {
    feature: 'Focus Area',
    cerebrum: 'Only Biology (50% NEET)',
    allen: 'All subjects (diluted)',
    aakash: 'All subjects (diluted)',
    jpt: 'Only Biology (good)',
    cereb_icon: '🎯',
    highlight: true,
  },
  {
    feature: 'Faculty Background',
    cerebrum: 'AIIMS Alumni + PhD',
    allen: 'Regular B.Sc faculty',
    aakash: 'Mixed qualifications',
    jpt: 'Local M.Sc faculty',
    cereb_icon: '🥇',
    highlight: true,
  },
  {
    feature: 'Success Rate (Repeaters)',
    cerebrum: '90% (Audited)',
    allen: 'Not published',
    aakash: 'Self-claimed 85%',
    jpt: '70% (unverified)',
    cereb_icon: '📊',
    highlight: true,
  },
  {
    feature: 'Personal Attention Ratio',
    cerebrum: '1:5 (Guaranteed)',
    allen: '1:30 (Lost in crowd)',
    aakash: '1:25 (Struggling)',
    jpt: '1:15 (Limited)',
    cereb_icon: '🤝',
    highlight: true,
  },
  {
    feature: 'Psychological Support',
    cerebrum: 'In-house psychologist',
    allen: 'Not available',
    aakash: 'Generic counseling',
    jpt: 'Not available',
    cereb_icon: '💚',
    highlight: false,
  },
  {
    feature: 'Fee Structure',
    cerebrum: 'Pay-after-results option',
    allen: '100% advance',
    aakash: '100% advance',
    jpt: '100% advance',
    cereb_icon: '🛡️',
    highlight: false,
  },
  {
    feature: 'Result Transparency',
    cerebrum: 'KPMG audited',
    allen: 'Self-reported',
    aakash: 'Marketing claims',
    jpt: 'Not published',
    cereb_icon: '✅',
    highlight: false,
  },
]

const uniqueFeatures = [
  {
    id: 'specialists',
    title: 'Second Chance Specialists',
    description: 'We ONLY teach failed students. Our entire curriculum is designed for repeaters.',
    icon: Trophy,
    color: 'from-amber-600 to-amber-700',
    stats: '3000+ failed students converted',
    benefit: 'Specialized failure analysis & recovery',
  },
  {
    id: 'emotional',
    title: 'Emotional Support System',
    description: 'In-house psychologist, parent counseling, peer support groups for mental health.',
    icon: Heart,
    color: 'from-teal-500 to-teal-600',
    stats: '95% stress reduction reported',
    benefit: 'Mental health = Academic performance',
  },
  {
    id: 'guarantee',
    title: 'Small Batch Guarantee',
    description: 'Never more than 25 students. Personal attention tracked daily with Dr. Shekhar.',
    icon: Users,
    color: 'from-navy-600 to-navy-700',
    stats: 'Max 25 students per batch',
    benefit: 'Individual attention guaranteed',
  },
  {
    id: 'transparency',
    title: 'Transparent Results',
    description: 'Third-party audited success rates. Published mark improvements with proof.',
    icon: ShieldCheck,
    color: 'from-teal-600 to-teal-700',
    stats: 'KPMG audited results',
    benefit: 'No false claims, pure transparency',
  },
  {
    id: 'payback',
    title: 'Pay After Results',
    description: '40% upfront, 60% after NEET. Performance-linked fee structure available.',
    icon: IndianRupee,
    color: 'from-amber-700 to-amber-800',
    stats: '60% fees after results',
    benefit: 'Success-aligned payment model',
  },
]

export function DifferentiationSection({
  onBookTrial,
  onDownloadComparison,
  onTalkToStudents,
  className,
}: DifferentiationSectionProps) {
  const [activeFeature, setActiveFeature] = useState<string>('specialists')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInViewport = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInViewport) {
      setIsVisible(true)
    }
  }, [isInViewport])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((current) => {
        const currentIndex = uniqueFeatures.findIndex((f) => f.id === current)
        const nextIndex = (currentIndex + 1) % uniqueFeatures.length
        return uniqueFeatures[nextIndex].id
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleDownloadComparison = () => {
    // Create and download detailed comparison PDF
    alert('Detailed Comparison PDF download starting...')
    onDownloadComparison?.()
  }

  const handleBookTrial = () => {
    onBookTrial?.()
  }

  const handleTalkToStudents = () => {
    onTalkToStudents?.()
  }

  return (
    <section ref={sectionRef} className={`relative py-20 bg-navy-900 overflow-hidden ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-navy-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-900/30 backdrop-blur-sm border border-amber-500/30 rounded-full px-6 py-3 mb-6">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-medium">The Brutal Truth</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Why </span>
            <span className="text-amber-400">Failed Students</span>
            <br />
            <span className="text-white">Choose Us Over </span>
            <span className="text-teal-400">Allen & Aakash</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            <span className="text-amber-400 font-semibold">We Don't Teach Everyone.</span>{' '}
            <span className="text-teal-400 font-semibold">We Resurrect Medical Dreams.</span>
            <br />
            <span className="text-gray-400 text-lg mt-2 block">
              The only institute in India designed exclusively for failed NEET students.
            </span>
          </p>
        </motion.div>

        {/* Comparison Matrix */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            The <span className="text-teal-400">Honest</span> Comparison
          </h2>

          <PremiumCard variant="luxury" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-gray-400 font-medium">Feature</th>
                    <th className="text-center py-4 px-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-teal-400">Cerebrum Biology</span>
                        <span className="text-xs text-teal-300">Failed Student Specialists</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-gray-300" />
                        </div>
                        <span className="font-medium text-gray-300">Allen</span>
                        <span className="text-xs text-gray-400">Mass Production</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-gray-300" />
                        </div>
                        <span className="font-medium text-gray-300">Aakash</span>
                        <span className="text-xs text-gray-400">Corporate Chain</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-gray-300" />
                        </div>
                        <span className="font-medium text-gray-300">JPT Biology</span>
                        <span className="text-xs text-gray-400">Local Academy</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                        row.highlight ? 'bg-teal-500/5' : ''
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {row.highlight && (
                            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
                          )}
                          <span className="font-medium text-white">{row.feature}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-2xl">{row.cereb_icon}</span>
                          <span className="font-semibold text-teal-400">{row.cerebrum}</span>
                          {row.highlight && <CheckCircle2 className="w-5 h-5 text-teal-400" />}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-gray-400">{row.allen}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-gray-400">{row.aakash}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="text-gray-400">{row.jpt}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PremiumCard>
        </motion.div>

        {/* Unique Features Showcase */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our <span className="text-teal-400">Exclusive</span> Advantages
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Feature Tabs */}
            <div className="space-y-4">
              {uniqueFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    activeFeature === feature.id
                      ? 'bg-white/10 border-white/30 backdrop-blur-xl'
                      : 'bg-white/5 border-white/10 hover:bg-white/8'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-teal-400 bg-teal-500/20 px-3 py-1 rounded-full">
                          {feature.stats}
                        </span>
                        <span className="text-xs text-teal-300">{feature.benefit}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Feature Display */}
            <div className="lg:sticky lg:top-8">
              <AnimatePresence mode="wait">
                {uniqueFeatures.map(
                  (feature) =>
                    activeFeature === feature.id && (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <PremiumCard variant="luxury" className="text-center">
                          <div
                            className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                          >
                            <feature.icon className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                            {feature.description}
                          </p>
                          <div className="bg-teal-900/30 border border-teal-500/30 rounded-xl p-6">
                            <div className="text-3xl font-bold text-teal-400 mb-2">
                              {feature.stats}
                            </div>
                            <div className="text-teal-300 font-medium">{feature.benefit}</div>
                          </div>
                        </PremiumCard>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Visual Attention Calculator */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Your <span className="text-amber-400">Personal Attention</span> Calculator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Cerebrum Biology', ratio: '1:5', time: '12 min/student', color: 'teal' },
              { name: 'JPT Biology', ratio: '1:15', time: '4 min/student', color: 'navy' },
              { name: 'Aakash', ratio: '1:25', time: '2.4 min/student', color: 'amber' },
              { name: 'Allen', ratio: '1:30', time: '2 min/student', color: 'amber' },
            ].map((institute, index) => (
              <PremiumCard
                key={institute.name}
                variant={institute.name === 'Cerebrum Biology' ? 'luxury' : 'default'}
                className={`text-center ${
                  institute.name === 'Cerebrum Biology' ? 'ring-2 ring-emerald-400/50' : ''
                }`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">{institute.name}</h3>
                  <div
                    className={`text-3xl font-bold mb-2 ${
                      institute.color === 'teal'
                        ? 'text-teal-400'
                        : institute.color === 'navy'
                          ? 'text-navy-400'
                          : 'text-amber-400'
                    }`}
                  >
                    {institute.ratio}
                  </div>
                  <div className="text-gray-300 text-sm">Teacher:Student Ratio</div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">{institute.time}</div>
                  <div className="text-gray-400 text-xs">Per hour class</div>
                </div>

                {institute.name === 'Cerebrum Biology' && (
                  <div className="mt-4 bg-teal-500/20 border border-teal-500/30 rounded-lg p-3">
                    <div className="text-teal-400 font-medium text-sm">🎯 Winner!</div>
                  </div>
                )}
              </PremiumCard>
            ))}
          </div>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            See the <span className="text-teal-400">Difference</span> Yourself
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <PremiumButton
              onClick={handleBookTrial}
              variant="luxury"
              size="lg"
              className="w-full group relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-3">
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Book Trial Class</span>
              </div>
              <div className="absolute inset-0 bg-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </PremiumButton>

            <PremiumButton
              onClick={handleTalkToStudents}
              variant="secondary"
              size="lg"
              className="w-full group"
            >
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Talk to Our Students</span>
              </div>
            </PremiumButton>

            <PremiumButton
              onClick={handleDownloadComparison}
              variant="secondary"
              size="lg"
              className="w-full group"
            >
              <div className="flex items-center justify-center gap-3">
                <FileDown className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Download Comparison</span>
              </div>
            </PremiumButton>
          </div>

          <p className="text-gray-400 mt-8 max-w-2xl mx-auto">
            Join the <span className="text-teal-400 font-semibold">3000+ failed students</span> who
            transformed their medical dreams into reality with us.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
