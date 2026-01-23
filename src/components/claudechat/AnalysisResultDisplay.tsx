'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
    <motion.div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="px-6 py-4 bg-gray-50 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
            >
              <Brain className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">AI Analysis Complete</h3>
              <p className="text-sm text-gray-600">
                Analyzed at {formatTimestamp(result.timestamp)} • {result.processingTime}ms
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Confidence Badge */}
            <motion.span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(result.confidence)}`}
              whileHover={{ scale: 1.05 }}
            >
              {(result.confidence * 100).toFixed(0)}% confident
            </motion.span>

            {/* Difficulty Badge */}
            <motion.span
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(result.difficultyLevel)}`}
              whileHover={{ scale: 1.05 }}
            >
              {result.difficultyLevel}
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Image Preview */}
      <motion.div
        className="p-4 border-b bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start space-x-4">
          <motion.div
            className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md"
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 mb-1">{result.fileName}</h4>
            <div className="flex flex-wrap gap-2">
              {result.biologyTopics.slice(0, 3).map((topic, index) => (
                <motion.span
                  key={topic}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {topic}
                </motion.span>
              ))}
              {result.biologyTopics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                  +{result.biologyTopics.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Content */}
      <div className="p-6">
        {/* Main Analysis */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h4 className="font-semibold text-gray-800">Shekhar Sir's Analysis</h4>
            </div>
            <div className="flex items-center space-x-2">
              {/* Audio Controls */}
              <motion.button
                className={`p-2 rounded-lg ${isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 ${!isVoiceAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: isVoiceAvailable ? 1.05 : 1 }}
                whileTap={{ scale: isVoiceAvailable ? 0.95 : 1 }}
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
              </motion.button>

              {/* Copy Button */}
              <motion.button
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(result.analysisText, 'analysis')}
              >
                <Copy size={16} />
              </motion.button>

              {/* Expand/Collapse */}
              <motion.button
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSection('analysis')}
              >
                {expandedSections.has('analysis') ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {expandedSections.has('analysis') && (
              <motion.div
                className="prose prose-sm max-w-none"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  {isSpeaking && (
                    <motion.div
                      className="flex items-center space-x-2 mb-3 text-blue-600"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Volume2 size={16} />
                      <span className="text-sm font-medium">Playing in Shekhar Sir's voice...</span>
                      <div className="flex-1 bg-blue-200 rounded-full h-1 ml-2">
                        <motion.div
                          className="bg-blue-500 h-1 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      className="flex items-center space-x-2 mb-3 text-red-600"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <VolumeX size={16} />
                      <span className="text-sm">Voice synthesis error: {error}</span>
                    </motion.div>
                  )}
                  <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                    {result.analysisText}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {copiedText === 'analysis' && (
            <motion.div
              className="mt-2 text-green-600 text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              ✓ Analysis copied to clipboard
            </motion.div>
          )}
        </motion.div>

        {/* Study Suggestions */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h4 className="font-semibold text-gray-800">Study Suggestions</h4>
            </div>
            <motion.button
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSection('suggestions')}
            >
              {expandedSections.has('suggestions') ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {expandedSections.has('suggestions') && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {result.suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 text-sm">{suggestion}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related Concepts */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h4 className="font-semibold text-gray-800">Related Concepts</h4>
            </div>
            <motion.button
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSection('concepts')}
            >
              {expandedSections.has('concepts') ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {expandedSections.has('concepts') && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {result.relatedConcepts.map((concept, index) => (
                  <motion.span
                    key={concept}
                    className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {concept}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 pt-4 border-t"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen size={16} />
            <span>Study More</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Star size={16} />
            <span>Save to Favorites</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Share size={16} />
            <span>Share</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} />
            <span>Download</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AnalysisResultDisplay
