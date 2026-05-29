'use client'
export default function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1800&q=80"
        alt="Interior moderno com móveis planejados"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.35) 50%, rgba(20,16,12,0.7) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <p className="animate-fade-up" style={{
          fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 20, fontWeight: 500,
        }}>
          Marcenaria & Design de Interiores
        </p>

        <h1 className="animate-fade-up delay-200" style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(48px, 7vw, 88px)',
          fontWeight: 300,
          color: '#fff',
          lineHeight: 1.08,
          maxWidth: 800,
          marginBottom: 28,
        }}>
          Cada detalhe,<br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>um propósito.</em>
        </h1>

        <p className="animate-fade-up delay-300" style={{
          fontSize: 17, color: 'rgba(255,255,255,0.75)',
          maxWidth: 520, lineHeight: 1.65, marginBottom: 44,
        }}>
          Móveis planejados sob medida que transformam ambientes em experiências únicas. Do projeto à instalação, cada peça feita para você.
        </p>

        <div className="animate-fade-up delay-500" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#projetos" style={{
            background: 'var(--accent)',
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
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Ver projetos
          </a>
          <a href="#contato" style={{
            border: '1px solid rgba(255,255,255,0.5)',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: 2,
            fontSize: 12,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent' }}
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="animate-fade-in delay-700" style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Explorar</span>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          animation: 'fadeUp 1.5s ease-in-out infinite alternate',
        }} />
      </div>
    </section>
  )
}
