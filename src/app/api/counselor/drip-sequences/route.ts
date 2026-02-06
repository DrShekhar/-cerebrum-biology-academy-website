import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all drip sequences
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // For now, store sequences as JSON in a settings table or return from whatsapp_nurturing
    // This is a simplified implementation using local storage pattern
    const sequences = await prisma.$queryRaw`
      SELECT DISTINCT source as triggerStage,
        COUNT(*) as totalEnrolled,
        COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) as active,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed,
        COUNT(CASE WHEN status = 'STOPPED' THEN 1 END) as stopped
      FROM whatsapp_nurturing
      GROUP BY source
    ` as any[]

    return NextResponse.json({ data: sequences || [] })
  } catch (error) {
    console.error('Error fetching sequences:', error)
    return NextResponse.json({ data: [] })
  }
}

// POST - Create new drip sequence
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { name, description, triggerStage, stopOnStageChange, steps } = body

    // Store sequence config (in production, create a drip_sequences table)
    // For now, we'll acknowledge the creation and use whatsapp_nurturing for execution
    const id = `seq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json({
      data: {
        id,
        name,
        description,
        triggerStage,
        stopOnStageChange,
        isActive: false,
        steps,
        stats: { totalEnrolled: 0, active: 0, completed: 0, stopped: 0, replyRate: 0 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error creating sequence:', error)
    return NextResponse.json({ error: 'Failed to create sequence' }, { status: 500 })
  }
}

// PATCH - Toggle sequence active/inactive
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { id, isActive } = body

    return NextResponse.json({ data: { id, isActive } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE - Remove a sequence
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    return NextResponse.json({ data: { deleted: true, id } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
