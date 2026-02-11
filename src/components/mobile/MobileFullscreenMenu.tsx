/**
 * MobileFullscreenMenu - Slide-in fullscreen navigation menu for mobile
 *
 * This component provides a comprehensive fullscreen menu with navigation sections,
 * quick actions, language toggle, and contact options. It slides in from the side.
 *
 * Also exports BottomNavigation component for dashboard tab bar.
 *
 * @see MobileBottomNav for the fixed bottom tab bar navigation
 */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  BookOpen,
  Play,
  MessageCircle,
  User,
  Phone,
  Search,
  Menu,
  X,
  ChevronRight,
  Star,
  Award,
  Users,
  Clock,
  LayoutDashboard,
} from 'lucide-react'
import { useTranslations } from '@/lib/i18n/translations'
import { QuickLanguageToggle } from './LanguageSwitcher'
import { useIndianMobileOptimizations } from '@/lib/mobile/indianMobileOptimizations'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { getPhoneLink } from '@/lib/constants/contactInfo'

interface MobileNavigationProps {
  isOpen: boolean
  onToggle: () => void
  currentPath?: string
}

export function MobileNavigation({ isOpen, onToggle, currentPath = '/' }: MobileNavigationProps) {
  const { t, language } = useTranslations()
  const { shouldReduceAnimations } = useIndianMobileOptimizations()
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onToggle()
    }
  }, [currentPath])

  const mainNavItems = [
    {
      icon: Home,
      label: t('home'),
      href: '/',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: BookOpen,
      label: t('courses'),
      href: '/courses',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      submenu: [
        { label: 'Class 11th Biology', href: '/courses/class-11' },
        { label: 'Class 12th Biology', href: '/courses/class-12' },
        { label: 'NEET Preparation', href: '/courses/neet' },
        { label: 'Dropper Batch', href: '/courses/dropper' },
      ],
    },
    {
      icon: Play,
      label: 'Demo Class',
      href: '/demo',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: MessageCircle,
      label: 'Support',
      href: '/support',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: User,
      label: 'My Account',
      href: '/account',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  const quickActions = [
    {
      icon: Phone,
      label: language === 'hi' ? 'कॉल करें' : 'Call Now',
      action: () => window.open(getPhoneLink()),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: MessageCircle,
      label: language === 'hi' ? 'व्हाट्सएप' : 'WhatsApp',
      action: async () => {
        await trackAndOpenWhatsApp({
          source: 'mobile-navigation',
          message: WHATSAPP_MESSAGES.default,
          campaign: 'mobile-nav',
        })
      },
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Search,
      label: language === 'hi' ? 'खोजें' : 'Search',
      href: '/search',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  const statsItems = [
    {
      icon: Users,
      value: '10,000+',
      label: language === 'hi' ? 'छात्र' : 'Students',
      color: 'text-blue-600',
    },
    {
      icon: Award,
      value: '98%',
      label: language === 'hi' ? 'सफलता दर' : 'Success Rate',
      color: 'text-green-600',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: language === 'hi' ? 'रेटिंग' : 'Rating',
      color: 'text-yellow-600',
    },
    {
      icon: Clock,
      value: '5+',
      label: language === 'hi' ? 'वर्ष अनुभव' : 'Years Experience',
      color: 'text-purple-600',
    },
  ]

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white border border-gray-200 rounded-xl shadow-lg mobile-touch-target"
        aria-label="Toggle Menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: shouldReduceAnimations ? 0 : 0.2 }}
            >
              <X className="w-6 h-6 text-gray-700" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: shouldReduceAnimations ? 0 : 0.2 }}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceAnimations ? 0 : 0.3 }}
            className="fixed inset-0 bg-white z-40 md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="pt-20 pb-6 px-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {language === 'hi' ? 'सेरेब्रम बायोलॉजी अकादमी' : 'Cerebrum Biology Academy'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'hi' ? 'भारत की #1 NEET कोचिंग' : "India's #1 NEET Coaching"}
                  </p>
                </div>
                <QuickLanguageToggle />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                {statsItems.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: shouldReduceAnimations ? 0 : index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-3 text-center"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                    <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Navigation */}
            <div className="px-6 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'hi' ? 'मुख्य मेनू' : 'Main Menu'}
              </h3>

              <div className="space-y-3">
                {mainNavItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: shouldReduceAnimations ? 0 : index * 0.1 }}
                  >
                    <NavItem
                      item={item}
                      currentPath={currentPath}
                      activeSubmenu={activeSubmenu}
                      setActiveSubmenu={setActiveSubmenu}
                      onClose={onToggle}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: shouldReduceAnimations ? 0 : index * 0.1 }}
                  >
                    <QuickActionButton action={action} onClose={onToggle} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="px-6 py-6 bg-gray-50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: shouldReduceAnimations ? 0 : 0.5 }}
                className="text-center"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {language === 'hi' ? 'मुफ्त डेमो क्लास बुक करें' : 'Book Free Demo Class'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {language === 'hi'
                    ? 'AIIMS फैकल्टी के साथ लाइव क्लास का अनुभव करें'
                    : 'Experience live classes with AIIMS faculty'}
                </p>
                <Link href="/demo-booking" onClick={onToggle}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-indigo-500 text-white py-4 rounded-xl font-semibold mobile-cta"
                  >
                    {language === 'hi' ? 'अभी बुक करें' : 'Book Now'}
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">
                  {language === 'hi'
                    ? '© 2026 सेरेब्रम बायोलॉजी अकादमी'
                    : '© 2026 Cerebrum Biology Academy'}
                </p>
                <p>{language === 'hi' ? 'सभी अधिकार सुरक्षित हैं' : 'All rights reserved'}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItem({ item, currentPath, activeSubmenu, setActiveSubmenu, onClose }: any) {
  const { shouldReduceAnimations } = useIndianMobileOptimizations()
  const isActive = currentPath === item.href
  const hasSubmenu = item.submenu && item.submenu.length > 0
  const isSubmenuOpen = activeSubmenu === item.href

  const handleClick = () => {
    if (hasSubmenu) {
      setActiveSubmenu(isSubmenuOpen ? null : item.href)
    } else {
      onClose()
    }
  }

  return (
    <div>
      {/* Main Nav Item */}
      {hasSubmenu ? (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className={`w-full flex items-center justify-between p-4 rounded-xl transition-colors mobile-touch-target ${
            isActive ? `${item.bgColor} ${item.color}` : 'hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-white' : item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600'}`} />
            </div>
            <span className={`font-medium ${isActive ? item.color : 'text-gray-900'}`}>
              {item.label}
            </span>
          </div>
          <ChevronRight
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isSubmenuOpen ? 'rotate-90' : ''
            }`}
          />
        </motion.button>
      ) : (
        <Link href={item.href} onClick={onClose}>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className={`flex items-center space-x-3 p-4 rounded-xl transition-colors mobile-touch-target ${
              isActive ? `${item.bgColor} ${item.color}` : 'hover:bg-gray-50'
            }`}
          >
            <div className={`p-2 rounded-lg ${isActive ? 'bg-white' : item.bgColor}`}>
              <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600'}`} />
            </div>
            <span className={`font-medium ${isActive ? item.color : 'text-gray-900'}`}>
              {item.label}
            </span>
          </motion.div>
        </Link>
      )}

      {/* Submenu */}
      <AnimatePresence>
        {hasSubmenu && isSubmenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: shouldReduceAnimations ? 0 : 0.3 }}
            className="ml-4 mt-2 space-y-2 overflow-hidden"
          >
            {item.submenu.map((subItem: any, index: number) => (
              <motion.div
                key={subItem.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: shouldReduceAnimations ? 0 : index * 0.05 }}
              >
                <Link href={subItem.href} onClick={onClose}>
                  <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors mobile-secondary-btn">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3" />
                    <span className="text-gray-700 font-medium">{subItem.label}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function QuickActionButton({ action, onClose }: any) {
  const handleClick = () => {
    if (action.action) {
      action.action()
    }
    if (action.href) {
      onClose()
    }
  }

  const ButtonContent = () => (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={`p-4 rounded-xl text-center transition-colors mobile-touch-target ${action.bgColor} hover:opacity-80`}
      onClick={handleClick}
    >
      <div className={`inline-block p-2 bg-white rounded-lg mb-2`}>
        <action.icon className={`w-5 h-5 ${action.color}`} />
      </div>
      <div className={`text-sm font-medium ${action.color}`}>{action.label}</div>
    </motion.div>
  )

  if (action.href) {
    return (
      <Link href={action.href} onClick={onClose}>
        <ButtonContent />
      </Link>
    )
  }

  return <ButtonContent />
}

// Bottom navigation for mobile (alternative to full-screen menu)
export function BottomNavigation({ currentPath = '/' }: { currentPath?: string }) {
  const { t } = useTranslations()

  const navItems = [
    { icon: Home, label: t('home'), href: '/', active: currentPath === '/' },
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/dashboard',
      active: currentPath.startsWith('/dashboard'),
    },
    {
      icon: BookOpen,
      label: t('courses'),
      href: '/courses',
      active: currentPath.startsWith('/courses'),
    },
    { icon: MessageCircle, label: 'Support', href: '/support', active: currentPath === '/support' },
    { icon: User, label: 'Account', href: '/account', active: currentPath.startsWith('/account') },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-padding z-30">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="flex-1">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                item.active ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon
                className={`w-5 h-5 mb-1 ${item.active ? 'text-blue-600' : 'text-gray-400'}`}
              />
              <span
                className={`text-xs font-medium ${item.active ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {item.label}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
