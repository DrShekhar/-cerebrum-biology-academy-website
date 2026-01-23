'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  FileText,
  GraduationCap,
  Target,
  Clock,
  Search,
  Award,
  RefreshCw,
  Settings,
  Play,
  Edit,
  Copy,
  Plus,
  Save,
  X,
  Download,
  Share,
} from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

// Types and Interfaces
interface TestTemplate {
  id: string
  name: string
  type:
    | 'chapter'
    | 'unit'
    | 'board'
    | 'competitive'
    | 'quick'
    | 'diagnostic'
    | 'revision'
    | 'custom'
  description: string
  duration: number
  totalQuestions: number
  totalMarks: number
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  questionTypes: {
    mcq: number
    assertion: number
    numerical: number
    matching: number
  }
  topicCoverage: string[]
  syllabus: 'class11' | 'class12' | 'neet' | 'jee' | 'boards'
  examPattern: string
  instructions: string[]
  markingScheme: {
    correct: number
    incorrect: number
    unattempted: number
  }
  tags: string[]
  isPopular: boolean
  usageCount: number
  lastUsed: Date
  createdBy: string
  createdAt: Date
  configuration: {
    allowNegativeMarking: boolean
    shuffleQuestions: boolean
    showResults: boolean
    timeLimit: boolean
    sectionWise: boolean
    mandatoryQuestions: number[]
  }
}

interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  templates: TestTemplate[]
  isExpanded: boolean
}

