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
}

return (
    <div >
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
    </div>

  );
};

export default LoginPengguna;
