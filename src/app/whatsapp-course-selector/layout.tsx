import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Course Selector — Find Your Perfect NEET Biology Program | Cerebrum Biology Academy',
  description:
    'Choose from 15+ Biology coaching programs for Class 9–12 & Droppers. AIIMS doctor-led teaching, small batches (max 12–16), offline + online. 695/720 NEET topper produced. Rohini, Gurugram, South Delhi & Online.',
  keywords: [
    'NEET biology coaching',
    'best biology coaching Delhi',
    'NEET dropper batch',
    'Class 11 NEET biology',
    'Class 12 NEET biology',
    'Cerebrum Biology Academy courses',
    'AIIMS doctor biology coaching',
    'small batch NEET coaching',
    'NEET PCB coaching Delhi',
    'biology coaching Rohini',
    'biology coaching Gurugram',
    'biology coaching South Delhi',
  ],
  openGraph: {
    title: 'Cerebrum Academy — Course Selector',
    description:
      'Find the perfect NEET Biology program. AIIMS doctor-led teaching. 695/720 NEET topper produced. Class 9–12 & Dropper batches.',
    type: 'website',
    url: 'https://www.cerebrumbiologyacademy.com/whatsapp-course-selector',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Course Selector — Find Your Perfect NEET Biology Program | Cerebrum Biology Academy',
    description: 'Choose from 15+ Biology coaching programs for Class 9–12 & Droppers.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/whatsapp-course-selector',
  },
};

export default function WhatsAppCourseSelectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
