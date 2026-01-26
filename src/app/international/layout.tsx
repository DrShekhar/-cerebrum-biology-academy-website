import { COUNTRIES, SUPPORTED_COUNTRIES } from '@/lib/international/countries'

interface InternationalLayoutProps {
  children: React.ReactNode
}

export default function InternationalLayout({ children }: InternationalLayoutProps) {
  return (
    <>
      {/* Hreflang tags for international SEO */}
      <head>
        {/* Individual country pages */}
        {SUPPORTED_COUNTRIES.map((code) => {
          const country = COUNTRIES[code]
          return (
            <link
              key={code}
              rel="alternate"
              hrefLang={country.hreflang}
              href={`https://cerebrumacademy.com/international/${code}/`}
            />
          )
        })}
        {/* Default fallback */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://cerebrumacademy.com/international/"
        />
      </head>
      {children}
    </>
  )
}
