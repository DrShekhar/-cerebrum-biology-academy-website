'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
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
} from 'lucide-react'
import Link from 'next/link'
import { navigationConfig, type NavigationSection } from '@/data/navigationConfig'

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
}

export function BurgerMenu({ isOpen, onToggle, onClose }: BurgerMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      setExpandedSection(null)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
  }

  const handleLinkClick = () => {
    onClose()
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

  return (
    <>
      {/* Burger Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group relative z-50"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <motion.div
          animate={isOpen ? 'open' : 'closed'}
          className="relative w-6 h-6"
        >
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

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                <p className="text-sm text-gray-500">Explore our courses & services</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Navigation Sections */}
            <div className="p-6 space-y-4">
              {navigationConfig.map((section) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap]
                const isExpanded = expandedSection === section.id

                return (
                  <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleSectionToggle(section.id)}
                      className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center space-x-3">
                        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                        <span className="font-semibold text-gray-900">{section.title}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
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
                                className="group flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-all duration-200"
                              >
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900 group-hover:text-blue-600">
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
                                    <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                  )}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-200" />
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

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">Ready to Start?</h3>
                <p className="text-blue-100 text-sm mb-4">Join thousands of successful NEET aspirants</p>
                <Link
                  href="/support/demo"
                  onClick={handleLinkClick}
                  className="inline-flex items-center justify-center w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
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
}