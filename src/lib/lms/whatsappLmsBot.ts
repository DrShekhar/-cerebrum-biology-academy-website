/**
 * WhatsApp LMS Bot Service
 *
 * Handles WhatsApp interactions for LMS features:
 * - Course browsing and navigation
 * - Progress tracking
 * - Video link delivery
 * - Study reminders
 * - Doubt resolution integration
 */

import { prisma } from '@/lib/prisma'
import { LmsWhatsAppState } from '@/generated/prisma'
import { sendWhatsAppMessage } from '@/lib/interakt'

interface BotMessage {
  text: string
  buttons?: Array<{ id: string; title: string }>
  list?: {
    title: string
    sections: Array<{
      title: string
      rows: Array<{ id: string; title: string; description?: string }>
    }>
  }
}

interface MessageContext {
  phone: string
  userId: string
  messageText: string
  buttonId?: string
  listRowId?: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cerebrumbiologyacademy.com'

/**
 * Get or create LMS WhatsApp session for user
 */
async function getSession(userId: string, phone: string) {
  let session = await prisma.lms_whatsapp_sessions.findUnique({
    where: { userId },
  })

  if (!session) {
    session = await prisma.lms_whatsapp_sessions.create({
      data: {
        userId,
        phone,
        currentState: 'MAIN_MENU',
      },
    })
  }

  return session
}

/**
 * Update session state
 */
async function updateSessionState(
  userId: string,
  state: LmsWhatsAppState,
  contextData?: Record<string, unknown>
) {
  const session = await prisma.lms_whatsapp_sessions.findUnique({
    where: { userId },
    select: { currentState: true },
  })

  await prisma.lms_whatsapp_sessions.update({
    where: { userId },
    data: {
      previousState: session?.currentState,
      currentState: state,
      contextData: contextData,
      lastInteractionAt: new Date(),
      totalInteractions: { increment: 1 },
    },
  })
}

/**
 * Process incoming message and return response
 */
export async function processLmsMessage(context: MessageContext): Promise<BotMessage | null> {
  const { phone, userId, messageText, buttonId, listRowId } = context

  const session = await getSession(userId, phone)
  const input = buttonId || listRowId || messageText.toLowerCase().trim()

  // Handle navigation commands
  if (['menu', 'home', 'start', 'hi', 'hello'].includes(input)) {
    return handleMainMenu(userId)
  }

  if (['back', 'wapas'].includes(input)) {
    return handleBack(userId)
  }

  // Handle state-specific inputs
  switch (session.currentState) {
    case 'MAIN_MENU':
      return handleMainMenuInput(userId, input)

    case 'MY_COURSES':
      return handleMyCoursesInput(userId, input, session.contextData as Record<string, unknown>)

    case 'COURSE_DETAIL':
      return handleCourseDetailInput(userId, input, session.contextData as Record<string, unknown>)

    case 'CHAPTER_LIST':
      return handleChapterListInput(userId, input, session.contextData as Record<string, unknown>)

    case 'VIDEO_LIST':
      return handleVideoListInput(userId, input, session.contextData as Record<string, unknown>)

    case 'VIDEO_DETAIL':
      return handleVideoDetailInput(userId, input, session.contextData as Record<string, unknown>)

    case 'MY_PROGRESS':
      return handleProgressInput(userId, input)

    case 'CONTINUE_WATCHING':
      return handleContinueWatching(userId, input)

    case 'HELP':
      return handleHelpInput(userId, input)

    default:
      return handleMainMenu(userId)
  }
}

/**
 * Main menu handler
 */
async function handleMainMenu(userId: string): Promise<BotMessage> {
  await updateSessionState(userId, 'MAIN_MENU')

  // Get user stats
  const stats = await getUserStats(userId)

  return {
    text: `🎓 *Cerebrum Biology Academy LMS*

Welcome! Here's your learning dashboard:

📚 Enrolled Courses: ${stats.enrolledCourses}
📊 Overall Progress: ${stats.overallProgress}%
🎬 Videos Watched: ${stats.videosWatched}

What would you like to do?`,
    buttons: [
      { id: 'my_courses', title: '📚 My Courses' },
      { id: 'continue', title: '▶️ Continue' },
      { id: 'progress', title: '📊 My Progress' },
    ],
  }
}

async function handleMainMenuInput(userId: string, input: string): Promise<BotMessage> {
  switch (input) {
    case 'my_courses':
    case 'courses':
    case 'my courses':
      return handleMyCourses(userId)

    case 'continue':
    case 'continue watching':
      return handleContinueWatching(userId, '')

    case 'progress':
    case 'my progress':
      return handleMyProgress(userId)

    case 'help':
    case 'support':
      return handleHelp(userId)

    default:
      return {
        text: `I didn't understand that. Please select an option or type "menu" to see the main menu.`,
        buttons: [
          { id: 'my_courses', title: '📚 My Courses' },
          { id: 'help', title: '❓ Help' },
        ],
      }
  }
}

/**
 * My Courses list
 */
async function handleMyCourses(userId: string): Promise<BotMessage> {
  const enrollments = await prisma.enrollments.findMany({
    where: { userId, status: 'ACTIVE' },
    include: {
      courses: {
        select: { id: true, name: true, description: true },
      },
    },
    orderBy: { lastAccessDate: 'desc' },
    take: 10,
  })

  if (enrollments.length === 0) {
    return {
      text: `📚 *My Courses*

You don't have any active courses yet.

Visit ${SITE_URL}/courses to explore and enroll in courses.`,
      buttons: [{ id: 'menu', title: '🏠 Main Menu' }],
    }
  }

  await updateSessionState(userId, 'MY_COURSES', {
    courses: enrollments.map((e) => ({
      id: e.courseId,
      name: e.courses.name,
    })),
  })

  const courseList = enrollments
    .map((e, i) => `${i + 1}. ${e.courses.name} (${e.currentProgress}%)`)
    .join('\n')

  return {
    text: `📚 *My Courses*

${courseList}

Reply with the course number to view details, or type "menu" for main menu.`,
    buttons: [
      { id: 'back', title: '⬅️ Back' },
      { id: 'menu', title: '🏠 Main Menu' },
    ],
  }
}

async function handleMyCoursesInput(
  userId: string,
  input: string,
  context: Record<string, unknown>
): Promise<BotMessage> {
  const courses = (context?.courses as Array<{ id: string; name: string }>) || []

  // Check if input is a course number
  const courseIndex = parseInt(input) - 1
  if (!isNaN(courseIndex) && courseIndex >= 0 && courseIndex < courses.length) {
    return handleCourseDetail(userId, courses[courseIndex].id)
  }

  return handleMainMenu(userId)
}

/**
 * Course detail view
 */
async function handleCourseDetail(userId: string, courseId: string): Promise<BotMessage> {
  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' },
        take: 10,
      },
    },
  })

  if (!course) {
    return handleMainMenu(userId)
  }

  const enrollment = await prisma.enrollments.findFirst({
    where: { userId, courseId },
  })

  await updateSessionState(userId, 'COURSE_DETAIL', {
    courseId,
    courseName: course.name,
  })

  await prisma.lms_whatsapp_sessions.update({
    where: { userId },
    data: { lastCourseId: courseId },
  })

  const chapterList = course.chapters.map((c, i) => `${i + 1}. ${c.title}`).join('\n')

  return {
    text: `📖 *${course.name}*

${course.description || ''}

📊 Your Progress: ${enrollment?.currentProgress || 0}%

*Chapters:*
${chapterList}

Reply with chapter number to view videos.`,
    buttons: [
      { id: 'continue_course', title: '▶️ Continue' },
      { id: 'back', title: '⬅️ Back' },
    ],
  }
}

