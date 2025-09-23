'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ImprovedCourseSelector } from '@/components/courses/ImprovedCourseSelector'
import { ArrowLeft, Sparkles, Target, Users, Award } from 'lucide-react'
import Link from 'next/link'

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: any[]
  intensiveUpgrade?: boolean
}

export default function ImprovedCourseSelectorPage() {
  const handleCourseSelection = (course: SelectedCourse) => {
    console.log('Improved course selected:', course)
    alert(`Course selected! ${course.series} - ${course.plan} for ${course.classLevel}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/courses/enhanced-selector"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Enhanced Selector
              </Link>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Improved Course Selection</h1>
                <p className="text-sm text-gray-600">Individual cards with Plan A/B/C system</p>
              </div>

              <div className="w-24" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Improved Course Selection Experience
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Choose Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Perfect Plan
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Individual course cards for each series with comprehensive Plan A, Plan B, and Plan
                C options tailored to your specific needs and budget.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Individual Cards</h3>
                  <p className="text-sm text-gray-600">
                    Separate detailed cards for Pinnacle, Ascent, and Pursuit series
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Plan A/B/C System</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive, focused, or foundation plans for every budget
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Clear Comparison</h3>
                  <p className="text-sm text-gray-600">
                    Easy side-by-side comparison of features and pricing
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Course Selector */}
        <div className="pb-20">
          <div className="px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-7xl mx-auto"
            >
              <ImprovedCourseSelector onCourseSelect={handleCourseSelection} />
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-6">Experience the New Course Selection</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-blue-100 text-sm">Course Series</div>
                  <div className="text-blue-100 text-xs">Individual Cards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">9</div>
                  <div className="text-blue-100 text-sm">Total Plans</div>
                  <div className="text-blue-100 text-xs">A/B/C Options</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-blue-100 text-sm">Class Levels</div>
                  <div className="text-blue-100 text-xs">IX to Dropper</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-lg font-semibold mb-4">✨ Key Improvements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Individual cards for each series (Pinnacle, Ascent, Pursuit)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Plan A/B/C system with clear pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Visual course metrics (duration, batch size, weekly hours)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Enhanced feature comparison and selection</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
