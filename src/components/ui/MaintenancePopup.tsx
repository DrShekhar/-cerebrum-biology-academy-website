'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, X, Sparkles, Clock, CheckCircle2, Zap } from 'lucide-react'

// Floating particle component
function FloatingParticle({
  delay,
  duration,
  size,
  left,
  top,
}: {
  delay: number
  duration: number
  size: number
  left: string
  top: string
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-400/30"
      style={{ width: size, height: size, left, top }}
      animate={{
        y: [-20, 20, -20],
        x: [-10, 10, -10],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function MaintenancePopup() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [progress, setProgress] = useState(100)

  // Generate stable particle positions - fewer particles for mobile
  const particles = useMemo(
    () => [
      { delay: 0, duration: 4, size: 6, left: '10%', top: '20%' },
      { delay: 0.5, duration: 5, size: 8, left: '80%', top: '15%' },
      { delay: 1, duration: 4.5, size: 5, left: '25%', top: '70%' },
      { delay: 1.5, duration: 5.5, size: 7, left: '70%', top: '75%' },
      { delay: 2, duration: 4, size: 4, left: '50%', top: '10%' },
    ],
    []
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const duration = 8000
    const interval = 50
    const decrement = (100 / duration) * interval

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressTimer)
          setIsVisible(false)
          return 0
        }
        return prev - decrement
      })
    }, interval)

    return () => clearInterval(progressTimer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isMounted) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[9998]"
            onClick={handleClose}
          />

          {/* Popup container - better mobile sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-3 top-1/2 -translate-y-1/2 z-[9999] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md md:max-w-lg"
          >
            {/* Animated glow effect - smaller on mobile */}
            <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 rounded-xl sm:rounded-2xl blur-md sm:blur-lg opacity-75 animate-pulse" />

            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl border border-blue-400/30">
              {/* Cerebrum Blue gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-indigo-500/20"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Floating particles - hidden on very small screens */}
              <div className="absolute inset-0 overflow-hidden hidden xs:block">
                {particles.map((particle, i) => (
                  <FloatingParticle key={i} {...particle} />
                ))}
              </div>

              {/* Mesh gradient accents - smaller on mobile */}
              <div className="absolute inset-0 opacity-30 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 bg-blue-500 rounded-full blur-2xl sm:blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-64 sm:h-64 bg-indigo-400 rounded-full blur-2xl sm:blur-3xl" />
              </div>

              {/* Content - optimized padding for mobile */}
              <div className="relative px-4 py-5 sm:p-6 md:p-8">
                {/* Close button - better touch target on mobile */}
                <button
                  onClick={handleClose}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-blue-200/80 hover:text-blue-100 transition-all duration-200 border border-blue-400/20"
                  aria-label="Close notification"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                {/* Icon with glow - smaller on mobile */}
                <div className="flex justify-center mb-4 sm:mb-5">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="relative"
                  >
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-blue-400/40 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl" />
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 border border-blue-400/30">
                      <Rocket className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2"
                    >
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 drop-shadow-lg" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Title with gradient - responsive text */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-blue-200 via-cyan-100 to-indigo-200 bg-clip-text text-transparent leading-tight">
                  Upgrading Your Success Path
                </h2>

                {/* Description - smaller on mobile */}
                <p className="text-blue-100/80 text-center text-xs sm:text-sm md:text-base mb-4 sm:mb-5 leading-relaxed px-2">
                  We're adding powerful new features to boost your NEET preparation.
                </p>

                {/* What's Coming teaser - compact on mobile */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-lg p-2.5 sm:p-3 mb-4 sm:mb-5">
                  <div className="flex items-center gap-2 justify-center">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-cyan-300 text-xs sm:text-sm font-medium">
                      Coming: AI-Powered Study Planner
                    </span>
                  </div>
                </div>

                {/* Features list - compact spacing on mobile */}
                <div className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-blue-400/10">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-blue-50/90">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Course browsing available</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-blue-50/90">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Demo booking working normally</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-blue-50/90">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Some AI features being upgraded</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button - full width, good touch target */}
                <motion.button
                  onClick={handleClose}
                  className="relative w-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 active:scale-[0.98] text-sm sm:text-base"
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative">Continue to Success</span>
                </motion.button>

                {/* Progress bar */}
                <div className="mt-3 sm:mt-4">
                  <div className="h-1 sm:h-1.5 bg-blue-950 rounded-full overflow-hidden border border-blue-800/50">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                  <p className="text-blue-400/50 text-[10px] sm:text-xs text-center mt-1.5 sm:mt-2">
                    Auto-closing in {Math.ceil(progress / 12.5)}s
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
