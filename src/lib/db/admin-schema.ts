// InstantDB Schema Configuration for Admin Panel
// Enterprise-level database schema for comprehensive admin system
// Note: This schema is only used client-side to avoid SSR issues with InstantDB

// Only import and use InstantDB schema on client side
const getSchema = () => {
  if (typeof window === 'undefined') {
    // Return mock schema for SSR
    return null
  }
  try {
    const { i } = require('@instantdb/react')
    return i.schema({
      entities: {
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
        adminUsers: i.entity({
          email: i.string(),
          name: i.string(),
          role: i.string(),
          permissions: i.json(),
          lastLogin: i.date(),
          isActive: i.boolean(),
          createdAt: i.date(),
        }),
        demoBookings: i.entity({
          userId: i.string(),
          facultyId: i.string(),
          scheduledAt: i.date(),
          duration: i.number(),
          status: i.string(),
          notes: i.string().optional(),
          createdAt: i.date(),
        }),
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
  } catch {
    return null
  }
}

// Lazy-loaded schema
let _adminSchema: any = null

export const adminSchema = new Proxy(
  {},
  {
    get(target, prop) {
      if (!_adminSchema && typeof window !== 'undefined') {
        _adminSchema = getSchema()
      }
      return _adminSchema?.[prop]
    },
  }
)

export type AdminSchema = typeof adminSchema
