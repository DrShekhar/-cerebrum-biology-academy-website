'use client'

import { useState, useEffect } from 'react'
import { useScrollLock } from '@/lib/hooks/useScrollLock'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronRight,
  ChevronDown,
  Star,
  Sparkles,
  GraduationCap,
  BookOpen,
  Users,
  Building,
  HelpCircle,
  LayoutDashboard,
  ClipboardList,
  Settings,
  Calculator,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { navigationConfig } from '@/data/navigationConfig'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { signOut } from '@/lib/firebase/phone-auth'

interface BurgerMenuProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

const iconMap = {
  GraduationCap,
  BookOpen,
  Users,
  Building,
  HelpCircle,
  Calculator,
  FileText,
}

export function BurgerMenu({ isOpen, onToggle, onClose }: BurgerMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { user, isAuthenticated } = useFirebaseSession()
  const router = useRouter()

  // Focus trap for accessibility - keeps focus within modal when open
  const focusTrapRef = useFocusTrap(isOpen)

  // Get dashboard link based on user role
  const getDashboardInfo = () => {
    if (!isAuthenticated || !user) return null

    // Role can be lowercase (from session API) or uppercase
    const normalizedRole = user.role?.toUpperCase()

    switch (normalizedRole) {
      case 'ADMIN':
        return { href: '/admin', label: 'Admin Dashboard', icon: Settings }
      case 'COUNSELOR':
        return { href: '/counselor/leads', label: 'Counselor Dashboard', icon: ClipboardList }
      case 'TEACHER':
        return { href: '/teacher/assignments', label: 'Teacher Dashboard', icon: Users }
      default:
        return { href: '/dashboard', label: 'My Dashboard', icon: LayoutDashboard }
    }
  }

  const dashboardInfo = getDashboardInfo()

  // Use shared scroll lock to prevent race conditions with other modals
  useScrollLock(isOpen)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset expanded section when menu closes
  useEffect(() => {
    if (!isOpen) {
      setExpandedSection(null)
    }
  }, [isOpen])

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleLinkClick = () => {
    onClose()
  }

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      onClose()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      x: -300,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
  }

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  const sectionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
  }

  const menuContent = (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={onClose}
            style={{ pointerEvents: 'auto' }}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={focusTrapRef}
            id="burger-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-0 h-full w-[85vw] max-w-80 bg-white shadow-2xl z-[101] overflow-y-auto"
          >
            {/* Header - sticky with solid background and z-index to stay above scrolling content */}
            <div className="sticky top-0 bg-white/100 backdrop-blur-sm border-b border-gray-200 p-6 flex items-center justify-between pointer-events-auto z-20 shadow-md isolate">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                <p className="text-sm text-gray-500">Explore our courses & services</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200 touch-manipulation"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Dashboard Link and Sign Out (if authenticated) */}
            {dashboardInfo && (
              <div className="px-6 pt-4 relative z-0 bg-white space-y-2">
                <Link
                  href={dashboardInfo.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-4 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center space-x-3">
                    <dashboardInfo.icon className="w-5 h-5" />
                    <span className="font-semibold">{dashboardInfo.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSigningOut ? 'Signing Out...' : 'Sign Out'}
                </button>
              </div>
            )}

            {/* Quick Course Links */}
            <div className="px-6 pt-4 relative z-0 bg-white">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Quick Access
              </h3>
              <div className="space-y-2">
                {/* All Courses - Prominent Button */}
                <Link
                  href="/courses"
                  onClick={handleLinkClick}
                  className="flex items-center justify-center gap-2 p-4 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg text-base font-semibold"
                >
                  <GraduationCap className="w-5 h-5" />
                  View All Courses
                </Link>
                {/* Course Grid - responsive for small screens */}
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                  <Link
                    href="/courses/class-11"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center p-3 min-h-[44px] bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium touch-manipulation"
                  >
                    Class 11
                  </Link>
                  <Link
                    href="/courses/class-12"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center p-3 min-h-[44px] bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium touch-manipulation"
                  >
                    Class 12
                  </Link>
                  <Link
                    href="/courses/neet-dropper"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center p-3 min-h-[44px] bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium col-span-2 xs:col-span-1 touch-manipulation"
                  >
                    Dropper
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="p-6 space-y-4 relative z-0 bg-white">
              {navigationConfig.map((section) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap]
                const isExpanded = expandedSection === section.id

                return (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => handleSectionToggle(section.id)}
                      className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-indigo-50 transition-all duration-300 group relative overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-blue-600 before:transition-all before:duration-300 hover:before:w-1"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center space-x-3 relative z-10">
                        {Icon && (
                          <Icon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {section.title}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          variants={sectionVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="overflow-hidden"
                        >
                          <div className="p-4 space-y-2 bg-white">
                            {section.items.map((item) => (
                              <Link
                                key={item.id}
                                href={item.href}
                                onClick={handleLinkClick}
                                className="group relative flex items-center justify-between p-3 rounded-lg hover:bg-indigo-50 transition-all duration-300 overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:bg-blue-600 before:transition-all before:duration-300 hover:before:w-1"
                              >
                                <div className="flex-1 relative z-10">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                      {item.title}
                                    </span>
                                    {item.isNew && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        New
                                      </span>
                                    )}
                                    {item.isPopular && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                                        <Star className="w-3 h-3 mr-1" />
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-300 relative z-10" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Footer - Non-sticky to avoid blocking clicks */}
            <div className="mt-auto bg-indigo-500 text-white p-4 sm:p-6">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Ready to Start?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Join thousands of successful NEET aspirants
                </p>
                <Link
                  href="/demo-booking"
                  onClick={handleLinkClick}
                  className="inline-flex items-center justify-center w-full bg-white text-blue-600 px-4 py-3 min-h-[48px] rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 touch-manipulation"
                >
                  Book Free Demo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <>
      {/* Burger Button - 44px minimum touch target for iOS accessibility */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group relative z-[60] touch-manipulation"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="burger-menu-panel"
      >
        <motion.div animate={isOpen ? 'open' : 'closed'} className="relative w-6 h-6">
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 6 },
            }}
            className="absolute left-0 top-0 w-6 h-0.5 bg-blue-600 transform origin-left transition-all duration-300"
          />
          <motion.span
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            className="absolute left-0 top-2.5 w-6 h-0.5 bg-blue-600 transition-all duration-300"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -6 },
            }}
            className="absolute left-0 top-5 w-6 h-0.5 bg-blue-600 transform origin-left transition-all duration-300"
          />
        </motion.div>
      </button>

      {/* Portal for overlay and menu panel to escape header stacking context */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  )
}
