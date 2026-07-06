import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Real LMS analytics (the page previously showed hardcoded zeros).
// Sources: study_materials aggregate counters + material_progress activity.
export async function GET() {
  try {
    await requireAdminAuth()

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [totalMaterials, sums, activeStudents, topMaterials] = await Promise.all([
      prisma.study_materials.count(),
      prisma.study_materials.aggregate({
        _sum: { totalDownloads: true, totalViews: true },
      }),
      prisma.material_progress.findMany({
        where: { lastViewedAt: { gte: weekAgo } },
        select: { userId: true },
        distinct: ['userId'],
        take: 5000,
      }),
      prisma.study_materials.findMany({
        where: { isPublished: true },
        orderBy: { totalViews: 'desc' },
        take: 10,
        select: {
          id: true,
          title: true,
          materialType: true,
          category: true,
          totalViews: true,
          totalDownloads: true,
          publishedAt: true,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalMaterials,
        totalDownloads: sums._sum.totalDownloads || 0,
        totalViews: sums._sum.totalViews || 0,
        activeStudents: activeStudents.length,
      },
      topMaterials,
    })
  } catch (error) {
    console.error('[admin/lms/analytics] failed:', error)
    return NextResponse.json({ error: 'Failed to load LMS analytics' }, { status: 500 })
  }
}
