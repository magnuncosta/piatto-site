'use client'

interface Props {
  whatsapp?: string
  telefone?: string
  email?: string
  endereco?: string
  instagram?: string
  facebook?: string
  logoUrl?: string
  desc?: string
}

export default function Footer({
  telefone  = '(21) 9 6953-0979',
  email     = 'contato@piattoplanejados.com.br',
  endereco  = 'Niterói, Rio de Janeiro e Grande Rio',
  instagram = '',
  facebook  = '',
  logoUrl   = '',
  desc      = '',
}: Props) {
  const year = new Date().getFullYear()

  const socialLinks = [
    { label: 'Instagram', href: instagram || '#' },
    { label: 'Facebook',  href: facebook  || '#' },
    { label: 'Pinterest', href: '#' },
  ]

  return (
    <footer style={{ background: '#111009', padding: '64px 24px 32px', color: 'rgba(255,255,255,0.4)' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 32,
      }}>
        <div>
          <div style={{ marginBottom: 16 }}>
            <img src={logoUrl || '/logo.svg'} alt="Piatto Planejados" style={{ height: 38, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>
            {desc || 'Móveis planejados sob medida com design exclusivo e fabricação própria.'}
          </p>
        </div>

        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Navegação</div>
          {['Projetos', 'Serviços', 'Sobre', 'Contato'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 10 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            >{l}</a>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Contato</div>
          <div style={{ fontSize: 14, marginBottom: 10 }}>{telefone}</div>
          <div style={{ fontSize: 14, marginBottom: 10 }}>{email}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 16 }}>{endereco}</div>
        </div>

        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Redes sociais</div>
          {socialLinks.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', marginBottom: 10 }}
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
