interface RazorpayPayment {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

interface EnrollmentData {
  studentName: string
  email: string
  phone: string
  courseId: string
  courseName: string
  amount: number
  installmentPlan?: 'full' | 'quarterly' | 'monthly'
}

export class RazorpayService {
  private keyId: string
  private keySecret: string

  constructor() {
    this.keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!
    this.keySecret = process.env.RAZORPAY_KEY_SECRET!
  }

  async createOrder(enrollmentData: EnrollmentData): Promise<any> {
    const { amount, studentName, email, courseId } = enrollmentData

    const orderData: RazorpayPayment = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        studentName,
        email,
        courseId,
        timestamp: new Date().toISOString(),
      },
    }

    try {
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      return await response.json()
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<boolean> {
    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_id: paymentId,
          signature,
        }),
      })

      const result = await response.json()
      return result.verified
    } catch (error) {
      console.error('Error verifying payment:', error)
      return false
    }
  }

  generateInstallmentPlan(totalAmount: number, plan: 'quarterly' | 'monthly') {
    const installments = plan === 'quarterly' ? 4 : 12
    const installmentAmount = Math.ceil(totalAmount / installments)

    return Array.from({ length: installments }, (_, index) => ({
      installmentNumber: index + 1,
      amount: installmentAmount,
      dueDate: new Date(
        Date.now() + (index + 1) * (plan === 'quarterly' ? 90 : 30) * 24 * 60 * 60 * 1000
      ),
      status: index === 0 ? 'due' : 'pending',
    }))
  }

  async processEnrollment(enrollmentData: EnrollmentData) {
    try {
      // Create Razorpay order
      const order = await this.createOrder(enrollmentData)

      // Store enrollment data in database (implement with your DB)
      await this.saveEnrollmentData({
        ...enrollmentData,
        orderId: order.id,
        status: 'pending_payment',
        createdAt: new Date(),
      })

      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      }
    } catch (error) {
      console.error('Error processing enrollment:', error)
      return {
        success: false,
        error: 'Failed to process enrollment',
      }
    }
  }

  private async saveEnrollmentData(data: any) {
    // This would integrate with your database
    // For MVP, we can use a simple file-based storage or local database
    console.log('Saving enrollment data:', data)
  }
}

export const razorpayService = new RazorpayService()
