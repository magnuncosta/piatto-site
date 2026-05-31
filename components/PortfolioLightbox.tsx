'use client'
import { useEffect } from 'react'

interface Media { id: string; url: string; tipo: string }
interface Projeto { titulo: string; local: string; categoria: string; descricao?: string; img_url: string }

interface Props {
  projeto: Projeto
  midia: Media[]
  idx: number
  carregando: boolean
  onClose: () => void
  onChange: (idx: number) => void
}

export default function PortfolioLightbox({ projeto, midia, idx, carregando, onClose, onChange }: Props) {
  const slides: Media[] = [
    { id: 'cover', url: projeto.img_url, tipo: 'image' },
    ...midia,
  ]
  const total = slides.length
  const current = slides[idx]
  const isVideo = current?.tipo === 'video'

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onChange(Math.min(idx + 1, total - 1))
      if (e.key === 'ArrowLeft') onChange(Math.max(idx - 1, 0))
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [idx, total, onClose, onChange])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!current) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(12, 9, 7, 0.97)', display: 'flex', flexDirection: 'column' }}
      onClick={onClose}
    >
      {/* Barra superior */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', flexShrink: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
            {projeto.categoria}{projeto.local ? ` · ${projeto.local}` : ''}
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 300, color: '#fff', lineHeight: 1.2 }}>
            {projeto.titulo}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {carregando && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>carregando galeria...</span>
          )}
          {!carregando && total > 1 && (
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{idx + 1} / {total}</span>
          )}
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', fontSize: 26, lineHeight: 1, padding: '4px 8px', fontFamily: 'inherit' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Mídia principal */}
      <div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '0 72px' }}
        onClick={e => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            key={current.url}
            src={current.url}
            controls
            autoPlay
            style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 3 }}
          />
        ) : (
          <img
            key={current.url}
            src={current.url}
            alt={projeto.titulo}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 3, userSelect: 'none', display: 'block' }}
          />
        )}

        {/* Seta anterior */}
        {idx > 0 && (
          <button
            onClick={() => onChange(idx - 1)}
            style={arrowStyle('left')}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            ‹
          </button>
        )}

        {/* Seta próxima */}
        {idx < total - 1 && (
          <button
            onClick={() => onChange(idx + 1)}
            style={arrowStyle('right')}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >
            ›
          </button>
        )}
      </div>

      {/* Rodapé: descrição + miniaturas */}
      <div
        style={{ flexShrink: 0, padding: '14px 28px 24px' }}
        onClick={e => e.stopPropagation()}
      >
        {projeto.descricao && (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 14, maxWidth: 640, lineHeight: 1.6 }}>
            {projeto.descricao}
          </p>
        )}

        {total > 1 && (
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onChange(i)}
                style={{
                  flexShrink: 0, padding: 0, border: '2px solid',
                  borderColor: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                  borderRadius: 3, cursor: 'pointer', background: 'rgba(255,255,255,0.05)',
                  transition: 'border-color 0.2s', overflow: 'hidden',
                  width: 60, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onMouseEnter={e => { if (i !== idx) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                onMouseLeave={e => { if (i !== idx) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
              >
                {s.tipo === 'video' ? (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18 }}>▶</span>
                ) : (
                  <img src={s.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const arrowStyle = (side: 'left' | 'right'): React.CSSProperties => ({
  position: 'absolute',
  [side]: 14,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'rgba(255,255,255,0.08)',
  border: 'none',
  borderRadius: '50%',
  width: 52,
  height: 52,
  cursor: 'pointer',
  color: '#fff',
  fontSize: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
  fontFamily: 'inherit',
  lineHeight: 1,
})
