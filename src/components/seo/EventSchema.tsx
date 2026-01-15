'use client'

import Script from 'next/script'

type EventAttendanceMode = 'online' | 'offline' | 'hybrid'
type EventStatus = 'scheduled' | 'cancelled' | 'postponed' | 'rescheduled'

interface EventSchemaProps {
  name: string
  description: string
  startDate: string // ISO 8601 format: 2025-01-20T10:00:00+05:30
  endDate?: string
  location?: {
    name: string
    address?: string
    city?: string
  }
  attendanceMode?: EventAttendanceMode
  status?: EventStatus
  image?: string
  url?: string
  performer?: {
    name: string
    role?: string
  }
  organizer?: {
    name: string
    url?: string
  }
  offers?: {
    price: number | 'Free'
    currency?: string
    availability?: 'InStock' | 'SoldOut' | 'PreOrder'
    validFrom?: string
  }
  isAccessibleForFree?: boolean
  maximumAttendeeCapacity?: number
}

const ATTENDANCE_MODE_MAP = {
  online: 'https://schema.org/OnlineEventAttendanceMode',
  offline: 'https://schema.org/OfflineEventAttendanceMode',
  hybrid: 'https://schema.org/MixedEventAttendanceMode',
}

const EVENT_STATUS_MAP = {
  scheduled: 'https://schema.org/EventScheduled',
  cancelled: 'https://schema.org/EventCancelled',
  postponed: 'https://schema.org/EventPostponed',
  rescheduled: 'https://schema.org/EventRescheduled',
}

/**
 * EventSchema - Generates Event structured data for rich snippets
 *
 * Usage:
 * <EventSchema
 *   name="Free NEET Biology Demo Class"
 *   description="Join our free demo session..."
 *   startDate="2025-01-20T10:00:00+05:30"
 *   attendanceMode="online"
 *   isAccessibleForFree
 * />
 */
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  attendanceMode = 'online',
  status = 'scheduled',
  image,
  url,
  performer,
  organizer,
  offers,
  isAccessibleForFree = false,
  maximumAttendeeCapacity,
}: EventSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name,
    description,
    startDate,
    endDate,
    eventAttendanceMode: ATTENDANCE_MODE_MAP[attendanceMode],
    eventStatus: EVENT_STATUS_MAP[status],
    image: image
      ? image.startsWith('http')
        ? image
        : `https://cerebrumbiologyacademy.com${image}`
      : 'https://cerebrumbiologyacademy.com/og-image.jpg',
    url: url || 'https://cerebrumbiologyacademy.com',
    location:
      attendanceMode === 'online'
        ? {
            '@type': 'VirtualLocation',
            url: url || 'https://cerebrumbiologyacademy.com/demo',
          }
        : {
            '@type': 'Place',
            name: location?.name || 'Cerebrum Biology Academy',
            address: {
              '@type': 'PostalAddress',
              streetAddress: location?.address,
              addressLocality: location?.city || 'Delhi',
              addressCountry: 'IN',
            },
          },
    performer: performer
      ? {
          '@type': 'Person',
          name: performer.name,
          jobTitle: performer.role || 'Biology Faculty',
        }
      : {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: 'Founder & Lead Faculty',
        },
    organizer: {
      '@type': 'EducationalOrganization',
      name: organizer?.name || 'Cerebrum Biology Academy',
      url: organizer?.url || 'https://cerebrumbiologyacademy.com',
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price === 'Free' ? 0 : offers.price,
        priceCurrency: offers.currency || 'INR',
        availability: `https://schema.org/${offers.availability || 'InStock'}`,
        validFrom: offers.validFrom,
        url: url || 'https://cerebrumbiologyacademy.com/demo',
      },
    }),
    isAccessibleForFree,
    maximumAttendeeCapacity,
    inLanguage: 'en-IN',
    teaches: 'NEET Biology',
    educationalLevel: 'High School',
    about: {
      '@type': 'Thing',
      name: 'NEET Biology Preparation',
    },
  }

  const jsonString = JSON.stringify(schemaData)

  return (
    <Script
      id={`event-schema-${name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
      type="application/ld+json"
    >
      {jsonString}
    </Script>
  )
}

interface EventListSchemaProps {
  events: Array<{
    name: string
    description: string
    startDate: string
    endDate?: string
    url?: string
    isAccessibleForFree?: boolean
  }>
  listName?: string
}

/**
 * EventListSchema - Generates ItemList schema for multiple events
 */
export function EventListSchema({
  events,
  listName = 'Upcoming NEET Biology Events',
}: EventListSchemaProps) {
  if (!events || events.length === 0) {
    return null
  }

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationEvent',
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        url: event.url || 'https://cerebrumbiologyacademy.com',
        isAccessibleForFree: event.isAccessibleForFree || false,
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
        },
      },
    })),
    numberOfItems: events.length,
  }

  const jsonString = JSON.stringify(schemaData)

  return (
    <Script id="event-list-schema" type="application/ld+json">
      {jsonString}
    </Script>
  )
}

interface WebinarSchemaProps {
  name: string
  description: string
  startDate: string
  duration?: string // ISO 8601: PT1H30M
  instructor: string
  topic: string
  registrationUrl?: string
  isAccessibleForFree?: boolean
}

/**
 * WebinarSchema - Specialized schema for webinars/online classes
 *
 * Usage:
 * <WebinarSchema
 *   name="Free NEET Biology Webinar: Cell Division"
 *   description="Learn mitosis and meiosis..."
 *   startDate="2025-01-20T18:00:00+05:30"
 *   duration="PT1H30M"
 *   instructor="Dr. Shekhar C Singh"
 *   topic="Cell Division"
 *   isAccessibleForFree
 * />
 */
export function WebinarSchema({
  name,
  description,
  startDate,
  duration,
  instructor,
  topic,
  registrationUrl,
  isAccessibleForFree = true,
}: WebinarSchemaProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'EducationEvent',
    name,
    description,
    startDate,
    duration,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: registrationUrl || 'https://cerebrumbiologyacademy.com/demo',
    },
    performer: {
      '@type': 'Person',
      name: instructor,
      jobTitle: 'Biology Faculty',
      worksFor: {
        '@type': 'EducationalOrganization',
        name: 'Cerebrum Biology Academy',
      },
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      logo: 'https://cerebrumbiologyacademy.com/logo.png',
    },
    about: {
      '@type': 'Thing',
      name: topic,
    },
    teaches: `NEET Biology - ${topic}`,
    educationalLevel: 'High School',
    isAccessibleForFree,
    inLanguage: 'en-IN',
    offers: isAccessibleForFree
      ? {
          '@type': 'Offer',
          price: 0,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: registrationUrl || 'https://cerebrumbiologyacademy.com/demo',
        }
      : undefined,
  }

  const jsonString = JSON.stringify(schemaData)

  return (
    <Script
      id={`webinar-schema-${name.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`}
      type="application/ld+json"
    >
      {jsonString}
    </Script>
  )
}
