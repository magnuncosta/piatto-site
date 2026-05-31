import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Playfair_Display, Lora, Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { getSiteConfig } from '@/lib/supabase'

const GA_ID = 'G-CCZFVWEF2G'

// Fontes de títulos
const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--ff-cormorant', weight: ['300', '400', '500', '600'] })
const playfair  = Playfair_Display({ subsets: ['latin'], variable: '--ff-playfair',  weight: ['400', '500', '600', '700'] })
const lora      = Lora({ subsets: ['latin'], variable: '--ff-lora', weight: ['400', '500', '600'] })

// Fontes de corpo
const inter   = Inter({ subsets: ['latin'], variable: '--ff-inter' })
const poppins = Poppins({ subsets: ['latin'], variable: '--ff-poppins', weight: ['300', '400', '500', '600'] })

const HEADING_FONTS: Record<string, string> = {
  cormorant: 'var(--ff-cormorant)',
  playfair:  'var(--ff-playfair)',
  lora:      'var(--ff-lora)',
}
const BODY_FONTS: Record<string, string> = {
  inter:   'var(--ff-inter)',
  poppins: 'var(--ff-poppins)',
}

const BASE_URL = 'https://piattoplanejados.com.br'

export const revalidate = 60

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig()

  const accent      = config.theme_color_accent  || '#C4A882'
  const ink         = config.theme_color_ink     || '#1C1917'
  const bg          = config.theme_color_bg      || '#FAFAF8'
  const muted       = config.theme_color_muted   || '#78716C'
  const headingFont = HEADING_FONTS[config.theme_font_heading || 'cormorant'] || HEADING_FONTS.cormorant
  const bodyFont    = BODY_FONTS[config.theme_font_body || 'inter'] || BODY_FONTS.inter

  const themeCSS = `
    :root {
      --accent: ${accent};
      --accent-dark: color-mix(in srgb, ${accent} 80%, #000);
      --ink: ${ink};
      --bg: ${bg};
      --muted: ${muted};
      --surface: color-mix(in srgb, ${bg} 70%, #fff);
      --border: color-mix(in srgb, ${bg} 30%, #ccc);
      --font-heading: ${headingFont};
      --font-body: ${bodyFont};
    }
  `

  const fontClasses = [
    cormorant.variable,
    playfair.variable,
    lora.variable,
    inter.variable,
    poppins.variable,
  ].join(' ')

  return (
    <html lang="pt-BR" className={fontClasses}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-body, var(--ff-inter)), system-ui, sans-serif' }}>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
        {children}
      </body>
    </html>
  )
}
