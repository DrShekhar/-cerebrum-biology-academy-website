'use client'

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

export function Footer() {
  const currentYear = new Date().getFullYear()

  const courseLinks = [
    { name: 'Class 11th Biology', href: '/courses/class-11' },
    { name: 'Class 12th Biology', href: '/courses/class-12' },
    { name: 'NEET Dropper Program', href: '/courses/neet-dropper' },
    { name: 'Foundation Course (9th-10th)', href: '/courses/foundation' },
    { name: 'Class 9th Foundation', href: '/courses/class-9-foundation' },
    { name: 'Class 10th Foundation', href: '/courses/class-10-foundation' },
  ]

  const boardLinks = [
    { name: 'CBSE Biology', href: '/boards/cbse' },
    { name: 'ICSE Biology', href: '/boards/icse' },
    { name: 'IGCSE Biology', href: '/boards/igcse' },
    { name: 'IB Biology', href: '/boards/ib' },
    { name: 'State Board Biology', href: '/boards/state' },
  ]

  const servicesLinks = [
    { name: 'Online Live Classes', href: '/services/online-classes' },
    { name: 'Classroom Programs', href: '/services/classroom' },
    { name: 'NEET Mock Tests', href: '/mock-tests' },
    { name: 'Cerin AI', href: '/cerin-ai' },
    { name: 'International Students', href: '/services/international' },
    { name: 'Board Exam Preparation', href: '/services/board-prep' },
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
    { name: 'Careers', href: '/careers' },
  ]

  const supportLinks = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'Book Demo Class', href: '/demo' },
    { name: 'Download Brochure', href: '/brochure' },
    { name: 'Fee Structure', href: '/fees' },
    { name: 'Admission Process', href: '/admission' },
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
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
    { name: 'WhatsApp', href: 'https://wa.me/918826444334', icon: MessageCircle },
    { name: 'Telegram', href: 'https://t.me/biologyforneetug', icon: Send },
  ]

  return (
    <footer className="bg-gray-900 text-white">
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
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Cerebrum Biology Academy</h3>
                <p className="text-gray-400 text-sm">Excellence in Biology Education</p>
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
                <Phone className="w-4 h-4 mr-3 text-blue-400" />
                <div>
                  <a href="tel:+918826444334" className="hover:text-white transition-colors">
                    +91 88264 44334
                  </a>
                  {' / '}
                  <a href="tel:+919999744334" className="hover:text-white transition-colors">
                    +91 99997 44334
                  </a>
                  <span className="text-gray-500 text-sm block">Mon-Sat: 8 AM - 8 PM</span>
                </div>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-blue-400" />
                <a
                  href="mailto:info@cerebrumbiologyacademy.com"
                  className="hover:text-white transition-colors"
                >
                  info@cerebrumbiologyacademy.com
                </a>
              </div>

              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-blue-400 mt-1" />
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
            <h4 className="font-semibold text-lg mb-4 text-white">Courses</h4>
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
            <h4 className="font-semibold text-lg mb-4 text-white">Board Preparation</h4>
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
            <h4 className="font-semibold text-lg mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {servicesLinks.map((link) => (
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
            <h4 className="font-semibold text-lg mb-4 text-white">Company</h4>
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

            <h4 className="font-semibold text-lg mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {supportLinks.slice(0, 3).map((link) => (
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
              <h4 className="font-semibold text-lg mb-2 text-white">Stay Updated</h4>
              <p className="text-gray-300 text-sm">
                Get latest updates about NEET, board exams, and biology education tips.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <Button variant="primary" className="whitespace-nowrap">
                Subscribe
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Cerebrum Biology Academy. All rights reserved. | Empowering future
              doctors through excellence in biology education.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <span key={link.name} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && <span className="text-gray-600 ml-4">|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Floating */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        <a
          href="https://wa.me/918826444334"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </a>

        <a
          href="tel:+918826444334"
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
      </div>
    </footer>
  )
}
