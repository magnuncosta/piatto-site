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

export const revalidate = 60

export default async function Home() {
  const [config, portfolio] = await Promise.all([getSiteConfig(), getPortfolio()])

  const c = config

  const stats = [
    { number: c.stats_1_number || '12+',  label: c.stats_1_label || 'Anos de experiência' },
    { number: c.stats_2_number || '600+', label: c.stats_2_label || 'Projetos entregues' },
    { number: c.stats_3_number || '100%', label: c.stats_3_label || 'Fabricação própria' },
    { number: c.stats_4_number || '5★',   label: c.stats_4_label || 'Avaliação dos clientes' },
  ]

  const processSteps = [
    { n: '01', titulo: c.process_1_titulo || 'Consulta gratuita', texto: c.process_1_texto || 'Agendamos uma visita técnica sem compromisso para entender o seu espaço, seus gostos e as necessidades do ambiente.' },
    { n: '02', titulo: c.process_2_titulo || 'Projeto 3D',        texto: c.process_2_texto || 'Nossa equipe desenvolve um projeto personalizado com visualização em 3D para você aprovar cada detalhe antes da produção.' },
    { n: '03', titulo: c.process_3_titulo || 'Produção',          texto: c.process_3_texto || 'Tudo fabricado na nossa própria marcenaria com materiais selecionados, garantindo qualidade e precisão em cada peça.' },
    { n: '04', titulo: c.process_4_titulo || 'Instalação',        texto: c.process_4_texto || 'Nossa equipe técnica realiza a instalação completa com cuidado e atenção, deixando tudo perfeito para o seu uso.' },
  ]

  const testimonials = [
    { texto: c.testimonial_1_texto || 'A Piatto transformou completamente a minha cozinha. O projeto foi impecável, o prazo foi cumprido e o acabamento ficou melhor do que eu imaginava. Recomendo sem hesitar.', nome: c.testimonial_1_nome || 'Fernanda Oliveira', local: c.testimonial_1_local || 'Niterói, RJ' },
    { texto: c.testimonial_2_texto || 'Contratei para o closet do quarto e um home office. Profissionais excepcionais, atenção aos detalhes que ninguém mais percebe e atendimento de verdade. Voltarei para a próxima reforma.', nome: c.testimonial_2_nome || 'Rafael Mendes', local: c.testimonial_2_local || 'Rio de Janeiro, RJ' },
    { texto: c.testimonial_3_texto || 'O projeto 3D me ajudou muito a visualizar o resultado final. Quando chegou o dia da instalação, foi exatamente como prometido. Qualidade e seriedade em todas as etapas.', nome: c.testimonial_3_nome || 'Camila Rodrigues', local: c.testimonial_3_local || 'São Gonçalo, RJ' },
    { texto: c.testimonial_4_texto || '', nome: c.testimonial_4_nome || '', local: c.testimonial_4_local || '' },
    { texto: c.testimonial_5_texto || '', nome: c.testimonial_5_nome || '', local: c.testimonial_5_local || '' },
    { texto: c.testimonial_6_texto || '', nome: c.testimonial_6_nome || '', local: c.testimonial_6_local || '' },
  ]

  const aboutFeatures = [
    { t: c.about_f1_t || 'Fabricação própria', d: c.about_f1_d || 'Controle de qualidade do início ao fim' },
    { t: c.about_f2_t || 'Projeto exclusivo',  d: c.about_f2_d || 'Cada ambiente é único e personalizado' },
    { t: c.about_f3_t || 'Prazo garantido',    d: c.about_f3_d || 'Respeitamos o seu tempo e planejamento' },
    { t: c.about_f4_t || 'Pós-venda ativo',    d: c.about_f4_d || 'Suporte e garantia após a entrega' },
  ]

  return (
    <>
      <Header logoUrl={c.logo_url} />
      <main>
        <Hero
          titulo={c.hero_titulo}
          subtitulo={c.hero_subtitulo}
          badge={c.hero_badge}
          bgUrl={c.hero_bg_url}
        />
        <Stats items={stats} />
        <Portfolio items={portfolio} />
        <Services titulo={c.services_titulo} />
        <About
          texto1={c.sobre_texto_1}
          texto2={c.sobre_texto_2}
          titulo1={c.about_titulo_1}
          titulo2={c.about_titulo_2}
          anos={c.about_anos}
          anosLabel={c.about_anos_label}
          badge={c.about_badge}
          features={aboutFeatures}
        />
        <Process titulo={c.process_titulo} steps={processSteps} />
        <Testimonials titulo={c.testimonials_titulo} items={testimonials} />
        <ContactCTA
          whatsapp={c.whatsapp}
          telefone={c.telefone}
          email={c.email}
          endereco={c.endereco}
          bgUrl={c.contact_bg_url}
          badge={c.contato_badge}
          titulo={c.contato_titulo}
          desc={c.contato_desc}
        />
      </main>
      <Footer
        whatsapp={c.whatsapp}
        telefone={c.telefone}
        email={c.email}
        endereco={c.endereco}
        instagram={c.instagram_url}
        facebook={c.facebook_url}
        youtube={c.youtube_url}
        logoUrl={c.logo_url}
        desc={c.footer_desc}
      />
      <WhatsAppBtn whatsapp={c.whatsapp} />
    </>
  )
}
