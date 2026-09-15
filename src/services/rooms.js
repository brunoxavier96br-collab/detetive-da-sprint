import { supabase } from "./supabase.js";

/*
  Modelo de dados (tabela única "rooms"):
    code       text  (PK)      -> código do caso, ex "7KQ2"
    data       jsonb           -> objeto completo da sala:
                                  { code, sprint, phase, createdAt, updatedAt, players:[...] }
    updated_at timestamptz

  Guardar a sala inteira como JSON mantém a mesma "forma" que o jogo já usava
  com window.storage, então a lógica do jogo não muda. O Supabase Realtime
  avisa todos os jogadores quando o JSON muda.
*/

// Lê a sala pelo código. Retorna o objeto da sala ou null.
export async function readRoom(code) {
  const { data, error } = await supabase
    .from("rooms")
    .select("data")
    .eq("code", code)
    .maybeSingle();
  if (error) {
    console.error("[rooms] readRoom", error);
    return null;
  }
  return data ? data.data : null;
}

// Cria/sobrescreve a sala inteira.
export async function writeRoom(code, room) {
  const { error } = await supabase
    .from("rooms")
    .upsert({ code, data: room, updated_at: new Date().toISOString() }, { onConflict: "code" });
  if (error) {
    console.error("[rooms] writeRoom", error);
    return false;
  }
  return true;
}

// Insere ou atualiza um jogador dentro da sala (merge sobre a versão mais recente).
export async function upsertPlayer(code, player) {
  const room = await readRoom(code);
  if (!room) return null;
  const i = room.players.findIndex((p) => p.id === player.id);
  if (i >= 0) room.players[i] = player;
  else room.players.push(player);
  room.updatedAt = Date.now();
  await writeRoom(code, room);
  return room;
}

// Assina mudanças da sala em tempo real. Chama onChange(room) a cada atualização.
// Retorna uma função para cancelar a assinatura.
export function subscribeRoom(code, onChange) {
  const channel = supabase
    .channel(`room:${code}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "rooms", filter: `code=eq.${code}` },
      (payload) => {
        const row = payload.new;
        if (row && row.data) onChange(row.data);
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

export const genCode = () =>
  Array.from({ length: 4 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
  ).join("");

export const uid = () => Math.random().toString(36).slice(2, 10);
