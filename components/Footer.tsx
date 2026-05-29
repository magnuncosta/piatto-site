'use client'
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#111009', padding: '64px 24px 32px', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 48,
        paddingBottom: 48,
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 32,
      }}>
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 400, letterSpacing: '0.05em', color: '#fff' }}>PIATTO</div>
            <div style={{ fontSize: 9, letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase' }}>PLANEJADOS</div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>
            Móveis planejados sob medida com design exclusivo e fabricação própria.
          </p>
        </div>

        {/* Links */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Navegação</div>
          {['Projetos', 'Serviços', 'Sobre', 'Contato'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{l}</a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Contato</div>
          <div style={{ fontSize: 14, marginBottom: 10 }}>(21) 9 9999-9999</div>
          <div style={{ fontSize: 14, marginBottom: 10 }}>contato@piattoplanejados.com.br</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>
            Niterói, Rio de Janeiro<br />
            e Grande Rio
          </div>
        </div>

        {/* Social */}
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Redes sociais</div>
          {[
            { label: 'Instagram', href: '#' },
            { label: 'Facebook',  href: '#' },
            { label: 'Pinterest', href: '#' },
          ].map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{s.label}</a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, fontSize: 12 }}>
        <span>© {year} Piatto Planejados. Todos os direitos reservados.</span>
        <span>piattoplanejados.com.br</span>
      </div>
    </footer>
  )
}
