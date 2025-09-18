/**
 * Digital Whiteboard - Interactive whiteboard with real-time collaboration
 * Perfect for Biology diagrams, annotations, and collaborative learning
 */

'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Pen,
  Eraser,
  Circle,
  Square,
  ArrowRight,
  Type,
  Palette,
  Undo,
  Redo,
  Download,
  Upload,
  Users,
  Mic,
  Camera,
  Save,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Hand,
} from 'lucide-react'

interface DrawingPoint {
  x: number
  y: number
  pressure?: number
}

interface DrawingStroke {
  id: string
  points: DrawingPoint[]
  tool: 'pen' | 'eraser' | 'highlighter'
  color: string
  width: number
  timestamp: Date
  userId?: string
}

interface WhiteboardShape {
  id: string
  type: 'circle' | 'rectangle' | 'arrow' | 'text'
  startX: number
  startY: number
  endX: number
  endY: number
  color: string
  width: number
  text?: string
  userId?: string
}

interface WhiteboardProps {
  roomId?: string
  isCollaborative?: boolean
  onSave?: (data: WhiteboardData) => void
  onVoiceAnnotation?: (annotation: string) => void
}

interface WhiteboardData {
  strokes: DrawingStroke[]
  shapes: WhiteboardShape[]
  background: string
  zoom: number
  panX: number
  panY: number
}

