'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  GraduationCap,
  Clock,
  Trophy,
  Users,
  Star,
  CheckCircle2,
  ChevronRight,
  Play,
  Phone,
  MessageSquare,
  BookOpen,
  FlaskConical,
  BarChart2,
  Heart,
} from 'lucide-react'
import { getPlaceholderAvatar } from '@/lib/images/imageUtils'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ExploratoryFlowProps {
  onCounselingBook?: () => void
  className?: string
}

interface Course {
  id: string
  name: string
  type: 'foundation' | 'class11' | 'class12' | 'dropper'
  duration: string
  price: number
  originalPrice: number
  features: string[]
  highlights: string[]
  successRate: number
  studentsEnrolled: number
  batchSize: number
  faculty: string
  rating: number
  description: string
}

interface SuccessStory {
  id: string
  name: string
  score: string
  college: string
  course: string
  year: string
  image: string
  videoUrl?: string
  story: string
  beforeScore: string
  improvement: string
  testimonial: string
}

export function ExploratoryFlow({ onCounselingBook, className = '' }: ExploratoryFlowProps) {
  const [currentStep, setCurrentStep] = useState<'explore' | 'compare' | 'stories' | 'counseling'>(
    'explore'
  )
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [progressTracking, setProgressTracking] = useState({
    timeSpent: 0,
    pagesViewed: ['landing'],
    interactionScore: 0,
  })

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressTracking((prev) => ({
        ...prev,
        timeSpent: prev.timeSpent + 1,
      }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const courses: Course[] = [
    {
      id: 'foundation',
      name: 'Foundation Excellence Program',
      type: 'foundation',
      duration: '2 Years',
      price: 45000,
      originalPrice: 60000,
      features: ['NCERT Mastery', 'Concept Building', 'Regular Assessments', 'Doubt Clearing'],
      highlights: ['Build Strong Base', 'Early NEET Prep', 'Stress-Free Learning'],
      successRate: 96.5,
      studentsEnrolled: 850,
      batchSize: 25,
      faculty: 'Dr. Priya Sharma',
      rating: 4.9,
      description: 'Perfect foundation for Class 9-10 students starting their NEET journey early.',
    },
    {
      id: 'class11',
      name: 'Class 11 NEET Mastery',
      type: 'class11',
      duration: '2 Years',
      price: 65000,
      originalPrice: 85000,
      features: ['Complete NCERT', 'Advanced Problems', 'Mock Tests', 'Personal Mentoring'],
      highlights: ['Comprehensive Coverage', 'Expert Faculty', 'Proven Methods'],
      successRate: 94.8,
      studentsEnrolled: 1200,
      batchSize: 30,
      faculty: 'Dr. Rajesh Kumar',
      rating: 4.8,
      description:
        'Comprehensive NEET preparation starting from Class 11 with advanced problem solving.',
    },
    {
      id: 'class12',
      name: 'Class 12 Final Sprint',
      type: 'class12',
      duration: '1 Year',
      price: 75000,
      originalPrice: 95000,
      features: ['Intensive Revision', 'Previous Years', 'Exam Strategy', 'Last Mile Prep'],
      highlights: ['Final Year Focus', 'Exam Ready', 'Score Maximization'],
      successRate: 92.3,
      studentsEnrolled: 950,
      batchSize: 35,
      faculty: 'Dr. Anjali Mehta',
      rating: 4.7,
      description:
        'Intensive final year preparation with focus on exam strategy and score maximization.',
    },
    {
      id: 'dropper',
      name: 'Dropper Success Intensive',
      type: 'dropper',
      duration: '1 Year',
      price: 85000,
      originalPrice: 110000,
      features: [
        'Complete Restart',
        'Weakness Analysis',
        'Confidence Building',
        'Success Guarantee',
      ],
      highlights: ['Second Chance Success', 'Proven Track Record', 'Mental Support'],
      successRate: 89.7,
      studentsEnrolled: 750,
      batchSize: 20,
      faculty: 'Dr. Vikram Singh',
      rating: 4.6,
      description:
        'Specialized program for droppers with focus on rebuilding confidence and achieving success.',
    },
  ]

  const successStories: SuccessStory[] = [
    {
      id: 'arjun',
      name: 'Arjun Patel',
      score: '358/360',
      college: 'AIIMS Delhi',
      course: 'Dropper Success Intensive',
      year: '2024',
      image: getPlaceholderAvatar('Arjun Patel', 120, '4F46E5', 'fff'),
      videoUrl: 'https://youtube.com/watch?v=example1',
      beforeScore: '245/360',
      improvement: '+113 points',
      story:
        'Failed NEET twice before joining Cerebrum. The personalized attention and structured approach helped me identify my weaknesses and work on them systematically.',
      testimonial:
        'Cerebrum gave me my second chance. The faculty understood my struggles and helped me rebuild my confidence.',
    },
    {
      id: 'priya',
      name: 'Priya Sharma',
      score: '342/360',
      college: 'JIPMER',
      course: 'Class 12 Final Sprint',
      year: '2024',
      image: getPlaceholderAvatar('Priya Sharma', 120, '059669', 'fff'),
      videoUrl: 'https://youtube.com/watch?v=example2',
      beforeScore: '280/360',
      improvement: '+62 points',
      story:
        'Joined in my final year when I was scoring around 280. The intensive revision and exam strategy sessions helped me crack JIPMER.',
      testimonial:
        'The final sprint program was exactly what I needed. Focused preparation with expert guidance.',
    },
    {
      id: 'rohit',
      name: 'Rohit Kumar',
      score: '355/360',
      college: 'AIIMS Rishikesh',
      course: 'Class 11 NEET Mastery',
      year: '2024',
      image: getPlaceholderAvatar('Rohit Kumar', 120, '7C3AED', 'fff'),
      videoUrl: 'https://youtube.com/watch?v=example3',
      beforeScore: '190/360',
      improvement: '+165 points',
      story:
        'Started with very weak basics in Class 11. The two-year comprehensive program helped me build strong fundamentals and achieve my dream.',
      testimonial:
        'Best decision of my life. The faculty made Biology so interesting and easy to understand.',
    },
  ]

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : prev.length < 3
          ? [...prev, courseId]
          : prev
    )

    setProgressTracking((prev) => ({
      ...prev,
      interactionScore: prev.interactionScore + 5,
    }))
  }

  const handleStepNavigation = (step: typeof currentStep) => {
    setCurrentStep(step)
    setProgressTracking((prev) => ({
      ...prev,
      pagesViewed: [...new Set([...prev.pagesViewed, step])],
      interactionScore: prev.interactionScore + 10,
    }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (currentStep === 'explore') {
    return (
      <div
        className={`min-h-screen bg-gray-50 py-12 ${className}`}
      >
        {/* Progress Tracker - hidden on mobile */}
        <div className="hidden sm:block fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Time: {formatTime(progressTracking.timeSpent)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (progressTracking.timeSpent / 600) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Step 1 of 4: Exploring Courses</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Explore Our NEET Biology Courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Take your time to explore our comprehensive programs. Each course is designed for
              specific student needs and goals.
            </motion.p>
          </div>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleCourseToggle(course.id)}
                className="cursor-pointer"
              >
                <PremiumCard
                  variant="luxury"
                  className={`h-full transition-all duration-300 ${
                    selectedCourses.includes(course.id)
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    {/* Course Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.batchSize} students/batch
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">
                          ₹{course.originalPrice.toLocaleString()}
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                          ₹{course.price.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          <AnimatedCounter value={course.successRate} suffix="%" />
                        </div>
                        <div className="text-xs text-gray-500">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          <AnimatedCounter value={course.studentsEnrolled} />
                        </div>
                        <div className="text-xs text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">{course.rating}/5</div>
                      </div>
                    </div>

                    {/* Course Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>

                    {/* Course Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-900">Key Features:</div>
                      <div className="grid grid-cols-2 gap-1">
                        {course.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {course.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Faculty */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <GraduationCap className="h-4 w-4" />
                      <span>
                        Faculty: <span className="font-semibold">{course.faculty}</span>
                      </span>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {selectedCourses.length > 0 && (
                <span>
                  {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected
                  for comparison
                </span>
              )}
            </div>
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={() => handleStepNavigation('compare')}
              disabled={selectedCourses.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Compare Selected Courses
              <ChevronRight className="h-5 w-5" />
            </PremiumButton>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'compare') {
    const selectedCourseData = courses.filter((course) => selectedCourses.includes(course.id))

    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 ${className}`}
      >
        {/* Progress Tracker - hidden on mobile */}
        <div className="hidden sm:block fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-green-600" />
            <span>Time: {formatTime(progressTracking.timeSpent)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (progressTracking.timeSpent / 600) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Step 2 of 4: Comparing Courses</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Course Comparison
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Compare features, pricing, and outcomes side by side
            </motion.p>
          </div>

          {/* Comparison Table */}
          <PremiumCard variant="luxury" className="overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                    {selectedCourseData.map((course) => (
                      <th
                        key={course.id}
                        className="text-center p-4 font-semibold text-gray-900 min-w-48"
                      >
                        {course.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Duration</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        {course.duration}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Pricing</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        <div className="space-y-1">
                          <div className="text-lg font-bold text-green-600">
                            ₹{course.price.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            ₹{course.originalPrice.toLocaleString()}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Success Rate</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        <div className="text-lg font-bold text-blue-600">{course.successRate}%</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Batch Size</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        {course.batchSize} students
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Faculty</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        {course.faculty}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-gray-900">Rating</td>
                    {selectedCourseData.map((course) => (
                      <td key={course.id} className="p-4 text-center">
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{course.rating}/5</div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </PremiumCard>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <PremiumButton
              variant="luxury"
              size="lg"
              onClick={() => handleStepNavigation('explore')}
              className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ← Back to Courses
            </PremiumButton>
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={() => handleStepNavigation('stories')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              Read Success Stories
              <ChevronRight className="h-5 w-5" />
            </PremiumButton>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'stories') {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 ${className}`}
      >
        {/* Progress Tracker - hidden on mobile */}
        <div className="hidden sm:block fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <span>Time: {formatTime(progressTracking.timeSpent)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (progressTracking.timeSpent / 600) * 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">Step 3 of 4: Reading Success Stories</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Real Success Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              See how our students transformed their dreams into reality
            </motion.p>
          </div>

          {/* Success Stories */}
          <div className="space-y-8 mb-12">
            {successStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <PremiumCard variant="luxury" className="overflow-hidden">
                  <div className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left: Photo & Basic Info */}
                      <div className="text-center space-y-4">
                        <img
                          src={story.image}
                          alt={story.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-green-200"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{story.name}</h3>
                          <div className="text-2xl font-bold text-green-600">{story.score}</div>
                          <div className="text-lg text-blue-600">{story.college}</div>
                          <div className="text-sm text-gray-600">{story.year}</div>
                        </div>

                        {/* Improvement Stats */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                          <div className="text-sm font-semibold text-gray-900 mb-2">
                            Score Improvement
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Before:</span>
                              <span className="text-red-600">{story.beforeScore}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>After:</span>
                              <span className="text-green-600">{story.score}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold">
                              <span>Improvement:</span>
                              <span className="text-blue-600">{story.improvement}</span>
                            </div>
                          </div>
                        </div>

                        {/* Video CTA */}
                        {story.videoUrl && (
                          <button className="w-full bg-red-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-700 transition-colors">
                            <Play className="h-5 w-5" />
                            Watch Video Story
                          </button>
                        )}
                      </div>

                      {/* Right: Story Content */}
                      <div className="lg:col-span-2 space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Course Taken</h4>
                          <div className="bg-blue-50 rounded-lg p-3 text-blue-800">
                            {story.course}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Journey</h4>
                          <p className="text-gray-700 leading-relaxed">{story.story}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">Testimonial</h4>
                          <blockquote className="text-gray-700 italic">
                            "{story.testimonial}"
                          </blockquote>
                        </div>

                        {/* Achievement Badges */}
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <Trophy className="h-3 w-3" />
                            NEET Qualified
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            Medical College
                          </span>
                          <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            Dream Achieved
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </PremiumCard>
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <PremiumButton
              variant="luxury"
              size="lg"
              onClick={() => handleStepNavigation('compare')}
              className="bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ← Back to Comparison
            </PremiumButton>
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={() => handleStepNavigation('counseling')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Book Free Counseling
              <ChevronRight className="h-5 w-5" />
            </PremiumButton>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 'counseling') {
    return (
      <div
        className={`min-h-screen bg-orange-50 py-12 ${className}`}
      >
        {/* Progress Tracker - hidden on mobile */}
        <div className="hidden sm:block fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 text-sm">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Journey Complete: {formatTime(progressTracking.timeSpent)}</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div className="bg-green-600 h-2 rounded-full w-full" />
          </div>
          <div className="text-xs text-gray-500 mt-1">Step 4 of 4: Booking Counseling</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Ready to Start Your Journey?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600"
            >
              Book a free counseling session to discuss your personalized NEET preparation plan
            </motion.p>
          </div>

          {/* Counseling Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <PremiumCard variant="luxury" className="text-center p-8">
              <Phone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Phone Counseling</h3>
              <p className="text-gray-600 mb-6">
                Speak directly with our expert counselors. Get immediate answers to all your
                questions.
              </p>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Available: Mon-Sat, 9 AM - 8 PM</div>
                <PremiumButton
                  variant="medical"
                  size="lg"
                  onClick={() => window.open('tel:+918826444334', '_self')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  Call Now: +91 88264 44334
                </PremiumButton>
              </div>
            </PremiumCard>

            <PremiumCard variant="luxury" className="text-center p-8">
              <MessageSquare className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp Consultation</h3>
              <p className="text-gray-600 mb-6">
                Chat with our counselors on WhatsApp. Share documents and get personalized advice.
              </p>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">Response within 5 minutes</div>
                <PremiumButton
                  variant="medical"
                  size="lg"
                  onClick={async () => {
                    const message = `Hi! I've explored your courses and read success stories. I'd like to book a counseling session to discuss my NEET preparation plan.

Journey Summary:
- Time spent exploring: ${formatTime(progressTracking.timeSpent)}
- Courses viewed: ${selectedCourses.length > 0 ? selectedCourses.join(', ') : 'All courses'}
- Pages visited: ${progressTracking.pagesViewed.join(', ')}

Please help me choose the right course and enrollment process.`
                    await trackAndOpenWhatsApp({
                      source: 'exploratory-flow-counseling',
                      message,
                      campaign: 'exploratory-flow',
                    })
                  }}
                  className="w-full bg-[#4a5d4a] hover:from-green-700 hover:to-green-800 text-white"
                >
                  Chat on WhatsApp
                </PremiumButton>
              </div>
            </PremiumCard>
          </div>

          {/* Journey Summary */}
          <PremiumCard variant="luxury" className="p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Exploration Summary</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {formatTime(progressTracking.timeSpent)}
                </div>
                <div className="text-sm text-gray-600">Time Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {progressTracking.pagesViewed.length}
                </div>
                <div className="text-sm text-gray-600">Sections Explored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {progressTracking.interactionScore}
                </div>
                <div className="text-sm text-gray-600">Engagement Score</div>
              </div>
            </div>
          </PremiumCard>

          {/* Next Steps */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What Happens After Counseling?</h3>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: '1', title: 'Course Selection', desc: 'Choose your perfect course' },
                { step: '2', title: 'Fee Structure', desc: 'Transparent pricing discussion' },
                { step: '3', title: 'Schedule Planning', desc: 'Custom study timeline' },
                { step: '4', title: 'Enrollment', desc: 'Secure your seat' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                    {item.step}
                  </div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
