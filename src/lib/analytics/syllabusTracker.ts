import { prisma } from '@/lib/prisma'

/**
 * Syllabus Tracking Utilities
 * Tracks curriculum completion, mastered topics, and learning progress
 */

/**
 * Result interface for syllabus completion
 */
export interface SyllabusCompletionResult {
  totalTopics: number
  completedTopics: number
  inProgressTopics: number
  unstartedTopics: number
  completionPercentage: number
  curriculum: string
  grade: string
  subject: string
  categoryBreakdown: {
    mastered: number
    needsPractice: number
    notStarted: number
  }
}

/**
 * Result interface for topic status
 */
export interface TopicStatus {
  topic: string
  subtopic?: string
  status: 'mastered' | 'in_progress' | 'not_started'
  masteryScore: number
  accuracy: number
  questionsAttempted: number
  lastPracticed: Date | null
  recommendedAction: string
}

/**
 * Result interface for chapter progress
 */
export interface ChapterProgress {
  chapter: string
  totalTopics: number
  completedTopics: number
  completionPercentage: number
  averageAccuracy: number
  topics: TopicStatus[]
}

/**
 * Calculate syllabus completion for a user
 * Shows overall progress across curriculum topics
 *
 * @param userId - User or FreeUser ID
 * @param curriculum - Curriculum type (NEET, CBSE, etc.)
 * @param grade - Grade level (CLASS_11, CLASS_12, etc.)
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Syllabus completion result
 */
export async function calculateSyllabusCompletion(
  userId: string,
  curriculum: string = 'NEET',
  grade: string = 'CLASS_12',
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<SyllabusCompletionResult> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get all topics for this curriculum and grade
    const allTopics = await prisma.questions.findMany({
      where: {
        curriculum,
        grade,
        isActive: true,
      },
      select: {
        topic: true,
        subtopic: true,
      },
      distinct: ['topic', 'subtopic'],
    })

    const uniqueTopics = new Set<string>(
      allTopics.map((q) => (q.subtopic ? `${q.topic}:${q.subtopic}` : q.topic))
    )
    const totalTopics = uniqueTopics.size

    // Get user's progress on these topics
    const userProgress = await prisma.user_progress.findMany({
      where: {
        [userField]: userId,
        curriculum,
        grade,
      },
      select: {
        topic: true,
        subtopic: true,
        masteryScore: true,
        totalQuestions: true,
        accuracy: true,
      },
    })

    // Categorize topics
    let completedTopics = 0
    let inProgressTopics = 0
    let unstartedTopics = 0
    let mastered = 0
    let needsPractice = 0

    const progressMap = new Map<string, any>()
    for (const progress of userProgress) {
      const key = progress.subtopic ? `${progress.topic}:${progress.subtopic}` : progress.topic
      progressMap.set(key, progress)
    }

    for (const topicKey of Array.from(uniqueTopics)) {
      const progress = progressMap.get(topicKey) as any

      if (!progress) {
        unstartedTopics++
      } else if (progress.masteryScore >= 70) {
        completedTopics++
        mastered++
      } else if (progress.totalQuestions > 0) {
        inProgressTopics++
        needsPractice++
      } else {
        unstartedTopics++
      }
    }

    const completionPercentage =
      totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100 * 10) / 10 : 0

    return {
      totalTopics,
      completedTopics,
      inProgressTopics,
      unstartedTopics,
      completionPercentage,
      curriculum,
      grade,
      subject: 'Biology',
      categoryBreakdown: {
        mastered,
        needsPractice,
        notStarted: unstartedTopics,
      },
    }
  } catch (error) {
    console.error('Error calculating syllabus completion:', error)
    throw new Error('Failed to calculate syllabus completion')
  }
}

/**
 * Get mastered topics (topics with masteryScore >= 70)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param curriculum - Optional: Filter by curriculum
 * @param grade - Optional: Filter by grade
 * @returns Array of mastered topics
 */