export function DigitalWhiteboard({
  roomId,
  isCollaborative = false,
  onSave,
  onVoiceAnnotation,
}: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState<
    'pen' | 'eraser' | 'highlighter' | 'text' | 'circle' | 'rectangle' | 'arrow' | 'move'
  >('pen')
  const [currentColor, setCurrentColor] = useState('#2563eb')
  const [currentWidth, setCurrentWidth] = useState(3)
  const [strokes, setStrokes] = useState<DrawingStroke[]>([])
  const [shapes, setShapes] = useState<WhiteboardShape[]>([])
  const [undoStack, setUndoStack] = useState<WhiteboardData[]>([])
  const [redoStack, setRedoStack] = useState<WhiteboardData[]>([])
  const [zoom, setZoom] = useState(1)
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isVoiceAnnotating, setIsVoiceAnnotating] = useState(false)
  const [collaborators, setCollaborators] = useState<
    Array<{ id: string; name: string; cursor: { x: number; y: number } }>
  >([])

  const currentStrokeRef = useRef<DrawingStroke | null>(null)
  const lastPointRef = useRef<DrawingPoint | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      redrawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Redraw canvas
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply transformations
    ctx.save()
    ctx.translate(panX, panY)
    ctx.scale(zoom, zoom)

    // Draw background grid
    drawGrid(ctx, canvas)

    // Draw all strokes
    strokes.forEach((stroke) => drawStroke(ctx, stroke))

    // Draw all shapes
    shapes.forEach((shape) => drawShape(ctx, shape))

    ctx.restore()

    // Draw collaborator cursors
    if (isCollaborative) {
      drawCollaboratorCursors(ctx)
    }
  }, [strokes, shapes, zoom, panX, panY, collaborators, isCollaborative])

  // Draw grid background
  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const gridSize = 20
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 0.5

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  // Draw stroke
  const drawStroke = (ctx: CanvasRenderingContext2D, stroke: DrawingStroke) => {
    if (stroke.points.length < 2) return

    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (stroke.tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else if (stroke.tool === 'highlighter') {
      ctx.globalAlpha = 0.3
    }

    ctx.beginPath()
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

    for (let i = 1; i < stroke.points.length; i++) {
      const point = stroke.points[i]
      ctx.lineTo(point.x, point.y)
    }

    ctx.stroke()

    // Reset composite operation and alpha
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  // Draw shape
  const drawShape = (ctx: CanvasRenderingContext2D, shape: WhiteboardShape) => {
    ctx.strokeStyle = shape.color
    ctx.lineWidth = shape.width

    switch (shape.type) {
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
        )
        ctx.beginPath()
        ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI)
        ctx.stroke()
        break

      case 'rectangle':
        ctx.strokeRect(
          shape.startX,
          shape.startY,
          shape.endX - shape.startX,
          shape.endY - shape.startY
        )
        break

      case 'arrow':
        drawArrow(ctx, shape.startX, shape.startY, shape.endX, shape.endY)
        break

      case 'text':
        ctx.fillStyle = shape.color
        ctx.font = `${shape.width * 4}px Arial`
        ctx.fillText(shape.text || '', shape.startX, shape.startY)
        break
    }
  }

  // Draw arrow
  const drawArrow = (
    ctx: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  ) => {
    const headLength = 15
    const angle = Math.atan2(toY - fromY, toX - fromX)

    // Draw line
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    // Draw arrowhead
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(
      toX - headLength * Math.cos(angle - Math.PI / 6),
      toY - headLength * Math.sin(angle - Math.PI / 6)
    )
    ctx.moveTo(toX, toY)
    ctx.lineTo(
      toX - headLength * Math.cos(angle + Math.PI / 6),
      toY - headLength * Math.sin(angle + Math.PI / 6)
    )
    ctx.stroke()
  }

  // Draw collaborator cursors
  const drawCollaboratorCursors = (ctx: CanvasRenderingContext2D) => {
    collaborators.forEach((collaborator) => {
      ctx.fillStyle = '#ff6b6b'
      ctx.beginPath()
      ctx.arc(collaborator.cursor.x, collaborator.cursor.y, 5, 0, 2 * Math.PI)
      ctx.fill()

      ctx.fillStyle = '#333'
      ctx.font = '12px Arial'
      ctx.fillText(collaborator.name, collaborator.cursor.x + 10, collaborator.cursor.y - 10)
    })
  }

  // Get point from event
  const getPointFromEvent = (event: React.MouseEvent | React.TouchEvent): DrawingPoint => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }

    return {
      x: (clientX - rect.left - panX) / zoom,
      y: (clientY - rect.top - panY) / zoom,
      pressure: 'touches' in event ? (event.touches[0] as any).force || 1 : 1,
    }
  }

  // Start drawing
  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (currentTool === 'move') return

    setIsDrawing(true)
    const point = getPointFromEvent(event)
    lastPointRef.current = point

    if (['pen', 'eraser', 'highlighter'].includes(currentTool)) {
      currentStrokeRef.current = {
        id: `stroke_${Date.now()}`,
        points: [point],
        tool: currentTool as 'pen' | 'eraser' | 'highlighter',
        color: currentColor,
        width: currentWidth,
        timestamp: new Date(),
      }
    }

    // Save state for undo
    saveToUndoStack()
  }

  // Continue drawing
  const continueDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || currentTool === 'move') return

    const point = getPointFromEvent(event)

    if (currentStrokeRef.current && ['pen', 'eraser', 'highlighter'].includes(currentTool)) {
      currentStrokeRef.current.points.push(point)
      setStrokes((prev) => {
        const newStrokes = [...prev]
        const index = newStrokes.findIndex((s) => s.id === currentStrokeRef.current?.id)
        if (index >= 0) {
          newStrokes[index] = { ...currentStrokeRef.current! }
        } else {
          newStrokes.push({ ...currentStrokeRef.current! })
        }
        return newStrokes
      })
    }

    lastPointRef.current = point
    redrawCanvas()
  }

  // Stop drawing
  const stopDrawing = () => {
    if (!isDrawing) return

    setIsDrawing(false)

    if (currentStrokeRef.current) {
      currentStrokeRef.current = null
    }

    lastPointRef.current = null
  }

  // Save to undo stack
  const saveToUndoStack = () => {
    const currentState: WhiteboardData = {
      strokes: [...strokes],
      shapes: [...shapes],
      background: '#ffffff',
      zoom,
      panX,
      panY,
    }

    setUndoStack((prev) => [...prev.slice(-19), currentState]) // Keep last 20 states
    setRedoStack([]) // Clear redo stack
  }

  // Undo
  const undo = () => {
    if (undoStack.length === 0) return

    const currentState: WhiteboardData = {
      strokes: [...strokes],
      shapes: [...shapes],
      background: '#ffffff',
      zoom,
      panX,
      panY,
    }

    const previousState = undoStack[undoStack.length - 1]
    setUndoStack((prev) => prev.slice(0, -1))
    setRedoStack((prev) => [currentState, ...prev.slice(0, 19)])

    setStrokes(previousState.strokes)
    setShapes(previousState.shapes)
    setZoom(previousState.zoom)
    setPanX(previousState.panX)
    setPanY(previousState.panY)
  }

  // Redo
  const redo = () => {
    if (redoStack.length === 0) return

    const currentState: WhiteboardData = {
      strokes: [...strokes],
      shapes: [...shapes],
      background: '#ffffff',
      zoom,
      panX,
      panY,
    }

    const nextState = redoStack[0]
    setRedoStack((prev) => prev.slice(1))
    setUndoStack((prev) => [...prev, currentState])

    setStrokes(nextState.strokes)
    setShapes(nextState.shapes)
    setZoom(nextState.zoom)
    setPanX(nextState.panX)
    setPanY(nextState.panY)
  }

  // Clear canvas
  const clearCanvas = () => {
    saveToUndoStack()
    setStrokes([])
    setShapes([])
  }

  // Save whiteboard
  const saveWhiteboard = () => {
    const data: WhiteboardData = {
      strokes,
      shapes,
      background: '#ffffff',
      zoom,
      panX,
      panY,
    }

    onSave?.(data)

    // Also download as image
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.download = `whiteboard_${Date.now()}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  // Start voice annotation
  const startVoiceAnnotation = async () => {
    try {
      setIsVoiceAnnotating(true)

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })

        // Convert to text (mock implementation)
        const annotation = await processVoiceAnnotation(audioBlob)
        onVoiceAnnotation?.(annotation)

        stream.getTracks().forEach((track) => track.stop())
        setIsVoiceAnnotating(false)
      }

      mediaRecorder.start()

      // Stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop()
        }
      }, 5000)
    } catch (error) {
      console.error('Voice annotation failed:', error)
      setIsVoiceAnnotating(false)
    }
  }

  // Process voice annotation
  const processVoiceAnnotation = async (audioBlob: Blob): Promise<string> => {
    // Mock implementation - would use speech-to-text API
    return 'This is a voice annotation about the diagram'
  }

  // Color palette
  const colors = [
    '#2563eb',
    '#dc2626',
    '#16a34a',
    '#ca8a04',
    '#9333ea',
    '#c2410c',
    '#0891b2',
    '#be123c',
  ]

  // Redraw when dependencies change
  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  return (
    <div className="digital-whiteboard bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
      {/* Toolbar */}
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Tools */}
          <div className="flex items-center space-x-2">
            {/* Drawing Tools */}
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border">
              <button
                onClick={() => setCurrentTool('pen')}
                className={`p-2 rounded ${currentTool === 'pen' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Pen className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTool('highlighter')}
                className={`p-2 rounded ${currentTool === 'highlighter' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Type className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTool('eraser')}
                className={`p-2 rounded ${currentTool === 'eraser' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>

            {/* Shape Tools */}
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border">
              <button
                onClick={() => setCurrentTool('circle')}
                className={`p-2 rounded ${currentTool === 'circle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Circle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTool('rectangle')}
                className={`p-2 rounded ${currentTool === 'rectangle' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <Square className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTool('arrow')}
                className={`p-2 rounded ${currentTool === 'arrow' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Move Tool */}
            <button
              onClick={() => setCurrentTool('move')}
              className={`p-2 rounded border bg-white ${currentTool === 'move' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Hand className="w-4 h-4" />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Color Palette */}
            <div className="flex items-center space-x-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={`w-6 h-6 rounded border-2 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Width Control */}
            <input
              type="range"
              min="1"
              max="20"
              value={currentWidth}
              onChange={(e) => setCurrentWidth(Number(e.target.value))}
              className="w-20"
            />

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border">
              <button
                onClick={() => setZoom((prev) => Math.max(0.1, prev - 0.1))}
                className="p-2 rounded hover:bg-gray-100"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                className="p-2 rounded hover:bg-gray-100"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1">
              <button
                onClick={undo}
                disabled={undoStack.length === 0}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={redoStack.length === 0}
                className="p-2 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                <Redo className="w-4 h-4" />
              </button>
              <button
                onClick={clearCanvas}
                className="p-2 rounded border bg-white hover:bg-gray-100"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Voice Annotation */}
            <button
              onClick={startVoiceAnnotation}
              disabled={isVoiceAnnotating}
              className={`p-2 rounded border ${isVoiceAnnotating ? 'bg-red-100 text-red-600' : 'bg-white hover:bg-gray-100'}`}
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Save */}
            <button
              onClick={saveWhiteboard}
              className="p-2 rounded border bg-blue-600 text-white hover:bg-blue-700"
            >
              <Save className="w-4 h-4" />
            </button>

            {/* Collaborators */}
            {isCollaborative && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{collaborators.length + 1}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-96 cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={continueDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={continueDrawing}
          onTouchEnd={stopDrawing}
        />

        {/* Voice Annotation Overlay */}
        {isVoiceAnnotating && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Recording voice annotation...</span>
            </div>
          </div>
        )}
      </div>

      {/* Biology Templates */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🧬 Biology Templates</h4>
        <div className="flex space-x-2 overflow-x-auto">
          {[
            'Human Heart',
            'Plant Cell',
            'DNA Structure',
            'Respiratory System',
            'Nervous System',
            'Digestive System',
          ].map((template) => (
            <button
              key={template}
              className="flex-shrink-0 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs hover:bg-blue-50 hover:border-blue-300"
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DigitalWhiteboard
