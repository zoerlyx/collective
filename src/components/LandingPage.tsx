import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../contexts/useAuth';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { 
  ArrowRight, 
  Gift, 
  User, 
  Sparkles, 
  Compass, 
  HeartHandshake, 
  BookOpen,
  Recycle,
  Users,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
  Package,
  LogIn
} from 'lucide-react';

const TRUST_BADGES = [
  { icon: HeartHandshake, label: 'Bantu Sesama' },
  { icon: FlaskConical, label: 'Donasi Barang' },
  { icon: ShieldCheck, label: 'Terverifikasi' },
];

const STATS_CARDS = [
  { icon: Package, title: 'Barang Tersedia', value: '120+ Item' },
  { icon: HeartHandshake, title: 'Total Donasi', value: '45 Disalurkan' },
  { icon: CheckCircle2, title: 'Komunitas', value: 'Terverifikasi', isAccent: true },
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

export default function LandingPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Menambahkan tipe data string pada targetPath untuk mencegah type 'any'
const handleProtectedNavigation = (targetPath: string) => {
  if (!targetPath) return;

  if (!user) {
    // Jika belum login, arahkan ke halaman login
    navigate('/login');
  } else {
    // Jika sudah login, navigasi ke halaman tujuan
    navigate(targetPath);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[var(--color-brand-accent)]/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[var(--color-brand-accent)] animate-spin" />
          </div>
          <p className="text-base font-medium text-slate-500">Memuat halaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#F3F1E9] border border-slate-200/60 p-5 sm:p-8 lg:p-9 shadow-xs text-slate-800">
        <div className="absolute top-0 right-4 sm:right-10 z-20">
          <div className="relative bg-[var(--color-brand-dark)] text-white px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-b-xl shadow-md flex flex-col items-center justify-center text-center border-t-0 border border-slate-700/30 overflow-hidden">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase text-slate-300/90 leading-none">
              PORTAL
            </span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider mt-1 text-slate-100 leading-tight font-serif">
              AKADEMIK
            </span>
            <div className="w-5 sm:w-6 h-[1px] bg-white/15 my-1.5" />
            <span className="text-xs sm:text-sm font-extrabold text-[var(--color-brand-accent)] leading-none font-serif">
              100%
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] font-semibold tracking-widest text-slate-300/80 uppercase mt-0.5 leading-none">
              GRATIS
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center relative z-10">
          <div className="lg:col-span-6 relative flex justify-center items-center order-first lg:order-last mt-2 sm:mt-0">
            <div className="relative w-full max-w-sm lg:max-w-none aspect-[16/9] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-tr from-emerald-100/50 via-teal-50/30 to-amber-50/40 p-2 sm:p-3 flex items-center justify-center border border-white/60 shadow-inner">
              <div className="absolute -bottom-10 -right-10 w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-emerald-200/40 blur-xl pointer-events-none" />
              
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop" 
                alt="Buku dan Perlengkapan Akademik" 
                className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-xs"
              />

              <div className="absolute bottom-2 right-2 sm:bottom-1 sm:right-1 bg-white/90 backdrop-blur-md p-1.5 px-2.5 sm:p-2 sm:px-3 rounded-lg sm:rounded-xl shadow-md border border-white/50 flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-emerald-100 flex items-center justify-center text-[var(--color-brand-dark)] font-bold text-[9px] sm:text-[10px]">
                  UIN
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-tight">Komunitas Kampus</p>
                  <p className="text-[8px] sm:text-[9px] text-slate-500">Berbagi Tanpa Biaya</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-center lg:text-left">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-[var(--color-brand-dark)] leading-tight sm:leading-snug">
              Selamat Datang di<br className="hidden sm:inline" />
              <span className="italic font-normal text-[var(--color-brand-accent)] ml-2">
                Collective
              </span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-sans">
              Kelola aktivitas akademikmu, temukan sumber daya belajar yang dibutuhkan, atau bagikan barang tak terpakai untuk membantu sesama mahasiswa.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button 
                onClick={() => handleProtectedNavigation('/daftar-barang')}
                className="bg-[var(--color-brand-dark)] hover:bg-[var(--color-brand-accent)] text-white font-medium text-xs sm:text-sm h-10 px-5 rounded-lg transition-all shadow-xs"
              >
                Jelajahi Barang
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <Button 
                onClick={() => handleProtectedNavigation('/menyumbangkan')}
                className="bg-[#F3F1E9] hover:bg-slate-200 text-[var(--color-brand-dark)] border border-slate-200/80 font-medium text-xs sm:text-sm h-10 px-5 rounded-lg transition-all shadow-xs"
              >
                <Gift className="w-4 h-4 mr-1.5" />
                Mulai Donasi
              </Button>
            </div>

            <div className="pt-6 border-t border-slate-300/60 grid grid-cols-3 gap-1.5 sm:gap-2 text-slate-700">
              {TRUST_BADGES.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start text-center lg:text-left gap-1 sm:gap-1.5">
                    <div className="p-1 sm:p-1.5 rounded-full bg-emerald-100/80 text-[var(--color-brand-accent)] shrink-0">
                      <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium leading-tight">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {STATS_CARDS.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-[#F3F1E9] border border-slate-200/70 shadow-xs flex items-center gap-3">
              <div className="p-2.5 bg-[#F3F1E9] text-[var(--color-brand-accent)] rounded-lg shrink-0 shadow-xs">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 truncate">{stat.title}</p>
                <p className={`text-sm sm:text-base font-semibold leading-tight font-serif ${stat.isAccent ? 'text-[var(--color-brand-accent)]' : 'text-slate-800'}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tentang Platform */}
      <section className="space-y-3.5 sm:space-y-4 pt-2">
        <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900 tracking-tight">
          Tentang Platform
        </h2>

        <div className="relative overflow-hidden rounded-2xl bg-[#F3F1E9] border border-slate-200/70 p-5 sm:p-7 lg:p-8 shadow-xs text-slate-800">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium text-[var(--color-brand-dark)] leading-tight">
                Wadah Solutif Perlengkapan Kuliah Mahasiswa
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                Platform ini dirancang khusus untuk memfasilitasi mahasiswa dalam saling berbagi sumber daya akademik. Mulai dari jas laboratorium, modul dan buku kuliah, alat praktikum, hingga perlengkapan pendukung studi lainnya dapat disalurkan secara <strong>100% gratis</strong> kepada sesama yang membutuhkan.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-medium text-slate-700">
                {ADVANTAGES.map((adv, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-accent)]" />
                    <span>{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 gap-2.5 sm:gap-3">
              {PLATFORM_HIGHLIGHTS.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-white/40 border border-slate-200/80 flex items-start gap-3">
                    <div className="p-2 bg-[#F3F1E9] text-[var(--color-brand-accent)] rounded-lg shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-serif">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Menu Utama */}
      <div className="space-y-3.5 sm:space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight font-serif">Menu Utama</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {MAIN_MENUS.map((menu, idx) => {
            const IconComponent = menu.icon;
            return (
              <Card key={idx} className="group relative overflow-hidden border border-slate-200/80 bg-white hover:border-[var(--color-brand-accent)] transition-all duration-300 flex flex-col justify-between rounded-xl">
                <CardHeader className="space-y-3 p-4 sm:p-5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F3F1E9] text-[var(--color-brand-accent)] flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base sm:text-lg font-bold text-slate-800 font-serif">{menu.title}</CardTitle>
                    <CardDescription className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {menu.desc}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardFooter className="p-4 sm:p-5 pt-0">
                  <Button
                    onClick={() => handleProtectedNavigation(menu.link)}
                    className="w-full py-2.5 px-3.5 bg-[#F3F1E9] hover:bg-emerald-50 text-slate-700 hover:text-[var(--color-brand-hover)] border border-slate-200/80 font-medium text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2"
                  >
                    <span>{menu.btnText}</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

    </div>
  );
}