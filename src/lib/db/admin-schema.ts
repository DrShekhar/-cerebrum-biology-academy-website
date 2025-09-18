// InstantDB Schema Configuration for Admin Panel
// Enterprise-level database schema for comprehensive admin system

import { i } from '@instantdb/react'

export const adminSchema = i.schema({
  entities: {
    // User Management
    users: i.entity({
      email: i.string(),
      phone: i.string(),
      whatsappNumber: i.string().optional(),
      name: i.string(),
      avatar: i.string().optional(),
      role: i.string(),
      status: i.string(),
      subscription: i.string(),
      lastLogin: i.date(),
      registrationDate: i.date(),
      totalSessions: i.number(),
      totalTimeSpent: i.number(),
    }),

    // Admin Users
    adminUsers: i.entity({
      email: i.string(),
      name: i.string(),
      role: i.string(),
      permissions: i.json(),
      lastLogin: i.date(),
      isActive: i.boolean(),
      createdAt: i.date(),
    }),

    // Demo Bookings
    demoBookings: i.entity({
      userId: i.string(),
      facultyId: i.string(),
      scheduledAt: i.date(),
      duration: i.number(),
      status: i.string(),
      notes: i.string().optional(),
      createdAt: i.date(),
    }),

    // Enrollments
    enrollments: i.entity({
      userId: i.string(),
      courseId: i.string(),
      enrollmentDate: i.date(),
      status: i.string(),
      paymentStatus: i.string(),
      totalFee: i.number(),
      amountPaid: i.number(),
      nextPaymentDue: i.date().optional(),
    }),
  },
})

export type AdminSchema = typeof adminSchema
