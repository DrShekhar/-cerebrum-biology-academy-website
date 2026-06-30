/**
 * Teacher — searchable student list for assigning tests to individuals.
 * Search-driven + capped so it scales to a large student base.
 * Optional courseId scopes to students with an ACTIVE enrolment in that course.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { parsePositiveInt } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || (session.user.role !== 'TEACHER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized. Teacher access required.' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = (searchParams.get('search') || '').trim()
    const courseId = searchParams.get('courseId')
    const limit = parsePositiveInt(searchParams.get('limit'), 25, { min: 1, max: 100 })

    const where: Record<string, unknown> = { role: 'STUDENT' }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }
    if (courseId) {
      where.enrollments = { some: { courseId, status: 'ACTIVE' } }
    }

    const students = await prisma.users.findMany({
      where,
      select: { id: true, name: true, email: true },
      orderBy: { name: 'asc' },
      take: limit,
    })

    return NextResponse.json({ success: true, students })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch students' }, { status: 500 })
  }
}
