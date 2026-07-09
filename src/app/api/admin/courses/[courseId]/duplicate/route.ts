import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const rid = (p: string) => `${p}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

/**
 * POST /api/admin/courses/[courseId]/duplicate — copy a course's full
 * structure (chapters incl. drip/preview settings, topics, PDF/article/test
 * lessons re-pointed by reference — no file re-upload) into a new DRAFT
 * course. VIDEO lessons are skipped: video_lectures links one-to-one to a
 * material, so videos must be re-linked in the new course (counted in the
 * response so nothing is silently dropped).
 */
export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdminAuth()
    const { courseId } = await context.params

    const source = await prisma.courses.findUnique({
      where: { id: courseId },
      include: {
        chapters: {
          orderBy: { orderIndex: 'asc' },
          include: { topics: { orderBy: { orderIndex: 'asc' } } },
        },
        study_materials: true,
      },
    })
    if (!source) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    const result = await prisma.$transaction(async (tx) => {
      const newCourse = await tx.courses.create({
        data: {
          id: rid('course'),
          name: `${source.name} (copy)`,
          description: source.description,
          type: source.type,
          class: source.class,
          duration: source.duration,
          totalFees: source.totalFees,
          syllabus: source.syllabus ?? undefined,
          features: source.features ?? undefined,
          isActive: false,
          status: 'DRAFT',
          thumbnailUrl: source.thumbnailUrl,
          instructorId: source.instructorId,
          scheduleInfo: source.scheduleInfo,
          maxCapacity: source.maxCapacity,
          nextCourseId: source.nextCourseId,
          nextCourseOfferText: source.nextCourseOfferText,
          sortOrder: source.sortOrder,
          updatedAt: new Date(),
        },
        select: { id: true },
      })

      const chapterIdMap = new Map<string, string>()
      const topicIdMap = new Map<string, string>()
      let topicCount = 0

      for (const ch of source.chapters) {
        const newChapterId = rid('chapter')
        chapterIdMap.set(ch.id, newChapterId)
        await tx.chapters.create({
          data: {
            id: newChapterId,
            courseId: newCourse.id,
            title: ch.title,
            description: ch.description,
            orderIndex: ch.orderIndex,
            releaseAt: ch.releaseAt,
            dripDaysAfterEnroll: ch.dripDaysAfterEnroll,
            requiresPrevious: ch.requiresPrevious,
            isFreePreview: ch.isFreePreview,
            isActive: ch.isActive,
            updatedAt: new Date(),
          },
        })
        for (const t of ch.topics) {
          const newTopicId = rid('topic')
          topicIdMap.set(t.id, newTopicId)
          topicCount++
          await tx.topics.create({
            data: {
              id: newTopicId,
              chapterId: newChapterId,
              title: t.title,
              description: t.description,
              orderIndex: t.orderIndex,
              isActive: t.isActive,
              updatedAt: new Date(),
            },
          })
        }
      }

      let materialCount = 0
      let videosSkipped = 0
      for (const m of source.study_materials) {
        if (m.materialType === 'VIDEO') {
          videosSkipped++
          continue
        }
        materialCount++
        await tx.study_materials.create({
          data: {
            id: rid('material'),
            title: m.title,
            description: m.description,
            materialType: m.materialType,
            contentBody: m.contentBody,
            testTemplateId: m.testTemplateId,
            fileUrl: m.fileUrl,
            fileName: m.fileName,
            fileSize: m.fileSize,
            mimeType: m.mimeType,
            courseId: newCourse.id,
            chapterId: m.chapterId ? chapterIdMap.get(m.chapterId) || null : null,
            topicId: m.topicId ? topicIdMap.get(m.topicId) || null : null,
            requiredTier: m.requiredTier,
            accessLevel: m.accessLevel,
            sortOrder: m.sortOrder,
            uploadedBy: m.uploadedBy,
            isPublished: m.isPublished,
            publishedAt: m.publishedAt,
            updatedAt: new Date(),
          },
        })
      }

      return {
        newCourseId: newCourse.id,
        chapters: source.chapters.length,
        topics: topicCount,
        materials: materialCount,
        videosSkipped,
      }
    })

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[courses/duplicate] failed:', error)
    return NextResponse.json({ success: false, error: 'Duplicate failed' }, { status: 500 })
  }
}
