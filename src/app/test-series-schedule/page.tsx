'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Zap,
  Target,
  FileText,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react'
import {
  testSeriesSchedule,
  testInfo,
  getNextUpcomingTest,
  getTestStatus,
  type TestType,
} from '@/data/test-series-schedule'

const phaseColors = {
  Foundation: 'bg-blue-500',
  Advanced: 'bg-purple-500',
  Revision: 'bg-orange-500',
  Mock: 'bg-green-500',
}

const typeLabels: Record<TestType, { label: string; color: string }> = {
  UNIT: { label: 'Unit Test', color: 'bg-blue-100 text-blue-700' },
  CUM: { label: 'Cumulative', color: 'bg-purple-100 text-purple-700' },
  MOCK: { label: 'Grand Mock', color: 'bg-green-100 text-green-700' },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDay(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { weekday: 'short' })
}

export default function TestSeriesSchedulePage() {
  const [selectedTestIndex, setSelectedTestIndex] = useState(0)
  const testListRef = useRef<HTMLDivElement>(null)
  const selectedTestRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const nextTest = getNextUpcomingTest()
    if (nextTest) {
      const index = testSeriesSchedule.findIndex((t) => t.id === nextTest.id)
      if (index !== -1) {
        setSelectedTestIndex(index)
      }
    }
  }, [])

  useEffect(() => {
    if (selectedTestRef.current && testListRef.current) {
      const container = testListRef.current
      const element = selectedTestRef.current
      const containerRect = container.getBoundingClientRect()
      const elementRect = element.getBoundingClientRect()

      if (elementRect.top < containerRect.top || elementRect.bottom > containerRect.bottom) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [selectedTestIndex])

  const selectedTest = testSeriesSchedule[selectedTestIndex]
  const status = getTestStatus(selectedTest)

  const goToPrevious = () => {
    if (selectedTestIndex > 0) {
      setSelectedTestIndex(selectedTestIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedTestIndex < testSeriesSchedule.length - 1) {
      setSelectedTestIndex(selectedTestIndex + 1)
    }
  }

  const goToNextUpcoming = () => {
    const nextTest = getNextUpcomingTest()
    if (nextTest) {
      const index = testSeriesSchedule.findIndex((t) => t.id === nextTest.id)
      if (index !== -1) {
        setSelectedTestIndex(index)
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  NEET 2026 Test Series Schedule
                </h1>
                <p className="text-sm text-gray-500">Premium Biology Test Series</p>
              </div>
            </div>
            <button
              onClick={goToNextUpcoming}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Target className="h-4 w-4" />
              Jump to Next Test
            </button>
          </div>
        </div>
      </header>

      {/* Test Info Banner */}
      <div className="border-b border-gray-200 bg-indigo-50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4 lg:grid-cols-6">
            <div>
              <p className="text-xs text-gray-500">Total Tests</p>
              <p className="text-lg font-bold text-indigo-600">{testInfo.totalTests}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-gray-900">{testInfo.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Test Time</p>
              <p className="text-sm font-semibold text-gray-900">{testInfo.testTime}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Questions</p>
              <p className="text-sm font-semibold text-gray-900">{testInfo.totalQuestions}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-gray-500">Total Marks</p>
              <p className="text-sm font-semibold text-gray-900">{testInfo.totalMarks}</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs text-gray-500">Marking</p>
              <p className="text-sm font-semibold text-gray-900">{testInfo.markingScheme}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Test List - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h2 className="font-semibold text-gray-900">All Tests</h2>
                <p className="text-sm text-gray-500">Click to view details</p>
              </div>
              <div
                ref={testListRef}
                className="max-h-[60vh] overflow-y-auto p-2 lg:max-h-[70vh]"
              >
                {testSeriesSchedule.map((test, index) => {
                  const testStatus = getTestStatus(test)
                  const isSelected = index === selectedTestIndex

                  return (
                    <button
                      key={test.id}
                      ref={isSelected ? selectedTestRef : null}
                      onClick={() => setSelectedTestIndex(index)}
                      className={`mb-1 flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-50 ring-2 ring-indigo-500'
                          : 'hover:bg-gray-50'
                      } ${testStatus === 'next' && !isSelected ? 'bg-green-50' : ''}`}
                    >
                      {/* Status Icon */}
                      <div className="flex-shrink-0">
                        {testStatus === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : testStatus === 'next' ? (
                          <Zap className="h-5 w-5 text-orange-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-300" />
                        )}
                      </div>

                      {/* Test Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">Test {test.id}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-xs font-medium ${typeLabels[test.type].color}`}
                          >
                            {test.type}
                          </span>
                        </div>
                        <p className="truncate text-xs text-gray-500">
                          {formatDate(test.date)}
                        </p>
                      </div>

                      {/* Phase Indicator */}
                      <div
                        className={`h-2 w-2 flex-shrink-0 rounded-full ${phaseColors[test.phase]}`}
                        title={test.phase}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Test Details - Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={goToPrevious}
                disabled={selectedTestIndex === 0}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Test {selectedTestIndex + 1} of {testSeriesSchedule.length}
                </p>
              </div>

              <button
                onClick={goToNext}
                disabled={selectedTestIndex === testSeriesSchedule.length - 1}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Selected Test Card */}
            <div
              className={`overflow-hidden rounded-2xl border-2 shadow-lg ${
                status === 'next'
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-white'
                  : status === 'completed'
                    ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                    : 'border-gray-200 bg-white'
              }`}
            >
              {/* Status Banner */}
              {status === 'next' && (
                <div className="flex items-center justify-center gap-2 bg-orange-500 px-4 py-2 text-white">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-semibold">NEXT UPCOMING TEST</span>
                </div>
              )}
              {status === 'completed' && (
                <div className="flex items-center justify-center gap-2 bg-green-500 px-4 py-2 text-white">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-semibold">COMPLETED</span>
                </div>
              )}

              {/* Test Header */}
              <div className="border-b border-gray-100 p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Test #{selectedTest.id}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${typeLabels[selectedTest.type].color}`}
                      >
                        {typeLabels[selectedTest.type].label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(selectedTest.date)} ({formatDay(selectedTest.date)})
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {testInfo.testTime}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white ${phaseColors[selectedTest.phase]}`}
                  >
                    {selectedTest.phase} Phase
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="p-4 sm:p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Class XI Topics */}
                  <div className="rounded-xl bg-blue-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-blue-900">Class XI Topics</h3>
                    </div>
                    <ul className="space-y-2">
                      {selectedTest.classXITopics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-blue-800"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Class XII Topics */}
                  <div className="rounded-xl bg-purple-50 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-purple-900">Class XII Topics</h3>
                    </div>
                    <ul className="space-y-2">
                      {selectedTest.classXIITopics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-purple-800"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Test Info */}
                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-900">
                    <FileText className="h-4 w-4" />
                    Test Structure
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-gray-500">Questions</p>
                      <p className="font-semibold text-gray-900">90 MCQs</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Marks</p>
                      <p className="font-semibold text-gray-900">360</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">2 Hours</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Marking</p>
                      <p className="font-semibold text-gray-900">+4 / -1</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Legend */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-medium text-gray-700">Phase Legend</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(phaseColors).map(([phase, color]) => (
                  <div key={phase} className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${color}`} />
                    <span className="text-sm text-gray-600">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
