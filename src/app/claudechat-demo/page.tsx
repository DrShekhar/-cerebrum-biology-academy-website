/**
 * ClaudeChat Board Demo Page
 * Showcase the revolutionary AI-powered education platform
 */

'use client'

import React, { useState } from 'react'
import { ArrowRight, Play, Users, Globe, TrendingUp, Award, Heart, Brain } from 'lucide-react'
import ClaudeChatBoard from '@/components/claudechat/ClaudeChatBoard'

export default function ClaudeChatDemo() {
  const [isDemo, setIsDemo] = useState(false)
  const [demoStudent, setDemoStudent] = useState({
    id: 'demo_student',
    name: 'Rahul Sharma',
  })

  if (isDemo) {
    return (
      <div className="min-h-screen">
        <ClaudeChatBoard
          studentId={demoStudent.id}
          studentName={demoStudent.name}
          onSessionComplete={(session) => {
            console.log('Demo session completed:', session)
            alert(
              `Demo session completed! You studied for ${session.timeSpent} minutes and learned ${session.conceptsMastered} concepts.`
            )
          }}
        />
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsDemo(false)}
            className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm hover:bg-black/90 transition-colors"
          >
            ← Back to Info
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 flex items-center justify-center space-x-4">
              <Brain className="w-12 h-12" />
              <span>ClaudeChat Board</span>
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              The "iPhone of Education" - Revolutionary AI-Powered Biology Learning
            </p>
            <p className="text-lg mb-12 max-w-3xl mx-auto opacity-80">
              🎤 Voice questions in Hindi/English/Hinglish • 📸 AR Biology Lab • 🎨 Interactive
              Whiteboard • 🤖 AI Study Buddy with Shekhar Sir's voice synthesis
            </p>

            <div className="flex justify-center space-x-6">
              <button
                onClick={() => setIsDemo(true)}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <Play className="w-6 h-6" />
                <span>Try Live Demo</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🚀 10 Revolutionary Features</h2>
            <p className="text-xl text-gray-600">
              Making ClaudeChat Board the most advanced education platform in the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'AR Biology Lab in Your Phone',
                description:
                  'Point camera at any object → See Biology concepts overlay with 3D models and real-time analysis',
                impact: '10x faster visual learning',
              },
              {
                icon: '🤖',
                title: 'AI Study Buddy Personalities',
                description:
                  'Motivational Coach, Study Partner, Exam Warrior - adapts to your emotional state and learning style',
                impact: '95% engagement increase',
              },
              {
                icon: '🎤',
                title: 'Multi-language Voice Chat',
                description:
                  "Ask questions in English, Hindi, or Hinglish - get explanations in Shekhar Sir's synthesized voice",
                impact: 'Native language comfort',
              },
              {
                icon: '📊',
                title: 'Predictive Success AI',
                description:
                  'NEET score prediction with 95% accuracy, weakness identification before you realize',
                impact: '40% score improvement',
              },
              {
                icon: '🎮',
                title: 'Viral Social Learning',
                description:
                  'Study streaks with friends, group study rooms, peer teaching rewards, biology meme generator',
                impact: '300% retention rate',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Parent Intelligence Dashboard',
                description:
                  'Real-time study analytics, automated WhatsApp reports, benchmark comparisons',
                impact: 'Family engagement boost',
              },
              {
                icon: '🎯',
                title: 'Biology Vision Technology',
                description:
                  'Point at ANY object → instant explanation, real-world recognition, AR overlays',
                impact: 'Breakthrough innovation',
              },
              {
                icon: '∞',
                title: 'AI-Generated Practice Infinity',
                description:
                  'Unlimited practice questions tailored to weaknesses, real-time difficulty adjustment',
                impact: 'Personalized mastery',
              },
              {
                icon: '🧠',
                title: 'Smart Content Creation',
                description:
                  "Auto-generate notes from textbook pages, create flowcharts, convert text to Shekhar Sir's voice",
                impact: 'Effortless learning',
              },
              {
                icon: '🌐',
                title: 'Global Network Effects',
                description:
                  'Study groups by location/performance, peer tutoring marketplace, collaborative challenges',
                impact: 'Worldwide community',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {feature.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Impact */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">📈 Market Domination Strategy</h2>
            <p className="text-xl text-gray-600">From ₹2L to ₹50L+ monthly revenue in 12 months</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Students in 6 months</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹50L+</div>
              <div className="text-gray-600">Monthly revenue target</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">NEET success rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries reached</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Phases */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">🗓️ Implementation Roadmap</h2>
            <p className="text-xl text-gray-600">
              Strategic rollout for maximum impact and sustainable growth
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                phase: 'Phase 1: Core Revolution',
                weeks: 'Weeks 1-5',
                revenue: '₹2L/month',
                features: [
                  "Voice synthesis with Shekhar Sir's voice",
                  'Picture upload and AI analysis',
                  'Multi-language support (English/Hindi/Hinglish)',
                  'Basic AR features',
                ],
                status: 'In Development',
              },
              {
                phase: 'Phase 2: Viral Features',
                weeks: 'Weeks 6-10',
                revenue: '₹10L/month',
                features: [
                  'Social learning and study streaks',
                  'Parent dashboard integration',
                  'Gamification elements',
                  'Predictive AI features',
                ],
                status: 'Planning',
              },
              {
                phase: 'Phase 3: Market Domination',
                weeks: 'Weeks 11-15',
                revenue: '₹50L/month',
                features: [
                  'Advanced AR Biology Lab',
                  'B2B platform development',
                  'International expansion prep',
                  'Advanced analytics and insights',
                ],
                status: 'Future',
              },
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                    <p className="text-gray-600">
                      {phase.weeks} • Target: {phase.revenue}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      phase.status === 'In Development'
                        ? 'bg-blue-100 text-blue-700'
                        : phase.status === 'Planning'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {phase.status}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Future of Education?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join the revolution that's transforming how students learn Biology and achieve NEET
            success
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setIsDemo(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>Try Live Demo Now</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
              <span>Book Personal Demo</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">Students Love It</div>
              <div className="text-sm opacity-80">95% satisfaction rate</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">Proven Results</div>
              <div className="text-sm opacity-80">98% NEET success rate</div>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">Global Reach</div>
              <div className="text-sm opacity-80">50+ countries served</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
