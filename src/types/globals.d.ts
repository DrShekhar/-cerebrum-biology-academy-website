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
}

export {}
