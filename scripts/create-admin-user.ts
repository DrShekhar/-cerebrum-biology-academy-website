import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating admin user...')

  const email = 'admin@cerebrumbiologyacademy.com'
  const password = 'admin123'
  const passwordHash = await bcrypt.hash(password, 12)

  try {
    // Try to create or update admin user
    const admin = await prisma.users.upsert({
      where: { email },
      update: {
        passwordHash,
        role: 'ADMIN',
        name: 'Admin User',
        emailVerified: new Date(),
        updatedAt: new Date(),
      },
      create: {
        id: 'admin-' + Date.now(),
        email,
        name: 'Admin User',
        passwordHash,
        role: 'ADMIN',
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log('✅ Admin user created/updated successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('User ID:', admin.id)
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

main().finally(() => prisma.$disconnect())
