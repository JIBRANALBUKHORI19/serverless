import SearchItem from "../../componentUser/searching"
import Sidebar from "../../componentUser/sidebar";
import ProdukTaniLayer from "../../componentUser/cardDouble";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";

// export const revalidate = 0;

export default async function ItemByNama({params}) {
  const supabase = await createClient()
  const { data, error : authError } = await supabase.auth.getUser();
  console.log(data);
  
  if (authError || !data?.user) {
    redirect('/login');
  }

  const  {id}  = params;
  const { data: produk, error } = await supabase.from("produk").select().eq("id", id);
  console.log(produk);
  console.log(id);
  
  
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
            <ProdukTaniLayer
              key={idx}
              nama={prdk.nama}
              deskripsi={prdk.deskripsi}
              harga={prdk.harga}
              stok={prdk.stok}
              gambar={prdk.gambar}
              id = {prdk.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}