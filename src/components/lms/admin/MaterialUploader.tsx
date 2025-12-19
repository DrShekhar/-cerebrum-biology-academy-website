'use client'

/**
 * Material Uploader Component
 *
 * Drag-and-drop PDF uploader with metadata form
 */

import { useState, useCallback } from 'react'

interface MaterialUploaderProps {
  onUploadSuccess?: () => void
}

interface UploadMetadata {
  title: string
  description: string
  materialType: string
  category: string
  tags: string
  isPublished: boolean
}

export function MaterialUploader({ onUploadSuccess }: MaterialUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [metadata, setMetadata] = useState<UploadMetadata>({
    title: '',
    description: '',
    materialType: 'PDF_NOTES',
    category: 'Class Notes',
    tags: '',
    isPublished: false,
  })

  // Handle drag events
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      setError(null)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile && droppedFile.type === 'application/pdf') {
        setFile(droppedFile)
        // Auto-fill title from filename
        if (!metadata.title) {
          const filename = droppedFile.name.replace('.pdf', '')
          setMetadata((prev) => ({ ...prev, title: filename }))
        }
      } else {
        setError('Please upload a PDF file')
      }
    },
    [metadata.title]
  )

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError(null)
        // Auto-fill title from filename
        if (!metadata.title) {
          const filename = selectedFile.name.replace('.pdf', '')
          setMetadata((prev) => ({ ...prev, title: filename }))
        }
      } else {
        setError('Please select a PDF file')
      }
    }
  }

  // Handle upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file')
      return
    }

    if (!metadata.title.trim()) {
      setError('Please enter a title')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(null)
    setUploadProgress(0)

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // Parse tags
      const tagsArray = metadata.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      // Add metadata
      formData.append(
        'metadata',
        JSON.stringify({
          title: metadata.title.trim(),
          description: metadata.description.trim() || undefined,
          materialType: metadata.materialType,
          category: metadata.category || undefined,
          tags: tagsArray.length > 0 ? tagsArray : undefined,
          isPublished: metadata.isPublished,
        })
      )

      // Simulate progress (since fetch doesn't support progress)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 200)

      // Upload
      const response = await fetch('/api/admin/lms/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setSuccess(`Successfully uploaded: ${result.material.title}`)
      setFile(null)
      setMetadata({
        title: '',
        description: '',
        materialType: 'PDF_NOTES',
        category: 'Class Notes',
        tags: '',
        isPublished: false,
      })
      setUploadProgress(0)

      if (onUploadSuccess) {
        onUploadSuccess()
      }

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setUploadProgress(0)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : file
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {file ? (
          <div>
            <p className="text-lg font-medium text-green-700 mb-2">📄 {file.name}</p>
            <p className="text-sm text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <button
              onClick={() => setFile(null)}
              className="mt-4 text-sm text-red-600 hover:text-red-800"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">📎 Drag & drop your PDF here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
              Browse Files
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-4">Maximum file size: 50MB</p>
          </div>
        )}
      </div>

      {/* Metadata Form */}
      {file && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Material Details</h3>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => setMetadata((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Cell Biology Notes - Chapter 1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={metadata.description}
              onChange={(e) => setMetadata((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of the material..."
            />
          </div>

          {/* Material Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Type</label>
              <select
                value={metadata.materialType}
                onChange={(e) => setMetadata((prev) => ({ ...prev, materialType: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="PDF_NOTES">Class Notes</option>
                <option value="PDF_ASSIGNMENT">Assignment</option>
                <option value="PDF_PRACTICE_PAPER">Practice Paper</option>
                <option value="PDF_REFERENCE">Reference Material</option>
                <option value="PDF_EBOOK">E-Book</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={metadata.category}
                onChange={(e) => setMetadata((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Class 11, NEET 2026"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={metadata.tags}
              onChange={(e) => setMetadata((prev) => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., NEET, Biology, Important"
            />
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="publish"
              checked={metadata.isPublished}
              onChange={(e) => setMetadata((prev) => ({ ...prev, isPublished: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="publish" className="ml-2 text-sm text-gray-700">
              Publish immediately (students can see this material)
            </label>
          </div>

          {/* Upload Progress */}
          {uploading && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 text-center">{uploadProgress}% uploaded</p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={uploading || !metadata.title.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              uploading || !metadata.title.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? '📤 Uploading...' : '🚀 Upload Material'}
          </button>
        </div>
      )}
    </div>
  )
}
