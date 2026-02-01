import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { BatchClassType, BatchLocation, BatchStatus } from '@/generated/prisma'

// ISR: Revalidate every 1 hour - batch info is admin-managed and rarely changes
export const revalidate = 3600

// GET - Fetch all batches (public)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const classType = searchParams.get('classType') as BatchClassType | null
    const location = searchParams.get('location') as BatchLocation | null
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const where: {
      classType?: BatchClassType
      offlineLocation?: BatchLocation
      isActive?: boolean
    } = {}

    if (classType) {
      where.classType = classType
    }

    if (location) {
      where.offlineLocation = location
    }

    if (!includeInactive) {
      where.isActive = true
    }

    const batches = await prisma.batches.findMany({
      where,
      orderBy: [{ classType: 'asc' }, { displayOrder: 'asc' }, { batchNumber: 'asc' }],
    })

    return NextResponse.json({ success: true, data: batches })
  } catch (error) {
    console.error('Error fetching batches:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch batches' }, { status: 500 })
  }
}

// POST - Create a new batch (admin only)
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { classType, batchNumber, days, startTime, endTime, offlineLocation, hasOnline, status } =
      body

    if (!classType || !batchNumber || !days || !startTime || !endTime || !offlineLocation) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const batch = await prisma.batches.create({
      data: {
        classType: classType as BatchClassType,
        batchNumber: parseInt(batchNumber, 10),
        days: Array.isArray(days) ? days : [days],
        startTime,
        endTime,
        offlineLocation: offlineLocation as BatchLocation,
        hasOnline: hasOnline !== false,
        status: (status as BatchStatus) || 'AVAILABLE',
      },
    })

    return NextResponse.json({ success: true, data: batch })
  } catch (error) {
    console.error('Error creating batch:', error)
    return NextResponse.json({ success: false, error: 'Failed to create batch' }, { status: 500 })
  }
}