export async function getMasteredTopics(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  curriculum?: string,
  grade?: string
): Promise<TopicStatus[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    const whereClause: any = {
      [userField]: userId,
      masteryScore: { gte: 70 },
    }

    if (curriculum) whereClause.curriculum = curriculum
    if (grade) whereClause.grade = grade

    const masteredProgress = await prisma.user_progress.findMany({
      where: whereClause,
      select: {
        topic: true,
        subtopic: true,
        masteryScore: true,
        accuracy: true,
        totalQuestions: true,
        lastPracticed: true,
      },
      orderBy: {
        masteryScore: 'desc',
      },
    })

    return masteredProgress.map((progress) => ({
      topic: progress.topic,
      subtopic: progress.subtopic || undefined,
      status: 'mastered' as const,
      masteryScore: progress.masteryScore,
      accuracy: progress.accuracy,
      questionsAttempted: progress.totalQuestions,
      lastPracticed: progress.lastPracticed,
      recommendedAction: 'Maintain proficiency with periodic revision',
    }))
  } catch (error) {
    console.error('Error getting mastered topics:', error)
    throw new Error('Failed to get mastered topics')
  }
}

/**
 * Get in-progress topics (topics with some attempts but not mastered)
 *
 * @param userId - User or FreeUser ID
 * @param userType - Type of user ('user' or 'freeUser')
 * @param curriculum - Optional: Filter by curriculum
 * @param grade - Optional: Filter by grade
 * @returns Array of in-progress topics
 */
export async function getInProgressTopics(
  userId: string,
  userType: 'user' | 'freeUser' = 'freeUser',
  curriculum?: string,
  grade?: string
): Promise<TopicStatus[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    const whereClause: any = {
      [userField]: userId,
      masteryScore: { lt: 70 },
      totalQuestions: { gt: 0 },
    }

    if (curriculum) whereClause.curriculum = curriculum
    if (grade) whereClause.grade = grade

    const inProgressData = await prisma.user_progress.findMany({
      where: whereClause,
      select: {
        topic: true,
        subtopic: true,
        masteryScore: true,
        accuracy: true,
        totalQuestions: true,
        lastPracticed: true,
      },
      orderBy: {
        lastPracticed: 'desc',
      },
    })

    return inProgressData.map((progress) => {
      let recommendedAction = 'Continue practicing to improve mastery'

      if (progress.accuracy < 50) {
        recommendedAction = 'Focus on understanding fundamentals'
      } else if (progress.accuracy < 70) {
        recommendedAction = 'Practice more questions to build consistency'
      } else if (progress.masteryScore >= 60) {
        recommendedAction = 'Almost mastered! A few more questions will help'
      }

      return {
        topic: progress.topic,
        subtopic: progress.subtopic || undefined,
        status: 'in_progress' as const,
        masteryScore: progress.masteryScore,
        accuracy: progress.accuracy,
        questionsAttempted: progress.totalQuestions,
        lastPracticed: progress.lastPracticed,
        recommendedAction,
      }
    })
  } catch (error) {
    console.error('Error getting in-progress topics:', error)
    throw new Error('Failed to get in-progress topics')
  }
}

/**
 * Get unstarted topics (topics never attempted)
 *
 * @param userId - User or FreeUser ID
 * @param curriculum - Curriculum type (NEET, CBSE, etc.)
 * @param grade - Grade level (CLASS_11, CLASS_12, etc.)
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Array of unstarted topics
 */
