'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, BookOpen, Brain, Target, ChevronRight, Plus, Filter } from 'lucide-react'
import { useStudyRooms, StudyRoom } from '@/hooks/useStudyRooms'

interface StudyRoomsListProps {
  onJoinRoom?: (room: StudyRoom) => void
  showCreateButton?: boolean
  maxRooms?: number
}

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
}

const sessionTypeIcons = {
  study_group: Users,
  question_solving: Brain,
  diagram_review: BookOpen,
  neet_prep: Target,
}

const sessionTypeLabels = {
  study_group: 'Study Group',
  question_solving: 'Q&A Session',
  diagram_review: 'Diagram Review',
  neet_prep: 'NEET Prep',
}

export function StudyRoomsList({
  onJoinRoom,
  showCreateButton = true,
  maxRooms = 6,
}: StudyRoomsListProps) {
  const { rooms, isLoading, error, fetchRooms, isRoomFull, getAvailableSpots } = useStudyRooms()
  const [filter, setFilter] = useState<string>('all')

  const filteredRooms = rooms
    .filter((room) => {
      if (filter === 'all') return true
      return room.sessionType === filter || room.difficulty === filter
    })
    .slice(0, maxRooms)

  const handleJoinRoom = (room: StudyRoom) => {
    if (onJoinRoom) {
      onJoinRoom(room)
    } else {
      // Default behavior - open in new tab
      window.open(`/study-room/${room.id}`, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading study rooms...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to load study rooms</p>
        <button onClick={() => fetchRooms()} className="mt-2 text-blue-500 hover:underline">
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Live Study Rooms
          </h2>
          <p className="text-sm text-gray-500">Join peers studying Biology</p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Rooms</option>
            <optgroup label="Session Type">
              <option value="study_group">Study Groups</option>
              <option value="question_solving">Q&A Sessions</option>
              <option value="diagram_review">Diagram Review</option>
              <option value="neet_prep">NEET Prep</option>
            </optgroup>
            <optgroup label="Difficulty">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </optgroup>
          </select>
        </div>
      </div>

      {/* Room List */}
      <div className="divide-y divide-gray-50">
        {filteredRooms.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No study rooms available</p>
            <p className="text-sm">Create one to start collaborating!</p>
          </div>
        ) : (
          filteredRooms.map((room, index) => {
            const SessionIcon = sessionTypeIcons[room.sessionType]
            const availableSpots = getAvailableSpots(room)
            const isFull = isRoomFull(room)

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                  isFull ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Room Name & Type */}
                    <div className="flex items-center gap-2 mb-1">
                      <SessionIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <h3 className="font-medium text-gray-900 truncate">{room.name}</h3>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          difficultyColors[room.difficulty]
                        }`}
                      >
                        {room.difficulty}
                      </span>
                    </div>

                    {/* Topic */}
                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{room.topic}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {room.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {room.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{room.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Participants & Join */}
                  <div className="flex items-center gap-4 ml-4">
                    {/* Participant Count */}
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {room.currentParticipants}/{room.maxParticipants}
                        </span>
                      </div>
                      <span className={`text-xs ${isFull ? 'text-red-500' : 'text-green-500'}`}>
                        {isFull ? 'Full' : `${availableSpots} spots`}
                      </span>
                    </div>

                    {/* Join Button */}
                    <button
                      onClick={() => handleJoinRoom(room)}
                      disabled={isFull}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        isFull
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      Join
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Footer - Create Room */}
      {showCreateButton && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={() => window.open('/study-room/create', '_blank')}
            className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create New Study Room
          </button>
        </div>
      )}
    </div>
  )
}

export default StudyRoomsList
