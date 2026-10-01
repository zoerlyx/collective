import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/useAuth";
import LandingPage from "./components/LandingPage";
import DaftarBarang from "./components/DaftarBarang";
import DetailBarang from "./components/DetailBarang";
import ProfilPengguna from "./components/ProfilPengguna";
import SOP from "./components/SOP";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Menyumbangkan from "./components/Menyumbangkan";
import LoginPengguna from "./components/LoginPengguna";
import RegistrasiPengguna from "./components/RegistrasiPengguna";
import WelcomePengguna from "./components/WelcomePengguna";

// Import Navbar & Footer Anda di sini
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer";

function AppContent() {
  const { loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--color-brand-bg)]">
        <p className="text-xl font-medium text-[var(--color-brand-accent)]">Memuat Aplikasi...</p>
      </div>
    );
  }

  return (
    // Wrapper Flex Column agar Footer selalu berada di bagian paling bawah halaman
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      {/* 1. Navbar dipasang secara Global */}
      <Navbar />

      {/* 2. Main content mengambil sisa ruang layar (flex-1) */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/daftar-barang" element={<DaftarBarang />} />
          <Route path="/barang/:id" element={<DetailBarang />} />

          <Route path="/login" element={<LoginPengguna />} />
          <Route path="/registrasi" element={<RegistrasiPengguna />} />
          <Route path="/sop" element={<SOP />} />

          <Route path="/dashboard" element={<ProtectedRoute><WelcomePengguna /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><ProfilPengguna /></ProtectedRoute>} />
          <Route path="/menyumbangkan" element={<ProtectedRoute><Menyumbangkan /></ProtectedRoute>} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {/* 3. Footer dipasang secara Global */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider> 
      <AppContent />
    </AuthProvider>
  );
}

export default App;