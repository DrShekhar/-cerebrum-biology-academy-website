import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { BatchClassType, BatchLocation, BatchStatus } from '@/generated/prisma'

// GET - Fetch a single batch
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const batch = await prisma.batches.findUnique({
      where: { id },
    })

    if (!batch) {
      return NextResponse.json({ success: false, error: 'Batch not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: batch })
  } catch (error) {
    console.error('Error fetching batch:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch batch' }, { status: 500 })
  }
}

// PUT - Update a batch (admin only)
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const updateData: {
      classType?: BatchClassType
      batchNumber?: number
      days?: string[]
      startTime?: string
      endTime?: string
      offlineLocation?: BatchLocation
      hasOnline?: boolean
      status?: BatchStatus
      displayOrder?: number
      isActive?: boolean
    } = {}

    if (body.classType) updateData.classType = body.classType as BatchClassType
    if (body.batchNumber !== undefined) updateData.batchNumber = parseInt(body.batchNumber, 10)
    if (body.days) updateData.days = Array.isArray(body.days) ? body.days : [body.days]
    if (body.startTime) updateData.startTime = body.startTime
    if (body.endTime) updateData.endTime = body.endTime
    if (body.offlineLocation) updateData.offlineLocation = body.offlineLocation as BatchLocation
    if (body.hasOnline !== undefined) updateData.hasOnline = body.hasOnline
    if (body.status) updateData.status = body.status as BatchStatus
    if (body.displayOrder !== undefined) updateData.displayOrder = parseInt(body.displayOrder, 10)
    if (body.isActive !== undefined) updateData.isActive = body.isActive

    const batch = await prisma.batches.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: batch })
  } catch (error) {
    console.error('Error updating batch:', error)
    return NextResponse.json({ success: false, error: 'Failed to update batch' }, { status: 500 })
  }
}

// DELETE - Delete a batch (admin only)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    await prisma.batches.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: 'Batch deleted' })
  } catch (error) {
    console.error('Error deleting batch:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete batch' }, { status: 500 })
  }
}
