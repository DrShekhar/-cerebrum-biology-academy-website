// Global type declarations for TypeScript

declare global {
  // Jest test globals
  var prisma: {
    user: {
      create: jest.Mock
      findUnique: jest.Mock
      findMany: jest.Mock
      update: jest.Mock
      delete: jest.Mock
    }
    demoBooking: {
      create: jest.Mock
      findMany: jest.Mock
    }
    enrollment: {
      create: jest.Mock
      findMany: jest.Mock
    }
  }

  var hashPassword: jest.Mock
  var POST: jest.Mock

  // PWA Service Worker types
  interface ServiceWorkerRegistration {
    sync?: {
      register: (tag: string) => Promise<void>
      getTags: () => Promise<string[]>
    }
  }

  // NextAuth v5 Request extension for middleware
  interface NextRequest {
    auth?: {
      user?: {
        id: string
        email: string
        name: string
        role: 'student' | 'parent' | 'teacher' | 'admin'
      }
      expires?: string
    } | null
    ip?: string
  }

  // Notification API extension
  interface NotificationOptions {
    vibrate?: number[]
  }

  // Testing globals
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
    }
  }

  // Razorpay types
  interface RazorpayOptions {
    key: string | undefined
    amount: number
    currency: string
    name: string
    description: string
    image?: string
    order_id: string
    handler: (response: {
      razorpay_payment_id: string
      razorpay_order_id: string
      razorpay_signature: string
    }) => void | Promise<void>
    prefill: {
      name: string
      email: string
      contact: string
    }
    notes?: Record<string, string | number | undefined>
    theme: {
      color: string
    }
    modal?: {
      ondismiss?: () => void
    }
  }

  // Analytics and third-party integrations on Window
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    fbq?: (...args: any[]) => void
    _fbq?: any
    clarity?: (...args: any[]) => void
    _hsq?: any[]
    google_trackConversion?: (config: any) => void
    Razorpay?: new (options: RazorpayOptions) => {
      open(): void
      on(event: string, handler: (response: unknown) => void): void
    }
  }

  // Google Analytics gtag function (for direct gtag() calls, not window.gtag)
  var gtag: ((...args: any[]) => void) | undefined
}

export {}