async function handleCourseDetailInput(
  userId: string,
  input: string,
  context: Record<string, unknown>
): Promise<BotMessage> {
  const courseId = context?.courseId as string

  if (input === 'continue_course') {
    // Find last watched video and continue
    const lastProgress = await prisma.video_progress.findFirst({
      where: {
        userId,
        videoLecture: {
          studyMaterial: { courseId },
        },
        isCompleted: false,
      },
      orderBy: { lastWatchedAt: 'desc' },
      include: {
        videoLecture: true,
      },
    })

    if (lastProgress) {
      return handleVideoDetail(userId, lastProgress.videoLectureId)
    }
  }

  // Check if input is a chapter number
  const course = await prisma.courses.findUnique({
    where: { id: courseId },
    include: {
      chapters: {
        where: { isActive: true },
        orderBy: { orderIndex: 'asc' },
      },
    },
  })

  const chapterIndex = parseInt(input) - 1
  if (
    course &&
    !isNaN(chapterIndex) &&
    chapterIndex >= 0 &&
    chapterIndex < course.chapters.length
  ) {
    return handleChapterList(userId, course.chapters[chapterIndex].id)
  }

  return handleCourseDetail(userId, courseId)
}

/**
 * Chapter videos list
 */
async function handleChapterList(userId: string, chapterId: string): Promise<BotMessage> {
  const chapter = await prisma.chapters.findUnique({
    where: { id: chapterId },
    include: {
      courses: { select: { name: true, id: true } },
      study_materials: {
        where: { materialType: 'VIDEO', isPublished: true },
        include: {
          video_lecture: {
            select: {
              id: true,
              title: true,
              duration: true,
              progress: {
                where: { userId },
                select: { completionPercent: true, isCompleted: true },
              },
            },
          },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!chapter) {
    return handleMainMenu(userId)
  }

  await updateSessionState(userId, 'CHAPTER_LIST', {
    chapterId,
    courseId: chapter.courseId,
  })

  await prisma.lms_whatsapp_sessions.update({
    where: { userId },
    data: { lastChapterId: chapterId },
  })

  const videos = chapter.study_materials
    .filter((m) => m.video_lecture)
    .map((m, i) => {
      const progress = m.video_lecture?.progress[0]
      const status = progress?.isCompleted ? '✅' : progress?.completionPercent > 0 ? '🔄' : '⬜'
      const duration = m.video_lecture?.duration
        ? `(${Math.floor(m.video_lecture.duration / 60)}min)`
        : ''
      return `${status} ${i + 1}. ${m.video_lecture?.title || m.title} ${duration}`
    })
    .join('\n')

  return {
    text: `📹 *${chapter.title}*
_${chapter.courses.name}_

${videos || 'No videos available yet.'}

✅ = Completed | 🔄 = In Progress | ⬜ = Not Started

Reply with video number to watch.`,
    buttons: [
      { id: 'back', title: '⬅️ Back' },
      { id: 'menu', title: '🏠 Main Menu' },
    ],
  }
}

async function handleChapterListInput(
  userId: string,
  input: string,
  context: Record<string, unknown>
): Promise<BotMessage> {
  const chapterId = context?.chapterId as string

  const chapter = await prisma.chapters.findUnique({
    where: { id: chapterId },
    include: {
      study_materials: {
        where: { materialType: 'VIDEO', isPublished: true },
        include: { video_lecture: true },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  const videoIndex = parseInt(input) - 1
  const videos = chapter?.study_materials.filter((m) => m.video_lecture) || []

  if (!isNaN(videoIndex) && videoIndex >= 0 && videoIndex < videos.length) {
    const video = videos[videoIndex].video_lecture
    if (video) {
      return handleVideoDetail(userId, video.id)
    }
  }

  if (context?.courseId) {
    return handleCourseDetail(userId, context.courseId as string)
  }

  return handleMainMenu(userId)
}

/**
 * Handle video list input (alias for chapter list input)
 */
async function handleVideoListInput(
  userId: string,
  input: string,
  context: Record<string, unknown>
): Promise<BotMessage> {
  // VIDEO_LIST state uses same logic as CHAPTER_LIST
  return handleChapterListInput(userId, input, context)
}

/**
 * Video detail and playback link
 */
async function handleVideoDetail(userId: string, videoLectureId: string): Promise<BotMessage> {
  const video = await prisma.video_lectures.findUnique({
    where: { id: videoLectureId },
    include: {
      studyMaterial: {
        include: {
          chapters: true,
          courses: true,
        },
      },
      progress: {
        where: { userId },
      },
      chapters: {
        orderBy: { orderIndex: 'asc' },
        take: 5,
      },
    },
  })

  if (!video) {
    return handleMainMenu(userId)
  }

  await updateSessionState(userId, 'VIDEO_DETAIL', {
    videoId: videoLectureId,
    chapterId: video.studyMaterial?.chapterId,
    courseId: video.studyMaterial?.courseId,
  })

  await prisma.lms_whatsapp_sessions.update({
    where: { userId },
    data: { lastVideoId: videoLectureId },
  })

  const progress = video.progress[0]
  const duration = Math.floor(video.duration / 60)
  const progressText = progress
    ? `Progress: ${Math.round(Number(progress.completionPercent))}% (${Math.floor(progress.lastPosition / 60)}/${duration} min)`
    : 'Not started'

  const chaptersText =
    video.chapters.length > 0
      ? `\n*Topics:*\n${video.chapters.map((c) => `• ${c.title} (${Math.floor(c.startTime / 60)}:${String(c.startTime % 60).padStart(2, '0')})`).join('\n')}`
      : ''

  const playUrl = `${SITE_URL}/lms/watch/${videoLectureId}`

  return {
    text: `🎬 *${video.title}*

${video.description || ''}

⏱️ Duration: ${duration} minutes
📊 ${progressText}
${chaptersText}

▶️ Watch now: ${playUrl}`,
    buttons: [
      { id: 'open_video', title: '▶️ Open Video' },
      { id: 'back', title: '⬅️ Back' },
    ],
  }
}

async function handleVideoDetailInput(
  userId: string,
  input: string,
  context: Record<string, unknown>
): Promise<BotMessage> {
  if (input === 'open_video' && context?.videoId) {
    // Return the video URL
    return {
      text: `▶️ Open this link to watch:\n${SITE_URL}/lms/watch/${context.videoId}`,
      buttons: [
        { id: 'back', title: '⬅️ Back' },
        { id: 'menu', title: '🏠 Main Menu' },
      ],
    }
  }

  if (context?.chapterId) {
    return handleChapterList(userId, context.chapterId as string)
  }

  return handleMainMenu(userId)
}

/**
 * Continue watching - show last video
 */
async function handleContinueWatching(userId: string, _input: string): Promise<BotMessage> {
  await updateSessionState(userId, 'CONTINUE_WATCHING')

  const lastProgress = await prisma.video_progress.findFirst({
    where: {
      userId,
      isCompleted: false,
    },
    orderBy: { lastWatchedAt: 'desc' },
    include: {
      videoLecture: {
        include: {
          studyMaterial: {
            include: {
              courses: { select: { name: true } },
              chapters: { select: { title: true } },
            },
          },
        },
      },
    },
  })

  if (!lastProgress) {
    return {
      text: `▶️ *Continue Watching*

You don't have any videos in progress. Start watching a course!`,
      buttons: [
        { id: 'my_courses', title: '📚 My Courses' },
        { id: 'menu', title: '🏠 Main Menu' },
      ],
    }
  }

  const video = lastProgress.videoLecture
  const resumePosition = Math.floor(lastProgress.lastPosition / 60)

  return {
    text: `▶️ *Continue Watching*

📖 ${video.studyMaterial?.courses?.name || 'Course'}
📑 ${video.studyMaterial?.chapters?.title || 'Chapter'}
🎬 ${video.title}

📊 Progress: ${Math.round(Number(lastProgress.completionPercent))}%
⏱️ Resume at: ${resumePosition} minutes

${SITE_URL}/lms/watch/${video.id}`,
    buttons: [
      { id: 'open_video', title: '▶️ Resume Video' },
      { id: 'my_courses', title: '📚 My Courses' },
    ],
  }
}

/**
 * My Progress overview
 */
async function handleMyProgress(userId: string): Promise<BotMessage> {
  await updateSessionState(userId, 'MY_PROGRESS')

  const stats = await getUserStats(userId)
  const recentProgress = await prisma.video_progress.findMany({
    where: { userId },
    orderBy: { lastWatchedAt: 'desc' },
    take: 5,
    include: {
      videoLecture: {
        select: { title: true },
      },
    },
  })

  const recentText =
    recentProgress.length > 0
      ? `\n*Recent Activity:*\n${recentProgress.map((p) => `• ${p.videoLecture.title} - ${Math.round(Number(p.completionPercent))}%`).join('\n')}`
      : ''

  return {
    text: `📊 *My Learning Progress*

📚 Enrolled Courses: ${stats.enrolledCourses}
✅ Completed Videos: ${stats.completedVideos}
🎬 Total Videos Watched: ${stats.videosWatched}
⏱️ Total Watch Time: ${Math.floor(stats.totalWatchTime / 60)} hours
📈 Overall Progress: ${stats.overallProgress}%
${recentText}`,
    buttons: [
      { id: 'my_courses', title: '📚 My Courses' },
      { id: 'menu', title: '🏠 Main Menu' },
    ],
  }
}

async function handleProgressInput(userId: string, input: string): Promise<BotMessage> {
  if (input === 'my_courses') {
    return handleMyCourses(userId)
  }
  return handleMainMenu(userId)
}

/**
 * Help menu
 */
async function handleHelp(userId: string): Promise<BotMessage> {
  await updateSessionState(userId, 'HELP')

  return {
    text: `❓ *Help & Support*

*Commands:*
• "menu" - Go to main menu
• "back" - Go back
• "courses" - View my courses
• "progress" - View my progress
• "help" - Show this help

*Navigation:*
Reply with numbers to select options from lists.

*Need more help?*
Contact us: support@cerebrumbiologyacademy.com
WhatsApp: +91 88264 44334`,
    buttons: [
      { id: 'menu', title: '🏠 Main Menu' },
      { id: 'contact', title: '📞 Contact Support' },
    ],
  }
}

async function handleHelpInput(userId: string, input: string): Promise<BotMessage> {
  if (input === 'contact') {
    return {
      text: `📞 *Contact Support*

Email: support@cerebrumbiologyacademy.com
WhatsApp: +91 88264 44334
Website: ${SITE_URL}/support

Our team will respond within 24 hours.`,
      buttons: [{ id: 'menu', title: '🏠 Main Menu' }],
    }
  }
  return handleMainMenu(userId)
}

/**
 * Handle back navigation
 */
async function handleBack(userId: string): Promise<BotMessage> {
  const session = await prisma.lms_whatsapp_sessions.findUnique({
    where: { userId },
    select: { previousState: true, lastCourseId: true, lastChapterId: true },
  })

  if (!session?.previousState) {
    return handleMainMenu(userId)
  }

  switch (session.previousState) {
    case 'MAIN_MENU':
      return handleMainMenu(userId)

    case 'MY_COURSES':
      return handleMyCourses(userId)

    case 'COURSE_DETAIL':
      if (session.lastCourseId) {
        return handleCourseDetail(userId, session.lastCourseId)
      }
      return handleMyCourses(userId)

    case 'CHAPTER_LIST':
      if (session.lastChapterId) {
        return handleChapterList(userId, session.lastChapterId)
      }
      return handleMyCourses(userId)

    default:
      return handleMainMenu(userId)
  }
}

/**
 * Get user statistics
 */
async function getUserStats(userId: string) {
  const enrollments = await prisma.enrollments.count({
    where: { userId, status: 'ACTIVE' },
  })

  const videoProgress = await prisma.video_progress.findMany({
    where: { userId },
    select: {
      isCompleted: true,
      watchedSeconds: true,
      completionPercent: true,
    },
  })

  const completedVideos = videoProgress.filter((p) => p.isCompleted).length
  const totalWatchTime = videoProgress.reduce((sum, p) => sum + p.watchedSeconds, 0)
  const avgProgress =
    videoProgress.length > 0
      ? Math.round(
          videoProgress.reduce((sum, p) => sum + Number(p.completionPercent), 0) /
            videoProgress.length
        )
      : 0

  return {
    enrolledCourses: enrollments,
    videosWatched: videoProgress.length,
    completedVideos,
    totalWatchTime,
    overallProgress: avgProgress,
  }
}

/**
 * Send study reminder notification
 */
export async function sendStudyReminder(userId: string): Promise<void> {
  const session = await prisma.lms_whatsapp_sessions.findUnique({
    where: { userId },
  })

  if (!session || !session.notificationsEnabled) return

  const lastProgress = await prisma.video_progress.findFirst({
    where: { userId, isCompleted: false },
    orderBy: { lastWatchedAt: 'desc' },
    include: {
      videoLecture: {
        select: { title: true },
      },
    },
  })

  if (!lastProgress) return

  const message = `📚 *Study Reminder*

Hey! You were watching "${lastProgress.videoLecture.title}" and you're ${Math.round(Number(lastProgress.completionPercent))}% done.

Continue where you left off: ${SITE_URL}/lms/watch/${lastProgress.videoLectureId}

Reply "menu" to access your dashboard.`

  await sendWhatsAppMessage({
    phone: session.phone,
    message,
  })

  // Log notification
  await prisma.lms_progress_notifications.create({
    data: {
      userId,
      notificationType: 'COURSE_REMINDER',
      title: 'Study Reminder',
      message,
      videoLectureId: lastProgress.videoLectureId,
      sentVia: ['whatsapp'],
      sentAt: new Date(),
    },
  })
}

/**
 * Send progress milestone notification
 */
export async function sendProgressMilestone(
  userId: string,
  milestone: number,
  courseName: string
): Promise<void> {
  const session = await prisma.lms_whatsapp_sessions.findUnique({
    where: { userId },
  })

  if (!session || !session.notificationsEnabled) return

  const emojis: Record<number, string> = {
    25: '🌟',
    50: '⭐',
    75: '🔥',
    100: '🎉',
  }

  const message = `${emojis[milestone] || '📊'} *Progress Milestone!*

Congratulations! You've completed ${milestone}% of "${courseName}"!

${milestone === 100 ? 'You can now get your certificate!' : 'Keep up the great work!'}

Reply "menu" to see your courses.`

  await sendWhatsAppMessage({
    phone: session.phone,
    message,
  })

  await prisma.lms_progress_notifications.create({
    data: {
      userId,
      notificationType: 'PROGRESS_MILESTONE',
      title: `${milestone}% Milestone`,
      message,
      sentVia: ['whatsapp'],
      sentAt: new Date(),
    },
  })
}

export const whatsappLmsBot = {
  processLmsMessage,
  sendStudyReminder,
  sendProgressMilestone,
}
