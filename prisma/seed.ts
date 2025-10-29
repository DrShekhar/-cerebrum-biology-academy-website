import { PrismaClient } from '@/generated/prisma'
import { neetBiologyQuestions } from './neet-questions-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (in development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Clearing existing data...')
    await prisma.userQuestionResponse.deleteMany()
    await prisma.testAnalytics.deleteMany()
    await prisma.testQuestion.deleteMany()
    await prisma.testSession.deleteMany()
    await prisma.testAttempt.deleteMany()
    await prisma.questionBankQuestion.deleteMany()
    await prisma.questionBank.deleteMany()
    await prisma.question.deleteMany()
    await prisma.testTemplate.deleteMany()
    await prisma.userProgress.deleteMany()
    await prisma.performanceReport.deleteMany()
    await prisma.freeUser.deleteMany()
    await prisma.enrollment.deleteMany()
    await prisma.course.deleteMany()
  }

  // Seed Courses (CRITICAL - Required for purchase flow)
  console.log('📚 Creating courses...')
  const class11Course = await prisma.course.create({
    data: {
      id: 'class-11',
      name: 'Class 11th Biology - Complete NEET Foundation',
      description:
        'Comprehensive preparation for NEET with expert faculty and structured curriculum',
      type: 'CLASS_11',
      class: 'CLASS_11',
      duration: 12, // months
      totalFees: 3500000, // ₹35,000 in paise (for full year)
      syllabus: JSON.stringify({
        modules: [
          'Diversity in Living World',
          'Structural Organization in Plants and Animals',
          'Cell Structure and Function',
          'Plant Physiology',
          'Human Physiology',
        ],
      }),
      features: JSON.stringify([
        'Access to all video lectures',
        'Live doubt solving sessions',
        'Weekly tests and assessments',
        'Study materials (PDF)',
        'Personalized study plan',
        'Complete test series',
        'Previous 10 years NEET papers',
      ]),
      isActive: true,
      sortOrder: 1,
    },
  })

  const class12Course = await prisma.course.create({
    data: {
      id: 'class-12',
      name: 'Class 12th Biology - Intensive NEET Preparation',
      description: 'Final year intensive coaching with focus on NEET exam pattern and strategy',
      type: 'CLASS_12',
      class: 'CLASS_12',
      duration: 12, // months
      totalFees: 5000000, // ₹50,000 in paise (for full year)
      syllabus: JSON.stringify({
        modules: [
          'Reproduction',
          'Genetics and Evolution',
          'Biology and Human Welfare',
          'Biotechnology and Its Applications',
          'Ecology and Environment',
        ],
      }),
      features: JSON.stringify([
        'Access to all video lectures',
        'Live doubt solving sessions',
        'Weekly mock tests',
        'Study materials (PDF)',
        'NEET crash course (FREE)',
        'Previous 15 years questions',
        'Exam strategy sessions',
        'Dedicated NEET mentor',
        'Complete Grand Test Series',
        'College admission guidance',
      ]),
      isActive: true,
      sortOrder: 2,
    },
  })

  const dropperCourse = await prisma.course.create({
    data: {
      id: 'neet-dropper',
      name: 'NEET Dropper Year Program',
      description:
        'Intensive 1-year crash course for NEET droppers. Complete syllabus revision with advanced problem-solving and exam strategy.',
      type: 'DROPPER',
      class: 'DROPPER',
      duration: 12, // months
      totalFees: 7200000, // ₹72,000 in paise (for full year - Pursuit tier pricing)
      syllabus: JSON.stringify({
        modules: [
          'Biology Quick Revision - Diversity of Living World',
          'Structural Organisation - Plant & Animal',
          'Cell Structure and Function - Intensive',
          'Plant Physiology - Advanced',
          'Human Physiology - Comprehensive',
          'Reproduction - Detailed Study',
          'Genetics and Evolution - Master Class',
          'Biology and Human Welfare',
          'Biotechnology - Applications',
          'Ecology and Environment - Current Issues',
          'NEET Pattern Analysis and Strategy',
          'Speed Enhancement and Accuracy',
          'Advanced Biology for High Scorers',
          'Memory Techniques and Mnemonics',
          'Final Revision and Problem Solving',
        ],
      }),
      features: JSON.stringify([
        'Complete syllabus quick revision',
        'Intensive daily mock tests',
        'Rank improvement tracking',
        'Speed and accuracy enhancement',
        'Time management masterclasses',
        'NEET previous years solved papers',
        'Advanced problem-solving techniques',
        'Personal NEET rank improvement strategy',
        'Individual weakness analysis',
        'Mock interview preparation for counseling',
      ]),
      isActive: true,
      sortOrder: 3,
    },
  })

  console.log(`   ✓ Created course: ${class11Course.name}`)
  console.log(`   ✓ Created course: ${class12Course.name}`)
  console.log(`   ✓ Created course: ${dropperCourse.name}`)

  // Seed Question Banks
  console.log('📚 Creating question banks...')
  const neetQuestionBank = await prisma.questionBank.create({
    data: {
      name: 'NEET Biology Previous Year Questions',
      description: 'Comprehensive collection of NEET Biology questions from 2020-2024',
      category: 'NEET_PREVIOUS_YEAR',
      curriculum: 'NEET',
      grade: 'CLASS_12',
      subject: 'biology',
      topics: JSON.stringify([
        'Cell Biology',
        'Genetics',
        'Plant Physiology',
        'Human Physiology',
        'Ecology',
      ]),
      isActive: true,
      isPublic: true,
      createdBy: 'system',
    },
  })

  const cbseQuestionBank = await prisma.questionBank.create({
    data: {
      name: 'CBSE Biology Board Questions',
      description: 'CBSE Biology board examination questions for Class 11 and 12',
      category: 'CBSE_BOARD',
      curriculum: 'CBSE',
      grade: 'CLASS_12',
      subject: 'biology',
      topics: JSON.stringify([
        'Diversity of Living Organisms',
        'Structural Organization',
        'Cell Structure',
        'Plant Physiology',
      ]),
      isActive: true,
      isPublic: true,
      createdBy: 'system',
    },
  })

  // Seed Questions from imported data
  console.log('❓ Creating sample questions...')
  const createdQuestions = []
  for (const questionData of neetBiologyQuestions) {
    const question = await prisma.question.create({
      data: {
        ...questionData,
        options: JSON.stringify(questionData.options),
        solutionSteps: JSON.stringify(questionData.solutionSteps),
        tags: JSON.stringify(questionData.tags),
        relatedConcepts: JSON.stringify(questionData.relatedConcepts),
        keywords: JSON.stringify(questionData.keywords),
      },
    })
    createdQuestions.push(question)
    console.log(`   ✓ Created question: ${question.question.substring(0, 50)}...`)
  }

  // Add questions to question banks
  console.log('🔗 Adding questions to question banks...')
  for (let i = 0; i < createdQuestions.length; i++) {
    const question = createdQuestions[i]
    const bankId = question.curriculum === 'NEET' ? neetQuestionBank.id : cbseQuestionBank.id

    await prisma.questionBankQuestion.create({
      data: {
        questionBankId: bankId,
        questionId: question.id,
        orderIndex: i + 1,
      },
    })
  }

  // Update question bank totals
  await prisma.questionBank.update({
    where: { id: neetQuestionBank.id },
    data: {
      totalQuestions: createdQuestions.filter((q) => q.curriculum === 'NEET').length,
      activeQuestions: createdQuestions.filter((q) => q.curriculum === 'NEET' && q.isActive).length,
    },
  })

  await prisma.questionBank.update({
    where: { id: cbseQuestionBank.id },
    data: {
      totalQuestions: createdQuestions.filter((q) => q.curriculum === 'CBSE').length,
      activeQuestions: createdQuestions.filter((q) => q.curriculum === 'CBSE' && q.isActive).length,
    },
  })

  // Seed Test Templates
  console.log('📝 Creating test templates...')
  const testTemplates = [
    {
      title: 'NEET Biology Full Test - Cell Biology & Genetics',
      description:
        'Comprehensive test covering cell biology fundamentals and genetic principles. Perfect for NEET 2024 preparation with detailed explanations.',
      slug: 'neet-biology-cell-biology-genetics',
      type: 'MOCK_TEST',
      category: 'TOPIC_WISE',
      difficulty: 'MEDIUM',
      timeLimit: 180, // 3 hours
      totalQuestions: 45,
      totalMarks: 180,
      passingMarks: 90,
      curriculum: 'NEET',
      grade: 'CLASS_12',
      subject: 'biology',
      topics: JSON.stringify(['Cell Biology', 'Molecular Biology', 'Genetics']),
      negativeMarking: true,
      markingScheme: JSON.stringify({
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      }),
      questionDistribution: JSON.stringify({
        'Cell Biology': 15,
        'Molecular Biology': 15,
        Genetics: 15,
      }),
      instructions: JSON.stringify([
        'Each question carries 4 marks',
        'There is negative marking of 1 mark for wrong answers',
        'You can mark questions for review',
        'Calculator is not allowed',
        'Keep your ID proof ready',
      ]),
      isAdaptive: false,
      isActive: true,
      isPremium: false,
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: 'Free NEET Biology Mock Test - Cell Biology & Genetics | Cerebrum Academy',
      seoDescription:
        'Take free NEET Biology practice test on Cell Biology & Genetics. 45 questions, detailed solutions, performance analysis. Improve your NEET 2024 score.',
      seoKeywords: JSON.stringify([
        'NEET biology mock test',
        'cell biology test',
        'genetics practice test',
        'free NEET test',
        'biology questions NEET',
      ]),
      createdBy: 'system',
    },
    {
      title: 'Plant Physiology Quick Test',
      description:
        'Quick 30-minute test focusing on plant physiology concepts. Test your knowledge of photosynthesis, respiration, and transport in plants.',
      slug: 'plant-physiology-quick-test',
      type: 'QUICK_TEST',
      category: 'TOPIC_WISE',
      difficulty: 'EASY',
      timeLimit: 30,
      totalQuestions: 15,
      totalMarks: 60,
      passingMarks: 36,
      curriculum: 'NEET',
      grade: 'CLASS_12',
      subject: 'botany',
      topics: JSON.stringify(['Plant Physiology', 'Photosynthesis', 'Transpiration']),
      negativeMarking: false,
      markingScheme: JSON.stringify({
        correct: 4,
        incorrect: 0,
        unattempted: 0,
      }),
      questionDistribution: JSON.stringify({
        'Plant Physiology': 15,
      }),
      instructions: JSON.stringify([
        'Quick 30-minute test',
        'Each question carries 4 marks',
        'No negative marking',
        'Focus on plant physiology concepts',
      ]),
      isAdaptive: false,
      isActive: true,
      isPremium: false,
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: 'Plant Physiology Mock Test | Free Botany Practice Test | NEET Preparation',
      seoDescription:
        'Free plant physiology practice test for NEET. 15 questions on photosynthesis, respiration, transport. Quick 30-minute test with instant results.',
      seoKeywords: JSON.stringify([
        'plant physiology test',
        'botany mock test',
        'photosynthesis questions',
        'NEET botany practice',
        'plant biology test',
      ]),
      createdBy: 'system',
    },
    {
      title: 'Adaptive Biology Assessment',
      description:
        'AI-powered adaptive test that adjusts difficulty based on your performance. Get personalized learning recommendations.',
      slug: 'adaptive-biology-assessment',
      type: 'ADAPTIVE_TEST',
      category: 'MIXED',
      difficulty: 'MEDIUM',
      timeLimit: 120,
      totalQuestions: 30,
      totalMarks: 120,
      passingMarks: 72,
      curriculum: 'NEET',
      grade: 'CLASS_12',
      subject: 'biology',
      topics: JSON.stringify([
        'Cell Biology',
        'Plant Physiology',
        'Human Physiology',
        'Genetics',
        'Ecology',
      ]),
      negativeMarking: true,
      markingScheme: JSON.stringify({
        correct: 4,
        incorrect: -1,
        unattempted: 0,
      }),
      questionDistribution: JSON.stringify({
        'Cell Biology': 6,
        'Plant Physiology': 6,
        'Human Physiology': 6,
        Genetics: 6,
        Ecology: 6,
      }),
      instructions: JSON.stringify([
        'Adaptive test - difficulty adjusts based on performance',
        'Each question carries 4 marks',
        'Negative marking of 1 mark for wrong answers',
        'Cannot skip questions or go back',
        'Focus on accuracy over speed',
      ]),
      isAdaptive: true,
      adaptiveSettings: JSON.stringify({
        startingLevel: 'MEDIUM',
        levelAdjustment: {
          correctIncrease: 0.2,
          incorrectDecrease: 0.3,
        },
        minLevel: 'EASY',
        maxLevel: 'EXPERT',
      }),
      isActive: true,
      isPremium: true,
      isPublished: true,
      publishedAt: new Date(),
      seoTitle: 'Adaptive Biology Test | AI-Powered NEET Assessment | Personalized Learning',
      seoDescription:
        'Take AI-powered adaptive biology test. Difficulty adjusts to your performance. Get personalized recommendations for NEET preparation.',
      seoKeywords: JSON.stringify([
        'adaptive biology test',
        'AI powered test',
        'personalized assessment',
        'NEET adaptive test',
        'smart biology test',
      ]),
      createdBy: 'system',
    },
  ]

  const createdTestTemplates = []
  for (const templateData of testTemplates) {
    const template = await prisma.testTemplate.create({ data: templateData })
    createdTestTemplates.push(template)
    console.log(`   ✓ Created test template: ${template.title}`)
  }

  // Link questions to test templates
  console.log('🔗 Linking questions to test templates...')
  for (const template of createdTestTemplates) {
    const templateTopics = JSON.parse(template.topics as string)
    const targetDifficulty = template.difficulty

    // Find questions matching template topics
    const matchingQuestions = createdQuestions.filter((q) =>
      templateTopics.some((topic: string) => q.topic.includes(topic) || topic.includes(q.topic))
    )

    // For the first template (Cell Biology & Genetics) - pick matching questions
    if (template.slug === 'neet-biology-cell-biology-genetics') {
      const cellBioQuestions = matchingQuestions.filter((q) => q.topic === 'Cell Biology')
      const geneticsQuestions = matchingQuestions.filter(
        (q) => q.topic === 'Genetics & Molecular Biology'
      )
      const selectedQuestions = [...cellBioQuestions, ...geneticsQuestions].slice(0, 15)

      for (const question of selectedQuestions) {
        await prisma.questionBankQuestion.updateMany({
          where: {
            questionId: question.id,
            questionBankId: neetQuestionBank.id,
          },
          data: {
            testTemplateId: template.id,
          },
        })
      }
      console.log(`   ✓ Linked ${selectedQuestions.length} questions to ${template.title}`)
    }

    // For the second template (Plant Physiology) - pick plant questions
    if (template.slug === 'plant-physiology-quick-test') {
      const plantQuestions = matchingQuestions.filter((q) => q.topic === 'Plant Physiology')
      const selectedQuestions = plantQuestions.slice(0, 15)

      for (const question of selectedQuestions) {
        await prisma.questionBankQuestion.updateMany({
          where: {
            questionId: question.id,
            questionBankId: neetQuestionBank.id,
          },
          data: {
            testTemplateId: template.id,
          },
        })
      }
      console.log(`   ✓ Linked ${selectedQuestions.length} questions to ${template.title}`)
    }

    // For the third template (Adaptive) - pick diverse questions
    if (template.slug === 'adaptive-biology-assessment') {
      const cellBioQ = matchingQuestions.filter((q) => q.topic === 'Cell Biology').slice(0, 6)
      const plantPhysioQ = matchingQuestions
        .filter((q) => q.topic === 'Plant Physiology')
        .slice(0, 6)
      const humanPhysioQ = matchingQuestions
        .filter((q) => q.topic === 'Human Physiology')
        .slice(0, 6)
      const geneticsQ = matchingQuestions
        .filter((q) => q.topic === 'Genetics & Molecular Biology')
        .slice(0, 6)
      const ecologyQ = matchingQuestions.filter((q) => q.topic === 'Ecology').slice(0, 6)

      const selectedQuestions = [
        ...cellBioQ,
        ...plantPhysioQ,
        ...humanPhysioQ,
        ...geneticsQ,
        ...ecologyQ,
      ]

      for (const question of selectedQuestions) {
        await prisma.questionBankQuestion.updateMany({
          where: {
            questionId: question.id,
            questionBankId: neetQuestionBank.id,
          },
          data: {
            testTemplateId: template.id,
          },
        })
      }
      console.log(`   ✓ Linked ${selectedQuestions.length} questions to ${template.title}`)
    }
  }

  // Seed Sample Free Users
  console.log('👥 Creating sample free users...')
  const freeUsers = [
    {
      email: 'student1@example.com',
      name: 'Aarav Sharma',
      grade: 'CLASS_12',
      curriculum: 'NEET',
      school: 'Delhi Public School',
      city: 'Delhi',
      totalPoints: 150,
      studyStreak: 7,
      lastActiveDate: new Date(),
      averageScore: 72.5,
      totalTestsTaken: 12,
      bestScore: 88.5,
      weakestTopics: JSON.stringify(['Molecular Biology', 'Genetics']),
      strongestTopics: JSON.stringify(['Plant Physiology', 'Cell Biology']),
      currentLevel: 3,
      preferences: JSON.stringify({
        studyTime: 'evening',
        notifications: true,
        difficulty: 'medium',
      }),
    },
    {
      email: 'student2@example.com',
      name: 'Priya Patel',
      grade: 'CLASS_12',
      curriculum: 'NEET',
      school: 'Kendriya Vidyalaya',
      city: 'Mumbai',
      totalPoints: 200,
      studyStreak: 15,
      lastActiveDate: new Date(),
      averageScore: 78.2,
      totalTestsTaken: 18,
      bestScore: 92.0,
      weakestTopics: JSON.stringify(['Human Physiology']),
      strongestTopics: JSON.stringify(['Cell Biology', 'Genetics', 'Plant Physiology']),
      currentLevel: 4,
      preferences: JSON.stringify({
        studyTime: 'morning',
        notifications: true,
        difficulty: 'hard',
      }),
    },
    {
      email: 'student3@example.com',
      name: 'Rohit Kumar',
      grade: 'DROPPER',
      curriculum: 'NEET',
      school: 'Former Student - Kota Coaching',
      city: 'Kota',
      totalPoints: 350,
      studyStreak: 25,
      lastActiveDate: new Date(),
      averageScore: 85.7,
      totalTestsTaken: 35,
      bestScore: 95.5,
      weakestTopics: JSON.stringify(['Ecology']),
      strongestTopics: JSON.stringify([
        'Cell Biology',
        'Molecular Biology',
        'Human Physiology',
        'Plant Physiology',
      ]),
      currentLevel: 6,
      preferences: JSON.stringify({
        studyTime: 'all_day',
        notifications: true,
        difficulty: 'expert',
      }),
    },
  ]

  const createdFreeUsers = []
  for (const userData of freeUsers) {
    const user = await prisma.freeUser.create({ data: userData })
    createdFreeUsers.push(user)
    console.log(`   ✓ Created free user: ${user.name}`)
  }

  // Seed User Progress Data
  console.log('📈 Creating user progress data...')
  const topics = [
    'Cell Biology',
    'Molecular Biology',
    'Genetics',
    'Plant Physiology',
    'Human Physiology',
    'Ecology',
  ]

  for (const user of createdFreeUsers) {
    for (const topic of topics) {
      const accuracy = 50 + Math.random() * 40 // 50-90% accuracy
      const totalQuestions = Math.floor(20 + Math.random() * 50) // 20-70 questions
      const correctAnswers = Math.floor(totalQuestions * (accuracy / 100))

      await prisma.userProgress.create({
        data: {
          freeUserId: user.id,
          topic,
          curriculum: user.curriculum || 'NEET',
          grade: user.grade || 'CLASS_12',
          totalQuestions,
          correctAnswers,
          accuracy,
          averageTime: Math.floor(60 + Math.random() * 120), // 60-180 seconds per question
          improvementRate: Math.random() * 20 - 10, // -10% to +10% improvement
          currentLevel: ['EASY', 'MEDIUM', 'HARD'][Math.floor(Math.random() * 3)] as any,
          masteryScore: accuracy,
          recommendedNext: JSON.stringify([`Advanced ${topic}`, `${topic} Applications`]),
          weakAreas: accuracy < 70 ? JSON.stringify([`${topic} Fundamentals`]) : null,
          strongAreas: accuracy > 80 ? JSON.stringify([`${topic} Concepts`]) : null,
          lastPracticed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Within last week
        },
      })
    }
  }

  // Create some sample test sessions
  console.log('🎯 Creating sample test sessions...')
  for (let i = 0; i < 5; i++) {
    const user = createdFreeUsers[Math.floor(Math.random() * createdFreeUsers.length)]
    const template = createdTestTemplates[Math.floor(Math.random() * createdTestTemplates.length)]

    await prisma.testSession.create({
      data: {
        freeUserId: user.id,
        testTemplateId: template.id,
        sessionToken: `session_${Date.now()}_${i}`,
        status: ['COMPLETED', 'IN_PROGRESS', 'PAUSED'][Math.floor(Math.random() * 3)] as any,
        startedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        timeSpent: Math.floor(300 + Math.random() * 1800), // 5-35 minutes
        currentQuestionIndex: Math.floor(Math.random() * template.totalQuestions),
        questionsAnswered: Math.floor(Math.random() * template.totalQuestions),
        totalScore: Math.floor(template.totalMarks * (0.4 + Math.random() * 0.5)), // 40-90% score
        percentage: 40 + Math.random() * 50,
        browserInfo: JSON.stringify({
          browser: 'Chrome',
          os: 'Windows',
          screenSize: '1920x1080',
        }),
        ipAddress: '192.168.1.100',
        tabSwitchCount: Math.floor(Math.random() * 3),
        fullscreenExits: Math.floor(Math.random() * 2),
      },
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log(`
📊 Seeding Summary:
   - Courses: 3 (class-11, class-12, neet-dropper)
   - Question Banks: 2
   - Questions: ${createdQuestions.length}
   - Test Templates: ${createdTestTemplates.length}
   - Free Users: ${createdFreeUsers.length}
   - User Progress Records: ${createdFreeUsers.length * topics.length}
   - Test Sessions: 5

💰 Course Pricing (Full Year):
   - Class 11: ₹35,000
   - Class 12: ₹50,000
   - NEET Dropper: ₹72,000
  `)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
