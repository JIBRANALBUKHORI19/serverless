import TransaksiClient from "../componentUser/transaksi";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";

export const revalidate = 0

export default async function TransaksiPage() {
  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    redirect("/login");
  }

  const user = userData.user;
  const { data: checkoutData, error: checkoutError } = await supabase
    .from("checkout")
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
    .eq("user_id", user.id);

  if (checkoutError) {
    console.error("Error fetching checkout:", checkoutError.message);
  }

  return <TransaksiClient checkoutData={checkoutData || []} />;
}