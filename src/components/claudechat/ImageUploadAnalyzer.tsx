'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera,
  Upload,
  X,
  Eye,
  Sparkles,
  Brain,
  Zap,
} from 'lucide-react'

interface ImageAnalysisResult {
  id: string
  imageUrl: string
  fileName: string
  analysisText: string
  biologyTopics: string[]
  difficultyLevel: 'easy' | 'medium' | 'hard'
  confidence: number
  suggestions: string[]
  relatedConcepts: string[]
  timestamp: number
  processingTime: number
}

interface ImageUploadAnalyzerProps {
  onAnalysisComplete: (result: ImageAnalysisResult) => void
  onError: (error: string) => void
  maxFileSize?: number // in MB
  acceptedFormats?: string[]
  className?: string
}

interface UploadedFile {
  file: File
  preview: string
  id: string
}

const ImageUploadAnalyzer: React.FC<ImageUploadAnalyzerProps> = ({
  onAnalysisComplete,
  onError,
  maxFileSize = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'],
  className = '',
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentAnalysis, setCurrentAnalysis] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Invalid file format. Please upload ${acceptedFormats.join(', ')}`
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      return `File too large. Maximum size is ${maxFileSize}MB`
    }

    return null
  }

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const validFiles: UploadedFile[] = []

      fileArray.forEach((file) => {
        const error = validateFile(file)
        if (error) {
          onError(error)
          return
        }

        const preview = URL.createObjectURL(file)
        const uploadedFile: UploadedFile = {
          file,
          preview,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        }
        validFiles.push(uploadedFile)
      })

      setUploadedFiles((prev) => [...prev, ...validFiles])
    },
    [maxFileSize, acceptedFormats, onError]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        processFiles(files)
      }
    },
    [processFiles]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        processFiles(files)
      }
    },
    [processFiles]
  )

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id)
      const fileToRemove = prev.find((file) => file.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return updated
    })
  }

  const simulateAnalysis = async (file: UploadedFile): Promise<ImageAnalysisResult> => {
    const startTime = Date.now()

    // Simulate AI analysis steps
    const analysisSteps = [
      'Preprocessing image...',
      'Detecting Biology content...',
      'Analyzing diagrams and text...',
      'Identifying key concepts...',
      'Generating explanations...',
      'Finalizing analysis...',
    ]

    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentAnalysis(analysisSteps[i])
      setAnalysisProgress(((i + 1) / analysisSteps.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    // Mock analysis result
    const mockResult: ImageAnalysisResult = {
      id: file.id,
      imageUrl: file.preview,
      fileName: file.file.name,
      analysisText: `This appears to be a Biology diagram showing cellular structures. I can identify mitochondria, nucleus, and cell membrane structures. This relates to cell biology and is commonly asked in NEET examinations.

The diagram demonstrates the basic structure of an animal cell with various organelles clearly labeled. The mitochondria are shown with their characteristic cristae structure, which is important for ATP production.

Key concepts covered:
• Cell membrane - Controls entry and exit of substances
• Nucleus - Contains genetic material (DNA)
• Mitochondria - Powerhouse of the cell
• Cytoplasm - Jelly-like substance where chemical reactions occur`,
      biologyTopics: [
        'Cell Biology',
        'Cellular Organelles',
        'Mitochondria',
        'Nucleus',
        'Cell Membrane',
      ],
      difficultyLevel: 'medium',
      confidence: 0.92,
      suggestions: [
        'Review the functions of each organelle',
        'Practice diagram labeling for NEET',
        'Study energy production in mitochondria',
        'Understand cell membrane permeability',
      ],
      relatedConcepts: [
        'Cellular Respiration',
        'Osmosis and Diffusion',
        'Protein Synthesis',
        'Cell Division',
      ],
      timestamp: Date.now(),
      processingTime: Date.now() - startTime,
    }

    return mockResult
  }

  const analyzeImage = async (file: UploadedFile) => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setCurrentAnalysis('Starting analysis...')

    try {
      const result = await simulateAnalysis(file)
      onAnalysisComplete(result)
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      setCurrentAnalysis('')
    }
  }

  const openCamera = () => {
    // This would open camera in a real implementation
    onError('Camera feature coming soon! Please upload an image for now.')
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Upload Zone */}
      <motion.div
        ref={dropZoneRef}
        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="text-center">
          <motion.div
            className="mx-auto w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mb-4"
            animate={{
              rotate: isDragOver ? 360 : 0,
              scale: isDragOver ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Upload className="w-8 h-8 text-white" />
          </motion.div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Biology Images</h3>
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop images here, or click to browse
          </p>

          <div className="flex items-center justify-center space-x-4">
            <motion.button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={20} />
              <span>Browse Files</span>
            </motion.button>

            <motion.button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openCamera}
            >
              <Camera size={20} />
              <span>Take Photo</span>
            </motion.button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Supported: JPEG, PNG, WebP, HEIC • Max size: {maxFileSize}MB
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />
      </motion.div>

      {/* Analysis Progress */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            className="mt-6 p-6 bg-gray-50 rounded-2xl border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Brain className="w-8 h-8 text-blue-500" />
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">AI Analysis in Progress</h4>
                <p className="text-sm text-gray-600">{currentAnalysis}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-500">
                  {Math.round(analysisProgress)}%
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-blue-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${analysisProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                className="relative bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ y: -2 }}
              >
                <div className="aspect-square relative">
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      className="opacity-0 hover:opacity-100 bg-white rounded-full p-2 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => analyzeImage(file)}
                    >
                      <Eye size={20} className="text-gray-700" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 truncate mb-2">
                    {file.file.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {(file.file.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                    <div className="flex space-x-2">
                      <motion.button
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => analyzeImage(file)}
                        disabled={isAnalyzing}
                      >
                        <Sparkles size={16} />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFile(file.id)}
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Tips */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start space-x-3">
          <Zap className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Pro Tips for Better Analysis</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Clear, well-lit images work best</li>
              <li>• Include text and diagrams for comprehensive analysis</li>
              <li>• Biology textbook pages and worksheets are ideal</li>
              <li>• Multiple angles of 3D models help with understanding</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ImageUploadAnalyzer
