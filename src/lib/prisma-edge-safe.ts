/**
 * Edge-Safe Prisma Client Wrapper
 *
 * This wrapper prevents Prisma Client from being loaded in Edge Runtime contexts
 * where Node.js APIs like process.nextTick are not available.
 */

// Mock Prisma client for Edge Runtime fallback
class MockPrismaClient {
  users = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  }
  leads = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
    count: async () => 0,
  }
  fee_plans = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  }
  installments = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  }
  studyMaterial = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
    count: async () => 0,
    aggregate: async () => ({ _count: { id: 0 }, _sum: {}, _avg: {}, _min: {}, _max: {} }),
  }
  $connect = async () => Promise.resolve()
  $disconnect = async () => Promise.resolve()
  $queryRaw = async () => []
  $transaction = async (fn: Function) => fn(this)
}

// Check if we're in Edge Runtime
function isEdgeRuntime(): boolean {
  return (
    typeof (globalThis as any).EdgeRuntime !== 'undefined' ||
    (globalThis as any).EdgeRuntime !== undefined ||
    typeof process?.nextTick !== 'function'
  )
}

// Export mock client for Edge Runtime, real client for Node.js
let prismaClient: any

if (isEdgeRuntime()) {
  console.warn('⚠️ Edge Runtime detected - using mock Prisma client')
  prismaClient = new MockPrismaClient()
} else {
  // Only import real Prisma in Node.js runtime
  try {
    const { prisma: realPrisma } = require('./prisma')
    prismaClient = realPrisma
  } catch (error) {
    console.warn('Failed to load Prisma client, using mock:', error)
    prismaClient = new MockPrismaClient()
  }
}

export const prisma = prismaClient
export default prisma
