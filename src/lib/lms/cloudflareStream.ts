/**
 * Cloudflare Stream Integration Service
 *
 * Handles video upload, processing, and secure playback for the LMS.
 * Uses Cloudflare Stream API for video hosting with DRM protection.
 *
 * Features:
 * - Direct creator upload (tus protocol for large files)
 * - Signed URLs for secure playback
 * - Webhook handling for processing status
 * - Video metadata management
 */

import { prisma } from '@/lib/prisma'
import { VideoUploadStatus, PlaybackPolicy } from '@/generated/prisma'

// Cloudflare API configuration
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN
const CF_STREAM_SIGNING_KEY_ID = process.env.CLOUDFLARE_STREAM_KEY_ID
const CF_STREAM_SIGNING_KEY_PEM = process.env.CLOUDFLARE_STREAM_KEY_PEM

const CF_STREAM_API = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/stream`

interface CloudflareUploadResult {
  success: boolean
  videoId?: string
  uploadUrl?: string
  error?: string
}

interface CloudflareVideoDetails {
  uid: string
  status: {
    state: 'pendingupload' | 'downloading' | 'queued' | 'inprogress' | 'ready' | 'error'
    pctComplete?: number
    errorReasonCode?: string
    errorReasonText?: string
  }
  meta?: Record<string, string>
  created?: string
  modified?: string
  size?: number
  preview?: string
  thumbnail?: string
  playback?: {
    hls?: string
    dash?: string
  }
  input?: {
    width?: number
    height?: number
  }
  duration?: number
  readyToStream?: boolean
}

interface SignedUrlOptions {
  videoId: string
  expiresIn?: number // seconds, default 3600 (1 hour)
  userId?: string
  downloadable?: boolean
}

/**
 * Generate headers for Cloudflare API requests
 */
function getHeaders(): HeadersInit {
  if (!CF_API_TOKEN) {
    throw new Error('Cloudflare API token not configured')
  }
  return {
    Authorization: `Bearer ${CF_API_TOKEN}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Create a direct creator upload URL for client-side uploads
 * This allows large files to be uploaded directly to Cloudflare
 */
export async function createDirectUpload(
  maxDurationSeconds: number = 21600, // 6 hours max
  metadata?: Record<string, string>
): Promise<CloudflareUploadResult> {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    return { success: false, error: 'Cloudflare credentials not configured' }
  }

  try {
    const response = await fetch(`${CF_STREAM_API}/direct_upload`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        maxDurationSeconds,
        expiry: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour expiry
        requireSignedURLs: true,
        allowedOrigins: [
          'https://www.cerebrumbiologyacademy.com',
          'https://cerebrumbiologyacademy.com',
          'http://localhost:3000',
        ],
        meta: metadata || {},
        thumbnailTimestampPct: 0.1, // Generate thumbnail at 10% of video
      }),
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to create upload URL',
      }
    }

    return {
      success: true,
      videoId: data.result.uid,
      uploadUrl: data.result.uploadURL,
    }
  } catch (error) {
    console.error('Cloudflare direct upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Upload video from URL (for server-side uploads)
 */
export async function uploadFromUrl(
  url: string,
  metadata?: Record<string, string>
): Promise<CloudflareUploadResult> {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    return { success: false, error: 'Cloudflare credentials not configured' }
  }

  try {
    const response = await fetch(`${CF_STREAM_API}/copy`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        url,
        requireSignedURLs: true,
        allowedOrigins: [
          'https://www.cerebrumbiologyacademy.com',
          'https://cerebrumbiologyacademy.com',
        ],
        meta: metadata || {},
      }),
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to upload video',
      }
    }

    return {
      success: true,
      videoId: data.result.uid,
    }
  } catch (error) {
    console.error('Cloudflare URL upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get video details from Cloudflare
 */
export async function getVideoDetails(videoId: string): Promise<CloudflareVideoDetails | null> {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    console.error('Cloudflare credentials not configured')
    return null
  }

  try {
    const response = await fetch(`${CF_STREAM_API}/${videoId}`, {
      method: 'GET',
      headers: getHeaders(),
    })

    const data = await response.json()

    if (!data.success) {
      console.error('Failed to get video details:', data.errors)
      return null
    }

    return data.result as CloudflareVideoDetails
  } catch (error) {
    console.error('Error getting video details:', error)
    return null
  }
}

/**
 * Generate a signed URL for secure video playback
 * Using JWT tokens signed with Cloudflare Stream signing key
 */
export async function generateSignedUrl(options: SignedUrlOptions): Promise<string | null> {
  const { videoId, expiresIn = 3600, userId, downloadable = false } = options

  if (!CF_STREAM_SIGNING_KEY_ID || !CF_STREAM_SIGNING_KEY_PEM) {
    console.error('Cloudflare Stream signing keys not configured')
    // Fall back to unsigned URL for development
    const details = await getVideoDetails(videoId)
    return details?.playback?.hls || null
  }

  try {
    // Create JWT payload
    const now = Math.floor(Date.now() / 1000)
    const payload = {
      sub: videoId, // Video ID
      kid: CF_STREAM_SIGNING_KEY_ID,
      exp: now + expiresIn,
      nbf: now - 60, // Valid 1 minute before (clock skew)
      accessRules: [
        {
          type: 'any',
          action: 'allow',
        },
      ],
      // Custom claims for tracking
      ...(userId && { userId }),
      downloadable,
    }

    // Sign JWT with RSA key
    const jwt = await signJWT(payload, CF_STREAM_SIGNING_KEY_PEM)

    // Return signed URL
    return `https://customer-${CF_ACCOUNT_ID}.cloudflarestream.com/${videoId}/manifest/video.m3u8?token=${jwt}`
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return null
  }
}

/**
 * Sign JWT token using the Cloudflare Stream signing key
 */
async function signJWT(payload: Record<string, unknown>, pemKey: string): Promise<string> {
  // Base64url encode helper
  const base64url = (data: string | Uint8Array): string => {
    const base64 = typeof data === 'string' ? btoa(data) : btoa(String.fromCharCode(...data))
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
  }

  // Create header
  const header = { alg: 'RS256', typ: 'JWT' }
  const headerB64 = base64url(JSON.stringify(header))
  const payloadB64 = base64url(JSON.stringify(payload))

  // Create signature input
  const signatureInput = `${headerB64}.${payloadB64}`

  // Import key and sign
  const keyData = pemKey
    .replace('-----BEGIN RSA PRIVATE KEY-----', '')
    .replace('-----END RSA PRIVATE KEY-----', '')
    .replace(/\s/g, '')

  const binaryKey = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signatureInput)
  )

  const signatureB64 = base64url(new Uint8Array(signature))

  return `${signatureInput}.${signatureB64}`
}

