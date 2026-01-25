/**
 * Centralized Contact Information
 * Single source of truth for all phone numbers, emails, and contact details
 *
 * IMPORTANT: Update this file when contact information changes.
 * All pages should import from here rather than hardcoding contact details.
 */

export const CONTACT_INFO = {
  // Primary phone number (for tel: links)
  phone: {
    primary: '+918826444334',
    secondary: '+919311946297',
    owner: '+919999744334',
    // Formatted versions for display
    display: {
      primary: '+91 88264 44334',
      secondary: '+91 93119 46297',
      owner: '+91 99997 44334',
      // Hyphenated versions (backward-compatible nested structure)
      hyphenated: {
        primary: '+91-88264-44334',
        secondary: '+91-93119-46297',
        owner: '+91-99997-44334',
      },
    },
    // With dashes for some layouts
    formatted: {
      primary: '+91-88264-44334',
      secondary: '+91-93119-46297',
      owner: '+91-99997-44334',
    },
  },

  // WhatsApp - typically uses primary phone
  whatsapp: {
    number: '918826444334', // Without + prefix for wa.me links
    link: 'https://wa.me/918826444334',
    linkWithMessage: (message: string) =>
      `https://wa.me/918826444334?text=${encodeURIComponent(message)}`,
    // Backward-compatible alias (used by some components)
    primary: '918826444334',
  },

  // Email addresses
  email: {
    support: 'support@cerebrumbiologyacademy.com',
    admissions: 'admissions@cerebrumbiologyacademy.com',
    info: 'info@cerebrumbiologyacademy.com',
  },

  // Business information
  business: {
    name: 'Cerebrum Biology Academy',
    shortName: 'Cerebrum',
    tagline: '#1 NEET Biology Coaching',
    foundingYear: 2014,
    website: 'https://cerebrumbiologyacademy.com',
  },

  // Physical Location - Gurugram Center
  location: {
    gurugram: {
      name: 'Cerebrum Biology Academy - Gurugram',
      streetAddress: 'Plot No. 15, Sector 44',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122003',
      addressCountry: 'IN',
      // Exact coordinates for Google Maps
      geo: {
        latitude: 28.4595,
        longitude: 77.0266,
      },
      // Google Maps embed URL
      mapUrl: 'https://maps.google.com/maps?q=Cerebrum+Biology+Academy+Gurugram',
      // Google Business Profile URL (update after claiming)
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy',
      // Landmarks for local SEO
      nearbyLandmarks: [
        'Near HUDA City Centre Metro Station',
        'Opposite Sector 44 Market',
        'Near Golf Course Road',
      ],
    },
  },

  // Operating Hours
  hours: {
    weekdays: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      open: '07:00',
      close: '21:00',
    },
    sunday: {
      days: ['Sunday'],
      open: '09:00',
      close: '18:00',
    },
    displayText: 'Mon-Sat: 7 AM - 9 PM | Sun: 9 AM - 6 PM',
  },

  // Social media
  social: {
    instagram: 'https://instagram.com/cerebrumbiologyacademy',
    youtube: 'https://youtube.com/@cerebrumbiologyacademy',
    facebook: 'https://facebook.com/cerebrumbiologyacademy',
    twitter: 'https://twitter.com/cerebrumbiology',
  },
} as const

// Helper functions for common use cases
export const getPhoneLink = (phone: 'primary' | 'secondary' | 'owner' = 'primary') =>
  `tel:${CONTACT_INFO.phone[phone]}`

export const getWhatsAppLink = (message?: string) =>
  message ? CONTACT_INFO.whatsapp.linkWithMessage(message) : CONTACT_INFO.whatsapp.link

export const getDisplayPhone = (phone: 'primary' | 'secondary' | 'owner' = 'primary') =>
  CONTACT_INFO.phone.display[phone]

export const getFormattedPhone = (phone: 'primary' | 'secondary' | 'owner' = 'primary') =>
  CONTACT_INFO.phone.formatted[phone]

// Default export for convenience
export default CONTACT_INFO
