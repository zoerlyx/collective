# Collective - Platform Donasi Perlengkapan Kuliah

**Collective** adalah platform berbasis web yang memfasilitasi mahasiswa dalam saling berbagi, meminjamkan, atau mendonasikan sumber daya dan perlengkapan akademik (seperti buku, jas lab, alat praktikum, dll.) secara gratis.

---

## 📌 Latar Belakang & Catatan Proyek

> **Catatan Proyek Akademik:**
> Proyek ini berawal dari **Proyek Akhir Mata Kuliah Socio Informatics** yang dikembangkan oleh kelompok yang beranggotakan:
> - **Farho Zurrahman**
> - **LM Irsal Shydiq**
> - **Yan Syafiw Albari**
> - **Danny Saputra**
> 
> Aplikasi yang ada saat ini merupakan versi yang **dikembangkan lebih lanjut** oleh 
> - **Fardho Zurrahman**
> dari hasil proyek akhir tersebut untuk meningkatkan fungsionalitas, desain antarmuka, dan pengalaman pengguna secara menyeluruh.

---

## 🚀 Fitur Utama

- **Landing Page Public**: Pengunjung dapat menjelajahi informasi platform sebelum melakukan otentikasi.
- **Proteksi Akses Fitur**: Akses ke katalog barang, formulir donasi, dan profil dilindungi oleh autentikasi pengguna.
- **Katalog & Donasi Barang**: Cari barang yang dibutuhkan atau publikasikan barang yang ingin didonasikan.
- **Otentikasi Supabase**: Sistem *sign in* dan *sign up* yang aman menggunakan Supabase Auth.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript / JavaScript (JSX)
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Routing**: React Router DOM (`react-router-dom`)
- **Backend & Auth**: Supabase (Database & Authentication)

---

## 📦 Cara Memulai (Local Setup)

1. **Clone repositori:**
   ```bash
   git clone https://github.com/zoerlyx/collective.git
   cd collective
   ```

### 2. Install Dependensi
```bash
npm install
```


### 3. Konfigurasi Environment Variables
```bash
VITE_SUPABASE_URL=[https://your-supabase-url.supabase.co]
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Jalankan Aplikasi
```bash
npm run dev
```

##  Akun Coba (Demo Account)

Untuk mempermudah pengujian dan peninjauan aplikasi tanpa perlu membuat akun baru, Anda dapat menggunakan akun dummy berikut untuk masuk:

- **Email** : adrian@gmail.com
- **Password** : adrian123
