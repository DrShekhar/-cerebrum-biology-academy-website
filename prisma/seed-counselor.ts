/**
 * Seed Counselor CRM Demo Data
 * Run with: npx ts-node prisma/seed-counselor.ts
 */

import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedCounselorData() {
  console.log('🎯 Seeding Counselor CRM Demo Data...\n')

  // 1. Create Demo Counselor User
  console.log('👤 Creating demo counselor...')
  const hashedPassword = await bcrypt.hash('demo123', 10)

  const counselor = await prisma.user.upsert({
    where: { email: 'counselor@demo.com' },
    update: {},
    create: {
      email: 'counselor@demo.com',
      name: 'Demo Counselor',
      role: 'COUNSELOR',
      hashedPassword,
      isActive: true,
      emailVerified: new Date(),
    },
  })
  console.log(`   ✓ Created counselor: ${counselor.email}\n`)

  // 2. Create Sample Leads (15 leads across different stages)
  console.log('📊 Creating sample leads...')
  const leadData = [
    {
      studentName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      grade: 'CLASS_12',
      city: 'Delhi',
      school: 'Delhi Public School',
      stage: 'NEW_LEAD',
      priority: 'HOT',
      source: 'Website',
      interestedCourse: 'Class 12th Biology',
      parentName: 'Mr. Sharma',
      parentPhone: '+91 98765 43211',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '+91 98765 43220',
      grade: 'CLASS_11',
      city: 'Mumbai',
      school: 'Kendriya Vidyalaya',
      stage: 'CONTACTED',
      priority: 'HOT',
      source: 'Referral',
      interestedCourse: 'Class 11th Biology',
      parentName: 'Mrs. Patel',
      parentPhone: '+91 98765 43221',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      studentName: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      phone: '+91 98765 43230',
      grade: 'DROPPER',
      city: 'Kota',
      school: 'Allen Career Institute',
      stage: 'DEMO_SCHEDULED',
      priority: 'WARM',
      source: 'Google Ads',
      interestedCourse: 'NEET Dropper Program',
      parentName: 'Mr. Kumar',
      parentPhone: '+91 98765 43231',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      demoScheduledAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '+91 98765 43240',
      grade: 'CLASS_12',
      city: 'Hyderabad',
      school: 'Narayana IIT Academy',
      stage: 'DEMO_COMPLETED',
      priority: 'HOT',
      source: 'Facebook',
      interestedCourse: 'Class 12th Biology',
      parentName: 'Dr. Reddy',
      parentPhone: '+91 98765 43241',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      demoCompletedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 98765 43250',
      grade: 'CLASS_11',
      city: 'Jaipur',
      school: 'Ryan International',
      stage: 'OFFER_SENT',
      priority: 'WARM',
      source: 'Instagram',
      interestedCourse: 'Class 11th Biology',
      parentName: 'Col. Singh',
      parentPhone: '+91 98765 43251',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Ananya Gupta',
      email: 'ananya.gupta@example.com',
      phone: '+91 98765 43260',
      grade: 'CLASS_12',
      city: 'Bangalore',
      school: 'National Public School',
      stage: 'NEGOTIATING',
      priority: 'HOT',
      source: 'Website',
      interestedCourse: 'Class 12th Biology',
      parentName: 'Mr. Gupta',
      parentPhone: '+91 98765 43261',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Rohan Mehta',
      email: 'rohan.mehta@example.com',
      phone: '+91 98765 43270',
      grade: 'DROPPER',
      city: 'Pune',
      school: 'FIITJEE',
      stage: 'PAYMENT_PENDING',
      priority: 'URGENT',
      source: 'Referral',
      interestedCourse: 'NEET Dropper Program',
      parentName: 'Mrs. Mehta',
      parentPhone: '+91 98765 43271',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      studentName: 'Kavya Iyer',
      email: 'kavya.iyer@example.com',
      phone: '+91 98765 43280',
      grade: 'CLASS_12',
      city: 'Chennai',
      school: 'Padma Seshadri',
      stage: 'ENROLLED',
      priority: 'COLD',
      source: 'Website',
      interestedCourse: 'Class 12th Biology',
      parentName: 'Mr. Iyer',
      parentPhone: '+91 98765 43281',
      followUpDate: null,
      lastContactedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Arjun Nair',
      email: 'arjun.nair@example.com',
      phone: '+91 98765 43290',
      grade: 'CLASS_11',
      city: 'Kochi',
      school: 'Rajagiri Public School',
      stage: 'ACTIVE_STUDENT',
      priority: 'COLD',
      source: 'Referral',
      interestedCourse: 'Class 11th Biology',
      parentName: 'Dr. Nair',
      parentPhone: '+91 98765 43291',
      followUpDate: null,
      lastContactedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      enrolledAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Tanvi Joshi',
      email: 'tanvi.joshi@example.com',
      phone: '+91 98765 43300',
      grade: 'CLASS_12',
      city: 'Ahmedabad',
      school: 'Zydus School',
      stage: 'NEW_LEAD',
      priority: 'WARM',
      source: 'Google Ads',
      interestedCourse: 'Class 12th Biology',
      parentName: 'Mr. Joshi',
      parentPhone: '+91 98765 43301',
      followUpDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      studentName: 'Aditya Desai',
      email: 'aditya.desai@example.com',
      phone: '+91 98765 43310',
      grade: 'DROPPER',
      city: 'Surat',
      school: 'Resonance',
      stage: 'CONTACTED',
      priority: 'HOT',
      source: 'YouTube',
      interestedCourse: 'NEET Dropper Program',
      parentName: 'Mrs. Desai',
      parentPhone: '+91 98765 43311',
      followUpDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      lastContactedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      studentName: 'Diya Kapoor',
      email: 'diya.kapoor@example.com',
      phone: '+91 98765 43320',
      grade: 'CLASS_11',
      city: 'Chandigarh',
      school: 'DAV Public School',
      stage: 'LOST',
      priority: 'COLD',
      source: 'Facebook',
      interestedCourse: 'Class 11th Biology',
      parentName: 'Mr. Kapoor',
      parentPhone: '+91 98765 43321',
      followUpDate: null,
      lastContactedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      lostReason: 'Joined another institute',
    },
  ]

  const createdLeads = []
  for (const data of leadData) {
    const lead = await prisma.lead.create({
      data: {
        ...data,
        assignedToId: counselor.id,
        notes: `Initial inquiry received. ${data.priority === 'HOT' ? 'Highly motivated student.' : 'Standard inquiry.'}`,
      },
    })
    createdLeads.push(lead)
    console.log(`   ✓ Created lead: ${lead.studentName} (${lead.stage})`)
  }
  console.log(`\n`)

  // 3. Create Activities for leads
  console.log('📝 Creating activity logs...')
  let activityCount = 0
  for (const lead of createdLeads) {
    // Initial contact activity
    await prisma.activity.create({
      data: {
        leadId: lead.id,
        type: 'STAGE_CHANGED',
        description: `Lead created from ${lead.source}`,
        performedBy: counselor.id,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    })
    activityCount++

    // Add more activities for contacted/advanced leads
    if (['CONTACTED', 'DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT', 'NEGOTIATING', 'PAYMENT_PENDING', 'ENROLLED', 'ACTIVE_STUDENT'].includes(lead.stage)) {
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: 'COMMUNICATION_SENT',
          description: 'Sent initial WhatsApp message with course details',
          performedBy: counselor.id,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        },
      })
      activityCount++
    }

    if (['DEMO_COMPLETED', 'OFFER_SENT', 'NEGOTIATING', 'PAYMENT_PENDING', 'ENROLLED', 'ACTIVE_STUDENT'].includes(lead.stage)) {
      await prisma.activity.create({
        data: {
          leadId: lead.id,
          type: 'DEMO_CONDUCTED',
          description: 'Conducted demo class - Student showed interest',
          performedBy: counselor.id,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        },
      })
      activityCount++
    }
  }
  console.log(`   ✓ Created ${activityCount} activity logs\n`)

  // 4. Create Tasks
  console.log('✅ Creating tasks...')
  const taskData = [
    {
      leadId: createdLeads[0].id,
      title: 'Initial Follow-up Call',
      description: 'Call Rahul Sharma to introduce yourself and understand his NEET preparation goals.',
      type: 'FOLLOW_UP',
      priority: 'HIGH',
      status: 'TODO',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[1].id,
      title: 'Schedule Demo Class',
      description: 'Coordinate with Priya Patel to schedule a convenient demo class time.',
      type: 'DEMO_REMINDER',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[2].id,
      title: 'Send Demo Reminder',
      description: 'Send WhatsApp reminder to Amit Kumar 1 day before demo with Zoom link.',
      type: 'DEMO_REMINDER',
      priority: 'URGENT',
      status: 'TODO',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[3].id,
      title: 'Send Course Offer',
      description: 'Create and send personalized fee plan to Sneha Reddy after demo completion.',
      type: 'OFFER_EXPIRY',
      priority: 'HIGH',
      status: 'TODO',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[6].id,
      title: 'Payment Reminder',
      description: 'Send payment link to Rohan Mehta and remind about down payment.',
      type: 'PAYMENT_REMINDER',
      priority: 'URGENT',
      status: 'TODO',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[4].id,
      title: 'Follow-up on Offer',
      description: 'Call Vikram Singh to discuss the offer and address any concerns.',
      type: 'FOLLOW_UP',
      priority: 'HIGH',
      status: 'TODO',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[7].id,
      title: 'Welcome Email',
      description: 'Send welcome email to Kavya Iyer with course access details.',
      type: 'OTHER',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    },
    {
      leadId: createdLeads[10].id,
      title: 'Schedule Initial Call',
      description: 'Call Aditya Desai to understand his preparation level and requirements.',
      type: 'FOLLOW_UP',
      priority: 'HIGH',
      status: 'TODO',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Overdue!
    },
  ]

  for (const task of taskData) {
    await prisma.task.create({
      data: {
        ...task,
        assignedToId: counselor.id,
      },
    })
    console.log(`   ✓ Created task: ${task.title}`)
  }
  console.log(`\n`)

  // 5. Create WhatsApp Communications
  console.log('💬 Creating WhatsApp message logs...')
  for (let i = 0; i < 5; i++) {
    const lead = createdLeads[i]
    await prisma.communication.create({
      data: {
        leadId: lead.id,
        type: 'WHATSAPP',
        direction: 'OUTBOUND',
        content: `Hi ${lead.studentName}! 👋\n\nThank you for your interest in Cerebrum Biology Academy. We specialize in NEET Biology preparation with personalized attention.\n\nWould you like to schedule a free demo class? Let me know your preferred time!\n\nBest regards,\nDemo Counselor\nCerebrum Biology Academy`,
        status: 'SENT',
        sentBy: counselor.id,
        sentAt: new Date(Date.now() - (5 - i) * 24 * 60 * 60 * 1000),
      },
    })
  }
  console.log(`   ✓ Created 5 WhatsApp communications\n`)

  // 6. Create Fee Plans for advanced stage leads
  console.log('💰 Creating fee plans...')
  const enrolledLead = createdLeads.find((l) => l.stage === 'ENROLLED')
  if (enrolledLead) {
    const feePlan = await prisma.feePlan.create({
      data: {
        leadId: enrolledLead.id,
        courseName: 'Class 12th Biology - Complete NEET Preparation',
        originalAmount: 50000,
        discountPercent: 10,
        discountAmount: 5000,
        finalAmount: 45000,
        downPaymentPercent: 20,
        downPaymentAmount: 9000,
        installmentCount: 3,
        installmentFrequency: 'MONTHLY',
        termsAndConditions: 'Standard payment terms apply. No refunds after 7 days.',
        status: 'APPROVED',
        createdBy: counselor.id,
      },
    })

    // Create installments
    const installmentAmount = Math.floor((45000 - 9000) / 3)
    for (let i = 0; i <= 3; i++) {
      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + (i * 30))

      await prisma.installment.create({
        data: {
          feePlanId: feePlan.id,
          installmentNumber: i,
          amount: i === 0 ? 9000 : installmentAmount,
          dueDate,
          status: i === 0 ? 'PAID' : 'PENDING',
          description: i === 0 ? 'Down Payment' : `Installment ${i} of 3`,
        },
      })
    }
    console.log(`   ✓ Created fee plan for ${enrolledLead.studentName}\n`)
  }

  console.log('✅ Counselor CRM seeding completed!\n')
  console.log('📊 Summary:')
  console.log(`   - Counselor: counselor@demo.com (password: demo123)`)
  console.log(`   - Leads: ${createdLeads.length}`)
  console.log(`   - Tasks: ${taskData.length}`)
  console.log(`   - Activities: ${activityCount}`)
  console.log(`   - Communications: 5`)
  console.log(`   - Fee Plans: 1\n`)

  console.log('🎯 Next Steps:')
  console.log('1. Start dev server: npm run dev')
  console.log('2. Go to: http://localhost:3000/counselor/leads')
  console.log('3. The page will load with all demo data!\n')
}

seedCounselorData()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
