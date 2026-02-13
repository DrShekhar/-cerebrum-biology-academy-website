'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Layers,
  Maximize2,
  Minimize2,
  Info,
  Target,
  CheckCircle,
  Lightbulb,
  Brain,
  Microscope,
  Activity,
  Leaf,
  Heart,
  Dna,
  CircuitBoard,
} from 'lucide-react'

interface DiagramComponent {
  id: string
  name: string
  type: 'organelle' | 'system' | 'process' | 'molecule'
  position: { x: number; y: number }
  size: { width: number; height: number }
  color: string
  description: string
  function: string
  relatedComponents: string[]
  isVisible: boolean
  isInteractive: boolean
  animationPath?: { x: number; y: number }[]
}

interface InteractiveDiagram {
  id: string
  title: string
  category: 'cell' | 'human-body' | 'plant' | 'molecular' | 'ecosystem'
  description: string
  components: DiagramComponent[]
  processes: DiagramProcess[]
  learningObjectives: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
}

interface DiagramProcess {
  id: string
  name: string
  description: string
  steps: ProcessStep[]
  duration: number
  componentIds: string[]
}

interface ProcessStep {
  id: string
  description: string
  duration: number
  animations: ComponentAnimation[]
}

interface ComponentAnimation {
  componentId: string
  action: 'move' | 'highlight' | 'scale' | 'rotate' | 'fade'
  properties: any
}

