import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  TrendingUp,
  Gift,
  Box,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Mail,
  User,
} from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/useAuth";
import { Badge } from "./ui/badge";

type PostItem = {
  id: string | number;
  title: string | null;
  status: string;
  created_at: string;
  donatur_id: string | null;
  taken_by: string | null;
};

type Transaksi = {
  id: string | number;
  nama_barang: string | null;
  status: string;
  created_at: string;
  sumber: string;
  user_role: "giver" | "receiver" | "other";
};

type Stats = {
  total: number;
  didonasikan: number;
  diterima: number;
};

type Profile = {
  id: string;
  nama: string;
  email?: string | null;
  bio?: string | null;
  created_at?: string;
};

export default function ProfilPengguna() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    didonasikan: 0,
    diterima: 0,
  });
  const [riwayat, setRiwayat] = useState<Transaksi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      loadAll(user.id);
    }
  }, [user, authLoading, navigate]);

  async function loadAll(userId: string) {
    try {
      setLoading(true);

      const { data: pData, error: pError } = await supabase
        .from("profiles")
        .select("id, nama, email, bio, created_at")
        .eq("id", userId)
        .maybeSingle();

      if (pError) console.warn("Profile warning:", pError.message);

      if (pData) {
        setProfile(pData);
      } else if (user) {
        setProfile({
          id: user.id,
          nama: user.user_metadata?.full_name || user.email || "Pengguna",
          email: user.email,
          created_at: user.created_at,
          bio: "Selamat datang di Collective!",
        });
      }

      const { data: tData, error: tError } = await supabase
        .from("posts")
        .select("id, title, status, created_at, donatur_id, taken_by")
        .or(`donatur_id.eq.${userId},taken_by.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (tError) {
        throw new Error(`Gagal mengambil riwayat: ${tError.message}`);
      }

      if (tData) {
        const posts = tData as PostItem[];

        const didonasikanCount = posts.filter(
          (p) => p.donatur_id === userId
        ).length;

        const diterimaCount = posts.filter(
          (p) => p.taken_by === userId && p.status === "taken"
        ).length;

        setStats({
          total: posts.length,
          didonasikan: didonasikanCount,
          diterima: diterimaCount,
        });

        const mapped: Transaksi[] = posts.map((p) => {
          const isGiver = p.donatur_id === userId;
          return {
            id: p.id,
            nama_barang: p.title,
            status:
              p.status === "taken"
                ? "Selesai"
                : p.status === "available"
                ? "Tersedia"
                : p.status,
            created_at: p.created_at,
            sumber: isGiver ? "Donasi Diberikan" : "Donasi Diterima",
            user_role: isGiver ? "giver" : "receiver",
          };
        });

        setRiwayat(mapped);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui";
      console.error("Error loading profile:", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function formatTanggal(t: string) {
    return new Date(t).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (authLoading || loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-emerald-500 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const inisial = profile.nama?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
        {/* Banner & Profil Header */}
      <section className="overflow-hidden rounded-3xl border border-amber-200/60 bg-white shadow-sm transition-all">
        {/* Banner Top - Cream Warm dengan Subtle Dot Grid & Lines */}
        <div className="relative h-36 bg-amber-50/80 border-b border-amber-200/50 overflow-hidden">
          {/* Geometric Grid Overlay - Emerald Dots */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #043123 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Abstract Accent Lines */}
          <div className="absolute top-0 right-1/4 h-full w-px bg-amber-200/60" />
          <div className="absolute top-0 right-1/3 h-full w-px bg-amber-200/30" />
        </div>

        <div className="relative px-6 pb-6 pt-0 sm:px-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
            {/* Avatar Container - Emerald Base & White Initial */}
            <div className="-mt-14 flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-emerald-600 shadow-lg ring-1 ring-emerald-900/10 sm:h-28 sm:w-28 relative group">
              <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {inisial}
              </span>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-emerald-500" />
            </div>

            <div className="flex-1 space-y-2 pt-1 sm:pt-0">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {profile.nama}
                </h1>
                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                  Aktif
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-slate-600 max-w-2xl">
                {profile.bio || "Pengguna aktif komunitas berbagi."}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-medium">
                <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200/40 bg-emerald-50/50 px-3 py-1.5 text-slate-600">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    Bergabung{" "}
                    {profile.created_at
                      ? formatTanggal(profile.created_at)
                      : "Baru Saja"}
                  </span>
                </div>

                {profile.email && (
                  <div className="flex items-center gap-1.5 rounded-xl border border-emerald-200/40 bg-emerald-50/50 px-3 py-1.5 text-slate-600">
                    <Mail className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{profile.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        {/* Ringkasan Statistik */}
        {/* Ringkasan Statistik */}
<section className="rounded-3xl border border-amber-200/60 bg-white p-6 shadow-sm">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-base font-bold text-slate-900 tracking-tight">
      Statistik Aktivitas
    </h2>
  </div>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {/* Total Transaksi - Cream Base */}
    <div className="flex items-center gap-4 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4 transition-all hover:bg-amber-50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
        <TrendingUp className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">Total Transaksi</p>
        <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
      </div>
    </div>

    {/* Donasi Diberikan - Emerald Accent */}
    <div className="flex items-center gap-4 rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-4 transition-all hover:bg-emerald-50/70">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-700">
        <Gift className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">Donasi Diberikan</p>
        <p className="text-2xl font-bold text-slate-900">{stats.didonasikan}</p>
      </div>
    </div>

    {/* Donasi Diterima - Cream/Emerald Mix */}
    <div className="flex items-center gap-4 rounded-2xl border border-emerald-200/40 bg-amber-50/30 p-4 transition-all hover:bg-amber-50/60">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600">
        <Box className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">Donasi Diterima</p>
        <p className="text-2xl font-bold text-slate-900">{stats.diterima}</p>
      </div>
    </div>
  </div>
</section>
        {/* Tabel / Daftar Riwayat Transaksi */}
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Riwayat Transaksi Terbaru
              </h2>
              <p className="text-xs text-slate-500">
                Aktivitas donasi yang kamu berikan dan terima.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-slate-200 bg-slate-50 font-medium text-slate-600 px-3 py-1 rounded-full">
                {riwayat.length} Transaksi
              </Badge>

              <Link to="/riwayat-donasi">
                <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">
                  Lihat Semua
                </button>
              </Link>
            </div>
          </div>

          {riwayat.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                <Box className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Belum ada riwayat transaksi
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Transaksi donasi kamu akan muncul di sini.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {riwayat.map((trx) => {
                const isSelesai = trx.status === "Selesai" || trx.status === "taken";
                const isTersedia = trx.status === "Tersedia" || trx.status === "available";
                const isGiver = trx.user_role === "giver";

                return (
                  <div
                    key={trx.id}
                    className="group flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/30 p-4 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isGiver
                            ? "bg-emerald-100/70 text-emerald-700"
                            : "bg-teal-100/70 text-teal-700"
                        }`}
                      >
                        {isGiver ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownLeft className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                          {trx.nama_barang || `Postingan #${trx.id}`}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span className="font-medium text-slate-600">
                            {trx.sumber}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span>{formatTanggal(trx.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Badge
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${
                          isSelesai
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : isTersedia
                            ? "border-amber-200 bg-amber-50 text-amber-700"
                            : "border-slate-200 bg-slate-100 text-slate-700"
                        }`}
                      >
                        {isSelesai && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {isTersedia && <Clock className="h-3.5 w-3.5" />}
                        {trx.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}