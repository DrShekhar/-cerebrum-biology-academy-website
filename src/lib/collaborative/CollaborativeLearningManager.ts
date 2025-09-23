/**
 * Real-Time Collaborative Learning Platform
 * Enables peer-to-peer biology learning with AI assistance
 */

import { WebSocketServer, WebSocket } from 'ws'
import Redis from 'ioredis'

interface StudyRoom {
  id: string
  name: string
  topic: string
  description: string
  maxParticipants: number
  currentParticipants: number
  participants: StudentProfile[]
  createdBy: string
  createdAt: Date
  isActive: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  sessionType: 'study_group' | 'question_solving' | 'diagram_review' | 'neet_prep'
}

interface StudentProfile {
  id: string
  name: string
  grade: string
  topics: string[]
  strengths: string[]
  weakAreas: string[]
  neetScore: number
  studyStreak: number
  preferredLanguage: 'english' | 'hindi' | 'hinglish'
  studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
}

interface CollaborativeSession {
  roomId: string
  participants: Map<string, StudentProfile>
  currentTopic: string
  sharedWhiteboard: WhiteboardState
  chatHistory: ChatMessage[]
  questionQueue: Question[]
  aiModerator: boolean
  startTime: Date
  duration: number
}

interface WhiteboardState {
  drawings: DrawingElement[]
  annotations: Annotation[]
  currentSlide: number
  slides: WhiteboardSlide[]
}

interface DrawingElement {
  id: string
  type: 'line' | 'rectangle' | 'circle' | 'arrow' | 'text' | 'diagram'
  coordinates: number[]
  style: {
    color: string
    thickness: number
    fillColor?: string
  }
  author: string
  timestamp: number
}

interface Annotation {
  id: string
  x: number
  y: number
  content: string
  author: string
  timestamp: number
  resolved: boolean
}

interface WhiteboardSlide {
  id: string
  title: string
  content: DrawingElement[]
  biologyConcept?: string
}

interface ChatMessage {
  id: string
  author: string
  content: string
  type: 'text' | 'question' | 'ai_response' | 'system'
  timestamp: number
  reactions: Map<string, string[]>
  replies: ChatMessage[]
  highlighted: boolean
}

interface Question {
  id: string
  student: string
  content: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  status: 'pending' | 'answered' | 'discussing'
  aiResponse?: string
  peerResponses: PeerResponse[]
  upvotes: number
  timestamp: number
}

interface PeerResponse {
  student: string
  content: string
  confidence: number
  helpful: boolean
  timestamp: number
}

interface StudyMatch {
  student1: StudentProfile
  student2: StudentProfile
  commonTopics: string[]
  compatibilityScore: number
  suggestedRoom: string
}

interface LearningAnalytics {
  studentId: string
  topicsStudied: string[]
  questionsAsked: number
  questionsAnswered: number
  helpfulnessRating: number
  studyTime: number
  collaborativeScore: number
  improvements: string[]
}

export class CollaborativeLearningManager {
  private wss: WebSocketServer
  private redis: Redis
  private studyRooms: Map<string, StudyRoom> = new Map()
  private activeSessions: Map<string, CollaborativeSession> = new Map()
  private studentConnections: Map<string, WebSocket> = new Map()
  private pendingMatches: Map<string, StudentProfile[]> = new Map()

  constructor(port: number = 8080, redisUrl?: string) {
    this.wss = new WebSocketServer({ port })
    this.redis = new Redis(redisUrl || process.env.REDIS_URL || 'redis://localhost:6379')

    this.setupWebSocketHandlers()
    this.startMatchmaking()
    this.initializeDefaultRooms()

    console.log(`🚀 Collaborative Learning Platform started on port ${port}`)
  }

