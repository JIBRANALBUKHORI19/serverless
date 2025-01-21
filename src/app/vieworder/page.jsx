import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import OrderClient from "../componentUser/order";

export default async function OrderPage() {
  const supabase = await createClient();

  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData?.user) {
    redirect("/login");
  }

  const user = userData.user;

  // Mengambil data transaksi beserta produk yang dipesan
  const { data: orders, error: ordersError } = await supabase
  .from("transaksi")
  .select(`
    id,
    total_harga,
    alamat,
    metode_pembayaran,
    status,
    created_at,
    produk:produk_id (
      id,
      nama
    )
  `)
  .eq("user_id", user.id)
  .order("created_at", { ascending: true });

console.log(orders); // Periksa hasil query untuk memastikan produk dimuat


  return <OrderClient orders={orders || []} />;
}
