'use client'

import React, { useState, useEffect } from 'react'
import {
  Brain,
  GitBranch,
  TrendingUp,
  SkipForward,
  AlertTriangle,
  Clock,
  Plus,
  Trash2,
  Settings,
  Play,
  RefreshCw,
  CheckCircle2,
  Route,
  BarChart3,
  Eye,
  EyeOff,
  Save,
} from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

// Types and Interfaces
interface PrerequisiteCondition {
  questionId: string
  requiredAnswer: string | number | boolean
  requiredScore?: number
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'not_equals'
}

interface BranchingRule {
  id: string
  name: string
  condition: {
    type: 'score_based' | 'answer_based' | 'time_based' | 'streak_based'
    parameter: string
    operator: 'equals' | 'greater_than' | 'less_than' | 'between'
    value: number | string | [number, number]
  }
  action: {
    type:
      | 'redirect_to_section'
      | 'skip_questions'
      | 'add_questions'
      | 'adjust_difficulty'
      | 'extend_time'
    targetSectionId?: string
    questionIds?: string[]
    difficultyAdjustment?: number
    timeExtension?: number
  }
  isActive: boolean
}

interface DifficultyAdjustment {
  id: string
  triggerCondition: {
    consecutiveCorrect?: number
    consecutiveIncorrect?: number
    overallAccuracy?: number
    timeSpent?: number
  }
  adjustment: {
    difficultyChange: 'increase' | 'decrease' | 'maintain'
    magnitude: number // 1-3 (mild, moderate, significant)
    applyToNextQuestions: number
  }
  isEnabled: boolean
}

interface SkipLogicRule {
  id: string
  name: string
  triggerQuestion: string
  triggerAnswer: string | number | boolean
  skipTargets: string[] // Question IDs to skip
  skipToQuestion?: string // Jump to specific question
  isActive: boolean
}

interface ConditionalQuestion {
  id: string
  questionId: string
  conditions: PrerequisiteCondition[]
  operator: 'AND' | 'OR' // How to combine multiple conditions
  isRequired: boolean
  fallbackAction: 'skip' | 'show_alternative' | 'end_test'
  alternativeQuestionId?: string
}

interface TimeExtensionRule {
  id: string
  name: string
  triggerCondition: {
    type: 'performance_based' | 'difficulty_based' | 'engagement_based'
    threshold: number
    metric: 'accuracy' | 'avg_time_per_question' | 'questions_remaining' | 'difficulty_level'
  }
  extension: {
    type: 'fixed' | 'percentage' | 'per_question'
    amount: number
    maxExtensions: number
    cooldownPeriod: number // minutes
  }
  isActive: boolean
}

interface AdaptiveTestConfiguration {
  isAdaptiveEnabled: boolean
  prerequisites: ConditionalQuestion[]
  branchingRules: BranchingRule[]
  difficultyAdjustments: DifficultyAdjustment[]
  skipLogicRules: SkipLogicRule[]
  timeExtensionRules: TimeExtensionRule[]
  adaptiveSettings: {
    minQuestionsBeforeAdaptation: number
    maxDifficultyJumps: number
    enableRealTimeAdjustment: boolean
    performanceWindowSize: number // Number of questions to consider for performance
    enablePerformancePrediction: boolean
  }
}

interface AdaptiveFeaturesProps {
  onConfigurationChange?: (config: AdaptiveTestConfiguration) => void
  initialConfig?: AdaptiveTestConfiguration
  availableQuestions?: { id: string; text: string; difficulty: string }[]
  availableSections?: { id: string; name: string }[]
}

