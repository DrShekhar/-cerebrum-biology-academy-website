'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Filter,
  Star,
  Clock,
  Users,
  TrendingUp,
  BookOpen,
  Target,
  BarChart3,
  Settings,
  Play,
  Copy,
  Edit3,
  Trash2,
  Download,
  Upload,
  Share2,
  Plus,
  X,
  Save,
  Grid,
  List,
  Tag,
  Calendar,
  Award,
  Zap,
  Brain,
  Microscope,
  Heart,
  Leaf,
  Dna,
  Atom,
  Eye,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react'

interface NEETTemplate {
  id: string
  name: string
  description: string
  category: 'chapter' | 'unit' | 'mock' | 'practice' | 'revision' | 'diagnostic'
  subject: 'biology' | 'physics' | 'chemistry'
  class: '11' | '12' | 'both'
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  duration: number
  totalQuestions: number
  totalMarks: number
  syllabus: string[]
  topics: string[]
  chapters: string[]
  questionDistribution: {
    mcq: number
    assertion: number
    numerical: number
    matching: number
  }
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  markingScheme: {
    correct: number
    incorrect: number
    unattempted: number
  }
  examPattern: 'neet' | 'boards' | 'jee' | 'custom'
  tags: string[]
  isOfficial: boolean
  isFavorite: boolean
  usageCount: number
  rating: number
  createdBy: string
  createdAt: Date
  lastUsed: Date
  features: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  instructions: string[]
  sampleQuestions?: any[]
}

interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  count: number
}

interface FilterOptions {
  category: string[]
  class: string[]
  difficulty: string[]
  duration: [number, number]
  questionCount: [number, number]
  examPattern: string[]
  topics: string[]
  chapters: string[]
  searchQuery: string
  showFavoritesOnly: boolean
  sortBy: 'name' | 'usage' | 'rating' | 'recent' | 'difficulty'
  sortOrder: 'asc' | 'desc'
}

interface EnhancedTemplateManagerProps {
  onTemplateSelect: (template: NEETTemplate) => void
  onTemplateCreate: () => void
  currentTemplate?: NEETTemplate | null
}

