import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9 Biology Foundation Course | NEET-Aligned | Cerebrum Academy',
  description:
    'Class 9 Biology foundation course by Dr. Shekhar Singh (AIIMS faculty). NCERT-aligned, small batches (max 15), 95% board success rate. Fee starts ₹45,000. Free demo + lab kit worth ₹5,000. Enroll now!',
  keywords: [
    'Class 9 Biology tuition Delhi',
    'Class 9 Biology coaching',
    'NCERT Biology class 9',
    'Pre-NEET foundation class 9',
    'Biology tutor class 9 Delhi',
    'Class 9 Science tuition',
    'Biology classes for class 9',
    'Early NEET preparation',
    'Class 9 Biology South Delhi',
    'Foundation Biology course',
    'CBSE Biology class 9',
    'Class 9 Biology Noida',
  ],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/class-9-foundation',
  },
  openGraph: {
    title: 'Class 9 Biology Foundation Course | Pre-NEET | Cerebrum Academy',
    description:
      'Build strong Biology foundation in Class 9 with Dr. Shekhar Singh. 95% board success rate, small batches, NCERT + NEET-aligned. Free demo available.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/courses/class-9-foundation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Class 9 Biology Foundation | Pre-NEET Preparation',
    description:
      'Class 9 Biology foundation by AIIMS faculty. 95% board success, small batches, fee from ₹45,000.',
  },
}

export default function Class9FoundationLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Class 9 Biology Foundation Course',
            description:
              'Foundation Biology course for Class 9 students with NEET-aligned curriculum, NCERT-based teaching, and practical lab sessions by AIIMS faculty.',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'Cerebrum Biology Academy',
              url: 'https://cerebrumbiologyacademy.com',
              sameAs: [
                'https://www.youtube.com/@CerebrumBiologyAcademy',
                'https://www.instagram.com/cerebrumbiologyacademy/',
              ],
            },
            educationalLevel: 'Class 9',
            inLanguage: 'en',
            isAccessibleForFree: false,
            offers: [
              {
                '@type': 'Offer',
                category: 'Pursuit Tier',
                price: '45000',
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                category: 'Ascent Tier',
                price: '60000',
                priceCurrency: 'INR',
                availability: 'https://schema.org/InStock',
              },
              {
                '@type': 'Offer',
                category: 'Pinnacle Tier',
                price: '90000',
                priceCurrency: 'INR',
                availability: 'https://schema.org/LimitedAvailability',
              },
            ],
            teaches: [
              'Cell Biology',
              'Tissues & Organ Systems',
              'Diversity in Living Organisms',
              'Life Processes Introduction',
            ],
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Blended',
              instructor: {
                '@type': 'Person',
                name: 'Dr. Shekhar Singh',
                jobTitle: 'Founder & Biology Faculty',
                description:
                  'M.Sc Biology, Ph.D Botany, 8+ years teaching experience, 100+ NEET qualifiers',
              },
              location: {
                '@type': 'Place',
                name: 'Cerebrum Biology Academy',
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
              ratingValue: '4.8',
              bestRating: '5',
              ratingCount: '120',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cerebrumbiologyacademy.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Courses',
                item: 'https://cerebrumbiologyacademy.com/courses',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Class 9 Foundation',
                item: 'https://cerebrumbiologyacademy.com/courses/class-9-foundation',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
