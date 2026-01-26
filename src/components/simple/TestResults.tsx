'use client'

import { useEffect } from 'react'
import { SimpleTest, TestResponse } from '@/types/simpleTest'
import { ClassType } from './ClassSelector'
import { saveTestResult, getUserId } from '@/utils/testStorage'

interface TestResultsProps {
  test: SimpleTest
  responses: TestResponse[]
  timeTaken: number // in seconds
  userClass: ClassType
  onRetakeTest: () => void
  onBackToTests: () => void
}

export function TestResults({
  test,
  responses,
  timeTaken,
  userClass,
  onRetakeTest,
  onBackToTests,
}: TestResultsProps) {
  // Calculate results
  const correctAnswers = responses.filter(
    (response, index) => response.selectedAnswer === test.questions[index].correctAnswer
  ).length

  const totalQuestions = test.questions.length
  const score = correctAnswers * 4 // 4 marks per question
  const maxScore = totalQuestions * 4
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  const timeInMinutes = Math.floor(timeTaken / 60)
  const timeInSeconds = timeTaken % 60

  const getPerformanceMessage = () => {
    if (percentage >= 90)
      return { message: 'Outstanding! Excellent performance!', color: 'text-green-600' }
    if (percentage >= 80)
      return { message: 'Great job! Very good performance!', color: 'text-green-600' }
    if (percentage >= 70)
      return { message: 'Good work! Above average performance!', color: 'text-blue-600' }
    if (percentage >= 60)
      return { message: 'Fair performance. Keep practicing!', color: 'text-yellow-600' }
    return { message: 'Needs improvement. More practice required!', color: 'text-red-600' }
  }

  const performance = getPerformanceMessage()

  // Save test result to history
  useEffect(() => {
    const userId = getUserId()
    const testResult = {
      testId: test.id,
      userId,
      responses,
      totalScore: score,
      percentage,
      timeTaken,
      completedAt: new Date().toISOString(),
    }
    saveTestResult(testResult)
  }, [test.id, responses, score, percentage, timeTaken])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Test Results</h1>
          <div className="text-gray-600 text-sm">
            {test.title} • {userClass.replace('-', ' ')}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Results Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          {/* Score Summary */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-6">
              <div className="text-white">
                <div className="text-3xl font-bold">{percentage}%</div>
                <div className="text-sm">Score</div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Completed!</h2>
            <p className={`text-lg font-medium ${performance.color}`}>{performance.message}</p>
          </div>

          {/* Detailed Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{correctAnswers}</div>
              <div className="text-gray-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {totalQuestions - correctAnswers}
              </div>
              <div className="text-gray-600">Incorrect</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{score}</div>
              <div className="text-gray-600">Score / {maxScore}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {timeInMinutes}:{timeInSeconds.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-600">Time Taken</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Performance</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  percentage >= 80
                    ? 'bg-green-600'
                    : percentage >= 60
                      ? 'bg-blue-500'
                      : percentage >= 40
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBackToTests}
              className="px-8 py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Back to Tests
            </button>
            <button
              onClick={onRetakeTest}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Retake Test
            </button>
            <button
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
              onClick={() => alert('Detailed solutions coming in next update!')}
            >
              View Solutions
            </button>
          </div>
        </div>

        {/* Question-wise Results */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Question-wise Results</h3>

          <div className="space-y-4">
            {test.questions.map((question, index) => {
              const response = responses[index]
              const isCorrect = response.selectedAnswer === question.correctAnswer
              const userAnswer =
                response.selectedAnswer !== null
                  ? question.options[response.selectedAnswer]
                  : 'Not Answered'
              const correctAnswer = question.options[question.correctAnswer]

              return (
                <div key={question.id} className="border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-semibold text-gray-600">Q{index + 1}</span>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isCorrect ? 'bg-green-600 text-white' : 'bg-red-500 text-white'
                          }`}
                        >
                          {isCorrect ? '✓' : '✗'}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-3">{question.question}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Your Answer: </span>
                      <span
                        className={
                          response.selectedAnswer !== null
                            ? isCorrect
                              ? 'text-green-600'
                              : 'text-red-600'
                            : 'text-gray-500'
                        }
                      >
                        {userAnswer}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Correct Answer: </span>
                      <span className="text-green-600">{correctAnswer}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
