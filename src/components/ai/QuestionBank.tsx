'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Heart,
  Clock,
  BarChart3,
  Users,
  Star,
  BookOpen,
  Target,
  TrendingUp,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Zap,
  ChevronDown,
  ChevronUp,
  Copy,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'

// Types and Interfaces
interface Question {
  id: string
  question: string
  type: 'mcq' | 'assertion' | 'numerical' | 'matching'
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  chapter: string
  subject: string
  options?: string[]
  correctAnswer: string
  explanation: string
  marks: number
  estimatedTime: number
  tags: string[]
  createdBy: string
  createdAt: string
  isFavorite: boolean
  usageCount: number
  lastUsed: string
  performanceStats: {
    totalAttempts: number
    correctAttempts: number
    averageTime: number
    difficultyRating: number
  }
  communityStats: {
    views: number
    likes: number
    dislikes: number
    comments: number
    rating: number
    totalRatings: number
  }
  isPublic: boolean
  contributorRating: number
}

interface QuestionFilter {
  keywords: string
  difficulty: string[]
  topics: string[]
  subjects: string[]
  types: string[]
  tags: string[]
  createdBy: string
  dateRange: {
    start: string
    end: string
  }
  usageRange: {
    min: number
    max: number
  }
  ratingRange: {
    min: number
    max: number
  }
  onlyFavorites: boolean
  onlyCommunity: boolean
}

