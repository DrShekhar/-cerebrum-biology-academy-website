'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuestionBuilder } from './QuestionBuilder'
import {
  BookOpen,
  FileText,
  Settings,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Minus,
  Shuffle,
  Brain,
  Zap,
  TrendingUp,
  Award,
  X,
  Play,
  Upload,
  Database,
  Edit3,
  Edit,
  Trash2,
  FileSpreadsheet,
  Copy,
  Camera,
  Globe,
  Layers,
  GraduationCap,
  Users,
  Calculator,
  Timer,
  BarChart3,
  Star,
  Languages,
  RefreshCw,
  Eye,
  RotateCcw
} from 'lucide-react'

interface Topic {
  id: string
  name: string
  subtopics?: string[]
}

interface Chapter {
  id: string
  name: string
  topics: Topic[]
}

interface DifficultyDistribution {
  easy: number
  moderate: number
  difficult: number
}

interface QuestionTypeDistribution {
  mcq: number
  trueFalse: number
  fillInBlanks: number
  matchFollowing: number
  diagramLabeling: number
  shortAnswer: number
  longAnswer: number
  assertionReasoning: number
  caseStudy: number
  imageBased: number
  sequenceOrdering: number
  multipleSelect: number
}

type QuestionCreationMethod =
  | 'ai-generated'
  | 'manual-entry'
  | 'import-question-bank'
  | 'import-csv-excel'
  | 'copy-previous-tests'
  | 'ocr-textbook-pdf'
  | 'web-scraping'
  | 'clone-modify-existing'

interface QuestionCreationMethodInfo {
  id: QuestionCreationMethod
  name: string
  description: string
  icon: React.ElementType
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  timeEstimate: string
  features: string[]
}

interface TestConfiguration {
  // Basic Test Information
  testName: string
  testDescription: string
  subject: string
  gradeLevel: string
  language: string

  // Content Selection
  selectedChapters: string[]
  selectedTopics: string[]

  // Question Configuration
  totalQuestions: number
  difficultyDistribution: DifficultyDistribution
  questionTypeDistribution: QuestionTypeDistribution
  questionCreationMethod: QuestionCreationMethod

  // Test Settings
  totalMarks: number
  timeLimit: number
  passingPercentage: number
  testType: 'quiz' | 'exam' | 'practice' | 'mock'
  testCategory: 'assessment' | 'homework' | 'competitive' | 'diagnostic'

  // Advanced Options
  includeExplanations: boolean
  randomizeQuestions: boolean
  includeDiagrams: boolean
  includeImages: boolean
  allowNegativeMarking: boolean
  showResultsImmediately: boolean
  allowRetake: boolean
  maxAttempts: number

  // Advanced Settings
  questionShuffling: boolean
  optionShuffling: boolean
  negativeMarkingRules: {
    enabled: boolean
    penalty: number // percentage of positive marks
    applyToAllQuestions: boolean
  }
  calculatorPermission: boolean
  formulaSheetAttachment: {
    enabled: boolean
    fileUrl?: string
    fileName?: string
  }
  referenceMaterialAccess: {
    enabled: boolean
    materials: Array<{
      title: string
      url: string
      type: 'pdf' | 'web' | 'image'
    }>
  }
  partialMarkingScheme: {
    enabled: boolean
    rules: Array<{
      questionType: string
      partialPercentage: number
    }>
  }
  adaptiveDifficulty: {
    enabled: boolean
    algorithm: 'performance_based' | 'time_based' | 'mixed'
    adjustmentFactor: number
  }
}

interface TestCreationInterfaceProps {
  isOpen: boolean
  onClose: () => void
  onCreateTest: (config: TestConfiguration) => void
}