export async function getUnstartedTopics(
  userId: string,
  curriculum: string = 'NEET',
  grade: string = 'CLASS_12',
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<TopicStatus[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // Get all available topics
    const allTopics = await prisma.questions.findMany({
      where: {
        curriculum,
        grade,
        isActive: true,
      },
      select: {
        topic: true,
        subtopic: true,
        difficulty: true,
      },
      distinct: ['topic', 'subtopic'],
    })

    // Get user's started topics
    const startedProgress = await prisma.user_progress.findMany({
      where: {
        [userField]: userId,
        curriculum,
        grade,
      },
      select: {
        topic: true,
        subtopic: true,
      },
    })

    const startedSet = new Set(
      startedProgress.map((p) => (p.subtopic ? `${p.topic}:${p.subtopic}` : p.topic))
    )

    // Filter unstarted topics
    const unstartedTopics: TopicStatus[] = []
    const topicMap = new Map<string, { topic: string; subtopic?: string }>()

    for (const question of allTopics) {
      const key = question.subtopic ? `${question.topic}:${question.subtopic}` : question.topic

      if (!startedSet.has(key) && !topicMap.has(key)) {
        topicMap.set(key, {
          topic: question.topic,
          subtopic: question.subtopic || undefined,
        })

        unstartedTopics.push({
          topic: question.topic,
          subtopic: question.subtopic || undefined,
          status: 'not_started',
          masteryScore: 0,
          accuracy: 0,
          questionsAttempted: 0,
          lastPracticed: null,
          recommendedAction: 'Start with basic questions to build foundation',
        })
      }
    }

    return unstartedTopics
  } catch (error) {
    console.error('Error getting unstarted topics:', error)
    throw new Error('Failed to get unstarted topics')
  }
}

/**
 * Get chapter-wise progress breakdown
 *
 * @param userId - User or FreeUser ID
 * @param curriculum - Curriculum type (NEET, CBSE, etc.)
 * @param grade - Grade level (CLASS_11, CLASS_12, etc.)
 * @param userType - Type of user ('user' or 'freeUser')
 * @returns Array of chapter progress data
 */
export async function getChapterWiseProgress(
  userId: string,
  curriculum: string = 'NEET',
  grade: string = 'CLASS_12',
  userType: 'user' | 'freeUser' = 'freeUser'
): Promise<ChapterProgress[]> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'

    // NEET Biology chapters (you can customize this based on your curriculum)
    const chapters = [
      'Cell Biology',
      'Genetics and Evolution',
      'Plant Physiology',
      'Human Physiology',
      'Ecology and Environment',
      'Biotechnology',
      'Diversity in Living World',
      'Structural Organization',
      'Reproduction',
      'Molecular Basis of Inheritance',
    ]

    // Batch query 1: Get all distinct topics across all chapters in one query
    const allTopics = await prisma.questions.findMany({
      where: {
        curriculum,
        grade,
        isActive: true,
        OR: chapters.map(chapter => ({ topic: { contains: chapter } })),
      },
      select: {
        topic: true,
        subtopic: true,
      },
      distinct: ['topic', 'subtopic'],
    })

    // Batch query 2: Get all user progress in one query
    const allProgress = await prisma.user_progress.findMany({
      where: {
        [userField]: userId,
        curriculum,
        grade,
      },
    })

    // Index progress by topic+subtopic for O(1) lookup
    const progressMap = new Map<string, typeof allProgress[0]>()
    for (const p of allProgress) {
      progressMap.set(`${p.topic}||${p.subtopic || ''}`, p)
    }

    // Group topics by chapter in memory
    const chapterProgressArray: ChapterProgress[] = []

    for (const chapter of chapters) {
      const chapterTopics = allTopics.filter(t => t.topic.includes(chapter))

      if (chapterTopics.length === 0) continue

      const totalTopics = chapterTopics.length
      const topicStatuses: TopicStatus[] = []
      let completedTopics = 0
      let totalAccuracy = 0
      let topicsWithProgress = 0

      for (const topicData of chapterTopics) {
        const progress = progressMap.get(`${topicData.topic}||${topicData.subtopic || ''}`)

        if (progress) {
          topicsWithProgress++
          totalAccuracy += progress.accuracy

          if (progress.masteryScore >= 70) {
            completedTopics++
          }

          topicStatuses.push({
            topic: progress.topic,
            subtopic: progress.subtopic || undefined,
            status:
              progress.masteryScore >= 70
                ? 'mastered'
                : progress.totalQuestions > 0
                  ? 'in_progress'
                  : 'not_started',
            masteryScore: progress.masteryScore,
            accuracy: progress.accuracy,
            questionsAttempted: progress.totalQuestions,
            lastPracticed: progress.lastPracticed,
            recommendedAction: getRecommendedAction(progress.masteryScore, progress.accuracy),
          })
        } else {
          topicStatuses.push({
            topic: topicData.topic,
            subtopic: topicData.subtopic || undefined,
            status: 'not_started',
            masteryScore: 0,
            accuracy: 0,
            questionsAttempted: 0,
            lastPracticed: null,
            recommendedAction: 'Start practicing this topic',
          })
        }
      }

      const completionPercentage =
        totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100 * 10) / 10 : 0

      const averageAccuracy =
        topicsWithProgress > 0 ? Math.round((totalAccuracy / topicsWithProgress) * 10) / 10 : 0

      chapterProgressArray.push({
        chapter,
        totalTopics,
        completedTopics,
        completionPercentage,
        averageAccuracy,
        topics: topicStatuses,
      })
    }

    // Sort by completion percentage (ascending) to show chapters needing attention first
    return chapterProgressArray.sort((a, b) => a.completionPercentage - b.completionPercentage)
  } catch (error) {
    console.error('Error getting chapter-wise progress:', error)
    throw new Error('Failed to get chapter-wise progress')
  }
}

