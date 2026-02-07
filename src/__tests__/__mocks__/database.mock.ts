// Mock Prisma client for testing
export const prisma = {
  users: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  demo_bookings: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  courses: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  enrollments: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  payments: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}
