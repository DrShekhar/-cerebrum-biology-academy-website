import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

/**
 * Returns the visitor's ISO-2 country code detected from edge headers.
 * Used by client-rendered pages (IBO, USABO, etc.) that cannot read
 * `headers()` directly but still want geo-aware pricing.
 *
 * Falls back through Vercel → Cloudflare → generic header → null.
 */
export async function GET() {
  const headerList = await headers()
  const country =
    headerList.get('x-vercel-ip-country') ||
    headerList.get('cf-ipcountry') ||
    headerList.get('x-country-code') ||
    headerList.get('x-debug-country') ||
    null

  return NextResponse.json(
    { country },
    {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    }
  )
}
