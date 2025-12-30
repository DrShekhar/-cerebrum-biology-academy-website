/**
 * Clerk Webhook Handler - Syncs Clerk users to Prisma database
 * Handles user.created, user.updated, user.deleted events
 */

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@/generated/prisma'

// Clerk webhook event types
interface ClerkUserEvent {
  data: {
    id: string
    email_addresses: Array<{
      id: string
      email_address: string
      verification: {
        status: string
      }
    }>
    phone_numbers?: Array<{
      id: string
      phone_number: string
      verification: {
        status: string
      }
    }>
    first_name: string | null
    last_name: string | null
    image_url: string | null
    public_metadata: {
      role?: string
    }
    private_metadata?: Record<string, unknown>
    created_at: number
    updated_at: number
  }
  object: string
  type: string
}

// Map Clerk role to Prisma UserRole
function mapClerkRoleToUserRole(clerkRole?: string): UserRole {
  if (!clerkRole) return UserRole.STUDENT

  const roleMap: Record<string, UserRole> = {
    admin: UserRole.ADMIN,
    teacher: UserRole.TEACHER,
    counselor: UserRole.COUNSELOR,
    parent: UserRole.PARENT,
    student: UserRole.STUDENT,
    ADMIN: UserRole.ADMIN,
    TEACHER: UserRole.TEACHER,
    COUNSELOR: UserRole.COUNSELOR,
    PARENT: UserRole.PARENT,
    STUDENT: UserRole.STUDENT,
  }

  return roleMap[clerkRole] || UserRole.STUDENT
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers')
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: ClerkUserEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkUserEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Process the webhook
  const eventType = evt.type
  console.log(`Clerk webhook received: ${eventType}`)

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt)
        break
      case 'user.updated':
        await handleUserUpdated(evt)
        break
      case 'user.deleted':
        await handleUserDeleted(evt)
        break
      default:
        console.log(`Unhandled Clerk webhook event: ${eventType}`)
    }

    return NextResponse.json({ success: true, event: eventType })
  } catch (error) {
    console.error('Error processing Clerk webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleUserCreated(evt: ClerkUserEvent) {
  const { data } = evt
  const clerkId = data.id

  // Get primary email
  const primaryEmail = data.email_addresses.find((e) => e.verification?.status === 'verified')
  const email = primaryEmail?.email_address || data.email_addresses[0]?.email_address

  if (!email) {
    console.error('User created without email, skipping sync')
    return
  }

  // Get phone if available
  const primaryPhone = data.phone_numbers?.find((p) => p.verification?.status === 'verified')
  const phone = primaryPhone?.phone_number

  // Get name
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || 'User'

  // Get role from public metadata
  const role = mapClerkRoleToUserRole(data.public_metadata?.role)

  // Check if user already exists (by email or phone)
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ email }, ...(phone ? [{ phone }] : [])],
    },
  })

  if (existingUser) {
    // Update existing user with Clerk ID
    await prisma.users.update({
      where: { id: existingUser.id },
      data: {
        email,
        phone: phone || existingUser.phone,
        name: name !== 'User' ? name : existingUser.name,
        role,
        emailVerified: primaryEmail?.verification?.status === 'verified' ? new Date() : null,
        phoneVerified:
          primaryPhone?.verification?.status === 'verified' ? new Date() : existingUser.phoneVerified,
        profile: {
          ...(typeof existingUser.profile === 'object' && existingUser.profile !== null
            ? existingUser.profile
            : {}),
          clerkId,
          avatar: data.image_url,
        },
        updatedAt: new Date(),
      },
    })
    console.log(`Updated existing user ${existingUser.id} with Clerk ID ${clerkId}`)
  } else {
    // Create new user
    const newUser = await prisma.users.create({
      data: {
        id: `usr_${clerkId}`,
        email,
        phone,
        name,
        role,
        emailVerified: primaryEmail?.verification?.status === 'verified' ? new Date() : null,
        phoneVerified: primaryPhone?.verification?.status === 'verified' ? new Date() : null,
        profile: {
          clerkId,
          avatar: data.image_url,
        },
        updatedAt: new Date(),
      },
    })
    console.log(`Created new user ${newUser.id} from Clerk ID ${clerkId}`)
  }
}

async function handleUserUpdated(evt: ClerkUserEvent) {
  const { data } = evt
  const clerkId = data.id

  // Find user by Clerk ID in profile
  const user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          profile: {
            path: ['clerkId'],
            equals: clerkId,
          },
        },
        {
          email: data.email_addresses[0]?.email_address,
        },
      ],
    },
  })

  if (!user) {
    // User doesn't exist, create them
    console.log(`User not found for Clerk ID ${clerkId}, creating new user`)
    await handleUserCreated(evt)
    return
  }

  // Get updated data
  const primaryEmail = data.email_addresses.find((e) => e.verification?.status === 'verified')
  const email = primaryEmail?.email_address || data.email_addresses[0]?.email_address

  const primaryPhone = data.phone_numbers?.find((p) => p.verification?.status === 'verified')
  const phone = primaryPhone?.phone_number

  const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || user.name

  const role = mapClerkRoleToUserRole(data.public_metadata?.role)

  // Update user
  await prisma.users.update({
    where: { id: user.id },
    data: {
      email: email || user.email,
      phone: phone || user.phone,
      name,
      role,
      emailVerified: primaryEmail?.verification?.status === 'verified' ? new Date() : user.emailVerified,
      phoneVerified:
        primaryPhone?.verification?.status === 'verified' ? new Date() : user.phoneVerified,
      profile: {
        ...(typeof user.profile === 'object' && user.profile !== null ? user.profile : {}),
        clerkId,
        avatar: data.image_url,
      },
      updatedAt: new Date(),
    },
  })

  console.log(`Updated user ${user.id} from Clerk ID ${clerkId}`)
}

async function handleUserDeleted(evt: ClerkUserEvent) {
  const { data } = evt
  const clerkId = data.id

  // Find user by Clerk ID
  const user = await prisma.users.findFirst({
    where: {
      profile: {
        path: ['clerkId'],
        equals: clerkId,
      },
    },
  })

  if (!user) {
    console.log(`User not found for Clerk ID ${clerkId}, nothing to delete`)
    return
  }

  // Soft delete - update profile to mark as deleted from Clerk
  await prisma.users.update({
    where: { id: user.id },
    data: {
      profile: {
        ...(typeof user.profile === 'object' && user.profile !== null ? user.profile : {}),
        clerkId: null,
        deletedFromClerk: true,
        deletedAt: new Date().toISOString(),
      },
      updatedAt: new Date(),
    },
  })

  console.log(`Soft deleted user ${user.id} (Clerk ID ${clerkId} was deleted)`)
}
