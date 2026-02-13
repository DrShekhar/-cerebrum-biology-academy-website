'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Glasses,
  Smartphone,
  Monitor,
  Brain,
  Eye,
  Settings,
  Download,
  Play,
  CheckCircle,
  AlertCircle,
  Microscope,
  Dna,
  Heart,
  Leaf,
  Activity,
  BookOpen,
  FlaskConical,
} from 'lucide-react'

// WebXR Type Declarations
type XRSession = any
type XRWebGLLayerType = any
type XRFrame = any
type XRViewerPose = any

interface ARVRCapability {
  id: string
  name: string
  type: 'ar' | 'vr' | 'mr'
  supported: boolean
  performance: 'low' | 'medium' | 'high'
  requirements: string[]
}

interface ImmersiveExperience {
  id: string
  title: string
  description: string
  type: 'ar' | 'vr' | 'mr'
  category: 'cell-biology' | 'anatomy' | 'molecular' | 'ecosystem' | 'lab-simulation'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  features: string[]
  interactions: InteractionType[]
  learningObjectives: string[]
  requiredCapabilities: string[]
  assets: AssetRequirement[]
}

interface InteractionType {
  type: 'gaze' | 'gesture' | 'voice' | 'touch' | 'controller'
  description: string
  supported: boolean
}

interface AssetRequirement {
  type: '3d-model' | 'texture' | 'animation' | 'audio' | 'video'
  size: number
  quality: 'low' | 'medium' | 'high' | 'ultra'
  downloadUrl?: string
}

interface DeviceCapabilities {
  webXR: boolean
  webAR: boolean
  deviceOrientation: boolean
  camera: boolean
  microphone: boolean
  accelerometer: boolean
  gyroscope: boolean
  magnetometer: boolean
  performance: 'low' | 'medium' | 'high'
}

