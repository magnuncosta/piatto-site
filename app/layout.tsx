import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
})

const BASE_URL = 'https://piattoplanejados.com.br'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Piatto Planejados — Móveis Planejados sob Medida em Niterói e RJ',
    template: '%s | Piatto Planejados',
  },
  description: 'Móveis planejados sob medida para cozinhas, dormitórios, salas e home offices em Niterói, Rio de Janeiro e Grande Rio. Fabricação própria, projeto exclusivo e instalação com garantia.',
  keywords: [
    'móveis planejados', 'marcenaria', 'móveis sob medida',
    'cozinha planejada', 'dormitório planejado', 'home office planejado',
    'Niterói', 'Rio de Janeiro', 'Grande Rio', 'Piatto Planejados',
  ],
  authors: [{ name: 'Piatto Planejados' }],
  creator: 'Piatto Planejados',
  publisher: 'Piatto Planejados',
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Piatto Planejados',
    title: 'Piatto Planejados — Móveis Planejados sob Medida em Niterói e RJ',
    description: 'Móveis planejados sob medida com fabricação própria. Cozinhas, dormitórios, salas e home offices. Atendemos Niterói, Rio de Janeiro e Grande Rio.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Piatto Planejados — Móveis sob Medida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Piatto Planejados — Móveis Planejados sob Medida',
    description: 'Móveis planejados sob medida com fabricação própria em Niterói e RJ.',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BASE_URL,
  name: 'Piatto Planejados',
  description: 'Móveis planejados sob medida para cozinhas, dormitórios, salas e home offices.',
  url: BASE_URL,
  telephone: '+5521969530979',
  email: 'contato@piattoplanejados.com.br',
  image: `${BASE_URL}/og-image.jpg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Niterói',
    addressRegion: 'RJ',
    addressCountry: 'BR',
  },
  areaServed: [
    { '@type': 'City', name: 'Niterói' },
    { '@type': 'City', name: 'Rio de Janeiro' },
    { '@type': 'AdministrativeArea', name: 'Grande Rio' },
  ],
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
