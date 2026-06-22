/**
 * POST /api/certificates/claim — student-triggered course-completion certificate.
 *
 * This is the AUTO-ISSUE path the LMS was missing: the admin route
 * (/api/certificates/issue) is ADMIN/TEACHER-only and had zero callers, so no
 * student ever received a certificate on completion. This route lets the
 * enrolled student claim their certificate, but only after SERVER-VERIFIED
 * completion (active enrollment they own + materials viewed + at least one
 * completed test). Idempotent via issueCertificate().
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { issueCertificate } from '@/lib/certificates/issueCertificate'

export const runtime = 'nodejs'

// Completion threshold: at least this share of published materials viewed AND
// at least one completed test. Conservative so certificates mean something.
const MATERIAL_THRESHOLD = 0.8

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const userId = session.user.id

    const body = await request.json().catch(() => ({}))
    const enrollmentId: string | undefined = body.enrollmentId
    if (!enrollmentId) {
      return NextResponse.json({ error: 'enrollmentId is required' }, { status: 400 })
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: { id: enrollmentId },
      include: { courses: { select: { id: true, name: true, class: true } } },
    })
    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }
    if (enrollment.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    if (enrollment.status !== 'ACTIVE' && enrollment.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Your enrollment must be active to claim a certificate.' },
        { status: 400 }
      )
    }

    const courseId = enrollment.courseId

    // Server-verified completion (mirrors /api/progress materials + tests signals).
    const totalMaterials = await prisma.study_materials.count({
      where: { courseId, isPublished: true },
    })
    const materialsViewed = await prisma.material_progress.count({
      where: {
        userId,
        study_materials: { courseId, isPublished: true },
        status: { in: ['VIEWED', 'IN_PROGRESS', 'DOWNLOADED', 'COMPLETED'] },
      },
    })
    const testsCompleted = await prisma.test_sessions.count({
      where: { userId, status: 'COMPLETED' },
    })

    const materialRatio = totalMaterials > 0 ? materialsViewed / totalMaterials : 0
    const completed = materialRatio >= MATERIAL_THRESHOLD && testsCompleted >= 1
    if (!completed) {
      return NextResponse.json(
        {
          error: 'Course not yet complete',
          detail: `Complete at least ${Math.round(MATERIAL_THRESHOLD * 100)}% of materials and one test to claim your certificate.`,
          progress: {
            materialsViewed,
            totalMaterials,
            testsCompleted,
          },
        },
        { status: 403 }
      )
    }

    const result = await issueCertificate({
      studentId: userId,
      courseId: courseId,
      enrollmentId,
      certificateType: 'COURSE_COMPLETION',
      courseName: enrollment.courses?.name || 'Course',
    })

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(
      {
        success: true,
        alreadyIssued: result.alreadyIssued,
        certificate: {
          id: result.certificate.id,
          certificateNumber: result.certificate.certificateNumber,
          verificationCode: result.certificate.verificationCode,
          certificatePdfUrl: result.certificate.certificatePdfUrl,
        },
      },
      { status: result.alreadyIssued ? 200 : 201 }
    )
  } catch (error) {
    console.error('Certificate claim error:', error)
    return NextResponse.json({ error: 'Failed to claim certificate' }, { status: 500 })
  }
}
