import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { recomputeEnrollmentProgress } from '@/lib/lms/enrollmentProgress'

export async function GET(request: NextRequest, { params }: { params: { courseId: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const courseId = params.courseId
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId') || session.user.id

    if (userId !== session.user.id && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        courses: {
          include: {
            chapters: {
              include: {
                topics: {
                  select: {
                    id: true,
                    title: true,
                    orderIndex: true,
                  },
                  orderBy: { orderIndex: 'asc' },
                },
              },
              orderBy: { orderIndex: 'asc' },
            },
            study_materials: {
              where: { isPublished: true },
              select: {
                id: true,
                title: true,
                materialType: true,
                chapterId: true,
                topicId: true,
                // For video materials, surface the linked video lecture so the
                // syllabus can deep-link to the /learn player (videoId = video_lectures.id).
                video_lectures: {
                  select: { id: true, uploadStatus: true },
                },
              },
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Recompute + persist real progress on course open (best-effort).
    let currentProgress = enrollment.currentProgress
    try {
      const prog = await recomputeEnrollmentProgress(enrollment.id)
      if (prog) currentProgress = prog.overallProgress
    } catch (e) {
      console.error('progress recompute failed', e)
    }

    const modules = enrollment.courses.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      sortOrder: chapter.orderIndex,
      topics: chapter.topics,
      materials: enrollment.courses.study_materials
        .filter((m) => m.chapterId === chapter.id)
        .map((m) => ({
          id: m.id,
          title: m.title,
          materialType: m.materialType,
          // videoLectureId present + READY → syllabus links to /learn/[id].
          videoLectureId: m.video_lectures?.id ?? null,
          videoReady: m.video_lectures?.uploadStatus === 'READY',
        })),
    }))

    return NextResponse.json({
      success: true,
      course: {
        id: enrollment.courses.id,
        name: enrollment.courses.name,
        description: enrollment.courses.description,
        type: enrollment.courses.type,
        enrollmentId: enrollment.id,
        status: enrollment.status,
        enrollmentDate: enrollment.enrollmentDate,
        currentProgress,
        lastAccessDate: enrollment.lastAccessDate,
        modules,
        features: enrollment.courses.features,
      },
    })
  } catch (error) {
    console.error('Error fetching course details:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch course details',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
