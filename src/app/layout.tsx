import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/seo/StructuredData'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerebrumbiologyacademy.com'),
  title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
  description:
    'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored. Online & offline classes for Class 11th, 12th & droppers across 50+ countries.',
  keywords:
    'NEET biology coaching, AIIMS faculty, biology coaching institute, NEET preparation, medical entrance coaching, biology classes, NEET 2025, online biology coaching',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  creator: 'Cerebrum Biology Academy',
  publisher: 'Cerebrum Biology Academy',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com',
    siteName: 'Cerebrum Biology Academy',
    title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
    description:
      'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored. Online & offline classes for Class 11th, 12th & droppers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - Best NEET Biology Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cerebrum Biology Academy | Best NEET Biology Coaching Institute',
    description:
      'Top NEET Biology coaching by AIIMS experts. 98% success rate, 2000+ students mentored worldwide.',
    images: ['/og-image.jpg'],
    creator: '@cerebrumbiology',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com',
  },
  category: 'Education',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
