'use client'

import { motion } from 'framer-motion'
import { TrendingUp, CheckCircle, Loader2 } from 'lucide-react'
import { useOptimisticUpdate } from '@/hooks/useOptimisticUpdate'
import { useToast } from '@/components/ui/Toast'

interface ProgressData {
  score: number
  improvement: number
  sessionsCompleted: number
  lastUpdated: string
}

interface OptimisticProgressCardProps {
  userId: string
  initialProgress: ProgressData
}

export function OptimisticProgressCard({ userId, initialProgress }: OptimisticProgressCardProps) {
  const { showToast } = useToast()

  const { data, update, isLoading, isOptimistic, error } = useOptimisticUpdate<ProgressData>(
    initialProgress,
    {
      onSuccess: (data) => {
        showToast('success', 'Progress Updated', 'Your study progress has been saved')
      },
      onError: (error) => {
        showToast('error', 'Update Failed', error.message)
      },
    }
  )

  const handleCompleteSession = async (sessionScore: number) => {
    const newSessionsCompleted = data.sessionsCompleted + 1
    const newScore = Math.round((data.score + sessionScore) / newSessionsCompleted)
    const newImprovement = sessionScore - data.score

    await update(
      {
        score: newScore,
        improvement: newImprovement,
        sessionsCompleted: newSessionsCompleted,
        lastUpdated: new Date().toISOString(),
      },
      async () => {
        const response = await fetch('/api/progress/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            score: newScore,
            improvement: newImprovement,
            sessionsCompleted: newSessionsCompleted,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to update progress')
        }

        return response.json()
      }
    )
  }

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all ${
        isOptimistic ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'
      }`}
      animate={
        isOptimistic
          ? {
              scale: [1, 1.02, 1],
              transition: { duration: 0.3 },
            }
          : {}
      }
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Your Progress</h3>
          <p className="text-sm text-gray-600">
            {isOptimistic ? 'Saving...' : 'Last updated just now'}
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span className="text-xs text-blue-600">Syncing</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{data.score}</div>
            <div className="text-sm text-gray-600">Current Score</div>
          </div>
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              data.improvement >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="font-semibold">
              {data.improvement >= 0 ? '+' : ''}
              {data.improvement}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Sessions Completed</span>
            <span className="font-semibold text-gray-900">{data.sessionsCompleted}</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error.message}</p>
            <button
              onClick={() => handleCompleteSession(data.score)}
              className="mt-2 text-sm font-semibold text-red-700 hover:underline"
            >
              Retry
            </button>
          </div>
        )}

        <button
          onClick={() => handleCompleteSession(85)}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Complete Practice Session</span>
        </button>
      </div>
    </motion.div>
  )
}
