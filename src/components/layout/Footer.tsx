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
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { useI18n } from '@/contexts/I18nContext'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [sendWhatsAppUpdates, setSendWhatsAppUpdates] = useState(false)
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
        body: JSON.stringify({
          email,
          whatsappNumber: whatsappNumber || undefined,
          sendWhatsAppUpdates: sendWhatsAppUpdates && whatsappNumber ? true : false,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubscribeMessage(data.message || 'Thank you for subscribing!')
        if (!data.alreadySubscribed) {
          setEmail('')
          setWhatsappNumber('')
          setSendWhatsAppUpdates(false)
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
    { name: 'Intensive Biology Program', href: '/courses/intensive-neet-biology' },
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
    { name: 'Online Live Classes', href: '/courses' },
    { name: 'Book a Demo Class', href: '/demo-booking' },
    { name: 'NEET Mock Tests', href: '/mock-tests' },
    { name: 'Free Biology MCQ Practice', href: '/neet-biology-mcq' },
    { name: 'Study Materials (LMS)', href: '/tests' },
    { name: 'Free Resources', href: '/free-resources' },
    { name: 'NEET Seminar for Schools', href: '/school-career-seminar' },
    { name: 'Ceri AI', href: '/ai-education-demo' },
    { name: 'AI Features', href: '/ai-features' },
    { name: 'Mobile App', href: '/mobile-app' },
    { name: 'International Students', href: '/international/' },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Dr. Shekhar Singh', href: '/dr-shekhar-singh' },
    { name: 'Our Faculty', href: '/faculty' },
    { name: 'Blog', href: '/blog' },
    { name: 'Results', href: '/results' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'Photo Gallery', href: '/gallery' },
    { name: 'Careers', href: '/contact' },
  ]

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'Book Demo Class', href: '/demo-booking' },
    { name: 'Leave a Review', href: '/reviews' },
    { name: 'Scholarship', href: '/scholarship' },
    { name: 'Referral Program', href: '/referral' },
    { name: 'Admission Process', href: '/admissions' },
  ]

  const offlineCenters = [
    { name: 'Rohini, Delhi', href: '/neet-coaching-north-delhi' },
    { name: 'Gurugram', href: '/locations/gurugram' },
    { name: 'South Extension', href: '/neet-coaching-south-delhi' },
    { name: 'Faridabad', href: '/neet-coaching-faridabad' },
  ]

  const onlineRegions = [
    { name: 'North India', href: '/neet-coaching-north-india' },
    { name: 'South India', href: '/neet-coaching-south-india' },
    { name: 'East India', href: '/neet-coaching-east-india' },
    { name: 'West India', href: '/neet-coaching-west-india' },
    { name: 'NRI Students (14+ Countries)', href: '/nri-students' },
  ]

  const biologyClassesByCity = [
    { name: 'Delhi', href: '/biology-classes-delhi' },
    { name: 'Noida', href: '/biology-classes-noida' },
    { name: 'Gurgaon', href: '/biology-classes-gurgaon' },
    { name: 'Faridabad', href: '/biology-classes-faridabad' },
    { name: 'Ghaziabad', href: '/biology-classes-ghaziabad' },
    { name: 'South Delhi', href: '/biology-classes-south-delhi' },
    { name: 'Rohini', href: '/biology-classes-rohini' },
    { name: 'Manesar', href: '/biology-classes-manesar' },
    { name: 'Rewari', href: '/biology-classes-rewari' },
    { name: 'Mahendragarh', href: '/biology-classes-mahendragarh' },
  ]

  const biologyTuitionLinks = [
    { name: 'Biology Tuition', href: '/biology-tuition' },
    { name: 'Class 9-10 Tuition', href: '/biology-tuition-class-9-10' },
    { name: 'Class 11 Tuition', href: '/biology-tuition-class-11' },
    { name: 'Class 12 Tuition', href: '/biology-tuition-class-12' },
    { name: 'Tuition Near Me', href: '/biology-tuition-near-me' },
    { name: 'Online Classes', href: '/online-biology-classes' },
  ]

  const hubLinks = [
    { name: 'NEET Biology', href: '/neet-biology-coaching' },
    { name: 'Biology Teacher', href: '/biology-teacher' },
    { name: 'Online Classes', href: '/online-biology-classes' },
    { name: 'Foundation & Olympiad', href: '/neet-foundation-class-9' },
    { name: 'International Curriculum', href: '/international/' },
    { name: 'Best Biology Books', href: '/best-biology-books-for-neet' },
  ]

  const programDetailsLinks = [
    { name: 'NEET Biology Coaching Delhi NCR', href: '/neet-biology-coaching-delhi-ncr' },
    { name: 'NEET Biology Class 11', href: '/neet-biology-class-11' },
    { name: 'NEET Biology Class 12', href: '/neet-biology-class-12' },
    { name: 'NEET Biology Study Material', href: '/neet-biology-study-material' },
    { name: 'NEET Biology Preparation Tips', href: '/neet-biology-preparation-tips' },
    { name: 'Class 11 Biology Tuition', href: '/class-11-biology-tuition' },
    { name: 'Class 12 Biology Tuition', href: '/class-12-biology-tuition' },
    { name: 'Class 12 Board Biology Prep', href: '/class-12-board-biology-preparation' },
    { name: 'CBSE Biology Coaching Delhi', href: '/cbse-biology-coaching-delhi' },
    { name: 'Online Biology Classes', href: '/online-biology-classes' },
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
    { name: 'Instagram', href: 'https://www.instagram.com/cerebrumbiologyacademy/', icon: Instagram },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw',
      icon: Youtube,
    },
    { name: 'Twitter', href: 'https://twitter.com/shekharsingh', icon: Twitter },
    {
      name: 'WhatsApp',
      href: '#',
      icon: MessageCircle,
      isWhatsApp: true,
    },
    { name: 'Telegram', href: 'https://t.me/cerebrumbiologyacademy', icon: Send },
  ]

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-4 md:gap-6 lg:gap-8">
          {/* Company Info - Spans 2 columns on larger screens */}
          <div className="lg:col-span-2 animate-fade-in-up">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                <Image
                  src="/brain-logo.webp"
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
              Founded by Dr. Shekhar C Singh (AIIMS New Delhi Alumnus). Premier NEET Biology
              coaching institute with 15+ years of excellence. 98% success rate, 1,50,000+ students
              mentored to medical colleges.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-blue-400" aria-hidden="true" />
                <div>
                  <a
                    href={getPhoneLink()}
                    className="hover:text-white transition-colors"
                    aria-label={`Call us at ${getDisplayPhone()}`}
                  >
                    {getDisplayPhone()}
                  </a>
                  <span className="text-gray-400 text-sm block">Mon-Sat: 8 AM - 8 PM</span>
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
                    <strong>Gurugram:</strong> M2K Corporate Park, Sector 51, 122018
                  </div>
                  <div>
                    <strong>South Delhi:</strong> Block D, South Extension 2, 110049
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
          </div>

          {/* Board Preparation */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
          </div>

          {/* Centers */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold text-lg mb-4 text-white">Offline Centers</h4>
            <ul className="space-y-2">
              {offlineCenters.map((link) => (
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

            <h4 className="font-semibold text-lg mb-4 mt-6 text-white">Serving Online</h4>
            <ul className="space-y-2">
              {onlineRegions.map((link) => (
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
          </div>

          {/* Biology Classes by City */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            <h4 className="font-semibold text-lg mb-4 text-white">Biology Classes</h4>
            <ul className="space-y-2">
              {biologyClassesByCity.slice(0, 7).map((link) => (
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

            <h4 className="font-semibold text-lg mb-4 mt-6 text-white">Biology Tuition</h4>
            <ul className="space-y-2">
              {biologyTuitionLinks.map((link) => (
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
          </div>

          {/* Services & Programs */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
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

            <h4 className="font-semibold text-lg mb-4 mt-6 text-white">Explore Programs</h4>
            <ul className="space-y-2">
              {hubLinks.map((link) => (
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
          </div>

          {/* Program Details - SEO Landing Pages */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.425s' }}>
            <h4 className="font-semibold text-lg mb-4 text-white">Program Details</h4>
            <ul className="space-y-2">
              {programDetailsLinks.map((link) => (
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
          </div>

          {/* Company & Support */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            <h4 className="font-semibold text-lg mb-4 text-white">{t('company')}</h4>
            <ul className="space-y-2 mb-6">
              {companyLinks.slice(0, 5).map((link) => (
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
              {supportLinks.slice(0, 5).map((link) => (
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
          </div>
        </div>

        {/* Newsletter Section */}
        <div
          className="mt-12 pt-8 border-t border-gray-800 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h4 className="font-semibold text-lg mb-2 text-white">{t('stayUpdated')}</h4>
              <p className="text-gray-300 text-sm">{t('getLatestUpdates')}</p>
              <p className="text-gray-400 text-xs mt-2">
                Get free NEET tips, chapter notes, and important updates via email or WhatsApp
              </p>
            </div>

            <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email *"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm sm:text-base min-h-[44px]"
                  aria-label="Email address for newsletter"
                  disabled={isSubscribing}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <label htmlFor="newsletter-whatsapp" className="sr-only">
                  WhatsApp number (optional)
                </label>
                <input
                  id="newsletter-whatsapp"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="WhatsApp: +91 88264 44334 (optional)"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm sm:text-base min-h-[44px]"
                  aria-label="WhatsApp number for updates"
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
              </div>

              {whatsappNumber && (
                <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendWhatsAppUpdates}
                    onChange={(e) => setSendWhatsAppUpdates(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500"
                    disabled={isSubscribing}
                  />
                  <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                  <span>Send me updates on WhatsApp</span>
                </label>
              )}

              {subscribeMessage && (
                <p
                  className={`text-sm ${subscribeMessage.includes('Thank') || subscribeMessage.includes('subscribed') ? 'text-green-400' : 'text-red-400'}`}
                >
                  {subscribeMessage}
                </p>
              )}
            </form>
          </div>
        </div>
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
                {socialLinks.map((social) => {
                  const handleClick = (social as { isWhatsApp?: boolean }).isWhatsApp
                    ? async (e: React.MouseEvent) => {
                        e.preventDefault()
                        await trackAndOpenWhatsApp({
                          source: 'footer-social',
                          message: WHATSAPP_MESSAGES.enquiry,
                          campaign: 'footer',
                        })
                      }
                    : undefined

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      onClick={handleClick}
                      target={
                        (social as { isWhatsApp?: boolean }).isWhatsApp ? undefined : '_blank'
                      }
                      rel={
                        (social as { isWhatsApp?: boolean }).isWhatsApp
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="w-11 h-11 min-w-[44px] min-h-[44px] bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors touch-manipulation cursor-pointer"
                      aria-label={`Visit our ${social.name} page`}
                    >
                      <social.icon className="w-5 h-5" aria-hidden="true" />
                    </a>
                  )
                })}
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
