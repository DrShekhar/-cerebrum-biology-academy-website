import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth/config'

export const dynamic = 'force-dynamic'

// ============================================
// POST - Nominate an achiever (peer nomination)
// ============================================

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { achieverId, reason } = body

    if (!achieverId) {
      return NextResponse.json(
        { success: false, error: 'Achiever ID is required' },
        { status: 400 }
      )
    }

    // Check if achiever exists and is active
    const achiever = await prisma.wall_of_achievers.findUnique({
      where: { id: achieverId },
      select: { id: true, isActive: true, studentId: true },
    })

    if (!achiever || !achiever.isActive) {
      return NextResponse.json({ success: false, error: 'Achiever not found' }, { status: 404 })
    }

    // Cannot nominate yourself
    if (achiever.studentId === session.user.id) {
      return NextResponse.json(
        { success: false, error: 'You cannot nominate yourself' },
        { status: 400 }
      )
    }

    // Check if already nominated by this user
    const existingNomination = await prisma.achiever_nominations.findUnique({
      where: {
        achieverId_nominatedById_nominationType: {
          achieverId,
          nominatedById: session.user.id,
          nominationType: 'PEER',
        },
      },
    })

    if (existingNomination) {
      return NextResponse.json(
        { success: false, error: 'You have already nominated this achiever' },
        { status: 400 }
      )
    }

    // Create nomination
    const nomination = await prisma.achiever_nominations.create({
      data: {
        achieverId,
        nominatedById: session.user.id,
        nominationType: 'PEER',
        reason: reason || null,
        isApproved: true, // Peer nominations auto-approved for counting
      },
    })

    return NextResponse.json({
      success: true,
      data: nomination,
      message: 'Nomination submitted successfully',
    })
  } catch (error) {
    console.error('Error submitting nomination:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit nomination' },
      { status: 500 }
    )
  }
}

// ============================================
// GET - Get user's nominations
// ============================================

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const nominations = await prisma.achiever_nominations.findMany({
      where: { nominatedById: session.user.id },
      select: {
        id: true,
        achieverId: true,
        nominationType: true,
        reason: true,
        isApproved: true,
        createdAt: true,
        achiever: {
          select: {
            id: true,
            studentName: true,
            achievement: true,
            category: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: nominations,
    })
  } catch (error) {
    console.error('Error fetching nominations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch nominations' },
      { status: 500 }
    )
  }
}
