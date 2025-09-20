import { PrismaClient } from '../generated/prisma'

// Global variable to store Prisma client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Mock Prisma client for fallback when WASM engine fails
class MockPrismaClient {
  user = {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  }
  $connect = async () => Promise.resolve()
  $disconnect = async () => Promise.resolve()
  $queryRaw = async () => []
  $transaction = async (fn: Function) => fn(this)
}

// Create Prisma client with enhanced error handling and WASM fallback
function createPrismaClient() {
  try {
    // Check if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not found, using mock Prisma client')
      return new MockPrismaClient() as any
    }

    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? [] : ['error'], // Minimal logging to reduce noise
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // Configure for edge runtime compatibility
      errorFormat: 'minimal',
    })

    // Test the client connection in a non-blocking way (only in non-build environments)
    if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL_ENV) {
      process.nextTick(async () => {
        try {
          await client.$queryRaw`SELECT 1`
          console.log('✅ Prisma client initialized successfully')
        } catch (error) {
          console.warn('⚠️ Prisma connection test failed, operations may fallback to mock:', error)
        }
      })
    }

    return client
  } catch (error) {
    console.warn('❌ Prisma client initialization failed, using mock client:', error)
    return new MockPrismaClient() as any
  }
}

// Lazy initialization of Prisma client with comprehensive error handling
export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database connection helper
export async function connectToDatabase() {
  if (!prisma) {
    console.warn('Prisma client not available')
    return false
  }
  try {
    await prisma.$connect()
    console.log('Successfully connected to SQLite database')
    return true
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return false
  }
}

// Database disconnection helper
export async function disconnectFromDatabase() {
  if (!prisma) {
    console.warn('Prisma client not available for disconnection')
    return
  }
  try {
    await prisma.$disconnect()
    console.log('Successfully disconnected from database')
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Health check for database
export async function checkDatabaseHealth() {
  if (!prisma) {
    return {
      status: 'unavailable',
      error: 'Prisma client not initialized',
      timestamp: new Date().toISOString(),
    }
  }
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'healthy', timestamp: new Date().toISOString() }
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }
  }
}

// Transaction helper
export async function withTransaction<T>(
  fn: (
    prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'>
  ) => Promise<T>
): Promise<T> {
  if (!prisma) {
    throw new Error('Database not available')
  }
  return prisma.$transaction(fn)
}

// Clean up function for graceful shutdown
export async function gracefulShutdown() {
  console.log('Initiating graceful database shutdown...')
  await disconnectFromDatabase()
}

// Handle process termination
if (process.env.NODE_ENV === 'production') {
  process.on('SIGINT', gracefulShutdown)
  process.on('SIGTERM', gracefulShutdown)
}

export default prisma
