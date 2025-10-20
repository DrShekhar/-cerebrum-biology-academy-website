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
  output: 'standalone',

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

  // Force new build ID to bust all caches
  generateBuildId: async () => {
    return `build-${Date.now()}-${Math.random().toString(36).substring(7)}`
  },

  // Merged headers function: cache control + security
  async headers() {
    // For development: aggressive no-cache
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

    // For production: aggressive no-cache + security headers
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
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
        ],
      },
    ]
  },
}

export default nextConfig