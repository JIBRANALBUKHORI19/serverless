"use client";

import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import Navbar from "./searching";
import Sidebar from "./sidebar";
import Signout from "./logout";

export default function ProfileClient({
  nama = "Belum Ada Nama",
  email = "Belum Ada Email",
  alamat = "Belum Ada Alamat",
  deskripsi = "Menambahkan deskripsi diri akan membuat profil Anda lebih menarik",
  telepon = "Belum Ada Telepon",
  gambar = "/default-profile.png",
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleEditProfile = () => {
    router.push("/editprofil");
  };

  const handleAddProfile = () => {
    router.push("/tambahprofil");
  };

  const handleDeleteProfile = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (userData?.user) {
      const { error } = await supabase
        .from("profile")
        .delete()
        .eq("user_id", userData.user.id);

      if (error) {
        console.error("Gagal menghapus profil:", error.message);
        alert("Gagal menghapus profil");
      } else {
        alert("Profil berhasil dihapus!");
        router.push("/profil");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Profile Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
            <div className="flex items-center gap-6 mb-8">
              <CldImage
                className="w-28 h-28 rounded-full border-4 border-green-500"
                src={gambar || "/default-profile.png"}
                width="160"
                height="160"
                crop={{ type: "auto", source: true }}
                alt="Foto Profil"
              />
              <div>
                <h1 className="text-3xl font-semibold text-green-700">{nama}</h1>
                <p className="text-gray-600 text-lg">{email}</p>
              </div>
              <button
                onClick={handleEditProfile}
                className="ml-auto bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"
              >
                ✏️ Edit Profil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700 mb-4">Informasi Pribadi</h2>
                <p><strong>Alamat:</strong> {alamat}</p>
                <p><strong>Telepon:</strong> {telepon}</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700 mb-4">Tentang Saya</h2>
                <p>{deskripsi}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={handleAddProfile}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
              >
                ➕ Tambah Profil
              </button>
              <button
                onClick={handleDeleteProfile}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
              >
                🗑️ Hapus Profil
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <Signout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
