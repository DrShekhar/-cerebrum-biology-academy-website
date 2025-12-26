'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { UserCheck, BookOpen, Trophy, TrendingUp, Users, Play, Loader2 } from 'lucide-react'
import { useOptimisticList } from '@/hooks/useOptimisticList'
import { useToast } from '@/components/ui/Toast'

interface Activity {
  id?: string
  type: 'enrollment' | 'demo' | 'success' | 'online'
  message: string
  location: string
  time: string
}

interface OptimisticActivityFeedProps {
  initialActivities: Activity[]
}

export function OptimisticActivityFeed({ initialActivities }: OptimisticActivityFeedProps) {
  const { showToast } = useToast()

  const { items, rawItems, addItem } = useOptimisticList<Activity>(initialActivities, {
    onSuccess: () => {
      showToast('success', 'Activity Added', 'New activity posted successfully')
    },
    onError: (error) => {
      showToast('error', 'Failed to Post', error.message)
    },
  })

  const handleAddActivity = async (activityData: Omit<Activity, 'id'>) => {
    await addItem(activityData as Activity, async (item) => {
      const response = await fetch('/api/activities/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })

      if (!response.ok) {
        throw new Error('Failed to create activity')
      }

      return response.json()
    })
  }

  const getIcon = (type: Activity['type']) => {
    const icons = {
      enrollment: UserCheck,
      demo: Play,
      success: Trophy,
      online: Users,
    }
    return icons[type]
  }

  const getColor = (type: Activity['type']) => {
    const colors = {
      enrollment: 'bg-green-600',
      demo: 'from-blue-500 to-cyan-600',
      success: 'from-yellow-500 to-orange-500',
      online: 'bg-green-600',
    }
    return colors[type]
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="relative mr-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-600 rounded-full animate-ping opacity-75" />
          </div>
          Live Activity Feed
        </h3>
        <button
          onClick={() =>
            handleAddActivity({
              type: 'enrollment',
              message: 'New student enrolled in NEET Program',
              location: 'Online',
              time: 'Just now',
            })
          }
          className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
        >
          + Add Activity
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence initial={false}>
          {rawItems.map((item, index) => {
            const Icon = getIcon(item.data.type)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-3 p-4 rounded-xl transition-all ${
                  item.isOptimistic
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${getColor(item.data.type)} rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                    item.isOptimistic ? 'animate-pulse' : ''
                  }`}
                >
                  {item.isPending ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 leading-snug">
                    {item.data.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{item.data.location}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {item.isOptimistic ? 'Posting...' : item.data.time}
                    </span>
                  </div>
                  {item.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                      Failed to post. {item.error.message}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center bg-green-50 rounded-xl p-3 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{items.length}</div>
          <div className="text-xs text-gray-600">Total Activities</div>
        </div>
        <div className="text-center bg-blue-50 rounded-xl p-3 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {rawItems.filter((i) => i.isOptimistic).length}
          </div>
          <div className="text-xs text-gray-600">Pending</div>
        </div>
        <div className="text-center bg-purple-50 rounded-xl p-3 shadow-sm">
          <div className="text-2xl font-bold text-purple-600">Live</div>
          <div className="text-xs text-gray-600">Status</div>
        </div>
      </div>
    </div>
  )
}
