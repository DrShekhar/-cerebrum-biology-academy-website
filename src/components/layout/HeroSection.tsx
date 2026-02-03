import dynamic from 'next/dynamic'

// PERFORMANCE: Lazy-load client interactive elements to defer lucide-react icons (~50KB)
// These elements have animation delays anyway, so deferring doesn't hurt UX
const HeroClientInteractive = dynamic(
  () => import('./HeroClientInteractive').then((mod) => mod.HeroClientInteractive),
  { loading: () => null }
)

// PERFORMANCE: Inline SVGs instead of lucide-react to eliminate icon library from critical path
const TrophyIcon = () => (
  <svg className="w-5 h-5 mr-2 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7a6 6 0 01-12 0zm6 13v-4m-4 4h8M4 4h2m12 0h2M4 4a2 2 0 00-2 2v1a2 2 0 002 2m16-5a2 2 0 012 2v1a2 2 0 01-2 2" />
  </svg>
)

const PlayIcon = () => (
  <svg className="h-5 xs:h-6 w-5 xs:w-6 group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem' }}>
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-5 xs:h-6 w-5 xs:w-6 group-hover:scale-110 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: '1.25rem', height: '1.25rem' }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

interface HeroSectionProps {
  className?: string
}

export function HeroSection({ className = '' }: HeroSectionProps) {
  return (
    <div
      className={`relative min-h-screen bg-indigo-600 overflow-hidden -mt-16 lg:-mt-20 ${className}`}
      style={{
        backgroundColor: '#4f46e5',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        // PERFORMANCE: Contain layout to prevent reflows affecting LCP
        contain: 'layout style',
      }}
    >
      {/* Background - CSS only, no external image for faster LCP */}
      {/* PERFORMANCE: Static gradients, no animations for better performance */}
      <div className="absolute inset-0 contain-strict pointer-events-none" aria-hidden="true">
        {/* CSS gradient orbs - STATIC for performance */}
        <div className="hidden md:block absolute top-1/4 left-[16%] w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-1/4 right-[16%] w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-28 pb-20 flex items-center min-h-screen">
        {/* PERFORMANCE: LCP-critical elements (H1, H2) rendered immediately without animation
            Non-LCP elements use staggered animations for visual appeal */}
        {/* lcp-critical class ensures content-visibility: visible for this container */}
        <div className="w-full lcp-critical">
          {/* Badge - Animated (non-LCP element) */}
          <div
            className="inline-flex items-center bg-green-600/20 backdrop-blur-sm border border-green-300/30 px-4 py-2 rounded-full mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <TrophyIcon />
            <span className="text-green-100 font-medium text-xs xs:text-sm md:text-base">
              #1 NEET Biology Coaching • 98% Success Rate
            </span>
          </div>

          {/* H1 - LCP CRITICAL: Inline styles ensure immediate visibility before CSS loads */}
          <h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-6 leading-tight text-white break-words"
            style={{
              color: '#ffffff',
              fontWeight: 700,
              lineHeight: 1.1,
              fontSize: 'clamp(1.25rem, 5vw, 3.75rem)',
            }}
          >
            <span style={{ color: '#fcd34d' }} className="text-yellow-300">
              NEET Biology Coaching
            </span>
            <br />
            <span style={{ color: '#86efac' }} className="text-green-300">
              India&apos;s #1 Institute
            </span>
          </h1>

          {/* H2 - Also LCP candidate, inline styles for immediate visibility */}
          <h2
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold mb-3 text-yellow-200"
            style={{
              color: '#fef08a',
              fontWeight: 600,
              fontSize: 'clamp(1.125rem, 3vw, 1.875rem)',
            }}
          >
            Delhi NCR - Offline in South Extension, Gurugram, Rohini • Online - Serving Worldwide
          </h2>

          {/* Subtext - Animated with delay (non-LCP) */}
          <p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 xs:mb-8 max-w-3xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="text-yellow-300 font-bold">Sadhna scored 695/720 (100%ile)</span> •
            500+ Medical Selections
          </p>

          {/* PRIMARY CTA - Call Now Button */}
          <div className="mb-4">
            <a
              href="tel:+918826444334"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl shadow-xl hover:shadow-green-500/40 transition-all duration-300 text-sm xs:text-base md:text-lg border border-green-400 hover:scale-[1.02] active:scale-[0.98] group"
              style={{
                backgroundColor: '#22c55e',
                color: '#ffffff',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <PhoneIcon />
              CALL NOW
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </a>
          </div>

          {/* Interactive elements - Client component (loads after LCP) */}
          <HeroClientInteractive />
        </div>
      </div>
    </div>
  )
}
