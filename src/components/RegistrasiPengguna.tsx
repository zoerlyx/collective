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
