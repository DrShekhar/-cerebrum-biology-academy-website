'use client'

import React, { useEffect, useState, useRef } from 'react'
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
  const animRef = useRef<number>(0)

  useEffect(() => {
    const start = from
    const end = to
    const durationMs = duration * 1000
    const startTime = performance.now()

    function animate(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplayValue(current)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [from, to, duration])

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
    <span className={className}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}

export default AnimatedCounter
