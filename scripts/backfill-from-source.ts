/**
 * One-time script: Backfill ncertChapterName for questions that have
 * "Class X, Chapter Y" in their source field but no ncertChapterName.
 *
 * Strategy: Parse source field → map (class, chapter_num) → chapter name
 * using existing known mappings from the database + NCERT chapter list.
 *
 * Run with: npx tsx scripts/backfill-from-source.ts
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// NCERT Biology chapter names by class and chapter number
// Source: NCERT Biology Class 11 & 12 textbooks
const NCERT_CHAPTER_MAP: Record<string, Record<number, string>> = {
  '11': {
    1: 'The Living World',
    2: 'Biological Classification',
    3: 'Plant Kingdom',
    4: 'Animal Kingdom',
    5: 'Morphology of Flowering Plants',
    6: 'Anatomy of Flowering Plants',
    7: 'Structural Organisation in Animals',
    8: 'Cell: The Unit of Life',
    9: 'Biomolecules',
    10: 'Cell Cycle and Cell Division',
    11: 'Photosynthesis in Higher Plants',
    12: 'Respiration in Plants',
    13: 'Plant Growth and Development',
    14: 'Breathing and Exchange of Gases',
    15: 'Body Fluids and Circulation',
    16: 'Excretory Products and Their Elimination',
    17: 'Locomotion and Movement',
    18: 'Neural Control and Coordination',
    19: 'Chemical Coordination and Integration',
    20: 'Digestion and Absorption',
    21: 'Reproduction in Organisms',
    22: 'Sexual Reproduction in Flowering Plants',
  },
  '12': {
    1: 'Reproduction in Organisms',
    2: 'Sexual Reproduction in Flowering Plants',
    3: 'Human Reproduction',
    4: 'Reproductive Health',
    5: 'Principles of Inheritance and Variation',
    6: 'Molecular Basis of Inheritance',
    7: 'Evolution',
    8: 'Human Health and Diseases',
    9: 'Strategies for Enhancement in Food Production',
    10: 'Microbes in Human Welfare',
    11: 'Biotechnology: Principles and Processes',
    12: 'Biotechnology and Its Applications',
    13: 'Organisms and Populations',
    14: 'Ecosystem',
    15: 'Biodiversity and Conservation',
    16: 'Environmental Issues',
  },
  // Classes 9 and 10 (limited biology chapters)
  '9': {
    5: 'The Fundamental Unit of Life',
    6: 'Tissues',
  },
  '10': {
    6: 'Life Processes',
    7: 'Control and Coordination',
    8: 'How Do Organisms Reproduce',
  },
}

async function main() {
  // Step 1: Find all questions with parseable source but no ncertChapterName
  const questions = await prisma.questions.findMany({
    where: {
      ncertChapterName: null,
      campbellUnit: null,
      source: { contains: 'Chapter' },
    },
    select: { id: true, source: true },
  })

  console.log(`Found ${questions.length} questions with Chapter in source`)

  // Group question IDs by target chapter name for batch updates
  const groups = new Map<string, string[]>()
  let skipped = 0
  const unmapped: string[] = []

  for (const q of questions) {
    const match = q.source?.match(/Class\s+(\d+),\s+Chapter\s+(\d+)/i)
    if (match) {
      const chapterName = NCERT_CHAPTER_MAP[match[1]]?.[parseInt(match[2], 10)]
      if (chapterName) {
        const ids = groups.get(chapterName) || []
        ids.push(q.id)
        groups.set(chapterName, ids)
        continue
      }
      const key = `Class ${match[1]}, Chapter ${match[2]}`
      if (unmapped.indexOf(key) === -1) unmapped.push(key)
    }
    skipped++
  }

  // Batch update per chapter name
  let updated = 0
  for (const [chapterName, ids] of groups) {
    const result = await prisma.questions.updateMany({
      where: { id: { in: ids } },
      data: { ncertChapterName: chapterName },
    })
    updated += result.count
    console.log(`  ${chapterName}: ${result.count} questions`)
  }

  console.log(`Updated: ${updated}`)
  console.log(`Skipped: ${skipped}`)
  if (unmapped.length > 0) {
    console.log(`Unmapped class/chapter combos:`, unmapped)
  }

  // Step 2: Also try "NCERT Class X, Chapter Y" source patterns
  const ncertSources = await prisma.questions.findMany({
    where: {
      ncertChapterName: null,
      campbellUnit: null,
      source: { startsWith: 'NCERT Class' },
    },
    select: { id: true, source: true },
  })

  console.log(`\nFound ${ncertSources.length} questions with 'NCERT Class X' source`)
  const groups2 = new Map<string, string[]>()

  for (const q of ncertSources) {
    const match = q.source?.match(/NCERT Class\s+(\d+),?\s*Chapter\s+(\d+)/i)
    if (match) {
      const chapterName = NCERT_CHAPTER_MAP[match[1]]?.[parseInt(match[2], 10)]
      if (chapterName) {
        const ids = groups2.get(chapterName) || []
        ids.push(q.id)
        groups2.set(chapterName, ids)
      }
    }
  }

  let updated2 = 0
  for (const [chapterName, ids] of groups2) {
    const result = await prisma.questions.updateMany({
      where: { id: { in: ids } },
      data: { ncertChapterName: chapterName },
    })
    updated2 += result.count
    console.log(`  ${chapterName}: ${result.count} questions`)
  }
  console.log(`Updated from NCERT source: ${updated2}`)

  // Final count
  const remaining = await prisma.questions.count({
    where: { ncertChapterName: null, campbellUnit: null },
  })
  console.log(`\nRemaining non-olympiad without ncertChapterName: ${remaining}`)

  await prisma.$disconnect()
}

main().catch(console.error)
