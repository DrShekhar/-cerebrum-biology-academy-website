import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function main() {
  console.log('='.repeat(60))
  console.log('🎓 Cerebrum Biology Academy - Create Counselor Account')
  console.log('='.repeat(60))
  console.log()

  // Gather counselor details
  const name = await question('Enter counselor full name: ')
  const email = await question('Enter counselor email: ')
  const phone = await question('Enter counselor phone (with country code, e.g., +918826444334): ')
  const password = await question('Enter password (will be securely hashed): ')

  console.log()
  console.log('Creating counselor account...')

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 12)

  try {
    // Create the counselor user directly in database
    // Using raw SQL to bypass RLS
    await prisma.$executeRaw`
      INSERT INTO "User" (
        id, email, name, phone, role, "passwordHash", "emailVerified", "createdAt", "updatedAt"
      ) VALUES (
        gen_random_uuid()::text,
        ${email},
        ${name},
        ${phone},
        'COUNSELOR'::text,
        ${passwordHash},
        NOW(),
        NOW(),
        NOW()
      )
      ON CONFLICT (email) DO UPDATE
      SET
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        "passwordHash" = EXCLUDED."passwordHash",
        "updatedAt" = NOW()
    `

    console.log()
    console.log('✅ Counselor account created successfully!')
    console.log()
    console.log('📋 Login Credentials:')
    console.log('   Email:', email)
    console.log('   Password:', password)
    console.log()
    console.log('🔗 Next steps:')
    console.log('   1. Start your dev server: npm run dev')
    console.log('   2. Go to: http://localhost:3001/api/auth/signin')
    console.log('   3. Login with the credentials above')
    console.log('   4. Navigate to: http://localhost:3001/counselor/leads')
    console.log()
  } catch (error) {
    console.error('❌ Error creating counselor:', error)
    console.log()
    console.log('💡 If you see RLS errors, you can run this SQL directly in Supabase:')
    console.log()
    console.log(`INSERT INTO "User" (
  id, email, name, phone, role, "passwordHash", "emailVerified", "createdAt", "updatedAt"
) VALUES (
  gen_random_uuid()::text,
  '${email}',
  '${name}',
  '${phone}',
  'COUNSELOR',
  '${passwordHash}',
  NOW(),
  NOW(),
  NOW()
);`)
    console.log()
  }

  rl.close()
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
