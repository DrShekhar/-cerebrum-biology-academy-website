'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import {
  CheckCircle,
  Clock,
  FileText,
  Calendar,
  CreditCard,
  Users,
  Award,
  ArrowRight,
  Download,
  Phone,
  MessageSquare,
  Target,
  BookOpen,
  GraduationCap,
  Star,
  Zap,
  Shield,
  Heart,
  Play,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
  Trophy,
  TrendingUp,
  Lock,
  Banknote,
  Wallet,
  BadgeCheck,
  RefreshCw,
  Mail,
  Flame,
  Timer,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ApplicationForm from '@/components/admissions/ApplicationForm'
import { QuickInquiryForm } from '@/components/admissions/QuickInquiryForm'
import { ExitIntentPopup } from '@/components/admissions/ExitIntentPopup'
import { LiveChatWidget } from '@/components/admissions/LiveChatWidget'
import { allClassPricing, getTierDetails } from '@/data/pricing'

export default function AdmissionsPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [showDocSpecs, setShowDocSpecs] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [showBanner, setShowBanner] = useState(true)

  // Countdown timer for early bird discount (ends in 3 days from now)
  useEffect(() => {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 3)
    endDate.setHours(23, 59, 59, 999)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // WhatsApp Configuration
  const whatsappNumber = '+918826444334'
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`

  // Scroll to application form
  const scrollToApplicationForm = () => {
    const formElement = document.getElementById('application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Handle batch selection
  const handleBatchSelection = (batchName: string) => {
    setSelectedBatch(batchName)
    scrollToApplicationForm()
  }

  // Handle WhatsApp contact
  const handleWhatsAppContact = (message?: string) => {
    const defaultMessage = 'Hi, I need help with the admission process at Cerebrum Biology Academy.'
    const encodedMessage = encodeURIComponent(message || defaultMessage)
    window.open(`${whatsappLink}?text=${encodedMessage}`, '_blank', 'noopener,noreferrer')
  }

  // Handle brochure download
  const handleBrochureDownload = () => {
    // Create a dummy download - in production, this would be a real brochure file
    const link = document.createElement('a')
    link.href = '/brochure/cerebrum-admissions-brochure.pdf'
    link.download = 'Cerebrum-Biology-Academy-Admissions-Brochure.pdf'
    link.click()
  }

  const admissionSteps = [
    {
      step: 1,
      title: 'Application Submission',
      duration: '5-10 minutes',
      description:
        'Fill out our comprehensive application form with your academic details and NEET goals.',
      details: [
        'Complete online application form',
        'Upload academic transcripts (10th & 12th)',
        'Provide previous NEET scores (if applicable)',
        'Select preferred batch and course',
        'Submit application fee payment',
      ],
      documents: [
        'Class 10th Marksheet',
        'Class 12th Marksheet',
        'Previous NEET Scorecard',
        'Passport Size Photos',
      ],
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      step: 2,
      title: 'Counselor Interaction',
      duration: '30-45 minutes',
      description:
        'One-on-one session with our expert counselors to understand your goals and recommend the best course.',
      details: [
        'Personalized counseling session',
        'Academic background assessment',
        'Goal setting and course recommendation',
        'Doubt clarification about our programs',
        'Fee structure and scholarship discussion',
      ],
      documents: [
        'Bring all original documents',
        'List of questions/doubts',
        'Parent/Guardian presence (if minor)',
      ],
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      step: 3,
      title: 'Diagnostic Test',
      duration: '2-3 hours',
      description:
        'Comprehensive assessment to evaluate your current knowledge level and identify improvement areas.',
      details: [
        'NEET-pattern diagnostic test',
        'Subject-wise performance analysis',
        'Strength and weakness identification',
        'Personalized study plan creation',
        'Learning style assessment',
      ],
      documents: ['Calculator', 'Pen/Pencil', 'Valid ID proof'],
      icon: Target,
      color: 'bg-purple-500',
    },
    {
      step: 4,
      title: 'Course Selection & Enrollment',
      duration: '15-20 minutes',
      description:
        'Finalize your course selection based on diagnostic results and complete the enrollment process.',
      details: [
        'Review diagnostic test results',
        'Finalize course and batch selection',
        'Complete fee payment process',
        'Receive study materials and schedule',
        'Join student WhatsApp group',
      ],
      documents: ['Fee payment receipt', 'Signed enrollment agreement'],
      icon: GraduationCap,
      color: 'bg-orange-500',
    },
    {
      step: 5,
      title: 'Orientation & Class Start',
      duration: '2-3 hours',
      description:
        'Comprehensive orientation session followed by your first biology class to kickstart your NEET journey.',
      details: [
        'Campus and facility tour',
        'Faculty introduction session',
        'Study methodology orientation',
        'Resource and material distribution',
        'First biology class attendance',
      ],
      documents: ['Study materials', 'Notebook and stationery'],
      icon: BookOpen,
      color: 'bg-red-500',
    },
  ]

  const requirements = [
    {
      category: 'Academic Requirements',
      items: [
        'Completed Class 12th with PCB (Physics, Chemistry, Biology)',
        'Minimum 50% aggregate in PCB subjects',
        'Valid NEET registration (for current year aspirants)',
        'English proficiency for course materials',
      ],
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      category: 'Documents Required',
      items: [
        'Class 10th and 12th mark sheets',
        'Previous NEET score card (if applicable)',
        'Transfer certificate from previous institution',
        'Passport size photographs (6 copies)',
        'Valid ID proof (Aadhar/Passport)',
        'Medical fitness certificate',
      ],
      icon: FileText,
      color: 'bg-green-100 text-green-600',
    },
    {
      category: 'Age & Eligibility',
      items: [
        'Minimum age: 16 years (as on admission date)',
        'Maximum age: 25 years for general category',
        'No upper age limit for SC/ST candidates',
        'Must be eligible for NEET examination',
      ],
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  // Helper to get pricing from centralized data
  const getClassPricing = (classLevel: string) => {
    const classPricing = allClassPricing.find((c) => c.class === classLevel)
    if (!classPricing) return { startingPrice: 0, topPrice: 0 }

    const courseTypes = classPricing.availableCourseTypes
    const firstCourseType = courseTypes[0]
    const tiers = classPricing.tiers[firstCourseType]

    if (!tiers || !Array.isArray(tiers)) return { startingPrice: 0, topPrice: 0 }

    const pursuitTier = tiers.find((t) => t.tier === 'pursuit')
    const pinnacleTier = tiers.find((t) => t.tier === 'pinnacle')

    return {
      startingPrice: pursuitTier?.prices.lumpSum || 0,
      topPrice: pinnacleTier?.prices.lumpSum || 0,
    }
  }

  // Generate batch options from centralized pricing data
  const batchOptions = [
    {
      name: 'Foundation Batch (Class 9-10)',
      classLevel: 'foundation-9' as const,
      duration: '1 Year',
      description: 'Comprehensive foundation building for early starters',
      features: [
        'Complete syllabus coverage',
        'Regular tests',
        'Doubt sessions',
        'Study materials',
      ],
      ...getClassPricing('foundation-9'),
      discount: '20% Early Bird Discount',
      popular: false,
    },
    {
      name: 'Class 11 - NEET Prep',
      classLevel: 'class-11' as const,
      duration: '1 Year',
      description: 'Strong foundation for NEET aspirants',
      features: ['Conceptual learning', 'Regular tests', 'Doubt sessions', 'Performance tracking'],
      ...getClassPricing('class-11'),
      discount: '15% Scholarship Available',
      popular: false,
    },
    {
      name: 'Class 12 - NEET Intensive',
      classLevel: 'class-12' as const,
      duration: '1 Year',
      description: 'Intensive preparation for Class 12th students',
      features: ['Accelerated learning', 'Mock tests', 'Revision sessions', 'Performance tracking'],
      ...getClassPricing('class-12'),
      discount: '15% Scholarship Available',
      popular: true,
    },
    {
      name: 'Dropper Batch',
      classLevel: 'dropper' as const,
      duration: '1 Year',
      description: 'Specialized program for NEET repeaters',
      features: [
        'Concept revision',
        'Advanced problems',
        'Motivation sessions',
        'Individual attention',
      ],
      ...getClassPricing('dropper'),
      discount: '10% Previous Student Discount',
      popular: false,
    },
    {
      name: '2-Year NEET Program',
      classLevel: '2-year' as const,
      duration: '2 Years',
      description: 'Complete Class 11+12 NEET preparation',
      features: ['Full syllabus coverage', 'Test series', 'Revision sessions', 'Expert mentoring'],
      ...getClassPricing('2-year'),
      discount: 'Best Value',
      popular: false,
    },
  ]

  const paymentOptions = [
    {
      title: 'EMI Plans',
      description: 'Flexible monthly installments',
      icon: CreditCard,
      color: 'bg-blue-500',
      features: [
        { duration: '3 Months', amount: '₹28,333', period: 'per month' },
        { duration: '6 Months', amount: '₹14,167', period: 'per month' },
        { duration: '12 Months', amount: '₹7,083', period: 'per month' },
      ],
      badge: 'No Cost EMI',
    },
    {
      title: 'Payment Methods',
      description: 'Multiple secure payment options',
      icon: Wallet,
      color: 'bg-green-500',
      features: [
        { name: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
        { name: 'Cards', desc: 'Credit & Debit Cards' },
        { name: 'Net Banking', desc: 'All major banks' },
        { name: 'Cheque', desc: 'DD/Cheque accepted' },
      ],
    },
    {
      title: 'Installment Plans',
      description: 'Pay in parts without interest',
      icon: Banknote,
      color: 'bg-purple-500',
      features: [
        { plan: 'Two Parts', amount: '50% + 50%', timing: 'At enrollment & mid-term' },
        { plan: 'Three Parts', amount: '40% + 30% + 30%', timing: 'Quarterly basis' },
        { plan: 'Custom Plan', amount: 'Discuss with counselor', timing: 'Based on your needs' },
      ],
    },
  ]

  const paymentPartners = [
    { name: 'Razorpay', trusted: true },
    { name: 'Paytm', trusted: true },
    { name: 'PhonePe', trusted: true },
    { name: 'Google Pay', trusted: true },
  ]

  const faqs = [
    {
      question: 'What is the admission process timeline?',
      answer:
        'The complete admission process typically takes 3-5 days from application submission to class commencement. We ensure quick processing to minimize any delay in your preparation.',
    },
    {
      question: 'Are there any entrance tests for admission?',
      answer:
        'We conduct a diagnostic test to assess your current knowledge level and create a personalized study plan. This is not an elimination test but a tool to help us serve you better.',
    },
    {
      question: 'What are the payment options available?',
      answer:
        'We offer flexible payment options including one-time payment, EMI options, and installment plans. Scholarships are available for meritorious students.',
    },
    {
      question: 'Can I change my batch after enrollment?',
      answer:
        'Yes, you can change your batch within the first 15 days of enrollment, subject to availability and approval from the academic team.',
    },
    {
      question: 'What if I miss the diagnostic test?',
      answer:
        'We conduct diagnostic tests multiple times a week. You can reschedule your test date, and we also offer online diagnostic tests for outstation students.',
    },
    {
      question: 'Are there any scholarships available?',
      answer:
        'We offer merit-based scholarships of up to 50% for top performers in our diagnostic test. Special discounts are available for students from economically weaker sections.',
    },
    {
      question: 'What is included in the course fees?',
      answer:
        'Course fees include all study materials, test series, doubt sessions, online resources, and access to our digital learning platform. No hidden charges.',
    },
    {
      question: 'Can parents attend the counseling session?',
      answer:
        'Absolutely! We encourage parent participation in counseling sessions. It helps us understand family expectations and create better support systems.',
    },
  ]

  const scholarships = [
    {
      type: 'Merit Scholarship',
      criteria: 'Top 10% in diagnostic test',
      benefit: 'Up to 50% fee waiver',
      icon: Award,
      color: 'bg-yellow-500',
    },
    {
      type: 'Need-based Support',
      criteria: 'Family income < ₹3 lakhs/year',
      benefit: 'Up to 30% fee waiver',
      icon: Heart,
      color: 'bg-red-500',
    },
    {
      type: 'Early Bird Discount',
      criteria: 'Admission before deadline',
      benefit: '20% discount on course fees',
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      type: 'Referral Bonus',
      criteria: 'Refer a friend who enrolls',
      benefit: '₹5,000 cashback',
      icon: Users,
      color: 'bg-green-500',
    },
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      batch: 'Dropper Batch 2024',
      previousScore: 480,
      newScore: 635,
      rank: 'AIR 8,450',
      college: 'AIIMS Bhubaneswar',
      quote:
        "The personalized attention and structured approach helped me improve my rank by 50,000. Dr. Shekhar's Biology classes were game-changing!",
      rating: 5,
      improvement: '+155',
    },
    {
      name: 'Arjun Patel',
      batch: 'Target Batch 2024',
      previousScore: null,
      newScore: 670,
      rank: 'AIR 3,240',
      college: 'JIPMER Puducherry',
      quote:
        'Starting from Class 12th with Cerebrum was the best decision. The foundation building approach and regular tests kept me on track throughout the year.',
      rating: 5,
      improvement: 'First Attempt',
    },
    {
      name: 'Sneha Reddy',
      batch: 'Dropper Batch 2024',
      previousScore: 410,
      newScore: 598,
      rank: 'AIR 15,680',
      college: 'GMC Nagpur',
      quote:
        'After failing in my first attempt, I was demotivated. The faculty here not only improved my concepts but also rebuilt my confidence. Biology went from my weakest to strongest subject!',
      rating: 5,
      improvement: '+188',
    },
    {
      name: 'Rahul Kumar',
      batch: 'Foundation Batch 2023-24',
      previousScore: null,
      newScore: 685,
      rank: 'AIR 1,840',
      college: 'AIIMS Rishikesh',
      quote:
        'Two years of systematic preparation with detailed concept building gave me a strong foundation. The regular doubt sessions and personalized study plan were incredibly helpful.',
      rating: 5,
      improvement: 'Top 2K',
    },
    {
      name: 'Ananya Singh',
      batch: 'Crash Course 2024',
      previousScore: 520,
      newScore: 612,
      rank: 'AIR 11,200',
      college: 'KGMC Lucknow',
      quote:
        'With just 6 months before NEET, I needed intensive preparation. The crash course focused on high-yield topics and smart revision strategies that maximized my score.',
      rating: 5,
      improvement: '+92',
    },
    {
      name: 'Vikram Joshi',
      batch: 'Target Batch 2024',
      previousScore: null,
      newScore: 642,
      rank: 'AIR 6,890',
      college: 'BHU Varanasi',
      quote:
        'The test series and detailed performance analysis helped me identify and work on my weak areas. Biology teaching methodology here is outstanding and result-oriented.',
      rating: 5,
      improvement: 'Top 7K',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Early Bird Discount Banner with Countdown */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 relative">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 animate-pulse" />
                  <span className="font-bold text-sm sm:text-base">Early Bird Offer!</span>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <span>Get</span>
                  <span className="bg-white text-red-600 font-bold px-2 py-0.5 rounded">
                    20% OFF
                  </span>
                  <span>on all batches</span>
                </div>

                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">Ends in:</span>
                  <div className="flex items-center gap-1 font-mono font-bold">
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">{countdown.days}d</span>
                    <span>:</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">
                      {String(countdown.hours).padStart(2, '0')}h
                    </span>
                    <span>:</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">
                      {String(countdown.minutes).padStart(2, '0')}m
                    </span>
                    <span>:</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm">
                      {String(countdown.seconds).padStart(2, '0')}s
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white hidden sm:block"
                  aria-label="Close banner"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Quick Inquiry Form */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="text-center lg:text-left">
              <motion.div
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">2,847+ Students Enrolled</span>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Start Your NEET Journey Today
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-blue-100 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join India's top Biology coaching with AIIMS trained faculty. Get personalized
                guidance and crack NEET with confidence.
              </motion.p>

              {/* Trust Badges */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">AIIMS Trained Faculty</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">94% Success Rate</span>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
                  onClick={handleBrochureDownload}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                  onClick={scrollToApplicationForm}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Full Application
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Quick Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pl-8"
            >
              <QuickInquiryForm variant="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              5-Step Admission Process
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Simple, transparent, and student-friendly admission process
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative ${
                  activeStep === index ? 'bg-blue-50' : 'bg-white'
                } rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-all`}
                onClick={() => setActiveStep(activeStep === index ? -1 : index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-start sm:items-center">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${step.color} rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 md:mr-6 flex-shrink-0`}
                    >
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">
                          STEP {step.step}
                        </span>
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="text-xs sm:text-sm">{step.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 pr-8 sm:pr-0">
                        {step.description}
                      </p>
                    </div>

                    <div className="ml-2 sm:ml-6 flex-shrink-0 absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                      {activeStep === index ? (
                        <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeStep === index && (
                      <motion.div
                        className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                              Process Details
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start">
                                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm sm:text-base text-gray-700">
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                              Required Documents
                            </h4>
                            <ul className="space-y-2 sm:space-y-3">
                              {step.documents.map((doc, idx) => (
                                <li key={idx} className="flex items-start">
                                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm sm:text-base text-gray-700">{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                          {index === 0 && (
                            <Button
                              variant="primary"
                              size="lg"
                              className="w-full sm:w-auto"
                              onClick={scrollToApplicationForm}
                            >
                              <FileText className="w-5 h-5 mr-2 flex-shrink-0" />
                              <span className="truncate">Start Application</span>
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto"
                            onClick={() => handleWhatsAppContact()}
                          >
                            <MessageSquare className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span className="truncate">Get Help</span>
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Admission Requirements
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Essential criteria and documents for enrollment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${req.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
                >
                  <req.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {req.category}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {req.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                {req.category === 'Documents Required' && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => setShowDocSpecs(!showDocSpecs)}
                      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Document Specifications</span>
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${showDocSpecs ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {showDocSpecs && (
                        <motion.div
                          className="mt-4 space-y-3"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-xs text-gray-600 mb-2 font-medium">
                              File Format Requirements:
                            </p>
                            <ul className="space-y-1 text-xs text-gray-600">
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Accepted formats: PDF, JPG, PNG</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Maximum file size: 5MB per document</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Minimum resolution: 300 DPI for scanned documents</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Documents must be clear and legible</span>
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>All certificates must be valid and attested</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-gray-500">
                            <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>
                              All documents are securely stored and protected with 256-bit
                              encryption
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Options */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Batch
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Tailored programs for different student needs - Enroll directly online!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {batchOptions.map((batch, index) => (
              <motion.div
                key={index}
                className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 ${
                  batch.popular ? 'ring-2 ring-blue-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {batch.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 mt-2 sm:mt-0">
                  {batch.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  {batch.duration}
                </p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  {batch.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="text-xs text-gray-500 mb-1">Starting from</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    ₹{batch.startingPrice.toLocaleString('en-IN')}
                  </div>
                  {batch.topPrice > batch.startingPrice && (
                    <div className="text-xs text-gray-500">
                      Up to ₹{batch.topPrice.toLocaleString('en-IN')} for Pinnacle tier
                    </div>
                  )}
                  <div className="text-xs sm:text-sm text-green-600 font-medium mt-2">
                    {batch.discount}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 sm:mb-8">
                  {batch.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <Link
                    href={`/checkout?class=${batch.classLevel}`}
                    className={`flex items-center justify-center w-full px-4 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                      batch.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Enroll Now
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full text-sm sm:text-base"
                    onClick={() => handleBatchSelection(batch.name)}
                  >
                    Talk to Counselor
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Not sure which batch is right for you?</p>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              Start Self-Service Enrollment
            </Link>
          </div>
        </div>
      </section>
      {/* Flexible Payment Options */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Multiple payment plans to suit your financial needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {paymentOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {option.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {option.badge}
                    </span>
                  </div>
                )}

                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${option.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <option.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-6">{option.description}</p>

                <div className="space-y-4">
                  {option.features.map((feature, idx) => (
                    <div key={idx} className="border-l-2 border-blue-500 pl-4">
                      {feature.duration ? (
                        <>
                          <div className="flex items-baseline justify-between mb-1">
                            <span className="text-sm font-semibold text-gray-900">
                              {feature.duration}
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {feature.amount}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{feature.period}</p>
                        </>
                      ) : feature.name ? (
                        <>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {feature.name}
                          </div>
                          <p className="text-xs text-gray-500">{feature.desc}</p>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-semibold text-gray-900 mb-1">
                            {feature.plan}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{feature.amount}</p>
                          <p className="text-xs text-gray-500">{feature.timing}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Trusted Payment Partners
              </h3>
              <p className="text-sm text-gray-600">
                Secure transactions powered by leading payment gateways
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-6">
              {paymentPartners.map((partner, index) => (
                <div key={index} className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{partner.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Secure Payment</p>
                  <p className="text-xs text-gray-500">256-bit SSL encryption</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">100% Data Privacy</p>
                  <p className="text-xs text-gray-500">Your info is safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Easy Refund Policy</p>
                  <p className="text-xs text-gray-500">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="mb-2">
              Example: Target Batch (₹85,000) | 3 months: ₹28,333 × 3 | 6 months: ₹14,167 × 6 | 12
              months: ₹7,083 × 12
            </p>
            <p className="text-xs text-gray-500">
              Contact our counselors for customized payment plans tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Scholarships & Discounts
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Making quality education accessible for all
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {scholarships.map((scholarship, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${scholarship.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                >
                  <scholarship.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {scholarship.type}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  {scholarship.criteria}
                </p>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {scholarship.benefit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Real results from real students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Student Info Header */}
                <div className="flex items-start gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">
                      {testimonial.batch}
                    </p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Results */}
                <div className="border-t border-gray-200 pt-4 sm:pt-6 grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600 font-medium">Score</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-gray-900">
                      {testimonial.previousScore ? (
                        <span>
                          {testimonial.previousScore} → {testimonial.newScore}
                        </span>
                      ) : (
                        <span>{testimonial.newScore}</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-green-600 font-semibold">
                      {testimonial.improvement}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600 font-medium">Rank</span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      {testimonial.rank}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{testimonial.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Get answers to common admission queries
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl sm:rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  className="w-full p-4 sm:p-6 text-left flex items-start sm:items-center justify-between hover:bg-gray-100 transition-colors gap-3"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base flex-1 pr-2">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      className="px-4 pb-4 sm:px-6 sm:pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm sm:text-base text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Your NEET Journey?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8">
            Join thousands of successful students and secure your medical college admission with our
            expert guidance and proven methodology.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-green-600 w-full sm:w-auto"
              onClick={handleBrochureDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Application
            </Button>
            <Button
              variant="primary"
              size="xl"
              className="bg-white text-green-600 hover:bg-gray-100 w-full sm:w-auto"
              onClick={scrollToApplicationForm}
            >
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Free</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">
                Counseling Session
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">5 Days</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Quick Processing</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">94%</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="application-form" className="py-12 sm:py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Start Your Application
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {selectedBatch
                ? `You've selected: ${selectedBatch}. Fill out the form below to begin your admission process.`
                : 'Fill out the form below to begin your admission process'}
            </p>
          </div>

          {/* Application Form Component */}
          <ApplicationForm />
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Need Help with Admissions?
            </h2>
            <p className="text-base sm:text-lg text-blue-100">
              Our admission counselors are here to assist you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.a
              href={`tel:${whatsappNumber}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-blue-100 text-sm sm:text-base mb-2">Speak with our counselors</p>
              <p className="text-white font-semibold text-base sm:text-lg">+91 8826444334</p>
            </motion.a>

            <motion.button
              onClick={() => handleWhatsAppContact()}
              className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-blue-100 text-sm sm:text-base mb-2">Chat with us instantly</p>
              <p className="text-white font-semibold text-base sm:text-lg">Click to Chat</p>
            </motion.button>

            <motion.a
              href="mailto:admissions@cerebrumbiologyacademy.com"
              className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Email Us</h3>
              <p className="text-blue-100 text-sm sm:text-base mb-2">Send us your queries</p>
              <p className="text-white font-semibold text-xs sm:text-sm break-all">
                admissions@cerebrumbiologyacademy.com
              </p>
            </motion.a>
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <p className="text-blue-100 text-sm sm:text-base mb-4">
              Office Hours: Monday - Saturday, 9:00 AM - 7:00 PM
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free Counseling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Instant Responses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button - Hidden on mobile when sticky bar is visible */}
      <motion.button
        onClick={() => handleWhatsAppContact()}
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 group transition-all duration-300 hidden sm:flex"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </motion.button>

      {/* Sticky CTA Bar for Mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 sm:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs text-gray-600">Limited seats available</p>
            <p className="text-sm font-bold text-gray-900">Apply for NEET 2025</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleWhatsAppContact()}
              className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <Button
              variant="primary"
              size="sm"
              onClick={scrollToApplicationForm}
              className="whitespace-nowrap"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Live Chat Widget with FAQ */}
      <LiveChatWidget whatsappNumber={whatsappNumber} />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />
    </div>
  )
}
