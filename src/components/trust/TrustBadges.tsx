'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Award, Users, Star, CheckCircle, Lock, Globe, Zap } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from '@/lib/i18n/translations'

interface TrustBadge {
  icon: React.ComponentType<any>
  title: string
  description: string
  color: string
  bgColor: string
  verified?: boolean
}

export function TrustBadges() {
  const { t, language } = useTranslations()

  const trustBadges: TrustBadge[] = [
    {
      icon: Award,
      title: language === 'hi' ? 'AIIMS फैकल्टी' : 'AIIMS Faculty',
      description:
        language === 'hi'
          ? 'प्रमाणित AIIMS डॉक्टरों द्वारा पढ़ाया गया'
          : 'Taught by certified AIIMS doctors',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      verified: true,
    },
    {
      icon: Shield,
      title: language === 'hi' ? '100% सुरक्षित भुगतान' : '100% Secure Payment',
      description:
        language === 'hi'
          ? 'SSL एन्क्रिप्शन और सुरक्षित गेटवे'
          : 'SSL encryption & secure gateways',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      verified: true,
    },
    {
      icon: Users,
      title: language === 'hi' ? '10,000+ छात्र' : '10,000+ Students',
      description:
        language === 'hi' ? 'भरोसेमंद छात्रों का समुदाय' : 'Trusted by students community',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      verified: true,
    },
    {
      icon: Star,
      title: language === 'hi' ? '4.9/5 रेटिंग' : '4.9/5 Rating',
      description:
        language === 'hi' ? 'हजारों सत्यापित समीक्षाओं से' : 'From thousands of verified reviews',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      verified: true,
    },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === 'hi' ? 'भरोसेमंद और प्रमाणित' : 'Trusted & Verified'}
          </h2>
          <p className="text-gray-600">
            {language === 'hi'
              ? 'हमारी विश्वसनीयता के प्रमाण'
              : 'Credentials that prove our reliability'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${badge.bgColor} rounded-xl p-6 text-center relative overflow-hidden`}
            >
              {badge.verified && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}

              <div
                className={`inline-flex p-3 rounded-full ${badge.bgColor} ring-4 ring-white mb-4`}
              >
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
              </div>

              <h3 className={`font-bold ${badge.color} mb-2`}>{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Security and compliance badges
export function SecurityBadges() {
  const { language } = useTranslations()

  const securityFeatures = [
    {
      icon: Lock,
      title: language === 'hi' ? 'SSL एन्क्रिप्टेड' : 'SSL Encrypted',
      description: '256-bit encryption',
    },
    {
      icon: Shield,
      title: language === 'hi' ? 'PCI अनुपालित' : 'PCI Compliant',
      description: 'Secure payment processing',
    },
    {
      icon: CheckCircle,
      title: language === 'hi' ? 'डेटा संरक्षण' : 'Data Protected',
      description: 'GDPR compliant',
    },
    {
      icon: Globe,
      title: language === 'hi' ? 'वैश्विक भरोसा' : 'Globally Trusted',
      description: '50+ countries',
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="font-semibold text-gray-900 mb-4 text-center">
        {language === 'hi' ? 'सुरक्षा प्रमाणपत्र' : 'Security Certifications'}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {securityFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <feature.icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900 mb-1">{feature.title}</div>
            <div className="text-xs text-gray-500">{feature.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Payment method trust indicators
export function PaymentTrustIndicators() {
  const { language } = useTranslations()

  const paymentMethods = [
    { name: 'UPI', logo: '/icons/payments/upi.svg', popular: true },
    { name: 'Razorpay', logo: '/icons/payments/razorpay.svg', secure: true },
    { name: 'PhonePe', logo: '/icons/payments/phonepe.svg' },
    { name: 'GPay', logo: '/icons/payments/gpay.svg' },
    { name: 'Paytm', logo: '/icons/payments/paytm.svg' },
    { name: 'Net Banking', logo: '/icons/payments/netbanking.svg' },
  ]

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
      <div className="text-center mb-4">
        <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <h3 className="font-semibold text-green-800 mb-1">
          {language === 'hi' ? 'सुरक्षित भुगतान विकल्प' : 'Secure Payment Options'}
        </h3>
        <p className="text-sm text-green-700">
          {language === 'hi'
            ? 'सभी प्रमुख भुगतान विधियों का समर्थन'
            : 'All major payment methods supported'}
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative bg-white rounded-lg p-3 text-center hover:shadow-md transition-shadow"
          >
            {method.popular && (
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded">
                {language === 'hi' ? 'लोकप्रिय' : 'Popular'}
              </div>
            )}
            {method.secure && (
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                <Lock className="w-2 h-2" />
              </div>
            )}

            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">{method.name.slice(0, 2)}</span>
            </div>
            <div className="text-xs text-gray-600">{method.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
          <Lock className="w-4 h-4" />
          <span>
            {language === 'hi'
              ? '256-बिट SSL एन्क्रिप्शन के साथ सुरक्षित'
              : 'Secured with 256-bit SSL encryption'}
          </span>
        </div>
      </div>
    </div>
  )
}

// Success guarantees
export function GuaranteeBadges() {
  const { language } = useTranslations()

  const guarantees = [
    {
      icon: Award,
      title: language === 'hi' ? 'स्कोर गारंटी' : 'Score Guarantee',
      description: language === 'hi' ? '320+ स्कोर या पैसे वापस' : '320+ score or money back',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Zap,
      title: language === 'hi' ? '30-दिन रिफंड' : '30-Day Refund',
      description:
        language === 'hi' ? 'संतुष्ट नहीं? पूरा पैसा वापस' : 'Not satisfied? Full refund',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      title: language === 'hi' ? 'लाइफटाइम सपोर्ट' : 'Lifetime Support',
      description: language === 'hi' ? 'डाउट क्लियरिंग हमेशा' : 'Doubt clearing forever',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {guarantees.map((guarantee, index) => (
        <motion.div
          key={guarantee.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`${guarantee.bgColor} rounded-xl p-6 text-center border-2 border-dashed ${guarantee.color.replace('text-', 'border-')}`}
        >
          <guarantee.icon className={`w-8 h-8 ${guarantee.color} mx-auto mb-3`} />
          <h3 className={`font-bold ${guarantee.color} mb-2`}>{guarantee.title}</h3>
          <p className="text-sm text-gray-600">{guarantee.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Accreditation and partnerships
export function AccreditationBadges() {
  const { language } = useTranslations()

  const accreditations = [
    {
      name: language === 'hi' ? 'शिक्षा मंत्रालय' : 'Ministry of Education',
      status: language === 'hi' ? 'मान्यता प्राप्त' : 'Recognized',
      logo: '/logos/government.svg',
    },
    {
      name: language === 'hi' ? 'AIIMS साझेदारी' : 'AIIMS Partnership',
      status: language === 'hi' ? 'आधिकारिक' : 'Official',
      logo: '/logos/aiims.svg',
    },
    {
      name: 'ISO 9001:2015',
      status: language === 'hi' ? 'प्रमाणित' : 'Certified',
      logo: '/logos/iso.svg',
    },
    {
      name: language === 'hi' ? 'राष्ट्रीय शिक्षा बोर्ड' : 'National Education Board',
      status: language === 'hi' ? 'अनुमोदित' : 'Approved',
      logo: '/logos/education-board.svg',
    },
  ]

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        {language === 'hi' ? 'मान्यता और साझेदारी' : 'Accreditations & Partnerships'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accreditations.map((acc, index) => (
          <motion.div
            key={acc.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{acc.name}</div>
              <div className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {acc.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
