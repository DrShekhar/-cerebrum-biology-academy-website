// InstantDB Schema Configuration for Admin Panel
// Enterprise-level database schema for comprehensive admin system

import { i } from '@instantdb/react'

export const adminSchema = i.schema({
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
    completionRate: i.number(),
    lastActivity: i.date(),
    deviceType: i.string(),
    browser: i.string(),
    os: i.string(),
    country: i.string(),
    state: i.string(),
    city: i.string(),
    timezone: i.string(),
    emailNotifications: i.boolean(),
    smsNotifications: i.boolean(),
    whatsappNotifications: i.boolean(),
    pushNotifications: i.boolean(),
    language: i.string(),
    marketingConsent: i.boolean(),
  }),

  // Demo Booking System
  demoBookings: i.entity({
    userId: i.string(),
    studentName: i.string(),
    phone: i.string(),
    whatsappNumber: i.string().optional(),
    email: i.string(),
    courseInterest: i.json(), // string array
    preferredDate: i.date(),
    preferredTimeStart: i.string(),
    preferredTimeEnd: i.string(),
    timezone: i.string(),
    status: i.string(),
    assignedFaculty: i.string().optional(),
    notes: i.string().optional(),
    remindersSent: i.number(),
    createdAt: i.date(),
    updatedAt: i.date(),
    completedAt: i.date().optional(),
    rating: i.number().optional(),
    feedback: i.string().optional(),
    enrollmentInterest: i.number().optional(),
    followUpRequired: i.boolean(),
  }),

  // Faculty Management
  faculty: i.entity({
    name: i.string(),
    email: i.string(),
    phone: i.string(),
    specialization: i.json(), // string array
    experience: i.number(),
    rating: i.number(),
    timezone: i.string(),
    isActive: i.boolean(),
    totalDemos: i.number(),
    completedDemos: i.number(),
    averageRating: i.number(),
    conversionRate: i.number(),
    totalStudents: i.number(),
  }),

  // Faculty Availability
  facultyAvailability: i.entity({
    facultyId: i.string(),
    dayOfWeek: i.string(), // monday, tuesday, etc.
    isAvailable: i.boolean(),
    startTime: i.string(),
    endTime: i.string(),
    maxBookings: i.number(),
  }),

  // Faculty Availability Exceptions
  facultyExceptions: i.entity({
    facultyId: i.string(),
    date: i.date(),
    type: i.string(), // 'unavailable' | 'custom_hours'
    startTime: i.string().optional(),
    endTime: i.string().optional(),
    reason: i.string().optional(),
  }),

  // User Activity Tracking
  userActivities: i.entity({
    userId: i.string(),
    type: i.string(),
    data: i.json(),
    timestamp: i.date(),
    sessionId: i.string(),
    ipAddress: i.string().optional(),
    userAgent: i.string().optional(),
    page: i.string().optional(),
    referrer: i.string().optional(),
    courseId: i.string().optional(),
    searchTerm: i.string().optional(),
    duration: i.number().optional(),
  }),

  // Shopping Cart Management
  carts: i.entity({
    userId: i.string(),
    status: i.string(),
    totalAmount: i.number(),
    discountCode: i.string().optional(),
    discountAmount: i.number(),
    finalAmount: i.number(),
    createdAt: i.date(),
    updatedAt: i.date(),
    abandonedAt: i.date().optional(),
    remindersSent: i.number(),
  }),

  // Cart Items
  cartItems: i.entity({
    cartId: i.string(),
    courseId: i.string(),
    courseName: i.string(),
    price: i.number(),
    discount: i.number().optional(),
    finalPrice: i.number(),
  }),

  // Payment Management
  payments: i.entity({
    userId: i.string(),
    cartId: i.string(),
    amount: i.number(),
    status: i.string(),
    method: i.string(),
    transactionId: i.string(),
    gatewayResponse: i.json(),
    createdAt: i.date(),
    completedAt: i.date().optional(),
    failureReason: i.string().optional(),
    refundAmount: i.number().optional(),
    refundedAt: i.date().optional(),
  }),

  // CRM Contact Management
  contacts: i.entity({
    name: i.string(),
    email: i.string().optional(),
    phone: i.string(),
    whatsappNumber: i.string().optional(),
    source: i.string(),
    status: i.string(),
    assignedTo: i.string().optional(),
    tags: i.json(), // string array
    leadScore: i.number(),
    createdAt: i.date(),
    lastContactedAt: i.date().optional(),
    conversionProbability: i.number(),
    estimatedValue: i.number(),
  }),

  // Contact Notes
  contactNotes: i.entity({
    contactId: i.string(),
    content: i.string(),
    type: i.string(),
    createdBy: i.string(),
    createdAt: i.date(),
    isImportant: i.boolean(),
    followUpDate: i.date().optional(),
  }),

  // Marketing Campaigns
  campaigns: i.entity({
    name: i.string(),
    type: i.string(),
    status: i.string(),
    subject: i.string().optional(),
    message: i.string(),
    mediaUrl: i.string().optional(),
    ctaText: i.string().optional(),
    ctaUrl: i.string().optional(),
    targetCriteria: i.json(),
    estimatedReach: i.number(),
    scheduleType: i.string(),
    sendAt: i.date().optional(),
    recurringFrequency: i.string().optional(),
    recurringInterval: i.number().optional(),
    endDate: i.date().optional(),
    createdAt: i.date(),
    createdBy: i.string(),
    sent: i.number(),
    delivered: i.number(),
    opened: i.number(),
    clicked: i.number(),
    converted: i.number(),
    unsubscribed: i.number(),
    bounced: i.number(),
  }),

  // Campaign Recipients
  campaignRecipients: i.entity({
    campaignId: i.string(),
    userId: i.string(),
    status: i.string(), // 'queued', 'sent', 'delivered', 'opened', 'clicked', 'failed'
    sentAt: i.date().optional(),
    openedAt: i.date().optional(),
    clickedAt: i.date().optional(),
    errorMessage: i.string().optional(),
  }),

  // Notifications
  notifications: i.entity({
    type: i.string(),
    title: i.string(),
    message: i.string(),
    data: i.json().optional(),
    recipients: i.json(), // string array of user IDs
    channels: i.json(), // array of channels
    priority: i.string(),
    status: i.string(),
    scheduledFor: i.date().optional(),
    createdAt: i.date(),
    sentAt: i.date().optional(),
    errorMessage: i.string().optional(),
  }),

  // Real-time Events
  realTimeEvents: i.entity({
    type: i.string(),
    data: i.json(),
    timestamp: i.date(),
    userId: i.string().optional(),
    sessionId: i.string().optional(),
    processed: i.boolean(),
  }),

  // Admin Users & Roles
  adminUsers: i.entity({
    name: i.string(),
    email: i.string(),
    role: i.string(),
    permissions: i.json(), // array of permission objects
    lastLogin: i.date(),
    isActive: i.boolean(),
    createdAt: i.date(),
    createdBy: i.string().optional(),
  }),

  // System Metrics (Daily Aggregations)
  dailyMetrics: i.entity({
    date: i.date(),
    totalUsers: i.number(),
    activeUsers: i.number(),
    newRegistrations: i.number(),
    totalRevenue: i.number(),
    totalBookings: i.number(),
    completedDemos: i.number(),
    conversionRate: i.number(),
    averageSessionTime: i.number(),
    pageViews: i.number(),
    bounceRate: i.number(),
    topCourses: i.json(),
    topSources: i.json(),
  }),

  // Course Enrollments
  courseEnrollments: i.entity({
    userId: i.string(),
    courseId: i.string(),
    courseName: i.string(),
    enrollmentDate: i.date(),
    price: i.number(),
    paymentId: i.string(),
    status: i.string(), // 'active', 'completed', 'cancelled'
    progress: i.number(),
    completionDate: i.date().optional(),
    certificateIssued: i.boolean(),
    rating: i.number().optional(),
    feedback: i.string().optional(),
  }),

  // A/B Testing
  abTests: i.entity({
    name: i.string(),
    description: i.string(),
    status: i.string(), // 'draft', 'running', 'completed'
    variants: i.json(), // array of variant objects
    trafficSplit: i.json(), // percentage split
    conversionMetric: i.string(),
    startDate: i.date(),
    endDate: i.date().optional(),
    results: i.json().optional(),
    createdBy: i.string(),
  }),

  // User Segments
  userSegments: i.entity({
    name: i.string(),
    description: i.string(),
    criteria: i.json(),
    userCount: i.number(),
    createdAt: i.date(),
    updatedAt: i.date(),
    isActive: i.boolean(),
  }),

  // Email Templates
  emailTemplates: i.entity({
    name: i.string(),
    subject: i.string(),
    content: i.string(),
    type: i.string(), // 'welcome', 'demo_reminder', 'cart_abandonment', etc.
    variables: i.json(), // array of template variables
    isActive: i.boolean(),
    createdAt: i.date(),
    updatedAt: i.date(),
  }),

  // WhatsApp Templates
  whatsappTemplates: i.entity({
    name: i.string(),
    content: i.string(),
    type: i.string(),
    mediaType: i.string().optional(), // 'image', 'video', 'document'
    mediaUrl: i.string().optional(),
    variables: i.json(),
    isApproved: i.boolean(),
    isActive: i.boolean(),
    createdAt: i.date(),
  }),
})

