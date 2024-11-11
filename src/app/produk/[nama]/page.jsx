'use client'
import ProdukTani from "../../component/cardProduk";
import supabase from "../../../../utils/supabase";
import SearchItem from "../../component/searching"
import Sidebar from "@/app/component/sidebar";
import { useRouter } from "next/navigation";

// export const revalidate = 20;

export default async function ItemByNama({params}) {
  const router = useRouter()
  const { nama } = params;
  const { data: produk, error } = await supabase.from("produk").select("*").eq("nama", nama);
  console.log(produk);
  
  if (error) {
    console.log(error.message);
  }

  return (
    <div>
      <SearchItem/>
      <div className="flex">
        <div className="w-1/4">
          <Sidebar />
        </div>

        <div className="w-3/4 p-4 flex flex-wrap gap-4">
          {produk && produk.map((prdk, idx) => (
            <ProdukTani
              key={idx}
              nama={prdk.nama}
              deskripsi={prdk.deskripsi}
              harga={prdk.harga}
              stok={prdk.stok}
              gambar={prdk.gambar}
            />
          ))}
          <button className="focus:outline-none text-white 
                bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => router.push('/chating')}>chat admin</button>
        </div>
      </div>
    </div>
  )
}