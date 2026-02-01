import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { BatchClassType, BatchLocation, BatchStatus } from '@/generated/prisma'

const initialBatches = [
  // Class 11th Batches
  {
    classType: 'CLASS_11' as BatchClassType,
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '18:00',
    endTime: '19:30',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_11' as BatchClassType,
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '09:30',
    endTime: '11:00',
    offlineLocation: 'SOUTH_EXT' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_11' as BatchClassType,
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '15:30',
    endTime: '17:00',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_11' as BatchClassType,
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '16:15',
    endTime: '17:45',
    offlineLocation: 'ROHINI' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_11' as BatchClassType,
    batchNumber: 5,
    days: ['Sat', 'Sun'],
    startTime: '19:30',
    endTime: '21:00',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  // Class 12th Batches
  {
    classType: 'CLASS_12' as BatchClassType,
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '16:15',
    endTime: '17:45',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_12' as BatchClassType,
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '08:00',
    endTime: '09:30',
    offlineLocation: 'SOUTH_EXT' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_12' as BatchClassType,
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '14:00',
    endTime: '15:30',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'CLASS_12' as BatchClassType,
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '18:00',
    endTime: '19:30',
    offlineLocation: 'ROHINI' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  // Droppers Batches
  {
    classType: 'DROPPERS' as BatchClassType,
    batchNumber: 1,
    days: ['Mon', 'Wed'],
    startTime: '16:15',
    endTime: '19:30',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'DROPPERS' as BatchClassType,
    batchNumber: 2,
    days: ['Sat', 'Sun'],
    startTime: '08:00',
    endTime: '11:00',
    offlineLocation: 'SOUTH_EXT' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'DROPPERS' as BatchClassType,
    batchNumber: 3,
    days: ['Sat', 'Sun'],
    startTime: '14:00',
    endTime: '17:00',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'DROPPERS' as BatchClassType,
    batchNumber: 4,
    days: ['Tue', 'Thu'],
    startTime: '16:15',
    endTime: '19:30',
    offlineLocation: 'ROHINI' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
  {
    classType: 'DROPPERS' as BatchClassType,
    batchNumber: 5,
    days: ['Sat', 'Sun'],
    startTime: '19:30',
    endTime: '21:00',
    offlineLocation: 'GURUGRAM' as BatchLocation,
    hasOnline: true,
    status: 'AVAILABLE' as BatchStatus,
  },
]

const initialNeetClasses = [
  {
    classType: 'CLASS_11' as BatchClassType,
    optionADay: 'Wednesday',
    optionATime: '7:30 - 8:30 PM',
    optionBDay: 'Sunday',
    optionBTime: '6:15 - 7:15 PM',
  },
  {
    classType: 'CLASS_12' as BatchClassType,
    optionADay: 'Wednesday',
    optionATime: '8:30 - 9:30 PM',
    optionBDay: 'Sunday',
    optionBTime: '5:15 - 6:15 PM',
  },
]

const initialTestSchedules = [
  {
    classType: 'CLASS_11' as BatchClassType,
    day: 'Monday',
    time: '8:30 - 9:30 PM',
    mode: 'Online (can request offline or custom time)',
  },
  {
    classType: 'CLASS_12' as BatchClassType,
    day: 'Monday',
    time: '9:30 - 10:30 PM',
    mode: 'Online (can request offline or custom time)',
  },
]

// POST - Seed initial data (admin only)
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const force = searchParams.get('force') === 'true'

    // Check if data already exists
    const existingBatches = await prisma.batches.count()
    if (existingBatches > 0 && !force) {
      return NextResponse.json({
        success: false,
        error: 'Data already exists. Use ?force=true to overwrite.',
        existingCount: existingBatches,
      })
    }

    // If force, delete existing data first
    if (force && existingBatches > 0) {
      await prisma.batches.deleteMany()
      await prisma.neet_classes.deleteMany()
      await prisma.test_schedules.deleteMany()
    }

    // Seed batches
    const createdBatches = await prisma.batches.createMany({
      data: initialBatches.map((batch, index) => ({
        ...batch,
        displayOrder: index,
      })),
    })

    // Seed NEET classes
    const createdNeetClasses = await prisma.neet_classes.createMany({
      data: initialNeetClasses,
    })

    // Seed test schedules
    const createdTestSchedules = await prisma.test_schedules.createMany({
      data: initialTestSchedules,
    })

    return NextResponse.json({
      success: true,
      data: {
        batches: createdBatches.count,
        neetClasses: createdNeetClasses.count,
        testSchedules: createdTestSchedules.count,
      },
    })
  } catch (error) {
    console.error('Error seeding timetable data:', error)
    return NextResponse.json({ success: false, error: 'Failed to seed data' }, { status: 500 })
  }
}
