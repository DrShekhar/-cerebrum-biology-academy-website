import type { Metadata } from 'next'
import ALevelBoardTemplate from '@/components/a-level/ALevelBoardTemplate'
import { A_LEVEL_BOARD_BY_SLUG } from '@/data/a-level/boards'

const board = A_LEVEL_BOARD_BY_SLUG['cambridge-international']
const SITE_URL = 'https://cerebrumbiologyacademy.com'
const url = `${SITE_URL}/cambridge-international-a-level-biology-tutor`

export const metadata: Metadata = {
  title: `${board.board} A-Level Biology Tutor (${board.specCode}) | Cerebrum Biology Academy`,
  description: `Specialist ${board.boardFull} A-Level Biology tuition with AIIMS-trained faculty. Live small-batch classes mapped to the ${board.specCode} papers, required practicals and exam technique. Free assessment, open worldwide.`,
  keywords: [
    `${board.board} A-level biology tutor`,
    `${board.board} biology ${board.specCode}`,
    `A-level biology tuition ${board.board}`,
    `${board.board} biology online tutor`,
    `${board.board} A-level biology revision`,
    'A-level biology examiner',
  ],
  alternates: { canonical: url },
  openGraph: {
    title: `${board.board} A-Level Biology Tutor (${board.specCode}) · Cerebrum Biology Academy`,
    description: `Specialist ${board.board} A-Level Biology (${board.specCode}) tuition — paper-by-paper coverage, required practicals, exam technique. AIIMS-trained faculty.`,
    url,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: `${board.board} A-Level Biology Tutor (${board.specCode})`,
    description: `Specialist ${board.board} A-Level Biology tuition, AIIMS-trained faculty, live small-batch classes.`,
  },
  robots: 'index, follow, max-image-preview:large',
}

export default function Page() {
  return <ALevelBoardTemplate board={board} />
}
