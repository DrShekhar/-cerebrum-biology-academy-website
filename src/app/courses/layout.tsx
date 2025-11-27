import Script from 'next/script'

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Razorpay payment script - loaded on course pages for enrollment */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </>
  )
}
