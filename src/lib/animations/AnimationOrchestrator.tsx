'use client'

import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion'
import { appleAnimations } from './advancedAnimations'

interface AnimationOrchestratorContextType {
  triggerSequence: (sequenceName: string, target?: string) => void
  registerElement: (name: string, ref: React.RefObject<HTMLElement>) => void
  isSequenceActive: (sequenceName: string) => boolean
  setGlobalTiming: (timing: number) => void
}

const AnimationOrchestratorContext = createContext<AnimationOrchestratorContextType | undefined>(
  undefined
)

interface AnimationOrchestratorProps {
  children: React.ReactNode
  globalTiming?: number
  enableDebug?: boolean
}

export function AnimationOrchestrator({
  children,
  globalTiming = 1,
  enableDebug = false,
}: AnimationOrchestratorProps) {
  const registeredElements = useRef<Map<string, React.RefObject<HTMLElement>>>(new Map())
  const activeSequences = useRef<Set<string>>(new Set())
  const globalTimingRef = useRef(globalTiming)

  const registerElement = useCallback(
    (name: string, ref: React.RefObject<HTMLElement>) => {
      registeredElements.current.set(name, ref)
      if (enableDebug) {
        console.log(`🎬 Registered animation element: ${name}`)
      }
    },
    [enableDebug]
  )

  const triggerSequence = useCallback(
    async (sequenceName: string, target?: string) => {
      if (activeSequences.current.has(sequenceName)) {
        if (enableDebug) {
          console.log(`⚠️ Sequence ${sequenceName} already active`)
        }
        return
      }

      activeSequences.current.add(sequenceName)

      if (enableDebug) {
        console.log(`🚀 Triggering animation sequence: ${sequenceName}`)
      }

      // Execute orchestrated animation sequence
      const sequence =
        appleAnimations.orchestratedAnimations[
          sequenceName as keyof typeof appleAnimations.orchestratedAnimations
        ]

      if (sequence && 'phases' in sequence) {
        for (const phase of sequence.phases) {
          await new Promise((resolve) => {
            setTimeout(
              () => {
                if (enableDebug) {
                  console.log(`🎭 Executing phase: ${phase.name}`)
                }

                phase.animations.forEach((anim) => {
                  const element = target
                    ? document.querySelector(target)
                    : registeredElements.current.get(anim.target)?.current

                  if (element) {
                    // Apply animation based on type
                    element.style.transition = `all ${phase.duration * globalTimingRef.current}s ${appleAnimations.easing.appleDefault}`
                  }
                })

                setTimeout(resolve, phase.duration * globalTimingRef.current * 1000)
              },
              (phase.delay || 0) * globalTimingRef.current * 1000
            )
          })
        }
      }

      activeSequences.current.delete(sequenceName)
    },
    [enableDebug]
  )

  const isSequenceActive = useCallback((sequenceName: string) => {
    return activeSequences.current.has(sequenceName)
  }, [])

  const setGlobalTiming = useCallback((timing: number) => {
    globalTimingRef.current = timing
  }, [])

  const contextValue: AnimationOrchestratorContextType = {
    triggerSequence,
    registerElement,
    isSequenceActive,
    setGlobalTiming,
  }

  return (
    <AnimationOrchestratorContext.Provider value={contextValue}>
      {children}
    </AnimationOrchestratorContext.Provider>
  )
}

export const useAnimationOrchestrator = () => {
  const context = useContext(AnimationOrchestratorContext)
  if (!context) {
    throw new Error('useAnimationOrchestrator must be used within AnimationOrchestrator')
  }
  return context
}

// Enhanced motion components with built-in orchestration
interface EnhancedMotionProps {
  children: React.ReactNode
  animationName?: string
  sequence?: string
  delay?: number
  className?: string
  [key: string]: any
}

export const EnhancedMotionDiv: React.FC<EnhancedMotionProps> = ({
  children,
  animationName,
  sequence,
  delay = 0,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { registerElement, triggerSequence } = useAnimationOrchestrator()

  useEffect(() => {
    if (animationName) {
      registerElement(animationName, ref)
    }
  }, [animationName, registerElement])

  useEffect(() => {
    if (isInView && sequence) {
      setTimeout(() => {
        triggerSequence(sequence)
      }, delay * 1000)
    }
  }, [isInView, sequence, delay, triggerSequence])

  const variants = appleAnimations.variants

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants.cardEntrance}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Sophisticated card animation component
interface AnimatedCardProps {
  children: React.ReactNode
  index?: number
  className?: string
  hoverEffect?: 'gentle' | 'dynamic' | 'dramatic'
  entrance?: 'slide' | 'scale' | 'flip'
  glowColor?: string
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  index = 0,
  className = '',
  hoverEffect = 'dynamic',
  entrance = 'slide',
  glowColor = 'rgba(59,130,246,0.3)',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const rotateXValue = (e.clientY - centerY) / 10
      const rotateYValue = (centerX - e.clientX) / 10

      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
      rotateX.set(rotateXValue)
      rotateY.set(rotateYValue)
    },
    [mouseX, mouseY, rotateX, rotateY]
  )

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  const getEntranceAnimation = () => {
    switch (entrance) {
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }
      case 'flip':
        return {
          hidden: { opacity: 0, rotateY: -90 },
          visible: {
            opacity: 1,
            rotateY: 0,
            transition: {
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }
      default: // slide
        return {
          hidden: { opacity: 0, y: 60, scale: 0.9 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1] as const,
            },
          },
        }
    }
  }

  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'gentle':
        return {
          scale: 1.02,
          y: -5,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        }
      case 'dramatic':
        return {
          scale: 1.05,
          y: -15,
          rotateX: 5,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        }
      default: // dynamic
        return {
          scale: 1.03,
          y: -8,
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getEntranceAnimation()}
      whileHover={getHoverAnimation()}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hoverEffect === 'dramatic' ? rotateX : 0,
        rotateY: hoverEffect === 'dramatic' ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className={`relative transform-gpu ${className}`}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 60%)`,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Advanced page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode
  type?: 'slide' | 'scale' | 'fade'
  direction?: 'up' | 'down' | 'left' | 'right'
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'slide',
  direction = 'up',
}) => {
  const getTransitionConfig = () => {
    switch (type) {
      case 'scale':
        return appleAnimations.pageTransitions.scaleIn
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
        }
      default: // slide
        return direction === 'right'
          ? appleAnimations.pageTransitions.slideRight
          : appleAnimations.pageTransitions.slideUp
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div {...getTransitionConfig()}>{children}</motion.div>
    </AnimatePresence>
  )
}

// Parallax scroll component
interface ParallaxElementProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({
  children,
  speed = 0.5,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const y = useMotionValue(0)
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const rate = scrolled * speed

      y.set(rate)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, y])

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

// Magnetic interaction component
interface MagneticElementProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  strength = 0.3,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      )

      if (distance < 150) {
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
        const magneticX = Math.cos(angle) * distance * strength
        const magneticY = Math.sin(angle) * distance * strength

        x.set(magneticX)
        y.set(magneticY)
      } else {
        x.set(0)
        y.set(0)
      }
    },
    [x, y, strength]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}
