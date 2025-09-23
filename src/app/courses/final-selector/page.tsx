'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FinalCourseSelector } from '@/components/courses/FinalCourseSelector'
import { ArrowLeft, Sparkles, Target, Users, Award } from 'lucide-react'
import Link from 'next/link'

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: any[]
  intensiveUpgrade?: boolean
}

export default function FinalCourseSelectorPage() {
  const handleCourseSelection = (course: any, tier: string) => {
    console.log('Final course selected:', { course, tier })
    alert(`Perfect choice! ${course.name} - ${tier} tier selected for ${course.targetClass}`)
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
                href="/courses/improved-selector"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Other Selectors
              </Link>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900">Final Course Selector</h1>
                <p className="text-sm text-gray-600">
                  Complete course selection experience with card design
                </p>
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
                Final Course Selection Experience
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Your Perfect
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NEET Journey
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Experience our comprehensive course selector with card-based design, detailed course
                metrics, and seamless tier selection inspired by the reference design.
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
                  <h3 className="font-semibold text-gray-900 mb-2">Card-Based Design</h3>
                  <p className="text-sm text-gray-600">
                    Individual course cards with target icons, class badges, and detailed metrics
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Complete Filtering</h3>
                  <p className="text-sm text-gray-600">
                    Advanced search and class-wise filtering with course counts
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                >
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Tier Comparison</h3>
                  <p className="text-sm text-gray-600">
                    Comprehensive tier comparison with pricing and features
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Course Selector */}
        <div className="pb-20">
          <FinalCourseSelector onCourseSelect={handleCourseSelection} />
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
              <h3 className="text-2xl font-bold mb-6">Complete Course Selection Experience</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                <div>
                  <div className="text-3xl font-bold mb-2">{'{coursePrograms.length}'}</div>
                  <div className="text-blue-100 text-sm">Course Programs</div>
                  <div className="text-blue-100 text-xs">All Classes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">3</div>
                  <div className="text-blue-100 text-sm">Learning Tiers</div>
                  <div className="text-blue-100 text-xs">Pinnacle/Ascent/Pursuit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">94%</div>
                  <div className="text-blue-100 text-sm">Success Rate</div>
                  <div className="text-blue-100 text-xs">NEET Qualification</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-blue-100 text-sm">Design Match</div>
                  <div className="text-blue-100 text-xs">Reference Based</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h4 className="text-lg font-semibold mb-4">✨ Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Card design with target icons and class badges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Course metrics grid (duration, hours, batch size)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>NEET focused verification badges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Series selection tabs (Pinnacle/Ascent/Pursuit)</span>
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
