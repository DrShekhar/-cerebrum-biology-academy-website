export default async function NEETCoachingLocationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ location: string }>
}) {
  const { location } = await params

  const locationName = location
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: locationName,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
