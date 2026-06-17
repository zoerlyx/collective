import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const RegistrasiPengguna = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (password !== konfirmasiPassword) {
        setError('Password dan konfirmasi password tidak cocok.');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            nama: nama.trim(),
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.user) {
        if (data.session === null) {
          alert('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi akun.');
        } else {
          alert('Pendaftaran berhasil! Silakan masuk.');
        }
        navigate('/login');
      } else {
        setError('Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (err: unknown) {
      console.error('Error saat pendaftaran:', err);

      const message =
        typeof err === 'object' && err !== null && 'message' in err
          ? String((err as { message: unknown }).message)
          : '';

      if (
        message.includes('already registered') ||
        message.includes('already exists') ||
        message.includes('User already registered')
      ) {
        setError('Email ini sudah terdaftar. Silakan gunakan email lain atau masuk.');
      } else {
        setError(message || 'Terjadi masalah saat mencoba mendaftar.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-bg)] p-4">
      {/* Card Container Compact dengan Style Pill/Rounded */}
      <div className="w-full max-w-sm rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all">
        
        {/* Header Ringkas */}
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-dark)] text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--color-brand-dark)]">
            Daftar Akun
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Lengkapi data untuk bergabung dengan Kolektif
          </p>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Form Registrasi Ringkas */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div className="space-y-1">
            <label htmlFor="nama" className="block text-xs font-semibold text-slate-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Nama lengkap Anda"
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-[var(--color-brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@email.com"
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-[var(--color-brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-[var(--color-brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="konfirmasiPassword" className="block text-xs font-semibold text-slate-700">
              Konfirmasi Password
            </label>
            <input
              type="password"
              id="konfirmasiPassword"
              value={konfirmasiPassword}
              onChange={(e) => setKonfirmasiPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-[var(--color-brand-accent)] focus:bg-white focus:ring-1 focus:ring-[var(--color-brand-accent)]"
            />
          </div>

          {/* Button Style Pill */}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center rounded-full bg-[var(--color-brand-dark)] py-2.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-brand-hover)] active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Sudah punya akun?{' '}
          <Link
            to="/login"
            className="font-semibold text-[var(--color-brand-accent)] hover:underline"
          >
            Masuk di sini
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegistrasiPengguna;