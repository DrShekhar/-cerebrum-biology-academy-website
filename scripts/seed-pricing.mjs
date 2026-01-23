import { PrismaClient } from '../src/generated/prisma/index.js'
const prisma = new PrismaClient()

const EXCHANGE_RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
  CAD: 0.016,
  AED: 0.044,
  SGD: 0.016,
}

const CURRENCY_PREMIUMS = {
  INR: 1.0,
  USD: 1.15,
  EUR: 1.12,
  GBP: 1.10,
  AUD: 1.18,
  CAD: 1.15,
  AED: 1.12,
  SGD: 1.15,
}

function roundToNice(amount) {
  if (amount < 100) return Math.ceil(amount / 5) * 5
  if (amount < 1000) return Math.ceil(amount / 10) * 10 - 1
  return Math.ceil(amount / 100) * 100 - 1
}

async function main() {
  console.log('Fetching active courses...\n')

  const courses = await prisma.courses.findMany({
    where: { isActive: true },
    select: { id: true, name: true, totalFees: true, type: true },
    orderBy: { sortOrder: 'asc' }
  })

  console.log(`Found ${courses.length} active courses:\n`)

  const pricingData = []

  for (const course of courses) {
    const inrAmount = course.totalFees / 100
    console.log(`📚 ${course.name}`)
    console.log(`   INR: ₹${inrAmount.toLocaleString()}`)

    for (const [currency, rate] of Object.entries(EXCHANGE_RATES)) {
      if (currency === 'INR') continue

      const baseAmount = inrAmount * rate
      const withPremium = baseAmount * CURRENCY_PREMIUMS[currency]
      const finalAmount = roundToNice(withPremium)
      const amountInSmallest = Math.round(finalAmount * 100)

      pricingData.push({
        id: `cp_${course.id.slice(0, 8)}_${currency.toLowerCase()}`,
        courseId: course.id,
        currency,
        amount: amountInSmallest,
        isActive: true,
      })

      const symbols = { USD: '$', EUR: '€', GBP: '£', AUD: 'A$', CAD: 'C$', AED: 'AED ', SGD: 'S$' }
      console.log(`   ${currency}: ${symbols[currency]}${finalAmount.toLocaleString()}`)
    }
    console.log('')
  }

  console.log('\n🌱 Seeding pricing data...\n')

  let created = 0
  let skipped = 0

  for (const pricing of pricingData) {
    try {
      await prisma.course_pricing.upsert({
        where: {
          courseId_currency: {
            courseId: pricing.courseId,
            currency: pricing.currency,
          }
        },
        update: {
          amount: pricing.amount,
          isActive: pricing.isActive,
        },
        create: pricing,
      })
      created++
    } catch (error) {
      console.error(`Failed to seed ${pricing.currency} for course ${pricing.courseId}:`, error.message)
      skipped++
    }
  }

  console.log(`✅ Seeding complete!`)
  console.log(`   Created/Updated: ${created}`)
  console.log(`   Skipped: ${skipped}`)

  await prisma.$disconnect()
}

main().catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
