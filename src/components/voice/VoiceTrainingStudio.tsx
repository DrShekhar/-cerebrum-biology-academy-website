'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Play,
  Pause,
  Square,
  Settings,
  Volume2,
  VolumeX,
  Save,
  RefreshCw,
  Sliders,
  Languages,
  Brain,
  Target,
  Activity,
  User,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { useShekharVoice } from '@/hooks/useShekharVoice'

interface VoiceSettings {
  rate: number
  pitch: number
  volume: number
  language: 'hindi' | 'english' | 'hinglish'
}

interface TrainingPhrase {
  id: string
  text: string
  language: 'hindi' | 'english' | 'hinglish'
  category: 'greeting' | 'explanation' | 'encouragement' | 'question'
  difficulty: 'easy' | 'medium' | 'hard'
}

const VoiceTrainingStudio: React.FC = () => {
  const [currentPhrase, setCurrentPhrase] = useState<TrainingPhrase | null>(null)
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 0.9,
    pitch: 1.1,
    volume: 0.9,
    language: 'english',
  })
  const [isTraining, setIsTraining] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set())

  const { speak, stop, pause, resume, isSpeaking, isPaused, progress, error, isVoiceAvailable } =
    useShekharVoice({
      language: voiceSettings.language,
      onSpeakStart: () => console.log('Voice training started'),
      onSpeakEnd: () => console.log('Voice training completed'),
      onSpeakError: (error) => console.error('Voice training error:', error),
    })

  const trainingPhrases: TrainingPhrase[] = [
    {
      id: '1',
      text: 'नमस्कार बच्चों, आज हम Biology का एक महत्वपूर्ण chapter पढ़ेंगे।',
      language: 'hindi',
      category: 'greeting',
      difficulty: 'easy',
    },
    {
      id: '2',
      text: "Hello students, welcome to today's Biology class. Are you ready to learn something amazing?",
      language: 'english',
      category: 'greeting',
      difficulty: 'easy',
    },
    {
      id: '3',
      text: 'Dekho students, yeh concept bahut important hai NEET ke liye. Ise samjho carefully.',
      language: 'hinglish',
      category: 'explanation',
      difficulty: 'medium',
    },
    {
      id: '4',
      text: 'Photosynthesis में chlorophyll एक बहुत important role play करता है। यह light energy को chemical energy में convert करता है।',
      language: 'hinglish',
      category: 'explanation',
      difficulty: 'hard',
    },
    {
      id: '5',
      text: 'Cell division is a fundamental process in Biology. It involves mitosis and meiosis.',
      language: 'english',
      category: 'explanation',
      difficulty: 'medium',
    },
    {
      id: '6',
      text: 'कोशिका विभाजन में mitosis और meiosis दो प्रमुख प्रक्रियाएं हैं।',
      language: 'hindi',
      category: 'explanation',
      difficulty: 'medium',
    },
    {
      id: '7',
      text: 'Excellent! आपने इस concept को बहुत अच्छे से समझा है। Keep it up!',
      language: 'hinglish',
      category: 'encouragement',
      difficulty: 'easy',
    },
    {
      id: '8',
      text: 'Can you explain how DNA replication occurs during cell division?',
      language: 'english',
      category: 'question',
      difficulty: 'hard',
    },
    {
      id: '9',
      text: 'क्या आप बता सकते हैं कि respiration और photosynthesis में क्या अंतर है?',
      language: 'hindi',
      category: 'question',
      difficulty: 'medium',
    },
    {
      id: '10',
      text: 'Biology mein practice सबसे important hai। Daily revision करते रहें और diagrams बनाना सीखें।',
      language: 'hinglish',
      category: 'encouragement',
      difficulty: 'easy',
    },
  ]

  useEffect(() => {
    if (trainingPhrases.length > 0 && !currentPhrase) {
      setCurrentPhrase(trainingPhrases[0])
    }
  }, [])

  useEffect(() => {
    const completed = completedPhrases.size
    const total = trainingPhrases.length
    setTrainingProgress((completed / total) * 100)
  }, [completedPhrases])

  const handlePlayPhrase = async () => {
    if (!currentPhrase) return

    try {
      await speak(currentPhrase.text)
      setCompletedPhrases((prev) => new Set([...prev, currentPhrase.id]))
    } catch (error) {
      console.error('Error playing phrase:', error)
    }
  }

  const handleNextPhrase = () => {
    if (!currentPhrase) return

    const currentIndex = trainingPhrases.findIndex((p) => p.id === currentPhrase.id)
    const nextIndex = (currentIndex + 1) % trainingPhrases.length
    setCurrentPhrase(trainingPhrases[nextIndex])
  }

  const handlePreviousPhrase = () => {
    if (!currentPhrase) return

    const currentIndex = trainingPhrases.findIndex((p) => p.id === currentPhrase.id)
    const prevIndex = currentIndex === 0 ? trainingPhrases.length - 1 : currentIndex - 1
    setCurrentPhrase(trainingPhrases[prevIndex])
  }

  const handleSettingsChange = (key: keyof VoiceSettings, value: number | string) => {
    setVoiceSettings((prev) => ({ ...prev, [key]: value }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'greeting':
        return <User className="w-4 h-4" />
      case 'explanation':
        return <Brain className="w-4 h-4" />
      case 'encouragement':
        return <CheckCircle className="w-4 h-4" />
      case 'question':
        return <Target className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  if (!isVoiceAvailable) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Voice Synthesis Not Available</h3>
          <p className="text-red-600">
            Your browser doesn't support voice synthesis. Please use a modern browser like Chrome,
            Safari, or Edge.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shekhar Sir Voice Training Studio</h1>
        <p className="text-gray-600">
          Train and customize the AI voice to match Shekhar Sir's teaching style
        </p>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Training Progress</h3>
          <span className="text-sm text-gray-600">
            {completedPhrases.size} / {trainingPhrases.length} phrases completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${trainingProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          {Math.round(trainingProgress)}% Complete
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Training Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Phrase Card */}
          {currentPhrase && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentPhrase.id}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {getCategoryIcon(currentPhrase.category)}
                  <span className="text-sm font-medium text-gray-600 capitalize">
                    {currentPhrase.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentPhrase.difficulty)}`}
                  >
                    {currentPhrase.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {currentPhrase.language}
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-800 leading-relaxed p-4 bg-gray-50 rounded-lg">
                  {currentPhrase.text}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePreviousPhrase}
                >
                  <RefreshCw className="w-5 h-5 rotate-180" />
                </motion.button>

                {isSpeaking ? (
                  <motion.button
                    className="p-4 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stop}
                  >
                    <Square className="w-6 h-6" />
                  </motion.button>
                ) : (
                  <motion.button
                    className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPhrase}
                  >
                    <Play className="w-6 h-6" />
                  </motion.button>
                )}

                <motion.button
                  className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextPhrase}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Speech Progress */}
              {isSpeaking && (
                <motion.div className="mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex items-center space-x-3 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Volume2 className="w-5 h-5 text-blue-500" />
                    </motion.div>
                    <span className="text-sm text-gray-600">
                      Speaking in Shekhar Sir's voice...
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Voice Settings */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Voice Settings</h3>
              <Sliders className="w-5 h-5 text-gray-600" />
            </div>

            <div className="space-y-4">
              {/* Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speech Rate: {voiceSettings.rate.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceSettings.rate}
                  onChange={(e) => handleSettingsChange('rate', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Pitch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pitch: {voiceSettings.pitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={voiceSettings.pitch}
                  onChange={(e) => handleSettingsChange('pitch', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Volume */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Volume: {voiceSettings.volume.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={voiceSettings.volume}
                  onChange={(e) => handleSettingsChange('volume', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Language
                </label>
                <select
                  value={voiceSettings.language}
                  onChange={(e) => handleSettingsChange('language', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="hinglish">Hinglish</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Phrase List */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Phrases</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {trainingPhrases.map((phrase) => (
                <motion.div
                  key={phrase.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentPhrase?.id === phrase.id
                      ? 'bg-blue-100 border border-blue-300'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPhrase(phrase)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 capitalize">{phrase.category}</span>
                    {completedPhrases.has(phrase.id) && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-800 truncate">{phrase.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VoiceTrainingStudio
