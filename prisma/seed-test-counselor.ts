import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed for test counselor...')

  // Create test counselor user
  const passwordHash = await bcrypt.hash('test123', 10)

  const counselor = await prisma.user.upsert({
    where: { email: 'counselor@test.com' },
    update: {},
    create: {
      email: 'counselor@test.com',
      name: 'Test Counselor',
      phone: '+919876543210',
      role: 'COUNSELOR',
      passwordHash: passwordHash,
      emailVerified: new Date(),
    },
  })

  console.log('✅ Created test counselor:', counselor.email)

  // Create test leads across different stages
  const leadData = [
    {
      studentName: 'Rahul Sharma',
      email: 'rahul.sharma@gmail.com',
      phone: '+919876543211',
      parentName: 'Mr. Sharma',
      parentPhone: '+919876543212',
      grade: 'CLASS_11',
      school: 'Delhi Public School',
      city: 'Delhi',
      address: 'Sector 15, Rohini, Delhi',
      interestedCourse: 'NEET Foundation Class 11',
      stage: 'NEW_LEAD',
      priority: 'HOT',
      source: 'WEBSITE',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    },
    {
      studentName: 'Priya Patel',
      email: 'priya.patel@gmail.com',
      phone: '+919876543213',
      parentName: 'Mrs. Patel',
      parentPhone: '+919876543214',
      grade: 'CLASS_12',
      school: 'Ryan International School',
      city: 'Mumbai',
      address: 'Andheri West, Mumbai',
      interestedCourse: 'NEET Intensive Class 12',
      stage: 'CONTACTED',
      priority: 'WARM',
      source: 'REFERRAL',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Amit Kumar',
      email: 'amit.kumar@gmail.com',
      phone: '+919876543215',
      parentName: 'Mr. Kumar',
      parentPhone: '+919876543216',
      grade: 'CLASS_11',
      school: 'DAV Public School',
      city: 'Bangalore',
      address: 'Koramangala, Bangalore',
      interestedCourse: 'NEET Foundation Class 11',
      stage: 'DEMO_SCHEDULED',
      priority: 'HOT',
      source: 'SOCIAL_MEDIA',
      followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Sneha Reddy',
      email: 'sneha.reddy@gmail.com',
      phone: '+919876543217',
      parentName: 'Mrs. Reddy',
      parentPhone: '+919876543218',
      grade: 'CLASS_12',
      school: 'Narayana Junior College',
      city: 'Hyderabad',
      address: 'Madhapur, Hyderabad',
      interestedCourse: 'NEET Intensive Class 12',
      stage: 'DEMO_COMPLETED',
      priority: 'HOT',
      source: 'WALK_IN',
    },
    {
      studentName: 'Arjun Singh',
      email: 'arjun.singh@gmail.com',
      phone: '+919876543219',
      parentName: 'Mr. Singh',
      parentPhone: '+919876543220',
      grade: 'CLASS_11',
      school: 'St. Xaviers School',
      city: 'Kolkata',
      address: 'Park Street, Kolkata',
      interestedCourse: 'NEET Foundation Class 11',
      stage: 'OFFER_SENT',
      priority: 'WARM',
      source: 'PHONE_CALL',
    },
    {
      studentName: 'Neha Gupta',
      email: 'neha.gupta@gmail.com',
      phone: '+919876543221',
      parentName: 'Mrs. Gupta',
      parentPhone: '+919876543222',
      grade: 'CLASS_12',
      school: 'Modern School',
      city: 'Chennai',
      address: 'T Nagar, Chennai',
      interestedCourse: 'NEET Intensive Class 12',
      stage: 'NEGOTIATING',
      priority: 'HOT',
      source: 'WHATSAPP',
    },
  ]

  console.log('📋 Creating test leads...')

  for (const data of leadData) {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        assignedTo: counselor.id,
        lastContactedAt: new Date(),
      },
    })
    console.log(`  ✅ Created lead: ${lead.studentName} (${lead.stage})`)
  }

  console.log('\n🎉 Seed completed successfully!')
  console.log('\n📝 Test Counselor Credentials:')
  console.log('   Email: counselor@test.com')
  console.log('   Password: test123')
  console.log('\n🔗 Login at: http://localhost:3001/api/auth/signin')
  console.log('🔗 Then navigate to: http://localhost:3001/counselor/leads')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
