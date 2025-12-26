'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  CheckCircle,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Star,
  ArrowRight,
  Trophy,
  MessageCircle,
  Phone,
  Video,
  Zap,
  Brain,
  Bot,
} from 'lucide-react'

const NeomorphismClaudeChatBoard = dynamic(
  () => import('@/components/claudechat/NeomorphismClaudeChatBoard'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 rounded-3xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading AI Doubt Resolution Bot...</p>
        </div>
      </div>
    ),
    ssr: false,
  }
)

// Metadata moved to layout.tsx for client component

export default function DoubtResolutionPage() {
  const supportChannels = [
    {
      name: 'WhatsApp Support',
      icon: MessageCircle,
      availability: '24/7 Available',
      responseTime: 'Within 15 minutes',
      features: [
        'Text & Voice Messages',
        'Image-based Doubts',
        'Quick Explanations',
        'Follow-up Support',
      ],
      usage: 'Perfect for quick concepts and urgent doubts',
    },
    {
      name: 'Live Video Calls',
      icon: Video,
      availability: '18 hours daily',
      responseTime: 'Schedule instantly',
      features: [
        'Face-to-face Interaction',
        'Whiteboard Explanations',
        'Detailed Solutions',
        'Screen Sharing',
      ],
      usage: 'Ideal for complex problems and detailed explanations',
    },
    {
      name: 'Instant Chat Support',
      icon: Zap,
      availability: '24/7 Available',
      responseTime: 'Within 5 minutes',
      features: ['Real-time Messaging', 'File Sharing', 'Quick Responses', 'Multiple Doubts'],
      usage: 'Best for immediate clarifications and quick help',
    },
    {
      name: 'Voice Call Support',
      icon: Phone,
      availability: '16 hours daily',
      responseTime: 'Call back in 30 min',
      features: [
        'Personal Discussion',
        'Detailed Explanations',
        'Concept Building',
        'Study Guidance',
      ],
      usage: 'Great for detailed concept discussions',
    },
  ]

  const doubtTypes = [
    {
      type: 'Conceptual Doubts',
      description: 'Basic concepts, definitions, and fundamental understanding',
      examples: [
        'What is osmosis?',
        'Difference between mitosis and meiosis',
        'Function of ribosomes',
      ],
      avgTime: '10-15 minutes',
      color: 'blue',
    },
    {
      type: 'Numerical Problems',
      description: 'Calculations, formulas, and mathematical biology problems',
      examples: ['Hardy-Weinberg calculations', 'Population growth problems', 'Enzyme kinetics'],
      avgTime: '15-20 minutes',
      color: 'green',
    },
    {
      type: 'Diagram & Practical',
      description: 'Diagrams, labeling, and practical-based questions',
      examples: ['Heart structure', 'Plant cell diagram', 'Experimental procedures'],
      avgTime: '20-25 minutes',
      color: 'purple',
    },
    {
      type: 'Exam Strategy',
      description: 'NEET exam preparation, time management, and study planning',
      examples: ['How to prepare for NEET?', 'Time management tips', 'Last-minute revision'],
      avgTime: '30-45 minutes',
      color: 'orange',
    },
  ]

  const successStories = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      improvement: 'Biology score: 280 → 345',
      story:
        'Used doubt resolution 150+ times in 6 months. The 24/7 support helped me clear concepts immediately without waiting for the next class.',
      doubtsSolved: '156 doubts',
      avgResponse: '12 minutes',
      videoUrl: '', // Placeholder for future video testimonial
      hasVideo: true,
      videoPlaceholder: '/images/testimonials/priya-video-thumb.jpg', // Thumbnail placeholder
    },
    {
      name: 'Arjun Patel',
      location: 'Ahmedabad, Gujarat',
      improvement: 'NEET Rank: 45,000 → 8,500',
      story:
        'The instant video calls for complex genetics problems were a game-changer. Faculty explained each step until I was completely clear.',
      doubtsSolved: '203 doubts',
      avgResponse: '8 minutes',
      videoUrl: '', // Placeholder for future video testimonial
      hasVideo: true,
      videoPlaceholder: '/images/testimonials/arjun-video-thumb.jpg', // Thumbnail placeholder
    },
    {
      name: 'Sneha Reddy',
      location: 'Hyderabad, Telangana',
      improvement: 'Biology score: 295 → 352',
      story:
        'WhatsApp support was perfect for me. I could ask doubts even during late-night study sessions and get immediate help.',
      doubtsSolved: '189 doubts',
      avgResponse: '15 minutes',
      videoUrl: '', // Placeholder for future video testimonial
      hasVideo: true,
      videoPlaceholder: '/images/testimonials/sneha-video-thumb.jpg', // Thumbnail placeholder
    },
  ]

  const pricingPlans = [
    {
      name: 'Course Included',
      price: 'INCLUDED',
      originalPrice: 'With any course enrollment',
      popular: false,
      features: [
        '24/7 WhatsApp support',
        'Unlimited doubt submission',
        '2 video calls per month',
        'Response within 2 hours',
        'Basic priority support',
        'Doubt history tracking',
      ],
      cta: 'View Courses',
      link: '/courses',
      badge: 'Best Value with Course',
    },
    {
      name: 'Doubt Resolution Pro',
      price: '₹4,999',
      originalPrice: '₹7,999',
      dailyPrice: 'Just ₹166/day',
      popular: true,
      features: [
        'All course-included features',
        'Priority response (15 min)',
        'Unlimited video calls',
        'Personal doubt mentor',
        'Weekend support',
        'Detailed explanations',
        'Follow-up sessions',
      ],
      cta: 'Get Pro Support',
      link: '/admissions',
      badge: 'Most Popular',
    },
    {
      name: 'Elite Doubt Support',
      price: '₹8,999',
      originalPrice: '₹12,999',
      dailyPrice: 'Just ₹300/day',
      popular: false,
      scarcity: 'Only 20 slots per batch',
      features: [
        'All Pro features included',
        'Instant response (5 min)',
        '1-on-1 weekly sessions',
        'Study plan optimization',
        'Exam strategy guidance',
        'Performance analysis',
        'Direct faculty access',
      ],
      cta: 'Reserve Elite Slot',
      link: '/admissions',
      badge: 'Limited Availability',
    },
  ]

  const responseGuarantees = [
    { type: 'Urgent Doubts', time: '5-15 minutes', description: 'Critical exam-related questions' },
    {
      type: 'Regular Doubts',
      time: '30 minutes - 2 hours',
      description: 'General concept clarifications',
    },
    {
      type: 'Complex Problems',
      time: '2-6 hours',
      description: 'Detailed numerical and theoretical problems',
    },
    {
      type: 'Study Planning',
      time: '24 hours',
      description: 'Comprehensive guidance and strategy',
    },
  ]

  const stats = [
    { number: '50,000+', label: 'Doubts Resolved', description: 'Every month across all subjects' },
    { number: '12 min', label: 'Average Response', description: 'Fastest in the industry' },
    { number: '98.5%', label: 'Satisfaction Rate', description: 'Students satisfied with support' },
    { number: '24/7', label: 'Availability', description: 'Round the clock support' },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'border-blue-600 bg-blue-50',
      green: 'border-green-600 bg-green-50',
      purple: 'border-purple-600 bg-purple-50',
      orange: 'border-orange-600 bg-orange-50',
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Real-time Social Proof Banner */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 inline-flex items-center gap-2 sm:gap-3 border border-white/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="font-bold">47 doubts</span> resolved in the last hour
              </span>
              <div className="hidden sm:flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white" />
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-red-500 border-2 border-white" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Get Your NEET Biology Doubts Solved in{' '}
                <span className="text-yellow-300">12 Minutes or Less</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-red-100 mb-4 sm:mb-6">
                Join 5,000+ students who cleared their doubts and scored{' '}
                <span className="font-bold text-yellow-300">340+ in Biology</span>. Expert AIIMS
                faculty available 24/7 on WhatsApp, Video Call, and Chat.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>98.5% satisfaction rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>50,000+ doubts solved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  <span>AIIMS faculty only</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold hover:bg-red-50 transition-all hover:scale-105 inline-flex items-center justify-center text-base sm:text-lg shadow-lg min-h-[44px]"
                >
                  Ask Your First Doubt FREE
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
                <Link
                  href="#pricing"
                  className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  View Plans & Pricing
                </Link>
              </div>

              {/* Time Promise */}
              <p className="text-sm text-red-100 mt-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Average response time: 12 minutes | Available 24/7
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                Why Students Love Our Doubt Support
              </h3>
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-base sm:text-lg">12-Minute Resolution</div>
                    <div className="text-red-100 text-xs sm:text-sm">
                      Fastest response in the industry
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Expert AIIMS Faculty</div>
                    <div className="text-red-100 text-sm">Taught by doctors who cleared AIIMS</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">4 Support Channels</div>
                    <div className="text-red-100 text-sm">WhatsApp, Video, Chat, Voice Call</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-yellow-300" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Unlimited Doubts</div>
                    <div className="text-red-100 text-sm">No cap on questions, ask freely</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Doubt Resolution Excellence
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Industry-leading support statistics that speak for our commitment
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Multiple Support Channels
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Choose the support method that works best for you. All channels connected to expert
              faculty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 bg-red-100 rounded-lg mr-3 sm:mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {channel.name}
                      </h3>
                      <div className="space-y-1">
                        <div className="text-xs sm:text-sm text-green-600 font-medium">
                          {channel.availability}
                        </div>
                        <div className="text-xs sm:text-sm text-blue-600 font-medium">
                          {channel.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                      Features
                    </h4>
                    <div className="space-y-2">
                      {channel.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs sm:text-sm text-gray-600">{channel.usage}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Doubt Resolution - Supplementary Tool */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Supplementary Positioning */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-blue-200 mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Bonus Feature</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Available 24/7
              </span>
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center sm:text-left">
                Plus: AI Assistant for Quick Reference
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4">
              When faculty support is busy, get instant concept clarification with our AI assistant.
              Great for quick questions while you wait for detailed faculty explanations.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto">
              <strong>Note:</strong> AI is supplementary to our human expert support. For
              exam-focused doubts and personalized guidance, use the human support channels above.
            </p>
          </div>

          {/* AI Chat Board Container */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
            <div className="h-[400px] sm:h-[500px] md:h-[600px]">
              <NeomorphismClaudeChatBoard />
            </div>
          </div>

          {/* AI Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                Quick Concept Refresh
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Get instant definitions, formulas, and basic concept explanations for quick
                reference while studying.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                Voice Support Available
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Listen to explanations in Hindi, English, or Hinglish - useful for auditory learners
                and revision.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                Instant Availability
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                No waiting time. Perfect for late-night study sessions when you need quick
                clarification.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <div className="bg-indigo-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Try the AI Assistant Above!
              </h3>
              <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">
                Start with basic questions like &quot;Explain photosynthesis&quot; or &quot;What is
                DNA structure&quot; for quick concept review
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link
                  href="/claudechat"
                  className="bg-white text-blue-600 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Full ClaudeChat Board
                </Link>
                <Link
                  href="/test-voice"
                  className="border border-white text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Test Voice Features
                </Link>
              </div>
              <p className="text-xs text-blue-100 mt-3 sm:mt-4 opacity-75">
                Remember: For exam strategy and complex doubts, connect with our expert faculty via
                WhatsApp or Video Call
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Doubts */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              We Handle All Types of Doubts
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              No question is too small or too complex for our expert faculty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {doubtTypes.map((doubt, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg border-l-4 ${getColorClasses(doubt.color)} hover:shadow-xl transition-shadow`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{doubt.type}</h3>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {doubt.avgTime}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-4">{doubt.description}</p>

                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    Example Questions:
                  </h4>
                  <div className="space-y-1">
                    {doubt.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="text-xs sm:text-sm text-gray-700 italic">
                        &quot;• {example}&quot;
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories with Video Testimonials */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Through Doubt Resolution
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              How our 24/7 support helped students achieve their NEET dreams
            </p>
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-3 sm:px-4 py-2">
              <Video className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
              <span className="text-xs sm:text-sm font-medium text-red-700">
                Watch Video Testimonials
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Video Thumbnail Placeholder */}
                {story.hasVideo && (
                  <div className="relative bg-gradient-to-br bg-red-100 h-40 sm:h-48 flex items-center justify-center group cursor-pointer">
                    {/* Placeholder gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-pink-600/20" />

                    {/* Play Button */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] border-l-red-600 border-t-[10px] sm:border-t-[12px] border-t-transparent border-b-[10px] sm:border-b-[12px] border-b-transparent ml-1" />
                      </div>
                    </div>

                    {/* Video Placeholder Badge */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      <span className="text-xs font-semibold text-red-600">30 sec</span>
                    </div>

                    {/* Coming Soon Badge */}
                    <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full">
                      <span className="text-xs font-bold">Video Coming Soon</span>
                    </div>
                  </div>
                )}

                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{story.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{story.location}</p>
                    <div className="text-base sm:text-lg font-semibold text-red-600 mt-2">
                      {story.improvement}
                    </div>
                  </div>

                  <p className="text-gray-700 text-xs sm:text-sm mb-4 italic">
                    &quot;{story.story}&quot;
                  </p>

                  <div className="flex justify-between text-xs sm:text-sm pt-3 sm:pt-4 border-t border-gray-100">
                    <div>
                      <span className="font-medium text-gray-900">{story.doubtsSolved}</span>
                      <div className="text-gray-600">Total Doubts</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{story.avgResponse}</span>
                      <div className="text-gray-600">Avg Response</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to record video testimonials */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Share Your Success Story
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Record a 30-second video sharing how doubt resolution helped you succeed in NEET.
                Your story could inspire thousands of future doctors!
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors min-h-[44px]"
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                Record Your Testimonial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Guarantees */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Response Time Guarantees
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Clear commitments on when you&apos;ll get your answers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {responseGuarantees.map((guarantee, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-xl sm:text-2xl font-bold text-red-600 mb-1 sm:mb-2">
                  {guarantee.time}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                  {guarantee.type}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">{guarantee.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-8 sm:py-12 md:py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Choose Your Support Level
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Flexible plans to match your doubt resolution needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 sm:p-8 shadow-lg ${plan.popular ? 'ring-2 ring-red-600 relative' : ''} hover:shadow-xl transition-shadow`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <span
                      className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        plan.popular
                          ? 'bg-red-600 text-white'
                          : index === 0
                            ? 'bg-green-600 text-white'
                            : 'bg-orange-600 text-white'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {plan.name}
                  </h3>
                  <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-1">
                    {plan.price}
                  </div>
                  {plan.dailyPrice && (
                    <div className="text-base sm:text-lg font-semibold text-green-600 mb-2">
                      {plan.dailyPrice}
                    </div>
                  )}
                  <div className="text-xs sm:text-sm text-gray-600 line-through">
                    {plan.originalPrice}
                  </div>
                  {plan.scarcity && (
                    <div className="mt-2 sm:mt-3 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                      <div className="text-xs font-bold text-orange-700 uppercase tracking-wide">
                        ⚡ {plan.scarcity}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.link}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors min-h-[44px] ${
                    plan.popular
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'border border-red-600 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
            Start Getting Your Doubts Resolved Today
          </h2>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Remember: No Question is Too Small!
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Every expert was once a beginner. Every concept you master starts with asking the
                right questions. Our faculty is here to support your learning journey without any
                judgment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="text-left space-y-2 sm:space-y-3">
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Ask via WhatsApp: +91 88264 44334
                  </span>
                </div>
                <div className="flex items-center">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Schedule video calls instantly
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Get responses within 15 minutes
                  </span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base">
                    Expert AIIMS faculty available
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="block bg-red-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors min-h-[44px]"
                >
                  Start Asking Doubts Now
                </Link>
                <Link
                  href="/courses"
                  className="block border border-red-600 text-red-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors min-h-[44px]"
                >
                  Join Course (Doubts FREE)
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-xl p-4 sm:p-6">
            <p className="text-sm sm:text-base text-green-800 font-semibold mb-2">
              💡 Pro Tip for NEET Success
            </p>
            <p className="text-sm sm:text-base text-green-700">
              Students who actively ask doubts score 40+ marks higher in NEET Biology. Don&apos;t
              let confusion become your weakness!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8 sm:mb-10 md:mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Is there a limit to how many doubts I can ask?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                No! We encourage unlimited questioning. With our courses, doubt resolution is
                completely free with no restrictions. The more you ask, the better you learn.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                What if I&apos;m shy or embarrassed about asking basic questions?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our faculty understands that every student learns differently. We create a
                judgment-free environment where basic questions are welcomed. Remember, clarifying
                fundamentals is key to NEET success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                How qualified are the faculty members answering doubts?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                All doubts are answered by AIIMS and top medical college graduates with 5+ years of
                NEET coaching experience. Each faculty member specializes in specific Biology topics
                for accurate, detailed explanations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                Can I get help with exam strategy and study planning?
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Absolutely! Our doubt resolution includes comprehensive academic guidance - study
                schedules, exam strategies, topic prioritization, and performance improvement
                suggestions tailored to your progress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
