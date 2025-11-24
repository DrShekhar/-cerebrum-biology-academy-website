import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    const certificate = await prisma.certificates.findUnique({
      where: {
        id,
        studentId: session.user.id,
      },
      select: {
        id: true,
        certificateNumber: true,
        verificationCode: true,
        studentName: true,
        courseName: true,
        completionDate: true,
        issueDate: true,
        status: true,
        revokedAt: true,
        revokeReason: true,
        certificateType: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const verificationDetails = {
      isValid: certificate.status === 'ISSUED',
      certificateNumber: certificate.certificateNumber,
      studentName: certificate.studentName,
      courseName: certificate.courseName,
      completionDate: certificate.completionDate,
      issueDate: certificate.issueDate,
      status: certificate.status,
      certificateType: certificate.certificateType,
      ...(certificate.status === 'REVOKED' && {
        revokedAt: certificate.revokedAt,
        revokeReason: certificate.revokeReason,
      }),
    }

    return NextResponse.json({
      verification: verificationDetails,
    })
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json({ error: 'Failed to verify certificate' }, { status: 500 })
  }
}
