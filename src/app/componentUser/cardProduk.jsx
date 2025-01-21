'use client';
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { handleCheckout } from "../componentUser/handlecheckout";


export default function ProdukTani(props) {
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

  const handleCheckoutClick = () => {
    handleCheckout(id, 1, router);
  };
  
  

  return (
    <div className="relative group max-w-xs p-4 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
      <Link href={`/produk/${id}`}>
        <div>
          <CldImage
            className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
            src={gambar}
            width="250"
            height="150"
            alt={nama}
          />
          <h1 className="mt-3 text-lg font-bold text-gray-800 group-hover:text-indigo-600">{nama}</h1>
          <p className="text-sm text-gray-500 mt-1">{deskripsi}</p>
          <p className="mt-2 text-green-600 font-semibold">Rp. {harga.toLocaleString()}</p>
          {stok > 0 ? <p className="text-xs text-gray-500 mt-1">Stok : {stok}</p> : null}
          
        </div>
      </Link>
      <div className="mt-4 flex justify-between">
        <button
          className="w-full mr-2 py-2 text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-300"
          onClick={handleAddToCart}
        >
          Keranjang
        </button>

              <button
        className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={handleCheckoutClick}
      >
        Beli Sekarang
      </button>
        </div>
      </div>
  );
}
