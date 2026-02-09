// Server Component - no client-side interactivity needed
import { Faculty } from '@/types'

interface PersonSchemaProps {
  person: Faculty
  organizationName?: string
  organizationUrl?: string
}

export function PersonSchema({
  person,
  organizationName = 'Cerebrum Biology Academy',
  organizationUrl = 'https://cerebrumbiologyacademy.com',
}: PersonSchemaProps) {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.designation,
    description: person.bio,
    image: person.image,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: organizationName,
      url: organizationUrl,
    },
    knowsAbout: person.specialization,
    alumniOf: extractAlumniOf(person.qualification),
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: person.qualification,
      },
    ],
    sameAs: [
      'https://www.youtube.com/@cerebrumbiologyacademy',
      'https://www.linkedin.com/company/cerebrum-biology-academy',
      'https://www.instagram.com/cerebrumbiologyacademy',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    award: person.achievements,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
    />
  )
}

function extractAlumniOf(qualification: string): object[] {
  const alumni: object[] = []
  if (qualification.toLowerCase().includes('aiims')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'All India Institute of Medical Sciences (AIIMS)',
    })
  }
  if (qualification.toLowerCase().includes('jnu')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'Jawaharlal Nehru University (JNU)',
    })
  }
  if (qualification.toLowerCase().includes('iisc')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'Indian Institute of Science (IISc)',
    })
  }
  if (qualification.toLowerCase().includes('bhu')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'Banaras Hindu University (BHU)',
    })
  }
  if (qualification.toLowerCase().includes('tifr')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'Tata Institute of Fundamental Research (TIFR)',
    })
  }
  if (qualification.toLowerCase().includes('du')) {
    alumni.push({
      '@type': 'EducationalOrganization',
      name: 'University of Delhi (DU)',
    })
  }
  return alumni
}

interface FacultyListSchemaProps {
  faculty: Faculty[]
  organizationName?: string
  organizationUrl?: string
}

export function FacultyListSchema({
  faculty,
  organizationName = 'Cerebrum Biology Academy',
  organizationUrl = 'https://cerebrumbiologyacademy.com',
}: FacultyListSchemaProps) {
  const itemListData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Faculty at Cerebrum Biology Academy',
    description:
      'Expert NEET Biology faculty including AIIMS doctors, PhD researchers, and experienced educators',
    itemListElement: faculty.map((person, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: person.name,
        jobTitle: person.designation,
        description: person.bio,
        image: person.image,
        worksFor: {
          '@type': 'EducationalOrganization',
          name: organizationName,
          url: organizationUrl,
        },
        knowsAbout: person.specialization,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
    />
  )
}
