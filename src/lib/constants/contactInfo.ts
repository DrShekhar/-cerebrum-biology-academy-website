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

  // Physical Locations - All Centers
  location: {
    gurugram: {
      name: 'Cerebrum Biology Academy - Gurugram',
      streetAddress: 'Plot No. 15, Sector 44',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122003',
      addressCountry: 'IN',
      geo: {
        latitude: 28.4595,
        longitude: 77.0266,
      },
      mapUrl: 'https://maps.google.com/maps?q=Cerebrum+Biology+Academy+Gurugram',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy',
      nearbyLandmarks: [
        'Near HUDA City Centre Metro Station',
        'Opposite Sector 44 Market',
        'Near Golf Course Road',
      ],
    },
    delhi: {
      name: 'Cerebrum Biology Academy - Delhi',
      streetAddress: 'C-15, Patel Nagar West',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110008',
      addressCountry: 'IN',
      geo: {
        latitude: 28.6508,
        longitude: 77.1726,
      },
      mapUrl: 'https://maps.google.com/maps?q=Patel+Nagar+West+Delhi',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-delhi',
      nearbyLandmarks: [
        'Near Patel Nagar Metro Station',
        'Opposite Patel Nagar Market',
        'Near Shadipur Metro',
      ],
    },
    southDelhi: {
      name: 'Cerebrum Biology Academy - South Delhi',
      streetAddress: 'M-24, Greater Kailash Part 1',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110048',
      addressCountry: 'IN',
      geo: {
        latitude: 28.5494,
        longitude: 77.2347,
      },
      mapUrl: 'https://maps.google.com/maps?q=Greater+Kailash+Part+1+Delhi',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-gk',
      nearbyLandmarks: [
        'Near Greater Kailash M Block Market',
        'Near Kailash Colony Metro',
        'Near Nehru Place',
      ],
    },
    noida: {
      name: 'Cerebrum Biology Academy - Noida',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
      geo: {
        latitude: 28.6280,
        longitude: 77.3649,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+62+Noida',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-noida',
      nearbyLandmarks: [
        'Near Sector 62 Metro Station',
        'Near Electronic City',
        'Near Noida City Centre',
      ],
    },
    faridabad: {
      name: 'Cerebrum Biology Academy - Faridabad',
      streetAddress: 'SCO 23, Sector 15',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121007',
      addressCountry: 'IN',
      geo: {
        latitude: 28.3948,
        longitude: 77.3117,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+15+Faridabad',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-faridabad',
      nearbyLandmarks: [
        'Near Sector 15 Market',
        'Near Bata Chowk',
        'Near HUDA Complex',
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
