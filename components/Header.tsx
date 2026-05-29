'use client'
import { useEffect, useState } from 'react'

const NAV = [
  { label: 'Projetos',  href: '#projetos' },
  { label: 'Serviços',  href: '#servicos' },
  { label: 'Sobre',     href: '#sobre' },
  { label: 'Contato',   href: '#contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
        background: scrolled ? 'rgba(250,250,248,0.96)' : 'transparent',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: scrolled ? 'var(--ink)' : '#fff',
              transition: 'color 0.3s',
            }}>PIATTO</span>
            <span style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              color: scrolled ? 'var(--accent-dark)' : 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
              marginTop: 1,
            }}>PLANEJADOS</span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden-mobile">
          {NAV.map(n => (
            <a key={n.href} href={n.href} style={{
              fontSize: 13,
              letterSpacing: '0.06em',
              textDecoration: 'none',
              color: scrolled ? 'var(--muted)' : 'rgba(255,255,255,0.8)',
              transition: 'color 0.2s',
              textTransform: 'uppercase',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = scrolled ? 'var(--ink)' : '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--muted)' : 'rgba(255,255,255,0.8)')}
            >{n.label}</a>
          ))}
          <a href="#contato" style={{
            background: 'var(--accent)',
            color: '#fff',
            padding: '9px 22px',
            borderRadius: 2,
            fontSize: 12,
            letterSpacing: '0.08em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-dark)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
          >
            Solicitar orçamento
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none' }}
          className="show-mobile"
          aria-label="Menu"
        >
          <div style={{ width: 22, height: 2, background: scrolled ? 'var(--ink)' : '#fff', marginBottom: 5, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 22, height: 2, background: scrolled ? 'var(--ink)' : '#fff', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
          <div style={{ width: 22, height: 2, background: scrolled ? 'var(--ink)' : '#fff', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '16px 24px 24px' }}>
          {NAV.map(n => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: 15,
              color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--border)',
              letterSpacing: '0.04em',
            }}>{n.label}</a>
          ))}
          <a href="#contato" onClick={() => setMenuOpen(false)} style={{
            display: 'block', marginTop: 16, textAlign: 'center',
            background: 'var(--accent)', color: '#fff', padding: '12px',
            borderRadius: 2, fontSize: 13, letterSpacing: '0.08em',
            textDecoration: 'none', textTransform: 'uppercase',
          }}>Solicitar orçamento</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
      `}</style>
    </header>
  )
}
