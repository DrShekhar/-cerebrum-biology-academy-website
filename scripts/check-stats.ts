import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function getStats() {
  const total = await prisma.questions.count({ where: { isActive: true } })
  const byDifficulty = await prisma.questions.groupBy({
    by: ['difficulty'],
    where: { isActive: true },
    _count: { difficulty: true },
  })

  console.log('=== FINAL QUESTION BANK STATISTICS ===')
  console.log('Total active questions:', total)
  console.log('')
  console.log('By Difficulty:')
  byDifficulty.forEach((d) => {
    const pct = ((d._count.difficulty / total) * 100).toFixed(1)
    console.log(`  ${d.difficulty}: ${d._count.difficulty} (${pct}%)`)
  })

  await prisma.$disconnect()
}

getStats()
