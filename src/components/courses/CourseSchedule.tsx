'use client'

import { useState } from 'react'
import { CourseProgram, CourseSeries } from '@/types/courseSystem'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  MapPin,
  AlertCircle,
  Download,
  Phone,
  CalendarPlus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react'
import {
  batches as timetableBatches,
  formatTimeRange,
  locationLabels,
  classTypeLabels,
  type ClassType,
} from '@/data/timetable-data'

interface CourseScheduleProps {
  course: CourseProgram
}

// Map course targetClass to timetable ClassTypes
function getClassTypesForCourse(targetClass: string): ClassType[] {
  switch (targetClass) {
    case '9th':
      return ['CLASS_9', 'USA_NEET_9', 'OLYMPIAD_NSEB', 'OLYMPIAD_IBO']
    case '10th':
      return ['PINNACLE_NEET_10', 'USA_NEET_10', 'OLYMPIAD_NSEB', 'OLYMPIAD_IBO']
    case '11th':
      return ['CLASS_11', 'USA_NEET_11', 'OLYMPIAD_NSEB', 'OLYMPIAD_IBO', 'NEET_PRACTICE_11']
    case '12th':
      return ['CLASS_12', 'USA_NEET_12', 'CRASH_COURSE', 'NEET_PRACTICE_12']
    case 'Dropper':
      return ['DROPPERS', 'CRASH_COURSE', 'NEET_PRACTICE_11', 'NEET_PRACTICE_12']
    default:
      return ['CLASS_11']
  }
}

function getRealBatchesForCourse(targetClass: string) {
  const classTypes = getClassTypesForCourse(targetClass)
  return timetableBatches
    .filter((b) => classTypes.includes(b.classType))
    .map((b) => ({
      id: b.id,
      name: `${classTypeLabels[b.classType]} — Batch ${b.batchNumber}`,
      timing: formatTimeRange(b.startTime, b.endTime),
      days: b.days,
      availableSeats: b.status === 'AVAILABLE' ? 5 : 0,
      totalSeats: 12,
      startDate: '1st Week of April 2026',
      faculty: 'Dr. Shekhar Singh',
      mode: b.hasOnline ? 'Hybrid' : 'Offline',
      location: b.hasOnline
        ? `${locationLabels[b.offlineLocation]} + Online`
        : locationLabels[b.offlineLocation],
      classType: b.classType,
    }))
}

const holidays = [
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-14', name: 'Holi' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-11-08', name: 'Diwali Break' },
]

export function CourseSchedule({ course }: CourseScheduleProps) {
  const [selectedTier, setSelectedTier] = useState<CourseSeries>('ascent')
  const realBatches = getRealBatchesForCourse(course.targetClass)

  const BatchCard = ({ batch, tier }: { batch: any; tier: CourseSeries }) => {
    const occupancyRate = ((batch.totalSeats - batch.availableSeats) / batch.totalSeats) * 100
    const urgencyLevel =
      batch.availableSeats <= 3 ? 'high' : batch.availableSeats <= 7 ? 'medium' : 'low'

    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{batch.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {batch.timing}
            </div>
          </div>
          <div className="text-right">
            <Badge
              variant={
                urgencyLevel === 'high'
                  ? 'destructive'
                  : urgencyLevel === 'medium'
                    ? 'secondary'
                    : 'default'
              }
              className="mb-2"
            >
              {batch.availableSeats} seats left
            </Badge>
            <div className="text-xs text-gray-500">
              {batch.totalSeats - batch.availableSeats}/{batch.totalSeats} enrolled
            </div>
          </div>
        </div>

        {/* Batch Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>{batch.days.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-green-600" />
            <span>Faculty: {batch.faculty}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-purple-500" />
            <span>{batch.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarPlus className="h-4 w-4 text-orange-500" />
            <span>Starts: {batch.startDate}</span>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Batch Occupancy</span>
            <span>{Math.round(occupancyRate)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                occupancyRate >= 80
                  ? 'bg-red-500'
                  : occupancyRate >= 60
                    ? 'bg-yellow-500'
                    : 'bg-green-600'
              }`}
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        {/* Mode Badge */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {batch.mode}
          </Badge>
          <Button size="sm" className="text-sm">
            Reserve Seat
          </Button>
        </div>

        {/* Urgency Message */}
        {urgencyLevel === 'high' && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="h-3 w-3" />
            Limited seats available! Enroll soon to secure your spot.
          </div>
        )}
      </Card>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Flexible Schedule Options
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Choose from multiple batch timings and learning modes to fit your schedule and learning
            preferences
          </p>
        </div>

        {/* Real Batch Schedule */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {realBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} tier={selectedTier} />
            ))}
          </div>
          {realBatches.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Schedule coming soon. Contact us for details.</p>
            </div>
          )}
          <div className="text-center mt-8">
            <a
              href="/timetable"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              View Full Master Timetable
            </a>
          </div>
        </div>

        {/* Schedule Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* General Schedule Info */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              General Schedule Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weekly Hours:</span>
                <span className="font-medium">{course.teachingHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days per Week:</span>
                <span className="font-medium">{course.schedule.daysPerWeek} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours per Day:</span>
                <span className="font-medium">{course.schedule.hoursPerDay} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Makeup Classes:</span>
                <span className="font-medium flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  {course.schedule.makeupClasses ? 'Available' : 'Not Available'}
                </span>
              </div>
            </div>
          </Card>

          {/* Flexibility & Policies */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-600" />
              Flexibility & Policies
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Batch Flexibility</h4>
                <p className="text-sm text-gray-600">{course.schedule.flexibility}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Makeup Classes</h4>
                <p className="text-sm text-gray-600">
                  Free makeup classes for valid absences. Must be requested within 48 hours.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Holiday Schedule</h4>
                <p className="text-sm text-gray-600">{course.schedule.holidaySchedule}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Batch Transfer</h4>
                <p className="text-sm text-gray-600">
                  One-time batch transfer allowed within the same tier during the course.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Holiday Calendar */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Important Dates & Holidays
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays.map((holiday, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-purple-600 font-semibold text-sm">
                  {new Date(holiday.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <div className="text-sm text-gray-700">{holiday.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            * Classes will be compensated with special revision sessions or extended hours before
            exams
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <CalendarPlus className="h-5 w-5 mr-2" />
              Book Counseling Session
            </Button>
            <Button size="lg" variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Download Schedule PDF
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-5 w-5 mr-2" />
              Call for Custom Schedule
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <span className="font-medium">Need a custom schedule?</span> Our counselors can work
                with you to find the perfect timing that fits your school/college schedule and other
                commitments.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
