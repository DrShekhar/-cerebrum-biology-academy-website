import { TrophyIcon } from '@heroicons/react/24/outline'
import { HeroClientInteractive } from './HeroClientInteractive'

interface HeroSectionProps {
  className?: string
}

function FloatingParticle({
  size,
  left,
  top,
  delay,
}: {
  delay: number
  size: number
  left: string
  top: string
}) {
  return (
    <div
      className="absolute rounded-full bg-white/20 animate-float"
      style={{
        width: size,
        height: size,
        left,
        top,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 overflow-hidden -mt-16 lg:-mt-20 ${className}`}
    >
      {/* Background - CSS only, no external image for faster LCP */}
      <div className="absolute inset-0">
        {/* CSS gradient orbs - no JS animation for performance */}
        <div className="hidden md:block absolute top-1/4 left-[16%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="hidden md:block absolute bottom-1/4 right-[16%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />

        {/* Floating Particles - CSS animation only */}
        <FloatingParticle delay={0} size={6} left="10%" top="20%" />
        <FloatingParticle delay={0.5} size={4} left="20%" top="60%" />
        <FloatingParticle delay={1} size={8} left="80%" top="30%" />
        <FloatingParticle delay={1.5} size={5} left="70%" top="70%" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-20 flex items-center min-h-screen">
        <div className="w-full animate-fade-in-up">
          {/* Badge - Server rendered for instant LCP */}
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-300/30 px-4 py-2 rounded-full mb-6">
            <TrophyIcon className="w-5 h-5 mr-2 text-green-300" />
            <span className="text-green-100 font-medium text-xs xs:text-sm md:text-base">
              #1 NEET Biology Coaching • 98% Success Rate
            </span>
          </div>

          {/* H1 - LCP critical element - Server rendered */}
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-6 leading-tight text-white break-words">
            <span className="text-yellow-300">NEET Biology Coaching</span>
            <br />
            <span className="text-green-300">India&apos;s #1 Institute</span>
          </h1>

          {/* H2 for additional location keywords - SEO optimized */}
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-yellow-200">
            Delhi NCR • Noida • Laxmi Nagar • Dwarka
          </h2>

          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 xs:mb-8 max-w-3xl">
            <span className="text-yellow-300 font-bold">Sadhna scored 695/720 (100%ile)</span> •
            500+ Medical Selections
          </p>

          {/* Interactive elements - Client component */}
          <HeroClientInteractive />
        </div>
      </div>
    </div>
  )
}
