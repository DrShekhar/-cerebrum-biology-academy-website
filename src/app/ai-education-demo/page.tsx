import React from 'react'
import { Metadata } from 'next'
import CeriAIShowcase from './CeriAIShowcase'

export const metadata: Metadata = {
  title: 'Ceri AI - Next-Gen NEET Biology Tutor',
  description:
    'Experience Ceri AI - the most advanced AI-powered Biology tutor for NEET preparation. 24/7 instant doubt resolution, visual explanations, voice interaction, and personalized learning.',
  keywords: [
    'Ceri AI',
    'AI Biology Tutor',
    'NEET AI',
    'AI education',
    'NEET preparation',
    'Biology AI',
    'personalized learning',
    'AI tutoring',
    'instant doubt resolution',
  ],
  openGraph: {
    title: 'Ceri AI - Next-Gen NEET Biology Tutor',
    description: 'The most advanced AI-powered Biology tutor for NEET aspirants',
    type: 'website',
  },
}

export default function AIEducationDemo() {
  return <CeriAIShowcase />
}
