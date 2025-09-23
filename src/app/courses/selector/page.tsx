'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DynamicCourseSelector } from '@/components/courses/DynamicCourseSelector'
import { ArrowLeft, Sparkles, Target, Users, Award } from 'lucide-react'
import Link from 'next/link'

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: any[]
  intensiveUpgrade?: boolean
}

export default function CourseSelectorPage() {
  const handleCourseSelection = (course: SelectedCourse) => {
    console.log('Selected course:', course)
    // Here you would typically:
    // 1. Save to state/context
    // 2. Redirect to payment page
    // 3. Send to analytics
    alert(`Course selected! Check console for details.`)
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
                href="/courses"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Link>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Course Selection</h1>
                <p className="text-sm text-gray-600">Find your perfect learning path</p>
              </div>
              <div className="w-24" /> {/* Spacer for centering */}
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
                Personalized Course Selection
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Build Your
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Our smart course selector helps you find the perfect program based on your class,
                goals, and learning preferences. Get personalized recommendations in minutes.
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
                  <h3 className="font-semibold text-gray-900 mb-2">Personalized</h3>
                  <p className="text-sm text-gray-600">
                    Courses tailored to your academic level and goals
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible</h3>
                  <p className="text-sm text-gray-600">
                    Multiple plans and add-ons to fit your needs
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Proven</h3>
                  <p className="text-sm text-gray-600">94% success rate in NEET preparation</p>
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
              <DynamicCourseSelector onCourseSelect={handleCourseSelection} />
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-6">Join 2000+ Successful Students</h3>

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
                  <div className="text-3xl font-bold mb-2">88%</div>
                  <div className="text-blue-100 text-sm">550+ NEET Score</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-blue-100 italic">
                  "Choosing the right course was the first step to my NEET success. The personalized
                  approach made all the difference!"
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
