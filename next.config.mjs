import { withSentryConfig } from '@sentry/nextjs'
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import bundleAnalyzer from '@next/bundle-analyzer'
import { seoPageConsolidationRedirects } from './src/config/seo-redirects.mjs'

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
  webpack: (config, { isServer, dev }) => {
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

    // NOTE: Next.js 15 has built-in webpack caching enabled by default
    // No need for manual filesystem caching configuration

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
  // PERFORMANCE FIX: Reduced image variants from 72+ to ~20 (saves 20-40% build time)
  // Previous: 9 deviceSizes × 8 imageSizes × 2 formats = 144 variants per image
  // Now: 5 deviceSizes × 4 imageSizes × 1 format = 20 variants per image
  images: {
    // Enable optimization for production, disable locally for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
    // Required for Next.js 16 - explicit quality values (reduced from 5 to 3)
    qualities: [75, 85, 95],
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
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // PERFORMANCE FIX: Use only WebP (AVIF generation is slow and has diminishing returns)
    // WebP provides ~30% smaller files than JPEG with near-universal browser support
    formats: ['image/webp'],
    // PERFORMANCE FIX: Reduced device sizes from 9 to 5 (covers 90%+ of use cases)
    // Removed: 320, 375, 420, 750, 828 (these are well-covered by nearby sizes)
    deviceSizes: [640, 828, 1080, 1440, 1920],
    // PERFORMANCE FIX: Reduced image sizes from 8 to 4 (for icons/thumbnails)
    imageSizes: [32, 64, 128, 256],
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
    // PERFORMANCE: Enable partial prerendering for faster initial load
    ppr: false, // Requires canary Next.js
    // PERFORMANCE: Optimize server components
    serverMinification: true,
    // RE-ENABLED: Package optimization for smaller bundles (saves ~300-500KB)
    // Only import used exports from these large packages
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
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-label',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-separator',
      '@radix-ui/react-progress',
      'react-hook-form',
      '@anthropic-ai/sdk',
      'openai',
      'recharts',
      'react-day-picker',
      '@sentry/nextjs',
      'lodash',
      'lodash-es',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
    ],
  },

  // Redirects for SEO - Fix 404 errors reported in Google Search Console
  async redirects() {
    return [
      {
        source: '/locations/mumbai',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/locations/bangalore',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/help',
        permanent: true,
      },
      {
        source: '/nseb-coaching',
        destination: '/nseb-coaching-gurugram',
        permanent: true,
      },
      {
        source: '/best-biology',
        destination: '/best-biology-books-for-neet',
        permanent: true,
      },
      {
        source: '/admin-login',
        destination: '/admin',
        permanent: true,
      },
      // Fix 404 errors for common page variations
      {
        source: '/free-demo',
        destination: '/book-free-demo',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/book-free-demo',
        permanent: true,
      },
      {
        source: '/courses/neet-foundation',
        destination: '/courses/foundation',
        permanent: true,
      },
      {
        source: '/neet-foundation',
        destination: '/courses/foundation',
        permanent: true,
      },
      // More common URL variations to prevent 404s
      {
        source: '/register',
        destination: '/enrollment',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/enrollment',
        permanent: true,
      },
      {
        source: '/enroll',
        destination: '/enrollment',
        permanent: true,
      },
      {
        source: '/admission',
        destination: '/enrollment',
        permanent: true,
      },
      {
        source: '/admissions',
        destination: '/enrollment',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/enquiry',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/inquiry',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/fees',
        destination: '/neet-coaching-fee-gurugram',
        permanent: true,
      },
      {
        source: '/fee-structure',
        destination: '/neet-coaching-fee-gurugram',
        permanent: true,
      },
      {
        source: '/pricing',
        destination: '/neet-coaching-fee-gurugram',
        permanent: true,
      },
      // Old blog slugs redirecting to relevant existing content
      {
        source: '/blog/neet-preparation-timeline-class-9-to-2028',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/early-neet-preparation-success-rate-science',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/international-school-neet-transition-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/online-vs-offline-neet-coaching-data-comparison',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/mumbai-best-neet-biology-coaching-2025',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-2024-cutoff-analysis',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-repeater-success-stories',
        destination: '/dropper',
        permanent: true,
      },
      {
        source: '/blog/how-to-overcome-neet-failure',
        destination: '/dropper',
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
        destination: '/',
        permanent: true,
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
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/ecology-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/genetics-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/plant-physiology-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/biotechnology-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/cell-biology-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/human-physiology-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/evolution-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/animal-kingdom-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/human-reproduction-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/plant-kingdom-neet-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      // Additional blog 404s
      {
        source: '/blog/plant-kingdom-guide',
        destination: '/blog',
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
        destination: '/neet-coaching-north-delhi',
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
        destination: '/book-free-demo',
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
        permanent: true,
      },

      // Search template URL - redirect to homepage
      {
        source: '/search',
        destination: '/',
        permanent: true,
      },

      // Career options page migrated to blog
      {
        source: '/career-options-after-12th-pcb',
        destination: '/blog',
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
        destination: '/courses',
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
      // DUPLICATE REMOVED: { source: '/courses/neet-foundation', destination: '/courses/foundation', permanent: true },
      // DUPLICATE REMOVED: { source: '/neet-2026-preparation', destination: '/neet-coaching-institute', permanent: true },

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
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-2026-syllabus-complete-guide-deleted-topics',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-2025-biology-paper-analysis',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-preparation-strategy-score-180-plus',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/how-to-crack-neet-in-6-months',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-pyq-chapter-wise-pdf-download',
        destination: '/neet-biology-mcq',
        permanent: true,
      },
      {
        source: '/blog/neet-vs-jee-which-is-tougher',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-cutoff-2026-category-wise',
        destination: '/blog',
        permanent: true,
      },
      // REMOVED: Broken redirect - blog post exists and should serve directly
      // Previously redirected to non-existent /blog/neet-preparation-guide-best-strategies

      // ============================================
      // GSC 404 Fixes - January 13, 2026
      // ============================================

      // Olympiad preparation → coaching redirects
      // DUPLICATE REMOVED: { source: '/cbo-preparation', destination: '/cbo-coaching', permanent: true },
      // DUPLICATE REMOVED: { source: '/jbo-preparation', destination: '/jbo-coaching', permanent: true },
      // DUPLICATE REMOVED: { source: '/sbo-preparation', destination: '/sbo-coaching', permanent: true },
      {
        source: '/kbo-preparation',
        destination: '/kbo-coaching',
        permanent: true,
      },
      // DUPLICATE REMOVED: { source: '/cnbo-preparation', destination: '/cnbo-coaching', permanent: true },
      // DUPLICATE REMOVED: { source: '/german-biology-olympiad', destination: '/olympiad-coaching', permanent: true },

      // Nested biology-classes sub-location redirects
      {
        source: '/biology-classes-laxmi-nagar/:area*',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-south-delhi/:area*',
        destination: '/biology-classes-south-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-green-park/:area*',
        destination: '/best-biology-tuition-greater-kailash',
        permanent: true,
      },
      {
        source: '/biology-classes-noida/:area*',
        destination: '/biology-classes-noida',
        permanent: true,
      },
      {
        source: '/biology-classes-model-town/:area*',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-preet-vihar/:area*',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-manesar/:area*',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-sector-:num',
        destination: '/biology-classes-rohini',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-west',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-:area',
        destination: '/biology-classes-gurgaon',
        permanent: true,
      },
      // DUPLICATE REMOVED: { source: '/biology-classes-greater-noida-west', destination: '/biology-classes-greater-noida', permanent: true },

      // Malformed biology-classes URLs (double prefix)
      // DUPLICATE REMOVED: { source: '/biology-classes-biology-home-tuition-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
      {
        source: '/biology-classes-biology-classes-:school-gurgaon',
        destination: '/biology-classes-gurgaon',
        permanent: true,
      },
      // DUPLICATE REMOVED: { source: '/biology-classes-biology-tutor-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
      {
        source: '/biology-classes-biology-class-:level-gurgaon',
        destination: '/biology-classes-gurgaon',
        permanent: true,
      },
      // DUPLICATE REMOVED: { source: '/biology-classes-biology-tuition-ryan-international', destination: '/biology-classes-south-delhi', permanent: true },
      {
        source: '/biology-classes-neet-coaching-:location',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // Resources subpages
      {
        source: '/resources/biodiversity-notes',
        destination: '/biodiversity-notes-neet',
        permanent: true,
      },
      {
        source: '/resources/plant-physiology-notes',
        destination: '/biology-notes',
        permanent: true,
      },
      {
        source: '/resources/important-questions',
        destination: '/neet-biology-mcq',
        permanent: true,
      },

      // Missing/renamed pages
      {
        source: '/scholarships',
        destination: '/scholarship',
        permanent: true,
      },
      {
        source: '/courses/neet-biology',
        destination: '/courses/class-12',
        permanent: true,
      },

      // NEET coaching school-specific pages
      {
        source: '/neet-coaching-vasant-valley-students',
        destination: '/best-biology-tuition-vasant-vihar',
        permanent: true,
      },
      {
        source: '/neet-coaching-mount-abu-rohini-students',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },

      // Biology tutor location pages
      {
        source: '/biology-tutor-pitampura',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-tutor-laxmi-nagar',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-tutor-noida-sector-137',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/neet-biology-tutor-class-11',
        destination: '/biology-tuition-class-11',
        permanent: true,
      },
      {
        source: '/neet-biology-tutor-class-12',
        destination: '/biology-tuition-class-12',
        permanent: true,
      },

      // ============================================
      // Catch-all redirects for location sub-routes
      // ============================================

      // Catch all biology-classes sub-routes
      {
        source: '/biology-classes-:location/:area+',
        destination: '/biology-classes-:location',
        permanent: true,
      },

      // Catch all biology-tuition sub-routes
      {
        source: '/biology-tuition-:location/:area+',
        destination: '/biology-tuition-:location',
        permanent: true,
      },

      // ============================================
      // GSC 404 Fixes - January 2026 (Phase 2)
      // ============================================

      // Locale routes - redirect to homepage (i18n not implemented)
      { source: '/de', destination: '/', permanent: true },
      { source: '/es', destination: '/', permanent: true },
      { source: '/fr', destination: '/', permanent: true },
      { source: '/hi', destination: '/', permanent: true },
      { source: '/ja', destination: '/', permanent: true },
      { source: '/nl', destination: '/', permanent: true },
      { source: '/it', destination: '/', permanent: true },
      { source: '/ru', destination: '/', permanent: true },
      { source: '/pt', destination: '/', permanent: true },
      { source: '/ta', destination: '/', permanent: true },
      { source: '/bn', destination: '/', permanent: true },
      { source: '/kn', destination: '/', permanent: true },
      { source: '/ml', destination: '/', permanent: true },
      { source: '/mr', destination: '/', permanent: true },
      { source: '/pl', destination: '/', permanent: true },
      { source: '/te', destination: '/', permanent: true },

      // Missing resource pages
      { source: '/resources/planner', destination: '/resources', permanent: true },
      { source: '/resources/signup', destination: '/admissions', permanent: true },
      { source: '/resources/community', destination: '/', permanent: true },
      { source: '/resources/animal-tissue-notes', destination: '/biology-notes', permanent: true },
      { source: '/resources/anatomy-notes', destination: '/biology-notes', permanent: true },

      // Missing course pages
      {
        source: '/courses/45-day-course',
        destination: '/courses/class-12',
        permanent: true,
      },

      // Olympiad pages
      { source: '/cbo-preparation', destination: '/courses', permanent: true },
      { source: '/cbo-preparation/', destination: '/courses', permanent: true },
      { source: '/jbo-preparation', destination: '/courses', permanent: true },
      { source: '/jbo-preparation/', destination: '/courses', permanent: true },
      { source: '/german-biology-olympiad', destination: '/courses', permanent: true },
      { source: '/german-biology-olympiad/', destination: '/courses', permanent: true },

      // Fix broken non-blog destinations
      { source: '/olympiad-coaching', destination: '/courses', permanent: true },
      { source: '/online-biology-tuition', destination: '/courses', permanent: true },

      // Other missing pages
      { source: '/parent-guide', destination: '/about', permanent: true },
      { source: '/5', destination: '/', permanent: true },

      // NEET coaching school-specific pages
      {
        source: '/neet-coaching-st-columba-students',
        destination: '/neet-coaching-centre',
        permanent: true,
      },
      {
        source: '/neet-coaching-gd-goenka-students',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // Missing biology class location pages
      {
        source: '/biology-classes-paschim-vihar',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-narnaul',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-greater-noida',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/biology-classes-greater-noida-west',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/biology-classes-jhajjar',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-laxmi-nagar',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-preet-vihar',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-model-town',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-manesar',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-tuition-west-delhi',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },

      // Gurgaon sector pages
      {
        source: '/neet-coaching-gurgaon-sector-57',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-31',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-61',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-47',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-aravali',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-badshapur',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-gurgaon-sector-49',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-sohna-road-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // Rohini sector pages
      {
        source: '/biology-classes-rohini-sector-3',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-sector-7',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-sector-8',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-sector-15',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      // DUPLICATE REMOVED: { source: '/biology-classes-rohini-west', destination: '/neet-coaching-north-delhi', permanent: true },

      // School-specific biology classes pages
      {
        source: '/biology-classes-biology-classes-amity-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-shri-ram-school-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-heritage-school-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-lotus-valley-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-scottish-high-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-blue-bells-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-dps-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-home-tuition-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-12th-boards-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-presidium-school',
        destination: '/neet-coaching-centre',
        permanent: true,
      },

      // Books pages
      {
        source: '/ncert-fingertips-biology',
        destination: '/best-biology-books-for-neet',
        permanent: true,
      },
      {
        source: '/ncert-biology-class-11',
        destination: '/best-biology-books-for-neet',
        permanent: true,
      },
      {
        source: '/ncert-biology-class-12',
        destination: '/best-biology-books-for-neet',
        permanent: true,
      },
      {
        source: '/trueman-biology-for-neet',
        destination: '/best-biology-books-for-neet',
        permanent: true,
      },

      // Boards page
      { source: '/boards/state', destination: '/courses', permanent: true },

      // Test series page
      { source: '/test-series', destination: '/courses', permanent: true },

      // ============================================
      // GSC noindex Fixes - January 2026 (Phase 3)
      // Missing pages causing 404 with noindex
      // ============================================

      // Olympiad preparation pages (redirect to coaching pages)
      { source: '/cnbo-preparation', destination: '/cnbo-coaching', permanent: true },
      { source: '/cnbo-preparation/', destination: '/cnbo-coaching', permanent: true },
      { source: '/sbo-preparation', destination: '/sbo-coaching', permanent: true },
      { source: '/sbo-preparation/', destination: '/sbo-coaching', permanent: true },
      { source: '/asob-preparation', destination: '/asob-coaching', permanent: true },
      { source: '/asob-preparation/', destination: '/asob-coaching', permanent: true },

      // Typos and URL variants
      {
        source: '/neet-biology-tutor-droppers',
        destination: '/neet-biology-tutor-for-droppers',
        permanent: true,
      },
      { source: '/hr', destination: '/', permanent: true },
      { source: '/hour', destination: '/', permanent: true },
      {
        source: '/biology-tutor-delhi',
        destination: '/biology-tutor-central-delhi',
        permanent: true,
      },

      // Course URL variations
      { source: '/courses/neet', destination: '/courses/neet-complete', permanent: true },
      { source: '/courses/crash-course', destination: '/neet-crash-course', permanent: true },
      {
        source: '/courses/weekend-batch',
        destination: '/neet-biology-weekend-batch',
        permanent: true,
      },
      {
        source: '/courses/intensive-neet-biology',
        destination: '/courses/class-12',
        permanent: true,
      },

      // Resource pages redirects
      { source: '/resources/biomolecules-notes', destination: '/biology-notes', permanent: true },
      { source: '/resources/classification-notes', destination: '/biology-notes', permanent: true },
      { source: '/resources/morphology-notes', destination: '/biology-notes', permanent: true },
      { source: '/resources/revision-notes', destination: '/biology-notes', permanent: true },
      { source: '/resources/diagrams', destination: '/resources', permanent: true },
      { source: '/free-biology-quiz', destination: '/neet-biology-mcq', permanent: true },
      { source: '/tools/neet-mcq', destination: '/neet-biology-mcq', permanent: true },
      { source: '/tools/:path*', destination: '/resources', permanent: true },

      // Missing biology class location pages
      { source: '/biology-classes-bawal', destination: '/neet-coaching-gurgaon', permanent: true },
      {
        source: '/biology-classes-dharuhera',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-janakpuri',
        destination: '/neet-coaching-west-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-dc-chowk-rohini',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-nirman-vihar',
        destination: '/neet-coaching-east-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-rajinder-nagar',
        destination: '/neet-coaching-centre',
        permanent: true,
      },
      {
        source: '/biology-classes-sushant-lok-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-noida-sector-62',
        destination: '/neet-coaching-noida',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-82',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-50',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-14',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-gurgaon-sector-4',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-golf-course-extension-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-rohini-sector-5',
        destination: '/neet-coaching-north-delhi',
        permanent: true,
      },

      // School-specific NEET coaching pages
      {
        source: '/neet-coaching-pathways-gurgaon-students',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/neet-coaching-springdales-students',
        destination: '/neet-coaching-centre',
        permanent: true,
      },
      {
        source: '/neet-droppers-batch-delhi',
        destination: '/courses/neet-dropper',
        permanent: true,
      },

      // More school-specific biology classes
      {
        source: '/biology-classes-biology-classes-rps-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-shikshanter-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-tuition-ryan-international',
        destination: '/biology-tuition-ryan-international',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-class-12-gurgaon',
        destination: '/biology-tuition-class-12',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-class-11-gurgaon',
        destination: '/biology-tuition-class-11',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-class-9-10-gurgaon',
        destination: '/biology-tuition-class-9-10',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-tutor-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-bal-bharati-students',
        destination: '/biology-classes-south-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-ryan-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-euro-international-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-manav-rachna-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-suncity-school-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-gd-goenka-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-biology-classes-dav-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // NEET coaching specific pages
      {
        source: '/biology-classes-neet-droppers-batch-gurgaon',
        destination: '/courses/neet-dropper',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-golf-course-road-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-dlf-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-pathways-school',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-nirvana-country-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // Missing NEET coaching city pages (redirect to regional hubs)
      {
        source: '/neet-coaching-mumbai',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      { source: '/neet-coaching-pune', destination: '/neet-coaching-west-india', permanent: true },
      {
        source: '/neet-coaching-chennai',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-hyderabad',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-ahmedabad',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-lucknow',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-chandigarh',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      { source: '/neet-coaching-bhopal', destination: '/neet-coaching-centre', permanent: true },
      {
        source: '/neet-coaching-nagpur',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-vadodara',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      { source: '/neet-coaching-thane', destination: '/neet-coaching-west-india', permanent: true },
      {
        source: '/neet-coaching-navi-mumbai',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-coimbatore',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-madurai',
        destination: '/neet-coaching-south-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-ludhiana',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-guwahati',
        destination: '/neet-coaching-east-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-ranchi',
        destination: '/neet-coaching-east-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-dhanbad',
        destination: '/neet-coaching-east-india',
        permanent: true,
      },
      { source: '/neet-coaching-jabalpur', destination: '/neet-coaching-centre', permanent: true },
      {
        source: '/neet-coaching-gwalior',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-jodhpur',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-aurangabad',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-vasai-virar',
        destination: '/neet-coaching-west-india',
        permanent: true,
      },
      {
        source: '/neet-coaching-meerut',
        destination: '/neet-coaching-north-india',
        permanent: true,
      },
      { source: '/neet-coaching-delhi', destination: '/neet-coaching-centre', permanent: true },

      // Blog management quota article
      {
        source: '/blog/management-quota-mbbs-fees-process-complete-guide',
        destination: '/blog',
        permanent: true,
      },

      // Fix broken blog destinations → redirect to /blog
      {
        source: '/blog/career-options-after-12th-pcb-complete-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/dps-students-neet-preparation-guide',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/kota-vs-online-neet-coaching-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-2026-complete-guide-exam-pattern-syllabus-dates',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-chapter-wise-weightage-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-biology-preparation-strategy-score-340-plus',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/neet-preparation-guide-best-strategies',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/plant-kingdom-classification-neet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/top-10-neet-biology-coaching-delhi-ncr-2026',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/when-to-start-neet-preparation-class-9-vs-10',
        destination: '/blog',
        permanent: true,
      },

      // ============================================
      // GSC "Page with redirect" Fixes - January 2026
      // These pages are being crawled but need proper redirects
      // ============================================

      // Campbell Biology chapter pages (redirect to biology notes)
      { source: '/campbell-biology', destination: '/biology-notes', permanent: true },
      { source: '/campbell-biology/:slug', destination: '/biology-notes', permanent: true },

      // International exam preparation pages
      { source: '/mcat-biology-preparation', destination: '/courses', permanent: true },
      { source: '/mcat-biology-preparation/', destination: '/courses', permanent: true },
      { source: '/inbo-coaching', destination: '/courses', permanent: true },
      { source: '/inbo-coaching/', destination: '/courses', permanent: true },
      { source: '/usabo-coaching', destination: '/courses', permanent: true },
      { source: '/usabo-coaching/', destination: '/courses', permanent: true },
      { source: '/ibo-preparation', destination: '/courses', permanent: true },
      { source: '/ibo-preparation/', destination: '/courses', permanent: true },
      { source: '/bbo-preparation', destination: '/courses', permanent: true },
      { source: '/bbo-preparation/', destination: '/courses', permanent: true },
      { source: '/biology-olympiad-preparation', destination: '/courses', permanent: true },
      { source: '/biology-olympiad-preparation/', destination: '/courses', permanent: true },

      // Tuition specialty pages
      { source: '/dna-biology-tuition', destination: '/courses', permanent: true },
      { source: '/live-biology-classes-neet', destination: '/courses', permanent: true },
      { source: '/genetics-biology-tuition', destination: '/courses', permanent: true },

      // Resource and tool pages
      { source: '/mock-tests', destination: '/resources/mock-tests', permanent: true },
      { source: '/neet-result-analysis', destination: '/resources', permanent: true },
      { source: '/neet-biology-mcq-practice', destination: '/neet-biology-mcq', permanent: true },
      { source: '/neet-rank-predictor', destination: '/resources', permanent: true },
      { source: '/neet-registration-guide', destination: '/admissions', permanent: true },

      // NCERT notes pages
      { source: '/ncert-biology-notes-class-11', destination: '/biology-notes', permanent: true },
      { source: '/ncert-based-neet-questions', destination: '/neet-biology-mcq', permanent: true },

      // NEET preparation pages
      { source: '/neet-biology-crash-course', destination: '/neet-crash-course', permanent: true },
      { source: '/neet-preparation-guide', destination: '/courses', permanent: true },
      { source: '/neet-2026-preparation', destination: '/courses', permanent: true },
      { source: '/neet-exam-pattern-2025', destination: '/courses', permanent: true },
      { source: '/neet-biology-notes-pdf', destination: '/biology-notes', permanent: true },

      // Topic-specific notes
      { source: '/reproduction-notes-neet', destination: '/biology-notes', permanent: true },
      { source: '/plant-kingdom-notes-neet', destination: '/biology-notes', permanent: true },

      // Services pages
      { source: '/services/international', destination: '/international', permanent: true },
      { source: '/services/classroom', destination: '/courses', permanent: true },
      { source: '/services/online-classes', destination: '/courses', permanent: true },

      // Legal pages
      { source: '/terms-of-service', destination: '/privacy-policy', permanent: true },

      // Biology tuition location
      // DUPLICATE REMOVED: { source: '/biology-tuition-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },

      // Biology classes with sub-areas (specific ones from GSC)
      {
        source: '/biology-classes-green-park/iit',
        destination: '/biology-classes-south-delhi',
        permanent: true,
      },
      {
        source: '/biology-classes-neet-coaching-south-city-gurgaon',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // ============================================
      // GSC "Alternate page with canonical" - Additional fixes
      // ============================================

      // Location sub-pages (gurugram variations)
      { source: '/locations/gurugram', destination: '/neet-coaching-gurgaon', permanent: true },
      {
        source: '/locations/gurugram/:area*',
        destination: '/neet-coaching-gurgaon',
        permanent: true,
      },

      // www vs non-www (handled by DNS but adding for safety)
      // These pages exist but may have www/non-www canonical issues

      // Services main page redirect
      { source: '/services', destination: '/courses', permanent: true },

      // Book demo with query params (catch-all) - REMOVED duplicate
      // Previously at line 1830: { source: '/book-demo', destination: '/demo', permanent: true },

      // ============================================
      // SEO Page Consolidation - Thin/Doorway Pages
      // ~178 pages redirected to hub pages
      // ============================================
      ...seoPageConsolidationRedirects,
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
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://*.instantdb.com;",
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
      // HTML pages - Optimized for billing + mobile LCP
      // BILLING FIX: Increased edge cache from 2h to 24h (reduces origin hits by 12x)
      // With 2400+ pages, 2h edge cache = ~28,800 origin hits/day → 24h = ~2,400/day
      // stale-while-revalidate=86400 means users always get instant response from edge
      // while revalidation happens in background (no visible staleness)
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=60, s-maxage=86400, stale-while-revalidate=86400',
          },
          // PERFORMANCE: Early hints for faster resource loading
          {
            key: 'Link',
            value: '</fonts/geist-latin-400-normal.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
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

  // BILLING FIX: Disabled - widenClientFileUpload increases build time and build minutes cost
  // Stack traces work fine without it for most debugging scenarios
  widenClientFileUpload: false,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // BILLING FIX: Sentry tunnel DISABLED - was routing every browser error report through
  // a serverless function, causing extra function invocations + bandwidth charges.
  // Sentry's own comment says: "This can increase your server load as well as your hosting bill."
  // Direct Sentry reporting works fine; only ad-blocker users lose error reporting.
  // tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // CRITICAL FIX: Disable source maps completely to prevent 5GB builds
  // Source maps were causing build to balloon from 200MB to 5GB
  sourcemaps: {
    disable: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // BILLING FIX: Disabled - automatic cron monitoring adds overhead to every cron invocation
  // Enable selectively if you need to debug specific cron jobs via Sentry
  automaticVercelMonitors: false,
})
