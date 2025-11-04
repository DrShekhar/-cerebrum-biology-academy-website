'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Loader2, Send, AlertCircle, RotateCcw } from 'lucide-react'
import { useOptimisticUpdate } from '@/hooks/useOptimisticUpdate'
import { useToast } from '@/components/ui/Toast'

interface TestSubmissionData {
  status: 'draft' | 'submitting' | 'submitted' | 'failed'
  score?: number
  submittedAt?: string
}

interface Answer {
  questionId: string
  selectedOption: number
  timeTaken: number
}

interface OptimisticTestSubmissionProps {
  testId: string
  userId: string
  answers: Answer[]
}

export function OptimisticTestSubmission({
  testId,
  userId,
  answers,
}: OptimisticTestSubmissionProps) {
  const { showToast } = useToast()

  const { data, update, isLoading, isOptimistic, error } = useOptimisticUpdate<TestSubmissionData>(
    { status: 'draft' },
    {
      onSuccess: (data) => {
        showToast(
          'success',
          'Test Submitted!',
          `Your score: ${data.score}. Results are being processed.`
        )
      },
      onError: (error) => {
        showToast(
          'error',
          'Submission Failed',
          'Could not submit your test. Your answers are saved locally.'
        )
      },
    }
  )

  const handleSubmit = async () => {
    await update(
      {
        status: 'submitting',
        submittedAt: new Date().toISOString(),
      },
      async () => {
        const response = await fetch('/api/tests/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            testId,
            userId,
            answers,
            submittedAt: new Date().toISOString(),
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to submit test')
        }

        const result = await response.json()
        return {
          status: 'submitted' as const,
          score: result.score,
          submittedAt: result.submittedAt,
        }
      }
    )
  }

  const getStatusDisplay = () => {
    switch (data.status) {
      case 'draft':
        return {
          icon: Send,
          text: 'Ready to Submit',
          color: 'blue',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
        }
      case 'submitting':
        return {
          icon: Loader2,
          text: 'Submitting Test...',
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          animate: true,
        }
      case 'submitted':
        return {
          icon: CheckCircle,
          text: 'Test Submitted Successfully',
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        }
      case 'failed':
        return {
          icon: AlertCircle,
          text: 'Submission Failed',
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        }
    }
  }

  const status = getStatusDisplay()
  const StatusIcon = status.icon

  if (data.status === 'submitted') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Test Submitted!</h2>
          <p className="text-green-100 text-lg mb-4">Your answers have been saved successfully</p>
          {data.score !== undefined && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="text-4xl font-bold">{data.score}%</div>
              <div className="text-green-100">Your Score</div>
            </div>
          )}
          <p className="text-sm text-green-100">
            Submitted at {new Date(data.submittedAt!).toLocaleTimeString()}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Submit Your Test</h3>
        <p className="text-gray-600">{answers.length} questions answered • Ready for submission</p>
      </div>

      <motion.div
        className={`${status.bgColor} border-2 ${status.borderColor} rounded-xl p-4 mb-6`}
        animate={
          isOptimistic
            ? {
                scale: [1, 1.02, 1],
                transition: { duration: 0.3, repeat: Infinity, repeatDelay: 1 },
              }
            : {}
        }
      >
        <div className="flex items-center space-x-3">
          <StatusIcon
            className={`w-6 h-6 text-${status.color}-600 ${status.animate ? 'animate-spin' : ''}`}
          />
          <div>
            <div className={`font-semibold text-${status.color}-900`}>{status.text}</div>
            {isOptimistic && (
              <div className="text-sm text-gray-600 mt-1">
                Your answers are being processed. This may take a few seconds...
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-red-900">Submission Error</div>
              <p className="text-sm text-red-700 mt-1">{error.message}</p>
              <button
                onClick={handleSubmit}
                className="mt-2 text-sm font-semibold text-red-700 hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Submission</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{answers.length}</div>
            <div className="text-xs text-gray-600">Answered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(answers.reduce((acc, a) => acc + a.timeTaken, 0) / 60)}m
            </div>
            <div className="text-xs text-gray-600">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">100%</div>
            <div className="text-xs text-gray-600">Complete</div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || data.status === 'submitted'}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              <span>Submit Test Now</span>
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500">
          By submitting, you confirm all answers are final and cannot be changed
        </p>
      </div>
    </div>
  )
}