const QuestionBank: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'filter' | 'favorites' | 'history' | 'stats' | 'community' | 'rating'>('search')
  const [questions, setQuestions] = useState<Question[]>([])
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating' | 'difficulty' | 'usage'>('recent')
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const [filters, setFilters] = useState<QuestionFilter>({
    keywords: '',
    difficulty: [],
    topics: [],
    subjects: [],
    types: [],
    tags: [],
    createdBy: '',
    dateRange: { start: '', end: '' },
    usageRange: { min: 0, max: 100 },
    ratingRange: { min: 0, max: 5 },
    onlyFavorites: false,
    onlyCommunity: false
  })

  // Mock data - replace with actual API calls
  const [availableOptions] = useState({
    subjects: ['Biology', 'Physics', 'Chemistry'],
    topics: [
      'Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Physiology',
      'Plant Physiology', 'Reproduction', 'Biotechnology', 'Molecular Biology',
      'Taxonomy', 'Anatomy', 'Environmental Biology'
    ],
    difficulties: ['easy', 'medium', 'hard'],
    types: ['mcq', 'assertion', 'numerical', 'matching'],
    tags: ['neet', 'jee', 'board', 'previous-year', 'conceptual', 'numerical', 'diagram-based']
  })

  // Initialize with mock questions
  useEffect(() => {
    generateMockQuestions()
  }, [])

  const generateMockQuestions = () => {
    const mockQuestions: Question[] = Array.from({ length: 50 }, (_, i) => ({
      id: `q_${i + 1}`,
      question: `Sample Biology question ${i + 1} about ${availableOptions.topics[i % availableOptions.topics.length]}`,
      type: availableOptions.types[Math.floor(Math.random() * availableOptions.types.length)] as any,
      difficulty: availableOptions.difficulties[Math.floor(Math.random() * availableOptions.difficulties.length)] as any,
      topic: availableOptions.topics[i % availableOptions.topics.length],
      subtopic: `Subtopic ${(i % 3) + 1}`,
      chapter: `Chapter ${Math.floor(i / 5) + 1}`,
      subject: 'Biology',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'A',
      explanation: `Detailed explanation for question ${i + 1}`,
      marks: [1, 2, 4][Math.floor(Math.random() * 3)],
      estimatedTime: Math.floor(Math.random() * 5) + 2,
      tags: [availableOptions.tags[Math.floor(Math.random() * availableOptions.tags.length)]],
      createdBy: ['Dr. Smith', 'Prof. Johnson', 'Dr. Patel', 'Community'][Math.floor(Math.random() * 4)],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      isFavorite: Math.random() > 0.7,
      usageCount: Math.floor(Math.random() * 50),
      lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      performanceStats: {
        totalAttempts: Math.floor(Math.random() * 1000) + 100,
        correctAttempts: Math.floor(Math.random() * 800) + 50,
        averageTime: Math.floor(Math.random() * 300) + 60,
        difficultyRating: Math.random() * 5
      },
      communityStats: {
        views: Math.floor(Math.random() * 5000) + 100,
        likes: Math.floor(Math.random() * 200) + 10,
        dislikes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 30),
        rating: Math.random() * 5,
        totalRatings: Math.floor(Math.random() * 100) + 10
      },
      isPublic: Math.random() > 0.3,
      contributorRating: Math.random() * 5
    }))

    setQuestions(mockQuestions)
    setFilteredQuestions(mockQuestions)
  }

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters({ ...filters, keywords: query })
  }

  // Filter functionality
  const applyFilters = (newFilters: QuestionFilter) => {
    setFilters(newFilters)
    let filtered = [...questions]

    // Keywords search
    if (newFilters.keywords) {
      const keywords = newFilters.keywords.toLowerCase().split(' ')
      filtered = filtered.filter(q =>
        keywords.some(keyword =>
          q.question.toLowerCase().includes(keyword) ||
          q.topic.toLowerCase().includes(keyword) ||
          q.tags.some(tag => tag.toLowerCase().includes(keyword))
        )
      )
    }

    // Difficulty filter
    if (newFilters.difficulty.length > 0) {
      filtered = filtered.filter(q => newFilters.difficulty.includes(q.difficulty))
    }

    // Topic filter
    if (newFilters.topics.length > 0) {
      filtered = filtered.filter(q => newFilters.topics.includes(q.topic))
    }

    // Type filter
    if (newFilters.types.length > 0) {
      filtered = filtered.filter(q => newFilters.types.includes(q.type))
    }

    // Favorites filter
    if (newFilters.onlyFavorites) {
      filtered = filtered.filter(q => q.isFavorite)
    }

    // Community filter
    if (newFilters.onlyCommunity) {
      filtered = filtered.filter(q => q.isPublic && q.createdBy === 'Community')
    }

    // Rating range filter
    filtered = filtered.filter(q =>
      q.communityStats.rating >= newFilters.ratingRange.min &&
      q.communityStats.rating <= newFilters.ratingRange.max
    )

    // Usage range filter
    filtered = filtered.filter(q =>
      q.usageCount >= newFilters.usageRange.min &&
      q.usageCount <= newFilters.usageRange.max
    )

    // Sort filtered results
    filtered = sortQuestions(filtered, sortBy)

    setFilteredQuestions(filtered)
  }

  // Sort functionality
  const sortQuestions = (questionsToSort: Question[], sortType: string) => {
    return [...questionsToSort].sort((a, b) => {
      switch (sortType) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popular':
          return b.communityStats.views - a.communityStats.views
        case 'rating':
          return b.communityStats.rating - a.communityStats.rating
        case 'difficulty':
          const diffOrder = { easy: 1, medium: 2, hard: 3 }
          return diffOrder[a.difficulty] - diffOrder[b.difficulty]
        case 'usage':
          return b.usageCount - a.usageCount
        default:
          return 0
      }
    })
  }

  // Favorite functionality
  const toggleFavorite = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, isFavorite: !q.isFavorite } : q
      )
    )
    setFilteredQuestions(prev =>
      prev.map(q =>
        q.id === questionId ? { ...q, isFavorite: !q.isFavorite } : q
      )
    )
  }

  // Rating functionality
  const rateQuestion = (questionId: string, rating: number) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              communityStats: {
                ...q.communityStats,
                rating: ((q.communityStats.rating * q.communityStats.totalRatings) + rating) / (q.communityStats.totalRatings + 1),
                totalRatings: q.communityStats.totalRatings + 1
              }
            }
          : q
      )
    )
  }

  // Question selection
  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mcq': return 'text-blue-600 bg-blue-100'
      case 'assertion': return 'text-purple-600 bg-purple-100'
      case 'numerical': return 'text-green-600 bg-green-100'
      case 'matching': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Question Bank
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive question management system with advanced search, filtering, performance tracking, and community features
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'search', label: 'Search', icon: Search },
            { id: 'filter', label: 'Filter', icon: Filter },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'history', label: 'History', icon: Clock },
            { id: 'stats', label: 'Statistics', icon: BarChart3 },
            { id: 'community', label: 'Community', icon: Users },
            { id: 'rating', label: 'Rating', icon: Star }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Search Tab */}
        {activeTab === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search questions by keywords, topics, or tags..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="difficulty">By Difficulty</option>
                  <option value="usage">Most Used</option>
                </select>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
                  >
                    <BookOpen className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Search Results Summary */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{filteredQuestions.length} questions found</span>
                {selectedQuestions.length > 0 && (
                  <span>{selectedQuestions.length} questions selected</span>
                )}
              </div>
            </div>

            {/* Question List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 border hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="checkbox"
                          checked={selectedQuestions.includes(question.id)}
                          onChange={() => toggleQuestionSelection(question.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(question.type)}`}>
                          {question.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">{question.topic}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{question.marks} marks</span>
                      </div>

                      <p className="text-gray-800 font-medium mb-2 line-clamp-2">
                        {question.question}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {question.communityStats.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {question.communityStats.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {question.communityStats.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Used {question.usageCount} times
                        </span>
                        <span>By {question.createdBy}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleFavorite(question.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          question.isFavorite
                            ? 'text-red-600 bg-red-100 hover:bg-red-200'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${question.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {expandedQuestion === question.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedQuestion === question.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t"
                      >
                        {question.options && (
                          <div className="space-y-2 mb-4">
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className={`p-2 rounded-lg ${
                                  String.fromCharCode(65 + index) === question.correctAnswer
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100'
                                }`}
                              >
                                {String.fromCharCode(65 + index)}. {option}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-blue-800 mb-2">Explanation:</h4>
                          <p className="text-blue-700">{question.explanation}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-500">Attempts</span>
                            <p className="font-semibold">{question.performanceStats.totalAttempts}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-500">Success Rate</span>
                            <p className="font-semibold">
                              {((question.performanceStats.correctAttempts / question.performanceStats.totalAttempts) * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-500">Avg Time</span>
                            <p className="font-semibold">{Math.floor(question.performanceStats.averageTime / 60)}m {question.performanceStats.averageTime % 60}s</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-gray-500">Community Rating</span>
                            <p className="font-semibold">{question.communityStats.rating.toFixed(1)}/5</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
                            <Copy className="w-4 h-4" />
                            Copy
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-100 transition-colors">
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-100 transition-colors">
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filter Tab */}
        {activeTab === 'filter' && (
          <motion.div
            key="filter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Basic Filters */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-indigo-600" />
                Basic Filters
              </h3>

              <div className="space-y-4">
                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <div className="flex gap-2">
                    {availableOptions.difficulties.map(difficulty => (
                      <label key={difficulty} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(difficulty)}
                          onChange={(e) => {
                            const newDifficulty = e.target.checked
                              ? [...filters.difficulty, difficulty]
                              : filters.difficulty.filter(d => d !== difficulty)
                            applyFilters({ ...filters, difficulty: newDifficulty })
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                          {difficulty}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topic Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topics
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {availableOptions.topics.map(topic => (
                      <label key={topic} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.topics.includes(topic)}
                          onChange={(e) => {
                            const newTopics = e.target.checked
                              ? [...filters.topics, topic]
                              : filters.topics.filter(t => t !== topic)
                            applyFilters({ ...filters, topics: newTopics })
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Types
                  </label>
                  <div className="flex gap-2">
                    {availableOptions.types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.types.includes(type)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...filters.types, type]
                              : filters.types.filter(t => t !== type)
                            applyFilters({ ...filters, types: newTypes })
                          }}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(type)}`}>
                          {type.toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Advanced Filters
              </h3>

              <div className="space-y-4">
                {/* Rating Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Community Rating Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={filters.ratingRange.min}
                      onChange={(e) => applyFilters({
                        ...filters,
                        ratingRange: { ...filters.ratingRange, min: parseFloat(e.target.value) }
                      })}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 min-w-[4rem]">
                      {filters.ratingRange.min.toFixed(1)} - {filters.ratingRange.max.toFixed(1)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={filters.ratingRange.max}
                      onChange={(e) => applyFilters({
                        ...filters,
                        ratingRange: { ...filters.ratingRange, max: parseFloat(e.target.value) }
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Usage Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usage Count Range
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.usageRange.min}
                      onChange={(e) => applyFilters({
                        ...filters,
                        usageRange: { ...filters.usageRange, min: parseInt(e.target.value) }
                      })}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 min-w-[4rem]">
                      {filters.usageRange.min} - {filters.usageRange.max}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.usageRange.max}
                      onChange={(e) => applyFilters({
                        ...filters,
                        usageRange: { ...filters.usageRange, max: parseInt(e.target.value) }
                      })}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Toggle Filters */}
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.onlyFavorites}
                      onChange={(e) => applyFilters({ ...filters, onlyFavorites: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm">Only show favorites</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.onlyCommunity}
                      onChange={(e) => applyFilters({ ...filters, onlyCommunity: e.target.checked })}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm">Only show community questions</span>
                  </label>
                </div>

                {/* Creator Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created By
                  </label>
                  <input
                    type="text"
                    placeholder="Filter by creator name"
                    value={filters.createdBy}
                    onChange={(e) => applyFilters({ ...filters, createdBy: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {filteredQuestions.length} questions match your filters
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFilters({
                        keywords: '',
                        difficulty: [],
                        topics: [],
                        subjects: [],
                        types: [],
                        tags: [],
                        createdBy: '',
                        dateRange: { start: '', end: '' },
                        usageRange: { min: 0, max: 100 },
                        ratingRange: { min: 0, max: 5 },
                        onlyFavorites: false,
                        onlyCommunity: false
                      })
                      setFilteredQuestions(questions)
                    }}
                    className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Save Filter Set
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Favorite Questions
              </h3>

              <div className="space-y-4">
                {questions.filter(q => q.isFavorite).map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{question.topic}</span>
                        </div>
                        <p className="text-gray-800 font-medium line-clamp-1">{question.question}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Used {question.usageCount} times • Rating: {question.communityStats.rating.toFixed(1)}/5
                        </p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(question.id)}
                        className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
                {questions.filter(q => q.isFavorite).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No favorite questions yet. Start adding questions to your favorites!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Question Usage History
              </h3>

              <div className="space-y-4">
                {questions
                  .sort((a, b) => new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime())
                  .slice(0, 20)
                  .map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{question.topic}</span>
                          <span className="text-xs text-gray-400">
                            Last used: {new Date(question.lastUsed).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium line-clamp-1">{question.question}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span>Used {question.usageCount} times</span>
                          <span>
                            Success rate: {((question.performanceStats.correctAttempts / question.performanceStats.totalAttempts) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">
                          {question.usageCount} uses
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.floor(question.performanceStats.averageTime / 60)}m {question.performanceStats.averageTime % 60}s avg
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Performance Statistics */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Performance Statistics
              </h3>

              <div className="space-y-4">
                {questions.slice(0, 10).map((question) => (
                  <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm line-clamp-1">{question.question}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Attempts</span>
                        <p className="font-semibold">{question.performanceStats.totalAttempts}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Success Rate</span>
                        <p className="font-semibold text-green-600">
                          {((question.performanceStats.correctAttempts / question.performanceStats.totalAttempts) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Avg Time</span>
                        <p className="font-semibold">
                          {Math.floor(question.performanceStats.averageTime / 60)}m {question.performanceStats.averageTime % 60}s
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Distribution */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Topic Distribution
              </h3>

              <div className="space-y-3">
                {availableOptions.topics.map(topic => {
                  const topicQuestions = questions.filter(q => q.topic === topic)
                  const percentage = (topicQuestions.length / questions.length * 100).toFixed(1)
                  return (
                    <div key={topic} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{topic}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 min-w-[3rem]">{percentage}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Overall Statistics */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Overall Statistics
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-sm text-blue-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {questions.filter(q => q.isFavorite).length}
                  </div>
                  <div className="text-sm text-green-600">Favorites</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(questions.reduce((sum, q) => sum + q.communityStats.rating, 0) / questions.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-purple-600">Avg Rating</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(questions.reduce((sum, q) => sum + q.usageCount, 0) / questions.length)}
                  </div>
                  <div className="text-sm text-orange-600">Avg Usage</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <motion.div
            key="community"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Community Question Pool
              </h3>

              <div className="space-y-4">
                {questions
                  .filter(q => q.isPublic)
                  .sort((a, b) => b.communityStats.views - a.communityStats.views)
                  .slice(0, 15)
                  .map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{question.topic}</span>
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            {question.createdBy}
                          </span>
                        </div>
                        <p className="text-gray-800 font-medium line-clamp-2 mb-2">{question.question}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {question.communityStats.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            {question.communityStats.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {question.communityStats.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4" />
                            {question.communityStats.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(question.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            question.isFavorite
                              ? 'text-red-600 bg-red-100'
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${question.isFavorite ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="flex items-center gap-2 mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-4 h-4" />
                  Contribute Question
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rating Tab */}
        {activeTab === 'rating' && (
          <motion.div
            key="rating"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-600" />
                Question Rating System
              </h3>

              <div className="space-y-4">
                {questions
                  .sort((a, b) => b.communityStats.rating - a.communityStats.rating)
                  .slice(0, 15)
                  .map((question) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{question.topic}</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= question.communityStats.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">
                              ({question.communityStats.totalRatings})
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium line-clamp-2 mb-2">{question.question}</p>
                        <div className="text-sm text-gray-500">
                          Created by {question.createdBy} • {question.communityStats.rating.toFixed(1)}/5 rating
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => rateQuestion(question.id, star)}
                              className="p-1 hover:bg-yellow-50 rounded transition-colors"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= question.communityStats.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300 hover:text-yellow-400'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QuestionBank