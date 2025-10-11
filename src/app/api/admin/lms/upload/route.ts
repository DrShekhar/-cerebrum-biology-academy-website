/**
 * LMS PDF Upload API
 *
 * POST /api/admin/lms/upload
 *
 * Handles PDF file upload for study materials:
 * - Validates file (size, type, content)
 * - Uploads to Vercel Blob storage
 * - Creates database record
 * - Returns material metadata
 *
 * @requires Admin authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { uploadPDF } from '@/lib/lms/blobStorage'
import { validateFile, validatePDFContent, formatFileSize } from '@/lib/lms/fileValidation'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// Increase payload size limit for PDF uploads (50MB)
export const runtime = 'nodejs'
export const maxDuration = 60 // 60 seconds max execution

interface UploadMetadata {
  title: string
  description?: string
  courseId?: string
  chapterId?: string
  topicId?: string
  tags?: string[]
  category?: string
  materialType: string
  accessLevel?: string
  isPublished?: boolean
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth()
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 })
    }

    // Parse multipart form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const metadataJson = formData.get('metadata') as string

    // Validate file presence
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided. Please upload a PDF file.' },
        { status: 400 }
      )
    }

    // Validate metadata
    if (!metadataJson) {
      return NextResponse.json(
        { error: 'No metadata provided. Please include material details.' },
        { status: 400 }
      )
    }

    let metadata: UploadMetadata
    try {
      metadata = JSON.parse(metadataJson)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid metadata format. Must be valid JSON.' },
        { status: 400 }
      )
    }

    // Validate required metadata fields
    if (!metadata.title || metadata.title.trim().length === 0) {
      return NextResponse.json({ error: 'Material title is required.' }, { status: 400 })
    }

    if (!metadata.materialType) {
      return NextResponse.json({ error: 'Material type is required.' }, { status: 400 })
    }

    // Validate file
    const fileValidation = validateFile(file)
    if (!fileValidation.isValid) {
      return NextResponse.json(
        {
          error: fileValidation.error,
          details: 'File validation failed',
        },
        { status: 400 }
      )
    }

    // Convert file to buffer for content validation
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Validate PDF content
    const contentValidation = validatePDFContent(buffer)
    if (!contentValidation.isValid) {
      return NextResponse.json(
        {
          error: contentValidation.error,
          details: 'PDF content validation failed',
        },
        { status: 400 }
      )
    }

    // Upload to Vercel Blob
    const uploadResult = await uploadPDF(buffer, fileValidation.sanitizedFilename || file.name, {
      materialId: undefined, // Will be set after database creation
      courseId: metadata.courseId,
      uploadedBy: session.user.email || session.user.id || 'admin',
      originalFileName: file.name,
    })

    // Create database record
    const studyMaterial = await prisma.studyMaterial.create({
      data: {
        title: metadata.title.trim(),
        description: metadata.description?.trim() || null,
        materialType: metadata.materialType as any,
        fileUrl: uploadResult.url,
        fileName: fileValidation.sanitizedFilename || file.name,
        fileSize: uploadResult.size,
        mimeType: uploadResult.contentType,
        courseId: metadata.courseId || null,
        chapterId: metadata.chapterId || null,
        topicId: metadata.topicId || null,
        tags: metadata.tags ? JSON.stringify(metadata.tags) : null,
        category: metadata.category || null,
        accessLevel: (metadata.accessLevel as any) || 'ENROLLED',
        uploadedBy: session.user.email || session.user.id || 'admin',
        isPublished: metadata.isPublished || false,
        publishedAt: metadata.isPublished ? new Date() : null,
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        chapter: {
          select: {
            id: true,
            title: true,
          },
        },
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'PDF uploaded successfully',
        material: {
          id: studyMaterial.id,
          title: studyMaterial.title,
          fileName: studyMaterial.fileName,
          fileSize: studyMaterial.fileSize,
          fileSizeFormatted: formatFileSize(studyMaterial.fileSize),
          fileUrl: studyMaterial.fileUrl,
          materialType: studyMaterial.materialType,
          isPublished: studyMaterial.isPublished,
          course: studyMaterial.course,
          chapter: studyMaterial.chapter,
          topic: studyMaterial.topic,
          createdAt: studyMaterial.createdAt,
        },
        warnings: fileValidation.warnings,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Upload API error:', error)

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        return NextResponse.json(
          {
            error: 'Server configuration error',
            details: 'File storage is not configured. Please contact administrator.',
          },
          { status: 500 }
        )
      }

      if (error.message.includes('Prisma')) {
        return NextResponse.json(
          {
            error: 'Database error',
            details: 'Failed to save material metadata. Please try again.',
          },
          { status: 500 }
        )
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/admin/lms/upload
 * Returns upload configuration and limits
 */
export async function GET() {
  return NextResponse.json({
    config: {
      maxFileSize: 50 * 1024 * 1024, // 50MB
      maxFileSizeFormatted: '50 MB',
      allowedTypes: ['application/pdf'],
      allowedExtensions: ['.pdf'],
    },
    info: {
      endpoint: '/api/admin/lms/upload',
      method: 'POST',
      contentType: 'multipart/form-data',
      requiredFields: ['file', 'metadata'],
      authentication: 'Required (Admin role)',
    },
  })
}
