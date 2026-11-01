import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Koneksi Supabase di sisi server menggunakan kunci rahasia (SUPABASE_SECRET_KEY).
 * Digunakan untuk membaca data publik (seperti katalog produk) yang dilindungi RLS.
 */
export function createClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!rawUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diisi di environment variable."
    );
  }

  // Normalisasi URL jika terdapat akhiran /rest/v1 atau slash di akhir
  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  return createSupabaseClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export default createClient;

