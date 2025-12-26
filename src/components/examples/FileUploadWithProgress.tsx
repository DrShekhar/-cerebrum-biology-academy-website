'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Upload, File, CheckCircle2, X, Image, FileText, Film } from 'lucide-react'

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'processing' | 'complete' | 'error'
  error?: string
}

export default function FileUploadWithProgress() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />
    if (type.startsWith('video/')) return <Film className="w-5 h-5" />
    return <FileText className="w-5 h-5" />
  }

  const simulateUpload = async (file: UploadedFile) => {
    const uploadPhases = [
      { end: 70, status: 'uploading' as const, duration: 2000 },
      { end: 100, status: 'processing' as const, duration: 1000 },
    ]

    for (const phase of uploadPhases) {
      const startProgress = files.find((f) => f.id === file.id)?.progress || 0
      const steps = 50
      const increment = (phase.end - startProgress) / steps

      for (let i = 0; i < steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, phase.duration / steps))
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress: Math.min(phase.end, startProgress + increment * (i + 1)),
                  status: phase.status,
                }
              : f
          )
        )
      }
    }

    setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: 'complete' } : f)))
  }

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading' as const,
    }))

    setFiles((prev) => [...prev, ...newFiles])

    newFiles.forEach((file) => {
      simulateUpload(file)
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      handleFileSelect(e.dataTransfer.files)
    },
    [handleFileSelect]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const clearAll = () => {
    setFiles([])
  }

  const totalFiles = files.length
  const completedFiles = files.filter((f) => f.status === 'complete').length
  const uploadingFiles = files.filter(
    (f) => f.status === 'uploading' || f.status === 'processing'
  ).length

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">File Upload</h1>
            <p className="text-slate-600">Upload files with real-time progress tracking</p>
          </div>
          {files.length > 0 && (
            <Button onClick={clearAll} variant="outline" size="sm">
              Clear All
            </Button>
          )}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center transition-all
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}
          `}
        >
          <motion.div
            animate={isDragging ? { scale: 1.05 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Upload
              className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`}
            />
            <p className="text-lg font-medium text-slate-900 mb-2">
              {isDragging ? 'Drop files here' : 'Drag and drop files here'}
            </p>
            <p className="text-sm text-slate-600 mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              <Button variant="primary" size="lg" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
            <p className="text-xs text-slate-500 mt-4">
              Supports: Images, Videos, PDF, Documents (Max 10MB per file)
            </p>
          </motion.div>
        </div>

        {totalFiles > 0 && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Upload Progress</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-600">
                  {completedFiles} of {totalFiles} complete
                </span>
              </div>
            </div>

            {uploadingFiles > 0 && (
              <ProgressIndicator
                current={completedFiles}
                total={totalFiles}
                percentage={(completedFiles / totalFiles) * 100}
                status={`Uploading ${uploadingFiles} file${uploadingFiles > 1 ? 's' : ''}...`}
                variant="linear"
                size="md"
                color="blue"
                showSteps={false}
              />
            )}
          </div>
        )}
      </Card>

      {files.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Files</h3>
          <div className="space-y-3">
            <AnimatePresence>
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-slate-50 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`
                      p-2 rounded-lg flex-shrink-0
                      ${file.status === 'complete' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}
                    `}
                    >
                      {file.status === 'complete' ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        getFileIcon(file.type)
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {file.status !== 'complete' && (
                        <ProgressIndicator
                          current={Math.floor(file.progress)}
                          total={100}
                          percentage={file.progress}
                          status={
                            file.status === 'uploading'
                              ? 'Uploading...'
                              : file.status === 'processing'
                                ? 'Processing...'
                                : ''
                          }
                          variant="compact"
                          size="sm"
                          color="blue"
                          showSteps={false}
                          showEstimatedTime={false}
                          cancelable={false}
                        />
                      )}

                      {file.status === 'complete' && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="font-medium">Upload complete</span>
                        </div>
                      )}

                      {file.error && (
                        <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {file.error}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      )}

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Real-time Progress</p>
              <p className="text-slate-600">Track upload progress for each file individually</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Drag & Drop</p>
              <p className="text-slate-600">Convenient file selection with drag and drop</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Multiple Files</p>
              <p className="text-slate-600">Upload multiple files simultaneously</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Error Handling</p>
              <p className="text-slate-600">Clear error messages and retry options</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
