'use client'

/**
 * Real-Time Collaborative Study Room Interface
 * Enables students to collaborate, chat, and learn together
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StudyRoom {
  id: string
  name: string
  topic: string
  description: string
  maxParticipants: number
  currentParticipants: number
  participants: StudentProfile[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
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
  preferredLanguage: 'english' | 'hindi' | 'hinglish'
}

interface ChatMessage {
  id: string
  author: string
  content: string
  type: 'text' | 'question' | 'ai_response' | 'system'
  timestamp: number
  highlighted: boolean
}

interface StudyRoomInterfaceProps {
  student: StudentProfile
}

export default function StudyRoomInterface({ student }: StudyRoomInterfaceProps) {
  const [activeRooms, setActiveRooms] = useState<StudyRoom[]>([])
  const [currentRoom, setCurrentRoom] = useState<StudyRoom | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [wsConnection, setWsConnection] = useState<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [studyMatches, setStudyMatches] = useState<any[]>([])

  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchActiveRooms()
    findStudyPartners()
  }, [])

  useEffect(() => {
    if (currentRoom && !wsConnection) {
      connectWebSocket()
    }
  }, [currentRoom])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatMessages])

  const fetchActiveRooms = async () => {
    try {
      const response = await fetch('/api/collaborative/rooms')
      const data = await response.json()
      setActiveRooms(data.rooms || [])
    } catch (error) {
      console.error('Failed to fetch rooms:', error)
    }
  }

  const findStudyPartners = async () => {
    try {
      const response = await fetch('/api/collaborative/matchmaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student }),
      })
      const data = await response.json()
      setStudyMatches(data.matches || [])
    } catch (error) {
      console.error('Failed to find study partners:', error)
    }
  }

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      setIsConnected(true)
      setWsConnection(ws)
      console.log('🔗 Connected to collaborative learning server')
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      handleWebSocketMessage(message)
    }

    ws.onclose = () => {
      setIsConnected(false)
      setWsConnection(null)
      console.log('❌ Disconnected from collaborative learning server')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }
  }

  const handleWebSocketMessage = (message: any) => {
    switch (message.type) {
      case 'chat_message':
        setChatMessages((prev) => [...prev, message.message])
        break

      case 'student_joined':
        console.log(`👨‍🎓 ${message.student.name} joined the room`)
        break

      case 'student_left':
        console.log(`👋 Student left the room`)
        break

      case 'room_created':
        fetchActiveRooms()
        break
    }
  }

  const joinRoom = async (room: StudyRoom) => {
    try {
      const response = await fetch('/api/collaborative/rooms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          roomId: room.id,
          student,
        }),
      })

      if (response.ok) {
        setCurrentRoom(room)
        setChatMessages([])

        // Send join message via WebSocket
        if (wsConnection) {
          wsConnection.send(
            JSON.stringify({
              type: 'join_room',
              data: { roomId: room.id, student },
            })
          )
        }
      }
    } catch (error) {
      console.error('Failed to join room:', error)
    }
  }

  const leaveRoom = async () => {
    if (!currentRoom) return

    try {
      await fetch('/api/collaborative/rooms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'leave',
          roomId: currentRoom.id,
          studentId: student.id,
        }),
      })

      if (wsConnection) {
        wsConnection.send(
          JSON.stringify({
            type: 'leave_room',
            data: { roomId: currentRoom.id, studentId: student.id },
          })
        )
      }

      setCurrentRoom(null)
      setChatMessages([])
    } catch (error) {
      console.error('Failed to leave room:', error)
    }
  }

  const sendMessage = () => {
    if (!messageInput.trim() || !currentRoom || !wsConnection) return

    const message = {
      author: student.name,
      content: messageInput,
      type: messageInput.includes('?') ? 'question' : ('text' as const),
    }

    wsConnection.send(
      JSON.stringify({
        type: 'send_message',
        data: { roomId: currentRoom.id, message },
      })
    )

    setMessageInput('')
  }

  const askAI = () => {
    if (!messageInput.trim() || !currentRoom || !wsConnection) return

    wsConnection.send(
      JSON.stringify({
        type: 'ask_ai',
        data: {
          roomId: currentRoom.id,
          question: messageInput,
          studentId: student.id,
        },
      })
    )

    setMessageInput('')
  }

  const createRoom = async (roomData: any) => {
    try {
      const response = await fetch('/api/collaborative/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomData,
          creatorId: student.id,
        }),
      })

      if (response.ok) {
        setShowCreateRoom(false)
        fetchActiveRooms()
      }
    } catch (error) {
      console.error('Failed to create room:', error)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'study_group':
        return '📚'
      case 'question_solving':
        return '❓'
      case 'diagram_review':
        return '🖼️'
      case 'neet_prep':
        return '🎯'
      default:
        return '💬'
    }
  }

  if (!currentRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🤝 Collaborative Learning Hub</h1>
            <p className="text-xl text-gray-600">
              Join study groups, find partners, and learn together
            </p>
          </div>

          {/* Connection Status */}
          <div className="flex justify-center mb-6">
            <div
              className={`px-4 py-2 rounded-full ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {isConnected ? '🟢 Connected' : '🔴 Connecting...'}
            </div>
          </div>

          {/* Study Matches */}
          {studyMatches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Recommended Study Partners
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {studyMatches.slice(0, 3).map((match) => (
                  <motion.div
                    key={match.student2.id}
                    className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{match.student2.name}</h3>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {Math.round(match.compatibilityScore * 100)}% match
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Grade: {match.student2.grade}</p>
                    <p className="text-sm text-gray-600 mb-3">
                      Common topics: {match.commonTopics.join(', ')}
                    </p>
                    <button
                      onClick={() => {
                        const suggestedRoom = activeRooms.find((r) => r.id === match.suggestedRoom)
                        if (suggestedRoom) joinRoom(suggestedRoom)
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Study Together
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Active Study Rooms */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">📚 Active Study Rooms</h2>
              <button
                onClick={() => setShowCreateRoom(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                + Create Room
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeRooms.map((room) => (
                <motion.div
                  key={room.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getSessionTypeIcon(room.sessionType)} {room.name}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(room.difficulty)}`}
                    >
                      {room.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-2">📖 {room.topic}</p>
                  <p className="text-sm text-gray-500 mb-4">{room.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      👥 {room.currentParticipants}/{room.maxParticipants} students
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mx-3">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(room.currentParticipants / room.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => joinRoom(room)}
                    disabled={room.currentParticipants >= room.maxParticipants}
                    className={`w-full py-2 px-4 rounded-lg transition-colors ${
                      room.currentParticipants >= room.maxParticipants
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {room.currentParticipants >= room.maxParticipants ? 'Room Full' : 'Join Room'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Create Room Modal */}
          <AnimatePresence>
            {showCreateRoom && (
              <CreateRoomModal onClose={() => setShowCreateRoom(false)} onCreate={createRoom} />
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  // Room Interface
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Room Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={leaveRoom}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {getSessionTypeIcon(currentRoom.sessionType)} {currentRoom.name}
                </h1>
                <p className="text-sm text-gray-600">
                  📖 {currentRoom.topic} • 👥 {currentRoom.participants.length} students
                </p>
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm ${isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {isConnected ? '🟢 Live' : '🔴 Disconnected'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.author === student.name ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'ai_response'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : message.author === student.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border'
                  }`}
                >
                  {message.author !== student.name && (
                    <p className="text-xs font-medium mb-1 opacity-70">
                      {message.type === 'ai_response' ? '🤖 AI Tutor' : message.author}
                    </p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message or question..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!messageInput.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
              <button
                onClick={askAI}
                disabled={!messageInput.trim()}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                🤖 Ask AI
              </button>
            </div>
          </div>
        </div>

        {/* Participants Panel */}
        <div className="w-80 bg-white border-l">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              👥 Participants ({currentRoom.participants.length})
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {currentRoom.participants.map((participant) => (
              <div key={participant.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {participant.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                  <p className="text-xs text-gray-500">Grade {participant.grade}</p>
                </div>
                {participant.id === student.id && (
                  <span className="text-xs text-blue-600 font-medium">(You)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Create Room Modal Component
function CreateRoomModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    description: '',
    maxParticipants: 6,
    difficulty: 'intermediate',
    sessionType: 'study_group',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreate(formData)
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create Study Room</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Biology Study Group"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
            <input
              type="text"
              required
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Cell Biology"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Study session for understanding cell structure and functions"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
              <select
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData({ ...formData, maxParticipants: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={4}>4 students</option>
                <option value={6}>6 students</option>
                <option value={8}>8 students</option>
                <option value={10}>10 students</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
            <select
              value={formData.sessionType}
              onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="study_group">📚 Study Group</option>
              <option value="question_solving">❓ Question Solving</option>
              <option value="diagram_review">🖼️ Diagram Review</option>
              <option value="neet_prep">🎯 NEET Preparation</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Room
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