/**
 * Get recommended study plan based on syllabus completion
 *
 * @param userId - User or FreeUser ID
 * @param curriculum - Curriculum type (NEET, CBSE, etc.)
 * @param grade - Grade level (CLASS_11, CLASS_12, etc.)
 * @param userType - Type of user ('user' or 'freeUser')
 * @param targetDays - Days until exam (default: 30)
 * @returns Recommended study plan
 */
export async function getRecommendedStudyPlan(
  userId: string,
  curriculum: string = 'NEET',
  grade: string = 'CLASS_12',
  userType: 'user' | 'freeUser' = 'freeUser',
  targetDays: number = 30
): Promise<{
  dailyTopicsCount: number
  priorityTopics: string[]
  weakAreasToFocus: string[]
  revisionTopics: string[]
  estimatedHoursPerDay: number
  schedule: Array<{
    day: number
    topics: string[]
    estimatedHours: number
    focus: string
  }>
}> {
  try {
    const completion = await calculateSyllabusCompletion(userId, curriculum, grade, userType)
    const inProgress = await getInProgressTopics(userId, userType, curriculum, grade)
    const unstarted = await getUnstartedTopics(userId, curriculum, grade, userType)

    // Calculate daily topics needed
    const remainingTopics = completion.inProgressTopics + completion.unstartedTopics
    const dailyTopicsCount = Math.ceil(remainingTopics / targetDays)

    // Priority topics (weak areas that need immediate attention)
    const priorityTopics = inProgress
      .filter((t) => t.accuracy < 50)
      .slice(0, 5)
      .map((t) => t.topic)

    // Weak areas to focus
    const weakAreasToFocus = inProgress
      .filter((t) => t.accuracy < 70)
      .slice(0, 10)
      .map((t) => t.topic)

    // Revision topics (mastered topics that need periodic review)
    const mastered = await getMasteredTopics(userId, userType, curriculum, grade)
    const revisionTopics = mastered.slice(0, 5).map((t) => t.topic)

    // Estimate hours per day (assuming 30 minutes per topic + revision time)
    const estimatedHoursPerDay = Math.ceil(dailyTopicsCount * 0.5 + 1) // +1 for revision

    // Create a simple schedule
    const schedule = []
    const allTopicsToStudy = [
      ...priorityTopics,
      ...weakAreasToFocus.filter((t) => !priorityTopics.includes(t)),
      ...unstarted.slice(0, 10).map((t) => t.topic),
    ]

    for (let day = 1; day <= Math.min(targetDays, 14); day++) {
      const startIdx = (day - 1) * dailyTopicsCount
      const dayTopics = allTopicsToStudy.slice(startIdx, startIdx + dailyTopicsCount)

      let focus = 'New topics and practice'
      if (day % 7 === 0) {
        focus = 'Revision and mock test'
      } else if (day <= 7) {
        focus = 'Priority weak areas'
      } else if (day <= 14) {
        focus = 'Remaining syllabus completion'
      }

      schedule.push({
        day,
        topics: dayTopics,
        estimatedHours: estimatedHoursPerDay,
        focus,
      })
    }

    return {
      dailyTopicsCount,
      priorityTopics,
      weakAreasToFocus,
      revisionTopics,
      estimatedHoursPerDay,
      schedule,
    }
  } catch (error) {
    console.error('Error getting recommended study plan:', error)
    throw new Error('Failed to get recommended study plan')
  }
}

