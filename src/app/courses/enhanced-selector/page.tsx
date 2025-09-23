'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { EnhancedDynamicCourseSelector } from '@/components/courses/EnhancedDynamicCourseSelector'
import { ArrowLeft, Sparkles, Target, Users, Award, Save, Smartphone } from 'lucide-react'
import Link from 'next/link'

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: any[]
  intensiveUpgrade?: boolean
}

export default function EnhancedCourseSelectorPage() {
  const handleCourseSelection = (course: SelectedCourse) => {
    console.log('Enhanced course selected:', course)
    alert(
      `Enhanced course selected! Total features: ${Object.keys(course).length} selections made.`
    )
  }
  // Redesigned to match basic selector's clean design philosophy

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background Elements - matching basic selector */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header - matching basic selector */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/courses/selector"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Basic Selector
              </Link>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Enhanced Course Selection</h1>
                <p className="text-sm text-gray-600">
                  Smart features with auto-save & accessibility
                </p>
              </div>
              <div className="w-24" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Hero Section - matching basic selector style */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Enhanced Course Selection
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Build Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Experience our advanced course selector with auto-save, enhanced accessibility, and
                smart features that preserve your progress across sessions.
              </p>

              {/* Feature Highlights - matching basic selector grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Save className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Auto-Save</h3>
                  <p className="text-sm text-gray-600">
                    Your progress is automatically saved, never lose your selections
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Smartphone className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Mobile Optimized</h3>
                  <p className="text-sm text-gray-600">
                    Enhanced touch experience with gesture support
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Target className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Smart Navigation</h3>
                  <p className="text-sm text-gray-600">
                    Keyboard shortcuts and accessibility features
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Course Selector - matching basic selector container */}
        <div className="pb-20">
          <div className="px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-7xl mx-auto"
            >
              <EnhancedDynamicCourseSelector onCourseSelect={handleCourseSelection} />
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators - matching basic selector style */}
        <div className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-6">
                Enhanced Features for 2000+ Successful Students
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">94%</div>
                  <div className="text-blue-100 text-sm">NEET Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2000+</div>
                  <div className="text-blue-100 text-sm">Students Taught</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">4.9/5</div>
                  <div className="text-blue-100 text-sm">Student Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-100 text-sm">Progress Saved</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-blue-100 italic">
                  "The enhanced selector with auto-save made my course selection so much easier. I
                  could compare options without worrying about losing my progress!"
                </p>
                <p className="text-white font-semibold mt-2">- Priya S., AIIMS Delhi</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
