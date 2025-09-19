import { PrismaClient } from '../generated/prisma'

// Global variable to store Prisma client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with connection pooling and optimizations
// Use a lazy initialization approach to avoid initialization errors during middleware execution
function createPrismaClient() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'], // Reduced logging
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })
  } catch (error) {
    console.warn('Failed to initialize Prisma client:', error)
    return null
  }
}

// Lazy initialization of Prisma client with error handling
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
