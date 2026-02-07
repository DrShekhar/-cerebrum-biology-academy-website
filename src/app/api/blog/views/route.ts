import { NextRequest, NextResponse } from 'next/server'

// Lazy import prisma to prevent cold start crashes if DB is unavailable
let prismaClient: any = null
async function getPrisma() {
  if (!prismaClient) {
    try {
      const mod = await import('@/lib/prisma')
      prismaClient = mod.prisma
    } catch {
      return null
    }
  }
  return prismaClient
}

// GET - Retrieve view count for a blog post
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const prisma = await getPrisma()
    if (!prisma) {
      // DB unavailable — return 0 views gracefully (non-critical feature)
      return NextResponse.json({ slug, views: 0 })
    }

    const blogView = await prisma.blog_views.findUnique({
      where: { slug },
    })

    return NextResponse.json({
      slug,
      views: blogView?.views || 0,
    })
  } catch (error: any) {
    // Gracefully handle missing table (migration not run) or connection issues
    const errorCode = error?.code || ''
    if (errorCode === 'P2021' || errorCode === 'P2010' || errorCode === 'P1001') {
      // P2021: Table does not exist, P2010: Raw query failed, P1001: Can't reach DB
      return NextResponse.json({ slug: '', views: 0 })
    }
    console.error('Error fetching blog views:', error?.message || error)
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

    const prisma = await getPrisma()
    if (!prisma) {
      // DB unavailable — return success silently (view tracking is non-critical)
      return NextResponse.json({ slug, views: 0, success: false })
    }

    // Upsert: create if doesn't exist, increment if exists
    const blogView = await prisma.blog_views.upsert({
      where: { slug },
      update: {
        views: { increment: 1 },
      },
      create: {
        id: crypto.randomUUID(),
        slug,
        views: 1,
      },
    })

    return NextResponse.json({
      slug,
      views: blogView.views,
      success: true,
    })
  } catch (error: any) {
    // Gracefully handle missing table or connection issues
    const errorCode = error?.code || ''
    if (errorCode === 'P2021' || errorCode === 'P2010' || errorCode === 'P1001') {
      // Non-critical: return graceful response instead of 500
      return NextResponse.json({ slug: '', views: 0, success: false })
    }
    console.error('Error incrementing blog views:', error?.message || error)
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 })
  }
}
