import { notFound } from 'next/navigation'
import { facultyMembers } from '@/data/faculty'
import { FacultyProfile } from '@/components/faculty/FacultyProfile'

interface Props {
  params: { facultyId: string }
}

export async function generateMetadata({ params }: Props) {
  const faculty = facultyMembers.find((f) => f.id === params.facultyId)

  if (!faculty) {
    return {
      title: 'Faculty Not Found',
    }
  }

  return {
    title: `${faculty.name} - ${faculty.designation} | Cerebrum Biology Academy`,
    description: `Meet ${faculty.name}, ${faculty.qualification} with ${faculty.experience} experience. Expert in ${faculty.specialization.join(', ')}. ${faculty.bio}`,
    keywords: `${faculty.name}, ${faculty.designation}, biology faculty, NEET teacher, ${faculty.specialization.join(', ')}, medical coaching`,
  }
}

export default function FacultyProfilePage({ params }: Props) {
  const faculty = facultyMembers.find((f) => f.id === params.facultyId)

  if (!faculty) {
    notFound()
  }

  return <FacultyProfile facultyId={params.facultyId} />
}
