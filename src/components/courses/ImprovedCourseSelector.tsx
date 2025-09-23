'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Users,
  Clock,
  Target,
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Crown,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

// Types
interface ClassLevel {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  textColor: string
}

interface CoursePlan {
  id: string
  name: string // 'Plan A', 'Plan B', 'Plan C'
  price: number
  duration: string
  features: string[]
  focus: string
  popular?: boolean
}

interface CourseSeries {
  id: string
  name: string // 'Pinnacle', 'Ascent', 'Pursuit'
  description: string
  studentCount: number
  plans: CoursePlan[]
  color: {
    primary: string
    secondary: string
    gradient: string
  }
  badge?: string
  popular?: boolean
}

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: any[]
  intensiveUpgrade?: boolean
}

// Data
const CLASS_LEVELS: ClassLevel[] = [
  {
    id: 'ix',
    name: 'Class IX',
    description: 'Foundation Building Phase',
    icon: <BookOpen className="h-8 w-8" />,
    gradient: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'x',
    name: 'Class X',
    description: 'Board Preparation',
    icon: <Target className="h-8 w-8" />,
    gradient: 'from-green-500 to-emerald-500',
    textColor: 'text-green-600',
  },
  {
    id: 'xi',
    name: 'Class XI',
    description: 'NEET Foundation',
    icon: <TrendingUp className="h-8 w-8" />,
    gradient: 'from-purple-500 to-violet-500',
    textColor: 'text-purple-600',
  },
  {
    id: 'xii',
    name: 'Class XII',
    description: 'NEET Final Preparation',
    icon: <Award className="h-8 w-8" />,
    gradient: 'from-orange-500 to-red-500',
    textColor: 'text-orange-600',
  },
  {
    id: 'dropper',
    name: 'Dropper',
    description: 'Complete NEET Mastery',
    icon: <Crown className="h-8 w-8" />,
    gradient: 'from-yellow-500 to-amber-500',
    textColor: 'text-yellow-600',
  },
]

