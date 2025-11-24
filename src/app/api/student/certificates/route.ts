import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const courseId = searchParams.get('courseId')

    const where: any = {
      studentId: session.user.id,
    }

    if (type) {
      where.certificateType = type
    }

    if (status) {
      where.status = status
    }

    if (courseId) {
      where.courseId = courseId
    }

    const certificates = await prisma.certificates.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        enrollment: {
          select: {
            id: true,
            status: true,
            enrollmentDate: true,
          },
        },
      },
      orderBy: {
        issueDate: 'desc',
      },
    })

    const stats = {
      total: certificates.length,
      byType: certificates.reduce(
        (acc, cert) => {
          acc[cert.certificateType] = (acc[cert.certificateType] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      ),
      byStatus: certificates.reduce(
        (acc, cert) => {
          acc[cert.status] = (acc[cert.status] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      ),
    }

    return NextResponse.json({
      certificates,
      stats,
    })
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 })
  }
}
