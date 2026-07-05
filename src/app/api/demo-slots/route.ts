import { NextResponse } from 'next/server'
import { getAvailableSlots } from '@/lib/demo/slots'

export const dynamic = 'force-dynamic'

/**
 * GET /api/demo-slots — public list of bookable demo slots for the next ~10
 * days, with seats remaining. Powers the WhatsApp Flow's live slot picker
 * (data_exchange) and can also back an on-site booking widget.
 */
export async function GET() {
  try {
    const slots = await getAvailableSlots()
    return NextResponse.json(
      { success: true, slots },
      { headers: { 'Cache-Control': 'public, max-age=60, s-maxage=60' } }
    )
  } catch (error) {
    console.error('[demo-slots] availability error:', error)
    return NextResponse.json({ success: false, error: 'Could not load slots' }, { status: 500 })
  }
}
