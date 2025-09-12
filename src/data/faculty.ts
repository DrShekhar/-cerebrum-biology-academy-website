import { Faculty } from '@/types'

export const facultyMembers: Faculty[] = [
  {
    id: '1',
    name: 'Biology Department Head',
    qualification: 'MBBS (AIIMS), MD (Anatomy)',
    experience: '15+ years',
    specialization: ['Human Anatomy', 'Physiology', 'NEET Strategy'],
    image: '/faculty/head-faculty.jpg',
  },
  {
    id: '2',
    name: 'Senior Botany Faculty',
    qualification: 'MSc Botany, PhD Plant Physiology',
    experience: '12+ years',
    specialization: ['Plant Biology', 'Ecology', 'Genetics'],
    image: '/faculty/botany-faculty.jpg',
  },
  {
    id: '3',
    name: 'Zoology Specialist',
    qualification: 'MBBS (AIIMS), MS Surgery',
    experience: '10+ years',
    specialization: ['Animal Physiology', 'Human Biology'],
    image: '/faculty/zoology-faculty.jpg',
  },
  {
    id: '4',
    name: 'Genetics Expert',
    qualification: 'MSc Genetics, PhD Molecular Biology',
    experience: '8+ years',
    specialization: ['Genetics', 'Molecular Biology', 'Evolution'],
    image: '/faculty/genetics-faculty.jpg',
  },
  {
    id: '5',
    name: 'Cell Biology Faculty',
    qualification: 'MSc Biochemistry, PhD Cell Biology',
    experience: '11+ years',
    specialization: ['Cell Biology', 'Biochemistry', 'Biophysics'],
    image: '/faculty/cell-biology-faculty.jpg',
  },
  {
    id: '6',
    name: 'Environmental Biology Expert',
    qualification: 'MSc Environmental Science, PhD Ecology',
    experience: '9+ years',
    specialization: ['Environmental Biology', 'Biodiversity'],
    image: '/faculty/environmental-faculty.jpg',
  },
]

export const facultyStats = [
  {
    number: '50+',
    label: 'Expert Faculty',
    description: 'PhD & Medical Graduates',
  },
  {
    number: '20+',
    label: 'AIIMS Alumni',
    description: 'Teaching Excellence',
  },
  {
    number: '15+',
    label: 'Average Experience',
    description: 'Years in NEET Coaching',
  },
  {
    number: '98%',
    label: 'Success Rate',
    description: 'Student Achievement',
  },
]

export const facultyHighlights = [
  'AIIMS and top medical college graduates',
  'PhD holders from premier institutes',
  'Combined 100+ years of teaching experience',
  'Expert NEET question paper analysis',
  'Research-backed teaching methodologies',
  'Personalized student mentoring approach',
]