  /**
   * Create a new study room
   */
  async createStudyRoom(roomData: Partial<StudyRoom>, creatorId: string): Promise<StudyRoom> {
    const room: StudyRoom = {
      id: `room_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      name: roomData.name || 'Study Room',
      topic: roomData.topic || 'General Biology',
      description: roomData.description || 'Biology study session',
      maxParticipants: roomData.maxParticipants || 8,
      currentParticipants: 0,
      participants: [],
      createdBy: creatorId,
      createdAt: new Date(),
      isActive: true,
      difficulty: roomData.difficulty || 'intermediate',
      tags: roomData.tags || [],
      sessionType: roomData.sessionType || 'study_group',
    }

    this.studyRooms.set(room.id, room)

    // Store in Redis for persistence
    await this.redis.setex(`room:${room.id}`, 86400, JSON.stringify(room))

    // Broadcast room creation
    this.broadcastToAll({
      type: 'room_created',
      room: room,
    })

    console.log(`📚 New study room created: ${room.name} (${room.topic})`)
    return room
  }

  /**
   * Join a study room
   */
  async joinStudyRoom(roomId: string, student: StudentProfile): Promise<boolean> {
    const room = this.studyRooms.get(roomId)
    if (!room || !room.isActive) {
      return false
    }

    if (room.currentParticipants >= room.maxParticipants) {
      return false
    }

    // Add student to room
    room.participants.push(student)
    room.currentParticipants++

    // Create or update session
    let session = this.activeSessions.get(roomId)
    if (!session) {
      session = this.createCollaborativeSession(roomId, room.topic)
      this.activeSessions.set(roomId, session)
    }

    session.participants.set(student.id, student)

    // Update Redis
    await this.redis.setex(`room:${roomId}`, 86400, JSON.stringify(room))

    // Notify all participants
    this.broadcastToRoom(roomId, {
      type: 'student_joined',
      student: student,
      roomParticipants: room.participants.length,
    })

    console.log(`👨‍🎓 ${student.name} joined room: ${room.name}`)
    return true
  }

  /**
   * Leave a study room
   */
  async leaveStudyRoom(roomId: string, studentId: string): Promise<void> {
    const room = this.studyRooms.get(roomId)
    const session = this.activeSessions.get(roomId)

    if (room) {
      room.participants = room.participants.filter((p) => p.id !== studentId)
      room.currentParticipants = Math.max(0, room.currentParticipants - 1)

      await this.redis.setex(`room:${roomId}`, 86400, JSON.stringify(room))
    }

    if (session) {
      session.participants.delete(studentId)

      // Close session if empty
      if (session.participants.size === 0) {
        this.activeSessions.delete(roomId)
      }
    }

    // Notify remaining participants
    this.broadcastToRoom(roomId, {
      type: 'student_left',
      studentId: studentId,
      roomParticipants: room?.participants.length || 0,
    })
  }

  /**
   * Send a message to the room chat
   */
  async sendChatMessage(
    roomId: string,
    message: Omit<ChatMessage, 'id' | 'timestamp' | 'reactions' | 'replies' | 'highlighted'>
  ): Promise<void> {
    const session = this.activeSessions.get(roomId)
    if (!session) return

    const chatMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      timestamp: Date.now(),
      reactions: new Map(),
      replies: [],
      highlighted: false,
    }

    session.chatHistory.push(chatMessage)

    // Store in Redis
    await this.redis.lpush(`chat:${roomId}`, JSON.stringify(chatMessage))
    await this.redis.expire(`chat:${roomId}`, 86400)

    // Broadcast to room
    this.broadcastToRoom(roomId, {
      type: 'chat_message',
      message: chatMessage,
    })

    // If it's a question, add to question queue
    if (message.type === 'question') {
      await this.addQuestionToQueue(roomId, chatMessage)
    }
  }

  /**
   * Update whiteboard state
   */
  async updateWhiteboard(
    roomId: string,
    update: Partial<WhiteboardState>,
    authorId: string
  ): Promise<void> {
    const session = this.activeSessions.get(roomId)
    if (!session) return

    // Update session whiteboard
    if (update.drawings) {
      session.sharedWhiteboard.drawings = [...session.sharedWhiteboard.drawings, ...update.drawings]
    }

    if (update.annotations) {
      session.sharedWhiteboard.annotations = [
        ...session.sharedWhiteboard.annotations,
        ...update.annotations,
      ]
    }

    if (update.currentSlide !== undefined) {
      session.sharedWhiteboard.currentSlide = update.currentSlide
    }

    // Store in Redis
    await this.redis.setex(`whiteboard:${roomId}`, 86400, JSON.stringify(session.sharedWhiteboard))

    // Broadcast update
    this.broadcastToRoom(roomId, {
      type: 'whiteboard_update',
      update: update,
      author: authorId,
    })
  }

  /**
   * Ask a question to the AI
   */
  async askAIQuestion(roomId: string, question: string, studentId: string): Promise<void> {
    const session = this.activeSessions.get(roomId)
    if (!session) return

    // Add question to queue
    const questionObj: Question = {
      id: `q_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      student: studentId,
      content: question,
      topic: session.currentTopic,
      difficulty: 'medium',
      status: 'pending',
      peerResponses: [],
      upvotes: 0,
      timestamp: Date.now(),
    }

    session.questionQueue.push(questionObj)

    // Process with AI (integrate with existing AI Gateway)
    try {
      // This would call the AI Gateway we built earlier
      const aiResponse = await this.processQuestionWithAI(question, session.currentTopic)

      questionObj.aiResponse = aiResponse
      questionObj.status = 'answered'

      // Send AI response to room
      await this.sendChatMessage(roomId, {
        author: 'AI Tutor',
        content: aiResponse,
        type: 'ai_response',
      })
    } catch (error) {
      console.error('AI question processing failed:', error)
    }
  }

