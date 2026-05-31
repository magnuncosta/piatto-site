'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

type Config = Record<string, string>

export default function AdminConfig() {
  const [config, setConfig] = useState<Config>({})
  const [salvando, setSalvando] = useState<string | null>(null)
  const [uploadando, setUploadando] = useState(false)
  const [msg, setMsg] = useState<{ key: string; ok: boolean } | null>(null)
  const logoRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    supabase.from('site_config').select('key, value').then(({ data }) => {
      if (data) setConfig(Object.fromEntries(data.map(r => [r.key, r.value ?? ''])))
    })
  }, [])

  function set(key: string, value: string) {
    setConfig(c => ({ ...c, [key]: value }))
  }

  async function salvar(section: string, keys: string[]) {
    setSalvando(section)
    const rows = keys.map(k => ({ key: k, value: config[k] ?? '', updated_at: new Date().toISOString() }))
    const { error } = await supabase.from('site_config').upsert(rows)
    setSalvando(null)
    setMsg({ key: section, ok: !error })
    setTimeout(() => setMsg(null), 3000)
  }

  async function uploadLogo(file: File) {
    setUploadando(true)
    const ext = file.name.split('.').pop()
    const path = `logo/logo.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true })
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(path)
      set('logo_url', publicUrl)
      await supabase.from('site_config').upsert({ key: 'logo_url', value: publicUrl, updated_at: new Date().toISOString() })
      setMsg({ key: 'logo', ok: true })
      setTimeout(() => setMsg(null), 3000)
    }
    setUploadando(false)
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 300, color: '#1C1917', marginBottom: 6 }}>Configurações</h1>
      <p style={{ fontSize: 13, color: '#78716C', marginBottom: 40 }}>Edite os textos e informações do site.</p>

      {/* Logo */}
      <Section title="Logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
          {config.logo_url ? (
            <img src={config.logo_url} alt="Logo" style={{ height: 60, objectFit: 'contain', border: '1px solid #E8E3DC', borderRadius: 6, padding: 8, background: '#fff' }} />
          ) : (
            <img src="/logo.svg" alt="Logo padrão" style={{ height: 60, padding: 8, border: '1px dashed #E8E3DC', borderRadius: 6, opacity: 0.5 }} />
          )}
          <div>
            <input ref={logoRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
            <Btn onClick={() => logoRef.current?.click()} disabled={uploadando}>
              {uploadando ? 'Enviando...' : '📤 Fazer upload do logo'}
            </Btn>
            <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>PNG, SVG ou JPG. Fundo transparente recomendado.</p>
            {msg?.key === 'logo' && <Ok ok={msg.ok} />}
          </div>
        </div>
      </Section>

      {/* Hero */}
      <Section title="Seção principal (Hero)">
        <Field label="Título" value={config.hero_titulo || ''} onChange={v => set('hero_titulo', v)} />
        <Field label="Subtítulo" value={config.hero_subtitulo || ''} onChange={v => set('hero_subtitulo', v)} multi />
        {msg?.key === 'hero' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('hero', ['hero_titulo', 'hero_subtitulo'])} loading={salvando === 'hero'} />
      </Section>

      {/* Sobre */}
      <Section title="Seção Sobre">
        <Field label="Parágrafo 1" value={config.sobre_texto_1 || ''} onChange={v => set('sobre_texto_1', v)} multi />
        <Field label="Parágrafo 2" value={config.sobre_texto_2 || ''} onChange={v => set('sobre_texto_2', v)} multi />
        {msg?.key === 'sobre' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('sobre', ['sobre_texto_1', 'sobre_texto_2'])} loading={salvando === 'sobre'} />
      </Section>

      {/* Contato */}
      <Section title="Contato">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="WhatsApp (com DDI e DDD, sem espaços)" value={config.whatsapp || ''} onChange={v => set('whatsapp', v)} />
          <Field label="Telefone (exibição)" value={config.telefone || ''} onChange={v => set('telefone', v)} />
          <Field label="E-mail" value={config.email || ''} onChange={v => set('email', v)} />
          <Field label="Endereço / Região" value={config.endereco || ''} onChange={v => set('endereco', v)} />
        </div>
        {msg?.key === 'contato' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('contato', ['whatsapp', 'telefone', 'email', 'endereco'])} loading={salvando === 'contato'} />
      </Section>

      {/* Redes sociais */}
      <Section title="Redes sociais">
        <Field label="Instagram (URL completa)" value={config.instagram_url || ''} onChange={v => set('instagram_url', v)} placeholder="https://instagram.com/piattoplanejados" />
        <Field label="Facebook (URL completa)" value={config.facebook_url || ''} onChange={v => set('facebook_url', v)} placeholder="https://facebook.com/piattoplanejados" />
        {msg?.key === 'redes' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('redes', ['instagram_url', 'facebook_url'])} loading={salvando === 'redes'} />
      </Section>

      {/* Aparência */}
      <Section title="Aparência — Fontes e cores">
        <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 20 }}>
          As alterações ficam visíveis no site após salvar. O site atualiza em até 60 segundos.
        </p>

        {/* Fontes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <div>
            <label style={lblStyle}>Fonte dos títulos (H1, H2...)</label>
            <select
              value={config.theme_font_heading || 'cormorant'}
              onChange={e => set('theme_font_heading', e.target.value)}
              style={selStyle}
            >
              <option value="cormorant">Cormorant Garamond — elegante e clássica</option>
              <option value="playfair">Playfair Display — sofisticada e editorial</option>
              <option value="lora">Lora — moderna e legível</option>
            </select>
          </div>
          <div>
            <label style={lblStyle}>Fonte do corpo (parágrafos)</label>
            <select
              value={config.theme_font_body || 'inter'}
              onChange={e => set('theme_font_body', e.target.value)}
              style={selStyle}
            >
              <option value="inter">Inter — limpa e moderna</option>
              <option value="poppins">Poppins — geométrica e amigável</option>
            </select>
          </div>
        </div>

        {/* Preview de fonte */}
        <div style={{ background: '#FAFAF8', border: '1px solid #E8E3DC', borderRadius: 6, padding: '20px 24px', marginBottom: 24 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: config.theme_color_accent || '#C4A882', marginBottom: 8 }}>
            Pré-visualização
          </p>
          <p style={{
            fontFamily: config.theme_font_heading === 'playfair' ? 'var(--ff-playfair)' : config.theme_font_heading === 'lora' ? 'var(--ff-lora)' : 'var(--ff-cormorant)',
            fontSize: 32, fontWeight: 300, color: config.theme_color_ink || '#1C1917', marginBottom: 8, lineHeight: 1.2,
          }}>
            Móveis que transformam ambientes
          </p>
          <p style={{
            fontFamily: config.theme_font_body === 'poppins' ? 'var(--ff-poppins)' : 'var(--ff-inter)',
            fontSize: 14, color: config.theme_color_muted || '#78716C', lineHeight: 1.7,
          }}>
            Qualidade, design e acabamento premium em cada projeto realizado.
          </p>
        </div>

        {/* Cores */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16, marginBottom: 8 }}>
          <ColorField label="Cor de destaque (accent)" value={config.theme_color_accent || '#C4A882'} onChange={v => set('theme_color_accent', v)} />
          <ColorField label="Cor principal (texto)" value={config.theme_color_ink || '#1C1917'} onChange={v => set('theme_color_ink', v)} />
          <ColorField label="Cor de fundo" value={config.theme_color_bg || '#FAFAF8'} onChange={v => set('theme_color_bg', v)} />
          <ColorField label="Cor de texto secundário" value={config.theme_color_muted || '#78716C'} onChange={v => set('theme_color_muted', v)} />
        </div>

        {msg?.key === 'aparencia' && <Ok ok={msg.ok} />}
        <SaveBtn
          onClick={() => salvar('aparencia', ['theme_font_heading', 'theme_font_body', 'theme_color_accent', 'theme_color_ink', 'theme_color_bg', 'theme_color_muted'])}
          loading={salvando === 'aparencia'}
        />
      </Section>
    </div>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={lblStyle}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ width: 40, height: 36, border: '1px solid #E8E3DC', borderRadius: 6, cursor: 'pointer', padding: 2, background: 'none' }}
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ flex: 1, padding: '8px 10px', border: '1px solid #E8E3DC', borderRadius: 6, fontSize: 13, fontFamily: 'monospace', background: '#FAFAF8', outline: 'none', boxSizing: 'border-box' }}
          maxLength={7}
          placeholder="#C4A882"
        />
      </div>
    </div>
  )
}

const lblStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#78716C',
  textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6,
}
const selStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid #E8E3DC',
  borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none',
  background: '#FAFAF8', boxSizing: 'border-box', cursor: 'pointer',
}

/* ---- Sub-componentes ---- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 28, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, multi, placeholder }: { label: string; value: string; onChange: (v: string) => void; multi?: boolean; placeholder?: string }) {
  const base: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid #E8E3DC',
    borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none',
    background: '#FAFAF8', boxSizing: 'border-box', resize: 'vertical',
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#78716C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</label>
      {multi
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={base} placeholder={placeholder} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={base} placeholder={placeholder} />}
    </div>
  )
}

function Btn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '9px 20px', background: '#1C1917', color: '#fff', border: 'none',
      borderRadius: 6, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1, fontFamily: 'inherit', fontWeight: 500,
    }}>{children}</button>
  )
}

function SaveBtn({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
      <Btn onClick={onClick} disabled={loading}>{loading ? 'Salvando...' : '💾 Salvar'}</Btn>
    </div>
  )
}

function Ok({ ok }: { ok: boolean }) {
  return <p style={{ fontSize: 12, color: ok ? '#16A34A' : '#DC2626', marginBottom: 8 }}>{ok ? '✓ Salvo com sucesso' : '✗ Erro ao salvar'}</p>
}
