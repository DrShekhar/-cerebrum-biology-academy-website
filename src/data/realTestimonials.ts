export interface RealTestimonial {
  id: string
  studentName: string
  score: string
  achievement: string
  youtubeId: string
  thumbnail: string
  year: number
  college?: string
  quote: string
}

export const realTestimonials: RealTestimonial[] = [
  {
    id: 'sadhna-sirin',
    studentName: 'Sadhna Sirin',
    score: '695/720',
    achievement: 'Delhi-NCR Topper NEET 2023 | 100 Percentile Biology',
    youtubeId: 'bk6wQCh6b9w',
    thumbnail: 'https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg',
    year: 2023,
    quote:
      "Dr. Shekhar Sir's unique teaching methods helped me achieve perfection in Biology. His conceptual approach made complex topics simple.",
  },
  {
    id: 'priya-sehgal',
    studentName: 'Priya Sehgal',
    score: '360/360',
    achievement: 'Perfect Biology Score',
    youtubeId: '',
    thumbnail: '',
    year: 2023,
    quote:
      "Scored full marks in Biology thanks to Dr. Shekhar Sir's focused teaching and strategic preparation methods.",
  },
  {
    id: 'abhisek',
    studentName: 'Abhisek',
    score: 'AFMC Selection',
    achievement: 'Armed Forces Medical College',
    youtubeId: 'NfhkGqOQXzk',
    thumbnail: 'https://i.ytimg.com/vi/NfhkGqOQXzk/hqdefault.jpg',
    year: 2023,
    college: 'AFMC Pune',
    quote: 'The rigorous preparation and personal mentoring at Cerebrum helped me crack AFMC.',
  },
  {
    id: 'nishita',
    studentName: 'Nishita',
    score: 'Medical College Selection',
    achievement: '6-Month Intensive Program Success',
    youtubeId: 't5F8RBuHITM',
    thumbnail: 'https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg',
    year: 2023,
    quote: 'The intensive program transformed my Biology preparation completely in just 6 months.',
  },
]
