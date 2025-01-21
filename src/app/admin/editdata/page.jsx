"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import supabase from "../../utils/supabase";
import NavbarAdmin from "../componentAdmin/navbar";
import SidebarAdmin from "../componentAdmin/sidebarAdmin";

export default function AddProduk() {
  const [formData, setFormData] = useState({
    id: null,
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",
    gambar: "",
    kategori: "",
  });
  const [produkList, setProdukList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProduk = async () => {
    const { data: produk, error } = await supabase.from("produk").select().order("id", { ascending: true });
    if (error) {
      console.error(error.message);
    } else {
      setProdukList(produk);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      const { error } = await supabase.from("produk").update({
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        harga: formData.harga,
        stok: formData.stok,
        gambar: formData.gambar,
        kategori: formData.kategori,
      }).eq("id", formData.id);

      if (error) {
        console.error("Error updating data:", error.message);
      } else {
        fetchProduk();
        resetForm();
        setIsEditing(false);
      }
    } else {
      const { error } = await supabase.from("produk").insert([{ ...formData }]);
      if (error) {
        console.error("Error adding data:", error.message);
      } else {
        fetchProduk();
        resetForm();
      }
    }
  };

  const handleEdit = (produk) => {
    setFormData(produk);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus produk ini?");
    if (confirmDelete) {
      const { error } = await supabase.from("produk").delete().eq("id", id);
      if (error) {
        console.error("Error deleting data:", error.message);
      } else {
        fetchProduk();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      nama: "",
      deskripsi: "",
      harga: "",
      stok: "",
      gambar: "",
      kategori: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavbarAdmin />
      <div className="flex">
        <div className="w-1/4 p-4">
          <SidebarAdmin />
        </div>
        <div className="w-3/4 p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-lg bg-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800">{isEditing ? "Edit Produk" : "Tambah Produk"}</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-white text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-white text-gray-700"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Harga</label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-white text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg bg-white text-gray-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Foto Produk</label>
                <CldUploadWidget
                  uploadPreset="wubnqevu"
                  onSuccess={(result) => setFormData((prev) => ({ ...prev, gambar: result.info.secure_url }))}
                >
                  {({ open }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                      className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Upload Foto
                    </button>
                  )}
                </CldUploadWidget>
                {formData.gambar && <p className="text-sm text-green-600 mt-2">Foto berhasil diupload!</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-white text-gray-700"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="buah">Buah</option>
                  <option value="sayuran">Sayuran</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white bg-green-500 rounded-lg hover:bg-green-600"
              >
                {isEditing ? "Update Produk" : "Tambah Produk"}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Produk</h2>
            <ul className="space-y-4">
              {produkList.map((produk) => (
                <li
                  key={produk.id}
                  className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img src={produk.gambar} alt={produk.nama} className="w-16 h-16 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">{produk.nama}</p>
                      <p className="text-sm text-gray-600">{produk.deskripsi}</p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(produk)}
                      className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(produk.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
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
