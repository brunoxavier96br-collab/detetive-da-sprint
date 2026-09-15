-- =====================================================================
-- O Caso da Sprint — configuração do banco no Supabase
-- Cole tudo isto no SQL Editor do Supabase e clique em "Run".
-- =====================================================================

-- 1) Tabela de salas. A sala inteira fica num campo JSON (data).
create table if not exists public.rooms (
  code       text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Habilita Row Level Security (RLS).
alter table public.rooms enable row level security;

-- 3) Políticas de acesso.
--    O jogo é público e sem login: qualquer visitante (chave anônima)
--    pode ler e escrever salas. É adequado para uma ferramenta de retro.
--    (Se um dia quiser restringir, troque estas políticas.)
drop policy if exists "rooms_select_public" on public.rooms;
create policy "rooms_select_public"
  on public.rooms for select
  using (true);

drop policy if exists "rooms_insert_public" on public.rooms;
create policy "rooms_insert_public"
  on public.rooms for insert
  with check (true);

drop policy if exists "rooms_update_public" on public.rooms;
create policy "rooms_update_public"
  on public.rooms for update
  using (true)
  with check (true);

-- 4) Liga o Realtime para esta tabela (avisa os jogadores em tempo real).
alter publication supabase_realtime add table public.rooms;
