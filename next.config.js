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

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },

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
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
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
}

export default nextConfig