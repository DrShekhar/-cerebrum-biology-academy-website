import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { counselorCanAccessLead } from '@/lib/leads/access'
import { initiateBridgeCall, isExotelConfigured } from '@/lib/telephony/exotel'

export const dynamic = 'force-dynamic'

/** GET — recent calls for this lead (renders in the Call panel). */
export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  const { session } = authResult
  const { id: leadId } = await context.params

  if (!(await counselorCanAccessLead(leadId, session.userId, session.role))) {
    return NextResponse.json(
      { success: false, error: 'This lead is not assigned to you' },
      { status: 403 }
    )
  }

  const calls = await prisma.call_logs.findMany({
    where: { leadId },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true,
      status: true,
      durationSec: true,
      recordingUrl: true,
      startedAt: true,
      counselor: { select: { name: true } },
    },
  })

  return NextResponse.json({
    success: true,
    data: {
      configured: isExotelConfigured(),
      calls: calls.map((c) => ({
        id: c.id,
        status: c.status,
        durationSec: c.durationSec,
        hasRecording: !!c.recordingUrl,
        startedAt: c.startedAt,
        counselorName: c.counselor?.name || null,
      })),
    },
  })
}

/**
 * POST — click-to-call: Exotel rings the counselor's own phone first, then
 * bridges the prospect. Ownership-gated; requires the counselor to have a
 * phone number on their profile.
 */
export async function POST(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  const { session } = authResult
  const { id: leadId } = await context.params

  try {
    if (!isExotelConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Calling is not configured yet (Exotel keys missing).' },
        { status: 503 }
      )
    }

    if (!(await counselorCanAccessLead(leadId, session.userId, session.role))) {
      return NextResponse.json(
        { success: false, error: 'This lead is not assigned to you' },
        { status: 403 }
      )
    }

    const [lead, counselor] = await Promise.all([
      prisma.leads.findUnique({
        where: { id: leadId },
        select: { id: true, phone: true, studentName: true },
      }),
      prisma.users.findUnique({ where: { id: session.userId }, select: { phone: true } }),
    ])
    if (!lead?.phone) {
      return NextResponse.json(
        { success: false, error: 'This lead has no phone number.' },
        { status: 400 }
      )
    }
    if (!counselor?.phone) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Add your phone number to your profile first — the call rings you before the lead.',
        },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'https://cerebrumbiologyacademy.com'
    const webhookToken = process.env.EXOTEL_WEBHOOK_TOKEN || ''
    const statusCallbackUrl = `${baseUrl}/api/webhooks/exotel/status${webhookToken ? `?token=${webhookToken}` : ''}`

    const result = await initiateBridgeCall({
      agentNumber: counselor.phone,
      customerNumber: lead.phone,
      statusCallbackUrl,
    })
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Call could not be placed.' },
        { status: 502 }
      )
    }

    const log = await prisma.call_logs.create({
      data: {
        leadId,
        counselorId: session.userId,
        providerCallSid: result.callSid,
        fromNumber: counselor.phone,
        toNumber: lead.phone,
        status: 'initiated',
      },
      select: { id: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        callLogId: log.id,
        message: `Calling your phone now — pick up and we'll connect ${lead.studentName}.`,
      },
    })
  } catch (error) {
    console.error('[counselor/calls] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Call failed.' }, { status: 500 })
  }
}
