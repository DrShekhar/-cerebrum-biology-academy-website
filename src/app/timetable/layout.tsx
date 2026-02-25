import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Batch Timetable & Schedule | Class 11, 12, Dropper Delhi NCR',
  description:
    'View NEET Biology batch schedule and timetable across all Cerebrum centers. Class 11, 12, Dropper, Foundation batches with flexible timings in Delhi NCR.',
  keywords: [
    'batch schedule',
    'NEET class timing',
    'coaching timetable',
    'batch timing Delhi',
    'class schedule NEET',
  ],
  openGraph: {
    title: 'NEET Batch Timetable & Schedule',
    description:
      'Check all NEET Biology batch timings and schedules. Class 11, 12, Dropper batches with flexible options. Find your ideal batch timing now!',
    url: 'https://cerebrumbiologyacademy.com/timetable',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Batch Schedule and Timetable',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Batch Timetable',
    description:
      'Check NEET Biology batch timings - Class 11, 12, Dropper. Find your perfect batch timing across all centers.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/timetable',
  },
}

export default function TimetableLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'Timetable', item: 'https://cerebrumbiologyacademy.com/timetable' },
    ],
  }

  // Event schema for upcoming batch starts - helps with Google Events rich results
  const upcomingBatchEvents = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Upcoming NEET Biology Batches - Cerebrum Biology Academy',
    description: 'Scheduled batch starts for NEET Biology coaching at Cerebrum Biology Academy centers',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'EducationEvent',
        position: 1,
        name: 'NEET Biology Class 12 Intensive Batch - New Session 2026',
        description: 'Intensive NEET Biology preparation for Class 12 students with AIIMS faculty. Covers complete syllabus with MCQ practice and test series.',
        startDate: '2026-03-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: [
          {
            '@type': 'Place',
            name: 'Cerebrum Biology Academy - South Extension',
            address: { '@type': 'PostalAddress', streetAddress: 'D 35, South Extension Part 2', addressLocality: 'New Delhi', postalCode: '110049', addressCountry: 'IN' },
          },
          {
            '@type': 'VirtualLocation',
            url: 'https://cerebrumbiologyacademy.com/services/online-classes',
          },
        ],
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        performer: {
          '@type': 'Person',
          name: 'Dr. Shekhar C Singh',
          jobTitle: 'Founder & Head Faculty',
        },
        offers: {
          '@type': 'Offer',
          price: '75000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/courses/class-12',
          validFrom: '2026-01-01',
        },
      },
      {
        '@type': 'EducationEvent',
        position: 2,
        name: 'NEET Biology Class 11 Foundation Batch - New Session 2026',
        description: 'Early NEET Biology preparation for Class 11 students. Build strong fundamentals with concept clarity and MCQ practice.',
        startDate: '2026-04-01',
        endDate: '2027-03-31',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: [
          {
            '@type': 'Place',
            name: 'Cerebrum Biology Academy - All Centers',
            address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressRegion: 'Delhi NCR', addressCountry: 'IN' },
          },
          {
            '@type': 'VirtualLocation',
            url: 'https://cerebrumbiologyacademy.com/services/online-classes',
          },
        ],
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        offers: {
          '@type': 'Offer',
          price: '75000',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/courses/class-11',
          validFrom: '2026-01-01',
        },
      },
      {
        '@type': 'EducationEvent',
        position: 3,
        name: 'NEET 2027 Dropper Batch - Intensive Program',
        description: 'Dedicated intensive program for NEET repeaters. Daily classes, weekly tests, and personalized mentoring to improve scores by 100-150 marks.',
        startDate: '2026-07-01',
        endDate: '2027-04-30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: [
          {
            '@type': 'Place',
            name: 'Cerebrum Biology Academy - All Centers',
            address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressRegion: 'Delhi NCR', addressCountry: 'IN' },
          },
          {
            '@type': 'VirtualLocation',
            url: 'https://cerebrumbiologyacademy.com/services/online-classes',
          },
        ],
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        offers: {
          '@type': 'Offer',
          price: '85500',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/courses/neet-dropper',
          validFrom: '2026-01-01',
        },
      },
      {
        '@type': 'EducationEvent',
        position: 4,
        name: 'Free NEET Biology Demo Class',
        description: 'Experience Cerebrum\'s teaching methodology with a free demo class. AIIMS faculty teaches live Biology concepts with interactive Q&A session.',
        startDate: '2026-03-15',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        location: [
          {
            '@type': 'Place',
            name: 'Cerebrum Biology Academy - South Extension',
            address: { '@type': 'PostalAddress', streetAddress: 'D 35, South Extension Part 2', addressLocality: 'New Delhi', postalCode: '110049', addressCountry: 'IN' },
          },
          {
            '@type': 'VirtualLocation',
            url: 'https://cerebrumbiologyacademy.com/book-free-demo',
          },
        ],
        organizer: {
          '@type': 'EducationalOrganization',
          name: 'Cerebrum Biology Academy',
          url: 'https://cerebrumbiologyacademy.com',
        },
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: 'https://cerebrumbiologyacademy.com/book-free-demo',
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(upcomingBatchEvents) }} />
      {children}
    </>
  )
}
