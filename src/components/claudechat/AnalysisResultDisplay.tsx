'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  Brain,
  BookOpen,
  Lightbulb,
  Target,
  Star,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  Copy,
  Share,
  Download,
  Eye,
  Sparkles,
} from 'lucide-react'
import { useShekharVoice } from '@/hooks/useShekharVoice'

interface ImageAnalysisResult {
  id: string
  imageUrl: string
  fileName: string
  analysisText: string
  biologyTopics: string[]
  difficultyLevel: 'easy' | 'medium' | 'hard'
  confidence: number
  suggestions: string[]
  relatedConcepts: string[]
  timestamp: number
  processingTime: number
}

interface AnalysisResultDisplayProps {
  result: ImageAnalysisResult
  className?: string
}

const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({
  result,
  className = '',
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['analysis']))
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const { speakBiologyTopic, stop, isSpeaking, progress, error, isVoiceAvailable } =
    useShekharVoice({
      onSpeakStart: () => console.log('Shekhar Sir started explaining'),
      onSpeakEnd: () => console.log('Shekhar Sir finished explaining'),
      onSpeakError: (error) => console.error('Voice synthesis error:', error),
    })

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(label)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100'
    if (confidence >= 0.7) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div
        className="px-6 py-4 bg-gray-50 border-b animate-fadeInUp"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center animate-fadeInUp"
            >
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">AI Analysis Complete</h3>
              <p className="text-sm text-gray-600">
                Analyzed at {formatTimestamp(result.timestamp)} • {result.processingTime}ms
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Confidence Badge */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}
            >
              {(result.confidence * 100).toFixed(0)}% confident
            </span>

            {/* Difficulty Badge */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(result.difficultyLevel)}`}
            >
              {result.difficultyLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      <div
        className="p-4 border-b bg-gray-50 animate-fadeInUp"
      >
        <div className="flex items-start space-x-4">
          <div
            className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md animate-fadeInUp"
          >
            <Image
              src={result.imageUrl}
              alt={result.fileName}
              fill
              className="object-cover"
              sizes="96px"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <Eye
                className="text-white opacity-0 hover:opacity-100 transition-opacity"
                size={20}
              />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">{result.fileName}</h4>
            <div className="flex flex-wrap gap-2">
              {result.biologyTopics.slice(0, 3).map((topic, index) => (
                <span
                  key={topic}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md animate-fadeInUp"
                >
                  {topic}
                </span>
              ))}
              {result.biologyTopics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  +{result.biologyTopics.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Content */}
      <div className="p-6">
        {/* Main Analysis */}
        <div
          className="mb-6 animate-fadeInUp"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold text-gray-800">Shekhar Sir's Analysis</h4>
            </div>
            <div className="flex items-center space-x-2">
              {/* Audio Controls */}
              <button
                className={`p-2 rounded-lg ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 ${!isVoiceAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={async () => {
                  if (!isVoiceAvailable) return

                  if (isSpeaking) {
                    stop()
                  } else {
                    const topic = result.biologyTopics[0] || 'Biology Topic'
                    await speakBiologyTopic(topic, result.analysisText)
                  }
                }}
                disabled={!isVoiceAvailable}
                title={
                  !isVoiceAvailable
                    ? 'Voice synthesis not available'
                    : isSpeaking
                      ? "Stop Shekhar Sir's explanation"
                      : "Listen to Shekhar Sir's explanation"
                }
              >
                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Copy Button */}
              <button
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 animate-fadeInUp"
                onClick={() => copyToClipboard(result.analysisText, 'analysis')}
              >
                <Copy size={16} />
              </button>

              {/* Expand/Collapse */}
              <button
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 animate-fadeInUp"
                onClick={() => toggleSection('analysis')}
              >
                {expandedSections.has('analysis') ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>
          </div>
{expandedSections.has('analysis') && (
              <div
                className="prose prose-sm max-w-none animate-fadeInUp"
              >
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  {isSpeaking && (
                    <div
                      className="flex items-center space-x-2 mb-3 text-blue-600 animate-fadeInUp"
                    >
                      <Volume2 size={16} />
                      <span className="text-sm font-medium">Playing in Shekhar Sir's voice...</span>
                      <div className="flex-1 bg-blue-200 rounded-full h-1 ml-2">
                        <div
                          className="bg-blue-500 h-1 rounded-full animate-fadeInUp"
                        />
                      </div>
                    </div>
                  )}
                  {error && (
                    <div
                      className="flex items-center space-x-2 mb-3 text-red-600 animate-fadeInUp"
                    >
                      <VolumeX size={16} />
                      <span className="text-sm">Voice synthesis error: {error}</span>
                    </div>
                  )}
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {result.analysisText}
                  </div>
                </div>
              </div>
            )}
{copiedText === 'analysis' && (
            <div
              className="mt-2 text-green-600 text-sm animate-fadeInUp"
            >
              ✓ Analysis copied to clipboard
            </div>
          )}
        </div>

        {/* Study Suggestions */}
        <div
          className="mb-6 animate-fadeInUp"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold text-gray-800">Study Suggestions</h4>
            </div>
            <button
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 animate-fadeInUp"
              onClick={() => toggleSection('suggestions')}
            >
              {expandedSections.has('suggestions') ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>
{expandedSections.has('suggestions') && (
              <div
                className="space-y-2 animate-fadeInUp"
              >
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 animate-fadeInUp"
                  >
                    <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
</div>

        {/* Related Concepts */}
        <div
          className="mb-6 animate-fadeInUp"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold text-gray-800">Related Concepts</h4>
            </div>
            <button
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 animate-fadeInUp"
              onClick={() => toggleSection('concepts')}
            >
              {expandedSections.has('concepts') ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          </div>
{expandedSections.has('concepts') && (
              <div
                className="flex flex-wrap gap-2 animate-fadeInUp"
              >
                {result.relatedConcepts.map((concept, index) => (
                  <span
                    key={concept}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors animate-fadeInUp"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            )}
</div>

        {/* Action Buttons */}
        <div
          className="flex flex-wrap gap-3 pt-4 border-t animate-fadeInUp"
        >
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 animate-fadeInUp"
          >
            <BookOpen size={16} />
            <span>Study More</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600 animate-fadeInUp"
          >
            <Star size={16} />
            <span>Save to Favorites</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 animate-fadeInUp"
          >
            <Share size={16} />
            <span>Share</span>
          </button>

          <button
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 animate-fadeInUp"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResultDisplay
