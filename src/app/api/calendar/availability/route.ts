import { NextRequest, NextResponse } from 'next/server'
import { FacultyAvailability, TimeSlot, DemoBookingSlot } from '@/lib/types/calendar'

// Mock data - in production, use a real database
const facultyAvailabilities: FacultyAvailability[] = [
  {
    facultyId: 'faculty_1',
    facultyName: 'Dr. Priya Sharma',
    email: 'priya.sharma@cerebrumacademy.com',
    phone: '+91-9876543210',
    subjects: ['biology'],
    grades: ['11', '12', 'dropper'],
    weeklySchedule: {
      monday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
      ],
      tuesday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
      ],
      wednesday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
      ],
      thursday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
      ],
      friday: [
        { start: '09:00', end: '12:00' },
        { start: '14:00', end: '18:00' },
      ],
      saturday: [{ start: '09:00', end: '13:00' }],
      sunday: [],
    },
    dateOverrides: {
      '2025-01-20': {
        available: false,
        reason: 'Personal leave',
      },
      '2025-01-25': {
        available: true,
        timeSlots: [{ start: '10:00', end: '12:00' }],
        reason: 'Special demo sessions',
      },
    },
    preferences: {
      maxHoursPerDay: 8,
      maxHoursPerWeek: 40,
      preferredBreakDuration: 15,
      onlineClassesEnabled: true,
      offlineClassesEnabled: true,
      maxStudentsPerDemo: 5,
      maxStudentsPerClass: 15,
    },
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    facultyId: 'faculty_2',
    facultyName: 'Prof. Rajesh Kumar',
    email: 'rajesh.kumar@cerebrumacademy.com',
    phone: '+91-9876543211',
    subjects: ['biology', 'chemistry'],
    grades: ['11', '12', 'foundation'],
    weeklySchedule: {
      monday: [
        { start: '10:00', end: '13:00' },
        { start: '15:00', end: '19:00' },
      ],
      tuesday: [
        { start: '10:00', end: '13:00' },
        { start: '15:00', end: '19:00' },
      ],
      wednesday: [
        { start: '10:00', end: '13:00' },
        { start: '15:00', end: '19:00' },
      ],
      thursday: [
        { start: '10:00', end: '13:00' },
        { start: '15:00', end: '19:00' },
      ],
      friday: [
        { start: '10:00', end: '13:00' },
        { start: '15:00', end: '19:00' },
      ],
      saturday: [{ start: '10:00', end: '14:00' }],
      sunday: [],
    },
    dateOverrides: {},
    preferences: {
      maxHoursPerDay: 7,
      maxHoursPerWeek: 35,
      preferredBreakDuration: 10,
      onlineClassesEnabled: true,
      offlineClassesEnabled: false,
      maxStudentsPerDemo: 8,
      maxStudentsPerClass: 20,
    },
    isActive: true,
    lastUpdated: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facultyId = searchParams.get('facultyId')
    const subject = searchParams.get('subject')
    const grade = searchParams.get('grade')
    const date = searchParams.get('date')
    const type = searchParams.get('type') // 'all', 'available', 'busy'

    let filteredAvailabilities = [...facultyAvailabilities]

    // Filter by facultyId
    if (facultyId) {
      filteredAvailabilities = filteredAvailabilities.filter((av) => av.facultyId === facultyId)
    }

    // Filter by subject
    if (subject) {
      filteredAvailabilities = filteredAvailabilities.filter((av) =>
        av.subjects.includes(subject as any)
      )
    }

    // Filter by grade
    if (grade) {
      filteredAvailabilities = filteredAvailabilities.filter((av) =>
        av.grades.includes(grade as any)
      )
    }

    // Filter by active status
    filteredAvailabilities = filteredAvailabilities.filter((av) => av.isActive)

    // If date is provided, calculate available time slots for that date
    if (date) {
      const targetDate = new Date(date)
      const dayName = targetDate.toLocaleLowerCase().split(',')[0] // Get day name
      const dateString = targetDate.toISOString().split('T')[0]

      const availableSlots = await calculateAvailableSlots(
        filteredAvailabilities,
        targetDate,
        dayName,
        dateString
      )

      return NextResponse.json({
        availabilities: filteredAvailabilities,
        availableSlots,
        date: dateString,
        dayName,
      })
    }

    return NextResponse.json({
      availabilities: filteredAvailabilities,
      total: filteredAvailabilities.length,
    })
  } catch (error) {
    console.error('Faculty availability fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch faculty availability' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const availabilityData = await request.json()

    // Validate required fields
    const requiredFields = ['facultyId', 'facultyName', 'email', 'subjects', 'grades']
    for (const field of requiredFields) {
      if (!availabilityData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Check if faculty already exists
    const existingIndex = facultyAvailabilities.findIndex(
      (av) => av.facultyId === availabilityData.facultyId
    )

    const newAvailability: FacultyAvailability = {
      ...availabilityData,
      weeklySchedule: availabilityData.weeklySchedule || {},
      dateOverrides: availabilityData.dateOverrides || {},
      preferences: {
        maxHoursPerDay: 8,
        maxHoursPerWeek: 40,
        preferredBreakDuration: 15,
        onlineClassesEnabled: true,
        offlineClassesEnabled: true,
        maxStudentsPerDemo: 5,
        maxStudentsPerClass: 15,
        ...availabilityData.preferences,
      },
      isActive: availabilityData.isActive ?? true,
      lastUpdated: new Date(),
    }

    if (existingIndex >= 0) {
      // Update existing
      facultyAvailabilities[existingIndex] = newAvailability
      return NextResponse.json({
        availability: newAvailability,
        message: 'Faculty availability updated successfully',
      })
    } else {
      // Create new
      facultyAvailabilities.push(newAvailability)
      return NextResponse.json(
        {
          availability: newAvailability,
          message: 'Faculty availability created successfully',
        },
        { status: 201 }
      )
    }
  } catch (error) {
    console.error('Faculty availability creation/update error:', error)
    return NextResponse.json({ error: 'Failed to save faculty availability' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const availabilityData = await request.json()
    const facultyId = availabilityData.facultyId

    if (!facultyId) {
      return NextResponse.json({ error: 'Faculty ID is required for updates' }, { status: 400 })
    }

    const existingIndex = facultyAvailabilities.findIndex((av) => av.facultyId === facultyId)
    if (existingIndex === -1) {
      return NextResponse.json({ error: 'Faculty availability not found' }, { status: 404 })
    }

    // Update availability
    const updatedAvailability: FacultyAvailability = {
      ...facultyAvailabilities[existingIndex],
      ...availabilityData,
      facultyId, // Ensure facultyId doesn't change
      lastUpdated: new Date(),
    }

    facultyAvailabilities[existingIndex] = updatedAvailability

    return NextResponse.json({
      availability: updatedAvailability,
      message: 'Faculty availability updated successfully',
    })
  } catch (error) {
    console.error('Faculty availability update error:', error)
    return NextResponse.json({ error: 'Failed to update faculty availability' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const facultyId = searchParams.get('facultyId')

    if (!facultyId) {
      return NextResponse.json({ error: 'Faculty ID is required' }, { status: 400 })
    }

    const existingIndex = facultyAvailabilities.findIndex((av) => av.facultyId === facultyId)
    if (existingIndex === -1) {
      return NextResponse.json({ error: 'Faculty availability not found' }, { status: 404 })
    }

    // Soft delete by setting isActive to false
    facultyAvailabilities[existingIndex].isActive = false
    facultyAvailabilities[existingIndex].lastUpdated = new Date()

    return NextResponse.json({
      message: 'Faculty availability deleted successfully',
    })
  } catch (error) {
    console.error('Faculty availability deletion error:', error)
    return NextResponse.json({ error: 'Failed to delete faculty availability' }, { status: 500 })
  }
}

async function calculateAvailableSlots(
  availabilities: FacultyAvailability[],
  targetDate: Date,
  dayName: string,
  dateString: string
): Promise<DemoBookingSlot[]> {
  const availableSlots: DemoBookingSlot[] = []

  for (const availability of availabilities) {
    // Check date overrides first
    const dateOverride = availability.dateOverrides[dateString]
    let timeSlots: TimeSlot[] = []

    if (dateOverride) {
      if (!dateOverride.available) {
        continue // Skip this faculty for this date
      }
      timeSlots = dateOverride.timeSlots || []
    } else {
      // Use weekly schedule
      timeSlots = availability.weeklySchedule[dayName] || []
    }

    // Convert time slots to demo booking slots
    for (const timeSlot of timeSlots) {
      // Create slots with different durations (60, 90, 120 minutes)
      const slotDurations = [60, 90, 120]

      for (const duration of slotDurations) {
        const startTime = parseTime(timeSlot.start)
        const endTime = parseTime(timeSlot.end)

        let currentTime = startTime
        while (currentTime + duration <= endTime) {
          const slotStart = formatTime(currentTime)
          const slotEnd = formatTime(currentTime + duration)

          // Create demo booking slot
          const demoSlot: DemoBookingSlot = {
            id: `demo_${availability.facultyId}_${dateString}_${slotStart}_${duration}`,
            facultyId: availability.facultyId,
            facultyName: availability.facultyName,
            date: targetDate,
            timeSlot: { start: slotStart, end: slotEnd },
            duration,
            subject: availability.subjects[0], // Default to first subject
            grade: availability.grades[0] as any, // Default to first grade
            capacity: availability.preferences.maxStudentsPerDemo,
            bookedSlots: 0, // Would be calculated from actual bookings
            availableSlots: availability.preferences.maxStudentsPerDemo,
            isActive: true,
            meetingLink: `https://zoom.us/j/${availability.facultyId}_${dateString}_${currentTime}`,
            notes: `${duration}-minute demo session with ${availability.facultyName}`,
          }

          availableSlots.push(demoSlot)

          // Move to next slot (with break)
          currentTime += duration + availability.preferences.preferredBreakDuration
        }
      }
    }
  }

  return availableSlots.sort(
    (a, b) =>
      a.date.getTime() - b.date.getTime() ||
      parseTime(a.timeSlot.start) - parseTime(b.timeSlot.start)
  )
}

function parseTime(timeString: string): number {
  const [hours, minutes] = timeString.split(':').map(Number)
  return hours * 60 + minutes
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}
