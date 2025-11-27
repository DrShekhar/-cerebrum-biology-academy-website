import { ComingSoonPage } from '@/components/ui/ComingSoonPage'

const programNames: Record<string, string> = {
  'neet-crash-course': 'NEET Crash Course',
  'neet-repeater': 'NEET Repeater Program',
  'class-11-foundation': 'Class 11 Foundation',
  'class-12-intensive': 'Class 12 Intensive',
  'dropper-batch': 'Dropper Batch',
  'online-live': 'Online Live Classes',
  hybrid: 'Hybrid Learning Program',
  weekend: 'Weekend Batch',
  'neet-ug': 'NEET UG Program',
  'neet-pg': 'NEET PG Program',
  boards: 'Board Exam Preparation',
  olympiad: 'Biology Olympiad',
  cuet: 'CUET Biology',
  'test-series': 'Test Series',
  'doubt-clearing': 'Doubt Clearing Sessions',
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const programSlug = slug?.[0] || 'unknown'
  const programName = programNames[programSlug] || 'This Program'

  return (
    <ComingSoonPage
      title={`${programName}`}
      description={`The ${programName} page is currently under development. We are working on bringing you comprehensive course details, schedules, and enrollment options.`}
    />
  )
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const programSlug = params.slug?.[0] || 'unknown'
  const programName = programNames[programSlug] || 'Program'

  return {
    title: `${programName} - Coming Soon | Cerebrum Biology Academy`,
    description: `${programName} page is coming soon. Stay tuned for updates about our ${programName.toLowerCase()}.`,
  }
}
