'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CourseSeriesContainer } from '@/components/courses/CourseSeriesContainer'
import { ClassFilterNav } from '@/components/courses/ClassFilterNav'
import { ClassLevel } from '@/types/courseSystem'

const mockSeriesData = [
  {
    id: 'pinnacle',
    name: 'Elite Mastery',
    description: 'Premium coaching with personal mentorship for NEET toppers',
    icon: 'crown',
    color: 'purple',
    batchSize: 15,
    weeklyHours: 20,
    plans: [
      {
        id: 'A' as const,
        name: 'Intensive',
        duration: '3 months',
        price: 1299,
        features: ['1:1 Mentoring', 'Daily Classes', 'Custom Plans', 'Priority Support'],
        popular: false,
      },
      {
        id: 'B' as const,
        name: 'Comprehensive',
        duration: '6 months',
        price: 999,
        features: ['Group Mentoring', 'Regular Classes', 'Study Material', 'Test Series'],
        popular: true,
      },
      {
        id: 'C' as const,
        name: 'Extended',
        duration: '12 months',
        price: 799,
        features: ['Basic Support', 'Recorded Classes', 'Mock Tests', 'Doubt Clearing'],
      },
    ],
  },
  {
    id: 'ascent',
    name: 'Advanced Plus',
    description: 'Comprehensive NEET preparation with proven track record',
    icon: 'zap',
    color: 'blue',
    batchSize: 30,
    weeklyHours: 18,
    plans: [
      {
        id: 'A' as const,
        name: 'Fast Track',
        duration: '4 months',
        price: 999,
        features: ['Live Classes', 'Test Series', 'Study Material', 'Doubt Sessions'],
      },
      {
        id: 'B' as const,
        name: 'Standard',
        duration: '8 months',
        price: 699,
        features: ['Regular Classes', 'Practice Tests', 'Study Material', 'Support'],
        popular: true,
      },
      {
        id: 'C' as const,
        name: 'Flexible',
        duration: 'Self-paced',
        price: 499,
        features: ['Recorded Sessions', 'Self Assessment', 'Basic Support', 'Community'],
      },
    ],
  },
  {
    id: 'pursuit',
    name: 'Foundation Pro',
    description: 'Strong foundation building with conceptual clarity',
    icon: 'rocket',
    color: 'green',
    batchSize: 50,
    weeklyHours: 15,
    plans: [
      {
        id: 'A' as const,
        name: 'Accelerated',
        duration: '6 months',
        price: 799,
        features: ['Concept Building', 'Regular Practice', 'Progress Tracking', 'Support'],
      },
      {
        id: 'B' as const,
        name: 'Regular',
        duration: '10 months',
        price: 599,
        features: ['Step-by-step Learning', 'Practice Tests', 'Study Material', 'Guidance'],
        popular: true,
      },
      {
        id: 'C' as const,
        name: 'Basic',
        duration: 'Flexible',
        price: 399,
        features: ['Foundation Content', 'Basic Tests', 'Community Access', 'Resources'],
      },
    ],
  },
]

const mockCourseCounts = {
  '9th': 3,
  '10th': 3,
  '11th': 3,
  '12th': 3,
  Dropper: 3,
}

export default function CourseGridDemo() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel | 'all'>('11th')
  const [enrollmentStats, setEnrollmentStats] = useState({
    totalSelections: 0,
    activeUsers: 127,
    completedEnrollments: 89,
  })

  const handleClassSelect = (classLevel: ClassLevel | 'all') => {
    setSelectedClass(classLevel)
  }

  const handlePlanSelect = (seriesId: string, planId: string) => {
    console.log(`Plan selected: ${seriesId} - Plan ${planId}`)
    setEnrollmentStats((prev) => ({
      ...prev,
      totalSelections: prev.totalSelections + 1,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">Apple-Level Course Grid</h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Experience the future of educational interfaces with our enhanced course selection
              system. Hover over cards to reveal interactive plan selection overlays.
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Plan Selections', value: enrollmentStats.totalSelections, suffix: '' },
                { label: 'Active Users', value: enrollmentStats.activeUsers, suffix: '+' },
                {
                  label: 'Enrolled Today',
                  value: enrollmentStats.completedEnrollments,
                  suffix: '',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Class Filter Navigation */}
      <div className="relative -mt-8">
        <ClassFilterNav
          selectedClass={selectedClass}
          onClassSelect={handleClassSelect}
          courseCounts={mockCourseCounts}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Current Selection Info */}
        <motion.div
          key={selectedClass}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedClass === 'all'
              ? 'All Biology Course Series'
              : `Class ${selectedClass} Biology Course Series`}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our three distinct learning pathways, each designed for different
            preparation styles and timelines. Hover over any card to explore quick plan selection
            options.
          </p>
        </motion.div>

        {/* Course Series Grid */}
        {selectedClass !== 'all' && (
          <CourseSeriesContainer
            selectedClass={selectedClass}
            seriesData={mockSeriesData}
            onPlanSelect={handlePlanSelect}
            className="mb-16"
          />
        )}

        {/* Features Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Enhanced Grid Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🎨',
                  title: 'Series-Specific Theming',
                  description: 'Dynamic colors and gradients for each course series',
                },
                {
                  icon: '⚡',
                  title: 'Hover Overlays',
                  description: 'Interactive plan selection on card hover',
                },
                {
                  icon: '📱',
                  title: 'Responsive Grid',
                  description: 'Perfect layout on all device sizes',
                },
                {
                  icon: '🚀',
                  title: 'Apple-Level Animations',
                  description: 'Smooth 60fps transitions and micro-interactions',
                },
                {
                  icon: '🎯',
                  title: 'Smart Loading',
                  description: 'Skeleton screens and progressive enhancement',
                },
                {
                  icon: '💫',
                  title: 'Glassmorphism',
                  description: 'Modern blur effects and translucent surfaces',
                },
                {
                  icon: '🔄',
                  title: 'State Management',
                  description: 'Real-time selection tracking and feedback',
                },
                {
                  icon: '♿',
                  title: 'Accessibility',
                  description: 'WCAG compliant with keyboard navigation',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">🛠️ Technical Implementation</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-green-400 mb-3">CSS Grid System</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Responsive 3-column layout</li>
                  <li>• Auto-fit minmax for flexibility</li>
                  <li>• CSS Container queries</li>
                  <li>• Print-friendly styles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">Framer Motion</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• layoutId animations</li>
                  <li>• AnimatePresence transitions</li>
                  <li>• Staggered child animations</li>
                  <li>• Gesture-based interactions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-3">Accessibility</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>• Reduced motion support</li>
                  <li>• High contrast mode</li>
                  <li>• Screen reader compatibility</li>
                  <li>• Keyboard navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
