'use client'

import React, { useState } from 'react'

export default function SimpleTestGenerator() {
  const [questions, setQuestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [topic, setTopic] = useState('Cell Biology')
  const [count, setCount] = useState(5)

  const topics = [
    'Cell Biology',
    'Genetics',
    'Human Physiology',
    'Plant Physiology',
    'Evolution',
    'Ecology',
    'Biotechnology',
    'Reproduction',
  ]

  const generateQuestions = async () => {
    setLoading(true)
    setQuestions([])

    try {
      // Generate mock questions for now
      const mockQuestions = Array.from(
        { length: count },
        (_, i) =>
          `Question ${i + 1}: What is the key concept in ${topic} related to cellular processes and biological functions? Explain with examples.`
      )

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setQuestions(mockQuestions)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to generate questions')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          🧬 Simple Test Generator
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Generate Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Topic:</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Number of Questions:
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={generateQuestions}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Questions'}
          </button>
        </div>

        {questions.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Generated Questions:</h2>
            <div className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded border-l-4 border-blue-500">
                  <div className="font-bold text-blue-800 text-lg">Question {index + 1}</div>
                  <div className="mt-2 text-gray-900 font-medium">{question}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Export as PDF
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                Save as Word
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
                Print Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
