export type AnnouncementType =
  | 'EXAM_DATE'
  | 'ADMIT_CARD'
  | 'RESULT'
  | 'SYLLABUS_CHANGE'
  | 'APPLICATION'
  | 'GENERAL'

export interface NTAAnnouncement {
  id: string
  type: AnnouncementType
  date: string
  title: string
  description: string
  sourceLink: string
  isImportant: boolean
}

export const ntaAnnouncements: NTAAnnouncement[] = [
  {
    id: 'nta-2026-001',
    type: 'EXAM_DATE',
    date: '2026-01-28',
    title: 'NEET 2026 Exam Date Announced: May 4, 2026',
    description:
      'NTA has officially confirmed NEET UG 2026 will be held on May 4, 2026 in pen-and-paper (OMR) mode across India.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: true,
  },
  {
    id: 'nta-2026-002',
    type: 'APPLICATION',
    date: '2026-01-20',
    title: 'NEET 2026 Registration Window Opens February 1',
    description:
      'Online registration for NEET UG 2026 begins February 1 on neet.nta.nic.in. Last date to apply: March 7, 2026.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: true,
  },
  {
    id: 'nta-2026-003',
    type: 'SYLLABUS_CHANGE',
    date: '2026-01-15',
    title: 'NEET 2026 Syllabus: NCERT-Based, No Changes',
    description:
      'NTA confirms NEET 2026 syllabus remains based on NCERT Class 11 and 12 textbooks. No new topics added this year.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-004',
    type: 'GENERAL',
    date: '2026-01-10',
    title: 'NEET 2026 City Slip to Be Released in April',
    description:
      'Admit card city slips for NEET UG 2026 will be available for download in the second week of April 2026.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-005',
    type: 'ADMIT_CARD',
    date: '2026-01-05',
    title: 'NEET 2026 Admit Card: Expected Release in April',
    description:
      'NEET UG 2026 admit cards are expected to be released 15 days before the exam. Download from neet.nta.nic.in.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-006',
    type: 'APPLICATION',
    date: '2025-12-28',
    title: 'Correction Window Expected After Registration',
    description:
      'NTA usually opens a correction window 5-7 days after registration closes. Use it to fix form errors.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-007',
    type: 'EXAM_DATE',
    date: '2025-12-20',
    title: 'NEET 2026 Will Be Single-Day, Single-Shift Exam',
    description:
      'NTA confirms NEET UG 2026 will follow the traditional single-day, single-shift pattern from 2:00 PM to 5:20 PM.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-008',
    type: 'RESULT',
    date: '2025-12-15',
    title: 'NEET 2025 Final Answer Key Released',
    description:
      'NTA has released the final answer key for NEET UG 2025. Students can download from the official portal.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-009',
    type: 'GENERAL',
    date: '2025-12-10',
    title: 'NTA Helpline Now Available for NEET Queries',
    description:
      'Students can reach NTA helpline at 011-40759000 or email neet@nta.ac.in for any NEET 2026 related queries.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-010',
    type: 'SYLLABUS_CHANGE',
    date: '2025-12-01',
    title: 'NCERT Textbook Updates Do Not Affect NEET 2026',
    description:
      'Recent NCERT textbook revisions for Classes 11-12 Biology will NOT impact NEET 2026 exam content.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: true,
  },
  {
    id: 'nta-2026-011',
    type: 'EXAM_DATE',
    date: '2025-11-25',
    title: 'NEET 2026 Expected in May: Start Preparation Now',
    description:
      'Based on historical patterns, NEET 2026 is expected in the first week of May. Begin your focused preparation.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
  {
    id: 'nta-2026-012',
    type: 'GENERAL',
    date: '2025-11-15',
    title: 'NEET 2026: 13 Languages Available for Exam',
    description:
      'NEET UG 2026 will be conducted in 13 languages including English, Hindi, and regional languages.',
    sourceLink: 'https://neet.nta.nic.in/',
    isImportant: false,
  },
]
