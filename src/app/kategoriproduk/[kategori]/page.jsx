import ProdukTani from "../../component/cardProduk";
import supabase from "../../../../utils/supabase";
import SearchItem from "../../component/searching"
import Sidebar from "@/app/component/sidebar";

// export const revalidate = 20;

export default async function ItemByNama({params}) {
  const { kategori } = params;
  const { data : produk, error } = await supabase
    .from("produk")
    .select(`*`)
    .eq("kategori", kategori);

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
        </div>
      </div>
    </div>
  )
}