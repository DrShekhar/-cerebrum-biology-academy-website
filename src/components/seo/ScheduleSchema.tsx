// Server Component - Schedule Schema for Batch Timings
// Enables Google Calendar integration and time-based queries
import Script from 'next/script'

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

interface BatchSchedule {
  batchName: string
  description?: string
  startTime: string // HH:MM format (24hr)
  endTime: string // HH:MM format (24hr)
  daysOfWeek: DayOfWeek[]
  instructor?: string
  location?: 'online' | 'offline' | 'hybrid'
  maxStudents?: number
  availableSeats?: number
}

interface ScheduleSchemaProps {
  courseName: string
  courseUrl: string
  batches: BatchSchedule[]
  startDate?: string // ISO date
  endDate?: string // ISO date
  timezone?: string
}

// Convert days to iCal RRULE format
function daysToRRule(days: DayOfWeek[]): string {
  const dayMap: Record<DayOfWeek, string> = {
    Monday: 'MO',
    Tuesday: 'TU',
    Wednesday: 'WE',
    Thursday: 'TH',
    Friday: 'FR',
    Saturday: 'SA',
    Sunday: 'SU',
  }
  return `FREQ=WEEKLY;BYDAY=${days.map(d => dayMap[d]).join(',')}`
}

export function ScheduleSchema({
  courseName,
  courseUrl,
  batches,
  startDate,
  endDate,
  timezone = 'Asia/Kolkata',
}: ScheduleSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseName,
    url: courseUrl,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: baseUrl,
    },
    hasCourseInstance: batches.map(batch => ({
      '@type': 'CourseInstance',
      name: `${courseName} - ${batch.batchName}`,
      description: batch.description || `${batch.batchName} batch for ${courseName}`,
      courseMode: batch.location === 'online' ? 'online' :
                  batch.location === 'offline' ? 'onsite' :
                  ['online', 'onsite'],
      instructor: batch.instructor ? {
        '@type': 'Person',
        name: batch.instructor,
      } : undefined,
      // Schedule specification
      courseSchedule: {
        '@type': 'Schedule',
        scheduleName: batch.batchName,
        scheduleTimezone: timezone,
        startTime: batch.startTime,
        endTime: batch.endTime,
        byDay: batch.daysOfWeek,
        repeatFrequency: daysToRRule(batch.daysOfWeek),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        duration: calculateDuration(batch.startTime, batch.endTime),
      },
      // Location
      location: batch.location === 'online' ? {
        '@type': 'VirtualLocation',
        name: 'Cerebrum Online Classroom',
        url: `${baseUrl}/live-class`,
      } : batch.location === 'offline' ? {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy - Noida',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Sector 62',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          postalCode: '201301',
          addressCountry: 'IN',
        },
      } : undefined,
      // Availability
      ...(batch.maxStudents && {
        maximumAttendeeCapacity: batch.maxStudents,
        remainingAttendeeCapacity: batch.availableSeats || Math.floor(batch.maxStudents * 0.3),
      }),
    })),
  }

  // Clean undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema))

  return (
    <Script
      id="schedule-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  )
}

// Helper to calculate duration in ISO 8601 format
function calculateDuration(startTime: string, endTime: string): string {
  const [startH, startM] = startTime.split(':').map(Number)
  const [endH, endM] = endTime.split(':').map(Number)

  let hours = endH - startH
  let minutes = endM - startM

  if (minutes < 0) {
    hours -= 1
    minutes += 60
  }

  return `PT${hours}H${minutes > 0 ? minutes + 'M' : ''}`
}

// Predefined batch configurations for common use
export const STANDARD_BATCHES: BatchSchedule[] = [
  {
    batchName: 'Morning Batch',
    description: 'Early morning batch ideal for regular school students',
    startTime: '07:00',
    endTime: '10:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    location: 'hybrid',
    maxStudents: 50,
    availableSeats: 15,
  },
  {
    batchName: 'Evening Batch',
    description: 'Evening batch for students who prefer afternoon study',
    startTime: '17:00',
    endTime: '20:00',
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    location: 'hybrid',
    maxStudents: 50,
    availableSeats: 20,
  },
  {
    batchName: 'Weekend Batch',
    description: 'Weekend intensive batch for working professionals and distant students',
    startTime: '10:00',
    endTime: '16:00',
    daysOfWeek: ['Saturday', 'Sunday'],
    location: 'online',
    maxStudents: 100,
    availableSeats: 35,
  },
]

// Event-based schedule for demo classes
interface DemoClassScheduleProps {
  upcomingDemos: Array<{
    title: string
    description: string
    startDateTime: string // ISO datetime
    endDateTime: string // ISO datetime
    instructor: string
    topic: string
    registrationUrl: string
    isOnline: boolean
  }>
}

export function DemoClassScheduleSchema({ upcomingDemos }: DemoClassScheduleProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming Free Demo Classes',
    description: 'Register for free NEET Biology demo classes at Cerebrum Academy',
    numberOfItems: upcomingDemos.length,
    itemListElement: upcomingDemos.map((demo, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'EducationEvent',
        name: demo.title,
        description: demo.description,
        startDate: demo.startDateTime,
        endDate: demo.endDateTime,
        eventAttendanceMode: demo.isOnline
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: demo.isOnline ? {
          '@type': 'VirtualLocation',
          url: `${baseUrl}/live-demo`,
        } : {
          '@type': 'Place',
          name: 'Cerebrum Biology Academy',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 62',
            addressLocality: 'Noida',
            addressRegion: 'UP',
            postalCode: '201301',
            addressCountry: 'IN',
          },
        },
        performer: {
          '@type': 'Person',
          name: demo.instructor,
          jobTitle: 'NEET Biology Faculty',
        },
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: baseUrl,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: demo.registrationUrl,
          validFrom: new Date().toISOString(),
        },
        about: {
          '@type': 'Thing',
          name: demo.topic,
        },
        isAccessibleForFree: true,
        inLanguage: ['en', 'hi'],
      },
    })),
  }

  return (
    <Script
      id="demo-schedule-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Opening hours schema for physical locations
interface OpeningHoursSchemaProps {
  location: string
  hours: Array<{
    days: DayOfWeek[]
    opens: string
    closes: string
  }>
}

export function OpeningHoursSchema({ location, hours }: OpeningHoursSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Cerebrum Biology Academy - ${location}`,
    openingHoursSpecification: hours.map(spec => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
  }

  return (
    <Script
      id="opening-hours-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
