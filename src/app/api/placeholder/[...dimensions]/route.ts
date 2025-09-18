import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  try {
    const resolvedParams = await params
    const dimensions = resolvedParams.dimensions

    if (!dimensions || dimensions.length < 2) {
      return new NextResponse('Invalid dimensions', { status: 400 })
    }

    const width = parseInt(dimensions[0]) || 300
    const height = parseInt(dimensions[1]) || 200

    // Create a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
          ${width} × ${height}
        </text>
      </svg>
    `

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Placeholder API error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
