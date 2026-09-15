# O Caso da Sprint

Retrospectiva de Sprint no formato de jogo de investigação. Cada pessoa entra numa
sala pelo código, escolhe seu detetive e responde sozinha; quando todos terminam, as
evidências se cruzam e o "crime" da Sprint é revelado.

Stack: **React + Vite** (frontend) · **Supabase** (banco + tempo real) · **Vercel** (publicação).
Tudo dentro dos planos gratuitos.

---

## Como funciona a sala compartilhada

A sala inteira (código, sprint, fase, lista de jogadores e respostas) fica guardada
como um JSON numa tabela `rooms` no Supabase. O Supabase Realtime avisa todos os
jogadores quando esse JSON muda, então quem está na sala de espera vê "3/5 prontos"
atualizar na hora, sem recarregar.

---

## Passo a passo para publicar (do zero, ~20 min)

### 1. Criar o projeto no Supabase
1. Acesse https://supabase.com e crie uma conta (gratuita).
2. Clique em **New project**. Dê um nome (ex.: `detetive-da-sprint`) e uma senha de banco.
3. Espere o projeto provisionar (~2 min).
4. No menu lateral, abra **SQL Editor** → **New query**, cole todo o conteúdo do
   arquivo `supabase-setup.sql` e clique em **Run**. Isso cria a tabela e liga o Realtime.
5. Vá em **Project Settings → API** e copie dois valores:
   - **Project URL** (algo como `https://xxxx.supabase.co`)
   - **anon public** key (uma chave longa)

### 2. Rodar localmente (opcional, para testar antes)
```bash
npm install
cp .env.example .env.local
# edite .env.local e cole a URL e a chave do Supabase
npm run dev
```
Abra o endereço que aparecer (ex.: http://localhost:5173). Teste criar um caso e
entrar nele em duas abas para ver a sincronização.

### 3. Subir o código no GitHub
1. Crie uma conta em https://github.com (se não tiver).
2. Crie um repositório novo (ex.: `detetive-da-sprint`), vazio.
3. No terminal, dentro desta pasta:
```bash
git init
git add .
git commit -m "Detetive da Sprint"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/detetive-da-sprint.git
git push -u origin main
```

### 4. Publicar na Vercel
1. Acesse https://vercel.com e entre com sua conta do GitHub.
2. Clique em **Add New → Project** e importe o repositório `detetive-da-sprint`.
3. A Vercel detecta Vite sozinha. Antes de clicar em Deploy, abra
   **Environment Variables** e adicione as duas:
   - `VITE_SUPABASE_URL` = a Project URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = a chave anon public
4. Clique em **Deploy**. Em ~1 min você recebe um endereço público, algo como
   `https://detetive-da-sprint.vercel.app`.

Pronto. Mande esse endereço para a equipe.

### 5. Atualizações futuras
Qualquer mudança no código é só dar `git push` — a Vercel refaz o deploy sozinha.

---

## Fluxo de uso numa retro
1. O facilitador acessa o site → **Abrir novo caso** → digita a Sprint (ex.: S252) →
   recebe um código (ex.: `7KQ2`).
2. Manda para o grupo: "Entrem na sala 7KQ2".
3. Cada pessoa acessa o site pelo celular ou PC → **Entrar em investigação** → digita
   o código → escolhe seu detetive → responde.
4. Quando todos fecham o dossiê, aparece **Revelar o caso** e o resultado consolidado.

---

## Observação sobre segurança
As políticas do `supabase-setup.sql` deixam a tabela `rooms` pública (leitura e escrita
com a chave anônima), o que é adequado para uma ferramenta interna de retro sem login.
Não guarde nada sensível nas respostas. Se um dia precisar restringir acesso, dá para
trocar as políticas de RLS no Supabase.
