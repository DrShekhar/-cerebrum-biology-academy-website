/**
 * Assignment File Upload API
 *
 * POST /api/assignments/upload - Upload assignment files
 */

import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/jpg',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (
      !session ||
      (session.user.role !== 'STUDENT' &&
        session.user.role !== 'TEACHER' &&
        session.user.role !== 'ADMIN')
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Invalid file type. Allowed types: PDF, DOC, DOCX, TXT, JPG, PNG',
        },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: 'File size exceeds 10MB limit',
        },
        { status: 400 }
      )
    }

    // Store on Vercel Blob (CDN-backed). The previous implementation wrote to
    // public/uploads on the local filesystem, which is read-only/ephemeral on
    // Vercel serverless — uploads 500'd or vanished, and since submission
    // requires a file, students could not submit at all in production.
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Assignment upload: BLOB_READ_WRITE_TOKEN is not configured')
      return NextResponse.json(
        { success: false, error: 'File storage is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const blob = await put(`assignments/${sanitizedFileName}`, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true, // avoid collisions; keeps the URL unguessable
    })

    // Response shape preserved so the client (src/lib/fileUpload.ts) and the
    // teacher grade page (which renders submittedFiles as links) need no change.
    return NextResponse.json({
      success: true,
      fileUrl: blob.url,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    })
  } catch (error) {
    console.error('File upload failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'File upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
