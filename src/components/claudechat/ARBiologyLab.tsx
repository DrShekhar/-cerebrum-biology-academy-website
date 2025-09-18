/**
 * AR Biology Lab - Revolutionary AR-powered Biology learning experience
 * Point camera at any object → See Biology concepts overlay
 */

'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Camera, Upload, Scan, Play, Pause, Volume2, VolumeX, RotateCcw, Zap } from 'lucide-react'

interface AROverlay {
  id: string
  position: { x: number; y: number }
  content: string
  type: '3d-model' | 'label' | 'animation' | 'interaction'
  confidence: number
}

interface BiologyDetection {
  concept: string
  confidence: number
  description: string
  neetRelevance: string
  overlays: AROverlay[]
}

interface ARBiologyLabProps {
  onDetection?: (detection: BiologyDetection) => void
  onVoiceExplanation?: (audioUrl: string) => void
}

export function ARBiologyLab({ onDetection, onVoiceExplanation }: ARBiologyLabProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isActive, setIsActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [detections, setDetections] = useState<BiologyDetection[]>([])
  const [currentDetection, setCurrentDetection] = useState<BiologyDetection | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // Initialize camera
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Back camera for better object detection
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }

      setStream(mediaStream)
      setIsActive(true)

      // Start real-time detection
      startRealTimeDetection()
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Please allow camera access to use AR Biology Lab')
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsActive(false)
    setDetections([])
    setCurrentDetection(null)
  }, [stream])

  // Real-time biology detection
  const startRealTimeDetection = useCallback(() => {
    const detectInterval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current || isProcessing) return

      await captureAndAnalyze()
    }, 2000) // Analyze every 2 seconds

    return () => clearInterval(detectInterval)
  }, [isProcessing])

  // Capture frame and analyze
  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsProcessing(true)

    try {
      const canvas = canvasRef.current
      const video = videoRef.current
      const ctx = canvas.getContext('2d')

      if (!ctx) return

      // Set canvas size to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert to blob for analysis
      canvas.toBlob(
        async (blob) => {
          if (!blob) return

          const detection = await analyzeBiologyImage(blob)
          if (detection) {
            setDetections((prev) => [detection, ...prev.slice(0, 4)]) // Keep last 5 detections
            setCurrentDetection(detection)

            // Trigger voice explanation
            if (!isMuted) {
              await generateVoiceExplanation(detection)
            }

            onDetection?.(detection)
          }
        },
        'image/jpeg',
        0.8
      )
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Analyze biology image using AI
  const analyzeBiologyImage = async (imageBlob: Blob): Promise<BiologyDetection | null> => {
    try {
      const formData = new FormData()
      formData.append('image', imageBlob)

      const response = await fetch('/api/claudechat/analyze-biology-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) return null

      const analysis = await response.json()

      // Mock sophisticated biology detection
      const mockDetections: BiologyDetection[] = [
        {
          concept: 'Human Heart',
          confidence: 0.92,
          description: 'A four-chambered muscular organ that pumps blood throughout the body',
          neetRelevance:
            'High-yield topic: Cardiac cycle, Blood circulation, Heart anatomy (5-8 marks)',
          overlays: [
            {
              id: '1',
              position: { x: 100, y: 150 },
              content: 'Right Atrium',
              type: 'label',
              confidence: 0.95,
            },
            {
              id: '2',
              position: { x: 200, y: 150 },
              content: 'Left Ventricle',
              type: 'label',
              confidence: 0.9,
            },
          ],
        },
        {
          concept: 'Plant Cell',
          confidence: 0.88,
          description:
            'Basic structural unit of plants with cell wall, chloroplasts, and large vacuole',
          neetRelevance:
            'Fundamental topic: Cell structure, Photosynthesis, Plant anatomy (8-12 marks)',
          overlays: [
            {
              id: '3',
              position: { x: 150, y: 100 },
              content: 'Chloroplast',
              type: 'label',
              confidence: 0.87,
            },
          ],
        },
      ]

      // Return random detection for demo
      return mockDetections[Math.floor(Math.random() * mockDetections.length)]
    } catch (error) {
      console.error('Biology analysis failed:', error)
      return null
    }
  }

  // Generate voice explanation
  const generateVoiceExplanation = async (detection: BiologyDetection) => {
    try {
      setIsSpeaking(true)

      const response = await fetch('/api/claudechat/voice-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: detection.concept,
          description: detection.description,
          neetRelevance: detection.neetRelevance,
          voice: 'shekhar-sir',
          language: 'english',
          emotion: 'explaining',
        }),
      })

      const { audioUrl } = await response.json()

      // Play audio explanation
      const audio = new Audio(audioUrl)
      audio.play()

      audio.onended = () => setIsSpeaking(false)
      onVoiceExplanation?.(audioUrl)
    } catch (error) {
      console.error('Voice generation failed:', error)
      setIsSpeaking(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)

    try {
      const detection = await analyzeBiologyImage(file)
      if (detection) {
        setCurrentDetection(detection)
        if (!isMuted) {
          await generateVoiceExplanation(detection)
        }
        onDetection?.(detection)
      }
    } catch (error) {
      console.error('File analysis failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Reset detection
  const resetDetection = () => {
    setDetections([])
    setCurrentDetection(null)
  }

  return (
    <div className="ar-biology-lab bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">🔬 AR Biology Lab</h2>
            <p className="opacity-90">Point camera at any object → See Biology concepts</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={resetDetection}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera/Upload Section */}
          <div className="space-y-4">
            {/* Camera View */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* AR Overlays */}
              {currentDetection &&
                currentDetection.overlays.map((overlay) => (
                  <div
                    key={overlay.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${overlay.position.x}px`,
                      top: `${overlay.position.y}px`,
                    }}
                  >
                    <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium shadow-lg border-2 border-yellow-300 animate-pulse">
                      {overlay.content}
                      <div className="text-xs opacity-75">
                        {Math.round(overlay.confidence * 100)}% confident
                      </div>
                    </div>
                  </div>
                ))}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-white rounded-lg px-4 py-2 flex items-center space-x-2">
                    <Scan className="w-5 h-5 text-blue-600 animate-spin" />
                    <span className="text-gray-700">Analyzing Biology...</span>
                  </div>
                </div>
              )}

              {/* Speaking Indicator */}
              {isSpeaking && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span>Shekhar Sir Speaking...</span>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!isActive ? (
                <button
                  onClick={startCamera}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start AR Lab</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                >
                  <Pause className="w-5 h-5" />
                  <span>Stop Camera</span>
                </button>
              )}

              <label className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 cursor-pointer transition-colors">
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Detection Results */}
          <div className="space-y-4">
            {currentDetection ? (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      🎯 {currentDetection.concept}
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {Math.round(currentDetection.confidence * 100)}% confident
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">📚 Description</h4>
                    <p className="text-gray-700">{currentDetection.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">🎯 NEET Relevance</h4>
                    <p className="text-blue-700 bg-blue-50 p-3 rounded-lg">
                      {currentDetection.neetRelevance}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => generateVoiceExplanation(currentDetection)}
                      disabled={isSpeaking}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isSpeaking ? 'Speaking...' : 'Hear Explanation'}</span>
                    </button>
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      View 3D Model
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready for Biology Detection
                </h3>
                <p className="text-gray-600">
                  Start the camera or upload an image to see AI-powered biology insights
                </p>
              </div>
            )}

            {/* Recent Detections */}
            {detections.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="font-medium text-gray-900 mb-3">📖 Recent Detections</h4>
                <div className="space-y-2">
                  {detections.slice(0, 3).map((detection, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={() => setCurrentDetection(detection)}
                    >
                      <span className="text-sm text-gray-700">{detection.concept}</span>
                      <span className="text-xs text-gray-500">
                        {Math.round(detection.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ARBiologyLab
