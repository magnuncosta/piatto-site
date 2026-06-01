import Reveal from './Reveal'

interface StatItem { number: string; label: string }

const DEFAULT_STATS: StatItem[] = [
  { number: '12+',  label: 'Anos de experiência' },
  { number: '600+', label: 'Projetos entregues' },
  { number: '100%', label: 'Fabricação própria' },
  { number: '5★',   label: 'Avaliação dos clientes' },
]

export default function Stats({ items }: { items?: StatItem[] }) {
  const stats = (items && items.length > 0) ? items : DEFAULT_STATS
  return (
    <section style={{ background: 'var(--ink)', padding: '52px 24px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 40,
        textAlign: 'center',
      }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 52, fontWeight: 300, color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>
              {s.number}
            </div>
            <div style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
