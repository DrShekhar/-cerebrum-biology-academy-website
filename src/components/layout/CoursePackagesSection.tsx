'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  CheckCircle2,
  Star,
  Sparkles,
  GraduationCap,
  Trophy,
  Clock,
  IndianRupee,
  Users,
  BookOpen,
  CalendarDays,
  Phone,
  CalculatorIcon,
  Gift,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface CoursePackagesSectionProps {
  onBookDemo?: (packageName: string) => void
  className?: string
}

interface CoursePackage {
  id: string
  name: string
  tagline: string
  originalPrice: number
  currentPrice: number
  category: 'premium' | 'standard' | 'foundation' | 'crash'
  targetAudience: string
  badge?: string
  badgeColor?: string
  features: string[]
  highlights: string[]
  successRate: number
  batchSize: number
  duration: string
  emiOptions: number[]
  refundPolicy?: string
  popular?: boolean
  recommended?: boolean
}

export function CoursePackagesSection({ onBookDemo, className = '' }: CoursePackagesSectionProps) {
  const [selectedView, setSelectedView] = useState<'cards' | 'table'>('cards')
  const [currentPackage, setCurrentPackage] = useState(0)
  const [showEMICalculator, setShowEMICalculator] = useState(false)
  const [selectedEMI, setSelectedEMI] = useState(12)
  const [groupDiscount, setGroupDiscount] = useState(1)
  const [earlyBirdTimeLeft, setEarlyBirdTimeLeft] = useState({
    days: 7,
    hours: 12,
    minutes: 30,
    seconds: 45,
  })

  const coursePackages: CoursePackage[] = [
    {
      id: 'pinnacle-za',
      name: 'Pinnacle NEET Z-A',
      tagline: 'Complete Transformation Program',
      originalPrice: 250000,
      currentPrice: 200000,
      category: 'premium',
      targetAudience: 'Serious repeaters wanting guaranteed results',
      badge: 'Most Popular',
      badgeColor: 'gold',
      successRate: 98,
      batchSize: 15,
      duration: '12 months',
      emiOptions: [6, 12, 18, 24],
      refundPolicy: '100% fee refund if <50 marks improvement',
      popular: true,
      features: [
        'Direct mentoring by Dr. Shekhar (AIIMS)',
        '15 students only per batch',
        'Daily 6-hour intensive sessions',
        'Personal success coach assigned',
        '100% fee refund guarantee',
        'Residential option available',
        'Weekly parent counseling',
        '24/7 doubt clearing support',
        'Advanced molecular biology labs',
        'NEET pattern mock tests (100+)',
        'Medical college admission guidance',
        'Interview preparation sessions',
      ],
      highlights: [
        'Highest success rate: 98%',
        'Average score improvement: 120+ marks',
        'AIIMS selections: 85% students',
        'Personal attention guarantee',
      ],
    },
    {
      id: 'intensive-biology',
      name: 'Intensive Biology Course',
      tagline: 'Focused Recovery Program',
      originalPrice: 150000,
      currentPrice: 120000,
      category: 'standard',
      targetAudience: 'Students needing structured support',
      badge: 'Best Value',
      badgeColor: 'blue',
      successRate: 92,
      batchSize: 25,
      duration: '10 months',
      emiOptions: [6, 12, 18],
      recommended: true,
      features: [
        '25 students per batch',
        '4-5 hours daily classes',
        'Weekly counseling sessions',
        'AI-powered doubt resolution',
        'Mock test series (50+ tests)',
        'Study material included',
        'Online doubt portal',
        'Monthly parent meetings',
        'Weakness analysis reports',
        'Revision crash courses',
        'Medical entrance guidance',
      ],
      highlights: [
        'Success rate: 92%',
        'Average improvement: 95+ marks',
        'Government college admissions: 78%',
        'Structured learning path',
      ],
    },
    {
      id: 'pinnacle-plan-a',
      name: 'Pinnacle NEET Plan A',
      tagline: 'Hybrid Learning Program',
      originalPrice: 98000,
      currentPrice: 85000,
      category: 'foundation',
      targetAudience: 'Self-motivated repeaters',
      successRate: 88,
      batchSize: 40,
      duration: '8 months',
      emiOptions: [6, 12],
      features: [
        'Hybrid online-offline model',
        'Weekend physical classes',
        'Recorded lectures access',
        'Monthly performance tracking',
        'Online test series (30+ tests)',
        'Digital study material',
        'Doubt clearing sessions',
        'Progress tracking app',
        'Peer discussion forums',
        'Expert guidance videos',
      ],
      highlights: [
        'Success rate: 88%',
        'Flexible learning schedule',
        'Cost-effective option',
        'Technology-enhanced learning',
      ],
    },
    {
      id: 'pinnacle-plan-b',
      name: 'Pinnacle NEET Plan B',
      tagline: 'Budget-Friendly Option',
      originalPrice: 68000,
      currentPrice: 58000,
      category: 'foundation',
      targetAudience: 'Budget-conscious students',
      successRate: 82,
      batchSize: 50,
      duration: '6 months',
      emiOptions: [6, 12],
      features: [
        'Online-first approach',
        'Bi-weekly doubt sessions',
        'Study material included',
        'Test series access (20+ tests)',
        'Mobile app learning',
        'Community support',
        'Basic mentorship',
        'Progress reports',
      ],
      highlights: [
        'Most affordable option',
        'Online flexibility',
        'Essential features covered',
        'Community learning',
      ],
    },
    {
      id: 'pursuit-neet',
      name: 'Pursuit NEET',
      tagline: 'Last-Minute Intensive',
      originalPrice: 49000,
      currentPrice: 42000,
      category: 'crash',
      targetAudience: 'Last-minute preparation',
      successRate: 75,
      batchSize: 30,
      duration: '3-6 months',
      emiOptions: [3, 6],
      features: [
        '3-6 month intensive program',
        'Fast-track revision',
        'Daily practice tests',
        'High-yield topics focus',
        'Rapid concept clearing',
        'Exam strategy sessions',
        'Quick revision notes',
        'Emergency doubt support',
      ],
      highlights: [
        'Quick preparation solution',
        'High-impact learning',
        'Exam-focused approach',
        'Rapid score improvement',
      ],
    },
  ]

  // Early bird discount countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setEarlyBirdTimeLeft((prev) => {
        let newSeconds = prev.seconds - 1
        let newMinutes = prev.minutes
        let newHours = prev.hours
        let newDays = prev.days

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }
        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }
        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        return { days: newDays, hours: newHours, minutes: newMinutes, seconds: newSeconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleBookDemo = (packageName: string) => {
    onBookDemo?.(packageName)
  }

  const calculateEMI = (price: number, months: number) => {
    const monthlyAmount = Math.ceil(price / months)
    return monthlyAmount
  }

  const calculateGroupDiscount = (originalPrice: number, groupSize: number) => {
    if (groupSize >= 5) return originalPrice * 0.8 // 20% discount
    if (groupSize >= 3) return originalPrice * 0.9 // 10% discount
    return originalPrice
  }

  const getBadgeStyles = (color: string) => {
    const styles = {
      gold: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      blue: 'bg-green-600 text-white',
      green: 'bg-[#4a5d4a] text-white',
    }
    return styles[color as keyof typeof styles] || styles.blue
  }

  const getCategoryStyles = (category: string) => {
    const styles = {
      premium: 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50',
      standard: 'border-2 border-green-500 bg-navy-50',
      foundation: 'border border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50',
      crash: 'border border-orange-300 bg-orange-50',
    }
    return styles[category as keyof typeof styles] || styles.foundation
  }

  return (
    <section className={`py-20 bg-gradient-to-br from-slate-50 to-blue-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-navy-100 border border-green-400 rounded-full px-4 py-2">
            <Trophy className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-800">
              Specialized Programs for Failed NEET Students
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-navy-900">
            Transform Your Failure
            <br />
            Into MBBS Success
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Choose from our proven course packages designed specifically for NEET repeaters.
            <span className="font-semibold text-blue-700">
              {' '}
              Each program comes with success guarantees
            </span>{' '}
            and personalized mentorship to ensure your medical college dream becomes reality.
          </p>

          {/* Early Bird Discount Banner */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-red-600 text-white rounded-xl p-4 max-w-md mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Gift className="h-6 w-6" />
              <span className="font-bold text-lg">Early Bird Offer</span>
            </div>
            <div className="text-center">
              <p className="text-sm mb-2">₹50,000 OFF on all packages!</p>
              <div className="flex justify-center gap-2 text-sm">
                {[
                  { value: earlyBirdTimeLeft.days, label: 'Days' },
                  { value: earlyBirdTimeLeft.hours, label: 'Hrs' },
                  { value: earlyBirdTimeLeft.minutes, label: 'Min' },
                  { value: earlyBirdTimeLeft.seconds, label: 'Sec' },
                ].map((item, index) => (
                  <div key={index} className="bg-white/20 rounded px-2 py-1">
                    <div className="font-bold">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg border">
            <button
              onClick={() => setSelectedView('cards')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                selectedView === 'cards'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Card View
            </button>
            <button
              onClick={() => setSelectedView('table')}
              className={`px-6 py-2 rounded-md font-semibold transition-all ${
                selectedView === 'table'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Compare All
            </button>
          </div>
        </div>

        {/* Course Packages Display */}
        <AnimatePresence mode="wait">
          {selectedView === 'cards' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              key="cards"
              className="space-y-8"
            >
              {/* Mobile: Swipeable Cards */}
              <div className="md:hidden">
                <div className="relative">
                  <PremiumCard
                    variant="luxury"
                    size="lg"
                    className={getCategoryStyles(coursePackages[currentPackage].category)}
                  >
                    <PackageCard
                      package={coursePackages[currentPackage]}
                      onBookDemo={handleBookDemo}
                      featured={coursePackages[currentPackage].popular}
                    />
                  </PremiumCard>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setCurrentPackage(Math.max(0, currentPackage - 1))}
                      disabled={currentPackage === 0}
                      className="p-2 rounded-full bg-white shadow-lg disabled:opacity-50"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div className="flex gap-2">
                      {coursePackages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPackage(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentPackage ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPackage(Math.min(coursePackages.length - 1, currentPackage + 1))
                      }
                      disabled={currentPackage === coursePackages.length - 1}
                      className="p-2 rounded-full bg-white shadow-lg disabled:opacity-50"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tablet & Desktop: Grid Layout */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5 lg:gap-6">
                {coursePackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative ${pkg.popular ? 'lg:col-span-1 xl:col-span-2 lg:row-span-1' : ''}`}
                  >
                    <PremiumCard
                      variant={pkg.popular ? 'luxury' : 'premium'}
                      size={pkg.popular ? 'lg' : 'md'}
                      className={getCategoryStyles(pkg.category)}
                    >
                      <PackageCard
                        package={pkg}
                        onBookDemo={handleBookDemo}
                        featured={pkg.popular}
                        compact={!pkg.popular}
                      />
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedView === 'table' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              key="table"
            >
              <ComparisonTable packages={coursePackages} onBookDemo={handleBookDemo} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* EMI Calculator */}
          <PremiumCard variant="premium" size="md" className="text-center">
            <CalculatorIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">EMI Calculator</h3>
            <p className="text-gray-600 text-sm mb-4">Calculate your monthly payments</p>
            <PremiumButton
              variant="primary"
              size="sm"
              onClick={() => setShowEMICalculator(true)}
              className="w-full"
            >
              Calculate EMI
            </PremiumButton>
          </PremiumCard>

          {/* Scholarship Checker */}
          <PremiumCard variant="premium" size="md" className="text-center">
            <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Scholarship Check</h3>
            <p className="text-gray-600 text-sm mb-4">See if you qualify for discounts</p>
            <PremiumButton variant="primary" size="sm" className="w-full">
              Check Eligibility
            </PremiumButton>
          </PremiumCard>

          {/* Group Discount */}
          <PremiumCard variant="premium" size="md" className="text-center">
            <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Group Discount</h3>
            <p className="text-gray-600 text-sm mb-4">Up to 20% off for groups</p>
            <PremiumButton variant="primary" size="sm" className="w-full">
              Learn More
            </PremiumButton>
          </PremiumCard>

          {/* Refer & Earn */}
          <PremiumCard variant="premium" size="md" className="text-center">
            <Sparkles className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Refer & Earn</h3>
            <p className="text-gray-600 text-sm mb-4">₹25,000 for each referral</p>
            <PremiumButton variant="primary" size="sm" className="w-full">
              Start Referring
            </PremiumButton>
          </PremiumCard>
        </motion.div>

        {/* Success Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-green-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <Trophy className="h-16 w-16 mx-auto text-yellow-300" />
            <h3 className="text-3xl font-bold">Our Success Guarantee</h3>
            <p className="text-xl leading-relaxed">
              We're so confident in our teaching methodology that we offer a
              <span className="font-bold"> 100% money-back guarantee</span> if you don't improve by
              at least 50 marks in Biology. Your success is our commitment.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-300">
                  <AnimatedCounter value={94} suffix="%" />
                </div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">
                  <AnimatedCounter value={2000} suffix="+" />
                </div>
                <div className="text-sm">Students Transformed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-300">
                  <AnimatedCounter value={15} />
                </div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EMI Calculator Modal would go here */}
      {showEMICalculator && (
        <EMICalculatorModal packages={coursePackages} onClose={() => setShowEMICalculator(false)} />
      )}
    </section>
  )
}

// Individual Package Card Component
function PackageCard({
  package: pkg,
  onBookDemo,
  featured = false,
  compact = false,
}: {
  package: CoursePackage
  onBookDemo: (packageName: string) => void
  featured?: boolean
  compact?: boolean
}) {
  const discount = Math.round(((pkg.originalPrice - pkg.currentPrice) / pkg.originalPrice) * 100)

  return (
    <div className="relative">
      {/* Badge */}
      {pkg.badge && (
        <div
          className={`absolute -top-2 left-4 px-3 py-1 rounded-full text-xs font-bold z-10 ${getBadgeStyles(
            pkg.badgeColor || 'blue'
          )}`}
        >
          {pkg.badge}
        </div>
      )}

      <div className="pt-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className={`font-bold text-gray-900 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {pkg.name}
          </h3>
          <p className={`text-gray-600 ${featured ? 'text-base' : 'text-sm'}`}>{pkg.tagline}</p>

          {/* Success Rate */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-green-600">{pkg.successRate}% Success</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center space-y-2">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 line-through">
              ₹{pkg.originalPrice.toLocaleString()}
            </div>
            <div className={`font-bold text-blue-600 ${featured ? 'text-3xl' : 'text-2xl'}`}>
              ₹{pkg.currentPrice.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 font-semibold">{discount}% OFF</div>
          </div>

          <div className="text-xs text-gray-500">
            EMI from ₹{Math.ceil(pkg.currentPrice / 12).toLocaleString()}/month
          </div>
        </div>

        {/* Key Features */}
        {!compact && (
          <div className="space-y-3">
            {pkg.features.slice(0, featured ? 6 : 4).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
            {pkg.features.length > (featured ? 6 : 4) && (
              <div className="text-sm text-blue-600 font-medium">
                +{pkg.features.length - (featured ? 6 : 4)} more features
              </div>
            )}
          </div>
        )}

        {/* Highlights */}
        <div className="bg-blue-50 rounded-lg p-3 space-y-2">
          {pkg.highlights.slice(0, compact ? 2 : 4).map((highlight, index) => (
            <div key={index} className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{highlight}</span>
            </div>
          ))}
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <Users className="h-5 w-5 text-gray-400 mx-auto mb-1" />
            <div className="font-medium">{pkg.batchSize} Students</div>
            <div className="text-gray-500">Batch Size</div>
          </div>
          <div>
            <CalendarDays className="h-5 w-5 text-gray-400 mx-auto mb-1" />
            <div className="font-medium">{pkg.duration}</div>
            <div className="text-gray-500">Duration</div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <PremiumButton
            variant="medical"
            size={featured ? 'lg' : 'md'}
            onClick={() => onBookDemo(pkg.name)}
            className="w-full"
          >
            <Phone className="h-5 w-5" />
            Book Demo Class
          </PremiumButton>

          <div className="text-center text-xs text-gray-500">
            {pkg.refundPolicy && (
              <div className="bg-green-50 text-green-700 p-2 rounded">🛡️ {pkg.refundPolicy}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Comparison Table Component
function ComparisonTable({
  packages,
  onBookDemo,
}: {
  packages: CoursePackage[]
  onBookDemo: (packageName: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Package</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Price</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
              Success Rate
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
              Batch Size
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Duration</th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {packages.map((pkg, index) => (
            <motion.tr
              key={pkg.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`hover:bg-gray-50 ${pkg.popular ? 'bg-blue-50' : ''}`}
            >
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="font-semibold text-gray-900">{pkg.name}</div>
                  <div className="text-sm text-gray-600">{pkg.tagline}</div>
                  {pkg.badge && (
                    <div
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getBadgeStyles(
                        pkg.badgeColor || 'blue'
                      )}`}
                    >
                      {pkg.badge}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-blue-600">
                    ₹{pkg.currentPrice.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 line-through">
                    ₹{pkg.originalPrice.toLocaleString()}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="font-semibold text-green-600">{pkg.successRate}%</div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="font-medium">{pkg.batchSize}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="font-medium">{pkg.duration}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <PremiumButton variant="primary" size="sm" onClick={() => onBookDemo(pkg.name)}>
                  Book Demo
                </PremiumButton>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// EMI Calculator Modal (simplified version)
function EMICalculatorModal({
  packages,
  onClose,
}: {
  packages: CoursePackage[]
  onClose: () => void
}) {
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [selectedTenure, setSelectedTenure] = useState(12)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">EMI Calculator</h3>
            <p className="text-gray-600">Calculate your monthly payment</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Package</label>
              <select
                value={selectedPackage.id}
                onChange={(e) =>
                  setSelectedPackage(packages.find((p) => p.id === e.target.value) || packages[0])
                }
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tenure</label>
              <select
                value={selectedTenure}
                onChange={(e) => setSelectedTenure(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2"
              >
                {selectedPackage.emiOptions.map((months) => (
                  <option key={months} value={months}>
                    {months} months
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Monthly EMI</div>
              <div className="text-2xl font-bold text-blue-600">
                ₹{Math.ceil(selectedPackage.currentPrice / selectedTenure).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <PremiumButton variant="primary" size="md" className="flex-1">
              Apply Now
            </PremiumButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function getBadgeStyles(color: string) {
  const styles = {
    gold: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    blue: 'bg-green-600 text-white',
    green: 'bg-[#4a5d4a] text-white',
  }
  return styles[color as keyof typeof styles] || styles.blue
}
