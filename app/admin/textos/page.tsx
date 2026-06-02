'use client'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Config = Record<string, string>

export default function AdminTextos() {
  const [config, setConfig] = useState<Config>({})
  const [salvando, setSalvando] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ key: string; ok: boolean } | null>(null)
  const [uploadandoHeroBg, setUploadandoHeroBg] = useState(false)
  const heroBgRef = useRef<HTMLInputElement>(null)

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

  async function uploadHeroBg(file: File) {
    setUploadandoHeroBg(true)
    const ext = file.name.split('.').pop()
    const path = `hero/bg.${ext}`
    const { error } = await supabase.storage.from('site-assets').upload(path, file, { upsert: true })
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(path)
      set('hero_bg_url', publicUrl)
      await supabase.from('site_config').upsert({ key: 'hero_bg_url', value: publicUrl, updated_at: new Date().toISOString() })
      setMsg({ key: 'hero_bg', ok: true })
      setTimeout(() => setMsg(null), 3000)
    }
    setUploadandoHeroBg(false)
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 300, color: '#1C1917', marginBottom: 6 }}>Textos do site</h1>
      <p style={{ fontSize: 13, color: '#78716C', marginBottom: 40 }}>Edite todos os textos exibidos em cada seção. O site atualiza em até 60 segundos após salvar.</p>

      {/* Hero */}
      <Sec title="Seção Hero (topo)">
        <Field label="Texto badge (ex: Marcenaria & Design de Interiores)" value={config.hero_badge || ''} onChange={v => set('hero_badge', v)} placeholder="Marcenaria & Design de Interiores" />
        <Field label="Título principal" value={config.hero_titulo || ''} onChange={v => set('hero_titulo', v)} placeholder="Cada detalhe, um propósito." />
        <Field label="Subtítulo" value={config.hero_subtitulo || ''} onChange={v => set('hero_subtitulo', v)} multi placeholder="Móveis planejados sob medida..." />
        <div style={{ marginBottom: 16 }}>
          <label style={lbl}>Imagem de fundo</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {config.hero_bg_url && <img src={config.hero_bg_url} alt="" style={{ height: 56, width: 90, objectFit: 'cover', borderRadius: 6, border: '1px solid #E8E3DC' }} />}
            <input ref={heroBgRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => e.target.files?.[0] && uploadHeroBg(e.target.files[0])} />
            <Btn onClick={() => heroBgRef.current?.click()} disabled={uploadandoHeroBg}>
              {uploadandoHeroBg ? 'Enviando...' : '📤 Trocar foto de fundo'}
            </Btn>
          </div>
          {msg?.key === 'hero_bg' && <Ok ok={msg.ok} />}
        </div>
        {msg?.key === 'hero' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('hero', ['hero_badge', 'hero_titulo', 'hero_subtitulo'])} loading={salvando === 'hero'} />
      </Sec>

      {/* Números */}
      <Sec title="Números em destaque">
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginBottom: 12 }}>
            <Field label={`Número ${i}`} value={config[`stats_${i}_number`] || ''} onChange={v => set(`stats_${i}_number`, v)} placeholder={['12+', '600+', '100%', '5★'][i - 1]} />
            <Field label={`Legenda ${i}`} value={config[`stats_${i}_label`] || ''} onChange={v => set(`stats_${i}_label`, v)} placeholder={['Anos de experiência', 'Projetos entregues', 'Fabricação própria', 'Avaliação dos clientes'][i - 1]} />
          </div>
        ))}
        {msg?.key === 'stats' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('stats', ['stats_1_number','stats_1_label','stats_2_number','stats_2_label','stats_3_number','stats_3_label','stats_4_number','stats_4_label'])} loading={salvando === 'stats'} />
      </Sec>

      {/* Serviços */}
      <Sec title="Seção Serviços">
        <Field label="Título da seção" value={config.services_titulo || ''} onChange={v => set('services_titulo', v)} placeholder="Nossos serviços" />
        {msg?.key === 'services' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('services', ['services_titulo'])} loading={salvando === 'services'} />
      </Sec>

      {/* Sobre */}
      <Sec title="Seção Sobre">
        <Field label="Badge (ex: Nossa história)" value={config.about_badge || ''} onChange={v => set('about_badge', v)} placeholder="Nossa história" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Título linha 1" value={config.about_titulo_1 || ''} onChange={v => set('about_titulo_1', v)} placeholder="Mais de uma década" />
          <Field label="Título linha 2 (itálico)" value={config.about_titulo_2 || ''} onChange={v => set('about_titulo_2', v)} placeholder="transformando lares" />
          <Field label="Número de anos" value={config.about_anos || ''} onChange={v => set('about_anos', v)} placeholder="12" />
          <Field label="Legenda dos anos" value={config.about_anos_label || ''} onChange={v => set('about_anos_label', v)} placeholder="anos de mercado" />
        </div>
        <Field label="Parágrafo 1" value={config.sobre_texto_1 || ''} onChange={v => set('sobre_texto_1', v)} multi />
        <Field label="Parágrafo 2" value={config.sobre_texto_2 || ''} onChange={v => set('sobre_texto_2', v)} multi />
        <p style={{ fontSize: 11, fontWeight: 600, color: '#78716C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>4 diferenciais</p>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <Field label={`Diferencial ${i} — título`} value={config[`about_f${i}_t`] || ''} onChange={v => set(`about_f${i}_t`, v)} placeholder={['Fabricação própria','Projeto exclusivo','Prazo garantido','Pós-venda ativo'][i-1]} />
            <Field label={`Diferencial ${i} — descrição`} value={config[`about_f${i}_d`] || ''} onChange={v => set(`about_f${i}_d`, v)} placeholder={['Controle de qualidade do início ao fim','Cada ambiente é único e personalizado','Respeitamos o seu tempo e planejamento','Suporte e garantia após a entrega'][i-1]} />
          </div>
        ))}
        {msg?.key === 'sobre' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('sobre', ['about_badge','about_titulo_1','about_titulo_2','about_anos','about_anos_label','sobre_texto_1','sobre_texto_2','about_f1_t','about_f1_d','about_f2_t','about_f2_d','about_f3_t','about_f3_d','about_f4_t','about_f4_d'])} loading={salvando === 'sobre'} />
      </Sec>

      {/* Processo */}
      <Sec title="Seção Processo (Como funciona)">
        <Field label="Título da seção" value={config.process_titulo || ''} onChange={v => set('process_titulo', v)} placeholder="Do projeto à entrega" />
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>Etapa 0{i}</p>
            <Field label="Título" value={config[`process_${i}_titulo`] || ''} onChange={v => set(`process_${i}_titulo`, v)} placeholder={['Consulta gratuita','Projeto 3D','Produção','Instalação'][i-1]} />
            <Field label="Descrição" value={config[`process_${i}_texto`] || ''} onChange={v => set(`process_${i}_texto`, v)} multi />
          </div>
        ))}
        {msg?.key === 'process' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('process', ['process_titulo','process_1_titulo','process_1_texto','process_2_titulo','process_2_texto','process_3_titulo','process_3_texto','process_4_titulo','process_4_texto'])} loading={salvando === 'process'} />
      </Sec>

      {/* Depoimentos */}
      <Sec title="Depoimentos">
        <Field label="Título da seção" value={config.testimonials_titulo || ''} onChange={v => set('testimonials_titulo', v)} placeholder="O que nossos clientes dizem" />
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ marginBottom: 16, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>Depoimento {i}</p>
            <Field label="Texto" value={config[`testimonial_${i}_texto`] || ''} onChange={v => set(`testimonial_${i}_texto`, v)} multi />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Nome" value={config[`testimonial_${i}_nome`] || ''} onChange={v => set(`testimonial_${i}_nome`, v)} placeholder="Nome do cliente" />
              <Field label="Localidade" value={config[`testimonial_${i}_local`] || ''} onChange={v => set(`testimonial_${i}_local`, v)} placeholder="Niterói, RJ" />
            </div>
          </div>
        ))}
        {msg?.key === 'testimonials' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('testimonials', ['testimonials_titulo','testimonial_1_texto','testimonial_1_nome','testimonial_1_local','testimonial_2_texto','testimonial_2_nome','testimonial_2_local','testimonial_3_texto','testimonial_3_nome','testimonial_3_local','testimonial_4_texto','testimonial_4_nome','testimonial_4_local','testimonial_5_texto','testimonial_5_nome','testimonial_5_local','testimonial_6_texto','testimonial_6_nome','testimonial_6_local'])} loading={salvando === 'testimonials'} />
      </Sec>

      {/* Contato CTA */}
      <Sec title="Seção Contato (CTA)">
        <Field label="Badge (ex: Vamos conversar)" value={config.contato_badge || ''} onChange={v => set('contato_badge', v)} placeholder="Vamos conversar" />
        <Field label="Título" value={config.contato_titulo || ''} onChange={v => set('contato_titulo', v)} placeholder="Pronto para transformar o seu espaço?" />
        <Field label="Descrição" value={config.contato_desc || ''} onChange={v => set('contato_desc', v)} multi placeholder="Agende uma consulta gratuita..." />
        {msg?.key === 'cta' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('cta', ['contato_badge', 'contato_titulo', 'contato_desc'])} loading={salvando === 'cta'} />
      </Sec>

      {/* Rodapé */}
      <Sec title="Rodapé">
        <Field label="Descrição da empresa" value={config.footer_desc || ''} onChange={v => set('footer_desc', v)} multi placeholder="Móveis planejados sob medida com design exclusivo e fabricação própria." />
        {msg?.key === 'footer' && <Ok ok={msg.ok} />}
        <SaveBtn onClick={() => salvar('footer', ['footer_desc'])} loading={salvando === 'footer'} />
      </Sec>
    </div>
  )
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 28, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, multi, placeholder }: { label: string; value: string; onChange: (v: string) => void; multi?: boolean; placeholder?: string }) {
  const base: React.CSSProperties = { width: '100%', padding: '10px 14px', border: '1px solid #E8E3DC', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#FAFAF8', boxSizing: 'border-box', resize: 'vertical' }
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={lbl}>{label}</label>
      {multi
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={base} placeholder={placeholder} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={base} placeholder={placeholder} />}
    </div>
  )
}

function Btn({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: '9px 20px', background: '#1C1917', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, fontFamily: 'inherit', fontWeight: 500 }}>
      {children}
    </button>
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

const lbl: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 600, color: '#78716C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }
