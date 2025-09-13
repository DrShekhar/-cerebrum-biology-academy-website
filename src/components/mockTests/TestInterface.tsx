'use client'

import { useState, useEffect } from 'react'
import { MockTest, TestResponse, UserProfile } from '@/types/mockTest'
import { TestEngine } from './TestEngine'
import { TestResults } from './TestResults'
import { ClassSelection } from './ClassSelection'
import { Button } from '@/components/ui/Button'
import {
  Clock,
  Users,
  BookOpen,
  Target,
  Star,
  Play,
  ArrowLeft,
  Trophy,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Award,
  TrendingUp,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface TestInterfaceProps {
  test: MockTest
}

type TestState = 'preview' | 'class-selection' | 'taking' | 'completed'

export function TestInterface({ test }: TestInterfaceProps) {
  const [testState, setTestState] = useState<TestState>('preview')
  const [selectedClass, setSelectedClass] = useState<'class-11' | 'class-12' | 'dropper' | null>(null)
  const [testResponses, setTestResponses] = useState<TestResponse[]>([])
  const [timeTaken, setTimeTaken] = useState<number>(0)

  // Mock user data - in real app, this would come from authentication
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    // Check if user has a stored class preference
    const storedClass = localStorage.getItem('selectedClass') as 'class-11' | 'class-12' | 'dropper' | null
    if (storedClass) {
      setSelectedClass(storedClass)
    }
  }, [])

  const handleClassSelect = (classType: 'class-11' | 'class-12' | 'dropper') => {
    setSelectedClass(classType)
    localStorage.setItem('selectedClass', classType)
    setTestState('preview')
  }

  const handleStartTest = () => {
    if (!selectedClass) {
      setTestState('class-selection')
    } else {
      setTestState('taking')
    }
  }

  const handleTestComplete = (responses: TestResponse[], totalTime: number) => {
    setTestResponses(responses)
    setTimeTaken(totalTime)
    setTestState('completed')
  }

  const handleTestExit = () => {
    setTestState('preview')
  }

  const handleRetakeTest = () => {
    setTestResponses([])
    setTimeTaken(0)
    setTestState('taking')
  }

  const handleBackToTests = () => {
    window.location.href = '/mock-tests'
  }

  // Get test difficulty based on selected class
  const getTestDifficultyForClass = () => {
    if (!selectedClass) return test.difficulty
    return test.classRequirements.difficultyByClass[selectedClass]
  }

  // Get questions available for selected class
  const getQuestionsForClass = () => {
    if (!selectedClass || !test.adaptiveSettings.enableAdaptive) {
      return test.questions.length
    }
    return test.adaptiveSettings.questionPoolByClass[selectedClass].length
  }

  // Render different states
  if (testState === 'class-selection') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <Link href="/mock-tests">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tests
                </Button>
              </Link>
            </div>
            <ClassSelection 
              onClassSelect={handleClassSelect}
              selectedClass={selectedClass}
            />
          </div>
        </div>
      </div>
    )
  }

  if (testState === 'taking') {
    return (
      <TestEngine
        test={test}
        userClass={selectedClass!}
        onTestComplete={handleTestComplete}
        onTestExit={handleTestExit}
      />
    )
  }

  if (testState === 'completed') {
    return (
      <TestResults
        test={test}
        responses={testResponses}
        timeTaken={timeTaken}
        userClass={selectedClass!}
        onRetakeTest={handleRetakeTest}
        onBackToTests={handleBackToTests}
      />
    )
  }

  // Preview state (default)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/mock-tests">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tests
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                test.isPremium ? 'bg-yellow-500 text-yellow-900' : 'bg-green-500 text-green-900'
              }`}>
                {test.isPremium ? 'PREMIUM' : 'FREE'}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                {test.category.replace('-', ' ').toUpperCase()}
              </span>
              {selectedClass && (
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedClass === 'class-11' ? 'Class 11' : 
                   selectedClass === 'class-12' ? 'Class 12' : 'Dropper'}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{test.title}</h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">{test.description}</p>
            
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Clock className="w-6 h-6 mb-2" />
                <div className="text-lg font-bold">{test.duration} min</div>
                <div className="text-blue-100 text-sm">Duration</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <BookOpen className="w-6 h-6 mb-2" />
                <div className="text-lg font-bold">
                  {selectedClass ? getQuestionsForClass() : test.totalQuestions}
                </div>
                <div className="text-blue-100 text-sm">Questions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Target className="w-6 h-6 mb-2" />
                <div className="text-lg font-bold">{test.totalMarks}</div>
                <div className="text-blue-100 text-sm">Max Marks</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <BarChart3 className="w-6 h-6 mb-2" />
                <div className="text-lg font-bold">
                  {selectedClass ? getTestDifficultyForClass() : test.difficulty}
                </div>
                <div className="text-blue-100 text-sm">Difficulty</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Test Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Topics Covered */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Topics Covered</h2>
                <div className="flex flex-wrap gap-3">
                  {test.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Instructions */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Instructions</h2>
                <ul className="space-y-4">
                  {test.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Class-specific Information */}
              {selectedClass && (
                <motion.div
                  className="bg-blue-50 rounded-3xl p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-blue-900 mb-6">
                    Personalized for {selectedClass === 'class-11' ? 'Class 11' : 
                                     selectedClass === 'class-12' ? 'Class 12' : 'Droppers'}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6">
                      <Target className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Adaptive Difficulty</h3>
                      <p className="text-gray-700 text-sm">
                        Questions adapted to your {selectedClass} level for optimal learning
                      </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6">
                      <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Class-specific Analytics</h3>
                      <p className="text-gray-700 text-sm">
                        Compare your performance with other {selectedClass} students
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Start Test Card */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ready to Begin?</h3>
                
                {!selectedClass ? (
                  <div className="mb-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mb-2" />
                      <p className="text-yellow-800 text-sm">
                        Please select your class first for a personalized test experience
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setTestState('class-selection')}
                    >
                      Select Your Class
                    </Button>
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                      <p className="text-green-800 text-sm">
                        Test personalized for {selectedClass === 'class-11' ? 'Class 11' : 
                                              selectedClass === 'class-12' ? 'Class 12' : 'Droppers'}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full mb-4"
                  onClick={handleStartTest}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Test
                </Button>

                {selectedClass && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setTestState('class-selection')}
                  >
                    Change Class
                  </Button>
                )}
              </motion.div>

              {/* Test Stats */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Test Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-blue-600 mr-3" />
                      <span className="text-gray-700">Attempts</span>
                    </div>
                    <span className="font-semibold">{test.attemptCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">Average Score</span>
                    </div>
                    <span className="font-semibold">{test.averageScore}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-600 mr-3" />
                      <span className="text-gray-700">Difficulty</span>
                    </div>
                    <span className="font-semibold capitalize">
                      {selectedClass ? getTestDifficultyForClass() : test.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Similar Tests */}
              <motion.div
                className="bg-white rounded-3xl shadow-lg p-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Tests</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="font-medium text-gray-900 mb-1">Plant Physiology Test</h4>
                    <p className="text-sm text-gray-600 mb-2">20 questions • 30 min</p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">FREE</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="font-medium text-gray-900 mb-1">Genetics Deep Dive</h4>
                    <p className="text-sm text-gray-600 mb-2">25 questions • 45 min</p>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">PREMIUM</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}