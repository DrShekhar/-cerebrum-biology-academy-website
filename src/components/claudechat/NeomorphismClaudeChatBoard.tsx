'use client'

import React, { useState, useRef, useEffect } from 'react'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import { Send, Mic, MicOff, Image as ImageIcon, Brain, Volume2, VolumeX } from 'lucide-react'
import { useShekharVoice } from '@/hooks/useShekharVoice'

interface Message {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
  hasVoice?: boolean
  hasImage?: boolean
  language?: 'hindi' | 'english' | 'hinglish' | 'auto'
}

const NeomorphismClaudeChatBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'नमस्कार! मैं Shekhar Sir हूं। आज हम Biology का कौन सा topic पढ़ेंगे?',
      type: 'ai',
      timestamp: new Date(),
      hasVoice: true,
      language: 'hindi',
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<
    'hindi' | 'english' | 'hinglish' | 'auto'
  >('auto')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { speak, stop, isSpeaking, isVoiceAvailable } = useShekharVoice({
    language: selectedLanguage,
    onSpeakStart: () => console.log('AI speaking...'),
    onSpeakEnd: () => console.log('AI finished speaking'),
    onSpeakError: (error) => console.error('Voice error:', error),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    setInputMessage('')
    setIsThinking(true)

    setTimeout(async () => {
      const aiResponse = generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse.content,
        type: 'ai',
        timestamp: new Date(),
        hasVoice: true,
        language: aiResponse.language,
      }

      setMessages((prev) => [...prev, aiMessage].slice(-MAX_MESSAGES))
      setIsThinking(false)

      if (isVoiceAvailable) {
        await speak(aiResponse.content)
      }
    }, 1500)
  }

  const generateAIResponse = (
    userInput: string
  ): { content: string; language: 'hindi' | 'english' | 'hinglish' } => {
    const input = userInput.toLowerCase()

    if (input.includes('cell') || input.includes('कोशिका')) {
      return {
        content:
          'Cell division एक fascinating process है! Mitosis में एक cell से दो identical daughter cells बनती हैं। यह growth और repair के लिए जरूरी है। क्या आप specific phase के बारे में जानना चाहते हैं?',
        language: 'hinglish',
      }
    }

    if (input.includes('photosynthesis') || input.includes('प्रकाश संश्लेषण')) {
      return {
        content:
          'Photosynthesis वो magical process है जिससे plants light energy को chemical energy में convert करते हैं। 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂। Chloroplast में ये process होता है।',
        language: 'hinglish',
      }
    }

    if (input.includes('dna') || input.includes('डीएनए')) {
      return {
        content:
          'DNA की structure double helix है! Watson और Crick ने 1953 में इसकी खोज की थी। Four bases होते हैं - A, T, G, C। Base pairing rules: A-T और G-C। यह genetic information store करता है।',
        language: 'hinglish',
      }
    }

    if (input.includes('neet') || input.includes('नीट')) {
      return {
        content:
          'NEET में Biology के 360 marks हैं total 720 में से। Plant Kingdom, Animal Kingdom, Human Physiology, Genetics - ये main topics हैं। Daily practice और conceptual clarity जरूरी है!',
        language: 'hinglish',
      }
    }

    return {
      content:
        'यह एक बहुत अच्छा सवाल है! Biology में हर concept interconnected होता है। क्या आप मुझे बता सकते हैं कि आप specifically किस topic के बारे में जानना चाहते हैं? Main subjects हैं: Botany, Zoology, Genetics, Evolution, Ecology।',
      language: 'hinglish',
    }
  }

  const handleVoiceToggle = async (message: Message) => {
    if (isSpeaking) {
      stop()
    } else {
      await speak(message.content)
    }
  }

  const quickTopics = [
    { icon: '🧬', title: 'DNA Structure', query: 'Tell me about DNA structure' },
    { icon: '🌱', title: 'Photosynthesis', query: 'Explain photosynthesis process' },
    { icon: '🔬', title: 'Cell Division', query: 'How does cell division work?' },
    { icon: '🧬', title: 'Genetics', query: 'Genetics fundamentals for NEET' },
    { icon: '🌿', title: 'Plant Kingdom', query: 'Plant classification and structure' },
    { icon: '🐛', title: 'Animal Kingdom', query: 'Animal classification system' },
  ]

  // Neomorphism styles as CSS-in-JS
  const neomorphStyles = {
    shadowNeomorph: {
      boxShadow: '8px 8px 16px rgba(174, 174, 192, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)',
    },
    shadowNeomorphInset: {
      boxShadow:
        'inset 4px 4px 8px rgba(174, 174, 192, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
    },
    shadowNeomorphPressed: {
      boxShadow:
        'inset 2px 2px 6px rgba(174, 174, 192, 0.2), inset -2px -2px 6px rgba(255, 255, 255, 0.5)',
    },
    shadowNeomorphSoft: {
      boxShadow: '6px 6px 12px rgba(174, 174, 192, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.9)',
    },
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="bg-gray-100 rounded-b-3xl p-4 border-b border-gray-200/50 animate-fadeInUp"
        style={neomorphStyles.shadowNeomorph}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center animate-fadeInUp"
              style={neomorphStyles.shadowNeomorphInset}
            >
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ClaudeChat Board</h1>
              <p className="text-sm text-gray-600">AI-Powered Biology Learning with Shekhar Sir</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="bg-gray-100 border-none rounded-xl px-3 py-2 text-sm shadow-neomorph-inset focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="auto">Auto</option>
              <option value="hindi">हिंदी</option>
              <option value="english">English</option>
              <option value="hinglish">Hinglish</option>
            </select>

            {/* Voice Status */}
            <div
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl shadow-neomorph ${
                isVoiceAvailable ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              {isVoiceAvailable ? (
                <Volume2 className="w-4 h-4 text-green-600" />
              ) : (
                <VolumeX className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-xs font-medium ${
                  isVoiceAvailable ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {isVoiceAvailable ? 'Voice Ready' : 'Voice Off'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Topics */}
        <div
          className="mt-4 flex flex-wrap gap-2 max-w-6xl mx-auto animate-fadeInUp"
        >
          {quickTopics.map((topic, index) => (
            <button
              key={index}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-xl shadow-neomorph hover:shadow-neomorph-pressed text-sm text-gray-700 transition-all duration-200 animate-fadeInUp"
              onClick={() => setInputMessage(topic.query)}
            >
              <span>{topic.icon}</span>
              <span className="font-medium">{topic.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
{messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                      message.type === 'user' ? 'order-2' : 'order-1'
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl shadow-neomorph ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>

                      {message.hasVoice && message.type === 'ai' && (
                        <button
                          className="mt-3 flex items-center space-x-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors animate-fadeInUp"
                          onClick={() => handleVoiceToggle(message)}
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-3 h-3" />
                          ) : (
                            <Volume2 className="w-3 h-3" />
                          )}
                          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </button>
                      )}
                    </div>

                    <p
                      className={`text-xs text-gray-500 mt-1 ${
                        message.type === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full shadow-neomorph flex items-center justify-center text-xs font-bold ${
                      message.type === 'user'
                        ? 'order-1 mr-3 bg-gradient-to-br from-green-400 to-green-700 text-white'
                        : 'order-2 ml-3 bg-blue-500 text-white'
                    }`}
                  >
                    {message.type === 'user' ? '👨‍🎓' : '👨‍🏫'}
                  </div>
                </div>
              ))}
{/* Thinking Indicator */}
{isThinking && (
                <div
                  className="flex justify-start animate-fadeInUp"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 shadow-neomorph flex items-center justify-center">
                      <span className="text-xs">👨‍🏫</span>
                    </div>
                    <div
                      className="bg-gray-100 p-4 rounded-2xl shadow-neomorph flex items-center space-x-2 animate-fadeInUp"
                    >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-blue-400 rounded-full animate-fadeInUp"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">Shekhar Sir is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
<div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="bg-gray-100 rounded-2xl p-4 shadow-neomorph animate-fadeInUp"
          >
            <div className="flex items-end space-x-3">
              {/* Attachments */}
              <div className="flex space-x-2">
                <button
                  className="w-10 h-10 bg-gray-100 rounded-xl shadow-neomorph-inset flex items-center justify-center text-gray-600 hover:text-blue-500 transition-colors animate-fadeInUp"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <button
                  className="w-10 h-10 bg-gray-100 rounded-xl shadow-neomorph-inset flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors animate-fadeInUp"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5 text-red-500" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Text Input */}
              <div className="flex-1 bg-white rounded-xl shadow-neomorph-inset p-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask anything about Biology in Hindi, English, or Hinglish..."
                  className="w-full bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 px-2 py-1"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
              </div>

              {/* Send Button */}
              <button
                className={`w-12 h-12 rounded-xl shadow-neomorph flex items-center justify-center transition-all duration-200 ${
                  inputMessage.trim()
                    ? 'bg-blue-500 text-white shadow-neomorph-pressed'
                    : 'bg-gray-100 text-gray-400'
                }`}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Voice Recording Indicator */}
{isRecording && (
                <div
                  className="mt-3 flex items-center justify-center space-x-2 text-red-500 animate-fadeInUp"
                >
                  <div
                    className="w-2 h-2 bg-red-500 rounded-full animate-fadeInUp"
                  />
                  <span className="text-sm font-medium">
                    Recording... Speak in Hindi, English, or Hinglish
                  </span>
                </div>
              )}
</div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            console.log('Image selected:', file.name)
          }
        }}
      />
    </div>
  )
}

export default NeomorphismClaudeChatBoard
