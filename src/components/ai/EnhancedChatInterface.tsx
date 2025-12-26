'use client'

import React, { useState, useRef } from 'react'
import {
  Brain,
  X,
  Send,
  Camera,
  Mic,
  MicOff,
  Image as ImageIcon,
  FileText,
  Volume2,
} from 'lucide-react'
import { useToast } from '@/components/ui/Toast'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  type?: 'text' | 'image' | 'voice' | 'explanation' | 'recommendation'
  imageUrl?: string
  audioUrl?: string
  analysis?: any
}

interface EnhancedChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
  onSendMessage: (message: string, type?: 'text' | 'image' | 'voice', file?: File) => void
  isLoading: boolean
}

export function EnhancedChatInterface({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isLoading,
}: EnhancedChatInterfaceProps) {
  const { showToast } = useToast()
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onSendMessage(`Uploaded image: ${file.name}`, 'image', file)
      setShowImageUpload(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioFile = new File([audioBlob], 'voice-question.wav', { type: 'audio/wav' })
        onSendMessage('Voice question recorded', 'voice', audioFile)

        // Cleanup
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting recording:', error)
      showToast(
        'error',
        'Microphone Access Denied',
        'Could not access microphone. Please check your browser permissions.'
      )
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playAudio = (audioUrl: string, messageId: string) => {
    if (playingAudio === messageId) {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      setPlayingAudio(null)
    } else {
      // Play new audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setPlayingAudio(messageId)

        audioRef.current.onended = () => {
          setPlayingAudio(null)
        }
      }
    }
  }

  if (!isOpen) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Biology Tutor</h2>
        <p className="text-gray-600 mb-8">
          Get instant help with text, images, and voice questions
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-blue-700">Text Questions</span>
          </div>
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
            <ImageIcon className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">Image Analysis</span>
          </div>
          <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
            <Mic className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">Voice Doubts</span>
          </div>
        </div>
        <button
          onClick={() => onSendMessage('start')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          Start Conversation
        </button>
      </div>
    )
  }

  return (
    <div className="h-[600px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Ceri AI</h3>
            <p className="text-sm text-green-600">● Online • Text • Image • Voice</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : message.type === 'recommendation'
                    ? 'bg-gradient-to-r from-green-100 to-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-800'
              }`}
            >
              {/* Image Display */}
              {message.imageUrl && (
                <img
                  src={message.imageUrl}
                  alt="Uploaded biology image"
                  className="w-full rounded-lg mb-2 max-w-xs"
                />
              )}

              {/* Voice Message Indicator */}
              {message.type === 'voice' && (
                <div className="flex items-center space-x-2 mb-2">
                  <Mic className="w-4 h-4" />
                  <span className="text-sm">Voice Question</span>
                </div>
              )}

              {/* Message Text */}
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>

              {/* Audio Response */}
              {message.audioUrl && (
                <button
                  onClick={() => playAudio(message.audioUrl!, message.id)}
                  className="flex items-center space-x-2 mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-xs">
                    {playingAudio === message.id ? 'Stop Audio' : 'Play Response'}
                  </span>
                </button>
              )}

              {/* Image Analysis Results */}
              {message.analysis && (
                <div className="mt-2 space-y-2">
                  {message.analysis.identification && (
                    <div className="text-xs bg-blue-50 p-2 rounded">
                      <strong>Identified:</strong> {message.analysis.identification}
                    </div>
                  )}
                  {message.analysis.key_points && message.analysis.key_points.length > 0 && (
                    <div className="text-xs bg-yellow-50 p-2 rounded">
                      <strong>Key Points:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {message.analysis.key_points.slice(0, 3).map((point: string, i: number) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <p
                className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Input Area */}
      <div className="pt-4 border-t border-gray-200 space-y-3">
        {/* Input Type Selector */}
        <div className="flex space-x-2">
          <button
            onClick={() => setShowImageUpload(!showImageUpload)}
            className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm">Image</span>
          </button>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
              isRecording
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span className="text-sm">{isRecording ? 'Stop' : 'Voice'}</span>
          </button>
        </div>

        {/* Image Upload Area */}
        {showImageUpload && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
            >
              <div className="flex flex-col items-center space-y-2">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Upload biology image for analysis</span>
                <span className="text-xs text-gray-500">
                  Supports: diagrams, microscopy, specimens
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Text Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Biology..."
            disabled={isLoading || isRecording}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 text-gray-900 placeholder:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isRecording}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-2 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hidden audio element for playing responses */}
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}
