import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, value, rating, page, id, delta, connection } = body

    if (!name || value === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await prisma.webVital.create({
      data: {
        metricName: name,
        metricValue: value,
        rating: rating || 'unknown',
        page: page || '/',
        metricId: id || '',
        delta: delta || 0,
        connection: connection || '',
        userAgent: request.headers.get('user-agent') || '',
        country: request.headers.get('x-vercel-ip-country') || '',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving web vital:', error)
    return NextResponse.json({ error: 'Failed to save metric' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    const page = searchParams.get('page') || undefined

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const vitals = await prisma.webVital.groupBy({
      by: ['metricName', 'rating'],
      where: {
        createdAt: { gte: startDate },
        ...(page ? { page } : {}),
      },
      _count: true,
      _avg: { metricValue: true },
      _min: { metricValue: true },
      _max: { metricValue: true },
    })

    const summary = vitals.reduce(
      (acc, v) => {
        if (!acc[v.metricName]) {
          acc[v.metricName] = { good: 0, needsImprovement: 0, poor: 0, avg: 0, count: 0 }
        }
        acc[v.metricName][v.rating === 'good' ? 'good' : v.rating === 'needs-improvement' ? 'needsImprovement' : 'poor'] += v._count
        acc[v.metricName].avg = v._avg.metricValue || 0
        acc[v.metricName].count += v._count
        return acc
      },
      {} as Record<string, { good: number; needsImprovement: number; poor: number; avg: number; count: number }>
    )

    return NextResponse.json({ success: true, data: summary, days })
  } catch (error) {
    console.error('Error fetching web vitals:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}