/**
 * Delete a video from Cloudflare Stream
 */
export async function deleteVideo(videoId: string): Promise<boolean> {
  if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
    console.error('Cloudflare credentials not configured')
    return false
  }

  try {
    const response = await fetch(`${CF_STREAM_API}/${videoId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('Error deleting video:', error)
    return false
  }
}

/**
 * Process webhook from Cloudflare Stream
 * Updates video status in database
 */
export async function processWebhook(payload: CloudflareVideoDetails): Promise<void> {
  const { uid: cloudflareVideoId, status, duration, thumbnail, playback, input } = payload

  // Find the video lecture by Cloudflare ID
  const videoLecture = await prisma.video_lectures.findUnique({
    where: { cloudflareVideoId },
  })

  if (!videoLecture) {
    console.warn(`Video lecture not found for Cloudflare ID: ${cloudflareVideoId}`)
    return
  }

  // Map Cloudflare status to our enum
  let uploadStatus: VideoUploadStatus
  let processingProgress = 0

  switch (status.state) {
    case 'pendingupload':
      uploadStatus = 'PENDING'
      break
    case 'downloading':
    case 'queued':
    case 'inprogress':
      uploadStatus = 'PROCESSING'
      processingProgress = status.pctComplete ? Math.round(status.pctComplete * 100) : 50
      break
    case 'ready':
      uploadStatus = 'READY'
      processingProgress = 100
      break
    case 'error':
      uploadStatus = 'FAILED'
      console.error(`Video processing failed: ${status.errorReasonText}`)
      break
    default:
      uploadStatus = 'PROCESSING'
  }

  // Determine resolution from input dimensions
  let resolution: string | undefined
  if (input?.height) {
    if (input.height >= 2160) resolution = '4K'
    else if (input.height >= 1080) resolution = '1080p'
    else if (input.height >= 720) resolution = '720p'
    else if (input.height >= 480) resolution = '480p'
    else resolution = '360p'
  }

  // Update the video lecture record
  await prisma.video_lectures.update({
    where: { cloudflareVideoId },
    data: {
      uploadStatus,
      processingProgress,
      ...(duration && { duration: Math.round(duration) }),
      ...(thumbnail && { cloudflareThumbUrl: thumbnail }),
      ...(playback?.hls && { cloudflareStreamUrl: playback.hls }),
      ...(resolution && { resolution }),
      ...(uploadStatus === 'READY' && { processedAt: new Date() }),
    },
  })

  console.log(`Updated video ${cloudflareVideoId} status to ${uploadStatus}`)
}

/**
 * Create a video lecture record in database after upload
 */
export async function createVideoLecture(data: {
  studyMaterialId: string
  cloudflareVideoId: string
  title: string
  description?: string
  duration?: number
  hasPdfSync?: boolean
  syncPdfUrl?: string
  syncPdfPageCount?: number
}) {
  return prisma.video_lectures.create({
    data: {
      studyMaterialId: data.studyMaterialId,
      cloudflareVideoId: data.cloudflareVideoId,
      title: data.title,
      description: data.description,
      duration: data.duration || 0,
      uploadStatus: 'PROCESSING',
      playbackPolicy: 'SIGNED_URL',
      hasPdfSync: data.hasPdfSync || false,
      syncPdfUrl: data.syncPdfUrl,
      syncPdfPageCount: data.syncPdfPageCount,
    },
  })
}

/**
 * Get video for playback with signed URL
 */
export async function getVideoForPlayback(
  videoLectureId: string,
  userId: string
): Promise<{
  success: boolean
  videoUrl?: string
  thumbnail?: string
  duration?: number
  chapters?: Array<{ title: string; startTime: number }>
  progress?: { lastPosition: number; completionPercent: number }
  error?: string
}> {
  const videoLecture = await prisma.video_lectures.findUnique({
    where: { id: videoLectureId },
    include: {
      chapters: { orderBy: { orderIndex: 'asc' } },
      progress: { where: { userId }, take: 1 },
    },
  })

  if (!videoLecture) {
    return { success: false, error: 'Video not found' }
  }

  if (videoLecture.uploadStatus !== 'READY') {
    return { success: false, error: 'Video is still processing' }
  }

  // Generate signed URL
  const videoUrl = await generateSignedUrl({
    videoId: videoLecture.cloudflareVideoId,
    userId,
    expiresIn: 7200, // 2 hours
  })

  if (!videoUrl) {
    return { success: false, error: 'Failed to generate playback URL' }
  }

  // Get or create progress record
  let progress = videoLecture.progress[0]
  if (!progress) {
    progress = await prisma.video_progress.create({
      data: {
        videoLectureId,
        userId,
        firstWatchedAt: new Date(),
      },
    })
  }

  // Increment view count
  await prisma.video_lectures.update({
    where: { id: videoLectureId },
    data: { totalViews: { increment: 1 } },
  })

  return {
    success: true,
    videoUrl,
    thumbnail: videoLecture.cloudflareThumbUrl || undefined,
    duration: videoLecture.duration,
    chapters: videoLecture.chapters.map((c) => ({
      title: c.title,
      startTime: c.startTime,
    })),
    progress: {
      lastPosition: progress.lastPosition,
      completionPercent: Number(progress.completionPercent),
    },
  }
}

/**
 * Update video progress
 */
export async function updateVideoProgress(
  videoLectureId: string,
  userId: string,
  data: {
    currentPosition: number
    watchedSeconds?: number
    isCompleted?: boolean
  }
): Promise<void> {
  const videoLecture = await prisma.video_lectures.findUnique({
    where: { id: videoLectureId },
    select: { duration: true },
  })

  if (!videoLecture) return

  const completionPercent =
    videoLecture.duration > 0
      ? Math.min(100, (data.currentPosition / videoLecture.duration) * 100)
      : 0

  await prisma.video_progress.upsert({
    where: {
      videoLectureId_userId: { videoLectureId, userId },
    },
    update: {
      lastPosition: data.currentPosition,
      watchedSeconds:
        data.watchedSeconds !== undefined ? { increment: data.watchedSeconds } : undefined,
      completionPercent,
      isCompleted: data.isCompleted || completionPercent >= 90,
      lastWatchedAt: new Date(),
      totalWatchSessions: { increment: 1 },
      ...(data.isCompleted && { completedAt: new Date() }),
    },
    create: {
      videoLectureId,
      userId,
      lastPosition: data.currentPosition,
      watchedSeconds: data.watchedSeconds || 0,
      completionPercent,
      isCompleted: data.isCompleted || false,
      firstWatchedAt: new Date(),
      lastWatchedAt: new Date(),
      totalWatchSessions: 1,
    },
  })

  // Update aggregate watch time on video
  if (data.watchedSeconds) {
    await prisma.video_lectures.update({
      where: { id: videoLectureId },
      data: { totalWatchTime: { increment: data.watchedSeconds } },
    })
  }
}

/**
 * Service status check
 */
export function getServiceStatus(): {
  configured: boolean
  accountId: boolean
  apiToken: boolean
  signingKeys: boolean
} {
  return {
    configured: !!(CF_ACCOUNT_ID && CF_API_TOKEN),
    accountId: !!CF_ACCOUNT_ID,
    apiToken: !!CF_API_TOKEN,
    signingKeys: !!(CF_STREAM_SIGNING_KEY_ID && CF_STREAM_SIGNING_KEY_PEM),
  }
}

export const cloudflareStreamService = {
  createDirectUpload,
  uploadFromUrl,
  getVideoDetails,
  generateSignedUrl,
  deleteVideo,
  processWebhook,
  createVideoLecture,
  getVideoForPlayback,
  updateVideoProgress,
  getServiceStatus,
}