const InteractiveBiologyDiagrams: React.FC = () => {
  const [selectedDiagram, setSelectedDiagram] = useState<InteractiveDiagram | null>(null)
  const [activeProcess, setActiveProcess] = useState<DiagramProcess | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState<DiagramComponent | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

  // Sample interactive diagrams
  const diagrams: InteractiveDiagram[] = [
    {
      id: 'cell-structure',
      title: 'Plant Cell Structure',
      category: 'cell',
      description: 'Explore the components of a plant cell and understand their functions',
      difficulty: 'beginner',
      estimatedTime: 15,
      learningObjectives: [
        'Identify major cell organelles',
        'Understand organelle functions',
        'Learn cell structure relationships',
      ],
      components: [
        {
          id: 'nucleus',
          name: 'Nucleus',
          type: 'organelle',
          position: { x: 200, y: 150 },
          size: { width: 60, height: 60 },
          color: '#4F46E5',
          description: 'The control center of the cell containing genetic material',
          function: 'Controls cell activities and contains DNA',
          relatedComponents: ['nucleolus', 'nuclear-membrane'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'mitochondria',
          name: 'Mitochondria',
          type: 'organelle',
          position: { x: 120, y: 200 },
          size: { width: 40, height: 20 },
          color: '#DC2626',
          description: 'The powerhouse of the cell',
          function: 'Produces ATP through cellular respiration',
          relatedComponents: ['cytoplasm'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'chloroplast',
          name: 'Chloroplast',
          type: 'organelle',
          position: { x: 300, y: 180 },
          size: { width: 50, height: 30 },
          color: '#059669',
          description: 'Site of photosynthesis in plant cells',
          function: 'Converts light energy into chemical energy',
          relatedComponents: ['thylakoid', 'stroma'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'cell-wall',
          name: 'Cell Wall',
          type: 'organelle',
          position: { x: 50, y: 50 },
          size: { width: 300, height: 200 },
          color: '#8B5CF6',
          description: 'Rigid outer layer providing structural support',
          function: 'Provides protection and maintains cell shape',
          relatedComponents: ['cell-membrane'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'vacuole',
          name: 'Vacuole',
          type: 'organelle',
          position: { x: 150, y: 100 },
          size: { width: 80, height: 60 },
          color: '#06B6D4',
          description: 'Large storage compartment in plant cells',
          function: 'Stores water and maintains turgor pressure',
          relatedComponents: ['tonoplast'],
          isVisible: true,
          isInteractive: true,
        },
      ],
      processes: [
        {
          id: 'photosynthesis',
          name: 'Photosynthesis Process',
          description: 'Watch how chloroplasts convert light energy into chemical energy',
          duration: 10000,
          componentIds: ['chloroplast'],
          steps: [
            {
              id: 'light-absorption',
              description: 'Chloroplast absorbs light energy',
              duration: 2000,
              animations: [
                {
                  componentId: 'chloroplast',
                  action: 'highlight',
                  properties: { color: '#FCD34D', intensity: 'high' },
                },
              ],
            },
            {
              id: 'water-splitting',
              description: 'Water molecules are split to release oxygen',
              duration: 3000,
              animations: [
                {
                  componentId: 'chloroplast',
                  action: 'scale',
                  properties: { scale: 1.2 },
                },
              ],
            },
            {
              id: 'glucose-formation',
              description: 'Carbon dioxide is converted into glucose',
              duration: 5000,
              animations: [
                {
                  componentId: 'chloroplast',
                  action: 'rotate',
                  properties: { rotation: 360 },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'heart-circulation',
      title: 'Human Heart & Circulation',
      category: 'human-body',
      description: 'Interactive exploration of the heart and blood circulation system',
      difficulty: 'intermediate',
      estimatedTime: 20,
      learningObjectives: [
        'Understand heart chambers',
        'Track blood flow pathway',
        'Learn cardiac cycle phases',
      ],
      components: [
        {
          id: 'right-atrium',
          name: 'Right Atrium',
          type: 'organelle',
          position: { x: 180, y: 120 },
          size: { width: 50, height: 40 },
          color: '#EF4444',
          description: 'Upper right chamber of the heart',
          function: 'Receives deoxygenated blood from body',
          relatedComponents: ['right-ventricle', 'tricuspid-valve'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'right-ventricle',
          name: 'Right Ventricle',
          type: 'organelle',
          position: { x: 180, y: 180 },
          size: { width: 50, height: 50 },
          color: '#DC2626',
          description: 'Lower right chamber of the heart',
          function: 'Pumps blood to lungs for oxygenation',
          relatedComponents: ['pulmonary-artery'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'left-atrium',
          name: 'Left Atrium',
          type: 'organelle',
          position: { x: 250, y: 120 },
          size: { width: 50, height: 40 },
          color: '#3B82F6',
          description: 'Upper left chamber of the heart',
          function: 'Receives oxygenated blood from lungs',
          relatedComponents: ['left-ventricle', 'mitral-valve'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'left-ventricle',
          name: 'Left Ventricle',
          type: 'organelle',
          position: { x: 250, y: 180 },
          size: { width: 50, height: 50 },
          color: '#1D4ED8',
          description: 'Lower left chamber of the heart',
          function: 'Pumps oxygenated blood to body',
          relatedComponents: ['aorta'],
          isVisible: true,
          isInteractive: true,
        },
      ],
      processes: [
        {
          id: 'cardiac-cycle',
          name: 'Cardiac Cycle',
          description: 'Complete heartbeat cycle showing systole and diastole',
          duration: 8000,
          componentIds: ['right-atrium', 'right-ventricle', 'left-atrium', 'left-ventricle'],
          steps: [
            {
              id: 'atrial-systole',
              description: 'Atria contract, pushing blood into ventricles',
              duration: 2000,
              animations: [
                {
                  componentId: 'right-atrium',
                  action: 'scale',
                  properties: { scale: 0.8 },
                },
                {
                  componentId: 'left-atrium',
                  action: 'scale',
                  properties: { scale: 0.8 },
                },
              ],
            },
            {
              id: 'ventricular-systole',
              description: 'Ventricles contract, pumping blood out of heart',
              duration: 3000,
              animations: [
                {
                  componentId: 'right-ventricle',
                  action: 'scale',
                  properties: { scale: 0.7 },
                },
                {
                  componentId: 'left-ventricle',
                  action: 'scale',
                  properties: { scale: 0.7 },
                },
              ],
            },
            {
              id: 'diastole',
              description: 'Heart relaxes and fills with blood',
              duration: 3000,
              animations: [
                {
                  componentId: 'right-atrium',
                  action: 'scale',
                  properties: { scale: 1.0 },
                },
                {
                  componentId: 'left-atrium',
                  action: 'scale',
                  properties: { scale: 1.0 },
                },
                {
                  componentId: 'right-ventricle',
                  action: 'scale',
                  properties: { scale: 1.0 },
                },
                {
                  componentId: 'left-ventricle',
                  action: 'scale',
                  properties: { scale: 1.0 },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'dna-replication',
      title: 'DNA Replication Process',
      category: 'molecular',
      description: 'Step-by-step visualization of DNA replication at the molecular level',
      difficulty: 'advanced',
      estimatedTime: 25,
      learningObjectives: [
        'Understand DNA structure',
        'Learn replication mechanism',
        'Identify key enzymes involved',
      ],
      components: [
        {
          id: 'dna-helix',
          name: 'DNA Double Helix',
          type: 'molecule',
          position: { x: 200, y: 150 },
          size: { width: 20, height: 150 },
          color: '#8B5CF6',
          description: 'The iconic double helix structure of DNA',
          function: 'Stores genetic information in base pairs',
          relatedComponents: ['leading-strand', 'lagging-strand'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'helicase',
          name: 'Helicase Enzyme',
          type: 'molecule',
          position: { x: 200, y: 100 },
          size: { width: 15, height: 15 },
          color: '#F59E0B',
          description: 'Enzyme that unwinds the DNA double helix',
          function: 'Breaks hydrogen bonds between base pairs',
          relatedComponents: ['dna-helix'],
          isVisible: true,
          isInteractive: true,
        },
        {
          id: 'dna-polymerase',
          name: 'DNA Polymerase',
          type: 'molecule',
          position: { x: 180, y: 200 },
          size: { width: 20, height: 12 },
          color: '#EF4444',
          description: 'Enzyme that synthesizes new DNA strands',
          function: 'Adds nucleotides to growing DNA strand',
          relatedComponents: ['leading-strand', 'lagging-strand'],
          isVisible: true,
          isInteractive: true,
        },
      ],
      processes: [
        {
          id: 'replication-process',
          name: 'DNA Replication',
          description: 'Complete process of DNA replication from initiation to completion',
          duration: 15000,
          componentIds: ['dna-helix', 'helicase', 'dna-polymerase'],
          steps: [
            {
              id: 'unwinding',
              description: 'Helicase unwinds the DNA double helix',
              duration: 3000,
              animations: [
                {
                  componentId: 'helicase',
                  action: 'move',
                  properties: { path: [{ x: 200, y: 150 }] },
                },
                {
                  componentId: 'dna-helix',
                  action: 'rotate',
                  properties: { rotation: 180 },
                },
              ],
            },
            {
              id: 'priming',
              description: 'RNA primers are synthesized',
              duration: 2000,
              animations: [
                {
                  componentId: 'dna-helix',
                  action: 'highlight',
                  properties: { color: '#10B981' },
                },
              ],
            },
            {
              id: 'elongation',
              description: 'DNA polymerase adds nucleotides',
              duration: 10000,
              animations: [
                {
                  componentId: 'dna-polymerase',
                  action: 'move',
                  properties: {
                    path: [
                      { x: 180, y: 150 },
                      { x: 220, y: 150 },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]

  useEffect(() => {
    if (diagrams.length > 0) {
      setSelectedDiagram(diagrams[0])
    }
  }, [])

  useEffect(() => {
    let animationId: number
    let stepTimeout: NodeJS.Timeout

    if (isPlaying && activeProcess && selectedDiagram) {
      const runAnimation = () => {
        if (currentStep < activeProcess.steps.length) {
          const step = activeProcess.steps[currentStep]

          // Mark step as completed
          setCompletedSteps((prev) => new Set([...prev, step.id]))
          setScore((prev) => prev + 10)

          stepTimeout = setTimeout(() => {
            setCurrentStep((prev) => prev + 1)
          }, step.duration)
        } else {
          // Animation complete
          setIsPlaying(false)
          setCurrentStep(0)
        }
      }

      runAnimation()
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (stepTimeout) clearTimeout(stepTimeout)
    }
  }, [isPlaying, currentStep, activeProcess])

  const startProcess = (process: DiagramProcess) => {
    setActiveProcess(process)
    setCurrentStep(0)
    setIsPlaying(true)
    setCompletedSteps(new Set())
  }

  const pauseProcess = () => {
    setIsPlaying(false)
  }

  const resetProcess = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setCompletedSteps(new Set())
    setScore(0)
  }

  const handleComponentClick = (component: DiagramComponent) => {
    setSelectedComponent(component)
  }

  const handleComponentDrag = (componentId: string, newPosition: { x: number; y: number }) => {
    if (!selectedDiagram) return

    setSelectedDiagram((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        components: prev.components.map((comp) =>
          comp.id === componentId ? { ...comp, position: newPosition } : comp
        ),
      }
    })
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cell':
        return <Microscope className="w-5 h-5" />
      case 'human-body':
        return <Heart className="w-5 h-5" />
      case 'plant':
        return <Leaf className="w-5 h-5" />
      case 'molecular':
        return <Dna className="w-5 h-5" />
      case 'ecosystem':
        return <CircuitBoard className="w-5 h-5" />
      default:
        return <Brain className="w-5 h-5" />
    }
  }

  if (!selectedDiagram) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-8">
          <Microscope className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Loading interactive diagrams...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div
        className="text-center space-y-4 animate-fadeInUp"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
            <Layers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Interactive Biology Diagrams
          </h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore biology concepts through interactive 3D diagrams, animations, and simulations.
          Click, drag, and discover how biological systems work!
        </p>
      </div>

      {/* Diagram Selection */}
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4">Available Diagrams</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diagrams.map((diagram) => (
            <div
              key={diagram.id}
              onClick={() => setSelectedDiagram(diagram)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedDiagram.id === diagram.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {getCategoryIcon(diagram.category)}
                <h4 className="font-semibold text-gray-800">{diagram.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{diagram.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`px-2 py-1 rounded-full ${getDifficultyColor(diagram.difficulty)}`}
                >
                  {diagram.difficulty}
                </span>
                <span className="text-gray-500">{diagram.estimatedTime} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Canvas */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border overflow-hidden">
            {/* Controls */}
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-gray-800">{selectedDiagram.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(selectedDiagram.difficulty)}`}
                  >
                    {selectedDiagram.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLabels(!showLabels)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {showLabels ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                      {Math.round(zoom * 100)}%
                    </span>
                    <button
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Process Controls */}
              {selectedDiagram.processes.length > 0 && (
                <div className="flex items-center gap-3 mt-3">
                  <select
                    value={activeProcess?.id || ''}
                    onChange={(e) => {
                      const process = selectedDiagram.processes.find((p) => p.id === e.target.value)
                      if (process) setActiveProcess(process)
                    }}
                    className="px-3 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Process</option>
                    {selectedDiagram.processes.map((process) => (
                      <option key={process.id} value={process.id}>
                        {process.name}
                      </option>
                    ))}
                  </select>

                  {activeProcess && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => (isPlaying ? pauseProcess() : startProcess(activeProcess))}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {isPlaying ? 'Pause' : 'Play'}
                      </button>
                      <button
                        onClick={resetProcess}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Reset
                      </button>
                      <span className="text-xs text-gray-600">
                        Step {currentStep + 1} of {activeProcess.steps.length}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Canvas */}
            <div
              ref={canvasRef}
              className="relative bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden"
              style={{
                height: isFullscreen ? '80vh' : '500px',
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
              }}
            >
              {/* Components */}
{selectedDiagram.components
                  .filter((comp) => comp.isVisible)
                  .map((component) => (
                    <div
                      key={component.id}
                      drag={component.isInteractive}
                      dragControls={dragControls}
                      dragMomentum={false}
                      onDragEnd={(_, info) => {
                        const newPosition = {
                          x: component.position.x + info.offset.x,
                          y: component.position.y + info.offset.y,
                        }
                        handleComponentDrag(component.id, newPosition)
                      }}
                      onClick={() => handleComponentClick(component)}
                      className="absolute cursor-pointer animate-fadeInUp"
                      style={{
                        width: component.size.width,
                        height: component.size.height,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-lg border-2 border-white shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: component.color }}
                      >
                        {showLabels && (
                          <span className="text-white text-xs font-medium text-center px-1">
                            {component.name}
                          </span>
                        )}
                      </div>

                      {/* Hover tooltip */}
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none animate-fadeInUp"
                      >
                        {component.description}
                      </div>
                    </div>
                  ))}
{/* Process Animation Overlay */}
              {isPlaying && activeProcess && (
                <div
                  className="absolute inset-0 pointer-events-none animate-fadeInUp"
                >
                  {/* Current step description */}
                  <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg max-w-xs">
                    <h4 className="font-medium text-gray-800 mb-1">
                      {activeProcess.steps[currentStep]?.description}
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full animate-fadeInUp"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Panel */}
        <div className="space-y-6">
          {/* Component Details */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              {selectedComponent ? 'Component Details' : 'Diagram Info'}
            </h3>

            {selectedComponent ? (
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-800">{selectedComponent.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{selectedComponent.description}</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700">Function:</h5>
                  <p className="text-sm text-gray-600">{selectedComponent.function}</p>
                </div>
                {selectedComponent.relatedComponents.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-700">Related Components:</h5>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedComponent.relatedComponents.map((relatedId) => {
                        const related = selectedDiagram.components.find((c) => c.id === relatedId)
                        return related ? (
                          <span
                            key={relatedId}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {related.name}
                          </span>
                        ) : null
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{selectedDiagram.description}</p>
                <div>
                  <h5 className="font-medium text-gray-700">Learning Objectives:</h5>
                  <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                    {selectedDiagram.learningObjectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Progress & Score */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Progress
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Current Score</span>
                  <span className="font-medium">{score} points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (score / 100) * 100)}%` }}
                  />
                </div>
              </div>

              {activeProcess && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Process Progress</span>
                    <span className="font-medium">
                      {currentStep}/{activeProcess.steps.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {activeProcess.steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-2 text-sm ${
                          completedSteps.has(step.id)
                            ? 'text-green-600'
                            : index === currentStep
                              ? 'text-blue-600'
                              : 'text-gray-400'
                        }`}
                      >
                        {completedSteps.has(step.id) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : index === currentStep ? (
                          <Activity className="w-4 h-4" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-current" />
                        )}
                        <span>{step.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
              Quick Actions
            </h3>

            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                📚 Study Guide
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                🧪 Related Experiments
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                📝 Take Quiz
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded transition-colors">
                🔗 Share Diagram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveBiologyDiagrams
