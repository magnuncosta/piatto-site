'use client'
import { useState } from 'react'
import Reveal from './Reveal'
import PortfolioLightbox from './PortfolioLightbox'
import { supabase } from '@/lib/supabase'

const PROJETOS_DEFAULT = [
  { id: '1', categoria: 'Cozinha',     titulo: 'Cozinha Contemporânea', local: 'Niterói, RJ',    descricao: '', img_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75', tall: true  },
  { id: '2', categoria: 'Dormitório',  titulo: 'Suíte Master',           local: 'Rio de Janeiro', descricao: '', img_url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=75', tall: false },
  { id: '3', categoria: 'Sala',        titulo: 'Sala Integrada',          local: 'Niterói, RJ',   descricao: '', img_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=75', tall: false },
  { id: '4', categoria: 'Home Office', titulo: 'Home Office Executivo',   local: 'São Gonçalo',   descricao: '', img_url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=75', tall: true  },
  { id: '5', categoria: 'Cozinha',     titulo: 'Cozinha Americana',       local: 'Niterói, RJ',   descricao: '', img_url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=75', tall: false },
  { id: '6', categoria: 'Dormitório',  titulo: 'Closet Completo',         local: 'Rio de Janeiro', descricao: '', img_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75', tall: false },
]

interface PortfolioItem {
  id: string
  categoria: string
  titulo: string
  local: string
  descricao?: string
  img_url: string
  tall: boolean
}

interface Media { id: string; url: string; tipo: string }

export default function Portfolio({ items }: { items?: PortfolioItem[] }) {
  const projetos = (items && items.length > 0) ? items : PROJETOS_DEFAULT
  const categorias = ['Todos', ...Array.from(new Set(projetos.map(p => p.categoria)))]
  const [ativo, setAtivo] = useState('Todos')

  const [lbProj, setLbProj] = useState<PortfolioItem | null>(null)
  const [lbMidia, setLbMidia] = useState<Media[]>([])
  const [lbIdx, setLbIdx] = useState(0)
  const [lbCarregando, setLbCarregando] = useState(false)

  const filtrados = ativo === 'Todos' ? projetos : projetos.filter(p => p.categoria === ativo)

  async function abrirLightbox(projeto: PortfolioItem) {
    setLbProj(projeto)
    setLbIdx(0)
    setLbMidia([])
    // Projetos default não têm galeria no banco
    if (projeto.id.length < 10) return
    setLbCarregando(true)
    const { data } = await supabase
      .from('site_portfolio_midia')
      .select('id, url, tipo')
      .eq('portfolio_id', projeto.id)
      .order('ordem')
      .order('created_at')
    setLbMidia(data ?? [])
    setLbCarregando(false)
  }

  return (
    <section id="projetos" style={{ padding: '100px 24px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 56, textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            Portfólio
          </p>
          <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: 'var(--ink)', lineHeight: 1.1, marginBottom: 40 }}>
            Projetos realizados
          </h2>

          {/* Filtros */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }} onClick={e => e.stopPropagation()}>
            {categorias.map(c => (
              <button key={c} onClick={() => setAtivo(c)} style={{
                padding: '8px 20px',
                borderRadius: 2,
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: ativo === c ? 'var(--ink)' : 'transparent',
                borderColor: ativo === c ? 'var(--ink)' : 'var(--border)',
                color: ativo === c ? '#fff' : 'var(--muted)',
                fontFamily: 'inherit',
              }}>
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 16,
        }}>
          {filtrados.map(p => (
            <div
              key={p.id}
              onClick={() => abrirLightbox(p)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                gridRow: p.tall ? 'span 2' : 'span 1',
                cursor: 'pointer',
                background: 'var(--surface)',
              }}
            >
              <img
                src={p.img_url}
                alt={p.titulo}
                style={{
                  width: '100%',
                  height: p.tall ? 520 : 260,
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(20,16,12,0.75) 0%, transparent 50%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: 24,
                  opacity: 0, transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = '1';
                  (e.currentTarget.previousElementSibling as HTMLImageElement).style.transform = 'scale(1.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = '0';
                  (e.currentTarget.previousElementSibling as HTMLImageElement).style.transform = 'scale(1)'
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 6 }}>{p.categoria}</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 22, fontWeight: 400, color: '#fff', marginBottom: 4 }}>{p.titulo}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 10 }}>{p.local}</p>
                <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                  Ver galeria →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lbProj && (
        <PortfolioLightbox
          projeto={lbProj}
          midia={lbMidia}
          idx={lbIdx}
          carregando={lbCarregando}
          onClose={() => setLbProj(null)}
          onChange={setLbIdx}
        />
      )}
    </section>
  )
}
