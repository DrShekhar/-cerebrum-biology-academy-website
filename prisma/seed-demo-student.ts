/**
 * Demo-student seed (roadmap P0d) — fills the student dashboard with
 * REPLACEABLE test content. Every row uses the `demo_` id prefix so it can be
 * listed/removed later with a single prefix query. Idempotent (upserts).
 *
 * Run:  npx tsx prisma/seed-demo-student.ts
 * Login: demo.student@cerebrumbiologyacademy.com (Google/email variants won't
 * match — use admin impersonation or point a test login at this user).
 */
import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()
const D = (s: string) => `demo_${s}`
const now = new Date()
const days = (n: number) => new Date(now.getTime() + n * 86_400_000)

async function main() {
  // ── Teacher (owner of sessions/assignments/materials) ──
  const teacher = await prisma.users.upsert({
    where: { email: 'demo.teacher@cerebrumbiologyacademy.com' },
    update: {},
    create: {
      id: D('teacher'),
      email: 'demo.teacher@cerebrumbiologyacademy.com',
      name: 'Dr. Priya Verma',
      role: 'TEACHER',
      updatedAt: now,
      profile: { avatarUrl: null, tags: ['demo-seed'] },
    },
  })

  // ── Student (+ free_users twin: test_attempts key on freeUserId=user.id) ──
  const student = await prisma.users.upsert({
    where: { email: 'demo.student@cerebrumbiologyacademy.com' },
    update: {},
    create: {
      id: D('student'),
      email: 'demo.student@cerebrumbiologyacademy.com',
      name: 'Aarav Demo',
      phone: '9000000001',
      role: 'STUDENT',
      coachingTier: 'PINNACLE',
      trialEndDate: days(15),
      updatedAt: now,
      profile: { currentClass: 'CLASS_12', avatarUrl: null, tags: ['demo-seed'] },
    },
  })
  await prisma.free_users.upsert({
    where: { id: student.id },
    update: {},
    create: { id: student.id, email: student.email, updatedAt: now },
  })

  // ── Courses (Class 12 + Dropper) ──
  const c12 = await prisma.courses.upsert({
    where: { id: D('course_c12') },
    update: {},
    create: {
      id: D('course_c12'),
      name: 'NEET Biology Class 12 (Demo)',
      type: 'CLASS_12',
      class: 'CLASS_12',
      duration: 12,
      totalFees: 75000,
      description: 'Demo course — replace with real batch',
      updatedAt: now,
    } as never,
  })
  const cDrop = await prisma.courses.upsert({
    where: { id: D('course_drop') },
    update: {},
    create: {
      id: D('course_drop'),
      name: 'NEET Dropper Intensive (Demo)',
      type: 'DROPPER',
      class: 'DROPPER',
      duration: 12,
      totalFees: 85000,
      description: 'Demo course — replace with real batch',
      updatedAt: now,
    } as never,
  })

  // ── Enrollments ──
  for (const course of [c12, cDrop]) {
    await prisma.enrollments.upsert({
      where: { id: D(`enr_${course.id}`) },
      update: { status: 'ACTIVE' },
      create: {
        id: D(`enr_${course.id}`),
        userId: student.id,
        courseId: course.id,
        status: 'ACTIVE',
        totalFees: 75000,
        updatedAt: now,
      } as never,
    })
  }

  // ── Live classes: 2 upcoming + 1 past-with-recording ──
  const sessions = [
    {
      id: D('sess_up1'),
      t: 'Genetics — Molecular Basis of Inheritance',
      at: days(0.2),
      status: 'SCHEDULED',
    },
    {
      id: D('sess_up2'),
      t: 'Human Reproduction — Gametogenesis',
      at: days(1.2),
      status: 'SCHEDULED',
    },
    {
      id: D('sess_past'),
      t: 'Ecology — Organisms & Populations (recorded)',
      at: days(-2),
      status: 'COMPLETED',
    },
  ]
  for (const s of sessions) {
    const end = new Date(s.at.getTime() + 90 * 60000)
    await prisma.class_sessions.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        courseId: c12.id,
        teacherId: teacher.id,
        title: s.t,
        scheduledDate: s.at,
        startTime: s.at,
        endTime: end,
        duration: 90,
        status: s.status,
        meetingLink: s.status === 'SCHEDULED' ? 'https://zoom.us/j/demo123456' : null,
        recordingUrl: s.status === 'COMPLETED' ? 'https://example.com/demo-recording' : null,
        updatedAt: now,
      } as never,
    })
  }

  // ── Materials: 2 PDFs (one course-wide, one personally assigned) ──
  const mats = [
    {
      id: D('mat_ncert'),
      title: 'NCERT Class 12 — Genetics Notes (Demo)',
      course: c12.id,
      access: 'ENROLLED',
    },
    {
      id: D('mat_personal'),
      title: 'Personal Improvement Plan — Aarav (Demo)',
      course: null,
      access: 'RESTRICTED',
    },
  ]
  for (const m of mats) {
    await prisma.study_materials.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        title: m.title,
        materialType: 'PDF',
        fileUrl: 'https://example.com/demo.pdf',
        fileName: 'demo.pdf',
        fileSize: 245_000,
        uploadedBy: teacher.id,
        courseId: m.course,
        accessLevel: m.access,
        isPublished: true,
        publishedAt: now,
        tags: ['demo-seed'],
        updatedAt: now,
      } as never,
    })
  }
  await prisma.material_access.upsert({
    where: { id: D('ma_personal') },
    update: {},
    create: {
      id: D('ma_personal'),
      userId: student.id,
      materialId: D('mat_personal'),
      grantedBy: 'demo-seed-admin',
    } as never,
  })

  // ── Homework: published assignment + GRADED submission with feedback ──
  await prisma.assignments.upsert({
    where: { id: D('asg1') },
    update: {},
    create: {
      id: D('asg1'),
      teacherId: teacher.id,
      courseId: c12.id,
      title: 'Genetics Problem Set — Mendelian Ratios',
      description: 'Solve Q1–Q15 from the worksheet. Show Punnett squares.',
      maxMarks: 30,
      dueDate: days(3),
      status: 'PUBLISHED',
      attachments: [],
      updatedAt: now,
    } as never,
  })
  await prisma.assignment_submissions.upsert({
    where: { id: D('sub1') },
    update: {},
    create: {
      id: D('sub1'),
      assignmentId: D('asg1'),
      studentId: student.id,
      status: 'GRADED',
      grade: 26,
      feedback:
        'Excellent Punnett work, Aarav! Revise incomplete dominance (Q11–12) — mixing up genotype ratios. 26/30. — Dr. Priya',
      submittedAt: days(-1),
      gradedAt: days(-0.5),
      updatedAt: now,
    } as never,
  })

  // ── Practice-test history (gradebook / snapshot data) ──
  const attempts = [
    { id: D('att1'), t: 'Genetics Chapter Test', score: 72, total: 100, pct: 72, at: days(-6) },
    { id: D('att2'), t: 'Ecology Full Test', score: 81, total: 100, pct: 81, at: days(-3) },
    { id: D('att3'), t: 'Human Physiology Mock', score: 88, total: 100, pct: 88, at: days(-1) },
  ]
  for (const a of attempts) {
    await prisma.test_attempts.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        freeUserId: student.id,
        title: a.t,
        topics: ['demo-seed'],
        questionCount: 25,
        score: a.score,
        totalMarks: a.total,
        percentage: a.pct,
        timeSpent: 1800,
        status: 'COMPLETED',
        createdAt: a.at,
        updatedAt: a.at,
      } as never,
    })
  }

  console.log('✅ Demo student seeded:')
  console.log('   student:', student.email, `(id ${student.id})`)
  console.log('   2 courses, 2 enrollments, 3 classes (1 recorded), 2 PDFs (1 personal),')
  console.log('   1 graded assignment w/ teacher feedback, 3 test attempts.')
  console.log('   All rows prefixed demo_ / tagged demo-seed for later cleanup.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
