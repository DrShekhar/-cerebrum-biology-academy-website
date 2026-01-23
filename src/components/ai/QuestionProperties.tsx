'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Tag,
  Clock,
  Target,
  Brain,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Star,
  Award,
  TrendingUp,
  CheckCircle,
  Info,
  Plus,
  Minus,
  X,
  Save
} from 'lucide-react'

// Comprehensive question metadata interface
export interface QuestionProperties {
  // Basic Properties
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string

  // Advanced Properties
  bloomsTaxonomy: {
    level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create'
    description: string
  }

  learningObjectives: string[]
  estimatedTime: number // in minutes
  markAllocation: number

  // Educational Content
  solution: {
    explanation: string
    steps: string[]
    keyPoints: string[]
  }

  hints: {
    progressive: string[]
    conceptualClues: string[]
  }

  commonMistakes: {
    mistake: string
    reason: string
    correction: string
  }[]

  // Metadata
  tags: string[]
  neetAlignment: {
    chapter: string
    syllabus: string[]
    examFrequency: 'high' | 'medium' | 'low'
  }

  // Quality Metrics
  difficulty_score: number // 1-10
  discrimination_index: number // -1 to 1
  reliability_coefficient: number // 0-1
}

interface QuestionPropertiesProps {
  questionId?: string
  initialProperties?: Partial<QuestionProperties>
  onPropertiesChange: (properties: QuestionProperties) => void
  onSave: () => void
  isEditing?: boolean
}

