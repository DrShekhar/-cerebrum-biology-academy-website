import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { detectCurrencyFromCountry, type SupportedCurrency } from '@/lib/payments/currencyService'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const courseId = searchParams.get('courseId')
    const requestedCurrency = searchParams.get('currency')?.toUpperCase() as
      | SupportedCurrency
      | undefined

    const country =
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-vercel-ip-country') ||
      request.headers.get('x-country-code')

    const currency = requestedCurrency || detectCurrencyFromCountry(country)

    if (courseId) {
      const pricing = await prisma.course_pricing.findFirst({
        where: {
          courseId,
          currency,
          isActive: true,
        },
        include: {
          course: {
            select: {
              id: true,
              name: true,
              totalFees: true,
            },
          },
        },
      })

      if (!pricing) {
        const course = await prisma.courses.findUnique({
          where: { id: courseId },
          select: { id: true, name: true, totalFees: true },
        })

        if (!course) {
          return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 })
        }

        return NextResponse.json({
          success: true,
          data: {
            courseId: course.id,
            courseName: course.name,
            currency: 'INR',
            amount: course.totalFees,
            amountDisplay: course.totalFees / 100,
            fallback: true,
          },
        })
      }

      return NextResponse.json({
        success: true,
        data: {
          courseId: pricing.courseId,
          courseName: pricing.course.name,
          currency: pricing.currency,
          amount: pricing.amount,
          amountDisplay: pricing.amount / 100,
          fallback: false,
        },
      })
    }

    const allPricing = await prisma.course_pricing.findMany({
      where: {
        currency,
        isActive: true,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            type: true,
            totalFees: true,
            isActive: true,
          },
        },
      },
      orderBy: {
        course: {
          sortOrder: 'asc',
        },
      },
    })

    const courses = await prisma.courses.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        totalFees: true,
      },
      orderBy: { sortOrder: 'asc' },
    })

    type PricingEntry = (typeof allPricing)[number]
    const pricingMap = new Map<string, PricingEntry>(allPricing.map((p) => [p.courseId, p]))

    const coursesWithPricing = courses.map((course) => {
      const pricing = pricingMap.get(course.id)
      return {
        courseId: course.id,
        courseName: course.name,
        courseType: course.type,
        currency: pricing?.currency || 'INR',
        amount: pricing?.amount || course.totalFees,
        amountDisplay: (pricing?.amount || course.totalFees) / 100,
        fallback: !pricing,
      }
    })

    return NextResponse.json({
      success: true,
      currency,
      data: coursesWithPricing,
    })
  } catch (error) {
    console.error('Error fetching course pricing:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch pricing',
      },
      { status: 500 }
    )
  }
}
