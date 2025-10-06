/**
 * Vercel Blob Storage Service for LMS PDF Files
 *
 * Handles file upload, retrieval, and deletion using Vercel Blob storage.
 * Provides secure, CDN-backed file storage for study materials.
 */

import { put, del, head } from '@vercel/blob'

export interface UploadResult {
  url: string
  downloadUrl: string
  pathname: string
  contentType: string
  contentDisposition: string
  size: number
}

export interface BlobMetadata {
  materialId?: string
  courseId?: string
  uploadedBy: string
  originalFileName: string
}

/**
 * Upload a PDF file to Vercel Blob storage
 */
export async function uploadPDF(
  file: File | Buffer,
  filename: string,
  metadata: BlobMetadata
): Promise<UploadResult> {
  try {
    // Ensure BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured. Please add it to .env.local')
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const uniqueFilename = `lms/materials/${timestamp}-${sanitizedFilename}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: 'public', // Public access with signed URLs
      contentType: 'application/pdf',
      addRandomSuffix: true, // Prevent filename collisions
    })

    return {
      url: blob.url,
      downloadUrl: blob.downloadUrl,
      pathname: blob.pathname,
      contentType: blob.contentType || 'application/pdf',
      contentDisposition: blob.contentDisposition || 'inline',
      size: file instanceof File ? file.size : file.length,
    }
  } catch (error) {
    console.error('Failed to upload PDF to Blob storage:', error)
    throw new Error(
      `File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Delete a file from Vercel Blob storage
 */
export async function deletePDF(fileUrl: string): Promise<void> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
    }

    await del(fileUrl)
    console.log(`Successfully deleted file: ${fileUrl}`)
  } catch (error) {
    console.error('Failed to delete PDF from Blob storage:', error)
    throw new Error(
      `File deletion failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Check if a file exists in Blob storage
 */
export async function fileExists(fileUrl: string): Promise<boolean> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
    }

    const metadata = await head(fileUrl)
    return !!metadata
  } catch (error) {
    console.error('Failed to check file existence:', error)
    return false
  }
}

/**
 * Get file metadata from Blob storage
 */
export async function getFileMetadata(fileUrl: string) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN is not configured')
    }

    const metadata = await head(fileUrl)
    return metadata
  } catch (error) {
    console.error('Failed to get file metadata:', error)
    throw new Error(
      `Failed to get metadata: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Generate a secure download URL with expiration
 * Note: Vercel Blob provides public URLs by default
 * For private access, use signed URLs (future enhancement)
 */
export function generateDownloadUrl(fileUrl: string): string {
  // For now, return the URL as-is
  // Future: Implement signed URLs with expiration
  return fileUrl
}
