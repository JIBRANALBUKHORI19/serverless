"use client"
import { createClient } from "../utils/supabase/client";

export const handleCheckout = async (produkId, jumlah = 1, router) => {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("User belum login.");
    return;
  }
  await supabase.from("checkout").delete().eq("user_id", userData.user.id);

  const { error: checkoutError } = await supabase.from("checkout").insert({
    user_id: userData.user.id,
    produk_id: produkId,
    jumlah: jumlah,
  }); 

  if (checkoutError) {
    console.error("Gagal menambahkan ke checkout:", checkoutError.message); 
  } else {
    console.log("Berhasil checkout.");
    router.push("/transaksi");
  }
};