import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';


// Data Konfigurasi Statis (Mencegah Re-render & Redundansi JSX)
const TRUST_BADGES = [
  { icon: HeartHandshake, label: 'Bantu Sesama' },
  { icon: FlaskConical, label: 'Donasi Barang' },
  { icon: ShieldCheck, label: 'Terverifikasi' },
];

const STATS_CARDS = [
  { icon: Package, title: 'Barang Tersedia', value: '120+ Item' },
  { icon: HeartHandshake, title: 'Total Donasi', value: '45 Disalurkan' },
  { icon: CheckCircle2, title: 'Status Akun', value: 'Aktif & Terverifikasi', isAccent: true },
];

const PLATFORM_HIGHLIGHTS = [
  {
    icon: BookOpen,
    title: 'Hemat Biaya Akademik',
    desc: 'Dapatkan modul dan perlengkapan praktikum tanpa perlu mengeluarkan biaya membeli baru.'
  },
  {
    icon: Recycle,
    title: 'Dukung Circular Economy',
    desc: 'Kurangi sampah dan berikan kesempatan kedua bagi barang kuliah yang masih sangat layak guna.'
  },
  {
    icon: Users,
    title: 'Solidaritas Antar Mahasiswa',
    desc: 'Pererat hubungan antar sesama mahasiswa melalui aksi nyata saling berbagi dan membantu.'
  }
];

const MAIN_MENUS = [
  {
    icon: Compass,
    title: 'Jelajahi Barang',
    desc: 'Cari dan ambil jas lab, alat praktikum, buku, atau perlengkapan kuliah tak terpakai secara gratis.',
    link: '/daftar-barang',
    btnText: 'Lihat Semua Barang'
  },
  {
    icon: Gift,
    title: 'Mulai Donasi',
    desc: 'Punya perlengkapan akademik atau barang kuliah tak terpakai? Bagikan untuk membantu mahasiswa lain.',
    link: '/menyumbangkan',
    btnText: 'Buat Donasi Baru'
  },
  {
    icon: User,
    title: 'Profil & Riwayat',
    desc: 'Kelola detail profil akunmu, pantau status pengajuan barang, serta riwayat kontribusi donasimu.',
    link: '/profil',
    btnText: 'Kelola Akun'
  }
];

const ADVANTAGES = [
  'Gratis & Tanpa Biaya',
  'Khusus Komunitas Kampus',
  'Proses Mudah & Transparan',
  'Dampak Sosial Nyata'
];

export default function WelcomePengguna() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[var(--color-brand-accent)]/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[var(--color-brand-accent)] animate-spin" />
          </div>
          <p className="text-base font-medium text-slate-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  // Menghindari side-effect 'navigate' langsung pada render phase
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const displayName = user.user_metadata?.full_name 
    || user.user_metadata?.nama 
    || user.email?.split('@')[0] 
    || 'Pengguna';
}