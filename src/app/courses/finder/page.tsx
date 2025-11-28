'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Target,
  Clock,
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Users,
  Video,
  FileText,
  MessageCircle,
  Star,
  IndianRupee,
} from 'lucide-react'

type Step = 1 | 2 | 3 | 4

interface CourseRecommendation {
  name: string
  slug: string
  match: number
  price: string
  duration: string
  features: string[]
  ideal: string
}

export default function CourseFinderPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [answers, setAnswers] = useState({
    currentClass: '',
    targetYear: '',
    studyHours: '',
    budget: '',
  })
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (field: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  const resetFinder = () => {
    setAnswers({
      currentClass: '',
      targetYear: '',
      studyHours: '',
      budget: '',
    })
    setCurrentStep(1)
    setShowResults(false)
  }

  const getRecommendations = (): CourseRecommendation[] => {
    const recommendations: CourseRecommendation[] = []

    if (answers.currentClass === '11' || answers.currentClass === '12') {
      if (answers.studyHours === 'full-time') {
        recommendations.push({
          name: 'NEET Dropper Batch - Intensive',
          slug: 'dropper-batch',
          match: 98,
          price: '₹45,000',
          duration: '12 Months',
          features: [
            'Daily 6-hour live classes',
            'Complete syllabus coverage',
            'Weekly tests & analysis',
            'Personal mentor assigned',
          ],
          ideal: 'Students who can dedicate full time to NEET preparation',
        })
      }
      recommendations.push({
        name: 'NEET Foundation Course',
        slug: 'foundation-course',
        match: answers.studyHours === 'part-time' ? 95 : 85,
        price: '₹25,000',
        duration: '18 Months',
        features: [
          'Weekend batches available',
          'Board + NEET integrated',
          'Recorded lectures access',
          'Doubt clearing sessions',
        ],
        ideal: 'Class 11-12 students balancing school and NEET prep',
      })
    }

    if (answers.currentClass === 'dropper') {
      recommendations.push({
        name: 'NEET Dropper Batch - Premium',
        slug: 'dropper-batch',
        match: 99,
        price: '₹55,000',
        duration: '12 Months',
        features: [
          'Intensive daily classes',
          'All India test series',
          '1-on-1 mentorship',
          'Hostel facility available',
        ],
        ideal: 'Droppers aiming for top medical colleges',
      })
    }

    if (answers.budget === 'low' || answers.budget === 'medium') {
      recommendations.push({
        name: 'NEET Biology Crash Course',
        slug: 'crash-course',
        match: answers.targetYear === 'this-year' ? 90 : 75,
        price: '₹15,000',
        duration: '3 Months',
        features: [
          'High-yield topics focus',
          'Quick revision material',
          'Previous year questions',
          'Mock test series',
        ],
        ideal: 'Last-minute preparation and revision',
      })
    }

    recommendations.push({
      name: 'NEET Biology Test Series',
      slug: 'test-series',
      match: 80,
      price: '₹5,000',
      duration: '6 Months',
      features: [
        '50+ chapter tests',
        '20 full mock tests',
        'Detailed analytics',
        'All India ranking',
      ],
      ideal: 'Students who want to test their preparation level',
    })

    return recommendations.sort((a, b) => b.match - a.match).slice(0, 3)
  }

  const stats = [
    { icon: Users, value: '5,000+', label: 'Students Guided' },
    { icon: Star, value: '95%', label: 'Satisfaction Rate' },
    { icon: GraduationCap, value: '2,500+', label: 'NEET Qualifiers' },
    { icon: Target, value: '650+', label: 'Avg Score Improvement' },
  ]

  const features = [
    {
      icon: Search,
      title: 'Personalized Matching',
      description:
        'Our algorithm considers your goals, schedule, and budget to find the perfect course',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Recommendations based on your target NEET year and score expectations',
    },
    {
      icon: Clock,
      title: 'Time-Flexible',
      description: 'Options for every schedule - full-time, part-time, or weekend batches',
    },
    {
      icon: IndianRupee,
      title: 'Budget-Friendly',
      description: 'Courses across different price points with EMI options available',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              AI-Powered Course Recommendations
            </div>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Find Your Perfect
              <span className="block text-emerald-300">NEET Course</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-emerald-100">
              Answer a few questions and let us recommend the best course for your NEET preparation
              journey. Personalized recommendations based on your goals and preferences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-lg"
              >
                <stat.icon className="mx-auto mb-3 h-8 w-8 text-emerald-600" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Finder Tool */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {!showResults ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-sm text-gray-600">
                  <span>Step {currentStep} of 4</span>
                  <span>{Math.round((currentStep / 4) * 100)}% Complete</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-emerald-600 transition-all duration-300"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Current Class */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <BookOpen className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      What is your current academic status?
                    </h2>
                    <p className="text-gray-600">
                      This helps us understand your preparation timeline
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { value: '11', label: 'Class 11', desc: 'Starting NEET journey early' },
                      { value: '12', label: 'Class 12', desc: 'Balancing boards and NEET' },
                      {
                        value: 'dropper',
                        label: 'Dropper / Repeater',
                        desc: 'Full-time NEET preparation',
                      },
                      {
                        value: 'other',
                        label: 'Working Professional',
                        desc: 'Career change to medicine',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer('currentClass', option.value)}
                        className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                          answers.currentClass === option.value
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                        {answers.currentClass === option.value && (
                          <CheckCircle className="h-6 w-6 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Target Year */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Target className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      When are you planning to appear for NEET?
                    </h2>
                    <p className="text-gray-600">
                      We&apos;ll recommend courses matching your timeline
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { value: 'this-year', label: 'NEET 2025', desc: 'Appearing in May 2025' },
                      { value: 'next-year', label: 'NEET 2026', desc: 'Appearing in May 2026' },
                      { value: 'two-years', label: 'NEET 2027', desc: 'Long-term preparation' },
                      {
                        value: 'undecided',
                        label: 'Not Sure Yet',
                        desc: 'Still exploring options',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer('targetYear', option.value)}
                        className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                          answers.targetYear === option.value
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                        {answers.targetYear === option.value && (
                          <CheckCircle className="h-6 w-6 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Study Hours */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <Clock className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      How much time can you dedicate daily?
                    </h2>
                    <p className="text-gray-600">
                      This helps us find courses matching your schedule
                    </p>
                  </div>
                  <div className="grid gap-4">
                    {[
                      {
                        value: 'full-time',
                        label: '6+ Hours Daily',
                        desc: 'Full-time dedication to NEET',
                      },
                      {
                        value: 'part-time',
                        label: '3-5 Hours Daily',
                        desc: 'Balancing with school/work',
                      },
                      {
                        value: 'weekend',
                        label: 'Weekends Only',
                        desc: 'Limited weekday availability',
                      },
                      {
                        value: 'flexible',
                        label: 'Self-Paced',
                        desc: 'Irregular schedule, need flexibility',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer('studyHours', option.value)}
                        className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                          answers.studyHours === option.value
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                        {answers.studyHours === option.value && (
                          <CheckCircle className="h-6 w-6 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Budget */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <IndianRupee className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      What is your budget for the course?
                    </h2>
                    <p className="text-gray-600">EMI options available on all courses</p>
                  </div>
                  <div className="grid gap-4">
                    {[
                      { value: 'low', label: 'Under ₹15,000', desc: 'Budget-friendly options' },
                      {
                        value: 'medium',
                        label: '₹15,000 - ₹30,000',
                        desc: 'Mid-range comprehensive courses',
                      },
                      {
                        value: 'high',
                        label: '₹30,000 - ₹50,000',
                        desc: 'Premium courses with extras',
                      },
                      {
                        value: 'premium',
                        label: 'Above ₹50,000',
                        desc: 'All-inclusive premium programs',
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer('budget', option.value)}
                        className={`flex items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                          answers.budget === option.value
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.desc}</div>
                        </div>
                        {answers.budget === option.value && (
                          <CheckCircle className="h-6 w-6 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                    currentStep === 1
                      ? 'cursor-not-allowed text-gray-400'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !answers.currentClass) ||
                    (currentStep === 2 && !answers.targetYear) ||
                    (currentStep === 3 && !answers.studyHours) ||
                    (currentStep === 4 && !answers.budget)
                  }
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {currentStep === 4 ? 'Get Recommendations' : 'Next'}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Sparkles className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Your Personalized Recommendations
                </h2>
                <p className="text-gray-600">
                  Based on your preferences, here are the best courses for you
                </p>
              </div>

              <div className="space-y-4">
                {getRecommendations().map((course, index) => (
                  <div
                    key={index}
                    className={`rounded-2xl border-2 bg-white p-6 shadow-lg transition-all hover:shadow-xl ${
                      index === 0 ? 'border-emerald-500' : 'border-gray-100'
                    }`}
                  >
                    {index === 0 && (
                      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                        <Star className="h-4 w-4" />
                        Best Match
                      </div>
                    )}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                        <p className="text-sm text-gray-600">{course.ideal}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">{course.match}%</div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>
                    <div className="mb-4 flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {course.price}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </span>
                    </div>
                    <ul className="mb-4 grid grid-cols-2 gap-2">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition-all hover:bg-emerald-700"
                    >
                      View Course Details
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={resetFinder}
                  className="text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why Use Course Finder */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Use Our Course Finder?</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Making the right choice is crucial for your NEET success. Our intelligent course
              finder ensures you get personalized recommendations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-center"
              >
                <feature.icon className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Explore our different course categories designed for various preparation needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Video,
                title: 'Live Classes',
                courses: 4,
                desc: 'Interactive sessions with expert faculty',
                href: '/courses',
              },
              {
                icon: FileText,
                title: 'Test Series',
                courses: 3,
                desc: 'Chapter-wise and full mock tests',
                href: '/courses',
              },
              {
                icon: MessageCircle,
                title: 'Doubt Clearing',
                courses: 2,
                desc: '24/7 doubt resolution support',
                href: '/services/doubt-resolution',
              },
              {
                icon: BookOpen,
                title: 'Study Material',
                courses: 5,
                desc: 'Comprehensive notes and resources',
                href: '/resources',
              },
              {
                icon: GraduationCap,
                title: 'Crash Courses',
                courses: 2,
                desc: 'Last-minute revision programs',
                href: '/courses',
              },
              {
                icon: Users,
                title: 'Mentorship',
                courses: 3,
                desc: '1-on-1 guidance from toppers',
                href: '/services/mentorship',
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-emerald-300 hover:shadow-lg"
              >
                <div className="rounded-lg bg-emerald-100 p-3">
                  <category.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-gray-900 group-hover:text-emerald-600">
                    {category.title}
                  </h3>
                  <p className="mb-2 text-sm text-gray-600">{category.desc}</p>
                  <span className="text-xs text-emerald-600">{category.courses} Courses</span>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">Need Help Choosing?</h2>
          <p className="mb-8 text-lg text-emerald-100">
            Our academic counselors are here to guide you. Book a free consultation and get
            personalized course recommendations.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-emerald-600 transition-all hover:bg-gray-100"
            >
              <MessageCircle className="h-5 w-5" />
              Talk to a Counselor
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-emerald-600"
            >
              Browse All Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
