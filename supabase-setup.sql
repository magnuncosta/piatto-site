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

-- =============================================
-- STORAGE: criar bucket "site-assets"
-- Supabase → Storage → New bucket
-- Nome: site-assets   |   Public: SIM
-- =============================================
