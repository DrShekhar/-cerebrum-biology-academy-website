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

  // Physical Centers - Actual locations with physical presence
  centers: {
    southExtension: {
      name: 'Cerebrum Biology Academy - South Extension (Flagship)',
      streetAddress: 'D 35, South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
      geo: {
        latitude: 28.5678,
        longitude: 77.2234,
      },
      mapUrl: 'https://maps.google.com/maps?q=South+Extension+Part+2+Delhi',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy',
      nearbyLandmarks: [
        'Near Lajpat Nagar Metro Station (Violet Line)',
        'Near AIIMS Delhi',
        'South Extension Market',
      ],
      isPhysicalCenter: true,
    },
    rohini: {
      name: 'Cerebrum Biology Academy - Rohini',
      streetAddress: '211 Vikas Surya Tower, DC Chauk, Sector 9',
      addressLocality: 'Rohini, Delhi',
      addressRegion: 'Delhi',
      postalCode: '110085',
      addressCountry: 'IN',
      geo: {
        latitude: 28.7041,
        longitude: 77.1025,
      },
      mapUrl: 'https://maps.google.com/maps?q=DC+Chowk+Rohini+Delhi',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-rohini',
      nearbyLandmarks: ['Near Rohini West Metro Station (Red Line)', 'DC Chowk', 'Sector 9 Market'],
      isPhysicalCenter: true,
    },
    greenPark: {
      name: 'Cerebrum Biology Academy - Green Park (Online)',
      streetAddress: 'B 113 FF Gulmohar Park',
      addressLocality: 'Green Park, New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
      geo: {
        latitude: 28.5597,
        longitude: 77.2089,
      },
      mapUrl: 'https://maps.google.com/maps?q=Green+Park+Delhi',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-greenpark',
      nearbyLandmarks: [
        'Near Green Park Metro Station (Yellow Line)',
        'Green Park Market',
        'Near Hauz Khas',
      ],
      isPhysicalCenter: false,
      nearestCenter: 'southExtension',
    },
    gurugram: {
      name: 'Cerebrum Biology Academy - Gurugram',
      streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122018',
      addressCountry: 'IN',
      geo: {
        latitude: 28.4295,
        longitude: 77.0426,
      },
      mapUrl: 'https://maps.google.com/maps?q=M2K+Corporate+Park+Sector+51+Gurugram',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-gurugram',
      nearbyLandmarks: [
        'Near HUDA City Centre Metro Station (Yellow Line)',
        'Mayfield Garden',
        'Sector 51 Market',
      ],
      isPhysicalCenter: true,
    },
    faridabad: {
      name: 'Cerebrum Biology Academy - Faridabad',
      streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121002',
      addressCountry: 'IN',
      geo: {
        latitude: 28.4089,
        longitude: 77.3178,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+17+Faridabad',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-faridabad',
      nearbyLandmarks: ['HUDA Complex', 'Sector 17 Market', 'Mini Secretariat', 'Bata Chowk'],
      isPhysicalCenter: true,
      metroAccess: {
        nearestStation: 'Bata Chowk Metro',
        line: 'Violet Line',
        walkingTime: '5 minutes',
        otherStations: ['Neelam Chowk Ajronda', 'Old Faridabad', 'Badkhal Mor'],
      },
      areasServed: [
        'Greater Faridabad',
        'NIT Faridabad',
        'Ballabgarh',
        'Old Faridabad',
        'Sector 15-21',
        'Sector 75-89',
        'BPTP Parklands',
        'Omaxe Heights',
      ],
    },
    noida: {
      name: 'Cerebrum Biology Academy - Noida (Online)',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
      geo: {
        latitude: 28.628,
        longitude: 77.3649,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+62+Noida',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-noida',
      nearbyLandmarks: [
        'Near Sector 62 Metro Station (Blue Line)',
        'Electronic City',
        'Near Noida City Centre',
      ],
      isPhysicalCenter: false,
      nearestCenter: 'southExtension',
    },
  },

  // Areas We Serve - Online/hybrid coaching available (no physical center)
  location: {
    delhi: {
      name: 'NEET Coaching in Delhi (West Delhi)',
      streetAddress: 'Patel Nagar, West Delhi',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110008',
      addressCountry: 'IN',
      geo: {
        latitude: 28.6508,
        longitude: 77.1726,
      },
      mapUrl: 'https://maps.google.com/maps?q=Patel+Nagar+Delhi',
      nearbyLandmarks: ['Patel Nagar Metro Station', 'Karol Bagh', 'Rajendra Place'],
      isPhysicalCenter: false,
      nearestCenter: 'rohini',
    },
    southDelhi: {
      name: 'NEET Coaching in South Delhi (Greater Kailash)',
      streetAddress: 'Greater Kailash, South Delhi',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110048',
      addressCountry: 'IN',
      geo: {
        latitude: 28.5494,
        longitude: 77.2347,
      },
      mapUrl: 'https://maps.google.com/maps?q=Greater+Kailash+Delhi',
      nearbyLandmarks: ['Greater Kailash M Block Market', 'Kailash Colony Metro', 'Nehru Place'],
      isPhysicalCenter: false,
      nearestCenter: 'southExtension',
    },
    gurugram: {
      name: 'Cerebrum Biology Academy - Gurugram',
      streetAddress: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      postalCode: '122018',
      addressCountry: 'IN',
      geo: {
        latitude: 28.4295,
        longitude: 77.0426,
      },
      mapUrl: 'https://maps.google.com/maps?q=M2K+Corporate+Park+Sector+51+Gurugram',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-gurugram',
      nearbyLandmarks: [
        'Near HUDA City Centre Metro Station (Yellow Line)',
        'Mayfield Garden',
        'Sector 51 Market',
      ],
      isPhysicalCenter: true,
    },
    noida: {
      name: 'Cerebrum Biology Academy - Noida',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
      geo: {
        latitude: 28.628,
        longitude: 77.3649,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+62+Noida',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-noida',
      nearbyLandmarks: [
        'Near Sector 62 Metro Station (Blue Line)',
        'Electronic City',
        'Near Noida City Centre',
      ],
      isPhysicalCenter: true,
    },
    faridabad: {
      name: 'Cerebrum Biology Academy - Faridabad',
      streetAddress: 'SCF 124, Second Floor, Above Union Bank of India, Huda Market, Sector 17',
      addressLocality: 'Faridabad',
      addressRegion: 'Haryana',
      postalCode: '121002',
      addressCountry: 'IN',
      geo: {
        latitude: 28.4089,
        longitude: 77.3178,
      },
      mapUrl: 'https://maps.google.com/maps?q=Sector+17+Faridabad',
      googleBusinessUrl: 'https://g.page/cerebrum-biology-academy-faridabad',
      nearbyLandmarks: ['HUDA Complex', 'Sector 17 Market', 'Mini Secretariat', 'Bata Chowk'],
      isPhysicalCenter: true,
      metroAccess: {
        nearestStation: 'Bata Chowk Metro',
        line: 'Violet Line',
        walkingTime: '5 minutes',
        otherStations: ['Neelam Chowk Ajronda', 'Old Faridabad', 'Badkhal Mor'],
      },
      areasServed: [
        'Greater Faridabad',
        'NIT Faridabad',
        'Ballabgarh',
        'Old Faridabad',
        'Sector 15-21',
        'Sector 75-89',
        'BPTP Parklands',
        'Omaxe Heights',
      ],
    },
  },

  // Operating Hours
  hours: {
    weekdays: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      open: '00:00',
      close: '23:59',
    },
    sunday: {
      days: ['Sunday'],
      open: '00:00',
      close: '23:59',
    },
    displayText: 'Open 24/7 — Online Classes Available Globally',
  },

  // Social media
  social: {
    instagram: 'https://instagram.com/cerebrumbiologyacademy',
    youtube: 'https://youtube.com/@cerebrumbiologyacademy',
    youtubePersonal: 'https://www.youtube.com/@drshekharcsingh',
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
