'use client'

import { useEffect, useState } from 'react'
import { Clock, Users, AlertCircle } from 'lucide-react'
interface UrgencyBannerProps {
  batchStartDate?: string // e.g., "Feb 5, 2026"
  seatsTotal?: number
  seatsFilled?: number
  showCountdown?: boolean
}

export function UrgencyBanner({
  batchStartDate = 'Feb 5, 2026',
  seatsTotal = 15,
  seatsFilled = 12,
  showCountdown = true,
}: UrgencyBannerProps) {
  const [timeLeft, setTimeLeft] = useState('')
  const seatsRemaining = seatsTotal - seatsFilled

  useEffect(() => {
    if (!showCountdown) return

    const calculateTimeLeft = () => {
      const target = new Date(batchStartDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        return `${days}d ${hours}h`
      }
      return 'Batch starting soon!'
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [batchStartDate, showCountdown])

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
      {/* Seats Remaining */}
      <div
        className="flex items-center justify-center gap-2 rounded-full border-2 border-red-500 bg-red-50 px-4 py-2 sm:px-6 sm:py-3 animate-fadeInUp"
      >
        <AlertCircle className="h-5 w-5 text-red-600" />
        <span className="text-sm font-bold text-red-700 sm:text-base">
          Only {seatsRemaining} seats left!
        </span>
      </div>

      {/* Batch Starting */}
      {showCountdown && (
        <div
          className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white sm:px-6 sm:py-3 animate-fadeInUp"
        >
          <Clock className="h-5 w-5" />
          <span className="text-sm font-semibold sm:text-base">Batch starts: {batchStartDate}</span>
        </div>
      )}

      {/* Seats Filled Progress */}
      <div
        className="flex items-center justify-center gap-2 rounded-full bg-yellow-100 px-4 py-2 sm:px-6 sm:py-3 animate-fadeInUp"
      >
        <Users className="h-5 w-5 text-yellow-800" />
        <span className="text-sm font-semibold text-slate-900 sm:text-base">
          <span className="font-bold text-[#ea4335]">
            {seatsFilled}/{seatsTotal}
          </span>{' '}
          seats filled
        </span>
      </div>
    </div>
  )
}

// Live activity notification component
interface ActivityNotification {
  id: string
  name: string
  location: string
  action: string
  timestamp: Date
}

const MOCK_ACTIVITIES: ActivityNotification[] = [
  { id: '1', name: 'Rahul S.', location: 'Noida', action: 'booked a demo', timestamp: new Date() },
  { id: '2', name: 'Priya K.', location: 'Gurgaon', action: 'enrolled', timestamp: new Date() },
  { id: '3', name: 'Amit R.', location: 'Delhi', action: 'booked a demo', timestamp: new Date() },
  {
    id: '4',
    name: 'Sneha M.',
    location: 'Faridabad',
    action: 'started trial',
    timestamp: new Date(),
  },
  {
    id: '5',
    name: 'Rohan P.',
    location: 'Ghaziabad',
    action: 'booked a demo',
    timestamp: new Date(),
  },
]

export function SocialProofNotifications() {
  const [currentActivity, setCurrentActivity] = useState<ActivityNotification | null>(null)
  const [activityIndex, setActivityIndex] = useState(0)

  useEffect(() => {
    // Show first notification after 3 seconds
    const initialTimer = setTimeout(() => {
      setCurrentActivity(MOCK_ACTIVITIES[0])
    }, 3000)

    // Rotate notifications every 8 seconds
    const interval = setInterval(() => {
      setActivityIndex((prev) => {
        const next = (prev + 1) % MOCK_ACTIVITIES.length
        setCurrentActivity(MOCK_ACTIVITIES[next])
        return next
      })
    }, 8000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [])

  return (
<>
{currentActivity && (
        <div
          key={currentActivity.id}
          className="fixed bottom-24 left-4 z-50 max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-2xl sm:bottom-8 sm:left-8 animate-fadeInUp"
          onClick={() => setCurrentActivity(null)}
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">
                {currentActivity.name} from {currentActivity.location}
              </p>
              <p className="text-xs text-slate-600">{currentActivity.action}</p>
              <p className="mt-1 text-xs text-slate-400">Just now</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentActivity(null)
              }}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      )}
</>
)
}
