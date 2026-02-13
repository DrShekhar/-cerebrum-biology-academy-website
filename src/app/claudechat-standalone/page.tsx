'use client'

import React, { useState, useRef, useEffect } from 'react'
interface Message {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
  hasVoice?: boolean
  hasImage?: boolean
  language?: 'hindi' | 'english' | 'hinglish' | 'auto'
}

export default function ClaudeChatStandalone() {
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

  const neomorphStyles = {
    shadowNeomorph: {
      boxShadow: '8px 8px 16px rgba(174, 174, 192, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.8)',
    },
    shadowNeomorphInset: {
      boxShadow:
        'inset 4px 4px 8px rgba(174, 174, 192, 0.3), inset -4px -4px 8px rgba(255, 255, 255, 0.7)',
    },
    shadowNeomorphSoft: {
      boxShadow: '6px 6px 12px rgba(174, 174, 192, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.9)',
    },
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      type: 'user',
      timestamp: new Date(),
      language: selectedLanguage,
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
    setIsThinking(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        type: 'ai',
        timestamp: new Date(),
        hasVoice: true,
        language: selectedLanguage === 'auto' ? 'hinglish' : selectedLanguage,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsThinking(false)
    }, 2000)
  }

  const getAIResponse = (message: string): string => {
    const responses = [
      'यह एक बहुत अच्छा सवाल है! Let me explain this biology concept step by step.',
      'मुझे खुशी है कि आपने यह पूछा। This topic is fundamental to understanding life processes.',
      "Great question! यह NEET में बहुत important topic है। Let's break it down.",
      'Perfect! मैं आपको इसे detail में समझाता हूं। This will help you in your exam preparation.',
      'Excellent thinking! यह concept आपको cells and tissues को समझने में help करेगा।',
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoicePlayback = (content: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content)
      utterance.lang = language === 'hindi' ? 'hi-IN' : 'en-IN'
      utterance.rate = 0.9
      utterance.pitch = 1.1
      speechSynthesis.speak(utterance)
    }
  }

  const startVoiceRecording = () => {
    setIsRecording(true)
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false)
      setInputMessage('मुझे photosynthesis के बारे में बताइए')
    }, 3000)
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Header */}
      <div
        className="p-6 text-center animate-fadeInUp"
        style={neomorphStyles.shadowNeomorphSoft}
      >
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(145deg, #667eea 0%, #764ba2 100%)',
              ...neomorphStyles.shadowNeomorph,
            }}
          >
            <span className="text-3xl">🤖</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">ClaudeChat Board</h1>
            <p className="text-gray-600">AI-Powered Biology Learning with Shekhar Sir</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center space-x-2">
          {['auto', 'hindi', 'english', 'hinglish'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLanguage === lang ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
              style={selectedLanguage === lang ? {} : neomorphStyles.shadowNeomorphSoft}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-6">
        <div
          className="h-96 overflow-y-auto p-6 mb-6 rounded-3xl"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f0f0f3)',
            ...neomorphStyles.shadowNeomorphInset,
          }}
        >
{messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === 'user' ? 'text-white' : 'text-gray-800'
                  }`}
                  style={{
                    background:
                      message.type === 'user'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
                    ...neomorphStyles.shadowNeomorphSoft,
                  }}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.hasVoice && message.type === 'ai' && (
                      <button
                        onClick={() =>
                          handleVoicePlayback(message.content, message.language || 'english')
                        }
                        className="text-xs px-2 py-1 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      >
                        🔊 Play
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
{isThinking && (
            <div
              className="mb-4 flex justify-start animate-fadeInUp"
            >
              <div
                className="px-4 py-3 rounded-2xl text-gray-800"
                style={{
                  background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
                  ...neomorphStyles.shadowNeomorphSoft,
                }}
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className="flex space-x-4 p-4 rounded-2xl"
          style={{
            background: 'linear-gradient(145deg, #ffffff, #f0f0f3)',
            ...neomorphStyles.shadowNeomorph,
          }}
        >
          <div className="flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your biology question in Hindi, English, or Hinglish..."
              className="w-full px-4 py-3 rounded-xl border-none outline-none text-gray-800 placeholder-gray-500"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                ...neomorphStyles.shadowNeomorphInset,
              }}
            />
          </div>

          <button
            onClick={startVoiceRecording}
            disabled={isRecording}
            className={`p-3 rounded-xl transition-all ${isRecording ? 'animate-pulse' : ''}`}
            style={{
              background: isRecording
                ? 'linear-gradient(145deg, #ef4444, #dc2626)'
                : 'linear-gradient(145deg, #3b82f6, #2563eb)',
              color: 'white',
              ...neomorphStyles.shadowNeomorph,
            }}
          >
            🎤
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isThinking}
            className="p-3 rounded-xl text-white transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(145deg, #10b981, #059669)',
              ...neomorphStyles.shadowNeomorph,
            }}
          >
            📤
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Voice Recognition', desc: 'Speak in Hindi/English/Hinglish', icon: '🎤' },
            { title: 'Shekhar Sir Voice', desc: 'AI voice synthesis technology', icon: '🗣️' },
            { title: 'Image Analysis', desc: 'Upload biology diagrams', icon: '📷' },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl text-center animate-fadeInUp"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #f0f0f3)',
                ...neomorphStyles.shadowNeomorphSoft,
              }}
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
