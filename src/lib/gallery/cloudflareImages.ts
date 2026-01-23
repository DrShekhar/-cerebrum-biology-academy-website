/**
 * Cloudflare Images Integration Service
 *
 * Handles image upload, transformation, and delivery for the Gallery.
 * Uses Cloudflare Images API for image hosting with CDN delivery.
 *
 * Features:
 * - Direct upload from client
 * - Upload from URL
 * - On-the-fly image transformations
 * - Automatic WebP/AVIF conversion
 * - Multiple variant sizes
 */

// Cloudflare API configuration
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CF_IMAGES_API_TOKEN = process.env.CLOUDFLARE_IMAGES_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN
const CF_IMAGES_ACCOUNT_HASH = process.env.CLOUDFLARE_IMAGES_ACCOUNT_HASH

const CF_IMAGES_API = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`
const CF_IMAGES_V2_API = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/images/v2`

// Image delivery URL base
const CF_IMAGES_DELIVERY = CF_IMAGES_ACCOUNT_HASH
  ? `https://imagedelivery.net/${CF_IMAGES_ACCOUNT_HASH}`
  : null

export interface CloudflareImageUploadResult {
  success: boolean
  imageId?: string
  uploadUrl?: string
  filename?: string
  variants?: string[]
  error?: string
}

export interface CloudflareImageDetails {
  id: string
  filename: string
  uploaded: string
  requireSignedURLs: boolean
  variants: string[]
  meta?: Record<string, string>
}

export interface DirectUploadResult {
  success: boolean
  uploadUrl?: string
  imageId?: string
  error?: string
}

// Predefined variants for gallery images
export const IMAGE_VARIANTS = {
  thumbnail: 'thumbnail',   // 150x150, fit=cover
  small: 'small',           // 320px width
  medium: 'medium',         // 640px width
  large: 'large',           // 1024px width
  full: 'full',             // Original size
  blur: 'blur',             // Tiny blur placeholder
} as const

export type ImageVariant = keyof typeof IMAGE_VARIANTS

/**
 * Generate headers for Cloudflare Images API requests
 */
function getHeaders(): HeadersInit {
  if (!CF_IMAGES_API_TOKEN) {
    throw new Error('Cloudflare Images API token not configured')
  }
  return {
    Authorization: `Bearer ${CF_IMAGES_API_TOKEN}`,
  }
}

/**
 * Check if Cloudflare Images is configured
 */
export function isCloudflareImagesConfigured(): boolean {
  return Boolean(CF_ACCOUNT_ID && CF_IMAGES_API_TOKEN)
}

/**
 * Create a direct upload URL for client-side uploads
 * Returns a one-time upload URL that the client can POST to
 */
export async function createDirectUpload(
  metadata?: Record<string, string>
): Promise<DirectUploadResult> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const formData = new FormData()
    formData.append('requireSignedURLs', 'false')

    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata))
    }

    const response = await fetch(`${CF_IMAGES_V2_API}/direct_upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_IMAGES_API_TOKEN}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!data.success) {
      console.error('Cloudflare direct upload error:', data.errors)
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to create upload URL',
      }
    }

    return {
      success: true,
      uploadUrl: data.result.uploadURL,
      imageId: data.result.id,
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
 * Upload an image from a URL
 */
export async function uploadFromUrl(
  url: string,
  metadata?: Record<string, string>
): Promise<CloudflareImageUploadResult> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const formData = new FormData()
    formData.append('url', url)
    formData.append('requireSignedURLs', 'false')

    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata))
    }

    const response = await fetch(CF_IMAGES_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_IMAGES_API_TOKEN}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!data.success) {
      console.error('Cloudflare upload from URL error:', data.errors)
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to upload image',
      }
    }

    return {
      success: true,
      imageId: data.result.id,
      filename: data.result.filename,
      variants: data.result.variants,
    }
  } catch (error) {
    console.error('Cloudflare upload from URL error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Upload an image file directly (server-side)
 */
export async function uploadImage(
  file: File | Blob,
  filename?: string,
  metadata?: Record<string, string>
): Promise<CloudflareImageUploadResult> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const formData = new FormData()
    formData.append('file', file, filename || 'image')
    formData.append('requireSignedURLs', 'false')

    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata))
    }

    const response = await fetch(CF_IMAGES_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CF_IMAGES_API_TOKEN}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!data.success) {
      console.error('Cloudflare upload error:', data.errors)
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to upload image',
      }
    }

    return {
      success: true,
      imageId: data.result.id,
      filename: data.result.filename,
      variants: data.result.variants,
    }
  } catch (error) {
    console.error('Cloudflare upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get image details from Cloudflare
 */
export async function getImageDetails(
  imageId: string
): Promise<{ success: boolean; image?: CloudflareImageDetails; error?: string }> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const response = await fetch(`${CF_IMAGES_API}/${imageId}`, {
      headers: getHeaders(),
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to get image details',
      }
    }

    return {
      success: true,
      image: data.result,
    }
  } catch (error) {
    console.error('Cloudflare get image error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Delete an image from Cloudflare
 */
export async function deleteImage(
  imageId: string
): Promise<{ success: boolean; error?: string }> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const response = await fetch(`${CF_IMAGES_API}/${imageId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    })

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to delete image',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Cloudflare delete image error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get the delivery URL for an image with a specific variant
 *
 * Cloudflare Images URL format:
 * https://imagedelivery.net/<account_hash>/<image_id>/<variant_name>
 *
 * Or with flexible variants:
 * https://imagedelivery.net/<account_hash>/<image_id>/w=<width>,h=<height>,fit=<fit>
 */
