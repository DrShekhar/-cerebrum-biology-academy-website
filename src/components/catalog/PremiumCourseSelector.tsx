'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star,
  Target,
  Users,
  Trophy,
  GraduationCap,
  Heart,
  Brain,
  Sparkles,
  Shield,
  ArrowRight,
  ChevronDown,
  Check,
  Award,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { courses, type Course } from '@/data/courseData'

// Types for intelligent course selection
interface StudentProfile {
  currentClass: 'IX' | 'X' | 'XI' | 'XII' | 'Dropper'
  neetTarget: 'top-100' | 'top-500' | 'top-2000' | 'qualification'
  weakSubjects: string[]
  studyHours: number
  budget: 'flexible' | 'moderate' | 'tight'
  learningStyle: 'visual' | 'auditory' | 'hands-on' | 'mixed'
}

interface PersonalizedRecommendation {
  course: Course
  matchScore: number
  reasoning: string[]
  successProbability: number
  peerStories: string[]
}

// Premium Success Stories Data
const SUCCESS_STORIES = [
  {
    name: 'Arjun Sharma',
    rank: 42,
    course: 'Pinnacle NEET Elite',
    image: '👨‍🎓',
    quote: 'The personalized mentoring helped me identify and fix my weak areas. Got AIIMS Delhi!',
    improvement: '+480 marks from baseline',
  },
  {
    name: 'Priya Patel',
    rank: 156,
    course: 'Ascent NEET Plan B',
    image: '👩‍🎓',
    quote: 'Small batch size meant individual attention. Every doubt was cleared immediately.',
    improvement: '+320 marks improvement',
  },
  {
    name: 'Rahul Kumar',
    rank: 287,
    course: 'Pursuit NEET Plan A',
    image: '👨‍🎓',
    quote: 'Best decision of my life. Faculty made biology so interesting and memorable.',
    improvement: 'From 40% to 85% in Biology',
  },
]

