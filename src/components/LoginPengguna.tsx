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
