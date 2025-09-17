import { PrismaClient } from '../generated/prisma'

// Global variable to store Prisma client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with connection pooling and optimizations
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database connection helper
export async function connectToDatabase() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to PostgreSQL database')
    return true
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return false
  }
}

// Database disconnection helper
export async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect()
    console.log('Successfully disconnected from database')
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Health check for database
export async function checkDatabaseHealth() {
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
export async function withTransaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
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
