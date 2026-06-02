import Reveal from './Reveal'

interface Depoimento { texto: string; nome: string; local: string }

const DEFAULT_DEPOIMENTOS: Depoimento[] = [
  { texto: 'A Piatto transformou completamente a minha cozinha. O projeto foi impecável, o prazo foi cumprido e o acabamento ficou melhor do que eu imaginava. Recomendo sem hesitar.', nome: 'Fernanda Oliveira', local: 'Niterói, RJ' },
  { texto: 'Contratei para o closet do quarto e um home office. Profissionais excepcionais, atenção aos detalhes que ninguém mais percebe e atendimento de verdade. Voltarei para a próxima reforma.', nome: 'Rafael Mendes', local: 'Rio de Janeiro, RJ' },
  { texto: 'O projeto 3D me ajudou muito a visualizar o resultado final. Quando chegou o dia da instalação, foi exatamente como prometido. Qualidade e seriedade em todas as etapas.', nome: 'Camila Rodrigues', local: 'São Gonçalo, RJ' },
  { texto: '', nome: '', local: '' },
  { texto: '', nome: '', local: '' },
  { texto: '', nome: '', local: '' },
]

export default function Testimonials({ titulo, items }: { titulo?: string; items?: Depoimento[] }) {
  const todos = (items && items.length > 0) ? items : DEFAULT_DEPOIMENTOS
  const depoimentos = todos.filter(d => d.texto.trim())
  return (
    <section style={{ padding: '100px 24px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            Depoimentos
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: 'var(--ink)' }}>
            {titulo || 'O que nossos clientes dizem'}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {depoimentos.map((d, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ background: '#fff', padding: '40px 36px', borderRadius: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ color: 'var(--accent)', fontSize: 14, letterSpacing: 4, marginBottom: 24 }}>★★★★★</div>
                <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.75, flex: 1, marginBottom: 32, fontStyle: 'italic' }}>
                  &ldquo;{d.texto}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--accent)', fontWeight: 500, flexShrink: 0 }}>
                    {d.nome[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{d.nome}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{d.local}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
