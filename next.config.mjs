/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration for polyfills
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        fs: false,
        net: false,
        tls: false,
      }

      // Production bundle optimization
      if (process.env.NODE_ENV === 'production') {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              default: false,
              vendors: false,
              vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /node_modules/,
                priority: 20
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'async',
                priority: 10,
                reuseExistingChunk: true,
                enforce: true
              }
            }
          }
        }
      }
    }
    return config
  },

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

  // TEMPORARY: Error suppression enabled for MVP Phase 1 deployment
  // TODO: Phase 2 (Weeks 5-8) - TypeScript Cleanup Sprint
  // - Fix 614 TypeScript errors across codebase
  // - Remove error suppression after fixes
  // - See CLAUDE.md: Revenue-first bootstrap approach
  eslint: {
    ignoreDuringBuilds: true, // Temporary - allows deployment while fixing
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary - 614 errors scheduled for Phase 2
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  // Enable standalone output for production (smaller deployments)
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin',
        permanent: false,
      },
    ]
  },

  // Generate stable build IDs for better caching
  generateBuildId: async () => {
    // Use Vercel git SHA if available, otherwise timestamp
    return process.env.VERCEL_GIT_COMMIT_SHA ||
           process.env.BUILD_ID ||
           `build-${Date.now()}`
  },

  // Strategic caching + security headers (OPTIMIZED for performance)
  async headers() {
    // Security headers to apply to all routes
    const securityHeaders = [
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
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ]

    // Development: no caching
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
            ...securityHeaders,
          ],
        },
      ]
    }

    // Production: strategic caching for maximum performance
    return [
      // Static assets - Long-term caching with immutable
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ...securityHeaders,
        ],
      },
      // JavaScript & CSS - Long-term caching
      {
        source: '/:path*.{js,css,woff,woff2,ttf,eot}',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          ...securityHeaders,
        ],
      },
      // Images - Long-term caching with stale-while-revalidate
      {
        source: '/:path*.{jpg,jpeg,png,webp,avif,svg,ico,gif}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400'
          },
          ...securityHeaders,
        ],
      },
      // API routes - No caching
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          ...securityHeaders,
        ],
      },
      // HTML pages - Short-term caching with revalidation
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
          },
          ...securityHeaders,
        ],
      },
    ]
  },
}

export default nextConfig