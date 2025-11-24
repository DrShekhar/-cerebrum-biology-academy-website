import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params

    if (!code || code.trim().length === 0) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 })
    }

    const certificate = await prisma.certificates.findUnique({
      where: {
        verificationCode: code.toUpperCase(),
      },
      select: {
        id: true,
        certificateNumber: true,
        verificationCode: true,
        studentName: true,
        courseName: true,
        completionDate: true,
        issueDate: true,
        validUntil: true,
        grade: true,
        percentage: true,
        duration: true,
        instructorNames: true,
        achievements: true,
        certificateType: true,
        status: true,
        revokedAt: true,
        revokeReason: true,
        qrCodeUrl: true,
        course: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
      },
    })

    if (!certificate) {
      return NextResponse.json(
        {
          verified: false,
          error: 'Certificate not found',
          message:
            'No certificate found with this verification code. Please check the code and try again.',
        },
        { status: 404 }
      )
    }

    const isValid = certificate.status === 'ISSUED'
    const isRevoked = certificate.status === 'REVOKED'
    const isExpired =
      certificate.status === 'EXPIRED' ||
      (certificate.validUntil && new Date(certificate.validUntil) < new Date())

    let statusMessage = 'This certificate is valid and verified.'
    if (isRevoked) {
      statusMessage = `This certificate has been revoked${certificate.revokeReason ? `: ${certificate.revokeReason}` : '.'}`
    } else if (isExpired) {
      statusMessage = 'This certificate has expired.'
    }

    const verificationData = {
      verified: isValid,
      certificate: {
        certificateNumber: certificate.certificateNumber,
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        completionDate: certificate.completionDate,
        issueDate: certificate.issueDate,
        validUntil: certificate.validUntil,
        grade: certificate.grade,
        percentage: certificate.percentage,
        duration: certificate.duration,
        instructorNames: certificate.instructorNames,
        achievements: certificate.achievements,
        certificateType: certificate.certificateType,
      },
      status: {
        isValid,
        isRevoked,
        isExpired,
        message: statusMessage,
        ...(isRevoked && {
          revokedAt: certificate.revokedAt,
          revokeReason: certificate.revokeReason,
        }),
      },
      issuer: {
        name: 'Cerebrum Biology Academy',
        website: 'https://cerebrumbiologyacademy.com',
      },
      verifiedAt: new Date(),
    }

    return NextResponse.json(verificationData)
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return NextResponse.json(
      {
        verified: false,
        error: 'Verification failed',
        message: 'An error occurred while verifying the certificate. Please try again later.',
      },
      { status: 500 }
    )
  }
}
