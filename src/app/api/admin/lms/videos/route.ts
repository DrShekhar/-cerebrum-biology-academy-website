/**
 * Admin LMS Video Lectures API
 *
 * GET /api/admin/lms/videos - List video lectures (id, title, duration, status)
 *
 * Lightweight index used by admin pickers (e.g. group content assignment).
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role?.toUpperCase() !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden. Admin access required.' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim()
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10) || 100, 200)

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const videos = await prisma.video_lectures.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        uploadStatus: true,
        totalViews: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ success: true, videos })
  } catch (error) {
    console.error('Failed to list video lectures:', error)
    return NextResponse.json({ success: false, error: 'Failed to list videos' }, { status: 500 })
  }
}
