// src/lib/seo/eventSchema.ts
// Event Schema for Demo Classes and Batch Starts

interface EventData {
  name: string
  description: string
  startDate: string // ISO 8601 format
  endDate?: string
  location?: {
    name: string
    address: string
    city: string
    state: string
    postalCode: string
  }
  isOnline?: boolean
  url: string
  image?: string
  price: number
  priceCurrency?: string
  availableSeats?: number
  organizer?: string
}

/**
 * Generate Event schema for demo classes and batch starts
 * Enables event rich snippets in Google Search
 */
export function generateEventSchema(event: EventData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    url: event.url,
    image: event.image || 'https://cerebrumbiologyacademy.com/og-image.jpg',
    organizer: {
      '@type': 'Organization',
      name: event.organizer || 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    offers: {
      '@type': 'Offer',
      price: event.price,
      priceCurrency: event.priceCurrency || 'INR',
      availability:
        event.availableSeats && event.availableSeats > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/SoldOut',
      url: event.url,
      validFrom: new Date().toISOString().split('T')[0],
    },
  }

  if (event.endDate) {
    schema.endDate = event.endDate
  }

  if (event.isOnline) {
    schema.eventAttendanceMode = 'https://schema.org/OnlineEventAttendanceMode'
    schema.location = {
      '@type': 'VirtualLocation',
      url: 'https://cerebrumbiologyacademy.com/online-classes',
    }
  } else if (event.location) {
    schema.eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode'
    schema.location = {
      '@type': 'Place',
      name: event.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.location.address,
        addressLocality: event.location.city,
        addressRegion: event.location.state,
        postalCode: event.location.postalCode,
        addressCountry: 'IN',
      },
    }
  }

  return schema
}

// Pre-configured upcoming events
export const upcomingEvents: EventData[] = [
  {
    name: 'Free NEET Biology Demo Class - February 2026',
    description:
      "Experience Dr. Shekhar Singh's teaching methodology in this free demo class. Topic: Human Physiology - Cardiovascular System. Limited seats available.",
    startDate: '2026-02-01T10:00:00+05:30',
    endDate: '2026-02-01T12:00:00+05:30',
    location: {
      name: 'Cerebrum Biology Academy - South Extension',
      address: 'Block D, South Extension Part 2',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110049',
    },
    isOnline: false,
    url: 'https://cerebrumbiologyacademy.com/demo',
    image: 'https://cerebrumbiologyacademy.com/images/demo-class.jpg',
    price: 0,
    availableSeats: 25,
  },
  {
    name: 'NEET 2026 Crash Course - Batch Starts February 2026',
    description:
      'Intensive 4-month NEET Biology preparation with 200+ hours of live classes. Join our proven crash course that has produced 100 percentile scorers.',
    startDate: '2026-02-15T09:00:00+05:30',
    location: {
      name: 'Cerebrum Biology Academy - South Extension',
      address: 'Block D, South Extension Part 2',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110049',
    },
    isOnline: false,
    url: 'https://cerebrumbiologyacademy.com/courses/neet-crash-course',
    image: 'https://cerebrumbiologyacademy.com/images/crash-course.jpg',
    price: 78000,
    availableSeats: 25,
  },
  {
    name: 'Online NEET Biology Weekend Batch - March 2026',
    description:
      'Perfect for students outside Delhi NCR. Live interactive online classes every Saturday and Sunday with recorded backup.',
    startDate: '2026-03-01T10:00:00+05:30',
    isOnline: true,
    url: 'https://cerebrumbiologyacademy.com/courses/online-batch',
    image: 'https://cerebrumbiologyacademy.com/images/online-class.jpg',
    price: 45000,
    availableSeats: 50,
  },
  {
    name: 'NEET 2027 Foundation Batch (Class 11) - April 2026',
    description:
      'Start your 2-year NEET journey early. Integrated program covering Class 11 boards and NEET Biology simultaneously.',
    startDate: '2026-04-01T08:00:00+05:30',
    location: {
      name: 'Cerebrum Biology Academy - Multiple Centers',
      address: 'South Extension, Rohini, Green Park',
      city: 'Delhi NCR',
      state: 'Delhi',
      postalCode: '110000',
    },
    isOnline: false,
    url: 'https://cerebrumbiologyacademy.com/courses/two-year-program',
    image: 'https://cerebrumbiologyacademy.com/images/foundation-batch.jpg',
    price: 58000,
    availableSeats: 75,
  },
  {
    name: 'Free Parent-Student Counseling Session',
    description:
      'One-on-one counseling with our academic team. Discuss course options, study plans, and get your queries answered. No obligation to enroll.',
    startDate: '2026-01-25T11:00:00+05:30',
    endDate: '2026-01-25T17:00:00+05:30',
    location: {
      name: 'Cerebrum Biology Academy - South Extension',
      address: 'Block D, South Extension Part 2',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110049',
    },
    isOnline: false,
    url: 'https://cerebrumbiologyacademy.com/contact',
    image: 'https://cerebrumbiologyacademy.com/images/counseling.jpg',
    price: 0,
    availableSeats: 20,
  },
]

/**
 * Generate all event schemas
 */
export function generateAllEventSchemas() {
  return upcomingEvents.map((event) => generateEventSchema(event))
}

/**
 * Generate event schema for a custom event
 */
export function generateCustomEventSchema(
  eventData: Partial<EventData> & { name: string; startDate: string; url: string }
) {
  const defaultEvent: EventData = {
    name: eventData.name,
    description:
      eventData.description || `Join us for ${eventData.name} at Cerebrum Biology Academy`,
    startDate: eventData.startDate,
    url: eventData.url,
    price: eventData.price || 0,
    isOnline: eventData.isOnline || false,
  }

  return generateEventSchema({ ...defaultEvent, ...eventData })
}
