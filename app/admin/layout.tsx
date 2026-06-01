'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const NAV = [
  { href: '/admin/config',    icon: '⚙️', label: 'Configurações' },
  { href: '/admin/textos',    icon: '✏️', label: 'Textos do site' },
  { href: '/admin/portfolio', icon: '🖼️', label: 'Portfólio' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && pathname !== '/admin/login') {
        router.replace('/admin/login')
      } else {
        setVerificando(false)
      }
    })
  }, [pathname, router])

  if (pathname === '/admin/login') return <>{children}</>
  if (verificando) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F3EF' }}>
      <p style={{ color: '#78716C', fontSize: 13 }}>Verificando acesso...</p>
    </div>
  )

  async function sair() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F3EF' }}>
      {/* Sidebar */}
      <aside style={{
        width: 230, background: '#1C1917', display: 'flex', flexDirection: 'column',
        padding: '28px 0', flexShrink: 0, position: 'sticky', top: 0, height: '100vh',
      }}>
        <div style={{ padding: '0 24px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <img src="/logo.svg" alt="Piatto" style={{ height: 36, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Admin
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px' }}>
          {NAV.map(n => {
            const ativo = pathname.startsWith(n.href)
            return (
              <a key={n.href} href={n.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 6, marginBottom: 2,
                textDecoration: 'none', fontSize: 14,
                background: ativo ? 'rgba(196,168,130,0.15)' : 'transparent',
                color: ativo ? '#C4A882' : 'rgba(255,255,255,0.55)',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 16 }}>{n.icon}</span>
                {n.label}
              </a>
            )
          })}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a href="/" target="_blank" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 6, marginBottom: 2,
            textDecoration: 'none', fontSize: 13, color: 'rgba(255,255,255,0.35)',
          }}>🌐 Ver site</a>
          <button onClick={sair} style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '10px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
            background: 'transparent', fontSize: 13, color: 'rgba(255,255,255,0.35)',
            fontFamily: 'inherit', textAlign: 'left',
          }}>🚪 Sair</button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
