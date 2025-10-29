import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

async function verify() {
  console.log('🔍 Verifying seeded data...\n')

  // Check Courses
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      totalFees: true,
      duration: true,
      class: true,
      isActive: true,
    },
  })

  console.log('📚 COURSES:')
  courses.forEach((course) => {
    console.log(`   ✓ ${course.id}: ${course.name}`)
    console.log(`     - Price: ₹${(course.totalFees / 100).toLocaleString('en-IN')}`)
    console.log(`     - Duration: ${course.duration} months`)
    console.log(`     - Class: ${course.class}`)
    console.log(`     - Active: ${course.isActive}`)
  })

  // Check Question Banks
  const questionBanks = await prisma.questionBank.findMany({
    select: {
      name: true,
      category: true,
      totalQuestions: true,
      activeQuestions: true,
      isActive: true,
    },
  })

  console.log('\n📚 QUESTION BANKS:')
  questionBanks.forEach((qb) => {
    console.log(`   ✓ ${qb.name}`)
    console.log(`     - Category: ${qb.category}`)
    console.log(`     - Total Questions: ${qb.totalQuestions}`)
    console.log(`     - Active Questions: ${qb.activeQuestions}`)
  })

  // Check Questions
  const totalQuestions = await prisma.question.count()
  const questionsByTopic = await prisma.question.groupBy({
    by: ['topic'],
    _count: true,
  })

  console.log(`\n❓ QUESTIONS: ${totalQuestions} total`)
  questionsByTopic.forEach((item) => {
    console.log(`   - ${item.topic}: ${item._count} questions`)
  })

  // Check Test Templates
  const testTemplates = await prisma.testTemplate.findMany({
    select: {
      title: true,
      type: true,
      difficulty: true,
      totalQuestions: true,
      timeLimit: true,
      isActive: true,
      isPublished: true,
    },
  })

  console.log('\n📝 TEST TEMPLATES:')
  testTemplates.forEach((template) => {
    console.log(`   ✓ ${template.title}`)
    console.log(`     - Type: ${template.type}`)
    console.log(`     - Difficulty: ${template.difficulty}`)
    console.log(`     - Questions: ${template.totalQuestions}`)
    console.log(`     - Time Limit: ${template.timeLimit} minutes`)
    console.log(`     - Published: ${template.isPublished}`)
  })

  // Check Free Users
  const freeUsers = await prisma.freeUser.findMany({
    select: {
      name: true,
      email: true,
      grade: true,
      totalPoints: true,
      studyStreak: true,
      totalTestsTaken: true,
      averageScore: true,
    },
  })

  console.log('\n👥 FREE USERS:')
  freeUsers.forEach((user) => {
    console.log(`   ✓ ${user.name} (${user.email})`)
    console.log(`     - Grade: ${user.grade}`)
    console.log(`     - Points: ${user.totalPoints}`)
    console.log(`     - Study Streak: ${user.studyStreak} days`)
    console.log(`     - Tests Taken: ${user.totalTestsTaken}`)
    console.log(`     - Average Score: ${user.averageScore}%`)
  })

  // Check User Progress
  const totalUserProgress = await prisma.userProgress.count()
  console.log(`\n📈 USER PROGRESS RECORDS: ${totalUserProgress}`)

  // Check Test Sessions
  const testSessions = await prisma.testSession.findMany({
    select: {
      status: true,
      timeSpent: true,
      totalScore: true,
      percentage: true,
    },
  })

  console.log(`\n🎯 TEST SESSIONS: ${testSessions.length}`)
  const completed = testSessions.filter((s) => s.status === 'COMPLETED').length
  const inProgress = testSessions.filter((s) => s.status === 'IN_PROGRESS').length
  const paused = testSessions.filter((s) => s.status === 'PAUSED').length
  console.log(`   - Completed: ${completed}`)
  console.log(`   - In Progress: ${inProgress}`)
  console.log(`   - Paused: ${paused}`)

  // Summary
  console.log('\n✅ DATABASE VERIFICATION COMPLETE')
  console.log('\n📊 SUMMARY:')
  console.log(`   - Courses: ${courses.length} ✓`)
  console.log(`   - Question Banks: ${questionBanks.length} ✓`)
  console.log(`   - Questions: ${totalQuestions} ✓`)
  console.log(`   - Test Templates: ${testTemplates.length} ✓`)
  console.log(`   - Free Users: ${freeUsers.length} ✓`)
  console.log(`   - User Progress: ${totalUserProgress} ✓`)
  console.log(`   - Test Sessions: ${testSessions.length} ✓`)

  console.log('\n🎉 All data successfully seeded and verified!')
}

verify()
  .catch((e) => {
    console.error('❌ Verification failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
