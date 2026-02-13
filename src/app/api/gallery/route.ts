/**
 * Public Gallery API
 *
 * GET: Fetch gallery items with filtering and pagination
 */

import { NextRequest, NextResponse } from 'next/server'

import { getGalleryItems, getFeaturedGalleryItems, getCategoriesWithCounts } from '@/lib/gallery'
import { GalleryCategory, GalleryItemType } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as GalleryCategory | null
    const type = searchParams.get('type') as GalleryItemType | null
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '12', 10)
    const includeCategories = searchParams.get('includeCategories') === 'true'
    const featuredOnly = searchParams.get('featuredOnly') === 'true'

    // If requesting featured items only
    if (featuredOnly) {
      const items = await getFeaturedGalleryItems(limit)
      return NextResponse.json({
        success: true,
        items,
        total: items.length,
      }, {
        headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
      })
    }

    // Build filters
    const filters: {
      category?: GalleryCategory
      type?: GalleryItemType
      featured?: boolean
      search?: string
    } = {}

    if (category) filters.category = category
    if (type) filters.type = type
    if (featured === 'true') filters.featured = true
    if (featured === 'false') filters.featured = false
    if (search) filters.search = search

    // Fetch gallery items with pagination
    const result = await getGalleryItems(filters, { page, limit })

    // Optionally include category counts
    let categories = null
    if (includeCategories) {
      categories = await getCategoriesWithCounts()
    }

    return NextResponse.json({
      success: true,
      ...result,
      ...(categories && { categories }),
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}
