'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import {
  BookOpen,
  Search,
  Filter,
  Eye,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Clock,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type QuestionType =
  | 'MCQ'
  | 'SHORT_ANSWER'
  | 'DIAGRAM'
  | 'TRUE_FALSE'
  | 'FILL_BLANK'
  | 'MULTIPLE_SELECT'
  | 'MATCH_FOLLOWING'
  | 'NUMERICAL'
type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
type QuestionCategory =
  | 'PRACTICE'
  | 'MOCK_TEST'
  | 'PREVIOUS_YEAR'
  | 'CONCEPT_BUILDER'
  | 'COMPETITIVE'

interface Question {
  id: string
  topic: string
  subtopic?: string
  curriculum: string
  grade: string
  type: QuestionType
  question: string
  options?: any
  correctAnswer: string
  explanation?: string
  marks: number
  difficulty: DifficultyLevel
  category: QuestionCategory
  isVerified: boolean
  totalAttempts: number
  correctAttempts: number
  averageTime?: number
  tags?: any
  createdAt: string
}

interface Statistics {
  totalQuestions: number
  averageMarks: number
  verifiedQuestions: number
  byDifficulty: Record<string, number>
  byType: Record<string, number>
}

export default function TeacherQuestionsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [statistics, setStatistics] = useState<Statistics>({
    totalQuestions: 0,
    averageMarks: 0,
    verifiedQuestions: 0,
    byDifficulty: {},
    byType: {},
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    curriculum: '',
    grade: '',
    topic: '',
    type: '',
    difficulty: '',
    category: '',
    isVerified: '',
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalCount: 0,
    totalPages: 0,
  })
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'TEACHER')) {
      window.location.href = '/auth/signin'
      return
    }
  }, [authLoading, isAuthenticated, user])

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        params.append('page', pagination.page.toString())
        params.append('limit', pagination.limit.toString())
        if (searchQuery) params.append('search', searchQuery)
        if (filters.curriculum) params.append('curriculum', filters.curriculum)
        if (filters.grade) params.append('grade', filters.grade)
        if (filters.topic) params.append('topic', filters.topic)
        if (filters.type) params.append('type', filters.type)
        if (filters.difficulty) params.append('difficulty', filters.difficulty)
        if (filters.category) params.append('category', filters.category)
        if (filters.isVerified) params.append('isVerified', filters.isVerified)

        const response = await fetch(`/api/teacher/questions?${params}`)
        const data = await response.json()

        if (response.ok) {
          setQuestions(data.questions)
          setPagination(data.pagination)
          setStatistics(data.statistics)
        }
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user?.role === 'TEACHER') {
      fetchQuestions()
    }
  }, [isAuthenticated, user, searchQuery, filters, pagination.page])

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-green-100 text-green-800'
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800'
      case 'HARD':
        return 'bg-orange-100 text-orange-800'
      case 'EXPERT':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeLabel = (type: QuestionType) => {
    switch (type) {
      case 'MCQ':
        return 'Multiple Choice'
      case 'SHORT_ANSWER':
        return 'Short Answer'
      case 'TRUE_FALSE':
        return 'True/False'
      case 'FILL_BLANK':
        return 'Fill in Blank'
      case 'MULTIPLE_SELECT':
        return 'Multiple Select'
      case 'MATCH_FOLLOWING':
        return 'Match Following'
      case 'NUMERICAL':
        return 'Numerical'
      case 'DIAGRAM':
        return 'Diagram'
      default:
        return type
    }
  }

  const calculateAccuracy = (question: Question) => {
    if (question.totalAttempts === 0) return null
    return ((question.correctAttempts / question.totalAttempts) * 100).toFixed(1)
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            Question Bank
          </h1>
          <p className="text-gray-600 mt-2">
            Browse and explore questions for assignments and tests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.totalQuestions}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">{statistics.verifiedQuestions}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average Marks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statistics.averageMarks.toFixed(1)}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Question Types</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.keys(statistics.byType).length}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search questions by topic, subtopic, or content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters && ' (Hide)'}
              </Button>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
                  <select
                    value={filters.curriculum}
                    onChange={(e) => setFilters({ ...filters, curriculum: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Curricula</option>
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="STATE">State Board</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                  <select
                    value={filters.grade}
                    onChange={(e) => setFilters({ ...filters, grade: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Grades</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Types</option>
                    <option value="MCQ">Multiple Choice</option>
                    <option value="SHORT_ANSWER">Short Answer</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_BLANK">Fill in Blank</option>
                    <option value="MULTIPLE_SELECT">Multiple Select</option>
                    <option value="NUMERICAL">Numerical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Difficulties</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                    <option value="EXPERT">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Categories</option>
                    <option value="PRACTICE">Practice</option>
                    <option value="MOCK_TEST">Mock Test</option>
                    <option value="PREVIOUS_YEAR">Previous Year</option>
                    <option value="CONCEPT_BUILDER">Concept Builder</option>
                    <option value="COMPETITIVE">Competitive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Status
                  </label>
                  <select
                    value={filters.isVerified}
                    onChange={(e) => setFilters({ ...filters, isVerified: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">All Questions</option>
                    <option value="true">Verified Only</option>
                    <option value="false">Unverified Only</option>
                  </select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading questions...</p>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {question.curriculum} - Class {question.grade}
                          </Badge>
                          <Badge className={cn('text-xs', getDifficultyColor(question.difficulty))}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(question.type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.category.replace('_', ' ')}
                          </Badge>
                          {question.isVerified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Topic: {question.topic}
                            {question.subtopic && ` → ${question.subtopic}`}
                          </p>
                          <p className="text-gray-900 line-clamp-2">{question.question}</p>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span>{question.marks} marks</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>{question.totalAttempts} attempts</span>
                          </div>
                          {calculateAccuracy(question) && (
                            <div className="flex items-center gap-1">
                              <BarChart3 className="h-4 w-4" />
                              <span>{calculateAccuracy(question)}% accuracy</span>
                            </div>
                          )}
                          {question.averageTime && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{Math.round(question.averageTime / 60)}s avg</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedQuestion(question)}
                        className="flex-shrink-0"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                  {pagination.totalCount} questions
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {selectedQuestion && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedQuestion(null)}
          >
            <Card
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Question Details</h2>
                  <Button variant="outline" size="sm" onClick={() => setSelectedQuestion(null)}>
                    Close
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">
                      {selectedQuestion.curriculum} - Class {selectedQuestion.grade}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                      {selectedQuestion.difficulty}
                    </Badge>
                    <Badge variant="outline">{getTypeLabel(selectedQuestion.type)}</Badge>
                    <Badge variant="outline">{selectedQuestion.category.replace('_', ' ')}</Badge>
                    {selectedQuestion.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Topic & Subtopic</p>
                    <p className="text-gray-900">
                      {selectedQuestion.topic}
                      {selectedQuestion.subtopic && ` → ${selectedQuestion.subtopic}`}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Question</p>
                    <p className="text-gray-900 whitespace-pre-wrap">{selectedQuestion.question}</p>
                  </div>

                  {selectedQuestion.options && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Options</p>
                      <div className="space-y-2">
                        {Object.entries(selectedQuestion.options).map(([key, value]) => (
                          <div
                            key={key}
                            className={cn(
                              'p-3 rounded-lg border',
                              selectedQuestion.correctAnswer === key
                                ? 'bg-green-50 border-green-500'
                                : 'bg-gray-50 border-gray-200'
                            )}
                          >
                            <span className="font-medium">{key}:</span> {String(value)}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Correct Answer</p>
                    <p className="text-gray-900 font-medium">{selectedQuestion.correctAnswer}</p>
                  </div>

                  {selectedQuestion.explanation && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Explanation</p>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Marks</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedQuestion.marks}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Attempts</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedQuestion.totalAttempts}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Correct Attempts</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedQuestion.correctAttempts}
                      </p>
                    </div>
                    {calculateAccuracy(selectedQuestion) && (
                      <div>
                        <p className="text-sm text-gray-600">Accuracy</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {calculateAccuracy(selectedQuestion)}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
