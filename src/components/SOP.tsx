import { Shield, Users, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SOP() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="font-serif text1xl md:text-2xl font-bold text-emerald-950 mb-3 tracking-tight">
            SOP & Etika Digital
          </h1>
          <p className="text-emerald-800/80 text-base md:text-lg max-w-2xl leading-relaxed">
            Panduan perilaku dan prosedur standar untuk menjaga ekosistem Collective yang sehat.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-emerald-900 rounded-2xl p-6 md:p-8 text-emerald-50 mb-10 shadow-sm border border-emerald-800">
          <h2 className="font-serif text-xl font-bold text-[#FAF6ED] mb-3">
            Prinsip Dasar 
          </h2>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed max-w-4xl">
            Collective dibangun atas dasar kepercayaan, saling menghormati, dan komitmen bersama. 
            Setiap anggota komunitas memiliki tanggung jawab untuk menjaga nilai-nilai ini 
            agar platform tetap bermanfaat bagi seluruh mahasiswa.
          </p>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#F5EFE6] rounded-2xl p-6 md:p-7 shadow-sm border border-[#E6DCCE] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5 border border-emerald-200">
                <Shield className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">Kepercayaan</h3>
              <p className="text-emerald-900/80 text-sm leading-relaxed">
                Bangun kepercayaan dengan menepati komitmen dan berlaku jujur dalam setiap interaksi.
              </p>
            </div>
          </div>

          <div className="bg-[#F5EFE6] rounded-2xl p-6 md:p-7 shadow-sm border border-[#E6DCCE] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5 border border-emerald-200">
                <Users className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">Kolaborasi</h3>
              <p className="text-emerald-900/80 text-sm leading-relaxed">
                Saling membantu dan mendukung sesama mahasiswa untuk menciptakan ruang belajar yang kondusif.
              </p>
            </div>
          </div>

          <div className="bg-[#F5EFE6] rounded-2xl p-6 md:p-7 shadow-sm border border-[#E6DCCE] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-5 border border-emerald-200">
                <Heart className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="font-serif text-lg font-bold text-emerald-950 mb-2">Keikhlasan</h3>
              <p className="text-emerald-900/80 text-sm leading-relaxed">
                Berbagi dengan tulus tanpa paksaan untuk kebaikan dan kemajuan bersama.
              </p>
            </div>
          </div>
        </div>

        {/* SOP Sections Group */}
        <div className="space-y-8 md:space-y-10">
          
          {/* Untuk Donatur */}
          <div className="bg-[#F5EFE6] rounded-2xl shadow-sm border border-[#E6DCCE] overflow-hidden">
            <div className="bg-emerald-800 px-6 md:px-8 py-5 border-b border-emerald-900/20">
              <h2 className="font-serif text-xl font-bold text-[#FAF6ED]">SOP untuk Donatur</h2>
              <p className="text-emerald-100/90 text-sm mt-1">
                Panduan bagi anggota yang ingin berbagi barang atau sumber daya
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-emerald-950 mb-1">Pastikan Kondisi Barang</h3>
                    <p className="text-emerald-900/80 text-sm leading-relaxed">
                      Pastikan barang dalam kondisi layak pakai. Jelaskan kondisi aktual dengan jujur dan detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-emerald-950 mb-1">Tentukan Waktu & Tempat</h3>
                    <p className="text-emerald-900/80 text-sm leading-relaxed">
                      Tetapkan lokasi  barang yang jelas. Sertakan deskripsi untuk memberikan informasi lebih detail.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Untuk Penerima */}
          <div className="bg-[#F5EFE6] rounded-2xl shadow-sm border border-[#E6DCCE] overflow-hidden">
            <div className="bg-emerald-800 px-6 md:px-8 py-5 border-b border-emerald-900/20">
              <h2 className="font-serif text-xl font-bold text-[#FAF6ED]">SOP untuk Penerima</h2>
              <p className="text-emerald-100/90 text-sm mt-1">
                Panduan bagi anggota yang menerima donasi barang
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-emerald-950 mb-1">Asas Kebutuhan</h3>
                    <p className="text-emerald-900/80 text-sm leading-relaxed">
                      Pastikan bahwa anda membutuhkan barang.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-base font-bold text-emerald-950 mb-1">Manfaatkan dengan Baik</h3>
                    <p className="text-emerald-900/80 text-sm leading-relaxed">
                      Gunakan barang sesuai peruntukannya. Bila sudah tidak terpakai, salurkan kembali ke sesama anggota.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Banner */}
        <div className="bg-[#F5EFE6] rounded-2xl p-8 md:p-10 text-center border border-[#E6DCCE] mt-10 md:mt-12 shadow-sm">
          <h3 className="font-serif text-xl md:text-2xl font-bold text-emerald-950 mb-3">
            Mari Jaga Bersama
          </h3>
          <p className="text-emerald-900/80 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
            Collective adalah milik kita bersama. Dengan menaati SOP dan etika ini, 
            kita membangun lingkungan akademik FST yang saling percaya, aman, dan saling menguatkan.
          </p>
        </div>

      </div>
    </div>
  );
}