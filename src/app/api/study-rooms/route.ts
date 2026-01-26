import { NextRequest, NextResponse } from 'next/server'

/**
 * Study Rooms API
 *
 * This is a REST API wrapper for the CollaborativeLearningManager.
 * For real-time features, clients should connect to the WebSocket server.
 *
 * GET /api/study-rooms - List active study rooms
 * POST /api/study-rooms - Create a new study room
 */

export interface StudyRoomResponse {
  id: string
  name: string
  topic: string
  description: string
  maxParticipants: number
  currentParticipants: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  sessionType: 'study_group' | 'question_solving' | 'diagram_review' | 'neet_prep'
  createdAt: string
  isActive: boolean
}

// In-memory store for demo (in production, use Redis/database via CollaborativeLearningManager)
const studyRooms = new Map<string, StudyRoomResponse>()

// Initialize some default rooms
const defaultRooms: StudyRoomResponse[] = [
  {
    id: 'room_cell_biology',
    name: 'Cell Biology Study Group',
    topic: 'Cell Structure and Functions',
    description: 'Deep dive into prokaryotic and eukaryotic cells, organelles, and cell division',
    maxParticipants: 8,
    currentParticipants: 3,
    difficulty: 'intermediate',
    tags: ['Cell Biology', 'Class 11', 'NEET'],
    sessionType: 'study_group',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'room_genetics',
    name: 'Genetics & Inheritance',
    topic: 'Principles of Inheritance and Variation',
    description: "Mendel's laws, chromosomal theory, genetic disorders",
    maxParticipants: 10,
    currentParticipants: 5,
    difficulty: 'advanced',
    tags: ['Genetics', 'Class 12', 'NEET', 'High Weightage'],
    sessionType: 'neet_prep',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'room_human_physiology',
    name: 'Human Physiology Marathon',
    topic: 'Digestion, Circulation, Respiration',
    description: 'Comprehensive review of human body systems for NEET',
    maxParticipants: 12,
    currentParticipants: 8,
    difficulty: 'intermediate',
    tags: ['Human Physiology', 'Class 11', 'NEET'],
    sessionType: 'question_solving',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'room_plant_kingdom',
    name: 'Plant Kingdom Diagrams',
    topic: 'Plant Classification & Life Cycles',
    description: 'Visual study of Algae, Bryophytes, Pteridophytes, Gymnosperms, Angiosperms',
    maxParticipants: 6,
    currentParticipants: 2,
    difficulty: 'beginner',
    tags: ['Plant Kingdom', 'Class 11', 'Diagrams'],
    sessionType: 'diagram_review',
    createdAt: new Date().toISOString(),
    isActive: true,
  },
]

// Initialize default rooms
defaultRooms.forEach((room) => studyRooms.set(room.id, room))

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const topic = searchParams.get('topic')
    const difficulty = searchParams.get('difficulty')
    const sessionType = searchParams.get('sessionType')

    let rooms = Array.from(studyRooms.values()).filter((room) => room.isActive)

    // Apply filters
    if (topic) {
      rooms = rooms.filter(
        (room) =>
          room.topic.toLowerCase().includes(topic.toLowerCase()) ||
          room.tags.some((tag) => tag.toLowerCase().includes(topic.toLowerCase()))
      )
    }

    if (difficulty) {
      rooms = rooms.filter((room) => room.difficulty === difficulty)
    }

    if (sessionType) {
      rooms = rooms.filter((room) => room.sessionType === sessionType)
    }

    // Sort by participant count (most popular first)
    rooms.sort((a, b) => b.currentParticipants - a.currentParticipants)

    return NextResponse.json({
      success: true,
      count: rooms.length,
      rooms,
    })
  } catch (error) {
    console.error('[Study Rooms API] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch study rooms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.topic) {
      return NextResponse.json({ error: 'Name and topic are required' }, { status: 400 })
    }

    const room: StudyRoomResponse = {
      id: `room_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      name: body.name,
      topic: body.topic,
      description: body.description || '',
      maxParticipants: body.maxParticipants || 8,
      currentParticipants: 0,
      difficulty: body.difficulty || 'intermediate',
      tags: body.tags || [],
      sessionType: body.sessionType || 'study_group',
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    studyRooms.set(room.id, room)

    return NextResponse.json({
      success: true,
      room,
    })
  } catch (error) {
    console.error('[Study Rooms API] Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create study room' }, { status: 500 })
  }
}
