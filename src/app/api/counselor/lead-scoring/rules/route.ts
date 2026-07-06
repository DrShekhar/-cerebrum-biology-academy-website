import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Lead-scoring rules — READ-ONLY mirror of the actual engine.
//
// This route previously returned empty placeholder rules and a POST that
// claimed to save while writing nothing ("store in memory") — the UI showed a
// success toast for edits that never took effect. The scoring weights live in
// code (rescore/route.ts); until they move to configuration, GET reports the
// REAL rules the engine applies and POST honestly refuses.

const ENGINE_RULES = [
  { id: 'demo_attended', name: 'Demo attended', points: 30, category: 'Behavioral' },
  { id: 'demo_scheduled', name: 'Demo scheduled', points: 15, category: 'Behavioral' },
  { id: 'fee_plan', name: 'Fee plan created', points: 20, category: 'Behavioral' },
  {
    id: 'stage_progression',
    name: 'Stage progression bonus (OFFER_SENT +15 … PAYMENT_PLAN_CREATED +50)',
    points: 50,
    category: 'Stage',
  },
  {
    id: 'whatsapp_replies',
    name: 'WhatsApp replies in last 7 days (+10 each, max 30)',
    points: 30,
    category: 'Engagement',
  },
  {
    id: 'inbound_call',
    name: 'Parent called back (last 7 days)',
    points: 25,
    category: 'Engagement',
  },
  { id: 'session_notes', name: '3+ session notes', points: 10, category: 'Engagement' },
]

export async function GET(_req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({
      data: {
        rules: ENGINE_RULES,
        hotThreshold: 70,
        warmThreshold: 40,
        // Signals to the UI that these mirror the engine and cannot be edited yet
        editable: false,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 })
  }
}

export async function POST(_req: NextRequest) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Refuse honestly rather than pretend to save (the old behavior).
  return NextResponse.json(
    {
      error:
        'Scoring rules are currently fixed in the scoring engine and cannot be edited here yet.',
    },
    { status: 501 }
  )
}
