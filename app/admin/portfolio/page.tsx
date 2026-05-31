'use client'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const CATEGORIAS = ['Cozinha', 'Dormitório', 'Sala', 'Home Office', 'Banheiro', 'Área Externa']

interface Item {
  id: string
  titulo: string
  categoria: string
  local: string
  descricao: string
  img_url: string
  tall: boolean
  ativo: boolean
  ordem: number
}

const itemVazio = (): Omit<Item, 'id'> => ({
  titulo: '', categoria: 'Cozinha', local: '', descricao: '', img_url: '', tall: false, ativo: true, ordem: 0,
})

export default function AdminPortfolio() {
  const [items, setItems] = useState<Item[]>([])
  const [novo, setNovo] = useState(itemVazio())
  const [uploadando, setUploadando] = useState(false)
  const [salvando, setSalvando] = useState(false)
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')
  const [editandoId, setEditandoId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Omit<Item, 'id'>>(itemVazio())
  const [uploadandoEdit, setUploadandoEdit] = useState(false)
  const [salvandoEdit, setSalvandoEdit] = useState(false)
  const [msgEdit, setMsgEdit] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const fileEditRef = useRef<HTMLInputElement>(null)

  useEffect(() => { carregar() }, [])

  async function carregar() {
    setLoading(true)
    const { data } = await supabase.from('site_portfolio').select('*').order('ordem').order('created_at')
    setItems(data || [])
    setLoading(false)
  }

  async function uploadImagem(file: File, paraEdicao = false) {
    if (paraEdicao) setUploadandoEdit(true)
    else setUploadando(true)
    const nome = `${Date.now()}_${file.name.replace(/\s/g, '_')}`
    const { error } = await supabase.storage.from('site-assets').upload(`portfolio/${nome}`, file)
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from('site-assets').getPublicUrl(`portfolio/${nome}`)
      if (paraEdicao) setEditData(d => ({ ...d, img_url: publicUrl }))
      else setNovo(n => ({ ...n, img_url: publicUrl }))
    }
    if (paraEdicao) setUploadandoEdit(false)
    else setUploadando(false)
  }

  async function adicionar() {
    if (!novo.titulo || !novo.img_url) { setMsg('Preencha o título e envie uma imagem.'); return }
    setSalvando(true)
    const { error } = await supabase.from('site_portfolio').insert(novo)
    setSalvando(false)
    if (!error) { setNovo(itemVazio()); await carregar(); setMsg('') }
    else setMsg('Erro ao adicionar.')
  }

  function iniciarEdicao(item: Item) {
    setEditandoId(item.id)
    setMsgEdit('')
    setEditData({
      titulo: item.titulo,
      categoria: item.categoria,
      local: item.local,
      descricao: item.descricao || '',
      img_url: item.img_url,
      tall: item.tall,
      ativo: item.ativo,
      ordem: item.ordem,
    })
  }

  async function salvarEdicao(id: string) {
    if (!editData.titulo) { setMsgEdit('O título é obrigatório.'); return }
    setSalvandoEdit(true)
    const { error } = await supabase.from('site_portfolio').update(editData).eq('id', id)
    setSalvandoEdit(false)
    if (!error) {
      setEditandoId(null)
      setItems(items.map(i => i.id === id ? { ...i, ...editData } : i))
    } else {
      setMsgEdit('Erro ao salvar. Tente novamente.')
    }
  }

  async function excluir(id: string) {
    if (!confirm('Excluir este item do portfólio?')) return
    await supabase.from('site_portfolio').delete().eq('id', id)
    setItems(items.filter(i => i.id !== id))
    if (editandoId === id) setEditandoId(null)
  }

  const inp: React.CSSProperties = {
    width: '100%', padding: '9px 12px', border: '1px solid #E8E3DC',
    borderRadius: 6, fontSize: 13, fontFamily: 'inherit', outline: 'none', background: '#FAFAF8', boxSizing: 'border-box',
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 32, fontWeight: 300, color: '#1C1917', marginBottom: 6 }}>Portfólio</h1>
      <p style={{ fontSize: 13, color: '#78716C', marginBottom: 36 }}>Gerencie os projetos exibidos no site.</p>

      {/* Formulário de novo item */}
      <div style={{ background: '#fff', borderRadius: 8, padding: 28, marginBottom: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 20 }}>
          Adicionar projeto
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={lbl}>Título do projeto</label>
            <input value={novo.titulo} onChange={e => setNovo(n => ({ ...n, titulo: e.target.value }))} style={inp} placeholder="Ex: Cozinha Contemporânea" />
          </div>
          <div>
            <label style={lbl}>Categoria</label>
            <select value={novo.categoria} onChange={e => setNovo(n => ({ ...n, categoria: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
              {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Localização</label>
            <input value={novo.local} onChange={e => setNovo(n => ({ ...n, local: e.target.value }))} style={inp} placeholder="Ex: Niterói, RJ" />
          </div>
          <div>
            <label style={lbl}>Ordem na galeria</label>
            <input type="number" value={novo.ordem} onChange={e => setNovo(n => ({ ...n, ordem: Number(e.target.value) }))} style={inp} min={0} />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Descrição do projeto</label>
          <textarea
            value={novo.descricao}
            onChange={e => setNovo(n => ({ ...n, descricao: e.target.value }))}
            rows={3}
            style={{ ...inp, resize: 'vertical' }}
            placeholder="Descreva o projeto: materiais, ambiente, detalhes relevantes..."
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>Imagem</label>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => e.target.files?.[0] && uploadImagem(e.target.files[0])} />
          <button onClick={() => fileRef.current?.click()} disabled={uploadando} style={{
            ...inp, cursor: 'pointer', textAlign: 'left', background: '#FAFAF8',
            color: novo.img_url ? '#16A34A' : '#78716C',
          }}>
            {uploadando ? 'Enviando...' : novo.img_url ? '✓ Imagem enviada' : '📤 Selecionar imagem'}
          </button>
        </div>

        {novo.img_url && (
          <img src={novo.img_url} alt="preview" style={{ height: 120, width: 200, objectFit: 'cover', borderRadius: 6, marginBottom: 14 }} />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={novo.tall} onChange={e => setNovo(n => ({ ...n, tall: e.target.checked }))} />
            Imagem alta (ocupa 2 linhas na galeria)
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={novo.ativo} onChange={e => setNovo(n => ({ ...n, ativo: e.target.checked }))} />
            Visível no site
          </label>
        </div>

        {msg && <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 12 }}>{msg}</p>}

        <button onClick={adicionar} disabled={salvando} style={{
          padding: '10px 24px', background: '#C4A882', color: '#fff', border: 'none',
          borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          {salvando ? 'Salvando...' : '+ Adicionar ao portfólio'}
        </button>
      </div>

      {/* Lista de itens */}
      <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6' }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Projetos cadastrados ({items.length})
          </h2>
        </div>

        {loading ? (
          <p style={{ padding: 24, fontSize: 13, color: '#78716C' }}>Carregando...</p>
        ) : items.length === 0 ? (
          <p style={{ padding: 24, fontSize: 13, color: '#78716C' }}>Nenhum projeto cadastrado ainda.</p>
        ) : (
          <div>
            {items.map((item, i) => (
              <div key={item.id} style={{ borderBottom: i < items.length - 1 ? '1px solid #F9FAFB' : 'none' }}>

                {/* Linha resumo */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '14px 24px',
                  opacity: item.ativo ? 1 : 0.5,
                }}>
                  {item.img_url
                    ? <img src={item.img_url} alt={item.titulo} style={{ width: 72, height: 52, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                    : <div style={{ width: 72, height: 52, background: '#F3F4F6', borderRadius: 4, flexShrink: 0 }} />
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1C1917', marginBottom: 2 }}>{item.titulo}</div>
                    <div style={{ fontSize: 12, color: '#78716C' }}>
                      {item.categoria}{item.local ? ` · ${item.local}` : ''}{!item.ativo ? ' · Oculto' : ''}
                    </div>
                    {item.descricao && (
                      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.descricao}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => editandoId === item.id ? setEditandoId(null) : iniciarEdicao(item)}
                      style={{ ...btnSm, background: editandoId === item.id ? '#EFF6FF' : '#F9FAFB', color: editandoId === item.id ? '#2563EB' : '#374151' }}>
                      {editandoId === item.id ? 'Fechar' : 'Editar'}
                    </button>
                    <button onClick={() => excluir(item.id)} style={{ ...btnSm, background: '#FEF2F2', color: '#DC2626' }}>
                      Excluir
                    </button>
                  </div>
                </div>

                {/* Formulário de edição inline */}
                {editandoId === item.id && (
                  <div style={{ padding: '24px', background: '#FAFAF8', borderTop: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                      <div>
                        <label style={lbl}>Título</label>
                        <input value={editData.titulo} onChange={e => setEditData(d => ({ ...d, titulo: e.target.value }))} style={inp} />
                      </div>
                      <div>
                        <label style={lbl}>Categoria</label>
                        <select value={editData.categoria} onChange={e => setEditData(d => ({ ...d, categoria: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={lbl}>Localização</label>
                        <input value={editData.local} onChange={e => setEditData(d => ({ ...d, local: e.target.value }))} style={inp} placeholder="Ex: Niterói, RJ" />
                      </div>
                      <div>
                        <label style={lbl}>Ordem na galeria</label>
                        <input type="number" value={editData.ordem} onChange={e => setEditData(d => ({ ...d, ordem: Number(e.target.value) }))} style={inp} min={0} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>Descrição</label>
                      <textarea
                        value={editData.descricao}
                        onChange={e => setEditData(d => ({ ...d, descricao: e.target.value }))}
                        rows={4}
                        style={{ ...inp, resize: 'vertical' }}
                        placeholder="Descreva o projeto: materiais, ambiente, detalhes relevantes..."
                      />
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={lbl}>Imagem</label>
                      <input ref={fileEditRef} type="file" accept="image/*" style={{ display: 'none' }}
                        onChange={e => e.target.files?.[0] && uploadImagem(e.target.files[0], true)} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {editData.img_url && (
                          <img src={editData.img_url} alt="preview" style={{ height: 64, width: 96, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />
                        )}
                        <button onClick={() => fileEditRef.current?.click()} disabled={uploadandoEdit} style={{
                          ...inp, width: 'auto', cursor: 'pointer', color: '#2563EB',
                        }}>
                          {uploadandoEdit ? 'Enviando...' : '📤 Trocar imagem'}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
                        <input type="checkbox" checked={editData.tall} onChange={e => setEditData(d => ({ ...d, tall: e.target.checked }))} />
                        Imagem alta (ocupa 2 linhas)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
                        <input type="checkbox" checked={editData.ativo} onChange={e => setEditData(d => ({ ...d, ativo: e.target.checked }))} />
                        Visível no site
                      </label>
                    </div>

                    {msgEdit && <p style={{ fontSize: 12, color: '#DC2626', marginBottom: 12 }}>{msgEdit}</p>}

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button onClick={() => setEditandoId(null)} style={{ ...btnSm, background: '#F3F4F6', color: '#374151', padding: '8px 18px' }}>
                        Cancelar
                      </button>
                      <button onClick={() => salvarEdicao(item.id)} disabled={salvandoEdit} style={{
                        ...btnSm, background: '#1C1917', color: '#fff', padding: '8px 18px',
                        opacity: salvandoEdit ? 0.7 : 1,
                      }}>
                        {salvandoEdit ? 'Salvando...' : '💾 Salvar alterações'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const lbl: React.CSSProperties = {
  display: 'block', fontSize: 11, fontWeight: 600, color: '#78716C',
  textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 5,
}
const btnSm: React.CSSProperties = {
  padding: '5px 12px', border: 'none', borderRadius: 4, fontSize: 12,
  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500,
}
