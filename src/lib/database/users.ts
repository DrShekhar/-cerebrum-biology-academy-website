import { prisma } from '../prisma'
import { hashPassword } from '../auth'
import type { UserRole } from '../../generated/prisma'

// User creation with proper validation
export async function createUser(data: {
  email: string
  name: string
  phone?: string
  role?: UserRole
  password?: string
  profile?: any
}) {
  const passwordHash = data.password ? await hashPassword(data.password) : undefined

  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone,
      role: data.role || 'STUDENT',
      passwordHash,
      profile: data.profile || {},
    },
  })
}

// Get user by email
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      enrollments: {
        include: {
          course: true,
          payments: true,
        },
      },
      demoBookings: true,
    },
  })
}

// Get user by ID
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: {
          course: true,
          payments: true,
        },
      },
      demoBookings: true,
    },
  })
}

// Update user profile
export async function updateUserProfile(userId: string, profile: any) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      profile,
      updatedAt: new Date(),
    },
  })
}

// Update user's last active timestamp
export async function updateLastActive(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      lastActiveAt: new Date(),
    },
  })
}

// Get all users with pagination
export async function getUsers(options: {
  page?: number
  limit?: number
  role?: UserRole
  search?: string
}) {
  const { page = 1, limit = 20, role, search } = options
  const skip = (page - 1) * limit

  const where: any = {}
  if (role) where.role = role
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } },
    ]
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        enrollments: {
          include: {
            course: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
            demoBookings: true,
            payments: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  }
}
