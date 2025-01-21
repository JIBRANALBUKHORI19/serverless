import ProdukTaniAdmin from "../componentAdmin/cardProdukAdmin";
import supabase from "../../utils/supabase";
import NavbarAdmin from "../componentAdmin/navbar";
import SidebarAdmin from "../componentAdmin/sidebarAdmin";

export const revalidate = 20;

export default async function Home() {
  const { data: produk, error } = await supabase.from("produk").select().order("id",{ ascending: true });
  console.log(produk);
  
  if (error) {
    console.log(error.message);
  }

  return (
    <div>
      <NavbarAdmin/>
      <div className="flex">
        <div className="w-1/4">
          <SidebarAdmin />
        </div>

        <div className="w-3/4 p-4 flex flex-wrap gap-4">
          {produk && produk.map((prdk, idx) => (
            <ProdukTaniAdmin
              key={idx} 
              nama={prdk.nama}
              deskripsi={prdk.deskripsi}
              harga={prdk.harga}
              stok={-1}
              id_kategori={prdk.id_kategori}
              gambar={prdk.gambar}
              id = {prdk.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
