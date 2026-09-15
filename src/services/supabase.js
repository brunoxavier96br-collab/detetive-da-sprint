import { createClient } from "@supabase/supabase-js";

// As credenciais vêm de variáveis de ambiente (Vite expõe as que começam com VITE_).
// Em desenvolvimento: arquivo .env.local  |  Na Vercel: painel Environment Variables.
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Aviso claro no console se esquecer de configurar.
  console.warn(
    "[Supabase] VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não configurados. " +
      "As salas não vão funcionar até você preencher as credenciais."
  );
}

export const supabase = createClient(url || "http://localhost", anonKey || "public-anon-key");
