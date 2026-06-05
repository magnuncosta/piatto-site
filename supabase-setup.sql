-- =============================================
-- PIATTO SITE — Rodar no Supabase SQL Editor
-- =============================================

-- Configurações gerais do site
create table if not exists site_config (
  key text primary key,
  value text default '',
  updated_at timestamptz default now()
);

insert into site_config (key, value) values
  ('logo_url',        ''),
  ('hero_titulo',     'Cada detalhe, um propósito.'),
  ('hero_subtitulo',  'Móveis planejados sob medida que transformam ambientes em experiências únicas. Do projeto à instalação, cada peça feita para você.'),
  ('sobre_texto_1',   'A Piatto Planejados nasceu da paixão por unir funcionalidade e beleza em cada projeto. Desde o início, nossa missão é simples: criar móveis que duram e encantam — peças que crescem junto com a família de quem os escolheu.'),
  ('sobre_texto_2',   'Trabalhamos com fabricação própria, o que nos garante controle total sobre a qualidade, os prazos e os detalhes que fazem a diferença. Do primeiro esboço até a instalação final, acompanhamos cada etapa com atenção e cuidado.'),
  ('whatsapp',        '5521969530979'),
  ('telefone',        '(21) 9 6953-0979'),
  ('email',           'contato@piattoplanejados.com.br'),
  ('endereco',        'Niterói, Rio de Janeiro e Grande Rio'),
  ('instagram_url',   ''),
  ('facebook_url',    '')
on conflict (key) do nothing;

alter table site_config enable row level security;
create policy "leitura publica site_config"    on site_config for select using (true);
create policy "escrita autenticada site_config" on site_config for all    using (auth.role() = 'authenticated');

-- Portfólio
create table if not exists site_portfolio (
  id         uuid primary key default gen_random_uuid(),
  titulo     text not null default '',
  categoria  text not null default 'Geral',
  local      text default '',
  img_url    text default '',
  tall       boolean default false,
  ordem      int default 0,
  ativo      boolean default true,
  created_at timestamptz default now()
);

alter table site_portfolio enable row level security;
create policy "leitura publica site_portfolio"    on site_portfolio for select using (ativo = true);
create policy "escrita autenticada site_portfolio" on site_portfolio for all    using (auth.role() = 'authenticated');

-- Coluna de descrição do projeto (adicionada depois)
alter table site_portfolio add column if not exists descricao text default '';

-- Galeria de mídias por projeto (fotos e vídeos do lightbox)
create table if not exists site_portfolio_midia (
  id           uuid primary key default gen_random_uuid(),
  portfolio_id uuid references site_portfolio(id) on delete cascade,
  url          text not null,
  tipo         text default 'image',
  ordem        int default 0,
  created_at   timestamptz default now()
);

alter table site_portfolio_midia enable row level security;
create policy "leitura publica midia"     on site_portfolio_midia for select using (true);
create policy "escrita autenticada midia" on site_portfolio_midia for all    using (auth.role() = 'authenticated');

-- =============================================
-- STORAGE: criar bucket "site-assets"
-- Supabase → Storage → New bucket
-- Nome: site-assets   |   Public: SIM
-- =============================================

-- =============================================
-- ⚠️  IMPORTANTE — BANCO COMPARTILHADO COM O CRM
-- O site público lê estas tabelas SEM login (anon key), direto no browser.
-- Por isso elas PRECISAM manter a política de LEITURA PÚBLICA (select).
-- Se alguma rotina de segurança do CRM fechar o RLS de todo o schema
-- (ex: "authenticated only" em todas as tabelas), rode o bloco abaixo
-- para restaurar a leitura pública APENAS das tabelas do site:
-- =============================================
-- DROP POLICY IF EXISTS site_config_public_read         ON site_config;
-- DROP POLICY IF EXISTS site_portfolio_public_read       ON site_portfolio;
-- DROP POLICY IF EXISTS site_portfolio_midia_public_read ON site_portfolio_midia;
-- CREATE POLICY site_config_public_read         ON site_config          FOR SELECT USING (true);
-- CREATE POLICY site_portfolio_public_read       ON site_portfolio       FOR SELECT USING (ativo = true);
-- CREATE POLICY site_portfolio_midia_public_read ON site_portfolio_midia FOR SELECT USING (true);
