'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, PanInfo } from 'framer-motion'
import {
  PullToRefreshHandler,
  QuickActions,
  initNativeTouchGestures,
} from '@/utils/nativeTouchGestures'
import {
  HomeIcon,
  BookOpen,
  MessageSquare,
  UserCircleIcon,
  Phone,
  Play,
  ChevronDown,
  X,
} from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Touch Target Component - Ensures minimum 48px touch targets
interface TouchTargetProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'light' | 'medium' | 'heavy'
  disabled?: boolean
}

export function TouchTarget({
  children,
  className = '',
  onClick,
  variant = 'light',
  disabled = false,
}: TouchTargetProps) {
  const hapticClass = `haptic-${variant}`

  return (
    <button
      className={`touch-target touch-button touch-feedback ${hapticClass} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Swipeable Course Carousel Component
interface CourseCarouselProps {
  courses: Array<{
    id: string
    title: string
    price: string
    originalPrice: string
    image: string
    features: string[]
  }>
  onCourseSelect?: (courseId: string) => void
}

export function SwipeableCourseCarousel({ courses, onCourseSelect }: CourseCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handlePanStart = () => {
    setIsDragging(true)
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100

    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (info.offset.x < -threshold && currentIndex < courses.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <div className="course-carousel-container relative overflow-hidden">
      <motion.div
        className="course-carousel swipeable"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onPanStart={handlePanStart}
        onPanEnd={handlePanEnd}
        animate={{ x: -currentIndex * 320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            className={`course-snap-item ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <h3 className="text-xl font-bold text-white text-center px-4">{course.title}</h3>
              </div>

              <div className="p-6">
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="text-2xl font-bold text-slate-800">{course.price}</span>
                  <span className="text-lg text-slate-500 line-through">
                    {course.originalPrice}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-slate-700">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <TouchTarget
                  variant="medium"
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-3 rounded-lg"
                  onClick={() => onCourseSelect?.(course.id)}
                >
                  Select Course
                </TouchTarget>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {courses.map((_, index) => (
          <TouchTarget
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-500' : 'bg-slate-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to course {index + 1}</span>
          </TouchTarget>
        ))}
      </div>
    </div>
  )
}

// Mobile Action Bar Component
interface MobileActionBarProps {
  onCallClick?: () => void
  onWhatsAppClick?: () => void
  onDemoClick?: () => void
  onEnrollClick?: () => void
}

export function MobileActionBar({
  onCallClick,
  onWhatsAppClick,
  onDemoClick,
  onEnrollClick,
}: MobileActionBarProps) {
  return (
    <div className="mobile-actions md:hidden">
      <div className="flex space-x-3">
        <TouchTarget
          variant="medium"
          className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
          onClick={onCallClick}
        >
          <Phone className="w-5 h-5" />
          <span>Call</span>
        </TouchTarget>

        <TouchTarget
          variant="medium"
          className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
          onClick={onWhatsAppClick}
        >
          <MessageSquare className="w-5 h-5" />
          <span>WhatsApp</span>
        </TouchTarget>

        <TouchTarget
          variant="heavy"
          className="flex-1 bg-orange-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
          onClick={onEnrollClick}
        >
          <BookOpen className="w-5 h-5" />
          <span>Enroll</span>
        </TouchTarget>
      </div>
    </div>
  )
}

// Thumb Navigation Component
interface ThumbNavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function ThumbNavigation({ currentPage, onNavigate }: ThumbNavigationProps) {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'courses', icon: BookOpen, label: 'Courses' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'profile', icon: UserCircleIcon, label: 'Profile' },
  ]

  return (
    <div className="thumb-zone md:hidden">
      <nav className="thumb-nav">
        {navItems.map((item) => (
          <TouchTarget
            key={item.id}
            variant="light"
            className={`thumb-nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="w-6 h-6" />
          </TouchTarget>
        ))}
      </nav>
    </div>
  )
}

// Floating Action Button Component
interface FloatingActionButtonProps {
  icon?: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function FloatingActionButton({
  icon = <Phone className="w-6 h-6" />,
  onClick,
  variant = 'primary',
}: FloatingActionButtonProps) {
  return (
    <TouchTarget
      variant="heavy"
      className={`floating-action-button ${
        variant === 'secondary' ? 'bg-gradient-to-r from-slate-600 to-slate-700' : ''
      }`}
      onClick={onClick}
    >
      {icon}
    </TouchTarget>
  )
}

// Mobile Modal Component
interface MobileModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function MobileModal({ isOpen, onClose, title, children }: MobileModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className={`mobile-modal ${isOpen ? 'open' : ''}`}>
      <div className="mobile-modal-content">
        <div className="mobile-modal-handle"></div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <TouchTarget
            variant="light"
            className="p-2 text-slate-500 hover:text-slate-700"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </TouchTarget>
        </div>

        <div className="overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  )
}

// Touch-Optimized Form Component
interface TouchFormProps {
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  className?: string
}

export function TouchForm({ children, onSubmit, className = '' }: TouchFormProps) {
  return (
    <form className={`mobile-form ${className}`} onSubmit={onSubmit} noValidate>
      {children}
    </form>
  )
}

// Touch Input Component
interface TouchInputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  label?: string
  required?: boolean
}

export function TouchInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  label,
  required = false,
}: TouchInputProps) {
  return (
    <div className="form-group">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
            : 'border-slate-300 focus:border-green-600 focus:ring-green-100'
        } focus:ring-3 focus:outline-none`}
        style={{ fontSize: '16px' }} // Prevent zoom on iOS
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// Enhanced Pull to Refresh Component with Native Support
interface PullToRefreshProps {
  children: ReactNode
  onRefresh: () => Promise<void>
  refreshing?: boolean
  useNative?: boolean
}

export function PullToRefresh({
  children,
  onRefresh,
  refreshing = false,
  useNative = true,
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const pullHandlerRef = useRef<PullToRefreshHandler | null>(null)

  useEffect(() => {
    if (useNative && containerRef.current) {
      // Initialize native pull to refresh
      pullHandlerRef.current = new PullToRefreshHandler({
        onRefresh: onRefresh,
        refreshIndicatorSelector: '.pull-refresh-indicator',
      })

      return () => {
        pullHandlerRef.current?.destroy()
      }
    }
  }, [onRefresh, useNative])

  // Fallback to Framer Motion for non-native mode
  const handlePanStart = () => {
    if (!useNative && window.scrollY === 0) {
      setIsPulling(true)
    }
  }

  const handlePan = (event: any, info: PanInfo) => {
    if (!useNative && isPulling && info.offset.y > 0) {
      setPullDistance(Math.min(info.offset.y, 100))
    }
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (!useNative && isPulling) {
      if (pullDistance > 60) {
        onRefresh()
      }
      setIsPulling(false)
      setPullDistance(0)
    }
  }

  const motionProps = useNative
    ? {}
    : {
        onPanStart: handlePanStart,
        onPan: handlePan,
        onPanEnd: handlePanEnd,
        drag: 'y' as const,
        dragConstraints: { top: 0, bottom: 0 },
      }

  return (
    <motion.div ref={containerRef} className="pull-to-refresh" {...motionProps}>
      <div
        className={`pull-refresh-indicator ${
          useNative || (isPulling && pullDistance > 60) ? 'active' : ''
        }`}
      >
        {refreshing ? (
          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </div>

      {useNative ? (
        children
      ) : (
        <motion.div
          animate={{ y: isPulling ? pullDistance * 0.5 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}

// Card Stack Component for Mobile
interface MobileCardStackProps {
  cards: Array<{
    id: string
    title: string
    content: ReactNode
    action?: () => void
  }>
}

export function MobileCardStack({ cards }: MobileCardStackProps) {
  return (
    <div className="mobile-card-stack">
      {cards.map((card) => (
        <TouchTarget
          key={card.id}
          variant="light"
          className="card touch-optimized"
          onClick={card.action}
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{card.title}</h3>
          <div className="text-slate-600">{card.content}</div>
        </TouchTarget>
      ))}
    </div>
  )
}

// Enhanced Haptic Feedback Utility
export const HapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(25)
    }
  },

  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  },

  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  },

  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100])
    }
  },

  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  },

  // Quick action shortcuts
  call: () => HapticFeedback.light(),
  whatsapp: () => HapticFeedback.light(),
  share: () => HapticFeedback.medium(),
  enroll: () => HapticFeedback.heavy(),
}

// Touch Optimization Context
interface TouchOptimizationContextType {
  isTouchDevice: boolean
  isLowEndDevice: boolean
  reduceAnimations: boolean
}

const TouchOptimizationContext = React.createContext<TouchOptimizationContextType>({
  isTouchDevice: false,
  isLowEndDevice: false,
  reduceAnimations: false,
})

export function useTouchOptimization() {
  return React.useContext(TouchOptimizationContext)
}

// Touch Optimization Provider
interface TouchOptimizationProviderProps {
  children?: ReactNode
}

export function TouchOptimizationProvider({ children }: TouchOptimizationProviderProps) {
  const [optimization, setOptimization] = useState<TouchOptimizationContextType>({
    isTouchDevice: false,
    isLowEndDevice: false,
    reduceAnimations: false,
  })

  useEffect(() => {
    const detectCapabilities = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isLowEndDevice =
        navigator.hardwareConcurrency <= 2 || (navigator as any).deviceMemory <= 2
      const reduceAnimations = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setOptimization({
        isTouchDevice,
        isLowEndDevice,
        reduceAnimations,
      })
    }

    detectCapabilities()
  }, [])

  return (
    <TouchOptimizationContext.Provider value={optimization}>
      {children}
    </TouchOptimizationContext.Provider>
  )
}

// Enhanced Quick Action Button with Native Integration
interface EnhancedQuickActionButtonProps {
  action: 'call' | 'whatsapp' | 'share' | 'email' | 'enroll' | 'demo'
  phoneNumber?: string
  emailAddress?: string
  courseId?: string
  customAction?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function EnhancedQuickActionButton({
  action,
  phoneNumber = CONTACT_INFO.phone.primary,
  emailAddress = 'contact@cerebrumbiologyacademy.com',
  courseId,
  customAction,
  className = '',
  size = 'md',
}: EnhancedQuickActionButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-14 h-14 text-xl',
    lg: 'w-16 h-16 text-2xl',
  }

  const actionConfig = {
    call: {
      icon: <Phone className="w-6 h-6" />,
      bgColor: 'bg-blue-600',
      label: 'Call Now',
      action: () => {
        HapticFeedback.call()
        QuickActions.callButton(phoneNumber)
      },
    },
    whatsapp: {
      icon: <MessageSquare className="w-6 h-6" />,
      bgColor: 'bg-green-600',
      label: 'WhatsApp',
      action: () => {
        HapticFeedback.whatsapp()
        QuickActions.whatsappButton(phoneNumber)
      },
    },
    share: {
      icon: <span className="text-lg">📤</span>,
      bgColor: 'bg-purple-600',
      label: 'Share',
      action: () => {
        HapticFeedback.share()
        QuickActions.shareButton()
      },
    },
    email: {
      icon: <span className="text-lg">✉️</span>,
      bgColor: 'bg-red-600',
      label: 'Email',
      action: () => {
        HapticFeedback.light()
        QuickActions.emailButton(emailAddress)
      },
    },
    enroll: {
      icon: <BookOpen className="w-6 h-6" />,
      bgColor: 'bg-gradient-to-r from-green-600 to-blue-500',
      label: 'Enroll Now',
      action: () => {
        HapticFeedback.enroll()
        QuickActions.enrollButton(courseId)
      },
    },
    demo: {
      icon: <Play className="w-6 h-6" />,
      bgColor: 'bg-orange-600',
      label: 'Book Demo',
      action: () => {
        HapticFeedback.medium()
        QuickActions.demoButton()
      },
    },
  }

  const config = actionConfig[action]

  return (
    <TouchTarget
      variant="medium"
      className={`
        ${sizeClasses[size]}
        ${config.bgColor}
        text-white
        rounded-full
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-300
        ${className}
      `}
      onClick={customAction || config.action}
    >
      {config.icon}
    </TouchTarget>
  )
}

// Native Touch Gestures Hook
export function useNativeTouchGestures(
  options: {
    enablePullToRefresh?: boolean
    enableQuickActions?: boolean
    onRefresh?: () => Promise<void>
    phoneNumber?: string
    emailAddress?: string
  } = {}
) {
  useEffect(() => {
    const cleanup = initNativeTouchGestures(options)
    return cleanup
  }, [])
}

export default {
  TouchTarget,
  SwipeableCourseCarousel,
  MobileActionBar,
  ThumbNavigation,
  FloatingActionButton,
  EnhancedQuickActionButton,
  MobileModal,
  TouchForm,
  TouchInput,
  PullToRefresh,
  MobileCardStack,
  HapticFeedback,
  TouchOptimizationProvider,
  useTouchOptimization,
  useNativeTouchGestures,
}
