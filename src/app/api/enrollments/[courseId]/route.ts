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
              // Hidden chapters (builder's hide toggle) never reach students.
              where: { isActive: true },
              include: {
                topics: {
                  where: { isActive: true },
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
                // Quiz-as-lesson: the CBT template this TEST material renders.
                test_template: {
                  select: {
                    id: true,
                    title: true,
                    timeLimit: true,
                    totalQuestions: true,
                    topics: true,
                    difficulty: true,
                    curriculum: true,
                    grade: true,
                    subject: true,
                  },
                },
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

    // Completion + the student's own ratings, one query.
    const progressRows = await prisma.material_progress.findMany({
      where: {
        userId,
        study_materials: { courseId },
      },
      select: { materialId: true, status: true, rating: true },
    })
    const completedIds = new Set(
      progressRows.filter((r) => r.status === 'COMPLETED').map((r) => r.materialId)
    )
    const myRatings = new Map(
      progressRows.filter((r) => r.rating != null).map((r) => [r.materialId, r.rating as number])
    )

    // Drip + prerequisite locking (set in the course builder). A chapter is
    // locked if its releaseAt is in the future, or if it requires the previous
    // chapter and that chapter's published materials aren't all completed.
    const now = new Date()
    const chapterCompleted = (chapterId: string): boolean => {
      const mats = enrollment.courses.study_materials.filter((m) => m.chapterId === chapterId)
      if (mats.length === 0) return true // nothing to complete
      return mats.every((m) => completedIds.has(m.id))
    }

    // Enrollment-relative drip anchor: when the student joined the course.
    const enrolledAt = enrollment.enrollmentDate || enrollment.createdAt

    const orderedChapters = enrollment.courses.chapters
    const modules = orderedChapters.map((chapter, idx) => {
      const dateLocked = Boolean(chapter.releaseAt && chapter.releaseAt > now)
      const dripUnlockAt =
        chapter.dripDaysAfterEnroll != null
          ? new Date(enrolledAt.getTime() + chapter.dripDaysAfterEnroll * 24 * 60 * 60 * 1000)
          : null
      const enrollDripLocked = Boolean(dripUnlockAt && dripUnlockAt > now)
      const dripLocked = dateLocked || enrollDripLocked
      const prev = idx > 0 ? orderedChapters[idx - 1] : null
      const prereqLocked = Boolean(chapter.requiresPrevious && prev && !chapterCompleted(prev.id))
      const locked = dripLocked || prereqLocked

      // When both drip gates apply, report the later one — that's when it opens.
      const dripDate =
        dateLocked && enrollDripLocked
          ? chapter.releaseAt! > dripUnlockAt!
            ? chapter.releaseAt!
            : dripUnlockAt!
          : dateLocked
            ? chapter.releaseAt!
            : dripUnlockAt

      return {
        id: chapter.id,
        title: chapter.title,
        sortOrder: chapter.orderIndex,
        locked,
        lockReason: dripLocked
          ? (`Unlocks on ${dripDate!.toLocaleDateString('en-IN')}` as string)
          : prereqLocked
            ? `Complete “${prev!.title}” first`
            : null,
        releaseAt: chapter.releaseAt,
        topics: locked ? [] : chapter.topics,
        // Locked chapters expose no materials (titles/URLs stay server-side).
        materials: locked
          ? []
          : enrollment.courses.study_materials
              .filter((m) => m.chapterId === chapter.id)
              .map((m) => ({
                id: m.id,
                title: m.title,
                materialType: m.materialType,
                // videoLectureId present + READY → syllabus links to /learn/[id].
                videoLectureId: m.video_lectures?.id ?? null,
                videoReady: m.video_lectures?.uploadStatus === 'READY',
                // TEST lessons: what the client posts to /api/test/create.
                test: m.test_template
                  ? {
                      templateId: m.test_template.id,
                      timeLimit: m.test_template.timeLimit,
                      questionCount: m.test_template.totalQuestions,
                      topics: m.test_template.topics,
                      difficulty: m.test_template.difficulty,
                      curriculum: m.test_template.curriculum,
                      grade: m.test_template.grade,
                      subject: m.test_template.subject,
                    }
                  : null,
                completed: completedIds.has(m.id),
                myRating: myRatings.get(m.id) ?? null,
              })),
      }
    })

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
