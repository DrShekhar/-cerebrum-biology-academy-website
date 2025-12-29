'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Wifi,
  CheckCircle2,
  XCircle,
  BookOpen,
  FileText,
  Phone,
  GraduationCap,
  Users,
  Zap,
  ArrowRight,
  Layers,
} from 'lucide-react'
import {
  batches,
  neetClasses,
  testSchedules,
  locations,
  locationLabels,
  classTypeLabels,
  formatTimeRange,
  filterBatches,
  getNeetClassByType,
  getTestScheduleByType,
  generateBatchCombinations,
  type ClassType,
  type Location,
  type Batch,
  type BatchCombination,
} from '@/data/timetable-data'

const classTypeColors: Record<
  ClassType,
  { bg: string; text: string; border: string; tab: string }
> = {
  CLASS_11: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    tab: 'bg-blue-600',
  },
  CLASS_12: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    tab: 'bg-purple-600',
  },
  DROPPERS: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    tab: 'bg-orange-600',
  },
  PINNACLE_ZA: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    tab: 'bg-indigo-600',
  },
}

function BatchCard({
  batch,
  selectedLocation,
}: {
  batch: Batch
  selectedLocation: Location | 'ALL'
}) {
  const colors = classTypeColors[batch.classType]
  const isAvailable = batch.status === 'AVAILABLE'

  // Determine if this batch is available offline at the selected location
  const isOfflineAvailable = selectedLocation === 'ALL' || batch.offlineLocation === selectedLocation
  const isOnlineOnly = selectedLocation !== 'ALL' && batch.offlineLocation !== selectedLocation

  return (
    <div
      className={`overflow-hidden rounded-xl border-2 transition-all hover:shadow-lg ${
        isOnlineOnly
          ? 'border-indigo-300 bg-indigo-50'
          : `${colors.border} ${colors.bg}`
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 text-white ${
          isOnlineOnly ? 'bg-indigo-600' : colors.tab
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">BATCH-{batch.batchNumber}</span>
          {isOnlineOnly && (
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-xs">Online Only</span>
          )}
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {isAvailable ? (
            <>
              <CheckCircle2 className="h-3 w-3" />
              Available
            </>
          ) : (
            <>
              <XCircle className="h-3 w-3" />
              Full
            </>
          )}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Days */}
        <div className="flex items-center gap-2">
          <Calendar className={`h-4 w-4 ${isOnlineOnly ? 'text-indigo-600' : colors.text}`} />
          <span className="font-medium text-gray-900">{batch.days.join(' / ')}</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${isOnlineOnly ? 'text-indigo-600' : colors.text}`} />
          <span className="text-gray-700">{formatTimeRange(batch.startTime, batch.endTime)}</span>
        </div>

        <hr className={isOnlineOnly ? 'border-indigo-200' : colors.border} />

        {/* Location Info */}
        {isOnlineOnly ? (
          <>
            {/* Online Only Mode */}
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-indigo-600" />
              <span className="font-medium text-indigo-700">Online Class</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              <span>Offline at {locationLabels[batch.offlineLocation]}</span>
            </div>
          </>
        ) : (
          <>
            {/* Offline + Online Mode */}
            <div className="flex items-center gap-2">
              <MapPin className={`h-4 w-4 ${colors.text}`} />
              <span className="text-gray-700">{locationLabels[batch.offlineLocation]}</span>
            </div>
            {batch.hasOnline && (
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-indigo-600" />
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Offline / Hybrid / Online
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CombinationCard({ combination }: { combination: BatchCombination }) {
  const { class11Batch, class12Batch, combinationType } = combination
  const bothAvailable = class11Batch.status === 'AVAILABLE' && class12Batch.status === 'AVAILABLE'

  return (
    <div
      className={`overflow-hidden rounded-xl border-2 transition-all hover:shadow-lg ${
        combinationType === 'different_days'
          ? 'border-indigo-300 bg-indigo-50'
          : 'border-purple-300 bg-purple-50'
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 text-white ${
          combinationType === 'different_days'
            ? 'bg-indigo-600'
            : 'bg-purple-600'
        }`}
      >
        <div className="flex items-center gap-2">
          {combinationType === 'different_days' ? (
            <Layers className="h-4 w-4" />
          ) : (
            <Zap className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">
            {combinationType === 'different_days' ? 'Different Days' : 'Same Days (Sequential)'}
          </span>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            bothAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {bothAvailable ? 'Available' : 'Check Availability'}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Class 11th */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Class 11th</span>
              <span className="rounded bg-blue-200 px-1.5 py-0.5 text-xs font-medium text-blue-800">
                B-{class11Batch.batchNumber}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-500" />
                {class11Batch.days.join(' / ')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                {formatTimeRange(class11Batch.startTime, class11Batch.endTime)}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-blue-500" />
                {locationLabels[class11Batch.offlineLocation]}
              </div>
            </div>
          </div>

          {/* Class 12th */}
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Class 12th</span>
              <span className="rounded bg-purple-200 px-1.5 py-0.5 text-xs font-medium text-purple-800">
                B-{class12Batch.batchNumber}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-purple-500" />
                {class12Batch.days.join(' / ')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-purple-500" />
                {formatTimeRange(class12Batch.startTime, class12Batch.endTime)}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-purple-500" />
                {locationLabels[class12Batch.offlineLocation]}
              </div>
            </div>
          </div>
        </div>

        {/* Online Badge */}
        <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-indigo-100 px-3 py-2">
          <Wifi className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">
            Both batches available Online
          </span>
        </div>
      </div>
    </div>
  )
}

function NeetClassSection({ classType }: { classType: ClassType }) {
  const colors = classTypeColors[classType]

  if (classType === 'DROPPERS' || classType === 'PINNACLE_ZA') {
    const neet11 = getNeetClassByType('CLASS_11')
    const neet12 = getNeetClassByType('CLASS_12')

    return (
      <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-4`}>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className={`h-5 w-5 ${colors.text}`} />
          <h3 className="font-semibold text-gray-900">NEET Classes (Choose One Per Week)</h3>
        </div>

        <div className="space-y-4">
          {/* Class 11th NEET */}
          <div className="rounded-lg bg-white p-3">
            <p className="mb-2 text-sm font-medium text-blue-700">Class 11th NEET:</p>
            {neet11 && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-2 text-sm">
                  <span className="font-medium">Option A:</span> {neet11.optionA.day}{' '}
                  {neet11.optionA.time}
                </div>
                <div className="rounded-lg bg-blue-50 p-2 text-sm">
                  <span className="font-medium">Option B:</span> {neet11.optionB.day}{' '}
                  {neet11.optionB.time}
                </div>
              </div>
            )}
          </div>

          {/* Class 12th NEET */}
          <div className="rounded-lg bg-white p-3">
            <p className="mb-2 text-sm font-medium text-purple-700">Class 12th NEET:</p>
            {neet12 && (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg bg-purple-50 p-2 text-sm">
                  <span className="font-medium">Option A:</span> {neet12.optionA.day}{' '}
                  {neet12.optionA.time}
                </div>
                <div className="rounded-lg bg-purple-50 p-2 text-sm">
                  <span className="font-medium">Option B:</span> {neet12.optionB.day}{' '}
                  {neet12.optionB.time}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const neetClass = getNeetClassByType(classType as 'CLASS_11' | 'CLASS_12')
  if (!neetClass) return null

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-4`}>
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className={`h-5 w-5 ${colors.text}`} />
        <h3 className="font-semibold text-gray-900">NEET Class (Choose One Per Week)</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-3">
          <p className="mb-1 text-xs font-medium text-gray-500">Option A</p>
          <p className="font-medium text-gray-900">
            {neetClass.optionA.day} {neetClass.optionA.time}
          </p>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="mb-1 text-xs font-medium text-gray-500">Option B</p>
          <p className="font-medium text-gray-900">
            {neetClass.optionB.day} {neetClass.optionB.time}
          </p>
        </div>
      </div>
    </div>
  )
}

function TestScheduleSection({ classType }: { classType: ClassType }) {
  const colors = classTypeColors[classType]

  if (classType === 'DROPPERS' || classType === 'PINNACLE_ZA') {
    const test11 = getTestScheduleByType('CLASS_11')
    const test12 = getTestScheduleByType('CLASS_12')

    return (
      <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-4`}>
        <div className="mb-3 flex items-center gap-2">
          <FileText className={`h-5 w-5 ${colors.text}`} />
          <h3 className="font-semibold text-gray-900">Weekly Tests</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {test11 && (
            <div className="rounded-lg bg-white p-3">
              <p className="mb-1 text-xs font-medium text-blue-600">Class 11th Test</p>
              <p className="font-medium text-gray-900">
                {test11.day} {test11.time}
              </p>
              <p className="mt-1 text-xs text-gray-500">{test11.mode}</p>
            </div>
          )}
          {test12 && (
            <div className="rounded-lg bg-white p-3">
              <p className="mb-1 text-xs font-medium text-purple-600">Class 12th Test</p>
              <p className="font-medium text-gray-900">
                {test12.day} {test12.time}
              </p>
              <p className="mt-1 text-xs text-gray-500">{test12.mode}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const testSchedule = getTestScheduleByType(classType as 'CLASS_11' | 'CLASS_12')
  if (!testSchedule) return null

  return (
    <div className={`rounded-xl border-2 ${colors.border} ${colors.bg} p-4`}>
      <div className="mb-3 flex items-center gap-2">
        <FileText className={`h-5 w-5 ${colors.text}`} />
        <h3 className="font-semibold text-gray-900">Weekly Test</h3>
      </div>
      <div className="rounded-lg bg-white p-3">
        <p className="font-medium text-gray-900">
          {testSchedule.day} {testSchedule.time}
        </p>
        <p className="mt-1 text-sm text-gray-500">{testSchedule.mode}</p>
      </div>
    </div>
  )
}

export default function TimetablePage() {
  const [selectedClassType, setSelectedClassType] = useState<ClassType>('CLASS_11')
  const [selectedLocation, setSelectedLocation] = useState<Location | 'ALL'>('ALL')
  const [combinationFilter, setCombinationFilter] = useState<'all' | 'different_days' | 'same_days'>('all')

  const allBatches = filterBatches(selectedClassType, selectedLocation)
  const colors = classTypeColors[selectedClassType]

  // Sort batches: offline-available first, then online-only
  const filteredBatches = useMemo(() => {
    if (selectedLocation === 'ALL') {
      return allBatches
    }
    // Sort so batches at selected location appear first
    return [...allBatches].sort((a, b) => {
      const aIsOffline = a.offlineLocation === selectedLocation
      const bIsOffline = b.offlineLocation === selectedLocation
      if (aIsOffline && !bIsOffline) return -1
      if (!aIsOffline && bIsOffline) return 1
      return 0
    })
  }, [allBatches, selectedLocation])

  // Generate combinations for Pinnacle ZA
  const allCombinations = useMemo(() => generateBatchCombinations(), [])

  const filteredCombinations = useMemo(() => {
    let filtered = allCombinations

    // Filter by location if selected
    if (selectedLocation !== 'ALL') {
      filtered = filtered.filter(
        (c) =>
          c.class11Batch.offlineLocation === selectedLocation ||
          c.class12Batch.offlineLocation === selectedLocation
      )
    }

    // Filter by combination type
    if (combinationFilter === 'different_days') {
      filtered = filtered.filter((c) => c.combinationType === 'different_days')
    } else if (combinationFilter === 'same_days') {
      filtered = filtered.filter((c) => c.combinationType === 'same_days_sequential')
    }

    return filtered
  }, [allCombinations, selectedLocation, combinationFilter])

  const tabConfig: { type: ClassType; icon: React.ElementType; label: string }[] = [
    { type: 'CLASS_11', icon: BookOpen, label: 'Class 11th' },
    { type: 'CLASS_12', icon: GraduationCap, label: 'Class 12th' },
    { type: 'DROPPERS', icon: Users, label: 'Droppers' },
    { type: 'PINNACLE_ZA', icon: Zap, label: 'Pinnacle ZA' },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
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
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Batch Timetable</h1>
                <p className="text-sm text-gray-500">Cerebrum Biology Academy</p>
              </div>
            </div>
            <a
              href="tel:9188264434"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <Phone className="h-4 w-4" />
              Contact: 9188264434
            </a>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-1 overflow-x-auto py-2" aria-label="Tabs">
            {tabConfig.map(({ type, icon: Icon, label }) => {
              const isSelected = selectedClassType === type
              const tabColors = classTypeColors[type]
              const count =
                type === 'PINNACLE_ZA'
                  ? allCombinations.length
                  : batches.filter((b) => b.classType === type).length

              return (
                <button
                  key={type}
                  onClick={() => setSelectedClassType(type)}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
                    isSelected
                      ? `${tabColors.tab} text-white shadow-md`
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      isSelected ? 'bg-white/20' : 'bg-gray-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Location Filter */}
      <div className={`border-b ${colors.border} ${colors.bg}`}>
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <MapPin className={`h-4 w-4 ${colors.text}`} />
              <span className="text-sm font-medium text-gray-700">Filter by Location:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as Location | 'ALL')}
                className={`rounded-lg border ${colors.border} bg-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="ALL">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {locationLabels[loc]}
                  </option>
                ))}
              </select>

              {/* Combination type filter for Pinnacle ZA */}
              {selectedClassType === 'PINNACLE_ZA' && (
                <select
                  value={combinationFilter}
                  onChange={(e) => setCombinationFilter(e.target.value as 'all' | 'different_days' | 'same_days')}
                  className="rounded-lg border border-indigo-300 bg-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Combinations</option>
                  <option value="different_days">Different Days Only</option>
                  <option value="same_days">Same Days (Sequential)</option>
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Info Banner for Location Filter */}
        {selectedLocation !== 'ALL' && selectedClassType !== 'PINNACLE_ZA' && (
          <div className="mb-6 rounded-xl border-2 border-indigo-300 bg-indigo-50 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-indigo-900 mb-1">
                  Showing batches for {locationLabels[selectedLocation]}
                </p>
                <p className="text-sm text-indigo-800">
                  <span className="font-medium text-green-700">Offline / Hybrid / Online:</span> Attend at{' '}
                  {locationLabels[selectedLocation]} center, join online, or mix both.
                  <br />
                  <span className="font-medium text-indigo-700">Online Only:</span> Batches at other
                  centers - available for online attendance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Banner for Droppers */}
        {selectedClassType === 'DROPPERS' && (
          <div className="mb-6 rounded-xl border-2 border-orange-300 bg-orange-50 p-4">
            <p className="text-sm text-orange-800">
              <span className="font-semibold">Note for Droppers:</span> Each batch covers both Class
              11th and Class 12th syllabus. Choose one batch that fits your schedule. You will
              attend NEET classes and tests for both classes.
            </p>
          </div>
        )}

        {/* Info Banner for Pinnacle ZA */}
        {selectedClassType === 'PINNACLE_ZA' && (
          <div className="mb-6 rounded-xl border-2 border-indigo-300 bg-indigo-50 p-4">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="font-semibold text-indigo-900 mb-1">Pinnacle ZA - Mix & Match Schedule</p>
                <p className="text-sm text-indigo-800">
                  For Droppers who want flexible scheduling. Choose any Class 11th batch + any Class 12th batch
                  that don&apos;t clash. You attend both separately - same syllabus as regular Dropper batches,
                  but with more timing options!
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">
                    <Layers className="h-3 w-3" />
                    Different Days: 11th on some days, 12th on other days
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                    <ArrowRight className="h-3 w-3" />
                    Sequential: Both on same days, back-to-back
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Batch Cards Grid or Combinations */}
        <div className="mb-8">
          {selectedClassType === 'PINNACLE_ZA' ? (
            <>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Available Combinations
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredCombinations.length} combinations)
                </span>
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredCombinations.map((combination) => (
                  <CombinationCard key={combination.id} combination={combination} />
                ))}
              </div>
              {filteredCombinations.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
                  <p className="text-gray-500">No combinations match your filters.</p>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Available Batches
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({filteredBatches.length} batches)
                </span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} selectedLocation={selectedLocation} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* NEET Class & Test Schedule */}
        <div className="grid gap-6 lg:grid-cols-2">
          <NeetClassSection classType={selectedClassType} />
          <TestScheduleSection classType={selectedClassType} />
        </div>

        {/* Centers Info */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Our Centers</h3>
          <div className="flex flex-wrap gap-3">
            {locations.map((loc) => (
              <div
                key={loc}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5"
              >
                <MapPin className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-sm text-gray-700">{locationLabels[loc]}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5">
              <Wifi className="h-3.5 w-3.5 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Online (Available at ALL locations)
              </span>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-6 rounded-xl bg-indigo-600 p-6 text-center text-white">
          <h3 className="mb-2 text-lg font-semibold">Ready to Enroll?</h3>
          <p className="mb-4 text-sm text-indigo-100">
            Contact us to book your batch or for any queries
          </p>
          <a
            href="tel:9188264434"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            <Phone className="h-4 w-4" />
            Call Now: 9188264434
          </a>
        </div>
      </div>
    </main>
  )
}
