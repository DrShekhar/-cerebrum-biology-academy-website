/**
 * Razorpay Payment Service
 * Handles payment processing, orders, and verification for the Indian market
 */

import crypto from 'crypto'

interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
  created_at: number
}

interface RazorpayPayment {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

interface CreateOrderOptions {
  amount: number
  currency?: string
  receipt?: string
  notes?: Record<string, string>
  partial_payment?: boolean
}

interface SubscriptionOptions {
  plan_id: string
  customer_id: string
  total_count?: number
  start_at?: number
  notes?: Record<string, string>
}

export class RazorpayService {
  private static keyId = process.env.RAZORPAY_KEY_ID
  private static keySecret = process.env.RAZORPAY_KEY_SECRET
  private static webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET

  /**
   * Create a Razorpay order for one-time payments
   */
  static async createOrder(options: CreateOrderOptions): Promise<RazorpayOrder> {
    try {
      const orderData = {
        amount: options.amount * 100, // Convert to paise
        currency: options.currency || 'INR',
        receipt: options.receipt || `receipt_${Date.now()}`,
        notes: {
          purpose: 'Course enrollment',
          platform: 'Cerebrum Biology Academy',
          ...options.notes,
        },
        partial_payment: options.partial_payment || false,
      }

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Order Creation Error: ${order.error?.description || 'Unknown error'}`
        )
      }

      return order
    } catch (error) {
      console.error('Error creating Razorpay order:', error)
      throw error
    }
  }

  /**
   * Verify payment signature for security
   */
  static verifyPaymentSignature(payment: RazorpayPayment): boolean {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment

      const body = razorpay_order_id + '|' + razorpay_payment_id
      const expectedSignature = crypto
        .createHmac('sha256', this.keySecret!)
        .update(body.toString())
        .digest('hex')

      return expectedSignature === razorpay_signature
    } catch (error) {
      console.error('Error verifying payment signature:', error)
      return false
    }
  }

  /**
   * Fetch payment details
   */
  static async getPaymentDetails(paymentId: string) {
    try {
      const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
        },
      })

      const payment = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Payment Fetch Error: ${payment.error?.description || 'Unknown error'}`
        )
      }