const ARVRInfrastructure: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'experiences' | 'capabilities' | 'setup' | 'preview' | 'settings'
  >('experiences')
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities | null>(null)
  const [selectedExperience, setSelectedExperience] = useState<ImmersiveExperience | null>(null)
  const [isXRSupported, setIsXRSupported] = useState(false)
  const [isARSupported, setIsARSupported] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState<Map<string, number>>(new Map())
  const [isDownloading, setIsDownloading] = useState(false)
  const [xrSession, setXRSession] = useState<XRSession | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample immersive experiences
  const experiences: ImmersiveExperience[] = [
    {
      id: 'cell-ar-explorer',
      title: 'AR Cell Explorer',
      description:
        'Explore a 3D plant cell in augmented reality. Walk around, zoom in on organelles, and see them in action.',
      type: 'ar',
      category: 'cell-biology',
      difficulty: 'beginner',
      duration: 15,
      features: [
        'Interactive 3D cell model',
        'Organelle animations',
        'Voice narration',
        'Hand gesture controls',
        'Real-time scale adjustment',
      ],
      interactions: [
        { type: 'gaze', description: 'Look at organelles to highlight them', supported: true },
        { type: 'gesture', description: 'Pinch to zoom, tap to select', supported: true },
        { type: 'voice', description: 'Ask questions about cell components', supported: true },
      ],
      learningObjectives: [
        'Identify major cell organelles',
        'Understand spatial relationships in cells',
        'Learn organelle functions through interaction',
      ],
      requiredCapabilities: ['camera', 'deviceOrientation', 'webAR'],
      assets: [
        { type: '3d-model', size: 15.2, quality: 'high' },
        { type: 'texture', size: 8.7, quality: 'high' },
        { type: 'animation', size: 12.3, quality: 'medium' },
        { type: 'audio', size: 5.1, quality: 'medium' },
      ],
    },
    {
      id: 'heart-vr-anatomy',
      title: 'VR Human Heart Anatomy',
      description:
        'Immerse yourself inside a beating human heart. Follow blood flow and understand cardiac anatomy.',
      type: 'vr',
      category: 'anatomy',
      difficulty: 'intermediate',
      duration: 25,
      features: [
        'Life-size heart model',
        'Blood flow visualization',
        'Cardiac cycle simulation',
        'Interactive dissection',
        'Educational checkpoints',
      ],
      interactions: [
        { type: 'controller', description: 'Use VR controllers to interact', supported: true },
        { type: 'gaze', description: 'Look around to explore', supported: true },
        { type: 'voice', description: 'Voice commands for navigation', supported: true },
      ],
      learningObjectives: [
        'Understand heart chamber structure',
        'Learn blood circulation pathways',
        'Observe cardiac cycle phases',
        'Practice anatomical identification',
      ],
      requiredCapabilities: ['webXR', 'deviceOrientation'],
      assets: [
        { type: '3d-model', size: 45.8, quality: 'ultra' },
        { type: 'texture', size: 23.4, quality: 'ultra' },
        { type: 'animation', size: 67.2, quality: 'high' },
        { type: 'audio', size: 12.8, quality: 'high' },
      ],
    },
    {
      id: 'dna-mr-lab',
      title: 'Mixed Reality DNA Lab',
      description:
        'Manipulate DNA molecules in mixed reality. Build, modify, and understand genetic structures.',
      type: 'mr',
      category: 'molecular',
      difficulty: 'advanced',
      duration: 30,
      features: [
        'Molecular manipulation tools',
        'Real-time genetic changes',
        'Protein synthesis simulation',
        'Collaborative workspace',
        'Lab equipment integration',
      ],
      interactions: [
        { type: 'gesture', description: 'Hand tracking for precise manipulation', supported: true },
        { type: 'voice', description: 'Voice commands for complex operations', supported: true },
        { type: 'gaze', description: 'Eye tracking for selection', supported: false },
      ],
      learningObjectives: [
        'Understand DNA structure',
        'Learn genetic manipulation techniques',
        'Explore protein synthesis',
        'Practice molecular modeling',
      ],
      requiredCapabilities: ['webXR', 'camera', 'deviceOrientation'],
      assets: [
        { type: '3d-model', size: 78.5, quality: 'ultra' },
        { type: 'texture', size: 34.7, quality: 'high' },
        { type: 'animation', size: 156.3, quality: 'ultra' },
        { type: 'audio', size: 18.9, quality: 'high' },
      ],
    },
    {
      id: 'ecosystem-ar-field',
      title: 'AR Ecosystem Field Study',
      description:
        'Transform any space into a living ecosystem. Study food chains, biodiversity, and environmental interactions.',
      type: 'ar',
      category: 'ecosystem',
      difficulty: 'intermediate',
      duration: 20,
      features: [
        'Dynamic ecosystem generation',
        'Species interaction simulation',
        'Environmental parameter control',
        'Data collection tools',
        'Real-time species tracking',
      ],
      interactions: [
        { type: 'touch', description: 'Touch screen controls for mobile', supported: true },
        { type: 'gesture', description: 'Air tap gestures', supported: true },
        { type: 'voice', description: 'Species identification by voice', supported: true },
      ],
      learningObjectives: [
        'Understand ecosystem dynamics',
        'Learn species relationships',
        'Practice field study methods',
        'Analyze environmental data',
      ],
      requiredCapabilities: ['camera', 'webAR', 'deviceOrientation'],
      assets: [
        { type: '3d-model', size: 92.1, quality: 'high' },
        { type: 'texture', size: 56.8, quality: 'high' },
        { type: 'animation', size: 145.7, quality: 'high' },
        { type: 'audio', size: 28.4, quality: 'medium' },
      ],
    },
    {
      id: 'virtual-lab-sim',
      title: 'Virtual Laboratory Simulation',
      description:
        'Practice biology experiments in a safe virtual environment. No risk, unlimited resources.',
      type: 'vr',
      category: 'lab-simulation',
      difficulty: 'intermediate',
      duration: 35,
      features: [
        'Realistic lab equipment',
        'Experiment protocols',
        'Safety training',
        'Result analysis tools',
        'Progress tracking',
      ],
      interactions: [
        {
          type: 'controller',
          description: 'VR controllers for equipment handling',
          supported: true,
        },
        { type: 'gesture', description: 'Hand tracking for fine manipulation', supported: true },
        { type: 'voice', description: 'Lab assistant voice commands', supported: true },
      ],
      learningObjectives: [
        'Master laboratory techniques',
        'Learn equipment usage',
        'Practice safety protocols',
        'Develop experimental skills',
      ],
      requiredCapabilities: ['webXR', 'deviceOrientation'],
      assets: [
        { type: '3d-model', size: 134.6, quality: 'ultra' },
        { type: 'texture', size: 67.3, quality: 'ultra' },
        { type: 'animation', size: 89.4, quality: 'high' },
        { type: 'audio', size: 45.2, quality: 'high' },
      ],
    },
  ]

  useEffect(() => {
    detectDeviceCapabilities()
    checkXRSupport()
  }, [])

  const detectDeviceCapabilities = async () => {
    const capabilities: DeviceCapabilities = {
      webXR: 'xr' in navigator && 'XRSystem' in window,
      webAR: 'xr' in navigator && (await checkARSupport()),
      deviceOrientation: 'DeviceOrientationEvent' in window,
      camera: await checkCameraAccess(),
      microphone: await checkMicrophoneAccess(),
      accelerometer: 'DeviceMotionEvent' in window,
      gyroscope: 'DeviceOrientationEvent' in window,
      magnetometer: 'ondeviceorientationabsolute' in window,
      performance: getPerformanceLevel(),
    }

    setDeviceCapabilities(capabilities)
  }

  const checkARSupport = async (): Promise<boolean> => {
    if ('xr' in navigator) {
      try {
        const isSupported = await (navigator as any).xr.isSessionSupported('immersive-ar')
        setIsARSupported(isSupported)
        return isSupported
      } catch (error) {
        console.error('AR support check failed:', error)
        return false
      }
    }
    return false
  }

  const checkXRSupport = async () => {
    if ('xr' in navigator) {
      try {
        const isVRSupported = await (navigator as any).xr.isSessionSupported('immersive-vr')
        const isARSupported = await (navigator as any).xr.isSessionSupported('immersive-ar')
        setIsXRSupported(isVRSupported || isARSupported)
      } catch (error) {
        console.error('XR support check failed:', error)
        setIsXRSupported(false)
      }
    }
  }

  const checkCameraAccess = async (): Promise<boolean> => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      return true
    } catch (error) {
      return false
    }
  }

  const checkMicrophoneAccess = async (): Promise<boolean> => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      return true
    } catch (error) {
      return false
    }
  }

  const getPerformanceLevel = (): 'low' | 'medium' | 'high' => {
    // Simple performance estimation based on available cores and memory
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 2

    if (cores >= 8 && memory >= 8) return 'high'
    if (cores >= 4 && memory >= 4) return 'medium'
    return 'low'
  }

  const startXRSession = async (experience: ImmersiveExperience) => {
    if (!isXRSupported) {
      setError('XR not supported on this device')
      return
    }

    try {
      const sessionMode = experience.type === 'ar' ? 'immersive-ar' : 'immersive-vr'
      const session = await (navigator as any).xr.requestSession(sessionMode, {
        requiredFeatures: ['local-floor'],
        optionalFeatures: ['hand-tracking', 'eye-tracking'],
      })

      setXRSession(session)
      setSelectedExperience(experience)

      // Set up XR rendering loop
      const gl = canvasRef.current?.getContext('webgl2')
      if (gl) {
        await setupXRRendering(session, gl)
      }
    } catch (error) {
      setError(`Failed to start XR session: ${error}`)
    }
  }

  const setupXRRendering = async (session: XRSession, gl: WebGL2RenderingContext) => {
    // Initialize WebXR rendering
    const XRWebGLLayer = (window as any).XRWebGLLayer as XRWebGLLayerType
    const xrGLLayer = new XRWebGLLayer(session, gl)
    await session.updateRenderState({ baseLayer: xrGLLayer })

    const referenceSpace = await session.requestReferenceSpace('local-floor')

    const render = (time: number, frame: XRFrame) => {
      const pose = frame.getViewerPose(referenceSpace)
      if (pose) {
        // Render XR content
        renderXRContent(pose, frame)
      }
      session.requestAnimationFrame(render)
    }

    session.requestAnimationFrame(render)
  }

  const renderXRContent = (pose: XRViewerPose, frame: XRFrame) => {
    // This would render the actual 3D content for the selected experience
    // For now, it's a placeholder for the XR rendering pipeline
    console.log('Rendering XR content:', pose, frame)
  }

  const downloadExperience = async (experience: ImmersiveExperience) => {
    setIsDownloading(true)
    setError(null)

    try {
      const totalSize = experience.assets.reduce((sum, asset) => sum + asset.size, 0)
      let downloadedSize = 0

      for (const asset of experience.assets) {
        // Simulate downloading assets
        const chunks = 10
        const chunkSize = asset.size / chunks

        for (let i = 0; i < chunks; i++) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          downloadedSize += chunkSize
          setDownloadProgress(new Map([[experience.id, (downloadedSize / totalSize) * 100]]))
        }
      }

      setDownloadProgress(new Map([[experience.id, 100]]))
    } catch (error) {
      setError(`Download failed: ${error}`)
    } finally {
      setIsDownloading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100'
      case 'advanced':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ar':
        return 'text-blue-600 bg-blue-100'
      case 'vr':
        return 'text-purple-600 bg-purple-100'
      case 'mr':
        return 'text-indigo-600 bg-indigo-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cell-biology':
        return <Microscope className="w-5 h-5" />
      case 'anatomy':
        return <Heart className="w-5 h-5" />
      case 'molecular':
        return <Dna className="w-5 h-5" />
      case 'ecosystem':
        return <Leaf className="w-5 h-5" />
      case 'lab-simulation':
        return <FlaskConical className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div
        className="text-center space-y-4 animate-fadeInUp"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-indigo-500 rounded-xl">
            <Glasses className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-indigo-500 bg-clip-text text-transparent">
            AR/VR Biology Learning Hub
          </h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Experience biology like never before with immersive AR/VR technologies. Explore cells,
          anatomy, and molecular structures in 3D space.
        </p>
      </div>

      {/* Device Compatibility Status */}
      {deviceCapabilities && (
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-600" />
            Device Compatibility
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-3 rounded-lg border ${deviceCapabilities.webXR ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-center gap-2">
                <Glasses
                  className={`w-4 h-4 ${deviceCapabilities.webXR ? 'text-green-600' : 'text-red-600'}`}
                />
                <span className="text-sm font-medium">WebXR</span>
              </div>
              <p
                className={`text-xs mt-1 ${deviceCapabilities.webXR ? 'text-green-600' : 'text-red-600'}`}
              >
                {deviceCapabilities.webXR ? 'Supported' : 'Not Supported'}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg border ${deviceCapabilities.webAR ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-center gap-2">
                <Smartphone
                  className={`w-4 h-4 ${deviceCapabilities.webAR ? 'text-green-600' : 'text-red-600'}`}
                />
                <span className="text-sm font-medium">WebAR</span>
              </div>
              <p
                className={`text-xs mt-1 ${deviceCapabilities.webAR ? 'text-green-600' : 'text-red-600'}`}
              >
                {deviceCapabilities.webAR ? 'Supported' : 'Not Supported'}
              </p>
            </div>
            <div
              className={`p-3 rounded-lg border ${deviceCapabilities.camera ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
            >
              <div className="flex items-center gap-2">
                <Eye
                  className={`w-4 h-4 ${deviceCapabilities.camera ? 'text-green-600' : 'text-red-600'}`}
                />
                <span className="text-sm font-medium">Camera</span>
              </div>
              <p
                className={`text-xs mt-1 ${deviceCapabilities.camera ? 'text-green-600' : 'text-red-600'}`}
              >
                {deviceCapabilities.camera ? 'Available' : 'Blocked'}
              </p>
            </div>
            <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Performance</span>
              </div>
              <p className="text-xs mt-1 text-blue-600 capitalize">
                {deviceCapabilities.performance}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'experiences', label: 'Experiences', icon: Glasses },
            { id: 'capabilities', label: 'Capabilities', icon: Settings },
            { id: 'setup', label: 'Setup Guide', icon: BookOpen },
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
{/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div
            key="experiences"
            className="space-y-6 animate-fadeInUp"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">Available AR/VR Experiences</h3>
              <div className="grid gap-6">
                {experiences.map((experience) => (
                  <div
                    key={experience.id}
                    className="border rounded-lg p-6 hover:shadow-md transition-all animate-fadeInUp"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(experience.category)}
                        <div>
                          <h4 className="font-semibold text-gray-800">{experience.title}</h4>
                          <p className="text-sm text-gray-600">{experience.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getTypeColor(experience.type)}`}
                        >
                          {experience.type.toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(experience.difficulty)}`}
                        >
                          {experience.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Features:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {experience.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Interactions:</h5>
                        <div className="space-y-1">
                          {experience.interactions.slice(0, 3).map((interaction, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${interaction.supported ? 'bg-green-600' : 'bg-red-500'}`}
                              />
                              <span className="text-xs text-gray-600">{interaction.type}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h5>
                        <div className="space-y-1">
                          {experience.requiredCapabilities.map((capability, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              <span className="text-xs text-gray-600">{capability}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Duration: {experience.duration} minutes • Size:{' '}
                        {experience.assets.reduce((sum, asset) => sum + asset.size, 0).toFixed(1)}{' '}
                        MB
                      </div>
                      <div className="flex items-center gap-2">
                        {downloadProgress.get(experience.id) === 100 ? (
                          <button
                            onClick={() => startXRSession(experience)}
                            disabled={!isXRSupported}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <Play className="w-4 h-4" />
                            Launch
                          </button>
                        ) : (
                          <button
                            onClick={() => downloadExperience(experience)}
                            disabled={isDownloading}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}

                        {downloadProgress.has(experience.id) &&
                          downloadProgress.get(experience.id)! < 100 && (
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${downloadProgress.get(experience.id)}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600">
                                {Math.round(downloadProgress.get(experience.id) || 0)}%
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Capabilities Tab */}
        {activeTab === 'capabilities' && (
          <div
            key="capabilities"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeInUp"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AR Capabilities
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: 'Marker-based AR',
                    supported: true,
                    description: 'Track QR codes and markers',
                  },
                  {
                    name: 'Markerless AR',
                    supported: isARSupported,
                    description: 'Track real-world surfaces',
                  },
                  {
                    name: 'Face tracking',
                    supported: deviceCapabilities?.camera || false,
                    description: 'Track facial features',
                  },
                  {
                    name: 'Hand tracking',
                    supported: false,
                    description: 'Advanced hand gesture recognition',
                  },
                  {
                    name: 'Occlusion handling',
                    supported: true,
                    description: 'Objects hide behind real objects',
                  },
                ].map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${capability.supported ? 'bg-green-600' : 'bg-red-500'}`}
                        />
                        <span className="font-medium text-gray-800">{capability.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{capability.description}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${capability.supported ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {capability.supported ? 'Supported' : 'Not Supported'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Glasses className="w-5 h-5 text-blue-600" />
                VR Capabilities
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: '6DOF Tracking',
                    supported: isXRSupported,
                    description: 'Full positional tracking',
                  },
                  {
                    name: 'Room-scale VR',
                    supported: isXRSupported,
                    description: 'Move around in physical space',
                  },
                  {
                    name: 'Controller input',
                    supported: isXRSupported,
                    description: 'VR controller support',
                  },
                  {
                    name: 'Hand tracking',
                    supported: false,
                    description: 'Direct hand interaction',
                  },
                  { name: 'Eye tracking', supported: false, description: 'Gaze-based interaction' },
                ].map((capability, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${capability.supported ? 'bg-green-600' : 'bg-red-500'}`}
                        />
                        <span className="font-medium text-gray-800">{capability.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{capability.description}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${capability.supported ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {capability.supported ? 'Supported' : 'Not Supported'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">Performance Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">High Performance</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• All VR experiences</li>
                    <li>• Ultra quality AR</li>
                    <li>• Complex simulations</li>
                    <li>• Multi-user sessions</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Medium Performance</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Basic VR experiences</li>
                    <li>• Standard AR quality</li>
                    <li>• Simple interactions</li>
                    <li>• Single-user mode</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-800 mb-2">Low Performance</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• AR experiences only</li>
                    <li>• Low quality models</li>
                    <li>• Basic interactions</li>
                    <li>• Limited features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Guide Tab */}
        {activeTab === 'setup' && (
          <div
            key="setup"
            className="space-y-6 animate-fadeInUp"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                Getting Started with AR/VR Biology
              </h3>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Step 1: Check Browser Compatibility
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Use Chrome 79+ or Firefox 70+ for best WebXR support</li>
                    <li>• Enable WebXR flags in browser settings</li>
                    <li>• Allow camera and microphone permissions</li>
                    <li>• Ensure hardware acceleration is enabled</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Step 2: Prepare Your Environment
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ensure good lighting for AR experiences</li>
                    <li>• Clear physical space for VR (2m x 2m minimum)</li>
                    <li>• Use headphones for better audio immersion</li>
                    <li>• Stable internet connection for downloads</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Step 3: Select Learning Experience
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Start with beginner-level experiences</li>
                    <li>• Download content for offline access</li>
                    <li>• Check device performance recommendations</li>
                    <li>• Review learning objectives before starting</li>
                  </ul>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Step 4: Safety Guidelines</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Take breaks every 20-30 minutes</li>
                    <li>• Stop if you feel motion sickness</li>
                    <li>• Be aware of your physical surroundings</li>
                    <li>• Keep emergency exit strategy ready</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">Common Issues & Solutions</h3>
              <div className="space-y-4">
                {[
                  {
                    issue: 'AR not detecting surfaces',
                    solution:
                      'Ensure good lighting, move device slowly, point at textured surfaces',
                  },
                  {
                    issue: 'VR tracking is jittery',
                    solution: 'Clean device sensors, ensure stable lighting, restart browser',
                  },
                  {
                    issue: 'Low performance/lag',
                    solution:
                      'Close other applications, reduce quality settings, check internet speed',
                  },
                  {
                    issue: 'Content not loading',
                    solution: 'Check internet connection, clear browser cache, disable ad blockers',
                  },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-800">{item.issue}</h5>
                    <p className="text-sm text-gray-600 mt-1">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
{/* Hidden canvas for XR rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Error Display */}
{error && (
          <div
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 animate-fadeInUp"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}
</div>
  )
}

export default ARVRInfrastructure
