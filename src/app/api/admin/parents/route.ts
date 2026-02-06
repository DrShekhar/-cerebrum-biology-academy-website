import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const createParentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  childStudentIds: z.array(z.string()).default([]),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createParentSchema.parse(body)

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email: validatedData.email }, { phone: validatedData.phone }],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            existingUser.email === validatedData.email
              ? 'Email already registered'
              : 'Phone number already registered',
        },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(validatedData.password, 12)
    const parentId = uuidv4()

    const result = await prisma.$transaction(async (tx) => {
      const parent = await tx.users.create({
        data: {
          id: parentId,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          role: 'PARENT',
          passwordHash,
          emailVerified: new Date(),
          profile: {
            status: 'active',
            createdBy: session.user.email,
          },
          updatedAt: new Date(),
        },
      })

      const relationships = []
      for (const childId of validatedData.childStudentIds) {
        const child = await tx.users.findFirst({
          where: { id: childId, role: 'STUDENT' },
        })
        if (child) {
          const rel = await tx.parent_child_relationships.create({
            data: {
              id: uuidv4(),
              parentId: parent.id,
              childId: child.id,
              createdAt: new Date(),
            },
          })
          relationships.push(rel)
        }
      }

      await tx.activities.create({
        data: {
          id: uuidv4(),
          userId: parent.id,
          action: 'parent_account_created',
          description: `Parent account "${validatedData.name}" created by admin ${session.user.email}`,
          metadata: {
            linkedChildren: validatedData.childStudentIds,
            relationshipsCreated: relationships.length,
          },
        },
      })

      return { parent, relationships }
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Parent account created successfully',
        data: {
          id: result.parent.id,
          name: result.parent.name,
          email: result.parent.email,
          phone: result.parent.phone,
          linkedChildren: result.relationships.length,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Create parent error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create parent account' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    const where: Record<string, unknown> = { role: 'PARENT' }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ]
    }

    const parents = await prisma.users.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
        parent_child_relationships_parent_child_relationships_parentIdTousers: {
          select: {
            id: true,
            childId: true,
            users_parent_child_relationships_childIdTousers: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const formatted = parents.map((p) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      phone: p.phone || '',
      createdAt: p.createdAt.toISOString(),
      children:
        p.parent_child_relationships_parent_child_relationships_parentIdTousers.map(
          (rel) => ({
            relationshipId: rel.id,
            id: rel.users_parent_child_relationships_childIdTousers.id,
            name: rel.users_parent_child_relationships_childIdTousers.name,
            email: rel.users_parent_child_relationships_childIdTousers.email,
          })
        ),
    }))

    return NextResponse.json({ success: true, data: formatted })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    console.error('Fetch parents error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch parents' },
      { status: 500 }
    )
  }
}