// AI-Powered Course Recommendations
const calculatePersonalizedRecommendations = (
  profile: StudentProfile
): PersonalizedRecommendation[] => {
  return courses
    .map((course) => {
      let matchScore = 0
      const reasoning: string[] = []

      // Target-based matching
      if (profile.neetTarget === 'top-100' && course.series === 'Pinnacle') {
        matchScore += 40
        reasoning.push('Perfect for top 100 NEET rank aspirants')
      } else if (profile.neetTarget === 'top-500' && course.series === 'Ascent') {
        matchScore += 35
        reasoning.push('Optimized for top 500 medical college admissions')
      } else if (profile.neetTarget === 'top-2000' && course.series === 'Pursuit') {
        matchScore += 30
        reasoning.push('Excellent success rate for medical college qualification')
      }

      // Budget alignment
      if (profile.budget === 'flexible' && course.currentPrice > 300000) {
        matchScore += 20
        reasoning.push('Premium features match your investment capacity')
      } else if (profile.budget === 'moderate' && course.currentPrice <= 200000) {
        matchScore += 25
        reasoning.push('Best value for money with proven results')
      }

      // Batch size preference for weak subjects
      if (profile.weakSubjects.length > 2 && course.batchSize <= 15) {
        matchScore += 20
        reasoning.push('Small batch ensures personal attention for weak areas')
      }

      // Study hours alignment
      if (profile.studyHours >= 6 && course.series === 'Intensive') {
        matchScore += 15
        reasoning.push('Intensive schedule matches your dedication level')
      }

      const successProbability = Math.min(95, course.successRate + matchScore * 0.3)

      return {
        course,
        matchScore,
        reasoning,
        successProbability,
        peerStories: SUCCESS_STORIES.filter((story) => story.course.includes(course.series)).map(
          (story) => `${story.name} (Rank ${story.rank}): ${story.quote}`
        ),
      }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

export function PremiumCourseSelector() {
  const [currentStep, setCurrentStep] = useState<'hero' | 'quiz' | 'recommendations' | 'details'>(
    'hero'
  )
  const [studentProfile, setStudentProfile] = useState<Partial<StudentProfile>>({})
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [quizStep, setQuizStep] = useState(0)

  const quizQuestions = [
    {
      id: 'currentClass',
      title: "What's your current academic stage?",
      subtitle: 'Help us understand your preparation timeline',
      options: [
        { value: 'IX', label: 'Class IX', description: 'Building strong foundations early' },
        { value: 'X', label: 'Class X', description: 'Perfect time to start NEET prep' },
        { value: 'XI', label: 'Class XI', description: 'Critical year for concept building' },
        { value: 'XII', label: 'Class XII', description: 'Final push for NEET success' },
        {
          value: 'Dropper',
          label: 'NEET Dropper',
          description: 'Focused preparation for next attempt',
        },
      ],
    },
    {
      id: 'neetTarget',
      title: "What's your NEET rank goal?",
      subtitle: "Dream big - we'll help you achieve it",
      options: [
        { value: 'top-100', label: 'Top 100', description: 'AIIMS Delhi, PGIMER Chandigarh' },
        { value: 'top-500', label: 'Top 500', description: 'Premium government medical colleges' },
        { value: 'top-2000', label: 'Top 2000', description: 'Good government medical colleges' },
        {
          value: 'qualification',
          label: 'Qualify NEET',
          description: 'Secure admission in medical college',
        },
      ],
    },
    {
      id: 'studyHours',
      title: 'How many hours can you dedicate daily?',
      subtitle: 'Honest assessment helps us recommend the right intensity',
      options: [
        { value: 3, label: '2-3 hours', description: 'Balanced approach with school' },
        { value: 5, label: '4-5 hours', description: 'Serious preparation mode' },
        { value: 7, label: '6-7 hours', description: 'Intensive preparation' },
        { value: 10, label: '8+ hours', description: 'All-in for NEET success' },
      ],
    },
    {
      id: 'budget',
      title: "What's your investment range?",
      subtitle: 'Quality education at every budget level',
      options: [
        { value: 'tight', label: 'Under ₹1 Lakh', description: 'Value-focused preparation' },
        { value: 'moderate', label: '₹1-3 Lakhs', description: 'Balanced features and cost' },
        { value: 'flexible', label: '₹3+ Lakhs', description: 'Premium features and mentoring' },
      ],
    },
  ]

  const handleQuizAnswer = (questionId: string, value: any) => {
    setStudentProfile((prev) => ({ ...prev, [questionId]: value }))

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep((prev) => prev + 1)
    } else {
      // Generate recommendations
      const profile = { ...studentProfile, [questionId]: value } as StudentProfile
      const recs = calculatePersonalizedRecommendations(profile)
      setRecommendations(recs)
      setCurrentStep('recommendations')
    }
  }

  const startQuiz = () => {
    setCurrentStep('quiz')
    setQuizStep(0)
  }

  const resetQuiz = () => {
    setCurrentStep('hero')
    setQuizStep(0)
    setStudentProfile({})
    setRecommendations([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <AnimatePresence mode="wait">
        {currentStep === 'hero' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
          >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

            {/* Hero Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-6 py-2 mb-6">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span className="text-amber-100 text-sm font-medium">
                    94.2% Success Rate • 10,000+ Medical Admissions
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  Your Journey to
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block mt-2">
                    Medical College
                  </span>
                  <span className="text-3xl md:text-4xl text-blue-200 font-normal block mt-4">
                    Starts with the Right Course
                  </span>
                </h1>

                <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                  From AIIMS toppers to dedicated mentors, we've helped 10,000+ students achieve
                  their medical dreams. Let our AI-powered system find your perfect NEET preparation
                  path.
                </p>
              </motion.div>

              {/* Success Highlights */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                {SUCCESS_STORIES.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
                  >
                    <div className="text-4xl mb-3">{story.image}</div>
                    <div className="text-2xl font-bold text-white mb-1">Rank {story.rank}</div>
                    <div className="text-blue-200 text-sm font-medium mb-3">{story.name}</div>
                    <p className="text-slate-300 text-sm italic">"{story.quote}"</p>
                    <div className="text-green-400 text-xs font-medium mt-2">
                      {story.improvement}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <button
                  onClick={startQuiz}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xl font-semibold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <Brain className="h-6 w-6" />
                    Find My Perfect Course
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="text-slate-400 text-sm">
                  <Shield className="inline h-4 w-4 mr-2" />
                  Takes 2 minutes • AI-powered recommendations • No commitment required
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === 'quiz' && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-3xl w-full">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 text-sm">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </span>
                  <button onClick={resetQuiz} className="text-slate-400 hover:text-white text-sm">
                    Start Over
                  </button>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((quizStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <motion.div
                key={quizStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {quizQuestions[quizStep].title}
                  </h2>
                  <p className="text-slate-300">{quizQuestions[quizStep].subtitle}</p>
                </div>

                <div className="grid gap-4">
                  {quizQuestions[quizStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleQuizAnswer(quizQuestions[quizStep].id, option.value)}
                      className="group bg-white/5 hover:bg-white/10 border border-white/20 hover:border-blue-400/50 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold text-lg mb-1">
                            {option.label}
                          </div>
                          <div className="text-slate-300 text-sm">{option.description}</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {currentStep === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12 pt-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full px-6 py-2 mb-6"
                >
                  <Sparkles className="h-5 w-5 text-green-400" />
                  <span className="text-green-100 text-sm font-medium">
                    AI-Powered Personalized Recommendations
                  </span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Your Perfect NEET Path
                </h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Based on your profile, here are the courses that will maximize your chances of
                  medical college success
                </p>
              </div>

              {/* Recommendations */}
              <div className="grid gap-8">
                {recommendations.slice(0, 3).map((rec, index) => (
                  <motion.div
                    key={rec.course.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-gradient-to-br ${
                      index === 0
                        ? 'from-amber-500/20 to-orange-500/20 border-amber-500/30'
                        : 'from-white/10 to-white/5 border-white/20'
                    } border backdrop-blur-sm rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300`}
                  >
                    {index === 0 && (
                      <div className="absolute -top-3 left-8">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-6 py-2 rounded-full">
                          🏆 BEST MATCH
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-8">
                      {/* Course Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-4xl">
                            {rec.course.series === 'Pinnacle'
                              ? '👑'
                              : rec.course.series === 'Ascent'
                                ? '🚀'
                                : '🎯'}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {rec.course.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-blue-200">{rec.course.series} Series</span>
                              <span className="text-green-400">
                                {rec.successProbability.toFixed(0)}% Success Probability
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-white font-semibold mb-3">
                            Why this course is perfect for you:
                          </h4>
                          <ul className="space-y-2">
                            {rec.reasoning.map((reason, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-300">
                                <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {rec.peerStories.length > 0 && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                            <h4 className="text-blue-200 font-semibold mb-2 flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              Success Stories from Similar Students
                            </h4>
                            <p className="text-slate-300 text-sm italic">"{rec.peerStories[0]}"</p>
                          </div>
                        )}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="text-center md:text-right">
                        <div className="mb-6">
                          <div className="text-3xl font-bold text-white mb-1">
                            ₹{(rec.course.currentPrice / 1000).toFixed(0)}K
                          </div>
                          {rec.course.originalPrice > rec.course.currentPrice && (
                            <div className="text-slate-400 line-through text-lg">
                              ₹{(rec.course.originalPrice / 1000).toFixed(0)}K
                            </div>
                          )}
                          <div className="text-green-400 text-sm font-medium">
                            Save ₹
                            {((rec.course.originalPrice - rec.course.currentPrice) / 1000).toFixed(
                              0
                            )}
                            K
                          </div>
                        </div>

                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              setSelectedCourse(rec.course)
                              setCurrentStep('details')
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                          >
                            View Details
                          </button>
                          <button className="w-full border border-white/30 text-white hover:bg-white/10 font-medium px-6 py-3 rounded-xl transition-all duration-300">
                            Calculate EMI
                          </button>
                        </div>

                        <div className="mt-4 text-xs text-slate-400">
                          <div className="flex items-center gap-1 justify-center md:justify-end">
                            <Star className="h-3 w-3 text-yellow-400" />
                            <span>
                              {rec.course.rating || 4.9}/5.0 •{' '}
                              {rec.course.enrollmentCount.toLocaleString()} students
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="text-center mt-12">
                <button
                  onClick={resetQuiz}
                  className="text-blue-300 hover:text-white font-medium px-6 py-2 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  ← Retake Quiz with Different Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
