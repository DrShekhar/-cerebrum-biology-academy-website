/**
 * File Validation Utilities for LMS
 *
 * Validates uploaded files for security and compliance:
 * - File size limits
 * - MIME type validation
 * - File extension verification
 * - Content security checks
 */

export interface ValidationResult {
  isValid: boolean
  error?: string
  warnings?: string[]
}

// Configuration
export const FILE_VALIDATION_CONFIG = {
  // Maximum file size: 50MB
  MAX_FILE_SIZE: 50 * 1024 * 1024,

  // Allowed MIME types for PDFs
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'application/x-pdf',
    'application/acrobat',
    'application/vnd.pdf',
  ],

  // Allowed file extensions
  ALLOWED_EXTENSIONS: ['.pdf'],

  // Minimum file size (1KB - prevents empty files)
  MIN_FILE_SIZE: 1024,
}

/**
 * Validate file size
 */
export function validateFileSize(fileSize: number): ValidationResult {
  if (fileSize < FILE_VALIDATION_CONFIG.MIN_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File is too small. Minimum size is 1KB.',
    }
  }

  if (fileSize > FILE_VALIDATION_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File is too large. Maximum size is ${FILE_VALIDATION_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    }
  }

  return { isValid: true }
}

/**
 * Validate MIME type
 */
export function validateMimeType(mimeType: string): ValidationResult {
  if (!FILE_VALIDATION_CONFIG.ALLOWED_MIME_TYPES.includes(mimeType)) {
    return {
      isValid: false,
      error: `Invalid file type. Only PDF files are allowed. Received: ${mimeType}`,
    }
  }

  return { isValid: true }
}

/**
 * Validate file extension
 */
export function validateFileExtension(filename: string): ValidationResult {
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'))

  if (!FILE_VALIDATION_CONFIG.ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      isValid: false,
      error: `Invalid file extension. Only PDF files (.pdf) are allowed. Received: ${extension}`,
    }
  }

  return { isValid: true }
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
  let sanitized = filename.replace(/[\/\\]/g, '')

  // Replace special characters with underscores
  sanitized = sanitized.replace(/[^a-zA-Z0-9.-]/g, '_')

  // Remove multiple consecutive underscores
  sanitized = sanitized.replace(/_+/g, '_')

  // Remove leading/trailing underscores and dots
  sanitized = sanitized.replace(/^[._]+|[._]+$/g, '')

  // Ensure filename is not empty
  if (sanitized.length === 0) {
    sanitized = 'document.pdf'
  }

  // Limit filename length (max 255 chars, common filesystem limit)
  if (sanitized.length > 255) {
    const extension = sanitized.substring(sanitized.lastIndexOf('.'))
    const name = sanitized.substring(0, 255 - extension.length)
    sanitized = name + extension
  }

  return sanitized
}

/**
 * Comprehensive file validation
 * Validates size, type, extension, and sanitizes filename
 */
export function validateFile(
  file: File | { name: string; type: string; size: number }
): ValidationResult & { sanitizedFilename?: string } {
  const warnings: string[] = []

  // Validate file size
  const sizeValidation = validateFileSize(file.size)
  if (!sizeValidation.isValid) {
    return sizeValidation
  }

  // Validate MIME type
  const mimeValidation = validateMimeType(file.type)
  if (!mimeValidation.isValid) {
    return mimeValidation
  }

  // Validate file extension
  const extensionValidation = validateFileExtension(file.name)
  if (!extensionValidation.isValid) {
    return extensionValidation
  }

  // Sanitize filename
  const sanitizedFilename = sanitizeFilename(file.name)
  if (sanitizedFilename !== file.name) {
    warnings.push('Filename was sanitized for security.')
  }

  return {
    isValid: true,
    sanitizedFilename,
    warnings: warnings.length > 0 ? warnings : undefined,
  }
}

/**
 * Validate PDF buffer content (basic check)
 * Checks if the buffer starts with PDF magic bytes
 */
export function validatePDFContent(buffer: Buffer): ValidationResult {
  // PDF files start with "%PDF-" (magic bytes: 25 50 44 46 2D)
  const pdfHeader = buffer.subarray(0, 5).toString('ascii')

  if (!pdfHeader.startsWith('%PDF-')) {
    return {
      isValid: false,
      error: 'File content is not a valid PDF. The file may be corrupted.',
    }
  }

  return { isValid: true }
}

/**
 * Get human-readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`
}

/**
 * Validate multiple files at once
 */
export function validateFiles(files: File[]): {
  valid: File[]
  invalid: { file: File; error: string }[]
} {
  const valid: File[] = []
  const invalid: { file: File; error: string }[] = []

  for (const file of files) {
    const validation = validateFile(file)
    if (validation.isValid) {
      valid.push(file)
    } else {
      invalid.push({
        file,
        error: validation.error || 'Unknown validation error',
      })
    }
  }

  return { valid, invalid }
}
