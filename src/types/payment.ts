/**
 * Payment History & Invoices Types
 * Comprehensive type definitions for student payment tracking
 */

import { PaymentStatus, PaymentMethod, PaymentStatusEnum } from '@/generated/prisma'

export const SUPPORTED_CURRENCIES = [
  'INR',
  'USD',
  'EUR',
  'GBP',
  'AUD',
  'CAD',
  'AED',
  'SGD',
] as const
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number]

export interface CurrencyInfo {
  code: SupportedCurrency
  symbol: string
  name: string
  locale: string
}

export interface CreateOrderRequest {
  amount: number
  currency?: SupportedCurrency
  receipt?: string
  notes?: Record<string, string>
  enrollmentId?: string
  userId?: string
}

export interface CreateOrderResponse {
  success: boolean
  id?: string
  entity?: string
  amount?: number
  amountDisplay?: number
  currency?: SupportedCurrency
  currencySymbol?: string
  receipt?: string
  status?: string
  created_at?: number
  error?: string
}

export interface StudentPayment {
  id: string
  userId: string
  enrollmentId: string | null
  amount: number
  currency: string
  status: PaymentStatus
  paymentMethod: PaymentMethod
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  transactionId: string | null
  failureReason: string | null
  installmentNumber: number | null
  totalInstallments: number | null
  createdAt: Date | string
  updatedAt: Date | string
  completedAt: Date | string | null

  // Relations
  enrollment?: {
    id: string
    courseId: string
    course?: {
      name: string
      type: string
    }
  } | null
}

export interface FeePayment {
  id: string
  feePlanId: string
  installmentId: string | null
  amount: number
  paymentMethod: string
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  razorpaySignature: string | null
  status: string
  paidAt: Date | string | null
  metadata: any
  receiptUrl: string | null
  createdAt: Date | string

  // Relations
  feePlan?: {
    id: string
    courseName: string
    totalFee: number
    amountPaid: number
    amountDue: number
    planType: string
    status: string
  }
  installment?: {
    id: string
    installmentNumber: number
    amount: number
    dueDate: Date | string
    status: PaymentStatusEnum
  } | null
}

export interface PaymentInstallment {
  id: string
  feePlanId: string
  installmentNumber: number
  amount: number
  dueDate: Date | string
  status: PaymentStatusEnum
  paidAt: Date | string | null
  paidAmount: number | null
  razorpayOrderId: string | null
  razorpayPaymentId: string | null
  paymentLink: string | null
  remindersSent: any
  createdAt: Date | string
  updatedAt: Date | string

  // Relations
  feePlan?: {
    id: string
    courseName: string
    totalFee: number
  }
}

export interface PaymentSummary {
  totalPaid: number
  totalPending: number
  totalOverdue: number
  completedPayments: number
  pendingPayments: number
  overduePayments: number
  nextPaymentDue: PaymentInstallment | null
  recentPayments: (StudentPayment | FeePayment)[]
}

export interface InvoiceData {
  invoiceNumber: string
  invoiceDate: Date | string
  dueDate?: Date | string

  // Student details
  studentName: string
  studentEmail: string
  studentPhone?: string
  studentId: string

  // Course details
  courseName: string
  courseType?: string

  // Payment details
  paymentId: string
  transactionId?: string
  amount: number
  currency: string
  paymentMethod: string
  paymentDate: Date | string

  // Academy details
  academyName: string
  academyAddress: string
  academyPhone: string
  academyEmail: string
  academyGST?: string
  academyLogo?: string

  // Installment info (if applicable)
  installmentNumber?: number
  totalInstallments?: number

  // Additional info
  notes?: string
  termsAndConditions?: string
}

export interface PaymentFilter {
  status?: PaymentStatus | PaymentStatusEnum | 'ALL'
  dateFrom?: Date | string
  dateTo?: Date | string
  searchQuery?: string
  courseId?: string
  paymentMethod?: PaymentMethod | 'ALL'
}

export interface PaymentStats {
  totalAmount: number
  totalPaid: number
  totalPending: number
  averagePayment: number
  paymentCount: number
  lastPaymentDate: Date | string | null
}

export type PaymentType = 'enrollment' | 'fee_plan' | 'all'

export interface PaymentHistoryResponse {
  success: boolean
  data: {
    payments: (StudentPayment | FeePayment)[]
    installments: PaymentInstallment[]
    summary: PaymentSummary
    stats: PaymentStats
  }
  error?: string
}

export interface UpcomingPaymentsResponse {
  success: boolean
  data: {
    upcoming: PaymentInstallment[]
    overdue: PaymentInstallment[]
    nextPayment: PaymentInstallment | null
  }
  error?: string
}

export interface InvoiceResponse {
  success: boolean
  data?: {
    invoiceUrl: string
    invoiceData: InvoiceData
  }
  error?: string
}
