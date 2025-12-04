import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const TOKEN_COOKIE_NAME = 'free_resources_admin_token'
const TOKEN_EXPIRY_HOURS = 2

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_COOKIE_NAME)

    if (!token || !token.value) return false

    const decoded = Buffer.from(token.value, 'base64').toString('utf-8')
    const [timestamp] = decoded.split(':')
    const tokenTime = parseInt(timestamp, 10)
    const now = Date.now()
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000

    return now - tokenTime <= expiryMs
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('all') === 'true'

    const where: any = {}
    if (!includeUnpublished) {
      where.isPublished = true
    }

    const resources = await prisma.free_resources.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
    })

    return NextResponse.json({
      success: true,
      resources,
      total: resources.length,
    })
  } catch (error) {
    console.error('Error fetching admin resources:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch resources',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      type,
      fileUrl,
      content,
      thumbnailUrl,
      classCategory,
      priority,
      isPublished,
      expiresAt,
    } = body

    if (!title || !type || !classCategory) {
      return NextResponse.json(
        { error: 'Title, type, and class category are required' },
        { status: 400 }
      )
    }

    const resource = await prisma.free_resources.create({
      data: {
        title,
        description: description || null,
        type,
        fileUrl: fileUrl || null,
        content: content || null,
        thumbnailUrl: thumbnailUrl || null,
        classCategory,
        priority: priority || 0,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Resource created successfully',
      resource,
    })
  } catch (error) {
    console.error('Error creating resource:', error)
    return NextResponse.json(
      {
        error: 'Failed to create resource',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      id,
      title,
      description,
      type,
      fileUrl,
      content,
      thumbnailUrl,
      classCategory,
      priority,
      isPublished,
      isArchived,
      expiresAt,
    } = body

    if (!id) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 })
    }

    const existing = await prisma.free_resources.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    const wasPublished = existing.isPublished
    const updateData: any = {
      title: title !== undefined ? title : existing.title,
      description: description !== undefined ? description : existing.description,
      type: type !== undefined ? type : existing.type,
      fileUrl: fileUrl !== undefined ? fileUrl : existing.fileUrl,
      content: content !== undefined ? content : existing.content,
      thumbnailUrl: thumbnailUrl !== undefined ? thumbnailUrl : existing.thumbnailUrl,
      classCategory: classCategory !== undefined ? classCategory : existing.classCategory,
      priority: priority !== undefined ? priority : existing.priority,
      isPublished: isPublished !== undefined ? isPublished : existing.isPublished,
      isArchived: isArchived !== undefined ? isArchived : existing.isArchived,
      expiresAt:
        expiresAt !== undefined ? (expiresAt ? new Date(expiresAt) : null) : existing.expiresAt,
    }

    if (!wasPublished && updateData.isPublished) {
      updateData.publishedAt = new Date()
    }

    const resource = await prisma.free_resources.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      message: 'Resource updated successfully',
      resource,
    })
  } catch (error) {
    console.error('Error updating resource:', error)
    return NextResponse.json(
      {
        error: 'Failed to update resource',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Resource ID is required' }, { status: 400 })
    }

    const existing = await prisma.free_resources.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    await prisma.free_resources.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Resource deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting resource:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete resource',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
