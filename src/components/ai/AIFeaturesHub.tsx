'use client'

/**
 * AI Features Hub Component
 *
 * Unified dashboard showcasing all AI capabilities:
 * - ClaudeChat: AI-powered learning assistant
 * - Voice Training: Interactive voice-based learning
 * - AI Monitoring: Real-time analytics (admin only)
 * - AI Education Demo: Interactive demos
 */

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Mic,
  BarChart3,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Award,
  Clock,
  Users,
  CheckCircle2,
  Star,
} from 'lucide-react'

interface AIFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  href: string
  status: 'active' | 'beta' | 'coming-soon'
  features: string[]
  metrics?: {
    label: string
    value: string
  }[]
  color: string
  bgGradient: string
}

const aiFeatures: AIFeature[] = [
  {
    id: 'claudechat',
    title: 'ClaudeChat',
    description: '24/7 AI-powered learning assistant with advanced biology expertise',
    icon: <MessageSquare className="w-8 h-8" />,
    href: '/claudechat',
    status: 'active',
    features: [
      'Instant doubt resolution',
      'Step-by-step explanations',
      'NEET-focused content',
      'Multilingual support (7 languages)',
      'Personalized learning paths',
      'Practice question generation',
    ],
    metrics: [
      { label: 'Response Time', value: '<2 seconds' },
      { label: 'Accuracy', value: '94.2%' },
      { label: 'Students Helped', value: '10,000+' },
    ],
    color: 'blue-600',
    bgGradient: 'bg-gray-50',
  },
  {
    id: 'voice-training',
    title: 'Voice Training',
    description: 'Interactive voice-based learning for hands-free study sessions',
    icon: <Mic className="w-8 h-8" />,
    href: '/voice-training',
    status: 'beta',
    features: [
      'Voice-activated Q&A',
      'Pronunciation practice',
      'Audio feedback',
      'Hands-free learning',
      'Perfect for revision',
      'Natural conversations',
    ],
    metrics: [
      { label: 'Voice Accuracy', value: '96%' },
      { label: 'Languages', value: '7' },
      { label: 'Sessions', value: '5,000+' },
    ],
    color: 'from-purple-500 to-indigo-600',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    id: 'ai-education-demo',
    title: 'AI Education Demo',
    description: 'Interactive demonstrations of AI-powered learning features',
    icon: <Sparkles className="w-8 h-8" />,
    href: '/ai-education-demo',
    status: 'active',
    features: [
      'Interactive AI demos',
      'Feature showcases',
      'Live examples',
      'Try before you buy',
      'Guided tours',
      'Sample interactions',
    ],
    color: 'bg-green-600',
    bgGradient: 'from-green-50 to-green-50',
  },
  {
    id: 'ai-monitoring',
    title: 'AI Monitoring Dashboard',
    description: 'Real-time analytics and performance monitoring (Admin)',
    icon: <BarChart3 className="w-8 h-8" />,
    href: '/admin/ai-monitoring',
    status: 'active',
    features: [
      'Real-time usage metrics',
      'Cost tracking',
      'Performance analytics',
      'Error monitoring',
      'User engagement stats',
      'API health checks',
    ],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Avg Response', value: '1.8s' },
      { label: 'Daily Users', value: '2,500+' },
    ],
    color: 'bg-orange-600',
    bgGradient: 'bg-orange-50',
  },
]