export function getImageUrl(
  imageId: string,
  variant: ImageVariant | string = 'medium'
): string {
  if (!CF_IMAGES_DELIVERY) {
    // Fallback to direct API URL if account hash not set
    return `https://imagedelivery.net/${CF_ACCOUNT_ID}/${imageId}/${variant}`
  }
  return `${CF_IMAGES_DELIVERY}/${imageId}/${variant}`
}

/**
 * Get image URL with custom transformations
 *
 * @param imageId - Cloudflare image ID
 * @param options - Transformation options
 */
export function getImageUrlWithTransform(
  imageId: string,
  options: {
    width?: number
    height?: number
    fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad'
    quality?: number
    format?: 'auto' | 'avif' | 'webp' | 'json'
    blur?: number
    sharpen?: number
    brightness?: number
    contrast?: number
  }
): string {
  const transforms: string[] = []

  if (options.width) transforms.push(`w=${options.width}`)
  if (options.height) transforms.push(`h=${options.height}`)
  if (options.fit) transforms.push(`fit=${options.fit}`)
  if (options.quality) transforms.push(`q=${options.quality}`)
  if (options.format) transforms.push(`f=${options.format}`)
  if (options.blur) transforms.push(`blur=${options.blur}`)
  if (options.sharpen) transforms.push(`sharpen=${options.sharpen}`)
  if (options.brightness) transforms.push(`brightness=${options.brightness}`)
  if (options.contrast) transforms.push(`contrast=${options.contrast}`)

  const variant = transforms.length > 0 ? transforms.join(',') : 'public'

  if (!CF_IMAGES_DELIVERY) {
    return `https://imagedelivery.net/${CF_ACCOUNT_ID}/${imageId}/${variant}`
  }
  return `${CF_IMAGES_DELIVERY}/${imageId}/${variant}`
}

/**
 * Generate a blur hash placeholder URL
 * Returns a tiny, blurred version of the image for loading states
 */
export function getBlurPlaceholderUrl(imageId: string): string {
  return getImageUrlWithTransform(imageId, {
    width: 20,
    quality: 30,
    blur: 50,
  })
}

/**
 * Get responsive image URLs for srcset
 */
export function getResponsiveImageUrls(imageId: string): {
  src: string
  srcSet: string
  sizes: string
  blurDataUrl: string
} {
  const widths = [320, 640, 960, 1280, 1920]

  const srcSet = widths
    .map((w) => `${getImageUrlWithTransform(imageId, { width: w, fit: 'scale-down' })} ${w}w`)
    .join(', ')

  return {
    src: getImageUrlWithTransform(imageId, { width: 960, fit: 'scale-down' }),
    srcSet,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    blurDataUrl: getBlurPlaceholderUrl(imageId),
  }
}

/**
 * List all images with pagination
 */
export async function listImages(
  page: number = 1,
  perPage: number = 100
): Promise<{
  success: boolean
  images?: CloudflareImageDetails[]
  total?: number
  error?: string
}> {
  if (!CF_ACCOUNT_ID || !CF_IMAGES_API_TOKEN) {
    return { success: false, error: 'Cloudflare Images credentials not configured' }
  }

  try {
    const response = await fetch(
      `${CF_IMAGES_API}?page=${page}&per_page=${perPage}`,
      { headers: getHeaders() }
    )

    const data = await response.json()

    if (!data.success) {
      return {
        success: false,
        error: data.errors?.[0]?.message || 'Failed to list images',
      }
    }

    return {
      success: true,
      images: data.result.images,
      total: data.result_info?.total_count,
    }
  } catch (error) {
    console.error('Cloudflare list images error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Batch delete images
 */
export async function batchDeleteImages(
  imageIds: string[]
): Promise<{ success: boolean; deleted: number; errors: string[] }> {
  const results = await Promise.allSettled(
    imageIds.map((id) => deleteImage(id))
  )

  const deleted = results.filter(
    (r) => r.status === 'fulfilled' && r.value.success
  ).length

  const errors = results
    .filter((r) => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success))
    .map((r, i) => {
      if (r.status === 'rejected') return `${imageIds[i]}: ${r.reason}`
      if (r.status === 'fulfilled' && r.value.error) return `${imageIds[i]}: ${r.value.error}`
      return `${imageIds[i]}: Unknown error`
    })

  return {
    success: errors.length === 0,
    deleted,
    errors,
  }
}
