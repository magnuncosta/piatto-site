'use client'
import Reveal from './Reveal'

const D1 = 'A Piatto Planejados nasceu da paixão por unir funcionalidade e beleza em cada projeto. Desde o início, nossa missão é simples: criar móveis que duram e encantam — peças que crescem junto com a família de quem os escolheu.'
const D2 = 'Trabalhamos com fabricação própria, o que nos garante controle total sobre a qualidade, os prazos e os detalhes que fazem a diferença. Do primeiro esboço até a instalação final, acompanhamos cada etapa com atenção e cuidado.'

export default function About({ texto1, texto2 }: { texto1?: string; texto2?: string }) {
  return (
    <section id="sobre" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 80,
        alignItems: 'center',
      }}>

        <Reveal direction="left">
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80"
            alt="Marcenaria Piatto Planejados"
            style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 4, display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: -24, right: -24,
            background: 'var(--accent)',
            padding: '28px 32px',
            borderRadius: 2,
          }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 44, fontWeight: 300, color: '#fff', lineHeight: 1 }}>12</div>
            <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>anos de mercado</div>
          </div>
        </div>
        </Reveal>

        <Reveal direction="right">
        {/* Text */}
        <div>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
            Nossa história
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 300,
            color: 'var(--ink)',
            lineHeight: 1.15,
            marginBottom: 28,
          }}>
            Mais de uma década<br />
            <em style={{ fontStyle: 'italic' }}>transformando lares</em>
          </h2>

          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
            {texto1 || D1}
          </p>
          <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 44 }}>
            {texto2 || D2}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 44 }}>
            {[
              { t: 'Fabricação própria', d: 'Controle de qualidade do início ao fim' },
              { t: 'Projeto exclusivo',  d: 'Cada ambiente é único e personalizado' },
              { t: 'Prazo garantido',    d: 'Respeitamos o seu tempo e planejamento' },
              { t: 'Pós-venda ativo',    d: 'Suporte e garantia após a entrega' },
            ].map(item => (
              <div key={item.t}>
                <div style={{ width: 28, height: 2, background: 'var(--accent)', marginBottom: 12 }} />
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', marginBottom: 4 }}>{item.t}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{item.d}</div>
              </div>
            ))}
          </div>

          <a href="#contato" style={{
            display: 'inline-block',
            background: 'var(--ink)',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: 2,
            fontSize: 12,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#2C2520')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--ink)')}
          >
            Fale com a gente
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  )
}
