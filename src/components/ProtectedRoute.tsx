// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth'; // Menggunakan hook dari file yang sudah kita pisah

// Mendefinisikan tipe props (children adalah komponen yang dibungkus, e.g., <ProfilPengguna />)
interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();

    // 1. Tampilkan loading state saat status otentikasi Supabase sedang dimuat.
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-blue-600">Memuat status otentikasi...</p>
            </div>
        );
    }

    // 2. Jika loading selesai dan user TIDAK ADA (belum login),
    //    Alihkan pengguna ke halaman login (/login).
    if (!user) {
        // Navigate adalah komponen dari react-router-dom untuk redirect
        // replace={true} mencegah pengguna menekan tombol 'back' untuk kembali ke halaman yang dilarang
        return <Navigate to="/login" replace={true} />;
    }

    // 3. Jika user ADA (sudah login), render komponen anak (rute yang diminta).
    return children;
}