'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface FixedHeaderProps {
  className?: string
}

export function FixedHeader({ className = '' }: FixedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleBookDemo = () => {
    window.location.href = '/demo'
  }

  const handleCall = () => {
    window.open('tel:+918826444334', '_self')
  }

  const navLinks = [
    { href: '#courses', label: 'Courses' },
    { href: '/success-stories', label: 'Results' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/locations', label: 'Centers' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur ${className}`}>
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo - Text Only */}
          <Link href="/" className="logo">
            <div className="text-white font-bold text-xl">Cerebrum Biology Academy</div>
          </Link>

          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleBookDemo}
              className="hidden md:block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Book Demo
            </button>
            <button
              onClick={handleCall}
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 p-2"
              aria-label="Call us"
            >
              <PhoneIcon className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-slate-700 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-emerald-400 transition-colors duration-200 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => {
                      handleBookDemo()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Book Demo
                  </button>
                  <button
                    onClick={() => {
                      handleCall()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 py-2"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    Call Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
