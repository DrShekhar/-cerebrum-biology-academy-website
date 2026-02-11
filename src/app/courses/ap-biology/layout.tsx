import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AP Biology Coaching Delhi | College Board AP Exam Preparation | Cerebrum',
  description:
    'Expert AP Biology coaching in Delhi for American curriculum students. College Board certified exam prep, score 5 strategies, lab skills training. AES, Pathways, American School students welcome.',
  keywords: [
    'AP Biology tutor Delhi',
    'AP Biology coaching India',
    'AP Biology exam preparation',
    'College Board AP Biology tutor',
    'American curriculum Biology Delhi',
    'AP Biology classes Delhi',
    'AP Biology score 5',
    'AP Biology lab practical',
    'Advanced Placement Biology coaching',
    'AP Biology tuition South Delhi',
    'AP Biology crash course',
    'AP Biology FRQ preparation',
    'AP Biology MCQ practice',
    'American Embassy School Biology tutor',
    'Pathways School AP Biology',
    'AP exam prep Delhi',
  ],
  openGraph: {
    title: 'AP Biology Coaching Delhi | Score 5 on Your AP Exam | Cerebrum',
    description:
      'Expert AP Biology preparation for College Board exams. Lab skills, FRQ strategies, score 5 coaching. AES, Pathways, American School students.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AP Biology Coaching Delhi | College Board AP Exam Preparation | Cerebrum',
    description: 'Expert AP Biology coaching in Delhi for American curriculum students.',
  },
}

export default function APBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'AP Biology Coaching',
            description:
              'Advanced Placement Biology preparation for College Board exam. Expert coaching for American curriculum students in Delhi.',
            provider: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
            },
            educationalLevel: 'High School',
            about: {
              '@type': 'Thing',
              name: 'AP Biology',
            },
            teaches: [
              'Cell Biology',
              'Genetics',
              'Evolution',
              'Ecology',
              'Lab Skills',
              'FRQ Writing',
            ],
            coursePrerequisites: 'High school Biology background',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Blended',
              location: {
                '@type': 'Place',
                name: 'Cerebrum Biology Academy - South Extension',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'South Extension',
                  addressRegion: 'Delhi',
                  addressCountry: 'IN',
                },
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '45',
              bestRating: '5',
            },
          }),
        }}
      />
      {children}
    </>
  )
}
