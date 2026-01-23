'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type HTMLElementTag = 'div' | 'span' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav' | 'aside' | 'ul' | 'ol' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface FadeInViewProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  triggerOnMount?: boolean
  once?: boolean
  threshold?: number
  as?: HTMLElementTag
}

export function FadeInView({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 600,
  triggerOnMount = false,
  once = true,
  threshold = 0.1,
  as: Component = 'div',
}: FadeInViewProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(triggerOnMount)

  useEffect(() => {
    if (triggerOnMount) {
      // Trigger animation on mount
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [triggerOnMount, once, threshold])

  // Transform values based on direction
  const transforms = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
    none: 'translateY(0)',
  }

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0)' : transforms[direction],
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
    transitionDelay: `${delay}ms`,
  }

  // Use createElement to handle dynamic "as" prop properly
  const ElementComponent = Component as React.ElementType

  return (
    <ElementComponent ref={ref} className={cn(className)} style={style}>
      {children}
    </ElementComponent>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  as?: HTMLElementTag
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  direction = 'up',
  duration = 600,
  as: Component = 'div',
}: StaggerContainerProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const ElementComponent = Component as React.ElementType

  return (
    <ElementComponent ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <FadeInView
              key={index}
              direction={direction}
              delay={isVisible ? index * staggerDelay : 0}
              duration={duration}
              triggerOnMount={isVisible}
            >
              {child}
            </FadeInView>
          ))
        : children}
    </ElementComponent>
  )
}
