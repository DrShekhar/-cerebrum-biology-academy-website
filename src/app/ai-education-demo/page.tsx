import React from 'react'
import { Metadata } from 'next'
import { AIEducationDashboard } from '@/components/ai/AIEducationDashboard'
import BiologyTutorChatbot from '@/components/ai/BiologyTutorChatbot'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'AI Education Hub - Cerebrum Biology Academy',
  description:
    'Experience the future of Biology education with our AI-powered tutoring system. 24/7 doubt resolution, personalized assessments, and intelligent study materials.',
  keywords: [
    'AI tutoring',
    'Biology education',
    'NEET preparation',
    'personalized learning',
    'AI assessment',
    'intelligent content generation',
  ],
}

export default function AIEducationDemo() {
  return (
    <ToastProvider>
      <div className="min-h-screen">
        {/* AI Education Dashboard */}
        <AIEducationDashboard />

        {/* AI Biology Tutor Chatbot - floating */}
        <BiologyTutorChatbot />

        {/* Features Overview */}
        <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete AI-Powered Education System
              </h2>
              <p className="text-lg text-gray-800 max-w-3xl mx-auto font-medium">
                Experience the most advanced AI tutoring system designed specifically for Biology
                education. From doubt resolution to performance prediction, everything is powered by
                cutting-edge AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: '24/7 AI Biology Tutor',
                  description:
                    'Instant doubt resolution with detailed explanations, diagrams, and mnemonics',
                  features: [
                    'Natural language processing',
                    'Visual learning aids',
                    'Multi-language support',
                    'Voice interaction',
                  ],
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  title: 'Smart Assessment AI',
                  description: 'AI-generated tests adapted to your learning level and weak areas',
                  features: [
                    'Personalized questions',
                    'Automated evaluation',
                    'Performance analytics',
                    'Detailed feedback',
                  ],
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  title: 'Content Intelligence',
                  description: 'Auto-generated study materials, diagrams, and memory aids',
                  features: [
                    'Smart note generation',
                    'Interactive diagrams',
                    'Memory techniques',
                    'Concept mapping',
                  ],
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  title: 'Performance Prediction',
                  description:
                    'ML-powered predictions for exam success and personalized study plans',
                  features: [
                    'Exam score prediction',
                    'Readiness assessment',
                    'Risk analysis',
                    'Study optimization',
                  ],
                  color: 'from-orange-500 to-red-500',
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <div className="w-6 h-6 bg-white rounded-md"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-800 text-sm mb-4 font-medium">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-800">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced AI Technology Stack
              </h2>
              <p className="text-lg text-gray-800 font-medium">
                Built with state-of-the-art AI models and optimized for educational excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Provider AI</h3>
                  <p className="text-gray-800 text-sm font-medium">
                    OpenAI GPT-4, Anthropic Claude, Google Gemini with intelligent load balancing
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-8 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Processing</h3>
                  <p className="text-gray-800 text-sm font-medium">
                    Edge computing with &lt; 2 second response times and 99.9% uptime
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Adaptive Learning</h3>
                  <p className="text-gray-800 text-sm font-medium">
                    Machine learning algorithms that adapt to individual learning patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
              <p className="text-lg text-gray-800 font-medium">
                Our AI-powered system delivers measurable improvements in learning outcomes
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  metric: '40%',
                  label: 'Increased Engagement',
                  description: 'Students spend more time learning',
                },
                {
                  metric: '25%',
                  label: 'Faster Learning',
                  description: 'Accelerated concept mastery',
                },
                { metric: '98%', label: 'Success Rate', description: 'NEET qualification rate' },
                {
                  metric: '<2min',
                  label: 'Response Time',
                  description: 'Average doubt resolution',
                },
              ].map((stat, index) => (
                <div key={stat.metric} className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.metric}</div>
                  <div className="text-lg font-bold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-800 font-medium">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ToastProvider>
  )
}
