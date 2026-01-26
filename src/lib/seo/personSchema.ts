// src/lib/seo/personSchema.ts
// Person Schema for Faculty - E-E-A-T Enhancement

interface FacultyData {
  name: string
  jobTitle: string
  description: string
  image: string
  email?: string
  telephone?: string
  url: string
  sameAs?: string[] // Social media profiles
  education: Array<{
    name: string
    institution: string
    year?: string
  }>
  awards?: string[]
  specializations: string[]
  experience: string
}

/**
 * Generate Person schema for faculty members
 * Enhances E-E-A-T signals for Google
 */
export function generateFacultySchema(faculty: FacultyData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: faculty.name,
    jobTitle: faculty.jobTitle,
    description: faculty.description,
    image: faculty.image,
    url: faculty.url,
    ...(faculty.email && { email: faculty.email }),
    ...(faculty.telephone && { telephone: faculty.telephone }),
    ...(faculty.sameAs && faculty.sameAs.length > 0 && { sameAs: faculty.sameAs }),
    alumniOf: faculty.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      ...(edu.year && { foundingDate: edu.year }),
    })),
    ...(faculty.awards && faculty.awards.length > 0 && { award: faculty.awards }),
    knowsAbout: faculty.specializations,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    hasCredential: faculty.education.map((edu) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: edu.name,
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: edu.institution,
      },
    })),
  }
}

// Pre-configured faculty members
export const facultyMembers: FacultyData[] = [
  {
    name: 'Dr. Shekhar C Singh',
    jobTitle: 'Founder & Lead NEET Biology Faculty',
    description:
      "Dr. Shekhar C Singh is the founder of Cerebrum Biology Academy and has 14+ years of experience in NEET Biology coaching. An AIIMS New Delhi alumnus, he has helped over 500 students secure admissions to top medical colleges including AIIMS, JIPMER, and state medical colleges. His 'Concept-First Approach' has revolutionized Biology teaching for NEET preparation.",
    image: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh.jpg',
    email: 'drshekhar@cerebrumbiologyacademy.com',
    url: 'https://cerebrumbiologyacademy.com/faculty/dr-shekhar-singh',
    sameAs: ['https://www.linkedin.com/in/drshekharsingh', 'https://twitter.com/DrShekharBio'],
    education: [
      {
        name: 'MBBS',
        institution: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
        year: '2008',
      },
      {
        name: 'BSc in Biology',
        institution: 'Delhi University',
        year: '2004',
      },
    ],
    awards: [
      'Best Biology Teacher Award 2022 - Education Excellence Foundation',
      'NEET Educator of the Year 2023 - Medical Entrance Awards',
      'Top NEET Coaching Institute Delhi 2023 - Education Today',
    ],
    specializations: [
      'Human Physiology',
      'Genetics and Evolution',
      'Molecular Biology',
      'Biotechnology',
      'NEET Biology',
    ],
    experience: '14+ years',
  },
  {
    name: 'Dr. Priya Sharma',
    jobTitle: 'Senior Faculty - Botany Specialist',
    description:
      'Dr. Priya Sharma is a Botany specialist with a PhD from Jawaharlal Nehru University. With 8 years of teaching experience, she specializes in Plant Physiology, Ecology, and Plant Diversity. Her research background brings depth to NEET Biology preparation.',
    image: 'https://cerebrumbiologyacademy.com/faculty/dr-priya-sharma.jpg',
    url: 'https://cerebrumbiologyacademy.com/faculty/dr-priya-sharma',
    education: [
      {
        name: 'PhD in Botany',
        institution: 'Jawaharlal Nehru University (JNU)',
        year: '2016',
      },
      {
        name: 'MSc in Botany',
        institution: 'Delhi University',
        year: '2012',
      },
    ],
    specializations: [
      'Plant Physiology',
      'Ecology and Environment',
      'Plant Diversity',
      'Cell Biology',
      'Plant Anatomy',
    ],
    experience: '8 years',
  },
  {
    name: 'Dr. Amit Kumar',
    jobTitle: 'Senior Faculty - Zoology & Human Physiology Specialist',
    description:
      'Dr. Amit Kumar brings a unique medical perspective to NEET Biology teaching. With an MBBS from Maulana Azad Medical College and MD in Physiology from Lady Hardinge Medical College, he makes complex Human Physiology topics easy to understand.',
    image: 'https://cerebrumbiologyacademy.com/faculty/dr-amit-kumar.jpg',
    url: 'https://cerebrumbiologyacademy.com/faculty/dr-amit-kumar',
    education: [
      {
        name: 'MD in Physiology',
        institution: 'Lady Hardinge Medical College (LHMC)',
        year: '2020',
      },
      {
        name: 'MBBS',
        institution: 'Maulana Azad Medical College (MAMC)',
        year: '2017',
      },
    ],
    specializations: [
      'Human Physiology',
      'Human Reproduction',
      'Neural Control and Coordination',
      'Circulatory System',
      'Excretory System',
    ],
    experience: '6 years',
  },
]

/**
 * Generate all faculty schemas
 */
export function generateAllFacultySchemas() {
  return facultyMembers.map((faculty) => generateFacultySchema(faculty))
}

/**
 * Generate Author schema for blog posts
 */
export function generateAuthorSchema(authorName: string, authorUrl?: string) {
  const faculty = facultyMembers.find((f) => f.name === authorName)

  if (faculty) {
    return generateFacultySchema(faculty)
  }

  // Default author schema for non-faculty authors
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: authorName,
    url: authorUrl || 'https://cerebrumbiologyacademy.com/blog',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }
}
