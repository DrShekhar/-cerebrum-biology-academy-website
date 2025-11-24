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
        course: {
          select: {
            id: true,
            name: true,
            type: true,
            description: true,
          },
        },
        enrollment: {
          select: {
            id: true,
            status: true,
            enrollmentDate: true,
            currentProgress: true,
          },
        },
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        template: true,
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

    return NextResponse.json({ certificate })
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return NextResponse.json({ error: 'Failed to fetch certificate' }, { status: 500 })
  }
}