export function QuestionProperties({
  questionId,
  initialProperties,
  onPropertiesChange,
  onSave,
  isEditing = false
}: QuestionPropertiesProps) {
  const [properties, setProperties] = useState<QuestionProperties>({
    difficulty: 'medium',
    topic: '',
    subtopic: '',
    bloomsTaxonomy: {
      level: 'understand',
      description: ''
    },
    learningObjectives: [],
    estimatedTime: 2,
    markAllocation: 4,
    solution: {
      explanation: '',
      steps: [],
      keyPoints: []
    },
    hints: {
      progressive: [],
      conceptualClues: []
    },
    commonMistakes: [],
    tags: [],
    neetAlignment: {
      chapter: '',
      syllabus: [],
      examFrequency: 'medium'
    },
    difficulty_score: 5,
    discrimination_index: 0.5,
    reliability_coefficient: 0.8,
    ...initialProperties
  })

  const [activeTab, setActiveTab] = useState<'basic' | 'taxonomy' | 'content' | 'metadata'>('basic')
  const [hasChanges, setHasChanges] = useState(false)

  // Biology topics and subtopics
  const biologyTopics = {
    'Cell Biology': ['Cell Structure', 'Cell Division', 'Cell Organelles', 'Membrane Transport', 'Cell Cycle'],
    'Genetics': ['Mendelian Genetics', 'Molecular Genetics', 'Population Genetics', 'Gene Expression', 'Genetic Disorders'],
    'Evolution': ['Natural Selection', 'Speciation', 'Phylogeny', 'Evidence of Evolution', 'Human Evolution'],
    'Ecology': ['Ecosystems', 'Food Chains', 'Biodiversity', 'Environmental Issues', 'Conservation'],
    'Human Physiology': ['Circulatory System', 'Respiratory System', 'Nervous System', 'Digestive System', 'Reproductive System'],
    'Plant Biology': ['Photosynthesis', 'Plant Structure', 'Plant Reproduction', 'Plant Hormones', 'Plant Classification'],
    'Biotechnology': ['DNA Technology', 'Genetic Engineering', 'Bioprocesses', 'Medical Applications', 'Agricultural Applications'],
    'Biomolecules': ['Carbohydrates', 'Proteins', 'Lipids', 'Nucleic Acids', 'Enzymes']
  }

  const bloomsLevels = {
    remember: { description: 'Recall facts and basic concepts', color: 'blue', examples: ['Define', 'List', 'Name', 'State'] },
    understand: { description: 'Explain ideas or concepts', color: 'green', examples: ['Explain', 'Describe', 'Summarize', 'Interpret'] },
    apply: { description: 'Use information in new situations', color: 'purple', examples: ['Apply', 'Solve', 'Use', 'Demonstrate'] },
    analyze: { description: 'Draw connections among ideas', color: 'orange', examples: ['Analyze', 'Compare', 'Contrast', 'Examine'] },
    evaluate: { description: 'Justify a decision or course of action', color: 'red', examples: ['Evaluate', 'Judge', 'Critique', 'Assess'] },
    create: { description: 'Produce new or original work', color: 'indigo', examples: ['Create', 'Design', 'Develop', 'Construct'] }
  }

  useEffect(() => {
    onPropertiesChange(properties)
    setHasChanges(true)
  }, [properties, onPropertiesChange])

  const updateProperty = (path: string, value: any) => {
    setProperties(prev => {
      const newProps = { ...prev }
      const keys = path.split('.')
      let current = newProps as any

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newProps
    })
  }

  const addArrayItem = (path: string, item: any) => {
    setProperties(prev => {
      const newProps = { ...prev }
      const keys = path.split('.')
      let current = newProps as any

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], item]
      return newProps
    })
  }

  const removeArrayItem = (path: string, index: number) => {
    setProperties(prev => {
      const newProps = { ...prev }
      const keys = path.split('.')
      let current = newProps as any

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_: any, i: number) => i !== index)
      return newProps
    })
  }

  const handleSave = () => {
    onSave()
    setHasChanges(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'green'
      case 'medium': return 'yellow'
      case 'hard': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Question Properties</h3>
            <p className="text-sm text-gray-500">Configure educational metadata and learning parameters</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {hasChanges && (
            <div className="flex items-center space-x-2 text-orange-600 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Unsaved changes</span>
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              hasChanges
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Properties</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 p-6 pb-0">
        {[
          { id: 'basic', label: 'Basic Properties', icon: Tag },
          { id: 'taxonomy', label: 'Learning Taxonomy', icon: Brain },
          { id: 'content', label: 'Educational Content', icon: BookOpen },
          { id: 'metadata', label: 'Quality Metrics', icon: Target }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'basic' && (
            <motion.div
              key="basic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty Level</label>
                <div className="flex space-x-3">
                  {['easy', 'medium', 'hard'].map(level => {
                    const color = getDifficultyColor(level)
                    const activeClasses = color === 'green' ? 'border-green-600 bg-green-50 text-green-700' :
                      color === 'yellow' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' :
                      color === 'red' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-500 bg-gray-50 text-gray-700'

                    const dotClasses = color === 'green' ? 'bg-green-600' :
                      color === 'yellow' ? 'bg-yellow-500' :
                      color === 'red' ? 'bg-red-500' : 'bg-gray-500'

                    return (
                      <button
                        key={level}
                        onClick={() => updateProperty('difficulty', level)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          properties.difficulty === level
                            ? activeClasses
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${dotClasses}`}></div>
                        <span className="capitalize font-medium">{level}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Topic and Subtopic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                  <select
                    value={properties.topic}
                    onChange={(e) => {
                      updateProperty('topic', e.target.value)
                      updateProperty('subtopic', '') // Reset subtopic when topic changes
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Topic</option>
                    {Object.keys(biologyTopics).map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtopic</label>
                  <select
                    value={properties.subtopic}
                    onChange={(e) => updateProperty('subtopic', e.target.value)}
                    disabled={!properties.topic}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Subtopic</option>
                    {properties.topic && biologyTopics[properties.topic as keyof typeof biologyTopics]?.map(subtopic => (
                      <option key={subtopic} value={subtopic}>{subtopic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time and Marks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (minutes)</label>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="0.5"
                      max="60"
                      step="0.5"
                      value={properties.estimatedTime}
                      onChange={(e) => updateProperty('estimatedTime', parseFloat(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mark Allocation</label>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={properties.markAllocation}
                      onChange={(e) => updateProperty('markAllocation', parseInt(e.target.value))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500">marks</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {properties.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeArrayItem('tags', index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add tag (e.g., NEET, Important, Conceptual)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        addArrayItem('tags', e.currentTarget.value.trim())
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      if (input.value.trim()) {
                        addArrayItem('tags', input.value.trim())
                        input.value = ''
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'taxonomy' && (
            <motion.div
              key="taxonomy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Bloom's Taxonomy Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Bloom's Taxonomy Level</label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(bloomsLevels).map(([level, details]) => {
                    const borderClass = details.color === 'blue' ? 'border-blue-500' :
                      details.color === 'green' ? 'border-green-600' :
                      details.color === 'purple' ? 'border-purple-500' :
                      details.color === 'orange' ? 'border-orange-500' :
                      details.color === 'red' ? 'border-red-500' :
                      details.color === 'indigo' ? 'border-indigo-500' : 'border-gray-500'

                    const bgClass = details.color === 'blue' ? 'bg-blue-50' :
                      details.color === 'green' ? 'bg-green-50' :
                      details.color === 'purple' ? 'bg-purple-50' :
                      details.color === 'orange' ? 'bg-orange-50' :
                      details.color === 'red' ? 'bg-red-50' :
                      details.color === 'indigo' ? 'bg-indigo-50' : 'bg-gray-50'

                    const dotClass = details.color === 'blue' ? 'bg-blue-500' :
                      details.color === 'green' ? 'bg-green-600' :
                      details.color === 'purple' ? 'bg-purple-500' :
                      details.color === 'orange' ? 'bg-orange-500' :
                      details.color === 'red' ? 'bg-red-500' :
                      details.color === 'indigo' ? 'bg-indigo-500' : 'bg-gray-500'

                    return (
                      <button
                        key={level}
                        onClick={() => updateProperty('bloomsTaxonomy.level', level)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          properties.bloomsTaxonomy.level === level
                            ? `${borderClass} ${bgClass}`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${dotClass}`}></div>
                          <span className="font-medium capitalize">{level}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{details.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {details.examples.slice(0, 2).map((example) => (
                            <span key={example} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
                <div className="space-y-3">
                  {properties.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => {
                          const newObjectives = [...properties.learningObjectives]
                          newObjectives[index] = e.target.value
                          updateProperty('learningObjectives', newObjectives)
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Students will be able to explain the process of mitosis"
                      />
                      <button
                        onClick={() => removeArrayItem('learningObjectives', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addArrayItem('learningObjectives', '')}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Learning Objective</span>
                  </button>
                </div>
              </div>

              {/* NEET Alignment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">NEET Syllabus Alignment</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Chapter Reference</label>
                    <input
                      type="text"
                      value={properties.neetAlignment.chapter}
                      onChange={(e) => updateProperty('neetAlignment.chapter', e.target.value)}
                      placeholder="e.g., Chapter 8: Cell - The Unit of Life"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Exam Frequency</label>
                    <select
                      value={properties.neetAlignment.examFrequency}
                      onChange={(e) => updateProperty('neetAlignment.examFrequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High (Every year)</option>
                      <option value="medium">Medium (Often asked)</option>
                      <option value="low">Low (Rarely asked)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Solution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Solution Explanation</label>
                <textarea
                  value={properties.solution.explanation}
                  onChange={(e) => updateProperty('solution.explanation', e.target.value)}
                  placeholder="Provide a detailed explanation of the correct answer..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Solution Steps */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Solution Steps</label>
                <div className="space-y-2">
                  {properties.solution.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-sm text-gray-500 w-8 mt-2">Step {index + 1}:</span>
                      <textarea
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...properties.solution.steps]
                          newSteps[index] = e.target.value
                          updateProperty('solution.steps', newSteps)
                        }}
                        placeholder="Describe this solution step..."
                        rows={2}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeArrayItem('solution.steps', index)}
                        className="text-red-500 hover:text-red-700 mt-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addArrayItem('solution.steps', '')}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Solution Step</span>
                  </button>
                </div>
              </div>

              {/* Progressive Hints */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progressive Hints</label>
                <div className="space-y-2">
                  {properties.hints.progressive.map((hint, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-sm text-gray-500 w-12">Hint {index + 1}:</span>
                      <input
                        type="text"
                        value={hint}
                        onChange={(e) => {
                          const newHints = [...properties.hints.progressive]
                          newHints[index] = e.target.value
                          updateProperty('hints.progressive', newHints)
                        }}
                        placeholder="Provide a hint that guides students to the answer..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => removeArrayItem('hints.progressive', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addArrayItem('hints.progressive', '')}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Progressive Hint</span>
                  </button>
                </div>
              </div>

              {/* Common Mistakes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Mistakes & Misconceptions</label>
                <div className="space-y-4">
                  {properties.commonMistakes.map((mistake, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="font-medium text-red-800">Mistake {index + 1}</span>
                        </div>
                        <button
                          onClick={() => removeArrayItem('commonMistakes', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-red-700 mb-1">Common Mistake</label>
                          <input
                            type="text"
                            value={mistake.mistake}
                            onChange={(e) => {
                              const newMistakes = [...properties.commonMistakes]
                              newMistakes[index] = { ...newMistakes[index], mistake: e.target.value }
                              updateProperty('commonMistakes', newMistakes)
                            }}
                            placeholder="Describe the common mistake students make..."
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-red-700 mb-1">Reason for Mistake</label>
                          <input
                            type="text"
                            value={mistake.reason}
                            onChange={(e) => {
                              const newMistakes = [...properties.commonMistakes]
                              newMistakes[index] = { ...newMistakes[index], reason: e.target.value }
                              updateProperty('commonMistakes', newMistakes)
                            }}
                            placeholder="Why do students make this mistake?"
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs text-red-700 mb-1">Correction</label>
                          <input
                            type="text"
                            value={mistake.correction}
                            onChange={(e) => {
                              const newMistakes = [...properties.commonMistakes]
                              newMistakes[index] = { ...newMistakes[index], correction: e.target.value }
                              updateProperty('commonMistakes', newMistakes)
                            }}
                            placeholder="How to correct this misconception?"
                            className="w-full px-3 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addArrayItem('commonMistakes', { mistake: '', reason: '', correction: '' })}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Common Mistake</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'metadata' && (
            <motion.div
              key="metadata"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quality Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Score</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="0.1"
                      value={properties.difficulty_score}
                      onChange={(e) => updateProperty('difficulty_score', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 (Very Easy)</span>
                      <span className="font-medium">{properties.difficulty_score.toFixed(1)}</span>
                      <span>10 (Very Hard)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discrimination Index</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="-1"
                      max="1"
                      step="0.01"
                      value={properties.discrimination_index}
                      onChange={(e) => updateProperty('discrimination_index', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>-1 (Poor)</span>
                      <span className="font-medium">{properties.discrimination_index.toFixed(2)}</span>
                      <span>1 (Excellent)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reliability Coefficient</label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={properties.reliability_coefficient}
                      onChange={(e) => updateProperty('reliability_coefficient', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0 (Unreliable)</span>
                      <span className="font-medium">{properties.reliability_coefficient.toFixed(2)}</span>
                      <span>1 (Perfect)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quality Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Difficulty</span>
                  </div>
                  <div className="text-lg font-bold text-blue-900">
                    {properties.difficulty_score <= 3 ? 'Easy' :
                     properties.difficulty_score <= 7 ? 'Medium' : 'Hard'}
                  </div>
                  <div className="text-sm text-blue-600">Score: {properties.difficulty_score.toFixed(1)}/10</div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Discrimination</span>
                  </div>
                  <div className="text-lg font-bold text-green-900">
                    {properties.discrimination_index >= 0.3 ? 'Good' :
                     properties.discrimination_index >= 0.1 ? 'Fair' : 'Poor'}
                  </div>
                  <div className="text-sm text-green-600">Index: {properties.discrimination_index.toFixed(2)}</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Reliability</span>
                  </div>
                  <div className="text-lg font-bold text-purple-900">
                    {properties.reliability_coefficient >= 0.8 ? 'Excellent' :
                     properties.reliability_coefficient >= 0.6 ? 'Good' : 'Fair'}
                  </div>
                  <div className="text-sm text-purple-600">Coefficient: {properties.reliability_coefficient.toFixed(2)}</div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Overall Quality</span>
                  </div>
                  <div className="text-lg font-bold text-orange-900">
                    {(properties.discrimination_index >= 0.3 && properties.reliability_coefficient >= 0.8) ? 'Excellent' :
                     (properties.discrimination_index >= 0.1 && properties.reliability_coefficient >= 0.6) ? 'Good' : 'Needs Improvement'}
                  </div>
                  <div className="text-sm text-orange-600">Assessment Score</div>
                </div>
              </div>

              {/* Quality Recommendations */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Quality Improvement Recommendations</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  {properties.discrimination_index < 0.3 && (
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Consider revising the question to better distinguish between high and low-performing students.</span>
                    </div>
                  )}

                  {properties.reliability_coefficient < 0.8 && (
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Add more specific details or clarify the question stem to improve consistency.</span>
                    </div>
                  )}

                  {properties.difficulty_score > 8 && (
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>This question may be too difficult. Consider providing additional context or hints.</span>
                    </div>
                  )}

                  {properties.difficulty_score < 3 && (
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>This question may be too easy. Consider adding complexity or depth.</span>
                    </div>
                  )}

                  {properties.discrimination_index >= 0.3 && properties.reliability_coefficient >= 0.8 && (
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Excellent question quality! This question effectively distinguishes student ability levels.</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}