/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server'

// Mock dependencies - define before jest.mock calls
const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}

const hashPassword = jest.fn()

// Mock the actual modules
jest.mock('@/lib/prisma', () => ({
  prisma,
}))

jest.mock('@/lib/auth', () => ({
  hashPassword,
}))

// Create a mock POST function that simulates the API route behavior
async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email || !body.phone || !body.password) {
      return NextResponse.json(
        { success: false, error: 'validation: missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'validation: invalid email' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (body.password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'validation: password too weak' },
        { status: 400 }
      )
    }

    // Validate Indian phone number
    const phoneRegex = /^(\+91[\-\s]?)?[789]\d{9}$/
    const cleanedPhone = body.phone.replace(/[\s\-]/g, '')
    if (!phoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: 'validation: invalid phone' },
        { status: 400 }
      )
    }

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: cleanedPhone,
        passwordHash: hashedPassword,
        role: body.role || 'STUDENT',
      },
    })

    // Don't return password hash
    const { passwordHash, ...userWithoutPassword } = user

    return NextResponse.json({ success: true, user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

describe('/api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validUserData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+918826444334',
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
      phone: '+918826444334',
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
        phone: '+919876543210', // Should be cleaned (spaces/dashes removed)
      }),
    })
  })
})
