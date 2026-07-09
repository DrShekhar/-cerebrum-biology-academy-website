import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { SONNET } from '@/lib/ai/models'

/**
 * AI Course Insights — natural-language analytics for the admin course workspace.
 *
 * POST { question } → { answer }
 *
 * The endpoint computes REAL aggregates for the course (enrollment mix, progress,
 * per-lesson + per-chapter completion, test averages) and asks Claude to interpret
 * ONLY those numbers. The model never sees raw rows and is instructed never to
 * invent figures — every statistic in the answer comes from the aggregates below.
 */

// Keep the prompt bounded — surface the most/least completed lessons rather than
// every row so large courses stay within a compact, cheap request.
const MAX_LESSONS_IN_PROMPT = 40

interface LessonAgg {
  title: string
  chapter: string | null
  type: string
  completed: number
  started: number
  completionPctOfEnrolled: number | null
}

interface ChapterAgg {
  title: string
  order: number
  lessonCount: number
  avgCompletionPct: number | null
}

interface TestAgg {
  title: string
  attempts: number
  avgScorePct: number | null
}

function pct(n: number, d: number): number | null {
  if (!d) return null
  return Math.round((n / d) * 1000) / 10
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    await requireAdminAuth()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'AI insights are not configured yet.' },
        { status: 503 }
      )
    }

    const { courseId } = await context.params

    const course = await prisma.courses.findUnique({
      where: { id: courseId },
      select: { name: true, description: true, class: true, type: true },
    })
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
    }

    const body = await request.json().catch(() => ({}))
    const question: string = (body.question || '').toString().trim().slice(0, 500)
    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Please enter a question.' },
        { status: 400 }
      )
    }

    // ---- Compute real aggregates (grouped queries, never per-row) ----------

    // 1. Enrollment count + status breakdown.
    const enrollmentByStatus = await prisma.enrollments.groupBy({
      by: ['status'],
      where: { courseId },
      _count: { _all: true },
    })
    const enrolledTotal = enrollmentByStatus.reduce((s, r) => s + r._count._all, 0)
    const statusBreakdown = enrollmentByStatus.map((r) => ({
      status: r.status,
      count: r._count._all,
    }))

    // 2. Average progress + completion rate (100% progress).
    const progressAgg = await prisma.enrollments.aggregate({
      where: { courseId },
      _avg: { currentProgress: true },
    })
    const completedEnrollments = await prisma.enrollments.count({
      where: { courseId, currentProgress: { gte: 100 } },
    })
    const avgProgress =
      progressAgg._avg.currentProgress != null
        ? Math.round(progressAgg._avg.currentProgress * 10) / 10
        : null

    // Lessons (study materials) belonging to this course, with chapter context.
    const materials = await prisma.study_materials.findMany({
      where: { courseId },
      select: {
        id: true,
        title: true,
        materialType: true,
        chapterId: true,
        testTemplateId: true,
      },
    })
    const materialIds = materials.map((m) => m.id)

    const chapters = await prisma.chapters.findMany({
      where: { courseId },
      select: { id: true, title: true, orderIndex: true },
      orderBy: { orderIndex: 'asc' },
    })
    const chapterById = new Map(chapters.map((c) => [c.id, c]))

    // 3. Per-lesson completion — grouped, one row per material/status.
    let completedByMaterial = new Map<string, number>()
    let startedByMaterial = new Map<string, number>()
    if (materialIds.length > 0) {
      const [completedRows, startedRows] = await Promise.all([
        prisma.material_progress.groupBy({
          by: ['materialId'],
          where: { materialId: { in: materialIds }, status: 'COMPLETED' },
          _count: { _all: true },
        }),
        prisma.material_progress.groupBy({
          by: ['materialId'],
          where: { materialId: { in: materialIds } },
          _count: { _all: true },
        }),
      ])
      completedByMaterial = new Map(completedRows.map((r) => [r.materialId, r._count._all]))
      startedByMaterial = new Map(startedRows.map((r) => [r.materialId, r._count._all]))
    }

    const lessons: LessonAgg[] = materials.map((m) => {
      const completed = completedByMaterial.get(m.id) || 0
      const started = startedByMaterial.get(m.id) || 0
      return {
        title: m.title,
        chapter: m.chapterId ? (chapterById.get(m.chapterId)?.title ?? null) : null,
        type: m.materialType,
        completed,
        started,
        completionPctOfEnrolled: pct(completed, enrolledTotal),
      }
    })

    // 4. Per-chapter drop-off — average lesson completion within each chapter,
    //    presented in chapter order so a fall-off across the course is visible.
    const chapterAgg: ChapterAgg[] = chapters.map((c) => {
      const chLessons = materials.filter((m) => m.chapterId === c.id)
      const completedSum = chLessons.reduce((s, m) => s + (completedByMaterial.get(m.id) || 0), 0)
      const denom = chLessons.length * enrolledTotal
      return {
        title: c.title,
        order: c.orderIndex,
        lessonCount: chLessons.length,
        avgCompletionPct: pct(completedSum, denom),
      }
    })

    // 5. Test / quiz averages — TEST lessons point at test templates; aggregate
    //    completed sessions for those templates.
    const testTemplateIds = materials
      .filter((m) => m.materialType === 'TEST' && m.testTemplateId)
      .map((m) => m.testTemplateId as string)
    const testTitleByTemplate = new Map(
      materials
        .filter((m) => m.materialType === 'TEST' && m.testTemplateId)
        .map((m) => [m.testTemplateId as string, m.title])
    )
    let tests: TestAgg[] = []
    if (testTemplateIds.length > 0) {
      const testRows = await prisma.test_sessions.groupBy({
        by: ['testTemplateId'],
        where: { testTemplateId: { in: testTemplateIds }, status: 'COMPLETED' },
        _avg: { percentage: true },
        _count: { _all: true },
      })
      tests = testRows.map((r) => ({
        title: testTitleByTemplate.get(r.testTemplateId) || 'Test',
        attempts: r._count._all,
        avgScorePct: r._avg.percentage != null ? Math.round(r._avg.percentage * 10) / 10 : null,
      }))
    }

    // Trim the lesson list for the prompt: keep the lowest and highest completers,
    // which is what most drop-off / lowest-completion questions care about.
    const rankedLessons = [...lessons].sort(
      (a, b) => (a.completionPctOfEnrolled ?? 0) - (b.completionPctOfEnrolled ?? 0)
    )
    let promptLessons = rankedLessons
    if (rankedLessons.length > MAX_LESSONS_IN_PROMPT) {
      const half = Math.floor(MAX_LESSONS_IN_PROMPT / 2)
      promptLessons = [...rankedLessons.slice(0, half), ...rankedLessons.slice(-half)]
    }

    const aggregates = {
      course: {
        name: course.name,
        class: course.class,
        type: course.type,
      },
      enrollment: {
        total: enrolledTotal,
        statusBreakdown,
      },
      progress: {
        averageProgressPct: avgProgress,
        completedEnrollments,
        completionRatePct: pct(completedEnrollments, enrolledTotal),
      },
      lessons: {
        totalLessons: lessons.length,
        note:
          rankedLessons.length > MAX_LESSONS_IN_PROMPT
            ? `Showing the ${promptLessons.length} lowest and highest completers of ${lessons.length} lessons.`
            : undefined,
        // completed/started are learner counts; completionPctOfEnrolled is over all enrollments.
        items: promptLessons,
      },
      chaptersInOrder: chapterAgg,
      tests,
    }

    const anthropic = new Anthropic({ apiKey })
    const message = await anthropic.messages.create({
      model: SONNET,
      max_tokens: 1200,
      system: `You are a learning-analytics assistant for a NEET-Biology coaching academy admin.
You are given pre-computed, REAL aggregates for one course as JSON. Answer the admin's
question using ONLY these numbers.

Hard rules:
- NEVER invent, estimate, or extrapolate any statistic that is not in the JSON.
- If a number needed to answer is null or absent, say the data isn't available yet rather than guessing.
- Percentages are already computed; quote them as given. "completionPctOfEnrolled" is out of all
  enrollments; "avgCompletionPct" per chapter is the average of its lessons' completion.
- Chapters are listed in teaching order, so a decline down the list indicates drop-off.
Answer style: concise and specific (a few sentences, cite the exact figures). End with up to 3
"Recommended actions" as a short bullet list, only when the data supports them.`,
      messages: [
        {
          role: 'user',
          content: `Course aggregates:
${JSON.stringify(aggregates, null, 2)}

Admin's question: ${question}`,
        },
      ],
    })

    const answer =
      message.content.find((b): b is Anthropic.TextBlock => b.type === 'text')?.text?.trim() || ''
    if (!answer) {
      return NextResponse.json(
        { success: false, error: 'The AI returned an empty answer — try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true, data: { answer } })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('AI course insights error:', error)
    return NextResponse.json(
      { success: false, error: 'Could not generate insights — please try again.' },
      { status: 500 }
    )
  }
}
