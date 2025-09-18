'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  BookmarkIcon,
  EyeIcon,
  TagIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

interface Question {
  id: string
  topic: string
  subtopic: string
  curriculum: string
  grade: string
  type: 'MCQ' | 'SHORT_ANSWER' | 'DIAGRAM' | 'TRUE_FALSE'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  source: string
  marks: number
  timeLimit: number // seconds
  tags: string[]
  totalAttempts: number
  correctAttempts: number
  isBookmarked?: boolean
  lastAttempted?: Date
  userAnswer?: string
  isCorrect?: boolean
}

interface QuestionBankBrowserProps {
  className?: string
}

const QuestionBankBrowser = ({ className }: QuestionBankBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedCurriculum, setSelectedCurriculum] = useState('All')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'practice' | 'review'>('practice')
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  // Sample questions data
  const sampleQuestions: Question[] = [
    {
      id: '1',
      topic: 'Cell Biology',
      subtopic: 'Cell Structure',
      curriculum: 'NEET',
      grade: 'CLASS_11',
      type: 'MCQ',
      difficulty: 'Medium',
      question: 'Which of the following organelles is known as the "powerhouse of the cell"?',
      options: ['A) Nucleus', 'B) Mitochondria', 'C) Ribosome', 'D) Endoplasmic Reticulum'],
      correctAnswer: 'B) Mitochondria',
      explanation:
        'Mitochondria are called the powerhouse of the cell because they produce ATP through cellular respiration, providing energy for various cellular processes.',
      source: 'NEET 2023',
      marks: 4,
      timeLimit: 60,
      tags: ['mitochondria', 'organelles', 'cellular respiration'],
      totalAttempts: 1247,
      correctAttempts: 934,
      isBookmarked: true,
    },
    {
      id: '2',
      topic: 'Genetics',
      subtopic: "Mendel's Laws",
      curriculum: 'NEET',
      grade: 'CLASS_12',
      type: 'MCQ',
      difficulty: 'Hard',
      question:
        'In a dihybrid cross between AaBb × AaBb, what is the phenotypic ratio of the F2 generation?',
      options: ['A) 3:1', 'B) 9:3:3:1', 'C) 1:2:1', 'D) 1:1:1:1'],
      correctAnswer: 'B) 9:3:3:1',
      explanation:
        'In a dihybrid cross, the phenotypic ratio of F2 generation is 9:3:3:1, where 9 represents dominant for both traits, 3 represents dominant for first trait only, 3 represents dominant for second trait only, and 1 represents recessive for both traits.',
      source: 'CBSE 2022',
      marks: 4,
      timeLimit: 90,
      tags: ['dihybrid cross', 'mendel', 'genetics', 'inheritance'],
      totalAttempts: 892,
      correctAttempts: 445,
      isBookmarked: false,
    },
    {
      id: '3',
      topic: 'Human Physiology',
      subtopic: 'Digestive System',
      curriculum: 'CBSE',
      grade: 'CLASS_11',
      type: 'SHORT_ANSWER',
      difficulty: 'Medium',
      question: 'Explain the role of bile in digestion.',
      correctAnswer:
        'Bile helps in the emulsification of fats, breaking large fat globules into smaller ones for easier digestion by lipases.',
      explanation:
        'Bile, produced by the liver and stored in the gallbladder, contains bile salts that act as emulsifiers. They reduce the surface tension of fat globules, breaking them into smaller droplets. This increases the surface area for lipase enzymes to act upon, facilitating fat digestion and absorption.',
      source: 'CBSE Previous Year',
      marks: 2,
      timeLimit: 300,
      tags: ['bile', 'digestion', 'emulsification', 'liver'],
      totalAttempts: 567,
      correctAttempts: 423,
    },
    {
      id: '4',
      topic: 'Plant Physiology',
      subtopic: 'Photosynthesis',
      curriculum: 'ICSE',
      grade: 'CLASS_12',
      type: 'DIAGRAM',
      difficulty: 'Easy',
      question: 'Draw and label the structure of a chloroplast.',
      correctAnswer:
        'A diagram showing outer membrane, inner membrane, stroma, thylakoids, and granum.',
      explanation:
        'The chloroplast is bounded by a double membrane. The inner space is filled with stroma, which contains thylakoids arranged in stacks called grana. The thylakoid membrane contains chlorophyll and is the site of light reactions.',
      source: 'ICSE 2023',
      marks: 3,
      timeLimit: 600,
      tags: ['chloroplast', 'photosynthesis', 'diagram', 'structure'],
      totalAttempts: 345,
      correctAttempts: 287,
    },
  ]

  const topics = [
    'All',
    'Cell Biology',
    'Genetics',
    'Human Physiology',
    'Plant Physiology',
    'Ecology',
    'Evolution',
    'Biotechnology',
  ]
  const difficulties = ['All', 'Easy', 'Medium', 'Hard']
  const questionTypes = ['All', 'MCQ', 'SHORT_ANSWER', 'DIAGRAM', 'TRUE_FALSE']
  const curriculums = ['All', 'NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE']

  const filteredQuestions = sampleQuestions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTopic = selectedTopic === 'All' || question.topic === selectedTopic
    const matchesDifficulty =
      selectedDifficulty === 'All' || question.difficulty === selectedDifficulty
    const matchesType = selectedType === 'All' || question.type === selectedType
    const matchesCurriculum =
      selectedCurriculum === 'All' || question.curriculum === selectedCurriculum

    return matchesSearch && matchesTopic && matchesDifficulty && matchesType && matchesCurriculum
  })

  const handleBookmark = (questionId: string) => {
    console.log('Bookmark toggled for question:', questionId)
  }

  const handleAttempt = (question: Question) => {
    setSelectedQuestion(question)
  }

  const getSuccessRate = (question: Question) => {
    return question.totalAttempts > 0
      ? Math.round((question.correctAttempts / question.totalAttempts) * 100)
      : 0
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MCQ':
        return '✅'
      case 'SHORT_ANSWER':
        return '📝'
      case 'DIAGRAM':
        return '📊'
      case 'TRUE_FALSE':
        return '✔️'
      default:
        return '❓'
    }
  }

  if (selectedQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedQuestion(null)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Questions
              </button>
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getDifficultyColor(selectedQuestion.difficulty)
                  )}
                >
                  {selectedQuestion.difficulty}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedQuestion.marks} marks
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{getTypeIcon(selectedQuestion.type)}</span>
                <span className="font-medium text-gray-600">
                  {selectedQuestion.topic} • {selectedQuestion.subtopic}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-6">{selectedQuestion.question}</h2>

              {/* MCQ Options */}
              {selectedQuestion.options && (
                <div className="space-y-3 mb-6">
                  {selectedQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input type="radio" name="answer" className="text-blue-600" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Answer Input for other types */}
              {selectedQuestion.type === 'SHORT_ANSWER' && (
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg mb-6"
                  rows={4}
                  placeholder="Write your answer here..."
                />
              )}

              <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">
                  Submit Answer
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium">
                  Show Solution
                </button>
              </div>
            </div>

            {/* Question Info */}
            <div className="border-t pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Question Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source:</span>
                      <span className="font-medium">{selectedQuestion.source}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-medium">{selectedQuestion.timeLimit}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Success Rate:</span>
                      <span className="font-medium">{getSuccessRate(selectedQuestion)}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedQuestion.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen bg-gray-50', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <BeakerIcon className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">📖 Practice Question Bank</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Access 10,000+ Biology questions with detailed explanations and instant feedback
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions by topic, keywords, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('practice')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'practice'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Practice Mode
              </button>
              <button
                onClick={() => setViewMode('review')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  viewMode === 'review'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                Review Mode
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {questionTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Curriculum</label>
                <select
                  value={selectedCurriculum}
                  onChange={(e) => setSelectedCurriculum(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {curriculums.map((curr) => (
                    <option key={curr} value={curr}>
                      {curr}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedTopic('All')
                    setSelectedDifficulty('All')
                    setSelectedType('All')
                    setSelectedCurriculum('All')
                    setSearchQuery('')
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredQuestions.length} questions
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{getTypeIcon(question.type)}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {question.curriculum}
                    </span>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded',
                        getDifficultyColor(question.difficulty)
                      )}
                    >
                      {question.difficulty}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                      {question.marks} marks
                    </span>
                  </div>

                  {/* Question Preview */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{question.question}</h3>

                  <div className="text-sm text-gray-600 mb-3">
                    {question.topic} • {question.subtopic} • {question.source}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-4 w-4" />
                      {Math.floor(question.timeLimit / 60)}m {question.timeLimit % 60}s
                    </div>
                    <div className="flex items-center gap-1">
                      <EyeIcon className="h-4 w-4" />
                      {question.totalAttempts} attempts
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                      {getSuccessRate(question)}% success rate
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {question.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                    {question.tags.length > 4 && (
                      <span className="text-gray-500 text-xs">
                        +{question.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleBookmark(question.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {question.isBookmarked ? (
                      <BookmarkSolidIcon className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>

                  <button
                    onClick={() => handleAttempt(question)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    {viewMode === 'practice' ? 'Attempt' : 'Review'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestionBankBrowser
