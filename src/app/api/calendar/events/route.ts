import { NextRequest, NextResponse } from 'next/server'
import { CalendarEvent, SchedulingConflict } from '@/lib/types/calendar'

// Mock data storage - in production, use a real database
const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'NEET Biology Demo Class',
    description: 'Introduction to Cell Biology for NEET aspirants',
    type: 'demo_class',
    status: 'scheduled',
    startTime: new Date('2025-01-17T10:00:00Z'),
    endTime: new Date('2025-01-17T11:30:00Z'),
    duration: 90,
    timezone: 'Asia/Kolkata',
    facultyId: 'faculty_1',
    facultyName: 'Dr. Priya Sharma',
    studentIds: ['student_1', 'student_2'],
    studentNames: ['Rahul Kumar', 'Priya Singh'],
    currentEnrollment: 2,
    maxCapacity: 5,
    courseId: 'neet_biology_11',
    courseName: 'NEET Biology Class 11',
    subject: 'biology',
    grade: '11',
    location: 'online',
    meetingLink: 'https://zoom.us/j/123456789',
    createdBy: 'admin',
    createdAt: new Date('2025-01-10T09:00:00Z'),
    updatedAt: new Date('2025-01-10T09:00:00Z'),
    recordingEnabled: true,
    attendanceTracked: true,
    isRecurring: false,
  },
  {
    id: '2',
    title: 'Regular Biology Class - Photosynthesis',
    description: 'Chapter 13: Photosynthesis in Higher Plants',
    type: 'regular_class',
    status: 'confirmed',
    startTime: new Date('2025-01-17T14:00:00Z'),
    endTime: new Date('2025-01-17T16:00:00Z'),
    duration: 120,
    timezone: 'Asia/Kolkata',
    facultyId: 'faculty_1',
    facultyName: 'Dr. Priya Sharma',
    studentIds: ['student_3', 'student_4', 'student_5'],
    studentNames: ['Amit Patel', 'Sneha Gupta', 'Vikash Singh'],
    currentEnrollment: 3,
    maxCapacity: 15,
    courseId: 'neet_biology_12',
    courseName: 'NEET Biology Class 12',
    subject: 'biology',
    grade: '12',
    location: 'offline',
    classroomId: 'room_1',
    classroomName: 'Biology Lab 1',
    createdBy: 'admin',
    createdAt: new Date('2025-01-05T09:00:00Z'),
    updatedAt: new Date('2025-01-05T09:00:00Z'),
    recordingEnabled: true,
    attendanceTracked: true,
    isRecurring: true,
    recurrencePattern: {
      type: 'weekly',
      interval: 1,
      daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      endDate: new Date('2025-06-30T00:00:00Z'),
      exceptions: [],
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Filter parameters
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const facultyId = searchParams.get('facultyId')
    const type = searchParams.get('type') as CalendarEvent['type'] | null
    const status = searchParams.get('status') as CalendarEvent['status'] | null
    const subject = searchParams.get('subject') as CalendarEvent['subject'] | null

    let filteredEvents = [...calendarEvents]

    // Apply date range filter
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      filteredEvents = filteredEvents.filter(
        (event) => event.startTime >= start && event.startTime <= end
      )
    }

    // Apply faculty filter
    if (facultyId) {
      filteredEvents = filteredEvents.filter((event) => event.facultyId === facultyId)
    }

    // Apply type filter
    if (type) {
      filteredEvents = filteredEvents.filter((event) => event.type === type)
    }

    // Apply status filter
    if (status) {
      filteredEvents = filteredEvents.filter((event) => event.status === status)
    }

    // Apply subject filter
    if (subject) {
      filteredEvents = filteredEvents.filter((event) => event.subject === subject)
    }

    // Sort by start time
    filteredEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())

    return NextResponse.json({
      events: filteredEvents,
      total: filteredEvents.length,
      filters: {
        startDate,
        endDate,
        facultyId,
        type,
        status,
        subject,
      },
    })
  } catch (error) {
    console.error('Calendar events fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch calendar events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json()

    // Validate required fields
    const requiredFields = [
      'title',
      'type',
      'startTime',
      'endTime',
      'facultyId',
      'subject',
      'grade',
    ]
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Check for scheduling conflicts
    const conflicts = await checkSchedulingConflicts(eventData)
    if (conflicts.length > 0) {
      return NextResponse.json(
        {
          error: 'Scheduling conflicts detected',
          conflicts: conflicts.filter((c) => c.severity === 'error'),
        },
        { status: 409 }
      )
    }

    // Create new event
    const newEvent: CalendarEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...eventData,
      startTime: new Date(eventData.startTime),
      endTime: new Date(eventData.endTime),
      duration: Math.round(
        (new Date(eventData.endTime).getTime() - new Date(eventData.startTime).getTime()) / 60000
      ),
      currentEnrollment: eventData.studentIds?.length || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: eventData.status || 'scheduled',
      timezone: eventData.timezone || 'Asia/Kolkata',
      recordingEnabled: eventData.recordingEnabled ?? true,
      attendanceTracked: eventData.attendanceTracked ?? true,
      isRecurring: eventData.isRecurring || false,
    }

    // Add to storage
    calendarEvents.push(newEvent)

    // Create recurring instances if needed
    if (newEvent.isRecurring && newEvent.recurrencePattern) {
      const recurringEvents = generateRecurringEvents(newEvent)
      calendarEvents.push(...recurringEvents)
    }

    return NextResponse.json(
      {
        event: newEvent,
        conflicts: conflicts.filter((c) => c.severity === 'warning'),
        message: 'Event created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Calendar event creation error:', error)
    return NextResponse.json({ error: 'Failed to create calendar event' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const eventData = await request.json()
    const eventId = eventData.id

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required for updates' }, { status: 400 })
    }

    const eventIndex = calendarEvents.findIndex((event) => event.id === eventId)
    if (eventIndex === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Check for conflicts with updated data
    const conflicts = await checkSchedulingConflicts(eventData, eventId)
    if (conflicts.filter((c) => c.severity === 'error').length > 0) {
      return NextResponse.json(
        {
          error: 'Scheduling conflicts detected',
          conflicts: conflicts.filter((c) => c.severity === 'error'),
        },
        { status: 409 }
      )
    }

    // Update event
    const existingEvent = calendarEvents[eventIndex]
    const updatedEvent: CalendarEvent = {
      ...existingEvent,
      ...eventData,
      id: eventId,
      startTime: eventData.startTime ? new Date(eventData.startTime) : existingEvent.startTime,
      endTime: eventData.endTime ? new Date(eventData.endTime) : existingEvent.endTime,
      updatedAt: new Date(),
      currentEnrollment: eventData.studentIds?.length || existingEvent.currentEnrollment,
    }

    if (eventData.startTime && eventData.endTime) {
      updatedEvent.duration = Math.round(
        (new Date(eventData.endTime).getTime() - new Date(eventData.startTime).getTime()) / 60000
      )
    }

    calendarEvents[eventIndex] = updatedEvent

    return NextResponse.json({
      event: updatedEvent,
      conflicts: conflicts.filter((c) => c.severity === 'warning'),
      message: 'Event updated successfully',
    })
  } catch (error) {
    console.error('Calendar event update error:', error)
    return NextResponse.json({ error: 'Failed to update calendar event' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const eventId = searchParams.get('id')
    const deleteRecurring = searchParams.get('deleteRecurring') === 'true'

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 })
    }

    const eventIndex = calendarEvents.findIndex((event) => event.id === eventId)
    if (eventIndex === -1) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const event = calendarEvents[eventIndex]

    // Delete the main event
    calendarEvents.splice(eventIndex, 1)

    // Delete recurring instances if requested
    if (deleteRecurring && event.isRecurring) {
      const recurringEvents = calendarEvents.filter((e) => e.parentEventId === eventId)
      recurringEvents.forEach((recurringEvent) => {
        const index = calendarEvents.findIndex((e) => e.id === recurringEvent.id)
        if (index !== -1) {
          calendarEvents.splice(index, 1)
        }
      })
    }

    return NextResponse.json({
      message: 'Event deleted successfully',
      deletedCount: deleteRecurring
        ? 1 +
          (event.isRecurring ? calendarEvents.filter((e) => e.parentEventId === eventId).length : 0)
        : 1,
    })
  } catch (error) {
    console.error('Calendar event deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete calendar event' }, { status: 500 })
  }
}

