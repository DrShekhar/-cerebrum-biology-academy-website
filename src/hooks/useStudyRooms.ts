'use client'

import { useState, useCallback, useEffect } from 'react'

export interface StudyRoom {
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

export interface CreateRoomData {
  name: string
  topic: string
  description?: string
  maxParticipants?: number
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  tags?: string[]
  sessionType?: 'study_group' | 'question_solving' | 'diagram_review' | 'neet_prep'
}

export interface StudyRoomFilters {
  topic?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  sessionType?: 'study_group' | 'question_solving' | 'diagram_review' | 'neet_prep'
}

/**
 * React hook for managing collaborative study rooms
 */
export function useStudyRooms() {
  const [rooms, setRooms] = useState<StudyRoom[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Fetch all active study rooms
   */
  const fetchRooms = useCallback(async (filters?: StudyRoomFilters) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (filters?.topic) params.set('topic', filters.topic)
      if (filters?.difficulty) params.set('difficulty', filters.difficulty)
      if (filters?.sessionType) params.set('sessionType', filters.sessionType)

      const url = `/api/study-rooms${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch study rooms')
      }

      const data = await response.json()
      setRooms(data.rooms)
      return data.rooms
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Create a new study room
   */
  const createRoom = useCallback(async (roomData: CreateRoomData): Promise<StudyRoom | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/study-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      })

      if (!response.ok) {
        throw new Error('Failed to create study room')
      }

      const data = await response.json()

      // Add new room to local state
      setRooms((prev) => [data.room, ...prev])

      return data.room
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setError(message)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Join a study room (initiates WebSocket connection)
   * Returns the WebSocket URL for the room
   */
  const joinRoom = useCallback((roomId: string): string => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsHost = process.env.NEXT_PUBLIC_WS_HOST || window.location.host
    const wsPort = process.env.NEXT_PUBLIC_COLLABORATIVE_WS_PORT || '8080'

    return `${wsProtocol}//${wsHost}:${wsPort}?roomId=${roomId}`
  }, [])

  /**
   * Get rooms by topic
   */
  const getRoomsByTopic = useCallback(async (topic: string): Promise<StudyRoom[]> => {
    return fetchRooms({ topic })
  }, [fetchRooms])

  /**
   * Get rooms by difficulty
   */
  const getRoomsByDifficulty = useCallback(
    async (difficulty: 'beginner' | 'intermediate' | 'advanced'): Promise<StudyRoom[]> => {
      return fetchRooms({ difficulty })
    },
    [fetchRooms]
  )

  /**
   * Get NEET prep rooms
   */
  const getNEETPrepRooms = useCallback(async (): Promise<StudyRoom[]> => {
    return fetchRooms({ sessionType: 'neet_prep' })
  }, [fetchRooms])

  /**
   * Get available spots in a room
   */
  const getAvailableSpots = useCallback((room: StudyRoom): number => {
    return room.maxParticipants - room.currentParticipants
  }, [])

  /**
   * Check if room is full
   */
  const isRoomFull = useCallback((room: StudyRoom): boolean => {
    return room.currentParticipants >= room.maxParticipants
  }, [])

  // Auto-fetch rooms on mount
  useEffect(() => {
    fetchRooms()
  }, [fetchRooms])

  return {
    rooms,
    isLoading,
    error,
    fetchRooms,
    createRoom,
    joinRoom,
    getRoomsByTopic,
    getRoomsByDifficulty,
    getNEETPrepRooms,
    getAvailableSpots,
    isRoomFull,
  }
}

export default useStudyRooms
