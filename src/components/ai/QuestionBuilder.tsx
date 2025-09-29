'use client'

import React, { useState, useRef, useCallback } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Image as ImageIcon,
  Upload,
  Video,
  Volume2,
  Table,
  BarChart3,
  PenTool,
  Plus,
  X,
  Save,
  Eye,
  Palette,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Superscript,
  Subscript,
  Link,
  Code,
  Undo,
  Redo,
  FileText,
  Calculator,
  Beaker,
  Microscope,
  Play,
  Pause,
  RotateCcw,
  Settings
} from 'lucide-react'
import { QuestionProperties, type QuestionProperties as QuestionPropertiesType } from './QuestionProperties'

interface QuestionBuilderProps {
  isOpen: boolean
  onClose: () => void
  onSave: (question: QuestionData) => void
  initialQuestion?: QuestionData | null
}

interface QuestionData {
  id?: string
  type: 'mcq' | 'trueFalse' | 'fillInBlanks' | 'shortAnswer' | 'longAnswer' | 'matching' | 'ordering' | 'diagram'
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  chapter: string
  topic: string
  question: {
    content: string
    images: string[]
    audio?: string
    video?: string
    equations: string[]
    formulas: string[]
    diagrams: string[]
    tables: string[]
  }
  options?: {
    text: string
    isCorrect: boolean
    explanation?: string
  }[]
  correctAnswer?: string
  explanation: {
    content: string
    images: string[]
    equations: string[]
    references: string[]
  }
  tags: string[]
  estimatedTime: number // in minutes
  marks: number
  properties?: QuestionPropertiesType // Enhanced properties
}

const defaultQuestion: QuestionData = {
  type: 'mcq',
  difficulty: 'medium',
  subject: 'Biology',
  chapter: '',
  topic: '',
  question: {
    content: '',
    images: [],
    equations: [],
    formulas: [],
    diagrams: [],
    tables: []
  },
  options: [
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
  ],
  explanation: {
    content: '',
    images: [],
    equations: [],
    references: []
  },
  tags: [],
  estimatedTime: 2,
  marks: 4
}

