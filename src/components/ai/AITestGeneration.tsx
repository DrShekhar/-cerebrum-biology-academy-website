'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TestTemplates from './TestTemplates'
import SectionConfiguration from './SectionConfiguration'
import AdaptiveFeatures from './AdaptiveFeatures'
import AccessSettings from './AccessSettings'
import SecurityFeatures from './SecurityFeatures'
import TestReview from './TestReview'
import Collaboration from './Collaboration'
import DataManagement from './DataManagement'
import QuestionBank from './QuestionBank'
import Distribution from './Distribution'
import Analytics from './Analytics'
import UICustomization from './UICustomization'
import Lifecycle from './lifecycle'
import TopicSelector from './TopicSelector'
import { getAllUnits, getChapterById } from '@/data/neet-syllabus'
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  BarChart3,
  Shuffle,
  Shield,
  CheckCircle2,
  Settings,
  Play,
  Download,
  RefreshCw,
  Lightbulb,
  BookOpen,
  Award,
  Zap,
  Filter,
  Search,
  TreePine,
  Lock,
  Users,
  Database,
  Library,
  Share2,
  LineChart,
  Palette,
} from 'lucide-react'

// Types and Interfaces
interface QuestionBank {
  id: string
  question: string
  type: 'mcq' | 'assertion' | 'numerical' | 'matching'
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  chapter: string
  learningObjectives: string[]
  bloomsLevel: string
  marks: number
  estimatedTime: number
  previousYearFrequency: number
  tags: string[]
  solution: {
    answer: string
    explanation: string
    steps: string[]
  }
  metadata: {
    discriminationIndex: number
    reliabilityCoefficient: number
    avgAttemptTime: number
  }
}

interface TestConfiguration {
  totalQuestions: number
  totalMarks: number
  duration: number
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  topicDistribution: {
    [topic: string]: number
  }
  questionTypes: {
    mcq: number
    assertion: number
    numerical: number
    matching: number
  }
  bloomsDistribution: {
    [level: string]: number
  }
  learningObjectives: string[]
  previousYearWeightage: number
}

interface GeneratedTest {
  id: string
  questions: QuestionBank[]
  configuration: TestConfiguration
  qualityMetrics: {
    difficultyScore: number
    topicCoverage: number
    objectiveCoverage: number
    diversityIndex: number
    duplicateScore: number
    similarityScore: number
  }
  generationTime: number
  recommendations: string[]
}

