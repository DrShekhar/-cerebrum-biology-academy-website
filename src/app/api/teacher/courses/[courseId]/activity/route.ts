/**
 * Teacher Activity Matrix API
 * GET /api/teacher/courses/[courseId]/activity
 *
 * Returns a students × lessons grid for a course:
 *   - students: enrolled (ACTIVE) students, bounded to 200
 *   - lessons:  published study_materials in the course, ordered by chapter/topic/sortOrder
 *   - cells:    map keyed `${studentId}:${lessonId}` -> { status, percent? }
 *              status = 'done' | 'progress' | 'none' (only non-'none' cells are emitted)
 *
 * Query strategy avoids N+1: student/lesson lists are two bulk queries, and every
 * progress signal is fetched with a single `where { userId in […], materialId in […] }`
 * (plus one paired lookup for VIDEO lessons via video_progress) — never one query per student.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

const MAX_STUDENTS = 200

type CellStatus = 'done' | 'progress' | 'none'

function clampPercent(n: number): number {
  if (n <= 0) return 0
  if (n >= 100) return 100
  return Math.round(n)
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Teacher access required.' },
        { status: 401 }
      )
    }

    const { courseId } = await params

    const course = await prisma.courses.findUnique({
      where: { id: courseId },
      select: { id: true, name: true },
    })
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    // 1) Enrolled students (bounded) — one query.
    const enrollments = await prisma.enrollments.findMany({
      where: { courseId, status: 'ACTIVE' },
      select: { users: { select: { id: true, name: true } } },
      orderBy: { users: { name: 'asc' } },
      take: MAX_STUDENTS,
    })
    const students = enrollments.map((e) => ({ id: e.users.id, name: e.users.name }))
    const studentIds = students.map((s) => s.id)

    // 2) Published lessons in the course, with chapter/topic ordering context — one query.
    const materials = await prisma.study_materials.findMany({
      where: { courseId, isPublished: true },
      select: {
        id: true,
        title: true,
        materialType: true,
        sortOrder: true,
        chapters: { select: { title: true, orderIndex: true } },
        topics: { select: { orderIndex: true } },
      },
    })

    // Order by chapter orderIndex (nulls last) → topic orderIndex → sortOrder → title.
    materials.sort((a, b) => {
      const ac = a.chapters?.orderIndex ?? Number.MAX_SAFE_INTEGER
      const bc = b.chapters?.orderIndex ?? Number.MAX_SAFE_INTEGER
      if (ac !== bc) return ac - bc
      const at = a.topics?.orderIndex ?? Number.MAX_SAFE_INTEGER
      const bt = b.topics?.orderIndex ?? Number.MAX_SAFE_INTEGER
      if (at !== bt) return at - bt
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder
      return a.title.localeCompare(b.title)
    })

    const lessons = materials.map((m) => ({
      id: m.id,
      title: m.title,
      chapterTitle: m.chapters?.title ?? 'Unassigned',
      type: m.materialType,
    }))
    const lessonIds = lessons.map((l) => l.id)

    const cells: Record<string, { status: CellStatus; percent?: number }> = {}

    if (studentIds.length > 0 && lessonIds.length > 0) {
      // 3) Primary signal — material_progress for every (student, lesson) pair in one query.
      const progressRows = await prisma.material_progress.findMany({
        where: { userId: { in: studentIds }, materialId: { in: lessonIds } },
        select: {
          userId: true,
          materialId: true,
          status: true,
          completedAt: true,
          currentPage: true,
          totalPages: true,
        },
      })

      for (const p of progressRows) {
        const key = `${p.userId}:${p.materialId}`
        if (p.status === 'COMPLETED' || p.completedAt) {
          cells[key] = { status: 'done', percent: 100 }
        } else if (p.status === 'NOT_STARTED') {
          // leave as untouched
        } else {
          // VIEWED / IN_PROGRESS / DOWNLOADED
          const percent =
            p.currentPage && p.totalPages && p.totalPages > 0
              ? clampPercent((p.currentPage / p.totalPages) * 100)
              : undefined
          cells[key] = { status: 'progress', percent }
        }
      }

      // 4) VIDEO supplement — fill cells where material_progress had no signal, using
      //    video_progress. Two bulk queries (lectures, then their progress), never per student.
      const videoMaterialIds = materials.filter((m) => m.materialType === 'VIDEO').map((m) => m.id)

      if (videoMaterialIds.length > 0) {
        const lectures = await prisma.video_lectures.findMany({
          where: { studyMaterialId: { in: videoMaterialIds } },
          select: { id: true, studyMaterialId: true },
        })
        if (lectures.length > 0) {
          const lectureToMaterial = new Map(lectures.map((l) => [l.id, l.studyMaterialId]))
          const videoRows = await prisma.video_progress.findMany({
            where: {
              videoLectureId: { in: lectures.map((l) => l.id) },
              userId: { in: studentIds },
            },
            select: {
              userId: true,
              videoLectureId: true,
              isCompleted: true,
              completionPercent: true,
            },
          })
          for (const v of videoRows) {
            const materialId = lectureToMaterial.get(v.videoLectureId)
            if (!materialId) continue
            const key = `${v.userId}:${materialId}`
            if (cells[key]) continue // material_progress already decided this cell
            if (v.isCompleted) {
              cells[key] = { status: 'done', percent: 100 }
            } else {
              const pct = clampPercent(Number(v.completionPercent))
              if (pct > 0) cells[key] = { status: 'progress', percent: pct }
            }
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        course: { id: course.id, name: course.name },
        students,
        lessons,
        cells,
        truncated: students.length >= MAX_STUDENTS,
      },
    })
  } catch (error) {
    console.error('Failed to build activity matrix:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to build activity matrix',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
