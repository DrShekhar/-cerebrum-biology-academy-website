/**
 * File Upload Utility Functions
 */

export const ALLOWED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT, JPG, PNG',
    }
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
    }
  }

  return { valid: true }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.includes('pdf')) return '📄'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  if (mimeType.includes('image')) return '🖼️'
  if (mimeType.includes('text')) return '📃'
  return '📎'
}

export async function uploadFile(file: File): Promise<{
  success: boolean
  fileUrl?: string
  fileName?: string
  fileSize?: number
  error?: string
}> {
  try {
    const validation = validateFile(file)
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/assignments/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error || 'Upload failed' }
    }

    return {
      success: true,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileSize: data.fileSize,
    }
  } catch (error) {
    console.error('File upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    }
  }
}

export async function uploadMultipleFiles(files: File[]): Promise<{
  success: boolean
  uploadedFiles?: Array<{
    fileUrl: string
    fileName: string
    fileSize: number
  }>
  errors?: string[]
}> {
  const results = await Promise.allSettled(files.map((file) => uploadFile(file)))

  const uploadedFiles: Array<{
    fileUrl: string
    fileName: string
    fileSize: number
  }> = []
  const errors: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.success) {
      uploadedFiles.push({
        fileUrl: result.value.fileUrl!,
        fileName: result.value.fileName!,
        fileSize: result.value.fileSize!,
      })
    } else if (result.status === 'fulfilled' && !result.value.success) {
      errors.push(`${files[index].name}: ${result.value.error}`)
    } else if (result.status === 'rejected') {
      errors.push(`${files[index].name}: ${result.reason}`)
    }
  })

  return {
    success: errors.length === 0,
    uploadedFiles,
    errors: errors.length > 0 ? errors : undefined,
  }
}