  /**
   * Find study partners based on compatibility
   */
  async findStudyPartners(student: StudentProfile): Promise<StudyMatch[]> {
    const allStudents = await this.getAllActiveStudents()
    const matches: StudyMatch[] = []

    for (const otherStudent of allStudents) {
      if (otherStudent.id === student.id) continue

      const compatibility = this.calculateCompatibility(student, otherStudent)
      if (compatibility.score > 0.6) {
        // 60% threshold
        matches.push({
          student1: student,
          student2: otherStudent,
          commonTopics: compatibility.commonTopics,
          compatibilityScore: compatibility.score,
          suggestedRoom: await this.suggestStudyRoom(compatibility.commonTopics),
        })
      }
    }

    return matches.sort((a, b) => b.compatibilityScore - a.compatibilityScore).slice(0, 5)
  }

  /**
   * Get learning analytics for a student
   */
  async getLearningAnalytics(studentId: string): Promise<LearningAnalytics> {
    const analytics = await this.redis.hgetall(`analytics:${studentId}`)

    return {
      studentId,
      topicsStudied: JSON.parse(analytics.topicsStudied || '[]'),
      questionsAsked: parseInt(analytics.questionsAsked || '0'),
      questionsAnswered: parseInt(analytics.questionsAnswered || '0'),
      helpfulnessRating: parseFloat(analytics.helpfulnessRating || '0'),
      studyTime: parseInt(analytics.studyTime || '0'),
      collaborativeScore: parseFloat(analytics.collaborativeScore || '0'),
      improvements: JSON.parse(analytics.improvements || '[]'),
    }
  }

  /**
   * Get all active study rooms
   */
  getActiveStudyRooms(): StudyRoom[] {
    return Array.from(this.studyRooms.values()).filter((room) => room.isActive)
  }

  /**
   * Get room details
   */
  getStudyRoom(roomId: string): StudyRoom | undefined {
    return this.studyRooms.get(roomId)
  }

  // Private Methods