const AITestGeneration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'configure'
    | 'templates'
    | 'sections'
    | 'adaptive'
    | 'access'
    | 'security'
    | 'collaborate'
    | 'data'
    | 'bank'
    | 'distribute'
    | 'analytics'
    | 'ui'
    | 'lifecycle'
    | 'generate'
    | 'review'
  >('configure')
  const [isGenerating, setIsGenerating] = useState(false)
  const [configuration, setConfiguration] = useState<TestConfiguration>({
    totalQuestions: 50,
    totalMarks: 200,
    duration: 180,
    difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
    topicDistribution: {},
    questionTypes: { mcq: 70, assertion: 15, numerical: 10, matching: 5 },
    bloomsDistribution: {
      remember: 20,
      understand: 30,
      apply: 30,
      analyze: 15,
      evaluate: 5,
      create: 0,
    },
    learningObjectives: [],
    previousYearWeightage: 70,
  })
  const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null)
  const [selectedUnits, setSelectedUnits] = useState<string[]>([])
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
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
  ])

  // Auto-Generate from Topics Algorithm
  const generateFromTopics = async (selectedTopics: string[]): Promise<QuestionBank[]> => {
    const questionBank: QuestionBank[] = []

    // Simulate fetching questions from database based on topics
    for (const topic of selectedTopics) {
      const topicQuestions = await fetchQuestionsByTopic(topic)
      questionBank.push(...topicQuestions)
    }

    return questionBank
  }

  // Mock function to simulate database fetch
  const fetchQuestionsByTopic = async (topic: string): Promise<QuestionBank[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockQuestions: QuestionBank[] = Array.from({ length: 20 }, (_, i) => ({
          id: `${topic.toLowerCase().replace(' ', '_')}_${i + 1}`,
          question: `Sample ${topic} question ${i + 1}`,
          type: ['mcq', 'assertion', 'numerical', 'matching'][Math.floor(Math.random() * 4)] as any,
          difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as any,
          topic,
          subtopic: `${topic} Subtopic ${(i % 3) + 1}`,
          chapter: `Chapter ${Math.floor(i / 5) + 1}`,
          learningObjectives: [`Understand ${topic} concepts`, `Apply ${topic} principles`],
          bloomsLevel: ['remember', 'understand', 'apply', 'analyze'][
            Math.floor(Math.random() * 4)
          ],
          marks: [1, 2, 4][Math.floor(Math.random() * 3)],
          estimatedTime: Math.floor(Math.random() * 5) + 2,
          previousYearFrequency: Math.random(),
          tags: [topic.toLowerCase(), 'neet', 'biology'],
          solution: {
            answer: `Answer for ${topic} question ${i + 1}`,
            explanation: `Detailed explanation for ${topic} question ${i + 1}`,
            steps: ['Step 1', 'Step 2', 'Step 3'],
          },
          metadata: {
            discriminationIndex: Math.random(),
            reliabilityCoefficient: 0.7 + Math.random() * 0.3,
            avgAttemptTime: Math.floor(Math.random() * 3) + 2,
          },
        }))
        resolve(mockQuestions)
      }, 500)
    })
  }

  // Difficulty Distribution Algorithm
  const applyDifficultyDistribution = (
    questions: QuestionBank[],
    distribution: TestConfiguration['difficultyDistribution']
  ): QuestionBank[] => {
    const total = configuration.totalQuestions
    const easyCount = Math.floor((total * distribution.easy) / 100)
    const mediumCount = Math.floor((total * distribution.medium) / 100)
    const hardCount = total - easyCount - mediumCount

    const easyQuestions = questions.filter((q) => q.difficulty === 'easy').slice(0, easyCount)
    const mediumQuestions = questions.filter((q) => q.difficulty === 'medium').slice(0, mediumCount)
    const hardQuestions = questions.filter((q) => q.difficulty === 'hard').slice(0, hardCount)

    return [...easyQuestions, ...mediumQuestions, ...hardQuestions]
  }

  // Learning Objective Coverage
  const ensureLearningObjectiveCoverage = (
    questions: QuestionBank[],
    objectives: string[]
  ): QuestionBank[] => {
    const coveredObjectives = new Set<string>()
    const selectedQuestions: QuestionBank[] = []

    // First pass: ensure each objective is covered at least once
    for (const objective of objectives) {
      const questionWithObjective = questions.find(
        (q) =>
          q.learningObjectives.some((lo) => lo.toLowerCase().includes(objective.toLowerCase())) &&
          !selectedQuestions.includes(q)
      )
      if (questionWithObjective) {
        selectedQuestions.push(questionWithObjective)
        questionWithObjective.learningObjectives.forEach((lo) => coveredObjectives.add(lo))
      }
    }

    // Second pass: fill remaining slots with balanced coverage
    const remainingQuestions = questions.filter((q) => !selectedQuestions.includes(q))
    while (
      selectedQuestions.length < configuration.totalQuestions &&
      remainingQuestions.length > 0
    ) {
      const question = remainingQuestions.shift()!
      selectedQuestions.push(question)
    }

    return selectedQuestions
  }

  // Previous Year Pattern Matching
  const applyPreviousYearPatterns = (questions: QuestionBank[]): QuestionBank[] => {
    const weightage = configuration.previousYearWeightage / 100

    // Sort questions by previous year frequency (higher frequency first)
    const sortedByFrequency = [...questions].sort(
      (a, b) => b.previousYearFrequency - a.previousYearFrequency
    )

    const highFrequencyCount = Math.floor(configuration.totalQuestions * weightage)
    const highFrequencyQuestions = sortedByFrequency.slice(0, highFrequencyCount)
    const otherQuestions = sortedByFrequency.slice(highFrequencyCount)

    // Shuffle other questions to maintain randomness
    const shuffledOthers = otherQuestions.sort(() => Math.random() - 0.5)
    const remainingCount = configuration.totalQuestions - highFrequencyCount

    return [...highFrequencyQuestions, ...shuffledOthers.slice(0, remainingCount)]
  }

  // Balanced Topic Distribution
  const ensureBalancedTopicDistribution = (questions: QuestionBank[]): QuestionBank[] => {
    const topicCounts = Object.entries(configuration.topicDistribution)
    const balancedQuestions: QuestionBank[] = []

    for (const [topic, count] of topicCounts) {
      const topicQuestions = questions.filter(
        (q) => q.topic === topic && !balancedQuestions.includes(q)
      )
      const selectedFromTopic = topicQuestions.slice(0, count)
      balancedQuestions.push(...selectedFromTopic)
    }

    // Fill remaining slots if any
    const remainingQuestions = questions.filter((q) => !balancedQuestions.includes(q))
    while (
      balancedQuestions.length < configuration.totalQuestions &&
      remainingQuestions.length > 0
    ) {
      balancedQuestions.push(remainingQuestions.shift()!)
    }

    return balancedQuestions
  }

  // Question Diversity Assurance
  const ensureQuestionDiversity = (questions: QuestionBank[]): QuestionBank[] => {
    const diverseQuestions: QuestionBank[] = []
    const usedCombinations = new Set<string>()

    for (const question of questions) {
      const combination = `${question.topic}_${question.difficulty}_${question.type}_${question.bloomsLevel}`

      if (
        !usedCombinations.has(combination) ||
        diverseQuestions.length < configuration.totalQuestions * 0.7
      ) {
        diverseQuestions.push(question)
        usedCombinations.add(combination)
      }
    }

    // Fill remaining slots if diversity requirement leaves gaps
    const remainingQuestions = questions.filter((q) => !diverseQuestions.includes(q))
    while (
      diverseQuestions.length < configuration.totalQuestions &&
      remainingQuestions.length > 0
    ) {
      diverseQuestions.push(remainingQuestions.shift()!)
    }

    return diverseQuestions
  }

  // Duplicate Detection
  const detectDuplicates = (questions: QuestionBank[]): QuestionBank[] => {
    const uniqueQuestions: QuestionBank[] = []
    const seenQuestions = new Set<string>()

    for (const question of questions) {
      // Create a normalized version of the question for comparison
      const normalizedQuestion = question.question
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .trim()

      if (!seenQuestions.has(normalizedQuestion)) {
        uniqueQuestions.push(question)
        seenQuestions.add(normalizedQuestion)
      }
    }

    return uniqueQuestions
  }

  // Similar Question Avoidance
  const avoidSimilarQuestions = (questions: QuestionBank[]): QuestionBank[] => {
    const filteredQuestions: QuestionBank[] = []

    for (const question of questions) {
      let isSimilar = false

      for (const existingQuestion of filteredQuestions) {
        const similarity = calculateSimilarity(question.question, existingQuestion.question)
        if (similarity > 0.8) {
          // 80% similarity threshold
          isSimilar = true
          break
        }
      }

      if (!isSimilar) {
        filteredQuestions.push(question)
      }
    }

    return filteredQuestions
  }

  // Helper function to calculate text similarity
  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = text1.toLowerCase().split(/\s+/)
    const words2 = text2.toLowerCase().split(/\s+/)

    const commonWords = words1.filter((word) => words2.includes(word))
    const totalWords = new Set([...words1, ...words2]).size

    return commonWords.length / totalWords
  }

  // Main Test Generation Function
  const generateTest = async (): Promise<GeneratedTest> => {
    const startTime = Date.now()
    setIsGenerating(true)

    try {
      // Step 1: Auto-Generate from Topics
      const selectedTopics = Object.keys(configuration.topicDistribution)
      let questionPool = await generateFromTopics(selectedTopics)

      // Step 2: Apply Difficulty Distribution
      questionPool = applyDifficultyDistribution(questionPool, configuration.difficultyDistribution)

      // Step 3: Ensure Learning Objective Coverage
      questionPool = ensureLearningObjectiveCoverage(questionPool, configuration.learningObjectives)

      // Step 4: Apply Previous Year Pattern Matching
      questionPool = applyPreviousYearPatterns(questionPool)

      // Step 5: Ensure Balanced Topic Distribution
      questionPool = ensureBalancedTopicDistribution(questionPool)

      // Step 6: Ensure Question Diversity
      questionPool = ensureQuestionDiversity(questionPool)

      // Step 7: Detect and Remove Duplicates
      questionPool = detectDuplicates(questionPool)

      // Step 8: Avoid Similar Questions
      questionPool = avoidSimilarQuestions(questionPool)

      // Calculate Quality Metrics
      const qualityMetrics = calculateQualityMetrics(questionPool)

      // Generate Recommendations
      const recommendations = generateRecommendations(questionPool, qualityMetrics)

      const generatedTest: GeneratedTest = {
        id: `test_${Date.now()}`,
        questions: questionPool.slice(0, configuration.totalQuestions),
        configuration,
        qualityMetrics,
        generationTime: Date.now() - startTime,
        recommendations,
      }

      return generatedTest
    } finally {
      setIsGenerating(false)
    }
  }

  // Quality Metrics Calculation
  const calculateQualityMetrics = (questions: QuestionBank[]) => {
    const difficultyScore =
      (questions.reduce((sum, q) => {
        return sum + (['easy', 'medium', 'hard'].indexOf(q.difficulty) + 1)
      }, 0) /
        questions.length /
        3) *
      100

    const topicCoverage =
      (Object.keys(configuration.topicDistribution).length / availableTopics.length) * 100

    const objectivesCovered = new Set(questions.flatMap((q) => q.learningObjectives)).size
    const objectiveCoverage =
      configuration.learningObjectives.length > 0
        ? (objectivesCovered / configuration.learningObjectives.length) * 100
        : 100

    const diversityIndex = calculateDiversityIndex(questions)
    const duplicateScore = 100 // Assuming no duplicates after filtering
    const similarityScore = calculateAverageSimilarity(questions)

    return {
      difficultyScore,
      topicCoverage,
      objectiveCoverage,
      diversityIndex,
      duplicateScore,
      similarityScore,
    }
  }

  const calculateDiversityIndex = (questions: QuestionBank[]): number => {
    const combinations = new Set(questions.map((q) => `${q.topic}_${q.difficulty}_${q.type}`))
    return (combinations.size / questions.length) * 100
  }

  const calculateAverageSimilarity = (questions: QuestionBank[]): number => {
    let totalSimilarity = 0
    let comparisons = 0

    for (let i = 0; i < questions.length - 1; i++) {
      for (let j = i + 1; j < questions.length; j++) {
        totalSimilarity += calculateSimilarity(questions[i].question, questions[j].question)
        comparisons++
      }
    }

    return comparisons > 0 ? (1 - totalSimilarity / comparisons) * 100 : 100
  }

  // Generate Recommendations
  const generateRecommendations = (questions: QuestionBank[], metrics: any): string[] => {
    const recommendations: string[] = []

    if (metrics.difficultyScore < 40) {
      recommendations.push(
        'Consider adding more medium and hard difficulty questions for better assessment balance'
      )
    }

    if (metrics.topicCoverage < 80) {
      recommendations.push('Include questions from more topics to ensure comprehensive coverage')
    }

    if (metrics.objectiveCoverage < 90) {
      recommendations.push(
        'Some learning objectives are not adequately covered. Review question selection'
      )
    }

    if (metrics.diversityIndex < 60) {
      recommendations.push('Increase question type diversity for more engaging assessment')
    }

    if (metrics.similarityScore < 80) {
      recommendations.push(
        'Some questions may be too similar. Consider replacing with more varied content'
      )
    }

    return recommendations
  }

  // Event Handlers
  const handleGenerateTest = async () => {
    const test = await generateTest()
    setGeneratedTest(test)
    setActiveTab('review')
  }

  const handleTopicDistributionChange = (topic: string, percentage: number) => {
    setConfiguration((prev) => ({
      ...prev,
      topicDistribution: {
        ...prev.topicDistribution,
        [topic]: Math.floor((prev.totalQuestions * percentage) / 100),
      },
    }))
  }

  const handleNEETTopicSelection = (units: string[], chapters: string[]) => {
    setSelectedUnits(units)
    setSelectedChapters(chapters)

    const newTopicDistribution: { [topic: string]: number } = {}
    const allUnits = getAllUnits()
    const totalWeightage = units.reduce((sum, unitId) => {
      const unit = allUnits.find((u) => u.id === unitId)
      return sum + (unit?.weightage || 0)
    }, 0)

    chapters.forEach((chapterId) => {
      const chapter = getChapterById(chapterId)
      if (chapter) {
        const questionsForChapter = Math.floor(
          (configuration.totalQuestions * chapter.pyqFrequency) /
            chapters.reduce((sum, id) => {
              const ch = getChapterById(id)
              return sum + (ch?.pyqFrequency || 0)
            }, 0)
        )
        newTopicDistribution[chapter.name] = questionsForChapter
      }
    })

    setConfiguration((prev) => ({
      ...prev,
      topicDistribution: newTopicDistribution,
    }))
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
          <div className="p-3 bg-indigo-500 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-indigo-500 bg-clip-text text-transparent">
            AI Test Generation
          </h1>
        </motion.div>
        <p className="text-gray-800 max-w-2xl mx-auto font-medium">
          Intelligent test generation with advanced algorithms for optimal question selection,
          difficulty distribution, and comprehensive topic coverage
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { id: 'configure', label: 'Configure', icon: Settings },
            { id: 'templates', label: 'Templates', icon: BookOpen },
            { id: 'sections', label: 'Sections', icon: BarChart3 },
            { id: 'adaptive', label: 'Adaptive', icon: TreePine },
            { id: 'access', label: 'Access', icon: Shield },
            { id: 'security', label: 'Security', icon: Lock },
            { id: 'collaborate', label: 'Collaborate', icon: Users },
            { id: 'data', label: 'Data', icon: Database },
            { id: 'bank', label: 'Q-Bank', icon: Library },
            { id: 'distribute', label: 'Distribute', icon: Share2 },
            { id: 'analytics', label: 'Analytics', icon: LineChart },
            { id: 'ui', label: 'UI/UX', icon: Palette },
            { id: 'lifecycle', label: 'Lifecycle', icon: RefreshCw },
            { id: 'generate', label: 'Generate', icon: Play },
            { id: 'review', label: 'Review', icon: CheckCircle2 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? 'bg-white text-purple-600 shadow-md'
                  : 'text-gray-800 hover:text-gray-900 font-medium'
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
        {activeTab === 'configure' && (
          <motion.div
            key="configure"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Basic Configuration */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Basic Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    value={configuration.totalQuestions}
                    onChange={(e) =>
                      setConfiguration((prev) => ({
                        ...prev,
                        totalQuestions: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={configuration.totalMarks}
                    onChange={(e) =>
                      setConfiguration((prev) => ({
                        ...prev,
                        totalMarks: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={configuration.duration}
                    onChange={(e) =>
                      setConfiguration((prev) => ({
                        ...prev,
                        duration: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Difficulty Distribution */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Difficulty Distribution
              </h3>

              <div className="space-y-4">
                {Object.entries(configuration.difficultyDistribution).map(([level, percentage]) => (
                  <div key={level}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-gray-900 capitalize">
                        {level}
                      </label>
                      <span className="text-sm text-gray-800 font-medium">{percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={percentage}
                      onChange={(e) =>
                        setConfiguration((prev) => ({
                          ...prev,
                          difficultyDistribution: {
                            ...prev.difficultyDistribution,
                            [level]: parseInt(e.target.value),
                          },
                        }))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* NEET Topic Selection */}
            <div className="bg-white rounded-xl p-6 border lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                NEET Topic Selection
              </h3>

              <TopicSelector
                onSelectionChange={handleNEETTopicSelection}
                initialSelectedUnits={selectedUnits}
                initialSelectedChapters={selectedChapters}
              />

              {Object.keys(configuration.topicDistribution).length > 0 && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Question Distribution</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.entries(configuration.topicDistribution).map(([topic, count]) => (
                      <div key={topic} className="text-sm">
                        <div className="font-medium text-gray-900 truncate" title={topic}>
                          {topic}
                        </div>
                        <div className="text-purple-600 font-semibold">{count} questions</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Settings */}
            <div className="bg-white rounded-xl p-6 border lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                Advanced Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Previous Year Pattern Weightage
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={configuration.previousYearWeightage}
                      onChange={(e) =>
                        setConfiguration((prev) => ({
                          ...prev,
                          previousYearWeightage: parseInt(e.target.value),
                        }))
                      }
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-gray-800 font-medium min-w-[3rem]">
                      {configuration.previousYearWeightage}%
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Learning Objectives
                  </label>
                  <textarea
                    placeholder="Enter learning objectives (one per line)"
                    value={configuration.learningObjectives.join('\n')}
                    onChange={(e) =>
                      setConfiguration((prev) => ({
                        ...prev,
                        learningObjectives: e.target.value.split('\n').filter((obj) => obj.trim()),
                      }))
                    }
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <TestTemplates />
          </motion.div>
        )}

        {activeTab === 'sections' && (
          <motion.div
            key="sections"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <SectionConfiguration />
          </motion.div>
        )}

        {activeTab === 'adaptive' && (
          <motion.div
            key="adaptive"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <AdaptiveFeatures />
          </motion.div>
        )}

        {activeTab === 'access' && (
          <motion.div
            key="access"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <AccessSettings />
          </motion.div>
        )}

        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <SecurityFeatures />
          </motion.div>
        )}

        {activeTab === 'collaborate' && (
          <motion.div
            key="collaborate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <Collaboration />
          </motion.div>
        )}

        {activeTab === 'data' && (
          <motion.div
            key="data"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <DataManagement />
          </motion.div>
        )}

        {activeTab === 'bank' && (
          <motion.div
            key="bank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <QuestionBank />
          </motion.div>
        )}

        {activeTab === 'distribute' && (
          <motion.div
            key="distribute"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <Distribution />
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <Analytics />
          </motion.div>
        )}

        {activeTab === 'ui' && (
          <motion.div
            key="ui"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <UICustomization />
          </motion.div>
        )}

        {activeTab === 'lifecycle' && (
          <motion.div
            key="lifecycle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <Lifecycle />
          </motion.div>
        )}

        {activeTab === 'generate' && (
          <motion.div
            key="generate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-center space-y-8"
          >
            <div className="bg-white rounded-xl p-8 border">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="p-4 bg-indigo-500 rounded-full">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">Ready to Generate Test</h3>
                  <p className="text-gray-800 font-medium">
                    AI will analyze your configuration and generate an optimized test using advanced
                    algorithms
                  </p>
                </div>

                {/* Generation Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[
                    { icon: Target, label: 'Auto Topic Selection', color: 'text-blue-600' },
                    { icon: BarChart3, label: 'Difficulty Balance', color: 'text-green-600' },
                    { icon: Shield, label: 'Duplicate Detection', color: 'text-red-600' },
                    { icon: Shuffle, label: 'Diversity Assurance', color: 'text-purple-600' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg"
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                      <span className="font-semibold text-center text-gray-900">{label}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={handleGenerateTest}
                  disabled={isGenerating}
                  whileHover={isGenerating ? {} : { scale: 1.05 }}
                  whileTap={isGenerating ? {} : { scale: 0.98 }}
                  className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating Test...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Generate Test
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'review' && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            style={{ pointerEvents: 'all' }}
          >
            <TestReview />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AITestGeneration
