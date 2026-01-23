'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import {
  Home,
  BookOpen,
  TestTube,
  Trophy,
  Menu,
  X,
  Search,
  User,
  Settings,
  HelpCircle,
  MessageCircle,
  Download,
  Clock,
  Target,
  ChevronRight,
  Bell,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { trackAndOpenWhatsApp, getContextAwareMessage } from '@/lib/whatsapp/tracking'

interface NavigationItem {
  href: string
  label: string
  labelHi: string
  icon: React.ComponentType<{ className?: string }>
  badge?: number
  highlight?: boolean
  requiresAuth?: boolean
  isWhatsApp?: boolean
}

interface EnhancedMobileNavigationProps {
  currentLanguage?: string
  isAuthenticated?: boolean
  onLanguageChange?: (language: string) => void
  className?: string
}

const MAIN_NAVIGATION: NavigationItem[] = [
  {
    href: '/',
    label: 'Home',
    labelHi: 'होम',
    icon: Home,
  },
  {
    href: '/courses',
    label: 'Courses',
    labelHi: 'कोर्स',
    icon: BookOpen,
  },
  {
    href: '/mock-tests',
    label: 'Tests',
    labelHi: 'टेस्ट',
    icon: TestTube,
    highlight: true,
  },
  {
    href: '/success-stories',
    label: 'Results',
    labelHi: 'रिजल्ट',
    icon: Trophy,
  },
  {
    href: '#',
    label: 'WhatsApp',
    labelHi: 'व्हाट्सऐप',
    icon: MessageCircle,
    isWhatsApp: true,
    highlight: true,
  },
]

const SECONDARY_NAVIGATION: NavigationItem[] = [
  {
    href: '/profile',
    label: 'Profile',
    labelHi: 'प्रोफाइल',
    icon: User,
    requiresAuth: true,
  },
  {
    href: '/notifications',
    label: 'Notifications',
    labelHi: 'नोटिफिकेशन',
    icon: Bell,
    badge: 3,
    requiresAuth: true,
  },
  {
    href: '/downloads',
    label: 'Downloads',
    labelHi: 'डाउनलोड',
    icon: Download,
  },
  {
    href: '/support',
    label: 'Support',
    labelHi: 'सहायता',
    icon: HelpCircle,
  },
  {
    href: '/whatsapp',
    label: 'WhatsApp',
    labelHi: 'व्हाट्सऐप',
    icon: MessageCircle,
  },
]

