"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { handleCheckout } from "../componentUser/handlecheckout";
import Navbar from "./searching";
import Sidebar from "./sidebar";

export default function KeranjangClient({ keranjangData }) {
  const [keranjang, setKeranjang] = useState(keranjangData);
  const supabase = createClient();
  const router = useRouter();

  const updateJumlah = async (id, jumlahBaru) => {
    if (jumlahBaru < 1) return;
    const { error } = await supabase
      .from("keranjang")
      .update({ jumlah: jumlahBaru })
      .eq("id", id);

    if (!error) {
      setKeranjang((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, jumlah: jumlahBaru } : item
        )
      );
    }
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from("keranjang").delete().eq("id", id);

    if (!error) {
      setKeranjang((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const handleItemCheckout = (produkId, jumlah) => {
    handleCheckout(produkId, jumlah, router);
  };

  const handleCheckoutAll = () => {
    keranjang.forEach((item) => handleCheckout(item.produk.id, item.jumlah, router));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Keranjang Content */}
        <div className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Keranjang Belanja</h1>
          {keranjang.length > 0 ? (
            <div className="flex flex-col">
              {/* Daftar Produk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {keranjang.map((item) => (
                  <div key={item.id} className="p-4 bg-white rounded-lg shadow-md group">
                    {item.produk && (
                      <>
                        <img
                          src={item.produk.gambar}
                          alt={item.produk.nama}
                          className="w-full h-40 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform"
                        />
                        <h2 className="text-lg font-semibold text-gray-800">{item.produk.nama}</h2>
                        <p className="text-gray-600">Harga: Rp {item.produk.harga.toLocaleString()}</p>
                        <div className="flex items-center mt-4">
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => updateJumlah(item.id, item.jumlah - 1)}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.jumlah}</span>
                          <button
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                            onClick={() => updateJumlah(item.id, item.jumlah + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => deleteItem(item.id)}
                          >
                            Hapus
                          </button>
                          <button
                            className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                            onClick={() => handleItemCheckout(item.produk.id, item.jumlah)}
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Tombol Checkout Semua */}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-800">
                  Total Harga: Rp{" "}
                  {keranjang
                    .reduce((total, item) => total + item.produk.harga * item.jumlah, 0)
                    .toLocaleString()}
                </p>
                <button
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  onClick={handleCheckoutAll}
                >
                  Checkout Semua
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-lg">Keranjang Anda kosong.</p>
          )}
        </div>
      </div>
    </div>
  );
}
