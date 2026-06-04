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

export default function Navbar() {
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
);


}

