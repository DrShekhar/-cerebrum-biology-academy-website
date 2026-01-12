/**
 * Simple Counselor Seed Script
 * Run with: npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed-counselor-simple.ts
 */

import { PrismaClient } from '@/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🎯 Seeding Counselor Demo Data...\n')

  // 1. Create Demo Counselor User
  console.log('👤 Creating demo counselor user...')
  const hashedPassword = await bcrypt.hash('demo123456', 10)

  const counselor = await prisma.users.upsert({
    where: { email: 'counselor@cerebrumacademy.com' },
    update: {
      password: hashedPassword,
      role: 'COUNSELOR',
      isActive: true,
    },
    create: {
      email: 'counselor@cerebrumacademy.com',
      name: 'Demo Counselor',
      role: 'COUNSELOR',
      password: hashedPassword,
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log(`✅ Counselor created: ${counselor.email}`)
  console.log(`📧 Email: counselor@cerebrumacademy.com`)
  console.log(`🔑 Password: demo123456\n`)

  // 2. Create 10 Sample Leads
  console.log('📊 Creating sample leads...')

  const leadStages = ['NEW_LEAD', 'CONTACTED', 'DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT', 'NEGOTIATING', 'PAYMENT_PENDING', 'ENROLLED']
  const priorities = ['HOT', 'WARM', 'COLD']
  const sources = ['Website', 'WhatsApp', 'Referral', 'Social Media', 'Google Ads']
  const grades = ['CLASS_11', 'CLASS_12', 'DROPPER']

  const studentNames = [
    'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Neha Singh', 'Arjun Reddy',
    'Sneha Gupta', 'Vikram Malhotra', 'Anjali Verma', 'Rohan Desai', 'Kavya Iyer'
  ]

  const createdLeads = []

  for (let i = 0; i < 10; i++) {
    const stage = leadStages[i % leadStages.length]
    const priority = priorities[i % priorities.length]
    const studentName = studentNames[i]

    const lead = await prisma.leads.create({
      data: {
        studentName,
        email: `${studentName.toLowerCase().replace(' ', '.')}@example.com`,
        phone: `+918826444${String(335 + i).padStart(3, '0')}`,
        grade: grades[i % grades.length],
        city: 'Delhi',
        school: `School ${i + 1}`,
        stage,
        priority,
        source: sources[i % sources.length],
        interestedCourse: `Class ${11 + (i % 2)}th Biology - NEET Preparation`,
        parentName: `Parent of ${studentName}`,
        parentPhone: `+918826444${String(345 + i).padStart(3, '0')}`,
        followUpDate: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000),
        assignedToId: counselor.id,
        createdAt: new Date(Date.now() - (10 - i) * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
      },
    })

    createdLeads.push(lead)
    console.log(`   ✓ Created lead: ${lead.studentName} (${lead.stage})`)
  }

  console.log(`\n`)

  // 3. Create Fee Plans for PAYMENT_PENDING and ENROLLED leads
  console.log('💰 Creating fee plans and installments...')

  const paymentLeads = createdLeads.filter(l =>
    l.stage === 'PAYMENT_PENDING' || l.stage === 'ENROLLED'
  )

  for (const lead of paymentLeads) {
    const totalFee = 45000
    const downPayment = 9000
    const remainingFee = totalFee - downPayment

    const feePlan = await prisma.fee_plans.create({
      data: {
        leadId: lead.id,
        courseName: lead.interestedCourse || 'NEET Biology',
        totalFee,
        downPayment,
        amountPaid: lead.stage === 'ENROLLED' ? downPayment : 0,
        amountDue: lead.stage === 'ENROLLED' ? remainingFee : totalFee,
        installmentCount: 3,
        status: lead.stage === 'ENROLLED' ? 'PARTIAL' : 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    console.log(`   ✓ Created fee plan for ${lead.studentName}: ₹${totalFee}`)

    // Create installments
    const installmentAmount = Math.floor(remainingFee / 3)

    for (let i = 0; i < 3; i++) {
      const dueDate = new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000) // Each month
      const isPaid = lead.stage === 'ENROLLED' && i === 0

      await prisma.installments.create({
        data: {
          id: `inst_${feePlan.id}_${i + 1}`,
          feePlanId: feePlan.id,
          installmentNumber: i + 1,
          amount: installmentAmount,
          dueDate,
          status: isPaid ? 'PAID' : 'PENDING',
          paidAt: isPaid ? new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) : null,
          paidAmount: isPaid ? installmentAmount : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
    }

    console.log(`   ✓ Created 3 installments`)
  }

  console.log(`\n`)
  console.log('✅ Seeding completed successfully!')
  console.log(`\n📝 Summary:`)
  console.log(`   • Counselor account: counselor@cerebrumacademy.com`)
  console.log(`   • Password: demo123456`)
  console.log(`   • Leads created: ${createdLeads.length}`)
  console.log(`   • Fee plans created: ${paymentLeads.length}`)
  console.log(`\n🚀 You can now log in at http://localhost:3000/counselor/login`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
