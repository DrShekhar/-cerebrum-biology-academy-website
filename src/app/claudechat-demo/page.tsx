/**
 * ClaudeChat Board Demo Page
 * Showcase the AI-powered education platform
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 flex items-center justify-center space-x-4">
              <Brain className="w-12 h-12" />
              <span>ClaudeChat Board</span>
            </h1>
            <p className="text-2xl mb-8 opacity-90">
              AI-Powered Biology Learning Built for NEET Success
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

      {/* Key Features */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">10 Features That Make Learning Easier</h2>
            <p className="text-xl text-gray-600">
              Tools designed by NEET educators to help you study smarter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'AR Biology Lab',
                description:
                  'Point your camera at objects to see Biology concepts with 3D models and labels',
                impact: 'Visual learning aid',
              },
              {
                icon: '🤖',
                title: 'AI Study Modes',
                description:
                  'Choose between Motivational Coach, Study Partner, or Exam Practice modes based on what you need',
                impact: 'Adapts to your mood',
              },
              {
                icon: '🎤',
                title: 'Voice Chat in Your Language',
                description:
                  "Ask questions in English, Hindi, or Hinglish - hear explanations in Shekhar Sir's voice",
                impact: 'Hindi/English support',
              },
              {
                icon: '📊',
                title: 'Score Prediction',
                description:
                  'Get estimated NEET scores based on your practice tests and identify weak topics early',
                impact: 'Know where you stand',
              },
              {
                icon: '🎮',
                title: 'Study with Friends',
                description:
                  'Study streaks, group study rooms, peer teaching, and fun biology challenges',
                impact: 'Makes studying social',
              },
              {
                icon: '👨‍👩‍👧‍👦',
                title: 'Parent Dashboard',
                description:
                  'Parents can track study time, progress reports, and get WhatsApp updates',
                impact: 'Keep parents informed',
              },
              {
                icon: '🎯',
                title: 'Biology Vision',
                description:
                  'Point at any object and get instant Biology explanations with AR overlays',
                impact: 'Learn from real world',
              },
              {
                icon: '∞',
                title: 'Unlimited Practice',
                description:
                  'AI generates practice questions based on your weak areas with adjusting difficulty',
                impact: 'Never run out of MCQs',
              },
              {
                icon: '🧠',
                title: 'Auto Notes & Flowcharts',
                description:
                  "Upload textbook pages to generate notes, flowcharts, or audio in Shekhar Sir's voice",
                impact: 'Save study time',
              },
              {
                icon: '🌐',
                title: 'Student Community',
                description:
                  'Find study groups by location, get help from peers, join collaborative challenges',
                impact: 'Learn together',
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

      {/* Our Track Record */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Track Record</h2>
            <p className="text-xl text-gray-600">Results from Cerebrum Biology Academy students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1.5L+</div>
              <div className="text-gray-600">Students guided</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">695</div>
              <div className="text-gray-600">Top NEET score (Sadhna Sirin)</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Years teaching NEET Biology</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">NRI</div>
              <div className="text-gray-600">Students from 10+ countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Roadmap */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What We're Building</h2>
            <p className="text-xl text-gray-600">
              Our development plan for ClaudeChat Board features
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                phase: 'Phase 1: Core Features',
                timeline: 'Current',
                features: [
                  "Voice explanations in Shekhar Sir's voice",
                  'Upload photos of textbook pages for explanation',
                  'Hindi, English, and Hinglish support',
                  'Basic Biology AR features',
                ],
                status: 'In Development',
              },
              {
                phase: 'Phase 2: Social Features',
                timeline: 'Coming Soon',
                features: [
                  'Study streaks and friend challenges',
                  'Parent dashboard with progress reports',
                  'Gamification and rewards',
                  'Score prediction based on practice',
                ],
                status: 'Planning',
              },
              {
                phase: 'Phase 3: Advanced Features',
                timeline: 'Future',
                features: [
                  'Full AR Biology Lab experience',
                  'Peer tutoring and study groups',
                  'NRI student features',
                  'Detailed learning analytics',
                ],
                status: 'Future',
              },
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{phase.phase}</h3>
                    <p className="text-gray-600">{phase.timeline}</p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      phase.status === 'In Development'
                        ? 'bg-blue-100 text-blue-700'
                        : phase.status === 'Planning'
                          ? 'bg-amber-100 text-yellow-700'
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
      <div className="py-20 bg-indigo-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Try ClaudeChat Board</h2>
          <p className="text-xl mb-8 opacity-90">
            See how AI can help you learn Biology faster and prepare for NEET
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setIsDemo(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-6 h-6" />
              <span>Try Live Demo</span>
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center space-x-2">
              <span>Book a Demo Call</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">Student Feedback</div>
              <div className="text-sm opacity-80">4.9/5 rating from students</div>
            </div>
            <div>
              <Award className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">AIIMS Faculty</div>
              <div className="text-sm opacity-80">Dr. Shekhar C Singh, AIIMS Delhi</div>
            </div>
            <div>
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <div className="text-lg font-medium">NRI Students</div>
              <div className="text-sm opacity-80">Students from 10+ countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
