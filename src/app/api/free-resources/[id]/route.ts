import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const resource = await prisma.free_resources.findUnique({
      where: { id },
    })

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    if (!resource.isPublished) {
      return NextResponse.json({ error: 'Resource is not available' }, { status: 403 })
    }

    await prisma.free_resources.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    })

    return NextResponse.json({
      success: true,
      resource: {
        id: resource.id,
        title: resource.title,
        description: resource.description,
        type: resource.type,
        fileUrl: resource.fileUrl,
        content: resource.content,
        thumbnailUrl: resource.thumbnailUrl,
        classCategory: resource.classCategory,
        isArchived: resource.isArchived,
        publishedAt: resource.publishedAt,
        viewCount: resource.viewCount + 1,
      },
    })
  } catch (error) {
    console.error('Error fetching resource:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch resource',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
