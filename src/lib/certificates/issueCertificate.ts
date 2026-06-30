/**
 * issueCertificate — reusable, idempotent certificate issuance.
 *
 * Extracted so issuance can be TRIGGERED on real completion (not only by an
 * admin manually POSTing /api/certificates/issue). Generates the PDF + QR,
 * uploads, and creates the certificates row — but returns the EXISTING
 * certificate if one was already issued for this (student, course, type),
 * so completion triggers are safe to call repeatedly.
 */

import { prisma } from '@/lib/prisma'
import { CertificateGenerator } from '@/lib/certificates'
import type { CertificateTemplate } from '@/lib/certificates/types'

type CertificateType =
  | 'COURSE_COMPLETION'
  | 'EXCELLENCE'
  | 'PARTICIPATION'
  | 'ACHIEVEMENT'
  | 'APPRECIATION'
  | 'SPECIAL_RECOGNITION'

export interface IssueCertificateInput {
  studentId: string
  courseId?: string
  enrollmentId?: string
  certificateType: CertificateType
  courseName: string
  completionDate?: Date
  grade?: string
  percentage?: number
  duration?: string
  instructorNames?: string[]
  achievements?: string[]
  templateId?: string
}

export async function issueCertificate(input: IssueCertificateInput) {
  const student = await prisma.users.findUnique({
    where: { id: input.studentId },
    select: { id: true, name: true, email: true },
  })
  if (!student) {
    return { ok: false as const, error: 'Student not found' }
  }

  // Idempotency: don't re-issue the same course-completion certificate.
  if (input.courseId) {
    const existing = await prisma.certificates.findFirst({
      where: {
        studentId: input.studentId,
        courseId: input.courseId,
        certificateType: input.certificateType,
        status: { not: 'REVOKED' },
      },
    })
    if (existing) {
      return { ok: true as const, certificate: existing, alreadyIssued: true }
    }
  }

  const certificateNumber = await CertificateGenerator.generateCertificateNumber()
  const verificationCode = await CertificateGenerator.generateVerificationCode()
  const completionDate = input.completionDate || new Date()
  const grade =
    input.grade ||
    (input.percentage != null ? CertificateGenerator.calculateGrade(input.percentage) : undefined)
  const achievements =
    input.achievements || CertificateGenerator.determineAchievements(input.percentage)
  const instructorNames = input.instructorNames || ['Dr. Shekhar C Singh']

  const certificateData = {
    studentName: student.name,
    courseName: input.courseName,
    completionDate,
    issueDate: new Date(),
    grade,
    percentage: input.percentage,
    duration: input.duration,
    instructorNames,
    achievements,
    certificateNumber,
    verificationCode,
  }

  const template = input.templateId
    ? await prisma.certificate_templates.findUnique({ where: { id: input.templateId } })
    : null

  const { pdfUrl, qrCodeUrl } = await CertificateGenerator.generateAndUploadCertificate(
    certificateData,
    {
      template: (template as unknown as CertificateTemplate) || undefined,
      includeQRCode: true,
    }
  )

  const certificate = await prisma.certificates.create({
    data: {
      id: `cert_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      updatedAt: new Date(),
      studentId: input.studentId,
      courseId: input.courseId,
      enrollmentId: input.enrollmentId,
      templateId: input.templateId,
      certificateType: input.certificateType,
      certificateNumber,
      verificationCode,
      studentName: student.name,
      courseName: input.courseName,
      completionDate,
      issueDate: new Date(),
      grade,
      percentage: input.percentage,
      duration: input.duration,
      instructorNames,
      achievements,
      qrCodeUrl,
      certificatePdfUrl: pdfUrl,
      status: 'ISSUED',
    },
  })

  return { ok: true as const, certificate, alreadyIssued: false }
}
