import { redirect } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { createAuthClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// US-07 (bonus): daftar produk di halaman admin diambil langsung dari tabel produk di database.
export default async function HalamanAdmin() {
  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  let daftarProduk = [];
  let errorMsg = null;

  try {
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      errorMsg = error.message;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    errorMsg = err.message || "Gagal memuat produk dari database.";
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {errorMsg ? (
        <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
          <p className="font-semibold">Gagal memuat daftar produk</p>
          <p className="mt-1 text-sm">{errorMsg}</p>
        </div>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
