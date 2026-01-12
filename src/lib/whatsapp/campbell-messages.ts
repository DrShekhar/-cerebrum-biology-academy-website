/**
 * Campbell Biology WhatsApp Message Templates
 * Pre-filled messages for chapter pages, olympiad preparation, and general inquiries
 */

import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Message types for Campbell Biology pages
export type CampbellMessageType =
  | 'chapter'
  | 'unit'
  | 'olympiad'
  | 'neet'
  | 'general'
  | 'demo'
  | 'ap-biology'
  | 'ib-biology'
  | 'mcat'

export interface CampbellMessageParams {
  chapterNumber?: number
  chapterTitle?: string
  unitNumber?: number
  unitTitle?: string
  olympiadName?: string
  countryName?: string
  topic?: string
}

// Message templates
export const CAMPBELL_WHATSAPP_MESSAGES = {
  // Chapter-specific message
  chapter: (chapterNumber: number, chapterTitle: string) =>
    `Hi! I'm studying Campbell Biology Chapter ${chapterNumber}: ${chapterTitle}. I need help understanding some concepts. Can you tell me about your online coaching?`,

  // Unit-level message
  unit: (unitNumber: number, unitTitle: string) =>
    `Hi! I'm working through Campbell Biology Unit ${unitNumber}: ${unitTitle}. I'd like to know about your tutoring services.`,

  // Olympiad general
  olympiadGeneral: () =>
    `Hi! I'm preparing for the Biology Olympiad and using Campbell Biology. What coaching programs do you offer?`,

  // Country-specific olympiad
  olympiadCountry: (olympiadName: string, countryName: string) =>
    `Hi! I'm from ${countryName} and preparing for ${olympiadName}. What coaching options do you have for international students?`,

  // NEET preparation
  neet: () =>
    `Hi! I'm preparing for NEET and want to strengthen my Biology using Campbell Biology. What are your coaching options?`,

  // NEET with topic
  neetTopic: (topic: string) =>
    `Hi! I'm preparing for NEET and need help with ${topic} from Campbell Biology. What coaching do you offer?`,

  // AP Biology
  apBiology: () =>
    `Hi! I'm studying AP Biology and using Campbell as my main textbook. What tutoring options do you have?`,

  // IB Biology
  ibBiology: () =>
    `Hi! I'm studying IB Biology and using Campbell Biology for deeper understanding. What coaching do you offer?`,

  // MCAT Biology
  mcat: () =>
    `Hi! I'm preparing for MCAT and using Campbell Biology for the biology section. What coaching programs are available?`,

  // General inquiry
  general: () =>
    `Hi! I'm studying Campbell Biology and preparing for Biology Olympiad/NEET. Can you tell me about your online tutoring programs?`,

  // Demo request
  demo: () =>
    `Hi! I'd like to book a free demo class for Campbell Biology coaching. Please share the available slots.`,

  // Hub page general
  hubPage: () =>
    `Hi! I found your Campbell Biology coaching page. I'm interested in comprehensive biology tutoring. Can you share more details?`,
} as const

// Get the appropriate WhatsApp message based on type and params
export function getCampbellWhatsAppMessage(
  type: CampbellMessageType,
  params?: CampbellMessageParams
): string {
  switch (type) {
    case 'chapter':
      if (params?.chapterNumber && params?.chapterTitle) {
        return CAMPBELL_WHATSAPP_MESSAGES.chapter(params.chapterNumber, params.chapterTitle)
      }
      return CAMPBELL_WHATSAPP_MESSAGES.general()

    case 'unit':
      if (params?.unitNumber && params?.unitTitle) {
        return CAMPBELL_WHATSAPP_MESSAGES.unit(params.unitNumber, params.unitTitle)
      }
      return CAMPBELL_WHATSAPP_MESSAGES.general()

    case 'olympiad':
      if (params?.olympiadName && params?.countryName) {
        return CAMPBELL_WHATSAPP_MESSAGES.olympiadCountry(params.olympiadName, params.countryName)
      }
      return CAMPBELL_WHATSAPP_MESSAGES.olympiadGeneral()

    case 'neet':
      if (params?.topic) {
        return CAMPBELL_WHATSAPP_MESSAGES.neetTopic(params.topic)
      }
      return CAMPBELL_WHATSAPP_MESSAGES.neet()

    case 'ap-biology':
      return CAMPBELL_WHATSAPP_MESSAGES.apBiology()

    case 'ib-biology':
      return CAMPBELL_WHATSAPP_MESSAGES.ibBiology()

    case 'mcat':
      return CAMPBELL_WHATSAPP_MESSAGES.mcat()

    case 'demo':
      return CAMPBELL_WHATSAPP_MESSAGES.demo()

    case 'general':
    default:
      return CAMPBELL_WHATSAPP_MESSAGES.general()
  }
}

// Default phone number - now uses centralized config
export const WHATSAPP_PHONE = CONTACT_INFO.phone.primary
export const WHATSAPP_PHONE_DISPLAY = CONTACT_INFO.phone.display.primary

// Build WhatsApp URL
export function buildCampbellWhatsAppUrl(message: string): string {
  const phone = WHATSAPP_PHONE.replace('+', '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
