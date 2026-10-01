import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  FileText,
  Search,
  Plus,
  LogOut,
  ChevronDown,
  Menu,
  X,
  HandHeart,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/useAuth";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/daftar-barang", label: "Jelajahi", icon: Search },
    { path: "/menyumbangkan", label: "Beri Donasi", icon: Plus },
    { path: "/sop", label: "SOP", icon: FileText },
  ];

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-[#FAF7F2]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        
      {/* Brand Logo */}
<Link to="/" className="group flex items-center gap-3">
  {/* Icon Container - Background Cream (#F3F1E9) & Elemen Hijau */}
  <div 
    className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F1E9] text-[var(--color-brand-dark)] shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md border border-slate-200/80 overflow-hidden"
  >
    {/* Subtle Inner Glow Saat Hover */}
    <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Unique Sharing Icon - Menggunakan Warna Hijau Utama */}
    <HandHeart className="h-5 w-5 text-[var(--color-brand-dark)] transition-colors duration-300 group-hover:text-[var(--color-brand-accent)]" />
  </div>

  {/* Text Branding */}
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

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 rounded-full border border-emerald-900/10 bg-emerald-900/5 p-1.5 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "bg-emerald-800 text-amber-50 shadow-sm"
                    : "text-emerald-900/80 hover:bg-emerald-900/10 hover:text-emerald-950"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-amber-200" : "text-emerald-700"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Section: Auth Action */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 rounded-full border border-emerald-900/10 bg-white/80 p-1.5 pr-3 shadow-sm transition-all hover:border-emerald-900/20 hover:bg-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 font-bold text-xs text-amber-50 shadow-inner">
                  {userInitial}
                </div>
                <span className="max-w-[100px] truncate text-xs font-semibold text-emerald-950">
                  {user.email?.split("@")[0]}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-emerald-800/60" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-emerald-900/10 bg-white p-2 shadow-xl backdrop-blur-lg transition-all animate-in fade-in slide-in-from-top-2">
                  <Link
                    to="/profil"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-emerald-950 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    <User className="h-4 w-4 text-emerald-700" />
                    <span>Profil Saya</span>
                  </Link>
                  <div className="my-1 border-t border-emerald-900/5" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    <span>Keluar</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="rounded-full text-xs font-semibold text-emerald-900 hover:bg-emerald-900/10 hover:text-emerald-950"
                >
                  Masuk
                </Button>
              </Link>
              <Link to="/registrasi">
                <Button className="flex items-center gap-1.5 rounded-full bg-emerald-800 px-5 text-xs font-semibold text-amber-50 shadow-sm transition-all hover:bg-emerald-900 hover:shadow-md">
                  <span>Daftar</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-xl border border-emerald-900/10 bg-emerald-900/5 p-2 text-emerald-900 md:hidden"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="border-b border-emerald-900/10 bg-[#FAF7F2] px-6 pb-6 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-emerald-800 text-amber-50"
                      : "text-emerald-950 hover:bg-emerald-900/5"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-amber-200" : "text-emerald-700"}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {user && (
              <Link
                to="/profil"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  isActive("/profil")
                    ? "bg-emerald-800 text-amber-50"
                    : "text-emerald-950 hover:bg-emerald-900/5"
                }`}
              >
                <User className="h-4 w-4 text-emerald-700" />
                <span>Profil Saya</span>
              </Link>
            )}

            <div className="my-2 border-t border-emerald-900/10" />

            {user ? (
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                variant="outline"
                className="w-full justify-center gap-2 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-emerald-900/20 text-emerald-950 hover:bg-emerald-900/5"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link to="/registrasi" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full rounded-xl bg-emerald-800 text-amber-50 hover:bg-emerald-900">
                    Daftar Sekarang
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}