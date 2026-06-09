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
  }