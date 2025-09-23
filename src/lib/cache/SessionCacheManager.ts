/**
 * Session Cache Manager - Real-time Session State Management
 * Handles student sessions, activity tracking, and real-time collaboration
 */

import { DistributedCacheManager } from './DistributedCacheManager'
import { EventEmitter } from 'events'

interface StudentSession {
  studentId: string
  sessionId: string
  startTime: Date
  lastActivity: Date
  currentCourse?: string
  currentLesson?: string
  deviceInfo: {
    type: 'web' | 'mobile' | 'tablet'
    platform: string
    userAgent: string
    ipAddress: string
  }
  studyMetrics: {
    questionsAnswered: number
    correctAnswers: number
    timeSpent: number
    topicsVisited: string[]
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  }
  preferences: {
    language: 'english' | 'hindi' | 'hinglish'
    notificationsEnabled: boolean
    studyMode: 'focused' | 'relaxed' | 'exam_prep'
  }
  location?: {
    country: string
    state: string
    city: string
    timezone: string
  }
}

interface ActivityEvent {
  eventId: string
  studentId: string
  sessionId: string
  eventType: 'page_view' | 'question_attempt' | 'video_watch' | 'note_create' | 'quiz_complete'
  timestamp: Date
  data: Record<string, any>
  duration?: number
}

interface StudyGroup {
  groupId: string
  name: string
  members: string[]
  currentTopic?: string
  createdBy: string
  createdAt: Date
  isActive: boolean
  settings: {
    maxMembers: number
    privacy: 'public' | 'private' | 'invite_only'
    allowChat: boolean
    allowScreenShare: boolean
  }
}

interface RealTimeUpdate {
  type: 'session_start' | 'session_end' | 'activity' | 'achievement' | 'group_join' | 'group_leave'
  studentId: string
  data: any
  timestamp: Date
}

export class SessionCacheManager extends EventEmitter {
  private cacheManager: DistributedCacheManager
  private sessionTTL: number = 24 * 60 * 60 // 24 hours
  private activityTTL: number = 7 * 24 * 60 * 60 // 7 days
  private activeSessionsKey = 'active_sessions'
  private studyGroupsKey = 'study_groups'

  constructor(cacheManager: DistributedCacheManager) {
    super()
    this.cacheManager = cacheManager
    this.initializeEventHandlers()
  }

  private initializeEventHandlers(): void {
    // Clean up expired sessions periodically
    setInterval(
      async () => {
        await this.cleanupExpiredSessions()
      },
      5 * 60 * 1000
    ) // Every 5 minutes
  }

  /**
   * Create new student session
   */
  async createSession(
    studentId: string,
    deviceInfo: StudentSession['deviceInfo']
  ): Promise<string> {
    const sessionId = this.generateSessionId()
    const session: StudentSession = {
      studentId,
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      deviceInfo,
      studyMetrics: {
        questionsAnswered: 0,
        correctAnswers: 0,
        timeSpent: 0,
        topicsVisited: [],
        difficultyLevel: 'intermediate',
      },
      preferences: {
        language: 'english',
        notificationsEnabled: true,
        studyMode: 'focused',
      },
    }

    // Store session
    const sessionKey = this.getSessionKey(sessionId)
    await this.cacheManager.set(sessionKey, session, this.sessionTTL)

    // Add to active sessions
    await this.addToActiveSessions(studentId, sessionId)

    // Emit event
    this.emit('session_created', { studentId, sessionId, timestamp: new Date() })

    console.log(`📱 Created session ${sessionId} for student ${studentId}`)
    return sessionId
  }

  /**
   * Get student session
   */
  async getSession(sessionId: string): Promise<StudentSession | null> {
    const sessionKey = this.getSessionKey(sessionId)
    return await this.cacheManager.get<StudentSession>(sessionKey)
  }

  /**
   * Update session activity
   */
  async updateSessionActivity(
    sessionId: string,
    activityData: Partial<StudentSession['studyMetrics']>
  ): Promise<boolean> {
    const session = await this.getSession(sessionId)
    if (!session) return false

    // Update last activity time
    session.lastActivity = new Date()

    // Update study metrics
    if (activityData.questionsAnswered !== undefined) {
      session.studyMetrics.questionsAnswered += activityData.questionsAnswered
    }
    if (activityData.correctAnswers !== undefined) {
      session.studyMetrics.correctAnswers += activityData.correctAnswers
    }
    if (activityData.timeSpent !== undefined) {
      session.studyMetrics.timeSpent += activityData.timeSpent
    }
    if (activityData.topicsVisited) {
      const newTopics = activityData.topicsVisited.filter(
        (topic) => !session.studyMetrics.topicsVisited.includes(topic)
      )
      session.studyMetrics.topicsVisited.push(...newTopics)
    }

    // Save updated session
    const sessionKey = this.getSessionKey(sessionId)
    await this.cacheManager.set(sessionKey, session, this.sessionTTL)

    return true
  }

