import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth/clerk-utils'
import { z } from 'zod'

const invitationSchema = z.object({
  emailAddress: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'teacher', 'counselor', 'student', 'parent']).default('student'),
  redirectUrl: z.string().url().optional(),
})

const bulkInvitationSchema = z.object({
  invitations: z.array(invitationSchema).min(1).max(50),
})

/**
 * GET /api/admin/invitations
 * List all pending invitations
 */
export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const client = await clerkClient()
    const invitations = await client.invitations.getInvitationList()

    return NextResponse.json({
      success: true,
      data: invitations.data.map((inv) => ({
        id: inv.id,
        emailAddress: inv.emailAddress,
        status: inv.status,
        role: inv.publicMetadata?.role || 'student',
        createdAt: inv.createdAt,
      })),
      totalCount: invitations.totalCount,
    })
  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 })
  }
}

/**
 * POST /api/admin/invitations
 * Create a new invitation
 */
export async function POST(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const parsed = invitationSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { emailAddress, role, redirectUrl } = parsed.data
    const client = await clerkClient()

    const invitation = await client.invitations.createInvitation({
      emailAddress,
      redirectUrl: redirectUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/sign-up`,
      publicMetadata: {
        role,
        invitedAt: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${emailAddress}`,
      data: {
        id: invitation.id,
        emailAddress: invitation.emailAddress,
        status: invitation.status,
        role,
      },
    })
  } catch (error) {
    console.error('Error creating invitation:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to create invitation'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

/**
 * DELETE /api/admin/invitations
 * Revoke an invitation
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const invitationId = searchParams.get('id')

    if (!invitationId) {
      return NextResponse.json({ error: 'Invitation ID required' }, { status: 400 })
    }

    const client = await clerkClient()
    await client.invitations.revokeInvitation(invitationId)

    return NextResponse.json({
      success: true,
      message: 'Invitation revoked',
    })
  } catch (error) {
    console.error('Error revoking invitation:', error)
    return NextResponse.json({ error: 'Failed to revoke invitation' }, { status: 500 })
  }
}
