/**
 * ARIA Sales Agent - WhatsApp Deep Link Integration
 * Handles WhatsApp handoff with conversation context pre-filled
 */

import { CONTACT_INFO, getWhatsAppLink } from '@/lib/constants/contactInfo'
import type { LeadData, Language } from './types'

interface WhatsAppContext {
  leadData?: Partial<LeadData>
  lastTopic?: string
  sessionId?: string
  language?: Language
}

/**
 * Generate a pre-filled WhatsApp message with conversation context
 */
export function generateWhatsAppMessage(context: WhatsAppContext): string {
  const { leadData, lastTopic, language = 'en' } = context
  const parts: string[] = []

  // Greeting based on language
  if (language === 'hi') {
    parts.push('नमस्ते! मैं Cerebrum Biology Academy से ARIA के साथ बात कर रहा/रही थी।')
  } else {
    parts.push("Hi! I was chatting with ARIA on Cerebrum Biology Academy's website.")
  }

  // Add lead info if available
  if (leadData?.name) {
    parts.push(`\n${language === 'hi' ? 'मेरा नाम' : 'My name is'}: ${leadData.name}`)
  }

  if (leadData?.studentClass) {
    parts.push(`${language === 'hi' ? 'क्लास' : 'Class'}: ${leadData.studentClass}`)
  }

  // Add last topic if available
  if (lastTopic) {
    const topicLabel = language === 'hi' ? 'मैं इसके बारे में जानना चाहता/चाहती हूं' : "I'd like to know more about"
    parts.push(`\n${topicLabel}: ${lastTopic}`)
  }

  // Call to action
  if (language === 'hi') {
    parts.push('\n\nकृपया मुझे और जानकारी दें। 🙏')
  } else {
    parts.push('\n\nPlease help me with more information. 🙏')
  }

  return parts.join(' ')
}

/**
 * Generate WhatsApp deep link with context
 */
export function getAriaWhatsAppLink(context: WhatsAppContext): string {
  const message = generateWhatsAppMessage(context)
  return getWhatsAppLink(message)
}

/**
 * Generate a quick action WhatsApp link (for demo booking)
 */
export function getDemoBookingWhatsAppLink(
  leadData?: Partial<LeadData>,
  language: Language = 'en'
): string {
  let message: string

  if (language === 'hi') {
    message = 'नमस्ते! मैं Cerebrum Biology Academy का FREE Demo Class बुक करना चाहता/चाहती हूं।'
    if (leadData?.name) message += `\n\nमेरा नाम: ${leadData.name}`
    if (leadData?.studentClass) message += `\nक्लास: ${leadData.studentClass}`
    if (leadData?.phone) message += `\nफ़ोन: ${leadData.phone}`
    message += '\n\nकृपया मेरे लिए demo schedule करें। 📚'
  } else {
    message = "Hi! I'd like to book a FREE Demo Class at Cerebrum Biology Academy."
    if (leadData?.name) message += `\n\nName: ${leadData.name}`
    if (leadData?.studentClass) message += `\nClass: ${leadData.studentClass}`
    if (leadData?.phone) message += `\nPhone: ${leadData.phone}`
    message += '\n\nPlease help me schedule a demo. 📚'
  }

  return getWhatsAppLink(message)
}

/**
 * Generate WhatsApp link for pricing inquiry
 */
export function getPricingWhatsAppLink(
  courseName?: string,
  leadData?: Partial<LeadData>,
  language: Language = 'en'
): string {
  let message: string

  if (language === 'hi') {
    message = 'नमस्ते! मुझे Cerebrum Biology Academy के'
    if (courseName) {
      message += ` ${courseName} course की`
    }
    message += ' fees और pricing के बारे में जानकारी चाहिए।'
    if (leadData?.name) message += `\n\nमेरा नाम: ${leadData.name}`
    if (leadData?.studentClass) message += `\nक्लास: ${leadData.studentClass}`
  } else {
    message = "Hi! I'd like to know about"
    if (courseName) {
      message += ` ${courseName} course`
    }
    message += ' pricing at Cerebrum Biology Academy.'
    if (leadData?.name) message += `\n\nName: ${leadData.name}`
    if (leadData?.studentClass) message += `\nClass: ${leadData.studentClass}`
  }

  return getWhatsAppLink(message)
}

/**
 * Generate WhatsApp link for callback request
 */
export function getCallbackWhatsAppLink(
  leadData?: Partial<LeadData>,
  language: Language = 'en'
): string {
  let message: string

  if (language === 'hi') {
    message = 'नमस्ते! कृपया मुझे callback करें।'
    if (leadData?.name) message += `\n\nमेरा नाम: ${leadData.name}`
    if (leadData?.phone) message += `\nफ़ोन: ${leadData.phone}`
    if (leadData?.studentClass) message += `\nक्लास: ${leadData.studentClass}`
    message += '\n\nमुझे NEET Biology coaching के बारे में जानकारी चाहिए।'
  } else {
    message = 'Hi! Please call me back.'
    if (leadData?.name) message += `\n\nName: ${leadData.name}`
    if (leadData?.phone) message += `\nPhone: ${leadData.phone}`
    if (leadData?.studentClass) message += `\nClass: ${leadData.studentClass}`
    message += '\n\nI want to know more about NEET Biology coaching.'
  }

  return getWhatsAppLink(message)
}

/**
 * Open WhatsApp in a new window
 */
export function openWhatsApp(link: string): void {
  window.open(link, '_blank', 'noopener,noreferrer')
}

/**
 * WhatsApp number for display
 */
export const WHATSAPP_DISPLAY_NUMBER = CONTACT_INFO.phone.display.primary

/**
 * Check if current device is mobile (for wa.me vs web.whatsapp behavior)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
