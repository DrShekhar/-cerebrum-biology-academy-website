'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo, useDragControls } from 'framer-motion'
import {
  Smartphone,
  Tablet,
  Monitor,
  TouchpadIcon as Touch,
  Mic,
  Camera,
  Volume2,
  VolumeX,
  Vibrate,
  RotateCw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Settings,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Heart,
  Share2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Battery,
  Wifi,
  Signal,
  Navigation,
  Compass,
  MapPin,
  Activity,
  TrendingUp,
  Target,
  BookOpen,
  Brain,
  Layers,
  Headphones,
  MessageSquare,
  HelpCircle,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Star,
  Users,
  Clock
} from 'lucide-react'

interface DeviceSpecs {
  screenSize: 'small' | 'medium' | 'large'
  orientation: 'portrait' | 'landscape'
  dpi: number
  touchSupport: boolean
  connectionSpeed: 'slow' | 'medium' | 'fast'
  batteryLevel: number
  isOnline: boolean
}

interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch' | 'rotate'
  coordinates: { x: number; y: number }
  direction?: 'up' | 'down' | 'left' | 'right'
  velocity?: number
  scale?: number
  rotation?: number
}

interface MultimodalContent {
  id: string
  title: string
  type: 'lesson' | 'quiz' | 'diagram' | 'simulation'
  mobileOptimized: {
    layout: 'stack' | 'tabs' | 'carousel' | 'accordion'
    gestures: TouchGesture['type'][]
    offlineCapable: boolean
    adaptiveQuality: boolean
  }
  content: {
    text?: string
    audio?: string
    video?: string
    images?: string[]
    interactive?: any
  }
  accessibility: {
    voiceOver: string
    hapticFeedback: boolean
    highContrast: boolean
    largeTouch: boolean
  }
}

interface MobileSession {
  id: string
  startTime: number
  deviceInfo: DeviceSpecs
  interactions: TouchGesture[]
  contentViewed: string[]
  performance: {
    loadTimes: number[]
    gestureAccuracy: number
    completionRate: number
  }
}