      return payment
    } catch (error) {
      console.error('Error fetching payment details:', error)
      throw error
    }
  }

  /**
   * Fetch order details
   */
  static async getOrderDetails(orderId: string) {
    try {
      const response = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
        },
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Order Fetch Error: ${order.error?.description || 'Unknown error'}`
        )
      }

      return order
    } catch (error) {
      console.error('Error fetching order details:', error)
      throw error
    }
  }

  /**
   * Create customer for recurring payments
   */
  static async createCustomer(customerData: {
    name: string
    email: string
    contact: string
    notes?: Record<string, string>
  }) {
    try {
      const response = await fetch('https://api.razorpay.com/v1/customers', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: customerData.name,
          email: customerData.email,
          contact: customerData.contact,
          notes: customerData.notes || {},
        }),
      })

      const customer = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Customer Creation Error: ${customer.error?.description || 'Unknown error'}`
        )
      }

      return customer
    } catch (error) {
      console.error('Error creating customer:', error)
      throw error
    }
  }

  /**
   * Create subscription plan
   */
  static async createPlan(planData: {
    period: 'weekly' | 'monthly' | 'quarterly' | 'yearly'
    interval: number
    item: {
      name: string
      amount: number
      currency?: string
      description?: string
    }
    notes?: Record<string, string>
  }) {
    try {
      const response = await fetch('https://api.razorpay.com/v1/plans', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          period: planData.period,
          interval: planData.interval,
          item: {
            name: planData.item.name,
            amount: planData.item.amount * 100, // Convert to paise
            currency: planData.item.currency || 'INR',
            description: planData.item.description || '',
          },
          notes: planData.notes || {},
        }),
      })

      const plan = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Plan Creation Error: ${plan.error?.description || 'Unknown error'}`
        )
      }

      return plan
    } catch (error) {
      console.error('Error creating plan:', error)
      throw error
    }
  }

  /**
   * Create subscription
   */
  static async createSubscription(options: SubscriptionOptions) {
    try {
      const subscriptionData = {
        plan_id: options.plan_id,
        customer_id: options.customer_id,
        total_count: options.total_count || 12, // Default to 12 months
        start_at: options.start_at,
        notes: options.notes || {},
        notify: 1, // Send notifications
      }

      const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      })

      const subscription = await response.json()

      if (!response.ok) {
        throw new Error(
          `Razorpay Subscription Creation Error: ${subscription.error?.description || 'Unknown error'}`
        )
      }

      return subscription
    } catch (error) {
      console.error('Error creating subscription:', error)
      throw error
    }
  }

  /**
   * Process refund
   */
  static async processRefund(paymentId: string, amount?: number, notes?: Record<string, string>) {
    try {
      const refundData: any = {
        notes: notes || { reason: 'Customer request' },
      }

      if (amount) {
        refundData.amount = amount * 100 // Convert to paise
      }

      const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refundData),
      })

      const refund = await response.json()

      if (!response.ok) {
        throw new Error(`Razorpay Refund Error: ${refund.error?.description || 'Unknown error'}`)
      }

      return refund
    } catch (error) {
      console.error('Error processing refund:', error)
      throw error
    }
  }

  /**
   * Verify webhook signature
   */
  static verifyWebhookSignature(payload: string, signature: string): boolean {
    try {
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret!)
        .update(payload)
        .digest('hex')

      return expectedSignature === signature
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      return false
    }
  }

  /**
   * Education-specific payment methods
   */

  // Create order for course enrollment
  static async createCourseEnrollmentOrder(courseData: {
    studentId: string
    courseId: string
    courseName: string
    amount: number
    studentEmail: string
    studentPhone: string
  }) {
    return this.createOrder({
      amount: courseData.amount,
      receipt: `course_${courseData.courseId}_${courseData.studentId}_${Date.now()}`,
      notes: {
        student_id: courseData.studentId,
        course_id: courseData.courseId,
        course_name: courseData.courseName,
        student_email: courseData.studentEmail,
        student_phone: courseData.studentPhone,
        payment_type: 'course_enrollment',
      },
    })
  }

  // Create order for fee payment
  static async createFeePaymentOrder(feeData: {
    studentId: string
    feeType: 'tuition' | 'exam' | 'material' | 'late_fee'
    amount: number
    dueDate: string
    description: string
  }) {
    return this.createOrder({
      amount: feeData.amount,
      receipt: `fee_${feeData.feeType}_${feeData.studentId}_${Date.now()}`,
      notes: {
        student_id: feeData.studentId,
        fee_type: feeData.feeType,
        due_date: feeData.dueDate,
        description: feeData.description,
        payment_type: 'fee_payment',
      },
    })
  }

  // Create monthly subscription for ongoing courses
  static async createMonthlySubscription(subscriptionData: {
    studentId: string
    courseId: string
    planId: string
    monthlyAmount: number
    duration: number // in months
  }) {
    // First create customer
    const customer = await this.createCustomer({
      name: `Student_${subscriptionData.studentId}`,
      email: `student${subscriptionData.studentId}@cerebrumbiologyacademy.com`,
      contact: '9999999999', // This should come from student data
      notes: {
        student_id: subscriptionData.studentId,
        course_id: subscriptionData.courseId,
      },
    })

    // Create subscription
    return this.createSubscription({
      plan_id: subscriptionData.planId,
      customer_id: customer.id,
      total_count: subscriptionData.duration,
      notes: {
        student_id: subscriptionData.studentId,
        course_id: subscriptionData.courseId,
        subscription_type: 'monthly_course_fee',
      },
    })
  }

  // Handle payment success workflow
  static async handlePaymentSuccess(payment: RazorpayPayment) {
    try {
      // Verify signature first
      if (!this.verifyPaymentSignature(payment)) {
        throw new Error('Invalid payment signature')
      }

      // Get payment details
      const paymentDetails = await this.getPaymentDetails(payment.razorpay_payment_id)
      const orderDetails = await this.getOrderDetails(payment.razorpay_order_id)

      // Extract student and course information from notes
      const { student_id, course_id, payment_type } = orderDetails.notes

      // Process based on payment type
      switch (payment_type) {
        case 'course_enrollment':
          await this.processCourseEnrollment(student_id, course_id, paymentDetails)
          break
        case 'fee_payment':
          await this.processFeePayment(student_id, paymentDetails)
          break
        default:
          console.log('Unknown payment type:', payment_type)
      }

      return {
        success: true,
        paymentDetails,
        orderDetails,
      }
    } catch (error) {
      console.error('Error handling payment success:', error)
      throw error
    }
  }

  private static async processCourseEnrollment(
    studentId: string,
    courseId: string,
    paymentDetails: any
  ) {
    // TODO: Implement course enrollment logic
    // - Add student to course
    // - Send welcome email/WhatsApp
    // - Grant access to course materials
    // - Update enrollment status in database
    console.log('Processing course enrollment:', { studentId, courseId, paymentDetails })
  }

  private static async processFeePayment(studentId: string, paymentDetails: any) {
    // TODO: Implement fee payment processing
    // - Update fee payment status
    // - Send payment confirmation
    // - Update student account
    console.log('Processing fee payment:', { studentId, paymentDetails })
  }

  /**
   * Generate payment link for sharing via WhatsApp/Email
   */
  static generatePaymentLink(orderId: string, amount: number, description: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'
    return `${baseUrl}/payment?order_id=${orderId}&amount=${amount}&description=${encodeURIComponent(description)}`
  }

  /**
   * Calculate installment schedule
   */
  static calculateInstallments(totalAmount: number, numberOfInstallments: number, startDate: Date) {
    const installmentAmount = Math.ceil(totalAmount / numberOfInstallments)
    const schedule = []

    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(startDate)
      dueDate.setMonth(dueDate.getMonth() + i)

      schedule.push({
        installmentNumber: i + 1,
        amount:
          i === numberOfInstallments - 1
            ? totalAmount - installmentAmount * (numberOfInstallments - 1) // Adjust last installment for rounding
            : installmentAmount,
        dueDate: dueDate.toISOString().split('T')[0],
        status: 'pending',
      })
    }

    return schedule
  }
}

export type { RazorpayOrder, RazorpayPayment, CreateOrderOptions, SubscriptionOptions }