async function checkSchedulingConflicts(
  eventData: Partial<CalendarEvent>,
  excludeEventId?: string
): Promise<SchedulingConflict[]> {
  const conflicts: SchedulingConflict[] = []
  const startTime = new Date(eventData.startTime!)
  const endTime = new Date(eventData.endTime!)

  // Check faculty double booking
  if (eventData.facultyId) {
    const facultyConflicts = calendarEvents.filter(
      (event) =>
        event.id !== excludeEventId &&
        event.facultyId === eventData.facultyId &&
        event.status !== 'cancelled' &&
        ((startTime >= event.startTime && startTime < event.endTime) ||
          (endTime > event.startTime && endTime <= event.endTime) ||
          (startTime <= event.startTime && endTime >= event.endTime))
    )

    facultyConflicts.forEach((conflict) => {
      conflicts.push({
        id: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'faculty_double_booked',
        eventId: eventData.id || 'new_event',
        conflictingEventId: conflict.id,
        facultyId: eventData.facultyId,
        message: `Faculty ${conflict.facultyName} is already scheduled for "${conflict.title}" at this time`,
        severity: 'error',
        autoResolvable: false,
      })
    })
  }

  // Check room double booking
  if (eventData.classroomId) {
    const roomConflicts = calendarEvents.filter(
      (event) =>
        event.id !== excludeEventId &&
        event.classroomId === eventData.classroomId &&
        event.status !== 'cancelled' &&
        ((startTime >= event.startTime && startTime < event.endTime) ||
          (endTime > event.startTime && endTime <= event.endTime) ||
          (startTime <= event.startTime && endTime >= event.endTime))
    )

    roomConflicts.forEach((conflict) => {
      conflicts.push({
        id: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'room_double_booked',
        eventId: eventData.id || 'new_event',
        conflictingEventId: conflict.id,
        roomId: eventData.classroomId,
        message: `Classroom ${conflict.classroomName} is already booked for "${conflict.title}" at this time`,
        severity: 'error',
        autoResolvable: false,
      })
    })
  }

  // Check capacity
  if (
    eventData.maxCapacity &&
    eventData.studentIds &&
    eventData.studentIds.length > eventData.maxCapacity
  ) {
    conflicts.push({
      id: `conflict_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'capacity_exceeded',
      eventId: eventData.id || 'new_event',
      message: `Student enrollment (${eventData.studentIds.length}) exceeds maximum capacity (${eventData.maxCapacity})`,
      severity: 'error',
      autoResolvable: false,
    })
  }

  return conflicts
}

function generateRecurringEvents(baseEvent: CalendarEvent): CalendarEvent[] {
  const recurringEvents: CalendarEvent[] = []

  if (!baseEvent.recurrencePattern) return recurringEvents

  const pattern = baseEvent.recurrencePattern
  const startDate = new Date(baseEvent.startTime)
  const endDate = pattern.endDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // Default 1 year
  const maxOccurrences = pattern.occurrences || 100

  const currentDate = new Date(startDate)
  let occurrenceCount = 0

  while (currentDate <= endDate && occurrenceCount < maxOccurrences) {
    // Move to next occurrence based on pattern
    if (pattern.type === 'daily') {
      currentDate.setDate(currentDate.getDate() + pattern.interval)
    } else if (pattern.type === 'weekly') {
      currentDate.setDate(currentDate.getDate() + 7 * pattern.interval)
    } else if (pattern.type === 'monthly') {
      currentDate.setMonth(currentDate.getMonth() + pattern.interval)
    }

    // Check if this date should be skipped
    if (pattern.exceptions.some((ex) => ex.getTime() === currentDate.getTime())) {
      continue
    }

    // For weekly pattern, check day of week
    if (pattern.type === 'weekly' && !pattern.daysOfWeek.includes(currentDate.getDay())) {
      continue
    }

    if (currentDate <= endDate) {
      const eventDuration = baseEvent.endTime.getTime() - baseEvent.startTime.getTime()
      const recurringEvent: CalendarEvent = {
        ...baseEvent,
        id: `${baseEvent.id}_recurring_${currentDate.getTime()}`,
        parentEventId: baseEvent.id,
        startTime: new Date(currentDate),
        endTime: new Date(currentDate.getTime() + eventDuration),
        isRecurring: false, // Instances are not recurring themselves
      }

      recurringEvents.push(recurringEvent)
      occurrenceCount++
    }
  }

  return recurringEvents
}
