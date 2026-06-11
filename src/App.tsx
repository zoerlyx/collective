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
