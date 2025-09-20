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
}

export default nextConfig