const AdaptiveFeatures: React.FC<AdaptiveFeaturesProps> = ({
  onConfigurationChange,
  initialConfig,
  availableQuestions = [],
  availableSections = [],
}) => {
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState<
    'overview' | 'prerequisites' | 'branching' | 'difficulty' | 'skip' | 'conditional' | 'time'
  >('overview')
  const [configuration, setConfiguration] = useState<AdaptiveTestConfiguration>(
    initialConfig || {
      isAdaptiveEnabled: false,
      prerequisites: [],
      branchingRules: [],
      difficultyAdjustments: [
        {
          id: 'default_increase',
          triggerCondition: {
            consecutiveCorrect: 3,
            overallAccuracy: 80,
          },
          adjustment: {
            difficultyChange: 'increase',
            magnitude: 1,
            applyToNextQuestions: 5,
          },
          isEnabled: true,
        },
        {
          id: 'default_decrease',
          triggerCondition: {
            consecutiveIncorrect: 3,
            overallAccuracy: 40,
          },
          adjustment: {
            difficultyChange: 'decrease',
            magnitude: 1,
            applyToNextQuestions: 5,
          },
          isEnabled: true,
        },
      ],
      skipLogicRules: [],
      timeExtensionRules: [
        {
          id: 'performance_extension',
          name: 'Performance-Based Extension',
          triggerCondition: {
            type: 'performance_based',
            threshold: 70,
            metric: 'accuracy',
          },
          extension: {
            type: 'percentage',
            amount: 20,
            maxExtensions: 2,
            cooldownPeriod: 10,
          },
          isActive: true,
        },
      ],
      adaptiveSettings: {
        minQuestionsBeforeAdaptation: 5,
        maxDifficultyJumps: 2,
        enableRealTimeAdjustment: true,
        performanceWindowSize: 10,
        enablePerformancePrediction: true,
      },
    }
  )
  const [previewMode, setPreviewMode] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)

  // Update parent component when configuration changes
  useEffect(() => {
    if (onConfigurationChange) {
      onConfigurationChange(configuration)
    }
  }, [configuration, onConfigurationChange])

  // Mock data for demonstration
  const mockQuestions =
    availableQuestions.length > 0
      ? availableQuestions
      : [
          { id: 'q1', text: 'What is photosynthesis?', difficulty: 'easy' },
          { id: 'q2', text: 'Explain cellular respiration process', difficulty: 'medium' },
          { id: 'q3', text: 'Describe the structure of DNA', difficulty: 'medium' },
          { id: 'q4', text: 'Analyze the Calvin cycle mechanism', difficulty: 'hard' },
          { id: 'q5', text: 'Compare mitosis and meiosis', difficulty: 'medium' },
        ]

  const mockSections =
    availableSections.length > 0
      ? availableSections
      : [
          { id: 'section1', name: 'Cell Biology' },
          { id: 'section2', name: 'Genetics' },
          { id: 'section3', name: 'Ecology' },
        ]

  // Helper Functions
  const addPrerequisiteQuestion = () => {
    const newPrerequisite: ConditionalQuestion = {
      id: `prereq_${Date.now()}`,
      questionId: '',
      conditions: [
        {
          questionId: '',
          requiredAnswer: '',
          operator: 'equals',
        },
      ],
      operator: 'AND',
      isRequired: true,
      fallbackAction: 'skip',
    }

    setConfiguration((prev) => ({
      ...prev,
      prerequisites: [...prev.prerequisites, newPrerequisite],
    }))
  }

  const addBranchingRule = () => {
    const newRule: BranchingRule = {
      id: `branch_${Date.now()}`,
      name: 'New Branching Rule',
      condition: {
        type: 'score_based',
        parameter: 'accuracy',
        operator: 'greater_than',
        value: 70,
      },
      action: {
        type: 'adjust_difficulty',
        difficultyAdjustment: 1,
      },
      isActive: true,
    }

    setConfiguration((prev) => ({
      ...prev,
      branchingRules: [...prev.branchingRules, newRule],
    }))
  }

  const addSkipLogicRule = () => {
    const newRule: SkipLogicRule = {
      id: `skip_${Date.now()}`,
      name: 'New Skip Rule',
      triggerQuestion: '',
      triggerAnswer: '',
      skipTargets: [],
      isActive: true,
    }

    setConfiguration((prev) => ({
      ...prev,
      skipLogicRules: [...prev.skipLogicRules, newRule],
    }))
  }

  const addTimeExtensionRule = () => {
    const newRule: TimeExtensionRule = {
      id: `time_${Date.now()}`,
      name: 'New Time Extension',
      triggerCondition: {
        type: 'performance_based',
        threshold: 60,
        metric: 'accuracy',
      },
      extension: {
        type: 'fixed',
        amount: 10,
        maxExtensions: 1,
        cooldownPeriod: 15,
      },
      isActive: true,
    }

    setConfiguration((prev) => ({
      ...prev,
      timeExtensionRules: [...prev.timeExtensionRules, newRule],
    }))
  }

  const simulateAdaptiveTest = () => {
    setIsSimulating(true)
    // Simulate adaptive test flow
    setTimeout(() => {
      setIsSimulating(false)
      showToast(
        'success',
        'Adaptive Test Simulation Complete',
        '15 questions adapted based on performance, 2 difficulty adjustments made, 1 time extension granted, 3 questions skipped via logic rules. Final accuracy: 78%, Adaptive score: 85/100'
      )
    }, 3000)
  }

  const deleteRule = (type: keyof AdaptiveTestConfiguration, id: string) => {
    setConfiguration((prev) => ({
      ...prev,
      [type]: (prev[type] as any[]).filter((item: any) => item.id !== id),
    }))
  }

  const updateRule = (type: keyof AdaptiveTestConfiguration, id: string, updates: any) => {
    setConfiguration((prev) => ({
      ...prev,
      [type]: (prev[type] as any[]).map((item: any) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }))
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div
          className="flex items-center justify-center gap-3 animate-fadeInUp"
        >
          <div className="p-3 bg-indigo-500 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-indigo-500 bg-clip-text text-transparent">
            Adaptive Features
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure intelligent test adaptation with prerequisite questions, branching logic,
          performance-based difficulty adjustment, and conditional questioning
        </p>
      </div>

      {/* Master Toggle */}
      <div className="bg-white rounded-xl p-6 border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Adaptive Testing</h3>
            <p className="text-gray-600">Enable AI-powered adaptive test behavior</p>
          </div>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={configuration.isAdaptiveEnabled}
              onChange={(e) =>
                setConfiguration((prev) => ({
                  ...prev,
                  isAdaptiveEnabled: e.target.checked,
                }))
              }
              className="w-5 h-5 rounded"
            />
            <span className="font-medium">
              {configuration.isAdaptiveEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>

      {configuration.isAdaptiveEnabled && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                label: 'Prerequisites',
                value: configuration.prerequisites.length,
                icon: CheckCircle2,
                color: 'bg-green-600',
              },
              {
                label: 'Branching Rules',
                value: configuration.branchingRules.filter((r) => r.isActive).length,
                icon: GitBranch,
                color: 'from-blue-500 to-blue-500',
              },
              {
                label: 'Difficulty Rules',
                value: configuration.difficultyAdjustments.filter((r) => r.isEnabled).length,
                icon: TrendingUp,
                color: 'from-purple-500 to-indigo-500',
              },
              {
                label: 'Skip Rules',
                value: configuration.skipLogicRules.filter((r) => r.isActive).length,
                icon: SkipForward,
                color: 'bg-orange-600',
              },
              {
                label: 'Time Extensions',
                value: configuration.timeExtensionRules.filter((r) => r.isActive).length,
                icon: Clock,
                color: 'bg-green-600',
              },
              {
                label: 'Adaptive Features',
                value: Object.values(configuration.adaptiveSettings).filter(Boolean).length,
                icon: Brain,
                color: 'from-indigo-500 to-purple-500',
              },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`bg-gradient-to-r ${item.color} rounded-xl p-4 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-xs">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                  <item.icon className="w-6 h-6 text-white/80" />
                </div>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl p-1 border">
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'prerequisites', label: 'Prerequisites', icon: CheckCircle2 },
                { id: 'branching', label: 'Branching', icon: GitBranch },
                { id: 'difficulty', label: 'Difficulty', icon: TrendingUp },
                { id: 'skip', label: 'Skip Logic', icon: SkipForward },
                { id: 'conditional', label: 'Conditional', icon: AlertTriangle },
                { id: 'time', label: 'Time Rules', icon: Clock },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
{activeTab === 'overview' && (
              <div
                key="overview"
                className="space-y-6 animate-fadeInUp"
              >
                {/* Adaptive Settings */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Adaptive Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Min Questions Before Adaptation
                        </label>
                        <input
                          type="number"
                          value={configuration.adaptiveSettings.minQuestionsBeforeAdaptation}
                          onChange={(e) =>
                            setConfiguration((prev) => ({
                              ...prev,
                              adaptiveSettings: {
                                ...prev.adaptiveSettings,
                                minQuestionsBeforeAdaptation: parseInt(e.target.value) || 0,
                              },
                            }))
                          }
                          min="1"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Difficulty Jumps
                        </label>
                        <input
                          type="number"
                          value={configuration.adaptiveSettings.maxDifficultyJumps}
                          onChange={(e) =>
                            setConfiguration((prev) => ({
                              ...prev,
                              adaptiveSettings: {
                                ...prev.adaptiveSettings,
                                maxDifficultyJumps: parseInt(e.target.value) || 0,
                              },
                            }))
                          }
                          min="1"
                          max="5"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Performance Window Size
                        </label>
                        <input
                          type="number"
                          value={configuration.adaptiveSettings.performanceWindowSize}
                          onChange={(e) =>
                            setConfiguration((prev) => ({
                              ...prev,
                              adaptiveSettings: {
                                ...prev.adaptiveSettings,
                                performanceWindowSize: parseInt(e.target.value) || 0,
                              },
                            }))
                          }
                          min="3"
                          max="20"
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={configuration.adaptiveSettings.enableRealTimeAdjustment}
                          onChange={(e) =>
                            setConfiguration((prev) => ({
                              ...prev,
                              adaptiveSettings: {
                                ...prev.adaptiveSettings,
                                enableRealTimeAdjustment: e.target.checked,
                              },
                            }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm font-medium">Enable Real-Time Adjustment</span>
                      </label>

                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={configuration.adaptiveSettings.enablePerformancePrediction}
                          onChange={(e) =>
                            setConfiguration((prev) => ({
                              ...prev,
                              adaptiveSettings: {
                                ...prev.adaptiveSettings,
                                enablePerformancePrediction: e.target.checked,
                              },
                            }))
                          }
                          className="rounded"
                        />
                        <span className="text-sm font-medium">Enable Performance Prediction</span>
                      </label>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-800 mb-2">AI Adaptation Engine</h4>
                        <p className="text-sm text-blue-700">
                          The adaptive engine analyzes performance patterns in real-time to optimize
                          question selection, difficulty progression, and time allocation for
                          maximum learning effectiveness.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Simulation */}
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-600" />
                    Adaptive Test Simulation
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 mb-2">
                        Test your adaptive configuration with a simulated test run
                      </p>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>• Prerequisite flow</span>
                        <span>• Branching decisions</span>
                        <span>• Difficulty adjustments</span>
                        <span>• Time extensions</span>
                      </div>
                    </div>
                    <button
                      onClick={simulateAdaptiveTest}
                      disabled={isSimulating}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Simulating...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Run Simulation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'prerequisites' && (
              <div
                key="prerequisites"
                className="space-y-6 animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Prerequisite Questions
                    </h3>
                    <button
                      onClick={addPrerequisiteQuestion}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Prerequisite
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configuration.prerequisites.map((prereq, index) => (
                      <div key={prereq.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Prerequisite {index + 1}</h4>
                          <button
                            onClick={() => deleteRule('prerequisites', prereq.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Question
                            </label>
                            <select
                              value={prereq.questionId}
                              onChange={(e) =>
                                updateRule('prerequisites', prereq.id, {
                                  questionId: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            >
                              <option value="">Select Question</option>
                              {mockQuestions.map((q) => (
                                <option key={q.id} value={q.id}>
                                  {q.text}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Fallback Action
                            </label>
                            <select
                              value={prereq.fallbackAction}
                              onChange={(e) =>
                                updateRule('prerequisites', prereq.id, {
                                  fallbackAction: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            >
                              <option value="skip">Skip Question</option>
                              <option value="show_alternative">Show Alternative</option>
                              <option value="end_test">End Test</option>
                            </select>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center gap-3 mb-3">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={prereq.isRequired}
                                onChange={(e) =>
                                  updateRule('prerequisites', prereq.id, {
                                    isRequired: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-sm">Required</span>
                            </label>

                            <select
                              value={prereq.operator}
                              onChange={(e) =>
                                updateRule('prerequisites', prereq.id, {
                                  operator: e.target.value,
                                })
                              }
                              className="px-3 py-1 border rounded text-sm"
                            >
                              <option value="AND">AND</option>
                              <option value="OR">OR</option>
                            </select>
                          </div>

                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                            <strong>Conditions:</strong> This question will be shown only if the
                            prerequisite conditions are met. Use AND/OR logic to combine multiple
                            conditions.
                          </div>
                        </div>
                      </div>
                    ))}

                    {configuration.prerequisites.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No prerequisite questions configured</p>
                        <button
                          onClick={addPrerequisiteQuestion}
                          className="mt-3 text-green-600 hover:text-green-700 font-medium"
                        >
                          Add the first prerequisite
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'branching' && (
              <div
                key="branching"
                className="space-y-6 animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-blue-600" />
                      Branching Logic
                    </h3>
                    <button
                      onClick={addBranchingRule}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Rule
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configuration.branchingRules.map((rule, index) => (
                      <div key={rule.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{rule.name}</h4>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={rule.isActive}
                                onChange={(e) =>
                                  updateRule('branchingRules', rule.id, {
                                    isActive: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-sm">Active</span>
                            </label>
                          </div>
                          <button
                            onClick={() => deleteRule('branchingRules', rule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rule Name
                            </label>
                            <input
                              type="text"
                              value={rule.name}
                              onChange={(e) =>
                                updateRule('branchingRules', rule.id, {
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Condition Type
                            </label>
                            <select
                              value={rule.condition.type}
                              onChange={(e) =>
                                updateRule('branchingRules', rule.id, {
                                  condition: { ...rule.condition, type: e.target.value },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="score_based">Score Based</option>
                              <option value="answer_based">Answer Based</option>
                              <option value="time_based">Time Based</option>
                              <option value="streak_based">Streak Based</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Action Type
                            </label>
                            <select
                              value={rule.action.type}
                              onChange={(e) =>
                                updateRule('branchingRules', rule.id, {
                                  action: { ...rule.action, type: e.target.value },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="redirect_to_section">Redirect to Section</option>
                              <option value="skip_questions">Skip Questions</option>
                              <option value="add_questions">Add Questions</option>
                              <option value="adjust_difficulty">Adjust Difficulty</option>
                              <option value="extend_time">Extend Time</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Threshold Value
                            </label>
                            <input
                              type="number"
                              value={
                                typeof rule.condition.value === 'number' ? rule.condition.value : 0
                              }
                              onChange={(e) =>
                                updateRule('branchingRules', rule.id, {
                                  condition: {
                                    ...rule.condition,
                                    value: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 text-blue-800 text-sm">
                            <Route className="w-4 h-4" />
                            <strong>Branching Flow:</strong>
                            <span>
                              If {rule.condition.type.replace('_', ' ')} {rule.condition.operator}{' '}
                              {rule.condition.value}, then {rule.action.type.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {configuration.branchingRules.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <GitBranch className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No branching rules configured</p>
                        <button
                          onClick={addBranchingRule}
                          className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Add the first branching rule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'difficulty' && (
              <div
                key="difficulty"
                className="space-y-6 animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 border">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Difficulty Adjustment Based on Performance
                  </h3>

                  <div className="space-y-4">
                    {configuration.difficultyAdjustments.map((adjustment, index) => (
                      <div key={adjustment.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium capitalize">
                              {adjustment.adjustment.difficultyChange} Difficulty
                            </h4>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={adjustment.isEnabled}
                                onChange={(e) =>
                                  updateRule('difficultyAdjustments', adjustment.id, {
                                    isEnabled: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-sm">Enabled</span>
                            </label>
                          </div>
                          <button
                            onClick={() => deleteRule('difficultyAdjustments', adjustment.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Consecutive Correct
                            </label>
                            <input
                              type="number"
                              value={adjustment.triggerCondition.consecutiveCorrect || ''}
                              onChange={(e) =>
                                updateRule('difficultyAdjustments', adjustment.id, {
                                  triggerCondition: {
                                    ...adjustment.triggerCondition,
                                    consecutiveCorrect: parseInt(e.target.value) || undefined,
                                  },
                                })
                              }
                              placeholder="e.g., 3"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Overall Accuracy (%)
                            </label>
                            <input
                              type="number"
                              value={adjustment.triggerCondition.overallAccuracy || ''}
                              onChange={(e) =>
                                updateRule('difficultyAdjustments', adjustment.id, {
                                  triggerCondition: {
                                    ...adjustment.triggerCondition,
                                    overallAccuracy: parseInt(e.target.value) || undefined,
                                  },
                                })
                              }
                              placeholder="e.g., 80"
                              min="0"
                              max="100"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Apply to Next Questions
                            </label>
                            <input
                              type="number"
                              value={adjustment.adjustment.applyToNextQuestions}
                              onChange={(e) =>
                                updateRule('difficultyAdjustments', adjustment.id, {
                                  adjustment: {
                                    ...adjustment.adjustment,
                                    applyToNextQuestions: parseInt(e.target.value) || 1,
                                  },
                                })
                              }
                              min="1"
                              max="20"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Adjustment Magnitude
                            </label>
                            <select
                              value={adjustment.adjustment.magnitude}
                              onChange={(e) =>
                                updateRule('difficultyAdjustments', adjustment.id, {
                                  adjustment: {
                                    ...adjustment.adjustment,
                                    magnitude: parseInt(e.target.value) || 1,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                              <option value={1}>Mild (1 level)</option>
                              <option value={2}>Moderate (2 levels)</option>
                              <option value={3}>Significant (3 levels)</option>
                            </select>
                          </div>

                          <div className="flex items-end">
                            <div className="w-full p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <div className="flex items-center gap-2 text-purple-800 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                <span>
                                  {adjustment.adjustment.difficultyChange === 'increase'
                                    ? '↗️'
                                    : '↘️'}
                                  {adjustment.adjustment.difficultyChange} difficulty by{' '}
                                  {adjustment.adjustment.magnitude} level(s) for next{' '}
                                  {adjustment.adjustment.applyToNextQuestions} questions
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skip' && (
              <div
                key="skip"
                className="space-y-6 animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <SkipForward className="w-5 h-5 text-orange-600" />
                      Skip Logic
                    </h3>
                    <button
                      onClick={addSkipLogicRule}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Skip Rule
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configuration.skipLogicRules.map((rule, index) => (
                      <div key={rule.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{rule.name}</h4>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={rule.isActive}
                                onChange={(e) =>
                                  updateRule('skipLogicRules', rule.id, {
                                    isActive: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-sm">Active</span>
                            </label>
                          </div>
                          <button
                            onClick={() => deleteRule('skipLogicRules', rule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rule Name
                            </label>
                            <input
                              type="text"
                              value={rule.name}
                              onChange={(e) =>
                                updateRule('skipLogicRules', rule.id, {
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Trigger Question
                            </label>
                            <select
                              value={rule.triggerQuestion}
                              onChange={(e) =>
                                updateRule('skipLogicRules', rule.id, {
                                  triggerQuestion: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="">Select Question</option>
                              {mockQuestions.map((q) => (
                                <option key={q.id} value={q.id}>
                                  {q.text}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Trigger Answer
                            </label>
                            <input
                              type="text"
                              value={String(rule.triggerAnswer)}
                              onChange={(e) =>
                                updateRule('skipLogicRules', rule.id, {
                                  triggerAnswer: e.target.value,
                                })
                              }
                              placeholder="Expected answer value"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Jump to Question (Optional)
                            </label>
                            <select
                              value={rule.skipToQuestion || ''}
                              onChange={(e) =>
                                updateRule('skipLogicRules', rule.id, {
                                  skipToQuestion: e.target.value || undefined,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            >
                              <option value="">Skip normally</option>
                              {mockQuestions.map((q) => (
                                <option key={q.id} value={q.id}>
                                  {q.text}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center gap-2 text-orange-800 text-sm">
                            <SkipForward className="w-4 h-4" />
                            <span>
                              When question answers "{rule.triggerAnswer}",
                              {rule.skipToQuestion
                                ? ` jump to specific question`
                                : ` skip ${rule.skipTargets.length} question(s)`}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {configuration.skipLogicRules.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <SkipForward className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No skip logic rules configured</p>
                        <button
                          onClick={addSkipLogicRule}
                          className="mt-3 text-orange-600 hover:text-orange-700 font-medium"
                        >
                          Add the first skip rule
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'time' && (
              <div
                key="time"
                className="space-y-6 animate-fadeInUp"
              >
                <div className="bg-white rounded-xl p-6 border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-600" />
                      Performance-Based Time Extension
                    </h3>
                    <button
                      onClick={addTimeExtensionRule}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Time Rule
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configuration.timeExtensionRules.map((rule, index) => (
                      <div key={rule.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{rule.name}</h4>
                            <label className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={rule.isActive}
                                onChange={(e) =>
                                  updateRule('timeExtensionRules', rule.id, {
                                    isActive: e.target.checked,
                                  })
                                }
                                className="rounded"
                              />
                              <span className="text-sm">Active</span>
                            </label>
                          </div>
                          <button
                            onClick={() => deleteRule('timeExtensionRules', rule.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Rule Name
                            </label>
                            <input
                              type="text"
                              value={rule.name}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Trigger Metric
                            </label>
                            <select
                              value={rule.triggerCondition.metric}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  triggerCondition: {
                                    ...rule.triggerCondition,
                                    metric: e.target.value as any,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            >
                              <option value="accuracy">Accuracy</option>
                              <option value="avg_time_per_question">Avg Time per Question</option>
                              <option value="questions_remaining">Questions Remaining</option>
                              <option value="difficulty_level">Difficulty Level</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Threshold
                            </label>
                            <input
                              type="number"
                              value={rule.triggerCondition.threshold}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  triggerCondition: {
                                    ...rule.triggerCondition,
                                    threshold: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Extension Type
                            </label>
                            <select
                              value={rule.extension.type}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  extension: {
                                    ...rule.extension,
                                    type: e.target.value as any,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            >
                              <option value="fixed">Fixed Time (minutes)</option>
                              <option value="percentage">Percentage of Original</option>
                              <option value="per_question">Time per Question</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Extension Amount
                            </label>
                            <input
                              type="number"
                              value={rule.extension.amount}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  extension: {
                                    ...rule.extension,
                                    amount: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Max Extensions
                            </label>
                            <input
                              type="number"
                              value={rule.extension.maxExtensions}
                              onChange={(e) =>
                                updateRule('timeExtensionRules', rule.id, {
                                  extension: {
                                    ...rule.extension,
                                    maxExtensions: parseInt(e.target.value) || 1,
                                  },
                                })
                              }
                              min="1"
                              max="5"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 text-green-800 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>
                              When {rule.triggerCondition.metric} ≥{' '}
                              {rule.triggerCondition.threshold}%, extend time by{' '}
                              {rule.extension.amount}
                              {rule.extension.type === 'fixed'
                                ? 'minutes'
                                : rule.extension.type === 'percentage'
                                  ? '% of original time'
                                  : 'minutes per question'}
                              (max {rule.extension.maxExtensions} times)
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
{/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t bg-white rounded-xl p-6">
            <div className="text-sm text-gray-600">
              Adaptive features configured:{' '}
              {Object.values(configuration)
                .filter(Array.isArray)
                .reduce((sum, arr) => sum + arr.length, 0)}{' '}
              rules
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {previewMode ? 'Hide Preview' : 'Preview'}
              </button>

              <button
                onClick={() =>
                  showToast(
                    'success',
                    'Configuration Exported',
                    'Adaptive configuration exported successfully!'
                  )
                }
                className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Export Config
              </button>

              <button
                onClick={() =>
                  showToast(
                    'success',
                    'Configuration Applied',
                    'Adaptive features configuration applied successfully!'
                  )
                }
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Apply Configuration
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdaptiveFeatures
