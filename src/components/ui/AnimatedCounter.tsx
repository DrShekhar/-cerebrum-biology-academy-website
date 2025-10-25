'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  formatLargeNumbers?: boolean
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 1.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatLargeNumbers = false,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from)

  const spring = useSpring(from, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  })

  useEffect(() => {
    spring.set(to)

    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(latest)
    })

    return () => unsubscribe()
  }, [to, spring])

  const formatNumber = (value: number): string => {
    if (!formatLargeNumbers) {
      return value.toFixed(decimals)
    }

    const absValue = Math.abs(value)

    if (absValue >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    } else if (absValue >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }

    return value.toFixed(decimals)
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </motion.span>
  )
}

export default AnimatedCounter
