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

export const masuk = login;
export const logout = keluar;

