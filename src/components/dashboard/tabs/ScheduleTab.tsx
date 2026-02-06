'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Target,
  ArrowRight,
  CheckCircle,
  Circle,
  Flame,
} from 'lucide-react'

interface WeakArea {
  chapter: string
  topic: string
  difficulty: 'low' | 'medium' | 'high'
  improvement: number
  recommendedStudyTime: number
}

interface ScheduleTabProps {
  weakAreas: WeakArea[]
  studyStreak?: number
}

interface DayPlan {
  completed: boolean
  goalMinutes: number
}

interface ScheduleData {
  dailyTargetMinutes: number
  weekPlan: Record<string, DayPlan>
}

const STORAGE_KEY = 'cerebrum-schedule-data'
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getWeekKey(): string {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now)
  monday.setDate(diff)
  return monday.toISOString().split('T')[0]
}

function getDefaultSchedule(): ScheduleData {
  const weekPlan: Record<string, DayPlan> = {}
  DAYS.forEach((day) => {
    weekPlan[day] = { completed: false, goalMinutes: 120 }
  })
  return { dailyTargetMinutes: 120, weekPlan }
}

function loadSchedule(): ScheduleData {
  if (typeof window === 'undefined') return getDefaultSchedule()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultSchedule()
    const parsed = JSON.parse(raw)
    if (parsed.weekKey !== getWeekKey()) {
      return getDefaultSchedule()
    }
    return parsed.data
  } catch {
    return getDefaultSchedule()
  }
}

function saveSchedule(data: ScheduleData) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ weekKey: getWeekKey(), data })
    )
  } catch {
    console.error('Failed to save schedule')
  }
}

export function ScheduleTab({ weakAreas, studyStreak = 0 }: ScheduleTabProps) {
  const [schedule, setSchedule] = useState<ScheduleData>(getDefaultSchedule)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSchedule(loadSchedule())
    setMounted(true)
  }, [])

  const updateSchedule = useCallback((updater: (prev: ScheduleData) => ScheduleData) => {
    setSchedule((prev) => {
      const next = updater(prev)
      saveSchedule(next)
      return next
    })
  }, [])

  const toggleDayCompleted = (day: string) => {
    updateSchedule((prev) => ({
      ...prev,
      weekPlan: {
        ...prev.weekPlan,
        [day]: { ...prev.weekPlan[day], completed: !prev.weekPlan[day].completed },
      },
    }))
  }

  const setDailyTarget = (minutes: number) => {
    updateSchedule((prev) => {
      const newWeekPlan = { ...prev.weekPlan }
      DAYS.forEach((day) => {
        newWeekPlan[day] = { ...newWeekPlan[day], goalMinutes: minutes }
      })
      return { ...prev, dailyTargetMinutes: minutes, weekPlan: newWeekPlan }
    })
  }

  const todayIndex = new Date().getDay()
  const todayKey = DAYS[todayIndex === 0 ? 6 : todayIndex - 1]
  const completedDays = DAYS.filter((d) => schedule.weekPlan[d]?.completed).length
  const recommendedTopics = weakAreas.slice(0, 4)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Today's Plan */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Today&apos;s Plan</h3>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium ml-auto">
            {todayKey}
          </span>
        </div>

        {recommendedTopics.length > 0 ? (
          <div className="space-y-2">
            {recommendedTopics.map((area, idx) => (
              <div
                key={area.chapter}
                className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100"
              >
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{idx + 1}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{area.chapter}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{area.recommendedStudyTime} min</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        area.difficulty === 'high'
                          ? 'bg-red-100 text-red-600'
                          : area.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-green-100 text-green-600'
                      }`}
                    >
                      {area.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-sm">
              Take some tests to get personalized study recommendations
            </p>
          </div>
        )}
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Weekly Overview</h3>
          <span className="text-xs text-gray-500">
            {completedDays}/{DAYS.length} days
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-4">
          {DAYS.map((day) => {
            const isToday = day === todayKey
            const plan = schedule.weekPlan[day]
            const isCompleted = mounted && plan?.completed
            return (
              <button
                key={day}
                onClick={() => toggleDayCompleted(day)}
                className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg transition-all min-h-[48px] ${
                  isCompleted
                    ? 'bg-green-100 border-2 border-green-400'
                    : isToday
                      ? 'bg-blue-50 border-2 border-blue-400'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span
                  className={`text-[10px] sm:text-xs font-medium ${
                    isToday ? 'text-blue-700' : 'text-gray-600'
                  }`}
                >
                  {day}
                </span>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                )}
              </button>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedDays / DAYS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Study Goals & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Target */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">Daily Target</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[60, 90, 120, 180, 240].map((mins) => (
              <button
                key={mins}
                onClick={() => setDailyTarget(mins)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors min-h-[40px] ${
                  mounted && schedule.dailyTargetMinutes === mins
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mins >= 60 ? `${mins / 60}h` : `${mins}m`}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Current target: {schedule.dailyTargetMinutes} minutes per day
          </p>
        </div>

        {/* Streak */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-5 h-5" />
            <h3 className="text-base sm:text-lg font-bold">Study Streak</h3>
          </div>
          <div className="text-4xl font-bold mb-1">{studyStreak}</div>
          <p className="text-sm text-white/80 mb-3">
            {studyStreak === 0
              ? 'Start studying today to begin your streak!'
              : studyStreak >= 7
                ? "You're on fire! Keep it up!"
                : 'Keep going to build your habit!'}
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/neet-study-plan-generator"
          className="flex items-center justify-between bg-white rounded-xl shadow-lg border border-slate-200 p-4 hover:shadow-xl transition-all min-h-[48px] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                Generate Full Study Plan
              </h4>
              <p className="text-xs text-gray-500">AI-powered weekly schedule</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>
        <Link
          href="/neet-exam-countdown"
          className="flex items-center justify-between bg-white rounded-xl shadow-lg border border-slate-200 p-4 hover:shadow-xl transition-all min-h-[48px] group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                NEET Countdown
              </h4>
              <p className="text-xs text-gray-500">Track days until exam</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </Link>
      </div>
    </div>
  )
}
