/**
 * Country-Specific WhatsApp Message Templates
 * Used for targeted messaging based on country and intent
 */

import { CountryCode, COUNTRIES } from './countries'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export type MessageType = 'default' | 'booking' | 'courseEnquiry' | 'exam'

export interface CountryMessages {
  default: string
  booking: string
  courseEnquiry: string
  exam: string
}

/**
 * WhatsApp message templates for each country
 * These are pre-filled messages that open in WhatsApp
 */
export const countryWhatsAppMessages: Record<CountryCode, CountryMessages> = {
  us: {
    default: "Hi! I'm a student in the US interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (US timezone - EST/PST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for US students. Can you share details about pricing and schedules?",
    exam: "Hi! I need help with AP Biology / MCAT preparation. What courses do you offer?",
  },

  uk: {
    default: "Hi! I'm a student in the UK interested in biology tutoring.",
    booking: "Hi! I'd like to book a free demo class (UK timezone - GMT/BST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for UK students. Can you share details about GCSE and A-Level prep?",
    exam: "Hi! I need help with GCSE / A-Level / BMAT preparation. What support do you offer?",
  },

  ca: {
    default: "Hi! I'm a student in Canada interested in biology tutoring.",
    booking: "Hi! I'd like to book a free demo class (Canadian timezone).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for Canadian students. Can you share details?",
    exam: "Hi! I need help with provincial biology exams / MCAT preparation. Do you have courses for this?",
  },

  au: {
    default: "Hi! I'm a student in Australia interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (Australian timezone - AEST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for Australian students. Can you share details about HSC/VCE prep?",
    exam: "Hi! I need help with HSC / VCE / QCE Biology preparation. What courses do you offer?",
  },

  sg: {
    default: "Hi! I'm a student in Singapore interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (Singapore timezone - SGT).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for Singapore students. Can you share details about O-Level and A-Level prep?",
    exam: "Hi! I need help with GCE O-Level / A-Level / Singapore Biology Olympiad preparation.",
  },

  ae: {
    default: "Hi! I'm a student in UAE interested in biology tutoring.",
    booking: "Hi! I'd like to book a free demo class (UAE timezone - GST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for UAE students. Can you share details about IGCSE/IB prep?",
    exam: "Hi! I need help with IGCSE / IB / American curriculum biology. What do you offer?",
  },

  ie: {
    default: "Hi! I'm a student in Ireland interested in biology grinds.",
    booking: "Hi! I'd like to book a free demo class (Irish timezone - IST).",
    courseEnquiry:
      "Hi! I'm interested in your biology grinds for Irish students. Can you share details about Leaving Cert prep?",
    exam: "Hi! I need help with Leaving Certificate Biology preparation. Do you offer grinds for this?",
  },

  hk: {
    default: "Hi! I'm a student in Hong Kong interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (Hong Kong timezone - HKT).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for Hong Kong students. Can you share details about HKDSE prep?",
    exam: "Hi! I need help with HKDSE / IGCSE / A-Level Biology preparation. What courses are available?",
  },

  nz: {
    default: "Hi! I'm a student in New Zealand interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (New Zealand timezone - NZST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for NZ students. Can you share details about NCEA prep?",
    exam: "Hi! I need help with NCEA Biology preparation (Level 1/2/3). What do you offer?",
  },

  za: {
    default:
      "Hi! I'm a student in South Africa interested in biology tutoring.",
    booking:
      "Hi! I'd like to book a free demo class (South African timezone - SAST).",
    courseEnquiry:
      "Hi! I'm interested in your biology courses for South African students. Can you share details?",
    exam: "Hi! I need help with NSC / IEB Life Sciences preparation. Do you have courses for Matric?",
  },
}

/**
 * Get WhatsApp message for a specific country and message type
 */
export function getCountryWhatsAppMessage(
  countryCode: string,
  messageType: MessageType = 'default'
): string {
  const normalizedCode = countryCode.toLowerCase() as CountryCode
  const messages = countryWhatsAppMessages[normalizedCode]

  if (!messages) {
    // Fallback for unknown countries
    return "Hi! I'm interested in online biology tutoring. Can you share more details?"
  }

  return messages[messageType]
}

/**
 * Build a complete WhatsApp URL with pre-filled message
 */
export function buildCountryWhatsAppUrl(
  countryCode: string,
  messageType: MessageType = 'default',
  phoneNumber: string = CONTACT_INFO.whatsapp.number // Default Cerebrum WhatsApp number
): string {
  const message = getCountryWhatsAppMessage(countryCode, messageType)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

/**
 * Get all message types for a country (useful for generating CTAs)
 */
export function getCountryMessageOptions(
  countryCode: string
): { type: MessageType; label: string; message: string }[] {
  const normalizedCode = countryCode.toLowerCase() as CountryCode
  const messages = countryWhatsAppMessages[normalizedCode]
  const country = COUNTRIES[normalizedCode]

  if (!messages || !country) {
    return []
  }

  return [
    {
      type: 'booking',
      label: 'Book Free Demo',
      message: messages.booking,
    },
    {
      type: 'courseEnquiry',
      label: 'Course Enquiry',
      message: messages.courseEnquiry,
    },
    {
      type: 'exam',
      label: `${country.examSystems[0]} Help`,
      message: messages.exam,
    },
    {
      type: 'default',
      label: 'General Enquiry',
      message: messages.default,
    },
  ]
}

/**
 * Get exam-specific message based on country's primary exam system
 */
export function getExamSpecificMessage(countryCode: string): string {
  const normalizedCode = countryCode.toLowerCase() as CountryCode
  const country = COUNTRIES[normalizedCode]

  if (!country) {
    return "Hi! I need help with biology exam preparation."
  }

  const primaryExam = country.examSystems[0]
  return `Hi! I need help with ${primaryExam} preparation. Can you tell me about your courses and tutors?`
}
