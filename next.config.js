/** @type {import('next').NextConfig} */
const nextConfig = {
  // Consistent image optimization for production
  images: {
    // Enable optimization for production, disable locally for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
    domains: [
      'localhost',
      'cdn.cerebrumbiologyacademy.com',
      'images.unsplash.com',
      'cerebrumbiologyacademy.com',
      'www.cerebrumbiologyacademy.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 375, 420, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for production
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Skip build-time checks for faster deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  output: 'standalone',

  // Development-only cache disabling
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-cache, no-store, must-revalidate, max-age=0',
            },
            {
              key: 'Pragma',
              value: 'no-cache',
            },
            {
              key: 'Expires',
              value: '0',
            },
          ],
        },
      ]
    }

    // Production headers for security and performance
    return [
      {
        source: '/((?!_next|api|not-found).*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Language',
            value: 'en-IN, hi-IN',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig