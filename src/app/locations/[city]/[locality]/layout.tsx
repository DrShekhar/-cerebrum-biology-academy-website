export default async function LocalityLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ city: string; locality: string }>
}) {
  const { city, locality } = await params

  const formatName = (slug: string) =>
    slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

  const cityName = formatName(city)
  const localityName = formatName(locality)

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
        name: 'Locations',
        item: 'https://cerebrumbiologyacademy.com/locations',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cityName,
        item: `https://cerebrumbiologyacademy.com/locations/${city}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: localityName,
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