export function EnhancedMobileNavigation({
  currentLanguage = 'en',
  isAuthenticated = false,
  onLanguageChange,
  className = ''
}: EnhancedMobileNavigationProps) {
  const pathname = usePathname()
  const [showSideMenu, setShowSideMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dragOffset, setDragOffset] = useState(0)
  const sideMenuRef = useRef<HTMLDivElement>(null)

  // Swipe gesture handling for side menu
  const handlePanStart = () => {
    setDragOffset(0)
  }

  const handlePan = (event: any, info: PanInfo) => {
    if (showSideMenu && info.offset.x < 0) {
      setDragOffset(Math.max(info.offset.x, -320))
    } else if (!showSideMenu && info.offset.x > 0) {
      setDragOffset(Math.min(info.offset.x, 320))
    }
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 160 // Half the menu width

    if (showSideMenu && info.offset.x < -threshold) {
      setShowSideMenu(false)
    } else if (!showSideMenu && info.offset.x > threshold) {
      setShowSideMenu(true)
    }

    setDragOffset(0)
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const getLabel = (item: NavigationItem) => {
    return currentLanguage === 'hi' ? item.labelHi : item.label
  }

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Searching for:', query)
    setShowSearch(false)
  }

  const filteredSecondaryNav = SECONDARY_NAVIGATION.filter(
    item => !item.requiresAuth || isAuthenticated
  )

  return (
    <>
      {/* Top Header */}
      <header className={`mobile-header fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 ${className}`}>
        <div className="flex items-center justify-between h-16 px-4">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSideMenu(true)}
            className="touch-target p-2"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-lg text-gray-900 hidden sm:block">
              Cerebrum Biology
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="touch-target p-2"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                className="touch-target p-2 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="mobile-bottom-nav fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden">
        <div
          className="grid grid-cols-5 gap-0"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
        >
          {MAIN_NAVIGATION.map((item) => {
            const active = isActive(item.href)
            const isExternal = item.href.startsWith('tel:') || item.href.startsWith('https:')

            const content = (
              <div className={`nav-item flex flex-col items-center justify-center py-2 px-1 min-h-touch-md transition-all duration-200 touch-target ripple-effect ${
                item.isWhatsApp
                  ? 'text-[#25D366] bg-green-50'
                  : item.highlight
                    ? 'text-green-600 bg-green-50'
                    : active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700'
              }`}>
                <item.icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium leading-tight">
                  {getLabel(item)}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
            )

            // WhatsApp button with tracking and context-aware message
            if (item.isWhatsApp) {
              return (
                <button
                  key="whatsapp-nav"
                  onClick={async (e) => {
                    e.preventDefault()
                    await trackAndOpenWhatsApp({
                      source: 'mobile-bottom-nav',
                      message: getContextAwareMessage(pathname || undefined),
                      campaign: 'mobile-navigation',
                    })
                  }}
                  className="relative"
                  aria-label={getLabel(item)}
                >
                  {content}
                </button>
              )
            }

            if (isExternal) {
              return (
                <button
                  key={item.href}
                  onClick={() => window.open(item.href, '_self')}
                  className="relative"
                  aria-label={getLabel(item)}
                >
                  {content}
                </button>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative"
                aria-label={getLabel(item)}
              >
                {content}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Side Menu */}
      <AnimatePresence>
        {showSideMenu && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowSideMenu(false)}
              onPanStart={handlePanStart}
              onPan={handlePan}
              onPanEnd={handlePanEnd}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
            />

            {/* Menu Content */}
            <motion.div
              ref={sideMenuRef}
              className="absolute top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto"
              initial={{ x: -320 }}
              animate={{ x: dragOffset }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onPanStart={handlePanStart}
              onPan={handlePan}
              onPanEnd={handlePanEnd}
              drag="x"
              dragConstraints={{ left: -320, right: 0 }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Cerebrum Biology</div>
                    <div className="text-xs text-gray-600">
                      {currentLanguage === 'hi' ? 'NEET की तैयारी' : 'NEET Preparation'}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSideMenu(false)}
                  className="touch-target"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* User Section */}
              {isAuthenticated ? (
                <div className="p-6 bg-blue-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Student Name</div>
                      <div className="text-sm text-gray-600">Class 12 - NEET Aspirant</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white rounded-lg p-2">
                      <div className="font-bold text-blue-600">85%</div>
                      <div className="text-xs text-gray-600">Avg Score</div>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <div className="font-bold text-green-600">12</div>
                      <div className="text-xs text-gray-600">Tests Done</div>
                    </div>
                    <div className="bg-white rounded-lg p-2">
                      <div className="font-bold text-purple-600">45h</div>
                      <div className="text-xs text-gray-600">Study Time</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium text-gray-900 mb-1">
                      {currentLanguage === 'hi' ? 'लॉगिन करें' : 'Join Cerebrum'}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {currentLanguage === 'hi' ? 'प्रगति ट्रैक करें' : 'Track your progress'}
                    </div>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full">
                        {currentLanguage === 'hi' ? 'लॉगिन' : 'Login'}
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        {currentLanguage === 'hi' ? 'साइन अप' : 'Sign Up'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="py-6">
                <div className="space-y-1">
                  {filteredSecondaryNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowSideMenu(false)}
                      className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors touch-target"
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="flex-1">{getLabel(item)}</span>
                      {item.badge && (
                        <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 px-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                    {currentLanguage === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center py-3 h-auto"
                      onClick={() => {
                        setShowSideMenu(false)
                        // Navigate to demo booking
                      }}
                    >
                      <Clock className="w-5 h-5 mb-1" />
                      <span className="text-xs">
                        {currentLanguage === 'hi' ? 'डेमो बुक करें' : 'Book Demo'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex flex-col items-center py-3 h-auto"
                      onClick={() => {
                        setShowSideMenu(false)
                        // Navigate to free test
                      }}
                    >
                      <Target className="w-5 h-5 mb-1" />
                      <span className="text-xs">
                        {currentLanguage === 'hi' ? 'फ्री टेस्ट' : 'Free Test'}
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Settings */}
                <div className="mt-6 px-6 pt-6 border-t border-gray-200">
                  <Link
                    href="/settings"
                    onClick={() => setShowSideMenu(false)}
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors touch-target"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>{currentLanguage === 'hi' ? 'सेटिंग्स' : 'Settings'}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowSearch(false)}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-white shadow-lg"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
            >
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={currentLanguage === 'hi' ? 'खोजें...' : 'Search...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                      className="w-full mobile-input bg-gray-100 border-0"
                      autoFocus
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearch(false)}
                    className="touch-target"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Search Suggestions */}
                {searchQuery && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {currentLanguage === 'hi' ? 'सुझाव' : 'Suggestions'}
                    </div>
                    {[
                      'Biology Mock Test',
                      'NEET Previous Papers',
                      'Plant Kingdom Notes',
                      'Human Physiology'
                    ].filter(item =>
                      item.toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="flex items-center w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left touch-target"
                      >
                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                        <span>{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}