const COURSE_SERIES: Record<string, CourseSeries[]> = {
  ix: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 45000,
          duration: '12 Months',
          focus: 'Comprehensive Foundation',
          features: [
            'Complete syllabus coverage',
            'Personalized attention',
            'Premium study material',
            'Weekly assessments',
            'Doubt clearing sessions',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 38000,
          duration: '10 Months',
          focus: 'Focused Learning',
          popular: true,
          features: [
            'Core concepts focus',
            'Small batch advantage',
            'Regular practice tests',
            'Individual progress tracking',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 32000,
          duration: '8 Months',
          focus: 'Essential Foundation',
          features: [
            'Key topics coverage',
            'Basic doubt clearing',
            'Study materials included',
            'Monthly assessments',
          ],
        },
      ],
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 35000,
          duration: '12 Months',
          focus: 'Complete Program',
          features: [
            'Full syllabus coverage',
            'Interactive sessions',
            'Regular assessments',
            'Career guidance',
            'Study materials',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 29000,
          duration: '10 Months',
          focus: 'Targeted Learning',
          popular: true,
          features: [
            'Important topics focus',
            'Weekly practice tests',
            'Group discussions',
            'Progress monitoring',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 24000,
          duration: '8 Months',
          focus: 'Foundation Building',
          features: [
            'Basic concept clarity',
            'Essential practice',
            'Study guides provided',
            'Monthly evaluations',
          ],
        },
      ],
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 25000,
          duration: '12 Months',
          focus: 'Value Program',
          features: [
            'Comprehensive curriculum',
            'Group learning',
            'Study materials',
            'Regular tests',
            'Doubt sessions',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 21000,
          duration: '10 Months',
          focus: 'Core Learning',
          popular: true,
          features: ['Important chapters', 'Practice sessions', 'Basic materials', 'Group support'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 18000,
          duration: '8 Months',
          focus: 'Basic Foundation',
          features: ['Key concepts only', 'Limited materials', 'Basic practice', 'Group classes'],
        },
      ],
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  x: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 55000,
          duration: '12 Months',
          focus: 'Board + Foundation',
          features: [
            'Complete dual prep',
            'Personal mentor',
            'Premium materials',
            'Parent meetings',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 47000,
          duration: '10 Months',
          focus: 'Board Focus',
          popular: true,
          features: ['Board exam prep', 'Regular tests', 'Study materials', 'Doubt clearing'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 40000,
          duration: '8 Months',
          focus: 'Essential Board',
          features: ['Key topics', 'Basic preparation', 'Study guides', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 42000,
          duration: '12 Months',
          focus: 'Complete Board Prep',
          features: [
            'Board + NEET foundation',
            'Interactive learning',
            'Mock tests',
            'Career guidance',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 36000,
          duration: '10 Months',
          focus: 'Board Focus',
          popular: true,
          features: [
            'Board exam focus',
            'Regular practice',
            'Study materials',
            'Progress tracking',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 31000,
          duration: '8 Months',
          focus: 'Board Essentials',
          features: ['Core board topics', 'Basic practice', 'Study guides', 'Monthly assessments'],
        },
      ],
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 32000,
          duration: '12 Months',
          focus: 'Board Value Program',
          features: ['Complete syllabus', 'Group learning', 'Study materials', 'Regular tests'],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 27000,
          duration: '10 Months',
          focus: 'Board Core',
          popular: true,
          features: ['Important chapters', 'Group sessions', 'Basic materials', 'Practice tests'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 23000,
          duration: '8 Months',
          focus: 'Board Basics',
          features: ['Key concepts', 'Group classes', 'Basic materials', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  xi: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 98000,
          duration: '12 Months',
          focus: 'NEET + Board Dual',
          features: ['Complete dual prep', 'Personal mentor', 'Weekly tracking', 'Parents app'],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 85000,
          duration: '10 Months',
          focus: 'NEET Focus',
          popular: true,
          features: ['NEET preparation', 'Regular mocks', 'Doubt clearing', 'Study materials'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 75000,
          duration: '8 Months',
          focus: 'Board Focus',
          features: ['Board preparation', 'Basic NEET prep', 'Study guides', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 76000,
          duration: '12 Months',
          focus: 'NEET Focused',
          features: ['NEET curriculum', 'Mock tests', 'Doubt sessions', 'Study materials'],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 68000,
          duration: '10 Months',
          focus: 'NEET Core',
          popular: true,
          features: [
            'Important NEET topics',
            'Regular practice',
            'Group discussions',
            'Progress monitoring',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 62000,
          duration: '8 Months',
          focus: 'NEET Basics',
          features: [
            'Basic NEET prep',
            'Essential practice',
            'Study materials',
            'Monthly evaluations',
          ],
        },
      ],
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 48000,
          duration: '12 Months',
          focus: 'Complete NEET',
          features: ['Full NEET syllabus', 'Weekly tests', 'Digital resources', 'Group study'],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 42000,
          duration: '10 Months',
          focus: 'NEET Core',
          popular: true,
          features: ['Core NEET topics', 'Practice sessions', 'Basic materials', 'Group support'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 38000,
          duration: '8 Months',
          focus: 'NEET Foundation',
          features: ['Basic NEET concepts', 'Group classes', 'Study guides', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  xii: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 98000,
          duration: '12 Months',
          focus: 'NEET Crash Course',
          features: [
            'Intensive NEET prep',
            'Board preparation',
            'Personal coaching',
            '24/7 support',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 85000,
          duration: '10 Months',
          focus: 'NEET Focus',
          popular: true,
          features: ['NEET preparation', 'Board basics', 'Regular assessments', 'Doubt clearing'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 75000,
          duration: '8 Months',
          focus: 'Board Focus',
          features: ['Board preparation', 'NEET foundation', 'Study materials', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 76000,
          duration: '12 Months',
          focus: 'Intensive NEET',
          features: [
            'Complete NEET prep',
            'Board strategy',
            'Regular assessments',
            'Parent updates',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 68000,
          duration: '10 Months',
          focus: 'NEET Core',
          popular: true,
          features: ['NEET focus', 'Board basics', 'Practice tests', 'Progress tracking'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 62000,
          duration: '8 Months',
          focus: 'Board + NEET',
          features: [
            'Balanced preparation',
            'Regular practice',
            'Study materials',
            'Monthly assessments',
          ],
        },
      ],
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 48000,
          duration: '12 Months',
          focus: 'Complete Revision',
          features: ['Full revision', 'Mock tests', 'Quick recap', 'Final preparation'],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 42000,
          duration: '10 Months',
          focus: 'Revision Focus',
          popular: true,
          features: ['Important topics', 'Practice tests', 'Group sessions', 'Basic materials'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 38000,
          duration: '8 Months',
          focus: 'Basic Revision',
          features: ['Key concepts', 'Group classes', 'Study guides', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  dropper: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 125000,
          duration: '12 Months',
          focus: 'Complete NEET Mastery',
          features: [
            'Full NEET mastery',
            'Individual attention',
            'Psychology support',
            'Success guarantee*',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 110000,
          duration: '10 Months',
          focus: 'NEET Excellence',
          popular: true,
          features: [
            'Advanced NEET prep',
            'Personal mentor',
            'Regular assessments',
            'Career guidance',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 95000,
          duration: '8 Months',
          focus: 'NEET Focus',
          features: ['Targeted NEET prep', 'Group mentoring', 'Study materials', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 95000,
          duration: '12 Months',
          focus: 'Full Year Program',
          features: [
            'Complete coverage',
            'Mentorship program',
            'Career counseling',
            'Regular assessments',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 85000,
          duration: '10 Months',
          focus: 'Intensive Program',
          popular: true,
          features: [
            'Focused preparation',
            'Group mentoring',
            'Practice tests',
            'Progress tracking',
          ],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 75000,
          duration: '8 Months',
          focus: 'Core Program',
          features: [
            'Essential topics',
            'Group sessions',
            'Study materials',
            'Monthly evaluations',
          ],
        },
      ],
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      plans: [
        {
          id: 'plan-a',
          name: 'Plan A',
          price: 65000,
          duration: '12 Months',
          focus: 'Complete Preparation',
          features: [
            'Full preparation',
            'Regular practice',
            'Affordable pricing',
            'Group motivation',
          ],
        },
        {
          id: 'plan-b',
          name: 'Plan B',
          price: 58000,
          duration: '10 Months',
          focus: 'Value Program',
          popular: true,
          features: ['Important topics', 'Group sessions', 'Basic materials', 'Practice tests'],
        },
        {
          id: 'plan-c',
          name: 'Plan C',
          price: 52000,
          duration: '8 Months',
          focus: 'Basic Program',
          features: ['Core concepts', 'Group classes', 'Study guides', 'Monthly tests'],
        },
      ],
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
}

interface ImprovedCourseSelectorProps {
  onCourseSelect?: (course: SelectedCourse) => void
  className?: string
}

export function ImprovedCourseSelector({
  onCourseSelect,
  className = '',
}: ImprovedCourseSelectorProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedSeries, setSelectedSeries] = useState<string>('')
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const steps = ['Class', 'Course & Plan']

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId)
    setSelectedSeries('')
    setSelectedPlan('')
    setCurrentStep(1)
  }

  const handleSeriesAndPlanSelect = (seriesId: string, planId: string) => {
    setSelectedSeries(seriesId)
    setSelectedPlan(planId)
  }

  const handleFinalize = () => {
    const finalSelection: SelectedCourse = {
      classLevel: selectedClass,
      series: selectedSeries,
      plan: selectedPlan,
      testSeries: [],
    }

    onCourseSelect?.(finalSelection)
  }

  const getCurrentPrice = () => {
    if (!selectedClass || !selectedSeries || !selectedPlan) return 0

    const series = COURSE_SERIES[selectedClass]?.find((s) => s.id === selectedSeries)
    if (!series) return 0

    const plan = series.plans.find((p) => p.id === selectedPlan)
    if (!plan) return 0

    return plan.price
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Progress Bar - matching basic selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight
                  className={`w-4 h-4 mx-4 ${
                    index < currentStep ? 'text-blue-500' : 'text-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[500px]"
        >
          {/* Step 0: Class Selection - exactly like basic selector */}
          {currentStep === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Class</h2>
                <p className="text-lg text-gray-600">
                  Choose your current academic level to see personalized course options
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLASS_LEVELS.map((classLevel) => (
                  <motion.div
                    key={classLevel.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleClassSelect(classLevel.id)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${classLevel.gradient} flex items-center justify-center text-white mb-4 mx-auto`}
                    >
                      {classLevel.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${classLevel.textColor} text-center mb-2`}>
                      {classLevel.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">{classLevel.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Individual Series Cards with Plan A/B/C INSIDE each card */}
          {currentStep === 1 && selectedClass && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Course & Plan</h2>
                <p className="text-lg text-gray-600">
                  Select your preferred series and plan combination
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {COURSE_SERIES[selectedClass]?.map((series) => (
                  <div
                    key={series.id}
                    className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Course Header */}
                    <div className="text-center mb-8">
                      {/* Target Icon */}
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-8 h-8 text-red-500" />
                      </div>

                      {/* Badges */}
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                          Class {selectedClass?.toUpperCase()}
                        </span>
                        {series.popular && (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            ⭐ Popular
                          </span>
                        )}
                      </div>

                      {/* Course Title */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Class {selectedClass?.toUpperCase()} {series.name}
                        <br />
                        Comprehensive
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Complete NEET preparation for Class {selectedClass?.toUpperCase()} students.
                        {series.name === 'pinnacle' &&
                          ' Covers entire syllabus with intensive practice and conceptual mastery.'}
                        {series.name === 'ascent' &&
                          ' Balanced approach with comprehensive coverage and regular assessments.'}
                        {series.name === 'pursuit' &&
                          ' Value-focused program with essential topics and group learning.'}
                      </p>
                    </div>

                    {/* Course Metrics */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                        <div className="text-sm text-gray-600">years</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">12h</div>
                        <div className="text-sm text-gray-600">Per Week</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">
                          {series.studentCount}
                        </div>
                        <div className="text-sm text-gray-600">Batch</div>
                        <div className="text-xs text-gray-500">Size</div>
                      </div>
                    </div>

                    {/* NEET Focused Badge */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        NEET Focused
                      </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        Choose Your Plan
                      </h4>
                      <div className="space-y-3">
                        {series.plans.map((plan) => (
                          <motion.div
                            key={`${series.id}-${plan.id}`}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSeriesAndPlanSelect(series.id, plan.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                              selectedSeries === series.id && selectedPlan === plan.id
                                ? 'border-green-500 bg-green-50 ring-2 ring-green-500/20'
                                : plan.popular
                                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                                  : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                            }`}
                          >
                            {plan.popular && (
                              <div className="absolute -top-2 left-4">
                                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                  Popular
                                </span>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div>
                                <h5 className="font-bold text-gray-900">{plan.name}</h5>
                                <p className="text-sm text-gray-600">{plan.focus}</p>
                                <p className="text-xs text-gray-500">{plan.duration}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold text-gray-900">
                                  ₹{plan.price.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">per year</div>
                              </div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 gap-1">
                              {plan.features.slice(0, 2).map((feature, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-xs text-gray-600"
                                >
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <h5 className="font-semibold text-gray-900">Performance Metrics</h5>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Success Rate:</span>
                          <span className="font-semibold text-gray-900">
                            {series.name === 'pinnacle'
                              ? '96%'
                              : series.name === 'ascent'
                                ? '92%'
                                : '88%'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">NEET Qualify:</span>
                          <span className="font-semibold text-gray-900">
                            {series.name === 'pinnacle'
                              ? '98%'
                              : series.name === 'ascent'
                                ? '94%'
                                : '90%'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg. Score:</span>
                          <span className="font-semibold text-gray-900">
                            {series.name === 'pinnacle'
                              ? '580+'
                              : series.name === 'ascent'
                                ? '560+'
                                : '540+'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation & Summary - matching basic selector */}
      <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            )}
          </div>

          {/* Price Summary */}
          <div className="flex items-center space-x-6">
            {selectedClass && selectedSeries && selectedPlan && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{getCurrentPrice().toLocaleString()}
                </div>
              </div>
            )}

            {selectedClass && selectedSeries && selectedPlan ? (
              <button
                onClick={handleFinalize}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Enroll Now
              </button>
            ) : currentStep === 0 ? (
              <div className="text-gray-500 text-sm">Select a class to continue</div>
            ) : (
              <div className="text-gray-500 text-sm">Select a course and plan to continue</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
