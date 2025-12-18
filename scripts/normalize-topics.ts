/**
 * Normalize/merge duplicate topic names in the questions table
 * 
 * This script consolidates related topics into standard NEET Biology topic names.
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Mapping from variant/duplicate topic names to standard names
const TOPIC_MAPPINGS: Record<string, string> = {
  // Evolution related
  'Evolution': 'Genetics and Evolution',
  'Genetics': 'Genetics and Evolution',
  
  // Human Health related
  'Human Health': 'Biology and Human Welfare',
  'Human Health and Disease': 'Biology and Human Welfare',
  
  // Reproduction related
  'Human Reproduction': 'Reproduction',
  
  // Cell related
  'Cell Biology': 'Cell Structure and Function',
  'Biomolecules': 'Cell Structure and Function',
  'Molecular Biology': 'Cell Structure and Function',
  
  // Physiology related
  'Body Fluids and Circulation': 'Human Physiology',
  
  // Organisation related
  'Structural Organisation in Animals and Plants': 'Structural Organisation',
  
  // General
  'General Biology': 'Diversity in Living World',
}

async function normalizeTopics() {
  console.log('=== Topic Normalization Script ===\n')
  
  // Show current distribution
  console.log('Current topic distribution:')
  const currentDist = await prisma.$queryRaw<{ topic: string; count: bigint }[]>`
    SELECT topic, COUNT(*) as count
    FROM questions
    WHERE topic IS NOT NULL
    GROUP BY topic
    ORDER BY count DESC
  `
  
  for (const row of currentDist) {
    const needsMapping = TOPIC_MAPPINGS[row.topic]
    const marker = needsMapping ? ` → ${needsMapping}` : ''
    console.log(`  ${row.topic}: ${row.count}${marker}`)
  }
  
  // Perform updates
  console.log('\nApplying topic mappings...')
  
  let totalUpdated = 0
  
  for (const [oldTopic, newTopic] of Object.entries(TOPIC_MAPPINGS)) {
    const result = await prisma.questions.updateMany({
      where: { topic: oldTopic },
      data: { topic: newTopic, updatedAt: new Date() }
    })
    
    if (result.count > 0) {
      console.log(`  ${oldTopic} → ${newTopic}: ${result.count} questions`)
      totalUpdated += result.count
    }
  }
  
  console.log(`\nTotal updated: ${totalUpdated} questions`)
  
  // Show new distribution
  console.log('\nNew topic distribution:')
  const newDist = await prisma.$queryRaw<{ topic: string; count: bigint; hard: bigint }[]>`
    SELECT 
      topic, 
      COUNT(*) as count,
      COUNT(*) FILTER (WHERE difficulty = 'HARD') as hard
    FROM questions
    WHERE topic IS NOT NULL
    GROUP BY topic
    ORDER BY count DESC
  `
  
  for (const row of newDist) {
    const hardPct = Number(row.count) > 0 
      ? ((Number(row.hard) / Number(row.count)) * 100).toFixed(1)
      : '0.0'
    console.log(`  ${row.topic}: ${row.count} (${row.hard} HARD, ${hardPct}%)`)
  }
  
  await prisma.$disconnect()
}

normalizeTopics().catch(console.error)