const MobileMultimodalInterface: React.FC = () => {
  const [deviceSpecs, setDeviceSpecs] = useState<DeviceSpecs | null>(null)
  const [currentContent, setCurrentContent] = useState<MultimodalContent | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [gestureMode, setGestureMode] = useState<'navigation' | 'interaction' | 'accessibility'>('navigation')
  const [activeGestures, setActiveGestures] = useState<TouchGesture[]>([])
  const [adaptiveQuality, setAdaptiveQuality] = useState<'low' | 'medium' | 'high'>('medium')
  const [offlineMode, setOfflineMode] = useState(false)
  const [hapticEnabled, setHapticEnabled] = useState(true)
  const [voiceControlActive, setVoiceControlActive] = useState(false)
  const [mobileSession, setMobileSession] = useState<MobileSession | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const dragControls = useDragControls()

  // Sample mobile-optimized content
  const mobileContent: MultimodalContent[] = [
    {
      id: 'cell-mobile-lesson',
      title: 'Cell Structure (Mobile)',
      type: 'lesson',
      mobileOptimized: {
        layout: 'stack',
        gestures: ['tap', 'swipe', 'pinch'],
        offlineCapable: true,
        adaptiveQuality: true
      },
      content: {
        text: 'Explore the fascinating world of cellular biology through interactive mobile experience',
        audio: '/mobile-audio/cell-intro.mp3',
        images: ['/mobile-images/cell-1.webp', '/mobile-images/cell-2.webp'],
        interactive: { type: 'swipeable-cards', count: 8 }
      },
      accessibility: {
        voiceOver: 'Interactive cell biology lesson with swipeable cards and zoom functionality',
        hapticFeedback: true,
        highContrast: true,
        largeTouch: true
      }
    },
    {
      id: 'dna-mobile-quiz',
      title: 'DNA Quiz (Touch)',
      type: 'quiz',
      mobileOptimized: {
        layout: 'tabs',
        gestures: ['tap', 'double-tap', 'long-press'],
        offlineCapable: true,
        adaptiveQuality: false
      },
      content: {
        text: 'Test your DNA knowledge with touch-optimized questions',
        interactive: { type: 'touch-quiz', questions: 10 }
      },
      accessibility: {
        voiceOver: 'DNA knowledge quiz with large touch targets and audio feedback',
        hapticFeedback: true,
        highContrast: true,
        largeTouch: true
      }
    },
    {
      id: 'heart-mobile-diagram',
      title: 'Heart Anatomy (AR)',
      type: 'diagram',
      mobileOptimized: {
        layout: 'carousel',
        gestures: ['tap', 'pinch', 'rotate', 'swipe'],
        offlineCapable: false,
        adaptiveQuality: true
      },
      content: {
        video: '/mobile-video/heart-ar.mp4',
        interactive: { type: 'ar-diagram', complexity: 'high' }
      },
      accessibility: {
        voiceOver: 'Interactive 3D heart anatomy with AR capabilities and gesture controls',
        hapticFeedback: true,
        highContrast: false,
        largeTouch: true
      }
    }
  ]

  useEffect(() => {
    detectDeviceSpecs()
    startMobileSession()
    setupGestureListeners()
    return () => {
      cleanupGestureListeners()
    }
  }, [])

  const detectDeviceSpecs = () => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    const dpi = window.devicePixelRatio || 1

    const specs: DeviceSpecs = {
      screenSize: screenWidth < 768 ? 'small' : screenWidth < 1024 ? 'medium' : 'large',
      orientation: screenHeight > screenWidth ? 'portrait' : 'landscape',
      dpi,
      touchSupport: 'ontouchstart' in window,
      connectionSpeed: getConnectionSpeed(),
      batteryLevel: getBatteryLevel(),
      isOnline: navigator.onLine
    }

    setDeviceSpecs(specs)
    adjustForDevice(specs)
  }

  const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
    const connection = (navigator as any).connection
    if (!connection) return 'medium'

    const effectiveType = connection.effectiveType
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow'
    if (effectiveType === '3g') return 'medium'
    return 'fast'
  }

  const getBatteryLevel = (): number => {
    // Modern browsers restrict battery API, return default
    return 85
  }

  const adjustForDevice = (specs: DeviceSpecs) => {
    // Adjust quality based on device capabilities
    if (specs.connectionSpeed === 'slow' || specs.screenSize === 'small') {
      setAdaptiveQuality('low')
    } else if (specs.connectionSpeed === 'fast' && specs.screenSize === 'large') {
      setAdaptiveQuality('high')
    } else {
      setAdaptiveQuality('medium')
    }

    // Enable offline mode for slow connections
    if (specs.connectionSpeed === 'slow') {
      setOfflineMode(true)
    }
  }

  const startMobileSession = () => {
    const session: MobileSession = {
      id: `mobile_session_${Date.now()}`,
      startTime: Date.now(),
      deviceInfo: deviceSpecs!,
      interactions: [],
      contentViewed: [],
      performance: {
        loadTimes: [],
        gestureAccuracy: 0,
        completionRate: 0
      }
    }
    setMobileSession(session)
  }

  const setupGestureListeners = () => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Touch event listeners
    container.addEventListener('touchstart', handleTouchStart, { passive: false })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: false })

    // Gesture event listeners
    container.addEventListener('gesturestart', handleGestureStart as any, { passive: false })
    container.addEventListener('gesturechange', handleGestureChange as any, { passive: false })
    container.addEventListener('gestureend', handleGestureEnd as any, { passive: false })

    // Device orientation
    window.addEventListener('orientationchange', handleOrientationChange)
  }

  const cleanupGestureListeners = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    container.removeEventListener('touchstart', handleTouchStart)
    container.removeEventListener('touchmove', handleTouchMove)
    container.removeEventListener('touchend', handleTouchEnd)
    window.removeEventListener('orientationchange', handleOrientationChange)
  }

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    const touch = event.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault()
    // Handle drag/pan gestures
    if (gestureMode === 'interaction') {
      // Process movement for interactive content
    }
  }

  const handleTouchEnd = (event: TouchEvent) => {
    event.preventDefault()
    if (!touchStartRef.current) return

    const touch = event.changedTouches[0]
    const endTime = Date.now()
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = endTime - touchStartRef.current.time

    const gesture = detectGesture(deltaX, deltaY, deltaTime)
    if (gesture) {
      handleGesture(gesture)
    }

    touchStartRef.current = null
  }

  const detectGesture = (deltaX: number, deltaY: number, deltaTime: number): TouchGesture | null => {
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const velocity = distance / deltaTime

    // Tap
    if (distance < 10 && deltaTime < 300) {
      triggerHaptic('light')
      return {
        type: 'tap',
        coordinates: { x: touchStartRef.current!.x, y: touchStartRef.current!.y }
      }
    }

    // Long press
    if (distance < 10 && deltaTime > 500) {
      triggerHaptic('medium')
      return {
        type: 'long-press',
        coordinates: { x: touchStartRef.current!.x, y: touchStartRef.current!.y }
      }
    }

    // Swipe
    if (distance > 50 && velocity > 0.5) {
      const direction = Math.abs(deltaX) > Math.abs(deltaY)
        ? (deltaX > 0 ? 'right' : 'left')
        : (deltaY > 0 ? 'down' : 'up')

      triggerHaptic('light')
      return {
        type: 'swipe',
        coordinates: { x: touchStartRef.current!.x, y: touchStartRef.current!.y },
        direction,
        velocity
      }
    }

    return null
  }

  const handleGestureStart = (event: any) => {
    event.preventDefault()
  }

  const handleGestureChange = (event: any) => {
    event.preventDefault()
    const gesture: TouchGesture = {
      type: 'pinch',
      coordinates: { x: event.pageX, y: event.pageY },
      scale: event.scale,
      rotation: event.rotation
    }
    handleGesture(gesture)
  }

  const handleGestureEnd = (event: any) => {
    event.preventDefault()
    triggerHaptic('medium')
  }

  const handleOrientationChange = () => {
    setTimeout(() => {
      detectDeviceSpecs()
    }, 100)
  }

  const handleGesture = (gesture: TouchGesture) => {
    setActiveGestures(prev => [...prev.slice(-4), gesture])

    // Update session data
    if (mobileSession) {
      setMobileSession(prev => prev ? {
        ...prev,
        interactions: [...prev.interactions, gesture]
      } : null)
    }

    // Process gesture based on current mode and content
    switch (gesture.type) {
      case 'tap':
        handleTapGesture(gesture)
        break
      case 'swipe':
        handleSwipeGesture(gesture)
        break
      case 'pinch':
        handlePinchGesture(gesture)
        break
      case 'long-press':
        handleLongPressGesture(gesture)
        break
    }
  }

  const handleTapGesture = (gesture: TouchGesture) => {
    // Navigation or interaction based on mode
    if (gestureMode === 'navigation') {
      // Handle UI navigation
    } else if (gestureMode === 'interaction') {
      // Handle content interaction
    }
  }

  const handleSwipeGesture = (gesture: TouchGesture) => {
    if (gesture.direction === 'left' || gesture.direction === 'right') {
      // Navigate between content items
      navigateContent(gesture.direction === 'left' ? 'next' : 'previous')
    }
  }

  const handlePinchGesture = (gesture: TouchGesture) => {
    if (gesture.scale && currentContent) {
      // Handle zoom for diagrams and images
      const zoom = gesture.scale > 1 ? 'in' : 'out'
      handleZoom(zoom)
    }
  }

  const handleLongPressGesture = (gesture: TouchGesture) => {
    // Show context menu or detailed information
    triggerHaptic('heavy')
  }

  const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy') => {
    if (!hapticEnabled || !('vibrate' in navigator)) return

    const patterns = {
      light: [10],
      medium: [30],
      heavy: [50, 50, 50]
    }

    navigator.vibrate(patterns[intensity])
  }

  const navigateContent = (direction: 'next' | 'previous') => {
    const currentIndex = mobileContent.findIndex(content => content.id === currentContent?.id)
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

    if (newIndex < 0) newIndex = mobileContent.length - 1
    if (newIndex >= mobileContent.length) newIndex = 0

    setCurrentContent(mobileContent[newIndex])
    triggerHaptic('light')
  }

  const handleZoom = (direction: 'in' | 'out') => {
    // Implement zoom functionality for visual content
    triggerHaptic('light')
  }

  const toggleVoiceControl = () => {
    setVoiceControlActive(!voiceControlActive)
    triggerHaptic('medium')
  }

  const getAdaptiveImageSrc = (baseSrc: string): string => {
    const qualitySuffixes = {
      low: '_low.webp',
      medium: '_med.webp',
      high: '_high.webp'
    }
    return baseSrc.replace('.webp', qualitySuffixes[adaptiveQuality])
  }

  const getLayoutClasses = () => {
    if (!deviceSpecs) return ''

    const base = 'mobile-interface'
    const size = `size-${deviceSpecs.screenSize}`
    const orientation = `orientation-${deviceSpecs.orientation}`
    const quality = `quality-${adaptiveQuality}`

    return `${base} ${size} ${orientation} ${quality}`
  }

  if (!deviceSpecs) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600">Optimizing for your device...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${getLayoutClasses()} min-h-screen bg-gray-50`}
    >
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-4 py-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Biology Mobile</h1>
              <p className="text-xs text-gray-600">{deviceSpecs.screenSize} • {adaptiveQuality} quality</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Connection Indicator */}
            <div className="flex items-center gap-1">
              {deviceSpecs.connectionSpeed === 'fast' && <Wifi className="w-4 h-4 text-green-600" />}
              {deviceSpecs.connectionSpeed === 'medium' && <Signal className="w-4 h-4 text-yellow-600" />}
              {deviceSpecs.connectionSpeed === 'slow' && <Signal className="w-4 h-4 text-red-600" />}
            </div>

            {/* Battery Indicator */}
            <div className="flex items-center gap-1">
              <Battery className={`w-4 h-4 ${deviceSpecs.batteryLevel > 20 ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-xs text-gray-600">{deviceSpecs.batteryLevel}%</span>
            </div>

            {/* Voice Control Toggle */}
            <button
              onClick={toggleVoiceControl}
              className={`p-2 rounded-lg transition-colors ${
                voiceControlActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Content Area */}
      <main className="flex-1 p-4 space-y-4">
        {/* Device Optimization Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 border"
        >
          <h3 className="font-semibold text-gray-800 mb-3">Device Optimization</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-blue-600" />
              <span>{deviceSpecs.screenSize} screen</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-green-600" />
              <span>{deviceSpecs.orientation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Touch className="w-4 h-4 text-purple-600" />
              <span>{deviceSpecs.touchSupport ? 'Touch enabled' : 'No touch'}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span>{adaptiveQuality} quality</span>
            </div>
          </div>
        </motion.div>

        {/* Gesture Mode Selector */}
        <div className="bg-white rounded-xl p-4 border">
          <h3 className="font-semibold text-gray-800 mb-3">Interaction Mode</h3>
          <div className="flex gap-2">
            {[
              { id: 'navigation', label: 'Navigate', icon: Navigation },
              { id: 'interaction', label: 'Interact', icon: Touch },
              { id: 'accessibility', label: 'Accessible', icon: Eye }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setGestureMode(id as any)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                  gestureMode === id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-4">
          {mobileContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentContent(content)}
              className={`bg-white rounded-xl p-4 border-2 transition-all ${
                currentContent?.id === content.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{content.title}</h4>
                  <p className="text-sm text-gray-600">
                    {content.mobileOptimized.layout} layout • {content.type}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {content.mobileOptimized.offlineCapable && (
                    <Download className="w-4 h-4 text-green-600" />
                  )}
                  {content.accessibility.hapticFeedback && (
                    <Vibrate className="w-4 h-4 text-purple-600" />
                  )}
                </div>
              </div>

              {/* Supported Gestures */}
              <div className="flex flex-wrap gap-1 mb-3">
                {content.mobileOptimized.gestures.map((gesture) => (
                  <span
                    key={gesture}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {gesture}
                  </span>
                ))}
              </div>

              {/* Adaptive Quality Preview */}
              {content.content.images && (
                <div className="grid grid-cols-3 gap-2">
                  {content.content.images.slice(0, 3).map((image, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                    >
                      <span className="text-xs text-gray-500">
                        {adaptiveQuality}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Current Gestures Display */}
        {activeGestures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-4 border"
          >
            <h3 className="font-semibold text-gray-800 mb-3">Recent Gestures</h3>
            <div className="space-y-2">
              {activeGestures.slice(-3).map((gesture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="font-medium">{gesture.type}</span>
                  {gesture.direction && (
                    <span className="text-gray-600">→ {gesture.direction}</span>
                  )}
                  {gesture.scale && (
                    <span className="text-gray-600">scale: {gesture.scale.toFixed(2)}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Session Performance */}
        {mobileSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border"
          >
            <h3 className="font-semibold text-gray-800 mb-3">Session Analytics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">
                  {mobileSession.interactions.length}
                </div>
                <div className="text-blue-600">Gestures</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  {Math.round((Date.now() - mobileSession.startTime) / 60000)}m
                </div>
                <div className="text-green-600">Duration</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Mobile Accessibility Tools */}
        <div className="bg-white rounded-xl p-4 border">
          <h3 className="font-semibold text-gray-800 mb-3">Accessibility Tools</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setHapticEnabled(!hapticEnabled)}
              className={`p-3 rounded-lg transition-colors ${
                hapticEnabled ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Vibrate className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Haptic</span>
            </button>
            <button
              onClick={toggleVoiceControl}
              className={`p-3 rounded-lg transition-colors ${
                voiceControlActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Volume2 className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs">Voice</span>
            </button>
          </div>
        </div>
      </main>

      {/* Voice Control Indicator */}
      <AnimatePresence>
        {voiceControlActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Mic className="w-4 h-4" />
              </motion.div>
              <span className="text-sm">Voice Control Active</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2"
      >
        <div className="flex justify-around items-center">
          {[
            { icon: BookOpen, label: 'Learn', active: true },
            { icon: Target, label: 'Practice', active: false },
            { icon: Users, label: 'Community', active: false },
            { icon: Settings, label: 'Settings', active: false }
          ].map(({ icon: Icon, label, active }, index) => (
            <button
              key={index}
              className={`flex flex-col items-center gap-1 p-2 ${
                active ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}

export default MobileMultimodalInterface