import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Retrieve view count for a blog post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const blogView = await prisma.blog_views.findUnique({
      where: { slug },
    })

    return NextResponse.json({
      slug,
      views: blogView?.views || 0,
    })
  } catch (error) {
    console.error('Error fetching blog views:', error)
    return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 })
  }
}

// POST - Increment view count for a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug } = body

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    // Upsert: create if doesn't exist, increment if exists
    const blogView = await prisma.blog_views.upsert({
      where: { slug },
      update: {
        views: { increment: 1 },
      },
      create: {
        slug,
        views: 1,
      },
    })

    return NextResponse.json({
      slug,
      views: blogView.views,
      success: true,
    })
  } catch (error) {
    console.error('Error incrementing blog views:', error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}
