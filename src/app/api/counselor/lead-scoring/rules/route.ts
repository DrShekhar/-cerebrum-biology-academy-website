import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Lead-scoring rules — READ-ONLY mirror of the actual engine.
//
// The scoring weights live in code (src/lib/leadScoring.ts — the same engine
// used at capture time AND by bulk rescore); until they move to
// configuration, GET reports the REAL factors the engine applies and POST
// honestly refuses. Shape matches the page's ScoringRule interface
// (label/category/description/isActive with UPPERCASE categories) so the
// rules actually render in their category groups.

const ENGINE_RULES = [
  // DEMOGRAPHIC (max 25)
  {
    id: 'has_contact_info',
    event: 'CONTACT_INFO',
    label: 'Email + phone on file',
    category: 'DEMOGRAPHIC',
    points: 10,
    description: '+5 for email, +5 for phone',
    isActive: true,
  },
  {
    id: 'source_quality',
    event: 'SOURCE_QUALITY',
    label: 'Lead source quality',
    category: 'DEMOGRAPHIC',
    points: 10,
    description: 'Website/Referral +10, Phone +9, WhatsApp +8, Walk-in +7, Social +6, Manual +4',
    isActive: true,
  },
  // BEHAVIORAL (max 30)
  {
    id: 'activity_volume',
    event: 'ACTIVITY_VOLUME',
    label: 'Activity on the lead',
    category: 'BEHAVIORAL',
    points: 8,
    description: '1+ activities +2, 5+ +5, 10+ +8',
    isActive: true,
  },
  {
    id: 'communication_volume',
    event: 'COMMUNICATION_VOLUME',
    label: 'Communications logged',
    category: 'BEHAVIORAL',
    points: 7,
    description: '1+ +2, 5+ +4, 10+ +7',
    isActive: true,
  },
  {
    id: 'tasks_notes',
    event: 'TASKS_NOTES',
    label: 'Completed tasks & notes',
    category: 'BEHAVIORAL',
    points: 10,
    description: 'Completed tasks up to +5, notes up to +5',
    isActive: true,
  },
  {
    id: 'stage_progress',
    event: 'STAGE_PROGRESS',
    label: 'Pipeline stage progress',
    category: 'BEHAVIORAL',
    points: 10,
    description: 'Demo scheduled +6 … negotiation +10',
    isActive: true,
  },
  // ENGAGEMENT (max 30)
  {
    id: 'demo',
    event: 'DEMO',
    label: 'Demo booked / attended',
    category: 'ENGAGEMENT',
    points: 15,
    description: 'Booked +10, attended +15',
    isActive: true,
  },
  {
    id: 'response_speed',
    event: 'RESPONSE_SPEED',
    label: 'First contact speed',
    category: 'ENGAGEMENT',
    points: 10,
    description: 'Contacted within 24h +10, 48h +7, 72h +4, later +2',
    isActive: true,
  },
  {
    id: 'recent_comms',
    event: 'RECENT_COMMS',
    label: 'Conversations this week',
    category: 'ENGAGEMENT',
    points: 5,
    description: '1+ in last 7 days +3, 3+ +5',
    isActive: true,
  },
  // TIMELINE / NEGATIVE (max 15, staleness subtracts)
  {
    id: 'freshness',
    event: 'FRESHNESS',
    label: 'Lead freshness & follow-up hygiene',
    category: 'ENGAGEMENT',
    points: 15,
    description: 'New lead +5, contacted in last 3 days +5, follow-up scheduled +5',
    isActive: true,
  },
  {
    id: 'staleness',
    event: 'STALENESS',
    label: 'Gone stale',
    category: 'NEGATIVE',
    points: -5,
    description: '90+ days old −3, no contact 30+ days −2, follow-up overdue −2',
    isActive: true,
  },
]

export async function GET(_req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const role = (session.user.role || '').toUpperCase()
    if (role !== 'COUNSELOR' && role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

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
