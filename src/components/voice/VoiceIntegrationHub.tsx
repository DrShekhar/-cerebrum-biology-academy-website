'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  Languages,
  Waveform,
  Brain,
  Headphones,
  MessageSquare,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Sliders,
  Download,
  Upload,
  Globe,
  Heart,
  Zap,
  Users,
  Star
} from 'lucide-react'

interface VoiceSettings {
  language: 'en-IN' | 'hi-IN' | 'en-US'
  voice: 'male' | 'female' | 'shekhar'
  speed: number
  pitch: number
  volume: number
  pronunciation: 'standard' | 'indian' | 'hinglish'
}

interface VoiceResponse {
  transcript: string
  confidence: number
  language: string
  biologyTerms: string[]
  intent: 'question' | 'answer' | 'help' | 'repeat' | 'explanation'
  sentiment: 'positive' | 'neutral' | 'confused' | 'frustrated'
}

interface ConversationEntry {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: number
  audioUrl?: string
  confidence?: number
  biologyTerms?: string[]
}

interface VoiceLearningSession {
  id: string
  topic: string
  startTime: number
  duration: number
  questionsAsked: number
  correctAnswers: number
  voiceInteractions: number
  languageMix: { english: number; hindi: number; hinglish: number }
}

const VoiceIntegrationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'practice' | 'pronunciation' | 'analytics' | 'settings'>('chat')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [conversation, setConversation] = useState<ConversationEntry[]>([])
  const [currentResponse, setCurrentResponse] = useState('')
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    language: 'en-IN',
    voice: 'shekhar',
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    pronunciation: 'hinglish'
  })
  const [session, setSession] = useState<VoiceLearningSession | null>(null)
  const [isSupported, setIsSupported] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null)

  // Biology-specific voice prompts and responses
  const biologyPrompts = [
    {
      category: 'cell-biology',
      prompts: [
        'Tell me about mitochondria in Hindi',
        'Explain photosynthesis process',
        'What is the function of nucleus?',
        'Describe cellular respiration'
      ]
    },
    {
      category: 'genetics',
      prompts: [
        'What are Mendel\'s laws?',
        'Explain DNA structure',
        'How does inheritance work?',
        'What are chromosomes?'
      ]
    },
    {
      category: 'human-physiology',
      prompts: [
        'How does the heart work?',
        'Explain digestion process',
        'What is nervous system?',
        'How do we breathe?'
      ]
    }
  ]

  const pronunciationChallenges = [
    { term: 'mitochondria', phonetic: '/ˌmaɪtəˈkɒndriə/', hindi: 'माइटोकॉन्ड्रिया' },
    { term: 'photosynthesis', phonetic: '/ˌfoʊtoʊˈsɪnθəsɪs/', hindi: 'प्रकाश संश्लेषण' },
    { term: 'chromosome', phonetic: '/ˈkroʊməˌsoʊm/', hindi: 'गुणसूत्र' },
    { term: 'ecosystem', phonetic: '/ˈiːkoʊˌsɪstəm/', hindi: 'पारिस्थितिकी तंत्र' },
    { term: 'respiration', phonetic: '/ˌrɛspəˈreɪʃən/', hindi: 'श्वसन' }
  ]

  useEffect(() => {
    initializeVoiceServices()
    startLearningSession()
    return () => {
      cleanupVoiceServices()
    }
  }, [])

  const initializeVoiceServices = () => {
    // Check for Speech Recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = voiceSettings.language

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setError(null)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`)
        setIsListening(false)
      }

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')

        const confidence = event.results[event.results.length - 1][0].confidence

        handleVoiceInput(transcript, confidence)
      }
    } else {
      setIsSupported(false)
      setError('Speech recognition not supported in this browser')
    }

    // Check for Speech Synthesis support
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis
    }

    // Initialize Web Audio API for voice analysis
    initializeAudioContext()
  }

  const initializeAudioContext = async () => {
    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      analyserRef.current.fftSize = 256
    } catch (error) {
      console.error('Error initializing audio context:', error)
    }
  }

  const startLearningSession = () => {
    const newSession: VoiceLearningSession = {
      id: `session_${Date.now()}`,
      topic: 'General Biology',
      startTime: Date.now(),
      duration: 0,
      questionsAsked: 0,
      correctAnswers: 0,
      voiceInteractions: 0,
      languageMix: { english: 0, hindi: 0, hinglish: 0 }
    }
    setSession(newSession)
  }

  const handleVoiceInput = async (transcript: string, confidence: number) => {
    // Process the voice input with AI to understand intent and extract biology terms
    const response = await processVoiceInput(transcript, confidence)

    // Add user input to conversation
    const userEntry: ConversationEntry = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: transcript,
      timestamp: Date.now(),
      confidence,
      biologyTerms: response.biologyTerms
    }

    setConversation(prev => [...prev, userEntry])

    // Generate AI response
    const aiResponse = await generateAIResponse(response)

    // Add AI response to conversation
    const aiEntry: ConversationEntry = {
      id: `ai_${Date.now()}`,
      type: 'ai',
      content: aiResponse,
      timestamp: Date.now()
    }

    setConversation(prev => [...prev, aiEntry])

    // Speak the response
    await speakText(aiResponse)

    // Update session stats
    updateSessionStats(response)
  }

  const processVoiceInput = async (transcript: string, confidence: number): Promise<VoiceResponse> => {
    // Detect biology terms
    const biologyTerms = detectBiologyTerms(transcript)

    // Detect language
    const language = detectLanguage(transcript)

    // Determine intent
    const intent = determineIntent(transcript)

    // Analyze sentiment
    const sentiment = analyzeSentiment(transcript)

    return {
      transcript,
      confidence,
      language,
      biologyTerms,
      intent,
      sentiment
    }
  }

  const detectBiologyTerms = (text: string): string[] => {
    const terms = [
      'cell', 'nucleus', 'mitochondria', 'DNA', 'RNA', 'protein', 'gene', 'chromosome',
      'photosynthesis', 'respiration', 'enzyme', 'hormone', 'neuron', 'muscle',
      'heart', 'kidney', 'liver', 'brain', 'blood', 'oxygen', 'carbon dioxide',
      'metabolism', 'ecology', 'evolution', 'species', 'organism', 'bacteria',
      'virus', 'immunity', 'antibody', 'vaccine', 'genetic', 'heredity'
    ]

    const hindiTerms = [
      'कोशिका', 'केंद्रक', 'प्रकाश संश्लेषण', 'श्वसन', 'रक्त', 'हृदय',
      'गुणसूत्र', 'पारिस्थितिकी', 'जीन', 'हार्मोन'
    ]

    const foundTerms = []
    const lowerText = text.toLowerCase()

    for (const term of [...terms, ...hindiTerms]) {
      if (lowerText.includes(term.toLowerCase())) {
        foundTerms.push(term)
      }
    }

    return foundTerms
  }

  const detectLanguage = (text: string): string => {
    const hindiPattern = /[\u0900-\u097F]/
    const englishPattern = /[a-zA-Z]/

    const hasHindi = hindiPattern.test(text)
    const hasEnglish = englishPattern.test(text)

    if (hasHindi && hasEnglish) return 'hinglish'
    if (hasHindi) return 'hindi'
    return 'english'
  }

  const determineIntent = (text: string): 'question' | 'answer' | 'help' | 'repeat' | 'explanation' => {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'क्या', 'कैसे', 'क्यों', 'कब', 'कहाँ']
    const helpWords = ['help', 'मदद', 'explain', 'समझाओ', 'बताओ']
    const repeatWords = ['repeat', 'again', 'फिर से', 'दोबारा']

    const lowerText = text.toLowerCase()

    if (questionWords.some(word => lowerText.includes(word))) return 'question'
    if (helpWords.some(word => lowerText.includes(word))) return 'help'
    if (repeatWords.some(word => lowerText.includes(word))) return 'repeat'

    return 'answer'
  }

  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'confused' | 'frustrated' => {
    const positiveWords = ['good', 'great', 'thanks', 'yes', 'correct', 'अच्छा', 'धन्यवाद', 'हाँ']
    const confusedWords = ['confused', 'don\'t understand', 'समझ नहीं आया', 'confused हूं']
    const frustratedWords = ['difficult', 'hard', 'can\'t', 'मुश्किल', 'नहीं आता']

    const lowerText = text.toLowerCase()

    if (positiveWords.some(word => lowerText.includes(word))) return 'positive'
    if (confusedWords.some(word => lowerText.includes(word))) return 'confused'
    if (frustratedWords.some(word => lowerText.includes(word))) return 'frustrated'

    return 'neutral'
  }

  const generateAIResponse = async (voiceResponse: VoiceResponse): Promise<string> => {
    // This would integrate with AI service for contextual responses
    const responses = {
      question: [
        "That's a great question about biology! Let me explain...",
        "Interesting question! In biology, this concept is important because...",
        "Good question! यह biology में बहुत important topic है..."
      ],
      help: [
        "I'm here to help you with biology! What specifically would you like to know?",
        "Of course! Biology can be tricky, but let's break it down...",
        "मैं आपकी biology में मदद करूंगा! क्या समझना चाहते हैं?"
      ],
      confused: [
        "Don't worry, biology concepts can be confusing at first. Let me explain it differently...",
        "No problem! यह concept थोड़ा tricky है, मैं आसान तरीके से समझाता हूं...",
        "It's okay to be confused. Let's approach this step by step..."
      ]
    }

    const category = voiceResponse.sentiment === 'confused' ? 'confused' : voiceResponse.intent
    const availableResponses = responses[category] || responses.help

    return availableResponses[Math.floor(Math.random() * availableResponses.length)]
  }

  const speakText = async (text: string): Promise<void> => {
    if (!synthesisRef.current) return

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text)

      // Configure voice settings
      utterance.rate = voiceSettings.speed
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume
      utterance.lang = voiceSettings.language

      // Find appropriate voice
      const voices = synthesisRef.current!.getVoices()
      const preferredVoice = voices.find(voice =>
        voice.lang.includes(voiceSettings.language.split('-')[0]) &&
        (voiceSettings.voice === 'female' ? voice.name.includes('female') : true)
      )

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        resolve()
      }
      utterance.onerror = (event) => {
        setError(`Speech synthesis error: ${event.error}`)
        setIsSpeaking(false)
        resolve()
      }

      synthesisRef.current!.speak(utterance)
    })
  }

  const updateSessionStats = (response: VoiceResponse) => {
    if (!session) return

    setSession(prev => {
      if (!prev) return null

      const languageUpdate = { ...prev.languageMix }
      if (response.language === 'english') languageUpdate.english++
      else if (response.language === 'hindi') languageUpdate.hindi++
      else languageUpdate.hinglish++

      return {
        ...prev,
        voiceInteractions: prev.voiceInteractions + 1,
        languageMix: languageUpdate,
        duration: Date.now() - prev.startTime
      }
    })
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const cleanupVoiceServices = () => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
    if (synthesisRef.current) {
      synthesisRef.current.cancel()
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
  }

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-700 mb-2">Voice Features Not Supported</h3>
          <p className="text-red-600">
            Your browser doesn't support voice recognition and synthesis. Please use Chrome, Safari, or Edge.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
            <Mic className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Voice Learning Hub
          </h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Interactive voice-powered biology learning with multi-language support, pronunciation practice, and AI-driven conversations.
        </p>
      </motion.div>

      {/* Voice Controls */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={isListening ? stopListening : startListening}
            disabled={isSpeaking}
            className={`p-4 rounded-full shadow-lg transition-all ${
              isListening
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </motion.button>

          <motion.button
            onClick={isSpeaking ? stopSpeaking : () => speakText("Hello! I'm ready to help you learn biology.")}
            disabled={isListening}
            className={`p-4 rounded-full shadow-lg transition-all ${
              isSpeaking
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white disabled:opacity-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </motion.button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Languages className="w-4 h-4" />
            <span>{voiceSettings.language} • {voiceSettings.pronunciation}</span>
          </div>
        </div>

        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Waveform className="w-5 h-5" />
              </motion.div>
              <span className="text-sm">Listening for your voice...</span>
            </div>
          </motion.div>
        )}

        {isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-green-600">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Volume2 className="w-5 h-5" />
              </motion.div>
              <span className="text-sm">Speaking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'chat', label: 'Voice Chat', icon: MessageSquare },
            { id: 'practice', label: 'Practice', icon: Target },
            { id: 'pronunciation', label: 'Pronunciation', icon: Languages },
            { id: 'analytics', label: 'Analytics', icon: Brain },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
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
        {/* Voice Chat Tab */}
        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-xl p-6 border"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              AI Biology Tutor Conversation
            </h3>

            <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
              {conversation.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Headphones className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Start a conversation by clicking the microphone</p>
                  <p className="text-sm mt-2">Try asking: "What is photosynthesis?" or "फोटोसिंथेसिस क्या है?"</p>
                </div>
              ) : (
                conversation.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${entry.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        entry.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{entry.content}</p>
                      {entry.confidence && (
                        <p className="text-xs mt-1 opacity-75">
                          Confidence: {Math.round(entry.confidence * 100)}%
                        </p>
                      )}
                      {entry.biologyTerms && entry.biologyTerms.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs opacity-75">Biology terms detected:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {entry.biologyTerms.map((term, index) => (
                              <span key={index} className="text-xs bg-blue-700 text-white px-2 py-1 rounded">
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Quick Prompts */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Biology Topics:</h4>
              <div className="flex flex-wrap gap-2">
                {biologyPrompts.slice(0, 2).flatMap(category =>
                  category.prompts.slice(0, 2)
                ).map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => speakText(prompt)}
                    className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Pronunciation Tab */}
        {activeTab === 'pronunciation' && (
          <motion.div
            key="pronunciation"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-xl p-6 border"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-purple-600" />
              Biology Term Pronunciation Practice
            </h3>

            <div className="grid gap-4">
              {pronunciationChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">{challenge.term}</h4>
                      <p className="text-sm text-gray-600">{challenge.phonetic}</p>
                      <p className="text-sm text-blue-600">{challenge.hindi}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(challenge.term)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Play className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => speakText(challenge.hindi)}
                        className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors"
                      >
                        <Languages className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {session && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  Current Session Analytics
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{session.voiceInteractions}</div>
                    <div className="text-sm text-blue-600">Voice Interactions</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(session.duration / 60000)}m
                    </div>
                    <div className="text-sm text-green-600">Session Duration</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{session.questionsAsked}</div>
                    <div className="text-sm text-purple-600">Questions Asked</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      {session.questionsAsked > 0 ? Math.round((session.correctAnswers / session.questionsAsked) * 100) : 0}%
                    </div>
                    <div className="text-sm text-orange-600">Accuracy</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Language Usage</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">English</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${session.languageMix.english / Math.max(session.voiceInteractions, 1) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 min-w-[3rem]">
                          {session.languageMix.english}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hindi</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${session.languageMix.hindi / Math.max(session.voiceInteractions, 1) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 min-w-[3rem]">
                          {session.languageMix.hindi}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Hinglish</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{
                              width: `${session.languageMix.hinglish / Math.max(session.voiceInteractions, 1) * 100}%`
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 min-w-[3rem]">
                          {session.languageMix.hinglish}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-gray-600" />
                Voice Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={voiceSettings.language}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en-IN">English (India)</option>
                    <option value="hi-IN">Hindi (India)</option>
                    <option value="en-US">English (US)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Voice Type
                  </label>
                  <select
                    value={voiceSettings.voice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="shekhar">Shekhar Sir (AI)</option>
                    <option value="female">Female Voice</option>
                    <option value="male">Male Voice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed: {voiceSettings.speed.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={voiceSettings.speed}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

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
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

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
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pronunciation Style
                  </label>
                  <select
                    value={voiceSettings.pronunciation}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, pronunciation: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="standard">Standard</option>
                    <option value="indian">Indian Accent</option>
                    <option value="hinglish">Hinglish Style</option>
                  </select>
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Auto-detect language</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Biology term emphasis</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2">Noise cancellation</span>
                </label>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Test Voice Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default VoiceIntegrationHub