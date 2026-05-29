import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Piatto Planejados — Móveis que transformam ambientes',
  description: 'Móveis planejados sob medida para cozinhas, dormitórios, salas e home offices. Qualidade, design e acabamento premium.',
  keywords: 'móveis planejados, marcenaria, cozinha planejada, dormitório planejado, Niterói',
  openGraph: {
    title: 'Piatto Planejados',
    description: 'Móveis planejados sob medida com design exclusivo.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
