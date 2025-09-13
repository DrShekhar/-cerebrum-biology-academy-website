'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getTestById } from '@/data/simpleTests'
import { ClassSelector, ClassType } from '@/components/simple/ClassSelector'
import { TestInterface } from '@/components/simple/TestInterface'
import { TestResults } from '@/components/simple/TestResults'
import { SimpleTest, TestResponse } from '@/types/simpleTest'
import { getTestProgress, hasUserTakenTest, getBestScoreForTest, getAttemptCount } from '@/utils/testStorage'

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const [test, setTest] = useState<SimpleTest | null>(null)
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null)
  const [showClassSelector, setShowClassSelector] = useState(true)
  const [testState, setTestState] = useState<'preview' | 'taking' | 'completed'>('preview')
  const [testResponses, setTestResponses] = useState<TestResponse[]>([])
  const [timeTaken, setTimeTaken] = useState<number>(0)
  const [savedProgress, setSavedProgress] = useState<any>(null)
  const [showResumeDialog, setShowResumeDialog] = useState(false)

  useEffect(() => {
    const testId = params.testId as string
    const foundTest = getTestById(testId)
    setTest(foundTest || null)

    // Check if user has already selected a class
    const storedClass = localStorage.getItem('selectedClass') as ClassType | null
    if (storedClass) {
      setSelectedClass(storedClass)
      setShowClassSelector(false)
    }

    // Check for saved progress
    const progress = getTestProgress(testId)
    if (progress) {
      setSavedProgress(progress)
      setShowResumeDialog(true)
    }
  }, [params.testId])

  const handleClassSelect = (classType: ClassType) => {
    setSelectedClass(classType)
    setShowClassSelector(false)
  }

  const handleChangeClass = () => {
    setShowClassSelector(true)
  }

  const handleStartTest = () => {
    if (!selectedClass || !test) return
    setTestState('taking')
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
    router.push('/mock-tests')
  }

  const handleResumeTest = () => {
    if (savedProgress) {
      setSelectedClass(savedProgress.userClass)
      setShowClassSelector(false)
      setShowResumeDialog(false)
      setTestState('taking')
    }
  }

  const handleStartFresh = () => {
    setSavedProgress(null)
    setShowResumeDialog(false)
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
          <p className="text-gray-600 mb-6">The test you&apos;re looking for doesn&apos;t exist.</p>
          <button 
            onClick={() => router.push('/mock-tests')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  if (showClassSelector) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-6">
            <button 
              onClick={() => router.push('/mock-tests')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Tests
            </button>
          </div>
        </div>

        {/* Class Selection */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{test.title}</h1>
              <p className="text-gray-600">{test.description}</p>
            </div>
            
            <ClassSelector 
              onClassSelect={handleClassSelect}
              selectedClass={selectedClass}
            />
          </div>
        </div>
      </div>
    )
  }

  // Resume test dialog
  if (showResumeDialog && savedProgress) {
    const progress = savedProgress
    const answeredCount = progress.responses.filter((r: any) => r.selectedAnswer !== null).length
    const timeElapsed = Math.round((Date.now() - progress.startTime) / 60000) // minutes

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Test?</h2>
            <p className="text-gray-600">We found your previous test progress</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-gray-900">{answeredCount}/{test.totalQuestions}</div>
                <div className="text-gray-600">Answered</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{timeElapsed}m</div>
                <div className="text-gray-600">Elapsed</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleResumeTest}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Continue Test
            </button>
            <button
              onClick={handleStartFresh}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Test interface
  if (testState === 'taking' && !showClassSelector) {
    return (
      <TestInterface
        test={test}
        userClass={selectedClass!}
        onTestComplete={handleTestComplete}
        onTestExit={handleTestExit}
      />
    )
  }

  // Test results
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

  // Test preview/start page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button 
            onClick={() => router.push('/mock-tests')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Tests
          </button>
          <button 
            onClick={handleChangeClass}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Change Class ({selectedClass})
          </button>
        </div>
      </div>

      {/* Test Details */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Test Info Card */}
          <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  test.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {test.difficulty.toUpperCase()}
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedClass === 'class-11' ? 'Class 11' : 
                   selectedClass === 'class-12' ? 'Class 12' : 'Dropper'}
                </span>
              </div>
              <span className="text-gray-500 text-sm">{test.category.replace('-', ' ').toUpperCase()}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{test.title}</h1>
            <p className="text-gray-600 mb-8">{test.description}</p>

            {/* Test Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">⏱️ {test.duration}</div>
                <div className="text-gray-600 text-sm">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">📝 {test.totalQuestions}</div>
                <div className="text-gray-600 text-sm">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">🎯 {test.totalQuestions * 4}</div>
                <div className="text-gray-600 text-sm">Max Marks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">📚 {test.subject}</div>
                <div className="text-gray-600 text-sm">Subject</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Test Instructions</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  All questions are compulsory and carry equal marks (4 marks each)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  Each question has 4 options with only one correct answer
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  You can navigate between questions and review your answers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  Test will auto-submit when time expires
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  No negative marking for this test
                </li>
              </ul>
            </div>

            {/* Previous Performance */}
            {hasUserTakenTest(test.id) && (
              <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-blue-900 mb-4">Your Previous Performance</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{getBestScoreForTest(test.id)}%</div>
                    <div className="text-blue-800">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{getAttemptCount(test.id)}</div>
                    <div className="text-blue-800">Attempts</div>
                  </div>
                </div>
              </div>
            )}

            {/* Start Button */}
            <div className="text-center">
              <button 
                onClick={handleStartTest}
                className="bg-blue-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                {hasUserTakenTest(test.id) ? 'Retake Test' : 'Start Test'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}