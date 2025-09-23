/**
 * API Routes for Collaborative Learning Rooms
 */

import { NextRequest, NextResponse } from 'next/server'
import { CollaborativeLearningManager } from '@/lib/collaborative/CollaborativeLearningManager'

// Initialize collaborative learning manager
let collaborativeManager: CollaborativeLearningManager

if (!collaborativeManager) {
  collaborativeManager = new CollaborativeLearningManager(8080)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')

    if (roomId) {
      // Get specific room details
      const room = collaborativeManager.getStudyRoom(roomId)
      if (!room) {
        return NextResponse.json({ error: 'Room not found' }, { status: 404 })
      }
      return NextResponse.json({ room })
    } else {
      // Get all active rooms
      const rooms = collaborativeManager.getActiveStudyRooms()
      return NextResponse.json({ rooms })
    }
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomData, creatorId } = body

    if (!roomData || !creatorId) {
      return NextResponse.json({ error: 'Missing room data or creator ID' }, { status: 400 })
    }

    const room = await collaborativeManager.createStudyRoom(roomData, creatorId)

    return NextResponse.json(
      {
        success: true,
        room,
        message: 'Study room created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating room:', error)
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, roomId, studentId, student } = body

    if (!action || !roomId) {
      return NextResponse.json({ error: 'Missing action or room ID' }, { status: 400 })
    }

    switch (action) {
      case 'join':
        if (!student) {
          return NextResponse.json(
            { error: 'Student profile required to join room' },
            { status: 400 }
          )
        }

        const joined = await collaborativeManager.joinStudyRoom(roomId, student)
        if (!joined) {
          return NextResponse.json(
            { error: 'Failed to join room - room may be full or inactive' },
            { status: 400 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Successfully joined study room',
        })

      case 'leave':
        if (!studentId) {
          return NextResponse.json({ error: 'Student ID required to leave room' }, { status: 400 })
        }

        await collaborativeManager.leaveStudyRoom(roomId, studentId)
        return NextResponse.json({
          success: true,
          message: 'Successfully left study room',
        })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error updating room:', error)
    return NextResponse.json({ error: 'Failed to update room' }, { status: 500 })
  }
}
