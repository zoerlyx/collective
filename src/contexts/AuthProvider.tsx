// src/contexts/AuthProvider.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { AuthContext } from './useAuth';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper untuk memastikan profil pengguna ada di tabel 'profiles'
  const ensureProfileExists = async (currentUser: User) => {
    if (!currentUser) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        console.warn('Gagal memeriksa profil:', error.message);
        return;
      }

      // Jika profil belum ada di database, buat profil dasar
      if (!data) {
        const { error: upsertError } = await supabase
          .from('profiles')
          .upsert(
            {
              id: currentUser.id,
              nama: currentUser.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'User',
              email: currentUser.email ?? null,
              bio: currentUser.user_metadata?.bio ?? null,
            },
            { onConflict: 'id' }
          );

        if (upsertError) {
          console.error("Gagal membuat profil otomatis:", upsertError.message);
        }
      }
    } catch (err) {
      console.error('Error Sync Profile:', err);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        await ensureProfileExists(currentUser);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      console.error('Gagal keluar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;