// NEET Biology syllabus data
const neetBiologyChapters: Chapter[] = [
  {
    id: 'diversity-living-world',
    name: 'Diversity in the Living World',
    topics: [
      { id: 'living-world', name: 'The Living World' },
      { id: 'biological-classification', name: 'Biological Classification' },
      { id: 'plant-kingdom', name: 'Plant Kingdom' },
      { id: 'animal-kingdom', name: 'Animal Kingdom' }
    ]
  },
  {
    id: 'structural-organization',
    name: 'Structural Organisation in Animals and Plants',
    topics: [
      { id: 'morphology-flowering-plants', name: 'Morphology of Flowering Plants' },
      { id: 'anatomy-flowering-plants', name: 'Anatomy of Flowering Plants' },
      { id: 'structural-organization-animals', name: 'Structural Organisation in Animals' }
    ]
  },
  {
    id: 'cell-structure-function',
    name: 'Cell Structure and Function',
    topics: [
      { id: 'cell-living-unit', name: 'Cell: The Unit of Life' },
      { id: 'biomolecules', name: 'Biomolecules' },
      { id: 'cell-cycle-division', name: 'Cell Cycle and Cell Division' }
    ]
  },
  {
    id: 'plant-physiology',
    name: 'Plant Physiology',
    topics: [
      { id: 'transport-plants', name: 'Transport in Plants' },
      { id: 'mineral-nutrition', name: 'Mineral Nutrition' },
      { id: 'photosynthesis', name: 'Photosynthesis in Higher Plants' },
      { id: 'respiration-plants', name: 'Respiration in Plants' },
      { id: 'plant-growth-development', name: 'Plant Growth and Development' }
    ]
  },
  {
    id: 'human-physiology',
    name: 'Human Physiology',
    topics: [
      { id: 'digestion-absorption', name: 'Digestion and Absorption' },
      { id: 'breathing-exchange', name: 'Breathing and Exchange of Gases' },
      { id: 'body-fluids-circulation', name: 'Body Fluids and Circulation' },
      { id: 'excretory-products', name: 'Excretory Products and their Elimination' },
      { id: 'locomotion-movement', name: 'Locomotion and Movement' },
      { id: 'neural-control', name: 'Neural Control and Coordination' },
      { id: 'chemical-coordination', name: 'Chemical Coordination and Integration' }
    ]
  },
  {
    id: 'reproduction',
    name: 'Reproduction',
    topics: [
      { id: 'reproduction-organisms', name: 'Reproduction in Organisms' },
      { id: 'sexual-reproduction-plants', name: 'Sexual Reproduction in Flowering Plants' },
      { id: 'human-reproduction', name: 'Human Reproduction' },
      { id: 'reproductive-health', name: 'Reproductive Health' }
    ]
  },
  {
    id: 'genetics-evolution',
    name: 'Genetics and Evolution',
    topics: [
      { id: 'heredity-variation', name: 'Heredity and Variation' },
      { id: 'molecular-basis-inheritance', name: 'Molecular Basis of Inheritance' },
      { id: 'evolution', name: 'Evolution' }
    ]
  },
  {
    id: 'biology-human-welfare',
    name: 'Biology and Human Welfare',
    topics: [
      { id: 'health-disease', name: 'Health and Disease' },
      { id: 'microbes-human-welfare', name: 'Microbes in Human Welfare' }
    ]
  },
  {
    id: 'biotechnology',
    name: 'Biotechnology and its Applications',
    topics: [
      { id: 'biotechnology-principles', name: 'Biotechnology: Principles and Processes' },
      { id: 'biotechnology-applications', name: 'Biotechnology and its Applications' }
    ]
  },
  {
    id: 'ecology-environment',
    name: 'Ecology and Environment',
    topics: [
      { id: 'organisms-environment', name: 'Organisms and Environment' },
      { id: 'ecosystem', name: 'Ecosystem' },
      { id: 'biodiversity-conservation', name: 'Biodiversity and Conservation' },
      { id: 'environmental-issues', name: 'Environmental Issues' }
    ]
  }
]

// Question Creation Methods
const questionCreationMethods: QuestionCreationMethodInfo[] = [
  {
    id: 'ai-generated',
    name: 'AI-Generated Questions',
    description: 'Let AI create high-quality NEET Biology questions automatically based on your selected topics',
    icon: Brain,
    difficulty: 'Easy',
    timeEstimate: '2-5 min',
    features: ['NEET-focused content', 'Multiple difficulty levels', 'Instant generation', 'Explanations included']
  },
  {
    id: 'manual-entry',
    name: 'Manual Question Entry',
    description: 'Create questions manually with full control over content, format, and difficulty',
    icon: Edit3,
    difficulty: 'Medium',
    timeEstimate: '10-30 min',
    features: ['Complete customization', 'Multiple question types', 'Rich text editor', 'Image support']
  },
  {
    id: 'import-question-bank',
    name: 'Import from Question Bank',
    description: 'Select questions from our curated database of NEET Biology questions',
    icon: Database,
    difficulty: 'Easy',
    timeEstimate: '3-8 min',
    features: ['Pre-verified questions', 'Filter by topics', 'Difficulty sorting', 'Quick selection']
  },
  {
    id: 'import-csv-excel',
    name: 'Import from CSV/Excel',
    description: 'Upload questions from spreadsheet files with bulk import functionality',
    icon: FileSpreadsheet,
    difficulty: 'Medium',
    timeEstimate: '5-10 min',
    features: ['Bulk import', 'Template provided', 'Data validation', 'Error checking']
  },
  {
    id: 'copy-previous-tests',
    name: 'Copy from Previous Tests',
    description: 'Reuse questions from your previously created tests and modify as needed',
    icon: Copy,
    difficulty: 'Easy',
    timeEstimate: '2-5 min',
    features: ['Quick replication', 'Edit existing', 'Version history', 'Smart suggestions']
  },
  {
    id: 'ocr-textbook-pdf',
    name: 'OCR from Textbook/PDF',
    description: 'Extract questions from textbook images or PDF files using advanced OCR technology',
    icon: Camera,
    difficulty: 'Advanced',
    timeEstimate: '10-20 min',
    features: ['Image recognition', 'Text extraction', 'Auto formatting', 'Manual review']
  },
  {
    id: 'web-scraping',
    name: 'Web Scraping from Question Sites',
    description: 'Automatically scrape questions from educational websites and question portals',
    icon: Globe,
    difficulty: 'Advanced',
    timeEstimate: '15-25 min',
    features: ['Multi-site support', 'Quality filtering', 'Auto categorization', 'Copyright respect']
  },
  {
    id: 'clone-modify-existing',
    name: 'Clone & Modify Existing Questions',
    description: 'Start with existing questions and modify them to create variations',
    icon: Layers,
    difficulty: 'Medium',
    timeEstimate: '8-15 min',
    features: ['Question variations', 'Smart modifications', 'Difficulty adjustment', 'Bulk operations']
  }
]

