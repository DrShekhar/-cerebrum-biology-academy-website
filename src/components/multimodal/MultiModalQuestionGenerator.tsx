'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Volume2,
  Image as ImageIcon,
  Video,
  Brain,
  Eye,
  Play,
  Square,
  Download,
  Upload,
  Zap,
  Sparkles,
  BookOpen,
  Target,
  Clock,
  Share2,
  Settings,
  Layers,
} from 'lucide-react'

interface MultiModalQuestion {
  id: string
  type: 'image-based' | 'audio-based' | 'video-based' | 'diagram-based' | 'interactive'
  content: {
    primary: string // Main question text
    media?: {
      type: 'image' | 'audio' | 'video' | 'diagram'
      url: string
      alt?: string
      transcript?: string
      duration?: number
    }
    instructions?: string
    hints?: string[]
  }
  answers: {
    correct: string[]
    options?: string[]
    explanation: string
    audioExplanation?: string
  }
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  marks: number
  estimatedTime: number
  accessibility: {
    audioDescription?: string
    textAlternatives: string[]
    screenReaderFriendly: boolean
  }
  metadata: {
    createdAt: string
    source: 'ai-generated' | 'manual' | 'template'
    biologyTerms: string[]
    learningObjectives: string[]
  }
}

interface GenerationSettings {
  modality: 'image' | 'audio' | 'video' | 'mixed'
  difficulty: 'easy' | 'medium' | 'hard' | 'adaptive'
  topic: string
  questionCount: number
  includeHints: boolean
  includeAudioExplanations: boolean
  accessibility: {
    highContrast: boolean
    largeText: boolean
    audioDescriptions: boolean
    screenReader: boolean
  }
  language: 'english' | 'hindi' | 'hinglish'
}

const MultiModalQuestionGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'library' | 'preview' | 'settings'>(
    'generate'
  )
  const [questions, setQuestions] = useState<MultiModalQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<MultiModalQuestion | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [audioRecording, setAudioRecording] = useState(false)
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [settings, setSettings] = useState<GenerationSettings>({
    modality: 'mixed',
    difficulty: 'adaptive',
    topic: 'Cell Biology',
    questionCount: 5,
    includeHints: true,
    includeAudioExplanations: true,
    accessibility: {
      highContrast: false,
      largeText: false,
      audioDescriptions: true,
      screenReader: true,
    },
    language: 'english',
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  // Available biology topics
  const biologyTopics = [
    'Cell Biology',
    'Genetics',
    'Human Physiology',
    'Plant Physiology',
    'Evolution',
    'Ecology',
    'Reproduction',
    'Biotechnology',
    'Molecular Biology',
    'Anatomy',
    'Taxonomy',
    'Environmental Biology',
  ]

  useEffect(() => {
    generateSampleQuestions()
  }, [])

  const generateSampleQuestions = () => {
    const sampleQuestions: MultiModalQuestion[] = [
      {
        id: 'mmq_1',
        type: 'image-based',
        content: {
          primary:
            'Identify the cellular organelle shown in the diagram and explain its function in cellular respiration.',
          media: {
            type: 'image',
            url: '/biology-images/mitochondria-diagram.jpg',
            alt: 'Cross-sectional diagram of mitochondria showing inner and outer membranes',
          },
          instructions: 'Observe the structural features and identify the organelle.',
          hints: [
            'Look at the double membrane structure',
            'Notice the cristae formations',
            'This is the powerhouse of the cell',
          ],
        },
        answers: {
          correct: ['Mitochondria', 'Mitochondrion'],
          explanation:
            'This is a mitochondrion, the cellular organelle responsible for ATP production through cellular respiration. The inner membrane contains cristae that increase surface area for oxidative phosphorylation.',
          audioExplanation: 'mitochondria-explanation.mp3',
        },
        difficulty: 'medium',
        topic: 'Cell Biology',
        subtopic: 'Cellular Organelles',
        marks: 3,
        estimatedTime: 4,
        accessibility: {
          audioDescription:
            'A cross-sectional diagram showing the double-membrane structure of mitochondria with folded inner membrane called cristae',
          textAlternatives: ['Mitochondria diagram', 'Cellular organelle cross-section'],
          screenReaderFriendly: true,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          source: 'ai-generated',
          biologyTerms: ['mitochondria', 'cristae', 'ATP', 'cellular respiration'],
          learningObjectives: ['Identify cellular organelles', 'Understand mitochondrial function'],
        },
      },
      {
        id: 'mmq_2',
        type: 'audio-based',
        content: {
          primary:
            'Listen to the heartbeat recording and identify the heart rate and any abnormalities.',
          media: {
            type: 'audio',
            url: '/biology-audio/heartbeat-sample.mp3',
            transcript: 'lub-dub, lub-dub, lub-dub (normal heart rhythm at 72 BPM)',
            duration: 15,
          },
          instructions: 'Count the heartbeats and analyze the rhythm.',
          hints: [
            'Normal resting heart rate is 60-100 BPM',
            'Listen for regularity',
            'Count lub-dub as one beat',
          ],
        },
        answers: {
          correct: ['72 BPM', 'Normal rhythm'],
          explanation:
            'The recording shows a normal heart rhythm at approximately 72 beats per minute. The lub-dub sounds represent the closing of heart valves during the cardiac cycle.',
          audioExplanation: 'heartbeat-explanation.mp3',
        },
        difficulty: 'easy',
        topic: 'Human Physiology',
        subtopic: 'Circulatory System',
        marks: 2,
        estimatedTime: 3,
        accessibility: {
          audioDescription: 'Clear heartbeat recording with regular rhythm',
          textAlternatives: ['Heartbeat audio clip', 'Cardiac rhythm recording'],
          screenReaderFriendly: true,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          source: 'ai-generated',
          biologyTerms: ['heart rate', 'cardiac cycle', 'lub-dub'],
          learningObjectives: ['Analyze cardiac rhythms', 'Calculate heart rate'],
        },
      },
      {
        id: 'mmq_3',
        type: 'video-based',
        content: {
          primary: 'Watch the plant movement video and explain the type of tropism demonstrated.',
          media: {
            type: 'video',
            url: '/biology-videos/plant-tropism.mp4',
            duration: 30,
          },
          instructions: 'Observe the direction of plant growth in response to stimuli.',
          hints: [
            'Notice the light source',
            'Observe growth direction',
            'This is a response to environmental stimulus',
          ],
        },
        answers: {
          correct: ['Phototropism', 'Positive phototropism'],
          explanation:
            'The video demonstrates positive phototropism, where the plant grows toward the light source. This is mediated by auxin hormone distribution.',
          audioExplanation: 'phototropism-explanation.mp3',
        },
        difficulty: 'medium',
        topic: 'Plant Physiology',
        subtopic: 'Plant Movements',
        marks: 3,
        estimatedTime: 5,
        accessibility: {
          audioDescription:
            'Time-lapse video showing plant stem bending toward light source over 24 hours',
          textAlternatives: ['Plant movement video', 'Tropism demonstration'],
          screenReaderFriendly: true,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          source: 'ai-generated',
          biologyTerms: ['phototropism', 'auxin', 'plant movement'],
          learningObjectives: ['Understand plant responses', 'Identify types of tropism'],
        },
      },
    ]

    setQuestions(sampleQuestions)
    setCurrentQuestion(sampleQuestions[0])
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      setSelectedFiles(Array.from(files))
    }
  }

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const audioChunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        setRecordedAudio(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setAudioRecording(true)
    } catch (error) {
      console.error('Error starting audio recording:', error)
    }
  }

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setAudioRecording(false)
    }
  }

  const generateQuestions = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Simulate API call to generate questions
    setTimeout(() => {
      const newQuestions = generateQuestionsBasedOnSettings()
      setQuestions((prev) => [...prev, ...newQuestions])
      setGenerationProgress(100)
      setIsGenerating(false)
    }, 5000)
  }

  const generateQuestionsBasedOnSettings = (): MultiModalQuestion[] => {
    // This would integrate with AI service to generate questions
    return [
      {
        id: `mmq_${Date.now()}`,
        type: 'interactive',
        content: {
          primary: 'Drag and drop the organelles to their correct locations in the cell.',
          instructions: 'Use the interactive cell diagram to place organelles correctly.',
          hints: [
            'Nucleus goes in the center',
            'Mitochondria are scattered throughout',
            'ER connects to nucleus',
          ],
        },
        answers: {
          correct: ['All organelles placed correctly'],
          explanation: 'Cell organelles have specific locations that relate to their functions.',
          audioExplanation: 'cell-organelles-explanation.mp3',
        },
        difficulty: settings.difficulty === 'adaptive' ? 'medium' : settings.difficulty,
        topic: settings.topic,
        subtopic: 'Cell Structure',
        marks: 4,
        estimatedTime: 6,
        accessibility: {
          audioDescription: 'Interactive cell diagram with draggable organelles',
          textAlternatives: ['Cell diagram exercise', 'Organelle placement activity'],
          screenReaderFriendly: true,
        },
        metadata: {
          createdAt: new Date().toISOString(),
          source: 'ai-generated',
          biologyTerms: ['cell', 'organelles', 'nucleus', 'mitochondria'],
          learningObjectives: ['Identify cell organelles', 'Understand cellular organization'],
        },
      },
    ]
  }

  const playAudio = (audioUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
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
          <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Multi-Modal Question Generator
          </h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Create engaging biology questions using images, audio, video, and interactive elements.
          Enhanced with AI for personalized learning experiences.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'generate', label: 'Generate', icon: Zap },
            { id: 'library', label: 'Library', icon: BookOpen },
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-purple-600 shadow-md'
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
        {/* Generate Tab */}
        {activeTab === 'generate' && (
          <motion.div
            key="generate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Generation Controls */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Question Generation
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Type
                    </label>
                    <select
                      value={settings.modality}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, modality: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="image">Image-Based</option>
                      <option value="audio">Audio-Based</option>
                      <option value="video">Video-Based</option>
                      <option value="mixed">Mixed Media</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Biology Topic
                    </label>
                    <select
                      value={settings.topic}
                      onChange={(e) => setSettings((prev) => ({ ...prev, topic: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {biologyTopics.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={settings.difficulty}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, difficulty: e.target.value as any }))
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="adaptive">Adaptive</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions: {settings.questionCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={settings.questionCount}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          questionCount: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.includeHints}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, includeHints: e.target.checked }))
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm">Include hints</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.includeAudioExplanations}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            includeAudioExplanations: e.target.checked,
                          }))
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm">Include audio explanations</span>
                    </label>
                  </div>

                  <button
                    onClick={generateQuestions}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Questions
                      </>
                    )}
                  </button>

                  {isGenerating && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Generation Progress</span>
                        <span>{generationProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${generationProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Media Upload */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Media Upload
                </h3>

                <div className="space-y-4">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*,audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-gray-600">Upload Images, Videos, or Audio</span>
                      <span className="text-xs text-gray-400">
                        Drag & drop files here or click to browse
                      </span>
                    </button>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          {file.type.startsWith('image/') && (
                            <ImageIcon className="w-4 h-4 text-green-600" />
                          )}
                          {file.type.startsWith('video/') && (
                            <Video className="w-4 h-4 text-blue-600" />
                          )}
                          {file.type.startsWith('audio/') && (
                            <Volume2 className="w-4 h-4 text-purple-600" />
                          )}
                          <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Audio Recording */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Record Audio</h4>
                    <div className="flex items-center gap-3">
                      {!audioRecording ? (
                        <button
                          onClick={startAudioRecording}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <Mic className="w-4 h-4" />
                          Start Recording
                        </button>
                      ) : (
                        <button
                          onClick={stopAudioRecording}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Square className="w-4 h-4" />
                          Stop Recording
                        </button>
                      )}

                      {recordedAudio && (
                        <button
                          onClick={() => {
                            const url = URL.createObjectURL(recordedAudio)
                            playAudio(url)
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Play Recording
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Live Preview
              </h3>

              {currentQuestion ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {currentQuestion.type}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {currentQuestion.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{currentQuestion.marks} marks</span>
                    </div>
                    <p className="text-gray-800 font-medium">{currentQuestion.content.primary}</p>
                  </div>

                  {currentQuestion.content.media && (
                    <div className="bg-gray-100 rounded-lg p-4">
                      {currentQuestion.content.media.type === 'image' && (
                        <div className="text-center">
                          <ImageIcon className="w-24 h-24 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            {currentQuestion.content.media.alt}
                          </p>
                        </div>
                      )}
                      {currentQuestion.content.media.type === 'audio' && (
                        <div className="text-center">
                          <Volume2 className="w-24 h-24 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Audio Duration: {currentQuestion.content.media.duration}s
                          </p>
                          <button
                            onClick={() =>
                              currentQuestion.content.media?.url &&
                              playAudio(currentQuestion.content.media.url)
                            }
                            className="mt-2 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            Play Audio
                          </button>
                        </div>
                      )}
                      {currentQuestion.content.media.type === 'video' && (
                        <div className="text-center">
                          <Video className="w-24 h-24 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            Video Duration: {currentQuestion.content.media.duration}s
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {currentQuestion.content.hints && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-yellow-800 mb-2">Hints:</h4>
                      <ul className="space-y-1">
                        {currentQuestion.content.hints.map((hint, index) => (
                          <li key={index} className="text-sm text-yellow-700">
                            • {hint}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-green-800 mb-2">
                      Answer & Explanation:
                    </h4>
                    <p className="text-sm text-green-700 mb-2">
                      <strong>Correct Answer:</strong> {currentQuestion.answers.correct.join(', ')}
                    </p>
                    <p className="text-sm text-green-700">{currentQuestion.answers.explanation}</p>
                    {currentQuestion.answers.audioExplanation && (
                      <button
                        onClick={() =>
                          currentQuestion.answers.audioExplanation &&
                          playAudio(`/audio/${currentQuestion.answers.audioExplanation}`)
                        }
                        className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                      >
                        <Volume2 className="w-3 h-3" />
                        Audio Explanation
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Generate questions to see preview</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
          <motion.div
            key="library"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Question Library ({questions.length} questions)
              </h3>

              <div className="grid gap-4">
                {questions.map((question) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setCurrentQuestion(question)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                            {question.type}
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            {question.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{question.topic}</span>
                        </div>
                        <p className="text-gray-800 font-medium line-clamp-2 mb-2">
                          {question.content.primary}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {question.marks} marks
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {question.estimatedTime} min
                          </span>
                          {question.content.media && (
                            <span className="flex items-center gap-1">
                              {question.content.media.type === 'image' && (
                                <ImageIcon className="w-4 h-4" />
                              )}
                              {question.content.media.type === 'audio' && (
                                <Volume2 className="w-4 h-4" />
                              )}
                              {question.content.media.type === 'video' && (
                                <Video className="w-4 h-4" />
                              )}
                              {question.content.media.type}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
                <Settings className="w-5 h-5 text-gray-600" />
                Accessibility Settings
              </h3>

              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.accessibility.highContrast}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        accessibility: { ...prev.accessibility, highContrast: e.target.checked },
                      }))
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">High contrast mode</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.accessibility.largeText}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        accessibility: { ...prev.accessibility, largeText: e.target.checked },
                      }))
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">Large text</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.accessibility.audioDescriptions}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        accessibility: {
                          ...prev.accessibility,
                          audioDescriptions: e.target.checked,
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">Audio descriptions</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.accessibility.screenReader}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        accessibility: { ...prev.accessibility, screenReader: e.target.checked },
                      }))
                    }
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">Screen reader optimization</span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, language: e.target.value as any }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="hinglish">Hinglish</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">AI Model Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Complexity
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option>Beginner Friendly</option>
                    <option>Standard</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Creativity Level
                  </label>
                  <input type="range" min="1" max="10" defaultValue="7" className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Conservative</span>
                    <span>Creative</span>
                  </div>
                </div>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">Include real-world applications</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2">NEET exam alignment</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  )
}

export default MultiModalQuestionGenerator
