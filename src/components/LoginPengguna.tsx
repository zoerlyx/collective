import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';

const LoginPengguna = () => {
  console.log('LoginPengguna rendered');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password harus diisi.');
      return;
    }

    try {
      setLoading(true);
      console.log('Attempt login:', email);

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      console.log('Login response:', data, signInError);

      if (signInError) throw signInError;

      if (data.user) {
        navigate('/dashboard');
      } else {
        setError('Login gagal. Periksa kembali email dan password Anda.');
      }
    } catch (err: any) {
      console.error('Error saat login:', err);
      const errorMessage = err?.message || '';

      if (errorMessage.includes('Email not confirmed')) {
        setError('Akun belum aktif. Silakan cek email Anda untuk verifikasi.');
      } else if (errorMessage.includes('Invalid login credentials')) {
        setError('Email atau password salah.');
      } else {
        setError('Terjadi kesalahan saat mencoba masuk.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-bg)] p-4">
      {/* Card container dengan max-width lebih kecil dan rounded tinggi */}
      <div className="w-full max-w-sm rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm transition-all">
        
        {/* Header dengan Logo / Subtitle ringkas */}
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-dark)] text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 11h14l1 12H4L5 11z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--color-brand-dark)]">
            Masuk ke Kolektif
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Silakan masuk untuk melanjutkan
          </p>
        </div>

        {/* Pesan Error */}
        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Form Login Ringkas */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <a href="#forgot" className="text-[11px] font-medium text-[var(--color-brand-accent)] hover:underline">
                Lupa password?
              </a>
            </div>
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

          {/* Button Gaya Pill khas UI Landing Page */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center rounded-full bg-[var(--color-brand-dark)] py-2.5 text-xs font-semibold text-white transition-all hover:bg-[var(--color-brand-hover)] active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Belum punya akun?{' '}
          <Link
            to="/registrasi"
            className="font-semibold text-[var(--color-brand-accent)] hover:underline"
          >
            Daftar di sini
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPengguna;
