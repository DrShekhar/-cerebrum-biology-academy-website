import { NextRequest, NextResponse } from 'next/server'
import { getBlogFeaturedImage, getBlogImages } from '@/lib/images/blogImageService'

/**
 * POST /api/blog/images
 * Generate or fetch images for a blog post
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { title, category, keywords = [], preferAI = false, topic, count = 1 } = body

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 })
    }

    const imageRequest = {
      title,
      category,
      keywords: Array.isArray(keywords) ? keywords : [keywords],
      preferAI,
      topic,
    }

    if (count > 1) {
      const images = await getBlogImages(imageRequest, count)
      return NextResponse.json({
        success: true,
        images,
        count: images.length,
      })
    }

    const image = await getBlogFeaturedImage(imageRequest)

    return NextResponse.json({
      success: true,
      image,
    })
  } catch (error) {
    console.error('Blog image generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate blog image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/blog/images?title=...&category=...
 * Quick image fetch for simple requests
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const title = searchParams.get('title')
    const category = searchParams.get('category')
    const keywords = searchParams.get('keywords')?.split(',') || []
    const preferAI = searchParams.get('preferAI') === 'true'

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 })
    }

    const image = await getBlogFeaturedImage({
      title,
      category,
      keywords,
      preferAI,
    })

    return NextResponse.json({
      success: true,
      image,
    })
  } catch (error) {
    console.error('Blog image fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch blog image' }, { status: 500 })
  }
}
