'use client'

import { Calendar, Clock, Sun, Sunset, Moon, Users, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BatchTiming {
  id: string
  name: string
  time: string
  days: string[]
  seatsAvailable: number
  totalSeats: number
  startDate: string
  icon: 'morning' | 'afternoon' | 'evening'
}

interface BatchSelectorProps {
  batches: BatchTiming[]
  selectedBatch: string | null
  onSelect: (batchId: string) => void
}

const timeIcons = {
  morning: Sun,
  afternoon: Sunset,
  evening: Moon,
}

const timeColors = {
  morning: 'text-amber-500',
  afternoon: 'text-orange-500',
  evening: 'text-indigo-500',
}

export function BatchSelector({ batches, selectedBatch, onSelect }: BatchSelectorProps) {
  if (batches.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
        <Calendar className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2 text-gray-600">No batches available for this selection.</p>
        <p className="text-sm text-gray-500">Please contact us for upcoming batch timings.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Select Batch Timing</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {batches.map((batch) => {
          const isSelected = selectedBatch === batch.id
          const Icon = timeIcons[batch.icon]
          const iconColor = timeColors[batch.icon]
          const seatsPercentage = (batch.seatsAvailable / batch.totalSeats) * 100
          const isLowSeats = seatsPercentage <= 30

          return (
            <button
              key={batch.id}
              type="button"
              onClick={() => onSelect(batch.id)}
              className={cn(
                'relative rounded-xl border-2 p-4 text-left transition-all duration-200',
                isSelected
                  ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-offset-2'
                  : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
              )}
            >
              {isLowSeats && (
                <div className="absolute -top-2 -right-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
                    <AlertCircle className="h-3 w-3" />
                    Few seats left
                  </span>
                </div>
              )}

              <div className="mb-3 flex items-center gap-3">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    batch.icon === 'morning' && 'bg-amber-100',
                    batch.icon === 'afternoon' && 'bg-orange-100',
                    batch.icon === 'evening' && 'bg-indigo-100'
                  )}
                >
                  <Icon className={cn('h-5 w-5', iconColor)} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{batch.name}</h4>
                  <p className="text-sm text-gray-600">{batch.time}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>{batch.days.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Starts: {batch.startDate}</span>
                </div>
              </div>

              <div className="mt-3 border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span
                      className={cn('font-medium', isLowSeats ? 'text-red-600' : 'text-gray-700')}
                    >
                      {batch.seatsAvailable} seats left
                    </span>
                  </div>
                  <span className="text-gray-500">of {batch.totalSeats}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      isLowSeats ? 'bg-red-500' : 'bg-green-600'
                    )}
                    style={{ width: `${seatsPercentage}%` }}
                  />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export const defaultBatches: BatchTiming[] = [
  {
    id: 'morning-batch',
    name: 'Morning Batch',
    time: '7:00 AM - 9:00 AM',
    days: ['Mon', 'Wed', 'Fri', 'Sat'],
    seatsAvailable: 8,
    totalSeats: 18,
    startDate: 'Jan 15, 2027',
    icon: 'morning',
  },
  {
    id: 'afternoon-batch',
    name: 'Afternoon Batch',
    time: '2:00 PM - 4:00 PM',
    days: ['Mon', 'Tue', 'Thu', 'Sat'],
    seatsAvailable: 12,
    totalSeats: 18,
    startDate: 'Jan 15, 2027',
    icon: 'afternoon',
  },
  {
    id: 'evening-batch',
    name: 'Evening Batch',
    time: '6:00 PM - 8:00 PM',
    days: ['Mon', 'Wed', 'Fri', 'Sun'],
    seatsAvailable: 3,
    totalSeats: 18,
    startDate: 'Jan 15, 2027',
    icon: 'evening',
  },
]
