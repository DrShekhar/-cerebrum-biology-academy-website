'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Square,
  Volume2,
  VolumeX,
  Brain,
  Mic,
  BookOpen,
  Target,
  Star,
  Settings,
} from 'lucide-react'
import { useShekharVoice } from '@/hooks/useShekharVoice'

const VoiceTestBoard: React.FC = () => {
  const [selectedText, setSelectedText] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<
    'hindi' | 'english' | 'hinglish' | 'auto'
  >('auto')

  const { speak, speakBiologyTopic, stop, isSpeaking, progress, error, isVoiceAvailable } =
    useShekharVoice({
      language: selectedLanguage,
      onSpeakStart: () => console.log('Voice test started'),
      onSpeakEnd: () => console.log('Voice test completed'),
      onSpeakError: (error) => console.error('Voice test error:', error),
    })

  const sampleTexts = {
    hindi: [
      'नमस्कार बच्चों, आज हम कोशिका विभाजन के बारे में पढ़ेंगे।',
      'प्रकाश संश्लेषण में क्लोरोफिल की भूमिका बहुत महत्वपूर्ण है।',
      'डीएनए की संरचना वाटसन और क्रिक ने खोजी थी।',
    ],
    english: [
      'Hello students, today we will study about cell division.',
      'Photosynthesis is the process by which plants make food.',
      'DNA contains the genetic information of all living organisms.',
    ],
    hinglish: [
      'Dekho students, cell division ek bahut important topic hai NEET ke liye.',
      'Photosynthesis mein light energy ko chemical energy mein convert kiya jata hai.',
      'DNA replication mein accuracy maintain karna bahut zaroori hai.',
    ],
  }

  const biologyTopics = [
    {
      topic: 'Cell Division',
      explanation:
        'Cell division is a fundamental process in Biology. It involves two main types: mitosis and meiosis. Mitosis produces identical diploid cells for growth and repair, while meiosis produces genetically diverse gametes for reproduction.',
    },
    {
      topic: 'Photosynthesis',
      explanation:
        'Photosynthesis ek process hai jismein plants light energy ko chemical energy mein convert karte hain. Yeh process chloroplasts mein hota hai aur oxygen release karta hai.',
    },
    {
      topic: 'DNA Structure',
      explanation:
        'डीएनए की संरचना double helix के रूप में होती है। इसमें चार bases होते हैं - adenine, thymine, guanine और cytosine। यह genetic information store करता है।',
    },
  ]

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      stop()
    } else {
      await speak(text)
    }
  }

  const handleSpeakTopic = async (topic: string, explanation: string) => {
    if (isSpeaking) {
      stop()
    } else {
      await speakBiologyTopic(topic, explanation)
    }
  }

  if (!isVoiceAvailable) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <VolumeX className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Voice Synthesis Not Available</h3>
          <p className="text-red-600">
            Your browser doesn't support voice synthesis. Please use Chrome, Safari, or Edge.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 Shekhar Sir Voice Test</h1>
        <p className="text-lg text-gray-600 mb-6">
          Test the AI voice feature in Hindi, English, and Hinglish
        </p>

        {/* Voice Status */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
              isVoiceAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span className="font-medium">
              {isVoiceAvailable ? 'Voice Ready' : 'Voice Unavailable'}
            </span>
          </div>

          {isSpeaking && (
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic className="w-5 h-5" />
              </motion.div>
              <span className="font-medium">Speaking... {Math.round(progress)}%</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Language Selector */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Language Settings
        </h3>
        <div className="flex flex-wrap gap-3">
          {(['auto', 'hindi', 'english', 'hinglish'] as const).map((lang) => (
            <motion.button
              key={lang}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                selectedLanguage === lang
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedLanguage(lang)}
            >
              {lang === 'auto' ? 'Auto Detect' : lang}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Sample Texts */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Quick Test Phrases
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(sampleTexts).map(([language, texts]) => (
            <div key={language} className="space-y-3">
              <h4 className="font-medium text-gray-700 capitalize">{language}</h4>
              <div className="space-y-2">
                {texts.map((text, index) => (
                  <motion.div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSpeak(text)}
                  >
                    <p className="text-sm text-gray-800 mb-2">{text}</p>
                    <button
                      className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                        isSpeaking ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {isSpeaking ? <Square size={12} /> : <Play size={12} />}
                      <span>{isSpeaking ? 'Stop' : 'Play'}</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Biology Topics */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Biology Topic Explanations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {biologyTopics.map((item, index) => (
            <motion.div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{item.topic}</h4>
                <Target className="w-4 h-4 text-blue-500" />
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.explanation}</p>

              <motion.button
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isSpeaking
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSpeakTopic(item.topic, item.explanation)}
              >
                {isSpeaking ? <Square size={16} /> : <Play size={16} />}
                <span>{isSpeaking ? 'Stop' : 'Listen to Explanation'}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Custom Text Input */}
      <motion.div
        className="bg-white rounded-xl shadow-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Custom Text Test
        </h3>

        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="Enter any Biology text in Hindi, English, or Hinglish to test Shekhar Sir's voice..."
            value={selectedText}
            onChange={(e) => setSelectedText(e.target.value)}
          />

          <div className="flex items-center space-x-3">
            <motion.button
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                isSpeaking
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } ${!selectedText.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: selectedText.trim() ? 1.05 : 1 }}
              whileTap={{ scale: selectedText.trim() ? 0.95 : 1 }}
              onClick={() => selectedText.trim() && handleSpeak(selectedText)}
              disabled={!selectedText.trim()}
            >
              {isSpeaking ? <Square size={20} /> : <Play size={20} />}
              <span>{isSpeaking ? 'Stop Speaking' : 'Test Custom Text'}</span>
            </motion.button>

            {progress > 0 && (
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <VolumeX className="w-5 h-5 text-red-500" />
          <span className="text-red-700">Voice Error: {error}</span>
        </motion.div>
      )}
    </div>
  )
}

export default VoiceTestBoard
