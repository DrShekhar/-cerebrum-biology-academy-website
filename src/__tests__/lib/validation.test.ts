import { z } from 'zod'
import {
  userRegistrationSchema,
  userLoginSchema,
  demoBookingSchema,
  phoneRegex,
  indianPhoneRegex,
} from '../__mocks__/validation.mock'

describe('Validation Schemas', () => {
  describe('Phone Number Validation', () => {
    it('should validate Indian phone numbers correctly', () => {
      const validNumbers = [
        '+91 9876543210',
        '+919876543210',
        '9876543210',
        '8765432109',
        '7654321098',
        '+91-9876543210',
        '+91 98765 43210',
      ]

      validNumbers.forEach((number) => {
        expect(indianPhoneRegex.test(number)).toBe(true)
      })
    })

    it('should reject invalid Indian phone numbers', () => {
      const invalidNumbers = [
        '1234567890', // doesn't start with 7, 8, or 9
        '98765432100', // too long
        '987654321', // too short
        '+1 9876543210', // wrong country code
        'abcdefghij', // non-numeric
        '5876543210', // doesn't start with 7, 8, or 9
      ]

      invalidNumbers.forEach((number) => {
        expect(indianPhoneRegex.test(number)).toBe(false)
      })
    })
  })

  describe('User Registration Schema', () => {
    const validUserData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      password: 'Password123',
      role: 'STUDENT' as const,
    }

    it('should validate correct user registration data', () => {
      const result = userRegistrationSchema.safeParse(validUserData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email formats', () => {
      const invalidData = { ...validUserData, email: 'invalid-email' }
      const result = userRegistrationSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'short', // too short
        'nouppercaseandnumbers', // no uppercase or numbers
        'NOLOWERCASEANDNUMBERS', // no lowercase or numbers
        'NoNumbers', // no numbers
      ]

      weakPasswords.forEach((password) => {
        const invalidData = { ...validUserData, password }
        const result = userRegistrationSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
      })
    })

    it('should clean and validate phone numbers', () => {
      const testData = { ...validUserData, phone: '+91-98765 43210' }
      const result = userRegistrationSchema.safeParse(testData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.phone).toBe('+919876543210')
      }
    })

    it('should reject invalid names', () => {
      const invalidNames = [
        'A', // too short
        'John123', // contains numbers
        'John@Doe', // contains special characters
        'a'.repeat(101), // too long
      ]

      invalidNames.forEach((name) => {
        const invalidData = { ...validUserData, name }
        const result = userRegistrationSchema.safeParse(invalidData)
        expect(result.success).toBe(false)
      })
    })

    it('should validate optional profile data', () => {
      const dataWithProfile = {
        ...validUserData,
        profile: {
          currentClass: 'CLASS_12' as const,
          city: 'Mumbai',
          school: 'ABC School',
          targetScore: 650,
        },
      }

      const result = userRegistrationSchema.safeParse(dataWithProfile)
      expect(result.success).toBe(true)
    })
  })

  describe('User Login Schema', () => {
    it('should validate correct login data', () => {
      const loginData = {
        email: 'user@example.com',
        password: 'password123',
      }

      const result = userLoginSchema.safeParse(loginData)
      expect(result.success).toBe(true)
    })

    it('should reject missing credentials', () => {
      const invalidData = [
        { email: 'user@example.com' }, // missing password
        { password: 'password123' }, // missing email
        {}, // missing both
      ]

      invalidData.forEach((data) => {
        const result = userLoginSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Demo Booking Schema', () => {
    const validBookingData = {
      studentName: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      preferredDate: '2024-12-31',
      preferredTime: '10:00 AM',
      message: 'Looking forward to the demo',
      studentClass: 'CLASS_12' as const,
    }

    it('should validate correct demo booking data', () => {
      const result = demoBookingSchema.safeParse(validBookingData)
      expect(result.success).toBe(true)
    })

    it('should reject past dates', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 1)

      const invalidData = {
        ...validBookingData,
        preferredDate: pastDate.toISOString().split('T')[0],
      }

      const result = demoBookingSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept today and future dates', () => {
      const today = new Date().toISOString().split('T')[0]
      const future = new Date()
      future.setDate(future.getDate() + 7)
      const futureDate = future.toISOString().split('T')[0]

      const todayData = { ...validBookingData, preferredDate: today }
      const futureData = { ...validBookingData, preferredDate: futureDate }

      expect(demoBookingSchema.safeParse(todayData).success).toBe(true)
      expect(demoBookingSchema.safeParse(futureData).success).toBe(true)
    })

    it('should validate time formats', () => {
      const validTimes = ['10:00 AM', '2:30 PM', '14:30', '09:00']
      const invalidTimes = ['25:00', '10:70', 'morning', '10AM', '10:00:00 AM']

      validTimes.forEach((time) => {
        const data = { ...validBookingData, preferredTime: time }
        const result = demoBookingSchema.safeParse(data)
        expect(result.success).toBe(true)
      })

      invalidTimes.forEach((time) => {
        const data = { ...validBookingData, preferredTime: time }
        const result = demoBookingSchema.safeParse(data)
        expect(result.success).toBe(false)
      })
    })

    it('should clean phone numbers', () => {
      const testData = { ...validBookingData, phone: '+91-98765 43210' }
      const result = demoBookingSchema.safeParse(testData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.phone).toBe('+919876543210')
      }
    })

    it('should limit message length', () => {
      const longMessage = 'a'.repeat(1001)
      const validMessage = 'a'.repeat(1000)

      const invalidData = { ...validBookingData, message: longMessage }
      const validData = { ...validBookingData, message: validMessage }

      expect(demoBookingSchema.safeParse(invalidData).success).toBe(false)
      expect(demoBookingSchema.safeParse(validData).success).toBe(true)
    })

    it('should make email optional', () => {
      const dataWithoutEmail: Partial<typeof validBookingData> = { ...validBookingData }
      delete (dataWithoutEmail as any).email

      const result = demoBookingSchema.safeParse(dataWithoutEmail)
      expect(result.success).toBe(true)
    })
  })

  describe('Edge Cases and Security', () => {
    it('should handle XSS attempts in text fields', () => {
      const xssAttempts = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src=x onerror=alert("xss")>',
        '<iframe src="javascript:alert(\'xss\')"></iframe>',
      ]

      xssAttempts.forEach((xss) => {
        const userData = {
          name: xss,
          email: 'user@example.com',
          phone: '+91 9876543210',
          password: 'Password123',
        }

        // The validation should reject names with XSS patterns
        const result = userRegistrationSchema.safeParse(userData)
        expect(result.success).toBe(false)
      })
    })

    it('should handle very long inputs', () => {
      const longString = 'a'.repeat(1000)

      const userData = {
        name: longString,
        email: 'user@example.com',
        phone: '+91 9876543210',
        password: 'Password123',
      }

      const result = userRegistrationSchema.safeParse(userData)
      expect(result.success).toBe(false) // name too long
    })

    it('should handle empty and null values', () => {
      const invalidInputs = [
        null,
        undefined,
        '',
        '   ', // whitespace only
      ]

      invalidInputs.forEach((input) => {
        const userData = {
          name: input,
          email: 'user@example.com',
          phone: '+91 9876543210',
          password: 'Password123',
        }

        const result = userRegistrationSchema.safeParse(userData)
        expect(result.success).toBe(false)
      })
    })
  })
})
