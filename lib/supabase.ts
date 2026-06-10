import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, key)

export async function getSiteConfig(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from('site_config').select('key, value')
  // Em caso de falha do banco, lança o erro: o Next.js mantém a última versão
  // boa do site (ISR) em vez de sobrescrever com o conteúdo padrão.
  if (error) throw error
  if (!data) return {}
  return Object.fromEntries(data.map(r => [r.key, r.value ?? '']))
}

export async function getPortfolio() {
  const { data, error } = await supabase
    .from('site_portfolio')
    .select('*')
    .eq('ativo', true)
    .order('ordem')
    .order('created_at')
  if (error) throw error
  return data ?? []
}
