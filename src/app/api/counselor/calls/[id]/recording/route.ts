import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { counselorCanAccessLead } from '@/lib/leads/access'
import { fetchRecording } from '@/lib/telephony/exotel'

export const dynamic = 'force-dynamic'

/**
 * GET /api/counselor/calls/[id]/recording — streams the call recording via a
 * server-side Exotel-authenticated fetch (credentials never reach the client).
 * Ownership-gated: a counselor can only play recordings of their own leads
 * (ADMIN bypasses).
 */
export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  const { session } = authResult
  const { id } = await context.params

  const log = await prisma.call_logs.findUnique({
    where: { id },
    select: { leadId: true, recordingUrl: true },
  })
  if (!log?.recordingUrl) {
    return NextResponse.json({ success: false, error: 'No recording' }, { status: 404 })
  }
  if (!(await counselorCanAccessLead(log.leadId, session.userId, session.role))) {
    return NextResponse.json(
      { success: false, error: 'This lead is not assigned to you' },
      { status: 403 }
    )
  }

  const upstream = await fetchRecording(log.recordingUrl)
  if (!upstream || !upstream.ok || !upstream.body) {
    return NextResponse.json(
      { success: false, error: 'Recording unavailable (it may have expired).' },
      { status: 502 }
    )
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || 'audio/mpeg',
      'Cache-Control': 'private, no-store',
    },
  })
}
