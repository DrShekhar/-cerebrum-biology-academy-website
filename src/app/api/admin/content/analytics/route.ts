import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getAllPosts } from '@/lib/blog/mdx'

// Content analytics from REAL tracked data. The page previously fetched a
// route that never existed and rendered nothing.
//
// Honest scope: the site tracks per-post view COUNTERS (blog_views: slug +
// cumulative views — no per-view timestamps), so totals and rankings are real
// but time-series trends / time-on-page / bounce need GA4 and are NOT
// reported here rather than fabricated.
export async function GET() {
  try {
    await requireAdminAuth()

    const [views, totalPosts] = await Promise.all([
      prisma.blog_views.findMany({
        orderBy: { views: 'desc' },
        select: { slug: true, views: true, updatedAt: true },
        take: 500,
      }),
      Promise.resolve(getAllPosts().length),
    ])

    // Map slugs to real titles where the post still exists
    let titleBySlug: Record<string, string> = {}
    try {
      titleBySlug = Object.fromEntries(getAllPosts().map((p) => [p.slug, p.title]))
    } catch {
      /* posts are file-based; fall back to slugs */
    }

    const totalViews = views.reduce((sum, v) => sum + v.views, 0)
    const trackedPosts = views.length

    return NextResponse.json({
      success: true,
      overview: {
        totalViews,
        trackedPosts,
        totalPosts,
        avgViewsPerPost: trackedPosts ? Math.round(totalViews / trackedPosts) : 0,
      },
      topContent: views.slice(0, 25).map((v) => ({
        slug: v.slug,
        title: titleBySlug[v.slug] || v.slug.replace(/-/g, ' '),
        views: v.views,
        lastViewedAt: v.updatedAt.toISOString(),
        exists: Boolean(titleBySlug[v.slug]),
      })),
    })
  } catch (error) {
    console.error('[admin/content/analytics] failed:', error)
    return NextResponse.json({ error: 'Failed to load content analytics' }, { status: 500 })
  }
}
