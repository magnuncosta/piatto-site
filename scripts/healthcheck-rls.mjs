#!/usr/bin/env node
// Verifica se a LEITURA PÚBLICA (anon) das tabelas do site está funcionando.
// Se a RLS voltar a bloquear (ex.: após um lockdown de segurança no banco
// compartilhado), este script falha com instruções de correção.
//
// Uso:
//   node scripts/healthcheck-rls.mjs
// Lê NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY de .env.local

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function loadEnv() {
  const env = { ...process.env }
  try {
    const raw = readFileSync(join(root, '.env.local'), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {}
  return env
}

const env = loadEnv()
const URL = env.NEXT_PUBLIC_SUPABASE_URL
const KEY = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!URL || !KEY) {
  console.error('✗ Faltam NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(2)
}

// Tabelas que PRECISAM de leitura pública para o site funcionar.
const TABELAS = ['site_config', 'site_portfolio', 'site_portfolio_midia']

async function contar(tabela) {
  const res = await fetch(`${URL}/rest/v1/${tabela}?select=*`, {
    headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Prefer: 'count=exact' },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${tabela}`)
  // Range: 0-9/123  → total após a barra
  const range = res.headers.get('content-range') || ''
  const total = Number(range.split('/')[1] || '0')
  return total
}

const SQL_FIX = `-- Rode no Supabase SQL Editor:
drop policy if exists "leitura publica site_config" on site_config;
create policy "leitura publica site_config" on site_config for select using (true);
drop policy if exists "leitura publica site_portfolio" on site_portfolio;
create policy "leitura publica site_portfolio" on site_portfolio for select using (ativo = true);
drop policy if exists "leitura publica midia" on site_portfolio_midia;
create policy "leitura publica midia" on site_portfolio_midia for select using (true);`

let falhou = false
for (const t of TABELAS) {
  try {
    const n = await contar(t)
    if (n > 0) {
      console.log(`✓ ${t}: ${n} registros visíveis (anon)`)
    } else {
      console.error(`✗ ${t}: 0 registros visíveis (anon) — RLS pode estar bloqueando a leitura pública`)
      falhou = true
    }
  } catch (e) {
    console.error(`✗ ${t}: ${e.message}`)
    falhou = true
  }
}

if (falhou) {
  console.error('\n⚠ Leitura pública quebrada. As políticas de RLS provavelmente foram derrubadas')
  console.error('  (ex.: por um lockdown de segurança no banco compartilhado).\n')
  console.error(SQL_FIX)
  process.exit(1)
}
console.log('\n✓ Leitura pública do site OK.')
