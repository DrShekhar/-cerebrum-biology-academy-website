'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import {
  BookOpen,
  GraduationCap,
  BarChart2,
  Users,
  Star,
  Clock,
  ArrowRight,
  FlaskConical,
} from 'lucide-react'

const FreeResourcesHub = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState('NEET')
  const [selectedGrade, setSelectedGrade] = useState('CLASS_12')

  const resources = [
    {
      id: 'chapter-notes',
      title: 'Chapter Notes',
      description: 'Complete chapter summaries with key points, diagrams, and quick revision',
      icon: BookOpen,
      count: '500+ Notes',
      color: 'from-blue-500 to-blue-600',
      href: '/resources/notes',
      features: ['PDF Downloads', 'Interactive Content', 'Concept Maps', 'Quick Revision'],
    },
    {
      id: 'ai-tests',
      title: 'AI Test Generator',
      description: 'Create unlimited customized test papers with AI-powered questions',
      icon: FlaskConical,
      count: 'Unlimited Tests',
      color: 'from-purple-500 to-purple-600',
      href: '/resources/test-generator',
      features: ['Custom Difficulty', 'Topic Selection', 'Instant Results', 'AI Analysis'],
    },
    {
      id: 'question-bank',
      title: 'Question Bank',
      description: '10,000+ practice questions with detailed explanations',
      icon: GraduationCap,
      count: '10,000+ Questions',
      color: 'bg-green-600',
      href: '/resources/questions',
      features: ['Previous Year Papers', 'Topic-wise Filter', 'Difficulty Levels', 'Solutions'],
    },
    {
      id: 'performance',
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analysis and recommendations',
      icon: BarChart2,
      count: 'Smart Insights',
      color: 'from-orange-500 to-orange-600',
      href: '/resources/analytics',
      features: [
        'Progress Tracking',
        'Weakness Analysis',
        'Study Recommendations',
        'Peer Comparison',
      ],
    },
  ]

  const topics = [
    'Cell Biology',
    'Genetics',
    'Evolution',
    'Human Physiology',
    'Plant Physiology',
    'Ecology',
    'Biotechnology',
    'Reproduction',
  ]

  const curriculums = ['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE']
  const grades = ['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">🎁 Free Biology Resources</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
              Access comprehensive study materials, AI-powered test generators, and performance
              analytics - completely free for all Biology students
            </p>

            {/* Curriculum & Grade Selection */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex flex-wrap gap-2">
                {curriculums.map((curriculum) => (
                  <button
                    key={curriculum}
                    onClick={() => setSelectedCurriculum(curriculum)}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium transition-all',
                      selectedCurriculum === curriculum
                        ? 'bg-white text-purple-600 shadow-lg'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    )}
                  >
                    {curriculum}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={cn(
                      'px-3 py-2 rounded-lg font-medium transition-all text-sm',
                      selectedGrade === grade
                        ? 'bg-yellow-400 text-gray-900 shadow-lg'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    )}
                  >
                    {grade.replace('CLASS_', 'Class ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm opacity-90">Free Users</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-sm opacity-90">Questions</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Chapter Notes</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Resources Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Complete Free Learning Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to excel in Biology - from comprehensive notes to AI-powered
            testing, all designed to boost your exam performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className={cn('h-2 bg-gradient-to-r', resource.color)}></div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn('p-3 rounded-lg bg-gradient-to-r text-white', resource.color)}>
                    <resource.icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{resource.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        FREE
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{resource.description}</p>

                    <div className="text-sm font-medium text-blue-600 mb-4">{resource.count}</div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {resource.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link
                      href={resource.href}
                      className={cn(
                        'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all group-hover:gap-3',
                        'bg-gradient-to-r text-white shadow-md hover:shadow-lg',
                        resource.color
                      )}
                    >
                      Access Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Topics Coverage */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            📚 Complete Biology Topics Coverage
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic, idx) => (
              <div
                key={topic}
                className="bg-gray-50 border border-blue-200 rounded-lg p-4 text-center hover:shadow-md transition-all"
              >
                <div className="text-2xl mb-2">
                  {['🧬', '🧪', '🌱', '❤️', '🌿', '🌍', '🔬', '👶'][idx % 8]}
                </div>
                <div className="font-medium text-gray-800">{topic}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
            <Users className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Community Learning</h3>
            <p className="text-gray-600 mb-4">
              Join study groups, share doubts, and learn from peers in our interactive community
            </p>
            <Link
              href="/resources/community"
              className="text-green-600 font-medium hover:underline"
            >
              Join Community →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <Star className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Achievements & Badges</h3>
            <p className="text-gray-600 mb-4">
              Earn points, unlock achievements, and track your learning milestones
            </p>
            <Link
              href="/resources/achievements"
              className="text-purple-600 font-medium hover:underline"
            >
              View Achievements →
            </Link>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
            <Clock className="h-8 w-8 text-orange-600 mb-4" />
            <h3 className="text-lg font-bold mb-2">Study Planner</h3>
            <p className="text-gray-600 mb-4">
              AI-generated study schedules based on your exam dates and weaknesses
            </p>
            <Link href="/resources/planner" className="text-orange-600 font-medium hover:underline">
              Create Plan →
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-500 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">🚀 Ready to Accelerate Your Biology Learning?</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join 50,000+ students who are already using our free resources to excel in Biology.
            Start your journey to academic success today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/resources/signup"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              Explore Premium Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeResourcesHub
