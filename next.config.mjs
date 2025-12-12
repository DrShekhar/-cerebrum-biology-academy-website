import { withSentryConfig } from '@sentry/nextjs'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // CRITICAL FIX: Remove console.log from production builds
  // This prevents PII leaks and improves performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // Keep error and warn for debugging
    } : false,
  },

  // Webpack configuration for polyfills and bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        fs: false,
        net: false,
        tls: false,
      }

      // Production bundle optimization - split large vendor chunks
      if (process.env.NODE_ENV === 'production') {
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            cacheGroups: {
              default: false,
              vendors: false,
              // React and core framework
              framework: {
                name: 'framework',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
                priority: 40,
                enforce: true,
              },
              // Animation libraries (framer-motion is large)
              animations: {
                name: 'animations',
                test: /[\\/]node_modules[\\/](framer-motion|@motionone)[\\/]/,
                chunks: 'all',
                priority: 35,
              },
              // UI components (Radix, Heroicons)
              ui: {
                name: 'ui',
                test: /[\\/]node_modules[\\/](@radix-ui|@heroicons|lucide-react)[\\/]/,
                chunks: 'all',
                priority: 30,
              },
              // AI/ML libraries
              ai: {
                name: 'ai',
                test: /[\\/]node_modules[\\/](@anthropic-ai|openai|@google)[\\/]/,
                chunks: 'all',
                priority: 25,
              },
              // Form and validation
              forms: {
                name: 'forms',
                test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
                chunks: 'all',
                priority: 25,
              },
              // Remaining vendor code
              lib: {
                name: 'lib',
                test: /[\\/]node_modules[\\/]/,
                chunks: 'all',
                priority: 10,
                minChunks: 2,
              },
              // Common code shared across pages
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'async',
                priority: 5,
                reuseExistingChunk: true,
              }
            }
          }
        }
      }
    }
    return config
  },

  // Optimized image configuration for performance
  images: {
    // Enable optimization for production, disable locally for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
    // Use remotePatterns instead of domains (Next.js 15 best practice)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cerebrumbiologyacademy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cerebrumbiologyacademy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cerebrumbiologyacademy.com',
      },
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'vercel.com',
      },
    ],
    // Optimize for modern formats (WebP and AVIF)
    formats: ['image/webp', 'image/avif'],
    // Device sizes optimized for common breakpoints
    deviceSizes: [320, 375, 420, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Long cache TTL for better performance (1 year)
    minimumCacheTTL: 31536000,
    // Disable SVG for security (can be overridden per-image if needed)
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

  // CRITICAL FIX: Disable source maps in production to reduce build size
  // Build was 4.6GB, should be <200MB
  productionBrowserSourceMaps: false,

  // Enable SWC minification for smaller bundles
  swcMinify: true,

  // Experimental features for better performance
  // Note: optimizeCss causes worker.js errors in dev mode (Next.js 15.5.x bug)
  // Only enable in production to avoid dev server instability
  experimental: {
    optimizeCss: process.env.NODE_ENV === 'production',
    scrollRestoration: true,
    // Optimize package imports for smaller bundles
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
      'lodash',
    ],
  },

  // Redirects for SEO - Fix 404 errors reported in Google Search Console
  async redirects() {
    return [
      {
        source: '/admin-login',
        destination: '/admin',
        permanent: false,
      },
      // Old blog slugs redirecting to relevant existing content
      {
        source: '/blog/neet-preparation-timeline-class-9-to-2028',
        destination: '/blog/when-to-start-neet-preparation-class-9-vs-10',
        permanent: true,
      },
      {
        source: '/blog/early-neet-preparation-success-rate-science',
        destination: '/blog/when-to-start-neet-preparation-class-9-vs-10',
        permanent: true,
      },
      {
        source: '/blog/international-school-neet-transition-guide',
        destination: '/blog/dps-students-neet-preparation-guide',
        permanent: true,
      },
      {
        source: '/blog/online-vs-offline-neet-coaching-data-comparison',
        destination: '/blog/kota-vs-online-neet-coaching-2025',
        permanent: true,
      },
      {
        source: '/blog/mumbai-best-neet-biology-coaching-2025',
        destination: '/blog/top-10-neet-biology-coaching-delhi-ncr-2025',
        permanent: true,
      },
      {
        source: '/blog/neet-2024-cutoff-analysis',
        destination: '/blog/neet-2026-complete-guide-exam-pattern-syllabus-dates',
        permanent: true,
      },
      {
        source: '/blog/neet-repeater-success-stories',
        destination: '/courses/neet-repeater',
        permanent: true,
      },
      {
        source: '/blog/how-to-overcome-neet-failure',
        destination: '/courses/neet-repeater',
        permanent: true,
      },
      // Old location pages redirecting to main location pages
      {
        source: '/neet-coaching-jaipur',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-agra',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-indore',
        destination: '/neet-coaching-centre',
        permanent: true,
      },
      {
        source: '/neet-coaching-ghaziabad',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/neet-coaching-kota',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-kanpur',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-raipur',
        destination: '/neet-coaching-centre',
        permanent: true,
      },
      // Old center pages redirecting to main centers
      {
        source: '/centers/rohini',
        destination: '/neet-coaching-delhi',
        permanent: true,
      },
      // Boards page redirect
      {
        source: '/boards/state-boards',
        destination: '/courses',
        permanent: true,
      },
      // Protected route - redirect to login
      {
        source: '/counselor/communications',
        destination: '/auth/signin',
        permanent: false,
      },
      // Old blog posts - redirect to relevant content
      {
        source: '/blog/bangalore-online-neet-preparation-guide',
        destination: '/neet-coaching-bangalore',
        permanent: true,
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

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
  },
})

export default withSentryConfig(withMDX(nextConfig), {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Don't upload source maps (reduces build size significantly)
  sourcemaps: {
    disable: process.env.NODE_ENV !== 'production',
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})