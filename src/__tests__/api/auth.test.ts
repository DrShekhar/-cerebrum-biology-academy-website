/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server'

// Mock dependencies
const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}

const mockHashPassword = jest.fn()

// Mock the actual modules
jest.mock('@/lib/database', () => ({
  prisma: mockPrisma,
}))

jest.mock('@/lib/auth', () => ({
  hashPassword: mockHashPassword,
}))

// Mock the API route
const mockPOST = jest.fn()
jest.mock('@/app/api/auth/register/route', () => ({
  POST: mockPOST,
}))

describe('/api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210',
    password: 'Password123',
    role: 'STUDENT',
  }

  it('should register a new user successfully', async () => {
    const hashedPassword = '$2a$12$hashedpassword'
    const mockUser = {
      id: 'user-123',
      ...validUserData,
      passwordHash: hashedPassword,
    }

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(hashPassword as jest.Mock).mockResolvedValue(hashedPassword)
    ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUserData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('john@example.com')
    expect(data.user.passwordHash).toBeUndefined() // Should not return password hash
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        email: 'john@example.com',
        passwordHash: hashedPassword,
        role: 'STUDENT',
      }),
    })
  })

  it('should prevent duplicate email registration', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'existing-user',
      email: 'john@example.com',
    })

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUserData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toBe('User already exists')
    expect(prisma.user.create).not.toHaveBeenCalled()
  })

  it('should validate required fields', async () => {
    const incompleteData = { name: 'John Doe', email: 'john@example.com' }

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompleteData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('validation')
  })

  it('should validate email format', async () => {
    const invalidData = { ...validUserData, email: 'invalid-email' }

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('validation')
  })

  it('should validate password strength', async () => {
    const invalidData = { ...validUserData, password: 'weak' }

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('validation')
  })

  it('should validate phone number format', async () => {
    const invalidData = { ...validUserData, phone: '1234567890' }

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('validation')
  })

  it('should handle database errors gracefully', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(hashPassword as jest.Mock).mockResolvedValue('hashedpassword')
    ;(prisma.user.create as jest.Mock).mockRejectedValue(new Error('Database connection failed'))

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validUserData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })

  it('should clean and format phone numbers', async () => {
    const dataWithFormattedPhone = {
      ...validUserData,
      phone: '+91-98765 43210',
    }

    const hashedPassword = '$2a$12$hashedpassword'
    const mockUser = {
      id: 'user-123',
      ...dataWithFormattedPhone,
      phone: '+919876543210',
      passwordHash: hashedPassword,
    }

    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
    ;(hashPassword as jest.Mock).mockResolvedValue(hashedPassword)
    ;(prisma.user.create as jest.Mock).mockResolvedValue(mockUser)

    const request = new NextRequest('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataWithFormattedPhone),
    })

    const response = await POST(request)

    expect(response.status).toBe(201)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        phone: '+919876543210', // Should be cleaned
      }),
    })
  })
})
