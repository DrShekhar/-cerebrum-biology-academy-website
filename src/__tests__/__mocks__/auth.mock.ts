import bcrypt from 'bcryptjs'

// Mock authentication functions for testing
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length === 0) {
    throw new Error('Password cannot be empty')
  }

  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function checkRateLimit(identifier: string, limit = 5): boolean {
  // Simple mock rate limiting for tests
  if (!global.rateLimitStore) {
    global.rateLimitStore = new Map()
  }

  const store = global.rateLimitStore as Map<string, number>
  const current = store.get(identifier) || 0

  if (current >= limit) {
    return false
  }

  store.set(identifier, current + 1)
  return true
}
