"use client";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function ProdukTaniLayer(props) {
  const router = useRouter();
  const { id, nama, deskripsi, harga, stok, gambar } = props;
  const supabase = createClient();

  const handleAddToCart = async () => {
    try {
      // Mendapatkan informasi pengguna yang sedang login
      const { data: userData, error: authError } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error fetching user:", authError.message);
        return;
      }

      const user = userData?.user;

      if (!user) {
        console.log("Tidak ada user yang login");
        return;
      }

      // Menambahkan produk ke keranjang
      const { data: keranjangData, error: insertError } = await supabase
        .from("keranjang")
        .insert([
          {
            user_id: user.id,
            produk_id: id,
            jumlah: 1, // Tambahkan 1 item
          },
        ]);

      if (insertError) {
        console.error("Error menambahkan ke keranjang:", insertError.message);
        return;
      }

      console.log("Item berhasil ditambahkan ke keranjang:", keranjangData);
      router.push("/keranjang");
    } catch (error) {
      console.error("Error menambahkan ke keranjang:", error);
    }
  };

  const handleCheckout = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error("User belum login.");
      return;
    }
  
    // 🗑️ Hapus data checkout sebelumnya
    await supabase
      .from("checkout")
      .delete()
      .eq("user_id", userData.user.id);
  
    // ➕ Tambahkan produk baru ke checkout
    const { error: checkoutError } = await supabase.from("checkout").insert({
      user_id: userData.user.id,
      produk_id: id,
      jumlah: 1,
    });
  
    if (checkoutError) {
      console.error("Gagal menambahkan ke checkout:", checkoutError.message);
    } else {
      router.push("/transaksi");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100
    bg-white shadow-lg rounded-xl w-3/4 max-w-2xl p-6">
        <div className="text-center">
            <div>
              <CldImage
                className="rounded-lg mx-auto"
                src={gambar}
                width="400"
                height="300"
                crop={{
                  type: "auto",
                  source: true,
                }}
              />
              <h1 className="mt-4 text-2xl font-semibold text-gray-800">{nama}</h1>
              <p className="text-lg text-gray-600 mt-2">Harga: Rp.{harga}</p>
              <p className="text-lg text-gray-600">Stok: {stok}</p>
              <p className="text-sm text-gray-500 mt-4">{deskripsi}</p>
            </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
        <button
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
          onClick={handleAddToCart}
        >
          Keranjang
        </button>

        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleCheckout}
        >
          Beli
        </button>
        </div>
    </div>
  );
}
