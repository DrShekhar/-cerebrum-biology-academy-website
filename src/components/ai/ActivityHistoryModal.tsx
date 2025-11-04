'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Brain,
  FileText,
  Award,
  BookOpen,
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  TrendingUp,
  Target,
  Zap,
} from 'lucide-react'

export interface Activity {
  id: string
  type: 'doubt' | 'assessment' | 'achievement' | 'study'
  title: string
  description: string
  timestamp: Date
  success: boolean
  details?: {
    score?: number
    maxScore?: number
    duration?: number
    topic?: string
    relatedContent?: string
    tags?: string[]
  }
}

interface ActivityHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const generateMockActivities = (count: number): Activity[] => {
  const types: Activity['type'][] = ['doubt', 'assessment', 'achievement', 'study']
  const topics = [
    'Cell Biology',
    'Genetics',
    'Ecology',
    'Physiology',
    'Evolution',
    'Molecular Biology',
    'Biochemistry',
    'Plant Biology',
    'Animal Behavior',
    'Microbiology',
  ]

  const activities: Activity[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const daysAgo = Math.floor(Math.random() * 60)
    const hoursAgo = Math.floor(Math.random() * 24)
    const minutesAgo = Math.floor(Math.random() * 60)
    const timestamp = new Date(
      now.getTime() -
        daysAgo * 24 * 60 * 60 * 1000 -
        hoursAgo * 60 * 60 * 1000 -
        minutesAgo * 60 * 1000
    )

    let activity: Activity

    switch (type) {
      case 'doubt':
        activity = {
          id: `activity_${i}`,
          type: 'doubt',
          title: `${topic} Doubt Resolved`,
          description: `Clarified concepts and explained key principles`,
          timestamp,
          success: Math.random() > 0.1,
          details: {
            topic,
            duration: Math.floor(Math.random() * 30) + 5,
            tags: ['concept', 'neet', topic.toLowerCase().replace(' ', '-')],
            relatedContent: '/topics/' + topic.toLowerCase().replace(' ', '-'),
          },
        }
        break

      case 'assessment':
        const score = Math.floor(Math.random() * 40) + 20
        const maxScore = 40
        activity = {
          id: `activity_${i}`,
          type: 'assessment',
          title: `${topic} Mock Test`,
          description: `Score: ${score}/${maxScore} (${Math.round((score / maxScore) * 100)}%)`,
          timestamp,
          success: score / maxScore >= 0.7,
          details: {
            score,
            maxScore,
            topic,
            duration: Math.floor(Math.random() * 90) + 30,
            tags: ['test', 'practice', topic.toLowerCase().replace(' ', '-')],
            relatedContent: '/tests/' + topic.toLowerCase().replace(' ', '-'),
          },
        }
        break

      case 'achievement':
        const achievements = [
          'Weekly Goal Achieved',
          'Perfect Score Streak',
          'Study Milestone Reached',
          'Topic Mastery',
          'Consistency Champion',
          'Fast Learner Badge',
        ]
        activity = {
          id: `activity_${i}`,
          type: 'achievement',
          title: achievements[Math.floor(Math.random() * achievements.length)],
          description: `Completed milestone in ${topic}`,
          timestamp,
          success: true,
          details: {
            topic,
            tags: ['achievement', 'milestone', topic.toLowerCase().replace(' ', '-')],
          },
        }
        break

      case 'study':
        activity = {
          id: `activity_${i}`,
          type: 'study',
          title: `${topic} Study Session`,
          description: `Generated personalized study material and notes`,
          timestamp,
          success: true,
          details: {
            topic,
            duration: Math.floor(Math.random() * 120) + 30,
            tags: ['study', 'notes', topic.toLowerCase().replace(' ', '-')],
            relatedContent: '/study/' + topic.toLowerCase().replace(' ', '-'),
          },
        }
        break
    }

    activities.push(activity)
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export function ActivityHistoryModal({ isOpen, onClose }: ActivityHistoryModalProps) {
  const [activities] = useState<Activity[]>(() => generateMockActivities(150))
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<Activity['type'][]>([])
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date')

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [displayedCount, setDisplayedCount] = useState(20)

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedTypes([])
      setDateRange('all')
      setExpandedId(null)
      setDisplayedCount(20)
    }
  }, [isOpen])

  const filteredActivities = useMemo(() => {
    let filtered = activities

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (activity) =>
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.details?.topic?.toLowerCase().includes(query) ||
          activity.details?.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((activity) => selectedTypes.includes(activity.type))
    }

    if (dateRange !== 'all') {
      const now = new Date()
      const cutoffDate = new Date()

      switch (dateRange) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          cutoffDate.setDate(now.getDate() - 7)
          break
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1)
          break
      }

      filtered = filtered.filter((activity) => activity.timestamp >= cutoffDate)
    }

    if (sortBy === 'type') {
      filtered = [...filtered].sort((a, b) => a.type.localeCompare(b.type))
    }

    return filtered
  }, [activities, searchQuery, selectedTypes, dateRange, sortBy])

  const groupedActivities = useMemo(() => {
    const groups: { [key: string]: Activity[] } = {
      Today: [],
      Yesterday: [],
      'Last 7 Days': [],
      'Last 30 Days': [],
      Older: [],
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    filteredActivities.forEach((activity) => {
      const activityDate = new Date(activity.timestamp)

      if (activityDate >= today) {
        groups['Today'].push(activity)
      } else if (activityDate >= yesterday) {
        groups['Yesterday'].push(activity)
      } else if (activityDate >= lastWeek) {
        groups['Last 7 Days'].push(activity)
      } else if (activityDate >= lastMonth) {
        groups['Last 30 Days'].push(activity)
      } else {
        groups['Older'].push(activity)
      }
    })

    return Object.entries(groups).filter(([_, items]) => items.length > 0)
  }, [filteredActivities])

  const displayedActivities = useMemo(() => {
    return filteredActivities.slice(0, displayedCount)
  }, [filteredActivities, displayedCount])

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

      if (scrollPercentage > 0.8 && displayedCount < filteredActivities.length) {
        setDisplayedCount((prev) => Math.min(prev + 20, filteredActivities.length))
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [displayedCount, filteredActivities.length])

  const toggleTypeFilter = (type: Activity['type']) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'doubt':
        return Brain
      case 'assessment':
        return FileText
      case 'achievement':
        return Award
      case 'study':
        return BookOpen
    }
  }

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'doubt':
        return 'purple'
      case 'assessment':
        return 'green'
      case 'achievement':
        return 'yellow'
      case 'study':
        return 'blue'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatAbsoluteTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                Complete Activity History
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredActivities.length}{' '}
                {filteredActivities.length === 1 ? 'activity' : 'activities'} found
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6 border-b border-gray-200 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities, topics, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="type">Sort by Type</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['doubt', 'assessment', 'achievement', 'study'] as Activity['type'][]).map(
                (type) => {
                  const Icon = getActivityIcon(type)
                  const color = getActivityColor(type)
                  const isSelected = selectedTypes.includes(type)

                  return (
                    <button
                      key={type}
                      onClick={() => toggleTypeFilter(type)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        isSelected
                          ? color === 'purple'
                            ? 'bg-purple-100 border-purple-500 text-purple-700'
                            : color === 'green'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : color === 'yellow'
                                ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                                : 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="capitalize font-medium">{type}</span>
                    </button>
                  )
                }
              )}
            </div>
          </div>

          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
            {groupedActivities.map(([groupName, groupActivities]) => {
              const displayedGroupActivities = groupActivities.filter((activity) =>
                displayedActivities.includes(activity)
              )

              if (displayedGroupActivities.length === 0) return null

              return (
                <div key={groupName}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {groupName}
                  </h3>

                  <div className="space-y-3">
                    {displayedGroupActivities.map((activity, index) => {
                      const Icon = getActivityIcon(activity.type)
                      const color = getActivityColor(activity.type)
                      const isExpanded = expandedId === activity.id

                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                        >
                          <div
                            className="p-4 cursor-pointer"
                            onClick={() => setExpandedId(isExpanded ? null : activity.id)}
                          >
                            <div className="flex items-start space-x-4">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  color === 'purple'
                                    ? 'bg-purple-100 text-purple-600'
                                    : color === 'green'
                                      ? 'bg-green-100 text-green-600'
                                      : color === 'yellow'
                                        ? 'bg-yellow-100 text-yellow-600'
                                        : 'bg-blue-100 text-blue-600'
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="text-base font-semibold text-gray-900 truncate">
                                    {activity.title}
                                  </h4>
                                  {activity.success ? (
                                    <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-red-500 ml-2 flex-shrink-0" />
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>

                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {formatTimestamp(activity.timestamp)}
                                  </span>
                                  {activity.details?.duration && (
                                    <span className="flex items-center">
                                      <Zap className="w-3 h-3 mr-1" />
                                      {activity.details.duration}m
                                    </span>
                                  )}
                                  {activity.details?.topic && (
                                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                                      {activity.details.topic}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                              </button>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                                  <div className="space-y-3">
                                    <div>
                                      <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                                        Details
                                      </h5>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-600">Date & Time:</span>
                                          <p className="text-gray-900 font-medium">
                                            {formatAbsoluteTimestamp(activity.timestamp)}
                                          </p>
                                        </div>
                                        {activity.details?.score !== undefined && (
                                          <div>
                                            <span className="text-gray-600">Score:</span>
                                            <p className="text-gray-900 font-medium">
                                              {activity.details.score}/{activity.details.maxScore} (
                                              {Math.round(
                                                (activity.details.score /
                                                  activity.details.maxScore!) *
                                                  100
                                              )}
                                              %)
                                            </p>
                                          </div>
                                        )}
                                        {activity.details?.duration && (
                                          <div>
                                            <span className="text-gray-600">Duration:</span>
                                            <p className="text-gray-900 font-medium">
                                              {activity.details.duration} minutes
                                            </p>
                                          </div>
                                        )}
                                        <div>
                                          <span className="text-gray-600">Status:</span>
                                          <p
                                            className={`font-medium ${activity.success ? 'text-green-600' : 'text-red-600'}`}
                                          >
                                            {activity.success ? 'Completed' : 'Incomplete'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {activity.details?.tags && activity.details.tags.length > 0 && (
                                      <div>
                                        <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                                          Tags
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                          {activity.details.tags.map((tag) => (
                                            <span
                                              key={tag}
                                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                                            >
                                              #{tag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {activity.details?.relatedContent && (
                                      <div>
                                        <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                                          <ExternalLink className="w-4 h-4 mr-2" />
                                          View Related Content
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {displayedCount < filteredActivities.length && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">
                  Showing {displayedCount} of {filteredActivities.length} activities. Scroll for
                  more...
                </p>
              </div>
            )}

            {filteredActivities.length === 0 && (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Activities Found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search query to find activities.
                </p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredActivities.length}</span> activities total
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ActivityHistoryModal
