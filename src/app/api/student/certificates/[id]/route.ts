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
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            type: true,
            description: true,
          },
        },
        enrollments: {
          select: {
            id: true,
            status: true,
            enrollmentDate: true,
            currentProgress: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        certificate_templates: true,
      },
    })

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    await prisma.certificates.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })

    const {
      courses: certCourse,
      enrollments: certEnrollment,
      users: certStudent,
      certificate_templates: certTemplate,
      ...certRest
    } = certificate
    const remappedCertificate = {
      ...certRest,
      course: certCourse,
      enrollment: certEnrollment,
      student: certStudent,
      template: certTemplate,
    }

    return NextResponse.json({ certificate: remappedCertificate })
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 })
  }
}
