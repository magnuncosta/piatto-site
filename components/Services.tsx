'use client'
import Reveal from './Reveal'

const SERVICOS = [
  { titulo: 'Cozinhas Planejadas',        texto: 'Cozinhas funcionais e elegantes, projetadas para otimizar cada centímetro do espaço. Materiais premium, acabamentos impecáveis e soluções inteligentes de armazenamento.' },
  { titulo: 'Dormitórios & Closets',       texto: 'Do dormitório infantil ao closet master, criamos ambientes que combinam conforto, organização e estética. Cada projeto é único como quem vai usá-lo.' },
  { titulo: 'Salas & Ambientes Integrados',texto: 'Painéis de TV, estantes, aparadores e muito mais. Transformamos salas de estar e jantar em espaços sofisticados com personalidade própria.' },
  { titulo: 'Home Office',                 texto: 'Ambientes de trabalho projetados para produtividade e bem-estar. Mesas, estantes, gaveteiros e painéis acústicos customizados para o seu ritmo.' },
  { titulo: 'Lavabos & Banheiros',         texto: 'Gabinetes, armários e nichos sob medida que transformam banheiros em espaços de relaxamento com o máximo aproveitamento de área.' },
  { titulo: 'Áreas Externas',              texto: 'Móveis e estruturas planejadas para varandas, jardins e áreas gourmet. Design bonito e materiais resistentes às condições climáticas.' },
]

export default function Services({ titulo }: { titulo?: string }) {
  return (
    <section id="servicos" style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            O que fazemos
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: 'var(--ink)' }}>
            {titulo || 'Nossos serviços'}
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 2,
        }}>
          {SERVICOS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: 'var(--bg)',
                padding: '44px 36px',
                transition: 'background 0.2s',
                cursor: 'default',
                height: '100%',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg)')}
              >
                <div style={{ width: 32, height: 2, background: 'var(--accent)', marginBottom: 24 }} />
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 24,
                  fontWeight: 400,
                  color: 'var(--ink)',
                  marginBottom: 14,
                  lineHeight: 1.2,
                }}>{s.titulo}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{s.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