  private setupWebSocketHandlers(): void {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('📡 New WebSocket connection established')

      ws.on('message', async (data: string) => {
        try {
          const message = JSON.parse(data)
          await this.handleWebSocketMessage(ws, message)
        } catch (error) {
          console.error('WebSocket message error:', error)
        }
      })

      ws.on('close', () => {
        // Remove from active connections
        for (const [studentId, connection] of this.studentConnections.entries()) {
          if (connection === ws) {
            this.studentConnections.delete(studentId)
            break
          }
        }
      })
    })
  }

  private async handleWebSocketMessage(ws: WebSocket, message: any): Promise<void> {
    const { type, data } = message

    switch (type) {
      case 'join_room':
        await this.joinStudyRoom(data.roomId, data.student)
        this.studentConnections.set(data.student.id, ws)
        break

      case 'leave_room':
        await this.leaveStudyRoom(data.roomId, data.studentId)
        break

      case 'send_message':
        await this.sendChatMessage(data.roomId, data.message)
        break

      case 'update_whiteboard':
        await this.updateWhiteboard(data.roomId, data.update, data.authorId)
        break

      case 'ask_ai':
        await this.askAIQuestion(data.roomId, data.question, data.studentId)
        break

      case 'find_partners':
        const matches = await this.findStudyPartners(data.student)
        ws.send(JSON.stringify({ type: 'study_matches', matches }))
        break
    }
  }

  private createCollaborativeSession(roomId: string, topic: string): CollaborativeSession {
    return {
      roomId,
      participants: new Map(),
      currentTopic: topic,
      sharedWhiteboard: {
        drawings: [],
        annotations: [],
        currentSlide: 0,
        slides: [],
      },
      chatHistory: [],
      questionQueue: [],
      aiModerator: true,
      startTime: new Date(),
      duration: 0,
    }
  }

  private broadcastToRoom(roomId: string, message: any): void {
    const session = this.activeSessions.get(roomId)
    if (!session) return

    for (const [studentId] of session.participants) {
      const connection = this.studentConnections.get(studentId)
      if (connection && connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(message))
      }
    }
  }

  private broadcastToAll(message: any): void {
    for (const connection of this.studentConnections.values()) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(JSON.stringify(message))
      }
    }
  }

  private async addQuestionToQueue(roomId: string, chatMessage: ChatMessage): Promise<void> {
    const session = this.activeSessions.get(roomId)
    if (!session) return

    const question: Question = {
      id: chatMessage.id,
      student: chatMessage.author,
      content: chatMessage.content,
      topic: session.currentTopic,
      difficulty: 'medium',
      status: 'pending',
      peerResponses: [],
      upvotes: 0,
      timestamp: chatMessage.timestamp,
    }

    session.questionQueue.push(question)
  }

  private async processQuestionWithAI(question: string, topic: string): Promise<string> {
    // This would integrate with the AI Gateway we built earlier
    // For now, return a mock response
    return `Here's an explanation about ${topic}: ${question}. This is a comprehensive answer with examples and NEET relevance.`
  }

  private async getAllActiveStudents(): Promise<StudentProfile[]> {
    const allStudents: StudentProfile[] = []

    for (const room of this.studyRooms.values()) {
      allStudents.push(...room.participants)
    }

    return Array.from(new Set(allStudents.map((s) => s.id))).map(
      (id) => allStudents.find((s) => s.id === id)!
    )
  }

  private calculateCompatibility(
    student1: StudentProfile,
    student2: StudentProfile
  ): { score: number; commonTopics: string[] } {
    const commonTopics = student1.topics.filter((topic) => student2.topics.includes(topic))

    let score = 0

    // Topic compatibility (40%)
    score += (commonTopics.length / Math.max(student1.topics.length, student2.topics.length)) * 0.4

    // Grade compatibility (20%)
    if (student1.grade === student2.grade) score += 0.2

    // Study style compatibility (20%)
    if (student1.studyStyle === student2.studyStyle) score += 0.2

    // Language compatibility (10%)
    if (student1.preferredLanguage === student2.preferredLanguage) score += 0.1

    // NEET score proximity (10%)
    const scoreDiff = Math.abs(student1.neetScore - student2.neetScore)
    score += Math.max(0, 1 - scoreDiff / 720) * 0.1

    return { score, commonTopics }
  }

  private async suggestStudyRoom(topics: string[]): Promise<string> {
    // Find existing rooms with matching topics
    for (const room of this.studyRooms.values()) {
      if (
        room.currentParticipants < room.maxParticipants &&
        topics.some((topic) => room.topic.includes(topic))
      ) {
        return room.id
      }
    }

    // Create new room if none found
    const newRoom = await this.createStudyRoom(
      {
        name: `${topics[0]} Study Group`,
        topic: topics[0],
        description: `Collaborative study session for ${topics.join(', ')}`,
        tags: topics,
      },
      'system'
    )

    return newRoom.id
  }

  private startMatchmaking(): void {
    setInterval(async () => {
      await this.processMatchmaking()
    }, 60000) // Run every minute
  }

  private async processMatchmaking(): Promise<void> {
    // Find students waiting for matches
    const waitingStudents = await this.redis.lrange('matchmaking:queue', 0, -1)

    for (const studentData of waitingStudents) {
      try {
        const student = JSON.parse(studentData) as StudentProfile
        const matches = await this.findStudyPartners(student)

        if (matches.length > 0) {
          // Notify student of matches
          const connection = this.studentConnections.get(student.id)
          if (connection) {
            connection.send(
              JSON.stringify({
                type: 'study_matches_found',
                matches: matches.slice(0, 3),
              })
            )
          }

          // Remove from queue
          await this.redis.lrem('matchmaking:queue', 1, studentData)
        }
      } catch (error) {
        console.error('Matchmaking error:', error)
      }
    }
  }

  private async initializeDefaultRooms(): Promise<void> {
    const defaultRooms = [
      {
        name: 'NEET Biology Discussion',
        topic: 'NEET Biology',
        description: 'General discussion for NEET Biology preparation',
        difficulty: 'intermediate' as const,
        sessionType: 'neet_prep' as const,
        tags: ['neet', 'biology', 'discussion'],
      },
      {
        name: 'Cell Biology Study Group',
        topic: 'Cell Biology',
        description: 'Deep dive into cell structure and functions',
        difficulty: 'intermediate' as const,
        sessionType: 'study_group' as const,
        tags: ['cell', 'biology', 'ncert'],
      },
      {
        name: 'Diagram Drawing Session',
        topic: 'Biology Diagrams',
        description: 'Practice drawing and labeling biology diagrams',
        difficulty: 'beginner' as const,
        sessionType: 'diagram_review' as const,
        tags: ['diagrams', 'visual', 'practice'],
      },
    ]

    for (const roomData of defaultRooms) {
      await this.createStudyRoom(roomData, 'system')
    }
  }
}
