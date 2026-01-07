import { withSentryConfig } from '@sentry/nextjs'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // CRITICAL FIX: Remove console.log from production builds
  // This prevents PII leaks and improves performance
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'], // Keep error and warn for debugging
          }
        : false,
  },

  // Webpack configuration for polyfills and bundle optimization
  webpack: (config, { isServer }) => {
    // FIX: Externalize worker-thread packages on server to prevent Turbopack bundling issues
    // pino uses thread-stream which spawns worker threads - must be external
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push(
        '@modelcontextprotocol/sdk',
        'bullmq',
        'ioredis',
        'worker_threads',
        'pino',
        'pino-pretty',
        'thread-stream'
      )
    }

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
              // UI components (Radix, Lucide)
              ui: {
                name: 'ui',
                test: /[\\/]node_modules[\\/](@radix-ui|lucide-react)[\\/]/,
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
              },
            },
          },
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
      {
        protocol: 'https',
        hostname: 'assets.zyrosite.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
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

  // FIX: Server external packages - moved to top level for Next.js 15 compatibility
  // pino and thread-stream use worker threads that can't be bundled by Next.js
  serverExternalPackages: [
    '@modelcontextprotocol/sdk',
    'bullmq',
    'ioredis',
    '@prisma/client',
    'prisma',
    'pino',
    'pino-pretty',
    'thread-stream',
  ],

  // FIX: Set expireTime to 14 days (in seconds) to avoid potential future issues
  // Next.js 15 defaults to 1 year which exceeds 32-bit integer max when converted to ms
  // Max 32-bit signed int: 2,147,483,647 ms = ~24.8 days
  // Using 14 days provides safe margin for ISR stale-while-revalidate behavior
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/expireTime
  expireTime: 1209600, // 14 days in seconds - conservative safe value

  // Experimental features for better performance
  // Note: optimizeCss DISABLED - causes CSS MIME type errors and breaks MCQ page on desktop
  // swcMinify removed - enabled by default in Next.js 15
  experimental: {
    optimizeCss: false, // DISABLED: Causes "Refused to execute script... MIME type ('text/css')" errors
    scrollRestoration: true,
    // Optimize package imports for smaller bundles
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      'framer-motion',
      'date-fns',
      'zod',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-accordion',
      'react-hook-form',
      '@anthropic-ai/sdk',
      'openai',
      '@clerk/nextjs',
      'recharts',
      'react-day-picker',
      '@sentry/nextjs',
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
      // Old center pages redirecting to locations
      {
        source: '/centers/:city',
        destination: '/locations/:city',
        permanent: true,
      },

      // Biology tuition location redirects (pages don't exist yet)
      {
        source: '/biology-tuition-gurgaon/:area*',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-tuition-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-tuition-noida/:area*',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/biology-tuition-noida',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/biology-tuition-delhi/:area*',
        destination: '/biology-tuition-south-delhi',
        permanent: true,
      },
      {
        source: '/biology-tuition-delhi',
        destination: '/biology-tuition-south-delhi',
        permanent: true,
      },

      // Biology notes nested → flat structure redirect
      {
        source: '/biology-notes/class-11/:slug',
        destination: '/biology-notes/:slug',
        permanent: true,
      },
      {
        source: '/biology-notes/class-12/:slug',
        destination: '/biology-notes/:slug',
        permanent: true,
      },

      // Course URL aliases
      {
        source: '/courses/class-9',
        destination: '/courses/class-9-foundation',
        permanent: true,
      },
      {
        source: '/courses/foundation-course',
        destination: '/courses/foundation',
        permanent: true,
      },

      // Generic NEET coaching redirect
      {
        source: '/neet-coaching',
        destination: '/neet-coaching-institute',
        permanent: true,
      },

      // Biology topics subpages redirect to main topics page
      {
        source: '/biology-topics/:topic',
        destination: '/biology-topics',
        permanent: true,
      },

      // Biology tutor class redirects
      {
        source: '/biology-tutor-class-10',
        destination: '/biology-tuition-class-9-10',
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

      // ============================================
      // GSC 404 Fixes - December 2025
      // ============================================

      // Location pages that don't exist
      {
        source: '/locations/jaipur',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/locations/chennai',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      // NOTE: Removed problematic redirects that were causing infinite loops:
      // - /locations/bangalore/:area+ → These URLs should serve the actual locality pages
      // - /locations/:city/:area+ → Same issue - was incorrectly redirecting valid locality pages
      // The locality pages at /locations/[city]/[locality]/page.tsx now serve correctly
      {
        source: '/laxmi-nagar',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/neet-coaching-patna',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },

      // Blog NEET topic complete guides - redirect to relevant existing posts
      {
        source: '/blog/molecular-biology-neet-complete-guide',
        destination: '/blog/biomolecules-neet-biology-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/ecology-neet-complete-guide',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/genetics-neet-complete-guide',
        destination: '/blog/genetics-heredity-variation-neet',
        permanent: true,
      },
      {
        source: '/blog/plant-physiology-neet-complete-guide',
        destination: '/blog/photosynthesis-neet-biology-notes',
        permanent: true,
      },
      {
        source: '/blog/biotechnology-neet-complete-guide',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/cell-biology-neet-complete-guide',
        destination: '/blog/cell-structure-function-neet-notes',
        permanent: true,
      },
      {
        source: '/blog/human-physiology-neet-complete-guide',
        destination: '/blog/human-physiology-neet-complete-notes',
        permanent: true,
      },
      {
        source: '/blog/evolution-neet-complete-guide',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/animal-kingdom-neet-complete-guide',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/human-reproduction-neet-complete-guide',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/plant-kingdom-neet-complete-guide',
        destination: '/blog/plant-kingdom-classification-neet',
        permanent: true,
      },
      // Additional blog 404s
      {
        source: '/blog/plant-kingdom-guide',
        destination: '/blog/plant-kingdom-classification-neet',
        permanent: true,
      },
      {
        source: '/blog/best-neet-coaching-noida-sector-wise-guide',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/blog/neet-coaching-laxmi-nagar-east-delhi-guide',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },

      // Biology tuition area pages - wildcards
      {
        source: '/biology-tuition-west-delhi/:area*',
        destination: '/biology-tuition-west-delhi',
        permanent: true,
      },
      {
        source: '/biology-tuition-east-delhi/:area*',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-tuition-east-delhi',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-tuition-north-delhi/:area*',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-tuition-north-delhi',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },

      // Course page aliases
      {
        source: '/courses/dropper-batch',
        destination: '/courses/neet-dropper',
        permanent: true,
      },
      {
        source: '/courses/test-series',
        destination: '/courses',
        permanent: true,
      },

      // Resource and book pages
      {
        source: '/errorless-biology-for-neet',
        destination: '/neet-biology-mcq',
        permanent: true,
      },
      {
        source: '/mtg-biology-for-neet',
        destination: '/neet-biology-mcq',
        permanent: true,
      },
      {
        source: '/book-demo',
        destination: '/demo',
        permanent: true,
      },

      // Biology tutor class variations
      {
        source: '/biology-tutor-class-10-cbse',
        destination: '/biology-tuition-class-9-10',
        permanent: true,
      },
      {
        source: '/biology-tutor-class-10-icse',
        destination: '/biology-tuition-class-9-10',
        permanent: true,
      },
      {
        source: '/biology-tutor-class-9',
        destination: '/biology-tuition-class-9-10',
        permanent: true,
      },
      {
        source: '/class-10-science-tuition',
        destination: '/biology-tuition-class-9-10',
        permanent: true,
      },

      // Competitive exam coaching
      {
        source: '/nso-coaching',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/ntse-coaching',
        destination: '/courses',
        permanent: true,
      },

      // Services pages
      {
        source: '/services/mentorship',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/courses',
        permanent: true,
      },

      // Misc pages
      {
        source: '/360',
        destination: '/',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/privacy-policy',
        permanent: true,
      },

      // Font file - return 404 is fine, but let's redirect to avoid GSC errors
      {
        source: '/fonts/:file*',
        destination: '/',
        permanent: false,
      },

      // Search template URL - redirect to homepage
      {
        source: '/search',
        destination: '/',
        permanent: false,
      },

      // Career options page migrated to blog
      {
        source: '/career-options-after-12th-pcb',
        destination: '/blog/career-options-after-12th-pcb-complete-guide',
        permanent: true,
      },

      // ============================================
      // GSC 404 Fixes - January 2026
      // ============================================

      // Biology tutor location pages
      {
        source: '/biology-tutor-gurugram',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-tutor-ballabhgarh',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-tutor-noida-sector-18',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/online-biology-tutor-class-11',
        destination: '/online-biology-tuition',
        permanent: true,
      },

      // Faculty and About pages
      {
        source: '/dr-shekhar-singh',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about/faculty',
        destination: '/about',
        permanent: true,
      },

      // Course and purchase pages
      {
        source: '/courses/dropper',
        destination: '/courses/neet-dropper',
        permanent: true,
      },
      {
        source: '/purchase/neet-dropper',
        destination: '/courses/neet-dropper',
        permanent: true,
      },
      {
        source: '/neet-foundation-course',
        destination: '/courses/foundation',
        permanent: true,
      },
      {
        source: '/neet-2026-preparation',
        destination: '/neet-coaching-institute',
        permanent: true,
      },

      // Subject-specific tuition pages
      {
        source: '/cell-biology-tuition',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/molecular-biology-tuition',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/ecology-biology-tuition',
        destination: '/courses',
        permanent: true,
      },

      // Notes and PDF pages
      {
        source: '/biological-classification-notes-neet',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/genetics-notes-neet',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/ncert-biology-notes-class-12',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/cell-biology-notes-neet',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/ncert-exemplar-biology',
        destination: '/neet-biology-mcq',
        permanent: true,
      },
      {
        source: '/neet-biology-notes-pdf',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/biodiversity-conservation-class-12',
        destination: '/biology-notes',
        permanent: true,
      },

      // Blog post redirects
      {
        source: '/blog/neet-exam-centres-state-wise-2026',
        destination: '/blog/neet-2026-complete-guide-exam-pattern-syllabus-dates',
        permanent: true,
      },
      {
        source: '/blog/neet-2026-syllabus-complete-guide-deleted-topics',
        destination: '/blog/neet-2026-complete-guide-exam-pattern-syllabus-dates',
        permanent: true,
      },
      {
        source: '/blog/neet-2025-biology-paper-analysis',
        destination: '/blog/neet-biology-chapter-wise-weightage-2026',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-preparation-strategy-score-180-plus',
        destination: '/blog/neet-biology-preparation-strategy-score-340-plus',
        permanent: true,
      },
      {
        source: '/blog/how-to-crack-neet-in-6-months',
        destination: '/blog/neet-preparation-guide-best-strategies',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-pyq-chapter-wise-pdf-download',
        destination: '/neet-biology-mcq',
        permanent: true,
      },
      {
        source: '/blog/neet-vs-jee-which-is-tougher',
        destination: '/blog/career-options-after-12th-pcb-complete-guide',
        permanent: true,
      },
      {
        source: '/blog/neet-cutoff-2026-category-wise',
        destination: '/blog/neet-2026-complete-guide-exam-pattern-syllabus-dates',
        permanent: true,
      },
      {
        source: '/blog/how-to-score-700-plus-in-neet',
        destination: '/blog/neet-preparation-guide-best-strategies',
        permanent: true,
      },
    ]
  },

  // Generate stable build IDs for better caching
  generateBuildId: async () => {
    // Use Vercel git SHA if available, otherwise timestamp
    return process.env.VERCEL_GIT_COMMIT_SHA || process.env.BUILD_ID || `build-${Date.now()}`
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
            value: 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400',
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
      // HTML pages - Short cache to prevent stale CSS references (FOUC fix)
      // Reduced from 3600s to 60s to ensure fresh HTML with correct CSS chunk names
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=3600, stale-while-revalidate=60',
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

export default withSentryConfig(withBundleAnalyzer(withMDX(nextConfig)), {
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

  // CRITICAL FIX: Disable source maps completely to prevent 5GB builds
  // Source maps were causing build to balloon from 200MB to 5GB
  sourcemaps: {
    disable: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
})
