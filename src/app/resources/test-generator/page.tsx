'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  BeakerIcon,
  AcademicCapIcon,
  ClockIcon,
  ChartBarIcon,
  SparklesIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

const TestGeneratorPage = () => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [curriculum, setCurriculum] = useState('NEET')
  const [grade, setGrade] = useState('CLASS_12')
  const [difficulty, setDifficulty] = useState('Medium')
  const [questionCount, setQuestionCount] = useState(20)
  const [timeLimit, setTimeLimit] = useState(30)
  const [questionTypes, setQuestionTypes] = useState(['MCQ'])
  const [isGenerating, setIsGenerating] = useState(false)

  const topics = [
    {
      id: 'cell-biology',
      name: 'Cell Biology',
      icon: '🧬',
      description: 'Cell structure, organelles, division',
    },
    { id: 'genetics', name: 'Genetics', icon: '🧪', description: 'Heredity, DNA, mutations' },
    {
      id: 'human-physiology',
      name: 'Human Physiology',
      icon: '❤️',
      description: 'Body systems, homeostasis',
    },
    {
      id: 'plant-physiology',
      name: 'Plant Physiology',
      icon: '🌱',
      description: 'Plant functions, hormones',
    },
    {
      id: 'evolution',
      name: 'Evolution',
      icon: '🦕',
      description: 'Natural selection, speciation',
    },
    { id: 'ecology', name: 'Ecology', icon: '🌍', description: 'Ecosystems, conservation' },
    {
      id: 'biotechnology',
      name: 'Biotechnology',
      icon: '🔬',
      description: 'Genetic engineering, applications',
    },
    {
      id: 'reproduction',
      name: 'Reproduction',
      icon: '👶',
      description: 'Sexual, asexual reproduction',
    },
  ]

  const curriculums = ['NEET', 'CBSE', 'ICSE', 'IB', 'IGCSE']
  const grades = ['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER']
  const difficulties = ['Easy', 'Medium', 'Hard', 'Mixed']
  const questionTypeOptions = [
    { id: 'MCQ', name: 'Multiple Choice', icon: '✅' },
    { id: 'SHORT_ANSWER', name: 'Short Answer', icon: '📝' },
    { id: 'TRUE_FALSE', name: 'True/False', icon: '✔️' },
    { id: 'DIAGRAM', name: 'Diagram Based', icon: '📊' },
  ]

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    )
  }

  const handleQuestionTypeToggle = (type: string) => {
    setQuestionTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleGenerateTest = async () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic')
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Here you would call the actual API
      const testConfig = {
        topics: selectedTopics,
        curriculum,
        grade,
        difficulty,
        questionCount,
        questionTypes,
        timeLimit,
      }

      console.log('Generating test with config:', testConfig)

      // Redirect to test interface (would be implemented)
      alert(
        `Test generated successfully! ${questionCount} questions on ${selectedTopics.length} topics.`
      )
    } catch (error) {
      console.error('Test generation failed:', error)
      alert('Failed to generate test. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <BeakerIcon className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">🤖 AI Test Generator</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Create unlimited customized Biology test papers powered by AI. Select topics,
              difficulty, and question types to generate your perfect practice test.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="md:col-span-2 space-y-8">
            {/* Basic Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                Basic Configuration
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Curriculum</label>
                  <select
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {curriculums.map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Grade/Class
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {grades.map((g) => (
                      <option key={g} value={g}>
                        {g.replace('CLASS_', 'Class ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Difficulty Level
                  </label>
                  <div className="flex gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={cn(
                          'px-4 py-2 rounded-lg font-medium transition-all',
                          difficulty === diff
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        )}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Number of Questions
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="font-bold text-lg text-blue-600 min-w-[3rem]">
                      {questionCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Selection */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">
                📚 Select Topics ({selectedTopics.length} selected)
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicToggle(topic.id)}
                    className={cn(
                      'p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md',
                      selectedTopics.includes(topic.id)
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{topic.icon}</div>
                      <div>
                        <div className="font-bold text-gray-900">{topic.name}</div>
                        <div className="text-sm text-gray-800 mt-1">{topic.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">
                📝 Question Types ({questionTypes.length} selected)
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {questionTypeOptions.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleQuestionTypeToggle(type.id)}
                    className={cn(
                      'p-4 rounded-lg border-2 cursor-pointer transition-all text-center hover:shadow-md',
                      questionTypes.includes(type.id)
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-sm text-gray-900">{type.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-orange-600" />
                Time Settings
              </h2>

              <div className="flex items-center gap-4">
                <label className="font-semibold text-gray-900">Time Limit:</label>
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="font-bold text-lg text-orange-600 min-w-[4rem]">
                  {timeLimit} min
                </span>
              </div>
            </div>
          </div>

          {/* Summary & Generate Panel */}
          <div className="space-y-6">
            {/* Test Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ChartBarIcon className="h-5 w-5 text-green-600" />
                Test Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">Questions:</span>
                  <span className="font-bold">{questionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">Topics:</span>
                  <span className="font-bold">{selectedTopics.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">Time Limit:</span>
                  <span className="font-bold">{timeLimit} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">Difficulty:</span>
                  <span className="font-bold">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-800 font-medium">Types:</span>
                  <span className="font-bold">{questionTypes.length}</span>
                </div>

                <hr className="my-4" />

                <div className="text-sm text-gray-800">
                  <div className="font-semibold mb-2 text-gray-900">Selected Topics:</div>
                  {selectedTopics.length === 0 ? (
                    <div className="text-red-500">No topics selected</div>
                  ) : (
                    <div className="space-y-1">
                      {selectedTopics.map((topicId) => {
                        const topic = topics.find((t) => t.id === topicId)
                        return (
                          <div key={topicId} className="flex items-center gap-2">
                            <span>{topic?.icon}</span>
                            <span className="text-gray-900 font-medium">{topic?.name}</span>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerateTest}
                disabled={selectedTopics.length === 0 || isGenerating}
                className={cn(
                  'w-full mt-6 px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2',
                  selectedTopics.length > 0 && !isGenerating
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                )}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="h-5 w-5" />
                    Generate Test
                    <ArrowRightIcon className="h-4 w-4" />
                  </>
                )}
              </button>

              {selectedTopics.length === 0 && (
                <div className="mt-3 text-sm text-red-500 text-center">
                  Please select at least one topic
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold mb-4">✨ AI Features</h3>
              <ul className="space-y-2 text-sm text-gray-900">
                <li>• Unlimited unique questions</li>
                <li>• Adaptive difficulty levels</li>
                <li>• Instant detailed analysis</li>
                <li>• Performance tracking</li>
                <li>• Weakness identification</li>
                <li>• Study recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestGeneratorPage
