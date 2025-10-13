'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Database,
  CheckSquare,
  Square,
  MoreHorizontal,
  Filter,
  Download,
  Upload,
  Copy,
  Trash2,
  Edit3,
  RefreshCw,
  Settings,
  Target,
  BarChart3,
  Clock,
  Tag,
  BookOpen,
  Zap,
  AlertTriangle,
  CheckCircle2,
  X,
  Search,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  FileText,
  Save,
  PlayCircle
} from 'lucide-react'

interface Question {
  id: string
  question: string
  type: 'mcq' | 'assertion' | 'numerical' | 'matching'
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  chapter: string
  marks: number
  estimatedTime: number
  bloomsLevel: string
  tags: string[]
  selected?: boolean
}

interface BatchOperation {
  id: string
  type: 'edit' | 'delete' | 'duplicate' | 'export' | 'tag' | 'difficulty' | 'marks' | 'time'
  label: string
  icon: React.ReactNode
  description: string
  requiresInput?: boolean
  inputType?: 'text' | 'select' | 'number' | 'tags'
  options?: string[]
}

interface BatchFilter {
  difficulty: string[]
  topics: string[]
  types: string[]
  bloomsLevels: string[]
  markRange: [number, number]
  timeRange: [number, number]
  searchQuery: string
}

interface BatchOperationsPanelProps {
  questions: Question[]
  onQuestionsUpdate: (questions: Question[]) => void
  onBulkGenerate: (criteria: any) => void
  isGenerating: boolean
}

const BatchOperationsPanel: React.FC<BatchOperationsPanelProps> = ({
  questions,
  onQuestionsUpdate,
  onBulkGenerate,
  isGenerating
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [showBulkGenerate, setShowBulkGenerate] = useState(false)
  const [activeOperation, setActiveOperation] = useState<BatchOperation | null>(null)
  const [operationValue, setOperationValue] = useState('')

  const [filters, setFilters] = useState<BatchFilter>({
    difficulty: [],
    topics: [],
    types: [],
    bloomsLevels: [],
    markRange: [1, 10],
    timeRange: [30, 600],
    searchQuery: ''
  })

  const [bulkGenerate, setBulkGenerate] = useState({
    topicsToGenerate: [] as string[],
    questionsPerTopic: 5,
    difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
    questionTypes: { mcq: 70, assertion: 20, numerical: 10, matching: 0 },
    totalQuestions: 50,
    generateMode: 'balanced' as 'balanced' | 'topic-focused' | 'difficulty-focused'
  })

  const batchOperations: BatchOperation[] = [
    {
      id: 'edit-difficulty',
      type: 'difficulty',
      label: 'Change Difficulty',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Update difficulty level for selected questions',
      requiresInput: true,
      inputType: 'select',
      options: ['easy', 'medium', 'hard']
    },
    {
      id: 'edit-marks',
      type: 'marks',
      label: 'Update Marks',
      icon: <Target className="w-4 h-4" />,
      description: 'Change marks for selected questions',
      requiresInput: true,
      inputType: 'number'
    },
    {
      id: 'edit-time',
      type: 'time',
      label: 'Update Time',
      icon: <Clock className="w-4 h-4" />,
      description: 'Change estimated time for selected questions',
      requiresInput: true,
      inputType: 'number'
    },
    {
      id: 'add-tags',
      type: 'tag',
      label: 'Add Tags',
      icon: <Tag className="w-4 h-4" />,
      description: 'Add tags to selected questions',
      requiresInput: true,
      inputType: 'tags'
    },
    {
      id: 'duplicate',
      type: 'duplicate',
      label: 'Duplicate',
      icon: <Copy className="w-4 h-4" />,
      description: 'Create copies of selected questions',
      requiresInput: false
    },
    {
      id: 'export',
      type: 'export',
      label: 'Export',
      icon: <Download className="w-4 h-4" />,
      description: 'Export selected questions',
      requiresInput: false
    },
    {
      id: 'delete',
      type: 'delete',
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      description: 'Remove selected questions',
      requiresInput: false
    }
  ]

  // Get unique values for filter options
  const uniqueTopics = Array.from(new Set(questions.map(q => q.topic)))
  const uniqueChapters = Array.from(new Set(questions.map(q => q.chapter)))
  const uniqueBloomsLevels = Array.from(new Set(questions.map(q => q.bloomsLevel)))

  // Filter questions based on current filters
  const filteredQuestions = questions.filter(question => {
    if (filters.searchQuery && !question.question.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false
    }
    if (filters.difficulty.length > 0 && !filters.difficulty.includes(question.difficulty)) {
      return false
    }
    if (filters.topics.length > 0 && !filters.topics.includes(question.topic)) {
      return false
    }
    if (filters.types.length > 0 && !filters.types.includes(question.type)) {
      return false
    }
    if (filters.bloomsLevels.length > 0 && !filters.bloomsLevels.includes(question.bloomsLevel)) {
      return false
    }
    if (question.marks < filters.markRange[0] || question.marks > filters.markRange[1]) {
      return false
    }
    if (question.estimatedTime < filters.timeRange[0] || question.estimatedTime > filters.timeRange[1]) {
      return false
    }
    return true
  })

  const handleSelectAll = useCallback(() => {
    if (selectedQuestions.size === filteredQuestions.length) {
      setSelectedQuestions(new Set())
    } else {
      setSelectedQuestions(new Set(filteredQuestions.map(q => q.id)))
    }
  }, [selectedQuestions.size, filteredQuestions])

  const handleSelectQuestion = useCallback((questionId: string) => {
    const newSelected = new Set(selectedQuestions)
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId)
    } else {
      newSelected.add(questionId)
    }
    setSelectedQuestions(newSelected)
  }, [selectedQuestions])

  const executeBatchOperation = async (operation: BatchOperation) => {
    const selectedQuestionObjects = questions.filter(q => selectedQuestions.has(q.id))

    switch (operation.type) {
      case 'difficulty':
        const updatedDifficultyQuestions = questions.map(q =>
          selectedQuestions.has(q.id)
            ? { ...q, difficulty: operationValue as 'easy' | 'medium' | 'hard' }
            : q
        )
        onQuestionsUpdate(updatedDifficultyQuestions)
        break

      case 'marks':
        const updatedMarksQuestions = questions.map(q =>
          selectedQuestions.has(q.id)
            ? { ...q, marks: parseInt(operationValue) || q.marks }
            : q
        )
        onQuestionsUpdate(updatedMarksQuestions)
        break

      case 'time':
        const updatedTimeQuestions = questions.map(q =>
          selectedQuestions.has(q.id)
            ? { ...q, estimatedTime: parseInt(operationValue) || q.estimatedTime }
            : q
        )
        onQuestionsUpdate(updatedTimeQuestions)
        break

      case 'tag':
        const newTags = operationValue.split(',').map(tag => tag.trim()).filter(tag => tag)
        const updatedTagQuestions = questions.map(q =>
          selectedQuestions.has(q.id)
            ? { ...q, tags: [...new Set([...q.tags, ...newTags])] }
            : q
        )
        onQuestionsUpdate(updatedTagQuestions)
        break

      case 'duplicate':
        const duplicatedQuestions = selectedQuestionObjects.map(q => ({
          ...q,
          id: `${q.id}_copy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          question: `${q.question} (Copy)`
        }))
        onQuestionsUpdate([...questions, ...duplicatedQuestions])
        break

      case 'export':
        const exportData = {
          questions: selectedQuestionObjects,
          exportDate: new Date().toISOString(),
          totalQuestions: selectedQuestionObjects.length
        }
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `questions-export-${Date.now()}.json`
        link.click()
        break

      case 'delete':
        const remainingQuestions = questions.filter(q => !selectedQuestions.has(q.id))
        onQuestionsUpdate(remainingQuestions)
        setSelectedQuestions(new Set())
        break
    }

    setActiveOperation(null)
    setOperationValue('')
  }

  const handleBulkGenerate = async () => {
    const criteria = {
      topics: bulkGenerate.topicsToGenerate,
      questionsPerTopic: bulkGenerate.questionsPerTopic,
      totalQuestions: bulkGenerate.totalQuestions,
      difficultyDistribution: bulkGenerate.difficultyDistribution,
      questionTypes: bulkGenerate.questionTypes,
      mode: bulkGenerate.generateMode
    }

    await onBulkGenerate(criteria)
    setShowBulkGenerate(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              Batch Operations & Bulk Generation
            </h3>
            <p className="text-gray-600 mt-2">
              Manage multiple questions at once and generate questions in bulk
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBulkGenerate(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Bulk Generate
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedQuestions.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">
                  {selectedQuestions.size} question{selectedQuestions.size !== 1 ? 's' : ''} selected
                </span>
              </div>

              <div className="flex items-center gap-2">
                {batchOperations.map(operation => (
                  <button
                    key={operation.id}
                    onClick={() => setActiveOperation(operation)}
                    className="px-3 py-1 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1 text-sm"
                    title={operation.description}
                  >
                    {operation.icon}
                    {operation.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t pt-6 mb-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-3 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Questions</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={filters.searchQuery}
                      onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                      placeholder="Search question text..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <div className="space-y-1">
                    {['easy', 'medium', 'hard'].map(difficulty => (
                      <label key={difficulty} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(difficulty)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, difficulty: [...prev.difficulty, difficulty] }))
                            } else {
                              setFilters(prev => ({ ...prev, difficulty: prev.difficulty.filter(d => d !== difficulty) }))
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="capitalize">{difficulty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topics Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topics</label>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {uniqueTopics.map(topic => (
                      <label key={topic} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={filters.topics.includes(topic)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, topics: [...prev.topics, topic] }))
                            } else {
                              setFilters(prev => ({ ...prev, topics: prev.topics.filter(t => t !== topic) }))
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span>{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question Types Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Types</label>
                  <div className="space-y-1">
                    {['mcq', 'assertion', 'numerical', 'matching'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={filters.types.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({ ...prev, types: [...prev.types, type] }))
                            } else {
                              setFilters(prev => ({ ...prev, types: prev.types.filter(t => t !== type) }))
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="uppercase">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => setFilters({
                    difficulty: [],
                    topics: [],
                    types: [],
                    bloomsLevels: [],
                    markRange: [1, 10],
                    timeRange: [30, 600],
                    searchQuery: ''
                  })}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Questions Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                {selectedQuestions.size === filteredQuestions.length && filteredQuestions.length > 0 ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
                Select All ({filteredQuestions.length})
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {filteredQuestions.length} of {questions.length} questions
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-12 p-3"></th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Question</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Difficulty</th>
                <th className="text-left p-3 text-sm font-medium text-gray-700">Topic</th>
                <th className="text-center p-3 text-sm font-medium text-gray-700">Marks</th>
                <th className="text-center p-3 text-sm font-medium text-gray-700">Time</th>
                <th className="text-center p-3 text-sm font-medium text-gray-700">Tags</th>
                <th className="w-16 p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredQuestions.map((question, index) => (
                <tr key={question.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <button
                      onClick={() => handleSelectQuestion(question.id)}
                      className="text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {selectedQuestions.has(question.id) ? (
                        <CheckSquare className="w-4 h-4" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="max-w-md">
                      <p className="text-sm text-gray-800 line-clamp-2">{question.question}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium uppercase">
                      {question.type}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded border text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">{question.topic}</div>
                      <div className="text-gray-500">{question.subtopic}</div>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-medium text-gray-800">{question.marks}</span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-sm text-gray-600">{Math.round(question.estimatedTime / 60)}m</span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1">
                      {question.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {question.tags.length > 2 && (
                        <span className="text-xs text-gray-500">+{question.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuestions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No questions match your current filters</p>
            <button
              onClick={() => setFilters({
                difficulty: [],
                topics: [],
                types: [],
                bloomsLevels: [],
                markRange: [1, 10],
                timeRange: [30, 600],
                searchQuery: ''
              })}
              className="mt-2 text-purple-600 hover:text-purple-700 text-sm"
            >
              Clear filters to see all questions
            </button>
          </div>
        )}
      </div>

      {/* Batch Operation Modal */}
      <AnimatePresence>
        {activeOperation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  {activeOperation.icon}
                  {activeOperation.label}
                </h4>
                <button
                  onClick={() => setActiveOperation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-600 mb-4">{activeOperation.description}</p>
              <p className="text-sm text-gray-500 mb-4">
                This will affect {selectedQuestions.size} selected question{selectedQuestions.size !== 1 ? 's' : ''}.
              </p>

              {activeOperation.requiresInput && (
                <div className="mb-4">
                  {activeOperation.inputType === 'select' ? (
                    <select
                      value={operationValue}
                      onChange={(e) => setOperationValue(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select {activeOperation.type}...</option>
                      {activeOperation.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : activeOperation.inputType === 'number' ? (
                    <input
                      type="number"
                      value={operationValue}
                      onChange={(e) => setOperationValue(e.target.value)}
                      placeholder={`Enter ${activeOperation.type}...`}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : activeOperation.inputType === 'tags' ? (
                    <input
                      type="text"
                      value={operationValue}
                      onChange={(e) => setOperationValue(e.target.value)}
                      placeholder="Enter tags separated by commas..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  ) : (
                    <input
                      type="text"
                      value={operationValue}
                      onChange={(e) => setOperationValue(e.target.value)}
                      placeholder={`Enter ${activeOperation.type}...`}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActiveOperation(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeBatchOperation(activeOperation)}
                  disabled={activeOperation.requiresInput && !operationValue}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeOperation.type === 'delete'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {activeOperation.label}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Generate Modal */}
      <AnimatePresence>
        {showBulkGenerate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-semibold flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Bulk Question Generation
                </h4>
                <button
                  onClick={() => setShowBulkGenerate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Generation Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Generation Mode</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'balanced', label: 'Balanced', desc: 'Even distribution across topics' },
                      { id: 'topic-focused', label: 'Topic Focused', desc: 'Focus on specific topics' },
                      { id: 'difficulty-focused', label: 'Difficulty Focused', desc: 'Focus on difficulty distribution' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setBulkGenerate(prev => ({ ...prev, generateMode: mode.id as any }))}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          bulkGenerate.generateMode === mode.id
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm">{mode.label}</div>
                        <div className="text-xs text-gray-600 mt-1">{mode.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Topics to Generate</label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
                    {uniqueTopics.map(topic => (
                      <label key={topic} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={bulkGenerate.topicsToGenerate.includes(topic)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkGenerate(prev => ({
                                ...prev,
                                topicsToGenerate: [...prev.topicsToGenerate, topic]
                              }))
                            } else {
                              setBulkGenerate(prev => ({
                                ...prev,
                                topicsToGenerate: prev.topicsToGenerate.filter(t => t !== topic)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Generation Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Total Questions</label>
                    <input
                      type="number"
                      value={bulkGenerate.totalQuestions}
                      onChange={(e) => setBulkGenerate(prev => ({ ...prev, totalQuestions: parseInt(e.target.value) || 50 }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Questions per Topic</label>
                    <input
                      type="number"
                      value={bulkGenerate.questionsPerTopic}
                      onChange={(e) => setBulkGenerate(prev => ({ ...prev, questionsPerTopic: parseInt(e.target.value) || 5 }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Difficulty Distribution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty Distribution</label>
                  <div className="space-y-3">
                    {Object.entries(bulkGenerate.difficultyDistribution).map(([difficulty, percentage]) => (
                      <div key={difficulty} className="flex items-center gap-3">
                        <span className="w-16 text-sm capitalize">{difficulty}:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={percentage}
                          onChange={(e) => setBulkGenerate(prev => ({
                            ...prev,
                            difficultyDistribution: {
                              ...prev.difficultyDistribution,
                              [difficulty]: parseInt(e.target.value)
                            }
                          }))}
                          className="flex-1"
                        />
                        <span className="w-8 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowBulkGenerate(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkGenerate}
                    disabled={isGenerating || bulkGenerate.topicsToGenerate.length === 0}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="w-4 h-4" />
                        Generate Questions
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BatchOperationsPanel