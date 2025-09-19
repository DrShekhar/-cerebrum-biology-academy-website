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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 mx-auto animate-pulse">
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
    },
    {
      name: 'Arjun Patel',
      location: 'Ahmedabad, Gujarat',
      improvement: 'NEET Rank: 45,000 → 8,500',
      story:
        'The instant video calls for complex genetics problems were a game-changer. Faculty explained each step until I was completely clear.',
      doubtsSolved: '203 doubts',
      avgResponse: '8 minutes',
    },
    {
      name: 'Sneha Reddy',
      location: 'Hyderabad, Telangana',
      improvement: 'Biology score: 295 → 352',
      story:
        'WhatsApp support was perfect for me. I could ask doubts even during late-night study sessions and get immediate help.',
      doubtsSolved: '189 doubts',
      avgResponse: '15 minutes',
    },
  ]

  const pricingPlans = [
    {
      name: 'Course Included',
      price: 'FREE',
      originalPrice: 'With any course',
      popular: false,
      features: [
        '24/7 WhatsApp support',
        'Unlimited doubt submission',
        '2 video calls per month',
        'Response within 2 hours',
        'Basic priority support',
        'Doubt history tracking',
      ],
      cta: 'Included with Courses',
      link: '/courses',
    },
    {
      name: 'Doubt Resolution Pro',
      price: '₹4,999',
      originalPrice: '₹7,999',
      popular: true,
      features: [
        'All free features included',
        'Priority response (15 min)',
        'Unlimited video calls',
        'Personal doubt mentor',
        'Weekend support',
        'Detailed explanations',
        'Follow-up sessions',
      ],
      cta: 'Get Pro Support',
      link: '/admissions',
    },
    {
      name: 'Elite Doubt Support',
      price: '₹8,999',
      originalPrice: '₹12,999',
      popular: false,
      features: [
        'All Pro features included',
        'Instant response (5 min)',
        '1-on-1 weekly sessions',
        'Study plan optimization',
        'Exam strategy guidance',
        'Performance analysis',
        'Direct faculty access',
      ],
      cta: 'Get Elite Support',
      link: '/admissions',
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
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">Never Let a Doubt Stop You</h1>
              <p className="text-xl text-red-100 mb-8">
                24/7 doubt resolution support that ensures no question goes unanswered. Get instant
                help from expert NEET Biology faculty anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors inline-flex items-center"
                >
                  Ask Your First Doubt
                  <MessageCircle className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="#pricing"
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Doubt Support Features</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-red-300" />
                  <span>24/7 Available Support</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-red-300" />
                  <span>5-15 Min Response Time</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-3 text-red-300" />
                  <span>Expert AIIMS Faculty</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-red-300" />
                  <span>Multiple Support Channels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Doubt Resolution Bot Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                AI-Powered Instant Doubt Resolution
              </h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Meet Shekhar Sir's AI Assistant - Get instant Biology doubt resolution with voice
              support in Hindi, English & Hinglish
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-lg">
                <Bot className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-gray-700">AI-Powered Teaching</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-lg">
                <MessageCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-gray-700">Voice Synthesis</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-lg">
                <Zap className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-gray-700">Instant Responses</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-lg">
                <Video className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-gray-700">Multi-modal Learning</span>
              </div>
            </div>
          </div>

          {/* AI Chat Board Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
            <div className="h-[600px]">
              <NeomorphismClaudeChatBoard />
            </div>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Smart Biology AI</h3>
              <p className="text-gray-600 text-sm">
                Advanced AI trained specifically on NEET Biology syllabus with comprehensive
                knowledge of all topics from Class 11 & 12.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Shekhar Sir's Voice</h3>
              <p className="text-gray-600 text-sm">
                Experience Shekhar Sir's teaching style with AI voice synthesis. Get explanations in
                Hindi, English, or Hinglish as preferred.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Instant Learning</h3>
              <p className="text-gray-600 text-sm">
                No waiting for responses. Get immediate explanations, concept clarifications, and
                study guidance 24/7 without any delay.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Try the AI Doubt Resolution Above!</h3>
              <p className="text-blue-100 mb-6">
                Start with questions like "Explain photosynthesis" or "What is DNA structure" to
                experience AI-powered learning
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/claudechat"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Full ClaudeChat Board
                </Link>
                <Link
                  href="/test-voice"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Test Voice Features
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Doubt Resolution Excellence</h2>
            <p className="text-gray-600">
              Industry-leading support statistics that speak for our commitment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Multiple Support Channels</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the support method that works best for you. All channels connected to expert
              faculty
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start mb-6">
                    <div className="p-3 bg-red-100 rounded-lg mr-4">
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.name}</h3>
                      <div className="space-y-1">
                        <div className="text-sm text-green-600 font-medium">
                          {channel.availability}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          {channel.responseTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <div className="space-y-2">
                      {channel.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">{channel.usage}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Types of Doubts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">We Handle All Types of Doubts</h2>
            <p className="text-gray-600">
              No question is too small or too complex for our expert faculty
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {doubtTypes.map((doubt, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${getColorClasses(doubt.color)} hover:shadow-xl transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{doubt.type}</h3>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {doubt.avgTime}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{doubt.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Example Questions:</h4>
                  <div className="space-y-1">
                    {doubt.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="text-sm text-gray-700 italic">
                        "• {example}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Through Doubt Resolution
            </h2>
            <p className="text-gray-600">
              How our 24/7 support helped students achieve their NEET dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-600">{story.location}</p>
                  <div className="text-lg font-semibold text-red-600 mt-2">{story.improvement}</div>
                </div>

                <p className="text-gray-700 text-sm mb-4 italic">"{story.story}"</p>

                <div className="flex justify-between text-sm">
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
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Guarantees */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Response Time Guarantees</h2>
            <p className="text-gray-600">Clear commitments on when you'll get your answers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseGuarantees.map((guarantee, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-2xl font-bold text-red-600 mb-2">{guarantee.time}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{guarantee.type}</div>
                <div className="text-sm text-gray-600">{guarantee.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Support Level</h2>
            <p className="text-gray-600">Flexible plans to match your doubt resolution needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-lg ${plan.popular ? 'ring-2 ring-red-600 relative' : ''} hover:shadow-xl transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-red-600 mb-2">{plan.price}</div>
                  <div className="text-sm text-gray-600 line-through">{plan.originalPrice}</div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-red-600 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.link}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Start Getting Your Doubts Resolved Today
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Remember: No Question is Too Small!
              </h3>
              <p className="text-gray-600 mb-6">
                Every expert was once a beginner. Every concept you master starts with asking the
                right questions. Our faculty is here to support your learning journey without any
                judgment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="text-left space-y-3">
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span>Ask via WhatsApp: +91 88264 44334</span>
                </div>
                <div className="flex items-center">
                  <Video className="w-5 h-5 text-red-600 mr-3" />
                  <span>Schedule video calls instantly</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-red-600 mr-3" />
                  <span>Get responses within 15 minutes</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-red-600 mr-3" />
                  <span>Expert AIIMS faculty available</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="block bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Start Asking Doubts Now
                </Link>
                <Link
                  href="/courses"
                  className="block border border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
                >
                  Join Course (Doubts FREE)
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-green-100 border border-green-300 rounded-xl p-6">
            <p className="text-green-800 font-semibold mb-2">💡 Pro Tip for NEET Success</p>
            <p className="text-green-700">
              Students who actively ask doubts score 40+ marks higher in NEET Biology. Don't let
              confusion become your weakness!
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is there a limit to how many doubts I can ask?
              </h3>
              <p className="text-gray-600">
                No! We encourage unlimited questioning. With our courses, doubt resolution is
                completely free with no restrictions. The more you ask, the better you learn.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What if I'm shy or embarrassed about asking basic questions?
              </h3>
              <p className="text-gray-600">
                Our faculty understands that every student learns differently. We create a
                judgment-free environment where basic questions are welcomed. Remember, clarifying
                fundamentals is key to NEET success.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How qualified are the faculty members answering doubts?
              </h3>
              <p className="text-gray-600">
                All doubts are answered by AIIMS and top medical college graduates with 5+ years of
                NEET coaching experience. Each faculty member specializes in specific Biology topics
                for accurate, detailed explanations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Can I get help with exam strategy and study planning?
              </h3>
              <p className="text-gray-600">
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
