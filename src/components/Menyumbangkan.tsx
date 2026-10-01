import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/useAuth";

export default function Menyumbangkan() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("Buku");
  const [donatur, setDonatur] = useState("");
  const [lokasiPengambilan, setLokasiPengambilan] = useState("Ruang Jurusan Informatika");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect jika belum login
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Set initial value donatur hanya sekali saat user pertama kali loaded
  useEffect(() => {
    if (user && user.user_metadata?.full_name && !donatur) {
      setDonatur(user.user_metadata.full_name);
    }
  }, [user]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) {
      alert("Anda harus login untuk melakukan donasi.");
      navigate("/login");
      return;
    }

    const namaTrim = nama.trim();
    const deskripsiTrim = deskripsi.trim();
    const lokasiTrim = lokasiPengambilan.trim();
    const donaturTrim = donatur.trim();

    if (!namaTrim) {
      alert("Nama barang wajib diisi.");
      return;
    }

    if (!lokasiTrim) {
      alert("Lokasi tempat pengambilan wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("posts").insert({
        title: namaTrim,
        kategori,
        status: "available",
        description: deskripsiTrim || null,
        lokasi_pengambilan: lokasiTrim,
        donatur_id: user.id,
        donatur_nama: donaturTrim || user.user_metadata?.full_name || "Mahasiswa UIN",
      });

      if (error) {
        console.error("Supabase insert error:", error);
        alert(`Gagal menyimpan donasi: ${error.message}`);
      } else {
        alert("Terima kasih! Donasi kamu sudah tercatat ✅");

        // Reset form state
        setNama("");
        setDeskripsi("");
        setKategori("Buku");
        setLokasiPengambilan("Ruang Jurusan Informatika");
        setDonatur(user.user_metadata?.full_name || "");

        navigate("/daftar-barang");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div 
        className="flex min-h-screen items-center justify-center bg-[#FAF7F2]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[var(--color-brand-dark)] border-t-transparent animate-spin" />
          <p className="text-slate-600 text-sm font-medium">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#FAF7F2] py-10 sm:py-16 px-4 sm:px-8"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header Judul & SOP */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xs space-y-5">
          <h1 
            className="text-xl sm:text-2xl font-bold text-[var(--color-brand-dark)] leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Menyumbangkan Barang
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            Bantu teman-teman mahasiswa lain dengan menyumbangkan buku, alat, atau perlengkapan yang masih layak pakai.
          </p>

          <div className="rounded-xl bg-[#F3F1E9] border border-slate-200/80 p-5 sm:p-6 space-y-3 mt-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Standar Operasional Prosedur (SOP) Donasi
            </p>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
              <li>Pastikan kondisi barang masih layak untuk digunakan.</li>
              <li>Tuliskan deskripsi kondisi fisik barang secara jujur dan akurat.</li>
              <li>Barang yang Anda donasikan akan langsung terbit pada daftar barang publik.</li>
            </ul>
          </div>
        </div>

        {/* Form Donasi */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/80 bg-white p-8 sm:p-10 shadow-xs space-y-7"
        >
          {/* Nama Barang */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Nama Barang <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Kalkulus dan Geometri Analitik Jilid 1"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border-slate-200 bg-[#FAF7F2]/50 focus:bg-white focus:border-[var(--color-brand-dark)] rounded-xl text-xs sm:text-sm h-11 px-4"
              required
            />
          </div>

          {/* Kategori & Nama Donatur */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Kategori
              </label>
              <Select value={kategori} onValueChange={setKategori}>
                <SelectTrigger className="border-slate-200 bg-[#FAF7F2]/50 focus:bg-white focus:border-[var(--color-brand-dark)] rounded-xl text-xs sm:text-sm h-11 px-4">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent className="bg-white border-slate-200 rounded-xl">
                  <SelectItem value="Buku">Buku</SelectItem>
                  <SelectItem value="Perlengkapan">Perlengkapan</SelectItem>
                  <SelectItem value="Elektronik">Elektronik</SelectItem>
                  <SelectItem value="Alat">Alat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">
                Nama Donatur
              </label>
              <Input
                placeholder="Contoh: Ahmad Rizki"
                value={donatur}
                onChange={(e) => setDonatur(e.target.value)}
                className="border-slate-200 bg-[#FAF7F2]/50 focus:bg-white focus:border-[var(--color-brand-dark)] rounded-xl text-xs sm:text-sm h-11 px-4"
              />
            </div>
          </div>

          {/* Lokasi Pengambilan */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Lokasi Tempat Pengambilan Barang <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="Contoh: Ruang Jurusan Informatika / Lobi Gedung C"
              value={lokasiPengambilan}
              onChange={(e) => setLokasiPengambilan(e.target.value)}
              className="border-slate-200 bg-[#FAF7F2]/50 focus:bg-white focus:border-[var(--color-brand-dark)] rounded-xl text-xs sm:text-sm h-11 px-4"
              required
            />
            <div className="text-xs text-slate-700 bg-amber-50/80 border border-amber-200/80 p-3.5 rounded-xl flex items-center gap-2.5 mt-2">
              <MapPin className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Pastikan barang sudah diletakkan di lokasi tersebut agar dapat langsung diambil oleh penerima donasi.</span>
            </div>
          </div>

          {/* Deskripsi Barang */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-slate-700">
              Deskripsi Barang
            </label>
            <Textarea
              rows={4}
              placeholder="Contoh: Kondisi 90%, ada sedikit coretan di halaman awal..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="border-slate-200 bg-[#FAF7F2]/50 focus:bg-white focus:border-[var(--color-brand-dark)] rounded-xl text-xs sm:text-sm p-4 resize-none"
            />
          </div>

          {/* Tombol Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-accent)] text-white hover:text-white transition-all text-sm font-semibold rounded-xl shadow-xs disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Donasikan Sekarang"}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}