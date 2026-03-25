import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Class 9 Biology Foundation Course | NEET-Aligned | Cerebrum Academy',
  description:
    'Class 9 NEET Biology Foundation course at ₹60,000/year by Dr. Shekhar C Singh (AIIMS faculty). NCERT-aligned + Olympiad prep (NSEB/IBO). Small batches (12-25 students), 95% board success rate. 65% of NEET toppers started in Class 9. EMI ₹5,000/month. Free demo + lab kit worth ₹5,000.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the fee for Class 9 Biology Foundation course?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The NEET Foundation course for Class 9 starts at ₹45,000/year (Pursuit tier). The most popular Ascent tier is ₹60,000/year with 16-25 student batches. Premium Pinnacle tier with personal mentoring is ₹90,000/year. EMI options available starting ₹3,750/month.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Class 9 too early to start NEET preparation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. 65% of NEET toppers (AIR under 1000) started preparation in Class 9 or earlier. Starting early gives a 2-year advantage in conceptual clarity. Class 9-10 Biology directly covers 30% of the NEET syllabus. Our foundation course focuses on building understanding, not pressure.',
                },
              },
              {
                '@type': 'Question',
                name: 'Who teaches Class 9 Biology at Cerebrum Academy?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dr. Shekhar C Singh, AIIMS alumnus with 8+ years of teaching experience and 100+ NEET qualifiers. He personally teaches all foundation batches with interactive, age-appropriate methods including lab sessions and 3D model demonstrations.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the batch schedule for Class 9 NEET Foundation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Class 9 NEET Foundation batch runs Saturday-Sunday 5:00-6:00 PM (Hybrid: Gurugram offline + Online). USA timezone batch available Monday-Wednesday 6:00-7:00 AM IST. Olympiad batches (NSEB/IBO) run separately. All batches start 1st week of April 2026.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does this course help with school board exams too?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '95% of our Class 9 students score 85+ in school Biology exams. The course follows NCERT Class 9 syllabus with deeper conceptual understanding. School topics feel easy after our classes. We balance board prep with NEET foundation building.',
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}
