'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Target,
  BookOpen,
  CheckCircle,
  Calendar,
  Video,
  FileText,
  MessageCircle,
  Zap,
  Shield,
} from 'lucide-react'
import Link from 'next/link'
import { getSeriesDetails, getPlanDetails } from '@/data/seriesData'

export default function PlanDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const series = params.series as string
  const classLevel = params.class as string
  const planId = params.plan as string

  // Extract plan letter from plan-[letter] format
  const planLetter = planId.replace('plan-', '').toUpperCase()

  const seriesDetails = getSeriesDetails(classLevel, series)
  const planDetails = getPlanDetails(classLevel, series, planLetter)

  if (!seriesDetails || !planDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <p className="text-gray-600 mb-6">The requested plan could not be found.</p>
          <Link
            href="/courses/final-selector"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Course Selector
          </Link>
        </div>
      </div>
    )
  }

  const getSeriesGradient = (seriesId: string) => {
    switch (seriesId) {
      case 'pinnacle':
        return 'from-purple-600 to-purple-700'
      case 'ascent':
        return 'from-blue-600 to-blue-700'
      case 'pursuit':
        return 'bg-[#4a5d4a]'
      default:
        return 'from-gray-600 to-gray-700'
    }
  }

  const getSeriesAccent = (seriesId: string) => {
    switch (seriesId) {
      case 'pinnacle':
        return 'purple'
      case 'ascent':
        return 'blue'
      case 'pursuit':
        return 'green'
      default:
        return 'gray'
    }
  }

  const accent = getSeriesAccent(series)

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
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>

              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Class {classLevel} {seriesDetails.name} - Plan {planLetter}
                </h1>
                <p className="text-sm text-gray-600">{planDetails.name} Plan Details</p>
              </div>

              <div className="w-16" />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className={`bg-gradient-to-r ${getSeriesGradient(series)} text-white py-16`}>
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Plan {planLetter} Details</span>
                {planDetails.popular && (
                  <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Class {classLevel} NEET {seriesDetails.name}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Plan {planLetter} - {planDetails.name}
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {planDetails.description}
              </p>

              {/* Pricing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
                <div className="text-3xl font-bold mb-2">₹{planDetails.price.toLocaleString()}</div>
                <div className="text-white/80">per year • {planDetails.duration}</div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">
                    {planDetails.detailedFeatures.liveClasses}
                  </div>
                  <div className="text-white/80 text-sm">Live Classes</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">
                    {planDetails.detailedFeatures.recordedLectures}
                  </div>
                  <div className="text-white/80 text-sm">Recorded Lectures</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">{planDetails.detailedFeatures.mockTests}</div>
                  <div className="text-white/80 text-sm">Mock Tests</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">{planDetails.detailedFeatures.batchSize}</div>
                  <div className="text-white/80 text-sm">Batch Size</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Features & Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  What's Included in Plan {planLetter}
                </h3>

                <div className="space-y-6">
                  {planDetails.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20"
                    >
                      <div
                        className={`w-8 h-8 ${accent === 'purple' ? 'bg-purple-100' : accent === 'blue' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <CheckCircle
                          className={`w-4 h-4 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Study Materials */}
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Study Materials</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {planDetails.detailedFeatures.studyMaterial.map((material, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-white/40 rounded-xl border border-white/20"
                      >
                        <BookOpen
                          className={`w-4 h-4 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                        />
                        <span className="text-sm font-medium text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Plan Comparison & Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Detailed Breakdown</h3>

                <div className="space-y-6">
                  {/* Duration & Timeline */}
                  <div className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar
                        className={`w-6 h-6 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                      />
                      <h4 className="text-lg font-semibold text-gray-900">Duration & Timeline</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Duration:</span>
                        <div className="font-semibold">{planDetails.detailedFeatures.duration}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Plan Duration:</span>
                        <div className="font-semibold">{planDetails.duration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Live Classes */}
                  <div className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Video
                        className={`w-6 h-6 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                      />
                      <h4 className="text-lg font-semibold text-gray-900">Live Classes</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Classes:</span>
                        <div className="font-semibold">
                          {planDetails.detailedFeatures.liveClasses}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Batch Size:</span>
                        <div className="font-semibold">
                          {planDetails.detailedFeatures.batchSize} students
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mentoring & Support */}
                  <div className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageCircle
                        className={`w-6 h-6 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                      />
                      <h4 className="text-lg font-semibold text-gray-900">Mentoring & Support</h4>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Mentoring Type:</span>
                      <div className="font-semibold">{planDetails.detailedFeatures.mentoring}</div>
                    </div>
                  </div>

                  {/* Assessment */}
                  <div className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <FileText
                        className={`w-6 h-6 ${accent === 'purple' ? 'text-purple-600' : accent === 'blue' ? 'text-blue-600' : 'text-green-600'}`}
                      />
                      <h4 className="text-lg font-semibold text-gray-900">Assessment & Testing</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Mock Tests:</span>
                        <div className="font-semibold">
                          {planDetails.detailedFeatures.mockTests}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Recorded Lectures:</span>
                        <div className="font-semibold">
                          {planDetails.detailedFeatures.recordedLectures}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <div
                className={`bg-gradient-to-r ${getSeriesGradient(series)} rounded-3xl p-12 text-white`}
              >
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your NEET Journey?</h3>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join Plan {planLetter} and get access to comprehensive NEET Biology preparation
                  with our expert faculty.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-5 h-5" />
                    Enroll Now - ₹{planDetails.price.toLocaleString()}
                  </button>
                  <button
                    className={`${accent === 'purple' ? 'bg-purple-500 hover:bg-purple-400' : accent === 'blue' ? 'bg-blue-500 hover:bg-blue-400' : 'bg-green-600 hover:bg-green-400'} text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2`}
                  >
                    <Shield className="w-5 h-5" />
                    Book Free Demo Class
                  </button>
                </div>

                <div className="mt-6 text-center text-white/80 text-sm">
                  <p>
                    💯 94% NEET qualification rate • 🎯 Personalized attention • 📚 Complete study
                    materials
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
