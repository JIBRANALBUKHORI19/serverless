import { createClient } from "../utils/supabase/server"; 
import KeranjangClient from "../componentUser/keranjang";

export default async function KeranjangPage() {
  const supabase = await createClient();
  
  const { data: userData, error: authError } = await supabase.auth.getUser();

  if (authError || !userData?.user) {
    redirect("/login");
  }

  const user = userData.user;

  const { data: keranjangData, error: keranjangError } = await supabase
    .from("keranjang")
    .select(`
      id,
      jumlah,
      produk:produk_id (
        id,
        nama,
        harga,
        gambar
      )
    `)
    .eq("user_id", user.id); // Memfilter berdasarkan user_id

  if (keranjangError) {
    console.error("Error fetching keranjang:", keranjangError.message);
  }

  // Kirim data ke Client Component
  return <KeranjangClient keranjangData={keranjangData || []} />;
}
