'use client'

import { useEffect, useState, RefObject } from 'react'

interface UseInViewOptions {
  once?: boolean
  amount?: number
  margin?: string
}

export function useInView(
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean {
  const { once = false, amount = 0, margin = '0px' } = options
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        if (inView) {
          setIsInView(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold: amount,
        rootMargin: margin,
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, once, amount, margin])

  return isInView
}
