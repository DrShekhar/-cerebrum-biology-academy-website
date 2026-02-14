import { prisma } from '@/lib/prisma'
import type { DemoBookingStatus, StudentClass } from '../../generated/prisma'

// Create a new demo booking
export async function createDemoBooking(data: {
  userId?: string
  courseId?: string
  studentName: string
  email?: string
  phone: string
  whatsappNumber?: string | null
  studentClass?: StudentClass
  preferredDate: string
  preferredTime: string
  assignedTo?: string | null
  message?: string
  notes?: string | null
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}) {
  return prisma.demo_bookings.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      studentClass: data.studentClass,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      assignedTo: data.assignedTo,
      notes: data.notes || data.message,
      message: data.message,
      source: data.source || 'website',
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
    },
    include: {
      user: true,
      course: true,
    },
  })
}

// Get demo bookings with filters and pagination
export async function getDemoBookings(options: {
  page?: number
  limit?: number
  status?: DemoBookingStatus
  assignedTo?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}) {
  const { page = 1, limit = 20, status, assignedTo, dateFrom, dateTo, search } = options
  const skip = (page - 1) * limit

  const where: any = {}
  if (status) where.status = status
  if (assignedTo) where.assignedTo = assignedTo
  if (dateFrom && dateTo) {
    where.createdAt = {
      gte: dateFrom,
      lte: dateTo,
    }
  }
  if (search) {
    where.OR = [
      { studentName: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [bookings, total] = await Promise.all([
    prisma.demo_bookings.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        course: true,
        communicationLog: {
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    }),
    prisma.demo_bookings.count({ where }),
  ])

  return {
    bookings,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}

// Update demo booking status
export async function updateDemoBookingStatus(
  id: string,
  status: DemoBookingStatus,
  assignedTo?: string,
  notes?: string
) {
  const updateData: any = {
    status,
    updatedAt: new Date(),
  }

  if (assignedTo) updateData.assignedTo = assignedTo
  if (status === 'COMPLETED') updateData.demoCompleted = true

  return prisma.demo_bookings.update({
    where: { id },
    data: updateData,
    include: {
      user: true,
      course: true,
    },
  })
}

// Add communication log to demo booking
export async function addDemoBookingCommunication(
  demoBookingId: string,
  data: {
    type: string
    channel: string
    content: string
    subject?: string
  }
) {
  return prisma.communication_logs.create({
    data: {
      demoBookingId,
      type: data.type as any,
      channel: data.channel as any,
      content: data.content,
      subject: data.subject,
    },
  })
}

// Get demo booking statistics - optimized to reduce N+1 queries
export async function getDemoBookingStats(options?: { dateFrom?: Date; dateTo?: Date }) {
  const where: any = {}
  if (options?.dateFrom && options?.dateTo) {
    where.createdAt = {
      gte: options.dateFrom,
      lte: options.dateTo,
    }
  }

  // Use parallel queries with groupBy to minimize database round trips
  // This replaces 6 separate count queries with 3 grouped queries
  const [statusCounts, converted, sourceBreakdown, classDistribution] = await Promise.all([
    // Single query for all status counts
    prisma.demo_bookings.groupBy({
      by: ['status'],
      where,
      _count: { status: true },
    }),
    // Single query for converted count
    prisma.demo_bookings.count({
      where: { ...where, convertedToEnrollment: true },
    }),
    // Source breakdown
    prisma.demo_bookings.groupBy({
      by: ['source'],
      where,
      _count: { source: true },
    }),
    // Class distribution
    prisma.demo_bookings.groupBy({
      by: ['studentClass'],
      where,
      _count: { studentClass: true },
    }),
  ])

  // Extract counts from grouped results
  const statusMap = statusCounts.reduce(
    (acc, item) => {
      acc[item.status] = item._count.status
      return acc
    },
    {} as Record<string, number>
  )

  const total = Object.values(statusMap).reduce((sum: number, count: number) => sum + count, 0)
  const pending = statusMap['PENDING'] || 0
  const confirmed = statusMap['CONFIRMED'] || 0
  const completed = statusMap['COMPLETED'] || 0
  const cancelled = statusMap['CANCELLED'] || 0

  const conversionRate = completed > 0 ? (converted / completed) * 100 : 0

  return {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    converted,
    conversionRate: Math.round(conversionRate * 100) / 100,
    sourceBreakdown: sourceBreakdown.reduce(
      (acc, item) => {
        if (item.source) acc[item.source] = item._count.source
        return acc
      },
      {} as Record<string, number>
    ),
    classDistribution: classDistribution.reduce(
      (acc, item) => {
        if (item.studentClass) acc[item.studentClass] = item._count.studentClass
        return acc
      },
      {} as Record<string, number>
    ),
  }
}
