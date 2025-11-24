import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const revokeCertificateSchema = z.object({
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'admin' && session.user.role !== 'teacher') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = params
    const body = await request.json()
    const { reason } = revokeCertificateSchema.parse(body)

    const certificate = await prisma.certificates.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        certificateNumber: true,
        studentName: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    if (certificate.status === 'REVOKED') {
      return NextResponse.json({ error: 'Certificate is already revoked' }, { status: 400 })
    }

    const updatedCertificate = await prisma.certificates.update({
      where: { id },
      data: {
        status: 'REVOKED',
        revokedAt: new Date(),
        revokedBy: session.user.id,
        revokeReason: reason,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({
      message: 'Certificate revoked successfully',
      certificate: updatedCertificate,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', errors: error.issues }, { status: 400 })
    }

    console.error('Error revoking certificate:', error)
    return NextResponse.json({ error: 'Failed to revoke certificate' }, { status: 500 })
  }
}