export function QuestionBuilder({ isOpen, onClose, onSave, initialQuestion }: QuestionBuilderProps) {
  const [question, setQuestion] = useState<QuestionData>(initialQuestion || defaultQuestion)
  const [activeEditor, setActiveEditor] = useState<'question' | 'explanation'>('question')
  const [showPreview, setShowPreview] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<'text' | 'equation' | 'formula' | 'table'>('text')
  const [isDrawingMode, setIsDrawingMode] = useState(false)
  const [showProperties, setShowProperties] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'properties'>('content')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [undoStack, setUndoStack] = useState<QuestionData[]>([])
  const [redoStack, setRedoStack] = useState<QuestionData[]>([])

  // Rich text formatting functions
  const applyFormat = useCallback((format: string, value?: string) => {
    document.execCommand(format, false, value)
  }, [])

  const insertEquation = () => {
    const equation = prompt('Enter LaTeX equation:')
    if (equation) {
      setQuestion(prev => ({
        ...prev,
        question: {
          ...prev.question,
          equations: [...prev.question.equations, equation]
        }
      }))
    }
  }

  const insertFormula = () => {
    const formula = prompt('Enter chemical formula (e.g., H₂SO₄):')
    if (formula) {
      setQuestion(prev => ({
        ...prev,
        question: {
          ...prev.question,
          formulas: [...prev.question.formulas, formula]
        }
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          const imageUrl = reader.result as string
          setQuestion(prev => ({
            ...prev,
            question: {
              ...prev.question,
              images: [...prev.question.images, imageUrl]
            }
          }))
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setQuestion(prev => ({
          ...prev,
          question: {
            ...prev.question,
            audio: reader.result as string
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setQuestion(prev => ({
          ...prev,
          question: {
            ...prev.question,
            video: reader.result as string
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const createTable = () => {
    const rows = parseInt(prompt('Number of rows:') || '3')
    const cols = parseInt(prompt('Number of columns:') || '3')

    let tableHTML = '<table class="border-collapse border border-gray-300 w-full">'
    for (let i = 0; i < rows; i++) {
      tableHTML += '<tr>'
      for (let j = 0; j < cols; j++) {
        tableHTML += '<td class="border border-gray-300 p-2">Cell</td>'
      }
      tableHTML += '</tr>'
    }
    tableHTML += '</table>'

    setQuestion(prev => ({
      ...prev,
      question: {
        ...prev.question,
        tables: [...prev.question.tables, tableHTML]
      }
    }))
  }

  const startDrawing = () => {
    setIsDrawingMode(true)
    // Initialize canvas for diagram drawing
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
      }
    }
  }

  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const imageData = canvas.toDataURL()
      setQuestion(prev => ({
        ...prev,
        question: {
          ...prev.question,
          diagrams: [...prev.question.diagrams, imageData]
        }
      }))
      setIsDrawingMode(false)
    }
  }

  const addOption = () => {
    setQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), { text: '', isCorrect: false }]
    }))
  }

  const removeOption = (index: number) => {
    setQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }))
  }

  const updateOption = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
    setQuestion(prev => ({
      ...prev,
      options: prev.options?.map((option, i) =>
        i === index ? { ...option, [field]: value } : option
      )
    }))
  }

  const handleSave = () => {
    onSave(question)
    onClose()
  }

  const handlePropertiesChange = (properties: QuestionPropertiesType) => {
    setQuestion(prev => ({
      ...prev,
      properties,
      // Sync basic properties with the question data
      difficulty: properties.difficulty,
      topic: properties.topic,
      estimatedTime: properties.estimatedTime,
      marks: properties.markAllocation
    }))
  }

  const handlePropertiesSave = () => {
    console.log('Question properties saved:', question.properties)
    // Properties are already synced via handlePropertiesChange
  }

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      setRedoStack(prev => [...prev, question])
      setQuestion(previousState)
      setUndoStack(prev => prev.slice(0, -1))
    }
  }

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      setUndoStack(prev => [...prev, question])
      setQuestion(nextState)
      setRedoStack(prev => prev.slice(0, -1))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Question Builder</h2>
                <p className="text-purple-100">Create comprehensive biology questions with rich content</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={undo}
                disabled={undoStack.length === 0}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50"
              >
                <Undo className="w-5 h-5" />
              </button>
              <button
                onClick={redo}
                disabled={redoStack.length === 0}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors disabled:opacity-50"
              >
                <Redo className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(95vh-120px)]">
          {/* Sidebar - Question Properties */}
          <div className="w-80 border-r border-gray-200 p-6 overflow-y-auto bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Properties</h3>

            {/* Question Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
              <select
                value={question.type}
                onChange={(e) => setQuestion(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="mcq">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="fillInBlanks">Fill in Blanks</option>
                <option value="shortAnswer">Short Answer</option>
                <option value="longAnswer">Long Answer</option>
                <option value="matching">Matching</option>
                <option value="ordering">Ordering</option>
                <option value="diagram">Diagram</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <div className="flex space-x-2">
                {(['easy', 'medium', 'hard'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setQuestion(prev => ({ ...prev, difficulty: level }))}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      question.difficulty === level
                        ? level === 'easy' ? 'bg-green-100 text-green-700 border border-green-300'
                        : level === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject, Chapter, Topic */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={question.subject}
                  onChange={(e) => setQuestion(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chapter</label>
                <input
                  type="text"
                  value={question.chapter}
                  onChange={(e) => setQuestion(prev => ({ ...prev, chapter: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
                <input
                  type="text"
                  value={question.topic}
                  onChange={(e) => setQuestion(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Marks and Time */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marks</label>
                <input
                  type="number"
                  value={question.marks}
                  onChange={(e) => setQuestion(prev => ({ ...prev, marks: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time (min)</label>
                <input
                  type="number"
                  value={question.estimatedTime}
                  onChange={(e) => setQuestion(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  max="60"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                value={question.tags.join(', ')}
                onChange={(e) => setQuestion(prev => ({
                  ...prev,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Main Editor Area */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-4 bg-white">
              <div className="flex flex-wrap items-center space-x-2 mb-4">
                {/* Format Selection */}
                <div className="flex space-x-1 border border-gray-300 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedFormat('text')}
                    className={`px-3 py-1 rounded text-sm ${selectedFormat === 'text' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <Type className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedFormat('equation')}
                    className={`px-3 py-1 rounded text-sm ${selectedFormat === 'equation' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <Calculator className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedFormat('formula')}
                    className={`px-3 py-1 rounded text-sm ${selectedFormat === 'formula' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <Beaker className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedFormat('table')}
                    className={`px-3 py-1 rounded text-sm ${selectedFormat === 'table' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  >
                    <Table className="w-4 h-4" />
                  </button>
                </div>

                {/* Text Formatting */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => applyFormat('bold')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('italic')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('underline')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Underline className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('superscript')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Superscript className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('subscript')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <Subscript className="w-4 h-4" />
                  </button>
                </div>

                {/* Alignment */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => applyFormat('justifyLeft')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('justifyCenter')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('justifyRight')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Lists */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => applyFormat('insertUnorderedList')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => applyFormat('insertOrderedList')}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                </div>

                {/* Special Inserts */}
                <div className="flex space-x-1">
                  <button
                    onClick={insertEquation}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Insert Mathematical Equation"
                  >
                    <Calculator className="w-4 h-4" />
                  </button>
                  <button
                    onClick={insertFormula}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Insert Chemical Formula"
                  >
                    <Beaker className="w-4 h-4" />
                  </button>
                  <button
                    onClick={createTable}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Insert Table"
                  >
                    <Table className="w-4 h-4" />
                  </button>
                  <button
                    onClick={startDrawing}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Draw Diagram"
                  >
                    <PenTool className="w-4 h-4" />
                  </button>
                </div>

                {/* Media Uploads */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Upload Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => audioInputRef.current?.click()}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Upload Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                    title="Upload Video"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Editor Tabs */}
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setActiveTab('content')
                    setActiveEditor('question')
                  }}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'content' && activeEditor === 'question'
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Question Content
                </button>
                <button
                  onClick={() => {
                    setActiveTab('content')
                    setActiveEditor('explanation')
                  }}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === 'content' && activeEditor === 'explanation'
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Explanation
                </button>
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                    activeTab === 'properties'
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Properties</span>
                </button>
              </div>
            </div>

            {/* Content Editor */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!showPreview ? (
                <div className="space-y-6">
                  {/* Properties Tab */}
                  {activeTab === 'properties' ? (
                    <QuestionProperties
                      questionId={question.id}
                      initialProperties={question.properties}
                      onPropertiesChange={handlePropertiesChange}
                      onSave={handlePropertiesSave}
                      isEditing={true}
                    />
                  ) : (
                    <>
                      {/* Question Editor */}
                      {activeEditor === 'question' && (
                    <div>
                      <div
                        contentEditable
                        className="min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onBlur={(e) => setQuestion(prev => ({
                          ...prev,
                          question: { ...prev.question, content: e.currentTarget.innerHTML }
                        }))}
                        dangerouslySetInnerHTML={{ __html: question.question.content }}
                      />

                      {/* Attached Media Display */}
                      {question.question.images.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Images:</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {question.question.images.map((img, index) => (
                              <div key={index} className="relative">
                                <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                                <button
                                  onClick={() => setQuestion(prev => ({
                                    ...prev,
                                    question: {
                                      ...prev.question,
                                      images: prev.question.images.filter((_, i) => i !== index)
                                    }
                                  }))}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Equations */}
                      {question.question.equations.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Equations:</h4>
                          <div className="space-y-2">
                            {question.question.equations.map((eq, index) => (
                              <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                                <code className="flex-1">{eq}</code>
                                <button
                                  onClick={() => setQuestion(prev => ({
                                    ...prev,
                                    question: {
                                      ...prev.question,
                                      equations: prev.question.equations.filter((_, i) => i !== index)
                                    }
                                  }))}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Options for MCQ */}
                      {question.type === 'mcq' && question.options && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 mb-4">Answer Options:</h4>
                          <div className="space-y-3">
                            {question.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <input
                                  type="radio"
                                  name="correctAnswer"
                                  checked={option.isCorrect}
                                  onChange={() => {
                                    setQuestion(prev => ({
                                      ...prev,
                                      options: prev.options?.map((opt, i) => ({
                                        ...opt,
                                        isCorrect: i === index
                                      }))
                                    }))
                                  }}
                                  className="w-4 h-4 text-blue-600"
                                />
                                <input
                                  type="text"
                                  value={option.text}
                                  onChange={(e) => updateOption(index, 'text', e.target.value)}
                                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {question.options && question.options.length > 2 && (
                                  <button
                                    onClick={() => removeOption(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          {question.options.length < 6 && (
                            <button
                              onClick={addOption}
                              className="mt-3 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                            >
                              <Plus className="w-4 h-4" />
                              <span>Add Option</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explanation Editor */}
                  {activeEditor === 'explanation' && (
                    <div>
                      <div
                        contentEditable
                        className="min-h-[200px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onBlur={(e) => setQuestion(prev => ({
                          ...prev,
                          explanation: { ...prev.explanation, content: e.currentTarget.innerHTML }
                        }))}
                        dangerouslySetInnerHTML={{ __html: question.explanation.content }}
                      />
                    </div>
                  )}

                  {/* Drawing Canvas */}
                  {isDrawingMode && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-700">Draw Diagram:</h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveDrawing}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Save Drawing
                          </button>
                          <button
                            onClick={() => setIsDrawingMode(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={400}
                        className="border border-gray-300 rounded-lg cursor-crosshair"
                        onMouseDown={(e) => {
                          const canvas = canvasRef.current
                          const ctx = canvas?.getContext('2d')
                          if (ctx && canvas) {
                            const rect = canvas.getBoundingClientRect()
                            ctx.beginPath()
                            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
                          }
                        }}
                        onMouseMove={(e) => {
                          if (e.buttons === 1) {
                            const canvas = canvasRef.current
                            const ctx = canvas?.getContext('2d')
                            if (ctx && canvas) {
                              const rect = canvas.getBoundingClientRect()
                              ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
                              ctx.stroke()
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                    </>
                  )}
                </div>
              ) : (
                /* Preview Mode */
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Question Preview</h3>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: question.question.content }}
                    />

                    {question.question.images.map((img, index) => (
                      <img key={index} src={img} alt="" className="max-w-md mt-4 rounded" />
                    ))}

                    {question.type === 'mcq' && question.options && (
                      <div className="mt-4 space-y-2">
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                            <span>{option.text}</span>
                            {option.isCorrect && <span className="text-green-600 font-medium">(Correct)</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {question.explanation.content && (
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-blue-800">Explanation</h3>
                      <div
                        className="prose max-w-none text-blue-700"
                        dangerouslySetInnerHTML={{ __html: question.explanation.content }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Type: {question.type.toUpperCase()}</span>
                <span>Difficulty: {question.difficulty}</span>
                <span>Marks: {question.marks}</span>
                <span>Time: {question.estimatedTime} min</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Question</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
        <input
          ref={audioInputRef}
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}