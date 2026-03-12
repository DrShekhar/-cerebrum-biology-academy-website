/**
 * One-time script: Backfill ncertChapterName for questions that have
 * "Page X" or "Page X, NCERT Class 12" in their source field.
 *
 * Uses NCERT Class 12 Biology textbook page ranges to map to chapters.
 * Also uses topic field as a secondary signal when page ranges overlap.
 *
 * Run with: npx tsx scripts/backfill-from-pages.ts
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// NCERT Class 12 Biology page ranges per chapter
// Source: NCERT Biology Class XII textbook (2023-24 edition)
const CLASS_12_PAGE_CHAPTERS: { start: number; end: number; chapter: string; topic: string }[] = [
  { start: 1, end: 24, chapter: 'Reproduction in Organisms', topic: 'Reproduction' },
  { start: 25, end: 46, chapter: 'Sexual Reproduction in Flowering Plants', topic: 'Reproduction' },
  { start: 47, end: 68, chapter: 'Human Reproduction', topic: 'Reproduction' },
  { start: 69, end: 82, chapter: 'Reproductive Health', topic: 'Reproduction' },
  { start: 83, end: 112, chapter: 'Principles of Inheritance and Variation', topic: 'Genetics and Evolution' },
  { start: 113, end: 140, chapter: 'Molecular Basis of Inheritance', topic: 'Genetics and Evolution' },
  { start: 141, end: 160, chapter: 'Evolution', topic: 'Genetics and Evolution' },
  { start: 161, end: 180, chapter: 'Human Health and Diseases', topic: 'Biology and Human Welfare' },
  { start: 181, end: 196, chapter: 'Strategies for Enhancement in Food Production', topic: 'Biology and Human Welfare' },
  { start: 197, end: 216, chapter: 'Microbes in Human Welfare', topic: 'Biology and Human Welfare' },
  { start: 217, end: 236, chapter: 'Biotechnology: Principles and Processes', topic: 'Biotechnology' },
  { start: 237, end: 252, chapter: 'Biotechnology and Its Applications', topic: 'Biotechnology' },
  { start: 253, end: 272, chapter: 'Organisms and Populations', topic: 'Ecology' },
  { start: 273, end: 296, chapter: 'Ecosystem', topic: 'Ecology' },
  { start: 297, end: 316, chapter: 'Biodiversity and Conservation', topic: 'Ecology' },
  { start: 317, end: 345, chapter: 'Environmental Issues', topic: 'Ecology' },
]

function getChapterFromPage(pageNum: number, topic?: string | null): string | null {
  // Find matching page range
  const matches = CLASS_12_PAGE_CHAPTERS.filter(
    (ch) => pageNum >= ch.start && pageNum <= ch.end
  )

  if (matches.length === 1) return matches[0].chapter

  // If multiple matches (edge of page ranges), use topic to disambiguate
  if (matches.length > 1 && topic) {
    const topicMatch = matches.find((ch) => ch.topic === topic)
    if (topicMatch) return topicMatch.chapter
  }

  // If still multiple, return first match
  if (matches.length > 0) return matches[0].chapter

  return null
}

async function main() {
  // Find all page-referenced questions without chapter name
  const questions = await prisma.questions.findMany({
    where: {
      ncertChapterName: null,
      campbellUnit: null,
      source: { startsWith: 'Page ' },
    },
    select: { id: true, source: true, topic: true },
  })

  console.log(`Found ${questions.length} page-referenced questions`)

  // Group by chapter name for batch updates
  const groups = new Map<string, string[]>()
  let skipped = 0

  for (const q of questions) {
    const match = q.source?.match(/Page\s+(\d+)/)
    if (!match) {
      skipped++
      continue
    }

    const pageNum = parseInt(match[1], 10)
    const chapterName = getChapterFromPage(pageNum, q.topic)

    if (!chapterName) {
      skipped++
      continue
    }

    const ids = groups.get(chapterName) || []
    ids.push(q.id)
    groups.set(chapterName, ids)
  }

  // Batch update
  let updated = 0
  for (const [chapterName, ids] of groups) {
    const result = await prisma.questions.updateMany({
      where: { id: { in: ids } },
      data: { ncertChapterName: chapterName },
    })
    updated += result.count
    console.log(`  ${chapterName}: ${result.count} questions`)
  }

  console.log(`\nUpdated: ${updated}`)
  console.log(`Skipped: ${skipped}`)

  // Also handle "Page X, NCERT Class 12 Biology" pattern
  const class12Sources = await prisma.questions.findMany({
    where: {
      ncertChapterName: null,
      campbellUnit: null,
      source: { contains: 'NCERT Class 12' },
    },
    select: { id: true, source: true, topic: true },
  })

  console.log(`\nFound ${class12Sources.length} 'NCERT Class 12' questions`)
  const groups2 = new Map<string, string[]>()

  for (const q of class12Sources) {
    const match = q.source?.match(/Page\s+(\d+)/)
    if (!match) continue

    const pageNum = parseInt(match[1], 10)
    const chapterName = getChapterFromPage(pageNum, q.topic)
    if (!chapterName) continue

    const ids = groups2.get(chapterName) || []
    ids.push(q.id)
    groups2.set(chapterName, ids)
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
  console.log(`Updated from NCERT Class 12 pages: ${updated2}`)

  // Final count
  const remaining = await prisma.questions.count({
    where: { ncertChapterName: null, campbellUnit: null },
  })
  console.log(`\nRemaining non-olympiad without ncertChapterName: ${remaining}`)

  await prisma.$disconnect()
}

main().catch(console.error)
