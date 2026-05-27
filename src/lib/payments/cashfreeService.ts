import { Cashfree, CFEnvironment } from 'cashfree-pg'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'

const cfEnvironment =
  process.env.NODE_ENV === 'production' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX

const cashfree = new Cashfree(
  cfEnvironment,
  process.env.CASHFREE_APP_ID || '',
  process.env.CASHFREE_SECRET_KEY || ''
)

interface CreateOrderOptions {
  orderId: string
  amount: number
  currency?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  returnUrl?: string
  notifyUrl?: string
  notes?: Record<string, string>
}

interface CashfreeOrder {
  cf_order_id: number
  order_id: string
  order_status: string
  order_amount: number
  order_currency: string
  payment_session_id: string
}

interface CashfreePaymentDetail {
  cf_payment_id: number
  order_id: string
  payment_status: string
  payment_amount: number
  payment_currency: string
  payment_method?: {
    upi?: { channel: string }
    card?: { channel: string }
    netbanking?: { channel: string }
    app?: { channel: string }
    emi?: { channel: string }
    paylater?: { channel: string }
  }
  payment_time?: string
}

export class CashfreeService {
  static async createOrder(options: CreateOrderOptions): Promise<CashfreeOrder> {
    const request = {
      order_id: options.orderId,
      order_amount: options.amount,
      order_currency: options.currency || 'INR',
      customer_details: {
        customer_id: options.customerPhone.replace(/[^0-9]/g, '').slice(-10),
        customer_name: options.customerName,
        customer_email: options.customerEmail,
        customer_phone: options.customerPhone.replace(/[^0-9+]/g, ''),
      },
      order_meta: {
        return_url: options.returnUrl || `${SITE_URL}/payment-status?order_id={order_id}`,
        notify_url: options.notifyUrl || `${SITE_URL}/api/payments/cashfree/webhook`,
      },
      order_note: options.notes?.purpose || 'Course enrollment — Cerebrum Biology Academy',
      order_tags: options.notes || {},
    }

    const response = await cashfree.PGCreateOrder(request)
    return response.data as CashfreeOrder
  }

  static async getOrderStatus(orderId: string): Promise<CashfreeOrder> {
    const response = await cashfree.PGFetchOrder(orderId)
    return response.data as CashfreeOrder
  }

  static async getPaymentsForOrder(orderId: string): Promise<CashfreePaymentDetail[]> {
    const response = await cashfree.PGOrderFetchPayments(orderId)
    return response.data as CashfreePaymentDetail[]
  }

  static verifyWebhookSignature(signature: string, rawBody: string, timestamp: string): boolean {
    try {
      Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp)
      return true
    } catch {
      return false
    }
  }

  static mapPaymentMethod(
    detail: CashfreePaymentDetail
  ): 'CASHFREE_UPI' | 'CASHFREE_CARD' | 'CASHFREE_NETBANKING' | 'CASHFREE_WALLET' | 'CASHFREE_EMI' | 'CASHFREE_PAYLATER' {
    const pm = detail.payment_method
    if (pm?.upi) return 'CASHFREE_UPI'
    if (pm?.card) return 'CASHFREE_CARD'
    if (pm?.netbanking) return 'CASHFREE_NETBANKING'
    if (pm?.emi) return 'CASHFREE_EMI'
    if (pm?.paylater) return 'CASHFREE_PAYLATER'
    return 'CASHFREE_WALLET'
  }

  static async processRefund(orderId: string, amount: number, reason?: string) {
    const refundRequest = {
      refund_amount: amount,
      refund_id: `refund_${orderId}_${Date.now()}`,
      refund_note: reason || 'Refund processed',
    }
    const response = await cashfree.PGOrderCreateRefund(orderId, refundRequest)
    return response.data
  }
}
