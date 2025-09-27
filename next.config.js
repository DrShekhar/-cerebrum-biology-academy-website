/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // Disable image optimization
    domains: ['localhost', 'cdn.cerebrumbiologyacademy.com', 'images.unsplash.com'], // Add allowed domains
  },
  // Also try adding:
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable caching in development
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
    return []
  },
}

export default nextConfig