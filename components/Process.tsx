import Reveal from './Reveal'

interface Passo { n: string; titulo: string; texto: string }

const DEFAULT_PASSOS: Passo[] = [
  { n: '01', titulo: 'Consulta gratuita', texto: 'Agendamos uma visita técnica sem compromisso para entender o seu espaço, seus gostos e as necessidades do ambiente.' },
  { n: '02', titulo: 'Projeto 3D',        texto: 'Nossa equipe desenvolve um projeto personalizado com visualização em 3D para você aprovar cada detalhe antes da produção.' },
  { n: '03', titulo: 'Produção',          texto: 'Tudo fabricado na nossa própria marcenaria com materiais selecionados, garantindo qualidade e precisão em cada peça.' },
  { n: '04', titulo: 'Instalação',        texto: 'Nossa equipe técnica realiza a instalação completa com cuidado e atenção, deixando tudo perfeito para o seu uso.' },
]

export default function Process({ titulo, steps }: { titulo?: string; steps?: Passo[] }) {
  const passos = (steps && steps.length > 0) ? steps : DEFAULT_PASSOS
  return (
    <section style={{ padding: '100px 24px', background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <Reveal style={{ textAlign: 'center', marginBottom: 72 }}>
          <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            Como funciona
          </p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#fff' }}>
            {titulo || 'Do projeto à entrega'}
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48 }}>
          {passos.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 64, fontWeight: 300, color: 'rgba(196,168,130,0.15)', lineHeight: 1, marginBottom: 20 }}>
                {p.n}
              </div>
              <div style={{ width: 32, height: 1, background: 'var(--accent)', marginBottom: 20 }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 400, color: '#fff', marginBottom: 14 }}>
                {p.titulo}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{p.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
