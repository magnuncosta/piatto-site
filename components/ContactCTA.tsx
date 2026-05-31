'use client'

interface Props {
  whatsapp?: string
  telefone?: string
  email?: string
  endereco?: string
}

export default function ContactCTA({
  whatsapp  = '5521969530979',
  telefone  = '(21) 9 6953-0979',
  endereco  = 'Niterói, Rio de Janeiro e Grande Rio',
}: Props) {
  const msg = 'Olá! Vim pelo site e gostaria de solicitar um orçamento para móveis planejados.'
  const waLink = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`

  return (
    <section id="contato" style={{ position: 'relative', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,16,12,0.82)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '120px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>
          Vamos conversar
        </p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 20 }}>
          Pronto para transformar<br />
          <em style={{ fontStyle: 'italic' }}>o seu espaço?</em>
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 48 }}>
          Agende uma consulta gratuita. Nossa equipe vai ao seu imóvel, mede o ambiente e apresenta um projeto personalizado sem compromisso.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 10, background: '#25D366',
            color: '#fff', padding: '15px 36px', borderRadius: 2, fontSize: 13,
            letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 500,
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1ebe5d')}
            onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.098.54 4.07 1.486 5.788L.057 23.854c-.073.31.214.582.52.499l6.198-1.63A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.012-1.373l-.36-.213-3.726.98 1-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
            </svg>
            Falar no WhatsApp
          </a>
          <a href={`tel:${whatsapp}`} style={{
            border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '15px 36px',
            borderRadius: 2, fontSize: 13, letterSpacing: '0.08em', textDecoration: 'none', textTransform: 'uppercase',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.background = 'transparent' }}
          >
            {telefone}
          </a>
        </div>

        <p style={{ marginTop: 32, fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>
          {endereco}
        </p>
      </div>
    </section>
  )
}
