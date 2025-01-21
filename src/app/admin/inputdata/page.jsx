"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import supabase from "../../utils/supabase";
import NavbarAdmin from "../componentAdmin/navbar";
import SidebarAdmin from "../componentAdmin/sidebarAdmin";

export default function AddProduk() {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",
    gambar: "",
    kategori: "",
  });
  const [produkList, setProdukList] = useState([]);

  // Fungsi untuk mengambil data dari tabel produk
  const fetchProduk = async () => {
    const { data: produk, error } = await supabase.from("produk").select().order("id", { ascending: true });
    if (error) {
      console.error(error.message);
    } else if (produk) {
      setProdukList(produk);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menambahkan data produk baru
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("produk").insert([
      {
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        harga: formData.harga,
        stok: formData.stok,
        gambar: formData.gambar,
        kategori: formData.kategori,
      },
    ]);

    if (error) {
      console.log("Error adding data:", error.message);
    } else {
      console.log("Data added:", data);
      fetchProduk();
      resetForm();
    }
  };

  // Fungsi untuk reset form
  const resetForm = () => {
    setFormData({
      nama: "",
      deskripsi: "",
      harga: "",
      stok: "",
      gambar: "",
      kategori: "",
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="flex">
        <div className="w-1/4">
          <SidebarAdmin />
        </div>

        <div className="w-3/4 p-4">
          <form onSubmit={handleSubmit} className="mb-6 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-bold mb-4">Tambah Produk</h2>
            {/* Form fields */}
            <div className="mb-4">
              <label className="block text-gray-700">Nama Produk</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Deskripsi</label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Harga</label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stok</label>
              <input
                type="number"
                name="stok"
                value={formData.stok}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Foto Produk</label>
              <CldUploadWidget
                uploadPreset="wubnqevu"
                onSuccess={(result) => {
                  setFormData((prev) => ({ ...prev, gambar: result.info.secure_url }));
                }}
              >
                {({ open }) => (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Upload Foto
                  </button>
                )}
              </CldUploadWidget>
              {formData.gambar && (
                <p className="text-green-600 mt-2">Foto berhasil diupload!</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="buah">Buah</option>
                <option value="sayuran">Sayuran</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Tambah Produk
            </button>
          </form>

          {/* Daftar Produk */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Daftar Produk</h2>
            <ul>
              {produkList.map((produk) => (
                <li key={produk.id} className="p-4 border-b border-gray-300 flex justify-between">
                  <div>
                    <img src={produk.gambar} alt={produk.nama} className="w-16 h-16 object-cover mb-2" />
                    <p>{produk.nama}</p>
                    <p>{produk.deskripsi}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}