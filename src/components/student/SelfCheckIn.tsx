'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  LogIn,
  LogOut,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Video,
  BookOpen,
  User,
  Timer,
  Wifi,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { showToast } from '@/lib/toast'

interface ActiveSession {
  id: string
  title: string
  description?: string
  sessionType: string
  startTime: string
  endTime: string
  status: string
  allowSelfCheckIn: boolean
  course?: {
    id: string
    name: string
  }
  teacher?: {
    id: string
    name: string
  }
  attendance?: {
    id?: string
    status?: string
    checkInTime?: string
    checkOutTime?: string
    isLate?: boolean
    lateBy?: number
    canCheckIn: boolean
    canCheckOut: boolean
  }
}

export function SelfCheckIn() {
  const [sessions, setSessions] = useState<ActiveSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [checkingIn, setCheckingIn] = useState<string | null>(null)
  const [checkingOut, setCheckingOut] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchActiveSessions = useCallback(async () => {
    try {
      const response = await fetch('/api/student/attendance/check-in')
      const data = await response.json()

      if (data.success) {
        setSessions(data.data.sessions)
      }
    } catch (error) {
      console.error('Error fetching active sessions:', error)
    } finally {
      setIsLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchActiveSessions()

    const interval = setInterval(fetchActiveSessions, 60000)

    return () => clearInterval(interval)
  }, [fetchActiveSessions])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchActiveSessions()
  }

  const handleCheckIn = async (sessionId: string) => {
    setCheckingIn(sessionId)
    try {
      const response = await fetch('/api/student/attendance/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          action: 'check-in',
          deviceInfo: navigator.userAgent,
        }),
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(data.message)
        fetchActiveSessions()
      } else {
        showToast.error(data.error || 'Failed to check in')
      }
    } catch (error) {
      console.error('Check-in error:', error)
      showToast.error('Failed to check in. Please try again.')
    } finally {
      setCheckingIn(null)
    }
  }

  const handleCheckOut = async (sessionId: string) => {
    setCheckingOut(sessionId)
    try {
      const response = await fetch('/api/student/attendance/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          action: 'check-out',
          deviceInfo: navigator.userAgent,
        }),
      })

      const data = await response.json()

      if (data.success) {
        showToast.success(data.message)
        fetchActiveSessions()
      } else {
        showToast.error(data.error || 'Failed to check out')
      }
    } catch (error) {
      console.error('Check-out error:', error)
      showToast.error('Failed to check out. Please try again.')
    } finally {
      setCheckingOut(null)
    }
  }

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'REGULAR':
        return <BookOpen className="w-4 h-4" />
      case 'DOUBT_CLEARING':
        return <AlertCircle className="w-4 h-4" />
      case 'TEST':
        return <Timer className="w-4 h-4" />
      default:
        return <Video className="w-4 h-4" />
    }
  }

  const getTimeUntilSession = (startTime: string) => {
    const now = new Date()
    const start = new Date(startTime)
    const diff = start.getTime() - now.getTime()

    if (diff <= 0) return 'Started'

    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `Starts in ${minutes} min`

    const hours = Math.floor(minutes / 60)
    return `Starts in ${hours}h ${minutes % 60}m`
  }

  const isSessionOngoing = (session: ActiveSession) => {
    const now = new Date()
    const start = new Date(session.startTime)
    const end = new Date(session.endTime)
    return now >= start && now <= end
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wifi className="w-5 h-5 text-green-600" />
            Active Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wifi className="w-5 h-5 text-green-600" />
            Check In / Check Out
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-1"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((session, index) => {
                const isOngoing = isSessionOngoing(session)
                const hasCheckedIn = !!session.attendance?.checkInTime
                const hasCheckedOut = !!session.attendance?.checkOutTime

                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'p-4 rounded-lg border transition-all',
                      isOngoing ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white',
                      hasCheckedIn && !hasCheckedOut && 'ring-2 ring-green-500'
                    )}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getSessionTypeIcon(session.sessionType)}
                          <h4 className="font-semibold text-gray-900 truncate">{session.title}</h4>
                        </div>

                        {session.course && (
                          <p className="text-sm text-gray-600 mb-2">{session.course.name}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                          </span>
                          {session.teacher && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {session.teacher.name}
                            </span>
                          )}
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded-full font-medium',
                              isOngoing
                                ? 'bg-green-200 text-green-800'
                                : 'bg-yellow-200 text-yellow-800'
                            )}
                          >
                            {isOngoing ? 'Ongoing' : getTimeUntilSession(session.startTime)}
                          </span>
                        </div>

                        {hasCheckedIn && (
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-700">
                              Checked in at {formatTime(session.attendance!.checkInTime!)}
                              {session.attendance?.isLate && (
                                <span className="text-orange-600 ml-1">
                                  ({session.attendance.lateBy} min late)
                                </span>
                              )}
                            </span>
                            {hasCheckedOut && (
                              <span className="text-gray-600">
                                • Checked out at {formatTime(session.attendance!.checkOutTime!)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                        {session.allowSelfCheckIn ? (
                          <>
                            {session.attendance?.canCheckIn && (
                              <Button
                                size="sm"
                                onClick={() => handleCheckIn(session.id)}
                                disabled={checkingIn === session.id}
                                className="gap-1 bg-green-600 hover:bg-green-700 flex-1 sm:flex-none sm:min-w-[100px]"
                              >
                                {checkingIn === session.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <LogIn className="w-4 h-4" />
                                )}
                                Check In
                              </Button>
                            )}
                            {session.attendance?.canCheckOut && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCheckOut(session.id)}
                                disabled={checkingOut === session.id}
                                className="gap-1 border-red-300 text-red-600 hover:bg-red-50 flex-1 sm:flex-none sm:min-w-[100px]"
                              >
                                {checkingOut === session.id ? (
                                  <RefreshCw className="w-4 h-4 animate-spin" />
                                ) : (
                                  <LogOut className="w-4 h-4" />
                                )}
                                Check Out
                              </Button>
                            )}
                            {hasCheckedIn && hasCheckedOut && (
                              <span className="text-xs text-gray-500 text-center">Completed</span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                            Manual attendance
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No active sessions</p>
              <p className="text-sm text-gray-400 mt-1">
                Sessions will appear here when they&apos;re about to start
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default SelfCheckIn
