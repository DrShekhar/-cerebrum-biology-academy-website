/**
 * Reset an admin/staff password.
 *
 * Run:  npx tsx scripts/reset-admin-password.ts <email> <newPassword>
 * e.g.  npx tsx scripts/reset-admin-password.ts admin@cerebrumbiologyacademy.com 'MyNewPass#2026'
 *
 * Uses the SAME hashing as the app login (bcryptjs, 12 salt rounds — matches
 * PasswordUtils.hash in src/lib/auth/config.ts), so the new password works at
 * /sign-in immediately. Also ensures the email is marked verified (production
 * login requires it). Reads DATABASE_URL from your environment / .env.local.
 */

import { config } from 'dotenv'
// Load DB credentials (.env.local first, then .env) for this standalone script.
config({ path: '.env.local' })
config({ path: '.env' })

import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const newPassword = process.argv[3]

  if (!email || !newPassword) {
    console.error('Usage: npx tsx scripts/reset-admin-password.ts <email> <newPassword>')
    process.exit(1)
  }
  if (newPassword.length < 8) {
    console.error('Password must be at least 8 characters.')
    process.exit(1)
  }

  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true, email: true, role: true },
  })
  if (!user) {
    console.error(`No user found with email: ${email}`)
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(newPassword, 12)

  await prisma.users.update({
    where: { email },
    data: {
      passwordHash,
      emailVerified: new Date(), // ensure prod email/password login is allowed
      updatedAt: new Date(),
    },
  })

  console.log(`✅ Password reset for ${user.email} (role: ${user.role}).`)
  console.log('   You can now sign in at /sign-in with this email + the new password.')
}

main()
  .catch((e) => {
    console.error('Reset failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
