import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { CertificateGenerator } from '@/lib/certificates'
import { z } from 'zod'

const issueCertificateSchema = z.object({
  studentId: z.string(),
  courseId: z.string().optional(),
  enrollmentId: z.string().optional(),
  certificateType: z.enum([
    'COURSE_COMPLETION',
    'EXCELLENCE',
    'PARTICIPATION',
    'ACHIEVEMENT',
    'APPRECIATION',
    'SPECIAL_RECOGNITION',
  ]),
  templateId: z.string().optional(),
  courseName: z.string(),
  completionDate: z.string().datetime(),
  grade: z.string().optional(),
  percentage: z.number().min(0).max(100).optional(),
  duration: z.string().optional(),
  instructorNames: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'ADMIN' && session.user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = issueCertificateSchema.parse(body)

    const student = await prisma.users.findUnique({
      where: { id: validatedData.studentId },
      select: { id: true, name: true, email: true },
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    const certificateNumber = await CertificateGenerator.generateCertificateNumber()
    const verificationCode = await CertificateGenerator.generateVerificationCode()

    const completionDate = new Date(validatedData.completionDate)

    const grade =
      validatedData.grade ||
      (validatedData.percentage
        ? CertificateGenerator.calculateGrade(validatedData.percentage)
        : undefined)

    const achievements =
      validatedData.achievements ||
      CertificateGenerator.determineAchievements(validatedData.percentage)

    const certificateData = {
      studentName: student.name,
      courseName: validatedData.courseName,
      completionDate,
      issueDate: new Date(),
      grade,
      percentage: validatedData.percentage,
      duration: validatedData.duration,
      instructorNames: validatedData.instructorNames || ['Dr. Shekhar C Singh'],
      achievements,
      certificateNumber,
      verificationCode,
    }

    const validation = await CertificateGenerator.validateCertificateData(certificateData)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid certificate data', errors: validation.errors },
        { status: 400 }
      )
    }

    let template = null
    if (validatedData.templateId) {
      template = await prisma.certificate_templates.findUnique({
        where: { id: validatedData.templateId },
      })
    }

    const { pdfUrl, qrCodeUrl } = await CertificateGenerator.generateAndUploadCertificate(
      certificateData,
      {
        template: template || undefined,
        includeQRCode: true,
      }
    )

    const certificate = await prisma.certificates.create({
      data: {
        studentId: validatedData.studentId,
        courseId: validatedData.courseId,
        enrollmentId: validatedData.enrollmentId,
        templateId: validatedData.templateId,
        certificateType: validatedData.certificateType,
        certificateNumber,
        verificationCode,
        studentName: student.name,
        courseName: validatedData.courseName,
        completionDate,
        issueDate: new Date(),
        grade,
        percentage: validatedData.percentage,
        duration: validatedData.duration,
        instructorNames: validatedData.instructorNames || ['Dr. Shekhar C Singh'],
        achievements,
        qrCodeUrl,
        certificatePdfUrl: pdfUrl,
        status: 'ISSUED',
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Certificate issued successfully',
        certificate,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', errors: error.issues }, { status: 400 })
    }

    console.error('Error issuing certificate:', error)
    return NextResponse.json({ error: 'Failed to issue certificate' }, { status: 500 })
  }
}
