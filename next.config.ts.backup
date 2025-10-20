import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    optimizeCss: true,
    // Preload critical resources
    scrollRestoration: true,
  },

  // Turbopack configuration
  turbopack: {
    resolveAlias: {
      // Use lighter alternatives where possible
      'lodash': 'lodash-es',
    },
  },

  // Skip linting during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimized image configuration for Indian mobile devices
  images: {
    domains: ['localhost', 'cerebrumbiologyacademy.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 375, 420, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Aggressive optimization for slow networks
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Progressive loading for better perceived performance
    loader: 'default',
    path: '/_next/image/',
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'development',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_BUILD_ID: Date.now().toString(),
    NEXT_PUBLIC_PRICING_SYSTEM: '2.0.0',
  },

  // Force fresh deployment
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  
  // Production optimizations for Indian mobile networks
  compress: true,
  poweredByHeader: false,

  // Optimized output for better performance
  output: 'standalone',

  // Bundle analyzer for optimization (only when not using Turbopack)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Skip webpack configuration when using Turbopack in development
    if (dev && process.env.NODE_ENV !== 'production') {
      return config
    }

    // Optimize bundle for mobile devices
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // UI components in separate chunk
          components: {
            test: /[\\/]src[\\/]components[\\/]/,
            name: 'components',
            chunks: 'all',
            priority: 5,
          },
          // Common utilities
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 1,
          },
        },
      }
    }

    // Optimize for Indian mobile networks
    config.resolve.alias = {
      ...config.resolve.alias,
      // Use lighter alternatives where possible
      'lodash': 'lodash-es',
    }

    return config
  },

  // Custom headers for SEO, security, and mobile optimization
  async headers() {
    return [
      {
        // Apply headers to all routes except error pages
        source: '/((?!_next|api|not-found).*)',
        headers: [
          // Security headers
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
          // Performance headers for Indian mobile networks - but not for error pages
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          // Enable compression
          {
            key: 'Content-Encoding',
            value: 'gzip',
          },
          // Network optimization for Indian connections
          {
            key: 'Save-Data',
            value: 'on',
          },
          // Mobile-specific headers
          {
            key: 'Viewport',
            value: 'width=device-width, initial-scale=1, shrink-to-fit=no',
          },
          // Hindi language support
          {
            key: 'Content-Language',
            value: 'en-IN, hi-IN',
          },
        ],
      },
      {
        // Aggressive caching for static assets
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Font optimization
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/course/:path*',
        destination: '/courses/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
