/**
 * Admin Seeding Script
 * Run with: npx tsx scripts/seed-admin.ts
 *
 * This ensures the primary admin account always exists in the database
 * Safe to run multiple times - will update existing records
 */

import { PrismaClient } from '../src/generated/prisma'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

// Primary admin credentials (from environment or defaults)
const ADMIN_CONFIG = {
  phone: process.env.ADMIN_PHONE || '9999744334',
  email: process.env.ADMIN_EMAIL || 'bobbyaiims@gmail.com',
  name: process.env.ADMIN_NAME || 'Dr. Shekhar Singh',
}

async function seedAdmin() {
  console.log('🔐 Seeding admin account...')

  try {
    // Check if admin exists by phone or email
    const existingAdmin = await prisma.users.findFirst({
      where: {
        OR: [{ phone: ADMIN_CONFIG.phone }, { email: ADMIN_CONFIG.email }],
      },
    })

    if (existingAdmin) {
      // Update existing admin to ensure correct role
      const updated = await prisma.users.update({
        where: { id: existingAdmin.id },
        data: {
          role: 'ADMIN',
          phone: ADMIN_CONFIG.phone,
          email: ADMIN_CONFIG.email,
          name: ADMIN_CONFIG.name,
          phoneVerified: new Date(),
          emailVerified: new Date(),
          updatedAt: new Date(),
        },
      })
      console.log(`✅ Admin account updated: ${updated.email} (${updated.phone})`)
      return updated
    }

    // Create new admin account
    const admin = await prisma.users.create({
      data: {
        id: uuidv4(),
        phone: ADMIN_CONFIG.phone,
        email: ADMIN_CONFIG.email,
        name: ADMIN_CONFIG.name,
        role: 'ADMIN',
        phoneVerified: new Date(),
        emailVerified: new Date(),
        profile: {
          createdBy: 'seed-script',
          isRootAdmin: true,
        },
        updatedAt: new Date(),
      },
    })

    console.log(`✅ Admin account created: ${admin.email} (${admin.phone})`)
    return admin
  } catch (error) {
    console.error('❌ Failed to seed admin:', error)
    throw error
  }
}

async function seedTestAccounts() {
  console.log('\n🧪 Seeding test accounts for role testing...')
  console.log('   All accounts use the SAME phone number for real OTP verification\n')

  // All test accounts use the admin phone so you receive real OTPs
  const adminPhone = ADMIN_CONFIG.phone

  const testAccounts = [
    {
      phone: adminPhone,
      email: 'student@cerebrumbiologyacademy.com',
      name: 'Test Student Account',
      role: 'STUDENT',
    },
    {
      phone: adminPhone,
      email: 'teacher@cerebrumbiologyacademy.com',
      name: 'Test Teacher Account',
      role: 'TEACHER',
    },
    {
      phone: adminPhone,
      email: 'counselor@cerebrumbiologyacademy.com',
      name: 'Test Counselor Account',
      role: 'COUNSELOR',
    },
    {
      phone: adminPhone,
      email: 'parent@cerebrumbiologyacademy.com',
      name: 'Test Parent Account',
      role: 'PARENT',
    },
  ]

  for (const account of testAccounts) {
    try {
      // Check by email only (phone will be same for all)
      const existing = await prisma.users.findFirst({
        where: { email: account.email },
      })

      if (existing) {
        await prisma.users.update({
          where: { id: existing.id },
          data: {
            role: account.role,
            phone: account.phone,
            phoneVerified: new Date(),
            emailVerified: new Date(),
            updatedAt: new Date(),
          },
        })
        console.log(`  ✓ Updated: ${account.role} - ${account.email}`)
      } else {
        await prisma.users.create({
          data: {
            id: uuidv4(),
            ...account,
            phoneVerified: new Date(),
            emailVerified: new Date(),
            profile: { isTestAccount: true, linkedToAdmin: true },
            updatedAt: new Date(),
          },
        })
        console.log(`  ✓ Created: ${account.role} - ${account.email}`)
      }
    } catch (error) {
      console.error(`  ✗ Failed: ${account.role}`, error)
    }
  }

  console.log('\n📱 Login Instructions:')
  console.log(`   1. Go to login page`)
  console.log(`   2. Enter your phone: ${adminPhone}`)
  console.log(`   3. Enter the OTP you receive`)
  console.log(`   4. You'll see account selection if multiple accounts exist`)
  console.log(`   OR login with email to select specific role account`)
}

async function main() {
  console.log('================================================')
  console.log('  Cerebrum Biology Academy - Account Seeder')
  console.log('================================================\n')

  try {
    await seedAdmin()

    // Only seed test accounts in development
    if (process.env.NODE_ENV !== 'production') {
      await seedTestAccounts()
    }

    console.log('\n✅ Seeding complete!')
    console.log('\n📋 How to login:')
    console.log(`   Admin: Use OTP with phone ${ADMIN_CONFIG.phone}`)
    if (process.env.NODE_ENV !== 'production') {
      console.log('   Test accounts: Use OTP with phone 9999999901-9999999904')
    }
  } catch (error) {
    console.error('\n❌ Seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
