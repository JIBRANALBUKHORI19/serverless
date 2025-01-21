"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function TransaksiClient({ checkoutData: initialCheckoutData }) {
  const [checkoutData, setCheckoutData] = useState(initialCheckoutData);
  const [alamat, setAlamat] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const totalHarga = checkoutData.reduce(
    (total, item) => total + item.produk.harga * item.jumlah,
    0
  );

  const handleTambah = (id) => {
    setCheckoutData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, jumlah: item.jumlah + 1 } : item
      )
    );
  };

  const handleKurang = (id) => {
    setCheckoutData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.jumlah > 1
          ? { ...item, jumlah: item.jumlah - 1 }
          : item
      )
    );
  };

  const handleBayar = async () => {
    if (!alamat || !metodePembayaran) {
      alert("Silakan lengkapi alamat dan metode pembayaran.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    for (const item of checkoutData) {
      const { error: transaksiError } = await supabase.from("transaksi").insert({
        user_id: user.id,
        total_harga: item.produk.harga * item.jumlah,
        alamat: alamat,
        produk_id: item.produk.id,
        metode_pembayaran: metodePembayaran,
        status:
          metodePembayaran === "COD"
            ? "Menunggu Konfirmasi Admin"
            : "Menunggu Pembayaran",
      });

      if (transaksiError) {
        console.error("Error saat insert transaksi:", transaksiError.message);
        return;
      }

      const { data: produkData, error: produkError } = await supabase
        .from("produk")
        .select("stok")
        .eq("id", item.produk.id)
        .single();

      if (produkError) {
        console.error("Error saat mengambil stok produk:", produkError.message);
        return;
      }

      const stokBaru = produkData.stok - item.jumlah;

      const { error: stokError } = await supabase
        .from("produk")
        .update({ stok: stokBaru })
        .eq("id", item.produk.id);

      if (stokError) {
        console.error("Error saat update stok produk:", stokError.message);
        return;
      }
    }

    await supabase
      .from("checkout")
      .delete()
      .eq("user_id", checkoutData[0].user_id);

    alert("Pesanan berhasil diproses!");
    router.push("/home");
  };

  const handleBack = () => {
    router.push("/home");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center bg-green-50">
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl">
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
            Kembali ke Home
          </button>
          <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">
            Konfirmasi Pesanan
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {checkoutData.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-green-50 rounded-lg shadow-md border border-green-300"
              >
                <img
                  src={item.produk.gambar}
                  alt={item.produk.nama}
                  className="w-32 h-32 object-cover rounded-md mb-2 mx-auto"
                />
                <h2 className="text-lg font-semibold text-green-700 text-center">
                  {item.produk.nama}
                </h2>
                <p className="text-green-600 text-center">
                  Harga: Rp {item.produk.harga.toLocaleString()}
                </p>
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => handleKurang(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="mx-4 text-green-700 font-semibold">
                    {item.jumlah}
                  </span>
                  <button
                    onClick={() => handleTambah(item.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg shadow-md border border-green-300">
            <h3 className="text-xl font-semibold text-green-800 text-center">
              Total Harga: Rp {totalHarga.toLocaleString()}
            </h3>
            <input
              type="text"
              placeholder="Alamat Pengiriman"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full p-2 border rounded-md mt-4 border-green-300 focus:ring focus:ring-green-200"
            />

            <select
              value={metodePembayaran}
              onChange={(e) => setMetodePembayaran(e.target.value)}
              className="w-full p-2 border rounded-md mt-4 border-green-300 focus:ring focus:ring-green-200"
            >
              <option value="">Pilih Metode Pembayaran</option>
              <option value="Transfer">Transfer</option>
              <option value="COD">COD (Bayar di Tempat)</option>
            </select>

            {metodePembayaran === "Transfer" && (
              <p className="mt-4 text-green-700 text-center">
                Silakan transfer ke rekening BCA 1234567890 atas nama Admin
                terlebih dahulu.
              </p>
            )}

            <button
              onClick={handleBayar}
              className="w-full py-3 mt-6 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}