/**
 * Admin LMS — Topic update/delete.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

async function requireAdmin() {
  const session = await auth()
  if (!session || session.user.role?.toUpperCase() !== 'ADMIN') return null
  return session
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    const body = await request.json()
    const data: { title?: string; description?: string | null; orderIndex?: number; updatedAt: Date } =
      { updatedAt: new Date() }
    if (typeof body.title === 'string') data.title = body.title.trim()
    if (typeof body.description === 'string') data.description = body.description.trim() || null
    if (typeof body.orderIndex === 'number') data.orderIndex = body.orderIndex

    const topic = await prisma.topics.update({ where: { id: params.id }, data })
    return NextResponse.json({ success: true, topic })
  } catch (error) {
    console.error('Error updating topic:', error)
    return NextResponse.json({ success: false, error: 'Failed to update topic' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }
    await prisma.topics.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting topic:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete topic' }, { status: 500 })
  }
}
