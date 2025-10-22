import { BasicCourse } from '@/types'

export const courses: BasicCourse[] = [
  {
    id: 'neet-2025-11th',
    title: 'NEET 2025 - Class 11th',
    description:
      'Complete foundation course for Class 11th students starting their NEET journey. Covers full syllabus with conceptual clarity.',
    duration: '2 Years',
    price: 75000,
    targetClass: '11th',
    features: [
      'Live Interactive Classes',
      'Complete Study Material',
      'Weekly Tests & Analysis',
      'Doubt Resolution Sessions',
      'Previous Year Questions',
      'Mock Tests & Rank Prediction',
      'Personal Mentorship',
      'Biology Lab Sessions',
    ],
  },
  {
    id: 'neet-2025-12th',
    title: 'NEET 2025 - Class 12th',
    description:
      'Intensive program for Class 12th students with focus on both boards and NEET preparation simultaneously.',
    duration: '1 Year',
    price: 65000,
    targetClass: '12th',
    features: [
      'Dual Preparation (Board + NEET)',
      'Advanced Biology Concepts',
      'Speed & Accuracy Training',
      'All India Test Series',
      'Strategy Sessions',
      'Revision Modules',
      'Expert Faculty Guidance',
      'Performance Analytics',
    ],
  },
  {
    id: 'neet-2025-dropper',
    title: 'NEET 2025 - Dropper Batch',
    description:
      'Specialized crash course for students who want to improve their NEET score. Intensive preparation with proven results.',
    duration: '1 Year',
    price: 55000,
    targetClass: 'Dropper',
    features: [
      'Complete Syllabus Revision',
      'High-Yield Topics Focus',
      'Intensive Test Series',
      'Score Improvement Strategy',
      'Weakness Analysis',
      'Time Management Training',
      'Motivational Sessions',
      'Success Guarantee Program',
    ],
  },
  {
    id: 'neet-2026-early-bird',
    title: 'NEET 2026 - Early Bird',
    description:
      'Get ahead with our early preparation program. Perfect for motivated Class 10th passed students.',
    duration: '2.5 Years',
    price: 85000,
    targetClass: '11th',
    features: [
      'Foundation Building',
      'Conceptual Learning',
      'Gradual Difficulty Increase',
      'Long-term Strategy',
      'Regular Assessments',
      'Career Counseling',
      'Biology Olympiad Training',
      'Research Project Guidance',
    ],
  },
]

export const courseCategories = [
  {
    id: 'classroom',
    name: 'Classroom Program',
    description: 'Traditional face-to-face learning with expert faculty',
    icon: 'Users',
  },
  {
    id: 'online',
    name: 'Online Live Classes',
    description: 'Interactive online sessions from anywhere',
    icon: 'Monitor',
  },
  {
    id: 'hybrid',
    name: 'Hybrid Learning',
    description: 'Best of both classroom and online learning',
    icon: 'Smartphone',
  },
]
