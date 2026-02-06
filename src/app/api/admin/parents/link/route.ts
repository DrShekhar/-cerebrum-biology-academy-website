import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

const linkSchema = z.object({
  parentId: z.string().min(1),
  childId: z.string().min(1),
})

const unlinkSchema = z.object({
  relationshipId: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const { parentId, childId } = linkSchema.parse(body)

    const [parent, child] = await Promise.all([
      prisma.users.findFirst({ where: { id: parentId, role: 'PARENT' } }),
      prisma.users.findFirst({ where: { id: childId, role: 'STUDENT' } }),
    ])

    if (!parent) {
      return NextResponse.json(
        { success: false, error: 'Parent not found' },
        { status: 404 }
      )
    }
    if (!child) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const existing = await prisma.parent_child_relationships.findUnique({
      where: { parentId_childId: { parentId, childId } },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'This parent-child link already exists' },
        { status: 409 }
      )
    }

    const relationship = await prisma.parent_child_relationships.create({
      data: {
        id: uuidv4(),
        parentId,
        childId,
        createdAt: new Date(),
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Parent-child link created',
        data: relationship,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Link parent-child error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create link' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const { relationshipId } = unlinkSchema.parse(body)

    const existing = await prisma.parent_child_relationships.findUnique({
      where: { id: relationshipId },
    })

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Relationship not found' },
        { status: 404 }
      )
    }

    await prisma.parent_child_relationships.delete({
      where: { id: relationshipId },
    })

    return NextResponse.json({
      success: true,
      message: 'Parent-child link removed',
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Unlink parent-child error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove link' },
      { status: 500 }
    )
  }
}
