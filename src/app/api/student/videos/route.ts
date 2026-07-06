/**
 * Student Video Library API
 *
 * GET /api/student/videos - List video lectures the student can access
 *
 * Access mirrors the student materials gate: FREE materials, explicit
 * material_access grants, ACTIVE-enrollment course materials, plus content
 * assigned through student groups (group_content, drip-scheduled). Playback
 * itself stays behind /learn/[lectureId] → /api/lms/videos, which signs the
 * Cloudflare Stream URL server-side — no signing logic here.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { hasTierAccess, getUserTier } from '@/lib/access/tierAccess'
import { getGroupGrantedContent } from '@/lib/student/groupContent'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const courseId = searchParams.get('courseId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const [enrollments, materialAccess, groupContent] = await Promise.all([
      prisma.enrollments.findMany({
        where: { userId, status: 'ACTIVE' },
        select: { courseId: true },
      }),
      prisma.material_access.findMany({
        where: { userId },
        select: { materialId: true },
      }),
      getGroupGrantedContent(userId),
    ])

    const enrolledCourseIds = enrollments.map((e) => e.courseId)
    const accessibleMaterialIds = materialAccess
      .map((m) => m.materialId)
      .concat(groupContent.materialIds)

    // Empty arrays would match everything — substitute an impossible id
    const nonEmpty = (ids: string[]) => (ids.length > 0 ? ids : [''])

    const where: any = {
      AND: [
        { uploadStatus: 'READY' },
        { study_materials: { isPublished: true } },
        {
          OR: [
            { study_materials: { accessLevel: 'FREE' } },
            { study_materials: { id: { in: nonEmpty(accessibleMaterialIds) } } },
            {
              study_materials: {
                courseId: { in: nonEmpty(enrolledCourseIds) },
                accessLevel: { in: ['ENROLLED', 'SPECIFIC_COURSE'] },
              },
            },
            { id: { in: nonEmpty(groupContent.videoLectureIds) } },
          ],
        },
      ],
    }

    if (search) {
      where.AND.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      })
    }

    if (courseId) {
      where.AND.push({ study_materials: { courseId } })
    }

    const [lectures, total, userTier] = await Promise.all([
      prisma.video_lectures.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          cloudflareThumbUrl: true,
          createdAt: true,
          study_materials: {
            select: {
              id: true,
              courseId: true,
              requiredTier: true,
              courses: { select: { id: true, name: true } },
            },
          },
          video_progress: {
            where: { userId },
            select: {
              completionPercent: true,
              isCompleted: true,
              lastPosition: true,
              lastWatchedAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.video_lectures.count({ where }),
      getUserTier(userId),
    ])

    const videos = lectures.map((lecture) => {
      const progress = lecture.video_progress[0]
      const requiredTier = lecture.study_materials?.requiredTier ?? null
      const tierLocked = requiredTier ? !hasTierAccess(userTier, requiredTier) : false
      return {
        id: lecture.id,
        title: lecture.title,
        description: lecture.description,
        duration: lecture.duration,
        thumbnailUrl: lecture.cloudflareThumbUrl,
        courseId: lecture.study_materials?.courseId ?? null,
        courseName: lecture.study_materials?.courses?.name ?? null,
        watchUrl: `/learn/${lecture.id}`,
        progressPercent: progress ? Number(progress.completionPercent) : 0,
        isCompleted: progress?.isCompleted ?? false,
        lastPosition: progress?.lastPosition ?? 0,
        lastWatchedAt: progress?.lastWatchedAt ?? null,
        requiredTier,
        tierLocked,
        createdAt: lecture.createdAt,
      }
    })

    return NextResponse.json({
      success: true,
      videos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Failed to fetch student videos:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch videos',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