  /**
   * Track activity event
   */
  async trackActivity(
    activityEvent: Omit<ActivityEvent, 'eventId' | 'timestamp'>
  ): Promise<string> {
    const eventId = this.generateEventId()
    const event: ActivityEvent = {
      ...activityEvent,
      eventId,
      timestamp: new Date(),
    }

    // Store activity event
    const eventKey = this.getActivityKey(eventId)
    await this.cacheManager.set(eventKey, event, this.activityTTL)

    // Add to student's activity timeline
    const timelineKey = this.getStudentTimelineKey(activityEvent.studentId)
    await this.cacheManager.addToSortedSet(timelineKey, Date.now(), eventId, this.activityTTL)

    // Update session metrics
    await this.updateSessionFromActivity(activityEvent.sessionId, event)

    // Emit real-time update
    this.emit('activity_tracked', {
      type: 'activity',
      studentId: activityEvent.studentId,
      data: event,
      timestamp: new Date(),
    })

    return eventId
  }

  /**
   * Get student's recent activities
   */
  async getStudentActivities(studentId: string, limit: number = 50): Promise<ActivityEvent[]> {
    const timelineKey = this.getStudentTimelineKey(studentId)
    const eventIds = await this.cacheManager.getSortedSetRange(timelineKey, 0, limit - 1, false)

    if (!Array.isArray(eventIds) || eventIds.length === 0) {
      return []
    }

    // Get activity details
    const eventKeys = eventIds.map((id) => this.getActivityKey(id as string))
    const activities = await this.cacheManager.mget<ActivityEvent>(eventKeys)

    const result: ActivityEvent[] = []
    for (const [key, activity] of activities) {
      if (activity) {
        result.push(activity)
      }
    }

    return result.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  /**
   * Get active sessions for a student
   */
  async getActiveSessionsForStudent(studentId: string): Promise<StudentSession[]> {
    const activeSessionsKey = this.getActiveSessionsKey(studentId)
    const sessionIds = await this.cacheManager.get<string[]>(activeSessionsKey)

    if (!sessionIds || sessionIds.length === 0) {
      return []
    }

    const sessionKeys = sessionIds.map((id) => this.getSessionKey(id))
    const sessions = await this.cacheManager.mget<StudentSession>(sessionKeys)

    const activeSessions: StudentSession[] = []
    for (const [key, session] of sessions) {
      if (session && this.isSessionActive(session)) {
        activeSessions.push(session)
      }
    }

    return activeSessions
  }

  /**
   * End session
   */
  async endSession(sessionId: string): Promise<boolean> {
    const session = await this.getSession(sessionId)
    if (!session) return false

    // Remove from active sessions
    await this.removeFromActiveSessions(session.studentId, sessionId)

    // Archive session data (keep for analytics)
    const archivedSessionKey = this.getArchivedSessionKey(sessionId)
    await this.cacheManager.set(
      archivedSessionKey,
      {
        ...session,
        endTime: new Date(),
        totalDuration: Date.now() - session.startTime.getTime(),
      },
      this.activityTTL
    )

    // Remove from active storage
    const sessionKey = this.getSessionKey(sessionId)
    await this.cacheManager.delete(sessionKey)

    // Emit event
    this.emit('session_ended', {
      type: 'session_end',
      studentId: session.studentId,
      data: { sessionId, duration: Date.now() - session.startTime.getTime() },
      timestamp: new Date(),
    })

    console.log(`📱 Ended session ${sessionId} for student ${session.studentId}`)
    return true
  }

  /**
   * Create study group
   */
  async createStudyGroup(
    groupData: Omit<StudyGroup, 'groupId' | 'createdAt' | 'isActive'>
  ): Promise<string> {
    const groupId = this.generateGroupId()
    const studyGroup: StudyGroup = {
      ...groupData,
      groupId,
      createdAt: new Date(),
      isActive: true,
    }

    // Store study group
    const groupKey = this.getStudyGroupKey(groupId)
    await this.cacheManager.set(groupKey, studyGroup, this.activityTTL)

    // Add to groups index
    const groupsIndexKey = this.getStudyGroupsIndexKey()
    await this.cacheManager.addToSortedSet(groupsIndexKey, Date.now(), groupId, this.activityTTL)

    // Add group to each member's groups list
    for (const memberId of studyGroup.members) {
      const memberGroupsKey = this.getStudentGroupsKey(memberId)
      await this.cacheManager.addToSortedSet(memberGroupsKey, Date.now(), groupId, this.activityTTL)
    }

    console.log(`👥 Created study group ${groupId} with ${studyGroup.members.length} members`)
    return groupId
  }

  /**
   * Join study group
   */
  async joinStudyGroup(groupId: string, studentId: string): Promise<boolean> {
    const group = await this.getStudyGroup(groupId)
    if (!group || !group.isActive) return false

    // Check if already a member
    if (group.members.includes(studentId)) return true

    // Check member limit
    if (group.members.length >= group.settings.maxMembers) return false

    // Add member
    group.members.push(studentId)

    // Update group
    const groupKey = this.getStudyGroupKey(groupId)
    await this.cacheManager.set(groupKey, group, this.activityTTL)

    // Add to student's groups
    const memberGroupsKey = this.getStudentGroupsKey(studentId)
    await this.cacheManager.addToSortedSet(memberGroupsKey, Date.now(), groupId, this.activityTTL)

    // Emit event
    this.emit('group_member_joined', {
      type: 'group_join',
      studentId,
      data: { groupId, groupName: group.name },
      timestamp: new Date(),
    })

    return true
  }

  /**
   * Get study group
   */
  async getStudyGroup(groupId: string): Promise<StudyGroup | null> {
    const groupKey = this.getStudyGroupKey(groupId)
    return await this.cacheManager.get<StudyGroup>(groupKey)
  }

  /**
   * Get student's study groups
   */
  async getStudentGroups(studentId: string): Promise<StudyGroup[]> {
    const memberGroupsKey = this.getStudentGroupsKey(studentId)
    const groupIds = await this.cacheManager.getSortedSetRange(memberGroupsKey, 0, -1, false)

    if (!Array.isArray(groupIds) || groupIds.length === 0) {
      return []
    }

    const groupKeys = groupIds.map((id) => this.getStudyGroupKey(id as string))
    const groups = await this.cacheManager.mget<StudyGroup>(groupKeys)

    const result: StudyGroup[] = []
    for (const [key, group] of groups) {
      if (group && group.isActive) {
        result.push(group)
      }
    }

    return result
  }

  /**
   * Get real-time session statistics
   */
  async getSessionStatistics(): Promise<{
    totalActiveSessions: number
    studentsByDevice: Record<string, number>
    averageSessionDuration: number
    topActiveStudents: Array<{
      studentId: string
      sessionCount: number
      totalTime: number
    }>
  }> {
    // This would aggregate data from all active sessions
    // Implementation would depend on your specific analytics needs

    return {
      totalActiveSessions: 0,
      studentsByDevice: {},
      averageSessionDuration: 0,
      topActiveStudents: [],
    }
  }

  /**
   * Clean up expired sessions
   */
  private async cleanupExpiredSessions(): Promise<void> {
    // Implementation would scan for expired sessions and clean them up
    console.log('🧹 Cleaning up expired sessions...')
  }

  // Private helper methods

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateGroupId(): string {
    return `grp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getSessionKey(sessionId: string): string {
    return this.cacheManager.generateKey('session', sessionId)
  }

  private getActivityKey(eventId: string): string {
    return this.cacheManager.generateKey('analytics', `activity:${eventId}`)
  }

  private getStudentTimelineKey(studentId: string): string {
    return this.cacheManager.generateKey('student', `${studentId}:timeline`)
  }

  private getActiveSessionsKey(studentId: string): string {
    return this.cacheManager.generateKey('student', `${studentId}:sessions`)
  }

  private getArchivedSessionKey(sessionId: string): string {
    return this.cacheManager.generateKey('analytics', `archived_session:${sessionId}`)
  }

  private getStudyGroupKey(groupId: string): string {
    return this.cacheManager.generateKey('session', `group:${groupId}`)
  }

  private getStudyGroupsIndexKey(): string {
    return this.cacheManager.generateKey('session', 'groups_index')
  }

  private getStudentGroupsKey(studentId: string): string {
    return this.cacheManager.generateKey('student', `${studentId}:groups`)
  }

  private async addToActiveSessions(studentId: string, sessionId: string): Promise<void> {
    const activeSessionsKey = this.getActiveSessionsKey(studentId)
    const existingSessions = (await this.cacheManager.get<string[]>(activeSessionsKey)) || []

    existingSessions.push(sessionId)
    await this.cacheManager.set(activeSessionsKey, existingSessions, this.sessionTTL)
  }

  private async removeFromActiveSessions(studentId: string, sessionId: string): Promise<void> {
    const activeSessionsKey = this.getActiveSessionsKey(studentId)
    const existingSessions = (await this.cacheManager.get<string[]>(activeSessionsKey)) || []

    const updatedSessions = existingSessions.filter((id) => id !== sessionId)
    await this.cacheManager.set(activeSessionsKey, updatedSessions, this.sessionTTL)
  }

  private isSessionActive(session: StudentSession): boolean {
    const now = Date.now()
    const lastActivity = session.lastActivity.getTime()
    const maxInactivity = 30 * 60 * 1000 // 30 minutes

    return now - lastActivity < maxInactivity
  }

  private async updateSessionFromActivity(sessionId: string, event: ActivityEvent): Promise<void> {
    const session = await this.getSession(sessionId)
    if (!session) return

    // Update based on activity type
    switch (event.eventType) {
      case 'question_attempt':
        session.studyMetrics.questionsAnswered++
        if (event.data.correct) {
          session.studyMetrics.correctAnswers++
        }
        break

      case 'video_watch':
        session.studyMetrics.timeSpent += event.duration || 0
        break

      case 'page_view':
        if (event.data.topic && !session.studyMetrics.topicsVisited.includes(event.data.topic)) {
          session.studyMetrics.topicsVisited.push(event.data.topic)
        }
        break
    }

    session.lastActivity = new Date()

    // Save updated session
    const sessionKey = this.getSessionKey(sessionId)
    await this.cacheManager.set(sessionKey, session, this.sessionTTL)
  }
}