export function TestCreationInterface({ isOpen, onClose, onCreateTest }: TestCreationInterfaceProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [testConfig, setTestConfig] = useState<TestConfiguration>({
    // Basic Test Information
    testName: '',
    testDescription: '',
    subject: 'Biology',
    gradeLevel: 'Class 12',
    language: 'English',

    // Content Selection
    selectedChapters: [],
    selectedTopics: [],

    // Question Configuration
    totalQuestions: 50,
    difficultyDistribution: { easy: 30, moderate: 50, difficult: 20 },
    questionTypeDistribution: {
      mcq: 60,
      trueFalse: 10,
      fillInBlanks: 10,
      matchFollowing: 5,
      diagramLabeling: 5,
      shortAnswer: 5,
      longAnswer: 0,
      assertionReasoning: 5,
      caseStudy: 0,
      imageBased: 0,
      sequenceOrdering: 0,
      multipleSelect: 0
    },
    questionCreationMethod: 'ai-generated',

    // Test Settings
    totalMarks: 180, // 50 questions × 4 marks each (default for NEET)
    timeLimit: 180, // 3 hours in minutes
    passingPercentage: 50,
    testType: 'practice',
    testCategory: 'assessment',

    // Advanced Options
    includeExplanations: true,
    randomizeQuestions: true,
    includeDiagrams: false,
    includeImages: false,
    allowNegativeMarking: true,
    showResultsImmediately: false,
    allowRetake: true,
    maxAttempts: 3,

    // Advanced Settings
    questionShuffling: true,
    optionShuffling: true,
    negativeMarkingRules: {
      enabled: true,
      penalty: 25, // 25% penalty (1/4th of positive marks for NEET style)
      applyToAllQuestions: true
    },
    calculatorPermission: false, // Biology typically doesn't require calculator
    formulaSheetAttachment: {
      enabled: false,
      fileUrl: undefined,
      fileName: undefined
    },
    referenceMaterialAccess: {
      enabled: false,
      materials: []
    },
    partialMarkingScheme: {
      enabled: false,
      rules: [
        { questionType: 'shortAnswer', partialPercentage: 50 },
        { questionType: 'longAnswer', partialPercentage: 60 },
        { questionType: 'caseStudy', partialPercentage: 40 }
      ]
    },
    adaptiveDifficulty: {
      enabled: false,
      algorithm: 'performance_based',
      adjustmentFactor: 0.1
    }
  })
  const [expandedChapters, setExpandedChapters] = useState<string[]>([])
  const [showQuestionBuilder, setShowQuestionBuilder] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [createdQuestions, setCreatedQuestions] = useState<any[]>([])

  const totalDifficultyPercentage = testConfig.difficultyDistribution.easy +
                                    testConfig.difficultyDistribution.moderate +
                                    testConfig.difficultyDistribution.difficult

  const totalQuestionTypePercentage = Object.values(testConfig.questionTypeDistribution)
                                     .reduce((sum, value) => sum + value, 0)

  const handleChapterToggle = (chapterId: string) => {
    setTestConfig(prev => ({
      ...prev,
      selectedChapters: prev.selectedChapters.includes(chapterId)
        ? prev.selectedChapters.filter(id => id !== chapterId)
        : [...prev.selectedChapters, chapterId]
    }))
  }

  const handleTopicToggle = (topicId: string) => {
    setTestConfig(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topicId)
        ? prev.selectedTopics.filter(id => id !== topicId)
        : [...prev.selectedTopics, topicId]
    }))
  }

  const handleDifficultyChange = (level: keyof DifficultyDistribution, value: number) => {
    setTestConfig(prev => ({
      ...prev,
      difficultyDistribution: {
        ...prev.difficultyDistribution,
        [level]: Math.max(0, Math.min(100, value))
      }
    }))
  }

  const handleQuestionTypeChange = (type: keyof QuestionTypeDistribution, value: number) => {
    setTestConfig(prev => ({
      ...prev,
      questionTypeDistribution: {
        ...prev.questionTypeDistribution,
        [type]: Math.max(0, Math.min(100, value))
      }
    }))
  }

  const toggleChapterExpansion = (chapterId: string) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  const resetDifficultyDistribution = () => {
    setTestConfig(prev => ({
      ...prev,
      difficultyDistribution: { easy: 30, moderate: 50, difficult: 20 }
    }))
  }

  const resetQuestionTypeDistribution = () => {
    setTestConfig(prev => ({
      ...prev,
      questionTypeDistribution: {
        mcq: 60,
        trueFalse: 10,
        fillInBlanks: 10,
        matchFollowing: 5,
        diagramLabeling: 5,
        shortAnswer: 5,
        longAnswer: 0,
        assertionReasoning: 5,
        caseStudy: 0,
        imageBased: 0,
        sequenceOrdering: 0,
        multipleSelect: 0
      }
    }))
  }

  const getSelectedTopicsFromChapters = () => {
    const topics: string[] = []
    testConfig.selectedChapters.forEach(chapterId => {
      const chapter = neetBiologyChapters.find(ch => ch.id === chapterId)
      if (chapter) {
        topics.push(...chapter.topics.map(topic => topic.id))
      }
    })
    return [...new Set([...topics, ...testConfig.selectedTopics])]
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return testConfig.selectedChapters.length > 0 || testConfig.selectedTopics.length > 0
      case 2:
        return testConfig.totalQuestions > 0 && totalDifficultyPercentage === 100
      case 3:
        return totalQuestionTypePercentage === 100
      case 4:
        return true
      default:
        return false
    }
  }

  const handleQuestionBuilderOpen = () => {
    setEditingQuestion(null)
    setShowQuestionBuilder(true)
  }

  const handleQuestionBuilderClose = () => {
    setShowQuestionBuilder(false)
    setEditingQuestion(null)
  }

  const handleQuestionSave = (questionData: any) => {
    if (editingQuestion) {
      setCreatedQuestions(prev => prev.map(q => q.id === editingQuestion.id ? questionData : q))
    } else {
      const newQuestion = {
        ...questionData,
        id: Date.now().toString()
      }
      setCreatedQuestions(prev => [...prev, newQuestion])
    }
    setShowQuestionBuilder(false)
    setEditingQuestion(null)
  }

  const handleQuestionEdit = (question: any) => {
    setEditingQuestion(question)
    setShowQuestionBuilder(true)
  }

  const handleQuestionDelete = (questionId: string) => {
    setCreatedQuestions(prev => prev.filter(q => q.id !== questionId))
  }

  const handleCreateTest = () => {
    const finalConfig = {
      ...testConfig,
      selectedTopics: getSelectedTopicsFromChapters()
    }
    onCreateTest(finalConfig)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Create AI-Powered Test</h2>
                <p className="text-purple-100">Customize your NEET Biology assessment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[
              { step: 1, title: 'Select Content', icon: BookOpen },
              { step: 2, title: 'Configure Test', icon: Settings },
              { step: 3, title: 'Creation Method', icon: Zap },
              { step: 4, title: 'Question Types', icon: FileText },
              { step: 5, title: 'Review & Create', icon: CheckCircle }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentStep >= step ? 'bg-white text-purple-600' : 'bg-white/20 text-white/60'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step ? 'text-white' : 'text-white/60'
                }`}>
                  {title}
                </span>
                {step < 4 && (
                  <ChevronRight className="w-4 h-4 mx-4 text-white/60" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            {/* Step 1: Content Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Select Chapters and Topics
                  </h3>
                  <p className="text-gray-600">
                    Choose the content areas you want to focus on for your test
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Chapters Selection */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      Chapters ({testConfig.selectedChapters.length} selected)
                    </h4>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {neetBiologyChapters.map((chapter) => (
                        <div key={chapter.id} className="border border-gray-200 rounded-lg">
                          <div className="p-3">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={testConfig.selectedChapters.includes(chapter.id)}
                                onChange={() => handleChapterToggle(chapter.id)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3 flex-1 text-sm font-medium text-gray-700">
                                {chapter.name}
                              </span>
                              <button
                                onClick={() => toggleChapterExpansion(chapter.id)}
                                className="p-1 hover:bg-gray-100 rounded"
                              >
                                {expandedChapters.includes(chapter.id) ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            </label>
                          </div>

                          {expandedChapters.includes(chapter.id) && (
                            <div className="border-t border-gray-200 bg-gray-50 p-3 space-y-2">
                              {chapter.topics.map((topic) => (
                                <label key={topic.id} className="flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={testConfig.selectedTopics.includes(topic.id)}
                                    onChange={() => handleTopicToggle(topic.id)}
                                    className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-2 text-xs text-gray-600">
                                    {topic.name}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Content Summary */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-green-600" />
                      Selection Summary
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Selected Chapters:</span>
                          <span className="font-semibold text-blue-600">
                            {testConfig.selectedChapters.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Additional Topics:</span>
                          <span className="font-semibold text-green-600">
                            {testConfig.selectedTopics.length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Topics:</span>
                          <span className="font-semibold text-purple-600">
                            {getSelectedTopicsFromChapters().length}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Selection Buttons */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700">Quick Selection:</h5>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setTestConfig(prev => ({
                            ...prev,
                            selectedChapters: neetBiologyChapters.map(ch => ch.id)
                          }))}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          Select All Chapters
                        </button>
                        <button
                          onClick={() => setTestConfig(prev => ({
                            ...prev,
                            selectedChapters: [],
                            selectedTopics: []
                          }))}
                          className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Test Configuration */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Configure Test Settings</h3>
                  <p className="text-gray-600">Set up comprehensive test parameters and requirements</p>
                </div>

                {/* Basic Test Information */}
                <div className="bg-gray-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Basic Test Information
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Test Name *
                      </label>
                      <input
                        type="text"
                        value={testConfig.testName}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, testName: e.target.value }))}
                        placeholder="e.g., NEET Biology Mock Test 1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={testConfig.subject}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Biology">Biology</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="General Science">General Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade/Class Level
                      </label>
                      <select
                        value={testConfig.gradeLevel}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, gradeLevel: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                        <option value="NEET/JEE">NEET/JEE</option>
                        <option value="Undergraduate">Undergraduate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={testConfig.language}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Punjabi">Punjabi</option>
                        <option value="Urdu">Urdu</option>
                        <option value="Assamese">Assamese</option>
                        <option value="Oriya">Oriya</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Test Description
                      </label>
                      <textarea
                        value={testConfig.testDescription}
                        onChange={(e) => setTestConfig(prev => ({ ...prev, testDescription: e.target.value }))}
                        placeholder="Brief description of the test objectives and content"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Test Configuration */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Question Configuration */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-green-600" />
                        Question Configuration
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Questions
                          </label>
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setTestConfig(prev => ({
                                ...prev,
                                totalQuestions: Math.max(10, prev.totalQuestions - 10)
                              }))}
                              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="10"
                              max="200"
                              value={testConfig.totalQuestions}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                totalQuestions: Math.max(10, parseInt(e.target.value) || 10)
                              }))}
                              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => setTestConfig(prev => ({
                                ...prev,
                                totalQuestions: Math.min(200, prev.totalQuestions + 10)
                              }))}
                              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            {[25, 50, 100, 150].map(count => (
                              <button
                                key={count}
                                onClick={() => setTestConfig(prev => ({ ...prev, totalQuestions: count }))}
                                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                  testConfig.totalQuestions === count
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {count}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Total Marks
                          </label>
                          <input
                            type="number"
                            min="10"
                            max="1000"
                            value={testConfig.totalMarks}
                            onChange={(e) => setTestConfig(prev => ({
                              ...prev,
                              totalMarks: Math.max(10, parseInt(e.target.value) || 10)
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Average: {(testConfig.totalMarks / testConfig.totalQuestions).toFixed(1)} marks per question
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passing Percentage
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="range"
                              min="30"
                              max="90"
                              value={testConfig.passingPercentage}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                passingPercentage: parseInt(e.target.value)
                              }))}
                              className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-sm font-medium text-blue-600 w-12">
                              {testConfig.passingPercentage}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Pass marks: {Math.round(testConfig.totalMarks * testConfig.passingPercentage / 100)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Test Type & Category */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-purple-600" />
                        Test Type & Category
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Type
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { value: 'quiz', label: 'Quiz', icon: '🎯' },
                              { value: 'exam', label: 'Exam', icon: '📝' },
                              { value: 'practice', label: 'Practice', icon: '💪' },
                              { value: 'mock', label: 'Mock', icon: '🎭' }
                            ].map(({ value, label, icon }) => (
                              <button
                                key={value}
                                onClick={() => setTestConfig(prev => ({ ...prev, testType: value as any }))}
                                className={`p-3 rounded-lg border-2 transition-colors text-sm ${
                                  testConfig.testType === value
                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <span className="block text-lg mb-1">{icon}</span>
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Category
                          </label>
                          <select
                            value={testConfig.testCategory}
                            onChange={(e) => setTestConfig(prev => ({ ...prev, testCategory: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="assessment">Assessment</option>
                            <option value="homework">Homework</option>
                            <option value="competitive">Competitive Exam</option>
                            <option value="diagnostic">Diagnostic Test</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Time & Attempts */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Timer className="w-5 h-5 mr-2 text-orange-600" />
                        Time & Attempts
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Limit
                          </label>
                          <select
                            value={testConfig.timeLimit}
                            onChange={(e) => setTestConfig(prev => ({
                              ...prev,
                              timeLimit: parseInt(e.target.value)
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value={0}>No time limit</option>
                            <option value={30}>30 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={90}>1.5 hours</option>
                            <option value={120}>2 hours</option>
                            <option value={150}>2.5 hours</option>
                            <option value={180}>3 hours</option>
                            <option value={240}>4 hours</option>
                          </select>
                          {testConfig.timeLimit > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              ~{Math.round(testConfig.timeLimit / testConfig.totalQuestions)} minutes per question
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                checked={testConfig.allowRetake}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  allowRetake: e.target.checked
                                }))}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">Allow Retake</span>
                            </label>
                          </div>

                          {testConfig.allowRetake && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Max Attempts
                              </label>
                              <select
                                value={testConfig.maxAttempts}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  maxAttempts: parseInt(e.target.value)
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={0}>Unlimited</option>
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Advanced Settings */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Settings className="w-5 h-5 mr-2 text-gray-600" />
                        Advanced Settings
                      </h4>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-3">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.includeExplanations}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                includeExplanations: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Include detailed explanations</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.randomizeQuestions}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                randomizeQuestions: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Randomize question order</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.allowNegativeMarking}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                allowNegativeMarking: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Enable negative marking</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.showResultsImmediately}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                showResultsImmediately: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Show results immediately</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.includeDiagrams}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                includeDiagrams: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Include diagrams & figures</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.includeImages}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                includeImages: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Include images & photos</span>
                          </label>

                          {/* Additional Advanced Settings */}
                          <hr className="my-4 border-gray-200" />

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.questionShuffling}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                questionShuffling: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Question Shuffling</span>
                          </label>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.optionShuffling}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                optionShuffling: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Option Shuffling</span>
                          </label>

                          {/* Negative Marking Rules */}
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={testConfig.negativeMarkingRules.enabled}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  negativeMarkingRules: {
                                    ...prev.negativeMarkingRules,
                                    enabled: e.target.checked
                                  }
                                }))}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3 text-sm text-gray-700 font-medium">Negative Marking Rules</span>
                            </label>

                            {testConfig.negativeMarkingRules.enabled && (
                              <div className="ml-7 space-y-2">
                                <div className="flex items-center space-x-3">
                                  <label className="text-sm text-gray-600">Penalty %:</label>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={testConfig.negativeMarkingRules.penalty}
                                    onChange={(e) => setTestConfig(prev => ({
                                      ...prev,
                                      negativeMarkingRules: {
                                        ...prev.negativeMarkingRules,
                                        penalty: parseInt(e.target.value) || 0
                                      }
                                    }))}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                                  />
                                </div>
                                <label className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={testConfig.negativeMarkingRules.applyToAllQuestions}
                                    onChange={(e) => setTestConfig(prev => ({
                                      ...prev,
                                      negativeMarkingRules: {
                                        ...prev.negativeMarkingRules,
                                        applyToAllQuestions: e.target.checked
                                      }
                                    }))}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-3 text-sm text-gray-600">Apply to all questions</span>
                                </label>
                              </div>
                            )}
                          </div>

                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={testConfig.calculatorPermission}
                              onChange={(e) => setTestConfig(prev => ({
                                ...prev,
                                calculatorPermission: e.target.checked
                              }))}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="ml-3 text-sm text-gray-700">Calculator Permission</span>
                          </label>

                          {/* Formula Sheet Attachment */}
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={testConfig.formulaSheetAttachment.enabled}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  formulaSheetAttachment: {
                                    ...prev.formulaSheetAttachment,
                                    enabled: e.target.checked
                                  }
                                }))}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3 text-sm text-gray-700 font-medium">Formula Sheet Attachment</span>
                            </label>

                            {testConfig.formulaSheetAttachment.enabled && (
                              <div className="ml-7 space-y-2">
                                <input
                                  type="text"
                                  placeholder="Formula sheet filename"
                                  value={testConfig.formulaSheetAttachment.fileName || ''}
                                  onChange={(e) => setTestConfig(prev => ({
                                    ...prev,
                                    formulaSheetAttachment: {
                                      ...prev.formulaSheetAttachment,
                                      fileName: e.target.value
                                    }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                />
                              </div>
                            )}
                          </div>

                          {/* Partial Marking Scheme */}
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={testConfig.partialMarkingScheme.enabled}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  partialMarkingScheme: {
                                    ...prev.partialMarkingScheme,
                                    enabled: e.target.checked
                                  }
                                }))}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3 text-sm text-gray-700 font-medium">Partial Marking Scheme</span>
                            </label>

                            {testConfig.partialMarkingScheme.enabled && (
                              <div className="ml-7 text-sm text-gray-600">
                                <p>Enabled for: Short Answer (50%), Long Answer (60%), Case Study (40%)</p>
                              </div>
                            )}
                          </div>

                          {/* Adaptive Difficulty */}
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={testConfig.adaptiveDifficulty.enabled}
                                onChange={(e) => setTestConfig(prev => ({
                                  ...prev,
                                  adaptiveDifficulty: {
                                    ...prev.adaptiveDifficulty,
                                    enabled: e.target.checked
                                  }
                                }))}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                              />
                              <span className="ml-3 text-sm text-gray-700 font-medium">Adaptive Difficulty</span>
                            </label>

                            {testConfig.adaptiveDifficulty.enabled && (
                              <div className="ml-7 space-y-2">
                                <select
                                  value={testConfig.adaptiveDifficulty.algorithm}
                                  onChange={(e) => setTestConfig(prev => ({
                                    ...prev,
                                    adaptiveDifficulty: {
                                      ...prev.adaptiveDifficulty,
                                      algorithm: e.target.value as 'performance_based' | 'time_based' | 'mixed'
                                    }
                                  }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                                >
                                  <option value="performance_based">Performance Based</option>
                                  <option value="time_based">Time Based</option>
                                  <option value="mixed">Mixed Algorithm</option>
                                </select>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Difficulty Distribution - Moved to bottom */}
                <div className="bg-gradient-to-r from-green-50 to-green-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                      Difficulty Distribution
                    </h4>
                    <button
                      onClick={resetDifficultyDistribution}
                      className="text-sm text-green-600 hover:text-green-800 transition-colors flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { key: 'easy' as const, label: 'Easy', color: 'green', icon: '🟢', bgColor: 'bg-green-100' },
                      { key: 'moderate' as const, label: 'Moderate', color: 'yellow', icon: '🟡', bgColor: 'bg-yellow-100' },
                      { key: 'difficult' as const, label: 'Difficult', color: 'red', icon: '🔴', bgColor: 'bg-red-100' }
                    ].map(({ key, label, color, icon, bgColor }) => (
                      <div key={key} className={`p-4 rounded-lg ${bgColor}`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            <span className="mr-2 text-lg">{icon}</span>
                            {label}
                          </span>
                          <span className="text-lg font-bold text-gray-800">
                            {testConfig.difficultyDistribution[key]}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={testConfig.difficultyDistribution[key]}
                          onChange={(e) => handleDifficultyChange(key, parseInt(e.target.value))}
                          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                            color === 'green' ? 'bg-green-200' :
                            color === 'yellow' ? 'bg-yellow-200' :
                            color === 'red' ? 'bg-red-200' : 'bg-gray-200'
                          }`}
                        />
                        <div className="text-xs text-gray-600 mt-2">
                          {Math.round(testConfig.totalQuestions * testConfig.difficultyDistribution[key] / 100)} questions
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-4 p-3 rounded-lg ${
                    totalDifficultyPercentage === 100
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-red-100 border border-red-300'
                  }`}>
                    <div className="flex items-center">
                      {totalDifficultyPercentage === 100 ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        totalDifficultyPercentage === 100 ? 'text-green-800' : 'text-red-800'
                      }`}>
                        Total: {totalDifficultyPercentage}%
                        {totalDifficultyPercentage !== 100 && ' (Must equal 100%)'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Question Creation Method */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Choose Question Creation Method</h3>
                  <p className="text-gray-600">Select how you want to create questions for your test</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questionCreationMethods.map((method) => {
                    const IconComponent = method.icon
                    const isSelected = testConfig.questionCreationMethod === method.id

                    return (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 bg-white'
                        }`}
                        onClick={() => setTestConfig(prev => ({ ...prev, questionCreationMethod: method.id }))}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-lg ${
                            isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-800 text-sm">{method.name}</h4>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  method.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                  method.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {method.difficulty}
                                </span>
                                <span className="text-xs text-gray-500">{method.timeEstimate}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-3">{method.description}</p>

                            <div className="flex flex-wrap gap-1">
                              {method.features.slice(0, 3).map((feature, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {feature}
                                </span>
                              ))}
                              {method.features.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  +{method.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Selected Method Details */}
                {testConfig.questionCreationMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500 text-white rounded-lg">
                        {React.createElement(
                          questionCreationMethods.find(m => m.id === testConfig.questionCreationMethod)?.icon || Brain,
                          { className: "w-5 h-5" }
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800">
                          {questionCreationMethods.find(m => m.id === testConfig.questionCreationMethod)?.name}
                        </h4>
                        <p className="text-sm text-purple-600">Selected Creation Method</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Features</h5>
                        <ul className="space-y-1">
                          {questionCreationMethods
                            .find(m => m.id === testConfig.questionCreationMethod)
                            ?.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-800 mb-2">Quick Info</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Difficulty:</span>
                            <span className="font-medium">
                              {questionCreationMethods.find(m => m.id === testConfig.questionCreationMethod)?.difficulty}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Time Estimate:</span>
                            <span className="font-medium">
                              {questionCreationMethods.find(m => m.id === testConfig.questionCreationMethod)?.timeEstimate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Question Creation Tools */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-semibold text-gray-800">Question Creation Tools</h5>
                          <p className="text-sm text-gray-600">Create and manage your questions</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          {createdQuestions.length} question{createdQuestions.length !== 1 ? 's' : ''} created
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleQuestionBuilderOpen}
                          className="flex items-center space-x-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <FileText className="w-5 h-5" />
                          <span>Create Question</span>
                        </button>

                        {testConfig.questionCreationMethod === 'import-csv-excel' && (
                          <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Upload className="w-5 h-5" />
                            <span>Import Excel/CSV</span>
                          </button>
                        )}

                        {testConfig.questionCreationMethod === 'import-question-bank' && (
                          <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <BookOpen className="w-5 h-5" />
                            <span>Browse Question Bank</span>
                          </button>
                        )}

                        {testConfig.questionCreationMethod === 'ai-generated' && (
                          <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Zap className="w-5 h-5" />
                            <span>Generate with AI</span>
                          </button>
                        )}
                      </div>

                      {/* Created Questions Preview */}
                      {createdQuestions.length > 0 && (
                        <div className="mt-6">
                          <h6 className="font-medium text-gray-800 mb-3">Created Questions</h6>
                          <div className="space-y-3 max-h-48 overflow-y-auto">
                            {createdQuestions.map((question, index) => (
                              <div key={question.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3">
                                    <span className="font-medium text-gray-800">Q{index + 1}</span>
                                    <span className="text-sm text-gray-600 truncate max-w-md">
                                      {question.question.content.replace(/<[^>]*>/g, '').substring(0, 60)}...
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                      question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {question.difficulty}
                                    </span>
                                    <span className="text-xs text-gray-500">{question.marks} marks</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleQuestionEdit(question)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleQuestionDelete(question.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 4: Question Types Configuration */}
            {currentStep === 4 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Configure Question Types
                  </h3>
                  <p className="text-gray-600">
                    Choose the mix of question formats for your test
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Question Types Distribution */}
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Question Type Distribution
                        </label>
                        <button
                          onClick={resetQuestionTypeDistribution}
                          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Reset to Default
                        </button>
                      </div>

                      <div className="space-y-4">
                        {[
                          { key: 'mcq' as const, label: 'Multiple Choice Questions (MCQ)', icon: '🔘', description: 'Classic 4-option multiple choice' },
                          { key: 'trueFalse' as const, label: 'True/False', icon: '✓✗', description: 'Binary choice questions' },
                          { key: 'fillInBlanks' as const, label: 'Fill in the Blanks', icon: '📝', description: 'Complete the sentence/formula' },
                          { key: 'matchFollowing' as const, label: 'Match the Following', icon: '🔗', description: 'Connect related items' },
                          { key: 'diagramLabeling' as const, label: 'Diagram Labeling', icon: '🏷️', description: 'Label parts of biological diagrams' },
                          { key: 'shortAnswer' as const, label: 'Short Answer', icon: '📋', description: '1-2 sentence responses' },
                          { key: 'longAnswer' as const, label: 'Long Answer/Essay', icon: '📄', description: 'Detailed explanations' },
                          { key: 'assertionReasoning' as const, label: 'Assertion-Reasoning', icon: '💭', description: 'NEET-style assertion-reason format' },
                          { key: 'caseStudy' as const, label: 'Case Study Based', icon: '📖', description: 'Scenario-based questions' },
                          { key: 'imageBased' as const, label: 'Image-Based Questions', icon: '🖼️', description: 'Questions with biological images' },
                          { key: 'sequenceOrdering' as const, label: 'Sequence Ordering', icon: '🔢', description: 'Arrange in correct order' },
                          { key: 'multipleSelect' as const, label: 'Multiple Select', icon: '☑️', description: 'Select all correct options' }
                        ].map(({ key, label, icon, description }) => (
                          <div key={key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700 flex items-center">
                                <span className="mr-2">{icon}</span>
                                <div>
                                  <div>{label}</div>
                                  <div className="text-xs text-gray-500">{description}</div>
                                </div>
                              </span>
                              <span className="text-sm text-gray-500 ml-2">
                                {testConfig.questionTypeDistribution[key]}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={testConfig.questionTypeDistribution[key]}
                              onChange={(e) => handleQuestionTypeChange(key, parseInt(e.target.value))}
                              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-200"
                            />
                          </div>
                        ))}
                      </div>

                      <div className={`mt-4 p-3 rounded-lg ${
                        totalQuestionTypePercentage === 100
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center">
                          {totalQuestionTypePercentage === 100 ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          )}
                          <span className={`text-sm font-medium ${
                            totalQuestionTypePercentage === 100 ? 'text-green-800' : 'text-red-800'
                          }`}>
                            Total: {totalQuestionTypePercentage}%
                            {totalQuestionTypePercentage !== 100 && ' (Must equal 100%)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Type Preview */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 flex items-center mb-4">
                        <Target className="w-5 h-5 mr-2 text-purple-600" />
                        Question Distribution Preview
                      </h4>
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4">
                        <div className="space-y-3">
                          {Object.entries(testConfig.questionTypeDistribution)
                            .filter(([_, percentage]) => percentage > 0)
                            .map(([type, percentage]) => {
                              const count = Math.round(testConfig.totalQuestions * percentage / 100)
                              const typeLabels: Record<string, string> = {
                                mcq: 'MCQ',
                                trueFalse: 'True/False',
                                fillInBlanks: 'Fill in Blanks',
                                matchFollowing: 'Match Following',
                                diagramLabeling: 'Diagram Labeling',
                                shortAnswer: 'Short Answer',
                                longAnswer: 'Long Answer',
                                assertionReasoning: 'Assertion-Reasoning',
                                caseStudy: 'Case Study',
                                imageBased: 'Image-Based',
                                sequenceOrdering: 'Sequence Ordering',
                                multipleSelect: 'Multiple Select'
                              }
                              return (
                                <div key={type} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-700">{typeLabels[type]}</span>
                                  <div className="text-right">
                                    <span className="font-medium text-purple-600">{count}</span>
                                    <span className="text-xs text-gray-500 ml-1">({percentage}%)</span>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-3">
                      <h5 className="text-sm font-medium text-gray-700">Additional Features</h5>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={testConfig.includeDiagrams}
                          onChange={(e) => setTestConfig(prev => ({
                            ...prev,
                            includeDiagrams: e.target.checked
                          }))}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Include biological diagrams
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={testConfig.includeImages}
                          onChange={(e) => setTestConfig(prev => ({
                            ...prev,
                            includeImages: e.target.checked
                          }))}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Include microscopy images
                        </span>
                      </label>
                    </div>

                    {/* Quick Presets */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700">Quick Presets:</h5>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setTestConfig(prev => ({
                            ...prev,
                            questionTypeDistribution: {
                              mcq: 100, trueFalse: 0, fillInBlanks: 0, matchFollowing: 0,
                              diagramLabeling: 0, shortAnswer: 0, longAnswer: 0, assertionReasoning: 0,
                              caseStudy: 0, imageBased: 0, sequenceOrdering: 0, multipleSelect: 0
                            }
                          }))}
                          className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          Only MCQ
                        </button>
                        <button
                          onClick={() => setTestConfig(prev => ({
                            ...prev,
                            questionTypeDistribution: {
                              mcq: 70, trueFalse: 15, fillInBlanks: 10, matchFollowing: 5,
                              diagramLabeling: 0, shortAnswer: 0, longAnswer: 0, assertionReasoning: 0,
                              caseStudy: 0, imageBased: 0, sequenceOrdering: 0, multipleSelect: 0
                            }
                          }))}
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                        >
                          NEET Style
                        </button>
                        <button
                          onClick={() => setTestConfig(prev => ({
                            ...prev,
                            questionTypeDistribution: {
                              mcq: 40, trueFalse: 10, fillInBlanks: 15, matchFollowing: 10,
                              diagramLabeling: 10, shortAnswer: 10, longAnswer: 5, assertionReasoning: 0,
                              caseStudy: 0, imageBased: 0, sequenceOrdering: 0, multipleSelect: 0
                            }
                          }))}
                          className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                        >
                          Mixed Format
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Create */}
            {currentStep === 5 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Review Test Configuration
                  </h3>
                  <p className="text-gray-600">
                    Review your settings before creating the test
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Content Summary */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      Content Selection
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Chapters:</span>
                        <span className="font-medium">{testConfig.selectedChapters.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Topics:</span>
                        <span className="font-medium">{getSelectedTopicsFromChapters().length}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {testConfig.selectedChapters.map(chapterId => {
                          const chapter = neetBiologyChapters.find(ch => ch.id === chapterId)
                          return chapter?.name
                        }).join(', ')}
                      </div>
                    </div>
                  </div>

                  {/* Test Settings Summary */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-green-600" />
                      Test Settings
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Questions:</span>
                        <span className="font-medium">{testConfig.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Time Limit:</span>
                        <span className="font-medium">
                          {testConfig.timeLimit === 0 ? 'No limit' : `${testConfig.timeLimit} min`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Test Type:</span>
                        <span className="font-medium capitalize">{testConfig.testType.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Distribution Summary */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-purple-600" />
                      Difficulty Distribution
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center">
                          <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                          Easy:
                        </span>
                        <span className="font-medium">{testConfig.difficultyDistribution.easy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center">
                          <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                          Moderate:
                        </span>
                        <span className="font-medium">{testConfig.difficultyDistribution.moderate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 flex items-center">
                          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                          Difficult:
                        </span>
                        <span className="font-medium">{testConfig.difficultyDistribution.difficult}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Options Summary */}
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-orange-600" />
                      Additional Options
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <CheckCircle className={`w-4 h-4 mr-2 ${
                          testConfig.includeExplanations ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm text-gray-600">Detailed explanations</span>
                      </div>
                      <div className="flex items-center">
                        <Shuffle className={`w-4 h-4 mr-2 ${
                          testConfig.randomizeQuestions ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm text-gray-600">Randomized questions</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated Statistics */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Estimated Test Statistics
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(testConfig.totalQuestions * testConfig.difficultyDistribution.easy / 100)}</div>
                      <div className="text-sm opacity-90">Easy Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(testConfig.totalQuestions * testConfig.difficultyDistribution.moderate / 100)}</div>
                      <div className="text-sm opacity-90">Moderate Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(testConfig.totalQuestions * testConfig.difficultyDistribution.difficult / 100)}</div>
                      <div className="text-sm opacity-90">Difficult Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{testConfig.timeLimit === 0 ? '∞' : `${(testConfig.timeLimit / testConfig.totalQuestions).toFixed(1)}m`}</div>
                      <div className="text-sm opacity-90">Per Question</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            <div className="flex space-x-3">
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNextStep()}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={handleCreateTest}
                  disabled={!canProceedToNextStep()}
                  className="px-6 py-2 bg-[#4a5d4a] text-white rounded-lg hover:from-green-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Create Test
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Question Builder Component */}
      <QuestionBuilder
        isOpen={showQuestionBuilder}
        onClose={handleQuestionBuilderClose}
        onSave={handleQuestionSave}
        initialQuestion={editingQuestion}
      />
    </div>
  )
}