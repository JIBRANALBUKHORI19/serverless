'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { CldUploadWidget } from "next-cloudinary";

export default function EditProfileUser() {
  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState({
    nama: "",
    email: "",
    alamat: "",
    telepon: "",
    deskripsi:"",
    gambar: "",
  });

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profile")
        .select()
        .eq("user_id", userData.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
      } else {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSuccess = (result) => {
    const imageUrl = result.info.secure_url;
    setProfile((prev) => ({
      ...prev,
      gambar: imageUrl,
    }));
    setIsImageUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("profile")
      .update({
        nama: profile.nama,
        alamat: profile.alamat,
        telepon: profile.telepon,
        deskripsi:profile.deskripsi,
        gambar: profile.gambar,
      })
      .eq("user_id", profile.user_id);

    if (error) {
      console.error("Error updating profile:", error.message);
      alert("Gagal mengupdate profil");
    } else {
      alert("Profil berhasil diperbarui!");
      router.push("/profil");
    }
  };

  const handleBack = () => {
    router.push("/profil");
  };

  return (
    <div className="bg-gradient-to-br from-green-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
        <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Kembali ke Profil
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Profil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nama</label>
            <input
              type="text"
              name="nama"
              value={profile.nama}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Alamat</label>
            <input
              type="text"
              name="alamat"
              value={profile.alamat}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Telepon</label>
            <input
              type="text"
              name="telepon"
              value={profile.telepon}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Deskripsi</label>
            <input
              type="text"
              name="deskripsi"
              value={profile.deskripsi}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gambar Profil</label>
            <CldUploadWidget
              uploadPreset="wubnqevu"
              onSuccess={handleUploadSuccess}
              onError={(error) => console.error("Upload Error: ", error)}
            >
              {({ open }) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Upload Gambar
                </button>
              )}
            </CldUploadWidget>

            {isImageUploaded && (
              <p className="text-green-600 text-sm font-medium mt-2">
                ✅ Gambar berhasil diupload!
              </p>
            )}

            {profile.gambar && (
              <div className="mt-4 flex justify-center">
                <img
                  src={profile.gambar}
                  alt="Uploaded Profile"
                  className="w-24 h-24 object-cover rounded-full border-2 border-indigo-400"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 font-semibold"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
