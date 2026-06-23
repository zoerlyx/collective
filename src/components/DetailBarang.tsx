import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../contexts/useAuth";
import { ArrowLeft, MapPin, CheckCircle2, AlertCircle, X } from "lucide-react";

type Barang = {
  id: string;
  title: string;
  description: string | null;
  status: string; // "available" | "taken" | "claimed"
  taken_by: string | null;
  lokasi_pengambilan?: string | null;
};

function parseDescription(desc: string) {
  const imageMatch = desc.match(/\[IMAGE\](.*?)\[\/IMAGE\]/);
  const image = imageMatch ? imageMatch[1] : null;
  const text = desc.replace(/\[IMAGE\].*?\[\/IMAGE\]/, "").trim();
  return { text, image };
}

export default function DetailBarang() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [barang, setBarang] = useState<Barang | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  // State untuk Pop-up Modal & Notifikasi Error
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    loadBarang();
  }, [id]);

  async function loadBarang() {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching barang:", error);
      setBarang(null);
    } else {
      setBarang(data as Barang);
    }

    setLoading(false);
  }

  async function handleAmbilBarang() {
    if (!barang) return;

    if (!user) {
      navigate("/login");
      return;
    }

    setRequesting(true);
    setErrorMessage(null);

    try {
      // Update status & set taken_by ke ID user
      const { data, error } = await supabase
        .from("posts")
        .update({
          status: "taken",
          taken_by: user.id,
        })
        .eq("id", barang.id)
        .eq("status", "available") // Mencegah double claim
        .select();

      if (error) {
        console.error("Supabase update error:", error);
        setErrorMessage("Gagal mengambil barang: " + error.message);
        return;
      }

      // Jika data kosong, berarti status barang sudah berubah / tidak available lagi
      if (!data || data.length === 0) {
        setErrorMessage(
          "Gagal mengambil barang. Barang ini mungkin sudah diambil oleh pengguna lain."
        );
        await loadBarang(); // Refresh data dari Supabase
        return;
      }

      // Update state lokal setelah BERHASIL di database
      setBarang((prev) =>
        prev
          ? {
              ...prev,
              status: "taken",
              taken_by: user.id,
            }
          : null
      );

      // Tampilkan Modal Pop-up Keterangan Lokasi
      setShowModal(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setRequesting(false);
    }
  }

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 rounded-full border-2 border-[var(--color-brand-dark)] border-t-transparent animate-spin" />
          <p className="text-slate-600 text-xs font-medium">Memuat data barang...</p>
        </div>
      </div>
    );
  }

  if (!barang) {
    return (
      <div 
        className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center px-4 py-12"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <div className="max-w-sm w-full bg-[#F3F1E9] border border-slate-200/80 rounded-xl p-6 text-center space-y-3 shadow-xs">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 
            className="text-xl font-bold text-[var(--color-brand-dark)]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Barang Tidak Ditemukan
          </h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Data barang tidak dapat ditemukan atau telah dihapus dari sistem.
          </p>
          <Link to="/daftar-barang" className="block pt-1">
            <Button className="w-full bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-accent)] text-white hover:text-white transition-all text-xs font-medium h-9 rounded-lg">
              Kembali
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Normalisasi string status
  const currentStatus = (barang.status || "").toLowerCase().trim();
  const isTaken =
    currentStatus === "taken" ||
    currentStatus === "claimed" ||
    currentStatus === "sudah diambil";
  const isTakenByMe = isTaken && barang.taken_by === user?.id;

  const { text: descText, image: descImage } = barang.description
    ? parseDescription(barang.description)
    : { text: null, image: null };

  return (
    <div 
      className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Container diperlebar ke max-w-7xl agar konsisten dengan halaman utama/lainnya */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 w-full flex-grow">
        
        {/* Tombol Kembali (Hanya Teks "Kembali") */}
        <div>
          <Link to="/daftar-barang">
            <Button
              variant="ghost"
              className="px-0 h-auto gap-1.5 text-slate-600 hover:text-[var(--color-brand-dark)] hover:bg-transparent font-medium text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali
            </Button>
          </Link>
        </div>

        {/* Notifikasi Error */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg flex items-center justify-between gap-2 shadow-xs text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <p className="font-medium">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-500 hover:text-rose-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Card Container */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xs border border-slate-200/80 space-y-5">
          
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Bagian Gambar (Jika Ada) */}
            {descImage && (
              <div className="w-full md:w-5/12 shrink-0">
                <div className="overflow-hidden rounded-lg border border-slate-200/80 bg-[#F3F1E9] h-56 sm:h-64 md:h-72">
                  <img
                    src={descImage}
                    alt={barang.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Detail Informasi (Teks & Aksi) */}
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                
                {/* Badge Status */}
                <div className="flex items-center">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      isTaken
                        ? "bg-slate-100 text-slate-600 border-slate-200"
                        : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}
                  >
                    {isTaken ? "Sudah Disalurkan / Diambil" : "Tersedia"}
                  </span>
                </div>

                {/* Judul Barang */}
                <h1 
                  className="text-xl sm:text-2xl font-bold text-[var(--color-brand-dark)] leading-snug"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {barang.title}
                </h1>

                {/* Deskripsi */}
                {descText && (
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {descText}
                  </p>
                )}

                {/* Lokasi Pengambilan Brief */}
                {barang.lokasi_pengambilan && (
                  <div className="flex items-center gap-1.5 pt-2 text-xs text-slate-600 border-t border-slate-100">
                    <MapPin className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold text-slate-700">Lokasi Pickup:</span>
                    <span className="truncate text-slate-600">{barang.lokasi_pengambilan}</span>
                  </div>
                )}
              </div>

              {/* Tombol Aksi Utama */}
              <div className="pt-2">
                {isTaken ? (
                  isTakenByMe ? (
                    <Button
                      disabled
                      className="w-full sm:w-auto px-6 bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-not-allowed font-medium text-xs h-9 rounded-lg"
                    >
                      Barang Sudah Anda Ambil
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full sm:w-auto px-6 bg-slate-100 text-slate-500 border border-slate-200 cursor-not-allowed font-medium text-xs h-9 rounded-lg"
                    >
                      Barang Sudah Diambil Orang Lain
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={handleAmbilBarang}
                    disabled={requesting}
                    className="w-full sm:w-auto px-6 bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-accent)] text-white hover:text-white font-medium text-xs h-9 rounded-lg transition-all shadow-xs"
                  >
                    {requesting ? "Memproses..." : "Ambil Donasi"}
                  </Button>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* POP-UP MODAL KETERANGAN LOKASI */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FAF7F2] border border-slate-200/80 rounded-xl max-w-sm w-full p-5 shadow-xl space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 border border-amber-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 
                className="text-lg font-bold text-[var(--color-brand-dark)]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Pengambilan Berhasil!
              </h3>
              <p className="text-xs text-slate-600">
                Status barang di sistem telah diperbarui menjadi berhasil Anda ambil.
              </p>
            </div>

            <div className="bg-[#F3F1E9] border border-slate-200/80 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--color-brand-dark)] font-bold text-[11px]">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                <span>Lokasi Pengambilan</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {barang.lokasi_pengambilan ||
                  "Silakan konfirmasi ke donatur / sekretariat jurusan untuk lokasi fisik penyerahan barang."}
              </p>
            </div>

            <Button
              onClick={() => setShowModal(false)}
              className="w-full bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-accent)] text-white hover:text-white font-medium text-xs h-9 rounded-lg transition-all"
            >
              Mengerti & Tutup
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}