// Relations
export const adminRelations = {
  // Demo bookings belong to users and faculty
  demoBookings: {
    user: { refs: 'users' },
    faculty: { refs: 'faculty' },
  },

  // Faculty availability and exceptions
  facultyAvailability: {
    faculty: { refs: 'faculty' },
  },
  facultyExceptions: {
    faculty: { refs: 'faculty' },
  },

  // User activities belong to users
  userActivities: {
    user: { refs: 'users' },
  },

  // Cart and payment relations
  carts: {
    user: { refs: 'users' },
    items: { via: 'cartItems' },
    payment: { refs: 'payments' },
  },
  cartItems: {
    cart: { refs: 'carts' },
  },
  payments: {
    user: { refs: 'users' },
    cart: { refs: 'carts' },
  },

  // Contact management
  contacts: {
    notes: { via: 'contactNotes' },
    assignedUser: { refs: 'adminUsers' },
  },
  contactNotes: {
    contact: { refs: 'contacts' },
    createdBy: { refs: 'adminUsers' },
  },

  // Campaign relations
  campaigns: {
    recipients: { via: 'campaignRecipients' },
    createdBy: { refs: 'adminUsers' },
  },
  campaignRecipients: {
    campaign: { refs: 'campaigns' },
    user: { refs: 'users' },
  },

  // Course enrollments
  courseEnrollments: {
    user: { refs: 'users' },
    payment: { refs: 'payments' },
  },
}

export type AdminSchema = typeof adminSchema
export type AdminRelations = typeof adminRelations