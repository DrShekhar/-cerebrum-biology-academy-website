/**
 * Migration Script: Insert Dropper Questions into Supabase
 *
 * Run with: npx ts-node scripts/migrate-dropper-questions.ts
 * Or: npx tsx scripts/migrate-dropper-questions.ts
 */

import { PrismaClient } from '../src/generated/prisma'
import { dropperQuestions } from '../src/data/questions/dropper'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

// Map local difficulty to database enum
function mapDifficulty(difficulty: string): 'EASY' | 'MEDIUM' | 'HARD' {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'EASY'
    case 'medium':
      return 'MEDIUM'
    case 'hard':
      return 'HARD'
    default:
      return 'MEDIUM'
  }
}

// Map weightage number to NEET weightage string
function mapNeetWeightage(weightage: number): 'HIGH' | 'MEDIUM' | 'LOW' {
  if (weightage >= 6) return 'HIGH'
  if (weightage >= 4.5) return 'MEDIUM'
  return 'LOW'
}

// Parse NCERT reference to extract class, chapter, page
function parseNcertReference(ref: string): {
  ncertClass: number | null
  ncertChapter: number | null
  ncertPage: number | null
  ncertChapterName: string | null
} {
  // Format: "Class 11, Chapter 21, Page 315" or "Class 12, Chapter 6, Page 115"
  const classMatch = ref.match(/Class\s+(\d+)/i)
  const chapterMatch = ref.match(/Chapter\s+(\d+)/i)
  const pageMatch = ref.match(/Page\s+(\d+)/i)

  return {
    ncertClass: classMatch ? parseInt(classMatch[1]) : null,
    ncertChapter: chapterMatch ? parseInt(chapterMatch[1]) : null,
    ncertPage: pageMatch ? parseInt(pageMatch[1]) : null,
    ncertChapterName: null, // Would need chapter name mapping
  }
}

// Map topicId to human-readable topic name
function mapTopic(topicId: string): string {
  const topicMap: Record<string, string> = {
    'topic-dropper-1-1': 'Human Physiology',
    'topic-dropper-1-2': 'Human Physiology',
    'topic-dropper-1-3': 'Human Physiology',
    'topic-dropper-1-4': 'Human Physiology',
    'topic-dropper-1-5': 'Human Physiology',
    'topic-dropper-1-6': 'Human Physiology',
    'topic-dropper-1-7': 'Human Physiology',
    'topic-dropper-2-1': 'Genetics and Evolution',
    'topic-dropper-2-2': 'Genetics and Evolution',
    'topic-dropper-2-3': 'Genetics and Evolution',
    'topic-dropper-2-4': 'Genetics and Evolution',
    'topic-dropper-2-5': 'Genetics and Evolution',
    'topic-dropper-2-6': 'Genetics and Evolution',
    'topic-dropper-3-1': 'Ecology',
    'topic-dropper-3-2': 'Ecology',
    'topic-dropper-3-3': 'Ecology',
    'topic-dropper-3-4': 'Ecology',
    'topic-dropper-3-5': 'Ecology',
    'topic-dropper-3-6': 'Ecology',
    'topic-dropper-4-1': 'Plant Physiology',
    'topic-dropper-4-2': 'Plant Physiology',
    'topic-dropper-4-3': 'Plant Physiology',
    'topic-dropper-4-4': 'Plant Physiology',
    'topic-dropper-4-5': 'Plant Physiology',
    'topic-dropper-5-1': 'Biotechnology',
    'topic-dropper-5-2': 'Biotechnology',
    'topic-dropper-5-3': 'Biotechnology',
    'topic-dropper-6-1': 'Reproduction',
    'topic-dropper-6-2': 'Reproduction',
    'topic-dropper-6-3': 'Reproduction',
  }
  return topicMap[topicId] || 'General Biology'
}

