/**
 * Attendance Type Definitions
 * TypeScript types for the attendance tracking system
 */

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'HALF_DAY'
export type SessionType =
  | 'REGULAR'
  | 'DOUBT_CLEARING'
  | 'REVISION'
  | 'TEST'
  | 'PRACTICAL'
  | 'WORKSHOP'
  | 'SEMINAR'
  | 'GUEST_LECTURE'
  | 'EXTRA_CLASS'
export type SessionStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED'

export interface ClassSession {
  id: string
  courseId: string
  enrollmentId?: string | null
  title: string
  description?: string | null
  sessionType: SessionType
  scheduledDate: Date | string
  startTime: Date | string
  endTime: Date | string
  duration: number
  teacherId: string
  meetingLink?: string | null
  meetingId?: string | null
  meetingPassword?: string | null
  location?: string | null
  topic?: string | null
  chapter?: string | null
  syllabusCovered?: any
  status: SessionStatus
  cancelledAt?: Date | string | null
  cancelReason?: string | null
  rescheduledFrom?: string | null
  attendanceMarked: boolean
  totalStudents: number
  presentCount: number
  absentCount: number
  lateCount: number
  recordingUrl?: string | null
  notesUrl?: string | null
  materialsUrl?: any
  homeworkAssigned?: string | null
  metadata?: any
  createdAt: Date | string
  updatedAt: Date | string
  course?: {
    id: string
    name: string
    type: string
    class: string
  }
  teacher?: {
    id: string
    name: string
    email: string
  }
  attendance?: StudentAttendance[]
}

export interface StudentAttendance {
  id: string
  sessionId: string
  studentId: string
  enrollmentId?: string | null
  status: AttendanceStatus
  markedAt: Date | string
  markedBy: string
  checkInTime?: Date | string | null
  checkOutTime?: Date | string | null
  duration?: number | null
  isLate: boolean
  lateBy?: number | null
  notes?: string | null
  isExcused: boolean
  participationScore?: number | null
  deviceInfo?: string | null
  ipAddress?: string | null
  location?: string | null
  metadata?: any
  createdAt: Date | string
  updatedAt: Date | string
  session?: ClassSession
  student?: {
    id: string
    name: string
    email: string
  }
  markedByUser?: {
    id: string
    name: string
  }
}

export interface AttendanceSettings {
  id: string
  courseId?: string | null
  enrollmentId?: string | null
  autoMarkAbsent: boolean
  autoMarkAfterMinutes: number
  lateThresholdMinutes: number
  minAttendancePercentage: number
  allowSelfCheckIn: boolean
  requireLocation: boolean
  allowedLocations?: any
  sendAbsentNotifications: boolean
  sendLateNotifications: boolean
  parentNotifications: boolean
  metadata?: any
  createdAt: Date | string
  updatedAt: Date | string
}

export interface AttendanceStatistics {
  totalSessions: number
  attendedSessions: number
  absentSessions: number
  lateSessions: number
  excusedSessions: number
  attendancePercentage: number
  onTimePercentage: number
  averageParticipationScore: number | null
  totalHoursAttended: number
  currentStreak: number
  longestStreak: number
  recentTrend: 'improving' | 'declining' | 'stable'
  warningLevel: 'none' | 'low' | 'medium' | 'high'
}

export interface MonthlyAttendanceSummary {
  month: string
  year: number
  totalSessions: number
  present: number
  absent: number
  late: number
  excused: number
  percentage: number
}

export interface AttendanceFilter {
  status?: AttendanceStatus | 'ALL'
  sessionType?: SessionType | 'ALL'
  dateFrom?: Date | string
  dateTo?: Date | string
  courseId?: string
  enrollmentId?: string
}

export interface CheckInData {
  sessionId: string
  studentId: string
  deviceInfo?: string
  location?: {
    latitude: number
    longitude: number
  }
}

export interface MarkAttendanceData {
  sessionId: string
  studentId: string
  status: AttendanceStatus
  notes?: string
  isExcused?: boolean
  participationScore?: number
}

export interface BulkMarkAttendanceData {
  sessionId: string
  attendance: Array<{
    studentId: string
    status: AttendanceStatus
    notes?: string
    isExcused?: boolean
    participationScore?: number
  }>
}
