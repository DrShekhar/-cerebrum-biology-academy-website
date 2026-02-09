// Server Component - JSON-LD Schema for Educational Credentials
// Marks up NEET qualification as an educational credential
import Script from 'next/script'

interface CredentialSchemaProps {
  courseName: string
  provider: string
  credentialCategory: string // e.g., "NEET-UG Qualification"
  recognizedBy: string // e.g., "National Testing Agency (NTA)"
  competencyRequired?: string[]
  credentialId?: string
  url?: string
  description?: string
}

/**
 * CredentialSchema - Generates EducationalOccupationalCredential structured data
 *
 * Marks up NEET qualifications and certifications for enhanced visibility
 * in educational search results and knowledge graphs
 *
 * Usage:
 * <CredentialSchema
 *   courseName="NEET-UG Preparation Course"
 *   provider="Cerebrum Biology Academy"
 *   credentialCategory="NEET-UG Qualification"
 *   recognizedBy="National Testing Agency (NTA)"
 *   competencyRequired={["Photosynthesis", "Cell Division", "Human Physiology"]}
 *   url="https://cerebrumbiologyacademy.com/neet-ug-course"
 *   description="Comprehensive NEET-UG preparation with AIIMS-trained faculty"
 * />
 */
export function CredentialSchema({
  courseName,
  provider,
  credentialCategory,
  recognizedBy,
  competencyRequired = [],
  credentialId,
  url,
  description,
}: CredentialSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: courseName,
    description:
      description ||
      `${credentialCategory} preparation and qualification through ${provider}`,
    credentialCategory: credentialCategory,
    recognizedBy: {
      '@type': 'Organization',
      name: recognizedBy,
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: provider,
      url: url || baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 800,
        height: 800,
      },
      sameAs: [
        'https://www.youtube.com/@CerebrumBiologyAcademy',
        'https://www.instagram.com/cerebrumbiologyacademy',
        'https://www.facebook.com/cerebrumbiologyacademy',
      ],
    },
    ...(credentialId && { credentialId }),
    ...(url && {
      url: url.startsWith('http') ? url : `${baseUrl}${url}`,
    }),
    educationalLevel: 'Grade 12',
    teaches: 'NEET Biology',
    isAccessibleForFree: false,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: `${courseName} - Online Batch`,
      description: `Comprehensive online ${credentialCategory} preparation`,
      courseMode: 'OnlineCoursed',
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar C Singh',
        jobTitle: 'Founder & Chief Academic Officer',
        alumniOf: 'AIIMS Delhi',
      },
    },
    ...(competencyRequired.length > 0 && {
      competencyRequired: competencyRequired.map((competency) => ({
        '@type': 'DefinedTerm',
        name: competency,
        inDefinedTermSet: 'NCERT Biology Curriculum',
      })),
    }),
    // Additional context for NEET exam
    about: {
      '@type': 'Thing',
      name: 'NEET Medical Entrance Exam',
      url: 'https://neet.nta.ac.in/',
      description:
        'National Eligibility cum Entrance Test for admission to medical and dental colleges in India',
    },
  }

  const schemaId = `credential-${courseName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .slice(0, 40)}`

  return (
    <Script
      id={schemaId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}
