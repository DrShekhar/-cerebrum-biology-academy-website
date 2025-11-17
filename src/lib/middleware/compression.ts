// API Response Compression Middleware for Cerebrum Biology Academy
// Uses Compression Streams API (Edge Runtime compatible)

import { NextRequest, NextResponse } from 'next/server'

/**
 * Compression configuration
 */
export const COMPRESSION_CONFIG = {
  // Minimum size to compress (bytes) - don't compress small responses
  minSize: 1024, // 1KB

  // Content types to compress
  compressibleTypes: [
    'application/json',
    'application/javascript',
    'text/html',
    'text/css',
    'text/plain',
    'text/xml',
    'application/xml',
    'image/svg+xml',
  ],

  // Default compression level (gzip quality)
  level: 6, // 0-9, higher = better compression but slower
}

/**
 * Check if the request accepts compression
 */
export function acceptsCompression(req: NextRequest): 'gzip' | 'deflate' | null {
  const acceptEncoding = req.headers.get('accept-encoding') || ''

  // Prefer gzip over deflate
  if (acceptEncoding.includes('gzip')) {
    return 'gzip'
  } else if (acceptEncoding.includes('deflate')) {
    return 'deflate'
  }

  return null
}

/**
 * Check if response should be compressed
 */
export function shouldCompress(contentType: string | null, contentLength: number): boolean {
  // Don't compress if no content type
  if (!contentType) return false

  // Don't compress if too small
  if (contentLength < COMPRESSION_CONFIG.minSize) return false

  // Check if content type is compressible
  return COMPRESSION_CONFIG.compressibleTypes.some((type) =>
    contentType.toLowerCase().includes(type)
  )
}

/**
 * Compress response body using Compression Streams API
 */
export async function compressResponse(
  body: ReadableStream<Uint8Array>,
  encoding: 'gzip' | 'deflate'
): Promise<ReadableStream<Uint8Array>> {
  // Use the Compression Streams API available in Edge Runtime
  const compressionStream =
    encoding === 'gzip' ? new CompressionStream('gzip') : new CompressionStream('deflate')

  return body.pipeThrough(compressionStream as any) as ReadableStream<Uint8Array>
}

/**
 * Middleware to add compression to API responses
 *
 * Usage in middleware.ts:
 *
 * import { compressResponseMiddleware } from '@/lib/middleware/compression'
 *
 * export default async function middleware(req: NextRequest) {
 *   // ... your existing middleware logic ...
 *
 *   const response = NextResponse.next()
 *
 *   // Add compression
 *   return await compressResponseMiddleware(req, response)
 * }
 */
export async function compressResponseMiddleware(
  req: NextRequest,
  response: NextResponse
): Promise<NextResponse> {
  // Skip compression for non-200 responses
  if (response.status !== 200) {
    return response
  }

  // Check if client accepts compression
  const encoding = acceptsCompression(req)
  if (!encoding) {
    return response
  }

  // Get response content type and length
  const contentType = response.headers.get('content-type')
  const contentLength = parseInt(response.headers.get('content-length') || '0', 10)

  // Check if we should compress this response
  if (!shouldCompress(contentType, contentLength)) {
    return response
  }

  // Get the response body as a stream
  const body = response.body
  if (!body) {
    return response
  }

  try {
    // Compress the response body
    const compressedBody = await compressResponse(body, encoding)

    // Create new response with compressed body
    const compressedResponse = new NextResponse(compressedBody, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })

    // Update headers
    compressedResponse.headers.set('Content-Encoding', encoding)
    compressedResponse.headers.set('Vary', 'Accept-Encoding')
    compressedResponse.headers.delete('Content-Length') // Will be recalculated

    return compressedResponse
  } catch (error) {
    // If compression fails, return original response
    console.error('Compression failed:', error)
    return response
  }
}

/**
 * Helper to create a compressed JSON response
 *
 * Usage in API routes:
 *
 * import { compressedJson } from '@/lib/middleware/compression'
 *
 * export async function GET(req: NextRequest) {
 *   const data = { large: 'dataset', items: [...] }
 *   return compressedJson(req, data)
 * }
 */
export async function compressedJson(
  req: NextRequest,
  data: any,
  status = 200
): Promise<NextResponse> {
  // Serialize JSON
  const json = JSON.stringify(data)
  const bytes = new TextEncoder().encode(json)

  // Check if client accepts compression
  const encoding = acceptsCompression(req)

  // If no compression support or data too small, return uncompressed
  if (!encoding || bytes.length < COMPRESSION_CONFIG.minSize) {
    return NextResponse.json(data, { status })
  }

  try {
    // Create a stream from the bytes
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(bytes)
        controller.close()
      },
    })

    // Compress the stream
    const compressedStream = await compressResponse(stream, encoding)

    // Create response with compressed body
    const response = new NextResponse(compressedStream, {
      status,
      headers: {
        'Content-Type': 'application/json',
        'Content-Encoding': encoding,
        Vary: 'Accept-Encoding',
      },
    })

    return response
  } catch (error) {
    // If compression fails, return uncompressed
    console.error('JSON compression failed:', error)
    return NextResponse.json(data, { status })
  }
}

/**
 * Statistics tracking for compression performance
 */
export class CompressionStats {
  private static stats = {
    totalRequests: 0,
    compressedRequests: 0,
    originalBytes: 0,
    compressedBytes: 0,
    compressionErrors: 0,
  }

  static recordCompression(originalSize: number, compressedSize: number) {
    this.stats.totalRequests++
    this.stats.compressedRequests++
    this.stats.originalBytes += originalSize
    this.stats.compressedBytes += compressedSize
  }

  static recordSkipped() {
    this.stats.totalRequests++
  }

  static recordError() {
    this.stats.totalRequests++
    this.stats.compressionErrors++
  }

  static getStats() {
    const compressionRatio =
      this.stats.originalBytes > 0
        ? (this.stats.compressedBytes / this.stats.originalBytes) * 100
        : 0

    const savedBytes = this.stats.originalBytes - this.stats.compressedBytes
    const compressionRate =
      this.stats.totalRequests > 0
        ? (this.stats.compressedRequests / this.stats.totalRequests) * 100
        : 0

    return {
      ...this.stats,
      compressionRatio: compressionRatio.toFixed(2) + '%',
      savedBytes,
      savedMB: (savedBytes / 1024 / 1024).toFixed(2) + ' MB',
      compressionRate: compressionRate.toFixed(2) + '%',
    }
  }

  static reset() {
    this.stats = {
      totalRequests: 0,
      compressedRequests: 0,
      originalBytes: 0,
      compressedBytes: 0,
      compressionErrors: 0,
    }
  }
}