const stats = [
  { label: 'Total AI Interactions', value: '50,000+', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Student Success Rate', value: '94.2%', icon: <Award className="w-5 h-5" /> },
  { label: 'Average Response Time', value: '<2s', icon: <Clock className="w-5 h-5" /> },
  { label: 'Active Daily Users', value: '2,500+', icon: <Users className="w-5 h-5" /> },
]

interface APIStatus {
  [key: string]: {
    status: 'operational' | 'checking' | 'error'
    responseTime?: number
  }
}

export default function AIFeaturesHub() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<APIStatus>({})
  const [isCheckingAPIs, setIsCheckingAPIs] = useState(true)

  // Check API health on component mount
  useEffect(() => {
    checkAllAPIs()
  }, [])

  async function checkAllAPIs() {
    setIsCheckingAPIs(true)

    const apis = [
      { id: 'claudechat', endpoint: '/api/ai/unified-chat' },
      { id: 'ai-education-demo', endpoint: '/api/ai/education-hub' },
      { id: 'voice-training', endpoint: '/api/ai/voice-processing' },
    ]

    const statusPromises = apis.map(async (api) => {
      const startTime = Date.now()
      try {
        const response = await fetch(api.endpoint, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        const responseTime = Date.now() - startTime

        return {
          id: api.id,
          status: response.ok ? 'operational' : 'error',
          responseTime,
        }
      } catch (error) {
        return {
          id: api.id,
          status: 'error' as const,
          responseTime: Date.now() - startTime,
        }
      }
    })

    const results = await Promise.all(statusPromises)

    const newStatus: APIStatus = {}
    results.forEach((result) => {
      newStatus[result.id] = {
        status: result.status as 'operational' | 'error',
        responseTime: result.responseTime,
      }
    })

    setApiStatus(newStatus)
    setIsCheckingAPIs(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Brain className="w-5 h-5 mr-2" />
              <span className="text-sm font-semibold">Powered by Claude 3.5 Sonnet</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              AI-Powered Learning
              <span className="block text-blue-200 mt-2">Built for NEET Success</span>
            </h1>

            <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              AI study tools designed specifically for NEET Biology students
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our AI Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our comprehensive suite of AI-powered tools designed to enhance your learning
            experience
          </p>

          {/* API Status Indicator */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className={`w-2 h-2 rounded-full ${isCheckingAPIs ? 'bg-yellow-500 animate-pulse' : Object.values(apiStatus).every((s) => s.status === 'operational') ? 'bg-green-600' : 'bg-orange-500'}`}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                {isCheckingAPIs
                  ? 'Checking APIs...'
                  : `${Object.values(apiStatus).filter((s) => s.status === 'operational').length}/${Object.keys(apiStatus).length} APIs Online`}
              </span>
            </div>
            {!isCheckingAPIs && Object.values(apiStatus).some((s) => s.responseTime) && (
              <div className="text-sm text-gray-600">
                Avg Response:{' '}
                {Math.round(
                  Object.values(apiStatus).reduce((acc, s) => acc + (s.responseTime || 0), 0) /
                    Object.values(apiStatus).length
                )}
                ms
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {aiFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`
                relative group rounded-2xl overflow-hidden border-2 transition-all duration-300
                ${selectedFeature === feature.id ? 'border-blue-500 shadow-2xl' : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'}
              `}
              onMouseEnter={() => setSelectedFeature(feature.id)}
              onMouseLeave={() => setSelectedFeature(null)}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50`}
              ></div>

              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                  >
                    {feature.icon}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* API Status Badge */}
                    {apiStatus[feature.id] && (
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          apiStatus[feature.id].status === 'operational'
                            ? 'bg-green-100 text-green-700'
                            : apiStatus[feature.id].status === 'checking'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {apiStatus[feature.id].status === 'operational'
                          ? '● Online'
                          : apiStatus[feature.id].status === 'checking'
                            ? '○ Checking'
                            : '● Offline'}
                      </span>
                    )}

                    {/* Feature Status Badge */}
                    {feature.status === 'active' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    )}
                    {feature.status === 'beta' && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                        Beta
                      </span>
                    )}
                    {feature.status === 'coming-soon' && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>

                <p className="text-gray-600 mb-6">{feature.description}</p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                {feature.metrics && (
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white/50 rounded-lg">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA Button */}
                <Link
                  href={feature.href}
                  className={`
                    flex items-center justify-center w-full px-6 py-3 rounded-lg font-semibold
                    transition-all duration-300 group-hover:shadow-lg
                    ${
                      feature.status === 'coming-soon'
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : `bg-gradient-to-r ${feature.color} text-white hover:scale-105`
                    }
                  `}
                  onClick={(e) => feature.status === 'coming-soon' && e.preventDefault()}
                >
                  {feature.status === 'coming-soon' ? (
                    <>
                      <Clock className="w-5 h-5 mr-2" />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      Try {feature.title}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our AI Features?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-gray-300">
                Get answers in under 2 seconds with our optimized AI infrastructure
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">NEET-Focused</h3>
              <p className="text-gray-300">
                Specifically trained on NEET syllabus and exam patterns
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-gray-300">
                94.2% NEET qualification rate with our AI-assisted learning
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-blue-500 rounded-2xl p-12 text-white shadow-2xl">
          <Star className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Experience AI-Powered Learning?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 10,000+ students already using our AI features to ace their NEET preparation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/claudechat"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start with ClaudeChat
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
