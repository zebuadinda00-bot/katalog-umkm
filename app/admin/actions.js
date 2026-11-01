"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server";

/**
 * Server Action untuk login admin menggunakan Supabase Auth (email dan password).
 * Mendukung pemanggilan via useActionState(login) maupun langsung <form action={login}>.
 */
export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;

  const email = data?.get ? data.get("email") : null;
  const password = data?.get ? data.get("password") : null;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    return {
      error:
        error.message === "Invalid login credentials"
          ? "Email atau password salah. Silakan periksa kembali."
          : (error.message || "Gagal masuk. Silakan coba lagi."),
    };
  }

  redirect("/admin");
}

/**
 * Server Action untuk logout admin (mengakhiri sesi dan kembali ke /admin/login).
 */
export async function keluar() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/**
 * Server Action untuk ganti password admin yang sedang login.
 * Memvalidasi panjang minimal 8 karakter dan kesamaan konfirmasi password.
 */
export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;

  const passwordBaru = data?.get ? data.get("password_baru") : null;
  const konfirmasiPassword = data?.get ? data.get("konfirmasi_password") : null;

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Konfirmasi password tidak sama dengan password baru." };
  }

  const supabase = await createAuthClient();

  // Validasi login di server (keamanan wajib)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Sesi login telah berakhir. Silakan login kembali." };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (updateError) {
    return {
      error: updateError.message || "Gagal mengganti password. Silakan coba lagi.",
    };
  }

  return { success: "Password berhasil diganti." };
}

export const masuk = login;
export const logout = keluar;
export const ubahPassword = gantiPassword;
