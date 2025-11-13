import { PrismaClient } from '@/generated/prisma'

// Global variable to store the Prisma client instance
declare global {
  var __prisma: ReturnType<typeof createPrismaClient> | undefined
}

// Connection configuration optimized for high concurrency
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],

    // Database connection configuration for high performance
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },

    // Error formatting
    errorFormat: 'pretty',
  }).$extends({
    // Add custom methods or middleware here
    result: {
      // Custom result extensions can be added here
    },

    query: {
      // Query middleware for logging, caching, etc.
      $allOperations: async ({ operation, model, args, query }) => {
        const start = Date.now()
        const result = await query(args)
        const end = Date.now()

        // Log slow queries in production
        if (process.env.NODE_ENV === 'production' && end - start > 1000) {
          console.warn(`Slow query detected: ${model}.${operation} took ${end - start}ms`)
        }

        return result
      },
    },
  })
}

// Singleton pattern for Prisma client to handle connection pooling
export const prisma = globalThis.__prisma || createPrismaClient()

// In development, store the client globally to prevent multiple instances
if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma
}

// Connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Graceful shutdown
export async function closeDatabaseConnection(): Promise<void> {
  await prisma.$disconnect()
}

// Database utilities
export const DatabaseUtils = {
  // Execute raw SQL with proper error handling
  async executeRaw(query: string, params: any[] = []): Promise<any> {
    try {
      return await prisma.$queryRawUnsafe(query, ...params)
    } catch (error) {
      console.error('Raw query execution failed:', error)
      throw error
    }
  },

  // Transaction wrapper with retry logic
  async transaction<T>(operations: (tx: any) => Promise<T>, maxRetries: number = 3): Promise<T> {
    let attempt = 0

    while (attempt < maxRetries) {
      try {
        return await prisma.$transaction(operations, {
          maxWait: 5000, // Wait up to 5 seconds for transaction to start
          timeout: 30000, // Transaction timeout of 30 seconds
        })
      } catch (error) {
        attempt++

        if (attempt >= maxRetries) {
          console.error(`Transaction failed after ${maxRetries} attempts:`, error)
          throw error
        }

        // Exponential backoff
        const delay = Math.pow(2, attempt) * 100
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    throw new Error('Transaction failed after all retries')
  },

  // Bulk operations with batching
  async bulkCreate<T>(model: string, data: T[], batchSize: number = 1000): Promise<number> {
    let totalCreated = 0

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      try {
        const result = await (prisma as any)[model].createMany({
          data: batch,
          skipDuplicates: true,
        })

        totalCreated += result.count
      } catch (error) {
        console.error(`Bulk create failed for batch ${i / batchSize + 1}:`, error)
        throw error
      }
    }

    return totalCreated
  },

  // Pagination helper
  getPaginationParams(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit
    return {
      skip,
      take: limit,
    }
  },

  // Search helper with full-text search
  buildSearchQuery(searchTerm: string, fields: string[]): any {
    if (!searchTerm) return {}

    return {
      OR: fields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    }
  },

  // Date range filter helper
  buildDateRangeFilter(field: string, startDate?: Date, endDate?: Date): any {
    const filter: any = {}

    if (startDate || endDate) {
      filter[field] = {}

      if (startDate) {
        filter[field].gte = startDate
      }

      if (endDate) {
        filter[field].lte = endDate
      }
    }

    return filter
  },
}

export default prisma
