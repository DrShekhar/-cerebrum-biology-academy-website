import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { StructuredData } from '@/components/seo/StructuredData'
import { PageErrorBoundary } from '@/components/ErrorBoundary'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import { WebVitalsReporter } from '@/components/analytics/WebVitalsReporter'
// PERFORMANCE: Using hybrid header for faster mobile LCP
// Server-rendered shell with lazy-loaded interactivity
import { HeaderHybrid } from '@/components/layout/HeaderHybrid'
import { AuthProvider } from '@/contexts/AuthContext'
import { I18nProvider } from '@/contexts/I18nContext'
import { ToastProvider } from '@/components/ui/Toast'
import { TrustProvider } from '@/components/providers/TrustProvider'
import { PersonalizationProvider } from '@/components/providers/PersonalizationProvider'
import { SkipToContent } from '@/components/accessibility/SkipToContent'
import { FocusVisibleStyles } from '@/components/accessibility/FocusVisibleStyles'
import {
  FloatingCTA,
  GlobalExitIntent,
  ChatbotWrapper,
  DynamicFooter,
  DynamicMobileNavigation,
  DynamicPWAProvider,
  DynamicTrialBanner,
  DynamicMaintenancePopup,
} from '@/components/layout/DynamicComponents'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Optimize font loading
  preload: true, // Preload critical font
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Not used on initial render
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cerebrumbiologyacademy.com'),
  title: {
    default: '#1 NEET Biology Coaching 2025 | 98% Success Rate | Free Demo',
    template: '%s | Cerebrum Biology Academy',
  },
  description:
    'Best NEET Biology coaching by AIIMS faculty. 98% success rate, 500+ selections. Online & offline classes in Delhi NCR. Class 11, 12 & droppers. Book FREE demo today!',
  keywords:
    'NEET biology coaching, NEET coaching India, best NEET coaching Delhi NCR, NEET coaching Laxmi Nagar, NEET coaching Dwarka, NEET coaching Noida, NEET coaching Gurgaon, online NEET coaching India, NEET coaching Kota alternative, NEET coaching Hyderabad, NEET coaching Bangalore, NEET coaching Mumbai, NEET coaching Chennai, AIIMS faculty, biology coaching institute, NEET preparation, medical entrance coaching Delhi, biology classes Delhi, NEET 2026 coaching, NEET 2026 coaching, online biology coaching, zoology coaching, botany coaching, human physiology, genetics coaching, ecology NEET, best biology teacher India, biology online classes India, NEET crash course, NEET dropper batch, Class 11 biology coaching, Class 12 biology coaching, affordable NEET coaching, small batch NEET coaching, NEET mock tests, NEET study material, NCERT biology NEET, NEET coaching near me, top 10 NEET coaching India, best NEET coaching 2025',
  authors: [{ name: 'Cerebrum Biology Academy' }],
  creator: 'Cerebrum Biology Academy',
  publisher: 'Cerebrum Biology Academy',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com',
    siteName: 'Cerebrum Biology Academy',
    title: '#1 NEET Biology Coaching 2025 | 98% Success | AIIMS Faculty',
    description:
      'Top NEET Biology coaching by AIIMS experts. 98% success rate, 500+ medical selections. Online & offline classes in Delhi NCR. Book FREE demo!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - #1 NEET Biology Coaching with 98% Success Rate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '#1 NEET Biology Coaching 2025 | 98% Success Rate',
    description:
      'Top NEET Biology coaching by AIIMS faculty. 98% success rate, 500+ selections. Online & offline in Delhi NCR. FREE demo!',
    images: ['/og-image.jpg'],
    creator: '@cerebrumbiology',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com',
    types: {
      'application/rss+xml': '/blog/feed.xml',
    },
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
        <meta
          name="google-site-verification"
          content="L6c1LAGqVg_qEAtFGDcbzqeMzqFdEwT7kKFDgfn2-Sc"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width, Save-Data" />

        {/* Performance: Preconnect to critical domains - ORDER MATTERS */}
        {/* Google Fonts - CRITICAL for reducing render blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Self-origin preconnect for faster CSS/JS loading */}
        <link rel="preconnect" href="https://cerebrumbiologyacademy.com" />
        <link rel="preconnect" href="https://cerebrumbiologyacademy.com" crossOrigin="anonymous" />
        {/* Vercel CDN for static assets */}
        <link rel="preconnect" href="https://vercel.live" />
        {/* Third-party services - PERFORMANCE: GTM preconnect removed since script uses lazyOnload */}
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="//checkout.razorpay.com" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="dns-prefetch" href="//giscus.app" />
        <link rel="dns-prefetch" href="//i.ytimg.com" />
        <link rel="dns-prefetch" href="//assets.zyrosite.com" />

        {/* Performance: Preload critical images */}
        <link rel="preload" href="/brain-logo.webp" as="image" type="image/webp" />

        {/* Fonts are handled by next/font/google - no manual preload needed */}

        <meta httpEquiv="Content-Language" content="en-IN,hi-IN" />
        <meta name="language" content="English,Hindi" />

        {/* hreflang tags for India-specific SEO */}
        <link rel="alternate" hrefLang="en-IN" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="hi-IN" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="en" href="https://cerebrumbiologyacademy.com" />
        <link rel="alternate" hrefLang="x-default" href="https://cerebrumbiologyacademy.com" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Cerebrum Biology" />
        <meta name="application-name" content="Cerebrum Biology Academy" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Brain Logo Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon-32x32.png" />

        {/* Critical CSS for instant LCP - header and hero above-the-fold styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical render path - inline essential styles */
              *,::before,::after{box-sizing:border-box}
              html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:system-ui,-apple-system,sans-serif}
              body{margin:0;line-height:inherit}
              /* Header critical styles */
              header{background:rgba(255,255,255,.95);position:sticky;top:0;z-index:50;backdrop-filter:blur(8px)}
              .text-slate-900{color:#0f172a}
              .text-slate-600{color:#475569}
              .text-2xl{font-size:1.5rem;line-height:2rem}
              .text-xl{font-size:1.25rem;line-height:1.75rem}
              .text-lg{font-size:1.125rem;line-height:1.75rem}
              .text-base{font-size:1rem;line-height:1.5rem}
              .text-sm{font-size:.875rem;line-height:1.25rem}
              .text-xs{font-size:.75rem;line-height:1rem}
              .leading-none{line-height:1}
              .leading-tight{line-height:1.25}
              .tracking-wide{letter-spacing:.025em}
              .antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
              /* Layout critical */
              .flex{display:flex}
              .items-center{align-items:center}
              .justify-between{justify-content:space-between}
              .justify-center{justify-content:center}
              .max-w-7xl{max-width:80rem}
              .mx-auto{margin-left:auto;margin-right:auto}
              .px-4{padding-left:1rem;padding-right:1rem}
              .py-2{padding-top:.5rem;padding-bottom:.5rem}
              .py-4{padding-top:1rem;padding-bottom:1rem}
              .mb-4{margin-bottom:1rem}
              .mb-6{margin-bottom:1.5rem}
              .gap-2{gap:.5rem}
              .gap-4{gap:1rem}
              /* Hero critical styles */
              .min-h-screen{min-height:100vh}
              .relative{position:relative}
              .absolute{position:absolute}
              .inset-0{inset:0}
              .overflow-hidden{overflow:hidden}
              .bg-gradient-to-br{background-image:linear-gradient(to bottom right,var(--tw-gradient-stops))}
              .from-blue-900{--tw-gradient-from:#1e3a8a;--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to,#1e3a8a00)}
              .via-purple-900{--tw-gradient-stops:var(--tw-gradient-from),#581c87,var(--tw-gradient-to,#581c8700)}
              .to-blue-900{--tw-gradient-to:#1e3a8a}
              .text-yellow-300{color:#fcd34d}
              .text-yellow-200{color:#fef08a}
              .text-green-300{color:#86efac}
              .text-green-100{color:#dcfce7}
              .text-blue-100{color:#dbeafe}
              .text-white{color:#fff}
              .font-bold{font-weight:700}
              .font-semibold{font-weight:600}
              .font-medium{font-weight:500}
              .rounded-full{border-radius:9999px}
              .rounded-lg{border-radius:.5rem}
              .bg-green-500\\/20{background-color:rgb(34 197 94/.2)}
              .border{border-width:1px}
              .border-green-300\\/30{border-color:rgb(134 239 172/.3)}
              .w-5{width:1.25rem}
              .h-5{height:1.25rem}
              .mr-2{margin-right:.5rem}
              /* Button critical */
              .bg-yellow-400{background-color:#facc15}
              .bg-white{background-color:#fff}
              .text-blue-900{color:#1e3a8a}
              .hover\\:bg-yellow-300:hover{background-color:#fde047}
              .px-6{padding-left:1.5rem;padding-right:1.5rem}
              .px-8{padding-left:2rem;padding-right:2rem}
              .py-3{padding-top:.75rem;padding-bottom:.75rem}
              .py-4{padding-top:1rem;padding-bottom:1rem}
              /* Animation - starts mostly visible to avoid LCP delay */
              @keyframes fade-in-up{from{opacity:.7;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
              .animate-fade-in-up{animation:fade-in-up .4s ease-out forwards}
              @keyframes pulse{50%{opacity:.5}}
              .animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}
              /* Responsive */
              @media(min-width:640px){.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}.sm\\:text-lg{font-size:1.125rem}}
              @media(min-width:768px){.md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}.md\\:text-xl{font-size:1.25rem}.md\\:pb-0{padding-bottom:0}}
              @media(min-width:1024px){.lg\\:text-5xl{font-size:3rem;line-height:1}.lg\\:-mt-20{margin-top:-5rem}}
              @media(min-width:1280px){.xl\\:text-6xl{font-size:3.75rem;line-height:1}}
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        <WebVitalsReporter />
        <DynamicPWAProvider />
        <FocusVisibleStyles />
        <I18nProvider>
          <AuthProvider>
            <ToastProvider>
              <TrustProvider
                enableSocialProof={false}
                enableTrustBadges={false}
                enableRealTimeUpdates={false}
              >
                <PersonalizationProvider>
                  <PageErrorBoundary>
                    <SkipToContent />
                    <div data-section="navigation" className="priority-immediate" role="banner">
                      <HeaderHybrid />
                    </div>
                    <DynamicTrialBanner />
                    <main id="main-content" role="main" className="min-h-screen pb-16 md:pb-0">
                      {children}
                    </main>
                    <div data-lazy="footer" className="priority-lazy" role="contentinfo">
                      <DynamicFooter />
                    </div>
                    <div data-section="mobile-navigation" className="priority-deferred">
                      <DynamicMobileNavigation />
                    </div>
                    <FloatingCTA />
                    <GlobalExitIntent />
                    <ChatbotWrapper />
                    <DynamicMaintenancePopup />
                  </PageErrorBoundary>
                </PersonalizationProvider>
              </TrustProvider>
            </ToastProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
// Build: 1765944827
