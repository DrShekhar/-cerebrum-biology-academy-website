/**
 * Script to create a test user for testing onboarding and user flows
 *
 * Usage: npx tsx scripts/create-test-user.ts
 */

import { PrismaClient } from '../src/generated/prisma'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('🔨 Creating test user...\n')

    // Test user credentials
    const email = 'test@cerebrumbiologyacademy.com'
    const password = 'Test@123'
    const name = 'Test Student'

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log('ℹ️  Test user already exists!')
      console.log('📧 Email:', email)
      console.log('🔑 Password:', password)
      console.log('🆔 User ID:', existingUser.id)
      console.log('\n✅ You can use these credentials to login\n')
      return
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create test user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        emailVerified: new Date(),
        role: 'STUDENT',
        profile: null, // Will be set during onboarding
      },
    })

    console.log('✅ Test user created successfully!\n')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('🆔 User ID:', user.id)
    console.log('\n🧪 Test Instructions:')
    console.log('1. Go to: http://localhost:3001/auth/signin')
    console.log('2. Login with the credentials above')
    console.log('3. You will be redirected to onboarding')
    console.log('4. Complete the profile setup')
    console.log('\n')
  } catch (error) {
    console.error('❌ Error creating test user:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
  .then(() => {
    console.log('✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
