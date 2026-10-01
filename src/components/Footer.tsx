import { Link } from "react-router-dom";
import { Heart, ArrowUpRight, HandHeart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 w-full border-t border-slate-200/80 bg-[#FAF7F2] text-[var(--color-brand-dark)]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Kolom 1: Branding & Deskripsi */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            {/* Brand Logo - Selaras dengan Navbar */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F1E9] text-[var(--color-brand-dark)] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md border border-slate-200/80 overflow-hidden">
                <HandHeart className="h-5 w-5 text-[var(--color-brand-dark)] transition-colors duration-300 group-hover:text-[var(--color-brand-accent)]" />
              </div>
              <div className="flex flex-col" style={{ fontFamily: 'var(--font-sans)' }}>
                <span 
                  className="font-black text-base tracking-wider text-[var(--color-brand-dark)] transition-colors group-hover:text-[var(--color-brand-accent)] leading-none"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  COLLECTIVE
                </span>
                <span className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mt-1.5 leading-none">
                  Platform Donasi Akademik
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              Platform kolektif mahasiswa FST untuk saling berbagi, mendonasikan, dan meminjamkan sumber daya akademik demi mendukung keberlanjutan perkuliahan bersama.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-[var(--color-brand-dark)]">
              <span className="flex h-2 w-2 rounded-full bg-[var(--color-brand-accent)] animate-pulse" />
              Komunitas Aktif FST UIN SGD
            </div>
          </div>

          {/* Kolom 2: Navigasi Ringkas */}
          <div className="space-y-4 lg:pl-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400" style={{ fontFamily: 'var(--font-sans)' }}>
              Eksplorasi
            </h3>
            <ul className="space-y-3 text-sm font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
              <li>
                <Link
                  to="/daftar-barang"
                  className="group inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-[var(--color-brand-accent)]"
                >
                  <span>Jelajahi Barang</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/menyumbangkan"
                  className="group inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-[var(--color-brand-accent)]"
                >
                  <span>Beri Donasi</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link
                  to="/profil"
                  className="group inline-flex items-center gap-1.5 text-slate-700 transition-colors hover:text-[var(--color-brand-accent)]"
                >
                  <span>Profil & Riwayat</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kartu Kontribusi / Callout */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-[#F3F1E9] p-5 shadow-xs">
              <div className="flex items-center gap-2 text-[var(--color-brand-dark)] font-bold text-xs mb-2">
                <HandHeart className="h-4 w-4 text-[var(--color-brand-accent)]" />
                <span>Punya Barang Tak Terpakai?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                Buku kuliah, alat praktikum, atau barang elektronikmu bisa sangat berguna bagi mahasiswa lain.
              </p>
              <Link
                to="/menyumbangkan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-dark)] px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[var(--color-brand-accent)] hover:text-[var(--color-brand-dark)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <span>Donasikan Sekarang</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Separator & Bottom Note */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t border-slate-200/80 pt-8 sm:flex-row text-xs text-slate-500" style={{ fontFamily: 'var(--font-sans)' }}>
          <p>© {new Date().getFullYear()} COLLECTIVE. Dikelola oleh dan untuk Mahasiswa FST.</p>
        </div>
      </div>
    </footer>
  );
}