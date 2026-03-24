import { NextRequest, NextResponse } from 'next/server'

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'cerebrum-biology-academy-indexnow'
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

interface IndexNowRequest {
  urls?: string[]
  all_local?: boolean
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.INDEXNOW_API_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: IndexNowRequest = await request.json()
    const urls = body.urls || []

    if (urls.length === 0) {
      return NextResponse.json({ error: 'No URLs provided' }, { status: 400 })
    }

    if (urls.length > 10000) {
      return NextResponse.json({ error: 'Max 10000 URLs per request' }, { status: 400 })
    }

    const fullUrls = urls.map((u) => (u.startsWith('http') ? u : `${SITE_URL}${u}`))

    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host: 'cerebrumbiologyacademy.com',
            key: INDEXNOW_KEY,
            keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
            urlList: fullUrls,
          }),
        })
        return {
          endpoint,
          status: response.status,
          ok: response.ok,
        }
      })
    )

    const outcomes = results.map((r) => (r.status === 'fulfilled' ? r.value : { error: r.reason }))

    return NextResponse.json({
      success: true,
      submitted: fullUrls.length,
      results: outcomes,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit URLs', detail: String(error) },
      { status: 500 }
    )
  }
}
