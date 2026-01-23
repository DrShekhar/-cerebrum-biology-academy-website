'use client'

import { useState, useEffect } from 'react'
import { SimpleTest, TestResponse } from '@/types/simpleTest'
import { ClassType } from './ClassSelector'
import { saveTestProgress, clearTestProgress, getUserId } from '@/utils/testStorage'

interface TestInterfaceProps {
  test: SimpleTest
  userClass: ClassType
  onTestComplete: (responses: TestResponse[], totalTime: number) => void
  onTestExit: () => void
}

export function TestInterface({ test, userClass, onTestComplete, onTestExit }: TestInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<TestResponse[]>([])
  const [startTime] = useState<number>(Date.now())
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  const currentQuestion = test.questions[currentQuestionIndex]
  const currentResponse = responses.find(r => r.questionId === currentQuestion.id)

  // Initialize responses array
  useEffect(() => {
    const initialResponses: TestResponse[] = test.questions.map(q => ({
      questionId: q.id,
      selectedAnswer: null,
      isMarkedForReview: false,
      timeTaken: 0
    }))
    setResponses(initialResponses)
  }, [test.questions])

  // Auto-save progress whenever responses change
  useEffect(() => {
    if (responses.length === 0) return

    const saveProgress = () => {
      const userId = getUserId()
      saveTestProgress({
        testId: test.id,
        userId,
        userClass,
        responses,
        currentQuestionIndex,
        startTime,
        lastSavedTime: Date.now()
      })
    }

    // Debounce saves to avoid too frequent updates
    const timeoutId = setTimeout(saveProgress, 1000)
    return () => clearTimeout(timeoutId)
  }, [responses, currentQuestionIndex, test.id, userClass, startTime])

  const handleAnswerSelect = (optionIndex: number) => {
    setResponses(prev => prev.map(response => 
      response.questionId === currentQuestion.id
        ? { ...response, selectedAnswer: optionIndex }
        : response
    ))
  }

  const handleMarkForReview = () => {
    setResponses(prev => prev.map(response => 
      response.questionId === currentQuestion.id
        ? { ...response, isMarkedForReview: !response.isMarkedForReview }
        : response
    ))
  }

  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmitTest = () => {
    const totalTime = Math.round((Date.now() - startTime) / 1000) // in seconds
    clearTestProgress(test.id) // Clear saved progress since test is completed
    onTestComplete(responses, totalTime)
  }

  const handleExitConfirm = () => {
    setShowExitConfirm(true)
  }

  const handleExitCancel = () => {
    setShowExitConfirm(false)
  }

  const getAnsweredCount = () => {
    return responses.filter(r => r.selectedAnswer !== null).length
  }

  const getMarkedCount = () => {
    return responses.filter(r => r.isMarkedForReview).length
  }

  if (showExitConfirm) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md mx-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Exit Test?</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to exit? Your progress will be lost.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={handleExitCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onTestExit}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Exit Test
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleExitConfirm}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Exit Test
            </button>
            <div className="text-gray-600">
              <span className="font-medium">{test.title}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{userClass.replace('-', ' ')}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-green-600 font-medium">
              Answered: {getAnsweredCount()}/{test.totalQuestions}
            </div>
            <div className="text-yellow-600 font-medium">
              Marked: {getMarkedCount()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-lg p-8">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {test.totalQuestions}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {currentQuestion.marks} marks
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-medium text-gray-900 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      currentResponse?.selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                        currentResponse?.selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Question Actions */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleMarkForReview}
                  className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                    currentResponse?.isMarkedForReview
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  {currentResponse?.isMarkedForReview ? 'Unmark Review' : 'Mark for Review'}
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {currentQuestionIndex === test.questions.length - 1 ? (
                    <button
                      onClick={handleSubmitTest}
                      className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit Test
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Question Palette</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {test.questions.map((_, index) => {
                  const response = responses.find(r => r.questionId === test.questions[index].id)
                  const isAnswered = response?.selectedAnswer !== null
                  const isMarked = response?.isMarkedForReview
                  const isCurrent = index === currentQuestionIndex

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isAnswered
                          ? 'bg-green-600 text-white hover:bg-green-600'
                          : isMarked
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Marked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span>Not Visited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <span>Current</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">
                  Progress: {getAnsweredCount()}/{test.totalQuestions}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(getAnsweredCount() / test.totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}