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
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher'
import { useI18n } from '@/contexts/I18nContext'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'
import { getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import { handlePhoneClickTracking } from '@/components/ui/TrackedPhoneLink'
import {
  trackFooterLinkClick,
  trackFooterSectionToggle,
  trackFooterSubscribe,
} from '@/lib/analytics/footerTracking'

function FooterSection({
  title,
  links,
  isOpen,
  onToggle,
  className,
}: {
  title: string
  links: { name: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
  className?: string
}) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 lg:py-0 lg:mb-4 lg:pointer-events-none"
        aria-expanded={isOpen}
      >
        <h4 className="font-semibold text-lg text-white">{title}</h4>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[1fr] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 pb-4 lg:pb-0">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => trackFooterLinkClick(link.name, link.href, title)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export const Footer = memo(function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [sendWhatsAppUpdates, setSendWhatsAppUpdates] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState('')
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { t } = useI18n()

  const toggleSection = (title: string) => {
    const willOpen = openSection !== title
    setOpenSection((prev) => (prev === title ? null : title))
    trackFooterSectionToggle(title, willOpen)
  }

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
        trackFooterSubscribe(whatsappNumber ? 'both' : 'email')
        setSubscribeMessage(data.message || 'Thank you for subscribing!')
        if (!data.alreadySubscribed) {
          setEmail('')
          setWhatsappNumber('')
          setSendWhatsAppUpdates(false)
        }
      } else {
        setSubscribeMessage(data.error || 'Subscription failed. Please try again.')
      }
    } catch {
      setSubscribeMessage('Subscription failed. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const programLinks = [
    { name: 'NEET 2026 Preparation', href: '/neet-2026-preparation' },
    { name: 'Class 11 Biology', href: '/courses/class-11' },
    { name: 'Class 12 Biology', href: '/courses/class-12' },
    { name: 'NEET Dropper Program', href: '/courses/neet-dropper' },
    { name: 'Foundation Course (9th-10th)', href: '/courses/foundation' },
    { name: 'Board Exam Preparation', href: '/board-exam-preparation' },
    { name: 'International Curriculum', href: '/international' },
    { name: 'Pricing & Fee Structure', href: '/pricing' },
  ]

  const centerLinks = [
    { name: 'All Locations', href: '/all-locations' },
    { name: 'South Extension (Flagship)', href: '/locations/south-extension' },
    { name: 'Rohini - DC Chowk', href: '/locations/rohini' },
    { name: 'Gurugram - Sector 51', href: '/locations/gurugram' },
    { name: 'Faridabad - Sector 17', href: '/locations/faridabad' },
    { name: 'Online Classes — 14+ Countries', href: '/online-neet-biology-coaching' },
  ]

  const resourceLinks = [
    { name: 'Free Biology MCQ Practice', href: '/neet-biology-mcq' },
    { name: 'Biology Notes for NEET', href: '/biology-notes-for-neet' },
    { name: 'NEET Previous Year Questions', href: '/neet-previous-year-questions' },
    { name: 'Online NEET Test Series', href: '/online-neet-test-series' },
    { name: 'Free Biology Lectures', href: '/free-neet-biology-lectures' },
    { name: 'NEET Biology Study Material', href: '/neet-biology-study-material' },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Dr. Shekhar Singh', href: '/dr-shekhar-singh' },
    { name: 'Our Faculty', href: '/faculty' },
    { name: 'Results & Success Stories', href: '/results' },
    { name: 'Blog', href: '/blog' },
  ]

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Book a Demo Class', href: '/demo-booking' },
    { name: 'Help Center', href: '/help' },
    { name: 'Scholarship', href: '/scholarship' },
    { name: 'Leave a Review', href: '/reviews' },
  ]

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/Cerebrum-Biology-Academy/100063640374134/',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cerebrumbiologyacademy/',
      icon: Instagram,
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw',
      icon: Youtube,
    },
    { name: 'Twitter', href: 'https://twitter.com/shekharsingh', icon: Twitter },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/918826444334',
      icon: MessageCircle,
      isWhatsApp: true,
    },
    { name: 'Telegram', href: 'https://t.me/cerebrumbiologyacademy', icon: Send },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Refund Policy', href: '/refund-policy' },
  ]

  return (
    <>
      <footer
        className="bg-gray-900 text-white pb-16 lg:pb-0"
        role="contentinfo"
        style={{ contentVisibility: 'auto' } as React.CSSProperties}
      >
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="flex items-center space-x-3 mb-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-8 divide-y divide-gray-800 lg:divide-y-0">
            <FooterSection
              title="Programs"
              links={programLinks}
              isOpen={openSection === 'Programs'}
              onToggle={() => toggleSection('Programs')}
            />
            <FooterSection
              title="Centers & Locations"
              links={centerLinks}
              isOpen={openSection === 'Centers'}
              onToggle={() => toggleSection('Centers')}
            />
            <FooterSection
              title="Free Resources"
              links={resourceLinks}
              isOpen={openSection === 'Resources'}
              onToggle={() => toggleSection('Resources')}
            />
            <div className="divide-y divide-gray-800 lg:divide-y-0">
              <FooterSection
                title="Company"
                links={companyLinks}
                isOpen={openSection === 'Company'}
                onToggle={() => toggleSection('Company')}
              />
              <FooterSection
                title="Support"
                links={supportLinks}
                isOpen={openSection === 'Support'}
                onToggle={() => toggleSection('Support')}
                className="lg:mt-6"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Phone className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <a
                    href={getPhoneLink()}
                    onClick={() => handlePhoneClickTracking('footer-contact', 'primary', 100)}
                    className="hover:text-white transition-colors"
                    aria-label={`Call us at ${getDisplayPhone()}`}
                  >
                    {getDisplayPhone()}
                  </a>
                </div>

                <div className="flex items-center text-gray-300">
                  <Mail className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:info@cerebrumbiologyacademy.com"
                    className="hover:text-white transition-colors text-sm"
                    aria-label="Email us at info@cerebrumbiologyacademy.com"
                  >
                    info@cerebrumbiologyacademy.com
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    trackAndOpenWhatsApp({
                      source: 'footer-subscribe',
                      message: WHATSAPP_MESSAGES.enquiry,
                      campaign: 'footer',
                    })
                  }
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                  aria-label="Subscribe on WhatsApp"
                >
                  <MessageCircle
                    className="w-4 h-4 mr-3 text-green-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-sm">Subscribe on WhatsApp</span>
                </button>

                <div className="flex items-start text-gray-300">
                  <MapPin
                    className="w-4 h-4 mr-3 text-blue-400 mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-gray-400">
                    South Extension &bull; Rohini &bull; Gurugram &bull; Faridabad
                  </p>
                </div>

                <p className="text-xs text-gray-500 pl-7">Open 24/7 — Online Classes Globally</p>
              </div>

              <form onSubmit={handleNewsletterSubscribe} className="space-y-3">
                <h4 className="font-semibold text-white mb-1">{t('stayUpdated')}</h4>
                <p className="text-gray-400 text-xs">
                  Get free NEET tips, chapter notes, and important updates via email or WhatsApp
                </p>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email *"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm min-h-[44px]"
                  disabled={isSubscribing}
                  required
                />
                <label htmlFor="newsletter-whatsapp" className="sr-only">
                  WhatsApp number (optional)
                </label>
                <input
                  id="newsletter-whatsapp"
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="WhatsApp number (optional)"
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-sm min-h-[44px]"
                  disabled={isSubscribing}
                />

                {whatsappNumber && (
                  <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={sendWhatsAppUpdates}
                      onChange={(e) => setSendWhatsAppUpdates(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500"
                      disabled={isSubscribing}
                    />
                    <MessageCircle className="w-4 h-4 text-green-400" aria-hidden="true" />
                    <span>Send me updates on WhatsApp</span>
                  </label>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full text-sm min-h-[44px]"
                  aria-label="Subscribe to newsletter"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? '...' : t('subscribe')}
                  <Send className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>

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

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center md:text-left">
                &copy; {currentYear} Cerebrum Biology Academy. All rights reserved.
              </div>

              <nav aria-label="Social media links">
                <div className="flex items-center space-x-3">
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
                        className="w-10 h-10 min-w-[44px] min-h-[44px] bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors touch-manipulation cursor-pointer"
                        aria-label={`Visit our ${social.name} page`}
                      >
                        <social.icon className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              </nav>

              <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                {legalLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center">
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                    {index < legalLinks.length - 1 && <span className="text-gray-700 ml-4">|</span>}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-gray-400 text-sm">{t('chooseLanguage')}:</div>
              <LanguageSwitcher variant="default" />
            </div>
          </div>
        </div>
      </footer>

      <div
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <a
          href="tel:+918826444334"
          onClick={() => handlePhoneClickTracking('sticky-cta', 'primary', 100)}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3.5 transition-colors"
          aria-label="Call +91 88264 44334"
        >
          <Phone className="w-5 h-5" aria-hidden="true" />
          <span>Call Now — +91 88264 44334</span>
        </a>
      </div>
    </>
  )
})
