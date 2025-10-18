/**
 * Session Manager for WhatsApp Bot
 * Tracks conversation context and user state
 *
 * Features:
 * - Session creation and retrieval
 * - Conversation context tracking (last 5 messages)
 * - Session timeout (30 minutes)
 * - Demo booking flow state management
 * - In-memory storage with cleanup (use Redis in production)
 */

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface StudentDetails {
  name?: string
  class?: string
  preferredTime?: string
  email?: string
}

export interface WhatsAppSession {
  userId: string
  phoneNumber: string
  studentName: string
  conversationContext: {
    messages: ConversationMessage[]
    currentFlow?: 'demo_booking' | 'support_escalation' | null
    studentDetails?: StudentDetails
  }
  createdAt: Date
  lastActivityAt: Date
}

export class SessionManager {
  private sessions: Map<string, WhatsAppSession>
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  private readonly MAX_CONTEXT_MESSAGES = 5

  constructor() {
    this.sessions = new Map()
    this.startCleanupTask()
  }

  /**
   * Get existing session or create new one
   */
  async getOrCreateSession(phoneNumber: string, studentName: string): Promise<WhatsAppSession> {
    let session = this.sessions.get(phoneNumber)

    if (session) {
      // Check if session has timed out
      const now = Date.now()
      if (now - session.lastActivityAt.getTime() > this.SESSION_TIMEOUT) {
        console.log(`⏰ Session timed out for ${phoneNumber}, creating new session`)
        session = this.createNewSession(phoneNumber, studentName)
      } else {
        // Update last activity time
        session.lastActivityAt = new Date()
      }
    } else {
      session = this.createNewSession(phoneNumber, studentName)
    }

    this.sessions.set(phoneNumber, session)
    return session
  }

  /**
   * Create new session
   */
  private createNewSession(phoneNumber: string, studentName: string): WhatsAppSession {
    const now = new Date()
    return {
      userId: `whatsapp_${phoneNumber}`,
      phoneNumber,
      studentName,
      conversationContext: {
        messages: [],
        currentFlow: null,
        studentDetails: {
          name: studentName,
        },
      },
      createdAt: now,
      lastActivityAt: now,
    }
  }

  /**
   * Add message to conversation context
   */
  async addToContext(phoneNumber: string, message: ConversationMessage): Promise<void> {
    const session = this.sessions.get(phoneNumber)

    if (session) {
      session.conversationContext.messages.push(message)

      // Keep only last N messages
      if (session.conversationContext.messages.length > this.MAX_CONTEXT_MESSAGES) {
        session.conversationContext.messages = session.conversationContext.messages.slice(
          -this.MAX_CONTEXT_MESSAGES
        )
      }

      session.lastActivityAt = new Date()
      this.sessions.set(phoneNumber, session)
    }
  }

  /**
   * Set current conversation flow
   */
  async setCurrentFlow(
    phoneNumber: string,
    flow: 'demo_booking' | 'support_escalation' | null
  ): Promise<void> {
    const session = this.sessions.get(phoneNumber)

    if (session) {
      session.conversationContext.currentFlow = flow
      session.lastActivityAt = new Date()
      this.sessions.set(phoneNumber, session)
    }
  }

  /**
   * Update student details in session
   */
  async updateStudentDetails(phoneNumber: string, details: Partial<StudentDetails>): Promise<void> {
    const session = this.sessions.get(phoneNumber)

    if (session) {
      session.conversationContext.studentDetails = {
        ...session.conversationContext.studentDetails,
        ...details,
      }
      session.lastActivityAt = new Date()
      this.sessions.set(phoneNumber, session)
    }
  }

  /**
   * Get student details from session
   */
  async getStudentDetails(phoneNumber: string): Promise<StudentDetails | undefined> {
    const session = this.sessions.get(phoneNumber)
    return session?.conversationContext.studentDetails
  }

  /**
   * Clear current flow (reset to normal conversation)
   */
  async clearCurrentFlow(phoneNumber: string): Promise<void> {
    await this.setCurrentFlow(phoneNumber, null)
  }

  /**
   * Get session
   */
  async getSession(phoneNumber: string): Promise<WhatsAppSession | null> {
    const session = this.sessions.get(phoneNumber)

    if (!session) {
      return null
    }

    // Check timeout
    const now = Date.now()
    if (now - session.lastActivityAt.getTime() > this.SESSION_TIMEOUT) {
      this.sessions.delete(phoneNumber)
      return null
    }

    return session
  }

  /**
   * Delete session
   */
  async deleteSession(phoneNumber: string): Promise<void> {
    this.sessions.delete(phoneNumber)
  }

  /**
   * Get active sessions count
   */
  getActiveSessionsCount(): number {
    return this.sessions.size
  }

  /**
   * Cleanup expired sessions (runs every 5 minutes)
   */
  private startCleanupTask(): void {
    setInterval(
      () => {
        const now = Date.now()
        let cleanedCount = 0

        this.sessions.forEach((session, phoneNumber) => {
          if (now - session.lastActivityAt.getTime() > this.SESSION_TIMEOUT) {
            this.sessions.delete(phoneNumber)
            cleanedCount++
          }
        })

        if (cleanedCount > 0) {
          console.log(`🧹 Cleaned up ${cleanedCount} expired sessions`)
        }
      },
      5 * 60 * 1000
    ) // Run every 5 minutes
  }

  /**
   * Get all sessions (for debugging/admin)
   */
  getAllSessions(): WhatsAppSession[] {
    return Array.from(this.sessions.values())
  }
}
