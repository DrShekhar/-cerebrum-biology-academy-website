/**
 * Seed one real example of each LMS content type so the student learning
 * experience (and the P1 dashboard widgets: Next class / Attendance / Library)
 * has genuine data to render instead of empty states.
 *
 * Source content (owner-provided, real — nothing fabricated):
 *   1. PDF practice paper  → "Plant Kingdom — 60 NEET-Pattern MCQs w/ Explanations"
 *      (Class 11, Ch 3)  file: public/sample-materials/plant-kingdom-60-neet-mcqs-explanations.pdf
 *   2. PDF class notes     → "Genetics — Principles of Inheritance (class notes)"
 *      (Class 12)         file: public/sample-materials/genetics-principles-of-inheritance-class-notes.pdf
 *   3. Recorded live class → a YouTube live recording, stored as a COMPLETED
 *      class_sessions.recordingUrl (video_lectures needs a Cloudflare Stream id,
 *      so a YouTube recording belongs on the session, which the Library widget
 *      links to directly).
 *
 * Also creates the two parent chapters (Plant Kingdom in class-11, Principles of
 * Inheritance in class-12) — the real courses currently have none.
 *
 * IDEMPOTENT: upserts by stable ids, safe to re-run. Never duplicates.
 *
 * Run (writes to whatever DATABASE_URL points at — this is PROD for this repo,
 * so run deliberately):  npx tsx scripts/seed-sample-lms-content.ts
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Real owner account (Dr. Shekhar Singh) — used for uploadedBy / teacherId.
const OWNER_ID = '698d55a2-ce86-45d8-9da6-eaa7920e0072'

// Owner-provided example recorded live class.
const RECORDING_URL = 'https://www.youtube.com/live/chwNnKR-mcw'

const PLANT_KINGDOM_PDF_BYTES = 83574
const GENETICS_NOTES_PDF_BYTES = 2260669

async function main() {
  const now = new Date()

  // 1) Chapters -------------------------------------------------------------
  const plantKingdomChapter = await prisma.chapters.upsert({
    where: { id: 'ch_plant_kingdom_c11' },
    create: {
      id: 'ch_plant_kingdom_c11',
      courseId: 'class-11',
      title: 'Plant Kingdom',
      description:
        'NCERT Class 11, Chapter 3 — algae, bryophytes, pteridophytes, gymnosperms and angiosperms, life cycles and classification.',
      orderIndex: 3,
      isFreePreview: true,
      isActive: true,
      updatedAt: now,
    },
    update: { title: 'Plant Kingdom', isActive: true, updatedAt: now },
  })

  const geneticsChapter = await prisma.chapters.upsert({
    where: { id: 'ch_principles_inheritance_c12' },
    create: {
      id: 'ch_principles_inheritance_c12',
      courseId: 'class-12',
      title: 'Principles of Inheritance and Variation',
      description:
        'NCERT Class 12 — Mendel’s laws, monohybrid & dihybrid crosses, test cross, dominance, segregation and inheritance patterns.',
      orderIndex: 5,
      isFreePreview: true,
      isActive: true,
      updatedAt: now,
    },
    update: {
      title: 'Principles of Inheritance and Variation',
      isActive: true,
      updatedAt: now,
    },
  })

  // 2) Study materials (PDFs) ----------------------------------------------
  await prisma.study_materials.upsert({
    where: { id: 'mat_plant_kingdom_mcqs' },
    create: {
      id: 'mat_plant_kingdom_mcqs',
      title: 'Plant Kingdom — 60 NEET-Pattern MCQs with Explanations',
      description:
        '60 advanced NEET-pattern MCQs (statement, assertion–reason, match-the-columns, “how many are correct”) with detailed NCERT-referenced explanations. Class 11, Chapter 3.',
      materialType: 'PDF_PRACTICE_PAPER',
      fileUrl: '/sample-materials/plant-kingdom-60-neet-mcqs-explanations.pdf',
      fileName: 'plant-kingdom-60-neet-mcqs-explanations.pdf',
      fileSize: PLANT_KINGDOM_PDF_BYTES,
      mimeType: 'application/pdf',
      courseId: 'class-11',
      chapterId: plantKingdomChapter.id,
      accessLevel: 'FREE',
      category: 'Practice Paper',
      uploadedBy: OWNER_ID,
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    },
    update: {
      title: 'Plant Kingdom — 60 NEET-Pattern MCQs with Explanations',
      fileUrl: '/sample-materials/plant-kingdom-60-neet-mcqs-explanations.pdf',
      isPublished: true,
      updatedAt: now,
    },
  })

  await prisma.study_materials.upsert({
    where: { id: 'mat_genetics_notes' },
    create: {
      id: 'mat_genetics_notes',
      title: 'Genetics — Principles of Inheritance (Class Notes)',
      description:
        'Class notes on genetics: Mendel’s pea-plant experiments, factors/genes and alleles, monohybrid cross, laws of dominance and segregation, test cross and inbreeding depression.',
      materialType: 'PDF_NOTES',
      fileUrl: '/sample-materials/genetics-principles-of-inheritance-class-notes.pdf',
      fileName: 'genetics-principles-of-inheritance-class-notes.pdf',
      fileSize: GENETICS_NOTES_PDF_BYTES,
      mimeType: 'application/pdf',
      courseId: 'class-12',
      chapterId: geneticsChapter.id,
      accessLevel: 'FREE',
      category: 'Notes',
      uploadedBy: OWNER_ID,
      isPublished: true,
      publishedAt: now,
      updatedAt: now,
    },
    update: {
      title: 'Genetics — Principles of Inheritance (Class Notes)',
      fileUrl: '/sample-materials/genetics-principles-of-inheritance-class-notes.pdf',
      isPublished: true,
      updatedAt: now,
    },
  })

  // 3) Recorded live class (YouTube) as a COMPLETED session ------------------
  const start = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  const end = new Date(start.getTime() + 120 * 60 * 1000) // +2h
  await prisma.class_sessions.upsert({
    where: { id: 'cs_recorded_live_neet' },
    create: {
      id: 'cs_recorded_live_neet',
      courseId: 'class-11',
      title: 'NEET Biology — Live Class (Recording)',
      description: 'Recording of a live NEET Biology class. Watch the full session below.',
      sessionType: 'REGULAR',
      scheduledDate: start,
      startTime: start,
      endTime: end,
      duration: 120,
      teacherId: OWNER_ID,
      status: 'COMPLETED',
      recordingUrl: RECORDING_URL,
      updatedAt: now,
    },
    update: {
      status: 'COMPLETED',
      recordingUrl: RECORDING_URL,
      updatedAt: now,
    },
  })

  console.log('Seeded sample LMS content:')
  console.log('  • Chapter: Plant Kingdom (class-11)')
  console.log('  • Chapter: Principles of Inheritance and Variation (class-12)')
  console.log('  • Material: Plant Kingdom — 60 NEET MCQs (PDF_PRACTICE_PAPER, FREE)')
  console.log('  • Material: Genetics — Class Notes (PDF_NOTES, FREE)')
  console.log('  • Recorded class: NEET Biology live recording (class_sessions, COMPLETED)')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
