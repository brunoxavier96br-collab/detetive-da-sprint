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


## Fluxo de uso numa retro
1. O facilitador acessa o site → **Abrir novo caso** → digita a Sprint (ex.: S252) →
   recebe um código (ex.: `7KQ2`).
2. Manda para o grupo: "Entrem na sala 7KQ2".
3. Cada pessoa acessa o site pelo celular ou PC → **Entrar em investigação** → digita
   o código → escolhe seu detetive → responde.
4. Quando todos fecham o dossiê, aparece **Revelar o caso** e o resultado consolidado.
