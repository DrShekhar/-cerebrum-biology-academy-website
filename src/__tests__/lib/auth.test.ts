/**
 * @jest-environment node
 */

import { hashPassword, verifyPassword, checkRateLimit } from '../__mocks__/auth.mock'
import bcrypt from 'bcryptjs'

describe('Authentication Library', () => {
  describe('Password Hashing', () => {
    it('should hash passwords correctly', async () => {
      const password = 'testPassword123'
      const hash = await hashPassword(password)

      expect(hash).toBeDefined()
      expect(hash).not.toBe(password)
      expect(hash.length).toBeGreaterThan(50)
      expect(hash.startsWith('$2a$12$')).toBe(true)
    })

    it('should verify passwords correctly', async () => {
      const password = 'testPassword123'
      const hash = await hashPassword(password)

      const isValid = await verifyPassword(password, hash)
      expect(isValid).toBe(true)
    })

    it('should reject incorrect passwords', async () => {
      const password = 'testPassword123'
      const wrongPassword = 'wrongPassword'
      const hash = await hashPassword(password)

      const isValid = await verifyPassword(wrongPassword, hash)
      expect(isValid).toBe(false)
    })

    it('should produce different hashes for same password', async () => {
      const password = 'testPassword123'
      const hash1 = await hashPassword(password)
      const hash2 = await hashPassword(password)

      expect(hash1).not.toBe(hash2)
      expect(await verifyPassword(password, hash1)).toBe(true)
      expect(await verifyPassword(password, hash2)).toBe(true)
    })
  })

  describe('Rate Limiting', () => {
    beforeEach(() => {
      // Clear rate limit store before each test
      jest.clearAllMocks()
    })

    it('should allow requests within rate limit', () => {
      const identifier = 'test-user-1'

      const result1 = checkRateLimit(identifier)
      expect(result1).toBe(true)

      const result2 = checkRateLimit(identifier)
      expect(result2).toBe(true)
    })

    it('should block requests after rate limit exceeded', () => {
      const identifier = 'test-user-2'

      // Use the function 5 times (should be allowed)
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(identifier)).toBe(true)
      }

      // 6th attempt should be blocked
      expect(checkRateLimit(identifier)).toBe(false)
    })

    it('should use different counters for different identifiers', () => {
      const identifier1 = 'test-user-3'
      const identifier2 = 'test-user-4'

      // Use identifier1 5 times
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(identifier1)).toBe(true)
      }

      // identifier1 should be blocked
      expect(checkRateLimit(identifier1)).toBe(false)

      // identifier2 should still be allowed
      expect(checkRateLimit(identifier2)).toBe(true)
    })
  })

  describe('bcrypt compatibility', () => {
    it('should be compatible with bcrypt.compare', async () => {
      const password = 'testPassword123'
      const hash = await hashPassword(password)

      // Should work with bcrypt.compare directly
      const isValid = await bcrypt.compare(password, hash)
      expect(isValid).toBe(true)
    })

    it('should work with externally hashed passwords', async () => {
      const password = 'testPassword123'
      const externalHash = await bcrypt.hash(password, 12)

      const isValid = await verifyPassword(password, externalHash)
      expect(isValid).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty passwords', async () => {
      await expect(hashPassword('')).rejects.toThrow()
    })

    it('should handle very long passwords', async () => {
      const longPassword = 'a'.repeat(1000)
      const hash = await hashPassword(longPassword)

      expect(hash).toBeDefined()
      expect(await verifyPassword(longPassword, hash)).toBe(true)
    })

    it('should handle special characters in passwords', async () => {
      const specialPassword = '!@#$%^&*()_+-=[]{}|;\':",./<>?`~'
      const hash = await hashPassword(specialPassword)

      expect(await verifyPassword(specialPassword, hash)).toBe(true)
    })

    it('should handle unicode characters', async () => {
      const unicodePassword = '密码测试🔒🔑'
      const hash = await hashPassword(unicodePassword)

      expect(await verifyPassword(unicodePassword, hash)).toBe(true)
    })
  })
})
