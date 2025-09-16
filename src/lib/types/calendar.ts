export interface TimeSlot {
  start: string // HH:MM format
  end: string // HH:MM format
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  type: 'demo_class' | 'regular_class' | 'meeting' | 'break' | 'blocked' | 'personal'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'

  // Timing
  startTime: Date
  endTime: Date
  duration: number // minutes
  timezone: string

  // Participants
  facultyId: string
  facultyName: string
  studentIds: string[]
  studentNames: string[]
  maxCapacity?: number
  currentEnrollment: number

  // Course/Demo Details
  courseId?: string
  courseName?: string
  subject: 'biology' | 'physics' | 'chemistry'
  grade: '11' | '12' | 'dropper' | 'foundation'

  // Location & Method
  location: 'online' | 'offline' | 'hybrid'
  meetingLink?: string
  classroomId?: string
  classroomName?: string

  // Metadata
  createdBy: string
  createdAt: Date
  updatedAt: Date
  notes?: string
  recordingEnabled: boolean
  attendanceTracked: boolean

  // Recurrence
  isRecurring: boolean
  recurrencePattern?: RecurrencePattern
  parentEventId?: string // for recurring event instances
}

export interface RecurrencePattern {
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  interval: number // every N days/weeks/months
  daysOfWeek: number[] // 0-6, Sunday=0
  endDate?: Date
  occurrences?: number // max number of occurrences
  exceptions: Date[] // dates to skip
}

export interface FacultyAvailability {
  facultyId: string
  facultyName: string
  email: string
  phone: string
  subjects: Array<'biology' | 'physics' | 'chemistry'>
  grades: Array<'11' | '12' | 'dropper' | 'foundation'>

  // Weekly Schedule
  weeklySchedule: {
    [key: string]: TimeSlot[] // day name -> available time slots
  }

  // Date-specific overrides
  dateOverrides: {
    [date: string]: {
      available: boolean
      timeSlots?: TimeSlot[]
      reason?: string
    }
  }

  // Preferences
  preferences: {
    maxHoursPerDay: number
    maxHoursPerWeek: number
    preferredBreakDuration: number // minutes between classes
    onlineClassesEnabled: boolean
    offlineClassesEnabled: boolean
    maxStudentsPerDemo: number
    maxStudentsPerClass: number
  }

  // Status
  isActive: boolean
  lastUpdated: Date
}

export interface ClassroomResource {
  id: string
  name: string
  type: 'physical' | 'virtual'
  capacity: number
  location?: string // for physical rooms
  equipment: string[] // projector, whiteboard, computers, etc.
  bookingUrl?: string // for virtual rooms
  isActive: boolean
}

export interface CalendarView {
  type: 'day' | 'week' | 'month' | 'agenda'
  date: Date
  facultyFilter: string[]
  typeFilter: CalendarEvent['type'][]
  subjectFilter: CalendarEvent['subject'][]
  statusFilter: CalendarEvent['status'][]
}

export interface SchedulingConflict {
  id: string
  type: 'faculty_double_booked' | 'room_double_booked' | 'student_overlap' | 'capacity_exceeded'
  eventId: string
  conflictingEventId?: string
  facultyId?: string
  roomId?: string
  studentId?: string
  message: string
  severity: 'warning' | 'error'
  autoResolvable: boolean
}

export interface DemoBookingSlot {
  id: string
  facultyId: string
  facultyName: string
  date: Date
  timeSlot: TimeSlot
  duration: number // minutes
  subject: 'biology' | 'physics' | 'chemistry'
  grade: '11' | '12' | 'dropper' | 'foundation'
  capacity: number
  bookedSlots: number
  availableSlots: number
  isActive: boolean
  meetingLink?: string
  notes?: string
}

export interface BatchSchedule {
  id: string
  batchName: string
  courseId: string
  courseName: string
  facultyId: string
  facultyName: string
  subject: 'biology' | 'physics' | 'chemistry'
  grade: '11' | '12' | 'dropper' | 'foundation'

  // Schedule Details
  startDate: Date
  endDate: Date
  schedule: {
    dayOfWeek: number // 0-6
    startTime: string // HH:MM
    endTime: string // HH:MM
  }[]

  // Enrollment
  maxStudents: number
  enrolledStudents: string[]
  waitlistStudents: string[]

  // Settings
  location: 'online' | 'offline' | 'hybrid'
  classroomId?: string
  meetingLink?: string
  recordingEnabled: boolean
  attendanceRequired: boolean

  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CalendarStats {
  totalClasses: number
  demoClasses: number
  regularClasses: number
  completedClasses: number
  cancelledClasses: number

  facultyUtilization: {
    facultyId: string
    facultyName: string
    totalHours: number
    scheduledHours: number
    utilizationRate: number // 0-1
  }[]

  roomUtilization: {
    roomId: string
    roomName: string
    totalCapacity: number
    bookedHours: number
    utilizationRate: number // 0-1
  }[]

  studentAttendance: {
    totalStudents: number
    averageAttendance: number // 0-1
    noShowRate: number // 0-1
  }

  revenueMetrics: {
    demoConversions: number
    enrollmentRate: number
    averageRevenuePerStudent: number
    totalRevenue: number
  }
}

export interface NotificationPreferences {
  userId: string
  userType: 'faculty' | 'admin' | 'student'

  notifications: {
    classReminders: {
      enabled: boolean
      timing: number[] // minutes before class [15, 60, 1440]
    }
    demoBookings: {
      enabled: boolean
      newBooking: boolean
      cancellations: boolean
      reschedules: boolean
    }
    scheduleChanges: {
      enabled: boolean
      assignments: boolean
      cancellations: boolean
      timeChanges: boolean
    }
    conflicts: {
      enabled: boolean
      doubleBookings: boolean
      roomConflicts: boolean
    }
  }

  channels: {
    email: boolean
    sms: boolean
    whatsapp: boolean
    push: boolean
    inApp: boolean
  }
}
