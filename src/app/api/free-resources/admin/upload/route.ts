import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'
export const maxDuration = 60

const TOKEN_COOKIE_NAME = 'free_resources_admin_token'
const TOKEN_EXPIRY_HOURS = 2
const MAX_FILE_SIZE = 50 * 1024 * 1024

async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(TOKEN_COOKIE_NAME)

    if (!token || !token.value) return false

    const decoded = Buffer.from(token.value, 'base64').toString('utf-8')
    const [timestamp] = decoded.split(':')
    const tokenTime = parseInt(timestamp, 10)
    const now = Date.now()
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000

    return now - tokenTime <= expiryMs
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'File storage is not configured' }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, JPEG, PNG, WebP' },
        { status: 400 }
      )
    }

    const timestamp = Date.now()
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const uniqueFilename = `free-resources/${timestamp}-${sanitizedFilename}`

    const blob = await put(uniqueFilename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: true,
    })

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      file: {
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        contentType: blob.contentType || file.type,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export async function GET() {
  return NextResponse.json({
    config: {
      maxFileSize: MAX_FILE_SIZE,
      maxFileSizeFormatted: '50 MB',
      allowedTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
      allowedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.webp'],
    },
  })
}
