import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Book, Package, Laptop, Inbox, MapPin, UserCheck } from "lucide-react";

import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import { supabase } from "../lib/supabaseClient";

type Barang = {
  id: string;
  nama: string;
  kategori: string;
  status: string;
  donatur: string;
  lokasi_pengambilan?: string | null;
  deskripsi?: string | null;
};

function getIconForKategori(kategori: string) {
  if (kategori === "Buku") return Book;
  if (kategori === "Elektronik") return Laptop;
  return Package;
}

function renderStatusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "available":
    case "tersedia":
      return (
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100 font-medium text-xs px-2.5 py-0.5 rounded-md">
          Tersedia
        </Badge>
      );
    case "claimed":
    case "taken":
    case "sudah diambil":
      return (
        <Badge className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200/80 font-medium text-xs px-2.5 py-0.5 rounded-md">
          Sudah Disalurkan
        </Badge>
      );
    case "pending":
    case "reserved":
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200/80 hover:bg-amber-100 font-medium text-xs px-2.5 py-0.5 rounded-md">
          Proses Penyerahan
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="text-xs">
          {status}
        </Badge>
      );
  }
}

export default function DaftarBarang() {
  const [kategoriFilter, setKategoriFilter] = useState<string>("Semua");
  const [statusFilter, setStatusFilter] = useState<string>("Semua");
  const [dataBarang, setDataBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setLoading(true);
      try {
        const response = await supabase
          .from("posts")
          .select(`
            id,
            title,
            description,
            kategori,
            status,
            lokasi_pengambilan,
            donatur_nama
          `)
          .order("created_at", { ascending: false });

        const data = response?.data;
        const error = response?.error;

        if (error) {
          console.error("Supabase error detail:", error);
        } else if (data && isMounted) {
          const mapped: Barang[] = data.map((item: any) => ({
            id: item.id,
            nama: item.title,
            kategori: item.kategori || "Buku",
            status: item.status || "available",
            donatur: item.donatur_nama || "Mahasiswa UIN",
            lokasi_pengambilan: item.lokasi_pengambilan || "Ruang Jurusan",
            deskripsi: item.description,
          }));

          setDataBarang(mapped);
        }
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    let channel: any = null;
    if (typeof supabase?.channel === "function") {
      channel = supabase
        .channel("public:posts")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "posts" },
          () => {
            loadData();
          }
        )
        .subscribe();
    }

    return () => {
      isMounted = false;
      if (channel && typeof supabase?.removeChannel === "function") {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const filteredData = dataBarang.filter((item) => {
    const matchKategori =
      kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    const matchStatus =
      statusFilter === "Semua" ||
      (statusFilter === "available" && item.status === "available") ||
      (statusFilter === "claimed" && item.status !== "available");
    return matchKategori && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: 'var(--font-sans)' }}>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
    
    {/* Header Section */}
    <div className="mb-8 space-y-2">
      <h1 
        className="text-1xl sm:text-2xl font-bold tracking-tight text-[var(--color-brand-dark)]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Daftar Barang Donasi
      </h1>
      <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
        Eksplorasi barang dan perlengkapan perkuliahan yang siap digunakan kembali oleh sesama mahasiswa FST UIN SGD.
      </p>
    </div>

    {/* Filter Bar */}
    <div className="mb-8 rounded-2xl border border-[#E6DCCE] bg-[#F5EFE6] p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        
        {/* Dropdowns Filter Group */}
        <div className="flex flex-wrap items-end gap-3 sm:gap-4">
          {/* Filter Kategori */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <label className="text-[11px] font-bold text-emerald-900/70 uppercase tracking-wider block">
              Kategori
            </label>
            <Select value={kategoriFilter} onValueChange={setKategoriFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#FDFBF7] border-[#E6DCCE] text-emerald-950 text-xs sm:text-sm h-10 rounded-xl focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent className="bg-[#FDFBF7] border-[#E6DCCE]">
                <SelectItem value="Semua">Semua Kategori</SelectItem>
                <SelectItem value="Buku">Buku</SelectItem>
                <SelectItem value="Perlengkapan">Perlengkapan</SelectItem>
                <SelectItem value="Elektronik">Elektronik</SelectItem>
                <SelectItem value="Alat">Alat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Status */}
          <div className="space-y-1.5 w-full sm:w-auto">
            <label className="text-[11px] font-bold text-emerald-900/70 uppercase tracking-wider block">
              Status Ketersediaan
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-[#FDFBF7] border-[#E6DCCE] text-emerald-950 text-xs sm:text-sm h-10 rounded-xl focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 transition-all">
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent className="bg-[#FDFBF7] border-[#E6DCCE]">
                <SelectItem value="Semua">Semua Status</SelectItem>
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="claimed">Sudah Disalurkan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quick Reset Button (Muncul jika filter aktif) */}
          {(kategoriFilter !== 'Semua' || statusFilter !== 'Semua') && (
            <button
              onClick={() => {
                setKategoriFilter('Semua');
                setStatusFilter('Semua');
              }}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 hover:underline h-10 px-2 py-1 transition-colors self-end"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Total Item Count Badge */}
        <div className="text-xs font-medium text-emerald-900/80 bg-[#FDFBF7] px-4 py-2.5 rounded-xl border border-[#E6DCCE] shadow-xs self-start sm:self-end flex items-center gap-1.5">
          {loading ? (
            <span className="animate-pulse text-emerald-800">Memuat data...</span>
          ) : (
            <>
              <span>Menampilkan</span>
              <span className="font-bold text-emerald-950 text-sm bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200">
                {filteredData.length}
              </span>
              <span>barang</span>
            </>
          )}
        </div>

      </div>
    </div>

    {/* Grid Content */}
    {loading ? (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-[#F3F1E9] p-12 text-center">
        <div className="h-10 w-10 rounded-full border-2 border-[var(--color-brand-dark)] border-t-transparent animate-spin mb-3" />
        <p className="text-sm font-medium text-slate-600">Memuat daftar barang...</p>
      </div>
    ) : filteredData.length === 0 ? (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-[#F3F1E9] p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 shadow-xs border border-amber-200/60">
          <Inbox className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-[var(--color-brand-dark)]" style={{ fontFamily: 'var(--font-serif)' }}>
          Belum Ada Barang Sesuai
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
          Tidak ada barang donasi yang sesuai dengan kriteria filter yang Anda pilih saat ini.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => {
          const Icon = getIconForKategori(item.kategori);
          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-white-300"
            >
              <div>
                {/* Header Card */}
                <div className="mb-4 flex items-start gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F3F1E9] text-[var(--color-brand-dark)] border border-slate-200/80 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 
                      className="line-clamp-2 font-bold text-slate-800 leading-snug group-hover:text-[var(--color-brand-dark)] transition-colors text-base"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {item.nama}
                    </h3>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-[10px] bg-amber-50 text-amber-800 border-amber-200/80 font-semibold">
                        {item.kategori}
                      </Badge>
                      {renderStatusBadge(item.status)}
                    </div>
                  </div>
                </div>

                {/* Detail Information */}
                <div className="space-y-2 border-t border-slate-100 pt-3.5 mb-5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-700">Donatur:</span>
                    <span className="truncate text-slate-600">{item.donatur}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-amber-600 flex-shrink-0" />
                    <span className="font-semibold text-slate-700">Lokasi Pickup:</span>
                    <span className="truncate text-slate-600">
                      {item.lokasi_pengambilan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/barang/${item.id}`} className="block w-full">
                <Button className="w-full text-xs sm:text-sm font-semibold h-10 rounded-xl bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-hover)] text-white hover:text-white transition-all duration-200 shadow-xs flex items-center justify-center gap-2">
                  <span>Lihat Detail & Ambil</span>
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    )}

  </div>
</div>
  );
}