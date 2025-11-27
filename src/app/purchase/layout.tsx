import Script from 'next/script'

export default function PurchaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Razorpay payment script - only loaded on purchase pages */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
    </>
  )
}
