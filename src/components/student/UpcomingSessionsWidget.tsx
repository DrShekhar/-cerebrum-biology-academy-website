/**
 * Upcoming Sessions Widget Component
 * Displays upcoming class sessions for students
 */

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Calendar, Clock, Video, MapPin, ChevronRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { showToast } from '@/lib/toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import type { ClassSession } from '@/types/attendance'

interface UpcomingSessionsWidgetProps {
  className?: string
  maxItems?: number
  showViewAll?: boolean
}

export function UpcomingSessionsWidget({
  className,
  maxItems = 3,
  showViewAll = true,
}: UpcomingSessionsWidgetProps) {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUpcomingSessions()
  }, [])

  const fetchUpcomingSessions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/student/sessions?type=upcoming')
      const data = await response.json()

      if (data.success) {
        setSessions(data.data.upcoming)
      } else {
        showToast.error(data.error || 'Failed to fetch upcoming sessions')
      }
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error)
      showToast.error('Failed to load upcoming sessions')
    } finally {
      setIsLoading(false)
    }
  }

  const getTimeUntilSession = (startTime: Date | string) => {
    const now = new Date()
    const sessionTime = new Date(startTime)
    const diffMs = sessionTime.getTime() - now.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 0) return 'Started'
    if (diffMins < 60) return `${diffMins}m`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`
    return `${Math.floor(diffMins / 1440)}d`
  }

  const formatTime = (time: Date | string) => {
    return new Date(time).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
    })
  }

  const isToday = (date: Date | string) => {
    const sessionDate = new Date(date)
    const today = new Date()
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    )
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (sessions.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm">No upcoming classes scheduled</p>
            <p className="text-gray-500 text-xs mt-1">Check back later for new sessions</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Upcoming Classes
          </CardTitle>
          {showViewAll && sessions.length > 0 && (
            <Link href="/student/attendance">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sessions.slice(0, maxItems).map((session, index) => {
            const timeUntil = getTimeUntilSession(session.startTime)
            const isUpcomingToday = isToday(session.startTime)

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  'p-4 rounded-lg border transition-all hover:shadow-md',
                  isUpcomingToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {session.title}
                      </h4>
                      {isUpcomingToday && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    {session.course && (
                      <p className="text-xs text-gray-600 mb-2">{session.course.name}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(session.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </span>
                      </div>
                      {session.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{session.location}</span>
                        </div>
                      )}
                    </div>

                    {session.topic && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="truncate">{session.topic}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold text-blue-600 mb-1">{timeUntil}</div>
                    {session.meetingLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => window.open(session.meetingLink!, '_blank')}
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
