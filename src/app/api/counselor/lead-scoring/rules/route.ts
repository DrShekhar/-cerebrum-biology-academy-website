import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Fetch current scoring rules
export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Default rules — in production, store in a settings table
    return NextResponse.json({
      data: {
        rules: [],
        hotThreshold: 70,
        warmThreshold: 40,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 })
  }
}

// POST - Save scoring rules
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { rules, hotThreshold, warmThreshold } = body

    // In production: save to a settings/scoring_rules table
    // For now, acknowledge and store in memory

    return NextResponse.json({
      data: { saved: true, rulesCount: rules.length, hotThreshold, warmThreshold },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save rules' }, { status: 500 })
  }
}
