'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Calendar,
  Award,
  BarChart3,
  Lightbulb,
} from 'lucide-react'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'

interface LearningPath {
  id: string
  name: string
  description: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  modules: LearningModule[]
  prerequisites?: string[]
  outcomes: string[]
  estimatedScore: number
  successRate: number
  priority: number
}

interface LearningModule {
  id: string
  name: string
  type: 'concept' | 'practice' | 'test' | 'revision'
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
  topics: string[]
  isCompleted?: boolean
  score?: number
}

interface StudyPlan {
  weeklyHours: number
  dailySchedule: {
    [key: string]: StudySession[]
  }
  milestones: Milestone[]
  adaptiveRecommendations: string[]
}

interface StudySession {
  time: string
  subject: string
  topic: string
  type: 'concept' | 'practice' | 'test' | 'revision'
  duration: number
}

interface Milestone {
  week: number
  goal: string
  target: string
  importance: 'high' | 'medium' | 'low'
}

export function AdaptiveLearningPaths() {
  const { preferences, updatePreferences, trackBehavior } = usePersonalization()
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null)
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null)
  const [currentStep, setCurrentStep] = useState<'assessment' | 'paths' | 'plan' | 'schedule'>(
    'assessment'
  )

  useEffect(() => {
    if (preferences.currentClass && preferences.targetExam) {
      generateLearningPaths()
    }
  }, [preferences])

  const generateLearningPaths = (): LearningPath[] => {
    const paths: LearningPath[] = []

    // Foundation Path (for beginners or weak concepts)
    if (!preferences.currentScore || preferences.currentScore < 200) {
      paths.push({
        id: 'foundation-builder',
        name: 'Foundation Builder Path',
        description:
          'Perfect for students starting their NEET journey or those who need to strengthen basic concepts',
        duration: '8-10 months',
        difficulty: 'beginner',
        modules: [
          {
            id: 'bio-basics',
            name: 'Biology Fundamentals',
            type: 'concept',
            duration: '4 weeks',
            difficulty: 'easy',
            topics: ['Cell Structure', 'Biomolecules', 'Cell Division'],
          },
          {
            id: 'plant-bio',
            name: 'Plant Biology',
            type: 'concept',
            duration: '6 weeks',
            difficulty: 'medium',
            topics: ['Morphology', 'Anatomy', 'Physiology'],
          },
          {
            id: 'animal-bio',
            name: 'Animal Biology',
            type: 'concept',
            duration: '8 weeks',
            difficulty: 'medium',
            topics: ['Digestion', 'Circulation', 'Coordination'],
          },
        ],
        outcomes: ['Strong conceptual foundation', '200+ score target', 'Board exam readiness'],
        estimatedScore: 250,
        successRate: 89,
        priority: 1,
      })
    }

    // Accelerated Path (for good students)
    if (preferences.currentScore && preferences.currentScore >= 200) {
      paths.push({
        id: 'accelerated-mastery',
        name: 'Accelerated Mastery Path',
        description: 'For students with good basics who want to achieve top scores quickly',
        duration: '6-8 months',
        difficulty: 'intermediate',
        modules: [
          {
            id: 'advanced-concepts',
            name: 'Advanced Concepts',
            type: 'concept',
            duration: '3 weeks',
            difficulty: 'medium',
            topics: ['Genetics', 'Evolution', 'Ecology'],
          },
          {
            id: 'application-practice',
            name: 'Application & Practice',
            type: 'practice',
            duration: '4 weeks',
            difficulty: 'hard',
            topics: ['Problem Solving', 'Case Studies', 'NEET Patterns'],
          },
        ],
        outcomes: [
          '320+ score target',
          'Top medical college selection',
          'Advanced problem solving',
        ],
        estimatedScore: 330,
        successRate: 94,
        priority: 2,
      })
    }

    // Intensive Path (for droppers or urgent preparation)
    if (preferences.currentClass === 'dropper' || preferences.startDate === 'immediate') {
      paths.push({
        id: 'intensive-crash',
        name: 'Intensive Crash Path',
        description: 'High-intensity preparation for immediate NEET aspirants',
        duration: '4-6 months',
        difficulty: 'advanced',
        modules: [
          {
            id: 'rapid-revision',
            name: 'Rapid Concept Revision',
            type: 'revision',
            duration: '2 weeks',
            difficulty: 'hard',
            topics: ['All NCERT Topics', 'High-yield Areas'],
          },
          {
            id: 'intensive-practice',
            name: 'Intensive Practice',
            type: 'practice',
            duration: '8 weeks',
            difficulty: 'hard',
            topics: ['Mock Tests', 'Previous Years', 'Speed Building'],
          },
        ],
        outcomes: ['Rapid score improvement', 'Exam readiness', 'Time optimization'],
        estimatedScore: 310,
        successRate: 87,
        priority: 3,
      })
    }

    return paths.sort((a, b) => a.priority - b.priority)
  }

  const generateStudyPlan = (path: LearningPath): StudyPlan => {
    const weeklyHours =
      preferences.sessionDuration === '120min'
        ? 14
        : preferences.sessionDuration === '90min'
          ? 11
          : preferences.sessionDuration === '60min'
            ? 8
            : 6

    const dailySchedule: { [key: string]: StudySession[] } = {}

    // Generate daily schedule based on preferences
    const studyTime = preferences.studyTime || 'evening'
    const timeSlots = getTimeSlots(studyTime)
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    weekDays.forEach((day) => {
      dailySchedule[day] = [
        {
          time: timeSlots.primary,
          subject: 'Biology',
          topic: 'Current Module',
          type: 'concept',
          duration: parseInt(preferences.sessionDuration?.replace('min', '') || '60'),
        },
      ]

      if (weeklyHours > 8) {
        dailySchedule[day].push({
          time: timeSlots.secondary,
          subject: 'Practice',
          topic: 'Mock Tests',
          type: 'practice',
          duration: 30,
        })
      }
    })

    // Sunday - Revision & Tests
    dailySchedule['Sunday'] = [
      {
        time: timeSlots.primary,
        subject: 'Weekly Test',
        topic: 'Full Syllabus',
        type: 'test',
        duration: 180,
      },
    ]

    const milestones: Milestone[] = [
      {
        week: 4,
        goal: 'Complete Foundation Modules',
        target: '80% module completion',
        importance: 'high',
      },
      {
        week: 8,
        goal: 'First Mock Test Milestone',
        target: '250+ score',
        importance: 'high',
      },
      {
        week: 12,
        goal: 'Advanced Topics Mastery',
        target: '300+ practice score',
        importance: 'medium',
      },
      {
        week: 16,
        goal: 'NEET Readiness',
        target: path.estimatedScore + '+ score',
        importance: 'high',
      },
    ]

    const adaptiveRecommendations = generateAdaptiveRecommendations(path)

    return {
      weeklyHours,
      dailySchedule,
      milestones,
      adaptiveRecommendations,
    }
  }

  const getTimeSlots = (studyTime: string) => {
    switch (studyTime) {
      case 'morning':
        return { primary: '6:00 AM', secondary: '7:30 AM' }
      case 'afternoon':
        return { primary: '2:00 PM', secondary: '4:00 PM' }
      case 'evening':
        return { primary: '6:00 PM', secondary: '8:00 PM' }
      case 'night':
        return { primary: '9:00 PM', secondary: '10:30 PM' }
      default:
        return { primary: '6:00 PM', secondary: '8:00 PM' }
    }
  }

  const generateAdaptiveRecommendations = (path: LearningPath): string[] => {
    const recommendations = []

    if (preferences.learningStyle === 'visual') {
      recommendations.push('Focus on diagrams and flowcharts for better retention')
      recommendations.push('Use mind maps for complex topics like genetics')
    }

    if (preferences.currentScore && preferences.currentScore < 200) {
      recommendations.push('Spend extra time on NCERT fundamentals')
      recommendations.push('Take more practice tests to build confidence')
    }

    if (preferences.targetScore && preferences.targetScore > 320) {
      recommendations.push('Focus on advanced application problems')
      recommendations.push("Analyze previous year toppers' strategies")
    }

    if (preferences.studyTime === 'night') {
      recommendations.push('Avoid heavy topics late at night')
      recommendations.push('Use active recall techniques for better memory')
    }

    return recommendations
  }

  const handlePathSelection = (path: LearningPath) => {
    setSelectedPath(path)
    const plan = generateStudyPlan(path)
    setStudyPlan(plan)
    setCurrentStep('plan')

    trackBehavior('learning_path_selected', { pathId: path.id })
    // Note: weeklyStudyHours would need to be added to UserPreferences interface
    // updatePreferences({ weeklyStudyHours: plan.weeklyHours })
  }

  const handleStartPlan = () => {
    setCurrentStep('schedule')
    trackBehavior('study_plan_started', { pathId: selectedPath?.id })
  }

  if (currentStep === 'assessment' || !preferences.currentClass) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Target className="w-6 h-6 text-blue-600 mr-2" />
          Personalized Learning Assessment
        </h3>
        <p className="text-gray-600 mb-6">
          Help us create the perfect study plan for your NEET preparation by sharing a few details.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Biology Score (out of 360)
            </label>
            <input
              type="number"
              placeholder="e.g., 220"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => updatePreferences({ currentScore: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Biology Score
            </label>
            <input
              type="number"
              placeholder="e.g., 330"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => updatePreferences({ targetScore: parseInt(e.target.value) })}
            />
          </div>
          <button
            onClick={() => setCurrentStep('paths')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get My Learning Paths
          </button>
        </div>
      </div>
    )
  }

  if (currentStep === 'paths') {
    const paths = generateLearningPaths()

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
          Recommended Learning Paths
        </h3>
        <div className="space-y-4">
          {paths.map((path) => (
            <motion.div
              key={path.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePathSelection(path)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{path.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {path.successRate}% success
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {path.estimatedScore}+ score
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-3">{path.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {path.duration}
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  {path.difficulty}
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {path.modules.length} modules
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (currentStep === 'plan' && selectedPath && studyPlan) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-2" />
          Your Personalized Study Plan
        </h3>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Selected Path: {selectedPath.name}</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{studyPlan.weeklyHours}</div>
              <div className="text-sm text-gray-600">Hours/Week</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">
                {selectedPath.estimatedScore}+
              </div>
              <div className="text-sm text-gray-600">Target Score</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{selectedPath.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Milestones</h4>
          <div className="space-y-2">
            {studyPlan.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {milestone.week}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{milestone.goal}</div>
                  <div className="text-xs text-gray-600">{milestone.target}</div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    milestone.importance === 'high'
                      ? 'bg-red-500'
                      : milestone.importance === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-600'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Lightbulb className="w-4 h-4 mr-1" />
            Personalized Recommendations
          </h4>
          <div className="space-y-2">
            {studyPlan.adaptiveRecommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleStartPlan}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start My Study Plan
        </button>
      </div>
    )
  }

  if (currentStep === 'schedule' && studyPlan) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-6 h-6 text-blue-600 mr-2" />
          Your Weekly Schedule
        </h3>

        <div className="space-y-4">
          {Object.entries(studyPlan.dailySchedule).map(([day, sessions]) => (
            <div key={day} className="border border-gray-200 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
              <div className="space-y-2">
                {sessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">{session.time}</span>
                      <span className="text-gray-600">{session.subject}</span>
                    </div>
                    <span className="text-gray-500">{session.duration}min</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Your personalized study plan is ready! We'll track your progress and provide adaptive
            recommendations.
          </p>
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Book Demo Class to Get Started
          </button>
        </div>
      </div>
    )
  }

  return null
}

export function QuickAssessment() {
  const { preferences, updatePreferences, trackBehavior } = usePersonalization()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: any }>({})

  const questions = [
    {
      id: 1,
      question: "What's your current Biology score out of 360?",
      type: 'number',
      key: 'currentScore',
      placeholder: 'e.g., 220',
    },
    {
      id: 2,
      question: "What's your target Biology score?",
      type: 'number',
      key: 'targetScore',
      placeholder: 'e.g., 330',
    },
    {
      id: 3,
      question: 'How many hours can you study daily?',
      type: 'select',
      key: 'sessionDuration',
      options: [
        { value: '60min', label: '1 hour' },
        { value: '90min', label: '1.5 hours' },
        { value: '120min', label: '2 hours' },
      ],
    },
    {
      id: 4,
      question: "What's your preferred study time?",
      type: 'select',
      key: 'studyTime',
      options: [
        { value: 'morning', label: 'Morning (6-9 AM)' },
        { value: 'afternoon', label: 'Afternoon (1-4 PM)' },
        { value: 'evening', label: 'Evening (6-9 PM)' },
        { value: 'night', label: 'Night (9-11 PM)' },
      ],
    },
  ]

  const handleAnswer = (value: any) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    // Update preferences immediately
    const question = questions[currentQuestion]
    updatePreferences({ [question.key]: value })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Assessment complete
      trackBehavior('assessment_completed', newAnswers)
    }
  }

  const question = questions[currentQuestion]

  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-blue-200">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Quick Assessment ({currentQuestion + 1}/{questions.length})
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">{question.question}</h4>

        {question.type === 'number' && (
          <input
            type="number"
            placeholder={question.placeholder}
            className="w-full max-w-xs mx-auto border border-gray-300 rounded-lg px-4 py-2 text-center focus:ring-2 focus:ring-blue-500 mb-4"
            onBlur={(e) => handleAnswer(parseInt(e.target.value))}
          />
        )}

        {question.type === 'select' && (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="block w-full max-w-xs mx-auto bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