/**
 * Get syllabus completion timeline
 * Shows progress over time
 *
 * @param userId - User or FreeUser ID
 * @param curriculum - Curriculum type (NEET, CBSE, etc.)
 * @param grade - Grade level (CLASS_11, CLASS_12, etc.)
 * @param userType - Type of user ('user' or 'freeUser')
 * @param days - Number of days to look back (default: 30)
 * @returns Timeline of completion progress
 */
export async function getCompletionTimeline(
  userId: string,
  curriculum: string = 'NEET',
  grade: string = 'CLASS_12',
  userType: 'user' | 'freeUser' = 'freeUser',
  days: number = 30
): Promise<
  Array<{
    date: Date
    completionPercentage: number
    topicsCompleted: number
    newTopicsStarted: number
  }>
> {
  try {
    const userField = userType === 'user' ? 'userId' : 'freeUserId'
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Get all progress records with timestamps
    const progressHistory = await prisma.user_progress.findMany({
      where: {
        [userField]: userId,
        curriculum,
        grade,
        updatedAt: { gte: startDate },
      },
      select: {
        masteryScore: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    })

    // Group by date
    const timelineMap = new Map<
      string,
      {
        completedCount: number
        newStarted: number
      }
    >()

    for (const progress of progressHistory) {
      const dateKey = progress.updatedAt.toDateString()
      const existing = timelineMap.get(dateKey) || {
        completedCount: 0,
        newStarted: 0,
      }

      if (progress.masteryScore >= 70) {
        existing.completedCount++
      }

      // Check if this was newly started on this day
      const createdDate = progress.createdAt.toDateString()
      if (createdDate === dateKey) {
        existing.newStarted++
      }

      timelineMap.set(dateKey, existing)
    }

    // Calculate current completion for reference
    const currentCompletion = await calculateSyllabusCompletion(userId, curriculum, grade, userType)

    // Build timeline array
    const timeline = []
    let cumulativeCompleted = 0

    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - (days - i - 1))
      const dateKey = date.toDateString()

      const dayData = timelineMap.get(dateKey)
      if (dayData) {
        cumulativeCompleted += dayData.completedCount
      }

      const completionPercentage =
        currentCompletion.totalTopics > 0
          ? Math.round((cumulativeCompleted / currentCompletion.totalTopics) * 100 * 10) / 10
          : 0

      timeline.push({
        date,
        completionPercentage,
        topicsCompleted: cumulativeCompleted,
        newTopicsStarted: dayData?.newStarted || 0,
      })
    }

    return timeline
  } catch (error) {
    console.error('Error getting completion timeline:', error)
    throw new Error('Failed to get completion timeline')
  }
}

/**
 * Helper: Get recommended action based on mastery and accuracy
 */
function getRecommendedAction(masteryScore: number, accuracy: number): string {
  if (masteryScore >= 70) {
    return 'Maintain proficiency with periodic revision'
  } else if (masteryScore >= 50 && accuracy >= 70) {
    return 'Almost mastered! A few more questions will help'
  } else if (accuracy < 50) {
    return 'Focus on understanding fundamentals'
  } else if (accuracy < 70) {
    return 'Practice more questions to build consistency'
  } else {
    return 'Continue practicing to improve mastery'
  }
}