const EnhancedTemplateManager: React.FC<EnhancedTemplateManagerProps> = ({
  onTemplateSelect,
  onTemplateCreate,
  currentTemplate,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<NEETTemplate | null>(null)
  const [showTemplateDetails, setShowTemplateDetails] = useState(false)
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)

  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    class: [],
    difficulty: [],
    duration: [30, 300],
    questionCount: [10, 200],
    examPattern: [],
    topics: [],
    chapters: [],
    searchQuery: '',
    showFavoritesOnly: false,
    sortBy: 'rating',
    sortOrder: 'desc',
  })

  // Mock NEET templates data (in real app, this would come from API)
  const [templates] = useState<NEETTemplate[]>([
    {
      id: 'neet_cell_biology_comprehensive',
      name: 'NEET Cell Biology Comprehensive Test',
      description:
        'Complete assessment of cell structure, organelles, and cellular processes for NEET preparation',
      category: 'chapter',
      subject: 'biology',
      class: '11',
      difficulty: 'mixed',
      duration: 60,
      totalQuestions: 50,
      totalMarks: 200,
      syllabus: ['Cell: The Unit of Life', 'Biomolecules', 'Cell Cycle and Division'],
      topics: ['Cell Structure', 'Cell Organelles', 'Cell Division', 'Biomolecules'],
      chapters: [
        'Chapter 8: Cell - The Unit of Life',
        'Chapter 9: Biomolecules',
        'Chapter 10: Cell Cycle and Division',
      ],
      questionDistribution: { mcq: 40, assertion: 5, numerical: 3, matching: 2 },
      difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      examPattern: 'neet',
      tags: ['cell biology', 'neet', 'class 11', 'fundamental', 'high-yield'],
      isOfficial: true,
      isFavorite: false,
      usageCount: 2847,
      rating: 4.8,
      createdBy: 'NEET Biology Expert',
      createdAt: new Date('2024-01-15'),
      lastUsed: new Date('2024-09-28'),
      features: [
        'Previous year questions',
        'NCERT based',
        'Detailed explanations',
        'Time tracking',
      ],
      prerequisites: ['Basic chemistry knowledge', 'Understanding of atomic structure'],
      learningOutcomes: [
        'Master cell organelle functions',
        'Understand cellular processes',
        'Apply knowledge to NEET questions',
      ],
      instructions: [
        'Read each question carefully',
        'Manage time effectively',
        'Review marked questions',
      ],
    },
    {
      id: 'neet_genetics_heredity_advanced',
      name: 'Genetics & Heredity - Advanced NEET Mock',
      description:
        'High-difficulty mock test focusing on genetics, inheritance patterns, and molecular genetics',
      category: 'mock',
      subject: 'biology',
      class: '12',
      difficulty: 'hard',
      duration: 45,
      totalQuestions: 35,
      totalMarks: 140,
      syllabus: ['Principles of Inheritance', 'Molecular Basis of Inheritance'],
      topics: ['Mendelian Genetics', 'Genetic Disorders', 'DNA Replication', 'Gene Expression'],
      chapters: [
        'Chapter 5: Principles of Inheritance',
        'Chapter 6: Molecular Basis of Inheritance',
      ],
      questionDistribution: { mcq: 28, assertion: 4, numerical: 2, matching: 1 },
      difficultyDistribution: { easy: 15, medium: 45, hard: 40 },
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      examPattern: 'neet',
      tags: ['genetics', 'inheritance', 'molecular biology', 'advanced', 'neet mock'],
      isOfficial: true,
      isFavorite: true,
      usageCount: 1923,
      rating: 4.7,
      createdBy: 'Genetics Specialist',
      createdAt: new Date('2024-02-10'),
      lastUsed: new Date('2024-09-27'),
      features: ['NEET pattern', 'Challenging questions', 'Genetic diagrams', 'Problem solving'],
      prerequisites: ['Basic genetics concepts', 'Understanding of DNA structure'],
      learningOutcomes: [
        'Solve complex genetic problems',
        'Understand inheritance patterns',
        'Master molecular genetics',
      ],
      instructions: [
        'Focus on genetic cross calculations',
        'Draw Punnett squares',
        'Analyze pedigree charts',
      ],
    },
    {
      id: 'neet_human_physiology_quick',
      name: 'Human Physiology Quick Revision',
      description:
        'Rapid revision test covering major human body systems for last-minute preparation',
      category: 'revision',
      subject: 'biology',
      class: '12',
      difficulty: 'medium',
      duration: 30,
      totalQuestions: 25,
      totalMarks: 100,
      syllabus: ['Human Physiology'],
      topics: ['Circulatory System', 'Respiratory System', 'Digestive System', 'Nervous System'],
      chapters: [
        'Chapter 17: Breathing and Exchange of Gases',
        'Chapter 18: Body Fluids and Circulation',
      ],
      questionDistribution: { mcq: 20, assertion: 3, numerical: 1, matching: 1 },
      difficultyDistribution: { easy: 40, medium: 50, hard: 10 },
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      examPattern: 'neet',
      tags: ['physiology', 'quick revision', 'human body', 'systems', 'neet prep'],
      isOfficial: false,
      isFavorite: true,
      usageCount: 3156,
      rating: 4.6,
      createdBy: 'Physiology Expert',
      createdAt: new Date('2024-03-05'),
      lastUsed: new Date('2024-09-29'),
      features: ['Quick assessment', 'System-wise coverage', 'Key concepts', 'Memory aids'],
      prerequisites: ['Basic anatomy knowledge', 'Understanding of body systems'],
      learningOutcomes: [
        'Recall physiological processes',
        'Understand system integration',
        'Quick concept review',
      ],
      instructions: ['Focus on key functions', 'Remember important values', 'Quick recall test'],
    },
    {
      id: 'neet_plant_kingdom_diagnostic',
      name: 'Plant Kingdom Diagnostic Assessment',
      description:
        'Diagnostic test to identify knowledge gaps in plant classification and characteristics',
      category: 'diagnostic',
      subject: 'biology',
      class: '11',
      difficulty: 'mixed',
      duration: 40,
      totalQuestions: 30,
      totalMarks: 120,
      syllabus: ['Plant Kingdom'],
      topics: [
        'Plant Classification',
        'Algae',
        'Bryophytes',
        'Pteridophytes',
        'Gymnosperms',
        'Angiosperms',
      ],
      chapters: ['Chapter 3: Plant Kingdom'],
      questionDistribution: { mcq: 24, assertion: 3, numerical: 1, matching: 2 },
      difficultyDistribution: { easy: 35, medium: 45, hard: 20 },
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      examPattern: 'neet',
      tags: ['plant kingdom', 'classification', 'diagnostic', 'taxonomy', 'neet'],
      isOfficial: true,
      isFavorite: false,
      usageCount: 1456,
      rating: 4.4,
      createdBy: 'Botany Specialist',
      createdAt: new Date('2024-01-20'),
      lastUsed: new Date('2024-09-25'),
      features: [
        'Diagnostic analysis',
        'Knowledge gap identification',
        'Adaptive questions',
        'Performance insights',
      ],
      prerequisites: ['Basic biology concepts', 'Understanding of classification'],
      learningOutcomes: [
        'Identify weak areas',
        'Understand plant diversity',
        'Master classification systems',
      ],
      instructions: ['Answer all questions', 'Honest assessment', 'Review weak areas'],
    },
    {
      id: 'neet_ecology_environment_practice',
      name: 'Ecology & Environment Practice Set',
      description:
        'Practice questions on ecological principles, environmental issues, and conservation',
      category: 'practice',
      subject: 'biology',
      class: '12',
      difficulty: 'medium',
      duration: 50,
      totalQuestions: 40,
      totalMarks: 160,
      syllabus: ['Ecology and Environment'],
      topics: ['Ecosystem', 'Biodiversity', 'Environmental Issues', 'Conservation'],
      chapters: [
        'Chapter 13: Organisms and Populations',
        'Chapter 14: Ecosystem',
        'Chapter 15: Biodiversity',
      ],
      questionDistribution: { mcq: 32, assertion: 4, numerical: 2, matching: 2 },
      difficultyDistribution: { easy: 25, medium: 55, hard: 20 },
      markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
      examPattern: 'neet',
      tags: ['ecology', 'environment', 'conservation', 'biodiversity', 'current affairs'],
      isOfficial: false,
      isFavorite: false,
      usageCount: 987,
      rating: 4.3,
      createdBy: 'Ecology Expert',
      createdAt: new Date('2024-04-12'),
      lastUsed: new Date('2024-09-20'),
      features: [
        'Current environmental issues',
        'Real-world applications',
        'Case studies',
        'Conservation focus',
      ],
      prerequisites: ['Basic ecological concepts', 'Awareness of environmental issues'],
      learningOutcomes: [
        'Understand ecological relationships',
        'Analyze environmental problems',
        'Apply conservation principles',
      ],
      instructions: [
        'Consider real-world examples',
        'Think about conservation strategies',
        'Link theory to practice',
      ],
    },
  ])

  const templateCategories: TemplateCategory[] = [
    {
      id: 'chapter',
      name: 'Chapter Tests',
      description: 'Focused tests for individual chapters',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-blue-500 to-cyan-500',
      count: templates.filter((t) => t.category === 'chapter').length,
    },
    {
      id: 'mock',
      name: 'Mock Tests',
      description: 'Full-length NEET simulation tests',
      icon: <Target className="w-5 h-5" />,
      color: 'from-green-500 to-emerald-500',
      count: templates.filter((t) => t.category === 'mock').length,
    },
    {
      id: 'practice',
      name: 'Practice Sets',
      description: 'Topic-wise practice questions',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500',
      count: templates.filter((t) => t.category === 'practice').length,
    },
    {
      id: 'revision',
      name: 'Revision Tests',
      description: 'Quick revision and recall tests',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500',
      count: templates.filter((t) => t.category === 'revision').length,
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Tests',
      description: 'Identify knowledge gaps',
      icon: <Search className="w-5 h-5" />,
      color: 'from-red-500 to-rose-500',
      count: templates.filter((t) => t.category === 'diagnostic').length,
    },
  ]

  // Filter and sort templates
  const filteredAndSortedTemplates = useMemo(() => {
    const filtered = templates.filter((template) => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase()
        if (
          !template.name.toLowerCase().includes(query) &&
          !template.description.toLowerCase().includes(query) &&
          !template.tags.some((tag) => tag.toLowerCase().includes(query))
        ) {
          return false
        }
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(template.category)) {
        return false
      }

      // Class filter
      if (
        filters.class.length > 0 &&
        !filters.class.includes(template.class) &&
        !filters.class.includes('both')
      ) {
        return false
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(template.difficulty)) {
        return false
      }

      // Duration filter
      if (template.duration < filters.duration[0] || template.duration > filters.duration[1]) {
        return false
      }

      // Question count filter
      if (
        template.totalQuestions < filters.questionCount[0] ||
        template.totalQuestions > filters.questionCount[1]
      ) {
        return false
      }

      // Exam pattern filter
      if (filters.examPattern.length > 0 && !filters.examPattern.includes(template.examPattern)) {
        return false
      }

      // Topics filter
      if (
        filters.topics.length > 0 &&
        !filters.topics.some((topic) => template.topics.includes(topic))
      ) {
        return false
      }

      // Favorites filter
      if (filters.showFavoritesOnly && !template.isFavorite) {
        return false
      }

      return true
    })

    // Sort templates
    filtered.sort((a, b) => {
      let comparison = 0

      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'usage':
          comparison = a.usageCount - b.usageCount
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        case 'recent':
          comparison = new Date(a.lastUsed).getTime() - new Date(b.lastUsed).getTime()
          break
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3, mixed: 4 }
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
          break
        default:
          comparison = 0
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison
    })

    return filtered
  }, [templates, filters])

  const toggleFavorite = (templateId: string) => {
    // In real app, this would update the database
    console.log('Toggle favorite for template:', templateId)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'mixed':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    const categoryData = templateCategories.find((c) => c.id === category)
    return categoryData?.icon || <FileText className="w-4 h-4" />
  }

  const handleTemplateSelect = (template: NEETTemplate) => {
    setSelectedTemplate(template)
    onTemplateSelect(template)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              NEET Biology Template Library
            </h3>
            <p className="text-gray-600 mt-2">
              Professional test templates designed by NEET experts for comprehensive biology
              preparation
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                showFilters ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onTemplateCreate}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Template
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {templateCategories.map((category) => (
            <div
              key={category.id}
              className={`bg-gradient-to-r ${category.color} rounded-lg p-4 text-white`}
            >
              <div className="flex items-center gap-3">
                {category.icon}
                <div>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <div className="text-sm opacity-90">{category.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search templates by name, description, or tags..."
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                className="px-3 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="usage">Sort by Usage</option>
                <option value="recent">Sort by Recent</option>
                <option value="name">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
              </select>

              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
                  }))
                }
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {filters.sortOrder === 'asc' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))
                }
                className={`p-3 border rounded-lg transition-colors ${
                  filters.showFavoritesOnly
                    ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b"
            >
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="space-y-1">
                      {templateCategories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.category.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  category: [...prev.category, category.id],
                                }))
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  category: prev.category.filter((c) => c !== category.id),
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          {category.name}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Class Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                    <div className="space-y-1">
                      {['11', '12', 'both'].map((classLevel) => (
                        <label key={classLevel} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.class.includes(classLevel)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  class: [...prev.class, classLevel],
                                }))
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  class: prev.class.filter((c) => c !== classLevel),
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          Class {classLevel === 'both' ? '11 & 12' : classLevel}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty
                    </label>
                    <div className="space-y-1">
                      {['easy', 'medium', 'hard', 'mixed'].map((difficulty) => (
                        <label key={difficulty} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.difficulty.includes(difficulty)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  difficulty: [...prev.difficulty, difficulty],
                                }))
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  difficulty: prev.difficulty.filter((d) => d !== difficulty),
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="capitalize">{difficulty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Exam Pattern Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Pattern
                    </label>
                    <div className="space-y-1">
                      {['neet', 'boards', 'jee', 'custom'].map((pattern) => (
                        <label key={pattern} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.examPattern.includes(pattern)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters((prev) => ({
                                  ...prev,
                                  examPattern: [...prev.examPattern, pattern],
                                }))
                              } else {
                                setFilters((prev) => ({
                                  ...prev,
                                  examPattern: prev.examPattern.filter((p) => p !== pattern),
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="uppercase">{pattern}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      setFilters({
                        category: [],
                        class: [],
                        difficulty: [],
                        duration: [30, 300],
                        questionCount: [10, 200],
                        examPattern: [],
                        topics: [],
                        chapters: [],
                        searchQuery: '',
                        showFavoritesOnly: false,
                        sortBy: 'rating',
                        sortOrder: 'desc',
                      })
                    }
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Summary */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          Showing {filteredAndSortedTemplates.length} of {templates.length} templates
          {filters.showFavoritesOnly && ' (favorites only)'}
        </div>
      </div>

      {/* Templates Display */}
      <div className="space-y-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl border hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => handleTemplateSelect(template)}
              >
                <div className="p-6">
                  {/* Template Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 bg-gradient-to-r ${templateCategories.find((c) => c.id === template.category)?.color} rounded-lg`}
                      >
                        {getCategoryIcon(template.category)}
                      </div>
                      {template.isOfficial && (
                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                          Official
                        </div>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(template.id)
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        template.isFavorite
                          ? 'text-yellow-500 bg-yellow-50'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                      }`}
                    >
                      <Star
                        className="w-4 h-4"
                        fill={template.isFavorite ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {template.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-800">
                          {template.totalQuestions}
                        </div>
                        <div className="text-xs text-gray-500">Questions</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">{template.duration}m</div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">{template.totalMarks}</div>
                        <div className="text-xs text-gray-500">Marks</div>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-sm">
                      <span
                        className={`px-2 py-1 rounded border ${getDifficultyColor(template.difficulty)}`}
                      >
                        {template.difficulty}
                      </span>
                      <span className="text-gray-500">Class {template.class}</span>
                    </div>

                    {/* Rating and Usage */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{template.usageCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {template.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{template.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 py-4 border-t bg-gray-50 group-hover:bg-indigo-50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 uppercase tracking-wide">
                      {template.examPattern}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1 text-sm font-medium">
                      <Play className="w-4 h-4" />
                      Use Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="divide-y">
              {filteredAndSortedTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`p-2 bg-gradient-to-r ${templateCategories.find((c) => c.id === template.category)?.color} rounded-lg`}
                        >
                          {getCategoryIcon(template.category)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                        {template.isOfficial && (
                          <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                            Official
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>{template.totalQuestions} questions</span>
                        <span>{template.duration} minutes</span>
                        <span>{template.totalMarks} marks</span>
                        <span
                          className={`px-2 py-1 rounded border ${getDifficultyColor(template.difficulty)}`}
                        >
                          {template.difficulty}
                        </span>
                        <span>Class {template.class}</span>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{template.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{template.usageCount.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(template.id)
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          template.isFavorite
                            ? 'text-yellow-500 bg-yellow-50'
                            : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
                        }`}
                      >
                        <Star
                          className="w-4 h-4"
                          fill={template.isFavorite ? 'currentColor' : 'none'}
                        />
                      </button>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Use Template
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredAndSortedTemplates.length === 0 && (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Templates Found</h3>
            <p className="text-gray-600 mb-6">
              No templates match your current search and filter criteria.
            </p>
            <div className="space-y-2">
              <button
                onClick={() =>
                  setFilters({
                    category: [],
                    class: [],
                    difficulty: [],
                    duration: [30, 300],
                    questionCount: [10, 200],
                    examPattern: [],
                    topics: [],
                    chapters: [],
                    searchQuery: '',
                    showFavoritesOnly: false,
                    sortBy: 'rating',
                    sortOrder: 'desc',
                  })
                }
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Clear all filters
              </button>
              <div className="text-gray-500">or</div>
              <button
                onClick={onTemplateCreate}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create a new template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedTemplateManager
