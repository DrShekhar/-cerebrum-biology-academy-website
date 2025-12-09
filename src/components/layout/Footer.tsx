'use client'

import { memo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  Send,
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { useI18n } from '@/contexts/I18nContext'

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState('')
  const { t } = useI18n()

  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setSubscribeMessage('Please enter a valid email address')
      return
    }

    setIsSubscribing(true)
    setSubscribeMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscribeMessage(data.message || 'Thank you for subscribing!')
        if (!data.alreadySubscribed) {
          setEmail('')
        }
      } else {
        setSubscribeMessage(data.error || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      setSubscribeMessage('Subscription failed. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const courseLinks = [
    { name: 'NEET 2026 Preparation', href: '/neet-2026-preparation' },
    { name: 'Class 11th Biology', href: '/courses/class-11' },
    { name: 'Class 12th Biology', href: '/courses/class-12' },
    { name: 'NEET Dropper Program', href: '/courses/neet-dropper' },
    { name: 'Foundation Course (9th-10th)', href: '/courses/foundation' },
    { name: 'Class 9th Foundation', href: '/courses/class-9-foundation' },
    { name: 'Class 10th Foundation', href: '/courses/class-10-foundation' },
    { name: 'Pricing & Fee Structure', href: '/pricing' },
  ]

  const boardLinks = [
    { name: 'CBSE Biology', href: '/boards/cbse' },
    { name: 'ICSE Biology', href: '/boards/icse' },
    { name: 'IGCSE Biology', href: '/boards/igcse' },
    { name: 'IB Biology', href: '/boards/ib' },
    { name: 'State Board Biology', href: '/boards/state-boards' },
  ]

  const servicesLinks = [
    { name: 'Online Live Classes', href: '/services/online-classes' },
    { name: 'Classroom Programs', href: '/services/classroom' },
    { name: 'NEET Mock Tests', href: '/mock-tests' },
    { name: 'Study Materials (LMS)', href: '/tests' },
    { name: 'Free Resources', href: '/free-resources' },
    { name: 'Ceri AI', href: '/ai-education-demo' },
    { name: 'International Students', href: '/services/international' },
    { name: 'Board Exam Preparation', href: '/courses' },
    { name: 'Doubt Resolution', href: '/services/doubt-resolution' },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Dr. Shekhar Singh', href: '/dr-shekhar-singh' },
    { name: 'Our Faculty', href: '/faculty' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Results', href: '/results' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/contact' },
  ]

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'Blog', href: '/blog' },
    { name: 'Book Demo Class', href: '/demo-booking' },
    { name: 'Download Brochure', href: '/contact' },
    { name: 'Fee Structure', href: '/courses' },
    { name: 'Admission Process', href: '/admissions' },
  ]

  const locationLinks = [
    { name: 'Delhi NCR', href: '/best-neet-coaching-delhi-ncr' },
    { name: 'South Delhi', href: '/neet-coaching-south-delhi' },
    { name: 'Mumbai', href: '/neet-coaching-mumbai' },
    { name: 'Bangalore', href: '/neet-coaching-bangalore' },
    { name: 'Hyderabad', href: '/neet-coaching-hyderabad' },
    { name: 'Chennai', href: '/neet-coaching-chennai' },
    { name: 'Pune', href: '/neet-coaching-pune' },
    { name: 'Noida', href: '/neet-coaching-noida' },
    { name: 'Gurgaon', href: '/neet-coaching-gurgaon' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Cerebrum-Biology-Academy/100063640374134/',
      icon: Facebook,
    },
    { name: 'Instagram', href: 'https://www.instagram.com/biologyforneetug/', icon: Instagram },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw',
      icon: Youtube,
    },
    { name: 'Twitter', href: 'https://twitter.com/shekharsingh', icon: Twitter },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/918826444334?text=Hi%2C%20I%27m%20interested%20in%20NEET%20Biology%20coaching',
      icon: MessageCircle,
    },
    { name: 'Telegram', href: 'https://t.me/biologyforneetug', icon: Send },
  ]

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Company Info - Spans 2 columns on larger screens */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ opacity: 1 }}
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                <Image
                  src="/brain-logo.png"
                  alt="Cerebrum Biology Academy"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Cerebrum Biology Academy</h3>
                <p className="text-gray-300 text-sm">Excellence in Biology Education</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Founded by Dr. Shekhar C Singh (AIIMS New Delhi). Premier NEET Biology coaching
              institute with 14+ years of excellence. 98% success rate, 2,500+ students mentored to
              medical colleges.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-blue-400" aria-hidden="true" />
                <div>
                  <a
                    href="tel:+918826444334"
                    className="hover:text-white transition-colors"
                    aria-label="Call us at +91 8826444334"
                  >
                    +91 8826444334
                  </a>
                  <span className="text-gray-500 text-sm block">Mon-Sat: 8 AM - 8 PM</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-blue-400" aria-hidden="true" />
                <a
                  href="mailto:info@cerebrumbiologyacademy.com"
                  className="hover:text-white transition-colors"
                  aria-label="Email us at info@cerebrumbiologyacademy.com"
                >
                  info@cerebrumbiologyacademy.com
                </a>
              </div>

              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-blue-400 mt-1" aria-hidden="true" />
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Rohini:</strong> DC Chauk Sector 9, Delhi 110085
                  </div>
                  <div>
                    <strong>Gurugram:</strong> M2K Corporate Park, Sector 50, 122018
                  </div>
                  <div>
                    <strong>South Delhi:</strong> Block B, South Extension 2, 110049
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ opacity: 1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('courses')}</h4>
            <ul className="space-y-2">
              {courseLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Board Preparation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ opacity: 1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('boardPreparation')}</h4>
            <ul className="space-y-2">
              {boardLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ opacity: 1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('services')}</h4>
            <ul className="space-y-2">
              {servicesLinks.slice(0, 6).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-4 mt-6 text-white">Locations</h4>
            <ul className="space-y-2">
              {locationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ opacity: 1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">{t('company')}</h4>
            <ul className="space-y-2 mb-6">
              {companyLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-lg mb-4 text-white">{t('support')}</h4>
            <ul className="space-y-2">
              {supportLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ opacity: 1 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-white">{t('stayUpdated')}</h4>
              <p className="text-gray-300 text-sm">{t('getLatestUpdates')}</p>
            </div>

            <form
              onSubmit={handleNewsletterSubscribe}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm sm:text-base min-h-[44px]"
                aria-label="Email address for newsletter"
                disabled={isSubscribing}
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full sm:w-auto whitespace-nowrap text-xs sm:text-sm min-h-[44px]"
                aria-label="Subscribe to newsletter"
                disabled={isSubscribing}
              >
                {isSubscribing ? '...' : t('subscribe')}
                <Send className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" aria-hidden="true" />
              </Button>
            </form>
            {subscribeMessage && (
              <p
                className={`mt-2 text-sm ${subscribeMessage.includes('Thank') ? 'text-green-400' : 'text-red-400'}`}
              >
                {subscribeMessage}
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} Cerebrum Biology Academy. All rights reserved. | Empowering future
              doctors through excellence in biology education.
            </div>

            {/* Social Links */}
            <nav aria-label="Social media links">
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors touch-manipulation"
                    aria-label={`Visit our ${social.name} page`}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="text-gray-600 ml-4">|</span>}
                </span>
              ))}
              <span className="flex items-center">
                <span className="text-gray-600 ml-4">|</span>
                <Link
                  href="/portal"
                  className="text-gray-300 hover:text-white transition-colors ml-4"
                >
                  Staff Login
                </Link>
              </span>
            </div>
          </div>

          {/* Language Switcher - Simplified Dropdown */}
          <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-300 text-sm">{t('chooseLanguage')}:</div>
            <LanguageSwitcher variant="default" />
          </div>
        </div>
      </div>

      {/* Quick Actions moved to FloatingCTA component to avoid duplication */}
    </footer>
  )
})