// Map topicId to subtopic
function mapSubtopic(topicId: string): string {
  const subtopicMap: Record<string, string> = {
    'topic-dropper-1-1': 'Nervous System',
    'topic-dropper-1-2': 'Digestion and Absorption',
    'topic-dropper-1-3': 'Excretory System',
    'topic-dropper-1-4': 'Circulatory System',
    'topic-dropper-1-5': 'Respiratory System',
    'topic-dropper-1-6': 'Endocrine System',
    'topic-dropper-1-7': 'Locomotion and Movement',
    'topic-dropper-2-1': 'DNA Replication',
    'topic-dropper-2-2': 'Transcription and Translation',
    'topic-dropper-2-3': 'Gene Regulation',
    'topic-dropper-2-4': 'Mendelian Genetics',
    'topic-dropper-2-5': 'Chromosomal Disorders',
    'topic-dropper-2-6': 'Molecular Basis of Inheritance',
    'topic-dropper-3-1': 'Ecosystem',
    'topic-dropper-3-2': 'Productivity',
    'topic-dropper-3-3': 'Evolution',
    'topic-dropper-3-4': 'Species Interactions',
    'topic-dropper-3-5': 'Ecological Succession',
    'topic-dropper-3-6': 'Biodiversity',
    'topic-dropper-4-1': 'Photosynthesis',
    'topic-dropper-4-2': 'Light Reactions',
    'topic-dropper-4-3': 'Plant Transport',
    'topic-dropper-4-4': 'Mineral Nutrition',
    'topic-dropper-4-5': 'Respiration',
    'topic-dropper-5-1': 'Genetic Engineering',
    'topic-dropper-5-2': 'Biotechnology Applications',
    'topic-dropper-5-3': 'Transgenic Plants',
    'topic-dropper-6-1': 'Plant Reproduction',
    'topic-dropper-6-2': 'Human Reproduction',
    'topic-dropper-6-3': 'Reproductive Health',
  }
  return subtopicMap[topicId] || 'General'
}

async function migrateDropperQuestions() {
  console.log('Starting migration of dropper questions...')
  console.log(`Total questions to migrate: ${dropperQuestions.length}`)

  let successCount = 0
  let errorCount = 0
  const errors: string[] = []

  for (const q of dropperQuestions) {
    try {
      const ncertInfo = parseNcertReference(q.ncertPageReference)

      const questionData = {
        id: `dropper-${q.id}-${randomUUID().slice(0, 8)}`,
        topic: mapTopic(q.topicId),
        subtopic: mapSubtopic(q.topicId),
        curriculum: 'NEET',
        grade: 'DROPPER',
        type: 'MCQ' as const,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        source: 'Cerebrum Biology Academy - Dropper Question Bank',
        marks: 4, // NEET marks per question
        timeLimit: q.timeEstimate,
        tags: [q.bloomsLevel, ...q.conceptualLinks],
        difficulty: mapDifficulty(q.difficulty),
        isActive: true,
        isVerified: true,
        isNcertBased: true,
        isNeetImportant: q.previousYearFrequency >= 15,
        ncertClass: ncertInfo.ncertClass,
        ncertChapter: ncertInfo.ncertChapter,
        ncertPage: ncertInfo.ncertPage,
        neetWeightage: mapNeetWeightage(q.weightage),
        relatedConcepts: q.conceptualLinks,
        keywords: q.conceptualLinks,
        subject: 'biology',
        category: 'PRACTICE' as const,
        updatedAt: new Date(),
      }

      await prisma.questions.create({
        data: questionData,
      })

      successCount++
      console.log(`✓ Migrated: ${q.id} - ${q.question.slice(0, 50)}...`)
    } catch (error) {
      errorCount++
      const errorMsg = `✗ Failed: ${q.id} - ${error instanceof Error ? error.message : 'Unknown error'}`
      errors.push(errorMsg)
      console.error(errorMsg)
    }
  }

  console.log('\n========== Migration Summary ==========')
  console.log(`Total questions: ${dropperQuestions.length}`)
  console.log(`Successfully migrated: ${successCount}`)
  console.log(`Failed: ${errorCount}`)

  if (errors.length > 0) {
    console.log('\nErrors:')
    errors.forEach((e) => console.log(e))
  }

  await prisma.$disconnect()
}

// Run migration
migrateDropperQuestions()
  .then(() => {
    console.log('\nMigration complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
