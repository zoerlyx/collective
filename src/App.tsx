import { Routes, Route } from "react-router-dom";

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
    </div>
  )


  function App() {
  return (
    <AuthProvider> 
      <AppContent />
    </AuthProvider>
  );
}

