'use client'

import React from 'react'
import { motion, Variants, Transition } from 'framer-motion'
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from '@/lib/animations/variants'

interface FadeTransitionProps {
  children: React.ReactNode
  className?: string
  variant?: 'fadeIn' | 'fadeInUp' | 'stagger'
  delay?: number
  duration?: number
  staggerChildren?: boolean
  customVariants?: Variants
  customTransition?: Transition
}

export function FadeTransition({
  children,
  className = '',
  variant = 'fadeInUp',
  delay = 0,
  duration,
  staggerChildren = false,
  customVariants,
  customTransition,
}: FadeTransitionProps) {
  const getVariants = (): Variants => {
    if (customVariants) return customVariants

    switch (variant) {
      case 'fadeIn':
        return fadeIn
      case 'fadeInUp':
        return fadeInUp
      case 'stagger':
        return staggerChildren ? staggerContainer : fadeInUp
      default:
        return fadeInUp
    }
  }

  const getTransition = (): Transition | undefined => {
    if (customTransition) return customTransition

    const baseTransition: Transition = {
      delay,
    }

    if (duration !== undefined) {
      baseTransition.duration = duration
    }

    return baseTransition
  }

  const variants = getVariants()
  const transition = getTransition()

  if (staggerChildren) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div className={className} variants={staggerItem} transition={{ delay }}>
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0.2,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDelay / 2,
        staggerDirection: -1,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}
