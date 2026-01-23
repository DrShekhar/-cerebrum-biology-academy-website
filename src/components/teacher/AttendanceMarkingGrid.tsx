/**
 * Attendance Marking Grid Component
 * Interactive grid for marking student attendance
 */

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MinusCircle,
  Search,
  Save,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AttendanceStatus } from '@/types/attendance'

interface Student {
  id: string
  name: string
  email: string
  phone?: string
  enrollmentId: string
  attendance: {
    id: string
    status: AttendanceStatus
    checkInTime?: Date | string | null
    notes?: string | null
    participationScore?: number | null
  } | null
}

interface AttendanceMarkingGridProps {
  students: Student[]
  onSave: (records: AttendanceRecord[]) => Promise<void>
  isSubmitting?: boolean
}

interface AttendanceRecord {
  studentId: string
  status: AttendanceStatus
  checkInTime?: string
  notes?: string
  participationScore?: number
}

const statusOptions: {
  status: AttendanceStatus
  label: string
  icon: React.ElementType
  color: string
}[] = [
  {
    status: 'PRESENT',
    label: 'Present',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200',
  },
  {
    status: 'ABSENT',
    label: 'Absent',
    icon: XCircle,
    color: 'bg-red-100 text-red-800 border-red-300 hover:bg-red-200',
  },
  {
    status: 'LATE',
    label: 'Late',
    icon: Clock,
    color: 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200',
  },
  {
    status: 'EXCUSED',
    label: 'Excused',
    icon: AlertCircle,
    color: 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200',
  },
  {
    status: 'HALF_DAY',
    label: 'Half Day',
    icon: MinusCircle,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200',
  },
]

export function AttendanceMarkingGrid({
  students,
  onSave,
  isSubmitting = false,
}: AttendanceMarkingGridProps) {
  const [attendanceMap, setAttendanceMap] = useState<Map<string, AttendanceRecord>>(() => {
    const map = new Map<string, AttendanceRecord>()
    students.forEach((student) => {
      if (student.attendance) {
        map.set(student.id, {
          studentId: student.id,
          status: student.attendance.status,
          checkInTime: student.attendance.checkInTime
            ? new Date(student.attendance.checkInTime).toISOString()
            : undefined,
          notes: student.attendance.notes || undefined,
          participationScore: student.attendance.participationScore || undefined,
        })
      }
    })
    return map
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const updateAttendance = (studentId: string, updates: Partial<AttendanceRecord>) => {
    setAttendanceMap((prev) => {
      const newMap = new Map(prev)
      const existing = newMap.get(studentId) || { studentId, status: 'ABSENT' }
      newMap.set(studentId, { ...existing, ...updates })
      return newMap
    })
  }

  const markAllAs = (status: AttendanceStatus) => {
    setAttendanceMap((prev) => {
      const newMap = new Map(prev)
      filteredStudents.forEach((student) => {
        const existing = newMap.get(student.id) || { studentId: student.id, status: 'ABSENT' }
        newMap.set(student.id, { ...existing, status })
      })
      return newMap
    })
  }

  const handleSave = async () => {
    const records = Array.from(attendanceMap.values())
    await onSave(records)
  }

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statistics = {
    total: students.length,
    marked: attendanceMap.size,
    present: Array.from(attendanceMap.values()).filter(
      (r) => r.status === 'PRESENT' || r.status === 'LATE' || r.status === 'HALF_DAY'
    ).length,
    absent: Array.from(attendanceMap.values()).filter((r) => r.status === 'ABSENT').length,
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Students</p>
          <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Marked</p>
          <p className="text-2xl font-bold text-blue-600">{statistics.marked}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Present</p>
          <p className="text-2xl font-bold text-green-600">{statistics.present}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Absent</p>
          <p className="text-2xl font-bold text-red-600">{statistics.absent}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Mark All As:</span>
        {statusOptions.map((option) => {
          const Icon = option.icon
          return (
            <Button
              key={option.status}
              variant="outline"
              size="sm"
              onClick={() => markAllAs(option.status)}
              className={cn('flex items-center gap-1', option.color)}
            >
              <Icon className="w-4 h-4" />
              {option.label}
            </Button>
          )
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search students by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students Grid */}
      <div className="space-y-3">
        {filteredStudents.map((student) => {
          const attendance = attendanceMap.get(student.id)
          const currentStatus = attendance?.status || 'ABSENT'
          const isExpanded = expandedStudent === student.id

          return (
            <div
              key={student.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  {statusOptions.map((option) => {
                    const Icon = option.icon
                    const isSelected = currentStatus === option.status

                    return (
                      <button
                        key={option.status}
                        onClick={() => updateAttendance(student.id, { status: option.status })}
                        className={cn(
                          'p-2 rounded-lg border-2 transition-all',
                          isSelected
                            ? option.color + ' border-current'
                            : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                        )}
                        title={option.label}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    )
                  })}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedStudent(isExpanded ? null : student.id)}
                  >
                    {isExpanded ? 'Less' : 'More'}
                  </Button>
                </div>
              </div>

              {isExpanded && (
                <div className="pt-3 border-t border-gray-200 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in Time (optional)
                    </label>
                    <Input
                      type="datetime-local"
                      value={
                        attendance?.checkInTime
                          ? new Date(attendance.checkInTime).toISOString().slice(0, 16)
                          : ''
                      }
                      onChange={(e) =>
                        updateAttendance(student.id, {
                          checkInTime: e.target.value
                            ? new Date(e.target.value).toISOString()
                            : undefined,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Participation Score (0-10)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      value={attendance?.participationScore || ''}
                      onChange={(e) =>
                        updateAttendance(student.id, {
                          participationScore: e.target.value ? parseInt(e.target.value) : undefined,
                        })
                      }
                      placeholder="Rate participation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes (optional)
                    </label>
                    <textarea
                      value={attendance?.notes || ''}
                      onChange={(e) => updateAttendance(student.id, { notes: e.target.value })}
                      rows={2}
                      placeholder="Add any notes..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg sticky bottom-4">
        <div className="text-sm text-gray-600">
          <Users className="w-4 h-4 inline mr-1" />
          {statistics.marked} of {statistics.total} students marked
        </div>
        <Button
          onClick={handleSave}
          disabled={isSubmitting || attendanceMap.size === 0}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? 'Saving...' : 'Save Attendance'}
        </Button>
      </div>
    </div>
  )
}
