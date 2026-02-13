'use client'

import React, { useState, useEffect } from 'react'
import {
  Plus,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle2,
  Shuffle,
  Target,
  Settings,
  Copy,
  Save,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Unlock,
  Calculator,
  Timer,
  Award,
} from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

// Types and Interfaces
interface SectionMarkingScheme {
  correct: number
  incorrect: number
  unattempted: number
  partialMarking: boolean
  partialPercentage: number
}

interface QuestionDistribution {
  mcq: number
  assertion: number
  numerical: number
  matching: number
  subjective: number
}

interface TestSection {
  id: string
  name: string
  description: string
  instructions: string[]
  timeLimit: number
  isMandatory: boolean
  isShufflingEnabled: boolean
  questionCount: number
  totalMarks: number
  markingScheme: SectionMarkingScheme
  questionDistribution: QuestionDistribution
  topics: string[]
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  order: number
  isVisible: boolean
  allowReview: boolean
  allowBackNavigation: boolean
  showTimer: boolean
  warningTime: number
  passingMarks?: number
  qualifyingMarks?: number
}

interface SectionConfigurationProps {
  onSectionsChange?: (sections: TestSection[]) => void
  initialSections?: TestSection[]
  maxSections?: number
}

const SectionConfiguration: React.FC<SectionConfigurationProps> = ({
  onSectionsChange,
  initialSections = [],
  maxSections = 10,
}) => {
  const { showToast } = useToast()
  const [sections, setSections] = useState<TestSection[]>(
    initialSections.length > 0
      ? initialSections
      : [
          {
            id: 'section_1',
            name: 'Biology Section A',
            description: 'Fundamental Biology Concepts',
            instructions: [
              'This section contains 20 multiple choice questions',
              'Each question carries 4 marks',
              'There is negative marking of -1 for incorrect answers',
              'You have 30 minutes to complete this section',
            ],
            timeLimit: 30,
            isMandatory: true,
            isShufflingEnabled: true,
            questionCount: 20,
            totalMarks: 80,
            markingScheme: {
              correct: 4,
              incorrect: -1,
              unattempted: 0,
              partialMarking: false,
              partialPercentage: 50,
            },
            questionDistribution: {
              mcq: 80,
              assertion: 15,
              numerical: 5,
              matching: 0,
              subjective: 0,
            },
            topics: ['Cell Biology', 'Genetics'],
            difficultyDistribution: {
              easy: 30,
              medium: 50,
              hard: 20,
            },
            order: 1,
            isVisible: true,
            allowReview: true,
            allowBackNavigation: true,
            showTimer: true,
            warningTime: 5,
            passingMarks: 32,
            qualifyingMarks: 48,
          },
        ]
  )

  const [activeSection, setActiveSection] = useState<string>('')
  const [isCreating, setIsCreating] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  const availableTopics = [
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
  ]

  // Update parent component when sections change
  useEffect(() => {
    if (onSectionsChange) {
      onSectionsChange(sections)
    }
  }, [sections, onSectionsChange])

  // Create new section
  const createSection = () => {
    const newSection: TestSection = {
      id: `section_${Date.now()}`,
      name: `Section ${sections.length + 1}`,
      description: '',
      instructions: ['Complete all questions in this section'],
      timeLimit: 30,
      isMandatory: true,
      isShufflingEnabled: false,
      questionCount: 10,
      totalMarks: 40,
      markingScheme: {
        correct: 4,
        incorrect: -1,
        unattempted: 0,
        partialMarking: false,
        partialPercentage: 50,
      },
      questionDistribution: {
        mcq: 100,
        assertion: 0,
        numerical: 0,
        matching: 0,
        subjective: 0,
      },
      topics: [],
      difficultyDistribution: {
        easy: 40,
        medium: 40,
        hard: 20,
      },
      order: sections.length + 1,
      isVisible: true,
      allowReview: true,
      allowBackNavigation: true,
      showTimer: true,
      warningTime: 5,
    }

    setSections((prev) => [...prev, newSection])
    setActiveSection(newSection.id)
    setIsCreating(true)
  }

  // Delete section
  const deleteSection = (sectionId: string) => {
    if (sections.length <= 1) {
      showToast('warning', 'Cannot Delete Section', 'At least one section is required')
      return
    }

    setSections((prev) => prev.filter((s) => s.id !== sectionId))
    setActiveSection('')
  }

  // Update section
  const updateSection = (sectionId: string, updates: Partial<TestSection>) => {
    setSections((prev) =>
      prev.map((section) => (section.id === sectionId ? { ...section, ...updates } : section))
    )
  }

  // Duplicate section
  const duplicateSection = (sectionId: string) => {
    const sectionToDuplicate = sections.find((s) => s.id === sectionId)
    if (!sectionToDuplicate) return

    const newSection: TestSection = {
      ...sectionToDuplicate,
      id: `section_${Date.now()}`,
      name: `${sectionToDuplicate.name} (Copy)`,
      order: sections.length + 1,
    }

    setSections((prev) => [...prev, newSection])
  }

  // Move section up/down
  const moveSectionOrder = (sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId)
    if (sectionIndex === -1) return

    const newSections = [...sections]
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1

    if (targetIndex < 0 || targetIndex >= sections.length) return // Swap sections
    ;[newSections[sectionIndex], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[sectionIndex],
    ]

    // Update order numbers
    newSections.forEach((section, index) => {
      section.order = index + 1
    })

    setSections(newSections)
  }

  // Calculate totals
  const calculateTotals = () => {
    return sections.reduce(
      (totals, section) => ({
        totalQuestions: totals.totalQuestions + section.questionCount,
        totalMarks: totals.totalMarks + section.totalMarks,
        totalTime: totals.totalTime + section.timeLimit,
        mandatorySections: totals.mandatorySections + (section.isMandatory ? 1 : 0),
      }),
      { totalQuestions: 0, totalMarks: 0, totalTime: 0, mandatorySections: 0 }
    )
  }

  const totals = calculateTotals()

  // Validate sections
  const validateSections = () => {
    const errors: string[] = []

    if (sections.length === 0) {
      errors.push('At least one section is required')
    }

    sections.forEach((section, index) => {
      if (!section.name.trim()) {
        errors.push(`Section ${index + 1}: Name is required`)
      }
      if (section.questionCount <= 0) {
        errors.push(`Section ${index + 1}: Must have at least 1 question`)
      }
      if (section.timeLimit <= 0) {
        errors.push(`Section ${index + 1}: Time limit must be greater than 0`)
      }
      if (section.topics.length === 0) {
        errors.push(`Section ${index + 1}: At least one topic must be selected`)
      }

      const distributionTotal = Object.values(section.questionDistribution).reduce(
        (sum, val) => sum + val,
        0
      )
      if (Math.abs(distributionTotal - 100) > 0.1) {
        errors.push(`Section ${index + 1}: Question distribution must total 100%`)
      }

      const difficultyTotal = Object.values(section.difficultyDistribution).reduce(
        (sum, val) => sum + val,
        0
      )
      if (Math.abs(difficultyTotal - 100) > 0.1) {
        errors.push(`Section ${index + 1}: Difficulty distribution must total 100%`)
      }
    })

    return errors
  }

  const validationErrors = validateSections()

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className="flex items-center justify-center gap-3 animate-fadeInUp"
        >
          <div className="p-3 bg-green-600 rounded-xl">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-green-600 bg-clip-text text-transparent">
            Section Configuration
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure multiple test sections with individual time limits, marking schemes, and
          question distributions for comprehensive assessments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Sections',
            value: sections.length,
            icon: FileText,
            color: 'from-blue-500 to-blue-500',
          },
          {
            label: 'Total Questions',
            value: totals.totalQuestions,
            icon: Target,
            color: 'bg-green-600',
          },
          {
            label: 'Total Marks',
            value: totals.totalMarks,
            icon: Award,
            color: 'from-purple-500 to-indigo-500',
          },
          {
            label: 'Total Time',
            value: `${totals.totalTime} min`,
            icon: Clock,
            color: 'bg-orange-600',
          },
        ].map((item, index) => (
          <div
            key={item.label}
            className={`bg-gradient-to-r ${item.color} rounded-xl p-4 text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
              <item.icon className="w-8 h-8 text-white/80" />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={createSection}
            disabled={sections.length >= maxSections}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </button>

          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              previewMode
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
        </div>

        {validationErrors.length > 0 && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{validationErrors.length} validation errors</span>
          </div>
        )}
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeInUp"
        >
          <h4 className="font-semibold text-red-800 mb-2">Validation Errors:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sections List */}
      <div className="space-y-4">
{sections.map((section, index) => (
            <div
              key={section.id}
              className={`bg-white rounded-xl border-2 transition-all ${
                activeSection === section.id
                  ? 'border-green-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Section Header */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => setActiveSection(activeSection === section.id ? '' : section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                        #{section.order}
                      </span>
                      <h3 className="text-lg font-semibold">{section.name}</h3>
                      {!section.isMandatory && (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                          Optional
                        </span>
                      )}
                      {section.isShufflingEnabled && (
                        <Shuffle className="w-4 h-4 text-blue-500" aria-label="Shuffling Enabled" />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{section.questionCount} questions</span>
                      <span>{section.totalMarks} marks</span>
                      <span>{section.timeLimit} min</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSectionOrder(section.id, 'up')
                        }}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSectionOrder(section.id, 'down')
                        }}
                        disabled={index === sections.length - 1}
                        className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateSection(section.id)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteSection(section.id)
                        }}
                        disabled={sections.length <= 1}
                        className="p-1 hover:bg-red-100 text-red-600 rounded disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {section.description && (
                  <p className="text-gray-600 text-sm mt-2">{section.description}</p>
                )}
              </div>

              {/* Section Details */}
{activeSection === section.id && (
                  <div
                    className="overflow-hidden animate-fadeInUp"
                  >
                    <div className="border-t p-6 space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Section Name
                            </label>
                            <input
                              type="text"
                              value={section.name}
                              onChange={(e) => updateSection(section.id, { name: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description
                            </label>
                            <textarea
                              value={section.description}
                              onChange={(e) =>
                                updateSection(section.id, { description: e.target.value })
                              }
                              rows={3}
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                              placeholder="Brief description of this section"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Questions
                              </label>
                              <input
                                type="number"
                                value={section.questionCount}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    questionCount: parseInt(e.target.value) || 0,
                                    totalMarks:
                                      (parseInt(e.target.value) || 0) *
                                      section.markingScheme.correct,
                                  })
                                }
                                min="1"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Time (min)
                              </label>
                              <input
                                type="number"
                                value={section.timeLimit}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    timeLimit: parseInt(e.target.value) || 0,
                                  })
                                }
                                min="1"
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Section Configuration
                            </label>
                            <div className="space-y-3">
                              <label className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={section.isMandatory}
                                  onChange={(e) =>
                                    updateSection(section.id, { isMandatory: e.target.checked })
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm">Mandatory Section</span>
                                {section.isMandatory ? (
                                  <Lock className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Unlock className="w-4 h-4 text-green-600" />
                                )}
                              </label>

                              <label className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={section.isShufflingEnabled}
                                  onChange={(e) =>
                                    updateSection(section.id, {
                                      isShufflingEnabled: e.target.checked,
                                    })
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm">Enable Question Shuffling</span>
                                <Shuffle className="w-4 h-4 text-blue-500" />
                              </label>

                              <label className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={section.allowReview}
                                  onChange={(e) =>
                                    updateSection(section.id, { allowReview: e.target.checked })
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm">Allow Review</span>
                                <Eye className="w-4 h-4 text-gray-500" />
                              </label>

                              <label className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={section.allowBackNavigation}
                                  onChange={(e) =>
                                    updateSection(section.id, {
                                      allowBackNavigation: e.target.checked,
                                    })
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm">Allow Back Navigation</span>
                              </label>

                              <label className="flex items-center gap-3">
                                <input
                                  type="checkbox"
                                  checked={section.showTimer}
                                  onChange={(e) =>
                                    updateSection(section.id, { showTimer: e.target.checked })
                                  }
                                  className="rounded"
                                />
                                <span className="text-sm">Show Section Timer</span>
                                <Timer className="w-4 h-4 text-orange-500" />
                              </label>
                            </div>
                          </div>

                          {section.showTimer && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Warning Time (min before end)
                              </label>
                              <input
                                type="number"
                                value={section.warningTime}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    warningTime: parseInt(e.target.value) || 0,
                                  })
                                }
                                min="1"
                                max={section.timeLimit}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Instructions */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Section Instructions
                        </label>
                        <div className="space-y-2">
                          {section.instructions.map((instruction, idx) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="text"
                                value={instruction}
                                onChange={(e) => {
                                  const newInstructions = [...section.instructions]
                                  newInstructions[idx] = e.target.value
                                  updateSection(section.id, { instructions: newInstructions })
                                }}
                                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                placeholder={`Instruction ${idx + 1}`}
                              />
                              <button
                                onClick={() => {
                                  const newInstructions = section.instructions.filter(
                                    (_, i) => i !== idx
                                  )
                                  updateSection(section.id, { instructions: newInstructions })
                                }}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newInstructions = [...section.instructions, '']
                              updateSection(section.id, { instructions: newInstructions })
                            }}
                            className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1"
                          >
                            <Plus className="w-3 h-3" />
                            Add Instruction
                          </button>
                        </div>
                      </div>

                      {/* Marking Scheme */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                          <Calculator className="w-4 h-4" />
                          Marking Scheme
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Correct</label>
                            <input
                              type="number"
                              value={section.markingScheme.correct}
                              onChange={(e) => {
                                const correct = parseFloat(e.target.value) || 0
                                updateSection(section.id, {
                                  markingScheme: { ...section.markingScheme, correct },
                                  totalMarks: section.questionCount * correct,
                                })
                              }}
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Incorrect</label>
                            <input
                              type="number"
                              value={section.markingScheme.incorrect}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  markingScheme: {
                                    ...section.markingScheme,
                                    incorrect: parseFloat(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">Unattempted</label>
                            <input
                              type="number"
                              value={section.markingScheme.unattempted}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  markingScheme: {
                                    ...section.markingScheme,
                                    unattempted: parseFloat(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-xs">
                              <input
                                type="checkbox"
                                checked={section.markingScheme.partialMarking}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    markingScheme: {
                                      ...section.markingScheme,
                                      partialMarking: e.target.checked,
                                    },
                                  })
                                }
                                className="rounded text-xs"
                              />
                              Partial
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* Question Distribution */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Question Distribution
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                          {Object.entries(section.questionDistribution).map(
                            ([type, percentage]) => (
                              <div key={type}>
                                <label className="block text-xs text-gray-600 mb-1 capitalize">
                                  {type}
                                </label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={percentage}
                                    onChange={(e) =>
                                      updateSection(section.id, {
                                        questionDistribution: {
                                          ...section.questionDistribution,
                                          [type]: parseInt(e.target.value),
                                        },
                                      })
                                    }
                                    className="flex-1"
                                  />
                                  <span className="text-xs w-8">{percentage}%</span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Difficulty Distribution */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Difficulty Distribution
                        </h4>
                        <div className="grid grid-cols-3 gap-4">
                          {Object.entries(section.difficultyDistribution).map(
                            ([level, percentage]) => (
                              <div key={level}>
                                <label className="block text-xs text-gray-600 mb-1 capitalize">
                                  {level}
                                </label>
                                <div className="flex items-center gap-1">
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={percentage}
                                    onChange={(e) =>
                                      updateSection(section.id, {
                                        difficultyDistribution: {
                                          ...section.difficultyDistribution,
                                          [level]: parseInt(e.target.value),
                                        },
                                      })
                                    }
                                    className="flex-1"
                                  />
                                  <span className="text-xs w-8">{percentage}%</span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Topics */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Topics Coverage</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-32 overflow-y-auto border rounded p-3">
                          {availableTopics.map((topic) => (
                            <label key={topic} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={section.topics.includes(topic)}
                                onChange={(e) => {
                                  const topics = e.target.checked
                                    ? [...section.topics, topic]
                                    : section.topics.filter((t) => t !== topic)
                                  updateSection(section.id, { topics })
                                }}
                                className="rounded"
                              />
                              {topic}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Qualifying Marks */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Passing Marks (Optional)
                          </label>
                          <input
                            type="number"
                            value={section.passingMarks || ''}
                            onChange={(e) =>
                              updateSection(section.id, {
                                passingMarks: e.target.value ? parseInt(e.target.value) : undefined,
                              })
                            }
                            min="0"
                            max={section.totalMarks}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            placeholder="Minimum marks to pass"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Qualifying Marks (Optional)
                          </label>
                          <input
                            type="number"
                            value={section.qualifyingMarks || ''}
                            onChange={(e) =>
                              updateSection(section.id, {
                                qualifyingMarks: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            min="0"
                            max={section.totalMarks}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            placeholder="Marks to qualify for next round"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
</div>
          ))}
</div>

      {/* Preview Mode */}
      {previewMode && (
        <div
          className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 animate-fadeInUp"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Test Preview
          </h3>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg p-4 border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{section.name}</h4>
                    {section.description && (
                      <p className="text-sm text-gray-600">{section.description}</p>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>Time: {section.timeLimit} minutes</div>
                    <div>Marks: {section.totalMarks}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="font-medium">Instructions:</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {section.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-gray-500">
                  <div>
                    {section.questionCount} questions •{' '}
                    {section.isMandatory ? 'Mandatory' : 'Optional'}
                  </div>
                  <div className="flex gap-2">
                    {section.isShufflingEnabled && (
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Shuffled</span>
                    )}
                    {section.showTimer && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">Timed</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-700 mb-2">Test Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-600">Total Sections:</span>
                <span className="ml-2 font-medium">{sections.length}</span>
              </div>
              <div>
                <span className="text-green-600">Total Questions:</span>
                <span className="ml-2 font-medium">{totals.totalQuestions}</span>
              </div>
              <div>
                <span className="text-green-600">Total Marks:</span>
                <span className="ml-2 font-medium">{totals.totalMarks}</span>
              </div>
              <div>
                <span className="text-green-600">Total Time:</span>
                <span className="ml-2 font-medium">{totals.totalTime} min</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-gray-600">
          {sections.length} section{sections.length !== 1 ? 's' : ''} configured
          {validationErrors.length > 0 && (
            <span className="text-red-600 ml-2">
              • {validationErrors.length} error{validationErrors.length !== 1 ? 's' : ''} found
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              showToast(
                'success',
                'Configuration Exported',
                'This would generate a JSON configuration file with all section settings.'
              )
            }}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Export Config
          </button>

          <button
            onClick={() => {
              if (validationErrors.length === 0) {
                showToast(
                  'success',
                  'Sections Configured Successfully',
                  'This configuration would be applied to the test generation process.'
                )
              } else {
                showToast(
                  'error',
                  'Validation Errors',
                  'Please fix all validation errors before applying the configuration.'
                )
              }
            }}
            disabled={validationErrors.length > 0}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply Configuration
          </button>
        </div>
      </div>
    </div>
  )
}

export default SectionConfiguration
