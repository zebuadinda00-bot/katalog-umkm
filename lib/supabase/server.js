import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

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

/**
 * Koneksi Supabase sesi admin menggunakan @supabase/ssr dan cookie,
 * memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY.
 * Digunakan untuk autentikasi (login, logout, ganti password) dan aksi admin yang mematuhi RLS.
 */
export async function createAuthClient() {
  const cookieStore = await cookies();
  const rawUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!rawUrl || !publishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY harus diisi di environment variable."
    );
  }

  const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");

  return createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Bila dipanggil saat render Server Component, set cookie dapat diabaikan
        }
      },
    },
  });
}

export const createSessionClient = createAuthClient;

export default createClient;
