'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin/config')
    })
  }, [router])

  async function entrar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setErro('E-mail ou senha incorretos.')
      setCarregando(false)
    } else {
      router.replace('/admin/config')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F3EF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/logo.svg" alt="Piatto Planejados" style={{ height: 44, filter: 'brightness(0)', margin: '0 auto 16px', display: 'block' }} />
          <p style={{ fontSize: 13, color: '#78716C', letterSpacing: '0.05em' }}>Painel administrativo</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 8, padding: 36, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <form onSubmit={entrar}>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>E-mail</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={inputStyle} placeholder="seu@email.com" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Senha</label>
              <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required
                style={inputStyle} placeholder="••••••••" />
            </div>
            {erro && <p style={{ fontSize: 13, color: '#DC2626', marginBottom: 16, textAlign: 'center' }}>{erro}</p>}
            <button type="submit" disabled={carregando} style={{
              width: '100%', padding: '12px', background: '#1C1917', color: '#fff',
              border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 500,
              cursor: carregando ? 'not-allowed' : 'pointer', opacity: carregando ? 0.7 : 1,
              fontFamily: 'inherit', letterSpacing: '0.04em',
            }}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#78716C',
  textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
}
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid #E8E3DC',
  borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none',
  background: '#FAFAF8', boxSizing: 'border-box',
}
