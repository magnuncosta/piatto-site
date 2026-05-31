import Header       from '@/components/Header'
import Hero         from '@/components/Hero'
import Stats        from '@/components/Stats'
import Portfolio    from '@/components/Portfolio'
import Services     from '@/components/Services'
import About        from '@/components/About'
import Process      from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import ContactCTA   from '@/components/ContactCTA'
import Footer       from '@/components/Footer'
import WhatsAppBtn  from '@/components/WhatsAppBtn'
import { getSiteConfig, getPortfolio } from '@/lib/supabase'

export const revalidate = 60 // revalida os dados a cada 60s

export default async function Home() {
  const [config, portfolio] = await Promise.all([getSiteConfig(), getPortfolio()])

  return (
    <>
      <Header logoUrl={config.logo_url} />
      <main>
        <Hero titulo={config.hero_titulo} subtitulo={config.hero_subtitulo} />
        <Stats />
        <Portfolio items={portfolio} />
        <Services />
        <About texto1={config.sobre_texto_1} texto2={config.sobre_texto_2} />
        <Process />
        <Testimonials />
        <ContactCTA
          whatsapp={config.whatsapp}
          telefone={config.telefone}
          email={config.email}
          endereco={config.endereco}
          bgUrl={config.contact_bg_url}
        />
      </main>
      <Footer
        whatsapp={config.whatsapp}
        telefone={config.telefone}
        email={config.email}
        endereco={config.endereco}
        instagram={config.instagram_url}
        facebook={config.facebook_url}
        logoUrl={config.logo_url}
      />
      <WhatsAppBtn whatsapp={config.whatsapp} />
    </>
  )
}