const TestTemplates: React.FC = () => {
  const { showToast } = useToast()
  const [activeView, setActiveView] = useState<'browse' | 'create' | 'customize'>('browse')
  const [selectedTemplate, setSelectedTemplate] = useState<TestTemplate | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isCreating, setIsCreating] = useState(false)
  const [customTemplate, setCustomTemplate] = useState<Partial<TestTemplate>>({
    type: 'custom',
    name: '',
    description: '',
    duration: 60,
    totalQuestions: 30,
    totalMarks: 120,
    difficultyDistribution: { easy: 40, medium: 40, hard: 20 },
    questionTypes: { mcq: 80, assertion: 10, numerical: 5, matching: 5 },
    topicCoverage: [],
    syllabus: 'neet',
    instructions: [],
    markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
    tags: [],
    configuration: {
      allowNegativeMarking: true,
      shuffleQuestions: true,
      showResults: true,
      timeLimit: true,
      sectionWise: false,
      mandatoryQuestions: [],
    },
  })

  // Pre-defined Templates Data
  const [templateCategories, setTemplateCategories] = useState<TemplateCategory[]>([
    {
      id: 'chapter',
      name: 'Chapter-wise Tests',
      description: 'Focused tests for individual chapters',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-500',
      isExpanded: true,
      templates: [
        {
          id: 'ch_cell_biology',
          name: 'Cell Biology Mastery Test',
          type: 'chapter',
          description:
            'Comprehensive test covering cell structure, organelles, and cellular processes',
          duration: 45,
          totalQuestions: 30,
          totalMarks: 120,
          difficultyDistribution: { easy: 40, medium: 40, hard: 20 },
          questionTypes: { mcq: 70, assertion: 20, numerical: 5, matching: 5 },
          topicCoverage: ['Cell Structure', 'Cell Organelles', 'Cell Division', 'Cell Membrane'],
          syllabus: 'class11',
          examPattern: 'NCERT Based',
          instructions: [
            'Read each question carefully',
            'Manage time effectively',
            'Review answers before submission',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['cell biology', 'class 11', 'fundamental'],
          isPopular: true,
          usageCount: 1247,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
        {
          id: 'ch_genetics',
          name: 'Genetics and Heredity',
          type: 'chapter',
          description: 'In-depth assessment of genetics principles and inheritance patterns',
          duration: 60,
          totalQuestions: 40,
          totalMarks: 160,
          difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
          questionTypes: { mcq: 65, assertion: 25, numerical: 10, matching: 0 },
          topicCoverage: ["Mendel's Laws", 'Genetic Disorders', 'DNA Structure', 'Gene Expression'],
          syllabus: 'class12',
          examPattern: 'CBSE Board Pattern',
          instructions: [
            'Focus on genetic cross problems',
            'Use Punnett squares where needed',
            'Show working for numerical problems',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['genetics', 'class 12', 'inheritance'],
          isPopular: true,
          usageCount: 987,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: true,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'unit',
      name: 'Unit Tests',
      description: 'Tests covering multiple related chapters',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-green-600',
      isExpanded: false,
      templates: [
        {
          id: 'unit_diversity',
          name: 'Diversity in Living World',
          type: 'unit',
          description: 'Complete unit test covering classification and biodiversity',
          duration: 90,
          totalQuestions: 60,
          totalMarks: 240,
          difficultyDistribution: { easy: 35, medium: 45, hard: 20 },
          questionTypes: { mcq: 60, assertion: 25, numerical: 5, matching: 10 },
          topicCoverage: ['Classification', 'Taxonomy', 'Biodiversity', 'Conservation'],
          syllabus: 'class11',
          examPattern: 'Unit Test Pattern',
          instructions: [
            'Cover all chapters in the unit',
            'Pay attention to taxonomic hierarchy',
            'Focus on conservation concepts',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['diversity', 'classification', 'unit test'],
          isPopular: false,
          usageCount: 543,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: true,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'board',
      name: 'Mock Board Exams',
      description: 'Full-length board examination simulations',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'from-purple-500 to-indigo-500',
      isExpanded: false,
      templates: [
        {
          id: 'board_class12_bio',
          name: 'CBSE Class 12 Biology Mock Test',
          type: 'board',
          description: 'Complete CBSE Class 12 Biology board exam simulation',
          duration: 180,
          totalQuestions: 70,
          totalMarks: 70,
          difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
          questionTypes: { mcq: 50, assertion: 20, numerical: 15, matching: 15 },
          topicCoverage: ['All Class 12 Biology Topics'],
          syllabus: 'class12',
          examPattern: 'CBSE Board Pattern 2024',
          instructions: [
            'Read instructions carefully',
            '3 hours duration',
            'All questions are compulsory',
            'Use diagrams where necessary',
          ],
          markingScheme: { correct: 1, incorrect: 0, unattempted: 0 },
          tags: ['cbse', 'board exam', 'class 12', 'full syllabus'],
          isPopular: true,
          usageCount: 2156,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: false,
            shuffleQuestions: false,
            showResults: true,
            timeLimit: true,
            sectionWise: true,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'competitive',
      name: 'Competitive Exams',
      description: 'NEET, JEE and other competitive exam patterns',
      icon: <Target className="w-5 h-5" />,
      color: 'bg-red-600',
      isExpanded: false,
      templates: [
        {
          id: 'neet_mock_1',
          name: 'NEET Biology Mock Test',
          type: 'competitive',
          description: 'Full NEET biology section with latest pattern',
          duration: 45,
          totalQuestions: 50,
          totalMarks: 200,
          difficultyDistribution: { easy: 20, medium: 60, hard: 20 },
          questionTypes: { mcq: 90, assertion: 10, numerical: 0, matching: 0 },
          topicCoverage: ['All NEET Biology Syllabus'],
          syllabus: 'neet',
          examPattern: 'NEET 2024 Pattern',
          instructions: [
            '50 questions in 45 minutes',
            '+4 for correct, -1 for incorrect',
            'No negative marking for unattempted',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['neet', 'biology', 'competitive', 'mock test'],
          isPopular: true,
          usageCount: 3421,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
        {
          id: 'jee_bio_test',
          name: 'JEE Advanced Biology Test',
          type: 'competitive',
          description: 'JEE Advanced level biology questions',
          duration: 60,
          totalQuestions: 30,
          totalMarks: 120,
          difficultyDistribution: { easy: 10, medium: 40, hard: 50 },
          questionTypes: { mcq: 60, assertion: 20, numerical: 20, matching: 0 },
          topicCoverage: ['Advanced Biology Topics'],
          syllabus: 'jee',
          examPattern: 'JEE Advanced Pattern',
          instructions: [
            'High difficulty questions',
            'Multiple correct answers possible',
            'Partial marking scheme',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['jee advanced', 'biology', 'high difficulty'],
          isPopular: false,
          usageCount: 234,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'quick',
      name: 'Quick Assessments',
      description: 'Short 5-10 minute rapid assessments',
      icon: <Clock className="w-5 h-5" />,
      color: 'from-yellow-500 to-amber-500',
      isExpanded: false,
      templates: [
        {
          id: 'quick_photosynthesis',
          name: 'Photosynthesis Quick Check',
          type: 'quick',
          description: 'Rapid assessment of photosynthesis concepts',
          duration: 7,
          totalQuestions: 10,
          totalMarks: 40,
          difficultyDistribution: { easy: 50, medium: 40, hard: 10 },
          questionTypes: { mcq: 80, assertion: 20, numerical: 0, matching: 0 },
          topicCoverage: ['Photosynthesis'],
          syllabus: 'class11',
          examPattern: 'Quick Assessment',
          instructions: ['7 minutes only', 'Focus on key concepts', 'Quick recall test'],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['photosynthesis', 'quick test', 'class 11'],
          isPopular: true,
          usageCount: 1876,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
        {
          id: 'quick_respiration',
          name: 'Cellular Respiration Flash Test',
          type: 'quick',
          description: '5-minute rapid test on cellular respiration',
          duration: 5,
          totalQuestions: 8,
          totalMarks: 32,
          difficultyDistribution: { easy: 60, medium: 30, hard: 10 },
          questionTypes: { mcq: 75, assertion: 25, numerical: 0, matching: 0 },
          topicCoverage: ['Cellular Respiration'],
          syllabus: 'class11',
          examPattern: 'Flash Test',
          instructions: ['5 minutes maximum', 'Test basic understanding', 'No negative marking'],
          markingScheme: { correct: 4, incorrect: 0, unattempted: 0 },
          tags: ['respiration', 'flash test', 'basic'],
          isPopular: true,
          usageCount: 1234,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: false,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Tests',
      description: 'Tests to identify knowledge gaps',
      icon: <Search className="w-5 h-5" />,
      color: 'from-indigo-500 to-blue-500',
      isExpanded: false,
      templates: [
        {
          id: 'diagnostic_neet_prep',
          name: 'NEET Readiness Diagnostic',
          type: 'diagnostic',
          description: 'Comprehensive diagnostic to assess NEET preparation level',
          duration: 120,
          totalQuestions: 80,
          totalMarks: 320,
          difficultyDistribution: { easy: 25, medium: 50, hard: 25 },
          questionTypes: { mcq: 70, assertion: 20, numerical: 10, matching: 0 },
          topicCoverage: ['All Major Biology Topics'],
          syllabus: 'neet',
          examPattern: 'Diagnostic Assessment',
          instructions: [
            'Comprehensive assessment',
            'Detailed performance analysis',
            'Identify weak areas',
          ],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['diagnostic', 'neet', 'preparation', 'assessment'],
          isPopular: true,
          usageCount: 856,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: true,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'revision',
      name: 'Revision Tests',
      description: 'Tests for exam preparation and revision',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'bg-green-600',
      isExpanded: false,
      templates: [
        {
          id: 'revision_genetics_inheritance',
          name: 'Genetics Revision Test',
          type: 'revision',
          description: 'Quick revision test for genetics and inheritance',
          duration: 40,
          totalQuestions: 25,
          totalMarks: 100,
          difficultyDistribution: { easy: 40, medium: 40, hard: 20 },
          questionTypes: { mcq: 70, assertion: 20, numerical: 10, matching: 0 },
          topicCoverage: ['Genetics', 'Inheritance Patterns'],
          syllabus: 'class12',
          examPattern: 'Revision Pattern',
          instructions: ['Focus on key concepts', 'Quick revision test', 'Important for boards'],
          markingScheme: { correct: 4, incorrect: -1, unattempted: 0 },
          tags: ['revision', 'genetics', 'class 12', 'boards'],
          isPopular: true,
          usageCount: 1543,
          lastUsed: new Date(),
          createdBy: 'System',
          createdAt: new Date(),
          configuration: {
            allowNegativeMarking: true,
            shuffleQuestions: true,
            showResults: true,
            timeLimit: true,
            sectionWise: false,
            mandatoryQuestions: [],
          },
        },
      ],
    },
    {
      id: 'custom',
      name: 'Custom Templates',
      description: 'User-created custom test templates',
      icon: <Settings className="w-5 h-5" />,
      color: 'from-gray-500 to-slate-500',
      isExpanded: false,
      templates: [],
    },
  ])

  const [availableTopics] = useState([
    'Cell Biology',
    'Genetics',
    'Evolution',
    'Ecology',
    'Human Physiology',
    'Plant Physiology',
    'Reproduction',
    'Biotechnology',
    'Molecular Biology',
    'Taxonomy',
    'Anatomy',
    'Environmental Biology',
    'Photosynthesis',
    'Respiration',
    'Enzyme Action',
    'Biomolecules',
    'Cell Division',
  ])

  // Filter templates based on search and category
  const filteredCategories = templateCategories
    .map((category) => ({
      ...category,
      templates: category.templates.filter((template) => {
        const matchesSearch =
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory
        return matchesSearch && matchesCategory
      }),
    }))
    .filter((category) => category.templates.length > 0 || selectedCategory === category.id)

  // Handle template selection
  const handleSelectTemplate = (template: TestTemplate) => {
    setSelectedTemplate(template)
    setActiveView('customize')
  }

  // Handle template creation
  const handleCreateTemplate = () => {
    setActiveView('create')
    setIsCreating(true)
  }

  // Save custom template
  const handleSaveTemplate = () => {
    if (!customTemplate.name || !customTemplate.description) {
      showToast(
        'warning',
        'Missing Information',
        'Please provide name and description for the template'
      )
      return
    }

    const newTemplate: TestTemplate = {
      ...customTemplate,
      id: `custom_${Date.now()}`,
      createdAt: new Date(),
      lastUsed: new Date(),
      createdBy: 'User',
      usageCount: 0,
      isPopular: false,
      tags: customTemplate.tags || [],
    } as TestTemplate

    setTemplateCategories((prev) =>
      prev.map((category) =>
        category.id === 'custom'
          ? { ...category, templates: [...category.templates, newTemplate] }
          : category
      )
    )

    setActiveView('browse')
    setIsCreating(false)
    showToast('success', 'Template Created', 'Your custom template has been created successfully!')
  }

  // Use template (would integrate with AI Test Generation)
  const handleUseTemplate = (template: TestTemplate) => {
    showToast(
      'info',
      `Using Template: ${template.name}`,
      'This would integrate with the AI Test Generation system to create a test based on this template configuration.'
    )

    // Update usage count
    setTemplateCategories((prev) =>
      prev.map((category) => ({
        ...category,
        templates: category.templates.map((t) =>
          t.id === template.id ? { ...t, usageCount: t.usageCount + 1, lastUsed: new Date() } : t
        ),
      }))
    )
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Test Templates
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose from professionally designed test templates for different exam patterns, difficulty
          levels, and assessment types
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { id: 'browse', label: 'Browse Templates', icon: Search },
            { id: 'create', label: 'Create Custom', icon: Plus },
            { id: 'customize', label: 'Customize', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveView(id as any)}
              disabled={id === 'customize' && !selectedTemplate}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeView === id
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
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
        {activeView === 'browse' && (
          <motion.div
            key="browse"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl p-4 border">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {templateCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleCreateTemplate}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New
              </button>
            </div>

            {/* Template Categories */}
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border"
                >
                  {/* Category Header */}
                  <div
                    className={`p-4 bg-gradient-to-r ${category.color} rounded-t-xl text-white cursor-pointer`}
                    onClick={() =>
                      setTemplateCategories((prev) =>
                        prev.map((cat) =>
                          cat.id === category.id ? { ...cat, isExpanded: !cat.isExpanded } : cat
                        )
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {category.icon}
                        <div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <p className="text-white/80 text-sm">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 px-2 py-1 rounded text-sm">
                          {category.templates.length} templates
                        </span>
                        <motion.div
                          animate={{ rotate: category.isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Settings className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Category Templates */}
                  <AnimatePresence>
                    {category.isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          {category.templates.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <p>No templates in this category yet</p>
                              <button
                                onClick={handleCreateTemplate}
                                className="mt-3 text-indigo-600 hover:text-indigo-700 font-medium"
                              >
                                Create the first template
                              </button>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {category.templates.map((template) => (
                                <motion.div
                                  key={template.id}
                                  whileHover={{ scale: 1.02 }}
                                  className="border rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                                  onClick={() => handleSelectTemplate(template)}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-semibold text-gray-800 line-clamp-2">
                                      {template.name}
                                    </h4>
                                    {template.isPopular && (
                                      <Award className="w-4 h-4 text-yellow-500" />
                                    )}
                                  </div>

                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {template.description}
                                  </p>

                                  <div className="space-y-2 text-xs text-gray-500">
                                    <div className="flex justify-between">
                                      <span>Duration:</span>
                                      <span>{template.duration} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Questions:</span>
                                      <span>{template.totalQuestions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Marks:</span>
                                      <span>{template.totalMarks}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Used:</span>
                                      <span>{template.usageCount} times</span>
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-1 mt-3">
                                    {template.tags.slice(0, 3).map((tag, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="flex gap-2 mt-4">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleUseTemplate(template)
                                      }}
                                      className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1"
                                    >
                                      <Play className="w-3 h-3" />
                                      Use Template
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleSelectTemplate(template)
                                      }}
                                      className="px-3 py-2 border rounded text-sm hover:bg-gray-50 transition-colors"
                                    >
                                      <Edit className="w-3 h-3" />
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'create' && (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-xl p-6 border"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Create Custom Template</h3>
              <button
                onClick={() => setActiveView('browse')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={customTemplate.name || ''}
                    onChange={(e) =>
                      setCustomTemplate((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={customTemplate.description || ''}
                    onChange={(e) =>
                      setCustomTemplate((prev) => ({ ...prev, description: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your template"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (min)
                    </label>
                    <input
                      type="number"
                      value={customTemplate.duration || 60}
                      onChange={(e) =>
                        setCustomTemplate((prev) => ({
                          ...prev,
                          duration: parseInt(e.target.value) || 60,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Questions
                    </label>
                    <input
                      type="number"
                      value={customTemplate.totalQuestions || 30}
                      onChange={(e) =>
                        setCustomTemplate((prev) => ({
                          ...prev,
                          totalQuestions: parseInt(e.target.value) || 30,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Marks
                    </label>
                    <input
                      type="number"
                      value={customTemplate.totalMarks || 120}
                      onChange={(e) =>
                        setCustomTemplate((prev) => ({
                          ...prev,
                          totalMarks: parseInt(e.target.value) || 120,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Syllabus</label>
                  <select
                    value={customTemplate.syllabus || 'neet'}
                    onChange={(e) =>
                      setCustomTemplate((prev) => ({ ...prev, syllabus: e.target.value as any }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="class11">Class 11</option>
                    <option value="class12">Class 12</option>
                    <option value="neet">NEET</option>
                    <option value="jee">JEE</option>
                    <option value="boards">Board Exams</option>
                  </select>
                </div>
              </div>

              {/* Configuration */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Difficulty Distribution
                  </label>
                  <div className="space-y-3">
                    {Object.entries(
                      customTemplate.difficultyDistribution || { easy: 40, medium: 40, hard: 20 }
                    ).map(([level, percentage]) => (
                      <div key={level} className="flex items-center gap-3">
                        <span className="w-16 text-sm capitalize">{level}:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={percentage}
                          onChange={(e) =>
                            setCustomTemplate((prev) => ({
                              ...prev,
                              difficultyDistribution: {
                                ...prev.difficultyDistribution,
                                [level]: parseInt(e.target.value),
                              },
                            }))
                          }
                          className="flex-1"
                        />
                        <span className="w-8 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Question Types
                  </label>
                  <div className="space-y-3">
                    {Object.entries(
                      customTemplate.questionTypes || {
                        mcq: 80,
                        assertion: 10,
                        numerical: 5,
                        matching: 5,
                      }
                    ).map(([type, percentage]) => (
                      <div key={type} className="flex items-center gap-3">
                        <span className="w-16 text-sm uppercase">{type}:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={percentage}
                          onChange={(e) =>
                            setCustomTemplate((prev) => ({
                              ...prev,
                              questionTypes: {
                                ...prev.questionTypes,
                                [type]: parseInt(e.target.value),
                              },
                            }))
                          }
                          className="flex-1"
                        />
                        <span className="w-8 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic Coverage
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
                    {availableTopics.map((topic) => (
                      <label key={topic} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={customTemplate.topicCoverage?.includes(topic)}
                          onChange={(e) => {
                            const topics = customTemplate.topicCoverage || []
                            if (e.target.checked) {
                              setCustomTemplate((prev) => ({
                                ...prev,
                                topicCoverage: [...topics, topic],
                              }))
                            } else {
                              setCustomTemplate((prev) => ({
                                ...prev,
                                topicCoverage: topics.filter((t) => t !== topic),
                              }))
                            }
                          }}
                          className="rounded"
                        />
                        {topic}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <button
                onClick={() => setActiveView('browse')}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Template
              </button>
            </div>
          </motion.div>
        )}

        {activeView === 'customize' && selectedTemplate && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-xl p-6 border"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Customize Template: {selectedTemplate.name}</h3>
              <button
                onClick={() => setActiveView('browse')}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Template Preview */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Template Overview</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">{selectedTemplate.duration} minutes</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Questions:</span>
                      <span className="ml-2 font-medium">{selectedTemplate.totalQuestions}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Marks:</span>
                      <span className="ml-2 font-medium">{selectedTemplate.totalMarks}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Syllabus:</span>
                      <span className="ml-2 font-medium capitalize">
                        {selectedTemplate.syllabus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Difficulty Distribution</h4>
                  <div className="space-y-2">
                    {Object.entries(selectedTemplate.difficultyDistribution).map(
                      ([level, percentage]) => (
                        <div key={level} className="flex items-center gap-3">
                          <span className="w-16 text-sm capitalize">{level}:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                level === 'easy'
                                  ? 'bg-green-600'
                                  : level === 'medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-sm">{percentage}%</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Question Types</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedTemplate.questionTypes).map(([type, percentage]) => (
                      <div
                        key={type}
                        className="flex justify-between items-center p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm uppercase font-medium">{type}</span>
                        <span className="text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Topic Coverage</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.topicCoverage.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Panel */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Actions</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleUseTemplate(selectedTemplate)}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Use This Template
                    </button>

                    <button
                      onClick={() => {
                        setCustomTemplate(selectedTemplate)
                        setActiveView('create')
                      }}
                      className="w-full border py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate & Edit
                    </button>

                    <button
                      onClick={() =>
                        showToast(
                          'info',
                          'Export Template',
                          'Export functionality would be implemented here'
                        )
                      }
                      className="w-full border py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Template
                    </button>

                    <button
                      onClick={() =>
                        showToast(
                          'info',
                          'Share Template',
                          'Share functionality would be implemented here'
                        )
                      }
                      className="w-full border py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Share className="w-4 h-4" />
                      Share Template
                    </button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usage Count:</span>
                      <span className="font-medium">{selectedTemplate.usageCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created By:</span>
                      <span className="font-medium">{selectedTemplate.createdBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Used:</span>
                      <span className="font-medium">
                        {selectedTemplate.lastUsed.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Popular:</span>
                      <span className="font-medium">
                        {selectedTemplate.isPopular ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Configuration</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Negative Marking:</span>
                      <span className="font-medium">
                        {selectedTemplate.configuration.allowNegativeMarking ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shuffle Questions:</span>
                      <span className="font-medium">
                        {selectedTemplate.configuration.shuffleQuestions ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-medium">
                        {selectedTemplate.configuration.timeLimit ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Section Wise:</span>
                      <span className="font-medium">
                        {selectedTemplate.configuration.sectionWise ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TestTemplates
