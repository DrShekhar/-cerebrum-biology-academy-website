// Mock Prisma client for testing
export const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  demoBooking: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  course: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
  enrollment: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  payment: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}
